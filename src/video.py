"""Grava o vídeo de demonstração do RoadBit a partir do próprio jogo (Playwright + ffmpeg).

Roteiro: tela inicial, tour do mapa, tour da missão, Rastrear, Prever, Depurar, Explicar, reprodução e mapa.
As legendas são desenhadas na página durante a gravação, num canto que não cobre o código nem os controles.
Uso: python3 src/video.py [caminho do jogo] [arquivo .mp4]
"""
import sys, pathlib, shutil, subprocess, tempfile
from playwright.sync_api import sync_playwright

JOGO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'jogo/index.html').resolve().as_uri()
SAIDA = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else 'docs/video/roadbit-demonstracao.mp4')
W, H = 1280, 720

LEGENDA_JS = """(txt) => {
  let el = document.getElementById('legendaVideo');
  if (!el) {
    el = document.createElement('div'); el.id = 'legendaVideo';
    Object.assign(el.style, { position: 'fixed', left: '24px', bottom: '128px', zIndex: 99, maxWidth: '420px',
      background: 'rgba(31,42,68,.92)', color: '#fff', font: '700 22px/1.3 Ubuntu, sans-serif', padding: '14px 20px',
      borderRadius: '18px', boxShadow: '0 10px 30px rgba(31,42,68,.3)', transition: 'opacity .3s', pointerEvents: 'none' });
    document.body.appendChild(el);
  }
  el.style.opacity = txt ? '1' : '0'; if (txt) el.textContent = txt;
}"""


