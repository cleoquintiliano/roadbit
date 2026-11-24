// ===== RoadBit: motor (árvore sintática, tradutor para pseudocódigo e interpretador) =====
// Cada missão guarda o programa como uma árvore. O interpretador percorre a árvore e
// devolve o rastro completo da execução, passo a passo. A interface só reproduz o rastro.

const DIRS = { R: [1, 0], L: [-1, 0], U: [0, -1], D: [0, 1] };
const MOVE_WORD = { R: 'direita()', L: 'esquerda()', U: 'cima()', D: 'baixo()' };
const MOVE_NOME = { R: 'para a direita', L: 'para a esquerda', U: 'para cima', D: 'para baixo' };
const SETA = { R: '→', L: '←', U: '↑', D: '↓', E: 'Entregar' };
const DIR_DA_SETA = { '→': 'R', '←': 'L', '↑': 'U', '↓': 'D' };
const SYM = {
  o: { nome: 'laranja', ch: '●' },
  p: { nome: 'roxa', ch: '▲' },
  g: { nome: 'verde', ch: '■' }
};
const LIMITE_PASSOS = 1500;

// ---------- construtores curtos para escrever missões ----------
const x = v => typeof v === 'number' ? { k: 'num', v } : typeof v === 'string' ? { k: 'str', v }
  : typeof v === 'boolean' ? { k: 'bool', v } : v;
const N = v => ({ k: 'num', v });
const T = v => ({ k: 'str', v });
const BO = v => ({ k: 'bool', v });
const V = n => ({ k: 'var', n });
const B = (op, a, b) => ({ k: 'bin', op, a: x(a), b: x(b) });
const NAO = e => ({ k: 'not', e: x(e) });
const S = (s, neg) => ({ k: 'sym', s, neg: !!neg });
const PL = { k: 'tile' };
const LIVRE = d => ({ k: 'free', d });
const LS = items => ({ k: 'list', items: items.map(x) });
const IX = (l, i) => ({ k: 'idx', l: x(l), i: x(i) });
const TAM = l => ({ k: 'len', l: x(l) });
const REC = o => ({ k: 'rec', f: Object.keys(o).map(n => ({ n, e: x(o[n]) })) });
const FLD = (e, n) => ({ k: 'fld', e: x(e), n });
const FC = (name, args) => ({ k: 'fcall', name, args: (args || []).map(x) });

const mv = d => ({ k: 'move', d });
const R_ = mv('R'), L_ = mv('L'), U_ = mv('U'), D_ = mv('D');
const ENT = { k: 'deliver' };
const mvx = e => ({ k: 'movex', e: x(e) });
const rep = (n, body, v) => ({ k: 'repeat', n: x(n), v, body });
const cada = (v, l, body) => ({ k: 'each', v, l: x(l), body });
const se = (c, then, els) => ({ k: 'if', c: x(c), then, els });
const enq = (c, body) => ({ k: 'while', c: x(c), body });
const set = (n, e) => ({ k: 'set', n, e: x(e) });
const setx = (t, e) => ({ k: 'setx', t, e: x(e) });
const esc = e => ({ k: 'print', e: x(e) });
const ler = n => ({ k: 'read', n });
const def = (name, params, body) => ({ k: 'def', name, params: params || [], body });
const call = (name, args) => ({ k: 'call', name, args: (args || []).map(x) });
const ret = e => ({ k: 'ret', e: x(e) });

function clone(o) { return JSON.parse(JSON.stringify(o)); }

// ---------- leitura do mapa ----------
// '.' rua, 'H' casa, 'o' 'p' 'g' calçadas com símbolo, 't' enfeite, '#' parede, '0'-'9' placa
function parseMap(rows) {
  const h = rows.length, w = rows[0].length;
  const cell = (cx, cy) => rows[((cy % h) + h) % h][((cx % w) + w) % w];
  const houses = [];
  rows.forEach((r, y) => [...r].forEach((c, cx) => { if (c === 'H') houses.push(cx + ',' + y); }));
  return { rows, w, h, cell, houses };
}
const ehPlaca = c => c >= '0' && c <= '9';

