"""Render the Open Graph image (1200x630 PNG) from the brand SVG and local fonts.
Run: python scripts/make-og.py   (needs: pip install playwright, and a Chromium)"""
from pathlib import Path
from playwright.sync_api import sync_playwright
root = Path(__file__).resolve().parent.parent
badge = (root / 'public/learnai-badge.svg').read_text()
import base64
def font(name):
    return 'data:font/woff2;base64,' + base64.b64encode((root / 'public/fonts' / name).read_bytes()).decode()
html = f"""<!doctype html><html><head><style>
@font-face{{font-family:Oswald;src:url({font('oswald-latin-var.woff2')});font-weight:200 700}}
@font-face{{font-family:Atk;src:url({font('atkinson-next-latin-var.woff2')});font-weight:200 800}}
body{{margin:0;width:1200px;height:630px;background:#FBFAF6;font-family:Atk;overflow:hidden;position:relative}}
.band{{position:absolute;inset:0 0 0 0;background:#6F907B}}
.ring{{position:absolute;right:-160px;top:-160px;width:520px;height:520px;border-radius:50%;border:60px solid rgba(255,255,255,.08)}}
.wrap{{position:absolute;inset:0;display:flex;align-items:center;gap:64px;padding:0 90px;color:#fff}}
.wrap svg{{width:300px;height:300px;flex:none;filter:drop-shadow(0 12px 30px rgba(0,0,0,.18))}}
.wrap svg circle{{fill:#3F6450}}
h1{{font-family:Oswald;font-weight:500;font-size:76px;line-height:1.02;margin:0 0 22px}}
h1 span{{background:linear-gradient(transparent 68%,#E3A13A 68%)}}
p{{font-size:32px;line-height:1.35;margin:0;max-width:680px}}
.small{{font-size:24px;margin-top:26px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}}
</style></head><body><div class="band"></div><div class="ring"></div>
<div class="wrap">{badge}<div><h1>Build real AI skills, <span>one task at a time</span></h1>
<p>Free daily practice for your career in AI.</p><p class="small">jeyinsights.com/learnai</p></div></div></body></html>"""
with sync_playwright() as pw:
    b = pw.chromium.launch(); p = b.new_page(viewport={'width': 1200, 'height': 630})
    p.set_content(html); p.evaluate('document.fonts.ready'); p.wait_for_timeout(300)
    p.screenshot(path=str(root / 'public/og-learnai.png'), type='png')
    b.close()
print('wrote public/og-learnai.png')
