import { loadState, saveState } from '@/api/localStorage';
import { useState, useEffect } from 'react';

function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    return loadState(key) ?? initialValue;
  });

  useEffect(() => {
    saveState<T>(key, state);
  }, [key, state]);

  return [state, setState] as const;
}

export default usePersistedState;