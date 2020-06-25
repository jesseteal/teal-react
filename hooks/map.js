import React from 'react';

// USAGE:
// const cache = Hooks.useMap({})
//
// cache.set('key', 'value')
// cache.get('key')
export const useMap = (initial) => {
  const [mapValue, setMapValue] = React.useState(() => initial);
  return {
    values: mapValue,
    clear: () => setMapValue({}),
    reset: () => setMapValue(initial),
    set: (key, updater) => {
      setMapValue(prev =>
        Object.assign(prev, {
          [key]: typeof updater === "function" ? updater(prev[key]) : updater
        })
      );
    },
    get: key => mapValue[key],
    has: key => mapValue[key] != null,
    delete: key => setMapValue(({ [key]: deleted, ...prev }) => prev)
  };
}
