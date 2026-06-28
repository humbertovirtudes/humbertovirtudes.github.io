// Animate a theme change with the View Transitions API.
//
// Direction matters:
//  - 'out' (default, and dark -> light): the NEW theme expands from the button
//    outward as a growing circle.
//  - 'in' (light -> dark): the OLD theme (light) collapses inward, shrinking
//    into the button to reveal the new dark theme underneath.
//
// Driven by the Web Animations API so we can compute a pixel radius to the
// farthest viewport corner and target the correct snapshot per direction.
// A data attribute on <html> flips the pseudo-element stacking order so the
// animated snapshot is always on top.

type Point = {x: number; y: number};
type Direction = 'in' | 'out';

const DURATION = 800; // ms

export function runThemeTransition(
  origin: Point | null,
  apply: () => void,
  opts?: {direction?: Direction},
): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  };

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || prefersReduced) {
    apply();
    return;
  }

  const inward = opts?.direction === 'in';
  const x = origin ? origin.x : window.innerWidth / 2;
  const y = origin ? origin.y : 0;

  // Radius from the origin to the farthest corner — circle fully covers viewport.
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Stacking: 'in' puts the OLD snapshot on top (so it can shrink away);
  // 'out' puts the NEW snapshot on top (so it can grow in).
  document.documentElement.setAttribute('data-vt-dir', inward ? 'in' : 'out');

  const transition = doc.startViewTransition(apply);

  transition.ready
    .then(() => {
      const from = inward ? `${endRadius}px` : '0px';
      const to = inward ? '0px' : `${endRadius}px`;
      const pseudo = inward
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)';

      document.documentElement.animate(
        {
          clipPath: [
            `circle(${from} at ${x}px ${y}px)`,
            `circle(${to} at ${x}px ${y}px)`,
          ],
        },
        {
          duration: DURATION,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: pseudo,
          fill: 'forwards',
        },
      );
    })
    .catch(() => {});

  transition.finished
    .finally(() => document.documentElement.removeAttribute('data-vt-dir'))
    .catch(() => {});
}

export function pointFromEvent(e: {
  currentTarget: EventTarget | null;
}): Point | null {
  const el = e.currentTarget as HTMLElement | null;
  if (!el || typeof el.getBoundingClientRect !== 'function') return null;
  const r = el.getBoundingClientRect();
  return {x: r.left + r.width / 2, y: r.top + r.height / 2};
}