// ---------- percurso genérico das subexpressões ----------
function filhos(e) {
  if (!e || typeof e !== 'object') return [];
  switch (e.k) {
    case 'bin': return [e.a, e.b];
    case 'not': return [e.e];
    case 'list': return e.items;
    case 'idx': return [e.l, e.i];
    case 'len': return [e.l];
    case 'rec': return e.f.map(f => f.e);
    case 'fld': return [e.e];
    case 'fcall': return e.args;
    default: return [];
  }
}
// expressões diretamente ligadas a um comando, na ordem em que aparecem na linha
function exprsDe(st) {
  switch (st.k) {
    case 'set': case 'print': case 'ret': case 'movex': return [st.e];
    case 'setx': return [st.t, st.e];
    case 'repeat': return [st.n];
    case 'each': return [st.l];
    case 'if': case 'while': return [st.c];
    case 'call': return st.args;
    default: return [];
  }
}
const blocosDe = st => [st.body, st.then, st.els].filter(Boolean);

// Lista, na ordem do código, os números e os movimentos (usada para plantar e achar erros)
function coletar(ast) {
  const nums = [], moves = [];
  const ex = e => { if (!e) return; if (e.k === 'num') nums.push(e); filhos(e).forEach(ex); };
  const bl = list => list.forEach(st => {
    if (st.k === 'move') moves.push(st);
    exprsDe(st).forEach(ex);
    if (st.k === 'if') { bl(st.then); if (st.els) bl(st.els); } else blocosDe(st).forEach(bl);
  });
  bl(ast);
  return { nums, moves };
}

// ---------- tradutor: árvore -> linhas de pseudocódigo ----------
const PREC = { 'ou': 1, 'e': 2, '=': 3, '≠': 3, '>': 3, '<': 3, '≥': 3, '≤': 3, '+': 4, '-': 4, '*': 5, '/': 5, '%': 5 };
function fmtValor(v) {
  if (v === true) return 'verdadeiro';
  if (v === false) return 'falso';
  if (Array.isArray(v)) return '[' + v.map(fmtValor).join(', ') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).map(k => k + ': ' + fmtValor(v[k])).join(', ') + '}';
  if (typeof v === 'string') return DIR_DA_SETA[v] ? v : '"' + v + '"';
  return String(v);
}
function exprHTML(e, opts) {
  opts = opts || {};
  const h = c => exprHTML(c, opts);
  switch (e.k) {
    case 'num': return opts.editable ? '<span class="num ed" data-nid="' + e.id + '">' + e.v + '</span>' : '<span class="num">' + e.v + '</span>';
    case 'str': return '<span class="str">' + (DIR_DA_SETA[e.v] ? e.v : '"' + e.v + '"') + '</span>';
    case 'bool': return '<span class="kw">' + (e.v ? 'verdadeiro' : 'falso') + '</span>';
    case 'var': return '<span class="var">' + e.n + '</span>';
    case 'bin': {
      const par = (c, dir) => {
        const s = h(c);
        if (c.k !== 'bin') return s;
        const pc = PREC[c.op], pp = PREC[e.op];
        return (pc < pp || (pc === pp && dir === 'b' && (e.op === '-' || e.op === '/' || e.op === '%'))) ? '(' + s + ')' : s;
      };
      const op = (e.op === 'e' || e.op === 'ou') ? '<span class="kw">' + e.op + '</span>' : e.op;
      return par(e.a, 'a') + ' ' + op + ' ' + par(e.b, 'b');
    }
    case 'not': return '<span class="kw">não</span> ' + (e.e.k === 'bin' ? '(' + h(e.e) + ')' : h(e.e));
    case 'sym': return (e.neg ? '<span class="kw">não</span> ' : '') + '<span class="sym s-' + e.s + '" title="calçada ' + SYM[e.s].nome + '">' + SYM[e.s].ch + '</span>';
    case 'tile': return '<span class="fn">placa()</span>';
    case 'free': return '<span class="fn">livre(</span>' + SETA[e.d] + '<span class="fn">)</span>';
    case 'list': return '[' + e.items.map(h).join(', ') + ']';
    case 'idx': return h(e.l) + '[' + h(e.i) + ']';
    case 'len': return '<span class="fn">tamanho</span>(' + h(e.l) + ')';
    case 'rec': return '{' + e.f.map(f => f.n + ': ' + h(f.e)).join(', ') + '}';
    case 'fld': return h(e.e) + '.' + e.n;
    case 'fcall': return '<span class="fn">' + e.name + '</span>(' + e.args.map(h).join(', ') + ')';
  }
  return '';
}

