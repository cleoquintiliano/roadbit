// Testes automáticos da trilha: toda missão precisa ser resolvível e coerente.
const E = require('./engine.js');
const { MARCOS, MISSIONS } = require('./missoes.js');
let erros = 0;
const falha = (m, msg) => { erros++; console.log('FALHA ' + m.id + ' (' + m.modo + ') ' + m.titulo + ': ' + msg); };
const roda = (m, code) => { const c = E.clone(code); const L = E.layout(c); return { t: E.simulate(m, c), L }; };

MARCOS.forEach(k => {
  const ms = MISSIONS.filter(m => m.marco === k.id);
  if (ms.length !== 12) { erros++; console.log('Marco ' + k.id + ' tem ' + ms.length + ' missões'); }
  const conta = {}; ms.forEach(m => conta[m.modo] = (conta[m.modo] || 0) + 1);
  if (conta.rastrear !== 7 || conta.prever !== 2 || conta.depurar !== 2 || conta.explicar !== 1) { erros++; console.log('Marco ' + k.id + ' composição', JSON.stringify(conta)); }
});

MISSIONS.forEach(m0 => [m0, E.mirrorMission(m0)].forEach((m, esp) => {
  const tag = esp ? ' [espelhada]' : '';
  const { t, L } = roda(m, m.code);
  if (t.overflow && m.modo !== 'depurar') return falha(m, 'estouro' + tag);
  if (L.lines.length > 16) falha(m, 'código com ' + L.lines.length + ' linhas (máximo 16)');
  const w = m.map[0].length, h = m.map.length;
  if (w > 10 || h > 5) falha(m, 'mapa grande ' + w + 'x' + h);
  if (m.modo === 'rastrear') {
    if (t.fail) falha(m, 'falha ' + t.fail + tag);
    if (!t.allLit || !t.houses.length) falha(m, 'não acende todas as casas' + tag);
    if (!t.steps.some(s => s.kind === 'in')) falha(m, 'sem passos do estudante');
    if (t.steps.length > 90) falha(m, 'rastro longo: ' + t.steps.length);
  }
  if (m.modo === 'prever' || m.modo === 'explicar') {
    if (t.fail) falha(m, 'falha ' + t.fail + tag);
    if (m.predictVar && typeof t.final.vars[m.predictVar] !== 'number') falha(m, 'variável prevista não numérica');
    if (m.modo === 'prever' && !m.predictVar && t.final.x === m.start[0] && t.final.y === m.start[1]) falha(m, 'termina onde começou' + tag);
    if (m.modo === 'explicar' && (!m.opcoes || m.opcoes.length !== 3)) falha(m, 'precisa de 3 opções');
  }
  // textos com direção precisam combinar com o código, inclusive na missão espelhada
  const codigo = L.lines.map(l => l.html).join(' ');
  const dirs = { direita: /direita\(\)|livre\(<\/span>→|"→"|→/, esquerda: /esquerda\(\)|livre\(<\/span>←|"←"|←/ };
  const textos = [m.modo === 'explicar' ? m.opcoes[0] : '', m.guia || ''].join(' ');
  Object.keys(dirs).forEach(w => { if (new RegExp(w).test(textos) && !dirs[w].test(codigo)) falha(m, 'texto cita "' + w + '" mas o código não' + tag); });
  if (m.modo === 'depurar') {
    if (!t.fail && t.allLit && !t.overflow) falha(m, 'o código com erro já funciona' + tag);
    const c = roda(m, m.certo).t;
    if (c.fail || !c.allLit || c.overflow) falha(m, 'a correção não funciona' + tag);
    // deve existir exatamente o conserto esperado ao alcance: um número ou uma direção
    const a = E.coletar(m.code), b = E.coletar(m.certo);
    const dif = a.nums.filter((n, i) => n.v !== b.nums[i].v).length + a.moves.filter((n, i) => n.d !== b.moves[i].d).length;
    if (dif !== 1) falha(m, 'diferença entre erro e correção = ' + dif);
    const nd = a.nums.find((n, i) => n.v !== b.nums[i].v);
    if (nd && (b.nums[a.nums.indexOf(nd)].v > 9)) falha(m, 'correção fora de 0..9');
  }
}));
console.log(MISSIONS.length + ' missões em ' + MARCOS.length + ' marcos. ' + (erros ? erros + ' falha(s).' : 'Tudo certo.'));
process.exit(erros ? 1 : 0);
