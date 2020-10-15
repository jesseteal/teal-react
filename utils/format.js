import accounting from 'accounting';

export function int(i){
  return parseInt(i,10);
}

export function padNumber(num, maxwidth = 4){
  // if(typeof num === 'string'){
  //   num = parseInt(num,10)
  // }
  let s = num+"";
  const need = maxwidth - s.length;
  if (need < 1) return num;
  return new Array(need + 1).join('0') + s;
}

export function formatNumber(num, precision = 0, showZero = true){
  const number = parseFloat(num || 0);
  if(number === 0 && !showZero){
    return null;
  }
  return accounting.formatNumber(num, precision)
}

export function formatMoney(amount){
  return accounting.formatMoney(amount);
}

export function formatFileSize(size){
  let kb = Math.floor(size / 1024);

  if(kb > 1024){
    return `${formatNumber(kb / 1024, 1)} MB`
  }
  return `${kb} KB`
}

export function formatPhone(rawPhoneNumber){
  const phoneNumber = rawPhoneNumber.replace(/\D/g, "")

  if(phoneNumber.length < 8){
    const pre = phoneNumber.substring(0, 3);
    const post = phoneNumber.substring(3, 7);
    return `${pre}-${post}`;
  }

  const partA = phoneNumber.substring(0, 3);
  const partB = phoneNumber.substring(3, 6);
  const partC = phoneNumber.substring(6, 11);
  // 2345678  =>  234-567-8
  if (partC) {
    return `(${partA}) ${partB}-${partC}`;
  }
  // 2345 => 234-5
  if (partB) {
    return `${partA}-${partB}`;
  }
  // if partA
  return phoneNumber;
}