// Numera os nós, gera as linhas e devolve o mapa nó -> linha.
// As linhas de fechamento ("}") também recebem identificador, para o foco passar por elas.
function layout(ast, opts) {
  opts = opts || {};
  let nid = 0;
  const lines = [], lineOf = {};
  const tag = e => { if (!e || typeof e !== 'object') return; e.id = 'e' + (nid++); filhos(e).forEach(tag); };
  const kw = w => '<span class="kw">' + w + '</span>';
  const fn = w => '<span class="fn">' + w + '</span>';
  const push = (html, ind, id) => { if (id) lineOf[id] = lines.length; lines.push({ html, ind, nid: id }); };
  function ifChain(st, ind, prefix) {
    tag(st.c);
    push(prefix + kw('se') + ' ' + exprHTML(st.c, opts) + ' {', ind, st.id);
    block(st.then, ind + 1);
    if (st.els) {
      if (st.els.length === 1 && st.els[0].k === 'if') {
        st.els[0].id = 'n' + (nid++);
        ifChain(st.els[0], ind, '} ' + kw('senão') + ' ');
        return;
      }
      push('} ' + kw('senão') + ' {', ind, st.id + ':s');
      block(st.els, ind + 1);
    }
    push('}', ind, st.id + '}');
  }
  function block(list, ind) {
    list.forEach(st => {
      st.id = 'n' + (nid++);
      exprsDe(st).forEach(e => { if (st.k !== 'if') tag(e); });
      const E = e => exprHTML(e, opts);
      switch (st.k) {
        case 'move': push(opts.editable ? '<span class="fn dir ed" data-nid="' + st.id + '">' + MOVE_WORD[st.d] + '</span>' : fn(MOVE_WORD[st.d]), ind, st.id); break;
        case 'deliver': push(fn('entregar()'), ind, st.id); break;
        case 'movex': push(fn('mover') + '(' + E(st.e) + ')', ind, st.id); break;
        case 'set': push('<span class="var">' + st.n + '</span> ← ' + E(st.e), ind, st.id); break;
        case 'setx': push(E(st.t) + ' ← ' + E(st.e), ind, st.id); break;
        case 'print': push(fn('escrever') + '(' + E(st.e) + ')', ind, st.id); break;
        case 'read': push(fn('ler') + '(<span class="var">' + st.n + '</span>)', ind, st.id); break;
        case 'ret': push(kw('retorna') + ' ' + E(st.e), ind, st.id); break;
        case 'call': push(fn(st.name) + '(' + st.args.map(E).join(', ') + ')', ind, st.id); break;
        case 'repeat':
          push(st.v ? kw('para') + ' <span class="var">' + st.v + '</span> ' + kw('de') + ' 1 ' + kw('até') + ' ' + E(st.n) + ' {'
                    : kw('repetir') + ' (' + E(st.n) + ') {', ind, st.id);
          block(st.body, ind + 1); push('}', ind, st.id + '}'); break;
        case 'each':
          push(kw('para cada') + ' <span class="var">' + st.v + '</span> ' + kw('em') + ' ' + E(st.l) + ' {', ind, st.id);
          block(st.body, ind + 1); push('}', ind, st.id + '}'); break;
        case 'while':
          push(kw('enquanto') + ' ' + E(st.c) + ' {', ind, st.id);
          block(st.body, ind + 1); push('}', ind, st.id + '}'); break;
        case 'if': ifChain(st, ind, ''); break;
        case 'def':
          push(kw('função') + ' ' + fn(st.name) + '(' + st.params.map(p => '<span class="var">' + p + '</span>').join(', ') + ') {', ind, st.id);
          block(st.body, ind + 1); push('}', ind, st.id + '}'); break;
      }
    });
  }
  block(ast, 0);
  return { lines, lineOf };
}

