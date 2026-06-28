import {useCallback, useEffect, useRef, useState} from 'react';

export type Route =
  | {name: 'home'}
  | {name: 'cv'}
  | {name: 'projects'}
  | {name: 'blog'}
  | {name: 'post'; slug: string};

export type NavDirection = 'left' | 'right' | 'none';

// Order of the primary tabs. Used to decide swipe direction: navigating to a
// higher index swipes the new page in from the RIGHT; lower from the LEFT.
const ORDER: Record<Route['name'], number> = {
  home: 0,
  cv: 1,
  projects: 2,
  blog: 3,
  post: 3, // a post belongs to the Blog tab
};

function parse(hash: string): Route {
  const clean = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 0) return {name: 'home'};
  if (parts[0] === 'cv') return {name: 'cv'};
  if (parts[0] === 'projects') return {name: 'projects'};
  if (parts[0] === 'blog' && parts[1]) return {name: 'post', slug: parts[1]};
  if (parts[0] === 'blog') return {name: 'blog'};
  return {name: 'home'};
}

function directionBetween(prev: Route, next: Route): NavDirection {
  const a = ORDER[prev.name];
  const b = ORDER[next.name];
  if (b > a) return 'right'; // moving forward in the nav → enter from right
  if (b < a) return 'left'; // moving back → enter from left
  // same tab index. Blog -> post (and back) reads as a forward/back drill-in.
  if (prev.name === 'blog' && next.name === 'post') return 'right';
  if (prev.name === 'post' && next.name === 'blog') return 'left';
  return 'none';
}

export function useRoute(): [Route, (to: string) => void, NavDirection] {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  const [direction, setDirection] = useState<NavDirection>('none');
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      setDirection(directionBetween(routeRef.current, next));
      setRoute(next);
      window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = to.startsWith('#') ? to : `#${to}`;
    if (window.location.hash === next) {
      window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
    } else {
      window.location.hash = next;
    }
  }, []);

  return [route, navigate, direction];
}
