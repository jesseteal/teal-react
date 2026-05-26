import React from 'react';
import { usePosition } from '../../hooks/usePosition.js';
import { useWindowSize } from '../../hooks/useWindowSize.js';

/*
  Displays as full height block if on initial screen

  usage:

    <MaxBox mb={20}>
      scrolled content here, mb is margin-bottom, default 0
    </MaxBox>
 */
const MaxBox = ({ children, mb = 0, style = {} }: any) => {
  const ref = React.useRef<any>(null);
  const { top } = usePosition(ref);
  const { height } = useWindowSize();
  const fudge_factor = 58; // page padding
  const containerStyle = {
    height:
      top && top < (height ?? 0)
        ? (height ?? 0) - top - mb - fudge_factor + 'px'
        : 'auto',
    overflow: 'auto',
    ...style,
  };
  return (
    <div ref={ref} style={containerStyle}>
      {children}
    </div>
  );
};

export default MaxBox;
