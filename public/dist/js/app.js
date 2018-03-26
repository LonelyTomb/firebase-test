/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(4);
var isBuffer = __webpack_require__(15);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(17);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(5);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(5);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(18);
var buildURL = __webpack_require__(20);
var parseHeaders = __webpack_require__(21);
var isURLSameOrigin = __webpack_require__(22);
var createError = __webpack_require__(6);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(23);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(24);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(19);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["UIkit"] = __webpack_require__(10);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/*! UIkit 3.0.0-beta.33 | http://www.getuikit.com | (c) 2014 - 2017 YOOtheme | MIT License */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('uikit', factory) :
	(global.UIkit = factory());
}(this, (function () { 'use strict';

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING  = 2;

var async = 'setImmediate' in window ? setImmediate : setTimeout;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p = Promise$1.prototype;

p.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x.then;

            if (x !== null && isObject(x) && isFunction(then)) {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p.notify = function notify() {
    var this$1 = this;

    async(function () {
        if (this$1.state !== PENDING) {
            while (this$1.deferred.length) {
                var deferred = this$1.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (this$1.state === RESOLVED) {
                        if (isFunction(onResolved)) {
                            resolve(onResolved.call(undefined, this$1.value));
                        } else {
                            resolve(this$1.value);
                        }
                    } else if (this$1.state === REJECTED) {
                        if (isFunction(onRejected)) {
                            resolve(onRejected.call(undefined, this$1.value));
                        } else {
                            reject(this$1.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p.then = function then(onResolved, onRejected) {
    var this$1 = this;

    return new Promise$1(function (resolve, reject) {
        this$1.deferred.push([onResolved, onRejected, resolve, reject]);
        this$1.notify();
    });
};

p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

function bind(fn, context) {
    return function (a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(context, arguments) : fn.call(context, a) : fn.call(context);
    };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

var Promise = 'Promise' in window ? window.Promise : Promise$1;

var classifyRe = /(?:^|[-_\/])(\w)/g;

function classify(str) {
    return str.replace(classifyRe, function (_, c) { return c ? c.toUpperCase() : ''; });
}

var hyphenateRe = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
    return str
        .replace(hyphenateRe, '$1-$2')
        .toLowerCase()
}

var camelizeRE = /-(\w)/g;

function camelize(str) {
    return str.replace(camelizeRE, toUpper)
}

function toUpper(_, c) {
    return c ? c.toUpperCase() : ''
}

function ucfirst(str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
}

var strPrototype = String.prototype;
var startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

function startsWith(str, search) {
    return startsWithFn.call(str, search);
}

var endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-1 * search.length) === search; };

function endsWith(str, search) {
    return endsWithFn.call(str, search);
}

var includesFn = function (search) { return ~this.indexOf(search); };
var includesStr = strPrototype.includes || includesFn;
var includesArray = Array.prototype.includes || includesFn;

function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
}

var isArray = Array.isArray;

function isFunction(obj) {
    return typeof obj === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
}

function isDocument(obj) {
    return isObject(obj) && obj.nodeType === 9;
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

function isString(value) {
    return typeof value === 'string';
}

function isNumber(value) {
    return typeof value === 'number';
}

function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
}

function isUndefined(value) {
    return value === void 0;
}

function toBoolean(value) {
    return isBoolean(value)
        ? value
        : value === 'true' || value === '1' || value === ''
            ? true
            : value === 'false' || value === '0'
                ? false
                : value;
}

function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
}

function toFloat(value) {
    return parseFloat(value) || 0;
}

function toList(value) {
    return isArray(value)
        ? value
        : isString(value)
            ? value.split(',').map(function (value) { return isNumeric(value)
                ? toNumber(value)
                : toBoolean(value.trim()); })
            : [value];
}

var vars = {};

function toMedia(value) {

    if (isString(value)) {
        if (value[0] === '@') {
            var name = "media-" + (value.substr(1));
            value = vars[name] || (vars[name] = toFloat(getCssVar(name)));
        } else if (isNaN(value)) {
            return value;
        }
    }

    return value && !isNaN(value) ? ("(min-width: " + value + "px)") : false;
}

function coerce(type, value, context) {

    if (type === Boolean) {
        return toBoolean(value);
    } else if (type === Number) {
        return toNumber(value);
    } else if (type === 'query') {
        return query(value, context);
    } else if (type === 'list') {
        return toList(value);
    } else if (type === 'media') {
        return toMedia(value);
    }

    return type ? type(value) : value;
}

function toMs(time) {
    return !time
        ? 0
        : endsWith(time, 'ms')
            ? toFloat(time)
            : toFloat(time) * 1000;
}

function swap(value, a, b) {
    return value.replace(new RegExp((a + "|" + b), 'mg'), function (match) {
        return match === a ? b : a
    });
}

var assign = Object.assign || function (target) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    target = Object(target);
    for (var i = 0; i < args.length; i++) {
        var source = args[i];
        if (source !== null) {
            for (var key in source) {
                if (hasOwn(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
};

function each(obj, cb) {
    for (var key in obj) {
        if (cb.call(obj[key], obj[key], key) === false) {
            break;
        }
    }
}

function clamp(number, min, max) {
    if ( min === void 0 ) min = 0;
    if ( max === void 0 ) max = 1;

    return Math.min(Math.max(number, min), max);
}

function noop() {}

function intersectRect(r1, r2) {
    return r1.left <= r2.right &&
        r2.left <= r1.right &&
        r1.top <= r2.bottom &&
        r2.top <= r1.bottom;
}

function pointInRect(point, rect) {
    return intersectRect({top: point.y, bottom: point.y, left: point.x, right: point.x}, rect)
}

function ajax(url, options) {
    return new Promise(function (resolve, reject) {

        var env = assign({
            data: null,
            method: 'GET',
            headers: {},
            xhr: new XMLHttpRequest(),
            beforeSend: noop,
            responseType: ''
        }, options);

        var xhr = env.xhr;

        env.beforeSend(env);

        for (var prop in env) {
            if (prop in xhr) {
                try {

                    xhr[prop] = env[prop];

                } catch (e) {}
            }
        }

        xhr.open(env.method.toUpperCase(), url);

        for (var header in env.headers) {
            xhr.setRequestHeader(header, env.headers[header]);
        }

        on(xhr, 'load', function () {

            if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr);
            } else {
                reject(assign(Error(xhr.statusText), {
                    xhr: xhr,
                    status: xhr.status
                }));
            }

        });

        on(xhr, 'error', function () { return reject(assign(Error('Network Error'), {xhr: xhr})); });
        on(xhr, 'timeout', function () { return reject(assign(Error('Network Timeout'), {xhr: xhr})); });

        xhr.send(env.data);
    });
}

var arrayProto = Array.prototype;

function $$1(selector, context) {
    return !isString(selector)
        ? toNode(selector)
        : isHtml(selector)
            ? toNode(fragment(selector))
            : find(selector, context);
}

function $$(selector, context) {
    return !isString(selector)
        ? toNodes(selector)
        : isHtml(selector)
            ? toNodes(fragment(selector))
            : findAll(selector, context);
}

function isHtml(str) {
    return str[0] === '<' || str.match(/^\s*</);
}

function query(selector, context) {
    return $$1(selector, isContextSelector(selector) ? context : doc);
}

function queryAll(selector, context) {
    return $$(selector, isContextSelector(selector) ? context : doc);
}

function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
}

function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
}

function _query(selector, context, queryFn) {
    if ( context === void 0 ) context = doc;


    if (!selector || !isString(selector)) {
        return null;
    }

    selector = selector.replace(contextSanitizeRe, '$1 *');

    var removes;

    if (isContextSelector(selector)) {

        removes = [];

        selector = selector.split(',').map(function (selector, i) {

            var ctx = context;

            selector = selector.trim();

            if (selector[0] === '!') {

                var selectors = selector.substr(1).trim().split(' ');
                ctx = closest(context.parentNode, selectors[0]);
                selector = selectors.slice(1).join(' ');

            }

            if (!ctx) {
                return null;
            }

            if (!ctx.id) {
                ctx.id = "uk-" + (Date.now()) + i;
                removes.push(function () { return removeAttr(ctx, 'id'); });
            }

            return ("#" + (ctx.id) + " " + selector);

        }).filter(Boolean).join(',');

        context = doc;

    }

    try {

        return context[queryFn](selector);

    } catch (e) {

        return null;

    } finally {

        removes && removes.forEach(function (remove) { return remove(); });

    }

}

function filter(element, selector) {
    return $$(element).filter(function (element) { return matches(element, selector); });
}

function within(element, selector) {
    return !isString(selector)
        ? element === selector || toNode(selector).contains(toNode(element))
        : matches(element, selector) || closest(element, selector);
}

var contextSelectorRe = /(^|,)\s*[!>+~]/;
var contextSanitizeRe = /([!>+~])(?=\s+[!>+~]|\s*$)/g;

function isContextSelector(selector) {
    return isString(selector) && selector.match(contextSelectorRe);
}

var elProto = Element.prototype;
var matchesFn = elProto.matches || elProto.msMatchesSelector;

function matches(element, selector) {
    return toNodes(element).some(function (element) { return matchesFn.call(element, selector); });
}

var closestFn = elProto.closest || function (selector) {
    var ancestor = this;

    if (!docEl.contains(this)) {
        return;
    }

    do {

        if (matches(ancestor, selector)) {
            return ancestor;
        }

        ancestor = ancestor.parentNode;

    } while (ancestor && ancestor.nodeType === 1);
};

function closest(element, selector) {

    if (startsWith(selector, '>')) {
        selector = selector.slice(1);
    }

    return isNode(element) ? closestFn.call(element, selector) : toNodes(element).map(function (element) { return closestFn.call(element, selector); });
}

function parents(element, selector) {
    var elements = [], parent = toNode(element).parentNode;

    while (parent && parent.nodeType === 1) {

        if (matches(parent, selector)) {
            elements.push(parent);
        }

        parent = parent.parentNode;
    }

    return elements;
}

function isJQuery(obj) {
    return isObject(obj) && !!obj.jquery;
}

function isNode(element) {
    return element instanceof Node || isObject(element) && element.nodeType === 1;
}

function isNodeCollection(element) {
    return element instanceof NodeList || element instanceof HTMLCollection;
}

function toNode(element) {
    return isNode(element) || isWindow(element) || isDocument(element)
        ? element
        : isNodeCollection(element) || isJQuery(element)
            ? element[0]
            : isArray(element)
                ? toNode(element[0])
                : null;
}

function toNodes(element) {
    return isNode(element)
        ? [element]
        : isNodeCollection(element)
            ? arrayProto.slice.call(element)
            : isArray(element)
                ? element.map(toNode).filter(Boolean)
                : isJQuery(element)
                    ? element.toArray()
                    : [];
}

function attr(element, name, value) {

    if (isObject(name)) {
        for (var key in name) {
            attr(element, key, name[key]);
        }
        return;
    }

    if (isUndefined(value)) {
        element = toNode(element);
        return element && element.getAttribute(name);
    } else {
        toNodes(element).forEach(function (element) {

            if (isFunction(value)) {
                value = value.call(element, attr(element, name));
            }

            if (value === null) {
                removeAttr(element, name);
            } else {
                element.setAttribute(name, value);
            }
        });
    }

}

function hasAttr(element, name) {
    return toNodes(element).some(function (element) { return element.hasAttribute(name); });
}

function removeAttr(element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.removeAttribute(name); }
        ); }
    );
}

function filterAttr(element, attribute, pattern, replacement) {
    attr(element, attribute, function (value) { return value ? value.replace(pattern, replacement) : value; });
}

function data(element, attribute) {
    for (var i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
        if (hasAttr(element, attrs[i])) {
            return attr(element, attrs[i]);
        }
    }
}

var win = window;
var doc = document;
var docEl = doc.documentElement;

var isRtl = attr(docEl, 'dir') === 'rtl';

function isReady() {
    return doc.readyState === 'complete' || doc.readyState !== 'loading' && !docEl.doScroll;
}

function ready(fn) {

    if (isReady()) {
        fn();
        return;
    }

    var handle = function () {
            unbind1();
            unbind2();
            fn();
        },
        unbind1 = on(doc, 'DOMContentLoaded', handle),
        unbind2 = on(win, 'load', handle);
}

var transitioncancel = 'transitioncanceled';

function transition(element, props, duration, transition) {
    if ( duration === void 0 ) duration = 400;
    if ( transition === void 0 ) transition = 'linear';


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            for (var name in props) {
                var value = css(element, name);
                if (value === '') {
                    css(element, name, value);
                }
            }

            var timer = setTimeout(function () { return trigger(element, transitionend); }, duration);

            once(element, (transitionend + " " + transitioncancel), function (ref) {
                var type = ref.type;

                clearTimeout(timer);
                removeClass(element, 'uk-transition');
                css(element, 'transition', '');
                type === transitioncancel ? reject() : resolve();
            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            addClass(element, 'uk-transition');
            css(element, assign({transition: ("all " + duration + "ms " + transition)}, props));

        }); }
    ));

}

var Transition = {

    start: transition,

    stop: function stop(element) {
        trigger(element, transitionend);
        return Promise.resolve();
    },

    cancel: function cancel(element) {
        trigger(element, transitioncancel);
    },

    inProgress: function inProgress(element) {
        return hasClass(element, 'uk-transition');
    }

};

var animationcancel = 'animationcancel';
var animationPrefix = 'uk-animation-';
var clsCancelAnimation = 'uk-cancel-animation';

function animate(element, animation, duration, origin, out) {
    var arguments$1 = arguments;
    if ( duration === void 0 ) duration = 200;


    return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            if (hasClass(element, clsCancelAnimation)) {
                requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(null, arguments$1).then(resolve, reject); }
                    ); }
                );
                return;
            }

            var cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');

            if (startsWith(animation, animationPrefix)) {

                if (origin) {
                    cls += " " + animationPrefix + origin;
                }

                if (out) {
                    cls += " " + animationPrefix + "reverse";
                }

            }

            reset();

            once(element, ((animationend || 'animationend') + " " + animationcancel), function (ref) {
                var type = ref.type;


                var hasReset = false;

                if (type === animationcancel) {
                    reject();
                    reset();
                } else {
                    resolve();
                    Promise.resolve().then(function () {
                        hasReset = true;
                        reset();
                    });
                }

                requestAnimationFrame(function () {
                    if (!hasReset) {
                        addClass(element, clsCancelAnimation);

                        requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
                    }
                });

            }, false, function (ref) {
                var target = ref.target;

                return element === target;
            });

            css(element, 'animationDuration', (duration + "ms"));
            addClass(element, cls);

            if (!animationend) {
                requestAnimationFrame(function () { return Animation.cancel(element); });
            }

            function reset() {
                css(element, 'animationDuration', '');
                removeClasses(element, (animationPrefix + "\\S*"));
            }

        }); }
    ));

}

var inProgress = new RegExp((animationPrefix + "(enter|leave)"));
var Animation = {

    in: function in$1(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, false);
    },

    out: function out(element, animation, duration, origin) {
        return animate(element, animation, duration, origin, true);
    },

    inProgress: function inProgress$1(element) {
        return inProgress.test(attr(element, 'class'));
    },

    cancel: function cancel(element) {
        trigger(element, animationcancel);
    }

};

function isInView(element, top, left) {
    if ( top === void 0 ) top = 0;
    if ( left === void 0 ) left = 0;

    return intersectRect(toNode(element).getBoundingClientRect(), {
        top: top,
        left: left,
        bottom: top + height(win),
        right: left + width(win)
    });
}

function scrolledOver(element) {

    element = toNode(element);

    var elHeight = element.offsetHeight,
        top = positionTop(element),
        vp = height(win),
        vh = vp + Math.min(0, top - vp),
        diff = Math.max(0, vp - (height(doc) - (top + elHeight)));

    return clamp(((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0)) ) / 100)) / 100);
}

function positionTop(element) {
    var top = 0;

    do {

        top += element.offsetTop;

    } while (element = element.offsetParent);

    return top;
}

function getIndex(i, elements, current) {
    if ( current === void 0 ) current = 0;


    elements = toNodes(elements);

    var length = elements.length;

    i = (isNumeric(i)
            ? toNumber(i)
            : i === 'next'
                ? current + 1
                : i === 'previous'
                    ? current - 1
                    : index(elements, i)
    ) % length;

    return i < 0 ? i + length : i;
}

var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
};
function isVoidElement(element) {
    return voidElements[toNode(element).tagName.toLowerCase()];
}

var Dimensions = {

    ratio: function ratio(dimensions, prop, value) {

        var aProp = prop === 'width' ? 'height' : 'width';

        return ( obj = {}, obj[aProp] = Math.round(value * dimensions[aProp] / dimensions[prop]), obj[prop] = value, obj );
        var obj;
    },

    contain: function contain(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = assign({}, dimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] > maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    },

    cover: function cover(dimensions, maxDimensions) {
        var this$1 = this;

        dimensions = this.contain(dimensions, maxDimensions);

        each(dimensions, function (_, prop) { return dimensions = dimensions[prop] < maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions; }
        );

        return dimensions;
    }

};

function preventClick() {

    var timer = setTimeout(function () { return trigger(doc, 'click'); }, 0);

    once(doc, 'click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        clearTimeout(timer);
    }, true);

}

function isVisible(element) {
    return toNodes(element).some(function (element) { return element.offsetHeight; });
}

var selInput = 'input,select,textarea,button';
function isInput(element) {
    return toNodes(element).some(function (element) { return matches(element, selInput); });
}

function empty(element) {
    element = toNode(element);
    element.innerHTML = '';
    return element;
}

function html(parent, html) {
    parent = toNode(parent);
    return isUndefined(html)
        ? parent.innerHTML
        : append(parent.hasChildNodes() ? empty(parent) : parent, html);
}

function prepend(parent, element) {

    parent = toNode(parent);

    if (!parent.hasChildNodes()) {
        return append(parent, element);
    } else {
        return insertNodes(element, function (element) { return parent.insertBefore(element, parent.firstChild); });
    }
}

function append(parent, element) {
    parent = toNode(parent);
    return insertNodes(element, function (element) { return parent.appendChild(element); });
}

function before(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); });
}

function after(ref, element) {
    ref = toNode(ref);
    return insertNodes(element, function (element) { return ref.nextSibling
        ? before(ref.nextSibling, element)
        : append(ref.parentNode,element); }
    );
}

function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return 'length' in element ? toNodes(element).map(fn) : fn(element);
}

function remove(element) {
    toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
}

function wrapAll(element, structure) {

    structure = toNode(before(element, structure));

    while (structure.firstChild) {
        structure = structure.firstChild;
    }

    append(structure, element);

    return structure;
}

function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
    ));
}

function unwrap(element) {
    toNodes(element)
        .map(function (element) { return element.parentNode; })
        .filter(function (value, index, self) { return self.indexOf(value) === index; })
        .forEach(function (parent) {
            before(parent, parent.childNodes);
            remove(parent);
        });
}

var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

function fragment(html) {

    var matches;

    if (matches = singleTagRE.exec(html)) {
        return doc.createElement(matches[1]);
    }

    var container = doc.createElement('div');
    if (fragmentRE.test(html)) {
        container.insertAdjacentHTML('beforeend', html.trim());
    } else {
        container.textContent = html;
    }

    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

}

function index(element, ref) {
    return ref
        ? toNodes(element).indexOf(toNode(ref))
        : toNodes((element = toNode(element)) && element.parentNode.children).indexOf(element);
}

var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'widows': true,
    'z-index': true,
    'zoom': true
};

function css(element, property, value) {

    return toNodes(element).map(function (element) {

        if (isString(property)) {

            property = propName(property);

            if (isUndefined(value)) {
                return getStyle(element, property);
            } else if (!value && value !== 0) {
                element.style.removeProperty(property);
            } else {
                element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
            }

        } else if (isArray(property)) {

            var styles = getStyles(element);

            return property.reduce(function (props, property) {
                props[property] = propName(styles[property]);
                return props;
            }, {});

        } else if (isObject(property)) {
            each(property, function (value, property) { return css(element, property, value); });
        }

        return element;

    })[0];

}

function getStyles(element, pseudoElt) {
    element = toNode(element);
    return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
}

function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
}

var vars$1 = {};

function getCssVar(name) {

    if (!(name in vars$1)) {

        /* usage in css:  .var-name:before { content:"xyz" } */

        var element = append(docEl, doc.createElement('div'));

        addClass(element, ("var-" + name));

        try {

            vars$1[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
            vars$1[name] = JSON.parse(vars$1[name]);

        } catch (e) {}

        docEl.removeChild(element);

    }

    return vars$1[name];

}

var cssProps = {};

function propName(name) {

    var ret = cssProps[name];
    if (!ret) {
        ret = cssProps[name] = vendorPropName(name) || name;
    }
    return ret;
}

var cssPrefixes = ['webkit', 'moz', 'ms'];
var style = doc.createElement('div').style;

function vendorPropName(name) {

    name = hyphenate(name);

    if (name in style) {
        return name;
    }

    var i = cssPrefixes.length, prefixedName;

    while (i--) {
        prefixedName = "-" + (cssPrefixes[i]) + name;
        if (prefixedName in style) {
            return prefixedName;
        }
    }
}

var supportsClassList;
var supportsMultiple;
var supportsForce;

function addClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'add');
}

function removeClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    apply(element, args, 'remove');
}

function removeClasses(element, cls) {
    filterAttr(element, 'class', new RegExp(("(^|\\s)" + cls + "(?!\\S)"), 'g'), '');
}

function replaceClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
}

function hasClass(element, cls) {
    return supportsClassList && toNodes(element).some(function (element) { return element.classList.contains(cls); });
}

function toggleClass(element) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];


    if (!supportsClassList || !args.length) {
        return;
    }

    args = getArgs(args);

    var force = !isString(args[args.length - 1]) ? args.pop()  : undefined;

    toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        for (var i = 0; i < args.length; i++) {
            supportsForce
                ? classList.toggle(args[i], force)
                : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
        }
    });

}

function apply(element, args, fn) {
    args = getArgs(args).filter(function (arg) { return arg; });

    supportsClassList && args.length && toNodes(element).forEach(function (ref) {
        var classList = ref.classList;

        supportsMultiple
            ? classList[fn].apply(classList, args)
            : args.forEach(function (cls) { return classList[fn](cls); });
    });
}

function getArgs(args) {
    return args.reduce(function (args, arg) {
        args.push.apply(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : [arg]);
        return args;
    }, []);
}

(function () {

    var list = doc.createElement('_').classList;
    if (list) {
        list.add('a', 'b');
        list.toggle('c', false);
        supportsMultiple = list.contains('b');
        supportsForce = !list.contains('c');
        supportsClassList = true;
    }
    list = null;

})();

var Observer = win.MutationObserver || win.WebKitMutationObserver;
var requestAnimationFrame = win.requestAnimationFrame || (function (fn) { return setTimeout(fn, 1000 / 60); });

var hasTouchEvents = 'ontouchstart' in win;
var hasPointerEvents = win.PointerEvent;
var hasTouch = 'ontouchstart' in win
    || win.DocumentTouch && doc instanceof DocumentTouch
    || navigator.msPointerEnabled && navigator.msMaxTouchPoints // IE 10
    || navigator.pointerEnabled && navigator.maxTouchPoints; // IE >=11

var pointerDown = !hasTouch ? 'mousedown' : ("mousedown " + (hasTouchEvents ? 'touchstart' : 'pointerdown'));
var pointerMove = !hasTouch ? 'mousemove' : ("mousemove " + (hasTouchEvents ? 'touchmove' : 'pointermove'));
var pointerUp = !hasTouch ? 'mouseup' : ("mouseup " + (hasTouchEvents ? 'touchend' : 'pointerup'));
var pointerEnter = hasTouch && hasPointerEvents ? 'pointerenter' : 'mouseenter';
var pointerLeave = hasTouch && hasPointerEvents ? 'pointerleave' : 'mouseleave';

var transitionend = prefix('transition', 'transition-end');
var animationstart = prefix('animation', 'animation-start');
var animationend = prefix('animation', 'animation-end');

function getImage(src) {

    return new Promise(function (resolve, reject) {
        var img = new Image();

        img.onerror = reject;
        img.onload = function () { return resolve(img); };

        img.src = src;
    });

}

function prefix(name, event) {

    var ucase = classify(name),
        lowered = classify(event).toLowerCase(),
        classified = classify(event),
        element = doc.body || docEl,
        names = ( obj = {}, obj[name] = lowered, obj[("Webkit" + ucase)] = ("webkit" + classified), obj[("Moz" + ucase)] = lowered, obj[("o" + ucase)] = ("o" + classified + " o" + lowered), obj );
    var obj;

    for (name in names) {
        if (element.style[name] !== undefined) {
            return names[name];
        }
    }
}

function on() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs$1(args);
    var target = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];

    target = toEventTarget(target);

    if (selector) {
        listener = delegate(target, selector, listener);
    }

    if (listener.length > 1) {
        listener = detail(listener);
    }

    type.split(' ').forEach(function (type) { return target.addEventListener(type, listener, useCapture); });
    return function () { return off(target, type, listener, useCapture); };
}

function off(target, type, listener, useCapture) {
    if ( useCapture === void 0 ) useCapture = false;

    type.split(' ').forEach(function (type) { return toEventTarget(target).removeEventListener(type, listener, useCapture); });
}

function once() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];


    var ref = getArgs$1(args);
    var element = ref[0];
    var type = ref[1];
    var selector = ref[2];
    var listener = ref[3];
    var useCapture = ref[4];
    var condition = ref[5];
    var off = on(element, type, selector, function (e) {
            var result = !condition || condition(e);
            if (result) {
                off();
                listener(e, result);
            }
        }, useCapture);

    return off;
}

function trigger(target, event, detail) {
    return toEventTargets(target).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
    , true);
}

function createEvent(e, bubbles, cancelable, detail) {
    if ( bubbles === void 0 ) bubbles = true;
    if ( cancelable === void 0 ) cancelable = false;

    if (isString(e)) {
        var event = doc.createEvent('CustomEvent');
        event.initCustomEvent(e, bubbles, cancelable, detail);
        e = event;
    }

    return e;
}

function getArgs$1(args) {

    if (isString(args[0])) {
        args[0] = $$1(args[0]);
    }

    if (isFunction(args[2])) {
        args.splice(2, 0, false);
    }
    return args;
}

function delegate(element, selector, listener) {
    var this$1 = this;

    return function (e) {

        var target = e.target,
            current = selector[0] === '>'
                ? $$(selector, element).filter(function (element) { return within(target, element); })[0]
                : closest(target, selector);

        if (current) {
            e.delegate = element;
            e.current = current;

            listener.call(this$1, e);
        }
    }
}

function detail(listener) {
    return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); };
}

function isEventTarget(target) {
    return 'EventTarget' in win
        ? target instanceof EventTarget
        : 'addEventListener' in target;
}

function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
}

function toEventTargets(target) {
    return isEventTarget(target)
        ? [target]
        : isArray(target)
            ? target.map(toEventTarget).filter(Boolean)
            : toNodes(target);
}

/*
    Based on:
    Copyright (c) 2016 Wilson Page wilsonpage@me.com
    https://github.com/wilsonpage/fastdom
*/

var fastdom = {

    reads: [],
    writes: [],

    measure: function measure(task) {
        this.reads.push(task);
        scheduleFlush();
        return task;
    },

    mutate: function mutate(task) {
        this.writes.push(task);
        scheduleFlush();
        return task;
    },

    clear: function clear(task) {
        return remove$1(this.reads, task) || remove$1(this.writes, task);
    },

    flush: function flush() {

        runTasks(this.reads);
        runTasks(this.writes.splice(0, this.writes.length));

        this.scheduled = false;

        if (this.reads.length || this.writes.length) {
            scheduleFlush();
        }

    }

};

function scheduleFlush() {
    if (!fastdom.scheduled) {
        fastdom.scheduled = true;
        requestAnimationFrame(fastdom.flush.bind(fastdom));
    }
}

function runTasks(tasks) {
    var task;
    while (task = tasks.shift()) {
        task();
    }
}

function remove$1(array, item) {
    var index = array.indexOf(item);
    return !!~index && !!array.splice(index, 1);
}

function MouseTracker() {}

MouseTracker.prototype = {

    positions: [],
    position: null,

    init: function init() {
        var this$1 = this;


        this.positions = [];
        this.position = null;

        var ticking = false;
        this.unbind = on(doc, 'mousemove', function (e) {

            if (ticking) {
                return;
            }

            setTimeout(function () {

                var time = Date.now(), length = this$1.positions.length;
                if (length && (time - this$1.positions[length - 1].time > 100)) {
                    this$1.positions.splice(0, length);
                }

                this$1.positions.push({time: time, x: e.pageX, y: e.pageY});

                if (this$1.positions.length > 5) {
                    this$1.positions.shift();
                }

                ticking = false;
            }, 5);

            ticking = true;
        });

    },

    cancel: function cancel() {
        if (this.unbind) {
            this.unbind();
        }
    },

    movesTo: function movesTo(target) {

        if (this.positions.length < 2) {
            return false;
        }

        var p = offset(target),
            position = this.positions[this.positions.length - 1],
            prevPos = this.positions[0];

        if (p.left <= position.x && position.x <= p.right && p.top <= position.y && position.y <= p.bottom) {
            return false;
        }

        var points = [
            [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
            [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
        ];

        if (p.right <= position.x) {

        } else if (p.left >= position.x) {
            points[0].reverse();
            points[1].reverse();
        } else if (p.bottom <= position.y) {
            points[0].reverse();
        } else if (p.top >= position.y) {
            points[1].reverse();
        }

        return !!points.reduce(function (result, point) {
            return result + (slope(prevPos, point[0]) < slope(position, point[0]) && slope(prevPos, point[1]) > slope(position, point[1]));
        }, 0);
    }

};

function slope(a, b) {
    return (b.y - a.y) / (b.x - a.x);
}

var strats = {};

// concat strategy
strats.args =
strats.created =
strats.events =
strats.init =
strats.ready =
strats.connected =
strats.disconnected =
strats.destroy = function (parentVal, childVal) {

    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

    return childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
};

// update strategy
strats.update = function (parentVal, childVal) {
    return strats.args(parentVal, isFunction(childVal) ? {read: childVal} : childVal);
};

// property strategy
strats.props = function (parentVal, childVal) {

    if (isArray(childVal)) {
        childVal = childVal.reduce(function (value, key) {
            value[key] = String;
            return value;
        }, {});
    }

    return strats.methods(parentVal, childVal);
};

// extend strategy
strats.computed =
strats.defaults =
strats.methods = function (parentVal, childVal) {
    return childVal
        ? parentVal
            ? assign({}, parentVal, childVal)
            : childVal
        : parentVal;
};

// default strategy
var defaultStrat = function (parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
};

function mergeOptions(parent, child) {

    var options = {}, key;

    if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
            parent = mergeOptions(parent, child.mixins[i]);
        }
    }

    for (key in parent) {
        mergeKey(key);
    }

    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeKey(key);
        }
    }

    function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key]);
    }

    return options;
}

var id = 0;

var Player = function Player(el) {
    this.id = ++id;
    this.el = toNode(el);
};

Player.prototype.isVideo = function isVideo () {
    return this.isYoutube() || this.isVimeo() || this.isHTML5();
};

Player.prototype.isHTML5 = function isHTML5 () {
    return this.el.tagName === 'VIDEO';
};

Player.prototype.isIFrame = function isIFrame () {
    return this.el.tagName === 'IFRAME';
};

Player.prototype.isYoutube = function isYoutube () {
    return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
};

Player.prototype.isVimeo = function isVimeo () {
    return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
};

Player.prototype.enableApi = function enableApi () {
        var this$1 = this;


    if (this.ready) {
        return this.ready;
    }

    var youtube = this.isYoutube(), vimeo = this.isVimeo(), poller;

    if (youtube || vimeo) {

        return this.ready = new Promise(function (resolve) {

            once(this$1.el, 'load', function () {
                if (youtube) {
                    var listener = function () { return post(this$1.el, {event: 'listening', id: this$1.id}); };
                    poller = setInterval(listener, 100);
                    listener();
                }
            });

            listen(function (data) { return youtube && data.id === this$1.id && data.event === 'onReady' || vimeo && Number(data.player_id) === this$1.id; })
                .then(function () {
                    resolve();
                    poller && clearInterval(poller);
                });

            attr(this$1.el, 'src', ("" + (this$1.el.src) + (includes(this$1.el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : ("api=1&player_id=" + id))));

        });

    }

    return Promise.resolve();

};

Player.prototype.play = function play () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'playVideo', method: 'play'}); });
    } else if (this.isHTML5()) {
        this.el.play();
    }
};

Player.prototype.pause = function pause () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'pauseVideo', method: 'pause'}); });
    } else if (this.isHTML5()) {
        this.el.pause();
    }
};

Player.prototype.mute = function mute () {
        var this$1 = this;


    if (!this.isVideo()) {
        return;
    }

    if (this.isIFrame()) {
        this.enableApi().then(function () { return post(this$1.el, {func: 'mute', method: 'setVolume', value: 0}); });
    } else if (this.isHTML5()) {
        this.el.muted = true;
        attr(this.el, 'muted', '');
    }

};

function post(el, cmd) {
    try {
        el.contentWindow.postMessage(JSON.stringify(assign({event: 'command'}, cmd)), '*');
    } catch (e) {}
}

function listen(cb) {

    return new Promise(function (resolve) {

        once(win, 'message', function (_, data) { return resolve(data); }, false, function (ref) {
            var data = ref.data;


            if (!data || !isString(data)) {
                return;
            }

            try {
                data = JSON.parse(data);
            } catch (e) {
                return;
            }

            return data && cb(data);

        });

    });

}

var dirs = {
        width: ['x', 'left', 'right'],
        height: ['y', 'top', 'bottom']
    };

function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

    elAttach = getPos(elAttach);
    targetAttach = getPos(targetAttach);

    var flipped = {element: elAttach, target: targetAttach};

    if (!element || !target) {
        return flipped;
    }

    var dim = getDimensions(element),
        targetDim = getDimensions(target),
        position = targetDim;

    moveTo(position, elAttach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);

    elOffset = getOffsets(elOffset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

    elOffset['x'] += targetOffset['x'];
    elOffset['y'] += targetOffset['y'];

    position.left += elOffset['x'];
    position.top += elOffset['y'];

    boundary = getDimensions(boundary || getWindow(element));

    if (flip) {
        each(dirs, function (ref, prop) {
            var dir = ref[0];
            var align = ref[1];
            var alignFlip = ref[2];


            if (!(flip === true || includes(flip, dir))) {
                return;
            }

            var elemOffset = elAttach[dir] === align
                    ? -dim[prop]
                    : elAttach[dir] === alignFlip
                        ? dim[prop]
                        : 0,
                targetOffset = targetAttach[dir] === align
                    ? targetDim[prop]
                    : targetAttach[dir] === alignFlip
                        ? -targetDim[prop]
                        : 0;

            if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                var centerOffset = dim[prop] / 2,
                    centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

                elAttach[dir] === 'center' && (
                    apply(centerOffset, centerTargetOffset)
                    || apply(-centerOffset, -centerTargetOffset)
                ) || apply(elemOffset, targetOffset);

            }

            function apply(elemOffset, targetOffset) {

                var newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

                if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                    position[align] = newVal;

                    ['element', 'target'].forEach(function (el) {
                        flipped[el][dir] = !elemOffset
                            ? flipped[el][dir]
                            : flipped[el][dir] === dirs[prop][1]
                                ? dirs[prop][2]
                                : dirs[prop][1];
                    });

                    return true;
                }

            }

        });
    }

    offset(element, position);

    return flipped;
}

function offset(element, coordinates) {

    element = toNode(element);

    if (coordinates) {

        var currentOffset = offset(element),
            pos = css(element, 'position');

        ['left', 'top'].forEach(function (prop) {
            if (prop in coordinates) {
                var value = css(element, prop);
                element.style[prop] = ((coordinates[prop] - currentOffset[prop]) 
                    + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value)) + "px";
            }
        });

        return;
    }

    return getDimensions(element);
}

function getDimensions(element) {

    element = toNode(element);

    var ref = getWindow(element);
    var top = ref.pageYOffset;
    var left = ref.pageXOffset;

    if (isWindow(element)) {

        var height = element.innerHeight,
            width = element.innerWidth;

        return {
            top: top,
            left: left,
            height: height,
            width: width,
            bottom: top + height,
            right: left + width,
        }
    }

    var display = false;
    if (!isVisible(element)) {
        display = element.style.display;
        element.style.display = 'block';
    }

    var rect = element.getBoundingClientRect();

    if (display !== false) {
        element.style.display = display;
    }

    return {
        height: rect.height,
        width: rect.width,
        top: rect.top + top,
        left: rect.left + left,
        bottom: rect.bottom + top,
        right: rect.right + left,
    }
}

function position(element) {
    element = toNode(element);

    var parent = offsetParent(element),
        parentOffset = parent === docEl$1(element) ? {top: 0, left: 0} : offset(parent);

    return ['top', 'left'].reduce(function (props, prop) {
        var propName = ucfirst(prop);
        props[prop] -= parentOffset[prop]
            + (toFloat(css(element, ("margin" + propName))) || 0)
            + (toFloat(css(parent, ("border" + propName + "Width"))) || 0);
        return props;
    }, offset(element));
}

function offsetParent(element) {

    var parent = toNode(element).offsetParent;

    while (parent && css(parent, 'position') === 'static') {
        parent = parent.offsetParent;
    }

    return parent || docEl$1(element);
}

var height = dimension('height');
var width = dimension('width');

function dimension(prop) {
    var propName = ucfirst(prop);
    return function (element, value) {

        element = toNode(element);

        if (isUndefined(value)) {

            if (isWindow(element)) {
                return element[("inner" + propName)];
            }

            if (isDocument(element)) {
                var doc = element.documentElement;
                return Math.max(doc.offsetHeight, doc.scrollHeight);
            }

            value = css(element, prop);
            value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;

            return getContentSize(prop, element, value);

        } else {

            css(element, prop, !value && value !== 0
                ? ''
                : getContentSize(prop, element, value) + 'px'
            );

        }

    }
}

function getContentSize(prop, element, value) {
    return css(element, 'boxSizing') === 'border-box' ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value
            - toFloat(css(element, ("padding" + prop)))
            - toFloat(css(element, ("border" + prop + "Width"))); }
    , value) : value;
}

function getWindow(element) {
    return isWindow(element) ? element : document$1(element).defaultView;
}

function moveTo(position, attach, dim, factor) {
    each(dirs, function (ref, prop) {
        var dir = ref[0];
        var align = ref[1];
        var alignFlip = ref[2];

        if (attach[dir] === alignFlip) {
            position[align] += dim[prop] * factor;
        } else if (attach[dir] === 'center') {
            position[align] += dim[prop] * factor / 2;
        }
    });
}

function getPos(pos) {

    var x = /left|center|right/, y = /top|center|bottom/;

    pos = (pos || '').split(' ');

    if (pos.length === 1) {
        pos = x.test(pos[0])
            ? pos.concat(['center'])
            : y.test(pos[0])
                ? ['center'].concat(pos)
                : ['center', 'center'];
    }

    return {
        x: x.test(pos[0]) ? pos[0] : 'center',
        y: y.test(pos[1]) ? pos[1] : 'center'
    };
}

function getOffsets(offsets, width, height) {

    var ref = (offsets || '').split(' ');
    var x = ref[0];
    var y = ref[1];

    return {
        x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
        y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
    };
}

function flipPosition(pos) {
    switch (pos) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'top':
            return 'bottom';
        case 'bottom':
            return 'top';
        default:
            return pos;
    }
}

function document$1(element) {
    return toNode(element).ownerDocument;
}

function docEl$1(element) {
    return document$1(element).documentElement;
}

/*
    Based on:
    Copyright (c) 2010-2016 Thomas Fuchs
    http://zeptojs.com/
*/

var touch = {};
var clickTimeout;
var swipeTimeout;
var tapTimeout;
var clicked;

function swipeDirection(ref) {
    var x1 = ref.x1;
    var x2 = ref.x2;
    var y1 = ref.y1;
    var y2 = ref.y2;

    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
}

function cancelAll() {
    clickTimeout && clearTimeout(clickTimeout);
    swipeTimeout && clearTimeout(swipeTimeout);
    tapTimeout && clearTimeout(tapTimeout);
    clickTimeout = swipeTimeout = tapTimeout = null;
    touch = {};
}

ready(function () {

    on(doc, 'click', function () { return clicked = true; }, true);

    on(doc, pointerDown, function (e) {

        var target = e.target;
        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;
        var now = Date.now();

        touch.el = 'tagName' in target ? target : target.parentNode;

        clickTimeout && clearTimeout(clickTimeout);

        touch.x1 = x;
        touch.y1 = y;

        if (touch.last && now - touch.last <= 250) {
            touch = {};
        }

        touch.last = now;

        clicked = e.button > 0;

    });

    on(doc, pointerMove, function (e) {

        var ref = getPos$1(e);
        var x = ref.x;
        var y = ref.y;

        touch.x2 = x;
        touch.y2 = y;
    });

    on(doc, pointerUp, function (ref) {
        var target = ref.target;


        // swipe
        if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {

            swipeTimeout = setTimeout(function () {
                if (touch.el) {
                    trigger(touch.el, 'swipe');
                    trigger(touch.el, ("swipe" + (swipeDirection(touch))));
                }
                touch = {};
            });

        // normal tap
        } else if ('last' in touch) {

            tapTimeout = setTimeout(function () { return touch.el && trigger(touch.el, 'tap'); });

            // trigger single click after 350ms of inactivity
            if (touch.el && within(target, touch.el)) {
                clickTimeout = setTimeout(function () {
                    clickTimeout = null;
                    if (touch.el && !clicked) {
                        trigger(touch.el, 'click');
                    }
                    touch = {};
                }, 350);
            }

        } else {
            touch = {};
        }
    });

    on(doc, 'touchcancel', cancelAll);
    on(win, 'scroll', cancelAll);
});

var touching = false;
on(doc, 'touchstart', function () { return touching = true; }, true);
on(doc, 'click', function () {touching = false;});
on(doc, 'touchcancel', function () { return touching = false; }, true);

function isTouch(e) {
    return touching || e.pointerType === 'touch';
}

function getPos$1(e) {
    var touches = e.touches;
    var changedTouches = e.changedTouches;
    
    var ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
    var x = ref.pageX;
    var y = ref.pageY;
    return {x: x, y: y};
}



var util = Object.freeze({
	bind: bind,
	hasOwn: hasOwn,
	Promise: Promise,
	classify: classify,
	hyphenate: hyphenate,
	camelize: camelize,
	ucfirst: ucfirst,
	startsWith: startsWith,
	endsWith: endsWith,
	includes: includes,
	isArray: isArray,
	isFunction: isFunction,
	isObject: isObject,
	isPlainObject: isPlainObject,
	isWindow: isWindow,
	isDocument: isDocument,
	isBoolean: isBoolean,
	isString: isString,
	isNumber: isNumber,
	isNumeric: isNumeric,
	isUndefined: isUndefined,
	toBoolean: toBoolean,
	toNumber: toNumber,
	toFloat: toFloat,
	toList: toList,
	toMedia: toMedia,
	coerce: coerce,
	toMs: toMs,
	swap: swap,
	assign: assign,
	each: each,
	clamp: clamp,
	noop: noop,
	intersectRect: intersectRect,
	pointInRect: pointInRect,
	ajax: ajax,
	$: $$1,
	$$: $$,
	query: query,
	queryAll: queryAll,
	filter: filter,
	within: within,
	matches: matches,
	closest: closest,
	parents: parents,
	isJQuery: isJQuery,
	toNode: toNode,
	toNodes: toNodes,
	attr: attr,
	hasAttr: hasAttr,
	removeAttr: removeAttr,
	filterAttr: filterAttr,
	data: data,
	win: win,
	doc: doc,
	docEl: docEl,
	isRtl: isRtl,
	isReady: isReady,
	ready: ready,
	transition: transition,
	Transition: Transition,
	animate: animate,
	Animation: Animation,
	isInView: isInView,
	scrolledOver: scrolledOver,
	getIndex: getIndex,
	isVoidElement: isVoidElement,
	Dimensions: Dimensions,
	preventClick: preventClick,
	isVisible: isVisible,
	selInput: selInput,
	isInput: isInput,
	empty: empty,
	html: html,
	prepend: prepend,
	append: append,
	before: before,
	after: after,
	remove: remove,
	wrapAll: wrapAll,
	wrapInner: wrapInner,
	unwrap: unwrap,
	fragment: fragment,
	index: index,
	css: css,
	getStyles: getStyles,
	getStyle: getStyle,
	getCssVar: getCssVar,
	addClass: addClass,
	removeClass: removeClass,
	removeClasses: removeClasses,
	replaceClass: replaceClass,
	hasClass: hasClass,
	toggleClass: toggleClass,
	Observer: Observer,
	requestAnimationFrame: requestAnimationFrame,
	hasTouch: hasTouch,
	pointerDown: pointerDown,
	pointerMove: pointerMove,
	pointerUp: pointerUp,
	pointerEnter: pointerEnter,
	pointerLeave: pointerLeave,
	transitionend: transitionend,
	animationstart: animationstart,
	animationend: animationend,
	getImage: getImage,
	on: on,
	off: off,
	once: once,
	trigger: trigger,
	createEvent: createEvent,
	toEventTargets: toEventTargets,
	fastdom: fastdom,
	MouseTracker: MouseTracker,
	mergeOptions: mergeOptions,
	Player: Player,
	positionAt: positionAt,
	offset: offset,
	position: position,
	height: height,
	width: width,
	flipPosition: flipPosition,
	isTouch: isTouch,
	getPos: getPos$1
});

var boot = function (UIkit) {

    var connect = UIkit.connect;
    var disconnect = UIkit.disconnect;

    if (Observer) {

        if (doc.body) {

            init();

        } else {

            (new Observer(function () {

                if (doc.body) {
                    this.disconnect();
                    init();
                }

            })).observe(docEl, {childList: true, subtree: true});

        }

    } else {

        ready(function () {
            apply(doc.body, connect);
            on(docEl, 'DOMNodeInserted', function (e) { return apply(e.target, connect); });
            on(docEl, 'DOMNodeRemoved', function (e) { return apply(e.target, disconnect); });
        });

    }

    function init() {

        apply(doc.body, connect);

        fastdom.flush();

        (new Observer(function (mutations) { return mutations.forEach(function (ref) {
                var addedNodes = ref.addedNodes;
                var removedNodes = ref.removedNodes;
                var target = ref.target;


                for (var i = 0; i < addedNodes.length; i++) {
                    apply(addedNodes[i], connect);
                }

                for (i = 0; i < removedNodes.length; i++) {
                    apply(removedNodes[i], disconnect);
                }

                UIkit.update(createEvent('update', true, false, {mutation: true}), target, true);

            }); }
        )).observe(docEl, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['href']
        });

        UIkit._initialized = true;
    }

    function apply(node, fn) {

        if (node.nodeType !== 1 || hasAttr(node, 'uk-no-boot')) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            var next = node.nextElementSibling;
            apply(node, fn);
            node = next;
        }
    }

};

var globalAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.use = function (plugin) {

        if (plugin.installed) {
            return;
        }

        plugin.call(null, this);
        plugin.installed = true;

        return this;
    };

    UIkit.mixin = function (mixin, component) {
        component = (isString(component) ? UIkit.components[component] : component) || this;
        mixin = mergeOptions({}, mixin);
        mixin.mixins = component.options.mixins;
        delete component.options.mixins;
        component.options = mergeOptions(mixin, component.options);
    };

    UIkit.extend = function (options) {

        options = options || {};

        var Super = this, name = options.name || Super.options.name;
        var Sub = createClass(name || 'UIkitComponent');

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);

        Sub['super'] = Super;
        Sub.extend = Super.extend;

        return Sub;
    };

    UIkit.update = function (e, element, parents) {
        if ( parents === void 0 ) parents = false;


        e = createEvent(e || 'update');

        if (!element) {

            update(UIkit.instances, e);
            return;

        }

        element = toNode(element);

        if (parents) {

            do {

                update(element[DATA], e);
                element = element.parentNode;

            } while (element)

        } else {

            apply(element, function (element) { return update(element[DATA], e); });

        }

    };

    var container;
    Object.defineProperty(UIkit, 'container', {

        get: function get() {
            return container || doc.body;
        },

        set: function set(element) {
            container = element;
        }

    });

    function createClass(name) {
        return new Function(("return function " + (classify(name)) + " (options) { this._init(options); }"))();
    }

    function apply(node, fn) {

        if (node.nodeType !== 1) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            apply(node, fn);
            node = node.nextElementSibling;
        }
    }

    function update(data, e) {

        if (!data) {
            return;
        }

        for (var name in data) {
            if (data[name]._isReady) {
                data[name]._callUpdate(e);
            }
        }

    }

};

var hooksAPI = function (UIkit) {

    UIkit.prototype._callHook = function (hook) {
        var this$1 = this;


        var handlers = this.$options[hook];

        if (handlers) {
            handlers.forEach(function (handler) { return handler.call(this$1); });
        }
    };

    UIkit.prototype._callReady = function () {

        if (this._isReady) {
            return;
        }

        this._isReady = true;
        this._callHook('ready');
        this._callUpdate();
    };

    UIkit.prototype._callConnected = function () {
        var this$1 = this;


        if (this._connected) {
            return;
        }

        if (!includes(UIkit.elements, this.$options.el)) {
            UIkit.elements.push(this.$options.el);
        }

        UIkit.instances[this._uid] = this;

        this._initEvents();

        this._callHook('connected');
        this._connected = true;

        this._initObserver();

        if (!this._isReady) {
            ready(function () { return this$1._callReady(); });
        }

        this._callUpdate();
    };

    UIkit.prototype._callDisconnected = function () {

        if (!this._connected) {
            return;
        }

        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }

        var index = UIkit.elements.indexOf(this.$options.el);

        if (~index) {
            UIkit.elements.splice(index, 1);
        }

        delete UIkit.instances[this._uid];

        this._unbindEvents();
        this._callHook('disconnected');

        this._connected = false;

    };

    UIkit.prototype._callUpdate = function (e) {
        var this$1 = this;


        e = createEvent(e || 'update');

        var type = e.type;
        var detail = e.detail;

        if (type === 'update' && detail && detail.mutation) {
            this._computeds = {};
        }

        var updates = this.$options.update;

        if (!updates) {
            return;
        }

        updates.forEach(function (update, i) {

            if (type !== 'update' && !includes(update.events, type)) {
                return;
            }

            if (update.read && !includes(fastdom.reads, this$1._frames.reads[i])) {
                this$1._frames.reads[i] = fastdom.measure(function () {
                    update.read.call(this$1, e);
                    delete this$1._frames.reads[i];
                });
            }

            if (update.write && !includes(fastdom.writes, this$1._frames.writes[i])) {
                this$1._frames.writes[i] = fastdom.mutate(function () {
                    update.write.call(this$1, e);
                    delete this$1._frames.writes[i];
                });
            }

        });

    };

};

var stateAPI = function (UIkit) {

    var uid = 0;

    UIkit.prototype.props = {};

    UIkit.prototype._init = function (options) {

        options = options || {};
        options = this.$options = mergeOptions(this.constructor.options, options, this);

        this.$el = null;
        this.$name = UIkit.prefix + hyphenate(this.$options.name);
        this.$props = {};

        this._frames = {reads: {}, writes: {}};
        this._events = [];

        this._uid = uid++;
        this._initData();
        this._initMethods();
        this._initComputeds();
        this._callHook('created');

        if (options.el) {
            this.$mount(options.el);
        }
    };

    UIkit.prototype._initData = function () {
        var this$1 = this;


        var ref = this.$options;
        var defaults = ref.defaults;
        var data$$1 = ref.data; if ( data$$1 === void 0 ) data$$1 = {};
        var args = ref.args; if ( args === void 0 ) args = [];
        var props = ref.props; if ( props === void 0 ) props = {};
        var el = ref.el;

        if (args.length && isArray(data$$1)) {
            data$$1 = data$$1.slice(0, args.length).reduce(function (data$$1, value, index) {
                if (isPlainObject(value)) {
                    assign(data$$1, value);
                } else {
                    data$$1[args[index]] = value;
                }
                return data$$1;
            }, {});
        }

        for (var key in defaults) {
            this$1.$props[key] = this$1[key] = hasOwn(data$$1, key) && !isUndefined(data$$1[key])
                ? coerce(props[key], data$$1[key], el)
                : isArray(defaults[key])
                    ? defaults[key].concat()
                    : defaults[key];
        }
    };

    UIkit.prototype._initMethods = function () {
        var this$1 = this;


        var methods = this.$options.methods;

        if (methods) {
            for (var key in methods) {
                this$1[key] = bind(methods[key], this$1);
            }
        }
    };

    UIkit.prototype._initComputeds = function () {
        var this$1 = this;


        var computed = this.$options.computed;

        this._computeds = {};

        if (computed) {
            for (var key in computed) {
                registerComputed(this$1, key, computed[key]);
            }
        }
    };

    UIkit.prototype._initProps = function (props) {
        var this$1 = this;


        this._computeds = {};
        assign(this.$props, props || getProps(this.$options, this.$name));

        var exclude = [this.$options.computed, this.$options.methods];
        for (var key in this$1.$props) {
            if (notIn(exclude, key)) {
                this$1[key] = this$1.$props[key];
            }
        }
    };

    UIkit.prototype._initEvents = function () {
        var this$1 = this;


        var events = this.$options.events;

        if (events) {

            events.forEach(function (event) {

                if (!hasOwn(event, 'handler')) {
                    for (var key in event) {
                        registerEvent(this$1, event[key], key);
                    }
                } else {
                    registerEvent(this$1, event);
                }

            });
        }
    };

    UIkit.prototype._unbindEvents = function () {
        this._events.forEach(function (unbind) { return unbind(); });
        this._events = [];
    };

    UIkit.prototype._initObserver = function () {
        var this$1 = this;


        var ref = this.$options;
        var attrs = ref.attrs;
        var props = ref.props;
        var el = ref.el;
        if (this._observer || !props || !attrs || !Observer) {
            return;
        }

        attrs = isArray(attrs) ? attrs : Object.keys(props).map(function (key) { return hyphenate(key); });

        this._observer = new Observer(function () {

            var data$$1 = getProps(this$1.$options, this$1.$name);
            if (attrs.some(function (key) { return !isUndefined(data$$1[key]) && data$$1[key] !== this$1.$props[key]; })) {
                this$1.$reset(data$$1);
            }

        });

        this._observer.observe(el, {attributes: true, attributeFilter: attrs.concat([this.$name, ("data-" + (this.$name))])});
    };

    function getProps(opts, name) {

        var data$$1 = {};
        var args = opts.args; if ( args === void 0 ) args = [];
        var props = opts.props; if ( props === void 0 ) props = {};
        var el = opts.el;
        var key, prop;

        if (!props) {
            return data$$1;
        }

        for (key in props) {
            prop = hyphenate(key);
            if (hasAttr(el, prop)) {

                var value = coerce(props[key], attr(el, prop), el);

                if (prop === 'target' && (!value || startsWith(value, '_'))) {
                    continue;
                }

                data$$1[key] = value;
            }
        }

        var options = parseOptions(data(el, name), args);

        for (key in options) {
            prop = camelize(key);
            if (props[prop] !== undefined) {
                data$$1[prop] = coerce(props[prop], options[key], el);
            }
        }

        return data$$1;
    }

    function parseOptions(options, args) {
        if ( args === void 0 ) args = [];


        try {

            return !options
                ? {}
                : startsWith(options, '{')
                    ? JSON.parse(options)
                    : args.length && !includes(options, ':')
                        ? (( obj = {}, obj[args[0]] = options, obj ))
                        : options.split(';').reduce(function (options, option) {
                            var ref = option.split(/:(.+)/);
                            var key = ref[0];
                            var value = ref[1];
                            if (key && value) {
                                options[key.trim()] = value.trim();
                            }
                            return options;
                        }, {});
            var obj;

        } catch (e) {
            return {};
        }

    }

    function registerComputed(component, key, cb) {
        Object.defineProperty(component, key, {

            enumerable: true,

            get: function get() {

                var _computeds = component._computeds;
                var $props = component.$props;
                var $el = component.$el;

                if (!hasOwn(_computeds, key)) {
                    _computeds[key] = cb.call(component, $props, $el);
                }

                return _computeds[key];
            },

            set: function set(value) {
                component._computeds[key] = value;
            }

        });
    }

    function registerEvent(component, event, key) {

        if (!isPlainObject(event)) {
            event = ({name: key, handler: event});
        }

        var name = event.name;
        var el = event.el;
        var delegate = event.delegate;
        var self = event.self;
        var filter = event.filter;
        var handler = event.handler;
        el = isFunction(el)
            ? el.call(component)
            : el || component.$el;

        if (isArray(el)) {
            el.forEach(function (el) { return registerEvent(component, assign({}, event, {el: el}), key); });
            return;
        }

        if (!el || filter && !filter.call(component)) {
            return;
        }

        handler = detail(isString(handler) ? component[handler] : bind(handler, component));

        if (self) {
            handler = selfFilter(handler);
        }

        component._events.push(
            on(
                el,
                name,
                !delegate
                    ? null
                    : isString(delegate)
                        ? delegate
                        : delegate.call(component),
                handler
            )
        );

    }

    function selfFilter(handler) {
        return function selfHandler(e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return handler.call(null, e);
            }
        }
    }

    function notIn(options, key) {
        return options.every(function (arr) { return !arr || !hasOwn(arr, key); });
    }

    function detail(listener) {
        return function (e) { return isArray(e.detail) ? listener.apply(listener, [e].concat(e.detail)) : listener(e); };
    }

};

var instanceAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.prototype.$mount = function (el) {

        var name = this.$options.name;

        if (!el[DATA]) {
            el[DATA] = {};
        }

        if (el[DATA][name]) {
            return;
        }

        el[DATA][name] = this;

        this.$el = this.$options.el = this.$options.el || el;

        this._initProps();

        this._callHook('init');

        if (within(el, docEl)) {
            this._callConnected();
        }
    };

    UIkit.prototype.$emit = function (e) {
        this._callUpdate(e);
    };

    UIkit.prototype.$update = function (e, parents) {
        UIkit.update(e, this.$options.el, parents);
    };

    UIkit.prototype.$reset = function (data) {
        this._callDisconnected();
        this._initProps(data);
        this._callConnected();
    };

    UIkit.prototype.$destroy = function (removeEl) {
        if ( removeEl === void 0 ) removeEl = false;


        var ref = this.$options;
        var el = ref.el;
        var name = ref.name;

        if (el) {
            this._callDisconnected();
        }

        this._callHook('destroy');

        if (!el || !el[DATA]) {
            return;
        }

        delete el[DATA][name];

        if (!Object.keys(el[DATA]).length) {
            delete el[DATA];
        }

        if (removeEl) {
            remove(this.$el);
        }
    };

};

var componentAPI = function (UIkit) {

    var DATA = UIkit.data;

    UIkit.components = {};

    UIkit.component = function (id, options) {

        var name = camelize(id);

        if (isPlainObject(options)) {
            options.name = name;
            options = UIkit.extend(options);
        } else if (isUndefined(options)) {
            return UIkit.components[name]
        } else {
            options.options.name = name;
        }

        UIkit.components[name] = options;

        UIkit[name] = function (element, data) {
            var i = arguments.length, argsArray = Array(i);
            while ( i-- ) argsArray[i] = arguments[i];


            if (isPlainObject(element)) {
                return new UIkit.components[name]({data: element});
            }

            if (UIkit.components[name].options.functional) {
                return new UIkit.components[name]({data: [].concat( argsArray )});
            }

            return element && element.nodeType ? init(element) : $$(element).map(init)[0];

            function init(element) {
                return UIkit.getComponent(element, name) || new UIkit.components[name]({el: element, data: data || {}});
            }

        };

        if (UIkit._initialized && !options.options.functional) {
            fastdom.measure(function () { return UIkit[name](("[uk-" + id + "],[data-uk-" + id + "]")); });
        }

        return UIkit.components[name];
    };

    UIkit.getComponents = function (element) { return element && (element = isJQuery(element) ? element[0] : element) && element[DATA] || {}; };
    UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

    UIkit.connect = function (node) {

        var name;

        if (node[DATA]) {
            for (name in node[DATA]) {
                node[DATA][name]._callConnected();
            }
        }

        for (var i = 0; i < node.attributes.length; i++) {

            name = node.attributes[i].name;

            if (startsWith(name, 'uk-') || startsWith(name, 'data-uk-')) {

                name = camelize(name.replace('data-uk-', '').replace('uk-', ''));

                if (UIkit[name]) {
                    UIkit[name](node);
                }
            }
        }

    };

    UIkit.disconnect = function (node) {
        for (var name in node[DATA]) {
            node[DATA][name]._callDisconnected();
        }
    };

};

var UIkit$2 = function (options) {
    this._init(options);
};

UIkit$2.util = util;
UIkit$2.data = '__uikit__';
UIkit$2.prefix = 'uk-';
UIkit$2.options = {};
UIkit$2.instances = {};
UIkit$2.elements = [];

globalAPI(UIkit$2);
hooksAPI(UIkit$2);
stateAPI(UIkit$2);
instanceAPI(UIkit$2);
componentAPI(UIkit$2);

var Class = {

    init: function init() {
        addClass(this.$el, this.$name);
    }

};

var Container = {

    props: {
        container: Boolean
    },

    defaults: {
        container: true
    },

    computed: {

        container: function container(ref) {
            var container = ref.container;

            return container === true && UIkit$2.container || container && $(container) || UIkit$2.container;
        }

    }

};

var Togglable = {

    props: {
        cls: Boolean,
        animation: 'list',
        duration: Number,
        origin: String,
        transition: String,
        queued: Boolean
    },

    defaults: {
        cls: false,
        animation: [false],
        duration: 200,
        origin: false,
        transition: 'linear',
        queued: false,

        initProps: {
            overflow: '',
            height: '',
            paddingTop: '',
            paddingBottom: '',
            marginTop: '',
            marginBottom: ''
        },

        hideProps: {
            overflow: 'hidden',
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0
        }

    },

    computed: {

        hasAnimation: function hasAnimation(ref) {
            var animation = ref.animation;

            return !!animation[0];
        },

        hasTransition: function hasTransition(ref) {
            var animation = ref.animation;

            return this.hasAnimation && animation[0] === true;
        }

    },

    methods: {

        toggleElement: function toggleElement(targets, show, animate) {
            var this$1 = this;

            return new Promise(function (resolve) {

                targets = toNodes(targets);

                var all = function (targets) { return Promise.all(targets.map(function (el) { return this$1._toggleElement(el, show, animate); })); },
                    toggled = targets.filter(function (el) { return this$1.isToggled(el); }),
                    untoggled = targets.filter(function (el) { return !includes(toggled, el); }),
                    p;

                if (!this$1.queued || !isUndefined(animate) || !isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

                    p = all(untoggled.concat(toggled));

                } else {

                    var body = doc.body,
                        scroll = body.scrollTop,
                        el = toggled[0],
                        inProgress = Animation.inProgress(el) && hasClass(el, 'uk-animation-leave')
                            || Transition.inProgress(el) && el.style.height === '0px';

                    p = all(toggled);

                    if (!inProgress) {
                        p = p.then(function () {
                            var p = all(untoggled);
                            body.scrollTop = scroll;
                            return p;
                        });
                    }

                }

                p.then(resolve, noop);

            });
        },

        toggleNow: function toggleNow(targets, show) {
            var this$1 = this;

            return new Promise(function (resolve) { return Promise.all(toNodes(targets).map(function (el) { return this$1._toggleElement(el, show, false); })).then(resolve, noop); });
        },

        isToggled: function isToggled(el) {
            var nodes = toNodes(el || this.$el);
            return this.cls
                ? hasClass(nodes, this.cls.split(' ')[0])
                : !hasAttr(nodes, 'hidden');
        },

        updateAria: function updateAria(el) {
            if (this.cls === false) {
                attr(el, 'aria-hidden', !this.isToggled(el));
            }
        },

        _toggleElement: function _toggleElement(el, show, animate) {
            var this$1 = this;


            show = isBoolean(show)
                ? show
                : Animation.inProgress(el)
                    ? hasClass(el, 'uk-animation-leave')
                    : Transition.inProgress(el)
                        ? el.style.height === '0px'
                        : !this.isToggled(el);

            if (!trigger(el, ("before" + (show ? 'show' : 'hide')), [this])) {
                return Promise.reject();
            }

            var promise = (animate === false || !this.hasAnimation
                    ? this._toggleImmediate
                    : this.hasTransition
                        ? this._toggleHeight
                        : this._toggleAnimation
            )(el, show);

            trigger(el, show ? 'show' : 'hide', [this]);

            return promise.then(function () {
                trigger(el, show ? 'shown' : 'hidden', [this$1]);
                UIkit$2.update(null, el);
            });
        },

        _toggle: function _toggle(el, toggled) {

            if (this.cls) {
                toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
            } else {
                attr(el, 'hidden', !toggled ? '' : null);
            }

            $$('[autofocus]', el).some(function (el) { return isVisible(el) && (el.focus() || true); });

            this.updateAria(el);
            UIkit$2.update(null, el);
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            this._toggle(el, show);
            return Promise.resolve();
        },

        _toggleHeight: function _toggleHeight(el, show) {
            var this$1 = this;


            var inProgress = Transition.inProgress(el),
                inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0,
                currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0,
                endHeight;

            Transition.cancel(el);

            if (!this.isToggled(el)) {
                this._toggle(el, true);
            }

            height(el, '');

            // Update child components first
            fastdom.flush();

            endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);

            return (show
                ? Transition.start(el, assign({}, this.initProps, {overflow: 'hidden', height: endHeight}), Math.round(this.duration * (1 - currentHeight / endHeight)), this.transition)
                : Transition.start(el, this.hideProps, Math.round(this.duration * (currentHeight / endHeight)), this.transition).then(function () { return this$1._toggle(el, false); })
            ).then(function () { return css(el, this$1.initProps); });

        },

        _toggleAnimation: function _toggleAnimation(el, show) {
            var this$1 = this;


            Animation.cancel(el);

            if (show) {
                this._toggle(el, true);
                return Animation.in(el, this.animation[0], this.duration, this.origin);
            }

            return Animation.out(el, this.animation[1] || this.animation[0], this.duration, this.origin).then(function () { return this$1._toggle(el, false); });
        }

    }

};

var active;

var Modal = {

    mixins: [Class, Container, Togglable],

    props: {
        clsPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean
    },

    defaults: {
        cls: 'uk-open',
        escClose: true,
        bgClose: true,
        overlay: true,
        stack: false
    },

    computed: {

        panel: function panel(ref, $el) {
            var clsPanel = ref.clsPanel;

            return $$1(("." + clsPanel), $el);
        },

        transitionElement: function transitionElement() {
            return this.panel;
        },

        transitionDuration: function transitionDuration() {
            return toMs(css(this.transitionElement, 'transitionDuration'));
        }

    },

    events: [

        {

            name: 'click',

            delegate: function delegate() {
                return this.selClose;
            },

            handler: function handler(e) {
                e.preventDefault();
                this.hide();
            }

        },

        {

            name: 'toggle',

            handler: function handler(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.toggle();
            }

        },

        {

            name: 'show',

            self: true,

            handler: function handler() {

                if (!hasClass(docEl, this.clsPage)) {
                    this.scrollbarWidth = width(win) - docEl.offsetWidth;
                    css(doc.body, 'overflowY', this.scrollbarWidth && this.overlay ? 'scroll' : '');
                }

                addClass(docEl, this.clsPage);

            }

        },

        {

            name: 'hidden',

            self: true,

            handler: function handler() {
                var this$1 = this;


                var found, prev = this.prev;

                while (prev) {

                    if (prev.clsPage === this$1.clsPage) {
                        found = true;
                        break;
                    }

                    prev = prev.prev;

                }

                if (!found) {
                    removeClass(docEl, this.clsPage);

                }

                !this.prev && css(doc.body, 'overflowY', '');
            }

        }

    ],

    methods: {

        toggle: function toggle() {
            return this.isToggled() ? this.hide() : this.show();
        },

        show: function show() {

            if (this.isToggled()) {
                return;
            }

            if (this.container && this.$el.parentNode !== this.container) {
                append(this.container, this.$el);
                this._callConnected();
            }

            var prev = active && active !== this && active;

            active = this;

            if (prev) {
                if (this.stack) {
                    this.prev = prev;
                } else {
                    prev.hide().then(this.show);
                    return;
                }
            }

            registerEvents();

            return this.toggleNow(this.$el, true);
        },

        hide: function hide() {

            if (!this.isToggled()) {
                return;
            }

            active = active && active !== this && active || this.prev;

            if (!active) {
                deregisterEvents();
            }

            return this.toggleNow(this.$el, false);
        },

        getActive: function getActive() {
            return active;
        },

        _toggleImmediate: function _toggleImmediate(el, show) {
            var this$1 = this;


            requestAnimationFrame(function () { return this$1._toggle(el, show); });

            return this.transitionDuration
                ? new Promise(function (resolve) { return once(this$1.transitionElement, transitionend, resolve, false, function (e) { return e.target === this$1.transitionElement; }); })
                : Promise.resolve();

        },
    }

};

var events;

function registerEvents() {

    if (events) {
        return;
    }

    events = [
        on(doc, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            if (active && active.bgClose && !defaultPrevented && !within(target, active.panel)) {
                active.hide();
            }
        }),
        on(doc, 'keydown', function (e) {
            if (e.keyCode === 27 && active && active.escClose) {
                e.preventDefault();
                active.hide();
            }
        })
    ];
}

function deregisterEvents() {
    events && events.forEach(function (unbind) { return unbind(); });
    events = null;
}

var Position = {

    props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String
    },

    defaults: {
        pos: ("bottom-" + (!isRtl ? 'left' : 'right')),
        flip: true,
        offset: false,
        clsPos: ''
    },

    computed: {

        pos: function pos(ref) {
            var pos = ref.pos;

            return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
        },

        dir: function dir() {
            return this.pos[0];
        },

        align: function align() {
            return this.pos[1];
        }

    },

    methods: {

        positionAt: function positionAt$1(element, target, boundary) {

            removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));
            css(element, {top: '', left: ''});

            var offset = toNumber(this.offset) || 0,
                axis = this.getAxis();
            var ref = positionAt(
                    element,
                    target,
                    axis === 'x' ? ((flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (flipPosition(this.dir))),
                    axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
                    axis === 'x' ? ("" + (this.dir === 'left' ? -1 * offset : offset)) : (" " + (this.dir === 'top' ? -1 * offset : offset)),
                    null,
                    this.flip,
                    boundary
                ).target;
            var x = ref.x;
            var y = ref.y;

            this.dir = axis === 'x' ? x : y;
            this.align = axis === 'x' ? y : x;

            toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

        },

        getAxis: function getAxis() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
        }

    }

};

var mixin = function (UIkit) {

    UIkit.mixin.class = Class;
    UIkit.mixin.container = Container;
    UIkit.mixin.modal = Modal;
    UIkit.mixin.position = Position;
    UIkit.mixin.togglable = Togglable;

};

var Accordion = function (UIkit) {

    UIkit.component('accordion', {

        mixins: [Class, Togglable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String
        },

        defaults: {
            targets: '> *',
            active: false,
            animation: [true],
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '> .uk-accordion-title',
            content: '> .uk-accordion-content',
            transition: 'ease'
        },

        computed: {

            items: function items(ref, $el) {
                var targets = ref.targets;

                return $$(targets, $el);
            }

        },

        events: [

            {

                name: 'click',

                self: true,

                delegate: function delegate() {
                    return ((this.targets) + " " + (this.$props.toggle));
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.toggle(index($$(((this.targets) + " " + (this.$props.toggle)), this.$el), e.current));
                }

            }

        ],

        ready: function ready() {
            var active = this.active !== false && this.items[Number(this.active)] && !hasClass(active, this.clsOpen);
            if (active) {
                this.toggle(active, false);
            }
        },

        update: function update() {
            var this$1 = this;


            this.items.forEach(function (el) { return this$1.toggleNow($$1(this$1.content, el), hasClass(el, this$1.clsOpen)); });

            var active = !this.collapsible && !hasClass(this.items, this.clsOpen) && this.items[0];
            if (active) {
                this.toggle(active, false);
            }
        },

        methods: {

            toggle: function toggle(item, animate) {
                var this$1 = this;


                var index = getIndex(item, this.items),
                    active = filter(this.items, ("." + (this.clsOpen)));

                item = this.items[index];

                item && [item]
                    .concat(!this.multiple && !includes(active, item) && active || [])
                    .forEach(function (el) {

                        var isItem = el === item, state = isItem && !hasClass(el, this$1.clsOpen);

                        if (!state && isItem && !this$1.collapsible && active.length < 2) {
                            return;
                        }

                        toggleClass(el, this$1.clsOpen, state);

                        var content = el._wrapper ? el._wrapper.firstElementChild : $$1(this$1.content, el);

                        if (!el._wrapper) {
                            el._wrapper = wrapAll(content, '<div>');
                            attr(el._wrapper, 'hidden', state ? '' : null);
                        }

                        this$1._toggleImmediate(content, true);
                        this$1.toggleElement(el._wrapper, state, animate).then(function () {
                            if (hasClass(el, this$1.clsOpen) === state) {

                                if (!state) {
                                    this$1._toggleImmediate(content, false);
                                }

                                el._wrapper = null;
                                unwrap(content);
                            }
                        });

                    });
            }

        }

    });

};

var Alert = function (UIkit) {

    UIkit.component('alert', {

        attrs: true,

        mixins: [Class, Togglable],

        args: 'animation',

        props: {
            close: String
        },

        defaults: {
            animation: [true],
            selClose: '.uk-alert-close',
            duration: 150,
            hideProps: assign({opacity: 0}, Togglable.defaults.hideProps)
        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return this.selClose;
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.close();
                }

            }

        ],

        methods: {

            close: function close() {
                var this$1 = this;

                this.toggleElement(this.$el).then(function () { return this$1.$destroy(true); });
            }

        }

    });

};

var Cover = function (UIkit) {

    UIkit.component('cover', {

        mixins: [Class, UIkit.components.video.options],

        props: {
            width: Number,
            height: Number
        },

        defaults: {
            automute: true
        },

        update: {

            write: function write() {

                var el = this.$el;

                if (!isVisible(el)) {
                    return;
                }

                var ref = el.parentNode;
                var height = ref.offsetHeight;
                var width = ref.offsetWidth;

                css(
                    css(el, {width: '', height: ''}),
                    Dimensions.cover(
                        {
                            width: this.width || el.clientWidth,
                            height: this.height || el.clientHeight
                        },
                        {
                            width: width + (width % 2 ? 1 : 0),
                            height: height + (height % 2 ? 1 : 0)
                        }
                    )
                );

            },

            events: ['load', 'resize']

        },

        events: {

            loadedmetadata: function loadedmetadata() {
                this.$emit();
            }

        }

    });

};

var Drop = function (UIkit) {

    var active;

    UIkit.component('drop', {

        mixins: [Position, Togglable],

        args: 'pos',

        props: {
            mode: 'list',
            toggle: Boolean,
            boundary: 'query',
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        defaults: {
            mode: ['click', 'hover'],
            toggle: true,
            boundary: win,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            hoverIdle: 200,
            animation: ['uk-animation-fade'],
            cls: 'uk-open'
        },

        init: function init() {
            this.tracker = new MouseTracker();
            this.clsDrop = this.clsDrop || ("uk-" + (this.$options.name));
            this.clsPos = this.clsDrop;

            addClass(this.$el, this.clsDrop);
        },

        ready: function ready() {

            this.updateAria(this.$el);

            if (this.toggle) {
                this.toggle = UIkit.toggle(isString(this.toggle) ? query(this.toggle, this.$el) : this.$el.previousElementSibling, {target: this.$el, mode: this.mode});
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ("." + (this.clsDrop) + "-close");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    var id = e.target.hash;

                    if (!id) {
                        e.preventDefault();
                    }

                    if (!id || !within(id, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'beforescroll',

                handler: function handler() {
                    this.hide(false);
                }

            },

            {

                name: 'toggle',

                self: true,

                handler: function handler(e, toggle) {

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle, false);
                    }
                }

            },

            {

                name: pointerEnter,

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {

                    if (isTouch(e)) {
                        return;
                    }

                    if (active
                        && active !== this
                        && active.toggle
                        && includes(active.toggle.mode, 'hover')
                        && !within(e.target, active.toggle.$el)
                        && !pointInRect({x: e.pageX, y: e.pageY}, offset(active.$el))
                    ) {
                        active.hide(false);
                    }

                    e.preventDefault();
                    this.show(this.toggle);
                }

            },

            {

                name: 'toggleshow',

                handler: function handler(e, toggle) {

                    if (toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();
                    this.show(toggle || this.toggle);
                }

            },

            {

                name: ("togglehide " + pointerLeave),

                handler: function handler(e, toggle) {

                    if (isTouch(e) || toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();

                    if (this.toggle && includes(this.toggle.mode, 'hover')) {
                        this.hide();
                    }
                }

            },

            {

                name: 'beforeshow',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                }

            },

            {

                name: 'show',

                self: true,

                handler: function handler() {
                    this.tracker.init();
                    addClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'true');
                    registerEvent();
                }

            },

            {

                name: 'beforehide',

                self: true,

                handler: function handler() {
                    this.clearTimers();
                }

            },

            {

                name: 'hide',

                handler: function handler(ref) {
                    var target = ref.target;


                    if (this.$el !== target) {
                        active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
                        return;
                    }

                    active = this.isActive() ? null : active;
                    removeClass(this.toggle.$el, this.cls);
                    attr(this.toggle.$el, 'aria-expanded', 'false');
                    this.toggle.$el.blur();
                    $$('a, button', this.toggle.$el).forEach(function (el) { return el.blur(); });
                    this.tracker.cancel();
                }

            }

        ],

        update: {

            write: function write() {

                if (this.isToggled() && !Animation.inProgress(this.$el)) {
                    this.position();
                }

            },

            events: ['resize']

        },

        methods: {

            show: function show(toggle, delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var show = function () {
                        if (!this$1.isToggled()) {
                            this$1.position();
                            this$1.toggleElement(this$1.$el, true);
                        }
                    },
                    tryShow = function () {

                        this$1.toggle = toggle || this$1.toggle;

                        this$1.clearTimers();

                        if (this$1.isActive()) {
                            return;
                        } else if (delay && active && active !== this$1 && active.isDelaying) {
                            this$1.showTimer = setTimeout(this$1.show, 10);
                            return;
                        } else if (this$1.isParentOf(active)) {

                            if (active.hideTimer) {
                                active.hide(false);
                            } else {
                                return;
                            }

                        } else if (active && !this$1.isChildOf(active) && !this$1.isParentOf(active)) {

                            var prev;
                            while (active && active !== prev && !this$1.isChildOf(active)) {
                                prev = active;
                                active.hide(false);
                            }

                        }

                        if (delay && this$1.delayShow) {
                            this$1.showTimer = setTimeout(show, this$1.delayShow);
                        } else {
                            show();
                        }

                        active = this$1;
                    };

                if (toggle && this.toggle &&  toggle.$el !== this.toggle.$el) {

                    once(this.$el, 'hide', tryShow);
                    this.hide(false);

                } else {
                    tryShow();
                }
            },

            hide: function hide(delay) {
                var this$1 = this;
                if ( delay === void 0 ) delay = true;


                var hide = function () { return this$1.toggleNow(this$1.$el, false); };

                this.clearTimers();

                this.isDelaying = this.tracker.movesTo(this.$el);

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, this.hoverIdle);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },

            clearTimers: function clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },

            isActive: function isActive() {
                return active === this;
            },

            isChildOf: function isChildOf(drop) {
                return drop && drop !== this && within(this.$el, drop.$el);
            },

            isParentOf: function isParentOf(drop) {
                return drop && drop !== this && within(drop.$el, this.$el);
            },

            position: function position() {

                removeClasses(this.$el, ((this.clsDrop) + "-(stack|boundary)"));
                css(this.$el, {top: '', left: '', display: 'block'});
                toggleClass(this.$el, ((this.clsDrop) + "-boundary"), this.boundaryAlign);

                var boundary = offset(this.boundary),
                    alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

                if (this.align === 'justify') {
                    var prop = this.getAxis() === 'y' ? 'width' : 'height';
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, ((this.clsDrop) + "-stack"));
                    trigger(this.$el, 'stack', [this]);
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);

                css(this.$el, 'display', '');

            }

        }

    });

    UIkit.drop.getActive = function () { return active; };

    var registered;

    function registerEvent() {

        if (registered) {
            return;
        }

        registered = true;
        on(doc, 'click', function (ref) {
            var target = ref.target;
            var defaultPrevented = ref.defaultPrevented;

            var prev;

            if (defaultPrevented) {
                return;
            }

            while (active && active !== prev && !within(target, active.$el) && !(active.toggle && within(target, active.toggle.$el))) {
                prev = active;
                active.hide(false);
            }
        });
    }

};

var Dropdown = function (UIkit) {

    UIkit.component('dropdown', UIkit.components.drop.extend({name: 'dropdown'}));

};

var FormCustom = function (UIkit) {

    UIkit.component('form-custom', {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        defaults: {
            target: false
        },

        computed: {

            input: function input(_, $el) {
                return $$1(selInput, $el);
            },

            state: function state() {
                return this.input.nextElementSibling;
            },

            target: function target(ref, $el) {
                var target = ref.target;

                return target && (target === true
                    && this.input.parentNode === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
            }

        },

        connected: function connected() {
            trigger(this.input, 'change');
        },

        events: [

            {

                name: 'focusin focusout mouseenter mouseleave',

                delegate: selInput,

                handler: function handler(ref) {
                    var type = ref.type;
                    var current = ref.current;

                    if (current === this.input) {
                        toggleClass(
                            this.state,
                            ("uk-" + (includes(type, 'focus') ? 'focus' : 'hover')),
                            includes(['focusin', 'mouseenter'], type)
                        );
                    }
                }

            },

            {

                name: 'change',

                handler: function handler() {

                    var target = this.target, input = this.input, option;

                    if (!target) {
                        return;
                    }

                    target[isInput(target) ? 'value' : 'textContent'] = input.files && input.files[0]
                        ? input.files[0].name
                        : matches(input, 'select') && (option = $$('option', input).filter(function (el) { return el.selected; })[0])
                            ? option.textContent
                            : input.value;
                }

            }

        ]

    });

};

var Gif = function (UIkit) {

    UIkit.component('gif', {

        update: {

            read: function read() {

                var inview = isInView(this.$el);

                if (!this.isInView && inview) {
                    this.$el.src = this.$el.src;
                }

                this.isInView = inview;
            },

            events: ['scroll', 'load', 'resize']
        }

    });

};

var Grid = function (UIkit) {

    UIkit.component('grid', UIkit.components.margin.extend({

        mixins: [Class],

        name: 'grid',

        defaults: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack'
        },

        update: {

            write: function write() {

                toggleClass(this.$el, this.clsStack, this.stacks);

            },

            events: ['load', 'resize']

        }

    }));

};

var HeightMatch = function (UIkit) {

    UIkit.component('height-match', {

        args: 'target',

        props: {
            target: String,
            row: Boolean
        },

        defaults: {
            target: '> *',
            row: true
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return $$(target, $el);
            }

        },

        update: {

            read: function read() {
                var this$1 = this;


                var lastOffset = false;

                css(this.elements, 'minHeight', '');

                this.rows = !this.row
                    ? [this.match(this.elements)]
                    : this.elements.reduce(function (rows, el) {

                        if (lastOffset !== el.offsetTop) {
                            rows.push([el]);
                        } else {
                            rows[rows.length - 1].push(el);
                        }

                        lastOffset = el.offsetTop;

                        return rows;

                    }, []).map(function (elements) { return this$1.match(elements); });
            },

            write: function write() {

                this.rows.forEach(function (ref) {
                    var height = ref.height;
                    var elements = ref.elements;

                    return css(elements, 'minHeight', height);
                });

            },

            events: ['load', 'resize']

        },

        methods: {

            match: function match(elements) {

                if (elements.length < 2) {
                    return {};
                }

                var max = 0, heights = [];

                elements
                    .forEach(function (el) {

                        var style, hidden;

                        if (!isVisible(el)) {
                            style = attr(el, 'style');
                            hidden = attr(el, 'hidden');

                            attr(el, {
                                style: ((style || '') + ";display:block !important;"),
                                hidden: null
                            });
                        }

                        max = Math.max(max, el.offsetHeight);
                        heights.push(el.offsetHeight);

                        if (!isUndefined(style)) {
                            attr(el, {style: style, hidden: hidden});
                        }

                    });

                elements = elements.filter(function (el, i) { return heights[i] < max; });

                return {height: max, elements: elements};
            }
        }

    });

};

var HeightViewport = function (UIkit) {

    UIkit.component('height-viewport', {

        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },

        defaults: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },

        update: {

            write: function write() {

                css(this.$el, 'boxSizing', 'border-box');

                var viewport = height(win), minHeight, offsetTop = 0;

                if (this.expand) {

                    css(this.$el, {height: '', minHeight: ''});

                    var diff = viewport - offsetHeight(docEl);

                    if (diff > 0) {
                        minHeight = offsetHeight(this.$el) + diff;
                    }

                } else {

                    var top = offset(this.$el).top;

                    if (top < viewport / 2 && this.offsetTop) {
                        offsetTop += top;
                    }

                    if (this.offsetBottom === true) {

                        offsetTop += offsetHeight(this.$el.nextElementSibling);

                    } else if (isNumeric(this.offsetBottom)) {

                        offsetTop += (viewport / 100) * this.offsetBottom;

                    } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

                        offsetTop += toFloat(this.offsetBottom);

                    } else if (isString(this.offsetBottom)) {

                        offsetTop += offsetHeight(query(this.offsetBottom, this.$el));

                    }

                    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
                    minHeight = offsetTop ? ("calc(100vh - " + offsetTop + "px)") : '100vh';

                }

                if (!minHeight) {
                    return;
                }

                css(this.$el, {height: '', minHeight: minHeight});

                var elHeight = this.$el.offsetHeight;
                if (this.minHeight && this.minHeight > elHeight) {
                    css(this.$el, 'minHeight', this.minHeight);
                }

                // IE 10-11 fix (min-height on a flex container won't apply to its flex items)
                if (viewport - offsetTop >= elHeight) {
                    css(this.$el, 'height', minHeight);
                }

            },

            events: ['load', 'resize']

        }

    });

    function offsetHeight(el) {
        return el && el.offsetHeight || 0;
    }

};

var Hover = function (UIkit) {

    ready(function () {

        if (!hasTouch) {
            return;
        }

        var cls = 'uk-hover';

        on(doc, 'tap', function (ref) {
                var target = ref.target;

                return $$(("." + cls)).forEach(function (_, el) { return !within(target, el) && removeClass(el, cls); }
            );
        }
        );

        Object.defineProperty(UIkit, 'hoverSelector', {

            set: function set(selector) {
                on(doc, 'tap', selector, function (ref) {
                    var current = ref.current;

                    return addClass(current, cls);
                });
            }

        });

        UIkit.hoverSelector = '.uk-animation-toggle, .uk-transition-toggle, [uk-hover]';

    });

};

var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"></line><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"></line></svg>";

var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"></line><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"></line></svg>";

var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"></rect><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"></rect></svg>";

var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"></rect><rect y=\"3\" width=\"20\" height=\"2\"></rect><rect y=\"15\" width=\"20\" height=\"2\"></rect></svg>";

var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"></rect><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"></rect></svg>";

var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"></polyline></svg>";

var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"></polyline></svg>";

var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"></circle><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"></path></svg>";

var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"></circle><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"></line></svg>";

var searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

var slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"></polyline></svg>";

var slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"></polyline></svg>";

var slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"></polyline></svg>";

var slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"></polyline></svg>";

var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"></circle></svg>";

var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"></polyline></svg>";

var Icon = function (UIkit) {

    var parsed = {},
        icons = {
            spinner: spinner,
            totop: totop,
            marker: marker,
            'close-icon': closeIcon,
            'close-large': closeLarge,
            'navbar-toggle-icon': navbarToggleIcon,
            'overlay-icon': overlayIcon,
            'pagination-next': paginationNext,
            'pagination-previous': paginationPrevious,
            'search-icon': searchIcon,
            'search-large': searchLarge,
            'search-navbar': searchNavbar,
            'slidenav-next': slidenavNext,
            'slidenav-next-large': slidenavNextLarge,
            'slidenav-previous': slidenavPrevious,
            'slidenav-previous-large': slidenavPreviousLarge
        };

    UIkit.component('icon', UIkit.components.svg.extend({

        attrs: ['icon', 'ratio'],

        mixins: [Class],

        name: 'icon',

        args: 'icon',

        props: ['icon'],

        defaults: {exclude: ['id', 'style', 'class', 'src', 'icon']},

        init: function init() {
            addClass(this.$el, 'uk-icon');

            if (isRtl) {
                this.icon = swap(swap(this.icon, 'left', 'right'), 'previous', 'next');
            }
        },

        disconnected: function disconnected() {
            delete this.delay;
        },

        methods: {

            getSvg: function getSvg() {

                var icon = getIcon(this.icon);

                if (!icon) {
                    return Promise.reject('Icon not found.');
                }

                return Promise.resolve(icon);
            }

        }

    }));

    [
        'marker',
        'navbar-toggle-icon',
        'overlay-icon',
        'pagination-previous',
        'pagination-next',
        'totop'
    ].forEach(function (name) { return registerComponent(name); });

    [
        'slidenav-previous',
        'slidenav-next'
    ].forEach(function (name) { return registerComponent(name, {

        init: function init() {
            addClass(this.$el, 'uk-slidenav');

            if (hasClass(this.$el, 'uk-slidenav-large')) {
                this.icon += '-large';
            }
        }

    }); });

    registerComponent('search-icon', {

        init: function init() {
            if (hasClass(this.$el, 'uk-search-icon') && parents(this.$el, '.uk-search-large').length) {
                this.icon = 'search-large';
            } else if (parents(this.$el, '.uk-search-navbar').length) {
                this.icon = 'search-navbar';
            }
        }

    });

    registerComponent('close', {

        init: function init() {
            this.icon = "close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon');
        }

    });

    registerComponent('spinner', {

        connected: function connected() {
            var this$1 = this;

            this.svg.then(function (svg) { return this$1.ratio !== 1 && css($$1('circle', svg), 'stroke-width', 1 / this$1.ratio); }, noop);
        }

    });

    UIkit.icon.add = function (added) {
        Object.keys(added).forEach(function (name) {
            icons[name] = added[name];
            delete parsed[name];
        });

        if (UIkit._initialized) {
            each(UIkit.instances, function (component) {
                if (component.$options.name === 'icon') {
                    component.$reset();
                }
            });
        }
    };

    function registerComponent(name, mixin$$1) {

        UIkit.component(name, UIkit.components.icon.extend({

            name: name,

            mixins: mixin$$1 ? [mixin$$1] : [],

            defaults: {
                icon: name
            }

        }));
    }

    function getIcon(icon) {

        if (!icons[icon]) {
            return null;
        }

        if (!parsed[icon]) {
            parsed[icon] = $$1(icons[icon].trim());
        }

        return parsed[icon];
    }

};

var Leader = function (UIkit) {

    UIkit.component('leader', {

        mixins: [Class],

        props: {
            fill: String,
            media: 'media'
        },

        defaults: {
            fill: '',
            media: false,
            clsWrapper: 'uk-leader-fill',
            clsHide: 'uk-leader-hide',
            attrFill: 'data-fill'
        },

        computed: {

            fill: function fill(ref) {
                var fill = ref.fill;

                return fill || getCssVar('leader-fill');
            }

        },

        connected: function connected() {
            this.wrapper = wrapInner(this.$el, ("<span class=\"" + (this.clsWrapper) + "\">"))[0];
        },

        disconnected: function disconnected() {
            unwrap(this.wrapper.childNodes);
            delete this._width;
        },

        update: [

            {

                read: function read() {
                    var prev = this._width;
                    this._width = Math.floor(this.$el.offsetWidth / 2);
                    this._changed = prev !== this._width;
                    this._hide = this.media && !win.matchMedia(this.media).matches;
                },

                write: function write() {

                    toggleClass(this.wrapper, this.clsHide, this._hide);

                    if (this._changed) {
                        attr(this.wrapper, this.attrFill, new Array(this._width).join(this.fill));
                    }

                },

                events: ['load', 'resize']

            }
        ]
    });

};

var Margin = function (UIkit) {

    UIkit.component('margin', {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        defaults: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {

            read: function read() {
                var this$1 = this;


                var items = this.$el.children;

                if (!items.length || !isVisible(this.$el)) {
                    this.rows = false;
                    return;
                }

                this.stacks = true;

                var rows = [[]];

                for (var i = 0; i < items.length; i++) {

                    var el = items[i],
                        dim = el.getBoundingClientRect();

                    if (!dim.height) {
                        continue;
                    }

                    for (var j = rows.length - 1; j >= 0; j--) {

                        var row = rows[j];

                        if (!row[0]) {
                            row.push(el);
                            break;
                        }

                        var leftDim = row[0].getBoundingClientRect();

                        if (dim.top >= Math.floor(leftDim.bottom)) {
                            rows.push([el]);
                            break;
                        }

                        if (Math.floor(dim.bottom) > leftDim.top) {

                            this$1.stacks = false;

                            if (dim.left < leftDim.left && !isRtl) {
                                row.unshift(el);
                                break;
                            }

                            row.push(el);
                            break;
                        }

                        if (j === 0) {
                            rows.unshift([el]);
                            break;
                        }

                    }

                }

                this.rows = rows;

            },

            write: function write() {
                var this$1 = this;


                this.rows && this.rows.forEach(function (row, i) { return row.forEach(function (el, j) {
                        toggleClass(el, this$1.margin, i !== 0);
                        toggleClass(el, this$1.firstColumn, j === 0);
                    }); }
                );

            },

            events: ['load', 'resize']

        }

    });

};

var Modal$1 = function (UIkit) {

    UIkit.component('modal', {

        mixins: [Modal],

        defaults: {
            clsPage: 'uk-modal-page',
            clsPanel: 'uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
        },

        events: [

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                        addClass(this.$el, 'uk-flex');
                    } else {
                        css(this.$el, 'display', 'block');
                    }

                    height(this.$el); // force reflow
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    css(this.$el, 'display', '');
                    removeClass(this.$el, 'uk-flex');

                }
            }

        ]

    });

    UIkit.component('overflow-auto', {

        mixins: [Class],

        computed: {

            modal: function modal(_, $el) {
                return closest($el, '.uk-modal');
            },

            panel: function panel(_, $el) {
                return closest($el, '.uk-modal-dialog');
            }

        },

        connected: function connected() {
            css(this.$el, 'minHeight', 150);
        },

        update: {

            write: function write() {

                if (!this.panel || !this.modal) {
                    return;
                }

                var current = css(this.$el, 'maxHeight');

                css(css(this.$el, 'maxHeight', 150), 'maxHeight', Math.max(150, 150 + height(this.modal) - this.panel.offsetHeight));
                if (current !== css(this.$el, 'maxHeight')) {
                    trigger(this.$el, 'resize');
                }
            },

            events: ['load', 'resize']

        }

    });

    UIkit.modal.dialog = function (content, options) {

        var dialog = UIkit.modal((" <div class=\"uk-modal\"> <div class=\"uk-modal-dialog\">" + content + "</div> </div> "), options);

        on(dialog.$el, 'hidden', function (ref) {
            var target = ref.target;
            var current = ref.current;

            if (target === current) {
                dialog.$destroy(true);
            }
        });
        dialog.show();

        return dialog;
    };

    UIkit.modal.alert = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: UIkit.modal.labels}, options);

        return new Promise(
            function (resolve) { return on(UIkit.modal.dialog((" <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + (options.labels.ok) + "</button> </div> "), options).$el, 'hide', resolve); }
        );
    };

    UIkit.modal.confirm = function (message, options) {

        options = assign({bgClose: false, escClose: false, labels: UIkit.modal.labels}, options);

        return new Promise(
            function (resolve, reject) { return on(UIkit.modal.dialog((" <div class=\"uk-modal-body\">" + (isString(message) ? message : html(message)) + "</div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>" + (options.labels.ok) + "</button> </div> "), options).$el, 'click', '.uk-modal-footer button', function (ref) {
                var target = ref.target;

                return index(target) === 0 ? reject() : resolve();
                }); }
        );
    };

    UIkit.modal.prompt = function (message, value, options) {

        options = assign({bgClose: false, escClose: false, labels: UIkit.modal.labels}, options);

        return new Promise(function (resolve) {

            var resolved = false,
                prompt = UIkit.modal.dialog((" <form class=\"uk-form-stacked\"> <div class=\"uk-modal-body\"> <label>" + (isString(message) ? message : html(message)) + "</label> <input class=\"uk-input\" autofocus> </div> <div class=\"uk-modal-footer uk-text-right\"> <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">" + (options.labels.cancel) + "</button> <button class=\"uk-button uk-button-primary\">" + (options.labels.ok) + "</button> </div> </form> "), options),
                input = $$1('input', prompt.$el);

            input.value = value;

            on(prompt.$el, 'submit', 'form', function (e) {
                e.preventDefault();
                resolve(input.value);
                resolved = true;
                prompt.hide();
            });
            on(prompt.$el, 'hide', function () {
                if (!resolved) {
                    resolve(null);
                }
            });

        });
    };

    UIkit.modal.labels = {
        ok: 'Ok',
        cancel: 'Cancel'
    };

};

var Nav = function (UIkit) {

    UIkit.component('nav', UIkit.components.accordion.extend({

        name: 'nav',

        defaults: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: '> ul'
        }

    }));

};

var Navbar = function (UIkit) {

    UIkit.component('navbar', {

        mixins: [Class],

        props: {
            dropdown: String,
            mode: 'list',
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: 'query',
            duration: Number
        },

        defaults: {
            dropdown: '.uk-navbar-nav > li',
            align: !isRtl ? 'left' : 'right',
            clsDrop: 'uk-navbar-dropdown',
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: 'x',
            boundary: true,
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200,
        },

        computed: {

            boundary: function boundary(ref, $el) {
                var boundary = ref.boundary;
                var boundaryAlign = ref.boundaryAlign;

                return (boundary === true || boundaryAlign) ? $el : boundary
            },

            pos: function pos(ref) {
                var align = ref.align;

                return ("bottom-" + align);
            }

        },

        ready: function ready() {

            if (this.dropbar) {
                UIkit.navbarDropbar(
                    query(this.dropbar, this.$el) || after(this.dropbarAnchor || this.$el, '<div></div>'),
                    {clsDrop: this.clsDrop, mode: this.dropbarMode, duration: this.duration, navbar: this}
                );
            }

        },

        update: function update() {

            UIkit.drop(
                $$(((this.dropdown) + " ." + (this.clsDrop)), this.$el).filter(function (el) { return !UIkit.getComponent(el, 'dropdown'); }),
                assign({}, this.$props, {boundary: this.boundary, pos: this.pos})
            );

        },

        events: [

            {
                name: 'mouseover',

                delegate: function delegate() {
                    return this.dropdown;
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    var active = this.getActive();
                    if (active && active.toggle && !within(active.toggle.$el, current) && !active.tracker.movesTo(active.$el)) {
                        active.hide(false);
                    }
                }

            }

        ],

        methods: {

            getActive: function getActive() {
                var active = UIkit.drop.getActive();
                return active && includes(active.mode, 'hover') && within(active.toggle.$el, this.$el) && active;
            }

        }

    });

    UIkit.component('navbar-dropbar', {

        mixins: [Class],

        defaults: {
            clsDrop: '',
            mode: 'slide',
            navbar: null,
            duration: 200
        },

        init: function init() {

            if (this.mode === 'slide') {
                addClass(this.$el, 'uk-navbar-dropbar-slide');
            }

        },

        events: [

            {
                name: 'beforeshow',

                el: function el() {
                    return this.navbar.$el;
                },

                handler: function handler(e, drop) {
                    var $el = drop.$el;
                    var dir = drop.dir;
                    if (dir === 'bottom' && !within($el, this.$el)) {
                        append(this.$el, $el);
                        drop.show();
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'mouseleave',

                handler: function handler() {
                    var active = this.navbar.getActive();

                    if (active && !matches(this.$el, ':hover')) {
                        active.hide();
                    }
                }
            },

            {
                name: 'show',

                handler: function handler(_, ref) {
                    var $el = ref.$el;

                    this.clsDrop && addClass($el, ((this.clsDrop) + "-dropbar"));
                    this.transitionTo($el.offsetHeight + toFloat(css($el, 'margin-top')) + toFloat(css($el, 'margin-bottom')));
                }
            },

            {
                name: 'beforehide',

                handler: function handler(e, ref) {
                    var $el = ref.$el;


                    var active = this.navbar.getActive();

                    if (matches(this.$el, ':hover') && active && active.$el === $el) {
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'hide',

                handler: function handler(_, ref) {
                    var $el = ref.$el;


                    var active = this.navbar.getActive();

                    if (!active || active && active.$el === $el) {
                        this.transitionTo(0);
                    }
                }
            }

        ],

        methods: {

            transitionTo: function transitionTo(newHeight) {
                height(this.$el, isVisible(this.$el) ? height(this.$el) : 0);
                Transition.cancel(this.$el);
                return Transition.start(this.$el, {height: newHeight}, this.duration).then(null, noop);
            }

        }

    });

};

var scroll;

var Offcanvas = function (UIkit) {

    UIkit.component('offcanvas', {

        mixins: [Modal],

        args: 'mode',

        props: {
            content: String,
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        defaults: {
            content: '.uk-offcanvas-content',
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsContainer: 'uk-offcanvas-container',
            clsPanel: 'uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsContent: 'uk-offcanvas-content',
            clsContentAnimation: 'uk-offcanvas-content-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            selClose: '.uk-offcanvas-close'
        },

        computed: {

            content: function content(ref) {
                var content = ref.content;

                return $$1(content);
            },

            clsFlip: function clsFlip(ref) {
                var flip = ref.flip;
                var clsFlip = ref.clsFlip;

                return flip ? clsFlip : '';
            },

            clsOverlay: function clsOverlay(ref) {
                var overlay = ref.overlay;
                var clsOverlay = ref.clsOverlay;

                return overlay ? clsOverlay : '';
            },

            clsMode: function clsMode(ref) {
                var mode = ref.mode;
                var clsMode = ref.clsMode;

                return (clsMode + "-" + mode);
            },

            clsSidebarAnimation: function clsSidebarAnimation(ref) {
                var mode = ref.mode;
                var clsSidebarAnimation = ref.clsSidebarAnimation;

                return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
            },

            clsContentAnimation: function clsContentAnimation(ref) {
                var mode = ref.mode;
                var clsContentAnimation = ref.clsContentAnimation;

                return mode !== 'push' && mode !== 'reveal' ? '' : clsContentAnimation
            },

            transitionElement: function transitionElement(ref) {
                var mode = ref.mode;

                return mode === 'reveal' ? this.panel.parentNode : this.panel;
            }

        },

        update: {

            write: function write() {

                if (this.getActive() === this) {

                    if (this.overlay || this.clsContentAnimation) {
                        width(this.content, width(win) - this.scrollbarWidth);
                    }

                    if (this.overlay) {
                        height(this.content, height(win));
                        if (scroll) {
                            this.content.scrollTop = scroll.y;
                        }
                    }

                }

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return 'a[href^="#"]';
                },

                handler: function handler(ref) {
                    var current = ref.current;

                    if (current.hash && $$1(current.hash, this.content)) {
                        scroll = null;
                        this.hide();
                    }
                }

            },

            {

                name: 'beforescroll',

                filter: function filter() {
                    return this.overlay;
                },

                handler: function handler(e, scroll, target) {
                    if (scroll && target && this.isToggled() && $$1(target, this.content)) {
                        once(this.$el, 'hidden', function () { return scroll.scrollTo(target); });
                        e.preventDefault();
                    }
                }

            },

            {
                name: 'show',

                self: true,

                handler: function handler() {

                    scroll = scroll || {x: win.pageXOffset, y: win.pageYOffset};

                    if (this.mode === 'reveal' && !hasClass(this.panel, this.clsMode)) {
                        wrapAll(this.panel, '<div>');
                        addClass(this.panel.parentNode, this.clsMode);
                    }

                    css(docEl, 'overflowY', (!this.clsContentAnimation || this.flip) && this.scrollbarWidth && this.overlay ? 'scroll' : '');
                    addClass(doc.body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));
                    height(doc.body); // force reflow
                    addClass(this.content, this.clsContentAnimation);
                    addClass(this.panel, ((this.clsSidebarAnimation) + " " + (this.mode !== 'reveal' ? this.clsMode : '')));
                    addClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', 'block');
                    height(this.$el); // force reflow

                }
            },

            {
                name: 'hide',

                self: true,

                handler: function handler() {
                    removeClass(this.content, this.clsContentAnimation);

                    var active = this.getActive();
                    if (this.mode === 'none' || active && active !== this && active !== this.prev) {
                        trigger(this.panel, transitionend);
                    }
                }
            },

            {
                name: 'hidden',

                self: true,

                handler: function handler() {

                    if (this.mode === 'reveal') {
                        unwrap(this.panel);
                    }

                    if (!this.overlay) {
                        scroll = {x: win.pageXOffset, y: win.pageYOffset};
                    } else if (!scroll) {
                        var ref = this.content;
                        var x = ref.scrollLeft;
                        var y = ref.scrollTop;
                        scroll = {x: x, y: y};
                    }

                    removeClass(this.panel, ((this.clsSidebarAnimation) + " " + (this.clsMode)));
                    removeClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', '');
                    removeClass(doc.body, ((this.clsContainer) + " " + (this.clsFlip) + " " + (this.clsOverlay)));
                    doc.body.scrollTop = scroll.y;

                    css(docEl, 'overflow-y', '');

                    width(this.content, '');
                    height(this.content, '');

                    win.scrollTo(scroll.x, scroll.y);

                    scroll = null;

                }
            },

            {
                name: 'swipeLeft swipeRight',

                handler: function handler(e) {

                    if (this.isToggled() && isTouch(e) && (e.type === 'swipeLeft' && !this.flip || e.type === 'swipeRight' && this.flip)) {
                        this.hide();
                    }

                }
            }

        ]

    });

};

var Responsive = function (UIkit) {

    UIkit.component('responsive', {

        props: ['width', 'height'],

        init: function init() {
            addClass(this.$el, 'uk-responsive-width');
        },

        update: {

            read: function read() {

                this.dim = isVisible(this.$el) && this.width && this.height
                    ? {width: width(this.$el.parentNode), height: this.height}
                    : false;

            },

            write: function write() {

                if (this.dim) {
                    height(this.$el, Dimensions.contain({height: this.height, width: this.width}, this.dim).height);
                }

            },

            events: ['load', 'resize']

        }

    });

};

var Scroll = function (UIkit) {

    UIkit.component('scroll', {

        props: {
            duration: Number,
            offset: Number
        },

        defaults: {
            duration: 1000,
            offset: 0
        },

        methods: {

            scrollTo: function scrollTo(el) {
                var this$1 = this;


                el = el && $$1(isString(el) ? el.replace(/\//g, '\\/') : el) || doc.body;

                var target = offset(el).top - this.offset,
                    docHeight = height(doc),
                    winHeight = height(win);

                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                if (!trigger(this.$el, 'beforescroll', [this, el])) {
                    return;
                }

                var start = Date.now(),
                    startY = win.pageYOffset,
                    step = function () {
                        var currentY = startY + (target - startY) * ease(clamp((Date.now() - start) / this$1.duration));

                        win.scrollTo(win.pageXOffset, currentY);

                        // scroll more if we have not reached our destination
                        if (currentY !== target) {
                            requestAnimationFrame(step);
                        } else {
                            trigger(this$1.$el, 'scrolled', [this$1, el]);
                        }
                    };

                step();

            }

        },

        events: {

            click: function click(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.scrollTo(this.$el.hash);
            }

        }

    });

    function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }

};

var Scrollspy = function (UIkit) {

    UIkit.component('scrollspy', {

        args: 'cls',

        props: {
            cls: 'list',
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        defaults: {
            cls: ['uk-scrollspy-inview'],
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        },

        computed: {

            elements: function elements(ref, $el) {
                var target = ref.target;

                return target && $$(target, $el) || [$el];
            }

        },

        update: [

            {

                write: function write() {
                    if (this.hidden) {
                        css(filter(this.elements, (":not(." + (this.inViewClass) + ")")), 'visibility', 'hidden');
                    }
                }

            },

            {

                read: function read() {
                    var this$1 = this;

                    this.elements.forEach(function (el) {

                        if (!el._scrollspy) {
                            var cls = attr(el, 'uk-scrollspy-class');
                            el._scrollspy = {toggles: cls && cls.split(',') || this$1.cls};
                        }

                        el._scrollspy.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);

                    });
                },

                write: function write() {
                    var this$1 = this;


                    var index = this.elements.length === 1 ? 1 : 0;

                    this.elements.forEach(function (el, i) {

                        var data = el._scrollspy, cls = data.toggles[i] || data.toggles[0];

                        if (data.show) {

                            if (!data.inview && !data.timer) {

                                var show = function () {
                                    css(el, 'visibility', '');
                                    addClass(el, this$1.inViewClass);
                                    toggleClass(el, cls);

                                    trigger(el, 'inview');

                                    this$1.$update();

                                    data.inview = true;
                                    delete data.timer;
                                };

                                if (this$1.delay && index) {
                                    data.timer = setTimeout(show, this$1.delay * index);
                                } else {
                                    show();
                                }

                                index++;

                            }

                        } else {

                            if (data.inview && this$1.repeat) {

                                if (data.timer) {
                                    clearTimeout(data.timer);
                                    delete data.timer;
                                }

                                css(el, 'visibility', this$1.hidden ? 'hidden' : '');
                                removeClass(el, this$1.inViewClass);
                                toggleClass(el, cls);

                                trigger(el, 'outview');

                                this$1.$update();

                                data.inview = false;

                            }

                        }

                    });

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

};

var ScrollspyNav = function (UIkit) {

    UIkit.component('scrollspy-nav', {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },

        defaults: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },

        computed: {

            links: function links(_, $el) {
                return $$('a[href^="#"]', $el).filter(function (el) { return el.hash; });
            },

            elements: function elements() {
                return this.closest ? closest(this.links, this.closest) : this.links;
            },

            targets: function targets() {
                return $$(this.links.map(function (el) { return el.hash; }).join(','));
            }

        },

        update: [

            {

                read: function read() {
                    if (this.scroll) {
                        UIkit.scroll(this.links, {offset: this.offset || 0});
                    }
                }

            },

            {

                read: function read() {
                    var this$1 = this;


                    var scroll = win.pageYOffset + this.offset + 1,
                        max = height(doc) - height(win) + this.offset;

                    this.active = false;

                    this.targets.every(function (el, i) {

                        var top = offset(el).top, last = i + 1 === this$1.targets.length;
                        if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
                            return false;
                        }

                        if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
                            return true;
                        }

                        if (scroll >= max) {
                            for (var j = this$1.targets.length - 1; j > i; j--) {
                                if (isInView(this$1.targets[j])) {
                                    el = this$1.targets[j];
                                    break;
                                }
                            }
                        }

                        return !(this$1.active = $$1(filter(this$1.links, ("[href=\"#" + (el.id) + "\"]"))));

                    });

                },

                write: function write() {

                    this.links.forEach(function (el) { return el.blur(); });
                    removeClass(this.elements, this.cls);

                    if (this.active) {
                        trigger(this.$el, 'active', [
                            this.active,
                            addClass(this.closest ? closest(this.active, this.closest) : this.active, this.cls)
                        ]);
                    }

                },

                events: ['scroll', 'load', 'resize']

            }

        ]

    });

};

var Sticky = function (UIkit) {

    UIkit.component('sticky', {

        mixins: [Class],

        attrs: true,

        props: {
            top: null,
            bottom: Boolean,
            offset: Number,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: 'query',
            showOnUp: Boolean,
            media: 'media',
            target: Number
        },

        defaults: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            clsFixed: 'uk-sticky-fixed',
            clsBelow: 'uk-sticky-below',
            selTarget: '',
            widthElement: false,
            showOnUp: false,
            media: false,
            target: false
        },

        computed: {

            selTarget: function selTarget(ref, $el) {
                var selTarget = ref.selTarget;

                return selTarget && $$1(selTarget, $el) || $el;
            }

        },

        connected: function connected() {

            this.placeholder = $$1('<div class="uk-sticky-placeholder"></div>');
            this.widthElement = this.$props.widthElement || this.placeholder;

            if (!this.isActive) {
                this.hide();
            }
        },

        disconnected: function disconnected() {

            if (this.isActive) {
                this.isActive = false;
                this.hide();
                removeClass(this.$el, this.clsInactive);
            }

            remove(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },

        ready: function ready() {
            var this$1 = this;


            if (!(this.target && location.hash && win.pageYOffset > 0)) {
                return;
            }

            var target = $$1(location.hash);

            if (target) {
                requestAnimationFrame(function () {

                    var top = offset(target).top,
                        elTop = offset(this$1.$el).top,
                        elHeight = this$1.$el.offsetHeight;

                    if (elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                        win.scrollTo(0, top - elHeight - this$1.target - this$1.offset);
                    }

                });
            }

        },

        events: [

            {
                name: 'active',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                }

            },

            {
                name: 'inactive',

                self: true,

                handler: function handler() {
                    replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                }

            }

        ],

        update: [

            {

                write: function write() {
                    var this$1 = this;


                    var placeholder = this.placeholder,
                        outerHeight = (this.isActive ? placeholder : this.$el).offsetHeight, el;

                    css(placeholder, assign(
                        {height: css(this.$el, 'position') !== 'absolute' ? outerHeight : ''},
                        css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
                    ));

                    if (!within(placeholder, docEl)) {
                        after(this.$el, placeholder);
                        attr(placeholder, 'hidden', '');
                    }

                    attr(this.widthElement, 'hidden', null);
                    this.width = this.widthElement.offsetWidth;
                    attr(this.widthElement, 'hidden', this.isActive ? null : '');

                    this.topOffset = offset(this.isActive ? placeholder : this.$el).top;
                    this.bottomOffset = this.topOffset + outerHeight;

                    ['top', 'bottom'].forEach(function (prop) {

                        this$1[prop] = this$1.$props[prop];

                        if (!this$1[prop]) {
                            return;
                        }

                        if (isNumeric(this$1[prop])) {

                            this$1[prop] = this$1[(prop + "Offset")] + toFloat(this$1[prop]);

                        } else {

                            if (isString(this$1[prop]) && this$1[prop].match(/^-?\d+vh$/)) {
                                this$1[prop] = height(win) * toFloat(this$1[prop]) / 100;
                            } else {

                                el = this$1[prop] === true ? this$1.$el.parentNode : query(this$1[prop], this$1.$el);

                                if (el) {
                                    this$1[prop] = offset(el).top + el.offsetHeight;
                                }

                            }

                        }

                    });

                    this.top = Math.max(toFloat(this.top), this.topOffset) - this.offset;
                    this.bottom = this.bottom && this.bottom - outerHeight;
                    this.inactive = this.media && !win.matchMedia(this.media).matches;

                    if (this.isActive) {
                        this.update();
                    }
                },

                events: ['load', 'resize']

            },

            {

                read: function read() {
                    this.offsetTop = offset(this.$el).top;
                    this.scroll = win.pageYOffset;
                    this.visible = isVisible(this.$el);
                },

                write: function write(ref) {
                    var this$1 = this;
                    if ( ref === void 0 ) ref = {};
                    var dir = ref.dir;


                    var scroll = this.scroll;

                    if (scroll < 0 || !this.visible || this.disabled || this.showOnUp && !dir) {
                        return;
                    }

                    if (this.inactive
                        || scroll < this.top
                        || this.showOnUp && (scroll <= this.top || dir === 'down' || dir === 'up' && !this.isActive && scroll <= this.bottomOffset)
                    ) {

                        if (!this.isActive) {
                            return;
                        }

                        this.isActive = false;

                        if (this.animation && scroll > this.topOffset) {
                            Animation.cancel(this.$el);
                            Animation.out(this.$el, this.animation).then(function () { return this$1.hide(); }, noop);
                        } else {
                            this.hide();
                        }

                    } else if (this.isActive) {

                        this.update();

                    } else if (this.animation) {

                        Animation.cancel(this.$el);
                        this.show();
                        Animation.in(this.$el, this.animation).then(null, noop);

                    } else {
                        this.show();
                    }

                },

                events: ['scroll']

            } ],

        methods: {

            show: function show() {

                this.isActive = true;
                this.update();
                attr(this.placeholder, 'hidden', null);

            },

            hide: function hide() {

                if (!this.isActive || hasClass(this.selTarget, this.clsActive)) {
                    trigger(this.$el, 'inactive');
                }

                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {position: '', top: '', width: ''});
                attr(this.placeholder, 'hidden', '');

            },

            update: function update() {

                var top = Math.max(0, this.offset), active = this.scroll > this.top;

                if (this.bottom && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }

                css(this.$el, {
                    position: 'fixed',
                    top: (top + "px"),
                    width: this.width
                });

                if (hasClass(this.selTarget, this.clsActive)) {

                    if (!active) {
                        trigger(this.$el, 'inactive');
                    }

                } else {

                    if (active) {
                        trigger(this.$el, 'active');
                    }
                }

                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);

            }

        }

    });

};

var svgs = {};

var Svg = function (UIkit) {

    UIkit.component('svg', {

        attrs: true,

        props: {
            id: String,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            'class': String
        },

        defaults: {
            ratio: 1,
            id: false,
            exclude: ['src'],
            'class': ''
        },

        init: function init() {
            this.class += ' uk-svg';
        },

        connected: function connected() {
            var this$1 = this;


            if (!this.icon && includes(this.src, '#')) {

                var parts = this.src.split('#');

                if (parts.length > 1) {
                    this.src = parts[0];
                    this.icon = parts[1];
                }
            }

            this.svg = this.getSvg().then(function (svg) {

                var el;

                if (isString(svg)) {

                    if (this$1.icon && includes(svg, '<symbol')) {
                        svg = parseSymbols(svg, this$1.icon) || svg;
                    }

                    el = $$1(svg.substr(svg.indexOf('<svg')));

                } else {
                    el = svg.cloneNode(true);
                }

                if (!el) {
                    return Promise.reject('SVG not found.');
                }

                var dimensions = attr(el, 'viewBox');

                if (dimensions) {
                    dimensions = dimensions.split(' ');
                    this$1.width = this$1.$props.width || dimensions[2];
                    this$1.height = this$1.$props.height || dimensions[3];
                }

                this$1.width *= this$1.ratio;
                this$1.height *= this$1.ratio;

                for (var prop in this$1.$options.props) {
                    if (this$1[prop] && !includes(this$1.exclude, prop)) {
                        attr(el, prop, this$1[prop]);
                    }
                }

                if (!this$1.id) {
                    removeAttr(el, 'id');
                }

                if (this$1.width && !this$1.height) {
                    removeAttr(el, 'height');
                }

                if (this$1.height && !this$1.width) {
                    removeAttr(el, 'width');
                }

                var root = this$1.$el;
                if (isVoidElement(root) || root.tagName === 'CANVAS') {

                    attr(root, {hidden: true, id: null});

                    var next = root.nextElementSibling;
                    if (next && el.isEqualNode(next)) {
                        el = next;
                    } else {
                        after(root, el);
                    }

                } else {

                    var last = root.lastElementChild;
                    if (last && el.isEqualNode(last)) {
                        el = last;
                    } else {
                        append(root, el);
                    }

                }

                this$1.svgEl = el;

                return el;

            }, noop);

        },

        disconnected: function disconnected() {
            var this$1 = this;


            if (isVoidElement(this.$el)) {
                attr(this.$el, {hidden: null, id: this.id || null});
            }

            if (this.svg) {
                this.svg.then(function (svg) { return (!this$1._connected || svg !== this$1.svgEl) && remove(svg); }, noop);
            }

            this.svg = this.svgEl = null;

        },

        methods: {

            getSvg: function getSvg() {
                var this$1 = this;


                if (!this.src) {
                    return Promise.reject();
                }

                if (svgs[this.src]) {
                    return svgs[this.src];
                }

                svgs[this.src] = new Promise(function (resolve, reject) {

                    if (startsWith(this$1.src, 'data:')) {
                        resolve(decodeURIComponent(this$1.src.split(',')[1]));
                    } else {

                        ajax(this$1.src).then(
                            function (xhr) { return resolve(xhr.response); },
                            function () { return reject('SVG not found.'); }
                        );

                    }

                });

                return svgs[this.src];

            }

        }

    });

    var symbolRe = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g,
        symbols = {};

    function parseSymbols(svg, icon) {

        if (!symbols[svg]) {

            symbols[svg] = {};

            var match;
            while (match = symbolRe.exec(svg)) {
                symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + (match[1]) + "svg>";
            }

        }

        return symbols[svg][icon];
    }

};

var Switcher = function (UIkit) {

    UIkit.component('switcher', {

        mixins: [Togglable],

        args: 'connect',

        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        defaults: {
            connect: '~.uk-switcher',
            toggle: '> *',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            clsContainer: 'uk-switcher',
            attrItem: 'uk-switcher-item',
            queued: true
        },

        computed: {

            connects: function connects(ref, $el) {
                var connect = ref.connect;

                return queryAll(connect, $el);
            },

            toggles: function toggles(ref, $el) {
                var toggle = ref.toggle;

                return $$(toggle, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(e.current);
                }

            },

            {
                name: 'click',

                el: function el() {
                    return this.connects;
                },

                delegate: function delegate() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }
            },

            {
                name: 'swipeRight swipeLeft',

                filter: function filter() {
                    return this.swiping;
                },

                el: function el() {
                    return this.connects;
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        return;
                    }

                    e.preventDefault();
                    if (!win.getSelection().toString()) {
                        this.show(e.type === 'swipeLeft' ? 'next' : 'previous');
                    }
                }
            }

        ],

        update: function update() {
            var this$1 = this;


            this.connects.forEach(function (list) { return this$1.updateAria(list.children); });
            this.show(filter(this.toggles, ("." + (this.cls)))[0] || this.toggles[this.active] || this.toggles[0]);

        },

        methods: {

            show: function show(item) {
                var this$1 = this;


                if (!this.connects.length) {
                    return;
                }

                var length = this.toggles.length,
                    prev = index(filter(this.connects[0].children, ("." + (this.cls)))[0]),
                    hasPrev = prev >= 0,
                    next = getIndex(item, this.toggles, prev),
                    dir = item === 'previous' ? -1 : 1,
                    toggle;

                for (var i = 0; i < length; i++, next = (next + dir + length) % length) {
                    if (!matches(this$1.toggles[next], '.uk-disabled, [disabled]')) {
                        toggle = this$1.toggles[next];
                        break;
                    }
                }

                if (!toggle || prev >= 0 && hasClass(toggle, this.cls) || prev === next) {
                    return;
                }

                removeClass(this.toggles, this.cls);
                attr(this.toggles, 'aria-expanded', false);
                addClass(toggle, this.cls);
                attr(toggle, 'aria-expanded', true);

                this.connects.forEach(function (list) {
                    if (!hasPrev) {
                        this$1.toggleNow(list.children[next]);
                    } else {
                        this$1.toggleElement([list.children[prev], list.children[next]]);
                    }
                });

            }

        }

    });

};

var Tab = function (UIkit) {

    UIkit.component('tab', UIkit.components.switcher.extend({

        mixins: [Class],

        name: 'tab',

        props: {
            media: 'media'
        },

        defaults: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        init: function init() {

            var cls = hasClass(this.$el, 'uk-tab-left')
                ? 'uk-tab-left'
                : hasClass(this.$el, 'uk-tab-right')
                    ? 'uk-tab-right'
                    : false;

            if (cls) {
                UIkit.toggle(this.$el, {cls: cls, mode: 'media', media: this.media});
            }
        }

    }));

};

var Toggle = function (UIkit) {

    UIkit.component('toggle', {

        mixins: [UIkit.mixin.togglable],

        args: 'target',

        props: {
            href: String,
            target: null,
            mode: 'list',
            media: 'media'
        },

        defaults: {
            href: false,
            target: false,
            mode: 'click',
            queued: true,
            media: false
        },

        computed: {

            target: function target(ref, $el) {
                var href = ref.href;
                var target = ref.target;

                target = queryAll(target || href, $el);
                return target.length && target || [$el];
            }

        },

        events: [

            {

                name: (pointerEnter + " " + pointerLeave),

                filter: function filter() {
                    return includes(this.mode, 'hover');
                },

                handler: function handler(e) {
                    if (!isTouch(e)) {
                        this.toggle(("toggle" + (e.type === pointerEnter ? 'show' : 'hide')));
                    }
                }

            },

            {

                name: 'click',

                filter: function filter() {
                    return includes(this.mode, 'click') || hasTouch;
                },

                handler: function handler(e) {

                    if (!isTouch(e) && !includes(this.mode, 'click')) {
                        return;
                    }

                    // TODO better isToggled handling
                    var link;
                    if (closest(e.target, 'a[href="#"], button')
                        || (link = closest(e.target, 'a[href]')) && (
                            this.cls
                            || !isVisible(this.target)
                            || link.hash && matches(this.target, link.hash)
                        )
                    ) {
                        e.preventDefault();
                    }

                    this.toggle();
                }

            }
        ],

        update: {

            write: function write() {

                if (!includes(this.mode, 'media') || !this.media) {
                    return;
                }

                var toggled = this.isToggled(this.target);
                if (win.matchMedia(this.media).matches ? !toggled : toggled) {
                    this.toggle();
                }

            },

            events: ['load', 'resize']

        },

        methods: {

            toggle: function toggle(type) {
                if (trigger(this.target, type || 'toggle', [this])) {
                    this.toggleElement(this.target);
                }
            }

        }

    });

};

var Video = function (UIkit) {

    UIkit.component('video', {

        props: {
            automute: Boolean,
            autoplay: Boolean,
        },

        defaults: {automute: false, autoplay: true},

        ready: function ready() {

            this.player = new Player(this.$el);

            if (this.automute) {
                this.player.mute();
            }

        },

        update: {

            write: function write() {

                if (!this.player) {
                    return;
                }

                if (!isVisible(this.$el) || css(this.$el, 'visibility') === 'hidden') {
                    this.player.pause();
                } else if (this.autoplay) {
                    this.player.play();
                }

            },

            events: ['load']

        },

    });

};

var core = function (UIkit) {

    var scroll = 0, started = 0;

    on(win, 'load resize', UIkit.update);
    on(win, 'scroll', function (e) {
        e.dir = scroll < win.pageYOffset ? 'down' : 'up';
        scroll = win.pageYOffset;
        UIkit.update(e);
        fastdom.flush();
    });

    animationstart && on(doc, animationstart, function (ref) {
        var target = ref.target;

        if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {
            started++;
            doc.body.style.overflowX = 'hidden';
            setTimeout(function () {
                if (!--started) {
                    doc.body.style.overflowX = '';
                }
            }, toMs(css(target, 'animationDuration')) + 100);
        }
    }, true);

    // core components
    UIkit.use(Toggle);
    UIkit.use(Accordion);
    UIkit.use(Alert);
    UIkit.use(Video);
    UIkit.use(Cover);
    UIkit.use(Drop);
    UIkit.use(Dropdown);
    UIkit.use(FormCustom);
    UIkit.use(HeightMatch);
    UIkit.use(HeightViewport);
    UIkit.use(Hover);
    UIkit.use(Margin);
    UIkit.use(Gif);
    UIkit.use(Grid);
    UIkit.use(Leader);
    UIkit.use(Modal$1);
    UIkit.use(Nav);
    UIkit.use(Navbar);
    UIkit.use(Offcanvas);
    UIkit.use(Responsive);
    UIkit.use(Scroll);
    UIkit.use(Scrollspy);
    UIkit.use(ScrollspyNav);
    UIkit.use(Sticky);
    UIkit.use(Svg);
    UIkit.use(Icon);
    UIkit.use(Switcher);
    UIkit.use(Tab);

};

UIkit$2.version = '3.0.0-beta.33';

mixin(UIkit$2);
core(UIkit$2);

function plugin(UIkit) {

    if (plugin.installed) {
        return;
    }

    var ref = UIkit.util;
    var $ = ref.$;
    var doc = ref.doc;
    var empty = ref.empty;
    var html = ref.html;

    UIkit.component('countdown', {

        mixins: [UIkit.mixin.class],

        attrs: true,

        props: {
            date: String,
            clsWrapper: String
        },

        defaults: {
            date: '',
            clsWrapper: '.uk-countdown-%unit%'
        },

        computed: {

            date: function date(ref) {
                var date = ref.date;

                return Date.parse(date);
            },

            days: function days(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'days'), $el);
            },

            hours: function hours(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'hours'), $el);
            },

            minutes: function minutes(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'minutes'), $el);
            },

            seconds: function seconds(ref, $el) {
                var clsWrapper = ref.clsWrapper;

                return $(clsWrapper.replace('%unit%', 'seconds'), $el);
            },

            units: function units() {
                var this$1 = this;

                return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) { return this$1[unit]; });
            }

        },

        connected: function connected() {
            this.start();
        },

        disconnected: function disconnected() {
            var this$1 = this;

            this.stop();
            this.units.forEach(function (unit) { return empty(this$1[unit]); });
        },

        events: [

            {

                name: 'visibilitychange',

                el: doc,

                handler: function handler() {
                    if (doc.hidden) {
                        this.stop();
                    } else  {
                        this.start();
                    }
                }

            }

        ],

        update: {

            write: function write() {
                var this$1 = this;


                var timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(function (unit) {

                    var digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? ("0" + digits) : digits;

                    var el = this$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split('');

                        if (digits.length !== el.children.length) {
                            html(el, digits.map(function () { return '<span></span>'; }).join(''));
                        }

                        digits.forEach(function (digit, i) { return el.children[i].textContent = digit; });
                    }

                });

            }

        },

        methods: {

            start: function start() {
                var this$1 = this;


                this.stop();

                if (this.date && this.units.length) {
                    this.$emit();
                    this.timer = setInterval(function () { return this$1.$emit(); }, 1000);
                }

            },

            stop: function stop() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    });

    function getTimeSpan(date) {

        var total = date - Date.now();

        return {
            total: total,
            seconds: total / 1000 % 60,
            minutes: total / 1000 / 60 % 60,
            hours: total / 1000 / 60 / 60 % 24,
            days: total / 1000 / 60 / 60 / 24
        };
    }

}

if (false) {
    window.UIkit.use(plugin);
}

function plugin$1(UIkit) {

    if (plugin$1.installed) {
        return;
    }

    var ref = UIkit.util;
    var $$ = ref.$$;
    var addClass = ref.addClass;
    var css = ref.css;
    var scrolledOver = ref.scrolledOver;
    var toFloat = ref.toFloat;
    var toNodes = ref.toNodes;

    UIkit.component('grid-parallax', UIkit.components.grid.extend({

        props: {
            target: String,
            translate: Number
        },

        defaults: {
            target: false,
            translate: 150
        },

        computed: {

            translate: function translate(ref) {
                var translate = ref.translate;

                return Math.abs(translate);
            },

            items: function items(ref, $el) {
                var target = ref.target;

                return target ? $$(target, $el) : toNodes($el.children);
            }

        },

        init: function init() {
            addClass(this.$el, 'uk-grid');
        },

        disconnected: function disconnected() {
            this.reset();
            css(this.$el, 'marginBottom', '');
        },

        update: [

            {

                read: function read() {
                    this.columns = this.rows && this.rows[0] && this.rows[0].length || 0;
                    this.rows = this.rows && this.rows.map(function (elements) { return sortBy(elements, 'offsetLeft'); });
                },

                write: function write() {
                    css(this.$el, 'marginBottom', this.columns > 1
                        ? this.translate + toFloat(css(css(this.$el, 'marginBottom', ''), 'marginBottom'))
                        : '');
                },

                events: ['load', 'resize']
            },

            {

                read: function read() {

                    this.scrolled = scrolledOver(this.$el) * this.translate;

                },

                write: function write() {
                    var this$1 = this;


                    if (!this.rows || this.columns === 1 || !this.scrolled) {
                        return this.reset();
                    }

                    this.rows.forEach(function (row) { return row.forEach(function (el, i) { return css(el, 'transform', ("translateY(" + (i % 2 ? this$1.scrolled : this$1.scrolled / 8) + "px)")); }
                        ); }
                    );

                },

                events: ['scroll', 'load', 'resize']
            }
        ],

        methods: {

            reset: function reset() {
                css(this.items, 'transform', '');
            }

        }

    }));

    UIkit.component('grid-parallax').options.update.unshift({

        read: function read() {
            this.reset();
        },

        events: ['load', 'resize']

    });

    function sortBy(collection, prop) {
        return collection.sort(function (a, b) { return a[prop] > b[prop]
                ? 1
                : b[prop] > a[prop]
                    ? -1
                    : 0; }
        )
    }

}

if (false) {
    window.UIkit.use(plugin$1);
}

var Animations = function (UIkit) {

    var ref = UIkit.util;
    var css = ref.css;

    var Animations = {

        slide: {

            show: function show(dir) {
                return [
                    {transform: translate(dir * -100)},
                    {transform: translate()}
                ];
            },

            percent: function percent(current) {
                return Animations.translated(current);
            },

            translate: function translate$1(percent, dir) {
                return [
                    {transform: translate(dir * -100 * percent)},
                    {transform: translate(dir * 100 * (1 - percent))}
                ];
            }

        },

        translated: function translated(el) {
            return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth)
        }

    };

    return Animations;

};

function translate(value) {
    if ( value === void 0 ) value = 0;

    return ("translate(" + value + (value ? '%' : '') + ", 0)"); // currently not translate3d to support IE, translate3d within translate3d does not work while transitioning
}

function scale3d(value) {
    return ("scale3d(" + value + ", " + value + ", 1)");
}

function plugin$3(UIkit) {

    if (plugin$3.installed) {
        return;
    }

    var ref = UIkit.util;
    var $$ = ref.$$;
    var $ = ref.$;
    var addClass = ref.addClass;
    var assign = ref.assign;
    var createEvent = ref.createEvent;
    var css = ref.css;
    var data = ref.data;
    var doc = ref.doc;
    var endsWith = ref.endsWith;
    var fastdom = ref.fastdom;
    var getIndex = ref.getIndex;
    var getPos = ref.getPos;
    var hasClass = ref.hasClass;
    var index = ref.index;
    var isTouch = ref.isTouch;
    var noop = ref.noop;
    var off = ref.off;
    var on = ref.on;
    var pointerDown = ref.pointerDown;
    var pointerMove = ref.pointerMove;
    var pointerUp = ref.pointerUp;
    var preventClick = ref.preventClick;
    var Promise = ref.Promise;
    var removeClass = ref.removeClass;
    var toggleClass = ref.toggleClass;
    var toNodes = ref.toNodes;
    var Transition = ref.Transition;
    var trigger = ref.trigger;
    var win = ref.win;

    var abs = Math.abs;

    UIkit.mixin.slideshow = {

        attrs: true,

        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean,
            animation: String,
            easing: String,
            velocity: Number
        },

        defaults: {
            autoplay: false,
            autoplayInterval: 7000,
            pauseOnHover: true,
            animation: 'slide',
            easing: 'ease',
            velocity: 1,
            index: 0,
            stack: [],
            threshold: 10,
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: 'uk-transition-active',
            initialAnimation: false,
            Animations: Animations(UIkit)
        },

        computed: {

            list: function list(ref, $el) {
                var selList = ref.selList;

                return $(selList, $el);
            },

            slides: function slides() {
                return toNodes(this.list.children);
            },

            animation: function animation(ref) {
                var animation = ref.animation;
                var Animations$$1 = ref.Animations;

                return assign(animation in Animations$$1 ? Animations$$1[animation] : Animations$$1.slide, {name: animation});
            },

            duration: function duration(ref, $el) {
                var velocity = ref.velocity;

                return speedUp($el.offsetWidth / velocity);
            }

        },

        init: function init() {
            var this$1 = this;

            ['start', 'move', 'end'].forEach(function (key) {
                var fn = this$1[key];
                this$1[key] = function (e) {

                    var pos = getPos(e).x;

                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;

                    fn(e);
                };
            });
        },

        connected: function connected() {
            this.startAutoplay();
        },

        disconnected: function disconnected() {
            this.stopAutoplay();
        },

        update: [

            {

                read: function read() {
                    delete this._computeds.duration;
                },

                events: ['load', 'resize']

            }

        ],

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    e.current.blur();
                    this.show(data(e.current, this.attrItem));
                }

            },

            {

                name: pointerDown,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(e) {
                    if (isTouch(e) || !hasTextNodesOnly(e.target)) {
                        this.start(e);
                    }
                }

            },

            {

                name: 'visibilitychange',

                el: doc,

                handler: function handler() {
                    if (doc.hidden) {
                        this.stopAutoplay();
                    } else  {
                        this.startAutoplay();
                    }
                }

            },

            {

                name: pointerDown,
                handler: 'stopAutoplay'

            },

            {

                name: 'mouseenter',

                filter: function filter() {
                    return this.autoplay;
                },

                handler: function handler() {
                    this.isHovering = true;
                }

            },

            {

                name: 'mouseleave',

                filter: function filter() {
                    return this.autoplay;
                },

                handler: function handler() {
                    this.isHovering = false;
                }

            },

            {

                name: 'beforeitemshow',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var target = ref.target;

                    addClass(target, this.clsActive);
                }

            },

            {

                name: 'itemshown',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var target = ref.target;

                    addClass(target, this.clsActivated);
                }

            },

            {

                name: 'itemshow itemhide',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var type = ref.type;
                    var target = ref.target;

                    toggleClass($$(("[" + (this.attrItem) + "=\"" + (index(target)) + "\"],[data-" + (this.attrItem) + "=\"" + (index(target)) + "\"]"), this.$el), this.clsActive, endsWith(type, 'show'));
                }

            },

            {

                name: 'itemhidden',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var target = ref.target;

                    removeClass(target, this.clsActive);
                    removeClass(target, this.clsActivated);
                }

            },

            {

                name: 'itemshow itemhide itemshown itemhidden',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var target = ref.target;

                    UIkit.update(null, target);
                }

            },

            {
                name: 'dragstart',

                handler: function handler(e) {
                    e.preventDefault();
                }
            }

        ],

        methods: {

            start: function start(e) {

                if (e.button && e.button !== 0 || this.slides.length < 2) {
                    return;
                }

                if (this._animation && this._animation.animation !== this.animation) {
                    return;
                }

                var percent = 0;
                if (this.stack.length) {

                    var ref = this._animation;
                    var dir = ref.dir;
                    var getPercent = ref.percent;
                    var cancel = ref.cancel;
                    var translate$$1 = ref.translate;

                    percent = getPercent() * dir;

                    this.percent = abs(percent) * -dir;

                    this.stack.splice(0, this.stack.length);

                    cancel();
                    translate$$1(abs(percent));

                    this.index = this.getIndex(this.index - dir);
                    this.dragging = true;

                }

                this.unbindMove = on(doc, pointerMove, this.move, {capture: true, passive: false});
                on(win, 'scroll', this.unbindMove);
                on(doc, pointerUp, this.end, true);

                this.drag = this.pos + this.$el.offsetWidth * percent;

            },

            move: function move(e) {
                var this$1 = this;


                var distance = this.pos - this.drag;

                if (this.prevPos === this.pos || !this.dragging && abs(distance) < this.threshold) {
                    return;
                }

                e.cancelable && e.preventDefault();

                this.dragging = true;

                var percent = distance / this.$el.offsetWidth;

                if (this.percent === percent) {
                    return;
                }

                var prevIndex = this.getIndex(this.index - trunc(this.percent)),
                    index = this.getIndex(this.index - trunc(percent)),
                    current = this.slides[index],
                    dir = percent < 0 ? 1 : -1,
                    nextIndex = getIndex(percent < 0 ? 'next' : 'previous', this.slides, index),
                    next = this.slides[nextIndex];

                this.slides.forEach(function (el, i) { return toggleClass(el, this$1.clsActive, i === index || i === nextIndex); });

                this._animation && this._animation.reset();

                if (index !== prevIndex) {
                    trigger(this.slides[prevIndex], 'itemhide', [this]);
                    trigger(current, 'itemshow', [this]);
                }

                this._animation = new Transitioner(this.animation, this.easing, current, next, dir, noop);
                this._animation.translate(abs(percent % 1));

                this.percent = percent;

                UIkit.update(null, current);
                UIkit.update(null, next);
            },

            end: function end() {

                off(win, 'scroll', this.unbindMove);
                this.unbindMove();
                off(doc, pointerUp, this.end, true);

                if (this.dragging) {

                    var percent = this.percent;

                    this.percent = abs(this.percent) % 1;
                    this.index = this.getIndex(this.index - trunc(percent));

                    if (this.percent < .1 || percent < 0 === this.pos > this.prevPos) {
                        this.index = this.getIndex(percent > 0 ? 'previous' : 'next');
                        this.percent = 1 - this.percent;
                        percent *= -1;
                    }

                    this._animation && this._animation.reset();
                    this.show(percent > 0 ? 'previous' : 'next', true);

                    preventClick();

                }

                this.drag
                    = this.dragging
                    = this.percent
                    = null;

            },

            show: function show(index, force) {
                var this$1 = this;
                if ( force === void 0 ) force = false;


                if (!force && this.drag) {
                    return;
                }

                this.stack[force ? 'unshift' : 'push'](index);

                if (!force && this.stack.length > 1) {

                    if (this.stack.length === 2) {
                        this._animation.forward(250);
                    }

                    return;
                }

                var prevIndex = this.index,
                    nextIndex = this.getIndex(index),
                    prev = hasClass(this.slides, 'uk-active') && this.slides[prevIndex],
                    next = this.slides[nextIndex];

                if (prev === next) {
                    this.stack[force ? 'shift' : 'pop']();
                    return;
                }

                prev && trigger(prev, 'beforeitemhide', [this]);
                trigger(next, 'beforeitemshow', [this]);

                this.index = nextIndex;

                var done = function () {

                    prev && trigger(prev, 'itemhidden', [this$1]);
                    trigger(next, 'itemshown', [this$1]);

                    fastdom.mutate(function () {
                        this$1.stack.shift();
                        if (this$1.stack.length) {
                            this$1.show(this$1.stack.shift(), true);
                        } else {
                            this$1._animation = null;
                        }
                    });
                };

                if (prev || this.initialAnimation) {

                    this._show(
                        !prev ? this.Animations[this.initialAnimation] : this.animation,
                        force ? 'cubic-bezier(0.165, 0.840, 0.440, 1.000)' : this.easing,
                        prev,
                        next,
                        getDirection(index, prevIndex),
                        this.stack.length > 1,
                        done
                    );

                }

                prev && trigger(prev, 'itemhide', [this]);
                trigger(next, 'itemshow', [this]);

                if (!prev && !this.initialAnimation) {
                    done();
                }

                prev && fastdom.flush(); // iOS 10+ will honor the video.play only if called from a gesture handler

            },

            _show: function _show(animation, easing, prev, next, dir, forward, done) {

                this._animation = new Transitioner(
                    animation,
                    easing,
                    prev,
                    next,
                    dir,
                    done
                );

                this._animation.show(
                    prev === next
                        ? 300
                        : forward
                            ? 150
                            : this.duration,
                    this.percent,
                    forward
                );

            },

            getIndex: function getIndex$1(index) {
                if ( index === void 0 ) index = this.index;

                return getIndex(index, this.slides, this.index);
            },

            startAutoplay: function startAutoplay() {
                var this$1 = this;


                this.stopAutoplay();

                if (this.autoplay) {
                    this.interval = setInterval(function () { return !(this$1.isHovering && this$1.pauseOnHover) && this$1.show('next'); }, this.autoplayInterval);
                }

            },

            stopAutoplay: function stopAutoplay() {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            }

        }

    };

    function Transitioner(animation, easing, current, next, dir, cb) {

        var percent = animation.percent;
        var translate$$1 = animation.translate;
        var show = animation.show;
        var props = show(dir);

        return {

            animation: animation,
            dir: dir,
            current: current,
            next: next,

            show: function show(duration, percent, linear) {
                var this$1 = this;
                if ( percent === void 0 ) percent = 0;


                var ease = linear ? 'linear' : easing;
                duration -= Math.round(duration * percent);

                this.translate(percent);

                triggerUpdate(next, 'itemin', {percent: percent, duration: duration, ease: ease, dir: dir});
                current && triggerUpdate(current, 'itemout', {percent: 1 - percent, duration: duration, ease: ease, dir: dir});

                return Promise.all([
                    Transition.start(next, props[1], duration, ease),
                    current && Transition.start(current, props[0], duration, ease)
                ]).then(function () {
                    this$1.reset();
                    cb();
                }, noop);
            },

            stop: function stop() {
                return Transition.stop([next, current]);
            },

            cancel: function cancel() {
                Transition.cancel([next, current]);
            },

            reset: function reset() {
                for (var prop in props[0]) {
                    css([next, current], prop, '');
                }
            },

            forward: function forward(duration) {

                var percent = this.percent();
                Transition.cancel([next, current]);
                this.show(duration, percent, true);

            },

            translate: function translate$1(percent) {

                var props = translate$$1(percent, dir);
                css(next, props[1]);
                current && css(current, props[0]);
                triggerUpdate(next, 'itemtranslatein', {percent: percent, dir: dir});
                current && triggerUpdate(current, 'itemtranslateout', {percent: 1 - percent, dir: dir});
            },

            percent: function percent$1() {
                return percent(current, next, dir);
            }

        }

    }

    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    // polyfill for Math.trunc (IE)
    function trunc(x) {
        return ~~x;
    }

    function getDirection(index, prevIndex) {
        return index === 'next'
            ? 1
            : index === 'previous'
                ? -1
                : index < prevIndex
                    ? -1
                    : 1;
    }

    function speedUp(x) {
        return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
    }

    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }

}

var Animations$1 = function (UIkit) {

    var mixin = UIkit.mixin;
    var ref = UIkit.util;
    var assign = ref.assign;
    var css = ref.css;

    return assign({}, mixin.slideshow.defaults.Animations, {

        fade: {

            show: function show() {
                return [
                    {opacity: 0},
                    {opacity: 1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent},
                    {opacity: percent}
                ];
            }

        },

        scale: {

            show: function show() {
                return [
                    {opacity: 0, transform: scale3d(1 - .2)},
                    {opacity: 1, transform: scale3d(1)}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 - .2 * percent)},
                    {opacity: percent, transform: scale3d(1 - .2 + .2 * percent)}
                ];
            }

        }

    });

};

function plugin$2(UIkit) {

    if (plugin$2.installed) {
        return;
    }

    UIkit.use(plugin$3);

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var $ = util.$;
    var $$ = util.$$;
    var addClass = util.addClass;
    var ajax = util.ajax;
    var append = util.append;
    var assign = util.assign;
    var attr = util.attr;
    var css = util.css;
    var doc = util.doc;
    var docEl = util.docEl;
    var data = util.data;
    var getImage = util.getImage;
    var html = util.html;
    var index = util.index;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerMove = util.pointerMove;
    var removeClass = util.removeClass;
    var Transition = util.Transition;
    var trigger = util.trigger;

    UIkit.component('lightbox', {

        attrs: true,

        props: {
            animation: String,
            toggle: String,
            autoplay: Boolean,
            autoplayInterval: Number,
            videoAutoplay: Boolean
        },

        defaults: {
            animation: undefined,
            toggle: 'a',
            autoplay: 0,
            videoAutoplay: false
        },

        computed: {

            toggles: function toggles(ref, $el) {
                var this$1 = this;
                var toggle = ref.toggle;

                var toggles = $$(toggle, $el);

                this._changed = !this._toggles
                    || toggles.length !== this._toggles.length
                    || toggles.some(function (el, i) { return el !== this$1._toggles[i]; });

                return this._toggles = toggles;
            }

        },

        disconnected: function disconnected() {

            if (this.panel) {
                this.panel.$destroy(true);
                this.panel = null;
            }

        },

        events: [

            {

                name: 'click',

                delegate: function delegate() {
                    return ((this.toggle) + ":not(.uk-disabled)");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    e.current.blur();
                    this.show(index(this.toggles, e.current));
                }

            }

        ],

        update: function update() {

            if (this.panel && this.animation) {
                this.panel.$props.animation = this.animation;
                this.panel.$emit();
            }

            if (!this.toggles.length || !this._changed || !this.panel) {
                return;
            }

            this.panel.$destroy(true);
            this._init();

        },

        methods: {

            _init: function _init() {
                return this.panel = this.panel || UIkit.lightboxPanel(assign({}, this.$props, {
                    items: this.toggles.reduce(function (items, el) {
                        items.push(['href', 'caption', 'type', 'poster'].reduce(function (obj, attr) {
                            obj[attr === 'href' ? 'source' : attr] = data(el, attr);
                            return obj;
                        }, {}));
                        return items;
                    }, [])
                }));
            },

            show: function show(index) {

                if (!this.panel) {
                    this._init();
                }

                return this.panel.show(index);

            },

            hide: function hide() {

                return this.panel && this.panel.hide();

            }

        }

    });

    UIkit.component('lightbox-panel', {

        mixins: [mixin.container, mixin.togglable, mixin.slideshow],

        functional: true,

        defaults: {
            preload: 1,
            videoAutoplay: false,
            delayControls: 3000,
            items: [],
            cls: 'uk-open',
            clsPage: 'uk-lightbox-page',
            selList: '.uk-lightbox-items',
            attrItem: 'uk-lightbox-item',
            initialAnimation: 'scale',
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations$1(UIkit),
            template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close uk-toggle=\"!.uk-lightbox\"></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
        },

        created: function created() {
            var this$1 = this;


            this.$mount(append(this.container, this.template));

            this.caption = $('.uk-lightbox-caption', this.$el);

            this.items.forEach(function (el, i) { return append(this$1.list, "<li></li>"); });

        },

        events: [

            {

                name: (pointerMove + " " + pointerDown + " keydown"),

                handler: 'showControls'

            },

            {

                name: 'click',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'show',

                self: true,

                handler: function handler() {
                    addClass(docEl, this.clsPage);
                }
            },

            {

                name: 'shown',

                self: true,

                handler: 'showControls'
            },

            {

                name: 'hide',

                self: true,

                handler: 'hideControls'
            },

            {

                name: 'hidden',

                self: true,

                handler: function handler() {
                    removeClass(docEl, this.clsPage);
                }
            },

            {

                name: 'keyup',

                el: function el() {
                    return doc;
                },

                handler: function handler(e) {

                    if (!this.isToggled(this.$el)) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 27:
                            this.hide();
                            break;
                        case 37:
                            this.show('previous');
                            break;
                        case 39:
                            this.show('next');
                            break;
                    }
                }
            },

            {

                name: 'toggle',

                handler: function handler(e) {
                    e.preventDefault();
                    this.toggle();
                }

            },

            {

                name: 'beforeitemshow',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler() {
                    if (!this.isToggled()) {
                        this.toggleNow(this.$el, true);
                    }
                }

            },

            {

                name: 'itemshow',

                self: true,

                delegate: function delegate() {
                    return ((this.selList) + " > *");
                },

                handler: function handler(ref) {
                    var this$1 = this;
                    var target = ref.target;


                    var i = index(target),
                        caption = this.getItem(i).caption;
                        css(this.caption, 'display', caption ? '' : 'none');
                        html(this.caption, caption);

                    for (var j = 0; j <= this.preload; j++) {
                        this$1.loadItem(this$1.getIndex(i + j));
                        this$1.loadItem(this$1.getIndex(i - j));
                    }

                }

            },

            {

                name: 'itemload',

                handler: function handler(_, item) {
                    var this$1 = this;


                    var source = item.source;
                    var type = item.type;
                    var matches;

                    this.setItem(item, '<span uk-spinner></span>');

                    if (!source) {
                        return;
                    }

                    // Image
                    if (type === 'image' || source.match(/\.(jp(e)?g|png|gif|svg)$/i)) {

                        getImage(source).then(
                            function (img) { return this$1.setItem(item, ("<img width=\"" + (img.width) + "\" height=\"" + (img.height) + "\" src=\"" + source + "\">")); },
                            function () { return this$1.setError(item); }
                        );

                    // Video
                    } else if (type === 'video' || source.match(/\.(mp4|webm|ogv)$/i)) {

                        var video = $(("<video controls playsinline" + (item.poster ? (" poster=\"" + (item.poster) + "\"") : '') + " uk-video=\"autoplay: " + (this.videoAutoplay) + "\"></video>"));
                        attr(video, 'src', source);

                        on(video, 'error', function () { return this$1.setError(item); });
                        on(video, 'loadedmetadata', function () {
                            attr(video, {width: video.videoWidth, height: video.videoHeight});
                            this$1.setItem(item, video);
                        });

                    // Iframe
                    } else if (type === 'iframe') {

                        this.setItem(item, ("<iframe class=\"uk-lightbox-iframe\" src=\"" + source + "\" frameborder=\"0\" allowfullscreen></iframe>"));

                    // Youtube
                    } else if (matches = source.match(/\/\/.*?youtube\.[a-z]+\/watch\?v=([^&\s]+)/) || source.match(/youtu\.be\/(.*)/)) {

                        var id = matches[1],
                            setIframe = function (width, height) {
                                if ( width === void 0 ) width = 640;
                                if ( height === void 0 ) height = 450;

                                return this$1.setItem(item, getIframe(("//www.youtube.com/embed/" + id), width, height, this$1.videoAutoplay));
                        };

                        getImage(("//img.youtube.com/vi/" + id + "/maxresdefault.jpg")).then(
                            function (ref) {
                                var width = ref.width;
                                var height = ref.height;

                                //youtube default 404 thumb, fall back to lowres
                                if (width === 120 && height === 90) {
                                    getImage(("//img.youtube.com/vi/" + id + "/0.jpg")).then(
                                        function (ref) {
                                            var width = ref.width;
                                            var height = ref.height;

                                            return setIframe(width, height);
                                    },
                                        setIframe
                                    );
                                } else {
                                    setIframe(width, height);
                                }
                            },
                            setIframe
                        );

                    // Vimeo
                    } else if (matches = source.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/)) {

                        ajax(("//vimeo.com/api/oembed.json?maxwidth=1920&url=" + (encodeURI(source))), {responseType: 'json'})
                            .then(function (ref) {
                                    var ref_response = ref.response;
                                    var height = ref_response.height;
                                    var width = ref_response.width;

                                    return this$1.setItem(item, getIframe(("//player.vimeo.com/video/" + (matches[2])), width, height, this$1.videoAutoplay));
                        }
                            );

                    }

                }

            }

        ],

        methods: {

            toggle: function toggle() {
                return this.isToggled() ? this.hide() : this.show();
            },

            hide: function hide() {

                if (this.isToggled()) {
                    this.toggleNow(this.$el, false);
                }

                removeClass(this.slides, this.clsActive);
                Transition.stop(this.slides);

                delete this.index;
                delete this.percent;
                delete this._animation;

            },

            loadItem: function loadItem(index) {
                if ( index === void 0 ) index = this.index;


                var item = this.getItem(index);

                if (item.content) {
                    return;
                }

                trigger(this.$el, 'itemload', [item]);
            },

            getItem: function getItem(index) {
                if ( index === void 0 ) index = this.index;

                return this.items[index] || {};
            },

            setItem: function setItem(item, content) {
                assign(item, {content: content});
                var el = html(this.slides[this.items.indexOf(item)], content);
                trigger(this.$el, 'itemloaded', [this, el]);
                UIkit.update(null, el);
            },

            setError: function setError(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },

            showControls: function showControls() {

                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

                attr($$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), this.$el), 'hidden', this.items.length < 2 ? '' : null);

                addClass(this.$el, 'uk-active uk-transition-active');

            },

            hideControls: function hideControls() {
                removeClass(this.$el, 'uk-active uk-transition-active');
            }

        }

    });

    function getIframe(src, width, height, autoplay) {
        return ("<iframe src=\"" + src + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"max-width: 100%; box-sizing: border-box;\" frameborder=\"0\" allowfullscreen uk-video=\"autoplay: " + autoplay + "\" uk-responsive></iframe>");
    }

}

if (false) {
    window.UIkit.use(plugin$2);
}

function plugin$4(UIkit) {

    if (plugin$4.installed) {
        return;
    }

    var ref = UIkit.util;
    var append = ref.append;
    var closest = ref.closest;
    var css = ref.css;
    var each = ref.each;
    var pointerEnter = ref.pointerEnter;
    var pointerLeave = ref.pointerLeave;
    var remove = ref.remove;
    var toFloat = ref.toFloat;
    var Transition = ref.Transition;
    var trigger = ref.trigger;
    var containers = {};

    UIkit.component('notification', {

        functional: true,

        args: ['message', 'status'],

        defaults: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        created: function created() {

            if (!containers[this.pos]) {
                containers[this.pos] = append(UIkit.container, ("<div class=\"uk-notification uk-notification-" + (this.pos) + "\"></div>"));
            }

            var container = css(containers[this.pos], 'display', 'block');

            this.$mount(append(container,
                ("<div class=\"" + (this.clsMsg) + (this.status ? (" " + (this.clsMsg) + "-" + (this.status)) : '') + "\"> <a href=\"#\" class=\"" + (this.clsClose) + "\" data-uk-close></a> <div>" + (this.message) + "</div> </div>")
            ));

        },

        ready: function ready() {
            var this$1 = this;


            var marginBottom = toFloat(css(this.$el, 'marginBottom'));
            Transition.start(
                css(this.$el, {opacity: 0, marginTop: -1 * this.$el.offsetHeight, marginBottom: 0}),
                {opacity: 1, marginTop: 0, marginBottom: marginBottom}
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj = {

            click: function click(e) {
                if (closest(e.target, 'a[href="#"]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj[pointerEnter] = function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }, obj[pointerLeave] = function () {
                if (this.timeout) {
                    this.timer = setTimeout(this.close, this.timeout);
                }
            }, obj ),

        methods: {

            close: function close(immediate) {
                var this$1 = this;


                var removeFn = function () {

                    trigger(this$1.$el, 'close', [this$1]);
                    remove(this$1.$el);

                    if (!containers[this$1.pos].children.length) {
                        css(containers[this$1.pos], 'display', 'none');
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn();
                } else {
                    Transition.start(this.$el, {
                        opacity: 0,
                        marginTop: -1 * this.$el.offsetHeight,
                        marginBottom: 0
                    }).then(removeFn);
                }
            }

        }

    });
    var obj;

    UIkit.notification.closeAll = function (group, immediate) {
        each(UIkit.instances, function (component) {
            if (component.$options.name === 'notification' && (!group || group === component.group)) {
                component.close(immediate);
            }
        });
    };

}

if (false) {
    window.UIkit.use(plugin$4);
}

function plugin$5(UIkit) {

    if (plugin$5.installed) {
        return;
    }

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var clamp = util.clamp;
    var css = util.css;
    var Dimensions = util.Dimensions;
    var each = util.each;
    var getImage = util.getImage;
    var includes = util.includes;
    var isNumber = util.isNumber;
    var isUndefined = util.isUndefined;
    var scrolledOver = util.scrolledOver;
    var toFloat = util.toFloat;
    var query = util.query;
    var win = util.win;

    var props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity'];

    mixin.parallax = {

        props: props.reduce(function (props, prop) {
            props[prop] = 'list';
            return props;
        }, {
            media: 'media'
        }),

        defaults: props.reduce(function (defaults, prop) {
            defaults[prop] = undefined;
            return defaults;
        }, {
            media: false
        }),

        computed: {

            props: function props$1(properties, $el) {
                var this$1 = this;


                return props.reduce(function (props, prop) {

                    if (isUndefined(properties[prop])) {
                        return props;
                    }

                    var isColor = prop.match(/color/i),
                        isCssProp = isColor || prop === 'opacity',
                        steps = properties[prop].slice(0),
                        pos, bgPos, diff;

                    if (isCssProp) {
                        css($el, prop, '');
                    }

                    if (steps.length < 2) {
                        steps.unshift((prop === 'scale'
                            ? 1
                            : isCssProp
                                ? css($el, prop)
                                : 0) || 0);
                    }

                    var unit = includes(steps.join(''), '%') ? '%' : 'px';

                    if (isColor) {

                        var color = $el.style.color;
                        steps = steps.map(function (step) { return parseColor($el, step); });
                        $el.style.color = color;

                    } else {

                        steps = steps.map(toFloat);

                    }

                    if (prop.match(/^bg/)) {

                        css($el, ("background-position-" + (prop[2])), '');
                        bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

                        if (this$1.covers) {

                            var min = Math.min.apply(Math, steps),
                                max = Math.max.apply(Math, steps),
                                down = steps.indexOf(min) < steps.indexOf(max);

                            diff = max - min;

                            steps = steps.map(function (step) { return step - (down ? min : max); });
                            pos = (down ? -diff : 0) + "px";

                        } else {

                            pos = bgPos;

                        }
                    }

                    props[prop] = {steps: steps, unit: unit, pos: pos, bgPos: bgPos, diff: diff};

                    return props;

                }, {});

            },

            bgProps: function bgProps() {
                var this$1 = this;

                return ['bgx', 'bgy'].filter(function (bg) { return bg in this$1.props; });
            },

            covers: function covers(_, $el) {
                return css($el.style.backgroundSize !== '' ? css($el, 'backgroundSize', '') : $el, 'backgroundSize') === 'cover';
            }

        },

        disconnected: function disconnected() {
            delete this._image;
        },

        update: [

            {

                read: function read() {
                    var this$1 = this;


                    delete this._computeds.props;

                    this._active = !this.media || win.matchMedia(this.media).matches;

                    if (this._image) {
                        this._image.dimEl = {
                            width: this.$el.offsetWidth,
                            height: this.$el.offsetHeight
                        };
                    }

                    if (!isUndefined(this._image) || !this.covers || !this.bgProps.length) {
                        return;
                    }

                    var src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

                    if (!src) {
                        return;
                    }

                    this._image = false;

                    getImage(src).then(function (img) {
                        this$1._image = {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        };

                        this$1.$emit();
                    });

                },

                write: function write() {
                    var this$1 = this;


                    if (!this._image) {
                        return;
                    }

                    if (!this._active) {
                        css(this.$el, {backgroundSize: '', backgroundRepeat: ''});
                        return;
                    }

                    var image = this._image,
                        dimEl = image.dimEl,
                        dim = Dimensions.cover(image, dimEl);

                    this.bgProps.forEach(function (prop) {

                        var ref = this$1.props[prop];
                        var diff = ref.diff;
                        var bgPos = ref.bgPos;
                        var steps = ref.steps;
                        var attr = prop === 'bgy' ? 'height' : 'width',
                            span = dim[attr] - dimEl[attr];

                        if (!bgPos.match(/%$|0px/)) {
                            return;
                        }

                        if (span < diff) {
                            dimEl[attr] = dim[attr] + diff - span;
                        } else if (span > diff) {

                            bgPos = parseFloat(bgPos);

                            if (bgPos) {
                                this$1.props[prop].steps = steps.map(function (step) { return step - (span - diff) / (100 / bgPos); });
                            }
                        }

                        dim = Dimensions.cover(image, dimEl);
                    });

                    css(this.$el, {
                        backgroundSize: ((dim.width) + "px " + (dim.height) + "px"),
                        backgroundRepeat: 'no-repeat'
                    });

                },

                events: ['load', 'resize']

            }

        ],

        methods: {

            reset: function reset() {
                var this$1 = this;

                each(this.getCss(0), function (_, prop) { return css(this$1.$el, prop, ''); });
            },

            getCss: function getCss(percent) {

                var translated = false,
                    props = this.props;

                return Object.keys(props).reduce(function (css, prop) {

                    var ref = props[prop];
                    var steps = ref.steps;
                    var unit = ref.unit;
                    var pos = ref.pos;
                    var value = getValue(steps, percent);

                    switch (prop) {

                        // transforms
                        case 'x':
                        case 'y':

                            if (translated) {
                                break;
                            }

                            var ref$1 = ['x', 'y'].map(function (dir) { return prop === dir
                                ? value + unit
                                : props[dir]
                                    ? getValue(props[dir].steps, percent) + props[dir].unit
                                    : 0; }
                            );
                    var x = ref$1[0];
                    var y = ref$1[1];

                            translated = css.transform += " translate3d(" + x + ", " + y + ", 0)";
                            break;
                        case 'rotate':
                            css.transform += " rotate(" + value + "deg)";
                            break;
                        case 'scale':
                            css.transform += " scale(" + value + ")";
                            break;

                        // bg image
                        case 'bgy':
                        case 'bgx':
                            css[("background-position-" + (prop[2]))] = "calc(" + pos + " + " + (value + unit) + ")";
                            break;

                        // color
                        case 'color':
                        case 'backgroundColor':
                        case 'borderColor':

                            var ref$2 = getStep(steps, percent);
                    var start = ref$2[0];
                    var end = ref$2[1];
                    var p = ref$2[2];

                            css[prop] = "rgba(" + (start.map(function (value, i) {
                                    value = value + p * (end[i] - value);
                                    return i === 3 ? toFloat(value) : parseInt(value, 10);
                                }).join(',')) + ")";
                            break;

                        // CSS Filter
                        case 'blur':
                            css.filter += " blur(" + value + "px)";
                            break;
                        case 'hue':
                            css.filter += " hue-rotate(" + value + "deg)";
                            break;
                        case 'fopacity':
                            css.filter += " opacity(" + value + "%)";
                            break;
                        case 'grayscale':
                        case 'invert':
                        case 'saturate':
                        case 'sepia':
                            css.filter += " " + prop + "(" + value + "%)";
                            break;

                        default:
                            css[prop] = value;
                    }

                    return css;

                }, {transform: '', filter: ''});

            }

        }

    };

    UIkit.component('parallax', {

        mixins: [mixin.parallax],

        props: {
            target: String,
            viewport: Number,
            easing: Number,
        },

        defaults: {
            target: false,
            viewport: 1,
            easing: 1,
        },

        computed: {

            target: function target(ref, $el) {
                var target = ref.target;

                return target && query(target, $el) || $el;
            }

        },

        disconnected: function disconnected() {
            delete this._prev;
        },

        update: [

            {

                read: function read() {

                    this._percent = ease(scrolledOver(this.target) / (this.viewport || 1), this.easing);

                },

                write: function write(ref) {
                    var type = ref.type;


                    if (type !== 'scroll') {
                        delete this._prev;
                    }

                    if (!this._active) {
                        this.reset();
                        return;
                    }

                    if (this._prev !== this._percent) {
                        css(this.$el, this.getCss(this._percent));
                        this._prev = this._percent;
                    }

                },

                events: ['scroll', 'load', 'resize']
            }

        ]

    });

    function ease(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)))
    }

    function parseColor(el, color) {
        return css(css(el, 'color', color), 'color').split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(function (n) { return toFloat(n); });
    }

    function getStep(steps, percent) {
        var count = steps.length - 1,
            index = Math.min(Math.floor(count * percent), count - 1),
            step = steps.slice(index, index + 2);

        step.push(percent === 1 ? 1 : percent % (1 / count) * count);

        return step;
    }

    function getValue(steps, percent) {
        var ref = getStep(steps, percent);
        var start = ref[0];
        var end = ref[1];
        var p = ref[2];
        return (isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end
        ).toFixed(2);
    }

}

if (false) {
    window.UIkit.use(plugin$5);
}

var Animations$2 = function (UIkit) {

    var mixin = UIkit.mixin;
    var ref = UIkit.util;
    var assign = ref.assign;
    var css = ref.css;

    var Animations$$1 = assign({}, mixin.slideshow.defaults.Animations, {

        fade: {

            show: function show() {
                return [
                    {opacity: 0, zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        scale: {

            show: function show() {
                return [
                    {opacity: 0, transform: scale3d(1 + .5), zIndex: 0},
                    {zIndex: -1}
                ];
            },

            percent: function percent(current) {
                return 1 - css(current, 'opacity');
            },

            translate: function translate$$1(percent) {
                return [
                    {opacity: 1 - percent, transform: scale3d(1 + .5 * percent), zIndex: 0},
                    {zIndex: -1}
                ];
            }

        },

        pull: {

            show: function show(dir) {
                return dir < 0
                    ? [
                        {transform: translate(30), zIndex: -1},
                        {transform: translate(), zIndex: 0} ]
                    : [
                        {transform: translate(-100), zIndex: 0},
                        {transform: translate(), zIndex: -1}
                    ];
            },

            percent: function percent(current, next, dir) {
                return dir < 0
                    ? 1 - Animations$$1.translated(next)
                    : Animations$$1.translated(current);
            },

            translate: function translate$1(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(30 * percent), zIndex: -1},
                        {transform: translate(-100 * (1 - percent)), zIndex: 0} ]
                    : [
                        {transform: translate(-percent * 100), zIndex: 0},
                        {transform: translate(30 * (1 - percent)), zIndex: -1}
                    ];
            }

        },

        push: {

            show: function show(dir) {
                return dir < 0
                    ? [
                        {transform: translate(100), zIndex: 0},
                        {transform: translate(), zIndex: -1} ]
                    : [
                        {transform: translate(-30), zIndex: -1},
                        {transform: translate(), zIndex: 0}
                    ];
            },

            percent: function percent(current, next, dir) {
                return dir > 0
                    ? 1 - Animations$$1.translated(next)
                    : Animations$$1.translated(current);
            },

            translate: function translate$2(percent, dir) {
                return dir < 0
                    ? [
                        {transform: translate(percent * 100), zIndex: 0},
                        {transform: translate(-30 * (1 - percent)), zIndex: -1} ]
                    : [
                        {transform: translate(-30 * percent), zIndex: -1},
                        {transform: translate(100 * (1 - percent)), zIndex: 0}
                    ];
            }

        }

    });

    return Animations$$1;

};

function plugin$6(UIkit) {

    if (plugin$6.installed) {
        return;
    }

    UIkit.use(plugin$5);
    UIkit.use(plugin$3);

    var mixin = UIkit.mixin;
    var ref = UIkit.util;
    var closest = ref.closest;
    var css = ref.css;
    var fastdom = ref.fastdom;
    var endsWith = ref.endsWith;
    var height = ref.height;
    var noop = ref.noop;
    var Transition = ref.Transition;

    UIkit.component('slideshow', {

        mixins: [mixin.class, mixin.slideshow],

        props: {
            ratio: String,
            minHeight: Boolean,
            maxHeight: Boolean,
        },

        defaults: {
            ratio: '16:9',
            minHeight: false,
            maxHeight: false,
            selList: '.uk-slideshow-items',
            attrItem: 'uk-slideshow-item',
            Animations: Animations$2(UIkit)
        },

        ready: function ready() {
            var this$1 = this;

            fastdom.mutate(function () { return this$1.show(this$1.index); });
        },

        update: {

            read: function read() {
                var ref = this.ratio.split(':').map(Number);
                var width = ref[0];
                var height = ref[1];
                this.height = height * this.$el.offsetWidth / width;

                if (this.minHeight) {
                    this.height = Math.max(this.minHeight, this.height);
                }

                if (this.maxHeight) {
                    this.height = Math.min(this.maxHeight, this.height);
                }
            },

            write: function write() {
                height(this.list, Math.floor(this.height));
            },

            events: ['load', 'resize']

        }

    });

    UIkit.component('slideshow-parallax', {

        mixins: [mixin.parallax],

        computed: {

            item: function item() {
                var slideshow = UIkit.getComponent(closest(this.$el, '.uk-slideshow'), 'slideshow');
                return slideshow && closest(this.$el, ((slideshow.selList) + " > *"));
            }

        },

        events: [

            {

                name: 'itemshown',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler() {
                    css(this.$el, this.getCss(.5));
                }

            },

            {
                name: 'itemin itemout',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler(ref) {
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var duration = ref_detail.duration;
                    var ease = ref_detail.ease;
                    var dir = ref_detail.dir;


                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));

                    Transition.start(this.$el, this.getCss(isIn(type)
                        ? .5
                        : dir > 0
                            ? 1
                            : 0
                    ), duration, ease).catch(noop);

                }
            },

            {
                name: 'transitioncanceled transitionend',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler() {
                    Transition.cancel(this.$el);
                }

            },

            {
                name: 'itemtranslatein itemtranslateout',

                self: true,

                el: function el() {
                    return this.item;
                },

                handler: function handler(ref) {
                    var type = ref.type;
                    var ref_detail = ref.detail;
                    var percent = ref_detail.percent;
                    var dir = ref_detail.dir;

                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));
                }
            }

        ]

    });

    function isIn(type) {
        return endsWith(type, 'in');
    }

    function getCurrent(type, dir, percent) {

        percent /= 2;

        return !isIn(type)
            ? dir < 0
                ? percent
                : 1 - percent
            : dir < 0
                ? 1 - percent
                : percent;
    }

}

if (false) {
    window.UIkit.use(plugin$6);
}

function plugin$7(UIkit) {

    if (plugin$7.installed) {
        return;
    }

    var mixin = UIkit.mixin;
    var util = UIkit.util;
    var addClass = util.addClass;
    var after = util.after;
    var assign = util.assign;
    var append = util.append;
    var attr = util.attr;
    var before = util.before;
    var closest = util.closest;
    var css = util.css;
    var doc = util.doc;
    var docEl = util.docEl;
    var height = util.height;
    var fastdom = util.fastdom;
    var getPos = util.getPos;
    var includes = util.includes;
    var index = util.index;
    var isInput = util.isInput;
    var noop = util.noop;
    var offset = util.offset;
    var off = util.off;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerMove = util.pointerMove;
    var pointerUp = util.pointerUp;
    var position = util.position;
    var preventClick = util.preventClick;
    var Promise = util.Promise;
    var remove = util.remove;
    var removeClass = util.removeClass;
    var toggleClass = util.toggleClass;
    var toNodes = util.toNodes;
    var Transition = util.Transition;
    var trigger = util.trigger;
    var win = util.win;
    var within = util.within;

    UIkit.component('sortable', {

        mixins: [mixin.class],

        props: {
            group: String,
            animation: Number,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },

        defaults: {
            group: false,
            animation: 150,
            threshold: 5,
            clsItem: 'uk-sortable-item',
            clsPlaceholder: 'uk-sortable-placeholder',
            clsDrag: 'uk-sortable-drag',
            clsDragState: 'uk-drag',
            clsBase: 'uk-sortable',
            clsNoDrag: 'uk-sortable-nodrag',
            clsEmpty: 'uk-sortable-empty',
            clsCustom: '',
            handle: false
        },

        init: function init() {
            var this$1 = this;

            ['init', 'start', 'move', 'end'].forEach(function (key) {
                var fn = this$1[key];
                this$1[key] = function (e) {
                    this$1.scrollY = win.scrollY;
                    var ref = getPos(e);
                    var x = ref.x;
                    var y = ref.y;
                    this$1.pos = {x: x, y: y};

                    fn(e);
                };
            });
        },

        events: ( obj = {}, obj[pointerDown] = 'init', obj ),

        update: {

            write: function write() {

                if (this.clsEmpty) {
                    toggleClass(this.$el, this.clsEmpty, !this.$el.children.length);
                }

                if (!this.drag) {
                    return;
                }

                offset(this.drag, {top: this.pos.y + this.origin.top, left: this.pos.x + this.origin.left});

                var top = offset(this.drag).top,
                    bottom = top + this.drag.offsetHeight,
                    scroll;

                if (top > 0 && top < this.scrollY) {
                    scroll = this.scrollY - 5;
                } else if (bottom < height(doc) && bottom > height(win) + this.scrollY) {
                    scroll = this.scrollY + 5;
                }

                scroll && setTimeout(function () { return win.scrollTo(win.scrollX, scroll); }, 5);
            }

        },

        methods: {

            init: function init(e) {

                var target = e.target;
                var button = e.button;
                var defaultPrevented = e.defaultPrevented;
                var placeholder = toNodes(this.$el.children).filter(function (el) { return within(target, el); })[0];

                if (!placeholder
                    || isInput(e.target)
                    || this.handle && !within(target, this.handle)
                    || button !== 0
                    || within(target, ("." + (this.clsNoDrag)))
                    || defaultPrevented
                ) {
                    return;
                }

                e.preventDefault();

                this.touched = [this];
                this.placeholder = placeholder;
                this.origin = assign({target: target, index: index(placeholder)}, this.pos);

                on(docEl, pointerMove, this.move);
                on(docEl, pointerUp, this.end);
                on(win, 'scroll', this.scroll);

                if (!this.threshold) {
                    this.start(e);
                }

            },

            start: function start(e) {

                this.drag = append(UIkit.container, this.placeholder.outerHTML.replace(/^<li/i, '<div').replace(/li>$/i, 'div>'));

                css(this.drag, assign({
                    boxSizing: 'border-box',
                    width: this.placeholder.offsetWidth,
                    height: this.placeholder.offsetHeight
                }, css(this.placeholder, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])));
                attr(this.drag, 'uk-no-boot', '');
                addClass(this.drag, ((this.clsDrag) + " " + (this.clsCustom)));

                height(this.drag.firstElementChild, height(this.placeholder.firstElementChild));

                var ref = offset(this.placeholder);
                var left = ref.left;
                var top = ref.top;
                assign(this.origin, {left: left - this.pos.x, top: top - this.pos.y});

                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.$el.children, this.clsItem);
                addClass(docEl, this.clsDragState);

                trigger(this.$el, 'start', [this, this.placeholder, this.drag]);

                this.move(e);
            },

            move: function move(e) {

                if (!this.drag) {

                    if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                        this.start(e);
                    }

                    return;
                }

                this.$emit();

                var target = e.type === 'mousemove' ? e.target : doc.elementFromPoint(this.pos.x - doc.body.scrollLeft, this.pos.y - doc.body.scrollTop),
                    sortable = getSortable(target),
                    previous = getSortable(this.placeholder),
                    move = sortable !== previous;

                if (!sortable || within(target, this.placeholder) || move && (!sortable.group || sortable.group !== previous.group)) {
                    return;
                }

                target = sortable.$el === target.parentNode && target || toNodes(sortable.$el.children).filter(function (element) { return within(target, element); })[0];

                if (move) {
                    previous.remove(this.placeholder);
                } else if (!target) {
                    return;
                }

                sortable.insert(this.placeholder, target);

                if (!includes(this.touched, sortable)) {
                    this.touched.push(sortable);
                }

            },

            scroll: function scroll() {
                var scroll = win.scrollY;
                if (scroll !== this.scrollY) {
                    this.pos.y += scroll - this.scrollY;
                    this.scrollY = scroll;
                    this.$emit();
                }
            },

            end: function end(e) {

                off(docEl, pointerMove, this.move);
                off(docEl, pointerUp, this.end);
                off(win, 'scroll', this.scroll);

                if (!this.drag) {

                    if (e.type !== 'mouseup' && within(e.target, 'a[href]')) {
                        location.href = closest(e.target, 'a[href]').href;
                    }

                    return;
                }

                preventClick();

                var sortable = getSortable(this.placeholder);

                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, 'moved', [this, this.placeholder]);
                    }
                } else {
                    trigger(sortable.$el, 'added', [sortable, this.placeholder]);
                    trigger(this.$el, 'removed', [this, this.placeholder]);
                }

                trigger(this.$el, 'stop', [this]);

                remove(this.drag);
                this.drag = null;

                var classes = this.touched.map(function (sortable) { return ((sortable.clsPlaceholder) + " " + (sortable.clsItem)); }).join(' ');
                this.touched.forEach(function (sortable) { return removeClass(sortable.$el.children, classes); });

                removeClass(docEl, this.clsDragState);

            },

            insert: function insert(element, target) {
                var this$1 = this;


                addClass(this.$el.children, this.clsItem);

                var insert = function () {

                    if (target) {

                        if (!within(element, this$1.$el) || isPredecessor(element, target)) {
                            before(target, element);
                        } else {
                            after(target, element);
                        }

                    } else {
                        append(this$1.$el, element);
                    }

                };

                if (this.animation) {
                    this.animate(insert);
                } else {
                    insert();
                }

            },

            remove: function remove$1(element) {

                if (!within(element, this.$el)) {
                    return;
                }

                if (this.animation) {
                    this.animate(function () { return remove(element); });
                } else {
                    remove(element);
                }

            },

            animate: function animate(action) {
                var this$1 = this;


                var props = [],
                    children = toNodes(this.$el.children),
                    reset = {position: '', width: '', height: '', pointerEvents: '', top: '', left: '', bottom: '', right: ''};

                children.forEach(function (el) {
                    props.push(assign({
                        position: 'absolute',
                        pointerEvents: 'none',
                        width: el.offsetWidth,
                        height: el.offsetHeight
                    }, position(el)));
                });

                action();

                children.forEach(Transition.cancel);
                css(this.$el.children, reset);
                this.$update('update', true);
                fastdom.flush();

                css(this.$el, 'minHeight', height(this.$el));

                var positions = children.map(function (el) { return position(el); });
                Promise.all(children.map(function (el, i) { return Transition.start(css(el, props[i]), positions[i], this$1.animation); }))
                    .then(function () {
                        css(this$1.$el, 'minHeight', '');
                        css(children, reset);
                        this$1.$update('update', true);
                        fastdom.flush();
                    }, noop);

            }

        }

    });
    var obj;

    function getSortable(element) {
        return element && (UIkit.getComponent(element, 'sortable') || getSortable(element.parentNode));
    }

    function isPredecessor(element, target) {
        return element.parentNode === target.parentNode && index(element) > index(target);
    }

}

if (false) {
    window.UIkit.use(plugin$7);
}

function plugin$8(UIkit) {

    if (plugin$8.installed) {
        return;
    }

    var util = UIkit.util;
    var mixin = UIkit.mixin;
    var append = util.append;
    var attr = util.attr;
    var doc = util.doc;
    var fastdom = util.fastdom;
    var flipPosition = util.flipPosition;
    var includes = util.includes;
    var isTouch = util.isTouch;
    var isVisible = util.isVisible;
    var matches = util.matches;
    var on = util.on;
    var pointerDown = util.pointerDown;
    var pointerEnter = util.pointerEnter;
    var pointerLeave = util.pointerLeave;
    var remove = util.remove;
    var within = util.within;

    var actives = [];

    UIkit.component('tooltip', {

        attrs: true,

        mixins: [mixin.container, mixin.togglable, mixin.position],

        props: {
            delay: Number,
            title: String
        },

        defaults: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        connected: function connected() {
            var this$1 = this;

            fastdom.mutate(function () { return attr(this$1.$el, {title: null, 'aria-expanded': false}); });
        },

        disconnected: function disconnected() {
            this.hide();
        },

        methods: {

            show: function show() {
                var this$1 = this;


                if (includes(actives, this)) {
                    return;
                }

                actives.forEach(function (active) { return active.hide(); });
                actives.push(this);

                this._unbind = on(doc, 'click', function (e) { return !within(e.target, this$1.$el) && this$1.hide(); });

                clearTimeout(this.showTimer);

                this.tooltip = append(this.container, ("<div class=\"" + (this.clsPos) + "\" aria-hidden><div class=\"" + (this.clsPos) + "-inner\">" + (this.title) + "</div></div>"));

                attr(this.$el, 'aria-expanded', true);

                this.positionAt(this.tooltip, this.$el);

                this.origin = this.getAxis() === 'y' ? ((flipPosition(this.dir)) + "-" + (this.align)) : ((this.align) + "-" + (flipPosition(this.dir)));

                this.showTimer = setTimeout(function () {

                    this$1.toggleElement(this$1.tooltip, true);

                    this$1.hideTimer = setInterval(function () {

                        if (!isVisible(this$1.$el)) {
                            this$1.hide();
                        }

                    }, 150);

                }, this.delay);
            },

            hide: function hide() {

                var index = actives.indexOf(this);

                if (!~index || matches(this.$el, 'input') && this.$el === doc.activeElement) {
                    return;
                }

                actives.splice(index, 1);

                clearTimeout(this.showTimer);
                clearInterval(this.hideTimer);
                attr(this.$el, 'aria-expanded', false);
                this.toggleElement(this.tooltip, false);
                this.tooltip && remove(this.tooltip);
                this.tooltip = false;
                this._unbind();

            }

        },

        events: ( obj = {

            'blur': 'hide'

        }, obj[("focus " + pointerEnter + " " + pointerDown)] = function (e) {
                if (e.type !== pointerDown || !isTouch(e)) {
                    this.show();
                }
            }, obj[pointerLeave] = function (e) {
                if (!isTouch(e)) {
                    this.hide();
                }
            }, obj )

    });
    var obj;

}

if (false) {
    window.UIkit.use(plugin$8);
}

function plugin$9(UIkit) {

    if (plugin$9.installed) {
        return;
    }

    var ref = UIkit.util;
    var addClass = ref.addClass;
    var ajax = ref.ajax;
    var matches = ref.matches;
    var noop = ref.noop;
    var on = ref.on;
    var removeClass = ref.removeClass;
    var trigger = ref.trigger;

    UIkit.component('upload', {

        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },

        defaults: {
            allow: false,
            clsDragover: 'uk-dragover',
            concurrent: 1,
            mime: false,
            msgInvalidMime: 'Invalid File Type: %s',
            msgInvalidName: 'Invalid File Name: %s',
            multiple: false,
            name: 'files[]',
            params: {},
            type: 'POST',
            url: '',
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },

        events: {

            change: function change(e) {

                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }

                e.preventDefault();

                if (e.target.files) {
                    this.upload(e.target.files);
                }

                e.target.value = '';
            },

            drop: function drop(e) {
                stop(e);

                var transfer = e.dataTransfer;

                if (!transfer || !transfer.files) {
                    return;
                }

                removeClass(this.$el, this.clsDragover);

                this.upload(transfer.files);
            },

            dragenter: function dragenter(e) {
                stop(e);
            },

            dragover: function dragover(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },

            dragleave: function dragleave(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }

        },

        methods: {

            upload: function upload(files) {
                var this$1 = this;


                if (!files.length) {
                    return;
                }

                trigger(this.$el, 'upload', [files]);

                for (var i = 0; i < files.length; i++) {

                    if (this$1.allow) {
                        if (!match(this$1.allow, files[i].name)) {
                            this$1.fail(this$1.msgInvalidName.replace(/%s/, this$1.allow));
                            return;
                        }
                    }

                    if (this$1.mime) {
                        if (!match(this$1.mime, files[i].type)) {
                            this$1.fail(this$1.msgInvalidMime.replace(/%s/, this$1.mime));
                            return;
                        }
                    }

                }

                if (!this.multiple) {
                    files = [files[0]];
                }

                this.beforeAll(this, files);

                var chunks = chunk(files, this.concurrent),
                    upload = function (files) {

                        var data = new FormData();

                        files.forEach(function (file) { return data.append(this$1.name, file); });

                        for (var key in this$1.params) {
                            data.append(key, this$1.params[key]);
                        }

                        ajax(this$1.url, {
                            data: data,
                            method: this$1.type,
                            beforeSend: function (env) {

                                var xhr = env.xhr;
                                xhr.upload && on(xhr.upload, 'progress', this$1.progress);
                                ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) { return on(xhr, type.toLowerCase(), this$1[type]); }
                                );

                                this$1.beforeSend(env);

                            }
                        }).then(
                            function (xhr) {

                                this$1.complete(xhr);

                                if (chunks.length) {
                                    upload(chunks.shift());
                                } else {
                                    this$1.completeAll(xhr);
                                }

                            },
                            function (e) { return this$1.error(e.message); }
                        );

                    };

                upload(chunks.shift());

            }

        }

    });

    function match(pattern, path) {
        return path.match(new RegExp(("^" + (pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.')) + "$"), 'i'));
    }

    function chunk(files, size) {
        var chunks = [];
        for (var i = 0; i < files.length; i += size) {
            var chunk = [];
            for (var j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
        }
        return chunks;
    }

    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }

}

if (false) {
    window.UIkit.use(plugin$9);
}

UIkit$2.use(plugin);
UIkit$2.use(plugin$1);
UIkit$2.use(plugin$2);
UIkit$2.use(plugin$4);
UIkit$2.use(plugin$5);
UIkit$2.use(plugin$6);
UIkit$2.use(plugin$7);
UIkit$2.use(plugin$8);
UIkit$2.use(plugin$9);

{
    boot(UIkit$2);
}

return UIkit$2;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).setImmediate))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(12);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(4);
var Axios = __webpack_require__(16);
var defaults = __webpack_require__(2);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(8);
axios.CancelToken = __webpack_require__(30);
axios.isCancel = __webpack_require__(7);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(31);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(25);
var dispatchRequest = __webpack_require__(26);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(6);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(27);
var isCancel = __webpack_require__(7);
var defaults = __webpack_require__(2);
var isAbsoluteURL = __webpack_require__(28);
var combineURLs = __webpack_require__(29);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(8);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(UIkit) {

window.UIkit = __webpack_require__(9);
window.axios = __webpack_require__(13);
// const Icons = require('uikit/dist/js/uikit-icons')

// UIkit.use(Icons)

function el(element) {
  return document.querySelector(element);
}

(function () {
  'use strict';
  // Read Process

  var view = document.getElementsByClassName('view');

  var _loop = function _loop(_i) {
    view[_i].addEventListener('click', function () {
      // console.log(view[i].id)
      axios.post('/users/view', {
        id: view[_i].id
      }).then(function (res) {
        console.log(res);
        var data = res.data;
        el('.name').innerHTML = '<span>' + data.name + '</span>';
        el('.dob').innerHTML = data.dob;
        el('.gender').innerHTML = data.gender;
        el('.phone').innerHTML = data.phone;
        el('.email').innerHTML = data.email;
        UIkit.modal('#modal-full').show();
      });
    });
  };

  for (var _i = 0; _i < view.length; _i++) {
    _loop(_i);
  }
  // Update Modal Process
  var update = document.getElementsByClassName('update');

  var _loop2 = function _loop2(_i2) {
    update[_i2].addEventListener('click', function () {
      fetch('/edit/view', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          id: update[_i2].parentNode.id
        })
      }).then(function (res) {
        if (res.ok) return res.json();
      }).then(function (data) {
        el('._id').value = data._id;
        el('.name').value = data.name;
        el('.dob').value = data.dob;
        var gender = data.gender.toLowerCase();
        el('#' + gender).checked = true;
        el('.phone').value = data.phone;
        el('.email').value = data.email;
        el('.department').value = data.department;
        UIkit.modal('#modal-full').show();
      });
    });
  };

  for (var _i2 = 0; _i2 < update.length; _i2++) {
    _loop2(_i2);
  }
  // Update Record Process
  if (el('#save') !== null) {
    el('#save').addEventListener('click', function () {
      var _id = el('._id').value;
      var name = el('.name').value;
      var dob = el('.dob').value;
      var gender = void 0;
      if (el('#male').checked) {
        gender = 'Male';
      } else {
        gender = 'Female';
      }
      var phone = el('.phone').value;
      var email = el('.email').value;
      var department = el('.department').value;

      fetch('edit/save', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          '_id': _id,
          'name': name,
          'dob': dob,
          'gender': gender,
          'phone': phone,
          'email': email,
          'department': department
        })
      }).then(function (res) {
        if (res.ok) return res.json;
      }).then(function (data) {
        window.location.reload(true);
      });
    });
  }

  var remove = document.getElementsByClassName('delete');
  if (remove !== null) {
    // el('#delete').addEventListener('click', () => {
    //
    // })
    for (var i = 0; i < remove.length; i++) {
      UIkit.util.on(remove[i], 'click', function (e) {
        e.preventDefault();
        e.target.blur();
        console.log(e.target.parentNode.id);
        var name = e.target.parentNode.dataset.title;
        UIkit.modal.confirm('Do you wish to delete ' + name + '\'s profile').then(function () {
          fetch('edit/remove', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              _id: e.target.parentNode.id
            })
          }).then(function (res) {
            if (res.ok) return res.json();
          }).then(function (data) {
            console.log(data);
            window.location.reload(true);
          });
        }, function () {
          console.log('');
        });
      });
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjFjYWRmYjgxOGVkN2FmNjhiYzIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91aWtpdC9kaXN0L2pzL3Vpa2l0LmpzP2VhN2UiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Vpa2l0L2Rpc3QvanMvdWlraXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qYXZhc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOlsid2luZG93IiwiVUlraXQiLCJyZXF1aXJlIiwiYXhpb3MiLCJlbCIsImVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ2aWV3IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImkiLCJhZGRFdmVudExpc3RlbmVyIiwicG9zdCIsImlkIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJkYXRhIiwiaW5uZXJIVE1MIiwibmFtZSIsImRvYiIsImdlbmRlciIsInBob25lIiwiZW1haWwiLCJtb2RhbCIsInNob3ciLCJsZW5ndGgiLCJ1cGRhdGUiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcmVudE5vZGUiLCJvayIsImpzb24iLCJ2YWx1ZSIsIl9pZCIsInRvTG93ZXJDYXNlIiwiY2hlY2tlZCIsImRlcGFydG1lbnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInJlbW92ZSIsInV0aWwiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImJsdXIiLCJkYXRhc2V0IiwidGl0bGUiLCJjb25maXJtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOVNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7OytDQ3ZMdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDM0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OytDQ1ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7OztBQ25MQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7O0FDbEJBLHlHOzs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHFCQUFxQjs7QUFFdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsZ0JBQWdCOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0hBQXdIO0FBQ3hIO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtB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QUU7QUFDNUUsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVCwwQkFBMEI7O0FBRTFCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQW1DLHVFQUF1RTs7QUFFMUc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQSxrREFBa0QsMENBQTBDLEVBQUU7QUFDOUY7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsMkJBQTJCLEVBQUU7O0FBRWhIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLDBDQUEwQzs7QUFFaEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLCtDQUErQzs7QUFFcEY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUlBQW1JLGdDQUFnQyxFQUFFOztBQUVySztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxvRUFBb0UsK0RBQStELEVBQUU7QUFDckksMERBQTBELG9EQUFvRCxFQUFFOztBQUVoSDs7QUFFQSxhQUFhOztBQUViO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsd0JBQXdCLEVBQUU7QUFDeEUsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw0REFBNEQscUJBQXFCLEVBQUU7QUFDbkYsMkRBQTJELDRFQUE0RSxFQUFFO0FBQ3pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCOztBQUVBOztBQUVBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUEsd0NBQXdDLDBCQUEwQixvQ0FBb0MsRUFBRSxFQUFFO0FBQzFHLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCxzQkFBc0IsRUFBRTtBQUMzRTs7QUFFQSw4REFBOEQsdURBQXVELEVBQUU7O0FBRXZIOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7O0FBRXJCLGlCQUFpQjtBQUNqQixhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwrQkFBK0Isa0JBQWtCOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHVEQUF1RCx1Q0FBdUMsRUFBRTs7QUFFaEc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtR0FBbUcsa0RBQWtEO0FBQ3JKOztBQUVBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsMENBQTBDLGdDQUFnQztBQUMxRTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBLDJCQUEyQixVQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7OztBQ3R0VUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O0FDekxELHlDOzs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlEQUFpRCxnQkFBZ0I7QUFDakU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEOzs7Ozs7OztBQzlFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDWEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNuRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixlQUFlOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7OztBQ3BEQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNuRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNuQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QyxPQUFPOztBQUVQO0FBQ0EsMERBQTBELHdCQUF3QjtBQUNsRjtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyw2QkFBNkIsYUFBYSxFQUFFO0FBQzVDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDcERBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7OztBQ3JGQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsZUFBZTtBQUMxQixhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7OztBQ25CQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNiQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDeERBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUJBQSxPQUFPQyxLQUFQLEdBQWUsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0FGLE9BQU9HLEtBQVAsR0FBZSxtQkFBQUQsQ0FBUSxFQUFSLENBQWY7QUFDQTs7QUFFQTs7QUFFQSxTQUFTRSxFQUFULENBQWFDLE9BQWIsRUFBc0I7QUFDcEIsU0FBT0MsU0FBU0MsYUFBVCxDQUF1QkYsT0FBdkIsQ0FBUDtBQUNEOztBQUVELENBQUMsWUFBTTtBQUNMO0FBQ0E7O0FBQ0EsTUFBSUcsT0FBT0YsU0FBU0csc0JBQVQsQ0FBZ0MsTUFBaEMsQ0FBWDs7QUFISyw2QkFJSUMsRUFKSjtBQUtIRixTQUFLRSxFQUFMLEVBQVFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFlBQU07QUFDdEM7QUFDQVIsWUFBTVMsSUFBTixDQUFXLGFBQVgsRUFBMEI7QUFDeEJDLFlBQUlMLEtBQUtFLEVBQUwsRUFBUUc7QUFEWSxPQUExQixFQUVHQyxJQUZILENBRVEsZUFBTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0EsWUFBSUMsT0FBT0QsSUFBSUMsSUFBZjtBQUNBZCxXQUFHLE9BQUgsRUFBWWUsU0FBWixjQUFpQ0QsS0FBS0UsSUFBdEM7QUFDQWhCLFdBQUcsTUFBSCxFQUFXZSxTQUFYLEdBQXVCRCxLQUFLRyxHQUE1QjtBQUNBakIsV0FBRyxTQUFILEVBQWNlLFNBQWQsR0FBMEJELEtBQUtJLE1BQS9CO0FBQ0FsQixXQUFHLFFBQUgsRUFBYWUsU0FBYixHQUF5QkQsS0FBS0ssS0FBOUI7QUFDQW5CLFdBQUcsUUFBSCxFQUFhZSxTQUFiLEdBQXlCRCxLQUFLTSxLQUE5QjtBQUNBdkIsY0FBTXdCLEtBQU4sQ0FBWSxhQUFaLEVBQTJCQyxJQUEzQjtBQUNELE9BWEQ7QUFZRCxLQWREO0FBTEc7O0FBSUwsT0FBSyxJQUFJaEIsS0FBSSxDQUFiLEVBQWdCQSxLQUFJRixLQUFLbUIsTUFBekIsRUFBaUNqQixJQUFqQyxFQUFzQztBQUFBLFVBQTdCQSxFQUE2QjtBQWdCckM7QUFDRDtBQUNBLE1BQUlrQixTQUFTdEIsU0FBU0csc0JBQVQsQ0FBZ0MsUUFBaEMsQ0FBYjs7QUF0QkssK0JBdUJJQyxHQXZCSjtBQXdCSGtCLFdBQU9sQixHQUFQLEVBQVVDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQU07QUFDeENrQixZQUFNLFlBQU4sRUFBb0I7QUFDbEJDLGdCQUFRLE1BRFU7QUFFbEJDLGlCQUFTLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUZTO0FBR2xCQyxjQUFNQyxLQUFLQyxTQUFMLENBQWU7QUFDbkJyQixjQUFJZSxPQUFPbEIsR0FBUCxFQUFVeUIsVUFBVixDQUFxQnRCO0FBRE4sU0FBZjtBQUhZLE9BQXBCLEVBTUdDLElBTkgsQ0FNUSxlQUFPO0FBQ2IsWUFBSUcsSUFBSW1CLEVBQVIsRUFBWSxPQUFPbkIsSUFBSW9CLElBQUosRUFBUDtBQUNiLE9BUkQsRUFRR3ZCLElBUkgsQ0FRUSxnQkFBUTtBQUNkVixXQUFHLE1BQUgsRUFBV2tDLEtBQVgsR0FBbUJwQixLQUFLcUIsR0FBeEI7QUFDQW5DLFdBQUcsT0FBSCxFQUFZa0MsS0FBWixHQUFvQnBCLEtBQUtFLElBQXpCO0FBQ0FoQixXQUFHLE1BQUgsRUFBV2tDLEtBQVgsR0FBbUJwQixLQUFLRyxHQUF4QjtBQUNBLFlBQUlDLFNBQVNKLEtBQUtJLE1BQUwsQ0FBWWtCLFdBQVosRUFBYjtBQUNBcEMsaUJBQU9rQixNQUFQLEVBQWlCbUIsT0FBakIsR0FBMkIsSUFBM0I7QUFDQXJDLFdBQUcsUUFBSCxFQUFha0MsS0FBYixHQUFxQnBCLEtBQUtLLEtBQTFCO0FBQ0FuQixXQUFHLFFBQUgsRUFBYWtDLEtBQWIsR0FBcUJwQixLQUFLTSxLQUExQjtBQUNBcEIsV0FBRyxhQUFILEVBQWtCa0MsS0FBbEIsR0FBMEJwQixLQUFLd0IsVUFBL0I7QUFDQXpDLGNBQU13QixLQUFOLENBQVksYUFBWixFQUEyQkMsSUFBM0I7QUFDRCxPQWxCRDtBQW1CRCxLQXBCRDtBQXhCRzs7QUF1QkwsT0FBSyxJQUFJaEIsTUFBSSxDQUFiLEVBQWdCQSxNQUFJa0IsT0FBT0QsTUFBM0IsRUFBbUNqQixLQUFuQyxFQUF3QztBQUFBLFdBQS9CQSxHQUErQjtBQXNCdkM7QUFDRDtBQUNBLE1BQUlOLEdBQUcsT0FBSCxNQUFnQixJQUFwQixFQUEwQjtBQUN4QkEsT0FBRyxPQUFILEVBQVlPLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUMsVUFBSTRCLE1BQU1uQyxHQUFHLE1BQUgsRUFBV2tDLEtBQXJCO0FBQ0EsVUFBSWxCLE9BQU9oQixHQUFHLE9BQUgsRUFBWWtDLEtBQXZCO0FBQ0EsVUFBSWpCLE1BQU1qQixHQUFHLE1BQUgsRUFBV2tDLEtBQXJCO0FBQ0EsVUFBSWhCLGVBQUo7QUFDQSxVQUFJbEIsR0FBRyxPQUFILEVBQVlxQyxPQUFoQixFQUF5QjtBQUN2Qm5CLGlCQUFTLE1BQVQ7QUFDRCxPQUZELE1BRU87QUFDTEEsaUJBQVMsUUFBVDtBQUNEO0FBQ0QsVUFBSUMsUUFBUW5CLEdBQUcsUUFBSCxFQUFha0MsS0FBekI7QUFDQSxVQUFJZCxRQUFRcEIsR0FBRyxRQUFILEVBQWFrQyxLQUF6QjtBQUNBLFVBQUlJLGFBQWF0QyxHQUFHLGFBQUgsRUFBa0JrQyxLQUFuQzs7QUFFQVQsWUFBTSxXQUFOLEVBQW1CO0FBQ2pCQyxnQkFBUSxLQURTO0FBRWpCQyxpQkFBUyxFQUFDLGdCQUFnQixrQkFBakIsRUFGUTtBQUdqQkMsY0FBTUMsS0FBS0MsU0FBTCxDQUFlO0FBQ25CLGlCQUFPSyxHQURZO0FBRW5CLGtCQUFRbkIsSUFGVztBQUduQixpQkFBT0MsR0FIWTtBQUluQixvQkFBVUMsTUFKUztBQUtuQixtQkFBU0MsS0FMVTtBQU1uQixtQkFBU0MsS0FOVTtBQU9uQix3QkFBY2tCO0FBUEssU0FBZjtBQUhXLE9BQW5CLEVBWUc1QixJQVpILENBWVEsZUFBTztBQUNiLFlBQUlHLElBQUltQixFQUFSLEVBQVksT0FBT25CLElBQUlvQixJQUFYO0FBQ2IsT0FkRCxFQWNHdkIsSUFkSCxDQWNRLGdCQUFRO0FBQ2RkLGVBQU8yQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QixJQUF2QjtBQUNELE9BaEJEO0FBaUJELEtBL0JEO0FBZ0NEOztBQUVELE1BQUlDLFNBQVN2QyxTQUFTRyxzQkFBVCxDQUFnQyxRQUFoQyxDQUFiO0FBQ0EsTUFBSW9DLFdBQVcsSUFBZixFQUFxQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFLLElBQUluQyxJQUFJLENBQWIsRUFBZ0JBLElBQUltQyxPQUFPbEIsTUFBM0IsRUFBbUNqQixHQUFuQyxFQUF3QztBQUN0Q1QsWUFBTTZDLElBQU4sQ0FBV0MsRUFBWCxDQUFjRixPQUFPbkMsQ0FBUCxDQUFkLEVBQXlCLE9BQXpCLEVBQWtDLFVBQVVzQyxDQUFWLEVBQWE7QUFDN0NBLFVBQUVDLGNBQUY7QUFDQUQsVUFBRUUsTUFBRixDQUFTQyxJQUFUO0FBQ0FwQyxnQkFBUUMsR0FBUixDQUFZZ0MsRUFBRUUsTUFBRixDQUFTZixVQUFULENBQW9CdEIsRUFBaEM7QUFDQSxZQUFJTyxPQUFPNEIsRUFBRUUsTUFBRixDQUFTZixVQUFULENBQW9CaUIsT0FBcEIsQ0FBNEJDLEtBQXZDO0FBQ0FwRCxjQUFNd0IsS0FBTixDQUFZNkIsT0FBWiw0QkFBNkNsQyxJQUE3QyxrQkFBK0ROLElBQS9ELENBQW9FLFlBQU07QUFDeEVlLGdCQUFNLGFBQU4sRUFBcUI7QUFDbkJDLG9CQUFRLFFBRFc7QUFFbkJDLHFCQUFTLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUZVO0FBR25CQyxrQkFBTUMsS0FBS0MsU0FBTCxDQUFlO0FBQ25CSyxtQkFBS1MsRUFBRUUsTUFBRixDQUFTZixVQUFULENBQW9CdEI7QUFETixhQUFmO0FBSGEsV0FBckIsRUFNR0MsSUFOSCxDQU1RLGVBQU87QUFDYixnQkFBSUcsSUFBSW1CLEVBQVIsRUFBWSxPQUFPbkIsSUFBSW9CLElBQUosRUFBUDtBQUNiLFdBUkQsRUFRR3ZCLElBUkgsQ0FRUSxnQkFBUTtBQUNkQyxvQkFBUUMsR0FBUixDQUFZRSxJQUFaO0FBQ0FsQixtQkFBTzJDLFFBQVAsQ0FBZ0JDLE1BQWhCLENBQXVCLElBQXZCO0FBQ0QsV0FYRDtBQVlELFNBYkQsRUFhRyxZQUFZO0FBQ2I3QixrQkFBUUMsR0FBUixDQUFZLEVBQVo7QUFDRCxTQWZEO0FBZ0JELE9BckJEO0FBc0JEO0FBQ0Y7QUFDRixDQWhIRCxJIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMWNhZGZiODE4ZWQ3YWY2OGJjMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJVSWtpdFwiXSA9IHJlcXVpcmUoXCItIS4vdWlraXQuanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdWlraXQvZGlzdC9qcy91aWtpdC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIi8qISBVSWtpdCAzLjAuMC1iZXRhLjMzIHwgaHR0cDovL3d3dy5nZXR1aWtpdC5jb20gfCAoYykgMjAxNCAtIDIwMTcgWU9PdGhlbWUgfCBNSVQgTGljZW5zZSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgndWlraXQnLCBmYWN0b3J5KSA6XG5cdChnbG9iYWwuVUlraXQgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUHJvbWlzZXMvQSsgcG9seWZpbGwgdjEuMS40IChodHRwczovL2dpdGh1Yi5jb20vYnJhbXN0ZWluL3Byb21pcylcbiAqL1xuXG52YXIgUkVTT0xWRUQgPSAwO1xudmFyIFJFSkVDVEVEID0gMTtcbnZhciBQRU5ESU5HICA9IDI7XG5cbnZhciBhc3luYyA9ICdzZXRJbW1lZGlhdGUnIGluIHdpbmRvdyA/IHNldEltbWVkaWF0ZSA6IHNldFRpbWVvdXQ7XG5cbmZ1bmN0aW9uIFByb21pc2UkMShleGVjdXRvcikge1xuXG4gICAgdGhpcy5zdGF0ZSA9IFBFTkRJTkc7XG4gICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlZmVycmVkID0gW107XG5cbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG5cbiAgICB0cnkge1xuICAgICAgICBleGVjdXRvcihmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKHgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcHJvbWlzZS5yZWplY3Qocik7XG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XG4gICAgfVxufVxuXG5Qcm9taXNlJDEucmVqZWN0ID0gZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdChyKTtcbiAgICB9KTtcbn07XG5cblByb21pc2UkMS5yZXNvbHZlID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc29sdmUoeCk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlJDEuYWxsID0gZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY291bnQgPSAwLCByZXN1bHQgPSBbXTtcblxuICAgICAgICBpZiAoaXRlcmFibGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlcihpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSB4O1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIFByb21pc2UkMS5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmVyKGkpLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlJDEucmFjZSA9IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIFByb21pc2UkMS5yZXNvbHZlKGl0ZXJhYmxlW2ldKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciBwID0gUHJvbWlzZSQxLnByb3RvdHlwZTtcblxucC5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgICAgaWYgKHggPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB4ICYmIHgudGhlbjtcblxuICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgaXNPYmplY3QoeCkgJiYgaXNGdW5jdGlvbih0aGVuKSkge1xuICAgICAgICAgICAgICAgIHRoZW4uY2FsbCh4LCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3Qocik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVTT0xWRUQ7XG4gICAgICAgIHByb21pc2UudmFsdWUgPSB4O1xuICAgICAgICBwcm9taXNlLm5vdGlmeSgpO1xuICAgIH1cbn07XG5cbnAucmVqZWN0ID0gZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcblxuICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgICAgIGlmIChyZWFzb24gPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2Uuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgICAgICAgcHJvbWlzZS52YWx1ZSA9IHJlYXNvbjtcbiAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcbiAgICB9XG59O1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGFzeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMkMS5zdGF0ZSAhPT0gUEVORElORykge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMkMS5kZWZlcnJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSB0aGlzJDEuZGVmZXJyZWQuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICAgICAgb25SZXNvbHZlZCA9IGRlZmVycmVkWzBdLFxuICAgICAgICAgICAgICAgICAgICBvblJlamVjdGVkID0gZGVmZXJyZWRbMV0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUgPSBkZWZlcnJlZFsyXSxcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0ID0gZGVmZXJyZWRbM107XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnN0YXRlID09PSBSRVNPTFZFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ob25SZXNvbHZlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVzb2x2ZWQuY2FsbCh1bmRlZmluZWQsIHRoaXMkMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMkMS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcyQxLnN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ob25SZWplY3RlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVqZWN0ZWQuY2FsbCh1bmRlZmluZWQsIHRoaXMkMS52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcyQxLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxucC50aGVuID0gZnVuY3Rpb24gdGhlbihvblJlc29sdmVkLCBvblJlamVjdGVkKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXMkMS5kZWZlcnJlZC5wdXNoKFtvblJlc29sdmVkLCBvblJlamVjdGVkLCByZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgdGhpcyQxLm5vdGlmeSgpO1xuICAgIH0pO1xufTtcblxucC5jYXRjaCA9IGZ1bmN0aW9uIChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xufTtcblxuZnVuY3Rpb24gYmluZChmbiwgY29udGV4dCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiBsID8gbCA+IDEgPyBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpIDogZm4uY2FsbChjb250ZXh0LCBhKSA6IGZuLmNhbGwoY29udGV4dCk7XG4gICAgfTtcbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaGFzT3duKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xufVxuXG52YXIgUHJvbWlzZSA9ICdQcm9taXNlJyBpbiB3aW5kb3cgPyB3aW5kb3cuUHJvbWlzZSA6IFByb21pc2UkMTtcblxudmFyIGNsYXNzaWZ5UmUgPSAvKD86XnxbLV9cXC9dKShcXHcpL2c7XG5cbmZ1bmN0aW9uIGNsYXNzaWZ5KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShjbGFzc2lmeVJlLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnOyB9KTtcbn1cblxudmFyIGh5cGhlbmF0ZVJlID0gLyhbYS16XFxkXSkoW0EtWl0pL2c7XG5cbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKGh5cGhlbmF0ZVJlLCAnJDEtJDInKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxufVxuXG52YXIgY2FtZWxpemVSRSA9IC8tKFxcdykvZztcblxuZnVuY3Rpb24gY2FtZWxpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIHRvVXBwZXIpXG59XG5cbmZ1bmN0aW9uIHRvVXBwZXIoXywgYykge1xuICAgIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJydcbn1cblxuZnVuY3Rpb24gdWNmaXJzdChzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxlbmd0aCA/IHRvVXBwZXIobnVsbCwgc3RyLmNoYXJBdCgwKSkgKyBzdHIuc2xpY2UoMSkgOiAnJztcbn1cblxudmFyIHN0clByb3RvdHlwZSA9IFN0cmluZy5wcm90b3R5cGU7XG52YXIgc3RhcnRzV2l0aEZuID0gc3RyUHJvdG90eXBlLnN0YXJ0c1dpdGggfHwgZnVuY3Rpb24gKHNlYXJjaCkgeyByZXR1cm4gdGhpcy5sYXN0SW5kZXhPZihzZWFyY2gsIDApID09PSAwOyB9O1xuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgc2VhcmNoKSB7XG4gICAgcmV0dXJuIHN0YXJ0c1dpdGhGbi5jYWxsKHN0ciwgc2VhcmNoKTtcbn1cblxudmFyIGVuZHNXaXRoRm4gPSBzdHJQcm90b3R5cGUuZW5kc1dpdGggfHwgZnVuY3Rpb24gKHNlYXJjaCkgeyByZXR1cm4gdGhpcy5zdWJzdHIoLTEgKiBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoOyB9O1xuXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCkge1xuICAgIHJldHVybiBlbmRzV2l0aEZuLmNhbGwoc3RyLCBzZWFyY2gpO1xufVxuXG52YXIgaW5jbHVkZXNGbiA9IGZ1bmN0aW9uIChzZWFyY2gpIHsgcmV0dXJuIH50aGlzLmluZGV4T2Yoc2VhcmNoKTsgfTtcbnZhciBpbmNsdWRlc1N0ciA9IHN0clByb3RvdHlwZS5pbmNsdWRlcyB8fCBpbmNsdWRlc0ZuO1xudmFyIGluY2x1ZGVzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgfHwgaW5jbHVkZXNGbjtcblxuZnVuY3Rpb24gaW5jbHVkZXMob2JqLCBzZWFyY2gpIHtcbiAgICByZXR1cm4gb2JqICYmIChpc1N0cmluZyhvYmopID8gaW5jbHVkZXNTdHIgOiBpbmNsdWRlc0FycmF5KS5jYWxsKG9iaiwgc2VhcmNoKTtcbn1cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG5mdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiBvYmogPT09IG9iai53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRG9jdW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgb2JqLm5vZGVUeXBlID09PSA5O1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyh2YWx1ZSkge1xuICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgfHwgaXNTdHJpbmcodmFsdWUpICYmICFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZvaWQgMDtcbn1cblxuZnVuY3Rpb24gdG9Cb29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQm9vbGVhbih2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6IHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICcxJyB8fCB2YWx1ZSA9PT0gJydcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiB2YWx1ZSA9PT0gJ2ZhbHNlJyB8fCB2YWx1ZSA9PT0gJzAnXG4gICAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICAgIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gICAgdmFyIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XG4gICAgcmV0dXJuICFpc05hTihudW1iZXIpID8gbnVtYmVyIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcbn1cblxuZnVuY3Rpb24gdG9MaXN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiBpc1N0cmluZyh2YWx1ZSlcbiAgICAgICAgICAgID8gdmFsdWUuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBpc051bWVyaWModmFsdWUpXG4gICAgICAgICAgICAgICAgPyB0b051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICA6IHRvQm9vbGVhbih2YWx1ZS50cmltKCkpOyB9KVxuICAgICAgICAgICAgOiBbdmFsdWVdO1xufVxuXG52YXIgdmFycyA9IHt9O1xuXG5mdW5jdGlvbiB0b01lZGlhKHZhbHVlKSB7XG5cbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZVswXSA9PT0gJ0AnKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFwibWVkaWEtXCIgKyAodmFsdWUuc3Vic3RyKDEpKTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFyc1tuYW1lXSB8fCAodmFyc1tuYW1lXSA9IHRvRmxvYXQoZ2V0Q3NzVmFyKG5hbWUpKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgJiYgIWlzTmFOKHZhbHVlKSA/IChcIihtaW4td2lkdGg6IFwiICsgdmFsdWUgKyBcInB4KVwiKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjb2VyY2UodHlwZSwgdmFsdWUsIGNvbnRleHQpIHtcblxuICAgIGlmICh0eXBlID09PSBCb29sZWFuKSB7XG4gICAgICAgIHJldHVybiB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0b051bWJlcih2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAncXVlcnknKSB7XG4gICAgICAgIHJldHVybiBxdWVyeSh2YWx1ZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgcmV0dXJuIHRvTGlzdCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgIHJldHVybiB0b01lZGlhKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZSA/IHR5cGUodmFsdWUpIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHRvTXModGltZSkge1xuICAgIHJldHVybiAhdGltZVxuICAgICAgICA/IDBcbiAgICAgICAgOiBlbmRzV2l0aCh0aW1lLCAnbXMnKVxuICAgICAgICAgICAgPyB0b0Zsb2F0KHRpbWUpXG4gICAgICAgICAgICA6IHRvRmxvYXQodGltZSkgKiAxMDAwO1xufVxuXG5mdW5jdGlvbiBzd2FwKHZhbHVlLCBhLCBiKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cCgoYSArIFwifFwiICsgYiksICdtZycpLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoID09PSBhID8gYiA6IGFcbiAgICB9KTtcbn1cblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIHRhcmdldCA9IE9iamVjdCh0YXJnZXQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJnc1tpXTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNPd24oc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59O1xuXG5mdW5jdGlvbiBlYWNoKG9iaiwgY2IpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChjYi5jYWxsKG9ialtrZXldLCBvYmpba2V5XSwga2V5KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGFtcChudW1iZXIsIG1pbiwgbWF4KSB7XG4gICAgaWYgKCBtaW4gPT09IHZvaWQgMCApIG1pbiA9IDA7XG4gICAgaWYgKCBtYXggPT09IHZvaWQgMCApIG1heCA9IDE7XG5cbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobnVtYmVyLCBtaW4pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gaW50ZXJzZWN0UmVjdChyMSwgcjIpIHtcbiAgICByZXR1cm4gcjEubGVmdCA8PSByMi5yaWdodCAmJlxuICAgICAgICByMi5sZWZ0IDw9IHIxLnJpZ2h0ICYmXG4gICAgICAgIHIxLnRvcCA8PSByMi5ib3R0b20gJiZcbiAgICAgICAgcjIudG9wIDw9IHIxLmJvdHRvbTtcbn1cblxuZnVuY3Rpb24gcG9pbnRJblJlY3QocG9pbnQsIHJlY3QpIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0UmVjdCh7dG9wOiBwb2ludC55LCBib3R0b206IHBvaW50LnksIGxlZnQ6IHBvaW50LngsIHJpZ2h0OiBwb2ludC54fSwgcmVjdClcbn1cblxuZnVuY3Rpb24gYWpheCh1cmwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBlbnYgPSBhc3NpZ24oe1xuICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIHhocjogbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBub29wLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnJ1xuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgeGhyID0gZW52LnhocjtcblxuICAgICAgICBlbnYuYmVmb3JlU2VuZChlbnYpO1xuXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gZW52KSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAgICAgICAgIHhocltwcm9wXSA9IGVudltwcm9wXTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB4aHIub3BlbihlbnYubWV0aG9kLnRvVXBwZXJDYXNlKCksIHVybCk7XG5cbiAgICAgICAgZm9yICh2YXIgaGVhZGVyIGluIGVudi5oZWFkZXJzKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGVudi5oZWFkZXJzW2hlYWRlcl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb24oeGhyLCAnbG9hZCcsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDAgfHwgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCB8fCB4aHIuc3RhdHVzID09PSAzMDQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHhocik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChhc3NpZ24oRXJyb3IoeGhyLnN0YXR1c1RleHQpLCB7XG4gICAgICAgICAgICAgICAgICAgIHhocjogeGhyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXNcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb24oeGhyLCAnZXJyb3InLCBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoYXNzaWduKEVycm9yKCdOZXR3b3JrIEVycm9yJyksIHt4aHI6IHhocn0pKTsgfSk7XG4gICAgICAgIG9uKHhociwgJ3RpbWVvdXQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoYXNzaWduKEVycm9yKCdOZXR3b3JrIFRpbWVvdXQnKSwge3hocjogeGhyfSkpOyB9KTtcblxuICAgICAgICB4aHIuc2VuZChlbnYuZGF0YSk7XG4gICAgfSk7XG59XG5cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5mdW5jdGlvbiAkJDEoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IHRvTm9kZShzZWxlY3RvcilcbiAgICAgICAgOiBpc0h0bWwoc2VsZWN0b3IpXG4gICAgICAgICAgICA/IHRvTm9kZShmcmFnbWVudChzZWxlY3RvcikpXG4gICAgICAgICAgICA6IGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiAkJChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiAhaXNTdHJpbmcoc2VsZWN0b3IpXG4gICAgICAgID8gdG9Ob2RlcyhzZWxlY3RvcilcbiAgICAgICAgOiBpc0h0bWwoc2VsZWN0b3IpXG4gICAgICAgICAgICA/IHRvTm9kZXMoZnJhZ21lbnQoc2VsZWN0b3IpKVxuICAgICAgICAgICAgOiBmaW5kQWxsKHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gaXNIdG1sKHN0cikge1xuICAgIHJldHVybiBzdHJbMF0gPT09ICc8JyB8fCBzdHIubWF0Y2goL15cXHMqPC8pO1xufVxuXG5mdW5jdGlvbiBxdWVyeShzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiAkJDEoc2VsZWN0b3IsIGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSA/IGNvbnRleHQgOiBkb2MpO1xufVxuXG5mdW5jdGlvbiBxdWVyeUFsbChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiAkJChzZWxlY3RvciwgaXNDb250ZXh0U2VsZWN0b3Ioc2VsZWN0b3IpID8gY29udGV4dCA6IGRvYyk7XG59XG5cbmZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdG9Ob2RlKF9xdWVyeShzZWxlY3RvciwgY29udGV4dCwgJ3F1ZXJ5U2VsZWN0b3InKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGwoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdG9Ob2RlcyhfcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQsICdxdWVyeVNlbGVjdG9yQWxsJykpO1xufVxuXG5mdW5jdGlvbiBfcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQsIHF1ZXJ5Rm4pIHtcbiAgICBpZiAoIGNvbnRleHQgPT09IHZvaWQgMCApIGNvbnRleHQgPSBkb2M7XG5cblxuICAgIGlmICghc2VsZWN0b3IgfHwgIWlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnJlcGxhY2UoY29udGV4dFNhbml0aXplUmUsICckMSAqJyk7XG5cbiAgICB2YXIgcmVtb3ZlcztcblxuICAgIGlmIChpc0NvbnRleHRTZWxlY3RvcihzZWxlY3RvcikpIHtcblxuICAgICAgICByZW1vdmVzID0gW107XG5cbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAoc2VsZWN0b3IsIGkpIHtcblxuICAgICAgICAgICAgdmFyIGN0eCA9IGNvbnRleHQ7XG5cbiAgICAgICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IudHJpbSgpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3JbMF0gPT09ICchJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IHNlbGVjdG9yLnN1YnN0cigxKS50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBjdHggPSBjbG9zZXN0KGNvbnRleHQucGFyZW50Tm9kZSwgc2VsZWN0b3JzWzBdKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9ycy5zbGljZSgxKS5qb2luKCcgJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjdHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjdHguaWQpIHtcbiAgICAgICAgICAgICAgICBjdHguaWQgPSBcInVrLVwiICsgKERhdGUubm93KCkpICsgaTtcbiAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2goZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlQXR0cihjdHgsICdpZCcpOyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcIiNcIiArIChjdHguaWQpICsgXCIgXCIgKyBzZWxlY3Rvcik7XG5cbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKTtcblxuICAgICAgICBjb250ZXh0ID0gZG9jO1xuXG4gICAgfVxuXG4gICAgdHJ5IHtcblxuICAgICAgICByZXR1cm4gY29udGV4dFtxdWVyeUZuXShzZWxlY3Rvcik7XG5cbiAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9IGZpbmFsbHkge1xuXG4gICAgICAgIHJlbW92ZXMgJiYgcmVtb3Zlcy5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmUpIHsgcmV0dXJuIHJlbW92ZSgpOyB9KTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBmaWx0ZXIoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gJCQoZWxlbWVudCkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKTsgfSk7XG59XG5cbmZ1bmN0aW9uIHdpdGhpbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiAhaXNTdHJpbmcoc2VsZWN0b3IpXG4gICAgICAgID8gZWxlbWVudCA9PT0gc2VsZWN0b3IgfHwgdG9Ob2RlKHNlbGVjdG9yKS5jb250YWlucyh0b05vZGUoZWxlbWVudCkpXG4gICAgICAgIDogbWF0Y2hlcyhlbGVtZW50LCBzZWxlY3RvcikgfHwgY2xvc2VzdChlbGVtZW50LCBzZWxlY3Rvcik7XG59XG5cbnZhciBjb250ZXh0U2VsZWN0b3JSZSA9IC8oXnwsKVxccypbIT4rfl0vO1xudmFyIGNvbnRleHRTYW5pdGl6ZVJlID0gLyhbIT4rfl0pKD89XFxzK1shPit+XXxcXHMqJCkvZztcblxuZnVuY3Rpb24gaXNDb250ZXh0U2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gaXNTdHJpbmcoc2VsZWN0b3IpICYmIHNlbGVjdG9yLm1hdGNoKGNvbnRleHRTZWxlY3RvclJlKTtcbn1cblxudmFyIGVsUHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcbnZhciBtYXRjaGVzRm4gPSBlbFByb3RvLm1hdGNoZXMgfHwgZWxQcm90by5tc01hdGNoZXNTZWxlY3RvcjtcblxuZnVuY3Rpb24gbWF0Y2hlcyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG1hdGNoZXNGbi5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTsgfSk7XG59XG5cbnZhciBjbG9zZXN0Rm4gPSBlbFByb3RvLmNsb3Nlc3QgfHwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgdmFyIGFuY2VzdG9yID0gdGhpcztcblxuICAgIGlmICghZG9jRWwuY29udGFpbnModGhpcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRvIHtcblxuICAgICAgICBpZiAobWF0Y2hlcyhhbmNlc3Rvciwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5jZXN0b3I7XG4gICAgICAgIH1cblxuICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudE5vZGU7XG5cbiAgICB9IHdoaWxlIChhbmNlc3RvciAmJiBhbmNlc3Rvci5ub2RlVHlwZSA9PT0gMSk7XG59O1xuXG5mdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG5cbiAgICBpZiAoc3RhcnRzV2l0aChzZWxlY3RvciwgJz4nKSkge1xuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiBpc05vZGUoZWxlbWVudCkgPyBjbG9zZXN0Rm4uY2FsbChlbGVtZW50LCBzZWxlY3RvcikgOiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gY2xvc2VzdEZuLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpOyB9KTtcbn1cblxuZnVuY3Rpb24gcGFyZW50cyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHZhciBlbGVtZW50cyA9IFtdLCBwYXJlbnQgPSB0b05vZGUoZWxlbWVudCkucGFyZW50Tm9kZTtcblxuICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlID09PSAxKSB7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMocGFyZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gaXNKUXVlcnkob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgISFvYmouanF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBpc05vZGUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgTm9kZSB8fCBpc09iamVjdChlbGVtZW50KSAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc05vZGVDb2xsZWN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQ29sbGVjdGlvbjtcbn1cblxuZnVuY3Rpb24gdG9Ob2RlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNOb2RlKGVsZW1lbnQpIHx8IGlzV2luZG93KGVsZW1lbnQpIHx8IGlzRG9jdW1lbnQoZWxlbWVudClcbiAgICAgICAgPyBlbGVtZW50XG4gICAgICAgIDogaXNOb2RlQ29sbGVjdGlvbihlbGVtZW50KSB8fCBpc0pRdWVyeShlbGVtZW50KVxuICAgICAgICAgICAgPyBlbGVtZW50WzBdXG4gICAgICAgICAgICA6IGlzQXJyYXkoZWxlbWVudClcbiAgICAgICAgICAgICAgICA/IHRvTm9kZShlbGVtZW50WzBdKVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gdG9Ob2RlcyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzTm9kZShlbGVtZW50KVxuICAgICAgICA/IFtlbGVtZW50XVxuICAgICAgICA6IGlzTm9kZUNvbGxlY3Rpb24oZWxlbWVudClcbiAgICAgICAgICAgID8gYXJyYXlQcm90by5zbGljZS5jYWxsKGVsZW1lbnQpXG4gICAgICAgICAgICA6IGlzQXJyYXkoZWxlbWVudClcbiAgICAgICAgICAgICAgICA/IGVsZW1lbnQubWFwKHRvTm9kZSkuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgOiBpc0pRdWVyeShlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICA/IGVsZW1lbnQudG9BcnJheSgpXG4gICAgICAgICAgICAgICAgICAgIDogW107XG59XG5cbmZ1bmN0aW9uIGF0dHIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcblxuICAgIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICAgICAgYXR0cihlbGVtZW50LCBrZXksIG5hbWVba2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG9Ob2RlcyhlbGVtZW50KS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChlbGVtZW50LCBhdHRyKGVsZW1lbnQsIG5hbWUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQXR0cihlbGVtZW50LCBuYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaGFzQXR0cihlbGVtZW50LCBuYW1lKSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7IH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBdHRyKGVsZW1lbnQsIG5hbWUpIHtcbiAgICBlbGVtZW50ID0gdG9Ob2RlcyhlbGVtZW50KTtcbiAgICBuYW1lLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxuICAgICAgICApOyB9XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyQXR0cihlbGVtZW50LCBhdHRyaWJ1dGUsIHBhdHRlcm4sIHJlcGxhY2VtZW50KSB7XG4gICAgYXR0cihlbGVtZW50LCBhdHRyaWJ1dGUsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgPyB2YWx1ZS5yZXBsYWNlKHBhdHRlcm4sIHJlcGxhY2VtZW50KSA6IHZhbHVlOyB9KTtcbn1cblxuZnVuY3Rpb24gZGF0YShlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXR0cnMgPSBbYXR0cmlidXRlLCAoXCJkYXRhLVwiICsgYXR0cmlidXRlKV07IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGFzQXR0cihlbGVtZW50LCBhdHRyc1tpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRyKGVsZW1lbnQsIGF0dHJzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHdpbiA9IHdpbmRvdztcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbnZhciBpc1J0bCA9IGF0dHIoZG9jRWwsICdkaXInKSA9PT0gJ3J0bCc7XG5cbmZ1bmN0aW9uIGlzUmVhZHkoKSB7XG4gICAgcmV0dXJuIGRvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IGRvYy5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycgJiYgIWRvY0VsLmRvU2Nyb2xsO1xufVxuXG5mdW5jdGlvbiByZWFkeShmbikge1xuXG4gICAgaWYgKGlzUmVhZHkoKSkge1xuICAgICAgICBmbigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVuYmluZDEoKTtcbiAgICAgICAgICAgIHVuYmluZDIoKTtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuYmluZDEgPSBvbihkb2MsICdET01Db250ZW50TG9hZGVkJywgaGFuZGxlKSxcbiAgICAgICAgdW5iaW5kMiA9IG9uKHdpbiwgJ2xvYWQnLCBoYW5kbGUpO1xufVxuXG52YXIgdHJhbnNpdGlvbmNhbmNlbCA9ICd0cmFuc2l0aW9uY2FuY2VsZWQnO1xuXG5mdW5jdGlvbiB0cmFuc2l0aW9uKGVsZW1lbnQsIHByb3BzLCBkdXJhdGlvbiwgdHJhbnNpdGlvbikge1xuICAgIGlmICggZHVyYXRpb24gPT09IHZvaWQgMCApIGR1cmF0aW9uID0gNDAwO1xuICAgIGlmICggdHJhbnNpdGlvbiA9PT0gdm9pZCAwICkgdHJhbnNpdGlvbiA9ICdsaW5lYXInO1xuXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNzcyhlbGVtZW50LCBuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhlbGVtZW50LCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyaWdnZXIoZWxlbWVudCwgdHJhbnNpdGlvbmVuZCk7IH0sIGR1cmF0aW9uKTtcblxuICAgICAgICAgICAgb25jZShlbGVtZW50LCAodHJhbnNpdGlvbmVuZCArIFwiIFwiICsgdHJhbnNpdGlvbmNhbmNlbCksIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlbGVtZW50LCAndWstdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgICAgIGNzcyhlbGVtZW50LCAndHJhbnNpdGlvbicsICcnKTtcbiAgICAgICAgICAgICAgICB0eXBlID09PSB0cmFuc2l0aW9uY2FuY2VsID8gcmVqZWN0KCkgOiByZXNvbHZlKCk7XG4gICAgICAgICAgICB9LCBmYWxzZSwgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IHRhcmdldDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCAndWstdHJhbnNpdGlvbicpO1xuICAgICAgICAgICAgY3NzKGVsZW1lbnQsIGFzc2lnbih7dHJhbnNpdGlvbjogKFwiYWxsIFwiICsgZHVyYXRpb24gKyBcIm1zIFwiICsgdHJhbnNpdGlvbil9LCBwcm9wcykpO1xuXG4gICAgICAgIH0pOyB9XG4gICAgKSk7XG5cbn1cblxudmFyIFRyYW5zaXRpb24gPSB7XG5cbiAgICBzdGFydDogdHJhbnNpdGlvbixcblxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoZWxlbWVudCkge1xuICAgICAgICB0cmlnZ2VyKGVsZW1lbnQsIHRyYW5zaXRpb25lbmQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKGVsZW1lbnQpIHtcbiAgICAgICAgdHJpZ2dlcihlbGVtZW50LCB0cmFuc2l0aW9uY2FuY2VsKTtcbiAgICB9LFxuXG4gICAgaW5Qcm9ncmVzczogZnVuY3Rpb24gaW5Qcm9ncmVzcyhlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBoYXNDbGFzcyhlbGVtZW50LCAndWstdHJhbnNpdGlvbicpO1xuICAgIH1cblxufTtcblxudmFyIGFuaW1hdGlvbmNhbmNlbCA9ICdhbmltYXRpb25jYW5jZWwnO1xudmFyIGFuaW1hdGlvblByZWZpeCA9ICd1ay1hbmltYXRpb24tJztcbnZhciBjbHNDYW5jZWxBbmltYXRpb24gPSAndWstY2FuY2VsLWFuaW1hdGlvbic7XG5cbmZ1bmN0aW9uIGFuaW1hdGUoZWxlbWVudCwgYW5pbWF0aW9uLCBkdXJhdGlvbiwgb3JpZ2luLCBvdXQpIHtcbiAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG4gICAgaWYgKCBkdXJhdGlvbiA9PT0gdm9pZCAwICkgZHVyYXRpb24gPSAyMDA7XG5cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3MoZWxlbWVudCwgY2xzQ2FuY2VsQW5pbWF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFuaW1hdGUuYXBwbHkobnVsbCwgYXJndW1lbnRzJDEpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTsgfVxuICAgICAgICAgICAgICAgICAgICApOyB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjbHMgPSBhbmltYXRpb24gKyBcIiBcIiArIGFuaW1hdGlvblByZWZpeCArIChvdXQgPyAnbGVhdmUnIDogJ2VudGVyJyk7XG5cbiAgICAgICAgICAgIGlmIChzdGFydHNXaXRoKGFuaW1hdGlvbiwgYW5pbWF0aW9uUHJlZml4KSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbikge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gXCIgXCIgKyBhbmltYXRpb25QcmVmaXggKyBvcmlnaW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbHMgKz0gXCIgXCIgKyBhbmltYXRpb25QcmVmaXggKyBcInJldmVyc2VcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzZXQoKTtcblxuICAgICAgICAgICAgb25jZShlbGVtZW50LCAoKGFuaW1hdGlvbmVuZCB8fCAnYW5pbWF0aW9uZW5kJykgKyBcIiBcIiArIGFuaW1hdGlvbmNhbmNlbCksIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaGFzUmVzZXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBhbmltYXRpb25jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1Jlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzUmVzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsc0NhbmNlbEFuaW1hdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbHNDYW5jZWxBbmltYXRpb24pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LCBmYWxzZSwgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IHRhcmdldDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjc3MoZWxlbWVudCwgJ2FuaW1hdGlvbkR1cmF0aW9uJywgKGR1cmF0aW9uICsgXCJtc1wiKSk7XG4gICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbHMpO1xuXG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbmVuZCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiBBbmltYXRpb24uY2FuY2VsKGVsZW1lbnQpOyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgY3NzKGVsZW1lbnQsICdhbmltYXRpb25EdXJhdGlvbicsICcnKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc2VzKGVsZW1lbnQsIChhbmltYXRpb25QcmVmaXggKyBcIlxcXFxTKlwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7IH1cbiAgICApKTtcblxufVxuXG52YXIgaW5Qcm9ncmVzcyA9IG5ldyBSZWdFeHAoKGFuaW1hdGlvblByZWZpeCArIFwiKGVudGVyfGxlYXZlKVwiKSk7XG52YXIgQW5pbWF0aW9uID0ge1xuXG4gICAgaW46IGZ1bmN0aW9uIGluJDEoZWxlbWVudCwgYW5pbWF0aW9uLCBkdXJhdGlvbiwgb3JpZ2luKSB7XG4gICAgICAgIHJldHVybiBhbmltYXRlKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbiwgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBvdXQ6IGZ1bmN0aW9uIG91dChlbGVtZW50LCBhbmltYXRpb24sIGR1cmF0aW9uLCBvcmlnaW4pIHtcbiAgICAgICAgcmV0dXJuIGFuaW1hdGUoZWxlbWVudCwgYW5pbWF0aW9uLCBkdXJhdGlvbiwgb3JpZ2luLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgaW5Qcm9ncmVzczogZnVuY3Rpb24gaW5Qcm9ncmVzcyQxKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGluUHJvZ3Jlc3MudGVzdChhdHRyKGVsZW1lbnQsICdjbGFzcycpKTtcbiAgICB9LFxuXG4gICAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoZWxlbWVudCkge1xuICAgICAgICB0cmlnZ2VyKGVsZW1lbnQsIGFuaW1hdGlvbmNhbmNlbCk7XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBpc0luVmlldyhlbGVtZW50LCB0b3AsIGxlZnQpIHtcbiAgICBpZiAoIHRvcCA9PT0gdm9pZCAwICkgdG9wID0gMDtcbiAgICBpZiAoIGxlZnQgPT09IHZvaWQgMCApIGxlZnQgPSAwO1xuXG4gICAgcmV0dXJuIGludGVyc2VjdFJlY3QodG9Ob2RlKGVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB7XG4gICAgICAgIHRvcDogdG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICBib3R0b206IHRvcCArIGhlaWdodCh3aW4pLFxuICAgICAgICByaWdodDogbGVmdCArIHdpZHRoKHdpbilcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2Nyb2xsZWRPdmVyKGVsZW1lbnQpIHtcblxuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICB2YXIgZWxIZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgdG9wID0gcG9zaXRpb25Ub3AoZWxlbWVudCksXG4gICAgICAgIHZwID0gaGVpZ2h0KHdpbiksXG4gICAgICAgIHZoID0gdnAgKyBNYXRoLm1pbigwLCB0b3AgLSB2cCksXG4gICAgICAgIGRpZmYgPSBNYXRoLm1heCgwLCB2cCAtIChoZWlnaHQoZG9jKSAtICh0b3AgKyBlbEhlaWdodCkpKTtcblxuICAgIHJldHVybiBjbGFtcCgoKHZoICsgd2luLnBhZ2VZT2Zmc2V0IC0gdG9wKSAvICgodmggKyAoZWxIZWlnaHQgLSAoZGlmZiA8IHZwID8gZGlmZiA6IDApKSApIC8gMTAwKSkgLyAxMDApO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblRvcChlbGVtZW50KSB7XG4gICAgdmFyIHRvcCA9IDA7XG5cbiAgICBkbyB7XG5cbiAgICAgICAgdG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xuXG4gICAgfSB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcblxuICAgIHJldHVybiB0b3A7XG59XG5cbmZ1bmN0aW9uIGdldEluZGV4KGksIGVsZW1lbnRzLCBjdXJyZW50KSB7XG4gICAgaWYgKCBjdXJyZW50ID09PSB2b2lkIDAgKSBjdXJyZW50ID0gMDtcblxuXG4gICAgZWxlbWVudHMgPSB0b05vZGVzKGVsZW1lbnRzKTtcblxuICAgIHZhciBsZW5ndGggPSBlbGVtZW50cy5sZW5ndGg7XG5cbiAgICBpID0gKGlzTnVtZXJpYyhpKVxuICAgICAgICAgICAgPyB0b051bWJlcihpKVxuICAgICAgICAgICAgOiBpID09PSAnbmV4dCdcbiAgICAgICAgICAgICAgICA/IGN1cnJlbnQgKyAxXG4gICAgICAgICAgICAgICAgOiBpID09PSAncHJldmlvdXMnXG4gICAgICAgICAgICAgICAgICAgID8gY3VycmVudCAtIDFcbiAgICAgICAgICAgICAgICAgICAgOiBpbmRleChlbGVtZW50cywgaSlcbiAgICApICUgbGVuZ3RoO1xuXG4gICAgcmV0dXJuIGkgPCAwID8gaSArIGxlbmd0aCA6IGk7XG59XG5cbnZhciB2b2lkRWxlbWVudHMgPSB7XG4gICAgYXJlYTogdHJ1ZSxcbiAgICBiYXNlOiB0cnVlLFxuICAgIGJyOiB0cnVlLFxuICAgIGNvbDogdHJ1ZSxcbiAgICBlbWJlZDogdHJ1ZSxcbiAgICBocjogdHJ1ZSxcbiAgICBpbWc6IHRydWUsXG4gICAgaW5wdXQ6IHRydWUsXG4gICAga2V5Z2VuOiB0cnVlLFxuICAgIGxpbms6IHRydWUsXG4gICAgbWVudWl0ZW06IHRydWUsXG4gICAgbWV0YTogdHJ1ZSxcbiAgICBwYXJhbTogdHJ1ZSxcbiAgICBzb3VyY2U6IHRydWUsXG4gICAgdHJhY2s6IHRydWUsXG4gICAgd2JyOiB0cnVlXG59O1xuZnVuY3Rpb24gaXNWb2lkRWxlbWVudChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHZvaWRFbGVtZW50c1t0b05vZGUoZWxlbWVudCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpXTtcbn1cblxudmFyIERpbWVuc2lvbnMgPSB7XG5cbiAgICByYXRpbzogZnVuY3Rpb24gcmF0aW8oZGltZW5zaW9ucywgcHJvcCwgdmFsdWUpIHtcblxuICAgICAgICB2YXIgYVByb3AgPSBwcm9wID09PSAnd2lkdGgnID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgICAgIHJldHVybiAoIG9iaiA9IHt9LCBvYmpbYVByb3BdID0gTWF0aC5yb3VuZCh2YWx1ZSAqIGRpbWVuc2lvbnNbYVByb3BdIC8gZGltZW5zaW9uc1twcm9wXSksIG9ialtwcm9wXSA9IHZhbHVlLCBvYmogKTtcbiAgICAgICAgdmFyIG9iajtcbiAgICB9LFxuXG4gICAgY29udGFpbjogZnVuY3Rpb24gY29udGFpbihkaW1lbnNpb25zLCBtYXhEaW1lbnNpb25zKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBhc3NpZ24oe30sIGRpbWVuc2lvbnMpO1xuXG4gICAgICAgIGVhY2goZGltZW5zaW9ucywgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGRpbWVuc2lvbnMgPSBkaW1lbnNpb25zW3Byb3BdID4gbWF4RGltZW5zaW9uc1twcm9wXVxuICAgICAgICAgICAgPyB0aGlzJDEucmF0aW8oZGltZW5zaW9ucywgcHJvcCwgbWF4RGltZW5zaW9uc1twcm9wXSlcbiAgICAgICAgICAgIDogZGltZW5zaW9uczsgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH0sXG5cbiAgICBjb3ZlcjogZnVuY3Rpb24gY292ZXIoZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucykge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICBkaW1lbnNpb25zID0gdGhpcy5jb250YWluKGRpbWVuc2lvbnMsIG1heERpbWVuc2lvbnMpO1xuXG4gICAgICAgIGVhY2goZGltZW5zaW9ucywgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGRpbWVuc2lvbnMgPSBkaW1lbnNpb25zW3Byb3BdIDwgbWF4RGltZW5zaW9uc1twcm9wXVxuICAgICAgICAgICAgPyB0aGlzJDEucmF0aW8oZGltZW5zaW9ucywgcHJvcCwgbWF4RGltZW5zaW9uc1twcm9wXSlcbiAgICAgICAgICAgIDogZGltZW5zaW9uczsgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gcHJldmVudENsaWNrKCkge1xuXG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB0cmlnZ2VyKGRvYywgJ2NsaWNrJyk7IH0sIDApO1xuXG4gICAgb25jZShkb2MsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH0sIHRydWUpO1xuXG59XG5cbmZ1bmN0aW9uIGlzVmlzaWJsZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQ7IH0pO1xufVxuXG52YXIgc2VsSW5wdXQgPSAnaW5wdXQsc2VsZWN0LHRleHRhcmVhLGJ1dHRvbic7XG5mdW5jdGlvbiBpc0lucHV0KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsIHNlbElucHV0KTsgfSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGh0bWwocGFyZW50LCBodG1sKSB7XG4gICAgcGFyZW50ID0gdG9Ob2RlKHBhcmVudCk7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGh0bWwpXG4gICAgICAgID8gcGFyZW50LmlubmVySFRNTFxuICAgICAgICA6IGFwcGVuZChwYXJlbnQuaGFzQ2hpbGROb2RlcygpID8gZW1wdHkocGFyZW50KSA6IHBhcmVudCwgaHRtbCk7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmQocGFyZW50LCBlbGVtZW50KSB7XG5cbiAgICBwYXJlbnQgPSB0b05vZGUocGFyZW50KTtcblxuICAgIGlmICghcGFyZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICByZXR1cm4gYXBwZW5kKHBhcmVudCwgZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGluc2VydE5vZGVzKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBwYXJlbnQuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHBhcmVudC5maXJzdENoaWxkKTsgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBlbGVtZW50KSB7XG4gICAgcGFyZW50ID0gdG9Ob2RlKHBhcmVudCk7XG4gICAgcmV0dXJuIGluc2VydE5vZGVzKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7IH0pO1xufVxuXG5mdW5jdGlvbiBiZWZvcmUocmVmLCBlbGVtZW50KSB7XG4gICAgcmVmID0gdG9Ob2RlKHJlZik7XG4gICAgcmV0dXJuIGluc2VydE5vZGVzKGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiByZWYucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgcmVmKTsgfSk7XG59XG5cbmZ1bmN0aW9uIGFmdGVyKHJlZiwgZWxlbWVudCkge1xuICAgIHJlZiA9IHRvTm9kZShyZWYpO1xuICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcmVmLm5leHRTaWJsaW5nXG4gICAgICAgID8gYmVmb3JlKHJlZi5uZXh0U2libGluZywgZWxlbWVudClcbiAgICAgICAgOiBhcHBlbmQocmVmLnBhcmVudE5vZGUsZWxlbWVudCk7IH1cbiAgICApO1xufVxuXG5mdW5jdGlvbiBpbnNlcnROb2RlcyhlbGVtZW50LCBmbikge1xuICAgIGVsZW1lbnQgPSBpc1N0cmluZyhlbGVtZW50KSA/IGZyYWdtZW50KGVsZW1lbnQpIDogZWxlbWVudDtcbiAgICByZXR1cm4gJ2xlbmd0aCcgaW4gZWxlbWVudCA/IHRvTm9kZXMoZWxlbWVudCkubWFwKGZuKSA6IGZuKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xuICAgIHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpOyB9KTtcbn1cblxuZnVuY3Rpb24gd3JhcEFsbChlbGVtZW50LCBzdHJ1Y3R1cmUpIHtcblxuICAgIHN0cnVjdHVyZSA9IHRvTm9kZShiZWZvcmUoZWxlbWVudCwgc3RydWN0dXJlKSk7XG5cbiAgICB3aGlsZSAoc3RydWN0dXJlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgc3RydWN0dXJlID0gc3RydWN0dXJlLmZpcnN0Q2hpbGQ7XG4gICAgfVxuXG4gICAgYXBwZW5kKHN0cnVjdHVyZSwgZWxlbWVudCk7XG5cbiAgICByZXR1cm4gc3RydWN0dXJlO1xufVxuXG5mdW5jdGlvbiB3cmFwSW5uZXIoZWxlbWVudCwgc3RydWN0dXJlKSB7XG4gICAgcmV0dXJuIHRvTm9kZXModG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuaGFzQ2hpbGROb2RlcyA/IHdyYXBBbGwodG9Ob2RlcyhlbGVtZW50LmNoaWxkTm9kZXMpLCBzdHJ1Y3R1cmUpIDogYXBwZW5kKGVsZW1lbnQsIHN0cnVjdHVyZSk7IH1cbiAgICApKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwKGVsZW1lbnQpIHtcbiAgICB0b05vZGVzKGVsZW1lbnQpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZTsgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBzZWxmKSB7IHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDsgfSlcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgICAgYmVmb3JlKHBhcmVudCwgcGFyZW50LmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgcmVtb3ZlKHBhcmVudCk7XG4gICAgICAgIH0pO1xufVxuXG52YXIgZnJhZ21lbnRSRSA9IC9eXFxzKjwoXFx3K3whKVtePl0qPi87XG52YXIgc2luZ2xlVGFnUkUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XG5cbmZ1bmN0aW9uIGZyYWdtZW50KGh0bWwpIHtcblxuICAgIHZhciBtYXRjaGVzO1xuXG4gICAgaWYgKG1hdGNoZXMgPSBzaW5nbGVUYWdSRS5leGVjKGh0bWwpKSB7XG4gICAgICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudChtYXRjaGVzWzFdKTtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlmIChmcmFnbWVudFJFLnRlc3QoaHRtbCkpIHtcbiAgICAgICAgY29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbC50cmltKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IGh0bWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA+IDEgPyB0b05vZGVzKGNvbnRhaW5lci5jaGlsZE5vZGVzKSA6IGNvbnRhaW5lci5maXJzdENoaWxkO1xuXG59XG5cbmZ1bmN0aW9uIGluZGV4KGVsZW1lbnQsIHJlZikge1xuICAgIHJldHVybiByZWZcbiAgICAgICAgPyB0b05vZGVzKGVsZW1lbnQpLmluZGV4T2YodG9Ob2RlKHJlZikpXG4gICAgICAgIDogdG9Ob2RlcygoZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KSkgJiYgZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGVsZW1lbnQpO1xufVxuXG52YXIgY3NzTnVtYmVyID0ge1xuICAgICdhbmltYXRpb24taXRlcmF0aW9uLWNvdW50JzogdHJ1ZSxcbiAgICAnY29sdW1uLWNvdW50JzogdHJ1ZSxcbiAgICAnZmlsbC1vcGFjaXR5JzogdHJ1ZSxcbiAgICAnZmxleC1ncm93JzogdHJ1ZSxcbiAgICAnZmxleC1zaHJpbmsnOiB0cnVlLFxuICAgICdmb250LXdlaWdodCc6IHRydWUsXG4gICAgJ2xpbmUtaGVpZ2h0JzogdHJ1ZSxcbiAgICAnb3BhY2l0eSc6IHRydWUsXG4gICAgJ29yZGVyJzogdHJ1ZSxcbiAgICAnb3JwaGFucyc6IHRydWUsXG4gICAgJ3dpZG93cyc6IHRydWUsXG4gICAgJ3otaW5kZXgnOiB0cnVlLFxuICAgICd6b29tJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gY3NzKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BlcnR5KSkge1xuXG4gICAgICAgICAgICBwcm9wZXJ0eSA9IHByb3BOYW1lKHByb3BlcnR5KTtcblxuICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IGlzTnVtZXJpYyh2YWx1ZSkgJiYgIWNzc051bWJlcltwcm9wZXJ0eV0gPyAodmFsdWUgKyBcInB4XCIpIDogdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHByb3BlcnR5KSkge1xuXG4gICAgICAgICAgICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvcGVydHkucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBwcm9wc1twcm9wZXJ0eV0gPSBwcm9wTmFtZShzdHlsZXNbcHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIGVhY2gocHJvcGVydHksIGZ1bmN0aW9uICh2YWx1ZSwgcHJvcGVydHkpIHsgcmV0dXJuIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpOyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuXG4gICAgfSlbMF07XG5cbn1cblxuZnVuY3Rpb24gZ2V0U3R5bGVzKGVsZW1lbnQsIHBzZXVkb0VsdCkge1xuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIHBzZXVkb0VsdCk7XG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5LCBwc2V1ZG9FbHQpIHtcbiAgICByZXR1cm4gZ2V0U3R5bGVzKGVsZW1lbnQsIHBzZXVkb0VsdClbcHJvcGVydHldO1xufVxuXG52YXIgdmFycyQxID0ge307XG5cbmZ1bmN0aW9uIGdldENzc1ZhcihuYW1lKSB7XG5cbiAgICBpZiAoIShuYW1lIGluIHZhcnMkMSkpIHtcblxuICAgICAgICAvKiB1c2FnZSBpbiBjc3M6ICAudmFyLW5hbWU6YmVmb3JlIHsgY29udGVudDpcInh5elwiIH0gKi9cblxuICAgICAgICB2YXIgZWxlbWVudCA9IGFwcGVuZChkb2NFbCwgZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcblxuICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCAoXCJ2YXItXCIgKyBuYW1lKSk7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgdmFycyQxW25hbWVdID0gZ2V0U3R5bGUoZWxlbWVudCwgJ2NvbnRlbnQnLCAnOmJlZm9yZScpLnJlcGxhY2UoL15bXCInXSguKilbXCInXSQvLCAnJDEnKTtcbiAgICAgICAgICAgIHZhcnMkMVtuYW1lXSA9IEpTT04ucGFyc2UodmFycyQxW25hbWVdKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIGRvY0VsLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhcnMkMVtuYW1lXTtcblxufVxuXG52YXIgY3NzUHJvcHMgPSB7fTtcblxuZnVuY3Rpb24gcHJvcE5hbWUobmFtZSkge1xuXG4gICAgdmFyIHJldCA9IGNzc1Byb3BzW25hbWVdO1xuICAgIGlmICghcmV0KSB7XG4gICAgICAgIHJldCA9IGNzc1Byb3BzW25hbWVdID0gdmVuZG9yUHJvcE5hbWUobmFtZSkgfHwgbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cblxudmFyIGNzc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJ107XG52YXIgc3R5bGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG5cbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKG5hbWUpIHtcblxuICAgIG5hbWUgPSBoeXBoZW5hdGUobmFtZSk7XG5cbiAgICBpZiAobmFtZSBpbiBzdHlsZSkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IGNzc1ByZWZpeGVzLmxlbmd0aCwgcHJlZml4ZWROYW1lO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBwcmVmaXhlZE5hbWUgPSBcIi1cIiArIChjc3NQcmVmaXhlc1tpXSkgKyBuYW1lO1xuICAgICAgICBpZiAocHJlZml4ZWROYW1lIGluIHN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZWROYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3VwcG9ydHNDbGFzc0xpc3Q7XG52YXIgc3VwcG9ydHNNdWx0aXBsZTtcbnZhciBzdXBwb3J0c0ZvcmNlO1xuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXBwbHkoZWxlbWVudCwgYXJncywgJ2FkZCcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXBwbHkoZWxlbWVudCwgYXJncywgJ3JlbW92ZScpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzKGVsZW1lbnQsIGNscykge1xuICAgIGZpbHRlckF0dHIoZWxlbWVudCwgJ2NsYXNzJywgbmV3IFJlZ0V4cCgoXCIoXnxcXFxccylcIiArIGNscyArIFwiKD8hXFxcXFMpXCIpLCAnZycpLCAnJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcyhlbGVtZW50KSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCBsZW4tLSA+IDAgKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuICsgMSBdO1xuXG4gICAgYXJnc1swXSAmJiByZW1vdmVDbGFzcyhlbGVtZW50LCBhcmdzWzBdKTtcbiAgICBhcmdzWzFdICYmIGFkZENsYXNzKGVsZW1lbnQsIGFyZ3NbMV0pO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50LCBjbHMpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDbGFzc0xpc3QgJiYgdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbHMpOyB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuXG4gICAgaWYgKCFzdXBwb3J0c0NsYXNzTGlzdCB8fCAhYXJncy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFyZ3MgPSBnZXRBcmdzKGFyZ3MpO1xuXG4gICAgdmFyIGZvcmNlID0gIWlzU3RyaW5nKGFyZ3NbYXJncy5sZW5ndGggLSAxXSkgPyBhcmdzLnBvcCgpICA6IHVuZGVmaW5lZDtcblxuICAgIHRvTm9kZXMoZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciBjbGFzc0xpc3QgPSByZWYuY2xhc3NMaXN0O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3VwcG9ydHNGb3JjZVxuICAgICAgICAgICAgICAgID8gY2xhc3NMaXN0LnRvZ2dsZShhcmdzW2ldLCBmb3JjZSlcbiAgICAgICAgICAgICAgICA6IChjbGFzc0xpc3RbKCFpc1VuZGVmaW5lZChmb3JjZSkgPyBmb3JjZSA6ICFjbGFzc0xpc3QuY29udGFpbnMoYXJnc1tpXSkpID8gJ2FkZCcgOiAncmVtb3ZlJ10oYXJnc1tpXSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gYXBwbHkoZWxlbWVudCwgYXJncywgZm4pIHtcbiAgICBhcmdzID0gZ2V0QXJncyhhcmdzKS5maWx0ZXIoZnVuY3Rpb24gKGFyZykgeyByZXR1cm4gYXJnOyB9KTtcblxuICAgIHN1cHBvcnRzQ2xhc3NMaXN0ICYmIGFyZ3MubGVuZ3RoICYmIHRvTm9kZXMoZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciBjbGFzc0xpc3QgPSByZWYuY2xhc3NMaXN0O1xuXG4gICAgICAgIHN1cHBvcnRzTXVsdGlwbGVcbiAgICAgICAgICAgID8gY2xhc3NMaXN0W2ZuXS5hcHBseShjbGFzc0xpc3QsIGFyZ3MpXG4gICAgICAgICAgICA6IGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoY2xzKSB7IHJldHVybiBjbGFzc0xpc3RbZm5dKGNscyk7IH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdzKGFyZ3MpIHtcbiAgICByZXR1cm4gYXJncy5yZWR1Y2UoZnVuY3Rpb24gKGFyZ3MsIGFyZykge1xuICAgICAgICBhcmdzLnB1c2guYXBwbHkoYXJncywgaXNTdHJpbmcoYXJnKSAmJiBpbmNsdWRlcyhhcmcsICcgJykgPyBhcmcudHJpbSgpLnNwbGl0KCcgJykgOiBbYXJnXSk7XG4gICAgICAgIHJldHVybiBhcmdzO1xuICAgIH0sIFtdKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBsaXN0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ18nKS5jbGFzc0xpc3Q7XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgbGlzdC5hZGQoJ2EnLCAnYicpO1xuICAgICAgICBsaXN0LnRvZ2dsZSgnYycsIGZhbHNlKTtcbiAgICAgICAgc3VwcG9ydHNNdWx0aXBsZSA9IGxpc3QuY29udGFpbnMoJ2InKTtcbiAgICAgICAgc3VwcG9ydHNGb3JjZSA9ICFsaXN0LmNvbnRhaW5zKCdjJyk7XG4gICAgICAgIHN1cHBvcnRzQ2xhc3NMaXN0ID0gdHJ1ZTtcbiAgICB9XG4gICAgbGlzdCA9IG51bGw7XG5cbn0pKCk7XG5cbnZhciBPYnNlcnZlciA9IHdpbi5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbi5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKGZ1bmN0aW9uIChmbikgeyByZXR1cm4gc2V0VGltZW91dChmbiwgMTAwMCAvIDYwKTsgfSk7XG5cbnZhciBoYXNUb3VjaEV2ZW50cyA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbjtcbnZhciBoYXNQb2ludGVyRXZlbnRzID0gd2luLlBvaW50ZXJFdmVudDtcbnZhciBoYXNUb3VjaCA9ICdvbnRvdWNoc3RhcnQnIGluIHdpblxuICAgIHx8IHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2hcbiAgICB8fCBuYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCAmJiBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyAvLyBJRSAxMFxuICAgIHx8IG5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM7IC8vIElFID49MTFcblxudmFyIHBvaW50ZXJEb3duID0gIWhhc1RvdWNoID8gJ21vdXNlZG93bicgOiAoXCJtb3VzZWRvd24gXCIgKyAoaGFzVG91Y2hFdmVudHMgPyAndG91Y2hzdGFydCcgOiAncG9pbnRlcmRvd24nKSk7XG52YXIgcG9pbnRlck1vdmUgPSAhaGFzVG91Y2ggPyAnbW91c2Vtb3ZlJyA6IChcIm1vdXNlbW92ZSBcIiArIChoYXNUb3VjaEV2ZW50cyA/ICd0b3VjaG1vdmUnIDogJ3BvaW50ZXJtb3ZlJykpO1xudmFyIHBvaW50ZXJVcCA9ICFoYXNUb3VjaCA/ICdtb3VzZXVwJyA6IChcIm1vdXNldXAgXCIgKyAoaGFzVG91Y2hFdmVudHMgPyAndG91Y2hlbmQnIDogJ3BvaW50ZXJ1cCcpKTtcbnZhciBwb2ludGVyRW50ZXIgPSBoYXNUb3VjaCAmJiBoYXNQb2ludGVyRXZlbnRzID8gJ3BvaW50ZXJlbnRlcicgOiAnbW91c2VlbnRlcic7XG52YXIgcG9pbnRlckxlYXZlID0gaGFzVG91Y2ggJiYgaGFzUG9pbnRlckV2ZW50cyA/ICdwb2ludGVybGVhdmUnIDogJ21vdXNlbGVhdmUnO1xuXG52YXIgdHJhbnNpdGlvbmVuZCA9IHByZWZpeCgndHJhbnNpdGlvbicsICd0cmFuc2l0aW9uLWVuZCcpO1xudmFyIGFuaW1hdGlvbnN0YXJ0ID0gcHJlZml4KCdhbmltYXRpb24nLCAnYW5pbWF0aW9uLXN0YXJ0Jyk7XG52YXIgYW5pbWF0aW9uZW5kID0gcHJlZml4KCdhbmltYXRpb24nLCAnYW5pbWF0aW9uLWVuZCcpO1xuXG5mdW5jdGlvbiBnZXRJbWFnZShzcmMpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUoaW1nKTsgfTtcblxuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIHByZWZpeChuYW1lLCBldmVudCkge1xuXG4gICAgdmFyIHVjYXNlID0gY2xhc3NpZnkobmFtZSksXG4gICAgICAgIGxvd2VyZWQgPSBjbGFzc2lmeShldmVudCkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgY2xhc3NpZmllZCA9IGNsYXNzaWZ5KGV2ZW50KSxcbiAgICAgICAgZWxlbWVudCA9IGRvYy5ib2R5IHx8IGRvY0VsLFxuICAgICAgICBuYW1lcyA9ICggb2JqID0ge30sIG9ialtuYW1lXSA9IGxvd2VyZWQsIG9ialsoXCJXZWJraXRcIiArIHVjYXNlKV0gPSAoXCJ3ZWJraXRcIiArIGNsYXNzaWZpZWQpLCBvYmpbKFwiTW96XCIgKyB1Y2FzZSldID0gbG93ZXJlZCwgb2JqWyhcIm9cIiArIHVjYXNlKV0gPSAoXCJvXCIgKyBjbGFzc2lmaWVkICsgXCIgb1wiICsgbG93ZXJlZCksIG9iaiApO1xuICAgIHZhciBvYmo7XG5cbiAgICBmb3IgKG5hbWUgaW4gbmFtZXMpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbigpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cblxuICAgIHZhciByZWYgPSBnZXRBcmdzJDEoYXJncyk7XG4gICAgdmFyIHRhcmdldCA9IHJlZlswXTtcbiAgICB2YXIgdHlwZSA9IHJlZlsxXTtcbiAgICB2YXIgc2VsZWN0b3IgPSByZWZbMl07XG4gICAgdmFyIGxpc3RlbmVyID0gcmVmWzNdO1xuICAgIHZhciB1c2VDYXB0dXJlID0gcmVmWzRdO1xuXG4gICAgdGFyZ2V0ID0gdG9FdmVudFRhcmdldCh0YXJnZXQpO1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGxpc3RlbmVyID0gZGVsZWdhdGUodGFyZ2V0LCBzZWxlY3RvciwgbGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGlmIChsaXN0ZW5lci5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxpc3RlbmVyID0gZGV0YWlsKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICB0eXBlLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkgeyByZXR1cm4gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpOyB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gb2ZmKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpOyB9O1xufVxuXG5mdW5jdGlvbiBvZmYodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgIGlmICggdXNlQ2FwdHVyZSA9PT0gdm9pZCAwICkgdXNlQ2FwdHVyZSA9IGZhbHNlO1xuXG4gICAgdHlwZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHRvRXZlbnRUYXJnZXQodGFyZ2V0KS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTsgfSk7XG59XG5cbmZ1bmN0aW9uIG9uY2UoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG5cbiAgICB2YXIgcmVmID0gZ2V0QXJncyQxKGFyZ3MpO1xuICAgIHZhciBlbGVtZW50ID0gcmVmWzBdO1xuICAgIHZhciB0eXBlID0gcmVmWzFdO1xuICAgIHZhciBzZWxlY3RvciA9IHJlZlsyXTtcbiAgICB2YXIgbGlzdGVuZXIgPSByZWZbM107XG4gICAgdmFyIHVzZUNhcHR1cmUgPSByZWZbNF07XG4gICAgdmFyIGNvbmRpdGlvbiA9IHJlZls1XTtcbiAgICB2YXIgb2ZmID0gb24oZWxlbWVudCwgdHlwZSwgc2VsZWN0b3IsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gIWNvbmRpdGlvbiB8fCBjb25kaXRpb24oZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgb2ZmKCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZSwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4gb2ZmO1xufVxuXG5mdW5jdGlvbiB0cmlnZ2VyKHRhcmdldCwgZXZlbnQsIGRldGFpbCkge1xuICAgIHJldHVybiB0b0V2ZW50VGFyZ2V0cyh0YXJnZXQpLnJlZHVjZShmdW5jdGlvbiAobm90Q2FuY2VsZWQsIHRhcmdldCkgeyByZXR1cm4gbm90Q2FuY2VsZWQgJiYgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoZXZlbnQsIHRydWUsIHRydWUsIGRldGFpbCkpOyB9XG4gICAgLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXZlbnQoZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKSB7XG4gICAgaWYgKCBidWJibGVzID09PSB2b2lkIDAgKSBidWJibGVzID0gdHJ1ZTtcbiAgICBpZiAoIGNhbmNlbGFibGUgPT09IHZvaWQgMCApIGNhbmNlbGFibGUgPSBmYWxzZTtcblxuICAgIGlmIChpc1N0cmluZyhlKSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBkb2MuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkZXRhaWwpO1xuICAgICAgICBlID0gZXZlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGdldEFyZ3MkMShhcmdzKSB7XG5cbiAgICBpZiAoaXNTdHJpbmcoYXJnc1swXSkpIHtcbiAgICAgICAgYXJnc1swXSA9ICQkMShhcmdzWzBdKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbihhcmdzWzJdKSkge1xuICAgICAgICBhcmdzLnNwbGljZSgyLCAwLCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xufVxuXG5mdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgbGlzdGVuZXIpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJldHVybiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCxcbiAgICAgICAgICAgIGN1cnJlbnQgPSBzZWxlY3RvclswXSA9PT0gJz4nXG4gICAgICAgICAgICAgICAgPyAkJChzZWxlY3RvciwgZWxlbWVudCkuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiB3aXRoaW4odGFyZ2V0LCBlbGVtZW50KTsgfSlbMF1cbiAgICAgICAgICAgICAgICA6IGNsb3Nlc3QodGFyZ2V0LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGUuZGVsZWdhdGUgPSBlbGVtZW50O1xuICAgICAgICAgICAgZS5jdXJyZW50ID0gY3VycmVudDtcblxuICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzJDEsIGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXRhaWwobGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGlzQXJyYXkoZS5kZXRhaWwpID8gbGlzdGVuZXIuYXBwbHkobGlzdGVuZXIsIFtlXS5jb25jYXQoZS5kZXRhaWwpKSA6IGxpc3RlbmVyKGUpOyB9O1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiAnRXZlbnRUYXJnZXQnIGluIHdpblxuICAgICAgICA/IHRhcmdldCBpbnN0YW5jZW9mIEV2ZW50VGFyZ2V0XG4gICAgICAgIDogJ2FkZEV2ZW50TGlzdGVuZXInIGluIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gdG9FdmVudFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNFdmVudFRhcmdldCh0YXJnZXQpID8gdGFyZ2V0IDogdG9Ob2RlKHRhcmdldCk7XG59XG5cbmZ1bmN0aW9uIHRvRXZlbnRUYXJnZXRzKHRhcmdldCkge1xuICAgIHJldHVybiBpc0V2ZW50VGFyZ2V0KHRhcmdldClcbiAgICAgICAgPyBbdGFyZ2V0XVxuICAgICAgICA6IGlzQXJyYXkodGFyZ2V0KVxuICAgICAgICAgICAgPyB0YXJnZXQubWFwKHRvRXZlbnRUYXJnZXQpLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgOiB0b05vZGVzKHRhcmdldCk7XG59XG5cbi8qXG4gICAgQmFzZWQgb246XG4gICAgQ29weXJpZ2h0IChjKSAyMDE2IFdpbHNvbiBQYWdlIHdpbHNvbnBhZ2VAbWUuY29tXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL3dpbHNvbnBhZ2UvZmFzdGRvbVxuKi9cblxudmFyIGZhc3Rkb20gPSB7XG5cbiAgICByZWFkczogW10sXG4gICAgd3JpdGVzOiBbXSxcblxuICAgIG1lYXN1cmU6IGZ1bmN0aW9uIG1lYXN1cmUodGFzaykge1xuICAgICAgICB0aGlzLnJlYWRzLnB1c2godGFzayk7XG4gICAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfSxcblxuICAgIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlKHRhc2spIHtcbiAgICAgICAgdGhpcy53cml0ZXMucHVzaCh0YXNrKTtcbiAgICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgICAgICByZXR1cm4gdGFzaztcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKHRhc2spIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZSQxKHRoaXMucmVhZHMsIHRhc2spIHx8IHJlbW92ZSQxKHRoaXMud3JpdGVzLCB0YXNrKTtcbiAgICB9LFxuXG4gICAgZmx1c2g6IGZ1bmN0aW9uIGZsdXNoKCkge1xuXG4gICAgICAgIHJ1blRhc2tzKHRoaXMucmVhZHMpO1xuICAgICAgICBydW5UYXNrcyh0aGlzLndyaXRlcy5zcGxpY2UoMCwgdGhpcy53cml0ZXMubGVuZ3RoKSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5yZWFkcy5sZW5ndGggfHwgdGhpcy53cml0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuZnVuY3Rpb24gc2NoZWR1bGVGbHVzaCgpIHtcbiAgICBpZiAoIWZhc3Rkb20uc2NoZWR1bGVkKSB7XG4gICAgICAgIGZhc3Rkb20uc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZhc3Rkb20uZmx1c2guYmluZChmYXN0ZG9tKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBydW5UYXNrcyh0YXNrcykge1xuICAgIHZhciB0YXNrO1xuICAgIHdoaWxlICh0YXNrID0gdGFza3Muc2hpZnQoKSkge1xuICAgICAgICB0YXNrKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUkMShhcnJheSwgaXRlbSkge1xuICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgcmV0dXJuICEhfmluZGV4ICYmICEhYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZnVuY3Rpb24gTW91c2VUcmFja2VyKCkge31cblxuTW91c2VUcmFja2VyLnByb3RvdHlwZSA9IHtcblxuICAgIHBvc2l0aW9uczogW10sXG4gICAgcG9zaXRpb246IG51bGwsXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIHRoaXMucG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBudWxsO1xuXG4gICAgICAgIHZhciB0aWNraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5iaW5kID0gb24oZG9jLCAnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgaWYgKHRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBEYXRlLm5vdygpLCBsZW5ndGggPSB0aGlzJDEucG9zaXRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoICYmICh0aW1lIC0gdGhpcyQxLnBvc2l0aW9uc1tsZW5ndGggLSAxXS50aW1lID4gMTAwKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zaXRpb25zLnNwbGljZSgwLCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMkMS5wb3NpdGlvbnMucHVzaCh7dGltZTogdGltZSwgeDogZS5wYWdlWCwgeTogZS5wYWdlWX0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5wb3NpdGlvbnMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zaXRpb25zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgNSk7XG5cbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMudW5iaW5kKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1vdmVzVG86IGZ1bmN0aW9uIG1vdmVzVG8odGFyZ2V0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwID0gb2Zmc2V0KHRhcmdldCksXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25zW3RoaXMucG9zaXRpb25zLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgcHJldlBvcyA9IHRoaXMucG9zaXRpb25zWzBdO1xuXG4gICAgICAgIGlmIChwLmxlZnQgPD0gcG9zaXRpb24ueCAmJiBwb3NpdGlvbi54IDw9IHAucmlnaHQgJiYgcC50b3AgPD0gcG9zaXRpb24ueSAmJiBwb3NpdGlvbi55IDw9IHAuYm90dG9tKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9pbnRzID0gW1xuICAgICAgICAgICAgW3t4OiBwLmxlZnQsIHk6IHAudG9wfSwge3g6IHAucmlnaHQsIHk6IHAuYm90dG9tfV0sXG4gICAgICAgICAgICBbe3g6IHAucmlnaHQsIHk6IHAudG9wfSwge3g6IHAubGVmdCwgeTogcC5ib3R0b219XVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmIChwLnJpZ2h0IDw9IHBvc2l0aW9uLngpIHtcblxuICAgICAgICB9IGVsc2UgaWYgKHAubGVmdCA+PSBwb3NpdGlvbi54KSB7XG4gICAgICAgICAgICBwb2ludHNbMF0ucmV2ZXJzZSgpO1xuICAgICAgICAgICAgcG9pbnRzWzFdLnJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwLmJvdHRvbSA8PSBwb3NpdGlvbi55KSB7XG4gICAgICAgICAgICBwb2ludHNbMF0ucmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHAudG9wID49IHBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgIHBvaW50c1sxXS5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISFwb2ludHMucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIHBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgKHNsb3BlKHByZXZQb3MsIHBvaW50WzBdKSA8IHNsb3BlKHBvc2l0aW9uLCBwb2ludFswXSkgJiYgc2xvcGUocHJldlBvcywgcG9pbnRbMV0pID4gc2xvcGUocG9zaXRpb24sIHBvaW50WzFdKSk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gc2xvcGUoYSwgYikge1xuICAgIHJldHVybiAoYi55IC0gYS55KSAvIChiLnggLSBhLngpO1xufVxuXG52YXIgc3RyYXRzID0ge307XG5cbi8vIGNvbmNhdCBzdHJhdGVneVxuc3RyYXRzLmFyZ3MgPVxuc3RyYXRzLmNyZWF0ZWQgPVxuc3RyYXRzLmV2ZW50cyA9XG5zdHJhdHMuaW5pdCA9XG5zdHJhdHMucmVhZHkgPVxuc3RyYXRzLmNvbm5lY3RlZCA9XG5zdHJhdHMuZGlzY29ubmVjdGVkID1cbnN0cmF0cy5kZXN0cm95ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblxuICAgIHBhcmVudFZhbCA9IHBhcmVudFZhbCAmJiAhaXNBcnJheShwYXJlbnRWYWwpID8gW3BhcmVudFZhbF0gOiBwYXJlbnRWYWw7XG5cbiAgICByZXR1cm4gY2hpbGRWYWxcbiAgICAgICAgPyBwYXJlbnRWYWxcbiAgICAgICAgICAgID8gcGFyZW50VmFsLmNvbmNhdChjaGlsZFZhbClcbiAgICAgICAgICAgIDogaXNBcnJheShjaGlsZFZhbClcbiAgICAgICAgICAgICAgICA/IGNoaWxkVmFsXG4gICAgICAgICAgICAgICAgOiBbY2hpbGRWYWxdXG4gICAgICAgIDogcGFyZW50VmFsO1xufTtcblxuLy8gdXBkYXRlIHN0cmF0ZWd5XG5zdHJhdHMudXBkYXRlID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICByZXR1cm4gc3RyYXRzLmFyZ3MocGFyZW50VmFsLCBpc0Z1bmN0aW9uKGNoaWxkVmFsKSA/IHtyZWFkOiBjaGlsZFZhbH0gOiBjaGlsZFZhbCk7XG59O1xuXG4vLyBwcm9wZXJ0eSBzdHJhdGVneVxuc3RyYXRzLnByb3BzID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcblxuICAgIGlmIChpc0FycmF5KGNoaWxkVmFsKSkge1xuICAgICAgICBjaGlsZFZhbCA9IGNoaWxkVmFsLnJlZHVjZShmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgdmFsdWVba2V5XSA9IFN0cmluZztcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIHJldHVybiBzdHJhdHMubWV0aG9kcyhwYXJlbnRWYWwsIGNoaWxkVmFsKTtcbn07XG5cbi8vIGV4dGVuZCBzdHJhdGVneVxuc3RyYXRzLmNvbXB1dGVkID1cbnN0cmF0cy5kZWZhdWx0cyA9XG5zdHJhdHMubWV0aG9kcyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGNoaWxkVmFsXG4gICAgICAgID8gcGFyZW50VmFsXG4gICAgICAgICAgICA/IGFzc2lnbih7fSwgcGFyZW50VmFsLCBjaGlsZFZhbClcbiAgICAgICAgICAgIDogY2hpbGRWYWxcbiAgICAgICAgOiBwYXJlbnRWYWw7XG59O1xuXG4vLyBkZWZhdWx0IHN0cmF0ZWd5XG52YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoY2hpbGRWYWwpID8gcGFyZW50VmFsIDogY2hpbGRWYWw7XG59O1xuXG5mdW5jdGlvbiBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZCkge1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7fSwga2V5O1xuXG4gICAgaWYgKGNoaWxkLm1peGlucykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkLm1peGlucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG1lcmdlT3B0aW9ucyhwYXJlbnQsIGNoaWxkLm1peGluc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGtleSBpbiBwYXJlbnQpIHtcbiAgICAgICAgbWVyZ2VLZXkoa2V5KTtcbiAgICB9XG5cbiAgICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgICAgICBpZiAoIWhhc093bihwYXJlbnQsIGtleSkpIHtcbiAgICAgICAgICAgIG1lcmdlS2V5KGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZUtleShrZXkpIHtcbiAgICAgICAgb3B0aW9uc1trZXldID0gKHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdCkocGFyZW50W2tleV0sIGNoaWxkW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xufVxuXG52YXIgaWQgPSAwO1xuXG52YXIgUGxheWVyID0gZnVuY3Rpb24gUGxheWVyKGVsKSB7XG4gICAgdGhpcy5pZCA9ICsraWQ7XG4gICAgdGhpcy5lbCA9IHRvTm9kZShlbCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmlzVmlkZW8gPSBmdW5jdGlvbiBpc1ZpZGVvICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1lvdXR1YmUoKSB8fCB0aGlzLmlzVmltZW8oKSB8fCB0aGlzLmlzSFRNTDUoKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuaXNIVE1MNSA9IGZ1bmN0aW9uIGlzSFRNTDUgKCkge1xuICAgIHJldHVybiB0aGlzLmVsLnRhZ05hbWUgPT09ICdWSURFTyc7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmlzSUZyYW1lID0gZnVuY3Rpb24gaXNJRnJhbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmVsLnRhZ05hbWUgPT09ICdJRlJBTUUnO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc1lvdXR1YmUgPSBmdW5jdGlvbiBpc1lvdXR1YmUgKCkge1xuICAgIHJldHVybiB0aGlzLmlzSUZyYW1lKCkgJiYgISF0aGlzLmVsLnNyYy5tYXRjaCgvXFwvXFwvLio/eW91dHViZVxcLlthLXpdK1xcLyh3YXRjaFxcP3Y9W14mXFxzXSt8ZW1iZWQpfHlvdXR1XFwuYmVcXC8uKi8pO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc1ZpbWVvID0gZnVuY3Rpb24gaXNWaW1lbyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNJRnJhbWUoKSAmJiAhIXRoaXMuZWwuc3JjLm1hdGNoKC92aW1lb1xcLmNvbVxcL3ZpZGVvXFwvLiovKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuZW5hYmxlQXBpID0gZnVuY3Rpb24gZW5hYmxlQXBpICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5O1xuICAgIH1cblxuICAgIHZhciB5b3V0dWJlID0gdGhpcy5pc1lvdXR1YmUoKSwgdmltZW8gPSB0aGlzLmlzVmltZW8oKSwgcG9sbGVyO1xuXG4gICAgaWYgKHlvdXR1YmUgfHwgdmltZW8pIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIG9uY2UodGhpcyQxLmVsLCAnbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeW91dHViZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBwb3N0KHRoaXMkMS5lbCwge2V2ZW50OiAnbGlzdGVuaW5nJywgaWQ6IHRoaXMkMS5pZH0pOyB9O1xuICAgICAgICAgICAgICAgICAgICBwb2xsZXIgPSBzZXRJbnRlcnZhbChsaXN0ZW5lciwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGlzdGVuKGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiB5b3V0dWJlICYmIGRhdGEuaWQgPT09IHRoaXMkMS5pZCAmJiBkYXRhLmV2ZW50ID09PSAnb25SZWFkeScgfHwgdmltZW8gJiYgTnVtYmVyKGRhdGEucGxheWVyX2lkKSA9PT0gdGhpcyQxLmlkOyB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBwb2xsZXIgJiYgY2xlYXJJbnRlcnZhbChwb2xsZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhdHRyKHRoaXMkMS5lbCwgJ3NyYycsIChcIlwiICsgKHRoaXMkMS5lbC5zcmMpICsgKGluY2x1ZGVzKHRoaXMkMS5lbC5zcmMsICc/JykgPyAnJicgOiAnPycpICsgKHlvdXR1YmUgPyAnZW5hYmxlanNhcGk9MScgOiAoXCJhcGk9MSZwbGF5ZXJfaWQ9XCIgKyBpZCkpKSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbn07XG5cblBsYXllci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIHBsYXkgKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgaWYgKCF0aGlzLmlzVmlkZW8oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJRnJhbWUoKSkge1xuICAgICAgICB0aGlzLmVuYWJsZUFwaSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zdCh0aGlzJDEuZWwsIHtmdW5jOiAncGxheVZpZGVvJywgbWV0aG9kOiAncGxheSd9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0aGlzLmVsLnBsYXkoKTtcbiAgICB9XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gcGF1c2UgKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgaWYgKCF0aGlzLmlzVmlkZW8oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJRnJhbWUoKSkge1xuICAgICAgICB0aGlzLmVuYWJsZUFwaSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zdCh0aGlzJDEuZWwsIHtmdW5jOiAncGF1c2VWaWRlbycsIG1ldGhvZDogJ3BhdXNlJ30pOyB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNIVE1MNSgpKSB7XG4gICAgICAgIHRoaXMuZWwucGF1c2UoKTtcbiAgICB9XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLm11dGUgPSBmdW5jdGlvbiBtdXRlICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgIGlmICghdGhpcy5pc1ZpZGVvKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSUZyYW1lKCkpIHtcbiAgICAgICAgdGhpcy5lbmFibGVBcGkoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvc3QodGhpcyQxLmVsLCB7ZnVuYzogJ211dGUnLCBtZXRob2Q6ICdzZXRWb2x1bWUnLCB2YWx1ZTogMH0pOyB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNIVE1MNSgpKSB7XG4gICAgICAgIHRoaXMuZWwubXV0ZWQgPSB0cnVlO1xuICAgICAgICBhdHRyKHRoaXMuZWwsICdtdXRlZCcsICcnKTtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHBvc3QoZWwsIGNtZCkge1xuICAgIHRyeSB7XG4gICAgICAgIGVsLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduKHtldmVudDogJ2NvbW1hbmQnfSwgY21kKSksICcqJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbn1cblxuZnVuY3Rpb24gbGlzdGVuKGNiKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICBvbmNlKHdpbiwgJ21lc3NhZ2UnLCBmdW5jdGlvbiAoXywgZGF0YSkgeyByZXR1cm4gcmVzb2x2ZShkYXRhKTsgfSwgZmFsc2UsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVmLmRhdGE7XG5cblxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFpc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRhICYmIGNiKGRhdGEpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn1cblxudmFyIGRpcnMgPSB7XG4gICAgICAgIHdpZHRoOiBbJ3gnLCAnbGVmdCcsICdyaWdodCddLFxuICAgICAgICBoZWlnaHQ6IFsneScsICd0b3AnLCAnYm90dG9tJ11cbiAgICB9O1xuXG5mdW5jdGlvbiBwb3NpdGlvbkF0KGVsZW1lbnQsIHRhcmdldCwgZWxBdHRhY2gsIHRhcmdldEF0dGFjaCwgZWxPZmZzZXQsIHRhcmdldE9mZnNldCwgZmxpcCwgYm91bmRhcnkpIHtcblxuICAgIGVsQXR0YWNoID0gZ2V0UG9zKGVsQXR0YWNoKTtcbiAgICB0YXJnZXRBdHRhY2ggPSBnZXRQb3ModGFyZ2V0QXR0YWNoKTtcblxuICAgIHZhciBmbGlwcGVkID0ge2VsZW1lbnQ6IGVsQXR0YWNoLCB0YXJnZXQ6IHRhcmdldEF0dGFjaH07XG5cbiAgICBpZiAoIWVsZW1lbnQgfHwgIXRhcmdldCkge1xuICAgICAgICByZXR1cm4gZmxpcHBlZDtcbiAgICB9XG5cbiAgICB2YXIgZGltID0gZ2V0RGltZW5zaW9ucyhlbGVtZW50KSxcbiAgICAgICAgdGFyZ2V0RGltID0gZ2V0RGltZW5zaW9ucyh0YXJnZXQpLFxuICAgICAgICBwb3NpdGlvbiA9IHRhcmdldERpbTtcblxuICAgIG1vdmVUbyhwb3NpdGlvbiwgZWxBdHRhY2gsIGRpbSwgLTEpO1xuICAgIG1vdmVUbyhwb3NpdGlvbiwgdGFyZ2V0QXR0YWNoLCB0YXJnZXREaW0sIDEpO1xuXG4gICAgZWxPZmZzZXQgPSBnZXRPZmZzZXRzKGVsT2Zmc2V0LCBkaW0ud2lkdGgsIGRpbS5oZWlnaHQpO1xuICAgIHRhcmdldE9mZnNldCA9IGdldE9mZnNldHModGFyZ2V0T2Zmc2V0LCB0YXJnZXREaW0ud2lkdGgsIHRhcmdldERpbS5oZWlnaHQpO1xuXG4gICAgZWxPZmZzZXRbJ3gnXSArPSB0YXJnZXRPZmZzZXRbJ3gnXTtcbiAgICBlbE9mZnNldFsneSddICs9IHRhcmdldE9mZnNldFsneSddO1xuXG4gICAgcG9zaXRpb24ubGVmdCArPSBlbE9mZnNldFsneCddO1xuICAgIHBvc2l0aW9uLnRvcCArPSBlbE9mZnNldFsneSddO1xuXG4gICAgYm91bmRhcnkgPSBnZXREaW1lbnNpb25zKGJvdW5kYXJ5IHx8IGdldFdpbmRvdyhlbGVtZW50KSk7XG5cbiAgICBpZiAoZmxpcCkge1xuICAgICAgICBlYWNoKGRpcnMsIGZ1bmN0aW9uIChyZWYsIHByb3ApIHtcbiAgICAgICAgICAgIHZhciBkaXIgPSByZWZbMF07XG4gICAgICAgICAgICB2YXIgYWxpZ24gPSByZWZbMV07XG4gICAgICAgICAgICB2YXIgYWxpZ25GbGlwID0gcmVmWzJdO1xuXG5cbiAgICAgICAgICAgIGlmICghKGZsaXAgPT09IHRydWUgfHwgaW5jbHVkZXMoZmxpcCwgZGlyKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBlbGVtT2Zmc2V0ID0gZWxBdHRhY2hbZGlyXSA9PT0gYWxpZ25cbiAgICAgICAgICAgICAgICAgICAgPyAtZGltW3Byb3BdXG4gICAgICAgICAgICAgICAgICAgIDogZWxBdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGRpbVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwLFxuICAgICAgICAgICAgICAgIHRhcmdldE9mZnNldCA9IHRhcmdldEF0dGFjaFtkaXJdID09PSBhbGlnblxuICAgICAgICAgICAgICAgICAgICA/IHRhcmdldERpbVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICA6IHRhcmdldEF0dGFjaFtkaXJdID09PSBhbGlnbkZsaXBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gLXRhcmdldERpbVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuXG4gICAgICAgICAgICBpZiAocG9zaXRpb25bYWxpZ25dIDwgYm91bmRhcnlbYWxpZ25dIHx8IHBvc2l0aW9uW2FsaWduXSArIGRpbVtwcm9wXSA+IGJvdW5kYXJ5W2FsaWduRmxpcF0pIHtcblxuICAgICAgICAgICAgICAgIHZhciBjZW50ZXJPZmZzZXQgPSBkaW1bcHJvcF0gLyAyLFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXJUYXJnZXRPZmZzZXQgPSB0YXJnZXRBdHRhY2hbZGlyXSA9PT0gJ2NlbnRlcicgPyAtdGFyZ2V0RGltW3Byb3BdIC8gMiA6IDA7XG5cbiAgICAgICAgICAgICAgICBlbEF0dGFjaFtkaXJdID09PSAnY2VudGVyJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KGNlbnRlck9mZnNldCwgY2VudGVyVGFyZ2V0T2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICB8fCBhcHBseSgtY2VudGVyT2Zmc2V0LCAtY2VudGVyVGFyZ2V0T2Zmc2V0KVxuICAgICAgICAgICAgICAgICkgfHwgYXBwbHkoZWxlbU9mZnNldCwgdGFyZ2V0T2Zmc2V0KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBhcHBseShlbGVtT2Zmc2V0LCB0YXJnZXRPZmZzZXQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBuZXdWYWwgPSBwb3NpdGlvblthbGlnbl0gKyBlbGVtT2Zmc2V0ICsgdGFyZ2V0T2Zmc2V0IC0gZWxPZmZzZXRbZGlyXSAqIDI7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsID49IGJvdW5kYXJ5W2FsaWduXSAmJiBuZXdWYWwgKyBkaW1bcHJvcF0gPD0gYm91bmRhcnlbYWxpZ25GbGlwXSkge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblthbGlnbl0gPSBuZXdWYWw7XG5cbiAgICAgICAgICAgICAgICAgICAgWydlbGVtZW50JywgJ3RhcmdldCddLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGlwcGVkW2VsXVtkaXJdID0gIWVsZW1PZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGZsaXBwZWRbZWxdW2Rpcl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZsaXBwZWRbZWxdW2Rpcl0gPT09IGRpcnNbcHJvcF1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBkaXJzW3Byb3BdWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZGlyc1twcm9wXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb2Zmc2V0KGVsZW1lbnQsIHBvc2l0aW9uKTtcblxuICAgIHJldHVybiBmbGlwcGVkO1xufVxuXG5mdW5jdGlvbiBvZmZzZXQoZWxlbWVudCwgY29vcmRpbmF0ZXMpIHtcblxuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICBpZiAoY29vcmRpbmF0ZXMpIHtcblxuICAgICAgICB2YXIgY3VycmVudE9mZnNldCA9IG9mZnNldChlbGVtZW50KSxcbiAgICAgICAgICAgIHBvcyA9IGNzcyhlbGVtZW50LCAncG9zaXRpb24nKTtcblxuICAgICAgICBbJ2xlZnQnLCAndG9wJ10uZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4gY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjc3MoZWxlbWVudCwgcHJvcCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9ICgoY29vcmRpbmF0ZXNbcHJvcF0gLSBjdXJyZW50T2Zmc2V0W3Byb3BdKSBcbiAgICAgICAgICAgICAgICAgICAgKyB0b0Zsb2F0KHBvcyA9PT0gJ2Fic29sdXRlJyAmJiB2YWx1ZSA9PT0gJ2F1dG8nID8gcG9zaXRpb24oZWxlbWVudClbcHJvcF0gOiB2YWx1ZSkpICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERpbWVuc2lvbnMoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldERpbWVuc2lvbnMoZWxlbWVudCkge1xuXG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgIHZhciByZWYgPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gICAgdmFyIHRvcCA9IHJlZi5wYWdlWU9mZnNldDtcbiAgICB2YXIgbGVmdCA9IHJlZi5wYWdlWE9mZnNldDtcblxuICAgIGlmIChpc1dpbmRvdyhlbGVtZW50KSkge1xuXG4gICAgICAgIHZhciBoZWlnaHQgPSBlbGVtZW50LmlubmVySGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGggPSBlbGVtZW50LmlubmVyV2lkdGg7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQsXG4gICAgICAgICAgICByaWdodDogbGVmdCArIHdpZHRoLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRpc3BsYXkgPSBmYWxzZTtcbiAgICBpZiAoIWlzVmlzaWJsZShlbGVtZW50KSkge1xuICAgICAgICBkaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmIChkaXNwbGF5ICE9PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICB0b3A6IHJlY3QudG9wICsgdG9wLFxuICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBsZWZ0LFxuICAgICAgICBib3R0b206IHJlY3QuYm90dG9tICsgdG9wLFxuICAgICAgICByaWdodDogcmVjdC5yaWdodCArIGxlZnQsXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwb3NpdGlvbihlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgIHZhciBwYXJlbnQgPSBvZmZzZXRQYXJlbnQoZWxlbWVudCksXG4gICAgICAgIHBhcmVudE9mZnNldCA9IHBhcmVudCA9PT0gZG9jRWwkMShlbGVtZW50KSA/IHt0b3A6IDAsIGxlZnQ6IDB9IDogb2Zmc2V0KHBhcmVudCk7XG5cbiAgICByZXR1cm4gWyd0b3AnLCAnbGVmdCddLnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIHByb3ApIHtcbiAgICAgICAgdmFyIHByb3BOYW1lID0gdWNmaXJzdChwcm9wKTtcbiAgICAgICAgcHJvcHNbcHJvcF0gLT0gcGFyZW50T2Zmc2V0W3Byb3BdXG4gICAgICAgICAgICArICh0b0Zsb2F0KGNzcyhlbGVtZW50LCAoXCJtYXJnaW5cIiArIHByb3BOYW1lKSkpIHx8IDApXG4gICAgICAgICAgICArICh0b0Zsb2F0KGNzcyhwYXJlbnQsIChcImJvcmRlclwiICsgcHJvcE5hbWUgKyBcIldpZHRoXCIpKSkgfHwgMCk7XG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICB9LCBvZmZzZXQoZWxlbWVudCkpO1xufVxuXG5mdW5jdGlvbiBvZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuXG4gICAgdmFyIHBhcmVudCA9IHRvTm9kZShlbGVtZW50KS5vZmZzZXRQYXJlbnQ7XG5cbiAgICB3aGlsZSAocGFyZW50ICYmIGNzcyhwYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBwYXJlbnQgPSBwYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgfHwgZG9jRWwkMShlbGVtZW50KTtcbn1cblxudmFyIGhlaWdodCA9IGRpbWVuc2lvbignaGVpZ2h0Jyk7XG52YXIgd2lkdGggPSBkaW1lbnNpb24oJ3dpZHRoJyk7XG5cbmZ1bmN0aW9uIGRpbWVuc2lvbihwcm9wKSB7XG4gICAgdmFyIHByb3BOYW1lID0gdWNmaXJzdChwcm9wKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XG5cbiAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG5cbiAgICAgICAgICAgIGlmIChpc1dpbmRvdyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50WyhcImlubmVyXCIgKyBwcm9wTmFtZSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXNEb2N1bWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciBkb2MgPSBlbGVtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoZG9jLm9mZnNldEhlaWdodCwgZG9jLnNjcm9sbEhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlID0gY3NzKGVsZW1lbnQsIHByb3ApO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ2F1dG8nID8gZWxlbWVudFsoXCJvZmZzZXRcIiArIHByb3BOYW1lKV0gOiB0b0Zsb2F0KHZhbHVlKSB8fCAwO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29udGVudFNpemUocHJvcCwgZWxlbWVudCwgdmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCBwcm9wLCAhdmFsdWUgJiYgdmFsdWUgIT09IDBcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiBnZXRDb250ZW50U2l6ZShwcm9wLCBlbGVtZW50LCB2YWx1ZSkgKyAncHgnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29udGVudFNpemUocHJvcCwgZWxlbWVudCwgdmFsdWUpIHtcbiAgICByZXR1cm4gY3NzKGVsZW1lbnQsICdib3hTaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnID8gZGlyc1twcm9wXS5zbGljZSgxKS5tYXAodWNmaXJzdCkucmVkdWNlKGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkgeyByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIC0gdG9GbG9hdChjc3MoZWxlbWVudCwgKFwicGFkZGluZ1wiICsgcHJvcCkpKVxuICAgICAgICAgICAgLSB0b0Zsb2F0KGNzcyhlbGVtZW50LCAoXCJib3JkZXJcIiArIHByb3AgKyBcIldpZHRoXCIpKSk7IH1cbiAgICAsIHZhbHVlKSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudCkge1xuICAgIHJldHVybiBpc1dpbmRvdyhlbGVtZW50KSA/IGVsZW1lbnQgOiBkb2N1bWVudCQxKGVsZW1lbnQpLmRlZmF1bHRWaWV3O1xufVxuXG5mdW5jdGlvbiBtb3ZlVG8ocG9zaXRpb24sIGF0dGFjaCwgZGltLCBmYWN0b3IpIHtcbiAgICBlYWNoKGRpcnMsIGZ1bmN0aW9uIChyZWYsIHByb3ApIHtcbiAgICAgICAgdmFyIGRpciA9IHJlZlswXTtcbiAgICAgICAgdmFyIGFsaWduID0gcmVmWzFdO1xuICAgICAgICB2YXIgYWxpZ25GbGlwID0gcmVmWzJdO1xuXG4gICAgICAgIGlmIChhdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwKSB7XG4gICAgICAgICAgICBwb3NpdGlvblthbGlnbl0gKz0gZGltW3Byb3BdICogZmFjdG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dGFjaFtkaXJdID09PSAnY2VudGVyJykge1xuICAgICAgICAgICAgcG9zaXRpb25bYWxpZ25dICs9IGRpbVtwcm9wXSAqIGZhY3RvciAvIDI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9zKHBvcykge1xuXG4gICAgdmFyIHggPSAvbGVmdHxjZW50ZXJ8cmlnaHQvLCB5ID0gL3RvcHxjZW50ZXJ8Ym90dG9tLztcblxuICAgIHBvcyA9IChwb3MgfHwgJycpLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAocG9zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBwb3MgPSB4LnRlc3QocG9zWzBdKVxuICAgICAgICAgICAgPyBwb3MuY29uY2F0KFsnY2VudGVyJ10pXG4gICAgICAgICAgICA6IHkudGVzdChwb3NbMF0pXG4gICAgICAgICAgICAgICAgPyBbJ2NlbnRlciddLmNvbmNhdChwb3MpXG4gICAgICAgICAgICAgICAgOiBbJ2NlbnRlcicsICdjZW50ZXInXTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4LnRlc3QocG9zWzBdKSA/IHBvc1swXSA6ICdjZW50ZXInLFxuICAgICAgICB5OiB5LnRlc3QocG9zWzFdKSA/IHBvc1sxXSA6ICdjZW50ZXInXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0cyhvZmZzZXRzLCB3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgICB2YXIgcmVmID0gKG9mZnNldHMgfHwgJycpLnNwbGl0KCcgJyk7XG4gICAgdmFyIHggPSByZWZbMF07XG4gICAgdmFyIHkgPSByZWZbMV07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4ID8gdG9GbG9hdCh4KSAqIChlbmRzV2l0aCh4LCAnJScpID8gd2lkdGggLyAxMDAgOiAxKSA6IDAsXG4gICAgICAgIHk6IHkgPyB0b0Zsb2F0KHkpICogKGVuZHNXaXRoKHksICclJykgPyBoZWlnaHQgLyAxMDAgOiAxKSA6IDBcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBmbGlwUG9zaXRpb24ocG9zKSB7XG4gICAgc3dpdGNoIChwb3MpIHtcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHJldHVybiAndG9wJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb2N1bWVudCQxKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdG9Ob2RlKGVsZW1lbnQpLm93bmVyRG9jdW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGRvY0VsJDEoZWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudCQxKGVsZW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbn1cblxuLypcbiAgICBCYXNlZCBvbjpcbiAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxNiBUaG9tYXMgRnVjaHNcbiAgICBodHRwOi8vemVwdG9qcy5jb20vXG4qL1xuXG52YXIgdG91Y2ggPSB7fTtcbnZhciBjbGlja1RpbWVvdXQ7XG52YXIgc3dpcGVUaW1lb3V0O1xudmFyIHRhcFRpbWVvdXQ7XG52YXIgY2xpY2tlZDtcblxuZnVuY3Rpb24gc3dpcGVEaXJlY3Rpb24ocmVmKSB7XG4gICAgdmFyIHgxID0gcmVmLngxO1xuICAgIHZhciB4MiA9IHJlZi54MjtcbiAgICB2YXIgeTEgPSByZWYueTE7XG4gICAgdmFyIHkyID0gcmVmLnkyO1xuXG4gICAgcmV0dXJuIE1hdGguYWJzKHgxIC0geDIpID49IE1hdGguYWJzKHkxIC0geTIpID8gKHgxIC0geDIgPiAwID8gJ0xlZnQnIDogJ1JpZ2h0JykgOiAoeTEgLSB5MiA+IDAgPyAnVXAnIDogJ0Rvd24nKTtcbn1cblxuZnVuY3Rpb24gY2FuY2VsQWxsKCkge1xuICAgIGNsaWNrVGltZW91dCAmJiBjbGVhclRpbWVvdXQoY2xpY2tUaW1lb3V0KTtcbiAgICBzd2lwZVRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHN3aXBlVGltZW91dCk7XG4gICAgdGFwVGltZW91dCAmJiBjbGVhclRpbWVvdXQodGFwVGltZW91dCk7XG4gICAgY2xpY2tUaW1lb3V0ID0gc3dpcGVUaW1lb3V0ID0gdGFwVGltZW91dCA9IG51bGw7XG4gICAgdG91Y2ggPSB7fTtcbn1cblxucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgb24oZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7IHJldHVybiBjbGlja2VkID0gdHJ1ZTsgfSwgdHJ1ZSk7XG5cbiAgICBvbihkb2MsIHBvaW50ZXJEb3duLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIHJlZiA9IGdldFBvcyQxKGUpO1xuICAgICAgICB2YXIgeCA9IHJlZi54O1xuICAgICAgICB2YXIgeSA9IHJlZi55O1xuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICB0b3VjaC5lbCA9ICd0YWdOYW1lJyBpbiB0YXJnZXQgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50Tm9kZTtcblxuICAgICAgICBjbGlja1RpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KGNsaWNrVGltZW91dCk7XG5cbiAgICAgICAgdG91Y2gueDEgPSB4O1xuICAgICAgICB0b3VjaC55MSA9IHk7XG5cbiAgICAgICAgaWYgKHRvdWNoLmxhc3QgJiYgbm93IC0gdG91Y2gubGFzdCA8PSAyNTApIHtcbiAgICAgICAgICAgIHRvdWNoID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0b3VjaC5sYXN0ID0gbm93O1xuXG4gICAgICAgIGNsaWNrZWQgPSBlLmJ1dHRvbiA+IDA7XG5cbiAgICB9KTtcblxuICAgIG9uKGRvYywgcG9pbnRlck1vdmUsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgdmFyIHJlZiA9IGdldFBvcyQxKGUpO1xuICAgICAgICB2YXIgeCA9IHJlZi54O1xuICAgICAgICB2YXIgeSA9IHJlZi55O1xuXG4gICAgICAgIHRvdWNoLngyID0geDtcbiAgICAgICAgdG91Y2gueTIgPSB5O1xuICAgIH0pO1xuXG4gICAgb24oZG9jLCBwb2ludGVyVXAsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cblxuICAgICAgICAvLyBzd2lwZVxuICAgICAgICBpZiAodG91Y2gueDIgJiYgTWF0aC5hYnModG91Y2gueDEgLSB0b3VjaC54MikgPiAzMCB8fCB0b3VjaC55MiAmJiBNYXRoLmFicyh0b3VjaC55MSAtIHRvdWNoLnkyKSA+IDMwKSB7XG5cbiAgICAgICAgICAgIHN3aXBlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaC5lbCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRvdWNoLmVsLCAnc3dpcGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0b3VjaC5lbCwgKFwic3dpcGVcIiArIChzd2lwZURpcmVjdGlvbih0b3VjaCkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvdWNoID0ge307XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBub3JtYWwgdGFwXG4gICAgICAgIH0gZWxzZSBpZiAoJ2xhc3QnIGluIHRvdWNoKSB7XG5cbiAgICAgICAgICAgIHRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvdWNoLmVsICYmIHRyaWdnZXIodG91Y2guZWwsICd0YXAnKTsgfSk7XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgc2luZ2xlIGNsaWNrIGFmdGVyIDM1MG1zIG9mIGluYWN0aXZpdHlcbiAgICAgICAgICAgIGlmICh0b3VjaC5lbCAmJiB3aXRoaW4odGFyZ2V0LCB0b3VjaC5lbCkpIHtcbiAgICAgICAgICAgICAgICBjbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdWNoLmVsICYmICFjbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRvdWNoLmVsLCAnY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IHt9O1xuICAgICAgICAgICAgICAgIH0sIDM1MCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvdWNoID0ge307XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG9uKGRvYywgJ3RvdWNoY2FuY2VsJywgY2FuY2VsQWxsKTtcbiAgICBvbih3aW4sICdzY3JvbGwnLCBjYW5jZWxBbGwpO1xufSk7XG5cbnZhciB0b3VjaGluZyA9IGZhbHNlO1xub24oZG9jLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRvdWNoaW5nID0gdHJ1ZTsgfSwgdHJ1ZSk7XG5vbihkb2MsICdjbGljaycsIGZ1bmN0aW9uICgpIHt0b3VjaGluZyA9IGZhbHNlO30pO1xub24oZG9jLCAndG91Y2hjYW5jZWwnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0b3VjaGluZyA9IGZhbHNlOyB9LCB0cnVlKTtcblxuZnVuY3Rpb24gaXNUb3VjaChlKSB7XG4gICAgcmV0dXJuIHRvdWNoaW5nIHx8IGUucG9pbnRlclR5cGUgPT09ICd0b3VjaCc7XG59XG5cbmZ1bmN0aW9uIGdldFBvcyQxKGUpIHtcbiAgICB2YXIgdG91Y2hlcyA9IGUudG91Y2hlcztcbiAgICB2YXIgY2hhbmdlZFRvdWNoZXMgPSBlLmNoYW5nZWRUb3VjaGVzO1xuICAgIFxuICAgIHZhciByZWYgPSB0b3VjaGVzICYmIHRvdWNoZXNbMF0gfHwgY2hhbmdlZFRvdWNoZXMgJiYgY2hhbmdlZFRvdWNoZXNbMF0gfHwgZTtcbiAgICB2YXIgeCA9IHJlZi5wYWdlWDtcbiAgICB2YXIgeSA9IHJlZi5wYWdlWTtcbiAgICByZXR1cm4ge3g6IHgsIHk6IHl9O1xufVxuXG5cblxudmFyIHV0aWwgPSBPYmplY3QuZnJlZXplKHtcblx0YmluZDogYmluZCxcblx0aGFzT3duOiBoYXNPd24sXG5cdFByb21pc2U6IFByb21pc2UsXG5cdGNsYXNzaWZ5OiBjbGFzc2lmeSxcblx0aHlwaGVuYXRlOiBoeXBoZW5hdGUsXG5cdGNhbWVsaXplOiBjYW1lbGl6ZSxcblx0dWNmaXJzdDogdWNmaXJzdCxcblx0c3RhcnRzV2l0aDogc3RhcnRzV2l0aCxcblx0ZW5kc1dpdGg6IGVuZHNXaXRoLFxuXHRpbmNsdWRlczogaW5jbHVkZXMsXG5cdGlzQXJyYXk6IGlzQXJyYXksXG5cdGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG5cdGlzT2JqZWN0OiBpc09iamVjdCxcblx0aXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcblx0aXNXaW5kb3c6IGlzV2luZG93LFxuXHRpc0RvY3VtZW50OiBpc0RvY3VtZW50LFxuXHRpc0Jvb2xlYW46IGlzQm9vbGVhbixcblx0aXNTdHJpbmc6IGlzU3RyaW5nLFxuXHRpc051bWJlcjogaXNOdW1iZXIsXG5cdGlzTnVtZXJpYzogaXNOdW1lcmljLFxuXHRpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG5cdHRvQm9vbGVhbjogdG9Cb29sZWFuLFxuXHR0b051bWJlcjogdG9OdW1iZXIsXG5cdHRvRmxvYXQ6IHRvRmxvYXQsXG5cdHRvTGlzdDogdG9MaXN0LFxuXHR0b01lZGlhOiB0b01lZGlhLFxuXHRjb2VyY2U6IGNvZXJjZSxcblx0dG9NczogdG9Ncyxcblx0c3dhcDogc3dhcCxcblx0YXNzaWduOiBhc3NpZ24sXG5cdGVhY2g6IGVhY2gsXG5cdGNsYW1wOiBjbGFtcCxcblx0bm9vcDogbm9vcCxcblx0aW50ZXJzZWN0UmVjdDogaW50ZXJzZWN0UmVjdCxcblx0cG9pbnRJblJlY3Q6IHBvaW50SW5SZWN0LFxuXHRhamF4OiBhamF4LFxuXHQkOiAkJDEsXG5cdCQkOiAkJCxcblx0cXVlcnk6IHF1ZXJ5LFxuXHRxdWVyeUFsbDogcXVlcnlBbGwsXG5cdGZpbHRlcjogZmlsdGVyLFxuXHR3aXRoaW46IHdpdGhpbixcblx0bWF0Y2hlczogbWF0Y2hlcyxcblx0Y2xvc2VzdDogY2xvc2VzdCxcblx0cGFyZW50czogcGFyZW50cyxcblx0aXNKUXVlcnk6IGlzSlF1ZXJ5LFxuXHR0b05vZGU6IHRvTm9kZSxcblx0dG9Ob2RlczogdG9Ob2Rlcyxcblx0YXR0cjogYXR0cixcblx0aGFzQXR0cjogaGFzQXR0cixcblx0cmVtb3ZlQXR0cjogcmVtb3ZlQXR0cixcblx0ZmlsdGVyQXR0cjogZmlsdGVyQXR0cixcblx0ZGF0YTogZGF0YSxcblx0d2luOiB3aW4sXG5cdGRvYzogZG9jLFxuXHRkb2NFbDogZG9jRWwsXG5cdGlzUnRsOiBpc1J0bCxcblx0aXNSZWFkeTogaXNSZWFkeSxcblx0cmVhZHk6IHJlYWR5LFxuXHR0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuXHRUcmFuc2l0aW9uOiBUcmFuc2l0aW9uLFxuXHRhbmltYXRlOiBhbmltYXRlLFxuXHRBbmltYXRpb246IEFuaW1hdGlvbixcblx0aXNJblZpZXc6IGlzSW5WaWV3LFxuXHRzY3JvbGxlZE92ZXI6IHNjcm9sbGVkT3Zlcixcblx0Z2V0SW5kZXg6IGdldEluZGV4LFxuXHRpc1ZvaWRFbGVtZW50OiBpc1ZvaWRFbGVtZW50LFxuXHREaW1lbnNpb25zOiBEaW1lbnNpb25zLFxuXHRwcmV2ZW50Q2xpY2s6IHByZXZlbnRDbGljayxcblx0aXNWaXNpYmxlOiBpc1Zpc2libGUsXG5cdHNlbElucHV0OiBzZWxJbnB1dCxcblx0aXNJbnB1dDogaXNJbnB1dCxcblx0ZW1wdHk6IGVtcHR5LFxuXHRodG1sOiBodG1sLFxuXHRwcmVwZW5kOiBwcmVwZW5kLFxuXHRhcHBlbmQ6IGFwcGVuZCxcblx0YmVmb3JlOiBiZWZvcmUsXG5cdGFmdGVyOiBhZnRlcixcblx0cmVtb3ZlOiByZW1vdmUsXG5cdHdyYXBBbGw6IHdyYXBBbGwsXG5cdHdyYXBJbm5lcjogd3JhcElubmVyLFxuXHR1bndyYXA6IHVud3JhcCxcblx0ZnJhZ21lbnQ6IGZyYWdtZW50LFxuXHRpbmRleDogaW5kZXgsXG5cdGNzczogY3NzLFxuXHRnZXRTdHlsZXM6IGdldFN0eWxlcyxcblx0Z2V0U3R5bGU6IGdldFN0eWxlLFxuXHRnZXRDc3NWYXI6IGdldENzc1Zhcixcblx0YWRkQ2xhc3M6IGFkZENsYXNzLFxuXHRyZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG5cdHJlbW92ZUNsYXNzZXM6IHJlbW92ZUNsYXNzZXMsXG5cdHJlcGxhY2VDbGFzczogcmVwbGFjZUNsYXNzLFxuXHRoYXNDbGFzczogaGFzQ2xhc3MsXG5cdHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyxcblx0T2JzZXJ2ZXI6IE9ic2VydmVyLFxuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWU6IHJlcXVlc3RBbmltYXRpb25GcmFtZSxcblx0aGFzVG91Y2g6IGhhc1RvdWNoLFxuXHRwb2ludGVyRG93bjogcG9pbnRlckRvd24sXG5cdHBvaW50ZXJNb3ZlOiBwb2ludGVyTW92ZSxcblx0cG9pbnRlclVwOiBwb2ludGVyVXAsXG5cdHBvaW50ZXJFbnRlcjogcG9pbnRlckVudGVyLFxuXHRwb2ludGVyTGVhdmU6IHBvaW50ZXJMZWF2ZSxcblx0dHJhbnNpdGlvbmVuZDogdHJhbnNpdGlvbmVuZCxcblx0YW5pbWF0aW9uc3RhcnQ6IGFuaW1hdGlvbnN0YXJ0LFxuXHRhbmltYXRpb25lbmQ6IGFuaW1hdGlvbmVuZCxcblx0Z2V0SW1hZ2U6IGdldEltYWdlLFxuXHRvbjogb24sXG5cdG9mZjogb2ZmLFxuXHRvbmNlOiBvbmNlLFxuXHR0cmlnZ2VyOiB0cmlnZ2VyLFxuXHRjcmVhdGVFdmVudDogY3JlYXRlRXZlbnQsXG5cdHRvRXZlbnRUYXJnZXRzOiB0b0V2ZW50VGFyZ2V0cyxcblx0ZmFzdGRvbTogZmFzdGRvbSxcblx0TW91c2VUcmFja2VyOiBNb3VzZVRyYWNrZXIsXG5cdG1lcmdlT3B0aW9uczogbWVyZ2VPcHRpb25zLFxuXHRQbGF5ZXI6IFBsYXllcixcblx0cG9zaXRpb25BdDogcG9zaXRpb25BdCxcblx0b2Zmc2V0OiBvZmZzZXQsXG5cdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0aGVpZ2h0OiBoZWlnaHQsXG5cdHdpZHRoOiB3aWR0aCxcblx0ZmxpcFBvc2l0aW9uOiBmbGlwUG9zaXRpb24sXG5cdGlzVG91Y2g6IGlzVG91Y2gsXG5cdGdldFBvczogZ2V0UG9zJDFcbn0pO1xuXG52YXIgYm9vdCA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIGNvbm5lY3QgPSBVSWtpdC5jb25uZWN0O1xuICAgIHZhciBkaXNjb25uZWN0ID0gVUlraXQuZGlzY29ubmVjdDtcblxuICAgIGlmIChPYnNlcnZlcikge1xuXG4gICAgICAgIGlmIChkb2MuYm9keSkge1xuXG4gICAgICAgICAgICBpbml0KCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgKG5ldyBPYnNlcnZlcihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZG9jLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pKS5vYnNlcnZlKGRvY0VsLCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhcHBseShkb2MuYm9keSwgY29ubmVjdCk7XG4gICAgICAgICAgICBvbihkb2NFbCwgJ0RPTU5vZGVJbnNlcnRlZCcsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBhcHBseShlLnRhcmdldCwgY29ubmVjdCk7IH0pO1xuICAgICAgICAgICAgb24oZG9jRWwsICdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBhcHBseShlLnRhcmdldCwgZGlzY29ubmVjdCk7IH0pO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgICAgICAgYXBwbHkoZG9jLmJvZHksIGNvbm5lY3QpO1xuXG4gICAgICAgIGZhc3Rkb20uZmx1c2goKTtcblxuICAgICAgICAobmV3IE9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHsgcmV0dXJuIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRkZWROb2RlcyA9IHJlZi5hZGRlZE5vZGVzO1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVkTm9kZXMgPSByZWYucmVtb3ZlZE5vZGVzO1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkZGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHkoYWRkZWROb2Rlc1tpXSwgY29ubmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlbW92ZWROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBhcHBseShyZW1vdmVkTm9kZXNbaV0sIGRpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFVJa2l0LnVwZGF0ZShjcmVhdGVFdmVudCgndXBkYXRlJywgdHJ1ZSwgZmFsc2UsIHttdXRhdGlvbjogdHJ1ZX0pLCB0YXJnZXQsIHRydWUpO1xuXG4gICAgICAgICAgICB9KTsgfVxuICAgICAgICApKS5vYnNlcnZlKGRvY0VsLCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnaHJlZiddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFVJa2l0Ll9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHkobm9kZSwgZm4pIHtcblxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSB8fCBoYXNBdHRyKG5vZGUsICd1ay1uby1ib290JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZuKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBhcHBseShub2RlLCBmbik7XG4gICAgICAgICAgICBub2RlID0gbmV4dDtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxudmFyIGdsb2JhbEFQSSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIERBVEEgPSBVSWtpdC5kYXRhO1xuXG4gICAgVUlraXQudXNlID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXG4gICAgICAgIGlmIChwbHVnaW4uaW5zdGFsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwbHVnaW4uY2FsbChudWxsLCB0aGlzKTtcbiAgICAgICAgcGx1Z2luLmluc3RhbGxlZCA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1peGluID0gZnVuY3Rpb24gKG1peGluLCBjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50ID0gKGlzU3RyaW5nKGNvbXBvbmVudCkgPyBVSWtpdC5jb21wb25lbnRzW2NvbXBvbmVudF0gOiBjb21wb25lbnQpIHx8IHRoaXM7XG4gICAgICAgIG1peGluID0gbWVyZ2VPcHRpb25zKHt9LCBtaXhpbik7XG4gICAgICAgIG1peGluLm1peGlucyA9IGNvbXBvbmVudC5vcHRpb25zLm1peGlucztcbiAgICAgICAgZGVsZXRlIGNvbXBvbmVudC5vcHRpb25zLm1peGlucztcbiAgICAgICAgY29tcG9uZW50Lm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMobWl4aW4sIGNvbXBvbmVudC5vcHRpb25zKTtcbiAgICB9O1xuXG4gICAgVUlraXQuZXh0ZW5kID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICB2YXIgU3VwZXIgPSB0aGlzLCBuYW1lID0gb3B0aW9ucy5uYW1lIHx8IFN1cGVyLm9wdGlvbnMubmFtZTtcbiAgICAgICAgdmFyIFN1YiA9IGNyZWF0ZUNsYXNzKG5hbWUgfHwgJ1VJa2l0Q29tcG9uZW50Jyk7XG5cbiAgICAgICAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgICAgICAgU3ViLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1YjtcbiAgICAgICAgU3ViLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoU3VwZXIub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgU3ViWydzdXBlciddID0gU3VwZXI7XG4gICAgICAgIFN1Yi5leHRlbmQgPSBTdXBlci5leHRlbmQ7XG5cbiAgICAgICAgcmV0dXJuIFN1YjtcbiAgICB9O1xuXG4gICAgVUlraXQudXBkYXRlID0gZnVuY3Rpb24gKGUsIGVsZW1lbnQsIHBhcmVudHMpIHtcbiAgICAgICAgaWYgKCBwYXJlbnRzID09PSB2b2lkIDAgKSBwYXJlbnRzID0gZmFsc2U7XG5cblxuICAgICAgICBlID0gY3JlYXRlRXZlbnQoZSB8fCAndXBkYXRlJyk7XG5cbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIHVwZGF0ZShVSWtpdC5pbnN0YW5jZXMsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChwYXJlbnRzKSB7XG5cbiAgICAgICAgICAgIGRvIHtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZShlbGVtZW50W0RBVEFdLCBlKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgICB9IHdoaWxlIChlbGVtZW50KVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGFwcGx5KGVsZW1lbnQsIGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiB1cGRhdGUoZWxlbWVudFtEQVRBXSwgZSk7IH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB2YXIgY29udGFpbmVyO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSWtpdCwgJ2NvbnRhaW5lcicsIHtcblxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXIgfHwgZG9jLmJvZHk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbWVudCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oKFwicmV0dXJuIGZ1bmN0aW9uIFwiICsgKGNsYXNzaWZ5KG5hbWUpKSArIFwiIChvcHRpb25zKSB7IHRoaXMuX2luaXQob3B0aW9ucyk7IH1cIikpKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHkobm9kZSwgZm4pIHtcblxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm4obm9kZSk7XG4gICAgICAgIG5vZGUgPSBub2RlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICAgICAgYXBwbHkobm9kZSwgZm4pO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKGRhdGEsIGUpIHtcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGFbbmFtZV0uX2lzUmVhZHkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW25hbWVdLl9jYWxsVXBkYXRlKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbnZhciBob29rc0FQSSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9jYWxsSG9vayA9IGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy4kb3B0aW9uc1tob29rXTtcblxuICAgICAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzJDEpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxSZWFkeSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAodGhpcy5faXNSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdyZWFkeScpO1xuICAgICAgICB0aGlzLl9jYWxsVXBkYXRlKCk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbENvbm5lY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICBpZiAodGhpcy5fY29ubmVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluY2x1ZGVzKFVJa2l0LmVsZW1lbnRzLCB0aGlzLiRvcHRpb25zLmVsKSkge1xuICAgICAgICAgICAgVUlraXQuZWxlbWVudHMucHVzaCh0aGlzLiRvcHRpb25zLmVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFVJa2l0Lmluc3RhbmNlc1t0aGlzLl91aWRdID0gdGhpcztcblxuICAgICAgICB0aGlzLl9pbml0RXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2Nvbm5lY3RlZCcpO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2luaXRPYnNlcnZlcigpO1xuXG4gICAgICAgIGlmICghdGhpcy5faXNSZWFkeSkge1xuICAgICAgICAgICAgcmVhZHkoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl9jYWxsUmVhZHkoKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWxsVXBkYXRlKCk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbERpc2Nvbm5lY3RlZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSBVSWtpdC5lbGVtZW50cy5pbmRleE9mKHRoaXMuJG9wdGlvbnMuZWwpO1xuXG4gICAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgICAgIFVJa2l0LmVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgVUlraXQuaW5zdGFuY2VzW3RoaXMuX3VpZF07XG5cbiAgICAgICAgdGhpcy5fdW5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdkaXNjb25uZWN0ZWQnKTtcblxuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcblxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxVcGRhdGUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIGUgPSBjcmVhdGVFdmVudChlIHx8ICd1cGRhdGUnKTtcblxuICAgICAgICB2YXIgdHlwZSA9IGUudHlwZTtcbiAgICAgICAgdmFyIGRldGFpbCA9IGUuZGV0YWlsO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAndXBkYXRlJyAmJiBkZXRhaWwgJiYgZGV0YWlsLm11dGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlZHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cGRhdGVzID0gdGhpcy4kb3B0aW9ucy51cGRhdGU7XG5cbiAgICAgICAgaWYgKCF1cGRhdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVzLmZvckVhY2goZnVuY3Rpb24gKHVwZGF0ZSwgaSkge1xuXG4gICAgICAgICAgICBpZiAodHlwZSAhPT0gJ3VwZGF0ZScgJiYgIWluY2x1ZGVzKHVwZGF0ZS5ldmVudHMsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXBkYXRlLnJlYWQgJiYgIWluY2x1ZGVzKGZhc3Rkb20ucmVhZHMsIHRoaXMkMS5fZnJhbWVzLnJlYWRzW2ldKSkge1xuICAgICAgICAgICAgICAgIHRoaXMkMS5fZnJhbWVzLnJlYWRzW2ldID0gZmFzdGRvbS5tZWFzdXJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnJlYWQuY2FsbCh0aGlzJDEsIGUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcyQxLl9mcmFtZXMucmVhZHNbaV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cGRhdGUud3JpdGUgJiYgIWluY2x1ZGVzKGZhc3Rkb20ud3JpdGVzLCB0aGlzJDEuX2ZyYW1lcy53cml0ZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcyQxLl9mcmFtZXMud3JpdGVzW2ldID0gZmFzdGRvbS5tdXRhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUud3JpdGUuY2FsbCh0aGlzJDEsIGUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcyQxLl9mcmFtZXMud3JpdGVzW2ldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufTtcblxudmFyIHN0YXRlQVBJID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgdWlkID0gMDtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5wcm9wcyA9IHt9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5jb25zdHJ1Y3Rvci5vcHRpb25zLCBvcHRpb25zLCB0aGlzKTtcblxuICAgICAgICB0aGlzLiRlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuJG5hbWUgPSBVSWtpdC5wcmVmaXggKyBoeXBoZW5hdGUodGhpcy4kb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgdGhpcy4kcHJvcHMgPSB7fTtcblxuICAgICAgICB0aGlzLl9mcmFtZXMgPSB7cmVhZHM6IHt9LCB3cml0ZXM6IHt9fTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gW107XG5cbiAgICAgICAgdGhpcy5fdWlkID0gdWlkKys7XG4gICAgICAgIHRoaXMuX2luaXREYXRhKCk7XG4gICAgICAgIHRoaXMuX2luaXRNZXRob2RzKCk7XG4gICAgICAgIHRoaXMuX2luaXRDb21wdXRlZHMoKTtcbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2NyZWF0ZWQnKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5lbCkge1xuICAgICAgICAgICAgdGhpcy4kbW91bnQob3B0aW9ucy5lbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgcmVmID0gdGhpcy4kb3B0aW9ucztcbiAgICAgICAgdmFyIGRlZmF1bHRzID0gcmVmLmRlZmF1bHRzO1xuICAgICAgICB2YXIgZGF0YSQkMSA9IHJlZi5kYXRhOyBpZiAoIGRhdGEkJDEgPT09IHZvaWQgMCApIGRhdGEkJDEgPSB7fTtcbiAgICAgICAgdmFyIGFyZ3MgPSByZWYuYXJnczsgaWYgKCBhcmdzID09PSB2b2lkIDAgKSBhcmdzID0gW107XG4gICAgICAgIHZhciBwcm9wcyA9IHJlZi5wcm9wczsgaWYgKCBwcm9wcyA9PT0gdm9pZCAwICkgcHJvcHMgPSB7fTtcbiAgICAgICAgdmFyIGVsID0gcmVmLmVsO1xuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCAmJiBpc0FycmF5KGRhdGEkJDEpKSB7XG4gICAgICAgICAgICBkYXRhJCQxID0gZGF0YSQkMS5zbGljZSgwLCBhcmdzLmxlbmd0aCkucmVkdWNlKGZ1bmN0aW9uIChkYXRhJCQxLCB2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduKGRhdGEkJDEsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRhJCQxW2FyZ3NbaW5kZXhdXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSQkMTtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkZWZhdWx0cykge1xuICAgICAgICAgICAgdGhpcyQxLiRwcm9wc1trZXldID0gdGhpcyQxW2tleV0gPSBoYXNPd24oZGF0YSQkMSwga2V5KSAmJiAhaXNVbmRlZmluZWQoZGF0YSQkMVtrZXldKVxuICAgICAgICAgICAgICAgID8gY29lcmNlKHByb3BzW2tleV0sIGRhdGEkJDFba2V5XSwgZWwpXG4gICAgICAgICAgICAgICAgOiBpc0FycmF5KGRlZmF1bHRzW2tleV0pXG4gICAgICAgICAgICAgICAgICAgID8gZGVmYXVsdHNba2V5XS5jb25jYXQoKVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRzW2tleV07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgbWV0aG9kcyA9IHRoaXMuJG9wdGlvbnMubWV0aG9kcztcblxuICAgICAgICBpZiAobWV0aG9kcykge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzJDFba2V5XSA9IGJpbmQobWV0aG9kc1trZXldLCB0aGlzJDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdENvbXB1dGVkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgY29tcHV0ZWQgPSB0aGlzLiRvcHRpb25zLmNvbXB1dGVkO1xuXG4gICAgICAgIHRoaXMuX2NvbXB1dGVkcyA9IHt9O1xuXG4gICAgICAgIGlmIChjb21wdXRlZCkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJDb21wdXRlZCh0aGlzJDEsIGtleSwgY29tcHV0ZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0UHJvcHMgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB0aGlzLl9jb21wdXRlZHMgPSB7fTtcbiAgICAgICAgYXNzaWduKHRoaXMuJHByb3BzLCBwcm9wcyB8fCBnZXRQcm9wcyh0aGlzLiRvcHRpb25zLCB0aGlzLiRuYW1lKSk7XG5cbiAgICAgICAgdmFyIGV4Y2x1ZGUgPSBbdGhpcy4kb3B0aW9ucy5jb21wdXRlZCwgdGhpcy4kb3B0aW9ucy5tZXRob2RzXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMkMS4kcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChub3RJbihleGNsdWRlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcyQxW2tleV0gPSB0aGlzJDEuJHByb3BzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLiRvcHRpb25zLmV2ZW50cztcblxuICAgICAgICBpZiAoZXZlbnRzKSB7XG5cbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oZXZlbnQsICdoYW5kbGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlckV2ZW50KHRoaXMkMSwgZXZlbnRba2V5XSwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRXZlbnQodGhpcyQxLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX3VuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKHVuYmluZCkgeyByZXR1cm4gdW5iaW5kKCk7IH0pO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBbXTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9pbml0T2JzZXJ2ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBhdHRycyA9IHJlZi5hdHRycztcbiAgICAgICAgdmFyIHByb3BzID0gcmVmLnByb3BzO1xuICAgICAgICB2YXIgZWwgPSByZWYuZWw7XG4gICAgICAgIGlmICh0aGlzLl9vYnNlcnZlciB8fCAhcHJvcHMgfHwgIWF0dHJzIHx8ICFPYnNlcnZlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXR0cnMgPSBpc0FycmF5KGF0dHJzKSA/IGF0dHJzIDogT2JqZWN0LmtleXMocHJvcHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBoeXBoZW5hdGUoa2V5KTsgfSk7XG5cbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgZGF0YSQkMSA9IGdldFByb3BzKHRoaXMkMS4kb3B0aW9ucywgdGhpcyQxLiRuYW1lKTtcbiAgICAgICAgICAgIGlmIChhdHRycy5zb21lKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICFpc1VuZGVmaW5lZChkYXRhJCQxW2tleV0pICYmIGRhdGEkJDFba2V5XSAhPT0gdGhpcyQxLiRwcm9wc1trZXldOyB9KSkge1xuICAgICAgICAgICAgICAgIHRoaXMkMS4kcmVzZXQoZGF0YSQkMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge2F0dHJpYnV0ZXM6IHRydWUsIGF0dHJpYnV0ZUZpbHRlcjogYXR0cnMuY29uY2F0KFt0aGlzLiRuYW1lLCAoXCJkYXRhLVwiICsgKHRoaXMuJG5hbWUpKV0pfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFByb3BzKG9wdHMsIG5hbWUpIHtcblxuICAgICAgICB2YXIgZGF0YSQkMSA9IHt9O1xuICAgICAgICB2YXIgYXJncyA9IG9wdHMuYXJnczsgaWYgKCBhcmdzID09PSB2b2lkIDAgKSBhcmdzID0gW107XG4gICAgICAgIHZhciBwcm9wcyA9IG9wdHMucHJvcHM7IGlmICggcHJvcHMgPT09IHZvaWQgMCApIHByb3BzID0ge307XG4gICAgICAgIHZhciBlbCA9IG9wdHMuZWw7XG4gICAgICAgIHZhciBrZXksIHByb3A7XG5cbiAgICAgICAgaWYgKCFwcm9wcykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEkJDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgcHJvcCA9IGh5cGhlbmF0ZShrZXkpO1xuICAgICAgICAgICAgaWYgKGhhc0F0dHIoZWwsIHByb3ApKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2VyY2UocHJvcHNba2V5XSwgYXR0cihlbCwgcHJvcCksIGVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAndGFyZ2V0JyAmJiAoIXZhbHVlIHx8IHN0YXJ0c1dpdGgodmFsdWUsICdfJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRhdGEkJDFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMoZGF0YShlbCwgbmFtZSksIGFyZ3MpO1xuXG4gICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHByb3AgPSBjYW1lbGl6ZShrZXkpO1xuICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkYXRhJCQxW3Byb3BdID0gY29lcmNlKHByb3BzW3Byb3BdLCBvcHRpb25zW2tleV0sIGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhJCQxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlT3B0aW9ucyhvcHRpb25zLCBhcmdzKSB7XG4gICAgICAgIGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xuXG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgcmV0dXJuICFvcHRpb25zXG4gICAgICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgICAgIDogc3RhcnRzV2l0aChvcHRpb25zLCAneycpXG4gICAgICAgICAgICAgICAgICAgID8gSlNPTi5wYXJzZShvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICA6IGFyZ3MubGVuZ3RoICYmICFpbmNsdWRlcyhvcHRpb25zLCAnOicpXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICgoIG9iaiA9IHt9LCBvYmpbYXJnc1swXV0gPSBvcHRpb25zLCBvYmogKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucy5zcGxpdCgnOycpLnJlZHVjZShmdW5jdGlvbiAob3B0aW9ucywgb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IG9wdGlvbi5zcGxpdCgvOiguKykvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gcmVmWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHJlZlsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5LnRyaW0oKV0gPSB2YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgdmFyIG9iajtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcHV0ZWQoY29tcG9uZW50LCBrZXksIGNiKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wb25lbnQsIGtleSwge1xuXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBfY29tcHV0ZWRzID0gY29tcG9uZW50Ll9jb21wdXRlZHM7XG4gICAgICAgICAgICAgICAgdmFyICRwcm9wcyA9IGNvbXBvbmVudC4kcHJvcHM7XG4gICAgICAgICAgICAgICAgdmFyICRlbCA9IGNvbXBvbmVudC4kZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc093bihfY29tcHV0ZWRzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb21wdXRlZHNba2V5XSA9IGNiLmNhbGwoY29tcG9uZW50LCAkcHJvcHMsICRlbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb21wdXRlZHNba2V5XTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50Ll9jb21wdXRlZHNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQoY29tcG9uZW50LCBldmVudCwga2V5KSB7XG5cbiAgICAgICAgaWYgKCFpc1BsYWluT2JqZWN0KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQgPSAoe25hbWU6IGtleSwgaGFuZGxlcjogZXZlbnR9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuYW1lID0gZXZlbnQubmFtZTtcbiAgICAgICAgdmFyIGVsID0gZXZlbnQuZWw7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGV2ZW50LmRlbGVnYXRlO1xuICAgICAgICB2YXIgc2VsZiA9IGV2ZW50LnNlbGY7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBldmVudC5maWx0ZXI7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZXZlbnQuaGFuZGxlcjtcbiAgICAgICAgZWwgPSBpc0Z1bmN0aW9uKGVsKVxuICAgICAgICAgICAgPyBlbC5jYWxsKGNvbXBvbmVudClcbiAgICAgICAgICAgIDogZWwgfHwgY29tcG9uZW50LiRlbDtcblxuICAgICAgICBpZiAoaXNBcnJheShlbCkpIHtcbiAgICAgICAgICAgIGVsLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiByZWdpc3RlckV2ZW50KGNvbXBvbmVudCwgYXNzaWduKHt9LCBldmVudCwge2VsOiBlbH0pLCBrZXkpOyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZWwgfHwgZmlsdGVyICYmICFmaWx0ZXIuY2FsbChjb21wb25lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVyID0gZGV0YWlsKGlzU3RyaW5nKGhhbmRsZXIpID8gY29tcG9uZW50W2hhbmRsZXJdIDogYmluZChoYW5kbGVyLCBjb21wb25lbnQpKTtcblxuICAgICAgICBpZiAoc2VsZikge1xuICAgICAgICAgICAgaGFuZGxlciA9IHNlbGZGaWx0ZXIoaGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnQuX2V2ZW50cy5wdXNoKFxuICAgICAgICAgICAgb24oXG4gICAgICAgICAgICAgICAgZWwsXG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAhZGVsZWdhdGVcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogaXNTdHJpbmcoZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGRlbGVnYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGRlbGVnYXRlLmNhbGwoY29tcG9uZW50KSxcbiAgICAgICAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxmRmlsdGVyKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbGZIYW5kbGVyKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0IHx8IGUudGFyZ2V0ID09PSBlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlci5jYWxsKG51bGwsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm90SW4ob3B0aW9ucywga2V5KSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmV2ZXJ5KGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuICFhcnIgfHwgIWhhc093bihhcnIsIGtleSk7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRldGFpbChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGlzQXJyYXkoZS5kZXRhaWwpID8gbGlzdGVuZXIuYXBwbHkobGlzdGVuZXIsIFtlXS5jb25jYXQoZS5kZXRhaWwpKSA6IGxpc3RlbmVyKGUpOyB9O1xuICAgIH1cblxufTtcblxudmFyIGluc3RhbmNlQVBJID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJG1vdW50ID0gZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLiRvcHRpb25zLm5hbWU7XG5cbiAgICAgICAgaWYgKCFlbFtEQVRBXSkge1xuICAgICAgICAgICAgZWxbREFUQV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbFtEQVRBXVtuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxbREFUQV1bbmFtZV0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGVsID0gdGhpcy4kb3B0aW9ucy5lbCA9IHRoaXMuJG9wdGlvbnMuZWwgfHwgZWw7XG5cbiAgICAgICAgdGhpcy5faW5pdFByb3BzKCk7XG5cbiAgICAgICAgdGhpcy5fY2FsbEhvb2soJ2luaXQnKTtcblxuICAgICAgICBpZiAod2l0aGluKGVsLCBkb2NFbCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxDb25uZWN0ZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLl9jYWxsVXBkYXRlKGUpO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJHVwZGF0ZSA9IGZ1bmN0aW9uIChlLCBwYXJlbnRzKSB7XG4gICAgICAgIFVJa2l0LnVwZGF0ZShlLCB0aGlzLiRvcHRpb25zLmVsLCBwYXJlbnRzKTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLiRyZXNldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2NhbGxEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgdGhpcy5faW5pdFByb3BzKGRhdGEpO1xuICAgICAgICB0aGlzLl9jYWxsQ29ubmVjdGVkKCk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS4kZGVzdHJveSA9IGZ1bmN0aW9uIChyZW1vdmVFbCkge1xuICAgICAgICBpZiAoIHJlbW92ZUVsID09PSB2b2lkIDAgKSByZW1vdmVFbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBlbCA9IHJlZi5lbDtcbiAgICAgICAgdmFyIG5hbWUgPSByZWYubmFtZTtcblxuICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxEaXNjb25uZWN0ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgaWYgKCFlbCB8fCAhZWxbREFUQV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBlbFtEQVRBXVtuYW1lXTtcblxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGVsW0RBVEFdKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBlbFtEQVRBXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZW1vdmVFbCkge1xuICAgICAgICAgICAgcmVtb3ZlKHRoaXMuJGVsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn07XG5cbnZhciBjb21wb25lbnRBUEkgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBEQVRBID0gVUlraXQuZGF0YTtcblxuICAgIFVJa2l0LmNvbXBvbmVudHMgPSB7fTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCA9IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuXG4gICAgICAgIHZhciBuYW1lID0gY2FtZWxpemUoaWQpO1xuXG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgb3B0aW9ucyA9IFVJa2l0LmV4dGVuZChvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VuZGVmaW5lZChvcHRpb25zKSkge1xuICAgICAgICAgICAgcmV0dXJuIFVJa2l0LmNvbXBvbmVudHNbbmFtZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMub3B0aW9ucy5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIFVJa2l0LmNvbXBvbmVudHNbbmFtZV0gPSBvcHRpb25zO1xuXG4gICAgICAgIFVJa2l0W25hbWVdID0gZnVuY3Rpb24gKGVsZW1lbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCwgYXJnc0FycmF5ID0gQXJyYXkoaSk7XG4gICAgICAgICAgICB3aGlsZSAoIGktLSApIGFyZ3NBcnJheVtpXSA9IGFyZ3VtZW50c1tpXTtcblxuXG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVUlraXQuY29tcG9uZW50c1tuYW1lXSh7ZGF0YTogZWxlbWVudH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoVUlraXQuY29tcG9uZW50c1tuYW1lXS5vcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJa2l0LmNvbXBvbmVudHNbbmFtZV0oe2RhdGE6IFtdLmNvbmNhdCggYXJnc0FycmF5ICl9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA/IGluaXQoZWxlbWVudCkgOiAkJChlbGVtZW50KS5tYXAoaW5pdClbMF07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXQoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVSWtpdC5nZXRDb21wb25lbnQoZWxlbWVudCwgbmFtZSkgfHwgbmV3IFVJa2l0LmNvbXBvbmVudHNbbmFtZV0oe2VsOiBlbGVtZW50LCBkYXRhOiBkYXRhIHx8IHt9fSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoVUlraXQuX2luaXRpYWxpemVkICYmICFvcHRpb25zLm9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgICAgICAgZmFzdGRvbS5tZWFzdXJlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIFVJa2l0W25hbWVdKChcIlt1ay1cIiArIGlkICsgXCJdLFtkYXRhLXVrLVwiICsgaWQgKyBcIl1cIikpOyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVSWtpdC5jb21wb25lbnRzW25hbWVdO1xuICAgIH07XG5cbiAgICBVSWtpdC5nZXRDb21wb25lbnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQgJiYgKGVsZW1lbnQgPSBpc0pRdWVyeShlbGVtZW50KSA/IGVsZW1lbnRbMF0gOiBlbGVtZW50KSAmJiBlbGVtZW50W0RBVEFdIHx8IHt9OyB9O1xuICAgIFVJa2l0LmdldENvbXBvbmVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lKSB7IHJldHVybiBVSWtpdC5nZXRDb21wb25lbnRzKGVsZW1lbnQpW25hbWVdOyB9O1xuXG4gICAgVUlraXQuY29ubmVjdCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgICAgICAgdmFyIG5hbWU7XG5cbiAgICAgICAgaWYgKG5vZGVbREFUQV0pIHtcbiAgICAgICAgICAgIGZvciAobmFtZSBpbiBub2RlW0RBVEFdKSB7XG4gICAgICAgICAgICAgICAgbm9kZVtEQVRBXVtuYW1lXS5fY2FsbENvbm5lY3RlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgbmFtZSA9IG5vZGUuYXR0cmlidXRlc1tpXS5uYW1lO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRzV2l0aChuYW1lLCAndWstJykgfHwgc3RhcnRzV2l0aChuYW1lLCAnZGF0YS11ay0nKSkge1xuXG4gICAgICAgICAgICAgICAgbmFtZSA9IGNhbWVsaXplKG5hbWUucmVwbGFjZSgnZGF0YS11ay0nLCAnJykucmVwbGFjZSgndWstJywgJycpKTtcblxuICAgICAgICAgICAgICAgIGlmIChVSWtpdFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBVSWtpdFtuYW1lXShub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBVSWtpdC5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBub2RlW0RBVEFdKSB7XG4gICAgICAgICAgICBub2RlW0RBVEFdW25hbWVdLl9jYWxsRGlzY29ubmVjdGVkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59O1xuXG52YXIgVUlraXQkMiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdGhpcy5faW5pdChvcHRpb25zKTtcbn07XG5cblVJa2l0JDIudXRpbCA9IHV0aWw7XG5VSWtpdCQyLmRhdGEgPSAnX191aWtpdF9fJztcblVJa2l0JDIucHJlZml4ID0gJ3VrLSc7XG5VSWtpdCQyLm9wdGlvbnMgPSB7fTtcblVJa2l0JDIuaW5zdGFuY2VzID0ge307XG5VSWtpdCQyLmVsZW1lbnRzID0gW107XG5cbmdsb2JhbEFQSShVSWtpdCQyKTtcbmhvb2tzQVBJKFVJa2l0JDIpO1xuc3RhdGVBUEkoVUlraXQkMik7XG5pbnN0YW5jZUFQSShVSWtpdCQyKTtcbmNvbXBvbmVudEFQSShVSWtpdCQyKTtcblxudmFyIENsYXNzID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuJG5hbWUpO1xuICAgIH1cblxufTtcblxudmFyIENvbnRhaW5lciA9IHtcblxuICAgIHByb3BzOiB7XG4gICAgICAgIGNvbnRhaW5lcjogQm9vbGVhblxuICAgIH0sXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBjb250YWluZXI6IHRydWVcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBjb250YWluZXI6IGZ1bmN0aW9uIGNvbnRhaW5lcihyZWYpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSByZWYuY29udGFpbmVyO1xuXG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyID09PSB0cnVlICYmIFVJa2l0JDIuY29udGFpbmVyIHx8IGNvbnRhaW5lciAmJiAkKGNvbnRhaW5lcikgfHwgVUlraXQkMi5jb250YWluZXI7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxudmFyIFRvZ2dsYWJsZSA9IHtcblxuICAgIHByb3BzOiB7XG4gICAgICAgIGNsczogQm9vbGVhbixcbiAgICAgICAgYW5pbWF0aW9uOiAnbGlzdCcsXG4gICAgICAgIGR1cmF0aW9uOiBOdW1iZXIsXG4gICAgICAgIG9yaWdpbjogU3RyaW5nLFxuICAgICAgICB0cmFuc2l0aW9uOiBTdHJpbmcsXG4gICAgICAgIHF1ZXVlZDogQm9vbGVhblxuICAgIH0sXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBjbHM6IGZhbHNlLFxuICAgICAgICBhbmltYXRpb246IFtmYWxzZV0sXG4gICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIG9yaWdpbjogZmFsc2UsXG4gICAgICAgIHRyYW5zaXRpb246ICdsaW5lYXInLFxuICAgICAgICBxdWV1ZWQ6IGZhbHNlLFxuXG4gICAgICAgIGluaXRQcm9wczoge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJycsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGVQcm9wczoge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IDAsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDAsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IDBcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgaGFzQW5pbWF0aW9uOiBmdW5jdGlvbiBoYXNBbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gcmVmLmFuaW1hdGlvbjtcblxuICAgICAgICAgICAgcmV0dXJuICEhYW5pbWF0aW9uWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc1RyYW5zaXRpb246IGZ1bmN0aW9uIGhhc1RyYW5zaXRpb24ocmVmKSB7XG4gICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gcmVmLmFuaW1hdGlvbjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzQW5pbWF0aW9uICYmIGFuaW1hdGlvblswXSA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICB0b2dnbGVFbGVtZW50OiBmdW5jdGlvbiB0b2dnbGVFbGVtZW50KHRhcmdldHMsIHNob3csIGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgICAgIHRhcmdldHMgPSB0b05vZGVzKHRhcmdldHMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFsbCA9IGZ1bmN0aW9uICh0YXJnZXRzKSB7IHJldHVybiBQcm9taXNlLmFsbCh0YXJnZXRzLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRoaXMkMS5fdG9nZ2xlRWxlbWVudChlbCwgc2hvdywgYW5pbWF0ZSk7IH0pKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlZCA9IHRhcmdldHMuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdGhpcyQxLmlzVG9nZ2xlZChlbCk7IH0pLFxuICAgICAgICAgICAgICAgICAgICB1bnRvZ2dsZWQgPSB0YXJnZXRzLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICFpbmNsdWRlcyh0b2dnbGVkLCBlbCk7IH0pLFxuICAgICAgICAgICAgICAgICAgICBwO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEucXVldWVkIHx8ICFpc1VuZGVmaW5lZChhbmltYXRlKSB8fCAhaXNVbmRlZmluZWQoc2hvdykgfHwgIXRoaXMkMS5oYXNBbmltYXRpb24gfHwgdGFyZ2V0cy5sZW5ndGggPCAyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcCA9IGFsbCh1bnRvZ2dsZWQuY29uY2F0KHRvZ2dsZWQpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IGJvZHkuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSB0b2dnbGVkWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5Qcm9ncmVzcyA9IEFuaW1hdGlvbi5pblByb2dyZXNzKGVsKSAmJiBoYXNDbGFzcyhlbCwgJ3VrLWFuaW1hdGlvbi1sZWF2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgVHJhbnNpdGlvbi5pblByb2dyZXNzKGVsKSAmJiBlbC5zdHlsZS5oZWlnaHQgPT09ICcwcHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIHAgPSBhbGwodG9nZ2xlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gcC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGFsbCh1bnRvZ2dsZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHAudGhlbihyZXNvbHZlLCBub29wKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlTm93OiBmdW5jdGlvbiB0b2dnbGVOb3codGFyZ2V0cywgc2hvdykge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gUHJvbWlzZS5hbGwodG9Ob2Rlcyh0YXJnZXRzKS5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGZhbHNlKTsgfSkpLnRoZW4ocmVzb2x2ZSwgbm9vcCk7IH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzVG9nZ2xlZDogZnVuY3Rpb24gaXNUb2dnbGVkKGVsKSB7XG4gICAgICAgICAgICB2YXIgbm9kZXMgPSB0b05vZGVzKGVsIHx8IHRoaXMuJGVsKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsc1xuICAgICAgICAgICAgICAgID8gaGFzQ2xhc3Mobm9kZXMsIHRoaXMuY2xzLnNwbGl0KCcgJylbMF0pXG4gICAgICAgICAgICAgICAgOiAhaGFzQXR0cihub2RlcywgJ2hpZGRlbicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZUFyaWE6IGZ1bmN0aW9uIHVwZGF0ZUFyaWEoZWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNscyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhdHRyKGVsLCAnYXJpYS1oaWRkZW4nLCAhdGhpcy5pc1RvZ2dsZWQoZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlRWxlbWVudDogZnVuY3Rpb24gX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHNob3cgPSBpc0Jvb2xlYW4oc2hvdylcbiAgICAgICAgICAgICAgICA/IHNob3dcbiAgICAgICAgICAgICAgICA6IEFuaW1hdGlvbi5pblByb2dyZXNzKGVsKVxuICAgICAgICAgICAgICAgICAgICA/IGhhc0NsYXNzKGVsLCAndWstYW5pbWF0aW9uLWxlYXZlJylcbiAgICAgICAgICAgICAgICAgICAgOiBUcmFuc2l0aW9uLmluUHJvZ3Jlc3MoZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGVsLnN0eWxlLmhlaWdodCA9PT0gJzBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogIXRoaXMuaXNUb2dnbGVkKGVsKTtcblxuICAgICAgICAgICAgaWYgKCF0cmlnZ2VyKGVsLCAoXCJiZWZvcmVcIiArIChzaG93ID8gJ3Nob3cnIDogJ2hpZGUnKSksIFt0aGlzXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSAoYW5pbWF0ZSA9PT0gZmFsc2UgfHwgIXRoaXMuaGFzQW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5fdG9nZ2xlSW1tZWRpYXRlXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5oYXNUcmFuc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX3RvZ2dsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl90b2dnbGVBbmltYXRpb25cbiAgICAgICAgICAgICkoZWwsIHNob3cpO1xuXG4gICAgICAgICAgICB0cmlnZ2VyKGVsLCBzaG93ID8gJ3Nob3cnIDogJ2hpZGUnLCBbdGhpc10pO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyKGVsLCBzaG93ID8gJ3Nob3duJyA6ICdoaWRkZW4nLCBbdGhpcyQxXSk7XG4gICAgICAgICAgICAgICAgVUlraXQkMi51cGRhdGUobnVsbCwgZWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZTogZnVuY3Rpb24gX3RvZ2dsZShlbCwgdG9nZ2xlZCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jbHMpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcy5jbHMsIGluY2x1ZGVzKHRoaXMuY2xzLCAnICcpID8gdW5kZWZpbmVkIDogdG9nZ2xlZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dHIoZWwsICdoaWRkZW4nLCAhdG9nZ2xlZCA/ICcnIDogbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQkKCdbYXV0b2ZvY3VzXScsIGVsKS5zb21lKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gaXNWaXNpYmxlKGVsKSAmJiAoZWwuZm9jdXMoKSB8fCB0cnVlKTsgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXJpYShlbCk7XG4gICAgICAgICAgICBVSWtpdCQyLnVwZGF0ZShudWxsLCBlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZUltbWVkaWF0ZTogZnVuY3Rpb24gX3RvZ2dsZUltbWVkaWF0ZShlbCwgc2hvdykge1xuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlKGVsLCBzaG93KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlSGVpZ2h0OiBmdW5jdGlvbiBfdG9nZ2xlSGVpZ2h0KGVsLCBzaG93KSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB2YXIgaW5Qcm9ncmVzcyA9IFRyYW5zaXRpb24uaW5Qcm9ncmVzcyhlbCksXG4gICAgICAgICAgICAgICAgaW5uZXIgPSBlbC5oYXNDaGlsZE5vZGVzID8gdG9GbG9hdChjc3MoZWwuZmlyc3RFbGVtZW50Q2hpbGQsICdtYXJnaW5Ub3AnKSkgKyB0b0Zsb2F0KGNzcyhlbC5sYXN0RWxlbWVudENoaWxkLCAnbWFyZ2luQm90dG9tJykpIDogMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVpZ2h0ID0gaXNWaXNpYmxlKGVsKSA/IGhlaWdodChlbCkgKyAoaW5Qcm9ncmVzcyA/IDAgOiBpbm5lcikgOiAwLFxuICAgICAgICAgICAgICAgIGVuZEhlaWdodDtcblxuICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoZWwpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUb2dnbGVkKGVsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZShlbCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlaWdodChlbCwgJycpO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgY2hpbGQgY29tcG9uZW50cyBmaXJzdFxuICAgICAgICAgICAgZmFzdGRvbS5mbHVzaCgpO1xuXG4gICAgICAgICAgICBlbmRIZWlnaHQgPSBoZWlnaHQoZWwpICsgKGluUHJvZ3Jlc3MgPyAwIDogaW5uZXIpO1xuICAgICAgICAgICAgaGVpZ2h0KGVsLCBjdXJyZW50SGVpZ2h0KTtcblxuICAgICAgICAgICAgcmV0dXJuIChzaG93XG4gICAgICAgICAgICAgICAgPyBUcmFuc2l0aW9uLnN0YXJ0KGVsLCBhc3NpZ24oe30sIHRoaXMuaW5pdFByb3BzLCB7b3ZlcmZsb3c6ICdoaWRkZW4nLCBoZWlnaHQ6IGVuZEhlaWdodH0pLCBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24gKiAoMSAtIGN1cnJlbnRIZWlnaHQgLyBlbmRIZWlnaHQpKSwgdGhpcy50cmFuc2l0aW9uKVxuICAgICAgICAgICAgICAgIDogVHJhbnNpdGlvbi5zdGFydChlbCwgdGhpcy5oaWRlUHJvcHMsIE1hdGgucm91bmQodGhpcy5kdXJhdGlvbiAqIChjdXJyZW50SGVpZ2h0IC8gZW5kSGVpZ2h0KSksIHRoaXMudHJhbnNpdGlvbikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZShlbCwgZmFsc2UpOyB9KVxuICAgICAgICAgICAgKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNzcyhlbCwgdGhpcyQxLmluaXRQcm9wcyk7IH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZUFuaW1hdGlvbjogZnVuY3Rpb24gX3RvZ2dsZUFuaW1hdGlvbihlbCwgc2hvdykge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgQW5pbWF0aW9uLmNhbmNlbChlbCk7XG5cbiAgICAgICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlKGVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQW5pbWF0aW9uLmluKGVsLCB0aGlzLmFuaW1hdGlvblswXSwgdGhpcy5kdXJhdGlvbiwgdGhpcy5vcmlnaW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gQW5pbWF0aW9uLm91dChlbCwgdGhpcy5hbmltYXRpb25bMV0gfHwgdGhpcy5hbmltYXRpb25bMF0sIHRoaXMuZHVyYXRpb24sIHRoaXMub3JpZ2luKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5fdG9nZ2xlKGVsLCBmYWxzZSk7IH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbnZhciBhY3RpdmU7XG5cbnZhciBNb2RhbCA9IHtcblxuICAgIG1peGluczogW0NsYXNzLCBDb250YWluZXIsIFRvZ2dsYWJsZV0sXG5cbiAgICBwcm9wczoge1xuICAgICAgICBjbHNQYW5lbDogU3RyaW5nLFxuICAgICAgICBzZWxDbG9zZTogU3RyaW5nLFxuICAgICAgICBlc2NDbG9zZTogQm9vbGVhbixcbiAgICAgICAgYmdDbG9zZTogQm9vbGVhbixcbiAgICAgICAgc3RhY2s6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY2xzOiAndWstb3BlbicsXG4gICAgICAgIGVzY0Nsb3NlOiB0cnVlLFxuICAgICAgICBiZ0Nsb3NlOiB0cnVlLFxuICAgICAgICBvdmVybGF5OiB0cnVlLFxuICAgICAgICBzdGFjazogZmFsc2VcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBwYW5lbDogZnVuY3Rpb24gcGFuZWwocmVmLCAkZWwpIHtcbiAgICAgICAgICAgIHZhciBjbHNQYW5lbCA9IHJlZi5jbHNQYW5lbDtcblxuICAgICAgICAgICAgcmV0dXJuICQkMSgoXCIuXCIgKyBjbHNQYW5lbCksICRlbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNpdGlvbkVsZW1lbnQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25FbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBmdW5jdGlvbiB0cmFuc2l0aW9uRHVyYXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdG9Ncyhjc3ModGhpcy50cmFuc2l0aW9uRWxlbWVudCwgJ3RyYW5zaXRpb25EdXJhdGlvbicpKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGV2ZW50czogW1xuXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbENsb3NlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuXG4gICAgICAgICAgICBuYW1lOiAndG9nZ2xlJyxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gd2lkdGgod2luKSAtIGRvY0VsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jLmJvZHksICdvdmVyZmxvd1knLCB0aGlzLnNjcm9sbGJhcldpZHRoICYmIHRoaXMub3ZlcmxheSA/ICdzY3JvbGwnIDogJycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKGRvY0VsLCB0aGlzLmNsc1BhZ2UpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB7XG5cbiAgICAgICAgICAgIG5hbWU6ICdoaWRkZW4nLFxuXG4gICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZm91bmQsIHByZXYgPSB0aGlzLnByZXY7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAocHJldikge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2LmNsc1BhZ2UgPT09IHRoaXMkMS5jbHNQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBwcmV2LnByZXY7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY0VsLCB0aGlzLmNsc1BhZ2UpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgIXRoaXMucHJldiAmJiBjc3MoZG9jLmJvZHksICdvdmVyZmxvd1knLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgXSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVG9nZ2xlZCgpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuJGVsLnBhcmVudE5vZGUgIT09IHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKHRoaXMuY29udGFpbmVyLCB0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbENvbm5lY3RlZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJldiA9IGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMgJiYgYWN0aXZlO1xuXG4gICAgICAgICAgICBhY3RpdmUgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldiA9IHByZXY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5oaWRlKCkudGhlbih0aGlzLnNob3cpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZWdpc3RlckV2ZW50cygpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGVOb3codGhpcy4kZWwsIHRydWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWN0aXZlID0gYWN0aXZlICYmIGFjdGl2ZSAhPT0gdGhpcyAmJiBhY3RpdmUgfHwgdGhpcy5wcmV2O1xuXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlTm93KHRoaXMuJGVsLCBmYWxzZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0QWN0aXZlOiBmdW5jdGlvbiBnZXRBY3RpdmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90b2dnbGVJbW1lZGlhdGU6IGZ1bmN0aW9uIF90b2dnbGVJbW1lZGlhdGUoZWwsIHNob3cpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZShlbCwgc2hvdyk7IH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICA/IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBvbmNlKHRoaXMkMS50cmFuc2l0aW9uRWxlbWVudCwgdHJhbnNpdGlvbmVuZCwgcmVzb2x2ZSwgZmFsc2UsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnRhcmdldCA9PT0gdGhpcyQxLnRyYW5zaXRpb25FbGVtZW50OyB9KTsgfSlcbiAgICAgICAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgICAgIH0sXG4gICAgfVxuXG59O1xuXG52YXIgZXZlbnRzO1xuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50cygpIHtcblxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50cyA9IFtcbiAgICAgICAgb24oZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gcmVmLmRlZmF1bHRQcmV2ZW50ZWQ7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmUgJiYgYWN0aXZlLmJnQ2xvc2UgJiYgIWRlZmF1bHRQcmV2ZW50ZWQgJiYgIXdpdGhpbih0YXJnZXQsIGFjdGl2ZS5wYW5lbCkpIHtcbiAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgb24oZG9jLCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNyAmJiBhY3RpdmUgJiYgYWN0aXZlLmVzY0Nsb3NlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgXTtcbn1cblxuZnVuY3Rpb24gZGVyZWdpc3RlckV2ZW50cygpIHtcbiAgICBldmVudHMgJiYgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKHVuYmluZCkgeyByZXR1cm4gdW5iaW5kKCk7IH0pO1xuICAgIGV2ZW50cyA9IG51bGw7XG59XG5cbnZhciBQb3NpdGlvbiA9IHtcblxuICAgIHByb3BzOiB7XG4gICAgICAgIHBvczogU3RyaW5nLFxuICAgICAgICBvZmZzZXQ6IG51bGwsXG4gICAgICAgIGZsaXA6IEJvb2xlYW4sXG4gICAgICAgIGNsc1BvczogU3RyaW5nXG4gICAgfSxcblxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHBvczogKFwiYm90dG9tLVwiICsgKCFpc1J0bCA/ICdsZWZ0JyA6ICdyaWdodCcpKSxcbiAgICAgICAgZmxpcDogdHJ1ZSxcbiAgICAgICAgb2Zmc2V0OiBmYWxzZSxcbiAgICAgICAgY2xzUG9zOiAnJ1xuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIHBvczogZnVuY3Rpb24gcG9zKHJlZikge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHJlZi5wb3M7XG5cbiAgICAgICAgICAgIHJldHVybiAocG9zICsgKCFpbmNsdWRlcyhwb3MsICctJykgPyAnLWNlbnRlcicgOiAnJykpLnNwbGl0KCctJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlyOiBmdW5jdGlvbiBkaXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3NbMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWxpZ246IGZ1bmN0aW9uIGFsaWduKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zWzFdO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIHBvc2l0aW9uQXQ6IGZ1bmN0aW9uIHBvc2l0aW9uQXQkMShlbGVtZW50LCB0YXJnZXQsIGJvdW5kYXJ5KSB7XG5cbiAgICAgICAgICAgIHJlbW92ZUNsYXNzZXMoZWxlbWVudCwgKCh0aGlzLmNsc1BvcykgKyBcIi0odG9wfGJvdHRvbXxsZWZ0fHJpZ2h0KSgtW2Etel0rKT9cIikpO1xuICAgICAgICAgICAgY3NzKGVsZW1lbnQsIHt0b3A6ICcnLCBsZWZ0OiAnJ30pO1xuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gdG9OdW1iZXIodGhpcy5vZmZzZXQpIHx8IDAsXG4gICAgICAgICAgICAgICAgYXhpcyA9IHRoaXMuZ2V0QXhpcygpO1xuICAgICAgICAgICAgdmFyIHJlZiA9IHBvc2l0aW9uQXQoXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgYXhpcyA9PT0gJ3gnID8gKChmbGlwUG9zaXRpb24odGhpcy5kaXIpKSArIFwiIFwiICsgKHRoaXMuYWxpZ24pKSA6ICgodGhpcy5hbGlnbikgKyBcIiBcIiArIChmbGlwUG9zaXRpb24odGhpcy5kaXIpKSksXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPT09ICd4JyA/ICgodGhpcy5kaXIpICsgXCIgXCIgKyAodGhpcy5hbGlnbikpIDogKCh0aGlzLmFsaWduKSArIFwiIFwiICsgKHRoaXMuZGlyKSksXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPT09ICd4JyA/IChcIlwiICsgKHRoaXMuZGlyID09PSAnbGVmdCcgPyAtMSAqIG9mZnNldCA6IG9mZnNldCkpIDogKFwiIFwiICsgKHRoaXMuZGlyID09PSAndG9wJyA/IC0xICogb2Zmc2V0IDogb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpcCxcbiAgICAgICAgICAgICAgICAgICAgYm91bmRhcnlcbiAgICAgICAgICAgICAgICApLnRhcmdldDtcbiAgICAgICAgICAgIHZhciB4ID0gcmVmLng7XG4gICAgICAgICAgICB2YXIgeSA9IHJlZi55O1xuXG4gICAgICAgICAgICB0aGlzLmRpciA9IGF4aXMgPT09ICd4JyA/IHggOiB5O1xuICAgICAgICAgICAgdGhpcy5hbGlnbiA9IGF4aXMgPT09ICd4JyA/IHkgOiB4O1xuXG4gICAgICAgICAgICB0b2dnbGVDbGFzcyhlbGVtZW50LCAoKHRoaXMuY2xzUG9zKSArIFwiLVwiICsgKHRoaXMuZGlyKSArIFwiLVwiICsgKHRoaXMuYWxpZ24pKSwgdGhpcy5vZmZzZXQgPT09IGZhbHNlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEF4aXM6IGZ1bmN0aW9uIGdldEF4aXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXIgPT09ICd0b3AnIHx8IHRoaXMuZGlyID09PSAnYm90dG9tJyA/ICd5JyA6ICd4JztcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG52YXIgbWl4aW4gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0Lm1peGluLmNsYXNzID0gQ2xhc3M7XG4gICAgVUlraXQubWl4aW4uY29udGFpbmVyID0gQ29udGFpbmVyO1xuICAgIFVJa2l0Lm1peGluLm1vZGFsID0gTW9kYWw7XG4gICAgVUlraXQubWl4aW4ucG9zaXRpb24gPSBQb3NpdGlvbjtcbiAgICBVSWtpdC5taXhpbi50b2dnbGFibGUgPSBUb2dnbGFibGU7XG5cbn07XG5cbnZhciBBY2NvcmRpb24gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnYWNjb3JkaW9uJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzLCBUb2dnbGFibGVdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXRzOiBTdHJpbmcsXG4gICAgICAgICAgICBhY3RpdmU6IG51bGwsXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogQm9vbGVhbixcbiAgICAgICAgICAgIG11bHRpcGxlOiBCb29sZWFuLFxuICAgICAgICAgICAgdG9nZ2xlOiBTdHJpbmcsXG4gICAgICAgICAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0czogJz4gKicsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbdHJ1ZV0sXG4gICAgICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNsc09wZW46ICd1ay1vcGVuJyxcbiAgICAgICAgICAgIHRvZ2dsZTogJz4gLnVrLWFjY29yZGlvbi10aXRsZScsXG4gICAgICAgICAgICBjb250ZW50OiAnPiAudWstYWNjb3JkaW9uLWNvbnRlbnQnLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2Vhc2UnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uIGl0ZW1zKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSByZWYudGFyZ2V0cztcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0YXJnZXRzLCAkZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnRhcmdldHMpICsgXCIgXCIgKyAodGhpcy4kcHJvcHMudG9nZ2xlKSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGluZGV4KCQkKCgodGhpcy50YXJnZXRzKSArIFwiIFwiICsgKHRoaXMuJHByb3BzLnRvZ2dsZSkpLCB0aGlzLiRlbCksIGUuY3VycmVudCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuYWN0aXZlICE9PSBmYWxzZSAmJiB0aGlzLml0ZW1zW051bWJlcih0aGlzLmFjdGl2ZSldICYmICFoYXNDbGFzcyhhY3RpdmUsIHRoaXMuY2xzT3Blbik7XG4gICAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoYWN0aXZlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEudG9nZ2xlTm93KCQkMSh0aGlzJDEuY29udGVudCwgZWwpLCBoYXNDbGFzcyhlbCwgdGhpcyQxLmNsc09wZW4pKTsgfSk7XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAhdGhpcy5jb2xsYXBzaWJsZSAmJiAhaGFzQ2xhc3ModGhpcy5pdGVtcywgdGhpcy5jbHNPcGVuKSAmJiB0aGlzLml0ZW1zWzBdO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGFjdGl2ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUoaXRlbSwgYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChpdGVtLCB0aGlzLml0ZW1zKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZmlsdGVyKHRoaXMuaXRlbXMsIChcIi5cIiArICh0aGlzLmNsc09wZW4pKSk7XG5cbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICBpdGVtICYmIFtpdGVtXVxuICAgICAgICAgICAgICAgICAgICAuY29uY2F0KCF0aGlzLm11bHRpcGxlICYmICFpbmNsdWRlcyhhY3RpdmUsIGl0ZW0pICYmIGFjdGl2ZSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0l0ZW0gPSBlbCA9PT0gaXRlbSwgc3RhdGUgPSBpc0l0ZW0gJiYgIWhhc0NsYXNzKGVsLCB0aGlzJDEuY2xzT3Blbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUgJiYgaXNJdGVtICYmICF0aGlzJDEuY29sbGFwc2libGUgJiYgYWN0aXZlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCB0aGlzJDEuY2xzT3Blbiwgc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGVsLl93cmFwcGVyID8gZWwuX3dyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQgOiAkJDEodGhpcyQxLmNvbnRlbnQsIGVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5fd3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLl93cmFwcGVyID0gd3JhcEFsbChjb250ZW50LCAnPGRpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLl93cmFwcGVyLCAnaGlkZGVuJywgc3RhdGUgPyAnJyA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuX3RvZ2dsZUltbWVkaWF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGVFbGVtZW50KGVsLl93cmFwcGVyLCBzdGF0ZSwgYW5pbWF0ZSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKGVsLCB0aGlzJDEuY2xzT3BlbikgPT09IHN0YXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl90b2dnbGVJbW1lZGlhdGUoY29udGVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuX3dyYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bndyYXAoY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBBbGVydCA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdhbGVydCcsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBtaXhpbnM6IFtDbGFzcywgVG9nZ2xhYmxlXSxcblxuICAgICAgICBhcmdzOiAnYW5pbWF0aW9uJyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2xvc2U6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IFt0cnVlXSxcbiAgICAgICAgICAgIHNlbENsb3NlOiAnLnVrLWFsZXJ0LWNsb3NlJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAsXG4gICAgICAgICAgICBoaWRlUHJvcHM6IGFzc2lnbih7b3BhY2l0eTogMH0sIFRvZ2dsYWJsZS5kZWZhdWx0cy5oaWRlUHJvcHMpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbENsb3NlO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLiRlbCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuJGRlc3Ryb3kodHJ1ZSk7IH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgQ292ZXIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnY292ZXInLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIFVJa2l0LmNvbXBvbmVudHMudmlkZW8ub3B0aW9uc10sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHdpZHRoOiBOdW1iZXIsXG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhdXRvbXV0ZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzLiRlbDtcblxuICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKGVsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgY3NzKFxuICAgICAgICAgICAgICAgICAgICBjc3MoZWwsIHt3aWR0aDogJycsIGhlaWdodDogJyd9KSxcbiAgICAgICAgICAgICAgICAgICAgRGltZW5zaW9ucy5jb3ZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCB8fCBlbC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0IHx8IGVsLmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGggKyAod2lkdGggJSAyID8gMSA6IDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgKGhlaWdodCAlIDIgPyAxIDogMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgbG9hZGVkbWV0YWRhdGE6IGZ1bmN0aW9uIGxvYWRlZG1ldGFkYXRhKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxudmFyIERyb3AgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBhY3RpdmU7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2Ryb3AnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbUG9zaXRpb24sIFRvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ3BvcycsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIHRvZ2dsZTogQm9vbGVhbixcbiAgICAgICAgICAgIGJvdW5kYXJ5OiAncXVlcnknLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogQm9vbGVhbixcbiAgICAgICAgICAgIGRlbGF5U2hvdzogTnVtYmVyLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXG4gICAgICAgICAgICBjbHNEcm9wOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbW9kZTogWydjbGljaycsICdob3ZlciddLFxuICAgICAgICAgICAgdG9nZ2xlOiB0cnVlLFxuICAgICAgICAgICAgYm91bmRhcnk6IHdpbixcbiAgICAgICAgICAgIGJvdW5kYXJ5QWxpZ246IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXlTaG93OiAwLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiA4MDAsXG4gICAgICAgICAgICBjbHNEcm9wOiBmYWxzZSxcbiAgICAgICAgICAgIGhvdmVySWRsZTogMjAwLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBbJ3VrLWFuaW1hdGlvbi1mYWRlJ10sXG4gICAgICAgICAgICBjbHM6ICd1ay1vcGVuJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrZXIgPSBuZXcgTW91c2VUcmFja2VyKCk7XG4gICAgICAgICAgICB0aGlzLmNsc0Ryb3AgPSB0aGlzLmNsc0Ryb3AgfHwgKFwidWstXCIgKyAodGhpcy4kb3B0aW9ucy5uYW1lKSk7XG4gICAgICAgICAgICB0aGlzLmNsc1BvcyA9IHRoaXMuY2xzRHJvcDtcblxuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJvcCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWEodGhpcy4kZWwpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50b2dnbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSA9IFVJa2l0LnRvZ2dsZShpc1N0cmluZyh0aGlzLnRvZ2dsZSkgPyBxdWVyeSh0aGlzLnRvZ2dsZSwgdGhpcy4kZWwpIDogdGhpcy4kZWwucHJldmlvdXNFbGVtZW50U2libGluZywge3RhcmdldDogdGhpcy4kZWwsIG1vZGU6IHRoaXMubW9kZX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCIuXCIgKyAodGhpcy5jbHNEcm9wKSArIFwiLWNsb3NlXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhW2hyZWZePVwiI1wiXSc7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IGUudGFyZ2V0Lmhhc2g7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpZCB8fCAhd2l0aGluKGlkLCB0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzY3JvbGwnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSwgdG9nZ2xlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVG9nZ2xlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHRvZ2dsZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiBwb2ludGVyRW50ZXIsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2hvdmVyJyk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RvdWNoKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhY3RpdmUgIT09IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGFjdGl2ZS50b2dnbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGluY2x1ZGVzKGFjdGl2ZS50b2dnbGUubW9kZSwgJ2hvdmVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICF3aXRoaW4oZS50YXJnZXQsIGFjdGl2ZS50b2dnbGUuJGVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIXBvaW50SW5SZWN0KHt4OiBlLnBhZ2VYLCB5OiBlLnBhZ2VZfSwgb2Zmc2V0KGFjdGl2ZS4kZWwpKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHRoaXMudG9nZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGVzaG93JyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSwgdG9nZ2xlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZSAmJiAhaW5jbHVkZXModG9nZ2xlLnRhcmdldCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0b2dnbGUgfHwgdGhpcy50b2dnbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogKFwidG9nZ2xlaGlkZSBcIiArIHBvaW50ZXJMZWF2ZSksXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHRvZ2dsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RvdWNoKGUpIHx8IHRvZ2dsZSAmJiAhaW5jbHVkZXModG9nZ2xlLnRhcmdldCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlICYmIGluY2x1ZGVzKHRoaXMudG9nZ2xlLm1vZGUsICdob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZXNob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrZXIuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLnRvZ2dsZS4kZWwsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLnRvZ2dsZS4kZWwsICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZWhpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJGVsICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGFjdGl2ZSA9PT0gbnVsbCAmJiB3aXRoaW4odGFyZ2V0LCB0aGlzLiRlbCkgJiYgdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMgOiBhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCkgPyBudWxsIDogYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnRvZ2dsZS4kZWwsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLnRvZ2dsZS4kZWwsICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlLiRlbC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICQkKCdhLCBidXR0b24nLCB0aGlzLnRvZ2dsZS4kZWwpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5ibHVyKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrZXIuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgIUFuaW1hdGlvbi5pblByb2dyZXNzKHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyh0b2dnbGUsIGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCBkZWxheSA9PT0gdm9pZCAwICkgZGVsYXkgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcyQxLmlzVG9nZ2xlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLiRlbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRyeVNob3cgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGUgPSB0b2dnbGUgfHwgdGhpcyQxLnRvZ2dsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmNsZWFyVGltZXJzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsYXkgJiYgYWN0aXZlICYmIGFjdGl2ZSAhPT0gdGhpcyQxICYmIGFjdGl2ZS5pc0RlbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNob3dUaW1lciA9IHNldFRpbWVvdXQodGhpcyQxLnNob3csIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMkMS5pc1BhcmVudE9mKGFjdGl2ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUuaGlkZVRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZSAmJiAhdGhpcyQxLmlzQ2hpbGRPZihhY3RpdmUpICYmICF0aGlzJDEuaXNQYXJlbnRPZihhY3RpdmUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYWN0aXZlICYmIGFjdGl2ZSAhPT0gcHJldiAmJiAhdGhpcyQxLmlzQ2hpbGRPZihhY3RpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYgPSBhY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbGF5ICYmIHRoaXMkMS5kZWxheVNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc2hvd1RpbWVyID0gc2V0VGltZW91dChzaG93LCB0aGlzJDEuZGVsYXlTaG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0aGlzJDE7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodG9nZ2xlICYmIHRoaXMudG9nZ2xlICYmICB0b2dnbGUuJGVsICE9PSB0aGlzLnRvZ2dsZS4kZWwpIHtcblxuICAgICAgICAgICAgICAgICAgICBvbmNlKHRoaXMuJGVsLCAnaGlkZScsIHRyeVNob3cpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5U2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoZGVsYXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIGRlbGF5ID09PSB2b2lkIDAgKSBkZWxheSA9IHRydWU7XG5cblxuICAgICAgICAgICAgICAgIHZhciBoaWRlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRvZ2dsZU5vdyh0aGlzJDEuJGVsLCBmYWxzZSk7IH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVsYXlpbmcgPSB0aGlzLnRyYWNrZXIubW92ZXNUbyh0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVsYXkgJiYgdGhpcy5pc0RlbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVyID0gc2V0VGltZW91dCh0aGlzLmhpZGUsIHRoaXMuaG92ZXJJZGxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbGF5ICYmIHRoaXMuZGVsYXlIaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVyID0gc2V0VGltZW91dChoaWRlLCB0aGlzLmRlbGF5SGlkZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsZWFyVGltZXJzOiBmdW5jdGlvbiBjbGVhclRpbWVycygpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZXIpO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaW1lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzRGVsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlID09PSB0aGlzO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaXNDaGlsZE9mOiBmdW5jdGlvbiBpc0NoaWxkT2YoZHJvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkcm9wICYmIGRyb3AgIT09IHRoaXMgJiYgd2l0aGluKHRoaXMuJGVsLCBkcm9wLiRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpc1BhcmVudE9mOiBmdW5jdGlvbiBpc1BhcmVudE9mKGRyb3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHJvcCAmJiBkcm9wICE9PSB0aGlzICYmIHdpdGhpbihkcm9wLiRlbCwgdGhpcy4kZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcG9zaXRpb246IGZ1bmN0aW9uIHBvc2l0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLiRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItKHN0YWNrfGJvdW5kYXJ5KVwiKSk7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7dG9wOiAnJywgbGVmdDogJycsIGRpc3BsYXk6ICdibG9jayd9KTtcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLiRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItYm91bmRhcnlcIiksIHRoaXMuYm91bmRhcnlBbGlnbik7XG5cbiAgICAgICAgICAgICAgICB2YXIgYm91bmRhcnkgPSBvZmZzZXQodGhpcy5ib3VuZGFyeSksXG4gICAgICAgICAgICAgICAgICAgIGFsaWduVG8gPSB0aGlzLmJvdW5kYXJ5QWxpZ24gPyBib3VuZGFyeSA6IG9mZnNldCh0aGlzLnRvZ2dsZS4kZWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxpZ24gPT09ICdqdXN0aWZ5Jykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IHRoaXMuZ2V0QXhpcygpID09PSAneScgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgcHJvcCwgYWxpZ25Ub1twcm9wXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLiRlbC5vZmZzZXRXaWR0aCA+IE1hdGgubWF4KGJvdW5kYXJ5LnJpZ2h0IC0gYWxpZ25Uby5sZWZ0LCBhbGlnblRvLnJpZ2h0IC0gYm91bmRhcnkubGVmdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICgodGhpcy5jbHNEcm9wKSArIFwiLXN0YWNrXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3N0YWNrJywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQXQodGhpcy4kZWwsIHRoaXMuYm91bmRhcnlBbGlnbiA/IHRoaXMuYm91bmRhcnkgOiB0aGlzLnRvZ2dsZS4kZWwsIHRoaXMuYm91bmRhcnkpO1xuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICcnKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQuZHJvcC5nZXRBY3RpdmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBhY3RpdmU7IH07XG5cbiAgICB2YXIgcmVnaXN0ZXJlZDtcblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnQoKSB7XG5cbiAgICAgICAgaWYgKHJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICBvbihkb2MsICdjbGljaycsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRQcmV2ZW50ZWQgPSByZWYuZGVmYXVsdFByZXZlbnRlZDtcblxuICAgICAgICAgICAgdmFyIHByZXY7XG5cbiAgICAgICAgICAgIGlmIChkZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYWN0aXZlICYmIGFjdGl2ZSAhPT0gcHJldiAmJiAhd2l0aGluKHRhcmdldCwgYWN0aXZlLiRlbCkgJiYgIShhY3RpdmUudG9nZ2xlICYmIHdpdGhpbih0YXJnZXQsIGFjdGl2ZS50b2dnbGUuJGVsKSkpIHtcbiAgICAgICAgICAgICAgICBwcmV2ID0gYWN0aXZlO1xuICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG52YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZHJvcGRvd24nLCBVSWtpdC5jb21wb25lbnRzLmRyb3AuZXh0ZW5kKHtuYW1lOiAnZHJvcGRvd24nfSkpO1xuXG59O1xuXG52YXIgRm9ybUN1c3RvbSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdmb3JtLWN1c3RvbScsIHtcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgYXJnczogJ3RhcmdldCcsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgaW5wdXQ6IGZ1bmN0aW9uIGlucHV0KF8sICRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkJDEoc2VsSW5wdXQsICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdGF0ZTogZnVuY3Rpb24gc3RhdGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbiB0YXJnZXQocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgJiYgKHRhcmdldCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmlucHV0LnBhcmVudE5vZGUgPT09ICRlbFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmlucHV0Lm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgICAgICB8fCBxdWVyeSh0YXJnZXQsICRlbCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0cmlnZ2VyKHRoaXMuaW5wdXQsICdjaGFuZ2UnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2ZvY3VzaW4gZm9jdXNvdXQgbW91c2VlbnRlciBtb3VzZWxlYXZlJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBzZWxJbnB1dCxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKFwidWstXCIgKyAoaW5jbHVkZXModHlwZSwgJ2ZvY3VzJykgPyAnZm9jdXMnIDogJ2hvdmVyJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGVzKFsnZm9jdXNpbicsICdtb3VzZWVudGVyJ10sIHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LCBpbnB1dCA9IHRoaXMuaW5wdXQsIG9wdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2lzSW5wdXQodGFyZ2V0KSA/ICd2YWx1ZScgOiAndGV4dENvbnRlbnQnXSA9IGlucHV0LmZpbGVzICYmIGlucHV0LmZpbGVzWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGlucHV0LmZpbGVzWzBdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbWF0Y2hlcyhpbnB1dCwgJ3NlbGVjdCcpICYmIChvcHRpb24gPSAkJCgnb3B0aW9uJywgaW5wdXQpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLnNlbGVjdGVkOyB9KVswXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbi50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBHaWYgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZ2lmJywge1xuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGludmlldyA9IGlzSW5WaWV3KHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0luVmlldyAmJiBpbnZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWwuc3JjID0gdGhpcy4kZWwuc3JjO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaXNJblZpZXcgPSBpbnZpZXc7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBHcmlkID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2dyaWQnLCBVSWtpdC5jb21wb25lbnRzLm1hcmdpbi5leHRlbmQoe1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBuYW1lOiAnZ3JpZCcsXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIG1hcmdpbjogJ3VrLWdyaWQtbWFyZ2luJyxcbiAgICAgICAgICAgIGNsc1N0YWNrOiAndWstZ3JpZC1zdGFjaydcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzU3RhY2ssIHRoaXMuc3RhY2tzKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KSk7XG5cbn07XG5cbnZhciBIZWlnaHRNYXRjaCA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdoZWlnaHQtbWF0Y2gnLCB7XG5cbiAgICAgICAgYXJnczogJ3RhcmdldCcsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogU3RyaW5nLFxuICAgICAgICAgICAgcm93OiBCb29sZWFuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogJz4gKicsXG4gICAgICAgICAgICByb3c6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBlbGVtZW50czogZnVuY3Rpb24gZWxlbWVudHMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0YXJnZXQsICRlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RPZmZzZXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmVsZW1lbnRzLCAnbWluSGVpZ2h0JywgJycpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzID0gIXRoaXMucm93XG4gICAgICAgICAgICAgICAgICAgID8gW3RoaXMubWF0Y2godGhpcy5lbGVtZW50cyldXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5lbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKHJvd3MsIGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXN0T2Zmc2V0ICE9PSBlbC5vZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLnB1c2goW2VsXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3Nbcm93cy5sZW5ndGggLSAxXS5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IGVsLm9mZnNldFRvcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvd3M7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgW10pLm1hcChmdW5jdGlvbiAoZWxlbWVudHMpIHsgcmV0dXJuIHRoaXMkMS5tYXRjaChlbGVtZW50cyk7IH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gcmVmLmVsZW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjc3MoZWxlbWVudHMsICdtaW5IZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBtYXRjaDogZnVuY3Rpb24gbWF0Y2goZWxlbWVudHMpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbWF4ID0gMCwgaGVpZ2h0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSwgaGlkZGVuO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZShlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGF0dHIoZWwsICdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbiA9IGF0dHIoZWwsICdoaWRkZW4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIoZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICgoc3R5bGUgfHwgJycpICsgXCI7ZGlzcGxheTpibG9jayAhaW1wb3J0YW50O1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgZWwub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodHMucHVzaChlbC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHN0eWxlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIoZWwsIHtzdHlsZTogc3R5bGUsIGhpZGRlbjogaGlkZGVufSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIGhlaWdodHNbaV0gPCBtYXg7IH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtoZWlnaHQ6IG1heCwgZWxlbWVudHM6IGVsZW1lbnRzfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBIZWlnaHRWaWV3cG9ydCA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdoZWlnaHQtdmlld3BvcnQnLCB7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGV4cGFuZDogQm9vbGVhbixcbiAgICAgICAgICAgIG9mZnNldFRvcDogQm9vbGVhbixcbiAgICAgICAgICAgIG9mZnNldEJvdHRvbTogQm9vbGVhbixcbiAgICAgICAgICAgIG1pbkhlaWdodDogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGV4cGFuZDogZmFsc2UsXG4gICAgICAgICAgICBvZmZzZXRUb3A6IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0Qm90dG9tOiBmYWxzZSxcbiAgICAgICAgICAgIG1pbkhlaWdodDogMFxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdib3hTaXppbmcnLCAnYm9yZGVyLWJveCcpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZpZXdwb3J0ID0gaGVpZ2h0KHdpbiksIG1pbkhlaWdodCwgb2Zmc2V0VG9wID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4cGFuZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge2hlaWdodDogJycsIG1pbkhlaWdodDogJyd9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZiA9IHZpZXdwb3J0IC0gb2Zmc2V0SGVpZ2h0KGRvY0VsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodCA9IG9mZnNldEhlaWdodCh0aGlzLiRlbCkgKyBkaWZmO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSBvZmZzZXQodGhpcy4kZWwpLnRvcDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodG9wIDwgdmlld3BvcnQgLyAyICYmIHRoaXMub2Zmc2V0VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gdG9wO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub2Zmc2V0Qm90dG9tID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSBvZmZzZXRIZWlnaHQodGhpcy4kZWwubmV4dEVsZW1lbnRTaWJsaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzTnVtZXJpYyh0aGlzLm9mZnNldEJvdHRvbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9ICh2aWV3cG9ydCAvIDEwMCkgKiB0aGlzLm9mZnNldEJvdHRvbTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub2Zmc2V0Qm90dG9tICYmIGVuZHNXaXRoKHRoaXMub2Zmc2V0Qm90dG9tLCAncHgnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gdG9GbG9hdCh0aGlzLm9mZnNldEJvdHRvbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyh0aGlzLm9mZnNldEJvdHRvbSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IG9mZnNldEhlaWdodChxdWVyeSh0aGlzLm9mZnNldEJvdHRvbSwgdGhpcy4kZWwpKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gb24gbW9iaWxlIGRldmljZXMgKGlPUyBhbmQgQW5kcm9pZCkgd2luZG93LmlubmVySGVpZ2h0ICE9PSAxMDB2aFxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQgPSBvZmZzZXRUb3AgPyAoXCJjYWxjKDEwMHZoIC0gXCIgKyBvZmZzZXRUb3AgKyBcInB4KVwiKSA6ICcxMDB2aCc7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7aGVpZ2h0OiAnJywgbWluSGVpZ2h0OiBtaW5IZWlnaHR9KTtcblxuICAgICAgICAgICAgICAgIHZhciBlbEhlaWdodCA9IHRoaXMuJGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW5IZWlnaHQgJiYgdGhpcy5taW5IZWlnaHQgPiBlbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtaW5IZWlnaHQnLCB0aGlzLm1pbkhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSUUgMTAtMTEgZml4IChtaW4taGVpZ2h0IG9uIGEgZmxleCBjb250YWluZXIgd29uJ3QgYXBwbHkgdG8gaXRzIGZsZXggaXRlbXMpXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0IC0gb2Zmc2V0VG9wID49IGVsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2hlaWdodCcsIG1pbkhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb2Zmc2V0SGVpZ2h0KGVsKSB7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgICB9XG5cbn07XG5cbnZhciBIb3ZlciA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgcmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjbHMgPSAndWstaG92ZXInO1xuXG4gICAgICAgIG9uKGRvYywgJ3RhcCcsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJCgoXCIuXCIgKyBjbHMpKS5mb3JFYWNoKGZ1bmN0aW9uIChfLCBlbCkgeyByZXR1cm4gIXdpdGhpbih0YXJnZXQsIGVsKSAmJiByZW1vdmVDbGFzcyhlbCwgY2xzKTsgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSWtpdCwgJ2hvdmVyU2VsZWN0b3InLCB7XG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgb24oZG9jLCAndGFwJywgc2VsZWN0b3IsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSByZWYuY3VycmVudDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWRkQ2xhc3MoY3VycmVudCwgY2xzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBVSWtpdC5ob3ZlclNlbGVjdG9yID0gJy51ay1hbmltYXRpb24tdG9nZ2xlLCAudWstdHJhbnNpdGlvbi10b2dnbGUsIFt1ay1ob3Zlcl0nO1xuXG4gICAgfSk7XG5cbn07XG5cbnZhciBjbG9zZUljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjE0XFxcIiBoZWlnaHQ9XFxcIjE0XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMTRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgeDE9XFxcIjFcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTNcXFwiIHkyPVxcXCIxM1xcXCI+PC9saW5lPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIHgxPVxcXCIxM1xcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMTNcXFwiPjwvbGluZT48L3N2Zz5cIjtcblxudmFyIGNsb3NlTGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuNFxcXCIgeDE9XFxcIjFcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTlcXFwiIHkyPVxcXCIxOVxcXCI+PC9saW5lPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHgxPVxcXCIxOVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMTlcXFwiPjwvbGluZT48L3N2Zz5cIjtcblxudmFyIG1hcmtlciA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cmVjdCB4PVxcXCI5XFxcIiB5PVxcXCI0XFxcIiB3aWR0aD1cXFwiMVxcXCIgaGVpZ2h0PVxcXCIxMVxcXCI+PC9yZWN0PjxyZWN0IHg9XFxcIjRcXFwiIHk9XFxcIjlcXFwiIHdpZHRoPVxcXCIxMVxcXCIgaGVpZ2h0PVxcXCIxXFxcIj48L3JlY3Q+PC9zdmc+XCI7XG5cbnZhciBuYXZiYXJUb2dnbGVJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxyZWN0IHk9XFxcIjlcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyXFxcIj48L3JlY3Q+PHJlY3QgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiPjwvcmVjdD48cmVjdCB5PVxcXCIxNVxcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjJcXFwiPjwvcmVjdD48L3N2Zz5cIjtcblxudmFyIG92ZXJsYXlJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCI0MFxcXCIgaGVpZ2h0PVxcXCI0MFxcXCIgdmlld0JveD1cXFwiMCAwIDQwIDQwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxyZWN0IHg9XFxcIjE5XFxcIiB5PVxcXCIwXFxcIiB3aWR0aD1cXFwiMVxcXCIgaGVpZ2h0PVxcXCI0MFxcXCI+PC9yZWN0PjxyZWN0IHg9XFxcIjBcXFwiIHk9XFxcIjE5XFxcIiB3aWR0aD1cXFwiNDBcXFwiIGhlaWdodD1cXFwiMVxcXCI+PC9yZWN0Pjwvc3ZnPlwiO1xuXG52YXIgcGFnaW5hdGlvbk5leHQgPSBcIjxzdmcgd2lkdGg9XFxcIjdcXFwiIGhlaWdodD1cXFwiMTJcXFwiIHZpZXdCb3g9XFxcIjAgMCA3IDEyXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4yXFxcIiBwb2ludHM9XFxcIjEgMSA2IDYgMSAxMVxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIHBhZ2luYXRpb25QcmV2aW91cyA9IFwiPHN2ZyB3aWR0aD1cXFwiN1xcXCIgaGVpZ2h0PVxcXCIxMlxcXCIgdmlld0JveD1cXFwiMCAwIDcgMTJcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjJcXFwiIHBvaW50cz1cXFwiNiAxIDEgNiA2IDExXFxcIj48L3BvbHlsaW5lPjwvc3ZnPlwiO1xuXG52YXIgc2VhcmNoSWNvbiA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIGN4PVxcXCI5XFxcIiBjeT1cXFwiOVxcXCIgcj1cXFwiN1xcXCI+PC9jaXJjbGU+PHBhdGggZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgZD1cXFwiTTE0LDE0IEwxOCwxOCBMMTQsMTQgWlxcXCI+PC9wYXRoPjwvc3ZnPlwiO1xuXG52YXIgc2VhcmNoTGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjQwXFxcIiBoZWlnaHQ9XFxcIjQwXFxcIiB2aWV3Qm94PVxcXCIwIDAgNDAgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGNpcmNsZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS44XFxcIiBjeD1cXFwiMTcuNVxcXCIgY3k9XFxcIjE3LjVcXFwiIHI9XFxcIjE2LjVcXFwiPjwvY2lyY2xlPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjhcXFwiIHgxPVxcXCIzOFxcXCIgeTE9XFxcIjM5XFxcIiB4Mj1cXFwiMjlcXFwiIHkyPVxcXCIzMFxcXCI+PC9saW5lPjwvc3ZnPlwiO1xuXG52YXIgc2VhcmNoTmF2YmFyID0gXCI8c3ZnIHdpZHRoPVxcXCIyNFxcXCIgaGVpZ2h0PVxcXCIyNFxcXCIgdmlld0JveD1cXFwiMCAwIDI0IDI0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxjaXJjbGUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgY3g9XFxcIjEwLjVcXFwiIGN5PVxcXCIxMC41XFxcIiByPVxcXCI5LjVcXFwiLz48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiB4MT1cXFwiMjNcXFwiIHkxPVxcXCIyM1xcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiMTdcXFwiLz48L3N2Zz5cIjtcblxudmFyIHNsaWRlbmF2TmV4dCA9IFwiPHN2ZyB3aWR0aD1cXFwiMTRweFxcXCIgaGVpZ2h0PVxcXCIyNHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMjRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHBvaW50cz1cXFwiMS4yMjUsMjMgMTIuNzc1LDEyIDEuMjI1LDEgXFxcIj48L3BvbHlsaW5lPjwvc3ZnPlwiO1xuXG52YXIgc2xpZGVuYXZOZXh0TGFyZ2UgPSBcIjxzdmcgd2lkdGg9XFxcIjI1cHhcXFwiIGhlaWdodD1cXFwiNDBweFxcXCIgdmlld0JveD1cXFwiMCAwIDI1IDQwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMlxcXCIgcG9pbnRzPVxcXCI0LjAwMiwzOC41NDcgMjIuNTI3LDIwLjAyNCA0LDEuNSBcXFwiPjwvcG9seWxpbmU+PC9zdmc+XCI7XG5cbnZhciBzbGlkZW5hdlByZXZpb3VzID0gXCI8c3ZnIHdpZHRoPVxcXCIxNHB4XFxcIiBoZWlnaHQ9XFxcIjI0cHhcXFwiIHZpZXdCb3g9XFxcIjAgMCAxNCAyNFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuNFxcXCIgcG9pbnRzPVxcXCIxMi43NzUsMSAxLjIyNSwxMiAxMi43NzUsMjMgXFxcIj48L3BvbHlsaW5lPjwvc3ZnPlwiO1xuXG52YXIgc2xpZGVuYXZQcmV2aW91c0xhcmdlID0gXCI8c3ZnIHdpZHRoPVxcXCIyNXB4XFxcIiBoZWlnaHQ9XFxcIjQwcHhcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNSA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjJcXFwiIHBvaW50cz1cXFwiMjAuNTI3LDEuNSAyLDIwLjAyNCAyMC41MjUsMzguNTQ3IFxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIHNwaW5uZXIgPSBcIjxzdmcgd2lkdGg9XFxcIjMwXFxcIiBoZWlnaHQ9XFxcIjMwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMzAgMzBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGNpcmNsZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIGN4PVxcXCIxNVxcXCIgY3k9XFxcIjE1XFxcIiByPVxcXCIxNFxcXCI+PC9jaXJjbGU+PC9zdmc+XCI7XG5cbnZhciB0b3RvcCA9IFwiPHN2ZyB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMTBcXFwiIHZpZXdCb3g9XFxcIjAgMCAxOCAxMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCIxIDkgOSAxIDE3IDkgXFxcIj48L3BvbHlsaW5lPjwvc3ZnPlwiO1xuXG52YXIgSWNvbiA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIHBhcnNlZCA9IHt9LFxuICAgICAgICBpY29ucyA9IHtcbiAgICAgICAgICAgIHNwaW5uZXI6IHNwaW5uZXIsXG4gICAgICAgICAgICB0b3RvcDogdG90b3AsXG4gICAgICAgICAgICBtYXJrZXI6IG1hcmtlcixcbiAgICAgICAgICAgICdjbG9zZS1pY29uJzogY2xvc2VJY29uLFxuICAgICAgICAgICAgJ2Nsb3NlLWxhcmdlJzogY2xvc2VMYXJnZSxcbiAgICAgICAgICAgICduYXZiYXItdG9nZ2xlLWljb24nOiBuYXZiYXJUb2dnbGVJY29uLFxuICAgICAgICAgICAgJ292ZXJsYXktaWNvbic6IG92ZXJsYXlJY29uLFxuICAgICAgICAgICAgJ3BhZ2luYXRpb24tbmV4dCc6IHBhZ2luYXRpb25OZXh0LFxuICAgICAgICAgICAgJ3BhZ2luYXRpb24tcHJldmlvdXMnOiBwYWdpbmF0aW9uUHJldmlvdXMsXG4gICAgICAgICAgICAnc2VhcmNoLWljb24nOiBzZWFyY2hJY29uLFxuICAgICAgICAgICAgJ3NlYXJjaC1sYXJnZSc6IHNlYXJjaExhcmdlLFxuICAgICAgICAgICAgJ3NlYXJjaC1uYXZiYXInOiBzZWFyY2hOYXZiYXIsXG4gICAgICAgICAgICAnc2xpZGVuYXYtbmV4dCc6IHNsaWRlbmF2TmV4dCxcbiAgICAgICAgICAgICdzbGlkZW5hdi1uZXh0LWxhcmdlJzogc2xpZGVuYXZOZXh0TGFyZ2UsXG4gICAgICAgICAgICAnc2xpZGVuYXYtcHJldmlvdXMnOiBzbGlkZW5hdlByZXZpb3VzLFxuICAgICAgICAgICAgJ3NsaWRlbmF2LXByZXZpb3VzLWxhcmdlJzogc2xpZGVuYXZQcmV2aW91c0xhcmdlXG4gICAgICAgIH07XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2ljb24nLCBVSWtpdC5jb21wb25lbnRzLnN2Zy5leHRlbmQoe1xuXG4gICAgICAgIGF0dHJzOiBbJ2ljb24nLCAncmF0aW8nXSxcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgbmFtZTogJ2ljb24nLFxuXG4gICAgICAgIGFyZ3M6ICdpY29uJyxcblxuICAgICAgICBwcm9wczogWydpY29uJ10sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtleGNsdWRlOiBbJ2lkJywgJ3N0eWxlJywgJ2NsYXNzJywgJ3NyYycsICdpY29uJ119LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWljb24nKTtcblxuICAgICAgICAgICAgaWYgKGlzUnRsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gc3dhcChzd2FwKHRoaXMuaWNvbiwgJ2xlZnQnLCAncmlnaHQnKSwgJ3ByZXZpb3VzJywgJ25leHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRlbGF5O1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgZ2V0U3ZnOiBmdW5jdGlvbiBnZXRTdmcoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGdldEljb24odGhpcy5pY29uKTtcblxuICAgICAgICAgICAgICAgIGlmICghaWNvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0ljb24gbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaWNvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG4gICAgW1xuICAgICAgICAnbWFya2VyJyxcbiAgICAgICAgJ25hdmJhci10b2dnbGUtaWNvbicsXG4gICAgICAgICdvdmVybGF5LWljb24nLFxuICAgICAgICAncGFnaW5hdGlvbi1wcmV2aW91cycsXG4gICAgICAgICdwYWdpbmF0aW9uLW5leHQnLFxuICAgICAgICAndG90b3AnXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiByZWdpc3RlckNvbXBvbmVudChuYW1lKTsgfSk7XG5cbiAgICBbXG4gICAgICAgICdzbGlkZW5hdi1wcmV2aW91cycsXG4gICAgICAgICdzbGlkZW5hdi1uZXh0J1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gcmVnaXN0ZXJDb21wb25lbnQobmFtZSwge1xuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLXNsaWRlbmF2Jyk7XG5cbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXNsaWRlbmF2LWxhcmdlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24gKz0gJy1sYXJnZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pOyB9KTtcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KCdzZWFyY2gtaWNvbicsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRoaXMuJGVsLCAndWstc2VhcmNoLWljb24nKSAmJiBwYXJlbnRzKHRoaXMuJGVsLCAnLnVrLXNlYXJjaC1sYXJnZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbiA9ICdzZWFyY2gtbGFyZ2UnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnRzKHRoaXMuJGVsLCAnLnVrLXNlYXJjaC1uYXZiYXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24gPSAnc2VhcmNoLW5hdmJhcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoJ2Nsb3NlJywge1xuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLmljb24gPSBcImNsb3NlLVwiICsgKGhhc0NsYXNzKHRoaXMuJGVsLCAndWstY2xvc2UtbGFyZ2UnKSA/ICdsYXJnZScgOiAnaWNvbicpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KCdzcGlubmVyJywge1xuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuc3ZnLnRoZW4oZnVuY3Rpb24gKHN2ZykgeyByZXR1cm4gdGhpcyQxLnJhdGlvICE9PSAxICYmIGNzcygkJDEoJ2NpcmNsZScsIHN2ZyksICdzdHJva2Utd2lkdGgnLCAxIC8gdGhpcyQxLnJhdGlvKTsgfSwgbm9vcCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQuaWNvbi5hZGQgPSBmdW5jdGlvbiAoYWRkZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYWRkZWQpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGljb25zW25hbWVdID0gYWRkZWRbbmFtZV07XG4gICAgICAgICAgICBkZWxldGUgcGFyc2VkW25hbWVdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoVUlraXQuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBlYWNoKFVJa2l0Lmluc3RhbmNlcywgZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuJG9wdGlvbnMubmFtZSA9PT0gJ2ljb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC4kcmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChuYW1lLCBtaXhpbiQkMSkge1xuXG4gICAgICAgIFVJa2l0LmNvbXBvbmVudChuYW1lLCBVSWtpdC5jb21wb25lbnRzLmljb24uZXh0ZW5kKHtcblxuICAgICAgICAgICAgbmFtZTogbmFtZSxcblxuICAgICAgICAgICAgbWl4aW5zOiBtaXhpbiQkMSA/IFttaXhpbiQkMV0gOiBbXSxcblxuICAgICAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgICAgICBpY29uOiBuYW1lXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEljb24oaWNvbikge1xuXG4gICAgICAgIGlmICghaWNvbnNbaWNvbl0pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwYXJzZWRbaWNvbl0pIHtcbiAgICAgICAgICAgIHBhcnNlZFtpY29uXSA9ICQkMShpY29uc1tpY29uXS50cmltKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcnNlZFtpY29uXTtcbiAgICB9XG5cbn07XG5cbnZhciBMZWFkZXIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbGVhZGVyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZmlsbDogU3RyaW5nLFxuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYSdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgZmlsbDogJycsXG4gICAgICAgICAgICBtZWRpYTogZmFsc2UsXG4gICAgICAgICAgICBjbHNXcmFwcGVyOiAndWstbGVhZGVyLWZpbGwnLFxuICAgICAgICAgICAgY2xzSGlkZTogJ3VrLWxlYWRlci1oaWRlJyxcbiAgICAgICAgICAgIGF0dHJGaWxsOiAnZGF0YS1maWxsJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGZpbGw6IGZ1bmN0aW9uIGZpbGwocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGwgPSByZWYuZmlsbDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxsIHx8IGdldENzc1ZhcignbGVhZGVyLWZpbGwnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyID0gd3JhcElubmVyKHRoaXMuJGVsLCAoXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNXcmFwcGVyKSArIFwiXFxcIj5cIikpWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdW53cmFwKHRoaXMud3JhcHBlci5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93aWR0aDtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBNYXRoLmZsb29yKHRoaXMuJGVsLm9mZnNldFdpZHRoIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQgPSBwcmV2ICE9PSB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSA9IHRoaXMubWVkaWEgJiYgIXdpbi5tYXRjaE1lZGlhKHRoaXMubWVkaWEpLm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLndyYXBwZXIsIHRoaXMuY2xzSGlkZSwgdGhpcy5faGlkZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIodGhpcy53cmFwcGVyLCB0aGlzLmF0dHJGaWxsLCBuZXcgQXJyYXkodGhpcy5fd2lkdGgpLmpvaW4odGhpcy5maWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcblxufTtcblxudmFyIE1hcmdpbiA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdtYXJnaW4nLCB7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIG1hcmdpbjogU3RyaW5nLFxuICAgICAgICAgICAgZmlyc3RDb2x1bW46IEJvb2xlYW5cbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbWFyZ2luOiAndWstbWFyZ2luLXNtYWxsLXRvcCcsXG4gICAgICAgICAgICBmaXJzdENvbHVtbjogJ3VrLWZpcnN0LWNvbHVtbidcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy4kZWwuY2hpbGRyZW47XG5cbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCB8fCAhaXNWaXNpYmxlKHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHZhciByb3dzID0gW1tdXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBpdGVtc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbSA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGltLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gcm93cy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcm93c1tqXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3dbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0RGltID0gcm93WzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGltLnRvcCA+PSBNYXRoLmZsb29yKGxlZnREaW0uYm90dG9tKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MucHVzaChbZWxdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IoZGltLmJvdHRvbSkgPiBsZWZ0RGltLnRvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnN0YWNrcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpbS5sZWZ0IDwgbGVmdERpbS5sZWZ0ICYmICFpc1J0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cudW5zaGlmdChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLnVuc2hpZnQoW2VsXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzID0gcm93cztcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaSkgeyByZXR1cm4gcm93LmZvckVhY2goZnVuY3Rpb24gKGVsLCBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLm1hcmdpbiwgaSAhPT0gMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLmZpcnN0Q29sdW1uLCBqID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgTW9kYWwkMSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdtb2RhbCcsIHtcblxuICAgICAgICBtaXhpbnM6IFtNb2RhbF0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGNsc1BhZ2U6ICd1ay1tb2RhbC1wYWdlJyxcbiAgICAgICAgICAgIGNsc1BhbmVsOiAndWstbW9kYWwtZGlhbG9nJyxcbiAgICAgICAgICAgIHNlbENsb3NlOiAnLnVrLW1vZGFsLWNsb3NlLCAudWstbW9kYWwtY2xvc2UtZGVmYXVsdCwgLnVrLW1vZGFsLWNsb3NlLW91dHNpZGUsIC51ay1tb2RhbC1jbG9zZS1mdWxsJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRoaXMucGFuZWwsICd1ay1tYXJnaW4tYXV0by12ZXJ0aWNhbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWZsZXgnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLiRlbCk7IC8vIGZvcmNlIHJlZmxvd1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZGVuJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCAndWstZmxleCcpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH0pO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdvdmVyZmxvdy1hdXRvJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBtb2RhbDogZnVuY3Rpb24gbW9kYWwoXywgJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QoJGVsLCAnLnVrLW1vZGFsJyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwYW5lbDogZnVuY3Rpb24gcGFuZWwoXywgJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QoJGVsLCAnLnVrLW1vZGFsLWRpYWxvZycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtaW5IZWlnaHQnLCAxNTApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFuZWwgfHwgIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gY3NzKHRoaXMuJGVsLCAnbWF4SGVpZ2h0Jyk7XG5cbiAgICAgICAgICAgICAgICBjc3MoY3NzKHRoaXMuJGVsLCAnbWF4SGVpZ2h0JywgMTUwKSwgJ21heEhlaWdodCcsIE1hdGgubWF4KDE1MCwgMTUwICsgaGVpZ2h0KHRoaXMubW9kYWwpIC0gdGhpcy5wYW5lbC5vZmZzZXRIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPT0gY3NzKHRoaXMuJGVsLCAnbWF4SGVpZ2h0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBVSWtpdC5tb2RhbC5kaWFsb2cgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0aW9ucykge1xuXG4gICAgICAgIHZhciBkaWFsb2cgPSBVSWtpdC5tb2RhbCgoXCIgPGRpdiBjbGFzcz1cXFwidWstbW9kYWxcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1kaWFsb2dcXFwiPlwiICsgY29udGVudCArIFwiPC9kaXY+IDwvZGl2PiBcIiksIG9wdGlvbnMpO1xuXG4gICAgICAgIG9uKGRpYWxvZy4kZWwsICdoaWRkZW4nLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBkaWFsb2cuJGRlc3Ryb3kodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkaWFsb2cuc2hvdygpO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2c7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLmFsZXJ0ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcblxuICAgICAgICBvcHRpb25zID0gYXNzaWduKHtiZ0Nsb3NlOiBmYWxzZSwgZXNjQ2xvc2U6IGZhbHNlLCBsYWJlbHM6IFVJa2l0Lm1vZGFsLmxhYmVsc30sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBvbihVSWtpdC5tb2RhbC5kaWFsb2coKFwiIDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiPlwiICsgKGlzU3RyaW5nKG1lc3NhZ2UpID8gbWVzc2FnZSA6IGh0bWwobWVzc2FnZSkpICsgXCI8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZm9vdGVyIHVrLXRleHQtcmlnaHRcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXByaW1hcnkgdWstbW9kYWwtY2xvc2VcXFwiIGF1dG9mb2N1cz5cIiArIChvcHRpb25zLmxhYmVscy5vaykgKyBcIjwvYnV0dG9uPiA8L2Rpdj4gXCIpLCBvcHRpb25zKS4kZWwsICdoaWRlJywgcmVzb2x2ZSk7IH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgVUlraXQubW9kYWwuY29uZmlybSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7YmdDbG9zZTogZmFsc2UsIGVzY0Nsb3NlOiBmYWxzZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHJldHVybiBvbihVSWtpdC5tb2RhbC5kaWFsb2coKFwiIDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiPlwiICsgKGlzU3RyaW5nKG1lc3NhZ2UpID8gbWVzc2FnZSA6IGh0bWwobWVzc2FnZSkpICsgXCI8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZm9vdGVyIHVrLXRleHQtcmlnaHRcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWRlZmF1bHQgdWstbW9kYWwtY2xvc2VcXFwiPlwiICsgKG9wdGlvbnMubGFiZWxzLmNhbmNlbCkgKyBcIjwvYnV0dG9uPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXByaW1hcnkgdWstbW9kYWwtY2xvc2VcXFwiIGF1dG9mb2N1cz5cIiArIChvcHRpb25zLmxhYmVscy5vaykgKyBcIjwvYnV0dG9uPiA8L2Rpdj4gXCIpLCBvcHRpb25zKS4kZWwsICdjbGljaycsICcudWstbW9kYWwtZm9vdGVyIGJ1dHRvbicsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCh0YXJnZXQpID09PSAwID8gcmVqZWN0KCkgOiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgVUlraXQubW9kYWwucHJvbXB0ID0gZnVuY3Rpb24gKG1lc3NhZ2UsIHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7YmdDbG9zZTogZmFsc2UsIGVzY0Nsb3NlOiBmYWxzZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJvbXB0ID0gVUlraXQubW9kYWwuZGlhbG9nKChcIiA8Zm9ybSBjbGFzcz1cXFwidWstZm9ybS1zdGFja2VkXFxcIj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtYm9keVxcXCI+IDxsYWJlbD5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9sYWJlbD4gPGlucHV0IGNsYXNzPVxcXCJ1ay1pbnB1dFxcXCIgYXV0b2ZvY3VzPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZm9vdGVyIHVrLXRleHQtcmlnaHRcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLWRlZmF1bHQgdWstbW9kYWwtY2xvc2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+XCIgKyAob3B0aW9ucy5sYWJlbHMuY2FuY2VsKSArIFwiPC9idXR0b24+IDxidXR0b24gY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tcHJpbWFyeVxcXCI+XCIgKyAob3B0aW9ucy5sYWJlbHMub2spICsgXCI8L2J1dHRvbj4gPC9kaXY+IDwvZm9ybT4gXCIpLCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBpbnB1dCA9ICQkMSgnaW5wdXQnLCBwcm9tcHQuJGVsKTtcblxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgb24ocHJvbXB0LiRlbCwgJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByb21wdC5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uKHByb21wdC4kZWwsICdoaWRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgVUlraXQubW9kYWwubGFiZWxzID0ge1xuICAgICAgICBvazogJ09rJyxcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJ1xuICAgIH07XG5cbn07XG5cbnZhciBOYXYgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbmF2JywgVUlraXQuY29tcG9uZW50cy5hY2NvcmRpb24uZXh0ZW5kKHtcblxuICAgICAgICBuYW1lOiAnbmF2JyxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0czogJz4gLnVrLXBhcmVudCcsXG4gICAgICAgICAgICB0b2dnbGU6ICc+IGEnLFxuICAgICAgICAgICAgY29udGVudDogJz4gdWwnXG4gICAgICAgIH1cblxuICAgIH0pKTtcblxufTtcblxudmFyIE5hdmJhciA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCduYXZiYXInLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBkcm9wZG93bjogU3RyaW5nLFxuICAgICAgICAgICAgbW9kZTogJ2xpc3QnLFxuICAgICAgICAgICAgYWxpZ246IFN0cmluZyxcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyLFxuICAgICAgICAgICAgYm91bmRhcnk6IEJvb2xlYW4sXG4gICAgICAgICAgICBib3VuZGFyeUFsaWduOiBCb29sZWFuLFxuICAgICAgICAgICAgY2xzRHJvcDogU3RyaW5nLFxuICAgICAgICAgICAgZGVsYXlTaG93OiBOdW1iZXIsXG4gICAgICAgICAgICBkZWxheUhpZGU6IE51bWJlcixcbiAgICAgICAgICAgIGRyb3BiYXI6IEJvb2xlYW4sXG4gICAgICAgICAgICBkcm9wYmFyTW9kZTogU3RyaW5nLFxuICAgICAgICAgICAgZHJvcGJhckFuY2hvcjogJ3F1ZXJ5JyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgZHJvcGRvd246ICcudWstbmF2YmFyLW5hdiA+IGxpJyxcbiAgICAgICAgICAgIGFsaWduOiAhaXNSdGwgPyAnbGVmdCcgOiAncmlnaHQnLFxuICAgICAgICAgICAgY2xzRHJvcDogJ3VrLW5hdmJhci1kcm9wZG93bicsXG4gICAgICAgICAgICBtb2RlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvZmZzZXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlbGF5U2hvdzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBib3VuZGFyeUFsaWduOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmbGlwOiAneCcsXG4gICAgICAgICAgICBib3VuZGFyeTogdHJ1ZSxcbiAgICAgICAgICAgIGRyb3BiYXI6IGZhbHNlLFxuICAgICAgICAgICAgZHJvcGJhck1vZGU6ICdzbGlkZScsXG4gICAgICAgICAgICBkcm9wYmFyQW5jaG9yOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgYm91bmRhcnk6IGZ1bmN0aW9uIGJvdW5kYXJ5KHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gcmVmLmJvdW5kYXJ5O1xuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeUFsaWduID0gcmVmLmJvdW5kYXJ5QWxpZ247XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGJvdW5kYXJ5ID09PSB0cnVlIHx8IGJvdW5kYXJ5QWxpZ24pID8gJGVsIDogYm91bmRhcnlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBvczogZnVuY3Rpb24gcG9zKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBhbGlnbiA9IHJlZi5hbGlnbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXCJib3R0b20tXCIgKyBhbGlnbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyb3BiYXIpIHtcbiAgICAgICAgICAgICAgICBVSWtpdC5uYXZiYXJEcm9wYmFyKFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSh0aGlzLmRyb3BiYXIsIHRoaXMuJGVsKSB8fCBhZnRlcih0aGlzLmRyb3BiYXJBbmNob3IgfHwgdGhpcy4kZWwsICc8ZGl2PjwvZGl2PicpLFxuICAgICAgICAgICAgICAgICAgICB7Y2xzRHJvcDogdGhpcy5jbHNEcm9wLCBtb2RlOiB0aGlzLmRyb3BiYXJNb2RlLCBkdXJhdGlvbjogdGhpcy5kdXJhdGlvbiwgbmF2YmFyOiB0aGlzfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblxuICAgICAgICAgICAgVUlraXQuZHJvcChcbiAgICAgICAgICAgICAgICAkJCgoKHRoaXMuZHJvcGRvd24pICsgXCIgLlwiICsgKHRoaXMuY2xzRHJvcCkpLCB0aGlzLiRlbCkuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gIVVJa2l0LmdldENvbXBvbmVudChlbCwgJ2Ryb3Bkb3duJyk7IH0pLFxuICAgICAgICAgICAgICAgIGFzc2lnbih7fSwgdGhpcy4kcHJvcHMsIHtib3VuZGFyeTogdGhpcy5ib3VuZGFyeSwgcG9zOiB0aGlzLnBvc30pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnbW91c2VvdmVyJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd247XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3RpdmUgJiYgYWN0aXZlLnRvZ2dsZSAmJiAhd2l0aGluKGFjdGl2ZS50b2dnbGUuJGVsLCBjdXJyZW50KSAmJiAhYWN0aXZlLnRyYWNrZXIubW92ZXNUbyhhY3RpdmUuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGdldEFjdGl2ZTogZnVuY3Rpb24gZ2V0QWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSBVSWtpdC5kcm9wLmdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmUgJiYgaW5jbHVkZXMoYWN0aXZlLm1vZGUsICdob3ZlcicpICYmIHdpdGhpbihhY3RpdmUudG9nZ2xlLiRlbCwgdGhpcy4kZWwpICYmIGFjdGl2ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbmF2YmFyLWRyb3BiYXInLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjbHNEcm9wOiAnJyxcbiAgICAgICAgICAgIG1vZGU6ICdzbGlkZScsXG4gICAgICAgICAgICBuYXZiYXI6IG51bGwsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstbmF2YmFyLWRyb3BiYXItc2xpZGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZXNob3cnLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZiYXIuJGVsO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIGRyb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCA9IGRyb3AuJGVsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gZHJvcC5kaXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXIgPT09ICdib3R0b20nICYmICF3aXRoaW4oJGVsLCB0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZCh0aGlzLiRlbCwgJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Auc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdtb3VzZWxlYXZlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLm5hdmJhci5nZXRBY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlICYmICFtYXRjaGVzKHRoaXMuJGVsLCAnOmhvdmVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihfLCByZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCA9IHJlZi4kZWw7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNEcm9wICYmIGFkZENsYXNzKCRlbCwgKCh0aGlzLmNsc0Ryb3ApICsgXCItZHJvcGJhclwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblRvKCRlbC5vZmZzZXRIZWlnaHQgKyB0b0Zsb2F0KGNzcygkZWwsICdtYXJnaW4tdG9wJykpICsgdG9GbG9hdChjc3MoJGVsLCAnbWFyZ2luLWJvdHRvbScpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVoaWRlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSwgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMubmF2YmFyLmdldEFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKHRoaXMuJGVsLCAnOmhvdmVyJykgJiYgYWN0aXZlICYmIGFjdGl2ZS4kZWwgPT09ICRlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRlJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoXywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMubmF2YmFyLmdldEFjdGl2ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlIHx8IGFjdGl2ZSAmJiBhY3RpdmUuJGVsID09PSAkZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvblRvKDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB0cmFuc2l0aW9uVG86IGZ1bmN0aW9uIHRyYW5zaXRpb25UbyhuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy4kZWwsIGlzVmlzaWJsZSh0aGlzLiRlbCkgPyBoZWlnaHQodGhpcy4kZWwpIDogMCk7XG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFuc2l0aW9uLnN0YXJ0KHRoaXMuJGVsLCB7aGVpZ2h0OiBuZXdIZWlnaHR9LCB0aGlzLmR1cmF0aW9uKS50aGVuKG51bGwsIG5vb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgc2Nyb2xsO1xuXG52YXIgT2ZmY2FudmFzID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ29mZmNhbnZhcycsIHtcblxuICAgICAgICBtaXhpbnM6IFtNb2RhbF0sXG5cbiAgICAgICAgYXJnczogJ21vZGUnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjb250ZW50OiBTdHJpbmcsXG4gICAgICAgICAgICBtb2RlOiBTdHJpbmcsXG4gICAgICAgICAgICBmbGlwOiBCb29sZWFuLFxuICAgICAgICAgICAgb3ZlcmxheTogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjb250ZW50OiAnLnVrLW9mZmNhbnZhcy1jb250ZW50JyxcbiAgICAgICAgICAgIG1vZGU6ICdzbGlkZScsXG4gICAgICAgICAgICBmbGlwOiBmYWxzZSxcbiAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgICAgICAgICAgY2xzUGFnZTogJ3VrLW9mZmNhbnZhcy1wYWdlJyxcbiAgICAgICAgICAgIGNsc0NvbnRhaW5lcjogJ3VrLW9mZmNhbnZhcy1jb250YWluZXInLFxuICAgICAgICAgICAgY2xzUGFuZWw6ICd1ay1vZmZjYW52YXMtYmFyJyxcbiAgICAgICAgICAgIGNsc0ZsaXA6ICd1ay1vZmZjYW52YXMtZmxpcCcsXG4gICAgICAgICAgICBjbHNDb250ZW50OiAndWstb2ZmY2FudmFzLWNvbnRlbnQnLFxuICAgICAgICAgICAgY2xzQ29udGVudEFuaW1hdGlvbjogJ3VrLW9mZmNhbnZhcy1jb250ZW50LWFuaW1hdGlvbicsXG4gICAgICAgICAgICBjbHNTaWRlYmFyQW5pbWF0aW9uOiAndWstb2ZmY2FudmFzLWJhci1hbmltYXRpb24nLFxuICAgICAgICAgICAgY2xzTW9kZTogJ3VrLW9mZmNhbnZhcycsXG4gICAgICAgICAgICBjbHNPdmVybGF5OiAndWstb2ZmY2FudmFzLW92ZXJsYXknLFxuICAgICAgICAgICAgc2VsQ2xvc2U6ICcudWstb2ZmY2FudmFzLWNsb3NlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uIGNvbnRlbnQocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZWYuY29udGVudDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJDEoY29udGVudCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbHNGbGlwOiBmdW5jdGlvbiBjbHNGbGlwKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmbGlwID0gcmVmLmZsaXA7XG4gICAgICAgICAgICAgICAgdmFyIGNsc0ZsaXAgPSByZWYuY2xzRmxpcDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmbGlwID8gY2xzRmxpcCA6ICcnO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xzT3ZlcmxheTogZnVuY3Rpb24gY2xzT3ZlcmxheShyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcmxheSA9IHJlZi5vdmVybGF5O1xuICAgICAgICAgICAgICAgIHZhciBjbHNPdmVybGF5ID0gcmVmLmNsc092ZXJsYXk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb3ZlcmxheSA/IGNsc092ZXJsYXkgOiAnJztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc01vZGU6IGZ1bmN0aW9uIGNsc01vZGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzTW9kZSA9IHJlZi5jbHNNb2RlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjbHNNb2RlICsgXCItXCIgKyBtb2RlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc1NpZGViYXJBbmltYXRpb246IGZ1bmN0aW9uIGNsc1NpZGViYXJBbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzU2lkZWJhckFuaW1hdGlvbiA9IHJlZi5jbHNTaWRlYmFyQW5pbWF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdub25lJyB8fCBtb2RlID09PSAncmV2ZWFsJyA/ICcnIDogY2xzU2lkZWJhckFuaW1hdGlvbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc0NvbnRlbnRBbmltYXRpb246IGZ1bmN0aW9uIGNsc0NvbnRlbnRBbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGUgPSByZWYubW9kZTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzQ29udGVudEFuaW1hdGlvbiA9IHJlZi5jbHNDb250ZW50QW5pbWF0aW9uO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgIT09ICdwdXNoJyAmJiBtb2RlICE9PSAncmV2ZWFsJyA/ICcnIDogY2xzQ29udGVudEFuaW1hdGlvblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNpdGlvbkVsZW1lbnQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25FbGVtZW50KHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZSA9PT0gJ3JldmVhbCcgPyB0aGlzLnBhbmVsLnBhcmVudE5vZGUgOiB0aGlzLnBhbmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEFjdGl2ZSgpID09PSB0aGlzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheSB8fCB0aGlzLmNsc0NvbnRlbnRBbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoKHRoaXMuY29udGVudCwgd2lkdGgod2luKSAtIHRoaXMuc2Nyb2xsYmFyV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuY29udGVudCwgaGVpZ2h0KHdpbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxUb3AgPSBzY3JvbGwueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2FbaHJlZl49XCIjXCJdJztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSByZWYuY3VycmVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5oYXNoICYmICQkMShjdXJyZW50Lmhhc2gsIHRoaXMuY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZXNjcm9sbCcsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlLCBzY3JvbGwsIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsICYmIHRhcmdldCAmJiB0aGlzLmlzVG9nZ2xlZCgpICYmICQkMSh0YXJnZXQsIHRoaXMuY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2UodGhpcy4kZWwsICdoaWRkZW4nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzY3JvbGwuc2Nyb2xsVG8odGFyZ2V0KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBzY3JvbGwgfHwge3g6IHdpbi5wYWdlWE9mZnNldCwgeTogd2luLnBhZ2VZT2Zmc2V0fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAncmV2ZWFsJyAmJiAhaGFzQ2xhc3ModGhpcy5wYW5lbCwgdGhpcy5jbHNNb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEFsbCh0aGlzLnBhbmVsLCAnPGRpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGFuZWwucGFyZW50Tm9kZSwgdGhpcy5jbHNNb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNzcyhkb2NFbCwgJ292ZXJmbG93WScsICghdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uIHx8IHRoaXMuZmxpcCkgJiYgdGhpcy5zY3JvbGxiYXJXaWR0aCAmJiB0aGlzLm92ZXJsYXkgPyAnc2Nyb2xsJyA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jLmJvZHksICgodGhpcy5jbHNDb250YWluZXIpICsgXCIgXCIgKyAodGhpcy5jbHNGbGlwKSArIFwiIFwiICsgKHRoaXMuY2xzT3ZlcmxheSkpKTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KGRvYy5ib2R5KTsgLy8gZm9yY2UgcmVmbG93XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuY29udGVudCwgdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5wYW5lbCwgKCh0aGlzLmNsc1NpZGViYXJBbmltYXRpb24pICsgXCIgXCIgKyAodGhpcy5tb2RlICE9PSAncmV2ZWFsJyA/IHRoaXMuY2xzTW9kZSA6ICcnKSkpO1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNPdmVybGF5KTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy4kZWwpOyAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZScsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50LCB0aGlzLmNsc0NvbnRlbnRBbmltYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnbm9uZScgfHwgYWN0aXZlICYmIGFjdGl2ZSAhPT0gdGhpcyAmJiBhY3RpdmUgIT09IHRoaXMucHJldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLnBhbmVsLCB0cmFuc2l0aW9uZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZGVuJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdyZXZlYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bndyYXAodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0ge3g6IHdpbi5wYWdlWE9mZnNldCwgeTogd2luLnBhZ2VZT2Zmc2V0fTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5ID0gcmVmLnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IHt4OiB4LCB5OiB5fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMucGFuZWwsICgodGhpcy5jbHNTaWRlYmFyQW5pbWF0aW9uKSArIFwiIFwiICsgKHRoaXMuY2xzTW9kZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzT3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvYy5ib2R5LCAoKHRoaXMuY2xzQ29udGFpbmVyKSArIFwiIFwiICsgKHRoaXMuY2xzRmxpcCkgKyBcIiBcIiArICh0aGlzLmNsc092ZXJsYXkpKSk7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnNjcm9sbFRvcCA9IHNjcm9sbC55O1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyhkb2NFbCwgJ292ZXJmbG93LXknLCAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2lkdGgodGhpcy5jb250ZW50LCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLmNvbnRlbnQsICcnKTtcblxuICAgICAgICAgICAgICAgICAgICB3aW4uc2Nyb2xsVG8oc2Nyb2xsLngsIHNjcm9sbC55KTtcblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzd2lwZUxlZnQgc3dpcGVSaWdodCcsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSAmJiBpc1RvdWNoKGUpICYmIChlLnR5cGUgPT09ICdzd2lwZUxlZnQnICYmICF0aGlzLmZsaXAgfHwgZS50eXBlID09PSAnc3dpcGVSaWdodCcgJiYgdGhpcy5mbGlwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxufTtcblxudmFyIFJlc3BvbnNpdmUgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgncmVzcG9uc2l2ZScsIHtcblxuICAgICAgICBwcm9wczogWyd3aWR0aCcsICdoZWlnaHQnXSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1yZXNwb25zaXZlLXdpZHRoJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRpbSA9IGlzVmlzaWJsZSh0aGlzLiRlbCkgJiYgdGhpcy53aWR0aCAmJiB0aGlzLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICA/IHt3aWR0aDogd2lkdGgodGhpcy4kZWwucGFyZW50Tm9kZSksIGhlaWdodDogdGhpcy5oZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpbSkge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy4kZWwsIERpbWVuc2lvbnMuY29udGFpbih7aGVpZ2h0OiB0aGlzLmhlaWdodCwgd2lkdGg6IHRoaXMud2lkdGh9LCB0aGlzLmRpbSkuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBTY3JvbGwgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2Nyb2xsJywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBkdXJhdGlvbjogTnVtYmVyLFxuICAgICAgICAgICAgb2Zmc2V0OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNjcm9sbFRvOiBmdW5jdGlvbiBzY3JvbGxUbyhlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBlbCA9IGVsICYmICQkMShpc1N0cmluZyhlbCkgPyBlbC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwvJykgOiBlbCkgfHwgZG9jLmJvZHk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gb2Zmc2V0KGVsKS50b3AgLSB0aGlzLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgZG9jSGVpZ2h0ID0gaGVpZ2h0KGRvYyksXG4gICAgICAgICAgICAgICAgICAgIHdpbkhlaWdodCA9IGhlaWdodCh3aW4pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCArIHdpbkhlaWdodCA+IGRvY0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBkb2NIZWlnaHQgLSB3aW5IZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0cmlnZ2VyKHRoaXMuJGVsLCAnYmVmb3Jlc2Nyb2xsJywgW3RoaXMsIGVsXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WSA9IHdpbi5wYWdlWU9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WSA9IHN0YXJ0WSArICh0YXJnZXQgLSBzdGFydFkpICogZWFzZShjbGFtcCgoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIHRoaXMkMS5kdXJhdGlvbikpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW4uc2Nyb2xsVG8od2luLnBhZ2VYT2Zmc2V0LCBjdXJyZW50WSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjcm9sbCBtb3JlIGlmIHdlIGhhdmUgbm90IHJlYWNoZWQgb3VyIGRlc3RpbmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFkgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzJDEuJGVsLCAnc2Nyb2xsZWQnLCBbdGhpcyQxLCBlbF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgc3RlcCgpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvKHRoaXMuJGVsLmhhc2gpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZWFzZShrKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG4gICAgfVxuXG59O1xuXG52YXIgU2Nyb2xsc3B5ID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3Njcm9sbHNweScsIHtcblxuICAgICAgICBhcmdzOiAnY2xzJyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY2xzOiAnbGlzdCcsXG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIGhpZGRlbjogQm9vbGVhbixcbiAgICAgICAgICAgIG9mZnNldFRvcDogTnVtYmVyLFxuICAgICAgICAgICAgb2Zmc2V0TGVmdDogTnVtYmVyLFxuICAgICAgICAgICAgcmVwZWF0OiBCb29sZWFuLFxuICAgICAgICAgICAgZGVsYXk6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjbHM6IFsndWstc2Nyb2xsc3B5LWludmlldyddLFxuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgIG9mZnNldFRvcDogMCxcbiAgICAgICAgICAgIG9mZnNldExlZnQ6IDAsXG4gICAgICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICBpblZpZXdDbGFzczogJ3VrLXNjcm9sbHNweS1pbnZpZXcnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgZWxlbWVudHM6IGZ1bmN0aW9uIGVsZW1lbnRzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ICYmICQkKHRhcmdldCwgJGVsKSB8fCBbJGVsXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGZpbHRlcih0aGlzLmVsZW1lbnRzLCAoXCI6bm90KC5cIiArICh0aGlzLmluVmlld0NsYXNzKSArIFwiKVwiKSksICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWwuX3Njcm9sbHNweSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbHMgPSBhdHRyKGVsLCAndWstc2Nyb2xsc3B5LWNsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuX3Njcm9sbHNweSA9IHt0b2dnbGVzOiBjbHMgJiYgY2xzLnNwbGl0KCcsJykgfHwgdGhpcyQxLmNsc307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLl9zY3JvbGxzcHkuc2hvdyA9IGlzSW5WaWV3KGVsLCB0aGlzJDEub2Zmc2V0VG9wLCB0aGlzJDEub2Zmc2V0TGVmdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aCA9PT0gMSA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBlbC5fc2Nyb2xsc3B5LCBjbHMgPSBkYXRhLnRvZ2dsZXNbaV0gfHwgZGF0YS50b2dnbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zaG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuaW52aWV3ICYmICFkYXRhLnRpbWVyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MoZWwsICd2aXNpYmlsaXR5JywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoZWwsIHRoaXMkMS5pblZpZXdDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgY2xzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgJ2ludmlldycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJHVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmludmlldyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YS50aW1lcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmRlbGF5ICYmIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnRpbWVyID0gc2V0VGltZW91dChzaG93LCB0aGlzJDEuZGVsYXkgKiBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaW52aWV3ICYmIHRoaXMkMS5yZXBlYXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS50aW1lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGRhdGEudGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEudGltZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MoZWwsICd2aXNpYmlsaXR5JywgdGhpcyQxLmhpZGRlbiA/ICdoaWRkZW4nIDogJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhlbCwgdGhpcyQxLmluVmlld0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIGNscyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgJ291dHZpZXcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJHVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaW52aWV3ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgU2Nyb2xsc3B5TmF2ID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3Njcm9sbHNweS1uYXYnLCB7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNsczogU3RyaW5nLFxuICAgICAgICAgICAgY2xvc2VzdDogU3RyaW5nLFxuICAgICAgICAgICAgc2Nyb2xsOiBCb29sZWFuLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxuICAgICAgICAgICAgY2xvc2VzdDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGw6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcmZsb3c6IHRydWUsXG4gICAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBsaW5rczogZnVuY3Rpb24gbGlua3MoXywgJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkKCdhW2hyZWZePVwiI1wiXScsICRlbCkuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuaGFzaDsgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlbGVtZW50czogZnVuY3Rpb24gZWxlbWVudHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2VzdCA/IGNsb3Nlc3QodGhpcy5saW5rcywgdGhpcy5jbG9zZXN0KSA6IHRoaXMubGlua3M7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0YXJnZXRzOiBmdW5jdGlvbiB0YXJnZXRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0aGlzLmxpbmtzLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmhhc2g7IH0pLmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVSWtpdC5zY3JvbGwodGhpcy5saW5rcywge29mZnNldDogdGhpcy5vZmZzZXQgfHwgMH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQgKyB0aGlzLm9mZnNldCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXggPSBoZWlnaHQoZG9jKSAtIGhlaWdodCh3aW4pICsgdGhpcy5vZmZzZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldHMuZXZlcnkoZnVuY3Rpb24gKGVsLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3AgPSBvZmZzZXQoZWwpLnRvcCwgbGFzdCA9IGkgKyAxID09PSB0aGlzJDEudGFyZ2V0cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMkMS5vdmVyZmxvdyAmJiAoaSA9PT0gMCAmJiB0b3AgPiBzY3JvbGwgfHwgbGFzdCAmJiB0b3AgKyBlbC5vZmZzZXRUb3AgPCBzY3JvbGwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhc3QgJiYgb2Zmc2V0KHRoaXMkMS50YXJnZXRzW2kgKyAxXSkudG9wIDw9IHNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsID49IG1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSB0aGlzJDEudGFyZ2V0cy5sZW5ndGggLSAxOyBqID4gaTsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0luVmlldyh0aGlzJDEudGFyZ2V0c1tqXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gdGhpcyQxLnRhcmdldHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEodGhpcyQxLmFjdGl2ZSA9ICQkMShmaWx0ZXIodGhpcyQxLmxpbmtzLCAoXCJbaHJlZj1cXFwiI1wiICsgKGVsLmlkKSArIFwiXFxcIl1cIikpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlua3MuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmJsdXIoKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudHMsIHRoaXMuY2xzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdhY3RpdmUnLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5jbG9zZXN0ID8gY2xvc2VzdCh0aGlzLmFjdGl2ZSwgdGhpcy5jbG9zZXN0KSA6IHRoaXMuYWN0aXZlLCB0aGlzLmNscylcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxufTtcblxudmFyIFN0aWNreSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzdGlja3knLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0b3A6IG51bGwsXG4gICAgICAgICAgICBib3R0b206IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlcixcbiAgICAgICAgICAgIGFuaW1hdGlvbjogU3RyaW5nLFxuICAgICAgICAgICAgY2xzQWN0aXZlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRml4ZWQ6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0JlbG93OiBTdHJpbmcsXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoRWxlbWVudDogJ3F1ZXJ5JyxcbiAgICAgICAgICAgIHNob3dPblVwOiBCb29sZWFuLFxuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYScsXG4gICAgICAgICAgICB0YXJnZXQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBib3R0b206IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiAnJyxcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogJ3VrLWFjdGl2ZScsXG4gICAgICAgICAgICBjbHNJbmFjdGl2ZTogJycsXG4gICAgICAgICAgICBjbHNGaXhlZDogJ3VrLXN0aWNreS1maXhlZCcsXG4gICAgICAgICAgICBjbHNCZWxvdzogJ3VrLXN0aWNreS1iZWxvdycsXG4gICAgICAgICAgICBzZWxUYXJnZXQ6ICcnLFxuICAgICAgICAgICAgd2lkdGhFbGVtZW50OiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dPblVwOiBmYWxzZSxcbiAgICAgICAgICAgIG1lZGlhOiBmYWxzZSxcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBzZWxUYXJnZXQ6IGZ1bmN0aW9uIHNlbFRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxUYXJnZXQgPSByZWYuc2VsVGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbFRhcmdldCAmJiAkJDEoc2VsVGFyZ2V0LCAkZWwpIHx8ICRlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuXG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJCQxKCc8ZGl2IGNsYXNzPVwidWstc3RpY2t5LXBsYWNlaG9sZGVyXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB0aGlzLndpZHRoRWxlbWVudCA9IHRoaXMuJHByb3BzLndpZHRoRWxlbWVudCB8fCB0aGlzLnBsYWNlaG9sZGVyO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzSW5hY3RpdmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW1vdmUodGhpcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMud2lkdGhFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBpZiAoISh0aGlzLnRhcmdldCAmJiBsb2NhdGlvbi5oYXNoICYmIHdpbi5wYWdlWU9mZnNldCA+IDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCQxKGxvY2F0aW9uLmhhc2gpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gb2Zmc2V0KHRhcmdldCkudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxUb3AgPSBvZmZzZXQodGhpcyQxLiRlbCkudG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxIZWlnaHQgPSB0aGlzJDEuJGVsLm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxUb3AgKyBlbEhlaWdodCA+PSB0b3AgJiYgZWxUb3AgPD0gdG9wICsgdGFyZ2V0Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKDAsIHRvcCAtIGVsSGVpZ2h0IC0gdGhpcyQxLnRhcmdldCAtIHRoaXMkMS5vZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2FjdGl2ZScsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0luYWN0aXZlLCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2luYWN0aXZlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlLCB0aGlzLmNsc0luYWN0aXZlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySGVpZ2h0ID0gKHRoaXMuaXNBY3RpdmUgPyBwbGFjZWhvbGRlciA6IHRoaXMuJGVsKS5vZmZzZXRIZWlnaHQsIGVsO1xuXG4gICAgICAgICAgICAgICAgICAgIGNzcyhwbGFjZWhvbGRlciwgYXNzaWduKFxuICAgICAgICAgICAgICAgICAgICAgICAge2hlaWdodDogY3NzKHRoaXMuJGVsLCAncG9zaXRpb24nKSAhPT0gJ2Fic29sdXRlJyA/IG91dGVySGVpZ2h0IDogJyd9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCBbJ21hcmdpblRvcCcsICdtYXJnaW5Cb3R0b20nLCAnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddKVxuICAgICAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXdpdGhpbihwbGFjZWhvbGRlciwgZG9jRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlcih0aGlzLiRlbCwgcGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cihwbGFjZWhvbGRlciwgJ2hpZGRlbicsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGF0dHIodGhpcy53aWR0aEVsZW1lbnQsICdoaWRkZW4nLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMud2lkdGhFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBhdHRyKHRoaXMud2lkdGhFbGVtZW50LCAnaGlkZGVuJywgdGhpcy5pc0FjdGl2ZSA/IG51bGwgOiAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3BPZmZzZXQgPSBvZmZzZXQodGhpcy5pc0FjdGl2ZSA/IHBsYWNlaG9sZGVyIDogdGhpcy4kZWwpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3R0b21PZmZzZXQgPSB0aGlzLnRvcE9mZnNldCArIG91dGVySGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgIFsndG9wJywgJ2JvdHRvbSddLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW3Byb3BdID0gdGhpcyQxLiRwcm9wc1twcm9wXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzJDFbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc051bWVyaWModGhpcyQxW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW3Byb3BdID0gdGhpcyQxWyhwcm9wICsgXCJPZmZzZXRcIildICsgdG9GbG9hdCh0aGlzJDFbcHJvcF0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHRoaXMkMVtwcm9wXSkgJiYgdGhpcyQxW3Byb3BdLm1hdGNoKC9eLT9cXGQrdmgkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW3Byb3BdID0gaGVpZ2h0KHdpbikgKiB0b0Zsb2F0KHRoaXMkMVtwcm9wXSkgLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbCA9IHRoaXMkMVtwcm9wXSA9PT0gdHJ1ZSA/IHRoaXMkMS4kZWwucGFyZW50Tm9kZSA6IHF1ZXJ5KHRoaXMkMVtwcm9wXSwgdGhpcyQxLiRlbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDFbcHJvcF0gPSBvZmZzZXQoZWwpLnRvcCArIGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3AgPSBNYXRoLm1heCh0b0Zsb2F0KHRoaXMudG9wKSwgdGhpcy50b3BPZmZzZXQpIC0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tID0gdGhpcy5ib3R0b20gJiYgdGhpcy5ib3R0b20gLSBvdXRlckhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRoaXMubWVkaWEgJiYgIXdpbi5tYXRjaE1lZGlhKHRoaXMubWVkaWEpLm1hdGNoZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXRUb3AgPSBvZmZzZXQodGhpcy4kZWwpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGlzVmlzaWJsZSh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZi5kaXI7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gdGhpcy5zY3JvbGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA8IDAgfHwgIXRoaXMudmlzaWJsZSB8fCB0aGlzLmRpc2FibGVkIHx8IHRoaXMuc2hvd09uVXAgJiYgIWRpcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5hY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHNjcm9sbCA8IHRoaXMudG9wXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnNob3dPblVwICYmIChzY3JvbGwgPD0gdGhpcy50b3AgfHwgZGlyID09PSAnZG93bicgfHwgZGlyID09PSAndXAnICYmICF0aGlzLmlzQWN0aXZlICYmIHNjcm9sbCA8PSB0aGlzLmJvdHRvbU9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24gJiYgc2Nyb2xsID4gdGhpcy50b3BPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24ub3V0KHRoaXMuJGVsLCB0aGlzLmFuaW1hdGlvbikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuaGlkZSgpOyB9LCBub29wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWN0aXZlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBBbmltYXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uLmluKHRoaXMuJGVsLCB0aGlzLmFuaW1hdGlvbikudGhlbihudWxsLCBub29wKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJ11cblxuICAgICAgICAgICAgfSBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLnBsYWNlaG9sZGVyLCAnaGlkZGVuJywgbnVsbCk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgaGFzQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNGaXhlZCwgdGhpcy5jbHNCZWxvdyk7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7cG9zaXRpb246ICcnLCB0b3A6ICcnLCB3aWR0aDogJyd9KTtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMucGxhY2Vob2xkZXIsICdoaWRkZW4nLCAnJyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IE1hdGgubWF4KDAsIHRoaXMub2Zmc2V0KSwgYWN0aXZlID0gdGhpcy5zY3JvbGwgPiB0aGlzLnRvcDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJvdHRvbSAmJiB0aGlzLnNjcm9sbCA+IHRoaXMuYm90dG9tIC0gdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gdGhpcy5ib3R0b20gLSB0aGlzLnNjcm9sbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogKHRvcCArIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGhpcy5zZWxUYXJnZXQsIHRoaXMuY2xzQWN0aXZlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNCZWxvdywgdGhpcy5zY3JvbGwgPiB0aGlzLmJvdHRvbU9mZnNldCk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRml4ZWQpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBzdmdzID0ge307XG5cbnZhciBTdmcgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc3ZnJywge1xuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBpZDogU3RyaW5nLFxuICAgICAgICAgICAgaWNvbjogU3RyaW5nLFxuICAgICAgICAgICAgc3JjOiBTdHJpbmcsXG4gICAgICAgICAgICBzdHlsZTogU3RyaW5nLFxuICAgICAgICAgICAgd2lkdGg6IE51bWJlcixcbiAgICAgICAgICAgIGhlaWdodDogTnVtYmVyLFxuICAgICAgICAgICAgcmF0aW86IE51bWJlcixcbiAgICAgICAgICAgICdjbGFzcyc6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICByYXRpbzogMSxcbiAgICAgICAgICAgIGlkOiBmYWxzZSxcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFsnc3JjJ10sXG4gICAgICAgICAgICAnY2xhc3MnOiAnJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLmNsYXNzICs9ICcgdWstc3ZnJztcbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pY29uICYmIGluY2x1ZGVzKHRoaXMuc3JjLCAnIycpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSB0aGlzLnNyYy5zcGxpdCgnIycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcmMgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uID0gcGFydHNbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuZ2V0U3ZnKCkudGhlbihmdW5jdGlvbiAoc3ZnKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcoc3ZnKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuaWNvbiAmJiBpbmNsdWRlcyhzdmcsICc8c3ltYm9sJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2ZyA9IHBhcnNlU3ltYm9scyhzdmcsIHRoaXMkMS5pY29uKSB8fCBzdmc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbCA9ICQkMShzdmcuc3Vic3RyKHN2Zy5pbmRleE9mKCc8c3ZnJykpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsID0gc3ZnLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnU1ZHIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGF0dHIoZWwsICd2aWV3Qm94Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGltZW5zaW9ucykge1xuICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zID0gZGltZW5zaW9ucy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEud2lkdGggPSB0aGlzJDEuJHByb3BzLndpZHRoIHx8IGRpbWVuc2lvbnNbMl07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5oZWlnaHQgPSB0aGlzJDEuJHByb3BzLmhlaWdodCB8fCBkaW1lbnNpb25zWzNdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMkMS53aWR0aCAqPSB0aGlzJDEucmF0aW87XG4gICAgICAgICAgICAgICAgdGhpcyQxLmhlaWdodCAqPSB0aGlzJDEucmF0aW87XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMkMS4kb3B0aW9ucy5wcm9wcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxW3Byb3BdICYmICFpbmNsdWRlcyh0aGlzJDEuZXhjbHVkZSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIoZWwsIHByb3AsIHRoaXMkMVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMkMS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnaWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcyQxLndpZHRoICYmICF0aGlzJDEuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUF0dHIoZWwsICdoZWlnaHQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmhlaWdodCAmJiAhdGhpcyQxLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUF0dHIoZWwsICd3aWR0aCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb290ID0gdGhpcyQxLiRlbDtcbiAgICAgICAgICAgICAgICBpZiAoaXNWb2lkRWxlbWVudChyb290KSB8fCByb290LnRhZ05hbWUgPT09ICdDQU5WQVMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYXR0cihyb290LCB7aGlkZGVuOiB0cnVlLCBpZDogbnVsbH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gcm9vdC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIGVsLmlzRXF1YWxOb2RlKG5leHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlcihyb290LCBlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3QgPSByb290Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0ICYmIGVsLmlzRXF1YWxOb2RlKGxhc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbCA9IGxhc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQocm9vdCwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzJDEuc3ZnRWwgPSBlbDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcblxuICAgICAgICAgICAgfSwgbm9vcCk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIGlmIChpc1ZvaWRFbGVtZW50KHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsIHtoaWRkZW46IG51bGwsIGlkOiB0aGlzLmlkIHx8IG51bGx9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3ZnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdmcudGhlbihmdW5jdGlvbiAoc3ZnKSB7IHJldHVybiAoIXRoaXMkMS5fY29ubmVjdGVkIHx8IHN2ZyAhPT0gdGhpcyQxLnN2Z0VsKSAmJiByZW1vdmUoc3ZnKTsgfSwgbm9vcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc3ZnID0gdGhpcy5zdmdFbCA9IG51bGw7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGdldFN2ZzogZnVuY3Rpb24gZ2V0U3ZnKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdmdzW3RoaXMuc3JjXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Znc1t0aGlzLnNyY107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3Znc1t0aGlzLnNyY10gPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGgodGhpcyQxLnNyYywgJ2RhdGE6JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMkMS5zcmMuc3BsaXQoJywnKVsxXSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhamF4KHRoaXMkMS5zcmMpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHhocikgeyByZXR1cm4gcmVzb2x2ZSh4aHIucmVzcG9uc2UpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlamVjdCgnU1ZHIG5vdCBmb3VuZC4nKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzdmdzW3RoaXMuc3JjXTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdmFyIHN5bWJvbFJlID0gLzxzeW1ib2woLio/aWQ9KFsnXCJdKSguKj8pXFwyW15dKj88XFwvKXN5bWJvbD4vZyxcbiAgICAgICAgc3ltYm9scyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gcGFyc2VTeW1ib2xzKHN2ZywgaWNvbikge1xuXG4gICAgICAgIGlmICghc3ltYm9sc1tzdmddKSB7XG5cbiAgICAgICAgICAgIHN5bWJvbHNbc3ZnXSA9IHt9O1xuXG4gICAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgICB3aGlsZSAobWF0Y2ggPSBzeW1ib2xSZS5leGVjKHN2ZykpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2xzW3N2Z11bbWF0Y2hbM11dID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCJcIiArIChtYXRjaFsxXSkgKyBcInN2Zz5cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN5bWJvbHNbc3ZnXVtpY29uXTtcbiAgICB9XG5cbn07XG5cbnZhciBTd2l0Y2hlciA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzd2l0Y2hlcicsIHtcblxuICAgICAgICBtaXhpbnM6IFtUb2dnbGFibGVdLFxuXG4gICAgICAgIGFyZ3M6ICdjb25uZWN0JyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY29ubmVjdDogU3RyaW5nLFxuICAgICAgICAgICAgdG9nZ2xlOiBTdHJpbmcsXG4gICAgICAgICAgICBhY3RpdmU6IE51bWJlcixcbiAgICAgICAgICAgIHN3aXBpbmc6IEJvb2xlYW5cbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY29ubmVjdDogJ34udWstc3dpdGNoZXInLFxuICAgICAgICAgICAgdG9nZ2xlOiAnPiAqJyxcbiAgICAgICAgICAgIGFjdGl2ZTogMCxcbiAgICAgICAgICAgIHN3aXBpbmc6IHRydWUsXG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxuICAgICAgICAgICAgY2xzQ29udGFpbmVyOiAndWstc3dpdGNoZXInLFxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay1zd2l0Y2hlci1pdGVtJyxcbiAgICAgICAgICAgIHF1ZXVlZDogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGNvbm5lY3RzOiBmdW5jdGlvbiBjb25uZWN0cyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBjb25uZWN0ID0gcmVmLmNvbm5lY3Q7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlBbGwoY29ubmVjdCwgJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRvZ2dsZXM6IGZ1bmN0aW9uIHRvZ2dsZXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gcmVmLnRvZ2dsZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkJCh0b2dnbGUsICRlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy50b2dnbGUpICsgXCI6bm90KC51ay1kaXNhYmxlZClcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhlLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RzO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCJbXCIgKyAodGhpcy5hdHRySXRlbSkgKyBcIl0sW2RhdGEtXCIgKyAodGhpcy5hdHRySXRlbSkgKyBcIl1cIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhkYXRhKGUuY3VycmVudCwgdGhpcy5hdHRySXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3dpcGVSaWdodCBzd2lwZUxlZnQnLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN3aXBpbmc7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdHM7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVG91Y2goZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3aW4uZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KGUudHlwZSA9PT0gJ3N3aXBlTGVmdCcgPyAnbmV4dCcgOiAncHJldmlvdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdGhpcy5jb25uZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0KSB7IHJldHVybiB0aGlzJDEudXBkYXRlQXJpYShsaXN0LmNoaWxkcmVuKTsgfSk7XG4gICAgICAgICAgICB0aGlzLnNob3coZmlsdGVyKHRoaXMudG9nZ2xlcywgKFwiLlwiICsgKHRoaXMuY2xzKSkpWzBdIHx8IHRoaXMudG9nZ2xlc1t0aGlzLmFjdGl2ZV0gfHwgdGhpcy50b2dnbGVzWzBdKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb25uZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSB0aGlzLnRvZ2dsZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gaW5kZXgoZmlsdGVyKHRoaXMuY29ubmVjdHNbMF0uY2hpbGRyZW4sIChcIi5cIiArICh0aGlzLmNscykpKVswXSksXG4gICAgICAgICAgICAgICAgICAgIGhhc1ByZXYgPSBwcmV2ID49IDAsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSBnZXRJbmRleChpdGVtLCB0aGlzLnRvZ2dsZXMsIHByZXYpLFxuICAgICAgICAgICAgICAgICAgICBkaXIgPSBpdGVtID09PSAncHJldmlvdXMnID8gLTEgOiAxLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGU7XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrLCBuZXh0ID0gKG5leHQgKyBkaXIgKyBsZW5ndGgpICUgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlcyh0aGlzJDEudG9nZ2xlc1tuZXh0XSwgJy51ay1kaXNhYmxlZCwgW2Rpc2FibGVkXScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGUgPSB0aGlzJDEudG9nZ2xlc1tuZXh0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0b2dnbGUgfHwgcHJldiA+PSAwICYmIGhhc0NsYXNzKHRvZ2dsZSwgdGhpcy5jbHMpIHx8IHByZXYgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMudG9nZ2xlcywgdGhpcy5jbHMpO1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy50b2dnbGVzLCAnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0b2dnbGUsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICBhdHRyKHRvZ2dsZSwgJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdHMuZm9yRWFjaChmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1ByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGVOb3cobGlzdC5jaGlsZHJlbltuZXh0XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlRWxlbWVudChbbGlzdC5jaGlsZHJlbltwcmV2XSwgbGlzdC5jaGlsZHJlbltuZXh0XV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxudmFyIFRhYiA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCd0YWInLCBVSWtpdC5jb21wb25lbnRzLnN3aXRjaGVyLmV4dGVuZCh7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIG5hbWU6ICd0YWInLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBtZWRpYTogJ21lZGlhJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBtZWRpYTogOTYwLFxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay10YWItaXRlbSdcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuXG4gICAgICAgICAgICB2YXIgY2xzID0gaGFzQ2xhc3ModGhpcy4kZWwsICd1ay10YWItbGVmdCcpXG4gICAgICAgICAgICAgICAgPyAndWstdGFiLWxlZnQnXG4gICAgICAgICAgICAgICAgOiBoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXRhYi1yaWdodCcpXG4gICAgICAgICAgICAgICAgICAgID8gJ3VrLXRhYi1yaWdodCdcbiAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGNscykge1xuICAgICAgICAgICAgICAgIFVJa2l0LnRvZ2dsZSh0aGlzLiRlbCwge2NsczogY2xzLCBtb2RlOiAnbWVkaWEnLCBtZWRpYTogdGhpcy5tZWRpYX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KSk7XG5cbn07XG5cbnZhciBUb2dnbGUgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndG9nZ2xlJywge1xuXG4gICAgICAgIG1peGluczogW1VJa2l0Lm1peGluLnRvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ3RhcmdldCcsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGhyZWY6IFN0cmluZyxcbiAgICAgICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIG1lZGlhOiAnbWVkaWEnXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGhyZWY6IGZhbHNlLFxuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGU6ICdjbGljaycsXG4gICAgICAgICAgICBxdWV1ZWQ6IHRydWUsXG4gICAgICAgICAgICBtZWRpYTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uIHRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBocmVmID0gcmVmLmhyZWY7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBxdWVyeUFsbCh0YXJnZXQgfHwgaHJlZiwgJGVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmxlbmd0aCAmJiB0YXJnZXQgfHwgWyRlbF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogKHBvaW50ZXJFbnRlciArIFwiIFwiICsgcG9pbnRlckxlYXZlKSxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5jbHVkZXModGhpcy5tb2RlLCAnaG92ZXInKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKFwidG9nZ2xlXCIgKyAoZS50eXBlID09PSBwb2ludGVyRW50ZXIgPyAnc2hvdycgOiAnaGlkZScpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2NsaWNrJykgfHwgaGFzVG91Y2g7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUb3VjaChlKSAmJiAhaW5jbHVkZXModGhpcy5tb2RlLCAnY2xpY2snKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBiZXR0ZXIgaXNUb2dnbGVkIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5rO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdChlLnRhcmdldCwgJ2FbaHJlZj1cIiNcIl0sIGJ1dHRvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAobGluayA9IGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWZdJykpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFpc1Zpc2libGUodGhpcy50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGluay5oYXNoICYmIG1hdGNoZXModGhpcy50YXJnZXQsIGxpbmsuaGFzaClcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVzKHRoaXMubW9kZSwgJ21lZGlhJykgfHwgIXRoaXMubWVkaWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVkID0gdGhpcy5pc1RvZ2dsZWQodGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICh3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzID8gIXRvZ2dsZWQgOiB0b2dnbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZSh0eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIodGhpcy50YXJnZXQsIHR5cGUgfHwgJ3RvZ2dsZScsIFt0aGlzXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBWaWRlbyA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCd2aWRlbycsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgYXV0b211dGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBhdXRvcGxheTogQm9vbGVhbixcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge2F1dG9tdXRlOiBmYWxzZSwgYXV0b3BsYXk6IHRydWV9LFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b211dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5tdXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUodGhpcy4kZWwpIHx8IGNzcyh0aGlzLiRlbCwgJ3Zpc2liaWxpdHknKSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnXVxuXG4gICAgICAgIH0sXG5cbiAgICB9KTtcblxufTtcblxudmFyIGNvcmUgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBzY3JvbGwgPSAwLCBzdGFydGVkID0gMDtcblxuICAgIG9uKHdpbiwgJ2xvYWQgcmVzaXplJywgVUlraXQudXBkYXRlKTtcbiAgICBvbih3aW4sICdzY3JvbGwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLmRpciA9IHNjcm9sbCA8IHdpbi5wYWdlWU9mZnNldCA/ICdkb3duJyA6ICd1cCc7XG4gICAgICAgIHNjcm9sbCA9IHdpbi5wYWdlWU9mZnNldDtcbiAgICAgICAgVUlraXQudXBkYXRlKGUpO1xuICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XG4gICAgfSk7XG5cbiAgICBhbmltYXRpb25zdGFydCAmJiBvbihkb2MsIGFuaW1hdGlvbnN0YXJ0LCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgIGlmICgoY3NzKHRhcmdldCwgJ2FuaW1hdGlvbk5hbWUnKSB8fCAnJykubWF0Y2goL151ay0uKihsZWZ0fHJpZ2h0KS8pKSB7XG4gICAgICAgICAgICBzdGFydGVkKys7XG4gICAgICAgICAgICBkb2MuYm9keS5zdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghLS1zdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvYy5ib2R5LnN0eWxlLm92ZXJmbG93WCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRvTXMoY3NzKHRhcmdldCwgJ2FuaW1hdGlvbkR1cmF0aW9uJykpICsgMTAwKTtcbiAgICAgICAgfVxuICAgIH0sIHRydWUpO1xuXG4gICAgLy8gY29yZSBjb21wb25lbnRzXG4gICAgVUlraXQudXNlKFRvZ2dsZSk7XG4gICAgVUlraXQudXNlKEFjY29yZGlvbik7XG4gICAgVUlraXQudXNlKEFsZXJ0KTtcbiAgICBVSWtpdC51c2UoVmlkZW8pO1xuICAgIFVJa2l0LnVzZShDb3Zlcik7XG4gICAgVUlraXQudXNlKERyb3ApO1xuICAgIFVJa2l0LnVzZShEcm9wZG93bik7XG4gICAgVUlraXQudXNlKEZvcm1DdXN0b20pO1xuICAgIFVJa2l0LnVzZShIZWlnaHRNYXRjaCk7XG4gICAgVUlraXQudXNlKEhlaWdodFZpZXdwb3J0KTtcbiAgICBVSWtpdC51c2UoSG92ZXIpO1xuICAgIFVJa2l0LnVzZShNYXJnaW4pO1xuICAgIFVJa2l0LnVzZShHaWYpO1xuICAgIFVJa2l0LnVzZShHcmlkKTtcbiAgICBVSWtpdC51c2UoTGVhZGVyKTtcbiAgICBVSWtpdC51c2UoTW9kYWwkMSk7XG4gICAgVUlraXQudXNlKE5hdik7XG4gICAgVUlraXQudXNlKE5hdmJhcik7XG4gICAgVUlraXQudXNlKE9mZmNhbnZhcyk7XG4gICAgVUlraXQudXNlKFJlc3BvbnNpdmUpO1xuICAgIFVJa2l0LnVzZShTY3JvbGwpO1xuICAgIFVJa2l0LnVzZShTY3JvbGxzcHkpO1xuICAgIFVJa2l0LnVzZShTY3JvbGxzcHlOYXYpO1xuICAgIFVJa2l0LnVzZShTdGlja3kpO1xuICAgIFVJa2l0LnVzZShTdmcpO1xuICAgIFVJa2l0LnVzZShJY29uKTtcbiAgICBVSWtpdC51c2UoU3dpdGNoZXIpO1xuICAgIFVJa2l0LnVzZShUYWIpO1xuXG59O1xuXG5VSWtpdCQyLnZlcnNpb24gPSAnMy4wLjAtYmV0YS4zMyc7XG5cbm1peGluKFVJa2l0JDIpO1xuY29yZShVSWtpdCQyKTtcblxuZnVuY3Rpb24gcGx1Z2luKFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyICQgPSByZWYuJDtcbiAgICB2YXIgZG9jID0gcmVmLmRvYztcbiAgICB2YXIgZW1wdHkgPSByZWYuZW1wdHk7XG4gICAgdmFyIGh0bWwgPSByZWYuaHRtbDtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnY291bnRkb3duJywge1xuXG4gICAgICAgIG1peGluczogW1VJa2l0Lm1peGluLmNsYXNzXSxcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGF0ZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzV3JhcHBlcjogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGRhdGU6ICcnLFxuICAgICAgICAgICAgY2xzV3JhcHBlcjogJy51ay1jb3VudGRvd24tJXVuaXQlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGRhdGU6IGZ1bmN0aW9uIGRhdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSByZWYuZGF0ZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlLnBhcnNlKGRhdGUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZGF5czogZnVuY3Rpb24gZGF5cyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBjbHNXcmFwcGVyID0gcmVmLmNsc1dyYXBwZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJChjbHNXcmFwcGVyLnJlcGxhY2UoJyV1bml0JScsICdkYXlzJyksICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBob3VyczogZnVuY3Rpb24gaG91cnMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnaG91cnMnKSwgJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG1pbnV0ZXM6IGZ1bmN0aW9uIG1pbnV0ZXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnbWludXRlcycpLCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2Vjb25kczogZnVuY3Rpb24gc2Vjb25kcyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBjbHNXcmFwcGVyID0gcmVmLmNsc1dyYXBwZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJChjbHNXcmFwcGVyLnJlcGxhY2UoJyV1bml0JScsICdzZWNvbmRzJyksICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1bml0czogZnVuY3Rpb24gdW5pdHMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gWydkYXlzJywgJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcyddLmZpbHRlcihmdW5jdGlvbiAodW5pdCkgeyByZXR1cm4gdGhpcyQxW3VuaXRdOyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy51bml0cy5mb3JFYWNoKGZ1bmN0aW9uICh1bml0KSB7IHJldHVybiBlbXB0eSh0aGlzJDFbdW5pdF0pOyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Zpc2liaWxpdHljaGFuZ2UnLFxuXG4gICAgICAgICAgICAgICAgZWw6IGRvYyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2MuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciB0aW1lc3BhbiA9IGdldFRpbWVTcGFuKHRoaXMuZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGltZXNwYW4udG90YWwgPD0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzcGFuLmRheXNcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4uaG91cnNcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4ubWludXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgPSB0aW1lc3Bhbi5zZWNvbmRzXG4gICAgICAgICAgICAgICAgICAgICAgICA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51bml0cy5mb3JFYWNoKGZ1bmN0aW9uICh1bml0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IFN0cmluZyhNYXRoLmZsb29yKHRpbWVzcGFuW3VuaXRdKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZGlnaXRzID0gZGlnaXRzLmxlbmd0aCA8IDIgPyAoXCIwXCIgKyBkaWdpdHMpIDogZGlnaXRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXMkMVt1bml0XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLnRleHRDb250ZW50ICE9PSBkaWdpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5zcGxpdCgnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWdpdHMubGVuZ3RoICE9PSBlbC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sKGVsLCBkaWdpdHMubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuICc8c3Bhbj48L3NwYW4+JzsgfSkuam9pbignJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHMuZm9yRWFjaChmdW5jdGlvbiAoZGlnaXQsIGkpIHsgcmV0dXJuIGVsLmNoaWxkcmVuW2ldLnRleHRDb250ZW50ID0gZGlnaXQ7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLnVuaXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuJGVtaXQoKTsgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRUaW1lU3BhbihkYXRlKSB7XG5cbiAgICAgICAgdmFyIHRvdGFsID0gZGF0ZSAtIERhdGUubm93KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICAgICAgICAgIHNlY29uZHM6IHRvdGFsIC8gMTAwMCAlIDYwLFxuICAgICAgICAgICAgbWludXRlczogdG90YWwgLyAxMDAwIC8gNjAgJSA2MCxcbiAgICAgICAgICAgIGhvdXJzOiB0b3RhbCAvIDEwMDAgLyA2MCAvIDYwICUgMjQsXG4gICAgICAgICAgICBkYXlzOiB0b3RhbCAvIDEwMDAgLyA2MCAvIDYwIC8gMjRcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuaWYgKCF0cnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5VSWtpdCkge1xuICAgIHdpbmRvdy5VSWtpdC51c2UocGx1Z2luKTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDEoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkJCA9IHJlZi4kJDtcbiAgICB2YXIgYWRkQ2xhc3MgPSByZWYuYWRkQ2xhc3M7XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gICAgdmFyIHNjcm9sbGVkT3ZlciA9IHJlZi5zY3JvbGxlZE92ZXI7XG4gICAgdmFyIHRvRmxvYXQgPSByZWYudG9GbG9hdDtcbiAgICB2YXIgdG9Ob2RlcyA9IHJlZi50b05vZGVzO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdncmlkLXBhcmFsbGF4JywgVUlraXQuY29tcG9uZW50cy5ncmlkLmV4dGVuZCh7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogU3RyaW5nLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogMTUwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHJlZi50cmFuc2xhdGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnModHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCA/ICQkKHRhcmdldCwgJGVsKSA6IHRvTm9kZXMoJGVsLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLWdyaWQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ21hcmdpbkJvdHRvbScsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5yb3dzICYmIHRoaXMucm93c1swXSAmJiB0aGlzLnJvd3NbMF0ubGVuZ3RoIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93cyA9IHRoaXMucm93cyAmJiB0aGlzLnJvd3MubWFwKGZ1bmN0aW9uIChlbGVtZW50cykgeyByZXR1cm4gc29ydEJ5KGVsZW1lbnRzLCAnb2Zmc2V0TGVmdCcpOyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtYXJnaW5Cb3R0b20nLCB0aGlzLmNvbHVtbnMgPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMudHJhbnNsYXRlICsgdG9GbG9hdChjc3MoY3NzKHRoaXMuJGVsLCAnbWFyZ2luQm90dG9tJywgJycpLCAnbWFyZ2luQm90dG9tJykpXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxlZCA9IHNjcm9sbGVkT3Zlcih0aGlzLiRlbCkgKiB0aGlzLnRyYW5zbGF0ZTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvd3MgfHwgdGhpcy5jb2x1bW5zID09PSAxIHx8ICF0aGlzLnNjcm9sbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKHJvdykgeyByZXR1cm4gcm93LmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBjc3MoZWwsICd0cmFuc2Zvcm0nLCAoXCJ0cmFuc2xhdGVZKFwiICsgKGkgJSAyID8gdGhpcyQxLnNjcm9sbGVkIDogdGhpcyQxLnNjcm9sbGVkIC8gOCkgKyBcInB4KVwiKSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7IH1cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy5pdGVtcywgJ3RyYW5zZm9ybScsICcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KSk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2dyaWQtcGFyYWxsYXgnKS5vcHRpb25zLnVwZGF0ZS51bnNoaWZ0KHtcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNvcnRCeShjb2xsZWN0aW9uLCBwcm9wKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbcHJvcF0gPiBiW3Byb3BdXG4gICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgOiBiW3Byb3BdID4gYVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgICAgIDogMDsgfVxuICAgICAgICApXG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQxKTtcbn1cblxudmFyIEFuaW1hdGlvbnMgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuXG4gICAgdmFyIEFuaW1hdGlvbnMgPSB7XG5cbiAgICAgICAgc2xpZGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoZGlyICogLTEwMCl9LFxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFuaW1hdGlvbnMudHJhbnNsYXRlZChjdXJyZW50KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJDEocGVyY2VudCwgZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKGRpciAqIC0xMDAgKiBwZXJjZW50KX0sXG4gICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZShkaXIgKiAxMDAgKiAoMSAtIHBlcmNlbnQpKX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhbnNsYXRlZDogZnVuY3Rpb24gdHJhbnNsYXRlZChlbCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGNzcyhlbCwgJ3RyYW5zZm9ybScpLnNwbGl0KCcsJylbNF0gLyBlbC5vZmZzZXRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBBbmltYXRpb25zO1xuXG59O1xuXG5mdW5jdGlvbiB0cmFuc2xhdGUodmFsdWUpIHtcbiAgICBpZiAoIHZhbHVlID09PSB2b2lkIDAgKSB2YWx1ZSA9IDA7XG5cbiAgICByZXR1cm4gKFwidHJhbnNsYXRlKFwiICsgdmFsdWUgKyAodmFsdWUgPyAnJScgOiAnJykgKyBcIiwgMClcIik7IC8vIGN1cnJlbnRseSBub3QgdHJhbnNsYXRlM2QgdG8gc3VwcG9ydCBJRSwgdHJhbnNsYXRlM2Qgd2l0aGluIHRyYW5zbGF0ZTNkIGRvZXMgbm90IHdvcmsgd2hpbGUgdHJhbnNpdGlvbmluZ1xufVxuXG5mdW5jdGlvbiBzY2FsZTNkKHZhbHVlKSB7XG4gICAgcmV0dXJuIChcInNjYWxlM2QoXCIgKyB2YWx1ZSArIFwiLCBcIiArIHZhbHVlICsgXCIsIDEpXCIpO1xufVxuXG5mdW5jdGlvbiBwbHVnaW4kMyhVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQzLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyICQkID0gcmVmLiQkO1xuICAgIHZhciAkID0gcmVmLiQ7XG4gICAgdmFyIGFkZENsYXNzID0gcmVmLmFkZENsYXNzO1xuICAgIHZhciBhc3NpZ24gPSByZWYuYXNzaWduO1xuICAgIHZhciBjcmVhdGVFdmVudCA9IHJlZi5jcmVhdGVFdmVudDtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcbiAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuICAgIHZhciBkb2MgPSByZWYuZG9jO1xuICAgIHZhciBlbmRzV2l0aCA9IHJlZi5lbmRzV2l0aDtcbiAgICB2YXIgZmFzdGRvbSA9IHJlZi5mYXN0ZG9tO1xuICAgIHZhciBnZXRJbmRleCA9IHJlZi5nZXRJbmRleDtcbiAgICB2YXIgZ2V0UG9zID0gcmVmLmdldFBvcztcbiAgICB2YXIgaGFzQ2xhc3MgPSByZWYuaGFzQ2xhc3M7XG4gICAgdmFyIGluZGV4ID0gcmVmLmluZGV4O1xuICAgIHZhciBpc1RvdWNoID0gcmVmLmlzVG91Y2g7XG4gICAgdmFyIG5vb3AgPSByZWYubm9vcDtcbiAgICB2YXIgb2ZmID0gcmVmLm9mZjtcbiAgICB2YXIgb24gPSByZWYub247XG4gICAgdmFyIHBvaW50ZXJEb3duID0gcmVmLnBvaW50ZXJEb3duO1xuICAgIHZhciBwb2ludGVyTW92ZSA9IHJlZi5wb2ludGVyTW92ZTtcbiAgICB2YXIgcG9pbnRlclVwID0gcmVmLnBvaW50ZXJVcDtcbiAgICB2YXIgcHJldmVudENsaWNrID0gcmVmLnByZXZlbnRDbGljaztcbiAgICB2YXIgUHJvbWlzZSA9IHJlZi5Qcm9taXNlO1xuICAgIHZhciByZW1vdmVDbGFzcyA9IHJlZi5yZW1vdmVDbGFzcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSByZWYudG9nZ2xlQ2xhc3M7XG4gICAgdmFyIHRvTm9kZXMgPSByZWYudG9Ob2RlcztcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHJlZi5UcmFuc2l0aW9uO1xuICAgIHZhciB0cmlnZ2VyID0gcmVmLnRyaWdnZXI7XG4gICAgdmFyIHdpbiA9IHJlZi53aW47XG5cbiAgICB2YXIgYWJzID0gTWF0aC5hYnM7XG5cbiAgICBVSWtpdC5taXhpbi5zbGlkZXNob3cgPSB7XG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGF1dG9wbGF5OiBCb29sZWFuLFxuICAgICAgICAgICAgYXV0b3BsYXlJbnRlcnZhbDogTnVtYmVyLFxuICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiBCb29sZWFuLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBTdHJpbmcsXG4gICAgICAgICAgICBlYXNpbmc6IFN0cmluZyxcbiAgICAgICAgICAgIHZlbG9jaXR5OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlJbnRlcnZhbDogNzAwMCxcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogJ3NsaWRlJyxcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgICAgICAgICAgdmVsb2NpdHk6IDEsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIHN0YWNrOiBbXSxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICAgICAgICBwZXJjZW50OiAwLFxuICAgICAgICAgICAgY2xzQWN0aXZlOiAndWstYWN0aXZlJyxcbiAgICAgICAgICAgIGNsc0FjdGl2YXRlZDogJ3VrLXRyYW5zaXRpb24tYWN0aXZlJyxcbiAgICAgICAgICAgIGluaXRpYWxBbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgQW5pbWF0aW9uczogQW5pbWF0aW9ucyhVSWtpdClcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBsaXN0OiBmdW5jdGlvbiBsaXN0KHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbExpc3QgPSByZWYuc2VsTGlzdDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkKHNlbExpc3QsICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzbGlkZXM6IGZ1bmN0aW9uIHNsaWRlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9Ob2Rlcyh0aGlzLmxpc3QuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYW5pbWF0aW9uOiBmdW5jdGlvbiBhbmltYXRpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XG4gICAgICAgICAgICAgICAgdmFyIEFuaW1hdGlvbnMkJDEgPSByZWYuQW5pbWF0aW9ucztcblxuICAgICAgICAgICAgICAgIHJldHVybiBhc3NpZ24oYW5pbWF0aW9uIGluIEFuaW1hdGlvbnMkJDEgPyBBbmltYXRpb25zJCQxW2FuaW1hdGlvbl0gOiBBbmltYXRpb25zJCQxLnNsaWRlLCB7bmFtZTogYW5pbWF0aW9ufSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkdXJhdGlvbjogZnVuY3Rpb24gZHVyYXRpb24ocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmVsb2NpdHkgPSByZWYudmVsb2NpdHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc3BlZWRVcCgkZWwub2Zmc2V0V2lkdGggLyB2ZWxvY2l0eSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIFsnc3RhcnQnLCAnbW92ZScsICdlbmQnXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSB0aGlzJDFba2V5XTtcbiAgICAgICAgICAgICAgICB0aGlzJDFba2V5XSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGdldFBvcyhlKS54O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wcmV2UG9zID0gcG9zICE9PSB0aGlzJDEucG9zID8gdGhpcyQxLnBvcyA6IHRoaXMkMS5wcmV2UG9zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zID0gcG9zO1xuXG4gICAgICAgICAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NvbXB1dGVkcy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCJbXCIgKyAodGhpcy5hdHRySXRlbSkgKyBcIl0sW2RhdGEtXCIgKyAodGhpcy5hdHRySXRlbSkgKyBcIl1cIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhkYXRhKGUuY3VycmVudCwgdGhpcy5hdHRySXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogcG9pbnRlckRvd24sXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSB8fCAhaGFzVGV4dE5vZGVzT25seShlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd2aXNpYmlsaXR5Y2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGVsOiBkb2MsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogcG9pbnRlckRvd24sXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogJ3N0b3BBdXRvcGxheSdcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ21vdXNlZW50ZXInLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9wbGF5O1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSG92ZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ21vdXNlbGVhdmUnLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9wbGF5O1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSG92ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVpdGVtc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNlbExpc3QpICsgXCIgPiAqXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0YXJnZXQsIHRoaXMuY2xzQWN0aXZlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtc2hvd24nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5zZWxMaXN0KSArIFwiID4gKlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2YXRlZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXNob3cgaXRlbWhpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5zZWxMaXN0KSArIFwiID4gKlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoJCQoKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCI9XFxcIlwiICsgKGluZGV4KHRhcmdldCkpICsgXCJcXFwiXSxbZGF0YS1cIiArICh0aGlzLmF0dHJJdGVtKSArIFwiPVxcXCJcIiArIChpbmRleCh0YXJnZXQpKSArIFwiXFxcIl1cIiksIHRoaXMuJGVsKSwgdGhpcy5jbHNBY3RpdmUsIGVuZHNXaXRoKHR5cGUsICdzaG93JykpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1oaWRkZW4nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5zZWxMaXN0KSArIFwiID4gKlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmF0ZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93IGl0ZW1oaWRlIGl0ZW1zaG93biBpdGVtaGlkZGVuJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIFVJa2l0LnVwZGF0ZShudWxsLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdkcmFnc3RhcnQnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5idXR0b24gJiYgZS5idXR0b24gIT09IDAgfHwgdGhpcy5zbGlkZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbiAmJiB0aGlzLl9hbmltYXRpb24uYW5pbWF0aW9uICE9PSB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLl9hbmltYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXIgPSByZWYuZGlyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UGVyY2VudCA9IHJlZi5wZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FuY2VsID0gcmVmLmNhbmNlbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSQkMSA9IHJlZi50cmFuc2xhdGU7XG5cbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IGdldFBlcmNlbnQoKSAqIGRpcjtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSBhYnMocGVyY2VudCkgKiAtZGlyO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKDAsIHRoaXMuc3RhY2subGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlJCQxKGFicyhwZXJjZW50KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuZ2V0SW5kZXgodGhpcy5pbmRleCAtIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRNb3ZlID0gb24oZG9jLCBwb2ludGVyTW92ZSwgdGhpcy5tb3ZlLCB7Y2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICBvbih3aW4sICdzY3JvbGwnLCB0aGlzLnVuYmluZE1vdmUpO1xuICAgICAgICAgICAgICAgIG9uKGRvYywgcG9pbnRlclVwLCB0aGlzLmVuZCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWcgPSB0aGlzLnBvcyArIHRoaXMuJGVsLm9mZnNldFdpZHRoICogcGVyY2VudDtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gbW92ZShlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMucG9zIC0gdGhpcy5kcmFnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJldlBvcyA9PT0gdGhpcy5wb3MgfHwgIXRoaXMuZHJhZ2dpbmcgJiYgYWJzKGRpc3RhbmNlKSA8IHRoaXMudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLmNhbmNlbGFibGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IGRpc3RhbmNlIC8gdGhpcy4kZWwub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wZXJjZW50ID09PSBwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gdGhpcy5nZXRJbmRleCh0aGlzLmluZGV4IC0gdHJ1bmModGhpcy5wZXJjZW50KSksXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRJbmRleCh0aGlzLmluZGV4IC0gdHJ1bmMocGVyY2VudCkpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gdGhpcy5zbGlkZXNbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBkaXIgPSBwZXJjZW50IDwgMCA/IDEgOiAtMSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gZ2V0SW5kZXgocGVyY2VudCA8IDAgPyAnbmV4dCcgOiAncHJldmlvdXMnLCB0aGlzLnNsaWRlcywgaW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5zbGlkZXNbbmV4dEluZGV4XTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLmNsc0FjdGl2ZSwgaSA9PT0gaW5kZXggfHwgaSA9PT0gbmV4dEluZGV4KTsgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gJiYgdGhpcy5fYW5pbWF0aW9uLnJlc2V0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IHByZXZJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuc2xpZGVzW3ByZXZJbmRleF0sICdpdGVtaGlkZScsIFt0aGlzXSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoY3VycmVudCwgJ2l0ZW1zaG93JywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gPSBuZXcgVHJhbnNpdGlvbmVyKHRoaXMuYW5pbWF0aW9uLCB0aGlzLmVhc2luZywgY3VycmVudCwgbmV4dCwgZGlyLCBub29wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKGFicyhwZXJjZW50ICUgMSkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gcGVyY2VudDtcblxuICAgICAgICAgICAgICAgIFVJa2l0LnVwZGF0ZShudWxsLCBjdXJyZW50KTtcbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgbmV4dCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuICAgICAgICAgICAgICAgIG9mZih3aW4sICdzY3JvbGwnLCB0aGlzLnVuYmluZE1vdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTW92ZSgpO1xuICAgICAgICAgICAgICAgIG9mZihkb2MsIHBvaW50ZXJVcCwgdGhpcy5lbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHRoaXMucGVyY2VudDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSBhYnModGhpcy5wZXJjZW50KSAlIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldEluZGV4KHRoaXMuaW5kZXggLSB0cnVuYyhwZXJjZW50KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGVyY2VudCA8IC4xIHx8IHBlcmNlbnQgPCAwID09PSB0aGlzLnBvcyA+IHRoaXMucHJldlBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuZ2V0SW5kZXgocGVyY2VudCA+IDAgPyAncHJldmlvdXMnIDogJ25leHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IDEgLSB0aGlzLnBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50ICo9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uICYmIHRoaXMuX2FuaW1hdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3cocGVyY2VudCA+IDAgPyAncHJldmlvdXMnIDogJ25leHQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50Q2xpY2soKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1xuICAgICAgICAgICAgICAgICAgICA9IHRoaXMuZHJhZ2dpbmdcbiAgICAgICAgICAgICAgICAgICAgPSB0aGlzLnBlcmNlbnRcbiAgICAgICAgICAgICAgICAgICAgPSBudWxsO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGluZGV4LCBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICggZm9yY2UgPT09IHZvaWQgMCApIGZvcmNlID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgICAgIGlmICghZm9yY2UgJiYgdGhpcy5kcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrW2ZvcmNlID8gJ3Vuc2hpZnQnIDogJ3B1c2gnXShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmIHRoaXMuc3RhY2subGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmZvcndhcmQoMjUwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5nZXRJbmRleChpbmRleCksXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBoYXNDbGFzcyh0aGlzLnNsaWRlcywgJ3VrLWFjdGl2ZScpICYmIHRoaXMuc2xpZGVzW3ByZXZJbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLnNsaWRlc1tuZXh0SW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZXYgPT09IG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja1tmb3JjZSA/ICdzaGlmdCcgOiAncG9wJ10oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXYgJiYgdHJpZ2dlcihwcmV2LCAnYmVmb3JlaXRlbWhpZGUnLCBbdGhpc10pO1xuICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2JlZm9yZWl0ZW1zaG93JywgW3RoaXNdKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXh0SW5kZXg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBwcmV2ICYmIHRyaWdnZXIocHJldiwgJ2l0ZW1oaWRkZW4nLCBbdGhpcyQxXSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2l0ZW1zaG93bicsIFt0aGlzJDFdKTtcblxuICAgICAgICAgICAgICAgICAgICBmYXN0ZG9tLm11dGF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNob3codGhpcyQxLnN0YWNrLnNoaWZ0KCksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJldiB8fCB0aGlzLmluaXRpYWxBbmltYXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93KFxuICAgICAgICAgICAgICAgICAgICAgICAgIXByZXYgPyB0aGlzLkFuaW1hdGlvbnNbdGhpcy5pbml0aWFsQW5pbWF0aW9uXSA6IHRoaXMuYW5pbWF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2UgPyAnY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0MCwgMC40NDAsIDEuMDAwKScgOiB0aGlzLmVhc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGlyZWN0aW9uKGluZGV4LCBwcmV2SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5sZW5ndGggPiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldiAmJiB0cmlnZ2VyKHByZXYsICdpdGVtaGlkZScsIFt0aGlzXSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcihuZXh0LCAnaXRlbXNob3cnLCBbdGhpc10pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2ICYmICF0aGlzLmluaXRpYWxBbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXYgJiYgZmFzdGRvbS5mbHVzaCgpOyAvLyBpT1MgMTArIHdpbGwgaG9ub3IgdGhlIHZpZGVvLnBsYXkgb25seSBpZiBjYWxsZWQgZnJvbSBhIGdlc3R1cmUgaGFuZGxlclxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBfc2hvdzogZnVuY3Rpb24gX3Nob3coYW5pbWF0aW9uLCBlYXNpbmcsIHByZXYsIG5leHQsIGRpciwgZm9yd2FyZCwgZG9uZSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbmV3IFRyYW5zaXRpb25lcihcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgIHByZXYsXG4gICAgICAgICAgICAgICAgICAgIG5leHQsXG4gICAgICAgICAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgICAgICAgICAgZG9uZVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24uc2hvdyhcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9PT0gbmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAzMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZm9yd2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMTUwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQsXG4gICAgICAgICAgICAgICAgICAgIGZvcndhcmRcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRJbmRleDogZnVuY3Rpb24gZ2V0SW5kZXgkMShpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRJbmRleChpbmRleCwgdGhpcy5zbGlkZXMsIHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnRBdXRvcGxheTogZnVuY3Rpb24gc3RhcnRBdXRvcGxheSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQXV0b3BsYXkoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiAhKHRoaXMkMS5pc0hvdmVyaW5nICYmIHRoaXMkMS5wYXVzZU9uSG92ZXIpICYmIHRoaXMkMS5zaG93KCduZXh0Jyk7IH0sIHRoaXMuYXV0b3BsYXlJbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wQXV0b3BsYXk6IGZ1bmN0aW9uIHN0b3BBdXRvcGxheSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gVHJhbnNpdGlvbmVyKGFuaW1hdGlvbiwgZWFzaW5nLCBjdXJyZW50LCBuZXh0LCBkaXIsIGNiKSB7XG5cbiAgICAgICAgdmFyIHBlcmNlbnQgPSBhbmltYXRpb24ucGVyY2VudDtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSQkMSA9IGFuaW1hdGlvbi50cmFuc2xhdGU7XG4gICAgICAgIHZhciBzaG93ID0gYW5pbWF0aW9uLnNob3c7XG4gICAgICAgIHZhciBwcm9wcyA9IHNob3coZGlyKTtcblxuICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICAgICAgY3VycmVudDogY3VycmVudCxcbiAgICAgICAgICAgIG5leHQ6IG5leHQsXG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coZHVyYXRpb24sIHBlcmNlbnQsIGxpbmVhcikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICggcGVyY2VudCA9PT0gdm9pZCAwICkgcGVyY2VudCA9IDA7XG5cblxuICAgICAgICAgICAgICAgIHZhciBlYXNlID0gbGluZWFyID8gJ2xpbmVhcicgOiBlYXNpbmc7XG4gICAgICAgICAgICAgICAgZHVyYXRpb24gLT0gTWF0aC5yb3VuZChkdXJhdGlvbiAqIHBlcmNlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUocGVyY2VudCk7XG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyVXBkYXRlKG5leHQsICdpdGVtaW4nLCB7cGVyY2VudDogcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCBlYXNlOiBlYXNlLCBkaXI6IGRpcn0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgJiYgdHJpZ2dlclVwZGF0ZShjdXJyZW50LCAnaXRlbW91dCcsIHtwZXJjZW50OiAxIC0gcGVyY2VudCwgZHVyYXRpb246IGR1cmF0aW9uLCBlYXNlOiBlYXNlLCBkaXI6IGRpcn0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdGFydChuZXh0LCBwcm9wc1sxXSwgZHVyYXRpb24sIGVhc2UpLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ICYmIFRyYW5zaXRpb24uc3RhcnQoY3VycmVudCwgcHJvcHNbMF0sIGR1cmF0aW9uLCBlYXNlKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9LCBub29wKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRyYW5zaXRpb24uc3RvcChbbmV4dCwgY3VycmVudF0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwoW25leHQsIGN1cnJlbnRdKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHByb3BzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzcyhbbmV4dCwgY3VycmVudF0sIHByb3AsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmb3J3YXJkOiBmdW5jdGlvbiBmb3J3YXJkKGR1cmF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHRoaXMucGVyY2VudCgpO1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKFtuZXh0LCBjdXJyZW50XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGR1cmF0aW9uLCBwZXJjZW50LCB0cnVlKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkMShwZXJjZW50KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSB0cmFuc2xhdGUkJDEocGVyY2VudCwgZGlyKTtcbiAgICAgICAgICAgICAgICBjc3MobmV4dCwgcHJvcHNbMV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgJiYgY3NzKGN1cnJlbnQsIHByb3BzWzBdKTtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyVXBkYXRlKG5leHQsICdpdGVtdHJhbnNsYXRlaW4nLCB7cGVyY2VudDogcGVyY2VudCwgZGlyOiBkaXJ9KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ICYmIHRyaWdnZXJVcGRhdGUoY3VycmVudCwgJ2l0ZW10cmFuc2xhdGVvdXQnLCB7cGVyY2VudDogMSAtIHBlcmNlbnQsIGRpcjogZGlyfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50JDEoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcmNlbnQoY3VycmVudCwgbmV4dCwgZGlyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyVXBkYXRlKGVsLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRyaWdnZXIoZWwsIGNyZWF0ZUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGF0YSkpO1xuICAgIH1cblxuICAgIC8vIHBvbHlmaWxsIGZvciBNYXRoLnRydW5jIChJRSlcbiAgICBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gICAgICAgIHJldHVybiB+fng7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKGluZGV4LCBwcmV2SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAnbmV4dCdcbiAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgOiBpbmRleCA9PT0gJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgID8gLTFcbiAgICAgICAgICAgICAgICA6IGluZGV4IDwgcHJldkluZGV4XG4gICAgICAgICAgICAgICAgICAgID8gLTFcbiAgICAgICAgICAgICAgICAgICAgOiAxO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwZWVkVXAoeCkge1xuICAgICAgICByZXR1cm4gLjUgKiB4ICsgMzAwOyAvLyBwYXJhYm9sYSB0aHJvdWdoICg0MDAsNTAwOyA2MDAsNjAwOyAxODAwLDEyMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzVGV4dE5vZGVzT25seShlbCkge1xuICAgICAgICByZXR1cm4gIWVsLmNoaWxkcmVuLmxlbmd0aCAmJiBlbC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICB9XG5cbn1cblxudmFyIEFuaW1hdGlvbnMkMSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFzc2lnbiA9IHJlZi5hc3NpZ247XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG5cbiAgICByZXR1cm4gYXNzaWduKHt9LCBtaXhpbi5zbGlkZXNob3cuZGVmYXVsdHMuQW5pbWF0aW9ucywge1xuXG4gICAgICAgIGZhZGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMH0sXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkJDEocGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudH0sXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiBwZXJjZW50fVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzY2FsZToge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IHNjYWxlM2QoMSAtIC4yKX0sXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06IHNjYWxlM2QoMSl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxIC0gY3NzKGN1cnJlbnQsICdvcGFjaXR5Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQkMShwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDEgLSBwZXJjZW50LCB0cmFuc2Zvcm06IHNjYWxlM2QoMSAtIC4yICogcGVyY2VudCl9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogcGVyY2VudCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMiArIC4yICogcGVyY2VudCl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxuZnVuY3Rpb24gcGx1Z2luJDIoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJa2l0LnVzZShwbHVnaW4kMyk7XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyICQgPSB1dGlsLiQ7XG4gICAgdmFyICQkID0gdXRpbC4kJDtcbiAgICB2YXIgYWRkQ2xhc3MgPSB1dGlsLmFkZENsYXNzO1xuICAgIHZhciBhamF4ID0gdXRpbC5hamF4O1xuICAgIHZhciBhcHBlbmQgPSB1dGlsLmFwcGVuZDtcbiAgICB2YXIgYXNzaWduID0gdXRpbC5hc3NpZ247XG4gICAgdmFyIGF0dHIgPSB1dGlsLmF0dHI7XG4gICAgdmFyIGNzcyA9IHV0aWwuY3NzO1xuICAgIHZhciBkb2MgPSB1dGlsLmRvYztcbiAgICB2YXIgZG9jRWwgPSB1dGlsLmRvY0VsO1xuICAgIHZhciBkYXRhID0gdXRpbC5kYXRhO1xuICAgIHZhciBnZXRJbWFnZSA9IHV0aWwuZ2V0SW1hZ2U7XG4gICAgdmFyIGh0bWwgPSB1dGlsLmh0bWw7XG4gICAgdmFyIGluZGV4ID0gdXRpbC5pbmRleDtcbiAgICB2YXIgb24gPSB1dGlsLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHV0aWwucG9pbnRlckRvd247XG4gICAgdmFyIHBvaW50ZXJNb3ZlID0gdXRpbC5wb2ludGVyTW92ZTtcbiAgICB2YXIgcmVtb3ZlQ2xhc3MgPSB1dGlsLnJlbW92ZUNsYXNzO1xuICAgIHZhciBUcmFuc2l0aW9uID0gdXRpbC5UcmFuc2l0aW9uO1xuICAgIHZhciB0cmlnZ2VyID0gdXRpbC50cmlnZ2VyO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdsaWdodGJveCcsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBTdHJpbmcsXG4gICAgICAgICAgICB0b2dnbGU6IFN0cmluZyxcbiAgICAgICAgICAgIGF1dG9wbGF5OiBCb29sZWFuLFxuICAgICAgICAgICAgYXV0b3BsYXlJbnRlcnZhbDogTnVtYmVyLFxuICAgICAgICAgICAgdmlkZW9BdXRvcGxheTogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRvZ2dsZTogJ2EnLFxuICAgICAgICAgICAgYXV0b3BsYXk6IDAsXG4gICAgICAgICAgICB2aWRlb0F1dG9wbGF5OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIHRvZ2dsZXM6IGZ1bmN0aW9uIHRvZ2dsZXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gcmVmLnRvZ2dsZTtcblxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGVzID0gJCQodG9nZ2xlLCAkZWwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlZCA9ICF0aGlzLl90b2dnbGVzXG4gICAgICAgICAgICAgICAgICAgIHx8IHRvZ2dsZXMubGVuZ3RoICE9PSB0aGlzLl90b2dnbGVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB8fCB0b2dnbGVzLnNvbWUoZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBlbCAhPT0gdGhpcyQxLl90b2dnbGVzW2ldOyB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b2dnbGVzID0gdG9nZ2xlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuJGRlc3Ryb3kodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy50b2dnbGUpICsgXCI6bm90KC51ay1kaXNhYmxlZClcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhpbmRleCh0aGlzLnRvZ2dsZXMsIGUuY3VycmVudCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhbmVsICYmIHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC4kcHJvcHMuYW5pbWF0aW9uID0gdGhpcy5hbmltYXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbC4kZW1pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMudG9nZ2xlcy5sZW5ndGggfHwgIXRoaXMuX2NoYW5nZWQgfHwgIXRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGFuZWwuJGRlc3Ryb3kodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbCA9IHRoaXMucGFuZWwgfHwgVUlraXQubGlnaHRib3hQYW5lbChhc3NpZ24oe30sIHRoaXMuJHByb3BzLCB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnRvZ2dsZXMucmVkdWNlKGZ1bmN0aW9uIChpdGVtcywgZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goWydocmVmJywgJ2NhcHRpb24nLCAndHlwZScsICdwb3N0ZXInXS5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgYXR0cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyID09PSAnaHJlZicgPyAnc291cmNlJyA6IGF0dHJdID0gZGF0YShlbCwgYXR0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgICAgICAgICAgICAgIH0sIFtdKVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coaW5kZXgpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWwuc2hvdyhpbmRleCk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYW5lbCAmJiB0aGlzLnBhbmVsLmhpZGUoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdsaWdodGJveC1wYW5lbCcsIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jb250YWluZXIsIG1peGluLnRvZ2dsYWJsZSwgbWl4aW4uc2xpZGVzaG93XSxcblxuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBwcmVsb2FkOiAxLFxuICAgICAgICAgICAgdmlkZW9BdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICBkZWxheUNvbnRyb2xzOiAzMDAwLFxuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgY2xzOiAndWstb3BlbicsXG4gICAgICAgICAgICBjbHNQYWdlOiAndWstbGlnaHRib3gtcGFnZScsXG4gICAgICAgICAgICBzZWxMaXN0OiAnLnVrLWxpZ2h0Ym94LWl0ZW1zJyxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstbGlnaHRib3gtaXRlbScsXG4gICAgICAgICAgICBpbml0aWFsQW5pbWF0aW9uOiAnc2NhbGUnLFxuICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIHZlbG9jaXR5OiAyLFxuICAgICAgICAgICAgQW5pbWF0aW9uczogQW5pbWF0aW9ucyQxKFVJa2l0KSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94IHVrLW92ZXJmbG93LWhpZGRlblxcXCI+IDx1bCBjbGFzcz1cXFwidWstbGlnaHRib3gtaXRlbXNcXFwiPjwvdWw+IDxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LXRvb2xiYXIgdWstcG9zaXRpb24tdG9wIHVrLXRleHQtcmlnaHQgdWstdHJhbnNpdGlvbi1zbGlkZS10b3AgdWstdHJhbnNpdGlvbi1vcGFxdWVcXFwiPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1saWdodGJveC10b29sYmFyLWljb24gdWstY2xvc2UtbGFyZ2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdWstY2xvc2UgdWstdG9nZ2xlPVxcXCIhLnVrLWxpZ2h0Ym94XFxcIj48L2J1dHRvbj4gPC9kaXY+IDxhIGNsYXNzPVxcXCJ1ay1saWdodGJveC1idXR0b24gdWstcG9zaXRpb24tY2VudGVyLWxlZnQgdWstcG9zaXRpb24tbWVkaXVtIHVrLXRyYW5zaXRpb24tZmFkZVxcXCIgaHJlZj1cXFwiI1xcXCIgdWstc2xpZGVuYXYtcHJldmlvdXMgdWstbGlnaHRib3gtaXRlbT1cXFwicHJldmlvdXNcXFwiPjwvYT4gPGEgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWJ1dHRvbiB1ay1wb3NpdGlvbi1jZW50ZXItcmlnaHQgdWstcG9zaXRpb24tbWVkaXVtIHVrLXRyYW5zaXRpb24tZmFkZVxcXCIgaHJlZj1cXFwiI1xcXCIgdWstc2xpZGVuYXYtbmV4dCB1ay1saWdodGJveC1pdGVtPVxcXCJuZXh0XFxcIj48L2E+IDxkaXYgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LXRvb2xiYXIgdWstbGlnaHRib3gtY2FwdGlvbiB1ay1wb3NpdGlvbi1ib3R0b20gdWstdGV4dC1jZW50ZXIgdWstdHJhbnNpdGlvbi1zbGlkZS1ib3R0b20gdWstdHJhbnNpdGlvbi1vcGFxdWVcXFwiPjwvZGl2PiA8L2Rpdj5cIlxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICB0aGlzLiRtb3VudChhcHBlbmQodGhpcy5jb250YWluZXIsIHRoaXMudGVtcGxhdGUpKTtcblxuICAgICAgICAgICAgdGhpcy5jYXB0aW9uID0gJCgnLnVrLWxpZ2h0Ym94LWNhcHRpb24nLCB0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIGFwcGVuZCh0aGlzJDEubGlzdCwgXCI8bGk+PC9saT5cIik7IH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IChwb2ludGVyTW92ZSArIFwiIFwiICsgcG9pbnRlckRvd24gKyBcIiBrZXlkb3duXCIpLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogJ3Nob3dDb250cm9scydcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGRvY0VsLCB0aGlzLmNsc1BhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93bicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogJ3Nob3dDb250cm9scydcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnaGlkZUNvbnRyb2xzJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGRlbicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZG9jRWwsIHRoaXMuY2xzUGFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2tleXVwJyxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvYztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9nZ2xlZCh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coJ3ByZXZpb3VzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygnbmV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ3RvZ2dsZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2JlZm9yZWl0ZW1zaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVOb3codGhpcy4kZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXNob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5zZWxMaXN0KSArIFwiID4gKlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBpbmRleCh0YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbiA9IHRoaXMuZ2V0SXRlbShpKS5jYXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuY2FwdGlvbiwgJ2Rpc3BsYXknLCBjYXB0aW9uID8gJycgOiAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCh0aGlzLmNhcHRpb24sIGNhcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHRoaXMucHJlbG9hZDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEubG9hZEl0ZW0odGhpcyQxLmdldEluZGV4KGkgKyBqKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEubG9hZEl0ZW0odGhpcyQxLmdldEluZGV4KGkgLSBqKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1sb2FkJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoXywgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpdGVtLnNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SXRlbShpdGVtLCAnPHNwYW4gdWstc3Bpbm5lcj48L3NwYW4+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEltYWdlXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW1hZ2UnIHx8IHNvdXJjZS5tYXRjaCgvXFwuKGpwKGUpP2d8cG5nfGdpZnxzdmcpJC9pKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbWFnZShzb3VyY2UpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGltZykgeyByZXR1cm4gdGhpcyQxLnNldEl0ZW0oaXRlbSwgKFwiPGltZyB3aWR0aD1cXFwiXCIgKyAoaW1nLndpZHRoKSArIFwiXFxcIiBoZWlnaHQ9XFxcIlwiICsgKGltZy5oZWlnaHQpICsgXCJcXFwiIHNyYz1cXFwiXCIgKyBzb3VyY2UgKyBcIlxcXCI+XCIpKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuc2V0RXJyb3IoaXRlbSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVmlkZW9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nIHx8IHNvdXJjZS5tYXRjaCgvXFwuKG1wNHx3ZWJtfG9ndikkL2kpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWRlbyA9ICQoKFwiPHZpZGVvIGNvbnRyb2xzIHBsYXlzaW5saW5lXCIgKyAoaXRlbS5wb3N0ZXIgPyAoXCIgcG9zdGVyPVxcXCJcIiArIChpdGVtLnBvc3RlcikgKyBcIlxcXCJcIikgOiAnJykgKyBcIiB1ay12aWRlbz1cXFwiYXV0b3BsYXk6IFwiICsgKHRoaXMudmlkZW9BdXRvcGxheSkgKyBcIlxcXCI+PC92aWRlbz5cIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cih2aWRlbywgJ3NyYycsIHNvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uKHZpZGVvLCAnZXJyb3InLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuc2V0RXJyb3IoaXRlbSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb24odmlkZW8sICdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyKHZpZGVvLCB7d2lkdGg6IHZpZGVvLnZpZGVvV2lkdGgsIGhlaWdodDogdmlkZW8udmlkZW9IZWlnaHR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc2V0SXRlbShpdGVtLCB2aWRlbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnaWZyYW1lJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgKFwiPGlmcmFtZSBjbGFzcz1cXFwidWstbGlnaHRib3gtaWZyYW1lXFxcIiBzcmM9XFxcIlwiICsgc291cmNlICsgXCJcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XCIpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBZb3V0dWJlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlcyA9IHNvdXJjZS5tYXRjaCgvXFwvXFwvLio/eW91dHViZVxcLlthLXpdK1xcL3dhdGNoXFw/dj0oW14mXFxzXSspLykgfHwgc291cmNlLm1hdGNoKC95b3V0dVxcLmJlXFwvKC4qKS8pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IG1hdGNoZXNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB3aWR0aCA9PT0gdm9pZCAwICkgd2lkdGggPSA2NDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaGVpZ2h0ID09PSB2b2lkIDAgKSBoZWlnaHQgPSA0NTA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMkMS5zZXRJdGVtKGl0ZW0sIGdldElmcmFtZSgoXCIvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIiArIGlkKSwgd2lkdGgsIGhlaWdodCwgdGhpcyQxLnZpZGVvQXV0b3BsYXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEltYWdlKChcIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiICsgaWQgKyBcIi9tYXhyZXNkZWZhdWx0LmpwZ1wiKSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy95b3V0dWJlIGRlZmF1bHQgNDA0IHRodW1iLCBmYWxsIGJhY2sgdG8gbG93cmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCA9PT0gMTIwICYmIGhlaWdodCA9PT0gOTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEltYWdlKChcIi8vaW1nLnlvdXR1YmUuY29tL3ZpL1wiICsgaWQgKyBcIi8wLmpwZ1wiKSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldElmcmFtZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVmltZW9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVzID0gc291cmNlLm1hdGNoKC8oXFwvXFwvLio/KXZpbWVvXFwuW2Etel0rXFwvKFswLTldKykuKj8vKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhamF4KChcIi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj9tYXh3aWR0aD0xOTIwJnVybD1cIiArIChlbmNvZGVVUkkoc291cmNlKSkpLCB7cmVzcG9uc2VUeXBlOiAnanNvbid9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZfcmVzcG9uc2UgPSByZWYucmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmX3Jlc3BvbnNlLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZl9yZXNwb25zZS53aWR0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMkMS5zZXRJdGVtKGl0ZW0sIGdldElmcmFtZSgoXCIvL3BsYXllci52aW1lby5jb20vdmlkZW8vXCIgKyAobWF0Y2hlc1syXSkpLCB3aWR0aCwgaGVpZ2h0LCB0aGlzJDEudmlkZW9BdXRvcGxheSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHRvZ2dsZTogZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzVG9nZ2xlZCgpID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZU5vdyh0aGlzLiRlbCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuc2xpZGVzLCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdG9wKHRoaXMuc2xpZGVzKTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmluZGV4O1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2FuaW1hdGlvbjtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbG9hZEl0ZW06IGZ1bmN0aW9uIGxvYWRJdGVtKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpbmRleCA9PT0gdm9pZCAwICkgaW5kZXggPSB0aGlzLmluZGV4O1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbShpbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnaXRlbWxvYWQnLCBbaXRlbV0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SXRlbTogZnVuY3Rpb24gZ2V0SXRlbShpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XSB8fCB7fTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldEl0ZW06IGZ1bmN0aW9uIHNldEl0ZW0oaXRlbSwgY29udGVudCkge1xuICAgICAgICAgICAgICAgIGFzc2lnbihpdGVtLCB7Y29udGVudDogY29udGVudH0pO1xuICAgICAgICAgICAgICAgIHZhciBlbCA9IGh0bWwodGhpcy5zbGlkZXNbdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pXSwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2l0ZW1sb2FkZWQnLCBbdGhpcywgZWxdKTtcbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0RXJyb3I6IGZ1bmN0aW9uIHNldEVycm9yKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgJzxzcGFuIHVrLWljb249XCJpY29uOiBib2x0OyByYXRpbzogMlwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNob3dDb250cm9sczogZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY29udHJvbHNUaW1lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dCh0aGlzLmhpZGVDb250cm9scywgdGhpcy5kZWxheUNvbnRyb2xzKTtcblxuICAgICAgICAgICAgICAgIGF0dHIoJCQoKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdLFtkYXRhLVwiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdXCIpLCB0aGlzLiRlbCksICdoaWRkZW4nLCB0aGlzLml0ZW1zLmxlbmd0aCA8IDIgPyAnJyA6IG51bGwpO1xuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1hY3RpdmUgdWstdHJhbnNpdGlvbi1hY3RpdmUnKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGlkZUNvbnRyb2xzOiBmdW5jdGlvbiBoaWRlQ29udHJvbHMoKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsICd1ay1hY3RpdmUgdWstdHJhbnNpdGlvbi1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldElmcmFtZShzcmMsIHdpZHRoLCBoZWlnaHQsIGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiAoXCI8aWZyYW1lIHNyYz1cXFwiXCIgKyBzcmMgKyBcIlxcXCIgd2lkdGg9XFxcIlwiICsgd2lkdGggKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIGhlaWdodCArIFwiXFxcIiBzdHlsZT1cXFwibWF4LXdpZHRoOiAxMDAlOyBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcXCIgZnJhbWVib3JkZXI9XFxcIjBcXFwiIGFsbG93ZnVsbHNjcmVlbiB1ay12aWRlbz1cXFwiYXV0b3BsYXk6IFwiICsgYXV0b3BsYXkgKyBcIlxcXCIgdWstcmVzcG9uc2l2ZT48L2lmcmFtZT5cIik7XG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQyKTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDQoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kNC5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBhcHBlbmQgPSByZWYuYXBwZW5kO1xuICAgIHZhciBjbG9zZXN0ID0gcmVmLmNsb3Nlc3Q7XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gICAgdmFyIGVhY2ggPSByZWYuZWFjaDtcbiAgICB2YXIgcG9pbnRlckVudGVyID0gcmVmLnBvaW50ZXJFbnRlcjtcbiAgICB2YXIgcG9pbnRlckxlYXZlID0gcmVmLnBvaW50ZXJMZWF2ZTtcbiAgICB2YXIgcmVtb3ZlID0gcmVmLnJlbW92ZTtcbiAgICB2YXIgdG9GbG9hdCA9IHJlZi50b0Zsb2F0O1xuICAgIHZhciBUcmFuc2l0aW9uID0gcmVmLlRyYW5zaXRpb247XG4gICAgdmFyIHRyaWdnZXIgPSByZWYudHJpZ2dlcjtcbiAgICB2YXIgY29udGFpbmVycyA9IHt9O1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdub3RpZmljYXRpb24nLCB7XG5cbiAgICAgICAgZnVuY3Rpb25hbDogdHJ1ZSxcblxuICAgICAgICBhcmdzOiBbJ21lc3NhZ2UnLCAnc3RhdHVzJ10sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgICAgICBncm91cDogbnVsbCxcbiAgICAgICAgICAgIHBvczogJ3RvcC1jZW50ZXInLFxuICAgICAgICAgICAgY2xzQ2xvc2U6ICd1ay1ub3RpZmljYXRpb24tY2xvc2UnLFxuICAgICAgICAgICAgY2xzTXNnOiAndWstbm90aWZpY2F0aW9uLW1lc3NhZ2UnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCgpIHtcblxuICAgICAgICAgICAgaWYgKCFjb250YWluZXJzW3RoaXMucG9zXSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcnNbdGhpcy5wb3NdID0gYXBwZW5kKFVJa2l0LmNvbnRhaW5lciwgKFwiPGRpdiBjbGFzcz1cXFwidWstbm90aWZpY2F0aW9uIHVrLW5vdGlmaWNhdGlvbi1cIiArICh0aGlzLnBvcykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNzcyhjb250YWluZXJzW3RoaXMucG9zXSwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuICAgICAgICAgICAgdGhpcy4kbW91bnQoYXBwZW5kKGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAoXCI8ZGl2IGNsYXNzPVxcXCJcIiArICh0aGlzLmNsc01zZykgKyAodGhpcy5zdGF0dXMgPyAoXCIgXCIgKyAodGhpcy5jbHNNc2cpICsgXCItXCIgKyAodGhpcy5zdGF0dXMpKSA6ICcnKSArIFwiXFxcIj4gPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzQ2xvc2UpICsgXCJcXFwiIGRhdGEtdWstY2xvc2U+PC9hPiA8ZGl2PlwiICsgKHRoaXMubWVzc2FnZSkgKyBcIjwvZGl2PiA8L2Rpdj5cIilcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdmFyIG1hcmdpbkJvdHRvbSA9IHRvRmxvYXQoY3NzKHRoaXMuJGVsLCAnbWFyZ2luQm90dG9tJykpO1xuICAgICAgICAgICAgVHJhbnNpdGlvbi5zdGFydChcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtvcGFjaXR5OiAwLCBtYXJnaW5Ub3A6IC0xICogdGhpcy4kZWwub2Zmc2V0SGVpZ2h0LCBtYXJnaW5Cb3R0b206IDB9KSxcbiAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSwgbWFyZ2luVG9wOiAwLCBtYXJnaW5Cb3R0b206IG1hcmdpbkJvdHRvbX1cbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS50aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS50aW1lciA9IHNldFRpbWVvdXQodGhpcyQxLmNsb3NlLCB0aGlzJDEudGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6ICggb2JqID0ge1xuXG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24gY2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGlmIChjbG9zZXN0KGUudGFyZ2V0LCAnYVtocmVmPVwiI1wiXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIG9ialtwb2ludGVyRW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvYmpbcG9pbnRlckxlYXZlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuY2xvc2UsIHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2JqICksXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVGbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMkMS4kZWwsICdjbG9zZScsIFt0aGlzJDFdKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKHRoaXMkMS4kZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyc1t0aGlzJDEucG9zXS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhjb250YWluZXJzW3RoaXMkMS5wb3NdLCAnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQodGhpcy4kZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IC0xICogdGhpcy4kZWwub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVtb3ZlRm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB2YXIgb2JqO1xuXG4gICAgVUlraXQubm90aWZpY2F0aW9uLmNsb3NlQWxsID0gZnVuY3Rpb24gKGdyb3VwLCBpbW1lZGlhdGUpIHtcbiAgICAgICAgZWFjaChVSWtpdC5pbnN0YW5jZXMsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuJG9wdGlvbnMubmFtZSA9PT0gJ25vdGlmaWNhdGlvbicgJiYgKCFncm91cCB8fCBncm91cCA9PT0gY29tcG9uZW50Lmdyb3VwKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jbG9zZShpbW1lZGlhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQ0KTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDUoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kNS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciB1dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgY2xhbXAgPSB1dGlsLmNsYW1wO1xuICAgIHZhciBjc3MgPSB1dGlsLmNzcztcbiAgICB2YXIgRGltZW5zaW9ucyA9IHV0aWwuRGltZW5zaW9ucztcbiAgICB2YXIgZWFjaCA9IHV0aWwuZWFjaDtcbiAgICB2YXIgZ2V0SW1hZ2UgPSB1dGlsLmdldEltYWdlO1xuICAgIHZhciBpbmNsdWRlcyA9IHV0aWwuaW5jbHVkZXM7XG4gICAgdmFyIGlzTnVtYmVyID0gdXRpbC5pc051bWJlcjtcbiAgICB2YXIgaXNVbmRlZmluZWQgPSB1dGlsLmlzVW5kZWZpbmVkO1xuICAgIHZhciBzY3JvbGxlZE92ZXIgPSB1dGlsLnNjcm9sbGVkT3ZlcjtcbiAgICB2YXIgdG9GbG9hdCA9IHV0aWwudG9GbG9hdDtcbiAgICB2YXIgcXVlcnkgPSB1dGlsLnF1ZXJ5O1xuICAgIHZhciB3aW4gPSB1dGlsLndpbjtcblxuICAgIHZhciBwcm9wcyA9IFsneCcsICd5JywgJ2JneCcsICdiZ3knLCAncm90YXRlJywgJ3NjYWxlJywgJ2NvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdib3JkZXJDb2xvcicsICdvcGFjaXR5JywgJ2JsdXInLCAnaHVlJywgJ2dyYXlzY2FsZScsICdpbnZlcnQnLCAnc2F0dXJhdGUnLCAnc2VwaWEnLCAnZm9wYWNpdHknXTtcblxuICAgIG1peGluLnBhcmFsbGF4ID0ge1xuXG4gICAgICAgIHByb3BzOiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKHByb3BzLCBwcm9wKSB7XG4gICAgICAgICAgICBwcm9wc1twcm9wXSA9ICdsaXN0JztcbiAgICAgICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYSdcbiAgICAgICAgfSksXG5cbiAgICAgICAgZGVmYXVsdHM6IHByb3BzLnJlZHVjZShmdW5jdGlvbiAoZGVmYXVsdHMsIHByb3ApIHtcbiAgICAgICAgICAgIGRlZmF1bHRzW3Byb3BdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBtZWRpYTogZmFsc2VcbiAgICAgICAgfSksXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgcHJvcHM6IGZ1bmN0aW9uIHByb3BzJDEocHJvcGVydGllcywgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKHByb3BzLCBwcm9wKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHByb3BlcnRpZXNbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNDb2xvciA9IHByb3AubWF0Y2goL2NvbG9yL2kpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNDc3NQcm9wID0gaXNDb2xvciB8fCBwcm9wID09PSAnb3BhY2l0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHByb3BlcnRpZXNbcHJvcF0uc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MsIGJnUG9zLCBkaWZmO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Nzc1Byb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcygkZWwsIHByb3AsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcy51bnNoaWZ0KChwcm9wID09PSAnc2NhbGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpc0Nzc1Byb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBjc3MoJGVsLCBwcm9wKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDApIHx8IDApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXQgPSBpbmNsdWRlcyhzdGVwcy5qb2luKCcnKSwgJyUnKSA/ICclJyA6ICdweCc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29sb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gJGVsLnN0eWxlLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHBhcnNlQ29sb3IoJGVsLCBzdGVwKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuc3R5bGUuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwcyA9IHN0ZXBzLm1hcCh0b0Zsb2F0KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AubWF0Y2goL15iZy8pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcygkZWwsIChcImJhY2tncm91bmQtcG9zaXRpb24tXCIgKyAocHJvcFsyXSkpLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZ1BvcyA9IGNzcygkZWwsICdiYWNrZ3JvdW5kUG9zaXRpb24nKS5zcGxpdCgnICcpW3Byb3BbMl0gPT09ICd4JyA/IDAgOiAxXTsgLy8gSUUgMTEgY2FuJ3QgcmVhZCBiYWNrZ3JvdW5kLXBvc2l0aW9uLVt4fHldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuY292ZXJzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgc3RlcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBzdGVwcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd24gPSBzdGVwcy5pbmRleE9mKG1pbikgPCBzdGVwcy5pbmRleE9mKG1heCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmID0gbWF4IC0gbWluO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBzdGVwcy5tYXAoZnVuY3Rpb24gKHN0ZXApIHsgcmV0dXJuIHN0ZXAgLSAoZG93biA/IG1pbiA6IG1heCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IChkb3duID8gLWRpZmYgOiAwKSArIFwicHhcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGJnUG9zO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcm9wc1twcm9wXSA9IHtzdGVwczogc3RlcHMsIHVuaXQ6IHVuaXQsIHBvczogcG9zLCBiZ1BvczogYmdQb3MsIGRpZmY6IGRpZmZ9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcztcblxuICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYmdQcm9wczogZnVuY3Rpb24gYmdQcm9wcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHJldHVybiBbJ2JneCcsICdiZ3knXS5maWx0ZXIoZnVuY3Rpb24gKGJnKSB7IHJldHVybiBiZyBpbiB0aGlzJDEucHJvcHM7IH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY292ZXJzOiBmdW5jdGlvbiBjb3ZlcnMoXywgJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNzcygkZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgIT09ICcnID8gY3NzKCRlbCwgJ2JhY2tncm91bmRTaXplJywgJycpIDogJGVsLCAnYmFja2dyb3VuZFNpemUnKSA9PT0gJ2NvdmVyJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGRpc2Nvbm5lY3RlZDogZnVuY3Rpb24gZGlzY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2ltYWdlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb21wdXRlZHMucHJvcHM7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gIXRoaXMubWVkaWEgfHwgd2luLm1hdGNoTWVkaWEodGhpcy5tZWRpYSkubWF0Y2hlcztcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ltYWdlLmRpbUVsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLiRlbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuJGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faW1hZ2UpIHx8ICF0aGlzLmNvdmVycyB8fCAhdGhpcy5iZ1Byb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNyYyA9IGNzcyh0aGlzLiRlbCwgJ2JhY2tncm91bmRJbWFnZScpLnJlcGxhY2UoL15ub25lfHVybFxcKFtcIiddPyguKz8pW1wiJ10/XFwpJC8sICckMScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWFnZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGdldEltYWdlKHNyYykudGhlbihmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuX2ltYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbWcubmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaW1nLm5hdHVyYWxIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS4kZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge2JhY2tncm91bmRTaXplOiAnJywgYmFja2dyb3VuZFJlcGVhdDogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IHRoaXMuX2ltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGltRWwgPSBpbWFnZS5kaW1FbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoaW1hZ2UsIGRpbUVsKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcyQxLnByb3BzW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmYgPSByZWYuZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZ1BvcyA9IHJlZi5iZ1BvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwcyA9IHJlZi5zdGVwcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gcHJvcCA9PT0gJ2JneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhbiA9IGRpbVthdHRyXSAtIGRpbUVsW2F0dHJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJnUG9zLm1hdGNoKC8lJHwwcHgvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4gPCBkaWZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGltRWxbYXR0cl0gPSBkaW1bYXR0cl0gKyBkaWZmIC0gc3BhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BhbiA+IGRpZmYpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnUG9zID0gcGFyc2VGbG9hdChiZ1Bvcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmdQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnByb3BzW3Byb3BdLnN0ZXBzID0gc3RlcHMubWFwKGZ1bmN0aW9uIChzdGVwKSB7IHJldHVybiBzdGVwIC0gKHNwYW4gLSBkaWZmKSAvICgxMDAgLyBiZ1Bvcyk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGltID0gRGltZW5zaW9ucy5jb3ZlcihpbWFnZSwgZGltRWwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAoKGRpbS53aWR0aCkgKyBcInB4IFwiICsgKGRpbS5oZWlnaHQpICsgXCJweFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgZWFjaCh0aGlzLmdldENzcygwKSwgZnVuY3Rpb24gKF8sIHByb3ApIHsgcmV0dXJuIGNzcyh0aGlzJDEuJGVsLCBwcm9wLCAnJyk7IH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0Q3NzOiBmdW5jdGlvbiBnZXRDc3MocGVyY2VudCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BzKS5yZWR1Y2UoZnVuY3Rpb24gKGNzcywgcHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBwcm9wc1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBzID0gcmVmLnN0ZXBzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdCA9IHJlZi51bml0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gcmVmLnBvcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoc3RlcHMsIHBlcmNlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2Zvcm1zXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiQxID0gWyd4JywgJ3knXS5tYXAoZnVuY3Rpb24gKGRpcikgeyByZXR1cm4gcHJvcCA9PT0gZGlyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdmFsdWUgKyB1bml0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvcHNbZGlyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRWYWx1ZShwcm9wc1tkaXJdLnN0ZXBzLCBwZXJjZW50KSArIHByb3BzW2Rpcl0udW5pdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYkMVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSByZWYkMVsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBjc3MudHJhbnNmb3JtICs9IFwiIHRyYW5zbGF0ZTNkKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIiwgMClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JvdGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLnRyYW5zZm9ybSArPSBcIiByb3RhdGUoXCIgKyB2YWx1ZSArIFwiZGVnKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2NhbGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy50cmFuc2Zvcm0gKz0gXCIgc2NhbGUoXCIgKyB2YWx1ZSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiZyBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmd5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JneCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzWyhcImJhY2tncm91bmQtcG9zaXRpb24tXCIgKyAocHJvcFsyXSkpXSA9IFwiY2FsYyhcIiArIHBvcyArIFwiICsgXCIgKyAodmFsdWUgKyB1bml0KSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmFja2dyb3VuZENvbG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JvcmRlckNvbG9yJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYkMiA9IGdldFN0ZXAoc3RlcHMsIHBlcmNlbnQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSByZWYkMlswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZCA9IHJlZiQyWzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IHJlZiQyWzJdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzW3Byb3BdID0gXCJyZ2JhKFwiICsgKHN0YXJ0Lm1hcChmdW5jdGlvbiAodmFsdWUsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBwICogKGVuZFtpXSAtIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpID09PSAzID8gdG9GbG9hdCh2YWx1ZSkgOiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsJykpICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENTUyBGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgYmx1cihcIiArIHZhbHVlICsgXCJweClcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2h1ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLmZpbHRlciArPSBcIiBodWUtcm90YXRlKFwiICsgdmFsdWUgKyBcImRlZylcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZvcGFjaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuZmlsdGVyICs9IFwiIG9wYWNpdHkoXCIgKyB2YWx1ZSArIFwiJSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyYXlzY2FsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnZlcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2F0dXJhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VwaWEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgXCIgKyBwcm9wICsgXCIoXCIgKyB2YWx1ZSArIFwiJSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3NbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjc3M7XG5cbiAgICAgICAgICAgICAgICB9LCB7dHJhbnNmb3JtOiAnJywgZmlsdGVyOiAnJ30pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgncGFyYWxsYXgnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbbWl4aW4ucGFyYWxsYXhdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHZpZXdwb3J0OiBOdW1iZXIsXG4gICAgICAgICAgICBlYXNpbmc6IE51bWJlcixcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZSxcbiAgICAgICAgICAgIHZpZXdwb3J0OiAxLFxuICAgICAgICAgICAgZWFzaW5nOiAxLFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24gdGFyZ2V0KHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ICYmIHF1ZXJ5KHRhcmdldCwgJGVsKSB8fCAkZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2O1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BlcmNlbnQgPSBlYXNlKHNjcm9sbGVkT3Zlcih0aGlzLnRhcmdldCkgLyAodGhpcy52aWV3cG9ydCB8fCAxKSwgdGhpcy5lYXNpbmcpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSAnc2Nyb2xsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXY7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ByZXYgIT09IHRoaXMuX3BlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgdGhpcy5nZXRDc3ModGhpcy5fcGVyY2VudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldiA9IHRoaXMuX3BlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnc2Nyb2xsJywgJ2xvYWQnLCAncmVzaXplJ11cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGVhc2UocGVyY2VudCwgZWFzaW5nKSB7XG4gICAgICAgIHJldHVybiBjbGFtcChwZXJjZW50ICogKDEgLSAoZWFzaW5nIC0gZWFzaW5nICogcGVyY2VudCkpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhcnNlQ29sb3IoZWwsIGNvbG9yKSB7XG4gICAgICAgIHJldHVybiBjc3MoY3NzKGVsLCAnY29sb3InLCBjb2xvciksICdjb2xvcicpLnNwbGl0KC9bKCksXS9nKS5zbGljZSgxLCAtMSkuY29uY2F0KDEpLnNsaWNlKDAsIDQpLm1hcChmdW5jdGlvbiAobikgeyByZXR1cm4gdG9GbG9hdChuKTsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3RlcChzdGVwcywgcGVyY2VudCkge1xuICAgICAgICB2YXIgY291bnQgPSBzdGVwcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLm1pbihNYXRoLmZsb29yKGNvdW50ICogcGVyY2VudCksIGNvdW50IC0gMSksXG4gICAgICAgICAgICBzdGVwID0gc3RlcHMuc2xpY2UoaW5kZXgsIGluZGV4ICsgMik7XG5cbiAgICAgICAgc3RlcC5wdXNoKHBlcmNlbnQgPT09IDEgPyAxIDogcGVyY2VudCAlICgxIC8gY291bnQpICogY291bnQpO1xuXG4gICAgICAgIHJldHVybiBzdGVwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZhbHVlKHN0ZXBzLCBwZXJjZW50KSB7XG4gICAgICAgIHZhciByZWYgPSBnZXRTdGVwKHN0ZXBzLCBwZXJjZW50KTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gcmVmWzBdO1xuICAgICAgICB2YXIgZW5kID0gcmVmWzFdO1xuICAgICAgICB2YXIgcCA9IHJlZlsyXTtcbiAgICAgICAgcmV0dXJuIChpc051bWJlcihzdGFydClcbiAgICAgICAgICAgID8gc3RhcnQgKyBNYXRoLmFicyhzdGFydCAtIGVuZCkgKiBwICogKHN0YXJ0IDwgZW5kID8gMSA6IC0xKVxuICAgICAgICAgICAgOiArZW5kXG4gICAgICAgICkudG9GaXhlZCgyKTtcbiAgICB9XG5cbn1cblxuaWYgKCF0cnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5VSWtpdCkge1xuICAgIHdpbmRvdy5VSWtpdC51c2UocGx1Z2luJDUpO1xufVxuXG52YXIgQW5pbWF0aW9ucyQyID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgYXNzaWduID0gcmVmLmFzc2lnbjtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcblxuICAgIHZhciBBbmltYXRpb25zJCQxID0gYXNzaWduKHt9LCBtaXhpbi5zbGlkZXNob3cuZGVmYXVsdHMuQW5pbWF0aW9ucywge1xuXG4gICAgICAgIGZhZGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAge3pJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxIC0gY3NzKGN1cnJlbnQsICdvcGFjaXR5Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQkMShwZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDEgLSBwZXJjZW50LCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2NhbGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgKyAuNSksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgIHt6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkJDEocGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgKyAuNSAqIHBlcmNlbnQpLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHVsbDoge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDMwKSwgekluZGV4OiAtMX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKSwgekluZGV4OiAwfSBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDApLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQsIG5leHQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gMSAtIEFuaW1hdGlvbnMkJDEudHJhbnNsYXRlZChuZXh0KVxuICAgICAgICAgICAgICAgICAgICA6IEFuaW1hdGlvbnMkJDEudHJhbnNsYXRlZChjdXJyZW50KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJDEocGVyY2VudCwgZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMzAgKiBwZXJjZW50KSwgekluZGV4OiAtMX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCAqICgxIC0gcGVyY2VudCkpLCB6SW5kZXg6IDB9IF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLXBlcmNlbnQgKiAxMDApLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDMwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBwdXNoOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwKSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpLCB6SW5kZXg6IC0xfSBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0zMCksIHpJbmRleDogLTF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogMH1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCwgbmV4dCwgZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA+IDBcbiAgICAgICAgICAgICAgICAgICAgPyAxIC0gQW5pbWF0aW9ucyQkMS50cmFuc2xhdGVkKG5leHQpXG4gICAgICAgICAgICAgICAgICAgIDogQW5pbWF0aW9ucyQkMS50cmFuc2xhdGVkKGN1cnJlbnQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkMihwZXJjZW50LCBkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZShwZXJjZW50ICogMTAwKSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzAgKiAoMSAtIHBlcmNlbnQpKSwgekluZGV4OiAtMX0gXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzAgKiBwZXJjZW50KSwgekluZGV4OiAtMX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogMH1cbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBBbmltYXRpb25zJCQxO1xuXG59O1xuXG5mdW5jdGlvbiBwbHVnaW4kNihVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQ2Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVUlraXQudXNlKHBsdWdpbiQ1KTtcbiAgICBVSWtpdC51c2UocGx1Z2luJDMpO1xuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGNsb3Nlc3QgPSByZWYuY2xvc2VzdDtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcbiAgICB2YXIgZmFzdGRvbSA9IHJlZi5mYXN0ZG9tO1xuICAgIHZhciBlbmRzV2l0aCA9IHJlZi5lbmRzV2l0aDtcbiAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcbiAgICB2YXIgbm9vcCA9IHJlZi5ub29wO1xuICAgIHZhciBUcmFuc2l0aW9uID0gcmVmLlRyYW5zaXRpb247XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3NsaWRlc2hvdycsIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jbGFzcywgbWl4aW4uc2xpZGVzaG93XSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgcmF0aW86IFN0cmluZyxcbiAgICAgICAgICAgIG1pbkhlaWdodDogQm9vbGVhbixcbiAgICAgICAgICAgIG1heEhlaWdodDogQm9vbGVhbixcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgcmF0aW86ICcxNjo5JyxcbiAgICAgICAgICAgIG1pbkhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgc2VsTGlzdDogJy51ay1zbGlkZXNob3ctaXRlbXMnLFxuICAgICAgICAgICAgYXR0ckl0ZW06ICd1ay1zbGlkZXNob3ctaXRlbScsXG4gICAgICAgICAgICBBbmltYXRpb25zOiBBbmltYXRpb25zJDIoVUlraXQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGZhc3Rkb20ubXV0YXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zaG93KHRoaXMkMS5pbmRleCk7IH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgICAgIHZhciByZWYgPSB0aGlzLnJhdGlvLnNwbGl0KCc6JykubWFwKE51bWJlcik7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcmVmWzBdO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWZbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLiRlbC5vZmZzZXRXaWR0aCAvIHdpZHRoO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5tYXgodGhpcy5taW5IZWlnaHQsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLm1pbih0aGlzLm1heEhlaWdodCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy5saXN0LCBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzbGlkZXNob3ctcGFyYWxsYXgnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbbWl4aW4ucGFyYWxsYXhdLFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGl0ZW06IGZ1bmN0aW9uIGl0ZW0oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlc2hvdyA9IFVJa2l0LmdldENvbXBvbmVudChjbG9zZXN0KHRoaXMuJGVsLCAnLnVrLXNsaWRlc2hvdycpLCAnc2xpZGVzaG93Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNsaWRlc2hvdyAmJiBjbG9zZXN0KHRoaXMuJGVsLCAoKHNsaWRlc2hvdy5zZWxMaXN0KSArIFwiID4gKlwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93bicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHRoaXMuZ2V0Q3NzKC41KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1pbiBpdGVtb3V0JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWZfZGV0YWlsID0gcmVmLmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSByZWZfZGV0YWlsLnBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHJlZl9kZXRhaWwuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciBlYXNlID0gcmVmX2RldGFpbC5lYXNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmX2RldGFpbC5kaXI7XG5cblxuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoZ2V0Q3VycmVudCh0eXBlLCBkaXIsIHBlcmNlbnQpKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5zdGFydCh0aGlzLiRlbCwgdGhpcy5nZXRDc3MoaXNJbih0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAuNVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkaXIgPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICAgICAgICAgICksIGR1cmF0aW9uLCBlYXNlKS5jYXRjaChub29wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndHJhbnNpdGlvbmNhbmNlbGVkIHRyYW5zaXRpb25lbmQnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtdHJhbnNsYXRlaW4gaXRlbXRyYW5zbGF0ZW91dCcsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmX2RldGFpbCA9IHJlZi5kZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcmVmX2RldGFpbC5wZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmX2RldGFpbC5kaXI7XG5cbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHRoaXMuZ2V0Q3NzKGdldEN1cnJlbnQodHlwZSwgZGlyLCBwZXJjZW50KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGlzSW4odHlwZSkge1xuICAgICAgICByZXR1cm4gZW5kc1dpdGgodHlwZSwgJ2luJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudCh0eXBlLCBkaXIsIHBlcmNlbnQpIHtcblxuICAgICAgICBwZXJjZW50IC89IDI7XG5cbiAgICAgICAgcmV0dXJuICFpc0luKHR5cGUpXG4gICAgICAgICAgICA/IGRpciA8IDBcbiAgICAgICAgICAgICAgICA/IHBlcmNlbnRcbiAgICAgICAgICAgICAgICA6IDEgLSBwZXJjZW50XG4gICAgICAgICAgICA6IGRpciA8IDBcbiAgICAgICAgICAgICAgICA/IDEgLSBwZXJjZW50XG4gICAgICAgICAgICAgICAgOiBwZXJjZW50O1xuICAgIH1cblxufVxuXG5pZiAoIXRydWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlVJa2l0KSB7XG4gICAgd2luZG93LlVJa2l0LnVzZShwbHVnaW4kNik7XG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQ3KFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDcuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFkZENsYXNzID0gdXRpbC5hZGRDbGFzcztcbiAgICB2YXIgYWZ0ZXIgPSB1dGlsLmFmdGVyO1xuICAgIHZhciBhc3NpZ24gPSB1dGlsLmFzc2lnbjtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGF0dHIgPSB1dGlsLmF0dHI7XG4gICAgdmFyIGJlZm9yZSA9IHV0aWwuYmVmb3JlO1xuICAgIHZhciBjbG9zZXN0ID0gdXRpbC5jbG9zZXN0O1xuICAgIHZhciBjc3MgPSB1dGlsLmNzcztcbiAgICB2YXIgZG9jID0gdXRpbC5kb2M7XG4gICAgdmFyIGRvY0VsID0gdXRpbC5kb2NFbDtcbiAgICB2YXIgaGVpZ2h0ID0gdXRpbC5oZWlnaHQ7XG4gICAgdmFyIGZhc3Rkb20gPSB1dGlsLmZhc3Rkb207XG4gICAgdmFyIGdldFBvcyA9IHV0aWwuZ2V0UG9zO1xuICAgIHZhciBpbmNsdWRlcyA9IHV0aWwuaW5jbHVkZXM7XG4gICAgdmFyIGluZGV4ID0gdXRpbC5pbmRleDtcbiAgICB2YXIgaXNJbnB1dCA9IHV0aWwuaXNJbnB1dDtcbiAgICB2YXIgbm9vcCA9IHV0aWwubm9vcDtcbiAgICB2YXIgb2Zmc2V0ID0gdXRpbC5vZmZzZXQ7XG4gICAgdmFyIG9mZiA9IHV0aWwub2ZmO1xuICAgIHZhciBvbiA9IHV0aWwub247XG4gICAgdmFyIHBvaW50ZXJEb3duID0gdXRpbC5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlck1vdmUgPSB1dGlsLnBvaW50ZXJNb3ZlO1xuICAgIHZhciBwb2ludGVyVXAgPSB1dGlsLnBvaW50ZXJVcDtcbiAgICB2YXIgcG9zaXRpb24gPSB1dGlsLnBvc2l0aW9uO1xuICAgIHZhciBwcmV2ZW50Q2xpY2sgPSB1dGlsLnByZXZlbnRDbGljaztcbiAgICB2YXIgUHJvbWlzZSA9IHV0aWwuUHJvbWlzZTtcbiAgICB2YXIgcmVtb3ZlID0gdXRpbC5yZW1vdmU7XG4gICAgdmFyIHJlbW92ZUNsYXNzID0gdXRpbC5yZW1vdmVDbGFzcztcbiAgICB2YXIgdG9nZ2xlQ2xhc3MgPSB1dGlsLnRvZ2dsZUNsYXNzO1xuICAgIHZhciB0b05vZGVzID0gdXRpbC50b05vZGVzO1xuICAgIHZhciBUcmFuc2l0aW9uID0gdXRpbC5UcmFuc2l0aW9uO1xuICAgIHZhciB0cmlnZ2VyID0gdXRpbC50cmlnZ2VyO1xuICAgIHZhciB3aW4gPSB1dGlsLndpbjtcbiAgICB2YXIgd2l0aGluID0gdXRpbC53aXRoaW47XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3NvcnRhYmxlJywge1xuXG4gICAgICAgIG1peGluczogW21peGluLmNsYXNzXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZ3JvdXA6IFN0cmluZyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogTnVtYmVyLFxuICAgICAgICAgICAgdGhyZXNob2xkOiBOdW1iZXIsXG4gICAgICAgICAgICBjbHNJdGVtOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNQbGFjZWhvbGRlcjogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRHJhZzogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRHJhZ1N0YXRlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNCYXNlOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNOb0RyYWc6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0VtcHR5OiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNDdXN0b206IFN0cmluZyxcbiAgICAgICAgICAgIGhhbmRsZTogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGdyb3VwOiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogMTUwLFxuICAgICAgICAgICAgdGhyZXNob2xkOiA1LFxuICAgICAgICAgICAgY2xzSXRlbTogJ3VrLXNvcnRhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgY2xzUGxhY2Vob2xkZXI6ICd1ay1zb3J0YWJsZS1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBjbHNEcmFnOiAndWstc29ydGFibGUtZHJhZycsXG4gICAgICAgICAgICBjbHNEcmFnU3RhdGU6ICd1ay1kcmFnJyxcbiAgICAgICAgICAgIGNsc0Jhc2U6ICd1ay1zb3J0YWJsZScsXG4gICAgICAgICAgICBjbHNOb0RyYWc6ICd1ay1zb3J0YWJsZS1ub2RyYWcnLFxuICAgICAgICAgICAgY2xzRW1wdHk6ICd1ay1zb3J0YWJsZS1lbXB0eScsXG4gICAgICAgICAgICBjbHNDdXN0b206ICcnLFxuICAgICAgICAgICAgaGFuZGxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgWydpbml0JywgJ3N0YXJ0JywgJ21vdmUnLCAnZW5kJ10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZuID0gdGhpcyQxW2tleV07XG4gICAgICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEuc2Nyb2xsWSA9IHdpbi5zY3JvbGxZO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gZ2V0UG9zKGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IHJlZi54O1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHJlZi55O1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucG9zID0ge3g6IHgsIHk6IHl9O1xuXG4gICAgICAgICAgICAgICAgICAgIGZuKGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6ICggb2JqID0ge30sIG9ialtwb2ludGVyRG93bl0gPSAnaW5pdCcsIG9iaiApLFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbHNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLiRlbCwgdGhpcy5jbHNFbXB0eSwgIXRoaXMuJGVsLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9mZnNldCh0aGlzLmRyYWcsIHt0b3A6IHRoaXMucG9zLnkgKyB0aGlzLm9yaWdpbi50b3AsIGxlZnQ6IHRoaXMucG9zLnggKyB0aGlzLm9yaWdpbi5sZWZ0fSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gb2Zmc2V0KHRoaXMuZHJhZykudG9wLFxuICAgICAgICAgICAgICAgICAgICBib3R0b20gPSB0b3AgKyB0aGlzLmRyYWcub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wID4gMCAmJiB0b3AgPCB0aGlzLnNjcm9sbFkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gdGhpcy5zY3JvbGxZIC0gNTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvdHRvbSA8IGhlaWdodChkb2MpICYmIGJvdHRvbSA+IGhlaWdodCh3aW4pICsgdGhpcy5zY3JvbGxZKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IHRoaXMuc2Nyb2xsWSArIDU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2Nyb2xsICYmIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luLnNjcm9sbFRvKHdpbi5zY3JvbGxYLCBzY3JvbGwpOyB9LCA1KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdChlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGUuYnV0dG9uO1xuICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gZS5kZWZhdWx0UHJldmVudGVkO1xuICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHRvTm9kZXModGhpcy4kZWwuY2hpbGRyZW4pLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHdpdGhpbih0YXJnZXQsIGVsKTsgfSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoIXBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgIHx8IGlzSW5wdXQoZS50YXJnZXQpXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuaGFuZGxlICYmICF3aXRoaW4odGFyZ2V0LCB0aGlzLmhhbmRsZSlcbiAgICAgICAgICAgICAgICAgICAgfHwgYnV0dG9uICE9PSAwXG4gICAgICAgICAgICAgICAgICAgIHx8IHdpdGhpbih0YXJnZXQsIChcIi5cIiArICh0aGlzLmNsc05vRHJhZykpKVxuICAgICAgICAgICAgICAgICAgICB8fCBkZWZhdWx0UHJldmVudGVkXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoZWQgPSBbdGhpc107XG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luID0gYXNzaWduKHt0YXJnZXQ6IHRhcmdldCwgaW5kZXg6IGluZGV4KHBsYWNlaG9sZGVyKX0sIHRoaXMucG9zKTtcblxuICAgICAgICAgICAgICAgIG9uKGRvY0VsLCBwb2ludGVyTW92ZSwgdGhpcy5tb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihkb2NFbCwgcG9pbnRlclVwLCB0aGlzLmVuZCk7XG4gICAgICAgICAgICAgICAgb24od2luLCAnc2Nyb2xsJywgdGhpcy5zY3JvbGwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KGUpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZyA9IGFwcGVuZChVSWtpdC5jb250YWluZXIsIHRoaXMucGxhY2Vob2xkZXIub3V0ZXJIVE1MLnJlcGxhY2UoL148bGkvaSwgJzxkaXYnKS5yZXBsYWNlKC9saT4kL2ksICdkaXY+JykpO1xuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuZHJhZywgYXNzaWduKHtcbiAgICAgICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnBsYWNlaG9sZGVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMucGxhY2Vob2xkZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgfSwgY3NzKHRoaXMucGxhY2Vob2xkZXIsIFsncGFkZGluZ0xlZnQnLCAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdUb3AnLCAncGFkZGluZ0JvdHRvbSddKSkpO1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy5kcmFnLCAndWstbm8tYm9vdCcsICcnKTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmRyYWcsICgodGhpcy5jbHNEcmFnKSArIFwiIFwiICsgKHRoaXMuY2xzQ3VzdG9tKSkpO1xuXG4gICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuZHJhZy5maXJzdEVsZW1lbnRDaGlsZCwgaGVpZ2h0KHRoaXMucGxhY2Vob2xkZXIuZmlyc3RFbGVtZW50Q2hpbGQpKTtcblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSBvZmZzZXQodGhpcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgdmFyIGxlZnQgPSByZWYubGVmdDtcbiAgICAgICAgICAgICAgICB2YXIgdG9wID0gcmVmLnRvcDtcbiAgICAgICAgICAgICAgICBhc3NpZ24odGhpcy5vcmlnaW4sIHtsZWZ0OiBsZWZ0IC0gdGhpcy5wb3MueCwgdG9wOiB0b3AgLSB0aGlzLnBvcy55fSk7XG5cbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLnBsYWNlaG9sZGVyLCB0aGlzLmNsc1BsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbC5jaGlsZHJlbiwgdGhpcy5jbHNJdGVtKTtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2NFbCwgdGhpcy5jbHNEcmFnU3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3N0YXJ0JywgW3RoaXMsIHRoaXMucGxhY2Vob2xkZXIsIHRoaXMuZHJhZ10pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gbW92ZShlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnBvcy54IC0gdGhpcy5vcmlnaW4ueCkgPiB0aGlzLnRocmVzaG9sZCB8fCBNYXRoLmFicyh0aGlzLnBvcy55IC0gdGhpcy5vcmlnaW4ueSkgPiB0aGlzLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydChlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZS50eXBlID09PSAnbW91c2Vtb3ZlJyA/IGUudGFyZ2V0IDogZG9jLmVsZW1lbnRGcm9tUG9pbnQodGhpcy5wb3MueCAtIGRvYy5ib2R5LnNjcm9sbExlZnQsIHRoaXMucG9zLnkgLSBkb2MuYm9keS5zY3JvbGxUb3ApLFxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZSA9IGdldFNvcnRhYmxlKHRhcmdldCksXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gZ2V0U29ydGFibGUodGhpcy5wbGFjZWhvbGRlciksXG4gICAgICAgICAgICAgICAgICAgIG1vdmUgPSBzb3J0YWJsZSAhPT0gcHJldmlvdXM7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNvcnRhYmxlIHx8IHdpdGhpbih0YXJnZXQsIHRoaXMucGxhY2Vob2xkZXIpIHx8IG1vdmUgJiYgKCFzb3J0YWJsZS5ncm91cCB8fCBzb3J0YWJsZS5ncm91cCAhPT0gcHJldmlvdXMuZ3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBzb3J0YWJsZS4kZWwgPT09IHRhcmdldC5wYXJlbnROb2RlICYmIHRhcmdldCB8fCB0b05vZGVzKHNvcnRhYmxlLiRlbC5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiB3aXRoaW4odGFyZ2V0LCBlbGVtZW50KTsgfSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAobW92ZSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5yZW1vdmUodGhpcy5wbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzb3J0YWJsZS5pbnNlcnQodGhpcy5wbGFjZWhvbGRlciwgdGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmICghaW5jbHVkZXModGhpcy50b3VjaGVkLCBzb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaGVkLnB1c2goc29ydGFibGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2Nyb2xsOiBmdW5jdGlvbiBzY3JvbGwoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9IHdpbi5zY3JvbGxZO1xuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgIT09IHRoaXMuc2Nyb2xsWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcy55ICs9IHNjcm9sbCAtIHRoaXMuc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxZID0gc2Nyb2xsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiBlbmQoZSkge1xuXG4gICAgICAgICAgICAgICAgb2ZmKGRvY0VsLCBwb2ludGVyTW92ZSwgdGhpcy5tb3ZlKTtcbiAgICAgICAgICAgICAgICBvZmYoZG9jRWwsIHBvaW50ZXJVcCwgdGhpcy5lbmQpO1xuICAgICAgICAgICAgICAgIG9mZih3aW4sICdzY3JvbGwnLCB0aGlzLnNjcm9sbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgIT09ICdtb3VzZXVwJyAmJiB3aXRoaW4oZS50YXJnZXQsICdhW2hyZWZdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBjbG9zZXN0KGUudGFyZ2V0LCAnYVtocmVmXScpLmhyZWY7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldmVudENsaWNrKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc29ydGFibGUgPSBnZXRTb3J0YWJsZSh0aGlzLnBsYWNlaG9sZGVyKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBzb3J0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcmlnaW4uaW5kZXggIT09IGluZGV4KHRoaXMucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnbW92ZWQnLCBbdGhpcywgdGhpcy5wbGFjZWhvbGRlcl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcihzb3J0YWJsZS4kZWwsICdhZGRlZCcsIFtzb3J0YWJsZSwgdGhpcy5wbGFjZWhvbGRlcl0pO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAncmVtb3ZlZCcsIFt0aGlzLCB0aGlzLnBsYWNlaG9sZGVyXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3N0b3AnLCBbdGhpc10pO1xuXG4gICAgICAgICAgICAgICAgcmVtb3ZlKHRoaXMuZHJhZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gdGhpcy50b3VjaGVkLm1hcChmdW5jdGlvbiAoc29ydGFibGUpIHsgcmV0dXJuICgoc29ydGFibGUuY2xzUGxhY2Vob2xkZXIpICsgXCIgXCIgKyAoc29ydGFibGUuY2xzSXRlbSkpOyB9KS5qb2luKCcgJyk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaGVkLmZvckVhY2goZnVuY3Rpb24gKHNvcnRhYmxlKSB7IHJldHVybiByZW1vdmVDbGFzcyhzb3J0YWJsZS4kZWwuY2hpbGRyZW4sIGNsYXNzZXMpOyB9KTtcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY0VsLCB0aGlzLmNsc0RyYWdTdGF0ZSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGVsZW1lbnQsIHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbC5jaGlsZHJlbiwgdGhpcy5jbHNJdGVtKTtcblxuICAgICAgICAgICAgICAgIHZhciBpbnNlcnQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdpdGhpbihlbGVtZW50LCB0aGlzJDEuJGVsKSB8fCBpc1ByZWRlY2Vzc29yKGVsZW1lbnQsIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmUodGFyZ2V0LCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIodGFyZ2V0LCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kKHRoaXMkMS4kZWwsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShpbnNlcnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUkMShlbGVtZW50KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXdpdGhpbihlbGVtZW50LCB0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlKGVsZW1lbnQpOyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhbmltYXRlOiBmdW5jdGlvbiBhbmltYXRlKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSB0b05vZGVzKHRoaXMuJGVsLmNoaWxkcmVuKSxcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQgPSB7cG9zaXRpb246ICcnLCB3aWR0aDogJycsIGhlaWdodDogJycsIHBvaW50ZXJFdmVudHM6ICcnLCB0b3A6ICcnLCBsZWZ0OiAnJywgYm90dG9tOiAnJywgcmlnaHQ6ICcnfTtcblxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnB1c2goYXNzaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGVsLm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBlbC5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgfSwgcG9zaXRpb24oZWwpKSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goVHJhbnNpdGlvbi5jYW5jZWwpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbC5jaGlsZHJlbiwgcmVzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSgndXBkYXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZmFzdGRvbS5mbHVzaCgpO1xuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWluSGVpZ2h0JywgaGVpZ2h0KHRoaXMuJGVsKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcG9zaXRpb24oZWwpOyB9KTtcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChjaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBUcmFuc2l0aW9uLnN0YXJ0KGNzcyhlbCwgcHJvcHNbaV0pLCBwb3NpdGlvbnNbaV0sIHRoaXMkMS5hbmltYXRpb24pOyB9KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMkMS4kZWwsICdtaW5IZWlnaHQnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoY2hpbGRyZW4sIHJlc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS4kdXBkYXRlKCd1cGRhdGUnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhc3Rkb20uZmx1c2goKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgbm9vcCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB2YXIgb2JqO1xuXG4gICAgZnVuY3Rpb24gZ2V0U29ydGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudCAmJiAoVUlraXQuZ2V0Q29tcG9uZW50KGVsZW1lbnQsICdzb3J0YWJsZScpIHx8IGdldFNvcnRhYmxlKGVsZW1lbnQucGFyZW50Tm9kZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzUHJlZGVjZXNzb3IoZWxlbWVudCwgdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgPT09IHRhcmdldC5wYXJlbnROb2RlICYmIGluZGV4KGVsZW1lbnQpID4gaW5kZXgodGFyZ2V0KTtcbiAgICB9XG5cbn1cblxuaWYgKCF0cnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5VSWtpdCkge1xuICAgIHdpbmRvdy5VSWtpdC51c2UocGx1Z2luJDcpO1xufVxuXG5mdW5jdGlvbiBwbHVnaW4kOChVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQ4Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHV0aWwgPSBVSWtpdC51dGlsO1xuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciBhcHBlbmQgPSB1dGlsLmFwcGVuZDtcbiAgICB2YXIgYXR0ciA9IHV0aWwuYXR0cjtcbiAgICB2YXIgZG9jID0gdXRpbC5kb2M7XG4gICAgdmFyIGZhc3Rkb20gPSB1dGlsLmZhc3Rkb207XG4gICAgdmFyIGZsaXBQb3NpdGlvbiA9IHV0aWwuZmxpcFBvc2l0aW9uO1xuICAgIHZhciBpbmNsdWRlcyA9IHV0aWwuaW5jbHVkZXM7XG4gICAgdmFyIGlzVG91Y2ggPSB1dGlsLmlzVG91Y2g7XG4gICAgdmFyIGlzVmlzaWJsZSA9IHV0aWwuaXNWaXNpYmxlO1xuICAgIHZhciBtYXRjaGVzID0gdXRpbC5tYXRjaGVzO1xuICAgIHZhciBvbiA9IHV0aWwub247XG4gICAgdmFyIHBvaW50ZXJEb3duID0gdXRpbC5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlckVudGVyID0gdXRpbC5wb2ludGVyRW50ZXI7XG4gICAgdmFyIHBvaW50ZXJMZWF2ZSA9IHV0aWwucG9pbnRlckxlYXZlO1xuICAgIHZhciByZW1vdmUgPSB1dGlsLnJlbW92ZTtcbiAgICB2YXIgd2l0aGluID0gdXRpbC53aXRoaW47XG5cbiAgICB2YXIgYWN0aXZlcyA9IFtdO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCd0b29sdGlwJywge1xuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIG1peGluczogW21peGluLmNvbnRhaW5lciwgbWl4aW4udG9nZ2xhYmxlLCBtaXhpbi5wb3NpdGlvbl0sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRlbGF5OiBOdW1iZXIsXG4gICAgICAgICAgICB0aXRsZTogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHBvczogJ3RvcCcsXG4gICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICBkZWxheTogMCxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogWyd1ay1hbmltYXRpb24tc2NhbGUtdXAnXSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXG4gICAgICAgICAgICBjbHM6ICd1ay1hY3RpdmUnLFxuICAgICAgICAgICAgY2xzUG9zOiAndWstdG9vbHRpcCdcbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICBmYXN0ZG9tLm11dGF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiBhdHRyKHRoaXMkMS4kZWwsIHt0aXRsZTogbnVsbCwgJ2FyaWEtZXhwYW5kZWQnOiBmYWxzZX0pOyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKGFjdGl2ZXMsIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3RpdmVzLmZvckVhY2goZnVuY3Rpb24gKGFjdGl2ZSkgeyByZXR1cm4gYWN0aXZlLmhpZGUoKTsgfSk7XG4gICAgICAgICAgICAgICAgYWN0aXZlcy5wdXNoKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdW5iaW5kID0gb24oZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gIXdpdGhpbihlLnRhcmdldCwgdGhpcyQxLiRlbCkgJiYgdGhpcyQxLmhpZGUoKTsgfSk7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gYXBwZW5kKHRoaXMuY29udGFpbmVyLCAoXCI8ZGl2IGNsYXNzPVxcXCJcIiArICh0aGlzLmNsc1BvcykgKyBcIlxcXCIgYXJpYS1oaWRkZW4+PGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNQb3MpICsgXCItaW5uZXJcXFwiPlwiICsgKHRoaXMudGl0bGUpICsgXCI8L2Rpdj48L2Rpdj5cIikpO1xuXG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLiRlbCwgJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25BdCh0aGlzLnRvb2x0aXAsIHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5nZXRBeGlzKCkgPT09ICd5JyA/ICgoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkgKyBcIi1cIiArICh0aGlzLmFsaWduKSkgOiAoKHRoaXMuYWxpZ24pICsgXCItXCIgKyAoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlRWxlbWVudCh0aGlzJDEudG9vbHRpcCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmhpZGVUaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUodGhpcyQxLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sIDE1MCk7XG5cbiAgICAgICAgICAgICAgICB9LCB0aGlzLmRlbGF5KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhY3RpdmVzLmluZGV4T2YodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIX5pbmRleCB8fCBtYXRjaGVzKHRoaXMuJGVsLCAnaW5wdXQnKSAmJiB0aGlzLiRlbCA9PT0gZG9jLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFjdGl2ZXMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lcik7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmhpZGVUaW1lcik7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLiRlbCwgJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMudG9vbHRpcCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcCAmJiByZW1vdmUodGhpcy50b29sdGlwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91bmJpbmQoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHtcblxuICAgICAgICAgICAgJ2JsdXInOiAnaGlkZSdcblxuICAgICAgICB9LCBvYmpbKFwiZm9jdXMgXCIgKyBwb2ludGVyRW50ZXIgKyBcIiBcIiArIHBvaW50ZXJEb3duKV0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgIT09IHBvaW50ZXJEb3duIHx8ICFpc1RvdWNoKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9ialtwb2ludGVyTGVhdmVdID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVG91Y2goZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2JqIClcblxuICAgIH0pO1xuICAgIHZhciBvYmo7XG5cbn1cblxuaWYgKCF0cnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5VSWtpdCkge1xuICAgIHdpbmRvdy5VSWtpdC51c2UocGx1Z2luJDgpO1xufVxuXG5mdW5jdGlvbiBwbHVnaW4kOShVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQ5Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFkZENsYXNzID0gcmVmLmFkZENsYXNzO1xuICAgIHZhciBhamF4ID0gcmVmLmFqYXg7XG4gICAgdmFyIG1hdGNoZXMgPSByZWYubWF0Y2hlcztcbiAgICB2YXIgbm9vcCA9IHJlZi5ub29wO1xuICAgIHZhciBvbiA9IHJlZi5vbjtcbiAgICB2YXIgcmVtb3ZlQ2xhc3MgPSByZWYucmVtb3ZlQ2xhc3M7XG4gICAgdmFyIHRyaWdnZXIgPSByZWYudHJpZ2dlcjtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndXBsb2FkJywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBhbGxvdzogU3RyaW5nLFxuICAgICAgICAgICAgY2xzRHJhZ292ZXI6IFN0cmluZyxcbiAgICAgICAgICAgIGNvbmN1cnJlbnQ6IE51bWJlcixcbiAgICAgICAgICAgIG1pbWU6IFN0cmluZyxcbiAgICAgICAgICAgIG1zZ0ludmFsaWRNaW1lOiBTdHJpbmcsXG4gICAgICAgICAgICBtc2dJbnZhbGlkTmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgbXVsdGlwbGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBuYW1lOiBTdHJpbmcsXG4gICAgICAgICAgICBwYXJhbXM6IE9iamVjdCxcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIHVybDogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGFsbG93OiBmYWxzZSxcbiAgICAgICAgICAgIGNsc0RyYWdvdmVyOiAndWstZHJhZ292ZXInLFxuICAgICAgICAgICAgY29uY3VycmVudDogMSxcbiAgICAgICAgICAgIG1pbWU6IGZhbHNlLFxuICAgICAgICAgICAgbXNnSW52YWxpZE1pbWU6ICdJbnZhbGlkIEZpbGUgVHlwZTogJXMnLFxuICAgICAgICAgICAgbXNnSW52YWxpZE5hbWU6ICdJbnZhbGlkIEZpbGUgTmFtZTogJXMnLFxuICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlLFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGVzW10nLFxuICAgICAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICBhYm9ydDogbm9vcCxcbiAgICAgICAgICAgIGJlZm9yZUFsbDogbm9vcCxcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IG5vb3AsXG4gICAgICAgICAgICBjb21wbGV0ZTogbm9vcCxcbiAgICAgICAgICAgIGNvbXBsZXRlQWxsOiBub29wLFxuICAgICAgICAgICAgZXJyb3I6IG5vb3AsXG4gICAgICAgICAgICBmYWlsOiBub29wLFxuICAgICAgICAgICAgbG9hZDogbm9vcCxcbiAgICAgICAgICAgIGxvYWRFbmQ6IG5vb3AsXG4gICAgICAgICAgICBsb2FkU3RhcnQ6IG5vb3AsXG4gICAgICAgICAgICBwcm9ncmVzczogbm9vcFxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czoge1xuXG4gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIGNoYW5nZShlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXMoZS50YXJnZXQsICdpbnB1dFt0eXBlPVwiZmlsZVwiXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWQoZS50YXJnZXQuZmlsZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkcm9wOiBmdW5jdGlvbiBkcm9wKGUpIHtcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRyYW5zZmVyIHx8ICF0cmFuc2Zlci5maWxlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWQodHJhbnNmZXIuZmlsZXMpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZ2VudGVyOiBmdW5jdGlvbiBkcmFnZW50ZXIoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZ2xlYXZlOiBmdW5jdGlvbiBkcmFnbGVhdmUoZSkge1xuICAgICAgICAgICAgICAgIHN0b3AoZSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRHJhZ292ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChmaWxlcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIWZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3VwbG9hZCcsIFtmaWxlc10pO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEuYWxsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2godGhpcyQxLmFsbG93LCBmaWxlc1tpXS5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5mYWlsKHRoaXMkMS5tc2dJbnZhbGlkTmFtZS5yZXBsYWNlKC8lcy8sIHRoaXMkMS5hbGxvdykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzJDEubWltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCh0aGlzJDEubWltZSwgZmlsZXNbaV0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuZmFpbCh0aGlzJDEubXNnSW52YWxpZE1pbWUucmVwbGFjZSgvJXMvLCB0aGlzJDEubWltZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVzID0gW2ZpbGVzWzBdXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZUFsbCh0aGlzLCBmaWxlcyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2h1bmtzID0gY2h1bmsoZmlsZXMsIHRoaXMuY29uY3VycmVudCksXG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZCA9IGZ1bmN0aW9uIChmaWxlcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiBkYXRhLmFwcGVuZCh0aGlzJDEubmFtZSwgZmlsZSk7IH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcyQxLnBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKGtleSwgdGhpcyQxLnBhcmFtc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYWpheCh0aGlzJDEudXJsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMkMS50eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChlbnYpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeGhyID0gZW52LnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnVwbG9hZCAmJiBvbih4aHIudXBsb2FkLCAncHJvZ3Jlc3MnLCB0aGlzJDEucHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ2xvYWRTdGFydCcsICdsb2FkJywgJ2xvYWRFbmQnLCAnYWJvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiBvbih4aHIsIHR5cGUudG9Mb3dlckNhc2UoKSwgdGhpcyQxW3R5cGVdKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5iZWZvcmVTZW5kKGVudik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuY29tcGxldGUoeGhyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2h1bmtzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBsb2FkKGNodW5rcy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5jb21wbGV0ZUFsbCh4aHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7IHJldHVybiB0aGlzJDEuZXJyb3IoZS5tZXNzYWdlKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdXBsb2FkKGNodW5rcy5zaGlmdCgpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbWF0Y2gocGF0dGVybiwgcGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5tYXRjaChuZXcgUmVnRXhwKChcIl5cIiArIChwYXR0ZXJuLnJlcGxhY2UoL1xcLy9nLCAnXFxcXC8nKS5yZXBsYWNlKC9cXCpcXCovZywgJyhcXFxcL1teXFxcXC9dKykqJykucmVwbGFjZSgvXFwqL2csICdbXlxcXFwvXSsnKS5yZXBsYWNlKC8oKD8hXFxcXCkpXFw/L2csICckMS4nKSkgKyBcIiRcIiksICdpJykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNodW5rKGZpbGVzLCBzaXplKSB7XG4gICAgICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKz0gc2l6ZSkge1xuICAgICAgICAgICAgdmFyIGNodW5rID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIGNodW5rLnB1c2goZmlsZXNbaSArIGpdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2h1bmtzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3AoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQ5KTtcbn1cblxuVUlraXQkMi51c2UocGx1Z2luKTtcblVJa2l0JDIudXNlKHBsdWdpbiQxKTtcblVJa2l0JDIudXNlKHBsdWdpbiQyKTtcblVJa2l0JDIudXNlKHBsdWdpbiQ0KTtcblVJa2l0JDIudXNlKHBsdWdpbiQ1KTtcblVJa2l0JDIudXNlKHBsdWdpbiQ2KTtcblVJa2l0JDIudXNlKHBsdWdpbiQ3KTtcblVJa2l0JDIudXNlKHBsdWdpbiQ4KTtcblVJa2l0JDIudXNlKHBsdWdpbiQ5KTtcblxue1xuICAgIGJvb3QoVUlraXQkMik7XG59XG5cbnJldHVybiBVSWtpdCQyO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdWlraXQvZGlzdC9qcy91aWtpdC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJ2YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywgdGhpcy5kZWZhdWx0cywgeyBtZXRob2Q6ICdnZXQnIH0sIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIndpbmRvdy5VSWtpdCA9IHJlcXVpcmUoJ3Vpa2l0JylcbndpbmRvdy5heGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcbi8vIGNvbnN0IEljb25zID0gcmVxdWlyZSgndWlraXQvZGlzdC9qcy91aWtpdC1pY29ucycpXG5cbi8vIFVJa2l0LnVzZShJY29ucylcblxuZnVuY3Rpb24gZWwgKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudClcbn1cblxuKCgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnXG4gIC8vIFJlYWQgUHJvY2Vzc1xuICBsZXQgdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZpZXcnKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICB2aWV3W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2codmlld1tpXS5pZClcbiAgICAgIGF4aW9zLnBvc3QoJy91c2Vycy92aWV3Jywge1xuICAgICAgICBpZDogdmlld1tpXS5pZFxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGFcbiAgICAgICAgZWwoJy5uYW1lJykuaW5uZXJIVE1MID0gYDxzcGFuPiR7ZGF0YS5uYW1lfTwvc3Bhbj5gXG4gICAgICAgIGVsKCcuZG9iJykuaW5uZXJIVE1MID0gZGF0YS5kb2JcbiAgICAgICAgZWwoJy5nZW5kZXInKS5pbm5lckhUTUwgPSBkYXRhLmdlbmRlclxuICAgICAgICBlbCgnLnBob25lJykuaW5uZXJIVE1MID0gZGF0YS5waG9uZVxuICAgICAgICBlbCgnLmVtYWlsJykuaW5uZXJIVE1MID0gZGF0YS5lbWFpbFxuICAgICAgICBVSWtpdC5tb2RhbCgnI21vZGFsLWZ1bGwnKS5zaG93KClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyBVcGRhdGUgTW9kYWwgUHJvY2Vzc1xuICBsZXQgdXBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndXBkYXRlJylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGUubGVuZ3RoOyBpKyspIHtcbiAgICB1cGRhdGVbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBmZXRjaCgnL2VkaXQvdmlldycsIHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGlkOiB1cGRhdGVbaV0ucGFyZW50Tm9kZS5pZFxuICAgICAgICB9KVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLm9rKSByZXR1cm4gcmVzLmpzb24oKVxuICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgZWwoJy5faWQnKS52YWx1ZSA9IGRhdGEuX2lkXG4gICAgICAgIGVsKCcubmFtZScpLnZhbHVlID0gZGF0YS5uYW1lXG4gICAgICAgIGVsKCcuZG9iJykudmFsdWUgPSBkYXRhLmRvYlxuICAgICAgICBsZXQgZ2VuZGVyID0gZGF0YS5nZW5kZXIudG9Mb3dlckNhc2UoKVxuICAgICAgICBlbChgIyR7Z2VuZGVyfWApLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIGVsKCcucGhvbmUnKS52YWx1ZSA9IGRhdGEucGhvbmVcbiAgICAgICAgZWwoJy5lbWFpbCcpLnZhbHVlID0gZGF0YS5lbWFpbFxuICAgICAgICBlbCgnLmRlcGFydG1lbnQnKS52YWx1ZSA9IGRhdGEuZGVwYXJ0bWVudFxuICAgICAgICBVSWtpdC5tb2RhbCgnI21vZGFsLWZ1bGwnKS5zaG93KClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuICAvLyBVcGRhdGUgUmVjb3JkIFByb2Nlc3NcbiAgaWYgKGVsKCcjc2F2ZScpICE9PSBudWxsKSB7XG4gICAgZWwoJyNzYXZlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgX2lkID0gZWwoJy5faWQnKS52YWx1ZVxuICAgICAgbGV0IG5hbWUgPSBlbCgnLm5hbWUnKS52YWx1ZVxuICAgICAgbGV0IGRvYiA9IGVsKCcuZG9iJykudmFsdWVcbiAgICAgIGxldCBnZW5kZXJcbiAgICAgIGlmIChlbCgnI21hbGUnKS5jaGVja2VkKSB7XG4gICAgICAgIGdlbmRlciA9ICdNYWxlJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuZGVyID0gJ0ZlbWFsZSdcbiAgICAgIH1cbiAgICAgIGxldCBwaG9uZSA9IGVsKCcucGhvbmUnKS52YWx1ZVxuICAgICAgbGV0IGVtYWlsID0gZWwoJy5lbWFpbCcpLnZhbHVlXG4gICAgICBsZXQgZGVwYXJ0bWVudCA9IGVsKCcuZGVwYXJ0bWVudCcpLnZhbHVlXG5cbiAgICAgIGZldGNoKCdlZGl0L3NhdmUnLCB7XG4gICAgICAgIG1ldGhvZDogJ3B1dCcsXG4gICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICdfaWQnOiBfaWQsXG4gICAgICAgICAgJ25hbWUnOiBuYW1lLFxuICAgICAgICAgICdkb2InOiBkb2IsXG4gICAgICAgICAgJ2dlbmRlcic6IGdlbmRlcixcbiAgICAgICAgICAncGhvbmUnOiBwaG9uZSxcbiAgICAgICAgICAnZW1haWwnOiBlbWFpbCxcbiAgICAgICAgICAnZGVwYXJ0bWVudCc6IGRlcGFydG1lbnRcbiAgICAgICAgfSlcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5vaykgcmV0dXJuIHJlcy5qc29uXG4gICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBsZXQgcmVtb3ZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGVsZXRlJylcbiAgaWYgKHJlbW92ZSAhPT0gbnVsbCkge1xuICAgIC8vIGVsKCcjZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgLy9cbiAgICAvLyB9KVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBVSWtpdC51dGlsLm9uKHJlbW92ZVtpXSwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGUudGFyZ2V0LmJsdXIoKVxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLmlkKVxuICAgICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC50aXRsZVxuICAgICAgICBVSWtpdC5tb2RhbC5jb25maXJtKGBEbyB5b3Ugd2lzaCB0byBkZWxldGUgJHtuYW1lfSdzIHByb2ZpbGVgKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBmZXRjaCgnZWRpdC9yZW1vdmUnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBfaWQ6IGUudGFyZ2V0LnBhcmVudE5vZGUuaWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5vaykgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSlcbiAgICAgICAgICB9KVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJycpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2phdmFzY3JpcHRzL2FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=