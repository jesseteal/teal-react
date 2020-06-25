import React from 'react';

// USAGE\
// const { varname, toggleVar } = Hooks.useToggle(false);

const useToggle = (initialState = false) => {
  const [on, setToggle] = React.useState(initialState);
  const onToggle = () => setToggle(prevState => !prevState);
  return { on, onToggle };
};

export default useToggle;