def main():
    tmp = tempfile.mkdtemp()
    with sync_playwright() as p:
        nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        ctx = nav.new_context(viewport={'width': W, 'height': H}, record_video_dir=tmp, record_video_size={'width': W, 'height': H})
        pg = ctx.new_page()
        pg.goto(JOGO); pg.evaluate('localStorage.clear()'); pg.reload(); pg.wait_for_timeout(300)
        leg = lambda t: pg.evaluate(LEGENDA_JS, t)
        espera = pg.wait_for_timeout

        # 1. abertura
        leg('RoadBit: você é o computador. Leia o código e leve o mensageiro pela cidade.'); espera(4200)
        # 2. mapa e tour do mapa
        leg('Na primeira vez, um tour apresenta cada parte da tela.'); espera(2400)
        leg(''); pg.click('#playBtn'); espera(2600)  # durante o tour, o próprio cartão explica
        pg.click('#tourNext'); espera(2600); pg.click('#tourNext'); espera(2000)
        pg.keyboard.press('Escape'); leg('16 marcos num mapa único: cada um é um conceito de programação.'); espera(3200)
        # 3. tour da missão
        leg(''); pg.click('#contBtn'); espera(2600)
        pg.click('#tourNext'); espera(2400); pg.click('#tourNext'); espera(2400)
        pg.keyboard.press('Escape'); espera(500)
        leg('Cada marco começa com o conceito, um exemplo e a habilidade da BNCC.'); espera(3600)
        pg.click('#ccClose'); espera(300)
        # 4. Rastrear com foco linha a linha
        pg.evaluate("() => { window.RoadBit.P.sweep = true; window.RoadBit.P.seen[2] = 1; window.RoadBit.openMission('2-2'); }"); espera(300)
        leg('Rastrear: execute a linha destacada. O contador mostra a volta do laço.')
        teclas = pg.evaluate("() => window.RoadBit.G().steps.filter(s => s.kind === 'in').map(s => s.key)")
        mapa = {'R': 'ArrowRight', 'L': 'ArrowLeft', 'U': 'ArrowUp', 'D': 'ArrowDown', 'E': 'Enter'}
        espera(1500)
        for i, k in enumerate(teclas):
            pg.wait_for_function("() => !window.RoadBit.G().sweeping", timeout=10000)
            if i == 2:  # um erro de propósito, para mostrar o retorno em camadas
                errada = 'ArrowLeft' if k != 'L' else 'ArrowRight'
                pg.keyboard.press(errada); leg('Errou? Um fantasma mostra para onde você foi, e você continua dali.'); espera(2400)
                leg('Rastrear: execute a linha destacada. O contador mostra a volta do laço.')
            if i == len(teclas) - 1: leg('Cada entrega acende uma casa. As estrelas aparecem só no fim.')
            pg.keyboard.press(mapa[k]); espera(650)
        espera(3200)
        # 5. Prever
        pg.evaluate("() => { document.getElementById('endOv').classList.remove('on'); window.RoadBit.P.tours.prever = 1; window.RoadBit.P.seen[3] = 1; window.RoadBit.openMission('3-4'); }")
        leg('Prever: leia o código sem executar e toque onde o mensageiro vai parar.'); espera(3200)
        pg.evaluate("() => { const G = window.RoadBit.G(), f = G.tr.final; G.cells[f.x + ',' + f.y].click(); }"); espera(900)
        pg.click('#actBtn'); leg('O computador executa e marca o caminho percorrido.')
        pg.wait_for_function("() => document.getElementById('endOv').classList.contains('on')", timeout=20000); espera(1600)
        # 6. Depurar
        pg.evaluate("() => { document.getElementById('endOv').classList.remove('on'); window.RoadBit.P.tours.depurar = 1; window.RoadBit.P.seen[2] = 1; window.RoadBit.openMission('2-6'); }")
        leg('Depurar: o código tem um erro. Toque no valor laranja e conserte.'); espera(3000)
        pg.click('#actBtn'); leg('Executar mostra onde o mensageiro para.')
        pg.wait_for_function("() => !window.RoadBit.G().busy", timeout=20000); espera(1400)
        alvo = pg.evaluate("""() => { const E = window.RoadBitMotor, G = window.RoadBit.G(); const a = E.coletar(G.ast), c = E.coletar(G.m.certo);
          const i = a.nums.findIndex((n, k) => n.v !== c.nums[k].v); return i < 0 ? null : { id: a.nums[i].id, de: a.nums[i].v, para: c.nums[i].v }; }""")
        if alvo:
            pg.click('[data-nid="' + alvo['id'] + '"]'); espera(700)
            botao = '#popUp' if alvo['para'] > alvo['de'] else '#popDown'
            for _ in range(abs(alvo['para'] - alvo['de'])):
                pg.click(botao); espera(450)
            leg('Ao mudar um valor, o mensageiro volta ao início.'); espera(1600)
            pg.mouse.click(W - 40, 300); espera(300)
            pg.click('#actBtn'); pg.wait_for_function("() => document.getElementById('endOv').classList.contains('on')", timeout=20000); espera(1600)
        # 7. Explicar e reprodução
        pg.evaluate("() => { document.getElementById('endOv').classList.remove('on'); window.RoadBit.P.tours.explicar = 1; window.RoadBit.P.seen[2] = 1; window.RoadBit.openMission('2-11'); }")
        leg('Explicar: escolha a frase que diz o que o código faz.'); espera(3400)
        pg.click('.opt[data-ok="1"]'); pg.wait_for_function("() => document.getElementById('endOv').classList.contains('on')", timeout=10000); espera(1200)
        pg.click('#endReplay'); leg('Reproduzir: reveja a execução passo a passo, sem estrelas.'); espera(800)
        for _ in range(7):
            pg.click('#tpNext'); espera(420)
        espera(800)
        # 8. fechamento
        pg.evaluate("() => window.RoadBit.goMap()"); leg('192 missões, 12 marcos da BNCC Computação e 4 bônus.'); espera(3200)
        leg('Grátis, no navegador, sem instalação: cleoquintiliano.github.io/roadbit'); espera(4200)
        ctx.close(); nav.close()
    webm = next(pathlib.Path(tmp).glob('*.webm'))
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(webm), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', str(SAIDA)], check=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '6', '-i', str(SAIDA), '-frames:v', '1', str(SAIDA.with_suffix('.png'))], check=True)
    shutil.rmtree(tmp, ignore_errors=True)
    print('Vídeo:', SAIDA)


main()
