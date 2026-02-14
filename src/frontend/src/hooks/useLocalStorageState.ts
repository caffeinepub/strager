import { useState, useEffect } from 'react';

export function useLocalStorageState(key: string, defaultValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore localStorage errors
    }
  }, [key, value]);

  return [value, setValue];
}
