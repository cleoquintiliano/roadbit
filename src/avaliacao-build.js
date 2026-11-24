// Confere e gera os materiais de avaliação para impressão: formas A e B do pré e pós-teste,
// gabarito com quadro de especificação e fichas de saída por marco.
// Uso: node src/avaliacao-build.js [pasta de saída]   (padrão: docs/avaliacao)
// Para os PDFs: python3 testes/pdf.py docs/avaliacao
const fs = require('fs'), path = require('path');
const E = require('./engine.js');
const AV = require('./avaliacao.js');
const raiz = path.join(__dirname, '..');
const saida = path.resolve(raiz, process.argv[2] || 'docs/avaliacao');
const LETRAS = 'ABCD';
let erros = 0;
const falha = (id, msg) => { erros++; console.log('FALHA ' + id + ': ' + msg); };

// ---------- execução e texto do código ----------
const roda = (code, entrada) => {
  const c = E.clone(code); const L = E.layout(c);
  const t = E.simulate({ map: ['.'], start: [0, 0], entrada: entrada || [] }, c);
  if (t.overflow) throw new Error('programa não termina');
  return { out: t.final.out, vars: t.final.vars, L };
};
const texto = html => html.replace(/<\/?span[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const linhasTexto = L => L.lines.map(l => '  '.repeat(l.ind) + texto(l.html));

// ---------- conferência de cada questão ----------
function confere(q, id) {
  const r = roda(q.code, q.entrada);
  const ops = q.opcoes.map(o => typeof o === 'string' ? o : o.t);
  if (ops.length !== 4) falha(id, 'precisa de 4 alternativas');
  if (new Set(ops).size !== ops.length) falha(id, 'alternativas repetidas');
  if (q.tipo === 'rastrear') {
    const s = r.out.join(', ');
    if (s !== ops[q.certa]) falha(id, 'saída real "' + s + '" diferente da alternativa certa "' + ops[q.certa] + '"');
    ops.forEach((o, i) => { if (i !== q.certa && o === s) falha(id, 'distrator igual à saída'); });
  } else if (q.tipo === 'prever') {
    const v = E.fmtValor(r.vars[q.variavel]);
    if (v !== ops[q.certa]) falha(id, 'valor final real ' + v + ' diferente de ' + ops[q.certa]);
    ops.forEach((o, i) => { if (i !== q.certa && o === v) falha(id, 'distrator igual ao valor final'); });
  } else if (q.tipo === 'explicar') {
    if (q.confere && r.out.join('|') !== q.confere.join('|')) falha(id, 'saída real "' + r.out.join(', ') + '" não confere com a explicação');
  } else if (q.tipo === 'depurar') {
    const alvo = q.alvo.join('|');
    if (r.out.join('|') === alvo) falha(id, 'o programa com erro já funciona');
    q.opcoes.forEach((o, i) => {
      const ro = roda(o.code, q.entrada), ok = ro.out.join('|') === alvo;
      if (i === q.certa && !ok) falha(id, 'a alternativa certa não conserta (saída ' + ro.out.join(', ') + ')');
      if (i !== q.certa && ok) falha(id, 'o distrator "' + o.t + '" também conserta');
      if (o.linha) { const lt = linhasTexto(ro.L)[o.linha[0] - 1] || ''; if (!lt.includes(o.linha[1])) falha(id, 'linha ' + o.linha[0] + ' da correção não tem "' + o.linha[1] + '": ' + lt); }
    });
    // as linhas citadas nas alternativas precisam existir no código original com o que dizem
    Object.entries(q.linhasOriginais || {}).forEach(([n, tok]) => { const lt = linhasTexto(r.L)[n - 1] || ''; if (!lt.includes(tok)) falha(id, 'linha ' + n + ' do original não tem "' + tok + '": ' + lt); });
  }
  return r;
}

// sorteio fixo das posições da resposta certa, equilibrado entre A, B, C e D
function posicoes(n, semente) {
  const base = []; for (let i = 0; i < n; i++) base.push(i % 4);
  let h = semente;
  for (let i = base.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [base[i], base[j]] = [base[j], base[i]]; }
  return base;
}
// alternativas só com números ficam em ordem crescente (HALADYNA; DOWNING; RODRIGUEZ, 2002);
// nas demais, a posição da certa é sorteada de forma equilibrada
const numerica = q => q.opcoes.every(o => typeof o === 'string' && /^-?\d+$/.test(o));
function montaForma(lista, nome, semente) {
  const pos = posicoes(lista.filter(q => !numerica(q)).length, semente);
  let k = 0;
  return lista.map((q, i) => {
    const id = nome + (i + 1);
    const r = confere(q, id);
    const ops = q.opcoes.map(o => typeof o === 'string' ? o : o.t);
    const certa = ops[q.certa], outras = ops.filter((_, j) => j !== q.certa);
    let ordem;
    if (numerica(q)) ordem = ops.slice().sort((a, b) => a - b);
    else { ordem = outras.slice(); ordem.splice(pos[k++], 0, certa); }
    const pc = ordem.indexOf(certa);
    // as notas citam as alternativas pela ordem em que foram escritas (A = certa, B, C, D = distratores);
    // aqui viram as letras que o estudante vê depois do embaralhamento
    const novaLetra = L => LETRAS[ordem.indexOf(ops[LETRAS.indexOf(L)])];
    const notaBase = q.nota || (nome === 'B' && AV.A[i] ? AV.A[i].nota : '') || '';
    const nota = notaBase.replace(/\b([BCD])( e ([BCD]))?:/g, (m, a, _, b) => b ? novaLetra(a) + ' e ' + novaLetra(b) + ':' : novaLetra(a) + ':');
    const habil = q.tipo === 'depurar' ? AV.DEP + ' (com ' + AV.MARCO[q.marco][1] + ')' : AV.MARCO[q.marco][1];
    return { n: i + 1, id, q, linhas: linhasTexto(r.L), ordem, letra: LETRAS[pc], habil, nota };
  });
}

// sem sequências longas da mesma letra, que o estudante poderia perceber
const maiorSequencia = F => F.reduce((m, x, i) => { const r = i && F[i - 1].letra === x.letra ? m.r + 1 : 1; return { r, max: Math.max(m.max, r) }; }, { r: 0, max: 0 }).max;
function formaSemSequencia(lista, nome, semente) { for (let s = semente; ; s++) { const F = montaForma(lista, nome, s); if (maiorSequencia(F) <= 3) return F; } }
const FA = formaSemSequencia(AV.A, 'A', 20261124);
// a forma B não pode repetir as letras da A: copiar do colega ao lado, que tem a outra forma, não pode dar certo
let FB;
for (let s = 9001; ; s += 97) { FB = formaSemSequencia(AV.B, 'B', s); if (FB.filter((x, i) => x.letra === FA[i].letra).length <= 8) break; }
// isomorfismo: mesma sequência de marcos e tipos e mesmo tamanho de código
FA.forEach((a, i) => {
  const b = FB[i];
  if (a.q.marco !== b.q.marco || a.q.tipo !== b.q.tipo) falha('A' + (i + 1) + '/B' + (i + 1), 'marco ou tipo diferente entre as formas');
  if (a.linhas.length !== b.linhas.length) falha('A' + (i + 1) + '/B' + (i + 1), 'código com ' + a.linhas.length + ' e ' + b.linhas.length + ' linhas');
});
['A', 'B'].forEach(f => {
  const F = f === 'A' ? FA : FB, cont = {};
  F.forEach(x => cont[x.letra] = (cont[x.letra] || 0) + 1);
  if (Object.values(cont).some(c => c < 4 || c > 8) || Object.keys(cont).length < 4) falha('forma ' + f, 'respostas desequilibradas ' + JSON.stringify(cont));
});
const FICHAS = AV.FICHAS.map(f => {
  const r = roda(f.code);
  if (f.r2code) { const r2 = roda(f.r2code).out.join(', '); if (r2 !== f.r2) falha('ficha ' + f.marco, 'resposta 2 real "' + r2 + '" diferente de "' + f.r2 + '"'); }
  return Object.assign({ linhas: linhasTexto(r.L), r1: r.out.join(', ') }, f);
});
if (erros) { console.log(erros + ' falha(s). Nada foi gerado.'); process.exit(1); }

// ---------- HTML para impressão ----------
const fontes = fs.readFileSync(path.join(__dirname, 'fonts.css'), 'utf8');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const KW = /\b(se|senão|repetir|enquanto|para cada|para|de|até|em|função|retorna|e|ou|não|verdadeiro|falso)\b/g;
const codigoHTML = linhas => '<pre class="cod">' + linhas.map((l, i) => '<span class="ln">' + (i + 1) + '</span>' + esc(l).replace(KW, '<b>$1</b>')).join('\n') + '</pre>';
const CSS = fontes + `
  @page{size:A4;margin:16mm 15mm 16mm 15mm}
  *{box-sizing:border-box}
  body{font-family:Ubuntu,Arial,sans-serif;color:#1F2A44;font-size:11.5pt;line-height:1.4;margin:0}
  h1{font-size:18pt;margin:0 0 2mm} h2{font-size:13.5pt;margin:6mm 0 2mm} h3{font-size:12pt;margin:0 0 1.5mm}
  .topo{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #16A8A6;padding-bottom:2mm;margin-bottom:4mm}
  .topo small{color:#55617A}
  .campos{display:grid;grid-template-columns:2fr 1fr 1fr;gap:4mm;margin:0 0 4mm}
  .campos div{border-bottom:1px solid #1F2A44;padding-top:5mm;font-size:10pt;color:#55617A}
  .inst{background:#EEF6F6;border-radius:3mm;padding:3mm 4mm;font-size:10.5pt;margin-bottom:4mm}
  .inst p{margin:0 0 1.5mm} .inst ul{margin:1mm 0 0;padding-left:5mm}
  .qs{column-count:2;column-gap:8mm;column-rule:1px solid #E6EAF1}
  .q{break-inside:avoid;margin:0 0 4.5mm;padding-top:1mm}
  .q .en{margin:0 0 1.5mm} .q .en b.n{display:inline-block;min-width:7mm}
  .cod{font-family:"Ubuntu Mono",monospace;font-size:11.5pt;line-height:1.35;background:#F4F6FA;border-radius:2mm;padding:2mm 3mm;margin:1mm 0 2mm;white-space:pre}
  .cod .ln{display:inline-block;width:6mm;color:#8D98AC;user-select:none}
  .cod b{color:#B4235A}
  .op{display:flex;gap:2.5mm;margin:0 0 1mm 7mm} .op .bx{width:4.2mm;height:4.2mm;border:1.4px solid #1F2A44;border-radius:50%;flex:none;margin-top:.6mm;text-align:center;font-size:8pt;line-height:4mm}
  table{border-collapse:collapse;width:100%;font-size:10pt;margin:2mm 0 4mm} th,td{border:1px solid #CBD3DF;padding:1.4mm 2mm;text-align:left;vertical-align:top} th{background:#EEF6F6}
  .rodape{margin-top:6mm;font-size:8.5pt;color:#55617A;border-top:1px solid #E6EAF1;padding-top:2mm}
  .quebra{break-before:page}
  .ficha{break-inside:avoid;border:1.4px dashed #8D98AC;border-radius:3mm;padding:4mm 5mm;margin:0 0 6mm;min-height:118mm}
  .linha{border-bottom:1px solid #8D98AC;height:7mm}
  .auto{display:flex;gap:6mm;font-size:10.5pt;margin-top:2mm}
`;
const pagina = (titulo, corpo) => `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(titulo)}</title><style>${CSS}</style></head><body>${corpo}</body></html>`;
const RODAPE = '<div class="rodape">RoadBit · Cléo Quintiliano Fernandes de Brito · ProfComp/UENP, 2026 · Material sob licença CC BY 4.0 · cleoquintiliano.github.io/roadbit</div>';
const LEGENDA = `<div class="inst"><p><b>Como ler os programas</b></p><ul>
  <li><code>x ← 5</code> guarda o valor 5 na variável x (o valor antigo é apagado).</li>
  <li><code>escrever(x)</code> mostra o valor de x na saída. <code>ler(x)</code> recebe o próximo valor da entrada e guarda em x.</li>
  <li><code>≥</code> maior ou igual, <code>≤</code> menor ou igual, <code>≠</code> diferente, <code>%</code> resto da divisão, <code>*</code> multiplicação.</li>
  <li>O computador executa uma linha de cada vez, de cima para baixo, a não ser que um <code>se</code>, um laço ou uma função mande ir para outro lugar.</li></ul></div>`;

function folhaAluno(F, forma) {
  const qs = F.map(x => {
    const q = x.q, per = q.tipo === 'prever' ? AV.PERG.prever(q.variavel) : AV.PERG[q.tipo];
    return `<div class="q"><p class="en"><b class="n">${x.n}.</b>${q.contexto ? esc(q.contexto) + ' ' : ''}${esc(per)}</p>${codigoHTML(x.linhas)}`
      + x.ordem.map((o, k) => `<div class="op"><span class="bx">${LETRAS[k]}</span><span>${esc(o)}</span></div>`).join('') + '</div>';
  }).join('');
  return pagina('RoadBit · Teste de leitura de código · Forma ' + forma, `
  <div class="topo"><h1>Teste de leitura de código · Forma ${forma}</h1><small>RoadBit · 24 questões · 50 minutos</small></div>
  <div class="campos"><div>Nome ou número</div><div>Turma</div><div>Data</div></div>
  <div class="inst"><p>Leia cada programa sem usar o computador e marque <b>uma</b> alternativa por questão. Pode rascunhar ao lado do código.</p>
  <p>Não tem problema não saber uma questão: este teste mostra o que você sabe agora, e não vale nota.</p></div>
  ${LEGENDA}<div class="qs">${qs}</div>${RODAPE}`);
}

function gabarito() {
  const tabela = (F, f) => `<h2>Forma ${f}</h2><table><tr><th>Nº</th><th>Marco</th><th>Tipo</th><th>Habilidade da BNCC</th><th>Resposta</th><th>Erro comum nos distratores</th></tr>`
    + F.map(x => `<tr><td>${x.n}</td><td>${x.q.marco}. ${esc(AV.MARCO[x.q.marco][0])}</td><td>${x.q.tipo}</td><td>${esc(x.habil)}</td><td><b>${x.letra}</b></td><td>${esc(x.nota)}</td></tr>`).join('') + '</table>';
  const espec = `<h2>Quadro de especificação</h2><p>Cada marco principal tem duas questões. As formas A e B têm a mesma estrutura, questão por questão: mesmo marco, mesmo tipo e mesmo tamanho de código, com valores e contextos diferentes.</p>
  <table><tr><th>Marco</th><th>Habilidade da BNCC</th><th>Questões</th><th>Tipos</th></tr>` + Object.keys(AV.MARCO).map(m => {
    const xs = FA.filter(x => x.q.marco == m);
    return `<tr><td>${m}. ${esc(AV.MARCO[m][0])}</td><td>${esc(AV.MARCO[m][1])}${xs.some(x => x.q.tipo === 'depurar') ? '; ' + AV.DEP : ''}</td><td>${xs.map(x => x.n).join(' e ')}</td><td>${xs.map(x => x.q.tipo).join(' e ')}</td></tr>`;
  }).join('') + `</table>`;
  const cont = {}; FA.forEach(x => cont[x.q.tipo] = (cont[x.q.tipo] || 0) + 1);
  return pagina('RoadBit · Gabarito e quadro de especificação', `
  <div class="topo"><h1>Gabarito e quadro de especificação</h1><small>RoadBit · pré e pós-teste · uso do professor</small></div>
  <p>Distribuição por tipo de questão, igual nas duas formas: ${Object.entries(cont).map(([k, v]) => v + ' de ' + k).join(', ')}. Nas questões com alternativas numéricas, os números estão em ordem crescente; nas demais, a posição da resposta certa foi sorteada de forma equilibrada entre as letras.</p>
  ${espec}${tabela(FA, 'A')}<div class="quebra"></div>${tabela(FB, 'B')}
  <h2>Correção</h2><p>Cada questão vale 1 ponto, de 0 a 24. Lance os acertos na planilha <i>planilha-ganho.xlsx</i>, que calcula o ganho normalizado da turma. Para ver o resultado de um marco, some as duas questões dele: o número serve para descrever a turma, não para avaliar um estudante isoladamente.</p>
  ${RODAPE}`);
}

function fichas() {
  const fs_ = FICHAS.map(f => `<div class="ficha"><div class="topo"><h3>Ficha de saída · Marco ${f.marco}: ${esc(AV.MARCO[f.marco][0])}</h3><small>Nome ou número: ____________________</small></div>
    <p class="en"><b>1.</b> Leia o programa sem usar o computador. O que aparece na saída, na ordem?</p>${codigoHTML(f.linhas)}
    <div class="linha"></div>
    <p class="en" style="margin-top:3mm"><b>2.</b> ${esc(f.q2)}</p><div class="linha"></div><div class="linha"></div>
    <p class="en" style="margin-top:3mm"><b>3.</b> Como foi este marco para você?</p>
    <div class="auto"><span>( ) Entendi bem</span><span>( ) Entendi em parte</span><span>( ) Ainda tenho dúvida</span></div></div>`).join('');
  const resp = `<div class="quebra"></div><h2>Respostas das fichas (uso do professor)</h2><table><tr><th>Marco</th><th>1. Saída</th><th>2. Resposta esperada</th></tr>`
    + FICHAS.map(f => `<tr><td>${f.marco}. ${esc(AV.MARCO[f.marco][0])}</td><td>${esc(f.r1)}</td><td>${esc(f.r2)}</td></tr>`).join('') + '</table>'
    + '<p>As fichas são formativas: servem para o professor decidir a próxima aula (retomar um conceito, formar duplas, abrir um bônus). Não entram na nota nem na pesquisa.</p>';
  return pagina('RoadBit · Fichas de saída por marco', `<div class="topo"><h1>Fichas de saída por marco</h1><small>RoadBit · 5 minutos no fim de cada marco · duas por folha</small></div>${fs_}${resp}${RODAPE}`);
}

fs.mkdirSync(saida, { recursive: true });
const arquivos = { 'forma-A.html': folhaAluno(FA, 'A'), 'forma-B.html': folhaAluno(FB, 'B'), 'gabarito.html': gabarito(), 'fichas-de-saida.html': fichas() };
Object.entries(arquivos).forEach(([n, h]) => fs.writeFileSync(path.join(saida, n), h));
fs.writeFileSync(path.join(saida, 'gabarito.json'), JSON.stringify({ A: FA.map(x => ({ n: x.n, marco: x.q.marco, tipo: x.q.tipo, habilidade: x.habil, resposta: x.letra })), B: FB.map(x => ({ n: x.n, marco: x.q.marco, tipo: x.q.tipo, habilidade: x.habil, resposta: x.letra })) }, null, 1) + '\n');
console.log('Conferidas ' + (FA.length + FB.length) + ' questões e ' + FICHAS.length + ' fichas. Gerado em ' + path.relative(raiz, saida) + '/: ' + Object.keys(arquivos).join(', ') + ', gabarito.json');
