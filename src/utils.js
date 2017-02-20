// Object.assin polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

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
