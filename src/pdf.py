"""Gera um PDF (A4) para cada arquivo .html de uma pasta, usando o Chrome (Playwright).

Uso: python3 src/pdf.py docs/avaliacao [outra pasta ...]
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = nav.new_page()
    for pasta in sys.argv[1:] or ['docs/avaliacao']:
        for html in sorted(pathlib.Path(pasta).glob('*.html')):
            pg.goto(html.resolve().as_uri())
            pg.wait_for_load_state('networkidle')
            pdf = html.with_suffix('.pdf')
            pg.pdf(path=str(pdf), format='A4', print_background=True, prefer_css_page_size=True)
            print('PDF:', pdf)
    nav.close()
