// Animate a state change with the View Transitions API, revealing the new
// state with a circular clip-path that emanates from a given point (the toggle
// button). Falls back to an instant change where the API is unsupported.

type Point = {x: number; y: number};

export function runThemeTransition(origin: Point | null, apply: () => void): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {finished: Promise<void>};
  };

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || prefersReduced) {
    apply();
    return;
  }

  // Set the ripple origin (in % of viewport) for the keyframe to read.
  if (origin) {
    const x = (origin.x / window.innerWidth) * 100;
    const y = (origin.y / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--hv-ripple-x', `${x}%`);
    document.documentElement.style.setProperty('--hv-ripple-y', `${y}%`);
  } else {
    document.documentElement.style.setProperty('--hv-ripple-x', '50%');
    document.documentElement.style.setProperty('--hv-ripple-y', '0%');
  }

  doc.startViewTransition(apply);
}

export function pointFromEvent(
  e: {currentTarget: EventTarget | null},
): Point | null {
  const el = e.currentTarget as HTMLElement | null;
  if (!el || typeof el.getBoundingClientRect !== 'function') return null;
  const r = el.getBoundingClientRect();
  return {x: r.left + r.width / 2, y: r.top + r.height / 2};
}
