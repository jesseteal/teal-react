import React from 'react';
import _ from 'lodash';

// USAGE:
// Hooks.useTrackObject('my var', XXX)

export const useTrackObject = (name, props) => {
  const [oldProps, setOldProps] = React.useState(props);
  React.useEffect(() => {
    const diff = _.omitBy(props, (v,k) => oldProps[k] === v)
    if(!!diff){
      console.log(`[${name}] updated`, diff);
    }
    setOldProps(props);
  },[props,oldProps,setOldProps,name]);
};

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
