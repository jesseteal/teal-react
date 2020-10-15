import React from 'react';

// USAGE:
// const [ref, onScreen] = useOnScreen('-300px');
//
// <div ref={ref}>target</div>

export function useOnScreen(rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return [ref, isIntersecting];
}
