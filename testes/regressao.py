"""Testes de regressão da jogabilidade (Playwright).

Cada teste reproduz um problema encontrado no QA da v0.2 e confere o comportamento corrigido na v0.2.1.
Uso: python3 testes/regressao.py [caminho do index.html]
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

ARQ = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'jogo/index.html').resolve().as_uri()
falhas = []


def confere(nome, ok, detalhe=''):
    print(('ok    ' if ok else 'FALHA ') + nome + (' (' + str(detalhe) + ')' if detalhe and not ok else ''))
    if not ok:
        falhas.append(nome)


def nova_pagina(nav, w=1366, h=768, tudo=False, sufixo=None):
    pg = nav.new_page(viewport={'width': w, 'height': h})
    pg.on('pageerror', lambda e: falhas.append('erro JS: ' + str(e)))
    pg.goto(ARQ + (sufixo if sufixo is not None else ('?tudo' if tudo else '?semtour')))
    pg.evaluate('localStorage.clear()')
    pg.reload()
    return pg


def fecha_fim(pg):
    pg.evaluate("document.getElementById('endOv').classList.remove('on')")


with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = nova_pagina(nav)

    # 1. "Próxima" segue no marco atual, mesmo com missões pendentes no marco anterior
    r = pg.evaluate("""() => { const R = window.RoadBit; for (let i = 1; i <= 8; i++) R.P.stars['1-' + i] = 3;
      R.P.seen[2] = 1; R.openMission('2-1'); R.endMission(3); document.getElementById('endNext').click(); return R.G().m.id; }""")
    confere('1. Próxima depois da 2-1 abre a 2-2', r == '2-2', r)
    fecha_fim(pg)

    # 2. Explicar espelhado: a opção certa descreve o código que está na tela
    r = pg.evaluate("""() => { const R = window.RoadBit; R.P.stars['1-11'] = 3; R.P.plays['1-11'] = 1; R.P.seen[1] = 1; R.openMission('1-11');
      return { codigo: [...document.querySelectorAll('#code .lc')].map(l => l.textContent).join(' '), certa: document.querySelector('.opt[data-ok="1"]').textContent }; }""")
    confere('2. Explicar espelhado: código e opção certa falam de esquerda', 'esquerda()' in r['codigo'] and 'esquerda' in r['certa'], r)

    # 3. Prever: errar não volta sozinho; depois do 3º erro o aluno precisa tocar na resposta
    pg.evaluate("""() => { const R = window.RoadBit; delete R.P.stars['1-4']; R.P.plays['1-4'] = 0; R.openMission('1-4'); }""")
    def erra():
        pg.evaluate("""() => { const G = window.RoadBit.G(), f = G.tr.final;
          const k = Object.keys(G.cells).find(k => k !== f.x + ',' + f.y && !G.cells[k].classList.contains('w'));
          G.cells[k].click(); document.getElementById('actBtn').click(); }""")
        pg.wait_for_function("() => !window.RoadBit.G().busy", timeout=20000)
    erra()
    pg.wait_for_timeout(3000)
    r = pg.evaluate("() => ({ txt: document.getElementById('actBtn').textContent, trilha: document.querySelectorAll('.cell.trail').length })")
    confere('3a. Depois do erro aparece "Tentar de novo" e o caminho continua marcado', r['txt'] == 'Tentar de novo' and r['trilha'] > 0, r)
    pg.click('#actBtn')
    erra(); pg.click('#actBtn'); erra()
    r = pg.evaluate("() => ({ fim: document.getElementById('endOv').classList.contains('on'), resp: document.querySelectorAll('.cell.answer').length })")
    confere('3b. Depois do 3º erro a missão não termina e a resposta fica marcada', not r['fim'] and r['resp'] == 1, r)
    pg.evaluate("() => document.querySelector('.cell.answer').click()")
    pg.wait_for_timeout(700)
    r = pg.evaluate("() => ({ fim: document.getElementById('endOv').classList.contains('on'), st: window.RoadBit.P.stars['1-4'] })")
    confere('3c. Tocar na resposta conclui com 1 estrela', r['fim'] and r['st'] == 1, r)
    fecha_fim(pg)

    # 4. Tecla durante o foco só pula a animação
    r = pg.evaluate("""() => new Promise(res => { const R = window.RoadBit; R.P.sweep = true; R.P.seen[9] = 1; R.openMission('9-3');
      setTimeout(() => { const G = R.G(), sw = G.sweeping, alvo = G.steps.find((s, i) => i >= G.idx && s.kind === 'in');
        const errada = { R: 'ArrowLeft', L: 'ArrowRight', U: 'ArrowDown', D: 'ArrowUp', E: 'ArrowRight' }[alvo.key];
        document.dispatchEvent(new KeyboardEvent('keydown', { key: errada }));
        res({ sw, erros: R.G().errors, sweeping: R.G().sweeping }); }, 250); })""")
    confere('4. Tecla durante o foco não conta erro e encerra o foco', r['sw'] and r['erros'] == 0 and not r['sweeping'], r)

    # 5. Cartão de conceito: o foco só começa depois de fechar
    r = pg.evaluate("""() => new Promise(res => { const R = window.RoadBit; delete R.P.seen[5]; R.openMission('5-1');
      setTimeout(() => res({ cartao: document.getElementById('concOv').classList.contains('on'), idx: R.G().idx }), 600); })""")
    confere('5a. Com o cartão aberto o foco não anda', r['cartao'] and r['idx'] == 0, r)
    pg.keyboard.press('Escape')
    pg.wait_for_timeout(500)
    r = pg.evaluate("() => ({ cartao: document.getElementById('concOv').classList.contains('on'), idx: window.RoadBit.G().idx })")
    confere('5b. Ao fechar (Esc) o foco começa', not r['cartao'] and r['idx'] > 0, r)

    # 6 e 7. Dica do Prever mostra algo; 2 dicas por missão, renovadas na missão seguinte
    r = pg.evaluate("""() => { const R = window.RoadBit; R.P.seen[5] = 1; R.openMission('5-4'); const antes = document.getElementById('hintBtn').textContent;
      document.getElementById('hintBtn').click(); const vars = document.getElementById('vars').textContent;
      document.getElementById('hintBtn').click(); const fim = document.getElementById('hintBtn');
      return { antes, vars, depois: fim.textContent, desab: fim.disabled }; }""")
    confere('6. Dica do Prever mostra variáveis', len(r['vars']) > 0, r)
    confere('7a. Duas dicas por missão', r['antes'] == 'Dica 2' and r['depois'] == 'Dica 0' and r['desab'], r)
    r = pg.evaluate("() => { window.RoadBit.openMission('5-5'); return document.getElementById('hintBtn').textContent; }")
    confere('7b. Dicas renovam na missão seguinte', r == 'Dica 2', r)

    # 8. Esc fecha o cartão do marco
    pg.evaluate("() => { window.RoadBit.goMap(); document.querySelector('.mk').click(); }")
    pg.keyboard.press('Escape')
    confere('8. Esc fecha o cartão do marco', not pg.evaluate("document.getElementById('marcoOv').classList.contains('on')"))
    pg.close()

    # 9, 10 e 11. Celular: modo visível, mapa escondido sem movimento, mensagem sem teste de mesa
    pg = nova_pagina(nav, 390, 844, tudo=True)
    r = pg.evaluate("""() => { const R = window.RoadBit; R.openMission('12-11'); const m = document.querySelector('#mSub .mmode');
      return { modo: m && getComputedStyle(m).display !== 'none' ? m.textContent : '', mapa: getComputedStyle(document.getElementById('board')).display }; }""")
    confere('9. No celular o modo aparece no subtítulo', r['modo'].startswith('Explicar'), r)
    confere('10. Explicar sem movimento esconde o mapa', r['mapa'] == 'none', r)
    pg.evaluate("""() => { const R = window.RoadBit; R.openMission('5-4'); R.G().pvVal = 99; document.getElementById('actBtn').click(); }""")
    pg.wait_for_function("() => !window.RoadBit.G().busy", timeout=20000)
    r = pg.evaluate("() => document.getElementById('banner').textContent")
    confere('11. Sem teste de mesa na tela, a mensagem cita o quadro de variáveis', 'quadro de variáveis' in r and 'teste de mesa' not in r, r)
    pg.close()

    # 12. Tour guiado (v0.3.0): aparece na primeira vez, pode ser pulado e não repete
    pg = nova_pagina(nav, sufixo='')
    pg.click('#playBtn'); pg.wait_for_timeout(400)
    r = pg.evaluate("() => ({ on: document.getElementById('tourOv').classList.contains('on'), k: document.getElementById('tourK').textContent })")
    confere('12a. Tour do mapa abre ao entrar no mapa pela primeira vez', r['on'] and r['k'].startswith('Como jogar · 1 de'), r)
    pg.keyboard.press('Escape')
    pg.click('#contBtn'); pg.wait_for_timeout(300)
    n = pg.evaluate("() => document.getElementById('tourK').textContent")
    confere('12b. Tour da missão abre na primeira missão', pg.evaluate("document.getElementById('tourOv').classList.contains('on')"), n)
    idx = pg.evaluate("() => window.RoadBit.G().idx")
    for _ in range(12):
        if not pg.evaluate("document.getElementById('tourOv').classList.contains('on')"): break
        pg.click('#tourNext'); pg.wait_for_timeout(120)
    r = pg.evaluate("() => ({ tour: document.getElementById('tourOv').classList.contains('on'), conceito: document.getElementById('concOv').classList.contains('on') })")
    confere('12c. Ao terminar o tour, abre o cartão de conceito e o foco ainda não andou', not r['tour'] and r['conceito'] and idx == 0, r)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(200)
    pg.evaluate("() => window.RoadBit.openMission('1-1')"); pg.wait_for_timeout(200)
    confere('12d. O tour não repete na segunda vez', not pg.evaluate("document.getElementById('tourOv').classList.contains('on')"))
    pg.evaluate("() => { window.RoadBit.P.seen[1] = 1; window.RoadBit.openMission('1-4'); }"); pg.wait_for_timeout(200)
    confere('12e. O primeiro Prever mostra a dica do modo', pg.evaluate("document.getElementById('tourT').textContent") == 'Modo Prever')
    pg.close()
    for w, h in [(360, 740), (1366, 768)]:
        pg = nova_pagina(nav, w, h, sufixo='')
        fora = pg.evaluate("""() => new Promise(res => { const R = window.RoadBit, prob = [];
          const ve = nome => { const c = document.getElementById('tourCard').getBoundingClientRect(); if (c.left < 0 || c.top < 0 || c.right > innerWidth || c.bottom > innerHeight) prob.push(nome); };
          document.getElementById('playBtn').click();
          setTimeout(() => { while (R.tour()) { ve('mapa ' + document.getElementById('tourT').textContent); document.getElementById('tourNext').click(); }
            R.openMission('1-1'); while (R.tour()) { ve('missão ' + document.getElementById('tourT').textContent); document.getElementById('tourNext').click(); }
            res(prob); }, 300); })""")
        confere('12f. Cartão do tour dentro da tela em ' + str(w) + 'x' + str(h), not fora, fora)
        pg.close()
    nav.close()

print(('Tudo certo.' if not falhas else str(len(falhas)) + ' falha(s).'))
sys.exit(1 if falhas else 0)
