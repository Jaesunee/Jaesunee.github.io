// "JC" drawn on a Minecraft-style 5x7 glyph grid with a two-column gap (room for the drop shadow).
const J = ['....#', '....#', '....#', '....#', '#...#', '#...#', '.###.'];
const C = ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'];

export const LOGO_WIDTH = 12;
export const LOGO_HEIGHT = 7;

export const LOGO_CELLS = [
    ...J.flatMap((row, y) => [...row].map((c, x) => (c === '#' ? { x, y } : null))),
    ...C.flatMap((row, y) => [...row].map((c, x) => (c === '#' ? { x: x + 7, y } : null))),
]
    .filter(Boolean)
    // Build order: bottom row first, left to right — like placing blocks.
    .sort((a, b) => b.y - a.y || a.x - b.x);
