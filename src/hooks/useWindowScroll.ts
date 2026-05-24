import { useEffect, useState } from 'react';

// Usage: (read-only)
//   const { x, y } = useWindowScroll();
const getScrollPosition = () => {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  };
};

export const useWindowScroll = () => {
  const [state, setState] = useState(getScrollPosition);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handler = () => {
      setState(getScrollPosition());
    };

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return state;
};
