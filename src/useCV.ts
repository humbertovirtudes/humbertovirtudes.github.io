import {useSyncExternalStore} from 'react';
import {getCV, subscribe, type CV} from './data/cvStore';

// Reactive view of the editable CV. Re-renders consumers when the CV changes.
export function useCV(): CV {
  return useSyncExternalStore(subscribe, getCV, getCV);
}
