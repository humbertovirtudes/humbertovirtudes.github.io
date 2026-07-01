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
//
// Performance notes (learned the hard way debugging a sibling app):
//  - Animating clip-path circle() re-rasterizes the mask each frame. Keeping the
//    body opaque means any GPU tile seam falls on a uniform color (no shimmer),
//    and we only ever animate ONE snapshot — the other is left completely
//    static (animation:none in CSS) so the compositor does no work on it.
//  - We snap the origin to whole device pixels so the clip circle rasterizes on
//    a stable pixel grid frame-to-frame (avoids sub-pixel edge stepping).
//  - matchMedia is queried once and cached, not per toggle.
//
// The toggle is NEVER disabled. If a click arrives while a transition is still
// running, we skip the in-flight one and apply the new state immediately.

type Point = {x: number; y: number};
type Direction = 'in' | 'out';

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
};

const DURATION = 800; // ms
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

let active: ViewTransition | null = null;
let activeAnim: Animation | null = null;

// Cache the reduced-motion query once (it's global and rarely changes).
const reducedMotionMQ =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

export function runThemeTransition(
  origin: Point | null,
  apply: () => void,
  opts?: {direction?: Direction},
): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => ViewTransition;
  };

  if (!doc.startViewTransition || reducedMotionMQ?.matches) {
    apply();
    return;
  }

  // A transition is already in flight — don't block the click. Cancel the
  // running animation and skip the old transition so the new one starts clean.
  if (active) {
    activeAnim?.cancel();
    active.skipTransition?.();
    active = null;
    activeAnim = null;
  }

  const inward = opts?.direction === 'in';
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Snap the origin to whole device pixels so the clip circle rasterizes on a
  // stable grid each frame (reduces sub-pixel edge stepping / repaint cost).
  const dpr = window.devicePixelRatio || 1;
  const snap = (v: number) => Math.round(v * dpr) / dpr;
  const x = snap(origin ? origin.x : w / 2);
  const y = snap(origin ? origin.y : 0);

  // Radius to the farthest corner — circle fully covers the viewport.
  const endRadius = Math.ceil(
    Math.hypot(Math.max(x, w - x), Math.max(y, h - y)),
  );

  // Stacking: 'in' puts the OLD snapshot on top (so it can shrink away);
  // 'out' puts the NEW snapshot on top (so it can grow in).
  const rootEl = document.documentElement;
  rootEl.setAttribute('data-vt-dir', inward ? 'in' : 'out');

  const transition = doc.startViewTransition(apply);
  active = transition;

  transition.ready
    .then(() => {
      const from = inward ? `${endRadius}px` : '0px';
      const to = inward ? '0px' : `${endRadius}px`;
      const pseudo = inward
        ? '::view-transition-old(root)'
        : '::view-transition-new(root)';

      activeAnim = rootEl.animate(
        {
          clipPath: [
            `circle(${from} at ${x}px ${y}px)`,
            `circle(${to} at ${x}px ${y}px)`,
          ],
        },
        {
          duration: DURATION,
          easing: EASING,
          pseudoElement: pseudo,
          fill: 'forwards',
        },
      );
    })
    .catch(() => {});

  transition.finished
    .finally(() => {
      if (active === transition) {
        active = null;
        activeAnim = null;
        rootEl.removeAttribute('data-vt-dir');
      }
    })
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
