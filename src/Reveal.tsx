import {useEffect, useRef, type ReactNode, type CSSProperties} from 'react';

/**
 * Scroll-reveal wrapper. Adds `.hv-reveal` and toggles `.is-visible` when the
 * element enters the viewport. Children fade + rise in. SSR-safe (renders
 * visible if IntersectionObserver is unavailable).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  style,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      },
      {threshold: 0.12, rootMargin: '0px 0px -8% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      className={`hv-reveal ${className}`}
      style={{transitionDelay: `${delay}ms`, ...style}}
    >
      {children}
    </Comp>
  );
}
