import { useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal/es6/react';

/**
 * You really should not be using mutating objects but handle them if they are
 * @param {any} state
 * @param {(a: any, b: any) => boolean} [compareFn]
 *
 * @returns {any}
 */
export default function useMemoState(state: any, compareFn = deepEqual, warn = false): any {
  const [cachedState, setCachedState] = useState(state);
  useEffect(() => {
    if ((!state || !cachedState) && state !== cachedState) {
      setCachedState(state);
    } else if (!compareFn(state, cachedState)) {
      setCachedState(state);
    } else if (state !== cachedState) {
      // Warn that identical mutating state was provided
      if (warn) {
        console.warn('Mutating State', state, cachedState);
      }
    }
  }, [state, cachedState, compareFn, warn]);

  return cachedState;
}
