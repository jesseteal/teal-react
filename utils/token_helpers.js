import jwtDecode from 'jwt-decode';
// accessed in Utils.token.*
const token_key = (process.env && process.env.TOKEN_NAME) || 'teal-react-token';
// local storage of token
var _encoded = null;
var _onTokenChange = [];
var _override = null;

export function set(t){
  // console.log('process.env',process.env);
  _override = null;
  if(typeof t === 'string'){
    _encoded = t;
    window.localStorage && window.localStorage.setItem(token_key, _encoded);
  } else {
    // for clearing token only
    _encoded = null;
    window.localStorage && window.localStorage.removeItem(token_key);
  }
  if(_onTokenChange.length){
    for (var callback of _onTokenChange) {
      callback()
    }
  }
}

export function onTokenChange(callback){
  _onTokenChange.push(callback);
}

function have_token(){
  if(!_encoded){ // try local storage
    _encoded = window.localStorage && window.localStorage.getItem(token_key);
  }
  return !!_encoded;
}

export function get(){
  if(have_token()){
    return _override ? _override : jwtDecode(_encoded);
  }
  // console.log("jwt token not set :: token_helpers.js");
  return {};
}

export function token(){
  if(have_token()){
    return _encoded;
  }
  return null;
}

export function authenticated(){
  return have_token();
}

export function hasRole(role, field = 'roles'){
  if(!have_token() || !role){
    return false;
  }
  const token = get();
  if(!token || !token[field]){
    return false;
  }
  if(typeof role === 'string'){
    return token[field].indexOf(role) > -1;
  } else {
    //assumed array
    for (var r of role) {
      if(token[field].indexOf(r) > -1){
        return true;
      }
    }
    return false;
  }
}

// used for impersonation / dev / debug work
export function _overwrite(token){
  _override = token;
  if(_onTokenChange.length){
    for (var callback of _onTokenChange) {
      callback()
    }
  }
}
