import { useState, useEffect } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * have passed without `value` changing. Useful for throttling API calls
 * driven by fast-changing input (e.g. a search box).
 *
 * @param {*} value - the value to debounce
 * @param {number} delay - debounce delay in milliseconds (default 500)
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
