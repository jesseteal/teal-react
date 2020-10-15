import React from 'react';

import _ from 'lodash';

// return true if `param` in objects has changed
export function didUpdate(prevObj, currObj, params = []) {
  if(params.length === 0){
    const diff = _.omitBy(currObj, (v,k) => (prevObj || {})[k] === v)
    return diff;
  }
  let changed = false;
  for (var p of params) {
    const t1 = resolve(prevObj, p);
    const t2 = resolve(currObj, p);
    // console.log('change test: ',p,t1,t2);
    if (t1 !== t2) {
      // console.log('CHANGE');
      changed = true;
      break;
    }
  }
  return changed;
}

export function filtered(list, filter, paths){
  return list.filter(l => search(l,filter,paths));
}

/*
compare `prev` and `curr` values
return true if prev !== curr
 */
export function hasDiff(prev, curr){
  return JSON.stringify(prev || '') !== JSON.stringify(curr || '');
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function resolve(obj, path) {
  return path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
}

export function search(obj, filter, paths){
  if(!filter) return true;
  let ok = 0;
  paths.forEach(path => {
    const v = resolve(obj, path);
    filter.split(' ').forEach(f => {
      if(v && _.includes(v.toLowerCase(), f.toLowerCase())){
        ok += 1;
      }
    })
  });
  return ok >= filter.split(' ').length;
}

export function sort(data, key, desc = false) {
  if(!key){
    return data;
  }
  const sorted = _.sortBy(data, o => resolve(o, key));
  if(desc){
    _.reverse(sorted)
  }
  return sorted;
}

// zeroIsOk - allows using zero values in assignment
export function zeroIsOk(val, defaultTo = ''){
  if(typeof val === 'undefined' || val === null){
    return defaultTo;
  }
  return val;
}


export function isSet(val){
  if(typeof val === 'undefined' || val === null){
    return false;
  }
  return true;
}

export function isNullOrEmpty(val){
  const type = typeof val;
  if(isSet(val)){ // is not null or undefined
    if(type === "object"){
      if(isSet(val.length)){ // is array
        return val.length === 0;
      }
      return val === null || !hasDiff(val, {}) // is object
    }
    if(val === 0 || val === false){
      return false;
    }
    return !val; // string, number, function
  }
  return true;
}

// export const devDump = (obj, header = null, showall = true) => {
//   const out = [];
//   if(obj && obj.length){
//     return (
//       <div>
//         {header && (<strong>{header}<br/></strong>)}
//         {obj.join(', ')}
//       </div>
//     )
//   } else if(obj){
//     for (var t in obj) {
//       if (obj.hasOwnProperty(t)) {
//         if(showall){
//           out.push(`${t}:${obj[t]} ${typeof obj[t]}`)
//         } else if(obj[t]) {
//           out.push(`${t}:${obj[t]} ${typeof obj[t]}`)
//         }
//       }
//     }
//     return (
//       <div>
//         {header && (<strong>{header}<br/></strong>)}
//         {out.map((line, i) => {
//           return (
//             <div key={i} className="small">{line}</div>
//           )
//         })}
//       </div>
//     )
//   }
//   return null;
// }
