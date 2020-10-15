import React from 'react';

// usage:
//  const { loading, value, error } = useAsync(fn);

export const useAsync = (fn, args) => {
  const [state, set] = React.useState({
    loading: true
  });
  const memoized = React.useCallback(fn, args);

  React.useEffect(() => {
    let mounted = true;
    const promise = memoized();

    promise.then(
      value => {
        if (mounted) {
          set({
            loading: false,
            value
          });
        }
      },
      error => {
        if (mounted) {
          set({
            loading: false,
            error
          });
        }
      }
    );

    return () => {
      mounted = false;
    };
  }, [memoized]);
  return state;
};
