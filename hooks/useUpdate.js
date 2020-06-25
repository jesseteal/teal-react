import React from 'react';

// USAGE:
// Hooks.useUpdate({
//  onUpdate: () => console.log('component did updated'),
//  onUnmount: () => console.log('component did unMount')
// })

const useUpdate = ({ onUpdate = () => {}, onUnmount = () => {} }, ...args) => {
  React.useEffect(
    () => {
      if (onUpdate && typeof onUpdate === 'function') {
        onUpdate();
      }
      return onUnmount;
    },
    args.length ? [...args] : undefined,
  );
};

export default useUpdate;
