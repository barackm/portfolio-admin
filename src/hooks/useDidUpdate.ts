import { useEffect, useRef } from 'react';

/**
 * Performs the useEffect functionality but skips the "did mount" call
 * @param effect
 * @param deps
 */
const useDidUpdate = (effect: any, deps: any) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return effect();

    didMountRef.current = true;

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidUpdate;
