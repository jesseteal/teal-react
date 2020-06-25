import { useState, useCallback } from 'react';

// USAGE:
// const name = useInputValue('')
//
// <input {...name} />

function useInputValue(initialValue) {
  let [value, setValue] = useState(initialValue);
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);

  return {
    value,
    onChange,
  };
}
