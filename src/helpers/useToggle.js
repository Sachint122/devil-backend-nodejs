import { useState, useCallback } from 'react';

export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const open   = useCallback(() => setState(true), []);
  const close  = useCallback(() => setState(false), []);

  return { state, toggle, open, close };
};
