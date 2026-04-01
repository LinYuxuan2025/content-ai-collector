import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Dispatch event to notify other hooks using the same key
      window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key, value: valueToStore } }));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Listen for changes from other components using the same key
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail?.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('localStorageUpdate', handleStorageUpdate);
    return () => window.removeEventListener('localStorageUpdate', handleStorageUpdate);
  }, [key]);

  return [storedValue, setValue];
}
