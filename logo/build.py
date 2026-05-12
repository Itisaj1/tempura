"""Build Panko Studio wordmark SVGs (text outlined as paths) and PNG renders.

Outputs three SVG variants and a matrix of PNGs at common sizes.
Run from the project root:  python3 logo/build.py
"""

from __future__ import annotations

import os
import subprocess
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent
FONT_PATH = ROOT / "fonts" / "Outfit-Variable.ttf"
SVG_DIR = ROOT / "svg"
PNG_DIR = ROOT / "png"

TEXT = "panko studio."
INK = "#0F172A"
CREAM = "#F7F4EF"
ACCENT = "#0081A7"
WHITE = "#FFFFFF"

PNG_WIDTHS = [256, 512, 1024, 2048]


def build_svgs() -> tuple[int, int]:
    font = TTFont(str(FONT_PATH))
    font_bold = instantiateVariableFont(font, {"wght": 700})

    cmap = font_bold.getBestCmap()
    glyph_set = font_bold.getGlyphSet()
    units_per_em = font_bold["head"].unitsPerEm
    ascent = font_bold["hhea"].ascent
    descent = font_bold["hhea"].descent

    tracking = -0.02 * units_per_em
    glyphs = []
    cursor = 0.0
    for char in TEXT:
        glyph_name = cmap.get(ord(char))
        if glyph_name is None:
            continue
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        glyphs.append(
            {
                "char": char,
                "x": cursor,
                "path": pen.getCommands(),
                "advance": glyph.width,
            }
        )
        cursor += glyph.width + tracking
    text_width = cursor - tracking
    text_height = ascent - descent

    pad_x = int(units_per_em * 0.32)
    pad_y = int(units_per_em * 0.46)
    canvas_w = int(text_width + 2 * pad_x)
    canvas_h = int(text_height + 2 * pad_y)

    ox = pad_x
    oy = pad_y + ascent

    def render(bg: str | None, text_color: str, period_color: str) -> str:
        bg_layer = ""
        if bg is not None:
            bg_layer = f'  <rect width="{canvas_w}" height="{canvas_h}" fill="{bg}"/>\n'
        path_nodes = []
        for g in glyphs:
            color = period_color if g["char"] == "." else text_color
            path_nodes.append(
                f'    <g transform="translate({g["x"]}, 0)">'
                f'<path fill="{color}" d="{g["path"]}"/></g>'
            )
        paths = "\n".join(path_nodes)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 0 {canvas_w} {canvas_h}" '
            f'role="img" aria-label="panko studio">\n'
            f"{bg_layer}"
            f'  <g transform="translate({ox}, {oy}) scale(1, -1)">\n'
            f"{paths}\n"
            f"  </g>\n"
            f"</svg>\n"
        )

    SVG_DIR.mkdir(parents=True, exist_ok=True)
    (SVG_DIR / "panko-studio-transparent.svg").write_text(
        render(None, INK, ACCENT)
    )
    (SVG_DIR / "panko-studio-on-white.svg").write_text(
        render(WHITE, INK, ACCENT)
    )
    (SVG_DIR / "panko-studio-on-ink.svg").write_text(
        render(INK, CREAM, ACCENT)
    )

    return canvas_w, canvas_h


def build_pngs(canvas_w: int, canvas_h: int) -> None:
    PNG_DIR.mkdir(parents=True, exist_ok=True)
    aspect = canvas_h / canvas_w
    for svg in sorted(SVG_DIR.glob("*.svg")):
        stem = svg.stem
        for w in PNG_WIDTHS:
            h = round(w * aspect)
            out = PNG_DIR / f"{stem}-{w}x{h}.png"
            cmd = [
                "magick",
                "-background", "none",
                "-density", "600",
                str(svg),
                "-resize", f"{w}x{h}",
                str(out),
            ]
            subprocess.run(cmd, check=True)
            print(f"  ✓ {out.name}")


def main() -> None:
    if not FONT_PATH.exists():
        raise SystemExit(f"missing font: {FONT_PATH}")
    canvas_w, canvas_h = build_svgs()
    print(f"SVG canvas: {canvas_w} × {canvas_h}  (aspect {canvas_w/canvas_h:.2f}:1)")
    print("Rendering PNGs…")
    build_pngs(canvas_w, canvas_h)
    print("Done.")


if __name__ == "__main__":
    main()
