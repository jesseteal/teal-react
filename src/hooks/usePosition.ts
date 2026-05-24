import React from 'react';
/*
usage:
  const ref = React.useRef(null);
  const { left, top } = Hooks.usePosition(ref);
*/

const canUseDOM = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect;

const getStyle = (el: any, styleName: string) => {
  const style: any = window.getComputedStyle(el);
  return style[styleName];
};

const getOffset = (el: any) => {
  if (!el) {
    return { top: 0, left: 0 };
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  const win = doc.defaultView || doc.parentWindow;

  const winX =
    win.pageXOffset !== undefined
      ? win.pageXOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  const winY =
    win.pageYOffset !== undefined
      ? win.pageYOffset
      : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;
  return {
    top: rect.top + winX,
    left: rect.left + winY,
    // winX,
    // winY,
    // rtop:rect.top,
    // rleft:rect.left
  };
};

const getPosition = (el: any) => {
  if (!el) {
    return { top: 0, left: 0 };
  }
  let offset = getOffset(el);
  let parentOffset = { top: 0, left: 0 };
  const marginTop = parseInt(getStyle(el, 'marginTop')) || 0;
  const marginLeft = parseInt(getStyle(el, 'marginLeft')) || 0;
  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  } else {
    const doc = el.ownerDocument;
    let offsetParent = el.offsetParent || doc.documentElement;
    while (
      offsetParent &&
      (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentNode;
    }
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top +=
        parseInt(getStyle(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left +=
        parseInt(getStyle(offsetParent, 'borderLeftWidth')) || 0;
    }
  }
  return {
    ...offset,
    top: offset.top + marginTop, // + parentOffset.top + marginTop,
    left: offset.left - parentOffset.left - marginLeft,
  };
};

export const usePosition = (ref: any) => {
  const [ElementPosition, setElementPosition] = React.useState(() =>
    getPosition(ref.current),
  );

  const handleChangePosition = () => {
    if (canUseDOM && ref && ref.current) {
      setElementPosition(getPosition(ref.current));
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!canUseDOM) {
      return;
    }

    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);

    return () => {
      window.removeEventListener('resize', handleChangePosition);
    };
  }, [ref]); // eslint-disable-line react-hooks/exhaustive-deps

  return ElementPosition;
};
