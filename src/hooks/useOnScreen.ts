import React from 'react';

// USAGE:
// const [ref, onScreen] = useOnScreen('-300px');
//
// <div ref={ref}>target</div>

export function useOnScreen(rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);
  const ref = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    const element = ref.current;
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin]);

  return [ref, isIntersecting];
}
