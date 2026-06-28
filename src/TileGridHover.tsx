import {useMemo, useRef, useState, type ReactNode, type CSSProperties} from 'react';

// Port of EPS EPSAnimatedTileGridBackground. Renders an animated tile grid that
// appears on hover: tiles flicker on an 8s loop with scattered delays, grid
// lines stagger in from the cursor's entry corner, and a soft glow washes the
// top. Wrap any card content with <TileGridHover> to get the effect.

const ANIMATION_DELAYS = ['-0s', '-1s', '-2s', '-3s', '-4s', '-5s', '-6s', '-7s'];
const SCATTER_PATTERN = [0, 5, 2, 7, 4, 1, 6, 3];
const TILE = 100; // percent space
const LINE_STAGGER_MS = 80;

function scatterIndex(row: number, col: number, total: number): number {
  const pattern = row % 2 === 0 ? SCATTER_PATTERN : [...SCATTER_PATTERN].reverse();
  const base = pattern[col % pattern.length];
  const rowOffset = (row * 3) % total;
  return (base + rowOffset) % total;
}

type Entry = {horizontal: 'left' | 'right'; vertical: 'top' | 'bottom'};

export function TileGridHover({
  children,
  columns = 6,
  rows = 4,
  radius = 14,
  color,
  surface = false,
  padding = 0,
  coverage = 100,
}: {
  children: ReactNode;
  columns?: number;
  rows?: number;
  radius?: number;
  color?: string; // CSS color or var(); defaults to themed blue
  surface?: boolean; // render a themed card surface (bg + border)
  padding?: number; // inner padding when used as a card shell
  coverage?: number; // % of height the grid covers (top-down); <100 fades out the bottom (EPS FADE_START_RATIO=0.4)
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [entry, setEntry] = useState<Entry>({horizontal: 'left', vertical: 'top'});

  const tiles = useMemo(() => {
    const list: {left: string; top: string; delay: string}[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        list.push({
          left: `${(c / columns) * TILE}%`,
          top: `${(r / rows) * TILE}%`,
          delay: ANIMATION_DELAYS[scatterIndex(r, c, ANIMATION_DELAYS.length)],
        });
      }
    }
    return list;
  }, [rows, columns]);

  const hLines = useMemo(
    () => Array.from({length: Math.max(0, rows - 1)}, (_, i) => ({i, pos: `${((i + 1) / rows) * TILE}%`})),
    [rows],
  );
  const vLines = useMemo(
    () => Array.from({length: Math.max(0, columns - 1)}, (_, i) => ({i, pos: `${((i + 1) / columns) * TILE}%`})),
    [columns],
  );

  const tileW = `${TILE / columns}%`;
  const tileH = `${TILE / rows}%`;

  // EPS fade mask: solid to coverage*0.4%, transparent by coverage%.
  const fadeMask =
    coverage < 100
      ? (`linear-gradient(to bottom, #000 0%, #000 ${coverage * 0.4}%, transparent ${coverage}%)`)
      : undefined;
  const maskStyle: CSSProperties | undefined = fadeMask
    ? ({WebkitMaskImage: fadeMask, maskImage: fadeMask} as CSSProperties)
    : undefined;

  function onEnter(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setEntry({
        horizontal: x < rect.width - x ? 'left' : 'right',
        vertical: y < rect.height - y ? 'top' : 'bottom',
      });
    }
    setActive(true);
  }

  const entryRight = entry.horizontal === 'right';
  const entryBottom = entry.vertical === 'bottom';

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={() => setActive(false)}
      style={{
        position: 'relative',
        borderRadius: radius,
        height: '100%',
        overflow: 'hidden',
        ...(surface
          ? {
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
            }
          : null),
      }}
    >
      <div
        className={`hv-tilegrid ${active ? 'is-active' : ''}`}
        style={color ? ({color} as CSSProperties) : undefined}
        aria-hidden
      >
        {/* glow */}
        <div className="hv-tg-glow" />
        {/* tiles */}
        <div className="hv-tg-tiles" style={maskStyle}>
          {tiles.map((t, i) => (
            <div
              key={i}
              className="hv-tg-tile"
              style={{left: t.left, top: t.top, width: tileW, height: tileH, animationDelay: t.delay}}
            />
          ))}
        </div>
        {/* grid lines */}
        <div className="hv-tg-lines" style={maskStyle}>
          {hLines.map((l) => {
            const idx = entryBottom ? hLines.length - 1 - l.i : l.i;
            return (
              <div
                key={`h${l.i}`}
                className="hv-tg-hline"
                style={{
                  top: l.pos,
                  transformOrigin: entryRight ? 'right' : 'left',
                  transitionDelay: active ? `${idx * LINE_STAGGER_MS}ms` : '0s',
                }}
              />
            );
          })}
          {vLines.map((l) => {
            const idx = entryRight ? vLines.length - 1 - l.i : l.i;
            return (
              <div
                key={`v${l.i}`}
                className="hv-tg-vline"
                style={{
                  left: l.pos,
                  transformOrigin: entryBottom ? 'bottom' : 'top',
                  transitionDelay: active ? `${idx * LINE_STAGGER_MS}ms` : '0s',
                }}
              />
            );
          })}
        </div>
      </div>
      {/* content sits above the background */}
      <div style={{position: 'relative', zIndex: 1, height: '100%', padding: padding || undefined, boxSizing: 'border-box'}}>
        {children}
      </div>
    </div>
  );
}
