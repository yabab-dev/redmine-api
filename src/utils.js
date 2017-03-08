import npmExtend from './extend';

// Check if browser env
export function isBrowser() {
  return (typeof proceess !== 'undefined' && process.browser) || typeof window !== 'undefined';
}

// Base64 encode function
export function base64encode(str) {
  if (isBrowser()) {
    return window.btoa(str);
  } else {
    return Buffer.from(str, 'binary').toString('base64');
  }
}

// Format search params in query string
export function querysring (obj) {
  if (isBrowser()) {
    let search = new URLSearchParams();
    for(let key in obj) {
      search.set(key, config.search[key]);
    }
    return search.toString();
  } else {
    return require('querystring')
      .stringify(obj);
  }
}

export function extend(target, ...sources) {
  return npmExtend(true, target, ...sources);
}

export function clone(object) {
  return extend({}, object);
}
