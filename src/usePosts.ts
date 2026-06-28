import {useSyncExternalStore} from 'react';
import {getPosts, subscribe, type Post} from './data/blog';

// Cache the snapshot so useSyncExternalStore sees a stable reference between
// renders (it only changes when the store emits).
let cache: Post[] = getPosts();
let dirty = true;

subscribe(() => {
  dirty = true;
});

function snapshot(): Post[] {
  if (dirty) {
    cache = getPosts();
    dirty = false;
  }
  return cache;
}

export function usePosts(): Post[] {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
