// Gera a página inicial (index.html) a partir de versoes.json, para que a lista de versões
// da aplicação e da documentação fique sempre igual nos dois lugares.
// Uso: node src/landing.js
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const V = JSON.parse(fs.readFileSync(path.join(raiz, 'versoes.json'), 'utf8'));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const data = d => d.split('-').reverse().join('/');
const atual = V.versoes.find(v => v.versao === V.atual);
const docsAtuais = atual.docs.map(d => '<a class="card" href="' + d.url + '"><b>' + esc(d.titulo) + '</b><span class="go">Ler →</span></a>').join('\n      ');
const linhas = V.versoes.map(v => `
      <article class="ver${v.versao === V.atual ? ' cur' : ''}">
        <header><b>v${esc(v.versao)}</b><span>${esc(v.nome)} · ${data(v.data)}</span>${v.versao === V.atual ? '<em>atual</em>' : ''}</header>
        <p>${esc(v.resumo)}</p>
        <nav>
          <a href="${v.jogo}">Jogo</a>${v.apresentacao ? `\n          <a href="${v.apresentacao}">Apresentação</a>` : ''}
          ${v.docs.map(d => `<a href="${d.url}">${esc(d.titulo)}</a>`).join('\n          ')}
          <a href="https://github.com/cleoquintiliano/roadbit/tree/${v.commit}">Código (${v.tag})</a>
        </nav>
      </article>`).join('');
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RoadBit: jogo de leitura de código para o Pensamento Computacional</title>
<meta name="description" content="Jogo web em que o estudante faz o papel do computador: executa, prevê, explica e conserta código. Anos finais do Ensino Fundamental, BNCC Computação.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  :root{--bg:#F7F9FC;--ink:#1F2A44;--ink2:#55617A;--line:#E6EAF1;--blue:#1D3F86;--teal:#16A8A6;--teal-d:#0B7473;--yellow:#FFD45C}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:Ubuntu,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;line-height:1.5}
  main{max-width:980px;margin:0 auto;padding:48px 24px 64px}
  .eyebrow{font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--teal-d);margin:0}
  h1{font-size:clamp(44px,8vw,76px);line-height:1.02;margin:8px 0 14px;letter-spacing:-1px}
  h1 span{color:var(--teal)}
  h2{font-size:24px;margin:44px 0 14px}
  .lead{font-size:20px;color:var(--ink2);max-width:680px;margin:0 0 30px}
  .hero{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#fff;background:var(--blue);border-radius:24px;padding:26px 28px;max-width:640px}
  .hero b{font-size:26px}
  .hero p{margin:0;color:#DCE6F7;font-size:17px}
  .hero span{margin-top:8px;font-weight:700;color:var(--yellow)}
  .hero:hover,.hero:focus-visible{box-shadow:0 12px 26px rgba(29,63,134,.25);outline:none}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
  a.card{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:inherit;background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px 20px}
  a.card:hover,a.card:focus-visible{border-color:var(--teal);outline:none}
  a.card b{font-size:18px}
  .go{font-weight:700;color:var(--teal-d);margin-top:auto}
  .ver{background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px 22px;margin-bottom:14px}
  .ver.cur{border-color:#BFE7E6}
  .ver header{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
  .ver header b{font-size:22px}
  .ver header span{color:var(--ink2)}
  .ver header em{font-style:normal;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:#DDF5F4;color:var(--teal-d);padding:2px 10px;border-radius:999px}
  .ver p{margin:6px 0 10px;color:var(--ink2)}
  .ver nav{display:flex;flex-wrap:wrap;gap:8px}
  .ver nav a{font-size:15px;font-weight:500;color:var(--blue);text-decoration:none;background:var(--bg);border-radius:999px;padding:6px 14px}
  .ver nav a:hover,.ver nav a:focus-visible{background:#E8F0FF;outline:none}
  .meta{margin-top:44px;padding-top:22px;border-top:1px solid var(--line);font-size:15px;color:var(--ink2)}
  .meta a{color:var(--blue)}
</style>
</head>
<body>
<main>
  <p class="eyebrow">Pensamento Computacional · BNCC Computação</p>
  <h1>Road<span>Bit</span></h1>
  <p class="lead">Um jogo em que o estudante faz o papel do computador: executa o código linha a linha, prevê o resultado, explica o que ele faz e conserta erros para levar um robô mensageiro pela cidade.</p>

  <a class="hero" href="jogo/">
    <b>Jogar a versão ${esc(atual.versao)}</b>
    <p>${esc(atual.resumo)} Funciona no computador e no celular, sem instalação.</p>
    <span>Abrir o jogo →</span>
  </a>

  <h2>Documentação da versão atual</h2>
  <div class="cards">
      ${docsAtuais}
  </div>

  <h2>Todas as versões</h2>
  <section>${linhas}
  </section>

  <p class="meta">O endereço <a href="jogo/">jogo/</a> abre sempre a versão mais recente. Histórico de mudanças no <a href="https://github.com/cleoquintiliano/roadbit/blob/main/CHANGELOG.md">CHANGELOG</a> · Código no <a href="https://github.com/cleoquintiliano/roadbit">GitHub</a>.<br>
  Autor: Cléo Quintiliano Fernandes de Brito · Mestrado Profissional em Ensino de Computação (ProfComp/UENP), 2026.<br>
  Código sob licença MIT; textos e apresentação sob <a href="https://creativecommons.org/licenses/by/4.0/deed.pt-br">CC BY 4.0</a>.</p>
</main>
</body>
</html>
`;
fs.writeFileSync(path.join(raiz, 'index.html'), html);
console.log('index.html gerado com ' + V.versoes.length + ' versões.');
