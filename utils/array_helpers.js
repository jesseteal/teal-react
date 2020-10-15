
// immutable pop
export function pop(arr){
  if(!arr || arr.length === 0){
    return [];
  }
  return arr.slice(0,arr.length-1)
}

export function without(arr, value){
  let m = arr.indexOf(value);
  if (m === -1) {
    return arr;
  }
  const wo = [...arr];
  wo.splice(m, 1);
  return wo
}

// "toggle" a value into or out of array
export function xor(arr, value){
  let v = arr.indexOf(value);
    if (v === -1) {
      return arr.concat(value);
    } else {
      const wo = [...arr];
      wo.splice(v, 1);
      return wo;
    }
}
