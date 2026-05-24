// @ts-ignore
import React from 'react';
// @ts-ignore
import _ from 'lodash';

// USAGE:
// Hooks.useTrackObject('my var', XXX)

export const useTrackObject = (name: string, props: any) => {
  const [oldProps, setOldProps] = React.useState(props);
  React.useEffect(() => {
    const diff = _.omitBy(props, (v: any, k: any) => (oldProps || {})[k] === v);
    if (Object.keys(diff).length > 0) {
      console.log(`[${name}] updated`, diff);
    }
    setOldProps(props);
  }, [props, oldProps, setOldProps, name]);
};

export const useOnTrackObjectChange = (obj: any, callback: any) => {
  const [old, set_old] = React.useState(obj);
  React.useEffect(() => {
    const diff = _.omitBy(obj, (v: any, k: any) => (old || {})[k] === v);
    if (Object.keys(diff).length > 0) {
      // console.log('[Object Change]', diff);
      callback(diff);
    }
    set_old(obj);
  }, [obj, old]); // eslint-disable-line
};
