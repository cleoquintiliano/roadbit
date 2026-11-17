"""Teste automático da interface do RoadBit (Playwright).

Para cada tamanho de tela, abre todas as missões e confere:
1. nenhum erro de JavaScript;
2. tudo o que o estudante precisa ler cabe na tela, sem rolagem nem zoom;
3. a fonte do código não fica abaixo de 14 px.
Também resolve as missões de rastrear, prever, depurar e explicar até o fim.
Uso: python3 testes/interface.py [caminho do index.html]
"""
import sys, json, pathlib
from playwright.sync_api import sync_playwright

ARQ = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'jogo/index.html').resolve()
TELAS = {'celular 390x844': (390, 844), 'celular pequeno 360x740': (360, 740), 'tablet 768x1024': (768, 1024), 'notebook 1366x768': (1366, 768), 'monitor 1920x1080': (1920, 1080)}

CONFERE = """() => {
  const W = innerWidth, H = innerHeight, prob = [];
  const ver = (el, nome) => { if (!el || el.offsetParent === null) return; const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.bottom > H + 1 || r.right > W + 1 || r.top < -1 || r.left < -1) prob.push(nome + ' fora da tela (' + Math.round(r.left) + ',' + Math.round(r.top) + ',' + Math.round(r.right) + ',' + Math.round(r.bottom) + ')'); };
  document.querySelectorAll('#code .line').forEach((l, i) => ver(l.querySelector('.lc'), 'linha ' + (i + 1)));
  ['banner', 'board', 'vars', 'out', 'pv', 'controls', 'mesaP', 'top'].forEach(id => ver(document.getElementById(id), id));
  document.querySelectorAll('.opt').forEach((o, i) => ver(o, 'opção ' + (i + 1)));
  const f = parseFloat(getComputedStyle(document.getElementById('code')).fontSize);
  if (f < 14) prob.push('fonte do código ' + f + 'px');
  const cs = window.RoadBit.G().cs; if (cs !== undefined && cs < 26) prob.push('célula do mapa ' + cs + 'px');
  if (document.documentElement.scrollHeight > H + 1) prob.push('página rola (' + document.documentElement.scrollHeight + ')');
  return { prob, f, cs };
}"""

def main():
    falhas, total = 0, 0
    with sync_playwright() as p:
        nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        for nome, (w, h) in TELAS.items():
            pg = nav.new_page(viewport={'width': w, 'height': h})
            erros = []
            pg.on('pageerror', lambda e: erros.append(str(e)))
            pg.goto(ARQ.as_uri() + '?tudo')
            pg.evaluate("() => { localStorage.clear(); }")
            pg.reload()
            ids = pg.evaluate("() => window.RoadBit.MISSIONS.map(m => m.id)")
            fontes = []
            for mid in ids:
                pg.evaluate("id => { window.RoadBit.P.sweep = false; window.RoadBit.openMission(id); }", mid)
                pg.wait_for_timeout(30)
                r = pg.evaluate(CONFERE)
                fontes.append(r['f'])
                total += 1
                if r['prob']:
                    falhas += 1
                    print(f'[{nome}] {mid}: ' + '; '.join(r['prob']))
            print(f'[{nome}] fonte do código entre {min(fontes)} e {max(fontes)} px')
            if erros:
                falhas += len(erros); print(f'[{nome}] ERROS JS:', erros[:5])
            pg.close()
        # resolve missões de ponta a ponta numa tela de notebook
        pg = nav.new_page(viewport={'width': 1366, 'height': 768})
        erros = []
        pg.on('pageerror', lambda e: erros.append(str(e)))
        pg.goto(ARQ.as_uri() + '?tudo')
        ids = pg.evaluate("() => window.RoadBit.MISSIONS.map(m => m.id)")
        resolvidas = 0
        for mid in ids:
            pg.evaluate("id => { window.RoadBit.P.sweep = false; window.RoadBit.P.stars = {}; window.RoadBit.P.plays = {}; window.RoadBit.openMission(id); }", mid)
            pg.wait_for_timeout(20)
            modo = pg.evaluate("() => window.RoadBit.G().mode")
            if modo == 'rastrear':
                teclas = pg.evaluate("() => window.RoadBit.G().steps.filter(s => s.kind === 'in').map(s => s.key)")
                mapa = {'R': 'ArrowRight', 'L': 'ArrowLeft', 'U': 'ArrowUp', 'D': 'ArrowDown', 'E': 'Enter'}
                for k in teclas:
                    pg.keyboard.press(mapa[k]); pg.wait_for_timeout(5)
                pg.wait_for_timeout(1000)
            elif modo == 'prever':
                pg.evaluate("""() => { const G = window.RoadBit.G(); const f = G.tr.final;
                  if (G.m.soVar) { G.pvVal = f.vars[G.m.predictVar]; } else { G.pick = [f.x, f.y]; }
                  document.getElementById('actBtn').disabled = false; document.getElementById('actBtn').click(); }""")
                pg.wait_for_timeout(60 * 1 + 120 * pg.evaluate("() => window.RoadBit.G().steps.length") * 2 + 700)
            elif modo == 'depurar':
                pg.evaluate("""() => { const E = window.RoadBitMotor, G = window.RoadBit.G();
                  const a = E.coletar(G.ast), c = E.coletar(G.m.certo);
                  a.nums.forEach((n, i) => n.v = c.nums[i].v); a.moves.forEach((n, i) => n.d = c.moves[i].d);
                  document.getElementById('actBtn').click(); }""")
                pg.wait_for_timeout(70 * 2.2 * pg.evaluate("() => window.RoadBitMotor.simulate(window.RoadBit.G().m, window.RoadBit.G().ast).steps.length") + 800)
            elif modo == 'explicar':
                pg.click('.opt[data-ok="1"]'); pg.wait_for_timeout(900)
            fim = pg.evaluate("() => document.getElementById('endOv').classList.contains('on') && !!window.RoadBit.P.stars[window.RoadBit.G().m.id]")
            if fim: resolvidas += 1
            else: falhas += 1; print(f'[resolver] {mid} ({modo}) não terminou')
            pg.evaluate("() => document.getElementById('endOv').classList.remove('on')")
        print(f'[resolver] {resolvidas} de {len(ids)} missões resolvidas até o fim')
        if erros: falhas += len(erros); print('[resolver] ERROS JS:', erros[:5])
        nav.close()
    print(f'{total} telas de missão conferidas. ' + ('Tudo certo.' if not falhas else f'{falhas} problema(s).'))
    sys.exit(1 if falhas else 0)

main()
