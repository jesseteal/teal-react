import React from 'react';

export function useNoFlicker(data) {
  const [noFlicker, setNoFlicker] = React.useState(data);
  React.useEffect(() => {
    if(data){
      // console.log('update flicker',data);
      setNoFlicker(data);
    }
  },[data,setNoFlicker])
  // React.useEffect(() => {
  //   console.log('noflicker mount');
  //   return () => console.log('noflicker uinmountt');
  // }, []); // Empty array ensures that effect is only run on mount and unmount
  return noFlicker;
}