// ---------- interpretador: gera o rastro completo ----------
// Cada passo: { nid, kind: 'in' | 'auto', key?, x, y, vars, lit, out, ctx, loop?, cond? }
// 'in' é um passo que o estudante executa (mover ou entregar); 'auto' o computador mostra.
function simulate(mission, ast, opts) {
  opts = opts || {};
  const M = parseMap(mission.map);
  let px = mission.start[0], py = mission.start[1];
  const globais = {}, pilha = [], lit = {}, steps = [], out = [], delivered = [];
  const entrada = (mission.entrada || []).slice();
  const funcs = {};
  ast.forEach(st => { if (st.k === 'def') funcs[st.name] = st; });
  let fail = null;
  const RET = {}, ESTOURO = {};
  const visao = () => Object.assign({}, globais, pilha.length ? pilha[pilha.length - 1] : null);
  const snap = (nid, kind, extra) => {
    steps.push(Object.assign({ nid, kind, x: px, y: py, vars: clone(visao()), lit: Object.assign({}, lit), out: out.slice(), prof: pilha.length }, extra));
    if (steps.length > LIMITE_PASSOS) throw ESTOURO;
  };
  const escopo = n => {
    const topo = pilha[pilha.length - 1];
    if (topo && (n in topo || !(n in globais))) return topo;
    return globais;
  };
  const wrap = (v, m) => ((v % m) + m) % m;
  const ev = e => {
    switch (e.k) {
      case 'num': case 'str': case 'bool': return e.v;
      case 'var': { const topo = pilha[pilha.length - 1]; return topo && e.n in topo ? topo[e.n] : globais[e.n]; }
      case 'sym': { const r = M.cell(px, py) === e.s; return e.neg ? !r : r; }
      case 'tile': { const c = M.cell(px, py); return ehPlaca(c) ? +c : 0; }
      case 'free': { const d = DIRS[e.d]; return M.cell(px + d[0], py + d[1]) !== '#'; }
      case 'not': return !ev(e.e);
      case 'list': return e.items.map(ev);
      case 'idx': return ev(e.l)[ev(e.i)];
      case 'len': return ev(e.l).length;
      case 'rec': { const o = {}; e.f.forEach(f => { o[f.n] = ev(f.e); }); return o; }
      case 'fld': return ev(e.e)[e.n];
      case 'fcall': return chamar(e.name, e.args.map(ev), null);
      case 'bin': {
        if (e.op === 'e') return !!(ev(e.a) && ev(e.b));
        if (e.op === 'ou') return !!(ev(e.a) || ev(e.b));
        const a = ev(e.a), b = ev(e.b);
        switch (e.op) {
          case '+': return a + b; case '-': return a - b; case '*': return a * b;
          case '/': return Math.floor(a / b); case '%': return wrap(a, b);
          case '>': return a > b; case '<': return a < b; case '≥': return a >= b; case '≤': return a <= b;
          case '=': return a === b; case '≠': return a !== b;
        }
      }
    }
  };
  function chamar(name, args, nidChamada) {
    const f = funcs[name];
    const quadro = {};
    f.params.forEach((p, i) => { quadro[p] = args[i]; });
    pilha.push(quadro);
    snap(f.id, 'auto', { ctx: 'def' });
    let valor;
    try { run(f.body, 'func'); snap(f.id + '}', 'auto', { ctx: 'fim' }); }
    catch (sinal) { if (sinal !== RET) { throw sinal; } valor = RET.v; }
    pilha.pop();
    if (nidChamada) snap(nidChamada, 'auto', { ctx: 'volta' });
    return valor;
  }
  function andar(dir, st, ctx) {
    const d = DIRS[dir], nx = wrap(px + d[0], M.w), ny = wrap(py + d[1], M.h);
    let bloqueado = false;
    if (M.cell(nx, ny) === '#') { bloqueado = true; if (!fail) fail = 'parede'; } else { px = nx; py = ny; }
    snap(st.id, 'in', { key: dir, ctx, bloqueado });
  }
  function run(list, ctx) {
    for (const st of list) {
      switch (st.k) {
        case 'def': break;
        case 'move': andar(st.d, st, ctx); break;
        case 'movex': andar(DIR_DA_SETA[ev(st.e)] || 'R', st, 'lista'); break;
        case 'deliver': {
          const k = px + ',' + py, casa = M.cell(px, py) === 'H';
          delivered.push(k);
          if (casa || opts.anyDeliver) lit[k] = true; else if (!fail) fail = 'ninguem';
          snap(st.id, 'in', { key: 'E', ctx, ok: casa || !!opts.anyDeliver });
          break;
        }
        case 'set': { const v = ev(st.e); escopo(st.n)[st.n] = v; snap(st.id, 'auto', { ctx }); break; }
        case 'setx': { const v = ev(st.e); ev(st.t.l)[ev(st.t.i)] = v; snap(st.id, 'auto', { ctx }); break; }
        case 'read': { escopo(st.n)[st.n] = entrada.length ? entrada.shift() : 0; snap(st.id, 'auto', { ctx: 'ler' }); break; }
        case 'print': { const v = ev(st.e); out.push(typeof v === 'string' ? v : fmtValor(v)); snap(st.id, 'auto', { ctx }); break; }
        case 'ret': { RET.v = ev(st.e); snap(st.id, 'auto', { ctx: 'retorna' }); throw RET; }
        case 'call': { snap(st.id, 'auto', { ctx: 'chama' }); chamar(st.name, st.args.map(ev), st.id); break; }
        case 'repeat': {
          const n = ev(st.n);
          if (n <= 0) snap(st.id, 'auto', { ctx: 'repeat', loop: { i: 0, n } });
          for (let i = 1; i <= n; i++) {
            if (st.v) escopo(st.v)[st.v] = i;
            snap(st.id, 'auto', { ctx: 'repeat', loop: { i, n } });
            run(st.body, 'repeat');
            snap(st.id + '}', 'auto', { ctx: 'fim' });
          }
          break;
        }
        case 'each': {
          const l = ev(st.l).slice();
          for (let i = 0; i < l.length; i++) {
            escopo(st.v)[st.v] = l[i];
            snap(st.id, 'auto', { ctx: 'each', loop: { i: i + 1, n: l.length } });
            run(st.body, 'each');
            snap(st.id + '}', 'auto', { ctx: 'fim' });
          }
          break;
        }
        case 'while': {
          let i = 0;
          while (true) {
            const c = ev(st.c); i++;
            snap(st.id, 'auto', { ctx: 'while', cond: c, loop: c ? { i } : { fim: true } });
            if (!c) break;
            run(st.body, 'while');
            snap(st.id + '}', 'auto', { ctx: 'fim' });
          }
          break;
        }
        case 'if': {
          const c = ev(st.c); snap(st.id, 'auto', { ctx: 'if', cond: c });
          if (c) run(st.then, 'if'); else if (st.els) run(st.els, 'if');
          break;
        }
      }
    }
  }
  let overflow = false;
  try { run(ast, 'seq'); } catch (sinal) { if (sinal === ESTOURO || sinal instanceof RangeError) overflow = true; else if (sinal !== RET) throw sinal; }
  const allLit = M.houses.every(k => lit[k]);
  return { steps, final: { x: px, y: py, vars: clone(globais), lit, out }, fail, overflow, allLit, houses: M.houses, delivered };
}

