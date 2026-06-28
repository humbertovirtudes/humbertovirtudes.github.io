import {useEffect, useState, useCallback} from 'react';

export type Route =
  | {name: 'home'}
  | {name: 'cv'}
  | {name: 'projects'}
  | {name: 'blog'}
  | {name: 'post'; slug: string};

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

export function useRoute(): [Route, (to: string) => void] {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
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

  return [route, navigate];
}
