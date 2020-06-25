import { useState, useEffect } from 'react';

// Usage

// const App = () => {
// const [searchTerm, setSearchTerm] = useState('');
// Debounce search term so that it only gives us latest value ...
// ... if searchTerm has not been updated within last 500ms.
// const debouncedSearchTerm = useDebounce(searchTerm, 500);

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
  return debouncedValue;
}

// export default useDebounce;