// espelha uma missão na horizontal (para rejogar sem decorar o caminho)
function mirrorMission(m) {
  const c = clone(m);
  c.map = m.map.map(r => [...r].reverse().join(''));
  c.start = [m.map[0].length - 1 - m.start[0], m.start[1]];
  const troca = d => d === 'R' ? 'L' : d === 'L' ? 'R' : d;
  const ex = e => { if (!e) return; if (e.k === 'free') e.d = troca(e.d); if (e.k === 'str' && (e.v === '→' || e.v === '←')) e.v = e.v === '→' ? '←' : '→'; filhos(e).forEach(ex); };
  const bl = list => list.forEach(st => {
    if (st.k === 'move') st.d = troca(st.d);
    exprsDe(st).forEach(ex);
    blocosDe(st).forEach(bl);
  });
  bl(c.code); if (c.certo) bl(c.certo);
  // os textos que citam direção também espelham, senão a frase certa passa a descrever o caminho ao contrário
  if (c.titulo) c.titulo = espelharTexto(c.titulo);
  if (c.guia) c.guia = espelharTexto(c.guia);
  if (c.alvo) c.alvo = espelharTexto(c.alvo);
  if (c.opcoes) c.opcoes = c.opcoes.map(espelharTexto);
  return c;
}
function espelharTexto(t) {
  return t.replace(/direita|esquerda|→|←/g, w => ({ direita: 'esquerda', esquerda: 'direita', '→': '←', '←': '→' }[w]));
}

const RoadBitMotor = { DIRS, MOVE_WORD, MOVE_NOME, SETA, DIR_DA_SETA, SYM, x, N, T, BO, V, B, NAO, S, PL, LIVRE, LS, IX, TAM, REC, FLD, FC,
  mv, R_, L_, U_, D_, ENT, mvx, rep, cada, se, enq, set, setx, esc, ler, def, call, ret,
  clone, parseMap, ehPlaca, coletar, layout, simulate, mirrorMission, espelharTexto, fmtValor };
if (typeof module !== 'undefined') module.exports = RoadBitMotor;
else if (typeof window !== 'undefined') window.RoadBitMotor = RoadBitMotor;
