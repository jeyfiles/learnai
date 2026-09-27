"""Turn short text into SVG path data using the Oswald variable font.
Used once to make the logo, favicon and OG image, so no font is needed to draw them."""
import sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

def text_path(text, font_file, wght, size):
    f = TTFont(font_file)
    f = instantiateVariableFont(f, {"wght": wght})
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f["head"].unitsPerEm
    s = size / upm; x = 0; pen = SVGPathPen(gs)
    for ch in text:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, x, 0))
        gs[g].draw(tp); x += gs[g].width * s
    return pen.getCommands(), x

if __name__ == "__main__":
    spec = json.loads(sys.argv[1]); out = {}
    for key, (text, font, wght, size) in spec.items():
        d, w = text_path(text, font, wght, size); out[key] = {"d": d, "w": round(w, 2)}
    print(json.dumps(out))
