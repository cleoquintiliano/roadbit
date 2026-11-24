"""Gera PDFs (A4) dos documentos para professores a partir do Markdown, com pandoc e Chrome.

Uso: python3 src/docs-pdf.py [pasta]   (padrão: docs)
Gera guia-do-professor.pdf, planos-de-aula.pdf e proposta-pedagogica.pdf na mesma pasta.
"""
import sys, pathlib, subprocess, tempfile, base64
from playwright.sync_api import sync_playwright

PASTA = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else 'docs')
DOCS = ['guia-do-professor', 'planos-de-aula', 'proposta-pedagogica']
FONTES = (pathlib.Path(__file__).parent / 'fonts.css').read_text(encoding='utf8')
CSS = FONTES + """
@page{size:A4;margin:16mm 16mm 18mm 16mm}
body{font-family:Ubuntu,Arial,sans-serif;color:#1F2A44;font-size:11pt;line-height:1.45;max-width:none;margin:0}
h1{font-size:20pt;color:#1D3F86;border-bottom:2px solid #16A8A6;padding-bottom:2mm;margin:0 0 3mm}
h2{font-size:14pt;color:#1D3F86;margin:7mm 0 2mm;break-after:avoid}
h3{font-size:12pt;margin:5mm 0 1.5mm;break-after:avoid}
p,li{orphans:3;widows:3}
table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:2mm 0 4mm;break-inside:auto}
tr{break-inside:avoid}
th,td{border:1px solid #CBD3DF;padding:1.3mm 2mm;text-align:left;vertical-align:top}
th{background:#EEF6F6}
code,pre{font-family:"Ubuntu Mono",monospace;font-size:10pt}
pre{background:#F4F6FA;padding:2mm 3mm;border-radius:2mm}
blockquote{margin:3mm 0;padding:2mm 4mm;background:#EEF6F6;border-left:3px solid #16A8A6}
a{color:#1D3F86}
ul.task-list{list-style:none;padding-left:2mm}
input[type=checkbox]{-webkit-appearance:none;appearance:none;display:inline-block;width:3.6mm;height:3.6mm;border:1.4px solid #1F2A44;border-radius:.8mm;margin:0 2.5mm -.6mm 0;vertical-align:baseline}
"""
with tempfile.TemporaryDirectory() as tmp, sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = nav.new_page()
    css = pathlib.Path(tmp) / 'estilo.css'; css.write_text(CSS, encoding='utf8')
    for nome in DOCS:
        md = PASTA / (nome + '.md')
        html = pathlib.Path(tmp) / (nome + '.html')
        # caixas de marcar como caractere, que aparece em qualquer impressão
        fonte = pathlib.Path(tmp) / (nome + '.md')
        fonte.write_text(md.read_text(encoding='utf8').replace('- [ ] ', '- □ '), encoding='utf8')
        subprocess.run(['pandoc', str(fonte), '-f', 'gfm', '-t', 'html5', '-s', '--embed-resources', '-c', str(css),
                        '--metadata', 'pagetitle=RoadBit', '-o', str(html)], check=True)
        pg.goto(html.as_uri()); pg.wait_for_load_state('networkidle')
        pdf = PASTA / (nome + '.pdf')
        pg.pdf(path=str(pdf), format='A4', print_background=True, prefer_css_page_size=True,
               display_header_footer=True, header_template='<span></span>',
               footer_template='<div style="font-family:Arial;font-size:8px;color:#55617A;width:100%;text-align:center">RoadBit · Cléo Quintiliano Fernandes de Brito · CC BY 4.0 · página <span class="pageNumber"></span> de <span class="totalPages"></span></div>')
        print('PDF:', pdf)
    nav.close()
