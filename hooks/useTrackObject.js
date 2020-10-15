import React from 'react';
import _ from 'lodash';

// USAGE:
// Hooks.useTrackObject('my var', XXX)

export const useTrackObject = (name, props) => {
  const [oldProps, setOldProps] = React.useState(props);
  React.useEffect(() => {
    const diff = _.omitBy(props, (v,k) => (oldProps || {})[k] === v)
    if(Object.keys(diff).length > 0){
      console.log(`[${name}] updated`, diff);
    }
    setOldProps(props);
  },[props,oldProps,setOldProps,name]);
};

export const useOnTrackObjectChange = (obj, callback) => {
  const [old, set_old] = React.useState(obj);
  React.useEffect(() => {
    const diff = _.omitBy(obj, (v,k) => (old || {})[k] === v)
    if(Object.keys(diff).length > 0){
      // console.log('[Object Change]', diff);
      callback(diff)
    }
    set_old(obj);
  },[obj,old]);  // eslint-disable-line
}

// export const useTrackArray = (name, values) => {
//   React.useEffect(() => {
//     console.log(`${name} mounted`);
//     return () => console.log(`${name} un-mounted`)
//   },[]);
//   const [oldProps, setOldProps] = React.useState(values);
//   React.useEffect(() => {
//     const diff = _.omitBy(values, (v,k) => values[k] === v)
//     console.log(`${name} values updated`, diff);
//     setOldProps(values);
//   },[props]);
// };
