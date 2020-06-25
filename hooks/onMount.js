import React from 'react';

export const useOnMount = onMount => React.useEffect(() => {
  onMount && onMount()
},[]); // eslint-disable-line react-hooks/exhaustive-deps

export const useOnUnmount = onUnmount => React.useEffect(() => {
    return () => onUnmount && onUnmount();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps
