import fetch from 'unfetch';

import GraphQL from '../graphql/src/GraphQL';

let base_url = '';
let token = '';

const set_base = (url) => {
  base_url = url;
}
const set_token = (t) => {
  token = t;
}

const pull = (method, url, data = null, json_encode = true) => {
  // const body = (method === 'get') ? null : (data && json_encode ? JSON.stringify(data) : data)
  let body = null;
  let headers = { 'Accept': 'application/json' }
  let use_url = url;
  if(method === 'post'){
    if(json_encode){
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json'
    } else {
      body = new FormData();
      for (var t in data) {
        if (data.hasOwnProperty(t)) {
          body.append(t, data[t]);
        }
      }
    }
  } else if(method === 'get' && data){
    use_url += '?';
    const qs = [];
    for (var t in data) {
      if (data.hasOwnProperty(t)) {
        qs.push(`${t}=${data[t]}`)
      }
    }
    use_url += qs.join('&');
  }
  return fetch(base_url + use_url, {
    method,
    headers,
    body
  })
  .then(r => {
    if(r){
      return r.json()
    }
    return null;
  })
  .catch(console.log)
}

const Api = {
  set_base,
  set_token,
  token,
  Get: url => pull('get',url),
  Post: (url, data, json_encode = true) => pull('post',url, data, json_encode),
  Put: (url, data) => pull('put',url, data),

  ...GraphQL
}

export default Api;
