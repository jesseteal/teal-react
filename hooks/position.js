import React from 'react';
/*
usage:
  const ref = React.useRef(null);
  const { left, top } = React.usePosition(ref);
*/

const getStyle = (el, styleName) => window.getComputedStyle(el)[styleName];

const getOffset = (el) => {
  if (!el) {
    return {top: 0, left: 0}
  }
  const rect = el.getBoundingClientRect();
  const doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  const win = doc.defaultView || doc.parentWindow;

  const winX = (win.pageXOffset !== undefined)
  ? win.pageXOffset
  : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  const winY = (win.pageYOffset !== undefined)
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

const getPosition = (el) => {
  if (!el) {
    return {top: 0, left: 0 };
  }
  let offset = getOffset(el);
  let parentOffset = {top: 0, left: 0 };
  const marginTop = parseInt(getStyle(el, 'marginTop')) || 0;
  const marginLeft = parseInt(getStyle(el, 'marginLeft')) || 0;
  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  } else {
    const doc = el.ownerDocument;
    let offsetParent = el.offsetParent || doc.documentElement;
    while (offsetParent &&
          (offsetParent === doc.body || offsetParent === doc.documentElement)
    ) {
      offsetParent = offsetParent.parentNode;
    }
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top += parseInt(getStyle(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left += parseInt(getStyle(offsetParent, 'borderLeftWidth')) || 0;
    }
  }
  return {
    ...offset,
    top: offset.top + marginTop,// + parentOffset.top + marginTop,
    left: offset.left - parentOffset.left - marginLeft,
  };
}

export const usePosition = (ref) => {
  let { top, left } = getPosition(ref.current);
  let [ElementPosition, setElementPosition ] = React.useState({
    top: top,
    left: left,
    // rtop:0,
    // rleft:0,
    // winX:0,
    // winY:0
  });

  const handleChangePosition = () => {
    if (ref && ref.current) {
      setElementPosition(getPosition(ref.current))
    }
  }

  React.useLayoutEffect(() => {
    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);

    return () => {
      window.removeEventListener('resize', handleChangePosition);
    }
  }, [ref]);// eslint-disable-line react-hooks/exhaustive-deps

  return ElementPosition;
};
