import { useEffect, useState } from 'react';

// Usage: (read-only)
//   const { x, y } = useWindowScroll();
const useWindowScroll = () => {
  const [state, setState] = useState({
    x: window.pageXOffset,
    y: window.pageYOffset,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
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

export default useWindowScroll;
