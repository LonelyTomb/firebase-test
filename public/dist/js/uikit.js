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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 10:
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

/***/ 11:
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

/***/ 12:
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

/***/ 3:
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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(34);


/***/ }),

/***/ 34:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["UIkit"] = __webpack_require__(10);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWUyMzQ2MDQ2NDRiZGUzMzdlNzciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdWlraXQvZGlzdC9qcy91aWtpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9zdHlsZXNoZWV0cy9zdHlsZS5zY3NzPzY5OTgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Vpa2l0L2Rpc3QvanMvdWlraXQuanM/ZWE3ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMscUJBQXFCOztBQUV0QjtBQUNBO0FBQ0E7O0FBRUE7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QUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNEQUFzRCxnQkFBZ0I7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3SEFBd0g7QUFDeEg7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYixTQUFTOztBQUVULCtDQUErQyxpQ0FBaUMsRUFBRTs7QUFFbEY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBLGtGQUFrRixxQkFBcUIsRUFBRTtBQUN6Rzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSxpREFBaUQsNkJBQTZCLEVBQUU7QUFDaEY7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsK0JBQStCLDRCQUE0QixFQUFFO0FBQzdEOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7O0FBR0EsK0NBQStDLGlDQUFpQyxFQUFFOztBQUVsRjtBQUNBLGtEQUFrRCxvRkFBb0YsOENBQThDLEVBQUUsRUFBRSxFQUFFO0FBQzFMOztBQUVBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxpQkFBaUIsRUFBRTtBQUNuRTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0EsMEJBQTBCLGtCQUFrQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7OztBQUdBLDhDQUE4QyxnRkFBZ0YsRUFBRTs7QUFFaEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGtCQUFrQjtBQUNyRTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSw4REFBOEQsZ0NBQWdDLEVBQUU7QUFDaEc7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx3Q0FBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7O0FBRXJDO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEMscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2Qjs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0EseURBQXlELHVDQUF1QztBQUNoRzs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QztBQUM3Qzs7QUFFQTs7QUFFQSxxQkFBcUI7QUFDckIsaUJBQWlCOztBQUVqQjtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBOztBQUVBOztBQUVBLHlCQUF5Qjs7QUFFekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHFCQUFxQjs7QUFFckIsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBLHFFQUFxRSxnQkFBZ0IsRUFBRTtBQUN2RixhQUFhOztBQUViO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0Esd0RBQXdELGdCQUFnQixFQUFFO0FBQzFFOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRCx5QkFBeUI7QUFDM0U7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUVBQW1FLE9BQU87QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQjs7QUFFckIsaUJBQWlCOztBQUVqQjs7QUFFQSxzREFBc0Qsa0JBQWtCLEVBQUU7QUFDMUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCO0FBQ2pCOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLG9FQUFvRTtBQUM3RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRkFBc0Ysc0JBQXNCLEVBQUU7QUFDOUcseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUEscUJBQXFCOztBQUVyQjs7QUFFQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQWdDLHVCQUF1Qjs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxhQUFhOztBQUViLFNBQVM7O0FBRVQ7QUFDQTs7O0FBR0E7QUFDQSxnQ0FBZ0Msa0NBQWtDO0FBQ2xFOztBQUVBO0FBQ0EsOENBQThDLG9FQUFvRSxFQUFFO0FBQ3BIOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBLDRDQUE0Qyw4QkFBOEIsRUFBRTtBQUM1RSx5Q0FBeUMsaUNBQWlDO0FBQzFFOztBQUVBOztBQUVBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBLG1EQUFtRCx5Q0FBeUMsRUFBRTtBQUM5Rjs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLFlBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLDJDQUEyQztBQUNuRjtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULG1CQUFtQixnQ0FBZ0M7O0FBRW5EOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQSxTQUFTOztBQUVULEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUEsdUZBQXVGLHFCQUFxQixFQUFFO0FBQzlHOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCw0QkFBNEIsRUFBRTtBQUM5RSxTQUFTOztBQUVUOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZEQUE2RCx3QkFBd0IsRUFBRTtBQUN2Rjs7QUFFQSw0REFBNEQsMkNBQTJDLEVBQUU7QUFDekc7O0FBRUEsaUJBQWlCOztBQUVqQjs7QUFFQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSwwREFBMEQsdUJBQXVCLEVBQUU7QUFDbkY7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0ZBQWdGLHVDQUF1QyxFQUFFO0FBQ3pILGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxzREFBc0Qsc0NBQXNDLHdHQUF3RztBQUNwTSwwQkFBMEI7QUFDMUI7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUEsS0FBSzs7QUFFTDtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RCxxQkFBcUI7QUFDckI7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxxQkFBcUIsMkNBQTJDO0FBQ2hFLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsZ0VBQWdFO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQSw0R0FBNEcsZ0JBQWdCO0FBQzVILGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxhQUFhOztBQUViOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxtRUFBbUUsOEJBQThCO0FBQ2pHO0FBQ0E7O0FBRUE7O0FBRUEsYUFBYTs7QUFFYjtBQUNBOzs7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QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVULDBCQUEwQjs7QUFFMUI7O0FBRUE7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RUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjs7QUFFckIsaUJBQWlCO0FBQ2pCLGFBQWE7O0FBRWI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLCtCQUErQixrQkFBa0I7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsdURBQXVELHVDQUF1QyxFQUFFOztBQUVoRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1HQUFtRyxrREFBa0Q7QUFDcko7O0FBRUE7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBLDZCQUE2QjtBQUM3QiwwQ0FBMEMsZ0NBQWdDO0FBQzFFOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0EsMkJBQTJCLFVBQVU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7OztBQ3R0VUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwREE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7QUN6TEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLHlDOzs7Ozs7O0FDQUEseUciLCJmaWxlIjoianMvdWlraXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWUyMzQ2MDQ2NDRiZGUzMzdlNzciLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKiEgVUlraXQgMy4wLjAtYmV0YS4zMyB8IGh0dHA6Ly93d3cuZ2V0dWlraXQuY29tIHwgKGMpIDIwMTQgLSAyMDE3IFlPT3RoZW1lIHwgTUlUIExpY2Vuc2UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ3Vpa2l0JywgZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLlVJa2l0ID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFByb21pc2VzL0ErIHBvbHlmaWxsIHYxLjEuNCAoaHR0cHM6Ly9naXRodWIuY29tL2JyYW1zdGVpbi9wcm9taXMpXG4gKi9cblxudmFyIFJFU09MVkVEID0gMDtcbnZhciBSRUpFQ1RFRCA9IDE7XG52YXIgUEVORElORyAgPSAyO1xuXG52YXIgYXN5bmMgPSAnc2V0SW1tZWRpYXRlJyBpbiB3aW5kb3cgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0O1xuXG5mdW5jdGlvbiBQcm9taXNlJDEoZXhlY3V0b3IpIHtcblxuICAgIHRoaXMuc3RhdGUgPSBQRU5ESU5HO1xuICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZWZlcnJlZCA9IFtdO1xuXG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgZXhlY3V0b3IoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZSh4KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KHIpO1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGUpO1xuICAgIH1cbn1cblxuUHJvbWlzZSQxLnJlamVjdCA9IGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3Qocik7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlJDEucmVzb2x2ZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXNvbHZlKHgpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZSQxLmFsbCA9IGZ1bmN0aW9uIGFsbChpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gMCwgcmVzdWx0ID0gW107XG5cbiAgICAgICAgaWYgKGl0ZXJhYmxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZXIoaSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0geDtcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBQcm9taXNlJDEucmVzb2x2ZShpdGVyYWJsZVtpXSkudGhlbihyZXNvbHZlcihpKSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuUHJvbWlzZSQxLnJhY2UgPSBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBQcm9taXNlJDEucmVzb2x2ZShpdGVyYWJsZVtpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG52YXIgcCA9IFByb21pc2UkMS5wcm90b3R5cGU7XG5cbnAucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHZhciBwcm9taXNlID0gdGhpcztcblxuICAgIGlmIChwcm9taXNlLnN0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgICAgIGlmICh4ID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlIHNldHRsZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB0aGVuID0geCAmJiB4LnRoZW47XG5cbiAgICAgICAgICAgIGlmICh4ICE9PSBudWxsICYmIGlzT2JqZWN0KHgpICYmIGlzRnVuY3Rpb24odGhlbikpIHtcbiAgICAgICAgICAgICAgICB0aGVuLmNhbGwoeCwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZSh4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KHIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UucmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZS5zdGF0ZSA9IFJFU09MVkVEO1xuICAgICAgICBwcm9taXNlLnZhbHVlID0geDtcbiAgICAgICAgcHJvbWlzZS5ub3RpZnkoKTtcbiAgICB9XG59O1xuXG5wLnJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG5cbiAgICBpZiAocHJvbWlzZS5zdGF0ZSA9PT0gUEVORElORykge1xuICAgICAgICBpZiAocmVhc29uID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlIHNldHRsZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVKRUNURUQ7XG4gICAgICAgIHByb21pc2UudmFsdWUgPSByZWFzb247XG4gICAgICAgIHByb21pc2Uubm90aWZ5KCk7XG4gICAgfVxufTtcblxucC5ub3RpZnkgPSBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBhc3luYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzJDEuc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzJDEuZGVmZXJyZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gdGhpcyQxLmRlZmVycmVkLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgICAgIG9uUmVzb2x2ZWQgPSBkZWZlcnJlZFswXSxcbiAgICAgICAgICAgICAgICAgICAgb25SZWplY3RlZCA9IGRlZmVycmVkWzFdLFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gZGVmZXJyZWRbMl0sXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCA9IGRlZmVycmVkWzNdO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5zdGF0ZSA9PT0gUkVTT0xWRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKG9uUmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvblJlc29sdmVkLmNhbGwodW5kZWZpbmVkLCB0aGlzJDEudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzJDEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMkMS5zdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvblJlamVjdGVkLmNhbGwodW5kZWZpbmVkLCB0aGlzJDEudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMkMS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnAudGhlbiA9IGZ1bmN0aW9uIHRoZW4ob25SZXNvbHZlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlJDEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGlzJDEuZGVmZXJyZWQucHVzaChbb25SZXNvbHZlZCwgb25SZWplY3RlZCwgcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICAgIHRoaXMkMS5ub3RpZnkoKTtcbiAgICB9KTtcbn07XG5cbnAuY2F0Y2ggPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbn07XG5cbmZ1bmN0aW9uIGJpbmQoZm4sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbCA/IGwgPiAxID8gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKSA6IGZuLmNhbGwoY29udGV4dCwgYSkgOiBmbi5jYWxsKGNvbnRleHQpO1xuICAgIH07XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxudmFyIFByb21pc2UgPSAnUHJvbWlzZScgaW4gd2luZG93ID8gd2luZG93LlByb21pc2UgOiBQcm9taXNlJDE7XG5cbnZhciBjbGFzc2lmeVJlID0gLyg/Ol58Wy1fXFwvXSkoXFx3KS9nO1xuXG5mdW5jdGlvbiBjbGFzc2lmeShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoY2xhc3NpZnlSZSwgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJzsgfSk7XG59XG5cbnZhciBoeXBoZW5hdGVSZSA9IC8oW2EtelxcZF0pKFtBLVpdKS9nO1xuXG5mdW5jdGlvbiBoeXBoZW5hdGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0clxuICAgICAgICAucmVwbGFjZShoeXBoZW5hdGVSZSwgJyQxLSQyJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKClcbn1cblxudmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG5cbmZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCB0b1VwcGVyKVxufVxuXG5mdW5jdGlvbiB0b1VwcGVyKF8sIGMpIHtcbiAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnXG59XG5cbmZ1bmN0aW9uIHVjZmlyc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5sZW5ndGggPyB0b1VwcGVyKG51bGwsIHN0ci5jaGFyQXQoMCkpICsgc3RyLnNsaWNlKDEpIDogJyc7XG59XG5cbnZhciBzdHJQcm90b3R5cGUgPSBTdHJpbmcucHJvdG90eXBlO1xudmFyIHN0YXJ0c1dpdGhGbiA9IHN0clByb3RvdHlwZS5zdGFydHNXaXRoIHx8IGZ1bmN0aW9uIChzZWFyY2gpIHsgcmV0dXJuIHRoaXMubGFzdEluZGV4T2Yoc2VhcmNoLCAwKSA9PT0gMDsgfTtcblxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHNlYXJjaCkge1xuICAgIHJldHVybiBzdGFydHNXaXRoRm4uY2FsbChzdHIsIHNlYXJjaCk7XG59XG5cbnZhciBlbmRzV2l0aEZuID0gc3RyUHJvdG90eXBlLmVuZHNXaXRoIHx8IGZ1bmN0aW9uIChzZWFyY2gpIHsgcmV0dXJuIHRoaXMuc3Vic3RyKC0xICogc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDsgfTtcblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gpIHtcbiAgICByZXR1cm4gZW5kc1dpdGhGbi5jYWxsKHN0ciwgc2VhcmNoKTtcbn1cblxudmFyIGluY2x1ZGVzRm4gPSBmdW5jdGlvbiAoc2VhcmNoKSB7IHJldHVybiB+dGhpcy5pbmRleE9mKHNlYXJjaCk7IH07XG52YXIgaW5jbHVkZXNTdHIgPSBzdHJQcm90b3R5cGUuaW5jbHVkZXMgfHwgaW5jbHVkZXNGbjtcbnZhciBpbmNsdWRlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzIHx8IGluY2x1ZGVzRm47XG5cbmZ1bmN0aW9uIGluY2x1ZGVzKG9iaiwgc2VhcmNoKSB7XG4gICAgcmV0dXJuIG9iaiAmJiAoaXNTdHJpbmcob2JqKSA/IGluY2x1ZGVzU3RyIDogaW5jbHVkZXNBcnJheSkuY2FsbChvYmosIHNlYXJjaCk7XG59XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KG9iaikgJiYgb2JqID09PSBvYmoud2luZG93O1xufVxuXG5mdW5jdGlvbiBpc0RvY3VtZW50KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmIG9iai5ub2RlVHlwZSA9PT0gOTtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWModmFsdWUpIHtcbiAgICByZXR1cm4gaXNOdW1iZXIodmFsdWUpIHx8IGlzU3RyaW5nKHZhbHVlKSAmJiAhaXNOYU4odmFsdWUgLSBwYXJzZUZsb2F0KHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB2b2lkIDA7XG59XG5cbmZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiB2YWx1ZSA9PT0gJ3RydWUnIHx8IHZhbHVlID09PSAnMScgfHwgdmFsdWUgPT09ICcnXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT09ICcwJ1xuICAgICAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgICAgICA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgIHJldHVybiAhaXNOYU4obnVtYmVyKSA/IG51bWJlciA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHRvTGlzdCh2YWx1ZSkge1xuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcodmFsdWUpXG4gICAgICAgICAgICA/IHZhbHVlLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXNOdW1lcmljKHZhbHVlKVxuICAgICAgICAgICAgICAgID8gdG9OdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgOiB0b0Jvb2xlYW4odmFsdWUudHJpbSgpKTsgfSlcbiAgICAgICAgICAgIDogW3ZhbHVlXTtcbn1cblxudmFyIHZhcnMgPSB7fTtcblxuZnVuY3Rpb24gdG9NZWRpYSh2YWx1ZSkge1xuXG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICBpZiAodmFsdWVbMF0gPT09ICdAJykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBcIm1lZGlhLVwiICsgKHZhbHVlLnN1YnN0cigxKSk7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhcnNbbmFtZV0gfHwgKHZhcnNbbmFtZV0gPSB0b0Zsb2F0KGdldENzc1ZhcihuYW1lKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlICYmICFpc05hTih2YWx1ZSkgPyAoXCIobWluLXdpZHRoOiBcIiArIHZhbHVlICsgXCJweClcIikgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29lcmNlKHR5cGUsIHZhbHVlLCBjb250ZXh0KSB7XG5cbiAgICBpZiAodHlwZSA9PT0gQm9vbGVhbikge1xuICAgICAgICByZXR1cm4gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3F1ZXJ5Jykge1xuICAgICAgICByZXR1cm4gcXVlcnkodmFsdWUsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xpc3QnKSB7XG4gICAgICAgIHJldHVybiB0b0xpc3QodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICByZXR1cm4gdG9NZWRpYSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUgPyB0eXBlKHZhbHVlKSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0b01zKHRpbWUpIHtcbiAgICByZXR1cm4gIXRpbWVcbiAgICAgICAgPyAwXG4gICAgICAgIDogZW5kc1dpdGgodGltZSwgJ21zJylcbiAgICAgICAgICAgID8gdG9GbG9hdCh0aW1lKVxuICAgICAgICAgICAgOiB0b0Zsb2F0KHRpbWUpICogMTAwMDtcbn1cblxuZnVuY3Rpb24gc3dhcCh2YWx1ZSwgYSwgYikge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoKGEgKyBcInxcIiArIGIpLCAnbWcnKSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaCA9PT0gYSA/IGIgOiBhXG4gICAgfSk7XG59XG5cbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoIGxlbi0tID4gMCApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgICB0YXJnZXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3NbaV07XG4gICAgICAgIGlmIChzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzT3duKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZnVuY3Rpb24gZWFjaChvYmosIGNiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoY2IuY2FsbChvYmpba2V5XSwgb2JqW2tleV0sIGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xhbXAobnVtYmVyLCBtaW4sIG1heCkge1xuICAgIGlmICggbWluID09PSB2b2lkIDAgKSBtaW4gPSAwO1xuICAgIGlmICggbWF4ID09PSB2b2lkIDAgKSBtYXggPSAxO1xuXG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bWJlciwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGludGVyc2VjdFJlY3QocjEsIHIyKSB7XG4gICAgcmV0dXJuIHIxLmxlZnQgPD0gcjIucmlnaHQgJiZcbiAgICAgICAgcjIubGVmdCA8PSByMS5yaWdodCAmJlxuICAgICAgICByMS50b3AgPD0gcjIuYm90dG9tICYmXG4gICAgICAgIHIyLnRvcCA8PSByMS5ib3R0b207XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5SZWN0KHBvaW50LCByZWN0KSB7XG4gICAgcmV0dXJuIGludGVyc2VjdFJlY3Qoe3RvcDogcG9pbnQueSwgYm90dG9tOiBwb2ludC55LCBsZWZ0OiBwb2ludC54LCByaWdodDogcG9pbnQueH0sIHJlY3QpXG59XG5cbmZ1bmN0aW9uIGFqYXgodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgZW52ID0gYXNzaWduKHtcbiAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICB4aHI6IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxuICAgICAgICAgICAgYmVmb3JlU2VuZDogbm9vcCxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJydcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIHhociA9IGVudi54aHI7XG5cbiAgICAgICAgZW52LmJlZm9yZVNlbmQoZW52KTtcblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGVudikge1xuICAgICAgICAgICAgaWYgKHByb3AgaW4geGhyKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgICAgICB4aHJbcHJvcF0gPSBlbnZbcHJvcF07XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgeGhyLm9wZW4oZW52Lm1ldGhvZC50b1VwcGVyQ2FzZSgpLCB1cmwpO1xuXG4gICAgICAgIGZvciAodmFyIGhlYWRlciBpbiBlbnYuaGVhZGVycykge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBlbnYuaGVhZGVyc1toZWFkZXJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uKHhociwgJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAwIHx8IHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDAgfHwgeGhyLnN0YXR1cyA9PT0gMzA0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoYXNzaWduKEVycm9yKHhoci5zdGF0dXNUZXh0KSwge1xuICAgICAgICAgICAgICAgICAgICB4aHI6IHhocixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9uKHhociwgJ2Vycm9yJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0KGFzc2lnbihFcnJvcignTmV0d29yayBFcnJvcicpLCB7eGhyOiB4aHJ9KSk7IH0pO1xuICAgICAgICBvbih4aHIsICd0aW1lb3V0JywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVqZWN0KGFzc2lnbihFcnJvcignTmV0d29yayBUaW1lb3V0JyksIHt4aHI6IHhocn0pKTsgfSk7XG5cbiAgICAgICAgeGhyLnNlbmQoZW52LmRhdGEpO1xuICAgIH0pO1xufVxuXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxuZnVuY3Rpb24gJCQxKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuICFpc1N0cmluZyhzZWxlY3RvcilcbiAgICAgICAgPyB0b05vZGUoc2VsZWN0b3IpXG4gICAgICAgIDogaXNIdG1sKHNlbGVjdG9yKVxuICAgICAgICAgICAgPyB0b05vZGUoZnJhZ21lbnQoc2VsZWN0b3IpKVxuICAgICAgICAgICAgOiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IHRvTm9kZXMoc2VsZWN0b3IpXG4gICAgICAgIDogaXNIdG1sKHNlbGVjdG9yKVxuICAgICAgICAgICAgPyB0b05vZGVzKGZyYWdtZW50KHNlbGVjdG9yKSlcbiAgICAgICAgICAgIDogZmluZEFsbChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIGlzSHRtbChzdHIpIHtcbiAgICByZXR1cm4gc3RyWzBdID09PSAnPCcgfHwgc3RyLm1hdGNoKC9eXFxzKjwvKTtcbn1cblxuZnVuY3Rpb24gcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gJCQxKHNlbGVjdG9yLCBpc0NvbnRleHRTZWxlY3RvcihzZWxlY3RvcikgPyBjb250ZXh0IDogZG9jKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gJCQoc2VsZWN0b3IsIGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSA/IGNvbnRleHQgOiBkb2MpO1xufVxuXG5mdW5jdGlvbiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRvTm9kZShfcXVlcnkoc2VsZWN0b3IsIGNvbnRleHQsICdxdWVyeVNlbGVjdG9yJykpO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxsKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoX3F1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0LCAncXVlcnlTZWxlY3RvckFsbCcpKTtcbn1cblxuZnVuY3Rpb24gX3F1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0LCBxdWVyeUZuKSB7XG4gICAgaWYgKCBjb250ZXh0ID09PSB2b2lkIDAgKSBjb250ZXh0ID0gZG9jO1xuXG5cbiAgICBpZiAoIXNlbGVjdG9yIHx8ICFpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKGNvbnRleHRTYW5pdGl6ZVJlLCAnJDEgKicpO1xuXG4gICAgdmFyIHJlbW92ZXM7XG5cbiAgICBpZiAoaXNDb250ZXh0U2VsZWN0b3Ioc2VsZWN0b3IpKSB7XG5cbiAgICAgICAgcmVtb3ZlcyA9IFtdO1xuXG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHNlbGVjdG9yLCBpKSB7XG5cbiAgICAgICAgICAgIHZhciBjdHggPSBjb250ZXh0O1xuXG4gICAgICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yLnRyaW0oKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yWzBdID09PSAnIScpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvcnMgPSBzZWxlY3Rvci5zdWJzdHIoMSkudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgY3R4ID0gY2xvc2VzdChjb250ZXh0LnBhcmVudE5vZGUsIHNlbGVjdG9yc1swXSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvcnMuc2xpY2UoMSkuam9pbignICcpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY3R4LmlkKSB7XG4gICAgICAgICAgICAgICAgY3R4LmlkID0gXCJ1ay1cIiArIChEYXRlLm5vdygpKSArIGk7XG4gICAgICAgICAgICAgICAgcmVtb3Zlcy5wdXNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZUF0dHIoY3R4LCAnaWQnKTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXCIjXCIgKyAoY3R4LmlkKSArIFwiIFwiICsgc2VsZWN0b3IpO1xuXG4gICAgICAgIH0pLmZpbHRlcihCb29sZWFuKS5qb2luKCcsJyk7XG5cbiAgICAgICAgY29udGV4dCA9IGRvYztcblxuICAgIH1cblxuICAgIHRyeSB7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRleHRbcXVlcnlGbl0oc2VsZWN0b3IpO1xuXG4gICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfSBmaW5hbGx5IHtcblxuICAgICAgICByZW1vdmVzICYmIHJlbW92ZXMuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlKSB7IHJldHVybiByZW1vdmUoKTsgfSk7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gZmlsdGVyKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuICQkKGVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbWF0Y2hlcyhlbGVtZW50LCBzZWxlY3Rvcik7IH0pO1xufVxuXG5mdW5jdGlvbiB3aXRoaW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gIWlzU3RyaW5nKHNlbGVjdG9yKVxuICAgICAgICA/IGVsZW1lbnQgPT09IHNlbGVjdG9yIHx8IHRvTm9kZShzZWxlY3RvcikuY29udGFpbnModG9Ob2RlKGVsZW1lbnQpKVxuICAgICAgICA6IG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHx8IGNsb3Nlc3QoZWxlbWVudCwgc2VsZWN0b3IpO1xufVxuXG52YXIgY29udGV4dFNlbGVjdG9yUmUgPSAvKF58LClcXHMqWyE+K35dLztcbnZhciBjb250ZXh0U2FuaXRpemVSZSA9IC8oWyE+K35dKSg/PVxccytbIT4rfl18XFxzKiQpL2c7XG5cbmZ1bmN0aW9uIGlzQ29udGV4dFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nKHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5tYXRjaChjb250ZXh0U2VsZWN0b3JSZSk7XG59XG5cbnZhciBlbFByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG52YXIgbWF0Y2hlc0ZuID0gZWxQcm90by5tYXRjaGVzIHx8IGVsUHJvdG8ubXNNYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdG9Ob2RlcyhlbGVtZW50KS5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBtYXRjaGVzRm4uY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7IH0pO1xufVxuXG52YXIgY2xvc2VzdEZuID0gZWxQcm90by5jbG9zZXN0IHx8IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHZhciBhbmNlc3RvciA9IHRoaXM7XG5cbiAgICBpZiAoIWRvY0VsLmNvbnRhaW5zKHRoaXMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkbyB7XG5cbiAgICAgICAgaWYgKG1hdGNoZXMoYW5jZXN0b3IsIHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFuY2VzdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlO1xuXG4gICAgfSB3aGlsZSAoYW5jZXN0b3IgJiYgYW5jZXN0b3Iubm9kZVR5cGUgPT09IDEpO1xufTtcblxuZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50LCBzZWxlY3Rvcikge1xuXG4gICAgaWYgKHN0YXJ0c1dpdGgoc2VsZWN0b3IsICc+JykpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNOb2RlKGVsZW1lbnQpID8gY2xvc2VzdEZuLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpIDogdG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGNsb3Nlc3RGbi5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTsgfSk7XG59XG5cbmZ1bmN0aW9uIHBhcmVudHMoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICB2YXIgZWxlbWVudHMgPSBbXSwgcGFyZW50ID0gdG9Ob2RlKGVsZW1lbnQpLnBhcmVudE5vZGU7XG5cbiAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSkge1xuXG4gICAgICAgIGlmIChtYXRjaGVzKHBhcmVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGlzSlF1ZXJ5KG9iaikge1xuICAgIHJldHVybiBpc09iamVjdChvYmopICYmICEhb2JqLmpxdWVyeTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUgfHwgaXNPYmplY3QoZWxlbWVudCkgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlQ29sbGVjdGlvbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbGVtZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHRvTm9kZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIGlzTm9kZShlbGVtZW50KSB8fCBpc1dpbmRvdyhlbGVtZW50KSB8fCBpc0RvY3VtZW50KGVsZW1lbnQpXG4gICAgICAgID8gZWxlbWVudFxuICAgICAgICA6IGlzTm9kZUNvbGxlY3Rpb24oZWxlbWVudCkgfHwgaXNKUXVlcnkoZWxlbWVudClcbiAgICAgICAgICAgID8gZWxlbWVudFswXVxuICAgICAgICAgICAgOiBpc0FycmF5KGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgPyB0b05vZGUoZWxlbWVudFswXSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHRvTm9kZXMoZWxlbWVudCkge1xuICAgIHJldHVybiBpc05vZGUoZWxlbWVudClcbiAgICAgICAgPyBbZWxlbWVudF1cbiAgICAgICAgOiBpc05vZGVDb2xsZWN0aW9uKGVsZW1lbnQpXG4gICAgICAgICAgICA/IGFycmF5UHJvdG8uc2xpY2UuY2FsbChlbGVtZW50KVxuICAgICAgICAgICAgOiBpc0FycmF5KGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgPyBlbGVtZW50Lm1hcCh0b05vZGUpLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgIDogaXNKUXVlcnkoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgPyBlbGVtZW50LnRvQXJyYXkoKVxuICAgICAgICAgICAgICAgICAgICA6IFtdO1xufVxuXG5mdW5jdGlvbiBhdHRyKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG5cbiAgICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICAgICAgICAgIGF0dHIoZWxlbWVudCwga2V5LCBuYW1lW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRvTm9kZXMoZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoZWxlbWVudCwgYXR0cihlbGVtZW50LCBuYW1lKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUF0dHIoZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGhhc0F0dHIoZWxlbWVudCwgbmFtZSkge1xuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlKG5hbWUpOyB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cihlbGVtZW50LCBuYW1lKSB7XG4gICAgZWxlbWVudCA9IHRvTm9kZXMoZWxlbWVudCk7XG4gICAgbmFtZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cbiAgICAgICAgKTsgfVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckF0dHIoZWxlbWVudCwgYXR0cmlidXRlLCBwYXR0ZXJuLCByZXBsYWNlbWVudCkge1xuICAgIGF0dHIoZWxlbWVudCwgYXR0cmlidXRlLCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHZhbHVlID8gdmFsdWUucmVwbGFjZShwYXR0ZXJuLCByZXBsYWNlbWVudCkgOiB2YWx1ZTsgfSk7XG59XG5cbmZ1bmN0aW9uIGRhdGEoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGF0dHJzID0gW2F0dHJpYnV0ZSwgKFwiZGF0YS1cIiArIGF0dHJpYnV0ZSldOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc0F0dHIoZWxlbWVudCwgYXR0cnNbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gYXR0cihlbGVtZW50LCBhdHRyc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciB3aW4gPSB3aW5kb3c7XG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG52YXIgaXNSdGwgPSBhdHRyKGRvY0VsLCAnZGlyJykgPT09ICdydGwnO1xuXG5mdW5jdGlvbiBpc1JlYWR5KCkge1xuICAgIHJldHVybiBkb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBkb2MucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnICYmICFkb2NFbC5kb1Njcm9sbDtcbn1cblxuZnVuY3Rpb24gcmVhZHkoZm4pIHtcblxuICAgIGlmIChpc1JlYWR5KCkpIHtcbiAgICAgICAgZm4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bmJpbmQxKCk7XG4gICAgICAgICAgICB1bmJpbmQyKCk7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICB9LFxuICAgICAgICB1bmJpbmQxID0gb24oZG9jLCAnRE9NQ29udGVudExvYWRlZCcsIGhhbmRsZSksXG4gICAgICAgIHVuYmluZDIgPSBvbih3aW4sICdsb2FkJywgaGFuZGxlKTtcbn1cblxudmFyIHRyYW5zaXRpb25jYW5jZWwgPSAndHJhbnNpdGlvbmNhbmNlbGVkJztcblxuZnVuY3Rpb24gdHJhbnNpdGlvbihlbGVtZW50LCBwcm9wcywgZHVyYXRpb24sIHRyYW5zaXRpb24pIHtcbiAgICBpZiAoIGR1cmF0aW9uID09PSB2b2lkIDAgKSBkdXJhdGlvbiA9IDQwMDtcbiAgICBpZiAoIHRyYW5zaXRpb24gPT09IHZvaWQgMCApIHRyYW5zaXRpb24gPSAnbGluZWFyJztcblxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjc3MoZWxlbWVudCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB0cmlnZ2VyKGVsZW1lbnQsIHRyYW5zaXRpb25lbmQpOyB9LCBkdXJhdGlvbik7XG5cbiAgICAgICAgICAgIG9uY2UoZWxlbWVudCwgKHRyYW5zaXRpb25lbmQgKyBcIiBcIiArIHRyYW5zaXRpb25jYW5jZWwpLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcblxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgICAgICBjc3MoZWxlbWVudCwgJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gdHJhbnNpdGlvbmNhbmNlbCA/IHJlamVjdCgpIDogcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSwgZmFsc2UsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID09PSB0YXJnZXQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCBhc3NpZ24oe3RyYW5zaXRpb246IChcImFsbCBcIiArIGR1cmF0aW9uICsgXCJtcyBcIiArIHRyYW5zaXRpb24pfSwgcHJvcHMpKTtcblxuICAgICAgICB9KTsgfVxuICAgICkpO1xuXG59XG5cbnZhciBUcmFuc2l0aW9uID0ge1xuXG4gICAgc3RhcnQ6IHRyYW5zaXRpb24sXG5cbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKGVsZW1lbnQpIHtcbiAgICAgICAgdHJpZ2dlcihlbGVtZW50LCB0cmFuc2l0aW9uZW5kKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0sXG5cbiAgICBjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbChlbGVtZW50KSB7XG4gICAgICAgIHRyaWdnZXIoZWxlbWVudCwgdHJhbnNpdGlvbmNhbmNlbCk7XG4gICAgfSxcblxuICAgIGluUHJvZ3Jlc3M6IGZ1bmN0aW9uIGluUHJvZ3Jlc3MoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaGFzQ2xhc3MoZWxlbWVudCwgJ3VrLXRyYW5zaXRpb24nKTtcbiAgICB9XG5cbn07XG5cbnZhciBhbmltYXRpb25jYW5jZWwgPSAnYW5pbWF0aW9uY2FuY2VsJztcbnZhciBhbmltYXRpb25QcmVmaXggPSAndWstYW5pbWF0aW9uLSc7XG52YXIgY2xzQ2FuY2VsQW5pbWF0aW9uID0gJ3VrLWNhbmNlbC1hbmltYXRpb24nO1xuXG5mdW5jdGlvbiBhbmltYXRlKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbiwgb3V0KSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuICAgIGlmICggZHVyYXRpb24gPT09IHZvaWQgMCApIGR1cmF0aW9uID0gMjAwO1xuXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodG9Ob2RlcyhlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgaWYgKGhhc0NsYXNzKGVsZW1lbnQsIGNsc0NhbmNlbEFuaW1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBhbmltYXRlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyQxKS50aGVuKHJlc29sdmUsIHJlamVjdCk7IH1cbiAgICAgICAgICAgICAgICAgICAgKTsgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY2xzID0gYW5pbWF0aW9uICsgXCIgXCIgKyBhbmltYXRpb25QcmVmaXggKyAob3V0ID8gJ2xlYXZlJyA6ICdlbnRlcicpO1xuXG4gICAgICAgICAgICBpZiAoc3RhcnRzV2l0aChhbmltYXRpb24sIGFuaW1hdGlvblByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9IFwiIFwiICsgYW5pbWF0aW9uUHJlZml4ICsgb3JpZ2luO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzICs9IFwiIFwiICsgYW5pbWF0aW9uUHJlZml4ICsgXCJyZXZlcnNlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc2V0KCk7XG5cbiAgICAgICAgICAgIG9uY2UoZWxlbWVudCwgKChhbmltYXRpb25lbmQgfHwgJ2FuaW1hdGlvbmVuZCcpICsgXCIgXCIgKyBhbmltYXRpb25jYW5jZWwpLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGhhc1Jlc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gYW5pbWF0aW9uY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNSZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Jlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhlbGVtZW50LCBjbHNDYW5jZWxBbmltYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xzQ2FuY2VsQW5pbWF0aW9uKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgZmFsc2UsIGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID09PSB0YXJnZXQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3NzKGVsZW1lbnQsICdhbmltYXRpb25EdXJhdGlvbicsIChkdXJhdGlvbiArIFwibXNcIikpO1xuICAgICAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgY2xzKTtcblxuICAgICAgICAgICAgaWYgKCFhbmltYXRpb25lbmQpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gQW5pbWF0aW9uLmNhbmNlbChlbGVtZW50KTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIGNzcyhlbGVtZW50LCAnYW5pbWF0aW9uRHVyYXRpb24nLCAnJyk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NlcyhlbGVtZW50LCAoYW5pbWF0aW9uUHJlZml4ICsgXCJcXFxcUypcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pOyB9XG4gICAgKSk7XG5cbn1cblxudmFyIGluUHJvZ3Jlc3MgPSBuZXcgUmVnRXhwKChhbmltYXRpb25QcmVmaXggKyBcIihlbnRlcnxsZWF2ZSlcIikpO1xudmFyIEFuaW1hdGlvbiA9IHtcblxuICAgIGluOiBmdW5jdGlvbiBpbiQxKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbikge1xuICAgICAgICByZXR1cm4gYW5pbWF0ZShlbGVtZW50LCBhbmltYXRpb24sIGR1cmF0aW9uLCBvcmlnaW4sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoZWxlbWVudCwgYW5pbWF0aW9uLCBkdXJhdGlvbiwgb3JpZ2luKSB7XG4gICAgICAgIHJldHVybiBhbmltYXRlKGVsZW1lbnQsIGFuaW1hdGlvbiwgZHVyYXRpb24sIG9yaWdpbiwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIGluUHJvZ3Jlc3M6IGZ1bmN0aW9uIGluUHJvZ3Jlc3MkMShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBpblByb2dyZXNzLnRlc3QoYXR0cihlbGVtZW50LCAnY2xhc3MnKSk7XG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKGVsZW1lbnQpIHtcbiAgICAgICAgdHJpZ2dlcihlbGVtZW50LCBhbmltYXRpb25jYW5jZWwpO1xuICAgIH1cblxufTtcblxuZnVuY3Rpb24gaXNJblZpZXcoZWxlbWVudCwgdG9wLCBsZWZ0KSB7XG4gICAgaWYgKCB0b3AgPT09IHZvaWQgMCApIHRvcCA9IDA7XG4gICAgaWYgKCBsZWZ0ID09PSB2b2lkIDAgKSBsZWZ0ID0gMDtcblxuICAgIHJldHVybiBpbnRlcnNlY3RSZWN0KHRvTm9kZShlbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwge1xuICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgYm90dG9tOiB0b3AgKyBoZWlnaHQod2luKSxcbiAgICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aCh3aW4pXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNjcm9sbGVkT3ZlcihlbGVtZW50KSB7XG5cbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuXG4gICAgdmFyIGVsSGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgIHRvcCA9IHBvc2l0aW9uVG9wKGVsZW1lbnQpLFxuICAgICAgICB2cCA9IGhlaWdodCh3aW4pLFxuICAgICAgICB2aCA9IHZwICsgTWF0aC5taW4oMCwgdG9wIC0gdnApLFxuICAgICAgICBkaWZmID0gTWF0aC5tYXgoMCwgdnAgLSAoaGVpZ2h0KGRvYykgLSAodG9wICsgZWxIZWlnaHQpKSk7XG5cbiAgICByZXR1cm4gY2xhbXAoKCh2aCArIHdpbi5wYWdlWU9mZnNldCAtIHRvcCkgLyAoKHZoICsgKGVsSGVpZ2h0IC0gKGRpZmYgPCB2cCA/IGRpZmYgOiAwKSkgKSAvIDEwMCkpIC8gMTAwKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Ub3AoZWxlbWVudCkge1xuICAgIHZhciB0b3AgPSAwO1xuXG4gICAgZG8ge1xuXG4gICAgICAgIHRvcCArPSBlbGVtZW50Lm9mZnNldFRvcDtcblxuICAgIH0gd2hpbGUgKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCk7XG5cbiAgICByZXR1cm4gdG9wO1xufVxuXG5mdW5jdGlvbiBnZXRJbmRleChpLCBlbGVtZW50cywgY3VycmVudCkge1xuICAgIGlmICggY3VycmVudCA9PT0gdm9pZCAwICkgY3VycmVudCA9IDA7XG5cblxuICAgIGVsZW1lbnRzID0gdG9Ob2RlcyhlbGVtZW50cyk7XG5cbiAgICB2YXIgbGVuZ3RoID0gZWxlbWVudHMubGVuZ3RoO1xuXG4gICAgaSA9IChpc051bWVyaWMoaSlcbiAgICAgICAgICAgID8gdG9OdW1iZXIoaSlcbiAgICAgICAgICAgIDogaSA9PT0gJ25leHQnXG4gICAgICAgICAgICAgICAgPyBjdXJyZW50ICsgMVxuICAgICAgICAgICAgICAgIDogaSA9PT0gJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgICAgICA/IGN1cnJlbnQgLSAxXG4gICAgICAgICAgICAgICAgICAgIDogaW5kZXgoZWxlbWVudHMsIGkpXG4gICAgKSAlIGxlbmd0aDtcblxuICAgIHJldHVybiBpIDwgMCA/IGkgKyBsZW5ndGggOiBpO1xufVxuXG52YXIgdm9pZEVsZW1lbnRzID0ge1xuICAgIGFyZWE6IHRydWUsXG4gICAgYmFzZTogdHJ1ZSxcbiAgICBicjogdHJ1ZSxcbiAgICBjb2w6IHRydWUsXG4gICAgZW1iZWQ6IHRydWUsXG4gICAgaHI6IHRydWUsXG4gICAgaW1nOiB0cnVlLFxuICAgIGlucHV0OiB0cnVlLFxuICAgIGtleWdlbjogdHJ1ZSxcbiAgICBsaW5rOiB0cnVlLFxuICAgIG1lbnVpdGVtOiB0cnVlLFxuICAgIG1ldGE6IHRydWUsXG4gICAgcGFyYW06IHRydWUsXG4gICAgc291cmNlOiB0cnVlLFxuICAgIHRyYWNrOiB0cnVlLFxuICAgIHdicjogdHJ1ZVxufTtcbmZ1bmN0aW9uIGlzVm9pZEVsZW1lbnQoZWxlbWVudCkge1xuICAgIHJldHVybiB2b2lkRWxlbWVudHNbdG9Ob2RlKGVsZW1lbnQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKV07XG59XG5cbnZhciBEaW1lbnNpb25zID0ge1xuXG4gICAgcmF0aW86IGZ1bmN0aW9uIHJhdGlvKGRpbWVuc2lvbnMsIHByb3AsIHZhbHVlKSB7XG5cbiAgICAgICAgdmFyIGFQcm9wID0gcHJvcCA9PT0gJ3dpZHRoJyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgICAgICByZXR1cm4gKCBvYmogPSB7fSwgb2JqW2FQcm9wXSA9IE1hdGgucm91bmQodmFsdWUgKiBkaW1lbnNpb25zW2FQcm9wXSAvIGRpbWVuc2lvbnNbcHJvcF0pLCBvYmpbcHJvcF0gPSB2YWx1ZSwgb2JqICk7XG4gICAgICAgIHZhciBvYmo7XG4gICAgfSxcblxuICAgIGNvbnRhaW46IGZ1bmN0aW9uIGNvbnRhaW4oZGltZW5zaW9ucywgbWF4RGltZW5zaW9ucykge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICBkaW1lbnNpb25zID0gYXNzaWduKHt9LCBkaW1lbnNpb25zKTtcblxuICAgICAgICBlYWNoKGRpbWVuc2lvbnMsIGZ1bmN0aW9uIChfLCBwcm9wKSB7IHJldHVybiBkaW1lbnNpb25zID0gZGltZW5zaW9uc1twcm9wXSA+IG1heERpbWVuc2lvbnNbcHJvcF1cbiAgICAgICAgICAgID8gdGhpcyQxLnJhdGlvKGRpbWVuc2lvbnMsIHByb3AsIG1heERpbWVuc2lvbnNbcHJvcF0pXG4gICAgICAgICAgICA6IGRpbWVuc2lvbnM7IH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgICB9LFxuXG4gICAgY292ZXI6IGZ1bmN0aW9uIGNvdmVyKGRpbWVuc2lvbnMsIG1heERpbWVuc2lvbnMpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgZGltZW5zaW9ucyA9IHRoaXMuY29udGFpbihkaW1lbnNpb25zLCBtYXhEaW1lbnNpb25zKTtcblxuICAgICAgICBlYWNoKGRpbWVuc2lvbnMsIGZ1bmN0aW9uIChfLCBwcm9wKSB7IHJldHVybiBkaW1lbnNpb25zID0gZGltZW5zaW9uc1twcm9wXSA8IG1heERpbWVuc2lvbnNbcHJvcF1cbiAgICAgICAgICAgID8gdGhpcyQxLnJhdGlvKGRpbWVuc2lvbnMsIHByb3AsIG1heERpbWVuc2lvbnNbcHJvcF0pXG4gICAgICAgICAgICA6IGRpbWVuc2lvbnM7IH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHByZXZlbnRDbGljaygpIHtcblxuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJpZ2dlcihkb2MsICdjbGljaycpOyB9LCAwKTtcblxuICAgIG9uY2UoZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9LCB0cnVlKTtcblxufVxuXG5mdW5jdGlvbiBpc1Zpc2libGUoZWxlbWVudCkge1xuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0OyB9KTtcbn1cblxudmFyIHNlbElucHV0ID0gJ2lucHV0LHNlbGVjdCx0ZXh0YXJlYSxidXR0b24nO1xuZnVuY3Rpb24gaXNJbnB1dChlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gbWF0Y2hlcyhlbGVtZW50LCBzZWxJbnB1dCk7IH0pO1xufVxuXG5mdW5jdGlvbiBlbXB0eShlbGVtZW50KSB7XG4gICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBodG1sKHBhcmVudCwgaHRtbCkge1xuICAgIHBhcmVudCA9IHRvTm9kZShwYXJlbnQpO1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChodG1sKVxuICAgICAgICA/IHBhcmVudC5pbm5lckhUTUxcbiAgICAgICAgOiBhcHBlbmQocGFyZW50Lmhhc0NoaWxkTm9kZXMoKSA/IGVtcHR5KHBhcmVudCkgOiBwYXJlbnQsIGh0bWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kKHBhcmVudCwgZWxlbWVudCkge1xuXG4gICAgcGFyZW50ID0gdG9Ob2RlKHBhcmVudCk7XG5cbiAgICBpZiAoIXBhcmVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgcmV0dXJuIGFwcGVuZChwYXJlbnQsIGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCBwYXJlbnQuZmlyc3RDaGlsZCk7IH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kKHBhcmVudCwgZWxlbWVudCkge1xuICAgIHBhcmVudCA9IHRvTm9kZShwYXJlbnQpO1xuICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpOyB9KTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKHJlZiwgZWxlbWVudCkge1xuICAgIHJlZiA9IHRvTm9kZShyZWYpO1xuICAgIHJldHVybiBpbnNlcnROb2RlcyhlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gcmVmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHJlZik7IH0pO1xufVxuXG5mdW5jdGlvbiBhZnRlcihyZWYsIGVsZW1lbnQpIHtcbiAgICByZWYgPSB0b05vZGUocmVmKTtcbiAgICByZXR1cm4gaW5zZXJ0Tm9kZXMoZWxlbWVudCwgZnVuY3Rpb24gKGVsZW1lbnQpIHsgcmV0dXJuIHJlZi5uZXh0U2libGluZ1xuICAgICAgICA/IGJlZm9yZShyZWYubmV4dFNpYmxpbmcsIGVsZW1lbnQpXG4gICAgICAgIDogYXBwZW5kKHJlZi5wYXJlbnROb2RlLGVsZW1lbnQpOyB9XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Tm9kZXMoZWxlbWVudCwgZm4pIHtcbiAgICBlbGVtZW50ID0gaXNTdHJpbmcoZWxlbWVudCkgPyBmcmFnbWVudChlbGVtZW50KSA6IGVsZW1lbnQ7XG4gICAgcmV0dXJuICdsZW5ndGgnIGluIGVsZW1lbnQgPyB0b05vZGVzKGVsZW1lbnQpLm1hcChmbikgOiBmbihlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgICB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlICYmIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTsgfSk7XG59XG5cbmZ1bmN0aW9uIHdyYXBBbGwoZWxlbWVudCwgc3RydWN0dXJlKSB7XG5cbiAgICBzdHJ1Y3R1cmUgPSB0b05vZGUoYmVmb3JlKGVsZW1lbnQsIHN0cnVjdHVyZSkpO1xuXG4gICAgd2hpbGUgKHN0cnVjdHVyZS5maXJzdENoaWxkKSB7XG4gICAgICAgIHN0cnVjdHVyZSA9IHN0cnVjdHVyZS5maXJzdENoaWxkO1xuICAgIH1cblxuICAgIGFwcGVuZChzdHJ1Y3R1cmUsIGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHN0cnVjdHVyZTtcbn1cblxuZnVuY3Rpb24gd3JhcElubmVyKGVsZW1lbnQsIHN0cnVjdHVyZSkge1xuICAgIHJldHVybiB0b05vZGVzKHRvTm9kZXMoZWxlbWVudCkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50Lmhhc0NoaWxkTm9kZXMgPyB3cmFwQWxsKHRvTm9kZXMoZWxlbWVudC5jaGlsZE5vZGVzKSwgc3RydWN0dXJlKSA6IGFwcGVuZChlbGVtZW50LCBzdHJ1Y3R1cmUpOyB9XG4gICAgKSk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcChlbGVtZW50KSB7XG4gICAgdG9Ob2RlcyhlbGVtZW50KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50LnBhcmVudE5vZGU7IH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgc2VsZikgeyByZXR1cm4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7IH0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGJlZm9yZShwYXJlbnQsIHBhcmVudC5jaGlsZE5vZGVzKTtcbiAgICAgICAgICAgIHJlbW92ZShwYXJlbnQpO1xuICAgICAgICB9KTtcbn1cblxudmFyIGZyYWdtZW50UkUgPSAvXlxccyo8KFxcdyt8ISlbXj5dKj4vO1xudmFyIHNpbmdsZVRhZ1JFID0gL148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT4pPyQvO1xuXG5mdW5jdGlvbiBmcmFnbWVudChodG1sKSB7XG5cbiAgICB2YXIgbWF0Y2hlcztcblxuICAgIGlmIChtYXRjaGVzID0gc2luZ2xlVGFnUkUuZXhlYyhodG1sKSkge1xuICAgICAgICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQobWF0Y2hlc1sxXSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpZiAoZnJhZ21lbnRSRS50ZXN0KGh0bWwpKSB7XG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwudHJpbSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSBodG1sO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPiAxID8gdG9Ob2Rlcyhjb250YWluZXIuY2hpbGROb2RlcykgOiBjb250YWluZXIuZmlyc3RDaGlsZDtcblxufVxuXG5mdW5jdGlvbiBpbmRleChlbGVtZW50LCByZWYpIHtcbiAgICByZXR1cm4gcmVmXG4gICAgICAgID8gdG9Ob2RlcyhlbGVtZW50KS5pbmRleE9mKHRvTm9kZShyZWYpKVxuICAgICAgICA6IHRvTm9kZXMoKGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCkpICYmIGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZihlbGVtZW50KTtcbn1cblxudmFyIGNzc051bWJlciA9IHtcbiAgICAnYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCc6IHRydWUsXG4gICAgJ2NvbHVtbi1jb3VudCc6IHRydWUsXG4gICAgJ2ZpbGwtb3BhY2l0eSc6IHRydWUsXG4gICAgJ2ZsZXgtZ3Jvdyc6IHRydWUsXG4gICAgJ2ZsZXgtc2hyaW5rJzogdHJ1ZSxcbiAgICAnZm9udC13ZWlnaHQnOiB0cnVlLFxuICAgICdsaW5lLWhlaWdodCc6IHRydWUsXG4gICAgJ29wYWNpdHknOiB0cnVlLFxuICAgICdvcmRlcic6IHRydWUsXG4gICAgJ29ycGhhbnMnOiB0cnVlLFxuICAgICd3aWRvd3MnOiB0cnVlLFxuICAgICd6LWluZGV4JzogdHJ1ZSxcbiAgICAnem9vbSc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGNzcyhlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpIHtcblxuICAgIHJldHVybiB0b05vZGVzKGVsZW1lbnQpLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgICAgIGlmIChpc1N0cmluZyhwcm9wZXJ0eSkpIHtcblxuICAgICAgICAgICAgcHJvcGVydHkgPSBwcm9wTmFtZShwcm9wZXJ0eSk7XG5cbiAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0U3R5bGUoZWxlbWVudCwgcHJvcGVydHkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV0gPSBpc051bWVyaWModmFsdWUpICYmICFjc3NOdW1iZXJbcHJvcGVydHldID8gKHZhbHVlICsgXCJweFwiKSA6IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShwcm9wZXJ0eSkpIHtcblxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IGdldFN0eWxlcyhlbGVtZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5LnJlZHVjZShmdW5jdGlvbiAocHJvcHMsIHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgcHJvcHNbcHJvcGVydHldID0gcHJvcE5hbWUoc3R5bGVzW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICAgICAgfSwge30pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocHJvcGVydHkpKSB7XG4gICAgICAgICAgICBlYWNoKHByb3BlcnR5LCBmdW5jdGlvbiAodmFsdWUsIHByb3BlcnR5KSB7IHJldHVybiBjc3MoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcblxuICAgIH0pWzBdO1xuXG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlcyhlbGVtZW50LCBwc2V1ZG9FbHQpIHtcbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBwc2V1ZG9FbHQpO1xufVxuXG5mdW5jdGlvbiBnZXRTdHlsZShlbGVtZW50LCBwcm9wZXJ0eSwgcHNldWRvRWx0KSB7XG4gICAgcmV0dXJuIGdldFN0eWxlcyhlbGVtZW50LCBwc2V1ZG9FbHQpW3Byb3BlcnR5XTtcbn1cblxudmFyIHZhcnMkMSA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDc3NWYXIobmFtZSkge1xuXG4gICAgaWYgKCEobmFtZSBpbiB2YXJzJDEpKSB7XG5cbiAgICAgICAgLyogdXNhZ2UgaW4gY3NzOiAgLnZhci1uYW1lOmJlZm9yZSB7IGNvbnRlbnQ6XCJ4eXpcIiB9ICovXG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhcHBlbmQoZG9jRWwsIGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG5cbiAgICAgICAgYWRkQ2xhc3MoZWxlbWVudCwgKFwidmFyLVwiICsgbmFtZSkpO1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHZhcnMkMVtuYW1lXSA9IGdldFN0eWxlKGVsZW1lbnQsICdjb250ZW50JywgJzpiZWZvcmUnKS5yZXBsYWNlKC9eW1wiJ10oLiopW1wiJ10kLywgJyQxJyk7XG4gICAgICAgICAgICB2YXJzJDFbbmFtZV0gPSBKU09OLnBhcnNlKHZhcnMkMVtuYW1lXSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICBkb2NFbC5yZW1vdmVDaGlsZChlbGVtZW50KTtcblxuICAgIH1cblxuICAgIHJldHVybiB2YXJzJDFbbmFtZV07XG5cbn1cblxudmFyIGNzc1Byb3BzID0ge307XG5cbmZ1bmN0aW9uIHByb3BOYW1lKG5hbWUpIHtcblxuICAgIHZhciByZXQgPSBjc3NQcm9wc1tuYW1lXTtcbiAgICBpZiAoIXJldCkge1xuICAgICAgICByZXQgPSBjc3NQcm9wc1tuYW1lXSA9IHZlbmRvclByb3BOYW1lKG5hbWUpIHx8IG5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG5cbnZhciBjc3NQcmVmaXhlcyA9IFsnd2Via2l0JywgJ21veicsICdtcyddO1xudmFyIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlO1xuXG5mdW5jdGlvbiB2ZW5kb3JQcm9wTmFtZShuYW1lKSB7XG5cbiAgICBuYW1lID0gaHlwaGVuYXRlKG5hbWUpO1xuXG4gICAgaWYgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgfVxuXG4gICAgdmFyIGkgPSBjc3NQcmVmaXhlcy5sZW5ndGgsIHByZWZpeGVkTmFtZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcHJlZml4ZWROYW1lID0gXCItXCIgKyAoY3NzUHJlZml4ZXNbaV0pICsgbmFtZTtcbiAgICAgICAgaWYgKHByZWZpeGVkTmFtZSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVkTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHN1cHBvcnRzQ2xhc3NMaXN0O1xudmFyIHN1cHBvcnRzTXVsdGlwbGU7XG52YXIgc3VwcG9ydHNGb3JjZTtcblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIGFwcGx5KGVsZW1lbnQsIGFyZ3MsICdhZGQnKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIGFwcGx5KGVsZW1lbnQsIGFyZ3MsICdyZW1vdmUnKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NlcyhlbGVtZW50LCBjbHMpIHtcbiAgICBmaWx0ZXJBdHRyKGVsZW1lbnQsICdjbGFzcycsIG5ldyBSZWdFeHAoKFwiKF58XFxcXHMpXCIgKyBjbHMgKyBcIig/IVxcXFxTKVwiKSwgJ2cnKSwgJycpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2xhc3MoZWxlbWVudCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICggbGVuLS0gPiAwICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIGFyZ3NbMF0gJiYgcmVtb3ZlQ2xhc3MoZWxlbWVudCwgYXJnc1swXSk7XG4gICAgYXJnc1sxXSAmJiBhZGRDbGFzcyhlbGVtZW50LCBhcmdzWzFdKTtcbn1cblxuZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xzKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ2xhc3NMaXN0ICYmIHRvTm9kZXMoZWxlbWVudCkuc29tZShmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTsgfSk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoIGxlbi0tID4gMCApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cblxuICAgIGlmICghc3VwcG9ydHNDbGFzc0xpc3QgfHwgIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhcmdzID0gZ2V0QXJncyhhcmdzKTtcblxuICAgIHZhciBmb3JjZSA9ICFpc1N0cmluZyhhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pID8gYXJncy5wb3AoKSAgOiB1bmRlZmluZWQ7XG5cbiAgICB0b05vZGVzKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gcmVmLmNsYXNzTGlzdDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1cHBvcnRzRm9yY2VcbiAgICAgICAgICAgICAgICA/IGNsYXNzTGlzdC50b2dnbGUoYXJnc1tpXSwgZm9yY2UpXG4gICAgICAgICAgICAgICAgOiAoY2xhc3NMaXN0WyghaXNVbmRlZmluZWQoZm9yY2UpID8gZm9yY2UgOiAhY2xhc3NMaXN0LmNvbnRhaW5zKGFyZ3NbaV0pKSA/ICdhZGQnIDogJ3JlbW92ZSddKGFyZ3NbaV0pKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGFwcGx5KGVsZW1lbnQsIGFyZ3MsIGZuKSB7XG4gICAgYXJncyA9IGdldEFyZ3MoYXJncykuZmlsdGVyKGZ1bmN0aW9uIChhcmcpIHsgcmV0dXJuIGFyZzsgfSk7XG5cbiAgICBzdXBwb3J0c0NsYXNzTGlzdCAmJiBhcmdzLmxlbmd0aCAmJiB0b05vZGVzKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gcmVmLmNsYXNzTGlzdDtcblxuICAgICAgICBzdXBwb3J0c011bHRpcGxlXG4gICAgICAgICAgICA/IGNsYXNzTGlzdFtmbl0uYXBwbHkoY2xhc3NMaXN0LCBhcmdzKVxuICAgICAgICAgICAgOiBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGNscykgeyByZXR1cm4gY2xhc3NMaXN0W2ZuXShjbHMpOyB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QXJncyhhcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKGZ1bmN0aW9uIChhcmdzLCBhcmcpIHtcbiAgICAgICAgYXJncy5wdXNoLmFwcGx5KGFyZ3MsIGlzU3RyaW5nKGFyZykgJiYgaW5jbHVkZXMoYXJnLCAnICcpID8gYXJnLnRyaW0oKS5zcGxpdCgnICcpIDogW2FyZ10pO1xuICAgICAgICByZXR1cm4gYXJncztcbiAgICB9LCBbXSk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbGlzdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdfJykuY2xhc3NMaXN0O1xuICAgIGlmIChsaXN0KSB7XG4gICAgICAgIGxpc3QuYWRkKCdhJywgJ2InKTtcbiAgICAgICAgbGlzdC50b2dnbGUoJ2MnLCBmYWxzZSk7XG4gICAgICAgIHN1cHBvcnRzTXVsdGlwbGUgPSBsaXN0LmNvbnRhaW5zKCdiJyk7XG4gICAgICAgIHN1cHBvcnRzRm9yY2UgPSAhbGlzdC5jb250YWlucygnYycpO1xuICAgICAgICBzdXBwb3J0c0NsYXNzTGlzdCA9IHRydWU7XG4gICAgfVxuICAgIGxpc3QgPSBudWxsO1xuXG59KSgpO1xuXG52YXIgT2JzZXJ2ZXIgPSB3aW4uTXV0YXRpb25PYnNlcnZlciB8fCB3aW4uV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IChmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIHNldFRpbWVvdXQoZm4sIDEwMDAgLyA2MCk7IH0pO1xuXG52YXIgaGFzVG91Y2hFdmVudHMgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW47XG52YXIgaGFzUG9pbnRlckV2ZW50cyA9IHdpbi5Qb2ludGVyRXZlbnQ7XG52YXIgaGFzVG91Y2ggPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5cbiAgICB8fCB3aW4uRG9jdW1lbnRUb3VjaCAmJiBkb2MgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoXG4gICAgfHwgbmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgJiYgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgLy8gSUUgMTBcbiAgICB8fCBuYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzOyAvLyBJRSA+PTExXG5cbnZhciBwb2ludGVyRG93biA9ICFoYXNUb3VjaCA/ICdtb3VzZWRvd24nIDogKFwibW91c2Vkb3duIFwiICsgKGhhc1RvdWNoRXZlbnRzID8gJ3RvdWNoc3RhcnQnIDogJ3BvaW50ZXJkb3duJykpO1xudmFyIHBvaW50ZXJNb3ZlID0gIWhhc1RvdWNoID8gJ21vdXNlbW92ZScgOiAoXCJtb3VzZW1vdmUgXCIgKyAoaGFzVG91Y2hFdmVudHMgPyAndG91Y2htb3ZlJyA6ICdwb2ludGVybW92ZScpKTtcbnZhciBwb2ludGVyVXAgPSAhaGFzVG91Y2ggPyAnbW91c2V1cCcgOiAoXCJtb3VzZXVwIFwiICsgKGhhc1RvdWNoRXZlbnRzID8gJ3RvdWNoZW5kJyA6ICdwb2ludGVydXAnKSk7XG52YXIgcG9pbnRlckVudGVyID0gaGFzVG91Y2ggJiYgaGFzUG9pbnRlckV2ZW50cyA/ICdwb2ludGVyZW50ZXInIDogJ21vdXNlZW50ZXInO1xudmFyIHBvaW50ZXJMZWF2ZSA9IGhhc1RvdWNoICYmIGhhc1BvaW50ZXJFdmVudHMgPyAncG9pbnRlcmxlYXZlJyA6ICdtb3VzZWxlYXZlJztcblxudmFyIHRyYW5zaXRpb25lbmQgPSBwcmVmaXgoJ3RyYW5zaXRpb24nLCAndHJhbnNpdGlvbi1lbmQnKTtcbnZhciBhbmltYXRpb25zdGFydCA9IHByZWZpeCgnYW5pbWF0aW9uJywgJ2FuaW1hdGlvbi1zdGFydCcpO1xudmFyIGFuaW1hdGlvbmVuZCA9IHByZWZpeCgnYW5pbWF0aW9uJywgJ2FuaW1hdGlvbi1lbmQnKTtcblxuZnVuY3Rpb24gZ2V0SW1hZ2Uoc3JjKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgaW1nLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKGltZyk7IH07XG5cbiAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBwcmVmaXgobmFtZSwgZXZlbnQpIHtcblxuICAgIHZhciB1Y2FzZSA9IGNsYXNzaWZ5KG5hbWUpLFxuICAgICAgICBsb3dlcmVkID0gY2xhc3NpZnkoZXZlbnQpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGNsYXNzaWZpZWQgPSBjbGFzc2lmeShldmVudCksXG4gICAgICAgIGVsZW1lbnQgPSBkb2MuYm9keSB8fCBkb2NFbCxcbiAgICAgICAgbmFtZXMgPSAoIG9iaiA9IHt9LCBvYmpbbmFtZV0gPSBsb3dlcmVkLCBvYmpbKFwiV2Via2l0XCIgKyB1Y2FzZSldID0gKFwid2Via2l0XCIgKyBjbGFzc2lmaWVkKSwgb2JqWyhcIk1velwiICsgdWNhc2UpXSA9IGxvd2VyZWQsIG9ialsoXCJvXCIgKyB1Y2FzZSldID0gKFwib1wiICsgY2xhc3NpZmllZCArIFwiIG9cIiArIGxvd2VyZWQpLCBvYmogKTtcbiAgICB2YXIgb2JqO1xuXG4gICAgZm9yIChuYW1lIGluIG5hbWVzKSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG5cbiAgICB2YXIgcmVmID0gZ2V0QXJncyQxKGFyZ3MpO1xuICAgIHZhciB0YXJnZXQgPSByZWZbMF07XG4gICAgdmFyIHR5cGUgPSByZWZbMV07XG4gICAgdmFyIHNlbGVjdG9yID0gcmVmWzJdO1xuICAgIHZhciBsaXN0ZW5lciA9IHJlZlszXTtcbiAgICB2YXIgdXNlQ2FwdHVyZSA9IHJlZls0XTtcblxuICAgIHRhcmdldCA9IHRvRXZlbnRUYXJnZXQodGFyZ2V0KTtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBsaXN0ZW5lciA9IGRlbGVnYXRlKHRhcmdldCwgc2VsZWN0b3IsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAobGlzdGVuZXIubGVuZ3RoID4gMSkge1xuICAgICAgICBsaXN0ZW5lciA9IGRldGFpbChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgdHlwZS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTsgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9mZih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKTsgfTtcbn1cblxuZnVuY3Rpb24gb2ZmKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICBpZiAoIHVzZUNhcHR1cmUgPT09IHZvaWQgMCApIHVzZUNhcHR1cmUgPSBmYWxzZTtcblxuICAgIHR5cGUuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiB0b0V2ZW50VGFyZ2V0KHRhcmdldCkucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7IH0pO1xufVxuXG5mdW5jdGlvbiBvbmNlKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuXG4gICAgdmFyIHJlZiA9IGdldEFyZ3MkMShhcmdzKTtcbiAgICB2YXIgZWxlbWVudCA9IHJlZlswXTtcbiAgICB2YXIgdHlwZSA9IHJlZlsxXTtcbiAgICB2YXIgc2VsZWN0b3IgPSByZWZbMl07XG4gICAgdmFyIGxpc3RlbmVyID0gcmVmWzNdO1xuICAgIHZhciB1c2VDYXB0dXJlID0gcmVmWzRdO1xuICAgIHZhciBjb25kaXRpb24gPSByZWZbNV07XG4gICAgdmFyIG9mZiA9IG9uKGVsZW1lbnQsIHR5cGUsIHNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICFjb25kaXRpb24gfHwgY29uZGl0aW9uKGUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIG9mZigpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyKGUsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHVzZUNhcHR1cmUpO1xuXG4gICAgcmV0dXJuIG9mZjtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlcih0YXJnZXQsIGV2ZW50LCBkZXRhaWwpIHtcbiAgICByZXR1cm4gdG9FdmVudFRhcmdldHModGFyZ2V0KS5yZWR1Y2UoZnVuY3Rpb24gKG5vdENhbmNlbGVkLCB0YXJnZXQpIHsgcmV0dXJuIG5vdENhbmNlbGVkICYmIHRhcmdldC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlLCBkZXRhaWwpKTsgfVxuICAgICwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRldGFpbCkge1xuICAgIGlmICggYnViYmxlcyA9PT0gdm9pZCAwICkgYnViYmxlcyA9IHRydWU7XG4gICAgaWYgKCBjYW5jZWxhYmxlID09PSB2b2lkIDAgKSBjYW5jZWxhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoaXNTdHJpbmcoZSkpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGV0YWlsKTtcbiAgICAgICAgZSA9IGV2ZW50O1xuICAgIH1cblxuICAgIHJldHVybiBlO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdzJDEoYXJncykge1xuXG4gICAgaWYgKGlzU3RyaW5nKGFyZ3NbMF0pKSB7XG4gICAgICAgIGFyZ3NbMF0gPSAkJDEoYXJnc1swXSk7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oYXJnc1syXSkpIHtcbiAgICAgICAgYXJncy5zcGxpY2UoMiwgMCwgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbn1cblxuZnVuY3Rpb24gZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIGxpc3RlbmVyKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQsXG4gICAgICAgICAgICBjdXJyZW50ID0gc2VsZWN0b3JbMF0gPT09ICc+J1xuICAgICAgICAgICAgICAgID8gJCQoc2VsZWN0b3IsIGVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gd2l0aGluKHRhcmdldCwgZWxlbWVudCk7IH0pWzBdXG4gICAgICAgICAgICAgICAgOiBjbG9zZXN0KHRhcmdldCwgc2VsZWN0b3IpO1xuXG4gICAgICAgIGlmIChjdXJyZW50KSB7XG4gICAgICAgICAgICBlLmRlbGVnYXRlID0gZWxlbWVudDtcbiAgICAgICAgICAgIGUuY3VycmVudCA9IGN1cnJlbnQ7XG5cbiAgICAgICAgICAgIGxpc3RlbmVyLmNhbGwodGhpcyQxLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGV0YWlsKGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7IHJldHVybiBpc0FycmF5KGUuZGV0YWlsKSA/IGxpc3RlbmVyLmFwcGx5KGxpc3RlbmVyLCBbZV0uY29uY2F0KGUuZGV0YWlsKSkgOiBsaXN0ZW5lcihlKTsgfTtcbn1cblxuZnVuY3Rpb24gaXNFdmVudFRhcmdldCh0YXJnZXQpIHtcbiAgICByZXR1cm4gJ0V2ZW50VGFyZ2V0JyBpbiB3aW5cbiAgICAgICAgPyB0YXJnZXQgaW5zdGFuY2VvZiBFdmVudFRhcmdldFxuICAgICAgICA6ICdhZGRFdmVudExpc3RlbmVyJyBpbiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHRvRXZlbnRUYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzRXZlbnRUYXJnZXQodGFyZ2V0KSA/IHRhcmdldCA6IHRvTm9kZSh0YXJnZXQpO1xufVxuXG5mdW5jdGlvbiB0b0V2ZW50VGFyZ2V0cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gaXNFdmVudFRhcmdldCh0YXJnZXQpXG4gICAgICAgID8gW3RhcmdldF1cbiAgICAgICAgOiBpc0FycmF5KHRhcmdldClcbiAgICAgICAgICAgID8gdGFyZ2V0Lm1hcCh0b0V2ZW50VGFyZ2V0KS5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgIDogdG9Ob2Rlcyh0YXJnZXQpO1xufVxuXG4vKlxuICAgIEJhc2VkIG9uOlxuICAgIENvcHlyaWdodCAoYykgMjAxNiBXaWxzb24gUGFnZSB3aWxzb25wYWdlQG1lLmNvbVxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS93aWxzb25wYWdlL2Zhc3Rkb21cbiovXG5cbnZhciBmYXN0ZG9tID0ge1xuXG4gICAgcmVhZHM6IFtdLFxuICAgIHdyaXRlczogW10sXG5cbiAgICBtZWFzdXJlOiBmdW5jdGlvbiBtZWFzdXJlKHRhc2spIHtcbiAgICAgICAgdGhpcy5yZWFkcy5wdXNoKHRhc2spO1xuICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgICAgIHJldHVybiB0YXNrO1xuICAgIH0sXG5cbiAgICBtdXRhdGU6IGZ1bmN0aW9uIG11dGF0ZSh0YXNrKSB7XG4gICAgICAgIHRoaXMud3JpdGVzLnB1c2godGFzayk7XG4gICAgICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfSxcblxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcih0YXNrKSB7XG4gICAgICAgIHJldHVybiByZW1vdmUkMSh0aGlzLnJlYWRzLCB0YXNrKSB8fCByZW1vdmUkMSh0aGlzLndyaXRlcywgdGFzayk7XG4gICAgfSxcblxuICAgIGZsdXNoOiBmdW5jdGlvbiBmbHVzaCgpIHtcblxuICAgICAgICBydW5UYXNrcyh0aGlzLnJlYWRzKTtcbiAgICAgICAgcnVuVGFza3ModGhpcy53cml0ZXMuc3BsaWNlKDAsIHRoaXMud3JpdGVzLmxlbmd0aCkpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMucmVhZHMubGVuZ3RoIHx8IHRoaXMud3JpdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHNjaGVkdWxlRmx1c2goKSB7XG4gICAgaWYgKCFmYXN0ZG9tLnNjaGVkdWxlZCkge1xuICAgICAgICBmYXN0ZG9tLnNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmYXN0ZG9tLmZsdXNoLmJpbmQoZmFzdGRvbSkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcnVuVGFza3ModGFza3MpIHtcbiAgICB2YXIgdGFzaztcbiAgICB3aGlsZSAodGFzayA9IHRhc2tzLnNoaWZ0KCkpIHtcbiAgICAgICAgdGFzaygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlJDEoYXJyYXksIGl0ZW0pIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgIHJldHVybiAhIX5pbmRleCAmJiAhIWFycmF5LnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIE1vdXNlVHJhY2tlcigpIHt9XG5cbk1vdXNlVHJhY2tlci5wcm90b3R5cGUgPSB7XG5cbiAgICBwb3NpdGlvbnM6IFtdLFxuICAgIHBvc2l0aW9uOiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB0aGlzLnBvc2l0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gbnVsbDtcblxuICAgICAgICB2YXIgdGlja2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuYmluZCA9IG9uKGRvYywgJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIGlmICh0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKSwgbGVuZ3RoID0gdGhpcyQxLnBvc2l0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCAmJiAodGltZSAtIHRoaXMkMS5wb3NpdGlvbnNbbGVuZ3RoIC0gMV0udGltZSA+IDEwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvc2l0aW9ucy5zcGxpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzJDEucG9zaXRpb25zLnB1c2goe3RpbWU6IHRpbWUsIHg6IGUucGFnZVgsIHk6IGUucGFnZVl9KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzJDEucG9zaXRpb25zLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvc2l0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDUpO1xuXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnVuYmluZCkge1xuICAgICAgICAgICAgdGhpcy51bmJpbmQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3Zlc1RvOiBmdW5jdGlvbiBtb3Zlc1RvKHRhcmdldCkge1xuXG4gICAgICAgIGlmICh0aGlzLnBvc2l0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcCA9IG9mZnNldCh0YXJnZXQpLFxuICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uc1t0aGlzLnBvc2l0aW9ucy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIHByZXZQb3MgPSB0aGlzLnBvc2l0aW9uc1swXTtcblxuICAgICAgICBpZiAocC5sZWZ0IDw9IHBvc2l0aW9uLnggJiYgcG9zaXRpb24ueCA8PSBwLnJpZ2h0ICYmIHAudG9wIDw9IHBvc2l0aW9uLnkgJiYgcG9zaXRpb24ueSA8PSBwLmJvdHRvbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvaW50cyA9IFtcbiAgICAgICAgICAgIFt7eDogcC5sZWZ0LCB5OiBwLnRvcH0sIHt4OiBwLnJpZ2h0LCB5OiBwLmJvdHRvbX1dLFxuICAgICAgICAgICAgW3t4OiBwLnJpZ2h0LCB5OiBwLnRvcH0sIHt4OiBwLmxlZnQsIHk6IHAuYm90dG9tfV1cbiAgICAgICAgXTtcblxuICAgICAgICBpZiAocC5yaWdodCA8PSBwb3NpdGlvbi54KSB7XG5cbiAgICAgICAgfSBlbHNlIGlmIChwLmxlZnQgPj0gcG9zaXRpb24ueCkge1xuICAgICAgICAgICAgcG9pbnRzWzBdLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHBvaW50c1sxXS5yZXZlcnNlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAocC5ib3R0b20gPD0gcG9zaXRpb24ueSkge1xuICAgICAgICAgICAgcG9pbnRzWzBdLnJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwLnRvcCA+PSBwb3NpdGlvbi55KSB7XG4gICAgICAgICAgICBwb2ludHNbMV0ucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhcG9pbnRzLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCArIChzbG9wZShwcmV2UG9zLCBwb2ludFswXSkgPCBzbG9wZShwb3NpdGlvbiwgcG9pbnRbMF0pICYmIHNsb3BlKHByZXZQb3MsIHBvaW50WzFdKSA+IHNsb3BlKHBvc2l0aW9uLCBwb2ludFsxXSkpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIHNsb3BlKGEsIGIpIHtcbiAgICByZXR1cm4gKGIueSAtIGEueSkgLyAoYi54IC0gYS54KTtcbn1cblxudmFyIHN0cmF0cyA9IHt9O1xuXG4vLyBjb25jYXQgc3RyYXRlZ3lcbnN0cmF0cy5hcmdzID1cbnN0cmF0cy5jcmVhdGVkID1cbnN0cmF0cy5ldmVudHMgPVxuc3RyYXRzLmluaXQgPVxuc3RyYXRzLnJlYWR5ID1cbnN0cmF0cy5jb25uZWN0ZWQgPVxuc3RyYXRzLmRpc2Nvbm5lY3RlZCA9XG5zdHJhdHMuZGVzdHJveSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cbiAgICBwYXJlbnRWYWwgPSBwYXJlbnRWYWwgJiYgIWlzQXJyYXkocGFyZW50VmFsKSA/IFtwYXJlbnRWYWxdIDogcGFyZW50VmFsO1xuXG4gICAgcmV0dXJuIGNoaWxkVmFsXG4gICAgICAgID8gcGFyZW50VmFsXG4gICAgICAgICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXG4gICAgICAgICAgICA6IGlzQXJyYXkoY2hpbGRWYWwpXG4gICAgICAgICAgICAgICAgPyBjaGlsZFZhbFxuICAgICAgICAgICAgICAgIDogW2NoaWxkVmFsXVxuICAgICAgICA6IHBhcmVudFZhbDtcbn07XG5cbi8vIHVwZGF0ZSBzdHJhdGVneVxuc3RyYXRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIHN0cmF0cy5hcmdzKHBhcmVudFZhbCwgaXNGdW5jdGlvbihjaGlsZFZhbCkgPyB7cmVhZDogY2hpbGRWYWx9IDogY2hpbGRWYWwpO1xufTtcblxuLy8gcHJvcGVydHkgc3RyYXRlZ3lcbnN0cmF0cy5wcm9wcyA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG5cbiAgICBpZiAoaXNBcnJheShjaGlsZFZhbCkpIHtcbiAgICAgICAgY2hpbGRWYWwgPSBjaGlsZFZhbC5yZWR1Y2UoZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBTdHJpbmc7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyYXRzLm1ldGhvZHMocGFyZW50VmFsLCBjaGlsZFZhbCk7XG59O1xuXG4vLyBleHRlbmQgc3RyYXRlZ3lcbnN0cmF0cy5jb21wdXRlZCA9XG5zdHJhdHMuZGVmYXVsdHMgPVxuc3RyYXRzLm1ldGhvZHMgPSBmdW5jdGlvbiAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICAgIHJldHVybiBjaGlsZFZhbFxuICAgICAgICA/IHBhcmVudFZhbFxuICAgICAgICAgICAgPyBhc3NpZ24oe30sIHBhcmVudFZhbCwgY2hpbGRWYWwpXG4gICAgICAgICAgICA6IGNoaWxkVmFsXG4gICAgICAgIDogcGFyZW50VmFsO1xufTtcblxuLy8gZGVmYXVsdCBzdHJhdGVneVxudmFyIGRlZmF1bHRTdHJhdCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNoaWxkVmFsKSA/IHBhcmVudFZhbCA6IGNoaWxkVmFsO1xufTtcblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHBhcmVudCwgY2hpbGQpIHtcblxuICAgIHZhciBvcHRpb25zID0ge30sIGtleTtcblxuICAgIGlmIChjaGlsZC5taXhpbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZC5taXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBtZXJnZU9wdGlvbnMocGFyZW50LCBjaGlsZC5taXhpbnNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG4gICAgICAgIG1lcmdlS2V5KGtleSk7XG4gICAgfVxuXG4gICAgZm9yIChrZXkgaW4gY2hpbGQpIHtcbiAgICAgICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICAgICAgICBtZXJnZUtleShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VLZXkoa2V5KSB7XG4gICAgICAgIG9wdGlvbnNba2V5XSA9IChzdHJhdHNba2V5XSB8fCBkZWZhdWx0U3RyYXQpKHBhcmVudFtrZXldLCBjaGlsZFtrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cblxudmFyIGlkID0gMDtcblxudmFyIFBsYXllciA9IGZ1bmN0aW9uIFBsYXllcihlbCkge1xuICAgIHRoaXMuaWQgPSArK2lkO1xuICAgIHRoaXMuZWwgPSB0b05vZGUoZWwpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc1ZpZGVvID0gZnVuY3Rpb24gaXNWaWRlbyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNZb3V0dWJlKCkgfHwgdGhpcy5pc1ZpbWVvKCkgfHwgdGhpcy5pc0hUTUw1KCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmlzSFRNTDUgPSBmdW5jdGlvbiBpc0hUTUw1ICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC50YWdOYW1lID09PSAnVklERU8nO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5pc0lGcmFtZSA9IGZ1bmN0aW9uIGlzSUZyYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbC50YWdOYW1lID09PSAnSUZSQU1FJztcbn07XG5cblBsYXllci5wcm90b3R5cGUuaXNZb3V0dWJlID0gZnVuY3Rpb24gaXNZb3V0dWJlICgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0lGcmFtZSgpICYmICEhdGhpcy5lbC5zcmMubWF0Y2goL1xcL1xcLy4qP3lvdXR1YmVcXC5bYS16XStcXC8od2F0Y2hcXD92PVteJlxcc10rfGVtYmVkKXx5b3V0dVxcLmJlXFwvLiovKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuaXNWaW1lbyA9IGZ1bmN0aW9uIGlzVmltZW8gKCkge1xuICAgIHJldHVybiB0aGlzLmlzSUZyYW1lKCkgJiYgISF0aGlzLmVsLnNyYy5tYXRjaCgvdmltZW9cXC5jb21cXC92aWRlb1xcLy4qLyk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmVuYWJsZUFwaSA9IGZ1bmN0aW9uIGVuYWJsZUFwaSAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICBpZiAodGhpcy5yZWFkeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkeTtcbiAgICB9XG5cbiAgICB2YXIgeW91dHViZSA9IHRoaXMuaXNZb3V0dWJlKCksIHZpbWVvID0gdGhpcy5pc1ZpbWVvKCksIHBvbGxlcjtcblxuICAgIGlmICh5b3V0dWJlIHx8IHZpbWVvKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHkgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICBvbmNlKHRoaXMkMS5lbCwgJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHlvdXR1YmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9zdCh0aGlzJDEuZWwsIHtldmVudDogJ2xpc3RlbmluZycsIGlkOiB0aGlzJDEuaWR9KTsgfTtcbiAgICAgICAgICAgICAgICAgICAgcG9sbGVyID0gc2V0SW50ZXJ2YWwobGlzdGVuZXIsIDEwMCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxpc3RlbihmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4geW91dHViZSAmJiBkYXRhLmlkID09PSB0aGlzJDEuaWQgJiYgZGF0YS5ldmVudCA9PT0gJ29uUmVhZHknIHx8IHZpbWVvICYmIE51bWJlcihkYXRhLnBsYXllcl9pZCkgPT09IHRoaXMkMS5pZDsgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcG9sbGVyICYmIGNsZWFySW50ZXJ2YWwocG9sbGVyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXR0cih0aGlzJDEuZWwsICdzcmMnLCAoXCJcIiArICh0aGlzJDEuZWwuc3JjKSArIChpbmNsdWRlcyh0aGlzJDEuZWwuc3JjLCAnPycpID8gJyYnIDogJz8nKSArICh5b3V0dWJlID8gJ2VuYWJsZWpzYXBpPTEnIDogKFwiYXBpPTEmcGxheWVyX2lkPVwiICsgaWQpKSkpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiBwbGF5ICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgIGlmICghdGhpcy5pc1ZpZGVvKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSUZyYW1lKCkpIHtcbiAgICAgICAgdGhpcy5lbmFibGVBcGkoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvc3QodGhpcyQxLmVsLCB7ZnVuYzogJ3BsYXlWaWRlbycsIG1ldGhvZDogJ3BsYXknfSk7IH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0hUTUw1KCkpIHtcbiAgICAgICAgdGhpcy5lbC5wbGF5KCk7XG4gICAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgIGlmICghdGhpcy5pc1ZpZGVvKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSUZyYW1lKCkpIHtcbiAgICAgICAgdGhpcy5lbmFibGVBcGkoKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvc3QodGhpcyQxLmVsLCB7ZnVuYzogJ3BhdXNlVmlkZW8nLCBtZXRob2Q6ICdwYXVzZSd9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0aGlzLmVsLnBhdXNlKCk7XG4gICAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS5tdXRlID0gZnVuY3Rpb24gbXV0ZSAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICBpZiAoIXRoaXMuaXNWaWRlbygpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0lGcmFtZSgpKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlQXBpKCkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBwb3N0KHRoaXMkMS5lbCwge2Z1bmM6ICdtdXRlJywgbWV0aG9kOiAnc2V0Vm9sdW1lJywgdmFsdWU6IDB9KTsgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSFRNTDUoKSkge1xuICAgICAgICB0aGlzLmVsLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgYXR0cih0aGlzLmVsLCAnbXV0ZWQnLCAnJyk7XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBwb3N0KGVsLCBjbWQpIHtcbiAgICB0cnkge1xuICAgICAgICBlbC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KGFzc2lnbih7ZXZlbnQ6ICdjb21tYW5kJ30sIGNtZCkpLCAnKicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG59XG5cbmZ1bmN0aW9uIGxpc3RlbihjYikge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgb25jZSh3aW4sICdtZXNzYWdlJywgZnVuY3Rpb24gKF8sIGRhdGEpIHsgcmV0dXJuIHJlc29sdmUoZGF0YSk7IH0sIGZhbHNlLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuXG5cbiAgICAgICAgICAgIGlmICghZGF0YSB8fCAhaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGF0YSAmJiBjYihkYXRhKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59XG5cbnZhciBkaXJzID0ge1xuICAgICAgICB3aWR0aDogWyd4JywgJ2xlZnQnLCAncmlnaHQnXSxcbiAgICAgICAgaGVpZ2h0OiBbJ3knLCAndG9wJywgJ2JvdHRvbSddXG4gICAgfTtcblxuZnVuY3Rpb24gcG9zaXRpb25BdChlbGVtZW50LCB0YXJnZXQsIGVsQXR0YWNoLCB0YXJnZXRBdHRhY2gsIGVsT2Zmc2V0LCB0YXJnZXRPZmZzZXQsIGZsaXAsIGJvdW5kYXJ5KSB7XG5cbiAgICBlbEF0dGFjaCA9IGdldFBvcyhlbEF0dGFjaCk7XG4gICAgdGFyZ2V0QXR0YWNoID0gZ2V0UG9zKHRhcmdldEF0dGFjaCk7XG5cbiAgICB2YXIgZmxpcHBlZCA9IHtlbGVtZW50OiBlbEF0dGFjaCwgdGFyZ2V0OiB0YXJnZXRBdHRhY2h9O1xuXG4gICAgaWYgKCFlbGVtZW50IHx8ICF0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIGZsaXBwZWQ7XG4gICAgfVxuXG4gICAgdmFyIGRpbSA9IGdldERpbWVuc2lvbnMoZWxlbWVudCksXG4gICAgICAgIHRhcmdldERpbSA9IGdldERpbWVuc2lvbnModGFyZ2V0KSxcbiAgICAgICAgcG9zaXRpb24gPSB0YXJnZXREaW07XG5cbiAgICBtb3ZlVG8ocG9zaXRpb24sIGVsQXR0YWNoLCBkaW0sIC0xKTtcbiAgICBtb3ZlVG8ocG9zaXRpb24sIHRhcmdldEF0dGFjaCwgdGFyZ2V0RGltLCAxKTtcblxuICAgIGVsT2Zmc2V0ID0gZ2V0T2Zmc2V0cyhlbE9mZnNldCwgZGltLndpZHRoLCBkaW0uaGVpZ2h0KTtcbiAgICB0YXJnZXRPZmZzZXQgPSBnZXRPZmZzZXRzKHRhcmdldE9mZnNldCwgdGFyZ2V0RGltLndpZHRoLCB0YXJnZXREaW0uaGVpZ2h0KTtcblxuICAgIGVsT2Zmc2V0Wyd4J10gKz0gdGFyZ2V0T2Zmc2V0Wyd4J107XG4gICAgZWxPZmZzZXRbJ3knXSArPSB0YXJnZXRPZmZzZXRbJ3knXTtcblxuICAgIHBvc2l0aW9uLmxlZnQgKz0gZWxPZmZzZXRbJ3gnXTtcbiAgICBwb3NpdGlvbi50b3AgKz0gZWxPZmZzZXRbJ3knXTtcblxuICAgIGJvdW5kYXJ5ID0gZ2V0RGltZW5zaW9ucyhib3VuZGFyeSB8fCBnZXRXaW5kb3coZWxlbWVudCkpO1xuXG4gICAgaWYgKGZsaXApIHtcbiAgICAgICAgZWFjaChkaXJzLCBmdW5jdGlvbiAocmVmLCBwcm9wKSB7XG4gICAgICAgICAgICB2YXIgZGlyID0gcmVmWzBdO1xuICAgICAgICAgICAgdmFyIGFsaWduID0gcmVmWzFdO1xuICAgICAgICAgICAgdmFyIGFsaWduRmxpcCA9IHJlZlsyXTtcblxuXG4gICAgICAgICAgICBpZiAoIShmbGlwID09PSB0cnVlIHx8IGluY2x1ZGVzKGZsaXAsIGRpcikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZWxlbU9mZnNldCA9IGVsQXR0YWNoW2Rpcl0gPT09IGFsaWduXG4gICAgICAgICAgICAgICAgICAgID8gLWRpbVtwcm9wXVxuICAgICAgICAgICAgICAgICAgICA6IGVsQXR0YWNoW2Rpcl0gPT09IGFsaWduRmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkaW1bcHJvcF1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICAgICAgICB0YXJnZXRPZmZzZXQgPSB0YXJnZXRBdHRhY2hbZGlyXSA9PT0gYWxpZ25cbiAgICAgICAgICAgICAgICAgICAgPyB0YXJnZXREaW1bcHJvcF1cbiAgICAgICAgICAgICAgICAgICAgOiB0YXJnZXRBdHRhY2hbZGlyXSA9PT0gYWxpZ25GbGlwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IC10YXJnZXREaW1bcHJvcF1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogMDtcblxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uW2FsaWduXSA8IGJvdW5kYXJ5W2FsaWduXSB8fCBwb3NpdGlvblthbGlnbl0gKyBkaW1bcHJvcF0gPiBib3VuZGFyeVthbGlnbkZsaXBdKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2VudGVyT2Zmc2V0ID0gZGltW3Byb3BdIC8gMixcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyVGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0QXR0YWNoW2Rpcl0gPT09ICdjZW50ZXInID8gLXRhcmdldERpbVtwcm9wXSAvIDIgOiAwO1xuXG4gICAgICAgICAgICAgICAgZWxBdHRhY2hbZGlyXSA9PT0gJ2NlbnRlcicgJiYgKFxuICAgICAgICAgICAgICAgICAgICBhcHBseShjZW50ZXJPZmZzZXQsIGNlbnRlclRhcmdldE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgfHwgYXBwbHkoLWNlbnRlck9mZnNldCwgLWNlbnRlclRhcmdldE9mZnNldClcbiAgICAgICAgICAgICAgICApIHx8IGFwcGx5KGVsZW1PZmZzZXQsIHRhcmdldE9mZnNldCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYXBwbHkoZWxlbU9mZnNldCwgdGFyZ2V0T2Zmc2V0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gcG9zaXRpb25bYWxpZ25dICsgZWxlbU9mZnNldCArIHRhcmdldE9mZnNldCAtIGVsT2Zmc2V0W2Rpcl0gKiAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+PSBib3VuZGFyeVthbGlnbl0gJiYgbmV3VmFsICsgZGltW3Byb3BdIDw9IGJvdW5kYXJ5W2FsaWduRmxpcF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25bYWxpZ25dID0gbmV3VmFsO1xuXG4gICAgICAgICAgICAgICAgICAgIFsnZWxlbWVudCcsICd0YXJnZXQnXS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxpcHBlZFtlbF1bZGlyXSA9ICFlbGVtT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBmbGlwcGVkW2VsXVtkaXJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmbGlwcGVkW2VsXVtkaXJdID09PSBkaXJzW3Byb3BdWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZGlyc1twcm9wXVsyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRpcnNbcHJvcF1bMV07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9mZnNldChlbGVtZW50LCBwb3NpdGlvbik7XG5cbiAgICByZXR1cm4gZmxpcHBlZDtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0KGVsZW1lbnQsIGNvb3JkaW5hdGVzKSB7XG5cbiAgICBlbGVtZW50ID0gdG9Ob2RlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGNvb3JkaW5hdGVzKSB7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSBvZmZzZXQoZWxlbWVudCksXG4gICAgICAgICAgICBwb3MgPSBjc3MoZWxlbWVudCwgJ3Bvc2l0aW9uJyk7XG5cbiAgICAgICAgWydsZWZ0JywgJ3RvcCddLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY3NzKGVsZW1lbnQsIHByb3ApO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSAoKGNvb3JkaW5hdGVzW3Byb3BdIC0gY3VycmVudE9mZnNldFtwcm9wXSkgXG4gICAgICAgICAgICAgICAgICAgICsgdG9GbG9hdChwb3MgPT09ICdhYnNvbHV0ZScgJiYgdmFsdWUgPT09ICdhdXRvJyA/IHBvc2l0aW9uKGVsZW1lbnQpW3Byb3BdIDogdmFsdWUpKSArIFwicHhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBnZXREaW1lbnNpb25zKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXREaW1lbnNpb25zKGVsZW1lbnQpIHtcblxuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICB2YXIgcmVmID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICAgIHZhciB0b3AgPSByZWYucGFnZVlPZmZzZXQ7XG4gICAgdmFyIGxlZnQgPSByZWYucGFnZVhPZmZzZXQ7XG5cbiAgICBpZiAoaXNXaW5kb3coZWxlbWVudCkpIHtcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoID0gZWxlbWVudC5pbm5lcldpZHRoO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGJvdHRvbTogdG9wICsgaGVpZ2h0LFxuICAgICAgICAgICAgcmlnaHQ6IGxlZnQgKyB3aWR0aCxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkaXNwbGF5ID0gZmFsc2U7XG4gICAgaWYgKCFpc1Zpc2libGUoZWxlbWVudCkpIHtcbiAgICAgICAgZGlzcGxheSA9IGVsZW1lbnQuc3R5bGUuZGlzcGxheTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAoZGlzcGxheSAhPT0gZmFsc2UpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogcmVjdC53aWR0aCxcbiAgICAgICAgdG9wOiByZWN0LnRvcCArIHRvcCxcbiAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgbGVmdCxcbiAgICAgICAgYm90dG9tOiByZWN0LmJvdHRvbSArIHRvcCxcbiAgICAgICAgcmlnaHQ6IHJlY3QucmlnaHQgKyBsZWZ0LFxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9zaXRpb24oZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICB2YXIgcGFyZW50ID0gb2Zmc2V0UGFyZW50KGVsZW1lbnQpLFxuICAgICAgICBwYXJlbnRPZmZzZXQgPSBwYXJlbnQgPT09IGRvY0VsJDEoZWxlbWVudCkgPyB7dG9wOiAwLCBsZWZ0OiAwfSA6IG9mZnNldChwYXJlbnQpO1xuXG4gICAgcmV0dXJuIFsndG9wJywgJ2xlZnQnXS5yZWR1Y2UoZnVuY3Rpb24gKHByb3BzLCBwcm9wKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZSA9IHVjZmlyc3QocHJvcCk7XG4gICAgICAgIHByb3BzW3Byb3BdIC09IHBhcmVudE9mZnNldFtwcm9wXVxuICAgICAgICAgICAgKyAodG9GbG9hdChjc3MoZWxlbWVudCwgKFwibWFyZ2luXCIgKyBwcm9wTmFtZSkpKSB8fCAwKVxuICAgICAgICAgICAgKyAodG9GbG9hdChjc3MocGFyZW50LCAoXCJib3JkZXJcIiArIHByb3BOYW1lICsgXCJXaWR0aFwiKSkpIHx8IDApO1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSwgb2Zmc2V0KGVsZW1lbnQpKTtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcblxuICAgIHZhciBwYXJlbnQgPSB0b05vZGUoZWxlbWVudCkub2Zmc2V0UGFyZW50O1xuXG4gICAgd2hpbGUgKHBhcmVudCAmJiBjc3MocGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50IHx8IGRvY0VsJDEoZWxlbWVudCk7XG59XG5cbnZhciBoZWlnaHQgPSBkaW1lbnNpb24oJ2hlaWdodCcpO1xudmFyIHdpZHRoID0gZGltZW5zaW9uKCd3aWR0aCcpO1xuXG5mdW5jdGlvbiBkaW1lbnNpb24ocHJvcCkge1xuICAgIHZhciBwcm9wTmFtZSA9IHVjZmlyc3QocHJvcCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZSkge1xuXG4gICAgICAgIGVsZW1lbnQgPSB0b05vZGUoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXG4gICAgICAgICAgICBpZiAoaXNXaW5kb3coZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFsoXCJpbm5lclwiICsgcHJvcE5hbWUpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRG9jdW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9jID0gZWxlbWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGRvYy5vZmZzZXRIZWlnaHQsIGRvYy5zY3JvbGxIZWlnaHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZSA9IGNzcyhlbGVtZW50LCBwcm9wKTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPT09ICdhdXRvJyA/IGVsZW1lbnRbKFwib2Zmc2V0XCIgKyBwcm9wTmFtZSldIDogdG9GbG9hdCh2YWx1ZSkgfHwgMDtcblxuICAgICAgICAgICAgcmV0dXJuIGdldENvbnRlbnRTaXplKHByb3AsIGVsZW1lbnQsIHZhbHVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjc3MoZWxlbWVudCwgcHJvcCwgIXZhbHVlICYmIHZhbHVlICE9PSAwXG4gICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgIDogZ2V0Q29udGVudFNpemUocHJvcCwgZWxlbWVudCwgdmFsdWUpICsgJ3B4J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldENvbnRlbnRTaXplKHByb3AsIGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGNzcyhlbGVtZW50LCAnYm94U2l6aW5nJykgPT09ICdib3JkZXItYm94JyA/IGRpcnNbcHJvcF0uc2xpY2UoMSkubWFwKHVjZmlyc3QpLnJlZHVjZShmdW5jdGlvbiAodmFsdWUsIHByb3ApIHsgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICAtIHRvRmxvYXQoY3NzKGVsZW1lbnQsIChcInBhZGRpbmdcIiArIHByb3ApKSlcbiAgICAgICAgICAgIC0gdG9GbG9hdChjc3MoZWxlbWVudCwgKFwiYm9yZGVyXCIgKyBwcm9wICsgXCJXaWR0aFwiKSkpOyB9XG4gICAgLCB2YWx1ZSkgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gaXNXaW5kb3coZWxlbWVudCkgPyBlbGVtZW50IDogZG9jdW1lbnQkMShlbGVtZW50KS5kZWZhdWx0Vmlldztcbn1cblxuZnVuY3Rpb24gbW92ZVRvKHBvc2l0aW9uLCBhdHRhY2gsIGRpbSwgZmFjdG9yKSB7XG4gICAgZWFjaChkaXJzLCBmdW5jdGlvbiAocmVmLCBwcm9wKSB7XG4gICAgICAgIHZhciBkaXIgPSByZWZbMF07XG4gICAgICAgIHZhciBhbGlnbiA9IHJlZlsxXTtcbiAgICAgICAgdmFyIGFsaWduRmxpcCA9IHJlZlsyXTtcblxuICAgICAgICBpZiAoYXR0YWNoW2Rpcl0gPT09IGFsaWduRmxpcCkge1xuICAgICAgICAgICAgcG9zaXRpb25bYWxpZ25dICs9IGRpbVtwcm9wXSAqIGZhY3RvcjtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRhY2hbZGlyXSA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uW2FsaWduXSArPSBkaW1bcHJvcF0gKiBmYWN0b3IgLyAyO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFBvcyhwb3MpIHtcblxuICAgIHZhciB4ID0gL2xlZnR8Y2VudGVyfHJpZ2h0LywgeSA9IC90b3B8Y2VudGVyfGJvdHRvbS87XG5cbiAgICBwb3MgPSAocG9zIHx8ICcnKS5zcGxpdCgnICcpO1xuXG4gICAgaWYgKHBvcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcG9zID0geC50ZXN0KHBvc1swXSlcbiAgICAgICAgICAgID8gcG9zLmNvbmNhdChbJ2NlbnRlciddKVxuICAgICAgICAgICAgOiB5LnRlc3QocG9zWzBdKVxuICAgICAgICAgICAgICAgID8gWydjZW50ZXInXS5jb25jYXQocG9zKVxuICAgICAgICAgICAgICAgIDogWydjZW50ZXInLCAnY2VudGVyJ107XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeC50ZXN0KHBvc1swXSkgPyBwb3NbMF0gOiAnY2VudGVyJyxcbiAgICAgICAgeTogeS50ZXN0KHBvc1sxXSkgPyBwb3NbMV0gOiAnY2VudGVyJ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldE9mZnNldHMob2Zmc2V0cywgd2lkdGgsIGhlaWdodCkge1xuXG4gICAgdmFyIHJlZiA9IChvZmZzZXRzIHx8ICcnKS5zcGxpdCgnICcpO1xuICAgIHZhciB4ID0gcmVmWzBdO1xuICAgIHZhciB5ID0gcmVmWzFdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCA/IHRvRmxvYXQoeCkgKiAoZW5kc1dpdGgoeCwgJyUnKSA/IHdpZHRoIC8gMTAwIDogMSkgOiAwLFxuICAgICAgICB5OiB5ID8gdG9GbG9hdCh5KSAqIChlbmRzV2l0aCh5LCAnJScpID8gaGVpZ2h0IC8gMTAwIDogMSkgOiAwXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZmxpcFBvc2l0aW9uKHBvcykge1xuICAgIHN3aXRjaCAocG9zKSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICByZXR1cm4gJ2JvdHRvbSc7XG4gICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICByZXR1cm4gJ3RvcCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZG9jdW1lbnQkMShlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRvTm9kZShlbGVtZW50KS5vd25lckRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBkb2NFbCQxKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQkMShlbGVtZW50KS5kb2N1bWVudEVsZW1lbnQ7XG59XG5cbi8qXG4gICAgQmFzZWQgb246XG4gICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTYgVGhvbWFzIEZ1Y2hzXG4gICAgaHR0cDovL3plcHRvanMuY29tL1xuKi9cblxudmFyIHRvdWNoID0ge307XG52YXIgY2xpY2tUaW1lb3V0O1xudmFyIHN3aXBlVGltZW91dDtcbnZhciB0YXBUaW1lb3V0O1xudmFyIGNsaWNrZWQ7XG5cbmZ1bmN0aW9uIHN3aXBlRGlyZWN0aW9uKHJlZikge1xuICAgIHZhciB4MSA9IHJlZi54MTtcbiAgICB2YXIgeDIgPSByZWYueDI7XG4gICAgdmFyIHkxID0gcmVmLnkxO1xuICAgIHZhciB5MiA9IHJlZi55MjtcblxuICAgIHJldHVybiBNYXRoLmFicyh4MSAtIHgyKSA+PSBNYXRoLmFicyh5MSAtIHkyKSA/ICh4MSAtIHgyID4gMCA/ICdMZWZ0JyA6ICdSaWdodCcpIDogKHkxIC0geTIgPiAwID8gJ1VwJyA6ICdEb3duJyk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbEFsbCgpIHtcbiAgICBjbGlja1RpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KGNsaWNrVGltZW91dCk7XG4gICAgc3dpcGVUaW1lb3V0ICYmIGNsZWFyVGltZW91dChzd2lwZVRpbWVvdXQpO1xuICAgIHRhcFRpbWVvdXQgJiYgY2xlYXJUaW1lb3V0KHRhcFRpbWVvdXQpO1xuICAgIGNsaWNrVGltZW91dCA9IHN3aXBlVGltZW91dCA9IHRhcFRpbWVvdXQgPSBudWxsO1xuICAgIHRvdWNoID0ge307XG59XG5cbnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgIG9uKGRvYywgJ2NsaWNrJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xpY2tlZCA9IHRydWU7IH0sIHRydWUpO1xuXG4gICAgb24oZG9jLCBwb2ludGVyRG93biwgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgIHZhciByZWYgPSBnZXRQb3MkMShlKTtcbiAgICAgICAgdmFyIHggPSByZWYueDtcbiAgICAgICAgdmFyIHkgPSByZWYueTtcbiAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdG91Y2guZWwgPSAndGFnTmFtZScgaW4gdGFyZ2V0ID8gdGFyZ2V0IDogdGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICAgICAgY2xpY2tUaW1lb3V0ICYmIGNsZWFyVGltZW91dChjbGlja1RpbWVvdXQpO1xuXG4gICAgICAgIHRvdWNoLngxID0geDtcbiAgICAgICAgdG91Y2gueTEgPSB5O1xuXG4gICAgICAgIGlmICh0b3VjaC5sYXN0ICYmIG5vdyAtIHRvdWNoLmxhc3QgPD0gMjUwKSB7XG4gICAgICAgICAgICB0b3VjaCA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdG91Y2gubGFzdCA9IG5vdztcblxuICAgICAgICBjbGlja2VkID0gZS5idXR0b24gPiAwO1xuXG4gICAgfSk7XG5cbiAgICBvbihkb2MsIHBvaW50ZXJNb3ZlLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHZhciByZWYgPSBnZXRQb3MkMShlKTtcbiAgICAgICAgdmFyIHggPSByZWYueDtcbiAgICAgICAgdmFyIHkgPSByZWYueTtcblxuICAgICAgICB0b3VjaC54MiA9IHg7XG4gICAgICAgIHRvdWNoLnkyID0geTtcbiAgICB9KTtcblxuICAgIG9uKGRvYywgcG9pbnRlclVwLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG5cbiAgICAgICAgLy8gc3dpcGVcbiAgICAgICAgaWYgKHRvdWNoLngyICYmIE1hdGguYWJzKHRvdWNoLngxIC0gdG91Y2gueDIpID4gMzAgfHwgdG91Y2gueTIgJiYgTWF0aC5hYnModG91Y2gueTEgLSB0b3VjaC55MikgPiAzMCkge1xuXG4gICAgICAgICAgICBzd2lwZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2guZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0b3VjaC5lbCwgJ3N3aXBlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodG91Y2guZWwsIChcInN3aXBlXCIgKyAoc3dpcGVEaXJlY3Rpb24odG91Y2gpKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3VjaCA9IHt9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbm9ybWFsIHRhcFxuICAgICAgICB9IGVsc2UgaWYgKCdsYXN0JyBpbiB0b3VjaCkge1xuXG4gICAgICAgICAgICB0YXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB0b3VjaC5lbCAmJiB0cmlnZ2VyKHRvdWNoLmVsLCAndGFwJyk7IH0pO1xuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIHNpbmdsZSBjbGljayBhZnRlciAzNTBtcyBvZiBpbmFjdGl2aXR5XG4gICAgICAgICAgICBpZiAodG91Y2guZWwgJiYgd2l0aGluKHRhcmdldCwgdG91Y2guZWwpKSB7XG4gICAgICAgICAgICAgICAgY2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3VjaC5lbCAmJiAhY2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0b3VjaC5lbCwgJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSB7fTtcbiAgICAgICAgICAgICAgICB9LCAzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3VjaCA9IHt9O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBvbihkb2MsICd0b3VjaGNhbmNlbCcsIGNhbmNlbEFsbCk7XG4gICAgb24od2luLCAnc2Nyb2xsJywgY2FuY2VsQWxsKTtcbn0pO1xuXG52YXIgdG91Y2hpbmcgPSBmYWxzZTtcbm9uKGRvYywgJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0b3VjaGluZyA9IHRydWU7IH0sIHRydWUpO1xub24oZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7dG91Y2hpbmcgPSBmYWxzZTt9KTtcbm9uKGRvYywgJ3RvdWNoY2FuY2VsJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdG91Y2hpbmcgPSBmYWxzZTsgfSwgdHJ1ZSk7XG5cbmZ1bmN0aW9uIGlzVG91Y2goZSkge1xuICAgIHJldHVybiB0b3VjaGluZyB8fCBlLnBvaW50ZXJUeXBlID09PSAndG91Y2gnO1xufVxuXG5mdW5jdGlvbiBnZXRQb3MkMShlKSB7XG4gICAgdmFyIHRvdWNoZXMgPSBlLnRvdWNoZXM7XG4gICAgdmFyIGNoYW5nZWRUb3VjaGVzID0gZS5jaGFuZ2VkVG91Y2hlcztcbiAgICBcbiAgICB2YXIgcmVmID0gdG91Y2hlcyAmJiB0b3VjaGVzWzBdIHx8IGNoYW5nZWRUb3VjaGVzICYmIGNoYW5nZWRUb3VjaGVzWzBdIHx8IGU7XG4gICAgdmFyIHggPSByZWYucGFnZVg7XG4gICAgdmFyIHkgPSByZWYucGFnZVk7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5fTtcbn1cblxuXG5cbnZhciB1dGlsID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGJpbmQ6IGJpbmQsXG5cdGhhc093bjogaGFzT3duLFxuXHRQcm9taXNlOiBQcm9taXNlLFxuXHRjbGFzc2lmeTogY2xhc3NpZnksXG5cdGh5cGhlbmF0ZTogaHlwaGVuYXRlLFxuXHRjYW1lbGl6ZTogY2FtZWxpemUsXG5cdHVjZmlyc3Q6IHVjZmlyc3QsXG5cdHN0YXJ0c1dpdGg6IHN0YXJ0c1dpdGgsXG5cdGVuZHNXaXRoOiBlbmRzV2l0aCxcblx0aW5jbHVkZXM6IGluY2x1ZGVzLFxuXHRpc0FycmF5OiBpc0FycmF5LFxuXHRpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuXHRpc09iamVjdDogaXNPYmplY3QsXG5cdGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG5cdGlzV2luZG93OiBpc1dpbmRvdyxcblx0aXNEb2N1bWVudDogaXNEb2N1bWVudCxcblx0aXNCb29sZWFuOiBpc0Jvb2xlYW4sXG5cdGlzU3RyaW5nOiBpc1N0cmluZyxcblx0aXNOdW1iZXI6IGlzTnVtYmVyLFxuXHRpc051bWVyaWM6IGlzTnVtZXJpYyxcblx0aXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuXHR0b0Jvb2xlYW46IHRvQm9vbGVhbixcblx0dG9OdW1iZXI6IHRvTnVtYmVyLFxuXHR0b0Zsb2F0OiB0b0Zsb2F0LFxuXHR0b0xpc3Q6IHRvTGlzdCxcblx0dG9NZWRpYTogdG9NZWRpYSxcblx0Y29lcmNlOiBjb2VyY2UsXG5cdHRvTXM6IHRvTXMsXG5cdHN3YXA6IHN3YXAsXG5cdGFzc2lnbjogYXNzaWduLFxuXHRlYWNoOiBlYWNoLFxuXHRjbGFtcDogY2xhbXAsXG5cdG5vb3A6IG5vb3AsXG5cdGludGVyc2VjdFJlY3Q6IGludGVyc2VjdFJlY3QsXG5cdHBvaW50SW5SZWN0OiBwb2ludEluUmVjdCxcblx0YWpheDogYWpheCxcblx0JDogJCQxLFxuXHQkJDogJCQsXG5cdHF1ZXJ5OiBxdWVyeSxcblx0cXVlcnlBbGw6IHF1ZXJ5QWxsLFxuXHRmaWx0ZXI6IGZpbHRlcixcblx0d2l0aGluOiB3aXRoaW4sXG5cdG1hdGNoZXM6IG1hdGNoZXMsXG5cdGNsb3Nlc3Q6IGNsb3Nlc3QsXG5cdHBhcmVudHM6IHBhcmVudHMsXG5cdGlzSlF1ZXJ5OiBpc0pRdWVyeSxcblx0dG9Ob2RlOiB0b05vZGUsXG5cdHRvTm9kZXM6IHRvTm9kZXMsXG5cdGF0dHI6IGF0dHIsXG5cdGhhc0F0dHI6IGhhc0F0dHIsXG5cdHJlbW92ZUF0dHI6IHJlbW92ZUF0dHIsXG5cdGZpbHRlckF0dHI6IGZpbHRlckF0dHIsXG5cdGRhdGE6IGRhdGEsXG5cdHdpbjogd2luLFxuXHRkb2M6IGRvYyxcblx0ZG9jRWw6IGRvY0VsLFxuXHRpc1J0bDogaXNSdGwsXG5cdGlzUmVhZHk6IGlzUmVhZHksXG5cdHJlYWR5OiByZWFkeSxcblx0dHJhbnNpdGlvbjogdHJhbnNpdGlvbixcblx0VHJhbnNpdGlvbjogVHJhbnNpdGlvbixcblx0YW5pbWF0ZTogYW5pbWF0ZSxcblx0QW5pbWF0aW9uOiBBbmltYXRpb24sXG5cdGlzSW5WaWV3OiBpc0luVmlldyxcblx0c2Nyb2xsZWRPdmVyOiBzY3JvbGxlZE92ZXIsXG5cdGdldEluZGV4OiBnZXRJbmRleCxcblx0aXNWb2lkRWxlbWVudDogaXNWb2lkRWxlbWVudCxcblx0RGltZW5zaW9uczogRGltZW5zaW9ucyxcblx0cHJldmVudENsaWNrOiBwcmV2ZW50Q2xpY2ssXG5cdGlzVmlzaWJsZTogaXNWaXNpYmxlLFxuXHRzZWxJbnB1dDogc2VsSW5wdXQsXG5cdGlzSW5wdXQ6IGlzSW5wdXQsXG5cdGVtcHR5OiBlbXB0eSxcblx0aHRtbDogaHRtbCxcblx0cHJlcGVuZDogcHJlcGVuZCxcblx0YXBwZW5kOiBhcHBlbmQsXG5cdGJlZm9yZTogYmVmb3JlLFxuXHRhZnRlcjogYWZ0ZXIsXG5cdHJlbW92ZTogcmVtb3ZlLFxuXHR3cmFwQWxsOiB3cmFwQWxsLFxuXHR3cmFwSW5uZXI6IHdyYXBJbm5lcixcblx0dW53cmFwOiB1bndyYXAsXG5cdGZyYWdtZW50OiBmcmFnbWVudCxcblx0aW5kZXg6IGluZGV4LFxuXHRjc3M6IGNzcyxcblx0Z2V0U3R5bGVzOiBnZXRTdHlsZXMsXG5cdGdldFN0eWxlOiBnZXRTdHlsZSxcblx0Z2V0Q3NzVmFyOiBnZXRDc3NWYXIsXG5cdGFkZENsYXNzOiBhZGRDbGFzcyxcblx0cmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxuXHRyZW1vdmVDbGFzc2VzOiByZW1vdmVDbGFzc2VzLFxuXHRyZXBsYWNlQ2xhc3M6IHJlcGxhY2VDbGFzcyxcblx0aGFzQ2xhc3M6IGhhc0NsYXNzLFxuXHR0b2dnbGVDbGFzczogdG9nZ2xlQ2xhc3MsXG5cdE9ic2VydmVyOiBPYnNlcnZlcixcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG5cdGhhc1RvdWNoOiBoYXNUb3VjaCxcblx0cG9pbnRlckRvd246IHBvaW50ZXJEb3duLFxuXHRwb2ludGVyTW92ZTogcG9pbnRlck1vdmUsXG5cdHBvaW50ZXJVcDogcG9pbnRlclVwLFxuXHRwb2ludGVyRW50ZXI6IHBvaW50ZXJFbnRlcixcblx0cG9pbnRlckxlYXZlOiBwb2ludGVyTGVhdmUsXG5cdHRyYW5zaXRpb25lbmQ6IHRyYW5zaXRpb25lbmQsXG5cdGFuaW1hdGlvbnN0YXJ0OiBhbmltYXRpb25zdGFydCxcblx0YW5pbWF0aW9uZW5kOiBhbmltYXRpb25lbmQsXG5cdGdldEltYWdlOiBnZXRJbWFnZSxcblx0b246IG9uLFxuXHRvZmY6IG9mZixcblx0b25jZTogb25jZSxcblx0dHJpZ2dlcjogdHJpZ2dlcixcblx0Y3JlYXRlRXZlbnQ6IGNyZWF0ZUV2ZW50LFxuXHR0b0V2ZW50VGFyZ2V0czogdG9FdmVudFRhcmdldHMsXG5cdGZhc3Rkb206IGZhc3Rkb20sXG5cdE1vdXNlVHJhY2tlcjogTW91c2VUcmFja2VyLFxuXHRtZXJnZU9wdGlvbnM6IG1lcmdlT3B0aW9ucyxcblx0UGxheWVyOiBQbGF5ZXIsXG5cdHBvc2l0aW9uQXQ6IHBvc2l0aW9uQXQsXG5cdG9mZnNldDogb2Zmc2V0LFxuXHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdGhlaWdodDogaGVpZ2h0LFxuXHR3aWR0aDogd2lkdGgsXG5cdGZsaXBQb3NpdGlvbjogZmxpcFBvc2l0aW9uLFxuXHRpc1RvdWNoOiBpc1RvdWNoLFxuXHRnZXRQb3M6IGdldFBvcyQxXG59KTtcblxudmFyIGJvb3QgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBjb25uZWN0ID0gVUlraXQuY29ubmVjdDtcbiAgICB2YXIgZGlzY29ubmVjdCA9IFVJa2l0LmRpc2Nvbm5lY3Q7XG5cbiAgICBpZiAoT2JzZXJ2ZXIpIHtcblxuICAgICAgICBpZiAoZG9jLmJvZHkpIHtcblxuICAgICAgICAgICAgaW5pdCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIChuZXcgT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRvYy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KSkub2JzZXJ2ZShkb2NFbCwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZX0pO1xuXG4gICAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXBwbHkoZG9jLmJvZHksIGNvbm5lY3QpO1xuICAgICAgICAgICAgb24oZG9jRWwsICdET01Ob2RlSW5zZXJ0ZWQnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gYXBwbHkoZS50YXJnZXQsIGNvbm5lY3QpOyB9KTtcbiAgICAgICAgICAgIG9uKGRvY0VsLCAnRE9NTm9kZVJlbW92ZWQnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gYXBwbHkoZS50YXJnZXQsIGRpc2Nvbm5lY3QpOyB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuXG4gICAgICAgIGFwcGx5KGRvYy5ib2R5LCBjb25uZWN0KTtcblxuICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XG5cbiAgICAgICAgKG5ldyBPYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7IHJldHVybiBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFkZGVkTm9kZXMgPSByZWYuYWRkZWROb2RlcztcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZE5vZGVzID0gcmVmLnJlbW92ZWROb2RlcztcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KGFkZGVkTm9kZXNbaV0sIGNvbm5lY3QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHkocmVtb3ZlZE5vZGVzW2ldLCBkaXNjb25uZWN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUoY3JlYXRlRXZlbnQoJ3VwZGF0ZScsIHRydWUsIGZhbHNlLCB7bXV0YXRpb246IHRydWV9KSwgdGFyZ2V0LCB0cnVlKTtcblxuICAgICAgICAgICAgfSk7IH1cbiAgICAgICAgKSkub2JzZXJ2ZShkb2NFbCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2hyZWYnXVxuICAgICAgICB9KTtcblxuICAgICAgICBVSWtpdC5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5KG5vZGUsIGZuKSB7XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEgfHwgaGFzQXR0cihub2RlLCAndWstbm8tYm9vdCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmbihub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgYXBwbHkobm9kZSwgZm4pO1xuICAgICAgICAgICAgbm9kZSA9IG5leHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbnZhciBnbG9iYWxBUEkgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBEQVRBID0gVUlraXQuZGF0YTtcblxuICAgIFVJa2l0LnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblxuICAgICAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGx1Z2luLmNhbGwobnVsbCwgdGhpcyk7XG4gICAgICAgIHBsdWdpbi5pbnN0YWxsZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBVSWtpdC5taXhpbiA9IGZ1bmN0aW9uIChtaXhpbiwgY29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudCA9IChpc1N0cmluZyhjb21wb25lbnQpID8gVUlraXQuY29tcG9uZW50c1tjb21wb25lbnRdIDogY29tcG9uZW50KSB8fCB0aGlzO1xuICAgICAgICBtaXhpbiA9IG1lcmdlT3B0aW9ucyh7fSwgbWl4aW4pO1xuICAgICAgICBtaXhpbi5taXhpbnMgPSBjb21wb25lbnQub3B0aW9ucy5taXhpbnM7XG4gICAgICAgIGRlbGV0ZSBjb21wb25lbnQub3B0aW9ucy5taXhpbnM7XG4gICAgICAgIGNvbXBvbmVudC5vcHRpb25zID0gbWVyZ2VPcHRpb25zKG1peGluLCBjb21wb25lbnQub3B0aW9ucyk7XG4gICAgfTtcblxuICAgIFVJa2l0LmV4dGVuZCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdmFyIFN1cGVyID0gdGhpcywgbmFtZSA9IG9wdGlvbnMubmFtZSB8fCBTdXBlci5vcHRpb25zLm5hbWU7XG4gICAgICAgIHZhciBTdWIgPSBjcmVhdGVDbGFzcyhuYW1lIHx8ICdVSWtpdENvbXBvbmVudCcpO1xuXG4gICAgICAgIFN1Yi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cGVyLnByb3RvdHlwZSk7XG4gICAgICAgIFN1Yi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWI7XG4gICAgICAgIFN1Yi5vcHRpb25zID0gbWVyZ2VPcHRpb25zKFN1cGVyLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIFN1Ylsnc3VwZXInXSA9IFN1cGVyO1xuICAgICAgICBTdWIuZXh0ZW5kID0gU3VwZXIuZXh0ZW5kO1xuXG4gICAgICAgIHJldHVybiBTdWI7XG4gICAgfTtcblxuICAgIFVJa2l0LnVwZGF0ZSA9IGZ1bmN0aW9uIChlLCBlbGVtZW50LCBwYXJlbnRzKSB7XG4gICAgICAgIGlmICggcGFyZW50cyA9PT0gdm9pZCAwICkgcGFyZW50cyA9IGZhbHNlO1xuXG5cbiAgICAgICAgZSA9IGNyZWF0ZUV2ZW50KGUgfHwgJ3VwZGF0ZScpO1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuXG4gICAgICAgICAgICB1cGRhdGUoVUlraXQuaW5zdGFuY2VzLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudCA9IHRvTm9kZShlbGVtZW50KTtcblxuICAgICAgICBpZiAocGFyZW50cykge1xuXG4gICAgICAgICAgICBkbyB7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGUoZWxlbWVudFtEQVRBXSwgZSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgICAgICAgfSB3aGlsZSAoZWxlbWVudClcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBhcHBseShlbGVtZW50LCBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gdXBkYXRlKGVsZW1lbnRbREFUQV0sIGUpOyB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdmFyIGNvbnRhaW5lcjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlraXQsICdjb250YWluZXInLCB7XG5cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbmVyIHx8IGRvYy5ib2R5O1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3MobmFtZSkge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKChcInJldHVybiBmdW5jdGlvbiBcIiArIChjbGFzc2lmeShuYW1lKSkgKyBcIiAob3B0aW9ucykgeyB0aGlzLl9pbml0KG9wdGlvbnMpOyB9XCIpKSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5KG5vZGUsIGZuKSB7XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZuKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIGFwcGx5KG5vZGUsIGZuKTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShkYXRhLCBlKSB7XG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBuYW1lIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhW25hbWVdLl9pc1JlYWR5KSB7XG4gICAgICAgICAgICAgICAgZGF0YVtuYW1lXS5fY2FsbFVwZGF0ZShlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG52YXIgaG9va3NBUEkgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5fY2FsbEhvb2sgPSBmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuJG9wdGlvbnNbaG9va107XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiBoYW5kbGVyLmNhbGwodGhpcyQxKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9jYWxsUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzUmVhZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jYWxsSG9vaygncmVhZHknKTtcbiAgICAgICAgdGhpcy5fY2FsbFVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxDb25uZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpbmNsdWRlcyhVSWtpdC5lbGVtZW50cywgdGhpcy4kb3B0aW9ucy5lbCkpIHtcbiAgICAgICAgICAgIFVJa2l0LmVsZW1lbnRzLnB1c2godGhpcy4kb3B0aW9ucy5lbCk7XG4gICAgICAgIH1cblxuICAgICAgICBVSWtpdC5pbnN0YW5jZXNbdGhpcy5fdWlkXSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdjb25uZWN0ZWQnKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9pbml0T2JzZXJ2ZXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzUmVhZHkpIHtcbiAgICAgICAgICAgIHJlYWR5KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5fY2FsbFJlYWR5KCk7IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsbFVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2NhbGxEaXNjb25uZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gVUlraXQuZWxlbWVudHMuaW5kZXhPZih0aGlzLiRvcHRpb25zLmVsKTtcblxuICAgICAgICBpZiAofmluZGV4KSB7XG4gICAgICAgICAgICBVSWtpdC5lbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIFVJa2l0Lmluc3RhbmNlc1t0aGlzLl91aWRdO1xuXG4gICAgICAgIHRoaXMuX3VuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLl9jYWxsSG9vaygnZGlzY29ubmVjdGVkJyk7XG5cbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl9jYWxsVXBkYXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICBlID0gY3JlYXRlRXZlbnQoZSB8fCAndXBkYXRlJyk7XG5cbiAgICAgICAgdmFyIHR5cGUgPSBlLnR5cGU7XG4gICAgICAgIHZhciBkZXRhaWwgPSBlLmRldGFpbDtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3VwZGF0ZScgJiYgZGV0YWlsICYmIGRldGFpbC5tdXRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZWRzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXBkYXRlcyA9IHRoaXMuJG9wdGlvbnMudXBkYXRlO1xuXG4gICAgICAgIGlmICghdXBkYXRlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh1cGRhdGUsIGkpIHtcblxuICAgICAgICAgICAgaWYgKHR5cGUgIT09ICd1cGRhdGUnICYmICFpbmNsdWRlcyh1cGRhdGUuZXZlbnRzLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVwZGF0ZS5yZWFkICYmICFpbmNsdWRlcyhmYXN0ZG9tLnJlYWRzLCB0aGlzJDEuX2ZyYW1lcy5yZWFkc1tpXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzJDEuX2ZyYW1lcy5yZWFkc1tpXSA9IGZhc3Rkb20ubWVhc3VyZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5yZWFkLmNhbGwodGhpcyQxLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMkMS5fZnJhbWVzLnJlYWRzW2ldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodXBkYXRlLndyaXRlICYmICFpbmNsdWRlcyhmYXN0ZG9tLndyaXRlcywgdGhpcyQxLl9mcmFtZXMud3JpdGVzW2ldKSkge1xuICAgICAgICAgICAgICAgIHRoaXMkMS5fZnJhbWVzLndyaXRlc1tpXSA9IGZhc3Rkb20ubXV0YXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlLndyaXRlLmNhbGwodGhpcyQxLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMkMS5fZnJhbWVzLndyaXRlc1tpXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbn07XG5cbnZhciBzdGF0ZUFQSSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIHVpZCA9IDA7XG5cbiAgICBVSWtpdC5wcm90b3R5cGUucHJvcHMgPSB7fTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKHRoaXMuY29uc3RydWN0b3Iub3B0aW9ucywgb3B0aW9ucywgdGhpcyk7XG5cbiAgICAgICAgdGhpcy4kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLiRuYW1lID0gVUlraXQucHJlZml4ICsgaHlwaGVuYXRlKHRoaXMuJG9wdGlvbnMubmFtZSk7XG4gICAgICAgIHRoaXMuJHByb3BzID0ge307XG5cbiAgICAgICAgdGhpcy5fZnJhbWVzID0ge3JlYWRzOiB7fSwgd3JpdGVzOiB7fX07XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3VpZCA9IHVpZCsrO1xuICAgICAgICB0aGlzLl9pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLl9pbml0TWV0aG9kcygpO1xuICAgICAgICB0aGlzLl9pbml0Q29tcHV0ZWRzKCk7XG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdjcmVhdGVkJyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vdW50KG9wdGlvbnMuZWwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIHJlZiA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHJlZi5kZWZhdWx0cztcbiAgICAgICAgdmFyIGRhdGEkJDEgPSByZWYuZGF0YTsgaWYgKCBkYXRhJCQxID09PSB2b2lkIDAgKSBkYXRhJCQxID0ge307XG4gICAgICAgIHZhciBhcmdzID0gcmVmLmFyZ3M7IGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xuICAgICAgICB2YXIgcHJvcHMgPSByZWYucHJvcHM7IGlmICggcHJvcHMgPT09IHZvaWQgMCApIHByb3BzID0ge307XG4gICAgICAgIHZhciBlbCA9IHJlZi5lbDtcblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggJiYgaXNBcnJheShkYXRhJCQxKSkge1xuICAgICAgICAgICAgZGF0YSQkMSA9IGRhdGEkJDEuc2xpY2UoMCwgYXJncy5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbiAoZGF0YSQkMSwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbihkYXRhJCQxLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSQkMVthcmdzW2luZGV4XV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEkJDE7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIHRoaXMkMS4kcHJvcHNba2V5XSA9IHRoaXMkMVtrZXldID0gaGFzT3duKGRhdGEkJDEsIGtleSkgJiYgIWlzVW5kZWZpbmVkKGRhdGEkJDFba2V5XSlcbiAgICAgICAgICAgICAgICA/IGNvZXJjZShwcm9wc1trZXldLCBkYXRhJCQxW2tleV0sIGVsKVxuICAgICAgICAgICAgICAgIDogaXNBcnJheShkZWZhdWx0c1trZXldKVxuICAgICAgICAgICAgICAgICAgICA/IGRlZmF1bHRzW2tleV0uY29uY2F0KClcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0c1trZXldO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdE1ldGhvZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIG1ldGhvZHMgPSB0aGlzLiRvcHRpb25zLm1ldGhvZHM7XG5cbiAgICAgICAgaWYgKG1ldGhvZHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBiaW5kKG1ldGhvZHNba2V5XSwgdGhpcyQxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuX2luaXRDb21wdXRlZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdmFyIGNvbXB1dGVkID0gdGhpcy4kb3B0aW9ucy5jb21wdXRlZDtcblxuICAgICAgICB0aGlzLl9jb21wdXRlZHMgPSB7fTtcblxuICAgICAgICBpZiAoY29tcHV0ZWQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgICAgICAgICAgIHJlZ2lzdGVyQ29tcHV0ZWQodGhpcyQxLCBrZXksIGNvbXB1dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdFByb3BzID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgdGhpcy5fY29tcHV0ZWRzID0ge307XG4gICAgICAgIGFzc2lnbih0aGlzLiRwcm9wcywgcHJvcHMgfHwgZ2V0UHJvcHModGhpcy4kb3B0aW9ucywgdGhpcy4kbmFtZSkpO1xuXG4gICAgICAgIHZhciBleGNsdWRlID0gW3RoaXMuJG9wdGlvbnMuY29tcHV0ZWQsIHRoaXMuJG9wdGlvbnMubWV0aG9kc107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzJDEuJHByb3BzKSB7XG4gICAgICAgICAgICBpZiAobm90SW4oZXhjbHVkZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMkMVtrZXldID0gdGhpcyQxLiRwcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy4kb3B0aW9ucy5ldmVudHM7XG5cbiAgICAgICAgaWYgKGV2ZW50cykge1xuXG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgIGlmICghaGFzT3duKGV2ZW50LCAnaGFuZGxlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudCh0aGlzJDEsIGV2ZW50W2tleV0sIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckV2ZW50KHRoaXMkMSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLl91bmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh1bmJpbmQpIHsgcmV0dXJuIHVuYmluZCgpOyB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gW107XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS5faW5pdE9ic2VydmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zO1xuICAgICAgICB2YXIgYXR0cnMgPSByZWYuYXR0cnM7XG4gICAgICAgIHZhciBwcm9wcyA9IHJlZi5wcm9wcztcbiAgICAgICAgdmFyIGVsID0gcmVmLmVsO1xuICAgICAgICBpZiAodGhpcy5fb2JzZXJ2ZXIgfHwgIXByb3BzIHx8ICFhdHRycyB8fCAhT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGF0dHJzID0gaXNBcnJheShhdHRycykgPyBhdHRycyA6IE9iamVjdC5rZXlzKHByb3BzKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gaHlwaGVuYXRlKGtleSk7IH0pO1xuXG4gICAgICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE9ic2VydmVyKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIGRhdGEkJDEgPSBnZXRQcm9wcyh0aGlzJDEuJG9wdGlvbnMsIHRoaXMkMS4kbmFtZSk7XG4gICAgICAgICAgICBpZiAoYXR0cnMuc29tZShmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAhaXNVbmRlZmluZWQoZGF0YSQkMVtrZXldKSAmJiBkYXRhJCQxW2tleV0gIT09IHRoaXMkMS4kcHJvcHNba2V5XTsgfSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzJDEuJHJlc2V0KGRhdGEkJDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUoZWwsIHthdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IGF0dHJzLmNvbmNhdChbdGhpcy4kbmFtZSwgKFwiZGF0YS1cIiArICh0aGlzLiRuYW1lKSldKX0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9wcyhvcHRzLCBuYW1lKSB7XG5cbiAgICAgICAgdmFyIGRhdGEkJDEgPSB7fTtcbiAgICAgICAgdmFyIGFyZ3MgPSBvcHRzLmFyZ3M7IGlmICggYXJncyA9PT0gdm9pZCAwICkgYXJncyA9IFtdO1xuICAgICAgICB2YXIgcHJvcHMgPSBvcHRzLnByb3BzOyBpZiAoIHByb3BzID09PSB2b2lkIDAgKSBwcm9wcyA9IHt9O1xuICAgICAgICB2YXIgZWwgPSBvcHRzLmVsO1xuICAgICAgICB2YXIga2V5LCBwcm9wO1xuXG4gICAgICAgIGlmICghcHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhJCQxO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIHByb3AgPSBoeXBoZW5hdGUoa2V5KTtcbiAgICAgICAgICAgIGlmIChoYXNBdHRyKGVsLCBwcm9wKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY29lcmNlKHByb3BzW2tleV0sIGF0dHIoZWwsIHByb3ApLCBlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3RhcmdldCcgJiYgKCF2YWx1ZSB8fCBzdGFydHNXaXRoKHZhbHVlLCAnXycpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkYXRhJCQxW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcHRpb25zID0gcGFyc2VPcHRpb25zKGRhdGEoZWwsIG5hbWUpLCBhcmdzKTtcblxuICAgICAgICBmb3IgKGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBwcm9wID0gY2FtZWxpemUoa2V5KTtcbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGF0YSQkMVtwcm9wXSA9IGNvZXJjZShwcm9wc1twcm9wXSwgb3B0aW9uc1trZXldLCBlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YSQkMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZU9wdGlvbnMob3B0aW9ucywgYXJncykge1xuICAgICAgICBpZiAoIGFyZ3MgPT09IHZvaWQgMCApIGFyZ3MgPSBbXTtcblxuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHJldHVybiAhb3B0aW9uc1xuICAgICAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgICAgICA6IHN0YXJ0c1dpdGgob3B0aW9ucywgJ3snKVxuICAgICAgICAgICAgICAgICAgICA/IEpTT04ucGFyc2Uob3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgOiBhcmdzLmxlbmd0aCAmJiAhaW5jbHVkZXMob3B0aW9ucywgJzonKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAoKCBvYmogPSB7fSwgb2JqW2FyZ3NbMF1dID0gb3B0aW9ucywgb2JqICkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnMuc3BsaXQoJzsnKS5yZWR1Y2UoZnVuY3Rpb24gKG9wdGlvbnMsIG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYgPSBvcHRpb24uc3BsaXQoLzooLispLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHJlZlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZWZbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2tleS50cmltKCldID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIHZhciBvYmo7XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckNvbXB1dGVkKGNvbXBvbmVudCwga2V5LCBjYikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29tcG9uZW50LCBrZXksIHtcblxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgX2NvbXB1dGVkcyA9IGNvbXBvbmVudC5fY29tcHV0ZWRzO1xuICAgICAgICAgICAgICAgIHZhciAkcHJvcHMgPSBjb21wb25lbnQuJHByb3BzO1xuICAgICAgICAgICAgICAgIHZhciAkZWwgPSBjb21wb25lbnQuJGVsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24oX2NvbXB1dGVkcywga2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBfY29tcHV0ZWRzW2tleV0gPSBjYi5jYWxsKGNvbXBvbmVudCwgJHByb3BzLCAkZWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBfY29tcHV0ZWRzW2tleV07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5fY29tcHV0ZWRzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckV2ZW50KGNvbXBvbmVudCwgZXZlbnQsIGtleSkge1xuXG4gICAgICAgIGlmICghaXNQbGFpbk9iamVjdChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50ID0gKHtuYW1lOiBrZXksIGhhbmRsZXI6IGV2ZW50fSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmFtZSA9IGV2ZW50Lm5hbWU7XG4gICAgICAgIHZhciBlbCA9IGV2ZW50LmVsO1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBldmVudC5kZWxlZ2F0ZTtcbiAgICAgICAgdmFyIHNlbGYgPSBldmVudC5zZWxmO1xuICAgICAgICB2YXIgZmlsdGVyID0gZXZlbnQuZmlsdGVyO1xuICAgICAgICB2YXIgaGFuZGxlciA9IGV2ZW50LmhhbmRsZXI7XG4gICAgICAgIGVsID0gaXNGdW5jdGlvbihlbClcbiAgICAgICAgICAgID8gZWwuY2FsbChjb21wb25lbnQpXG4gICAgICAgICAgICA6IGVsIHx8IGNvbXBvbmVudC4kZWw7XG5cbiAgICAgICAgaWYgKGlzQXJyYXkoZWwpKSB7XG4gICAgICAgICAgICBlbC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVnaXN0ZXJFdmVudChjb21wb25lbnQsIGFzc2lnbih7fSwgZXZlbnQsIHtlbDogZWx9KSwga2V5KTsgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVsIHx8IGZpbHRlciAmJiAhZmlsdGVyLmNhbGwoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlciA9IGRldGFpbChpc1N0cmluZyhoYW5kbGVyKSA/IGNvbXBvbmVudFtoYW5kbGVyXSA6IGJpbmQoaGFuZGxlciwgY29tcG9uZW50KSk7XG5cbiAgICAgICAgaWYgKHNlbGYpIHtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBzZWxmRmlsdGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50Ll9ldmVudHMucHVzaChcbiAgICAgICAgICAgIG9uKFxuICAgICAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgIWRlbGVnYXRlXG4gICAgICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgICAgICA6IGlzU3RyaW5nKGRlbGVnYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWxlZ2F0ZS5jYWxsKGNvbXBvbmVudCksXG4gICAgICAgICAgICAgICAgaGFuZGxlclxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZkZpbHRlcihoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzZWxmSGFuZGxlcihlKSB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCB8fCBlLnRhcmdldCA9PT0gZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbChudWxsLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vdEluKG9wdGlvbnMsIGtleSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5ldmVyeShmdW5jdGlvbiAoYXJyKSB7IHJldHVybiAhYXJyIHx8ICFoYXNPd24oYXJyLCBrZXkpOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXRhaWwobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7IHJldHVybiBpc0FycmF5KGUuZGV0YWlsKSA/IGxpc3RlbmVyLmFwcGx5KGxpc3RlbmVyLCBbZV0uY29uY2F0KGUuZGV0YWlsKSkgOiBsaXN0ZW5lcihlKTsgfTtcbiAgICB9XG5cbn07XG5cbnZhciBpbnN0YW5jZUFQSSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIERBVEEgPSBVSWtpdC5kYXRhO1xuXG4gICAgVUlraXQucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy4kb3B0aW9ucy5uYW1lO1xuXG4gICAgICAgIGlmICghZWxbREFUQV0pIHtcbiAgICAgICAgICAgIGVsW0RBVEFdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxbREFUQV1bbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsW0RBVEFdW25hbWVdID0gdGhpcztcblxuICAgICAgICB0aGlzLiRlbCA9IHRoaXMuJG9wdGlvbnMuZWwgPSB0aGlzLiRvcHRpb25zLmVsIHx8IGVsO1xuXG4gICAgICAgIHRoaXMuX2luaXRQcm9wcygpO1xuXG4gICAgICAgIHRoaXMuX2NhbGxIb29rKCdpbml0Jyk7XG5cbiAgICAgICAgaWYgKHdpdGhpbihlbCwgZG9jRWwpKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsQ29ubmVjdGVkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy5fY2FsbFVwZGF0ZShlKTtcbiAgICB9O1xuXG4gICAgVUlraXQucHJvdG90eXBlLiR1cGRhdGUgPSBmdW5jdGlvbiAoZSwgcGFyZW50cykge1xuICAgICAgICBVSWtpdC51cGRhdGUoZSwgdGhpcy4kb3B0aW9ucy5lbCwgcGFyZW50cyk7XG4gICAgfTtcblxuICAgIFVJa2l0LnByb3RvdHlwZS4kcmVzZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9jYWxsRGlzY29ubmVjdGVkKCk7XG4gICAgICAgIHRoaXMuX2luaXRQcm9wcyhkYXRhKTtcbiAgICAgICAgdGhpcy5fY2FsbENvbm5lY3RlZCgpO1xuICAgIH07XG5cbiAgICBVSWtpdC5wcm90b3R5cGUuJGRlc3Ryb3kgPSBmdW5jdGlvbiAocmVtb3ZlRWwpIHtcbiAgICAgICAgaWYgKCByZW1vdmVFbCA9PT0gdm9pZCAwICkgcmVtb3ZlRWwgPSBmYWxzZTtcblxuXG4gICAgICAgIHZhciByZWYgPSB0aGlzLiRvcHRpb25zO1xuICAgICAgICB2YXIgZWwgPSByZWYuZWw7XG4gICAgICAgIHZhciBuYW1lID0gcmVmLm5hbWU7XG5cbiAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsRGlzY29ubmVjdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jYWxsSG9vaygnZGVzdHJveScpO1xuXG4gICAgICAgIGlmICghZWwgfHwgIWVsW0RBVEFdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgZWxbREFUQV1bbmFtZV07XG5cbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhlbFtEQVRBXSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgZWxbREFUQV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVtb3ZlRWwpIHtcbiAgICAgICAgICAgIHJlbW92ZSh0aGlzLiRlbCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59O1xuXG52YXIgY29tcG9uZW50QVBJID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgREFUQSA9IFVJa2l0LmRhdGE7XG5cbiAgICBVSWtpdC5jb21wb25lbnRzID0ge307XG5cbiAgICBVSWtpdC5jb21wb25lbnQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgbmFtZSA9IGNhbWVsaXplKGlkKTtcblxuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBVSWtpdC5leHRlbmQob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBVSWtpdC5jb21wb25lbnRzW25hbWVdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLm9wdGlvbnMubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBVSWtpdC5jb21wb25lbnRzW25hbWVdID0gb3B0aW9ucztcblxuICAgICAgICBVSWtpdFtuYW1lXSA9IGZ1bmN0aW9uIChlbGVtZW50LCBkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3NBcnJheSA9IEFycmF5KGkpO1xuICAgICAgICAgICAgd2hpbGUgKCBpLS0gKSBhcmdzQXJyYXlbaV0gPSBhcmd1bWVudHNbaV07XG5cblxuICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVJa2l0LmNvbXBvbmVudHNbbmFtZV0oe2RhdGE6IGVsZW1lbnR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFVJa2l0LmNvbXBvbmVudHNbbmFtZV0ub3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBVSWtpdC5jb21wb25lbnRzW25hbWVdKHtkYXRhOiBbXS5jb25jYXQoIGFyZ3NBcnJheSApfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgPyBpbml0KGVsZW1lbnQpIDogJCQoZWxlbWVudCkubWFwKGluaXQpWzBdO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0KGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVUlraXQuZ2V0Q29tcG9uZW50KGVsZW1lbnQsIG5hbWUpIHx8IG5ldyBVSWtpdC5jb21wb25lbnRzW25hbWVdKHtlbDogZWxlbWVudCwgZGF0YTogZGF0YSB8fCB7fX0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKFVJa2l0Ll9pbml0aWFsaXplZCAmJiAhb3B0aW9ucy5vcHRpb25zLmZ1bmN0aW9uYWwpIHtcbiAgICAgICAgICAgIGZhc3Rkb20ubWVhc3VyZShmdW5jdGlvbiAoKSB7IHJldHVybiBVSWtpdFtuYW1lXSgoXCJbdWstXCIgKyBpZCArIFwiXSxbZGF0YS11ay1cIiArIGlkICsgXCJdXCIpKTsgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVUlraXQuY29tcG9uZW50c1tuYW1lXTtcbiAgICB9O1xuXG4gICAgVUlraXQuZ2V0Q29tcG9uZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBlbGVtZW50ICYmIChlbGVtZW50ID0gaXNKUXVlcnkoZWxlbWVudCkgPyBlbGVtZW50WzBdIDogZWxlbWVudCkgJiYgZWxlbWVudFtEQVRBXSB8fCB7fTsgfTtcbiAgICBVSWtpdC5nZXRDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSkgeyByZXR1cm4gVUlraXQuZ2V0Q29tcG9uZW50cyhlbGVtZW50KVtuYW1lXTsgfTtcblxuICAgIFVJa2l0LmNvbm5lY3QgPSBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgIHZhciBuYW1lO1xuXG4gICAgICAgIGlmIChub2RlW0RBVEFdKSB7XG4gICAgICAgICAgICBmb3IgKG5hbWUgaW4gbm9kZVtEQVRBXSkge1xuICAgICAgICAgICAgICAgIG5vZGVbREFUQV1bbmFtZV0uX2NhbGxDb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIG5hbWUgPSBub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZTtcblxuICAgICAgICAgICAgaWYgKHN0YXJ0c1dpdGgobmFtZSwgJ3VrLScpIHx8IHN0YXJ0c1dpdGgobmFtZSwgJ2RhdGEtdWstJykpIHtcblxuICAgICAgICAgICAgICAgIG5hbWUgPSBjYW1lbGl6ZShuYW1lLnJlcGxhY2UoJ2RhdGEtdWstJywgJycpLnJlcGxhY2UoJ3VrLScsICcnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoVUlraXRbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgVUlraXRbbmFtZV0obm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgVUlraXQuZGlzY29ubmVjdCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gbm9kZVtEQVRBXSkge1xuICAgICAgICAgICAgbm9kZVtEQVRBXVtuYW1lXS5fY2FsbERpc2Nvbm5lY3RlZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxufTtcblxudmFyIFVJa2l0JDIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG59O1xuXG5VSWtpdCQyLnV0aWwgPSB1dGlsO1xuVUlraXQkMi5kYXRhID0gJ19fdWlraXRfXyc7XG5VSWtpdCQyLnByZWZpeCA9ICd1ay0nO1xuVUlraXQkMi5vcHRpb25zID0ge307XG5VSWtpdCQyLmluc3RhbmNlcyA9IHt9O1xuVUlraXQkMi5lbGVtZW50cyA9IFtdO1xuXG5nbG9iYWxBUEkoVUlraXQkMik7XG5ob29rc0FQSShVSWtpdCQyKTtcbnN0YXRlQVBJKFVJa2l0JDIpO1xuaW5zdGFuY2VBUEkoVUlraXQkMik7XG5jb21wb25lbnRBUEkoVUlraXQkMik7XG5cbnZhciBDbGFzcyA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLiRuYW1lKTtcbiAgICB9XG5cbn07XG5cbnZhciBDb250YWluZXIgPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBjb250YWluZXI6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY29udGFpbmVyOiB0cnVlXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY29udGFpbmVyOiBmdW5jdGlvbiBjb250YWluZXIocmVmKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcmVmLmNvbnRhaW5lcjtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lciA9PT0gdHJ1ZSAmJiBVSWtpdCQyLmNvbnRhaW5lciB8fCBjb250YWluZXIgJiYgJChjb250YWluZXIpIHx8IFVJa2l0JDIuY29udGFpbmVyO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbnZhciBUb2dnbGFibGUgPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBjbHM6IEJvb2xlYW4sXG4gICAgICAgIGFuaW1hdGlvbjogJ2xpc3QnLFxuICAgICAgICBkdXJhdGlvbjogTnVtYmVyLFxuICAgICAgICBvcmlnaW46IFN0cmluZyxcbiAgICAgICAgdHJhbnNpdGlvbjogU3RyaW5nLFxuICAgICAgICBxdWV1ZWQ6IEJvb2xlYW5cbiAgICB9LFxuXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY2xzOiBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uOiBbZmFsc2VdLFxuICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICBvcmlnaW46IGZhbHNlLFxuICAgICAgICB0cmFuc2l0aW9uOiAnbGluZWFyJyxcbiAgICAgICAgcXVldWVkOiBmYWxzZSxcblxuICAgICAgICBpbml0UHJvcHM6IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogJycsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnJyxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJydcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlUHJvcHM6IHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAwXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuXG4gICAgICAgIGhhc0FuaW1hdGlvbjogZnVuY3Rpb24gaGFzQW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XG5cbiAgICAgICAgICAgIHJldHVybiAhIWFuaW1hdGlvblswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNUcmFuc2l0aW9uOiBmdW5jdGlvbiBoYXNUcmFuc2l0aW9uKHJlZikge1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHJlZi5hbmltYXRpb247XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc0FuaW1hdGlvbiAmJiBhbmltYXRpb25bMF0gPT09IHRydWU7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgdG9nZ2xlRWxlbWVudDogZnVuY3Rpb24gdG9nZ2xlRWxlbWVudCh0YXJnZXRzLCBzaG93LCBhbmltYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgICAgICB0YXJnZXRzID0gdG9Ob2Rlcyh0YXJnZXRzKTtcblxuICAgICAgICAgICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbiAodGFyZ2V0cykgeyByZXR1cm4gUHJvbWlzZS5hbGwodGFyZ2V0cy5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZUVsZW1lbnQoZWwsIHNob3csIGFuaW1hdGUpOyB9KSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZWQgPSB0YXJnZXRzLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHRoaXMkMS5pc1RvZ2dsZWQoZWwpOyB9KSxcbiAgICAgICAgICAgICAgICAgICAgdW50b2dnbGVkID0gdGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhaW5jbHVkZXModG9nZ2xlZCwgZWwpOyB9KSxcbiAgICAgICAgICAgICAgICAgICAgcDtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcyQxLnF1ZXVlZCB8fCAhaXNVbmRlZmluZWQoYW5pbWF0ZSkgfHwgIWlzVW5kZWZpbmVkKHNob3cpIHx8ICF0aGlzJDEuaGFzQW5pbWF0aW9uIHx8IHRhcmdldHMubGVuZ3RoIDwgMikge1xuXG4gICAgICAgICAgICAgICAgICAgIHAgPSBhbGwodW50b2dnbGVkLmNvbmNhdCh0b2dnbGVkKSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5ID0gZG9jLmJvZHksXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gdG9nZ2xlZFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvZ3Jlc3MgPSBBbmltYXRpb24uaW5Qcm9ncmVzcyhlbCkgJiYgaGFzQ2xhc3MoZWwsICd1ay1hbmltYXRpb24tbGVhdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IFRyYW5zaXRpb24uaW5Qcm9ncmVzcyhlbCkgJiYgZWwuc3R5bGUuaGVpZ2h0ID09PSAnMHB4JztcblxuICAgICAgICAgICAgICAgICAgICBwID0gYWxsKHRvZ2dsZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBhbGwodW50b2dnbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LnNjcm9sbFRvcCA9IHNjcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwLnRoZW4ocmVzb2x2ZSwgbm9vcCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZU5vdzogZnVuY3Rpb24gdG9nZ2xlTm93KHRhcmdldHMsIHNob3cpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIFByb21pc2UuYWxsKHRvTm9kZXModGFyZ2V0cykubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdGhpcyQxLl90b2dnbGVFbGVtZW50KGVsLCBzaG93LCBmYWxzZSk7IH0pKS50aGVuKHJlc29sdmUsIG5vb3ApOyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1RvZ2dsZWQ6IGZ1bmN0aW9uIGlzVG9nZ2xlZChlbCkge1xuICAgICAgICAgICAgdmFyIG5vZGVzID0gdG9Ob2RlcyhlbCB8fCB0aGlzLiRlbCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbHNcbiAgICAgICAgICAgICAgICA/IGhhc0NsYXNzKG5vZGVzLCB0aGlzLmNscy5zcGxpdCgnICcpWzBdKVxuICAgICAgICAgICAgICAgIDogIWhhc0F0dHIobm9kZXMsICdoaWRkZW4nKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVBcmlhOiBmdW5jdGlvbiB1cGRhdGVBcmlhKGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXR0cihlbCwgJ2FyaWEtaGlkZGVuJywgIXRoaXMuaXNUb2dnbGVkKGVsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZUVsZW1lbnQ6IGZ1bmN0aW9uIF90b2dnbGVFbGVtZW50KGVsLCBzaG93LCBhbmltYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBzaG93ID0gaXNCb29sZWFuKHNob3cpXG4gICAgICAgICAgICAgICAgPyBzaG93XG4gICAgICAgICAgICAgICAgOiBBbmltYXRpb24uaW5Qcm9ncmVzcyhlbClcbiAgICAgICAgICAgICAgICAgICAgPyBoYXNDbGFzcyhlbCwgJ3VrLWFuaW1hdGlvbi1sZWF2ZScpXG4gICAgICAgICAgICAgICAgICAgIDogVHJhbnNpdGlvbi5pblByb2dyZXNzKGVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBlbC5zdHlsZS5oZWlnaHQgPT09ICcwcHgnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICF0aGlzLmlzVG9nZ2xlZChlbCk7XG5cbiAgICAgICAgICAgIGlmICghdHJpZ2dlcihlbCwgKFwiYmVmb3JlXCIgKyAoc2hvdyA/ICdzaG93JyA6ICdoaWRlJykpLCBbdGhpc10pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gKGFuaW1hdGUgPT09IGZhbHNlIHx8ICF0aGlzLmhhc0FuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX3RvZ2dsZUltbWVkaWF0ZVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaGFzVHJhbnNpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLl90b2dnbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5fdG9nZ2xlQW5pbWF0aW9uXG4gICAgICAgICAgICApKGVsLCBzaG93KTtcblxuICAgICAgICAgICAgdHJpZ2dlcihlbCwgc2hvdyA/ICdzaG93JyA6ICdoaWRlJywgW3RoaXNdKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcihlbCwgc2hvdyA/ICdzaG93bicgOiAnaGlkZGVuJywgW3RoaXMkMV0pO1xuICAgICAgICAgICAgICAgIFVJa2l0JDIudXBkYXRlKG51bGwsIGVsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90b2dnbGU6IGZ1bmN0aW9uIF90b2dnbGUoZWwsIHRvZ2dsZWQpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xzKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMuY2xzLCBpbmNsdWRlcyh0aGlzLmNscywgJyAnKSA/IHVuZGVmaW5lZCA6IHRvZ2dsZWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdHRyKGVsLCAnaGlkZGVuJywgIXRvZ2dsZWQgPyAnJyA6IG51bGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkJCgnW2F1dG9mb2N1c10nLCBlbCkuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGlzVmlzaWJsZShlbCkgJiYgKGVsLmZvY3VzKCkgfHwgdHJ1ZSk7IH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFyaWEoZWwpO1xuICAgICAgICAgICAgVUlraXQkMi51cGRhdGUobnVsbCwgZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF90b2dnbGVJbW1lZGlhdGU6IGZ1bmN0aW9uIF90b2dnbGVJbW1lZGlhdGUoZWwsIHNob3cpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvZ2dsZShlbCwgc2hvdyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3RvZ2dsZUhlaWdodDogZnVuY3Rpb24gX3RvZ2dsZUhlaWdodChlbCwgc2hvdykge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdmFyIGluUHJvZ3Jlc3MgPSBUcmFuc2l0aW9uLmluUHJvZ3Jlc3MoZWwpLFxuICAgICAgICAgICAgICAgIGlubmVyID0gZWwuaGFzQ2hpbGROb2RlcyA/IHRvRmxvYXQoY3NzKGVsLmZpcnN0RWxlbWVudENoaWxkLCAnbWFyZ2luVG9wJykpICsgdG9GbG9hdChjc3MoZWwubGFzdEVsZW1lbnRDaGlsZCwgJ21hcmdpbkJvdHRvbScpKSA6IDAsXG4gICAgICAgICAgICAgICAgY3VycmVudEhlaWdodCA9IGlzVmlzaWJsZShlbCkgPyBoZWlnaHQoZWwpICsgKGluUHJvZ3Jlc3MgPyAwIDogaW5uZXIpIDogMCxcbiAgICAgICAgICAgICAgICBlbmRIZWlnaHQ7XG5cbiAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKGVsKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVG9nZ2xlZChlbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGUoZWwsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWlnaHQoZWwsICcnKTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGNoaWxkIGNvbXBvbmVudHMgZmlyc3RcbiAgICAgICAgICAgIGZhc3Rkb20uZmx1c2goKTtcblxuICAgICAgICAgICAgZW5kSGVpZ2h0ID0gaGVpZ2h0KGVsKSArIChpblByb2dyZXNzID8gMCA6IGlubmVyKTtcbiAgICAgICAgICAgIGhlaWdodChlbCwgY3VycmVudEhlaWdodCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoc2hvd1xuICAgICAgICAgICAgICAgID8gVHJhbnNpdGlvbi5zdGFydChlbCwgYXNzaWduKHt9LCB0aGlzLmluaXRQcm9wcywge292ZXJmbG93OiAnaGlkZGVuJywgaGVpZ2h0OiBlbmRIZWlnaHR9KSwgTWF0aC5yb3VuZCh0aGlzLmR1cmF0aW9uICogKDEgLSBjdXJyZW50SGVpZ2h0IC8gZW5kSGVpZ2h0KSksIHRoaXMudHJhbnNpdGlvbilcbiAgICAgICAgICAgICAgICA6IFRyYW5zaXRpb24uc3RhcnQoZWwsIHRoaXMuaGlkZVByb3BzLCBNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24gKiAoY3VycmVudEhlaWdodCAvIGVuZEhlaWdodCkpLCB0aGlzLnRyYW5zaXRpb24pLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl90b2dnbGUoZWwsIGZhbHNlKTsgfSlcbiAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBjc3MoZWwsIHRoaXMkMS5pbml0UHJvcHMpOyB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIF90b2dnbGVBbmltYXRpb246IGZ1bmN0aW9uIF90b2dnbGVBbmltYXRpb24oZWwsIHNob3cpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIEFuaW1hdGlvbi5jYW5jZWwoZWwpO1xuXG4gICAgICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZShlbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFuaW1hdGlvbi5pbihlbCwgdGhpcy5hbmltYXRpb25bMF0sIHRoaXMuZHVyYXRpb24sIHRoaXMub3JpZ2luKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIEFuaW1hdGlvbi5vdXQoZWwsIHRoaXMuYW5pbWF0aW9uWzFdIHx8IHRoaXMuYW5pbWF0aW9uWzBdLCB0aGlzLmR1cmF0aW9uLCB0aGlzLm9yaWdpbikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuX3RvZ2dsZShlbCwgZmFsc2UpOyB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG52YXIgYWN0aXZlO1xuXG52YXIgTW9kYWwgPSB7XG5cbiAgICBtaXhpbnM6IFtDbGFzcywgQ29udGFpbmVyLCBUb2dnbGFibGVdLFxuXG4gICAgcHJvcHM6IHtcbiAgICAgICAgY2xzUGFuZWw6IFN0cmluZyxcbiAgICAgICAgc2VsQ2xvc2U6IFN0cmluZyxcbiAgICAgICAgZXNjQ2xvc2U6IEJvb2xlYW4sXG4gICAgICAgIGJnQ2xvc2U6IEJvb2xlYW4sXG4gICAgICAgIHN0YWNrOiBCb29sZWFuXG4gICAgfSxcblxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGNsczogJ3VrLW9wZW4nLFxuICAgICAgICBlc2NDbG9zZTogdHJ1ZSxcbiAgICAgICAgYmdDbG9zZTogdHJ1ZSxcbiAgICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgc3RhY2s6IGZhbHNlXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgcGFuZWw6IGZ1bmN0aW9uIHBhbmVsKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICB2YXIgY2xzUGFuZWwgPSByZWYuY2xzUGFuZWw7XG5cbiAgICAgICAgICAgIHJldHVybiAkJDEoKFwiLlwiICsgY2xzUGFuZWwpLCAkZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zaXRpb25FbGVtZW50OiBmdW5jdGlvbiB0cmFuc2l0aW9uRWxlbWVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVsO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogZnVuY3Rpb24gdHJhbnNpdGlvbkR1cmF0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvTXMoY3NzKHRoaXMudHJhbnNpdGlvbkVsZW1lbnQsICd0cmFuc2l0aW9uRHVyYXRpb24nKSk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBldmVudHM6IFtcblxuICAgICAgICB7XG5cbiAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxDbG9zZTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHtcblxuICAgICAgICAgICAgbmFtZTogJ3RvZ2dsZScsXG5cbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB7XG5cbiAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgIGlmICghaGFzQ2xhc3MoZG9jRWwsIHRoaXMuY2xzUGFnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHdpZHRoKHdpbikgLSBkb2NFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgY3NzKGRvYy5ib2R5LCAnb3ZlcmZsb3dZJywgdGhpcy5zY3JvbGxiYXJXaWR0aCAmJiB0aGlzLm92ZXJsYXkgPyAnc2Nyb2xsJyA6ICcnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAge1xuXG4gICAgICAgICAgICBuYW1lOiAnaGlkZGVuJyxcblxuICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kLCBwcmV2ID0gdGhpcy5wcmV2O1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKHByZXYpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldi5jbHNQYWdlID09PSB0aGlzJDEuY2xzUGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcHJldi5wcmV2O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICF0aGlzLnByZXYgJiYgY3NzKGRvYy5ib2R5LCAnb3ZlcmZsb3dZJywgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIF0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLiRlbC5wYXJlbnROb2RlICE9PSB0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGFwcGVuZCh0aGlzLmNvbnRhaW5lciwgdGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxDb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZXYgPSBhY3RpdmUgJiYgYWN0aXZlICE9PSB0aGlzICYmIGFjdGl2ZTtcblxuICAgICAgICAgICAgYWN0aXZlID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYuaGlkZSgpLnRoZW4odGhpcy5zaG93KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVnaXN0ZXJFdmVudHMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlTm93KHRoaXMuJGVsLCB0cnVlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFjdGl2ZSA9IGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMgJiYgYWN0aXZlIHx8IHRoaXMucHJldjtcblxuICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvZ2dsZU5vdyh0aGlzLiRlbCwgZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEFjdGl2ZTogZnVuY3Rpb24gZ2V0QWN0aXZlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBfdG9nZ2xlSW1tZWRpYXRlOiBmdW5jdGlvbiBfdG9nZ2xlSW1tZWRpYXRlKGVsLCBzaG93KSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLl90b2dnbGUoZWwsIHNob3cpOyB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgPyBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gb25jZSh0aGlzJDEudHJhbnNpdGlvbkVsZW1lbnQsIHRyYW5zaXRpb25lbmQsIHJlc29sdmUsIGZhbHNlLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS50YXJnZXQgPT09IHRoaXMkMS50cmFuc2l0aW9uRWxlbWVudDsgfSk7IH0pXG4gICAgICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICB9LFxuICAgIH1cblxufTtcblxudmFyIGV2ZW50cztcblxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudHMoKSB7XG5cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudHMgPSBbXG4gICAgICAgIG9uKGRvYywgJ2NsaWNrJywgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFByZXZlbnRlZCA9IHJlZi5kZWZhdWx0UHJldmVudGVkO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlICYmIGFjdGl2ZS5iZ0Nsb3NlICYmICFkZWZhdWx0UHJldmVudGVkICYmICF3aXRoaW4odGFyZ2V0LCBhY3RpdmUucGFuZWwpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG9uKGRvYywgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgYWN0aXZlICYmIGFjdGl2ZS5lc2NDbG9zZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIGRlcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgZXZlbnRzICYmIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh1bmJpbmQpIHsgcmV0dXJuIHVuYmluZCgpOyB9KTtcbiAgICBldmVudHMgPSBudWxsO1xufVxuXG52YXIgUG9zaXRpb24gPSB7XG5cbiAgICBwcm9wczoge1xuICAgICAgICBwb3M6IFN0cmluZyxcbiAgICAgICAgb2Zmc2V0OiBudWxsLFxuICAgICAgICBmbGlwOiBCb29sZWFuLFxuICAgICAgICBjbHNQb3M6IFN0cmluZ1xuICAgIH0sXG5cbiAgICBkZWZhdWx0czoge1xuICAgICAgICBwb3M6IChcImJvdHRvbS1cIiArICghaXNSdGwgPyAnbGVmdCcgOiAncmlnaHQnKSksXG4gICAgICAgIGZsaXA6IHRydWUsXG4gICAgICAgIG9mZnNldDogZmFsc2UsXG4gICAgICAgIGNsc1BvczogJydcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBwb3M6IGZ1bmN0aW9uIHBvcyhyZWYpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSByZWYucG9zO1xuXG4gICAgICAgICAgICByZXR1cm4gKHBvcyArICghaW5jbHVkZXMocG9zLCAnLScpID8gJy1jZW50ZXInIDogJycpKS5zcGxpdCgnLScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpcjogZnVuY3Rpb24gZGlyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9zWzBdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFsaWduOiBmdW5jdGlvbiBhbGlnbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvc1sxXTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBwb3NpdGlvbkF0OiBmdW5jdGlvbiBwb3NpdGlvbkF0JDEoZWxlbWVudCwgdGFyZ2V0LCBib3VuZGFyeSkge1xuXG4gICAgICAgICAgICByZW1vdmVDbGFzc2VzKGVsZW1lbnQsICgodGhpcy5jbHNQb3MpICsgXCItKHRvcHxib3R0b218bGVmdHxyaWdodCkoLVthLXpdKyk/XCIpKTtcbiAgICAgICAgICAgIGNzcyhlbGVtZW50LCB7dG9wOiAnJywgbGVmdDogJyd9KTtcblxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRvTnVtYmVyKHRoaXMub2Zmc2V0KSB8fCAwLFxuICAgICAgICAgICAgICAgIGF4aXMgPSB0aGlzLmdldEF4aXMoKTtcbiAgICAgICAgICAgIHZhciByZWYgPSBwb3NpdGlvbkF0KFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgPT09ICd4JyA/ICgoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkgKyBcIiBcIiArICh0aGlzLmFsaWduKSkgOiAoKHRoaXMuYWxpZ24pICsgXCIgXCIgKyAoZmxpcFBvc2l0aW9uKHRoaXMuZGlyKSkpLFxuICAgICAgICAgICAgICAgICAgICBheGlzID09PSAneCcgPyAoKHRoaXMuZGlyKSArIFwiIFwiICsgKHRoaXMuYWxpZ24pKSA6ICgodGhpcy5hbGlnbikgKyBcIiBcIiArICh0aGlzLmRpcikpLFxuICAgICAgICAgICAgICAgICAgICBheGlzID09PSAneCcgPyAoXCJcIiArICh0aGlzLmRpciA9PT0gJ2xlZnQnID8gLTEgKiBvZmZzZXQgOiBvZmZzZXQpKSA6IChcIiBcIiArICh0aGlzLmRpciA9PT0gJ3RvcCcgPyAtMSAqIG9mZnNldCA6IG9mZnNldCkpLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaXAsXG4gICAgICAgICAgICAgICAgICAgIGJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgKS50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgeCA9IHJlZi54O1xuICAgICAgICAgICAgdmFyIHkgPSByZWYueTtcblxuICAgICAgICAgICAgdGhpcy5kaXIgPSBheGlzID09PSAneCcgPyB4IDogeTtcbiAgICAgICAgICAgIHRoaXMuYWxpZ24gPSBheGlzID09PSAneCcgPyB5IDogeDtcblxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWxlbWVudCwgKCh0aGlzLmNsc1BvcykgKyBcIi1cIiArICh0aGlzLmRpcikgKyBcIi1cIiArICh0aGlzLmFsaWduKSksIHRoaXMub2Zmc2V0ID09PSBmYWxzZSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRBeGlzOiBmdW5jdGlvbiBnZXRBeGlzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyID09PSAndG9wJyB8fCB0aGlzLmRpciA9PT0gJ2JvdHRvbScgPyAneScgOiAneCc7XG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxudmFyIG1peGluID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5taXhpbi5jbGFzcyA9IENsYXNzO1xuICAgIFVJa2l0Lm1peGluLmNvbnRhaW5lciA9IENvbnRhaW5lcjtcbiAgICBVSWtpdC5taXhpbi5tb2RhbCA9IE1vZGFsO1xuICAgIFVJa2l0Lm1peGluLnBvc2l0aW9uID0gUG9zaXRpb247XG4gICAgVUlraXQubWl4aW4udG9nZ2xhYmxlID0gVG9nZ2xhYmxlO1xuXG59O1xuXG52YXIgQWNjb3JkaW9uID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2FjY29yZGlvbicsIHtcblxuICAgICAgICBtaXhpbnM6IFtDbGFzcywgVG9nZ2xhYmxlXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGFyZ2V0czogU3RyaW5nLFxuICAgICAgICAgICAgYWN0aXZlOiBudWxsLFxuICAgICAgICAgICAgY29sbGFwc2libGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICAgICAgICAgIHRvZ2dsZTogU3RyaW5nLFxuICAgICAgICAgICAgY29udGVudDogU3RyaW5nLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldHM6ICc+IConLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogW3RydWVdLFxuICAgICAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXG4gICAgICAgICAgICBjbHNPcGVuOiAndWstb3BlbicsXG4gICAgICAgICAgICB0b2dnbGU6ICc+IC51ay1hY2NvcmRpb24tdGl0bGUnLFxuICAgICAgICAgICAgY29udGVudDogJz4gLnVrLWFjY29yZGlvbi1jb250ZW50JyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdlYXNlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRzID0gcmVmLnRhcmdldHM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGFyZ2V0cywgJGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy50YXJnZXRzKSArIFwiIFwiICsgKHRoaXMuJHByb3BzLnRvZ2dsZSkpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShpbmRleCgkJCgoKHRoaXMudGFyZ2V0cykgKyBcIiBcIiArICh0aGlzLiRwcm9wcy50b2dnbGUpKSwgdGhpcy4kZWwpLCBlLmN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmFjdGl2ZSAhPT0gZmFsc2UgJiYgdGhpcy5pdGVtc1tOdW1iZXIodGhpcy5hY3RpdmUpXSAmJiAhaGFzQ2xhc3MoYWN0aXZlLCB0aGlzLmNsc09wZW4pO1xuICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKGFjdGl2ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gdGhpcyQxLnRvZ2dsZU5vdygkJDEodGhpcyQxLmNvbnRlbnQsIGVsKSwgaGFzQ2xhc3MoZWwsIHRoaXMkMS5jbHNPcGVuKSk7IH0pO1xuXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gIXRoaXMuY29sbGFwc2libGUgJiYgIWhhc0NsYXNzKHRoaXMuaXRlbXMsIHRoaXMuY2xzT3BlbikgJiYgdGhpcy5pdGVtc1swXTtcbiAgICAgICAgICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShhY3RpdmUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHRvZ2dsZTogZnVuY3Rpb24gdG9nZ2xlKGl0ZW0sIGFuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoaXRlbSwgdGhpcy5pdGVtcyksXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZpbHRlcih0aGlzLml0ZW1zLCAoXCIuXCIgKyAodGhpcy5jbHNPcGVuKSkpO1xuXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaXRlbSAmJiBbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgLmNvbmNhdCghdGhpcy5tdWx0aXBsZSAmJiAhaW5jbHVkZXMoYWN0aXZlLCBpdGVtKSAmJiBhY3RpdmUgfHwgW10pXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNJdGVtID0gZWwgPT09IGl0ZW0sIHN0YXRlID0gaXNJdGVtICYmICFoYXNDbGFzcyhlbCwgdGhpcyQxLmNsc09wZW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlICYmIGlzSXRlbSAmJiAhdGhpcyQxLmNvbGxhcHNpYmxlICYmIGFjdGl2ZS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbCwgdGhpcyQxLmNsc09wZW4sIHN0YXRlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBlbC5fd3JhcHBlciA/IGVsLl93cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkIDogJCQxKHRoaXMkMS5jb250ZW50LCBlbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWwuX3dyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5fd3JhcHBlciA9IHdyYXBBbGwoY29udGVudCwgJzxkaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cihlbC5fd3JhcHBlciwgJ2hpZGRlbicsIHN0YXRlID8gJycgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl90b2dnbGVJbW1lZGlhdGUoY29udGVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlRWxlbWVudChlbC5fd3JhcHBlciwgc3RhdGUsIGFuaW1hdGUpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyhlbCwgdGhpcyQxLmNsc09wZW4pID09PSBzdGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5fdG9nZ2xlSW1tZWRpYXRlKGNvbnRlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLl93cmFwcGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW53cmFwKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgQWxlcnQgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnYWxlcnQnLCB7XG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3MsIFRvZ2dsYWJsZV0sXG5cbiAgICAgICAgYXJnczogJ2FuaW1hdGlvbicsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNsb3NlOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBbdHJ1ZV0sXG4gICAgICAgICAgICBzZWxDbG9zZTogJy51ay1hbGVydC1jbG9zZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwLFxuICAgICAgICAgICAgaGlkZVByb3BzOiBhc3NpZ24oe29wYWNpdHk6IDB9LCBUb2dnbGFibGUuZGVmYXVsdHMuaGlkZVByb3BzKVxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxDbG9zZTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy4kZWwpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLiRkZXN0cm95KHRydWUpOyB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxudmFyIENvdmVyID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2NvdmVyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzLCBVSWtpdC5jb21wb25lbnRzLnZpZGVvLm9wdGlvbnNdLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB3aWR0aDogTnVtYmVyLFxuICAgICAgICAgICAgaGVpZ2h0OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgYXV0b211dGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpcy4kZWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzVmlzaWJsZShlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZWYgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZi5vZmZzZXRXaWR0aDtcblxuICAgICAgICAgICAgICAgIGNzcyhcbiAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCB7d2lkdGg6ICcnLCBoZWlnaHQ6ICcnfSksXG4gICAgICAgICAgICAgICAgICAgIERpbWVuc2lvbnMuY292ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggfHwgZWwuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCB8fCBlbC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoICsgKHdpZHRoICUgMiA/IDEgOiAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCArIChoZWlnaHQgJSAyID8gMSA6IDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiB7XG5cbiAgICAgICAgICAgIGxvYWRlZG1ldGFkYXRhOiBmdW5jdGlvbiBsb2FkZWRtZXRhZGF0YSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBEcm9wID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgYWN0aXZlO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdkcm9wJywge1xuXG4gICAgICAgIG1peGluczogW1Bvc2l0aW9uLCBUb2dnbGFibGVdLFxuXG4gICAgICAgIGFyZ3M6ICdwb3MnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBtb2RlOiAnbGlzdCcsXG4gICAgICAgICAgICB0b2dnbGU6IEJvb2xlYW4sXG4gICAgICAgICAgICBib3VuZGFyeTogJ3F1ZXJ5JyxcbiAgICAgICAgICAgIGJvdW5kYXJ5QWxpZ246IEJvb2xlYW4sXG4gICAgICAgICAgICBkZWxheVNob3c6IE51bWJlcixcbiAgICAgICAgICAgIGRlbGF5SGlkZTogTnVtYmVyLFxuICAgICAgICAgICAgY2xzRHJvcDogU3RyaW5nXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIG1vZGU6IFsnY2xpY2snLCAnaG92ZXInXSxcbiAgICAgICAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgICAgICAgIGJvdW5kYXJ5OiB3aW4sXG4gICAgICAgICAgICBib3VuZGFyeUFsaWduOiBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5U2hvdzogMCxcbiAgICAgICAgICAgIGRlbGF5SGlkZTogODAwLFxuICAgICAgICAgICAgY2xzRHJvcDogZmFsc2UsXG4gICAgICAgICAgICBob3ZlcklkbGU6IDIwMCxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogWyd1ay1hbmltYXRpb24tZmFkZSddLFxuICAgICAgICAgICAgY2xzOiAndWstb3BlbidcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy50cmFja2VyID0gbmV3IE1vdXNlVHJhY2tlcigpO1xuICAgICAgICAgICAgdGhpcy5jbHNEcm9wID0gdGhpcy5jbHNEcm9wIHx8IChcInVrLVwiICsgKHRoaXMuJG9wdGlvbnMubmFtZSkpO1xuICAgICAgICAgICAgdGhpcy5jbHNQb3MgPSB0aGlzLmNsc0Ryb3A7XG5cbiAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0Ryb3ApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVBcmlhKHRoaXMuJGVsKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudG9nZ2xlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSBVSWtpdC50b2dnbGUoaXNTdHJpbmcodGhpcy50b2dnbGUpID8gcXVlcnkodGhpcy50b2dnbGUsIHRoaXMuJGVsKSA6IHRoaXMuJGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcsIHt0YXJnZXQ6IHRoaXMuJGVsLCBtb2RlOiB0aGlzLm1vZGV9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiLlwiICsgKHRoaXMuY2xzRHJvcCkgKyBcIi1jbG9zZVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYVtocmVmXj1cIiNcIl0nO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBlLnRhcmdldC5oYXNoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghaWQgfHwgIXdpdGhpbihpZCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3Jlc2Nyb2xsJyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAndG9nZ2xlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHRvZ2dsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0b2dnbGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogcG9pbnRlckVudGVyLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlcyh0aGlzLm1vZGUsICdob3ZlcicpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgYWN0aXZlICE9PSB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBhY3RpdmUudG9nZ2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBpbmNsdWRlcyhhY3RpdmUudG9nZ2xlLm1vZGUsICdob3ZlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAhd2l0aGluKGUudGFyZ2V0LCBhY3RpdmUudG9nZ2xlLiRlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICFwb2ludEluUmVjdCh7eDogZS5wYWdlWCwgeTogZS5wYWdlWX0sIG9mZnNldChhY3RpdmUuJGVsKSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLnRvZ2dsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAndG9nZ2xlc2hvdycsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHRvZ2dsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGUgJiYgIWluY2x1ZGVzKHRvZ2dsZS50YXJnZXQsIHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3codG9nZ2xlIHx8IHRoaXMudG9nZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IChcInRvZ2dsZWhpZGUgXCIgKyBwb2ludGVyTGVhdmUpLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlLCB0b2dnbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaChlKSB8fCB0b2dnbGUgJiYgIWluY2x1ZGVzKHRvZ2dsZS50YXJnZXQsIHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvZ2dsZSAmJiBpbmNsdWRlcyh0aGlzLnRvZ2dsZS5tb2RlLCAnaG92ZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja2VyLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy50b2dnbGUuJGVsLCB0aGlzLmNscyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHIodGhpcy50b2dnbGUuJGVsLCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyRXZlbnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVoaWRlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRlbCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBhY3RpdmUgPT09IG51bGwgJiYgd2l0aGluKHRhcmdldCwgdGhpcy4kZWwpICYmIHRoaXMuaXNUb2dnbGVkKCkgPyB0aGlzIDogYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdGhpcy5pc0FjdGl2ZSgpID8gbnVsbCA6IGFjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy50b2dnbGUuJGVsLCB0aGlzLmNscyk7XG4gICAgICAgICAgICAgICAgICAgIGF0dHIodGhpcy50b2dnbGUuJGVsLCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZS4kZWwuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAkJCgnYSwgYnV0dG9uJywgdGhpcy50b2dnbGUuJGVsKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuYmx1cigpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja2VyLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVG9nZ2xlZCgpICYmICFBbmltYXRpb24uaW5Qcm9ncmVzcyh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3codG9nZ2xlLCBkZWxheSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICggZGVsYXkgPT09IHZvaWQgMCApIGRlbGF5ID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMkMS5pc1RvZ2dsZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS50b2dnbGVFbGVtZW50KHRoaXMkMS4kZWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0cnlTaG93ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlID0gdG9nZ2xlIHx8IHRoaXMkMS50b2dnbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5jbGVhclRpbWVycygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRlbGF5ICYmIGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMkMSAmJiBhY3RpdmUuaXNEZWxheWluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zaG93VGltZXIgPSBzZXRUaW1lb3V0KHRoaXMkMS5zaG93LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzJDEuaXNQYXJlbnRPZihhY3RpdmUpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlLmhpZGVUaW1lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmUgJiYgIXRoaXMkMS5pc0NoaWxkT2YoYWN0aXZlKSAmJiAhdGhpcyQxLmlzUGFyZW50T2YoYWN0aXZlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZSAmJiBhY3RpdmUgIT09IHByZXYgJiYgIXRoaXMkMS5pc0NoaWxkT2YoYWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gYWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWxheSAmJiB0aGlzJDEuZGVsYXlTaG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNob3dUaW1lciA9IHNldFRpbWVvdXQoc2hvdywgdGhpcyQxLmRlbGF5U2hvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdGhpcyQxO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvZ2dsZSAmJiB0aGlzLnRvZ2dsZSAmJiAgdG9nZ2xlLiRlbCAhPT0gdGhpcy50b2dnbGUuJGVsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb25jZSh0aGlzLiRlbCwgJ2hpZGUnLCB0cnlTaG93KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeVNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKCBkZWxheSA9PT0gdm9pZCAwICkgZGVsYXkgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS50b2dnbGVOb3codGhpcyQxLiRlbCwgZmFsc2UpOyB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0RlbGF5aW5nID0gdGhpcy50cmFja2VyLm1vdmVzVG8odGhpcy4kZWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRlbGF5ICYmIHRoaXMuaXNEZWxheWluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUaW1lciA9IHNldFRpbWVvdXQodGhpcy5oaWRlLCB0aGlzLmhvdmVySWRsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkZWxheSAmJiB0aGlzLmRlbGF5SGlkZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVUaW1lciA9IHNldFRpbWVvdXQoaGlkZSwgdGhpcy5kZWxheUhpZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbGVhclRpbWVyczogZnVuY3Rpb24gY2xlYXJUaW1lcnMoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVyKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVUaW1lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0RlbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZSA9PT0gdGhpcztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGlzQ2hpbGRPZjogZnVuY3Rpb24gaXNDaGlsZE9mKGRyb3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHJvcCAmJiBkcm9wICE9PSB0aGlzICYmIHdpdGhpbih0aGlzLiRlbCwgZHJvcC4kZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaXNQYXJlbnRPZjogZnVuY3Rpb24gaXNQYXJlbnRPZihkcm9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRyb3AgJiYgZHJvcCAhPT0gdGhpcyAmJiB3aXRoaW4oZHJvcC4kZWwsIHRoaXMuJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBvc2l0aW9uOiBmdW5jdGlvbiBwb3NpdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzZXModGhpcy4kZWwsICgodGhpcy5jbHNEcm9wKSArIFwiLShzdGFja3xib3VuZGFyeSlcIikpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge3RvcDogJycsIGxlZnQ6ICcnLCBkaXNwbGF5OiAnYmxvY2snfSk7XG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy4kZWwsICgodGhpcy5jbHNEcm9wKSArIFwiLWJvdW5kYXJ5XCIpLCB0aGlzLmJvdW5kYXJ5QWxpZ24pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJvdW5kYXJ5ID0gb2Zmc2V0KHRoaXMuYm91bmRhcnkpLFxuICAgICAgICAgICAgICAgICAgICBhbGlnblRvID0gdGhpcy5ib3VuZGFyeUFsaWduID8gYm91bmRhcnkgOiBvZmZzZXQodGhpcy50b2dnbGUuJGVsKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFsaWduID09PSAnanVzdGlmeScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLmdldEF4aXMoKSA9PT0gJ3knID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHByb3AsIGFsaWduVG9bcHJvcF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy4kZWwub2Zmc2V0V2lkdGggPiBNYXRoLm1heChib3VuZGFyeS5yaWdodCAtIGFsaWduVG8ubGVmdCwgYWxpZ25Uby5yaWdodCAtIGJvdW5kYXJ5LmxlZnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAoKHRoaXMuY2xzRHJvcCkgKyBcIi1zdGFja1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdzdGFjaycsIFt0aGlzXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbkF0KHRoaXMuJGVsLCB0aGlzLmJvdW5kYXJ5QWxpZ24gPyB0aGlzLmJvdW5kYXJ5IDogdGhpcy50b2dnbGUuJGVsLCB0aGlzLmJvdW5kYXJ5KTtcblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0LmRyb3AuZ2V0QWN0aXZlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gYWN0aXZlOyB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyZWQ7XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlckV2ZW50KCkge1xuXG4gICAgICAgIGlmIChyZWdpc3RlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgb24oZG9jLCAnY2xpY2snLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0UHJldmVudGVkID0gcmVmLmRlZmF1bHRQcmV2ZW50ZWQ7XG5cbiAgICAgICAgICAgIHZhciBwcmV2O1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGFjdGl2ZSAmJiBhY3RpdmUgIT09IHByZXYgJiYgIXdpdGhpbih0YXJnZXQsIGFjdGl2ZS4kZWwpICYmICEoYWN0aXZlLnRvZ2dsZSAmJiB3aXRoaW4odGFyZ2V0LCBhY3RpdmUudG9nZ2xlLiRlbCkpKSB7XG4gICAgICAgICAgICAgICAgcHJldiA9IGFjdGl2ZTtcbiAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcblxudmFyIERyb3Bkb3duID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2Ryb3Bkb3duJywgVUlraXQuY29tcG9uZW50cy5kcm9wLmV4dGVuZCh7bmFtZTogJ2Ryb3Bkb3duJ30pKTtcblxufTtcblxudmFyIEZvcm1DdXN0b20gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZm9ybS1jdXN0b20nLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIGFyZ3M6ICd0YXJnZXQnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IEJvb2xlYW5cbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdGFyZ2V0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGlucHV0OiBmdW5jdGlvbiBpbnB1dChfLCAkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCQxKHNlbElucHV0LCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RhdGU6IGZ1bmN0aW9uIHN0YXRlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24gdGFyZ2V0KHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ICYmICh0YXJnZXQgPT09IHRydWVcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5pbnB1dC5wYXJlbnROb2RlID09PSAkZWxcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5pbnB1dC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgfHwgcXVlcnkodGFyZ2V0LCAkZWwpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgdHJpZ2dlcih0aGlzLmlucHV0LCAnY2hhbmdlJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdmb2N1c2luIGZvY3Vzb3V0IG1vdXNlZW50ZXIgbW91c2VsZWF2ZScsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogc2VsSW5wdXQsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJlZi5jdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcInVrLVwiICsgKGluY2x1ZGVzKHR5cGUsICdmb2N1cycpID8gJ2ZvY3VzJyA6ICdob3ZlcicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlcyhbJ2ZvY3VzaW4nLCAnbW91c2VlbnRlciddLCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NoYW5nZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCwgaW5wdXQgPSB0aGlzLmlucHV0LCBvcHRpb247XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpc0lucHV0KHRhcmdldCkgPyAndmFsdWUnIDogJ3RleHRDb250ZW50J10gPSBpbnB1dC5maWxlcyAmJiBpbnB1dC5maWxlc1swXVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBpbnB1dC5maWxlc1swXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG1hdGNoZXMoaW5wdXQsICdzZWxlY3QnKSAmJiAob3B0aW9uID0gJCQoJ29wdGlvbicsIGlucHV0KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5zZWxlY3RlZDsgfSlbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcHRpb24udGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgR2lmID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2dpZicsIHtcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcblxuICAgICAgICAgICAgICAgIHZhciBpbnZpZXcgPSBpc0luVmlldyh0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNJblZpZXcgJiYgaW52aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsLnNyYyA9IHRoaXMuJGVsLnNyYztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzSW5WaWV3ID0gaW52aWV3O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgR3JpZCA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdncmlkJywgVUlraXQuY29tcG9uZW50cy5tYXJnaW4uZXh0ZW5kKHtcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgbmFtZTogJ2dyaWQnLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBtYXJnaW46ICd1ay1ncmlkLW1hcmdpbicsXG4gICAgICAgICAgICBjbHNTdGFjazogJ3VrLWdyaWQtc3RhY2snXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc1N0YWNrLCB0aGlzLnN0YWNrcyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG59O1xuXG52YXIgSGVpZ2h0TWF0Y2ggPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnaGVpZ2h0LW1hdGNoJywge1xuXG4gICAgICAgIGFyZ3M6ICd0YXJnZXQnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHJvdzogQm9vbGVhblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6ICc+IConLFxuICAgICAgICAgICAgcm93OiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgZWxlbWVudHM6IGZ1bmN0aW9uIGVsZW1lbnRzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGFyZ2V0LCAkZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBsYXN0T2Zmc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjc3ModGhpcy5lbGVtZW50cywgJ21pbkhlaWdodCcsICcnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93cyA9ICF0aGlzLnJvd1xuICAgICAgICAgICAgICAgICAgICA/IFt0aGlzLm1hdGNoKHRoaXMuZWxlbWVudHMpXVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChyb3dzLCBlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFzdE9mZnNldCAhPT0gZWwub2Zmc2V0VG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKFtlbF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzW3Jvd3MubGVuZ3RoIC0gMV0ucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RPZmZzZXQgPSBlbC5vZmZzZXRUb3A7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3dzO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIFtdKS5tYXAoZnVuY3Rpb24gKGVsZW1lbnRzKSB7IHJldHVybiB0aGlzJDEubWF0Y2goZWxlbWVudHMpOyB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IHJlZi5lbGVtZW50cztcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3NzKGVsZW1lbnRzLCAnbWluSGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKGVsZW1lbnRzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IDAsIGhlaWdodHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUsIGhpZGRlbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Zpc2libGUoZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBhdHRyKGVsLCAnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW4gPSBhdHRyKGVsLCAnaGlkZGVuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAoKHN0eWxlIHx8ICcnKSArIFwiO2Rpc3BsYXk6YmxvY2sgIWltcG9ydGFudDtcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIGVsLm9mZnNldEhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHRzLnB1c2goZWwub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzdHlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLCB7c3R5bGU6IHN0eWxlLCBoaWRkZW46IGhpZGRlbn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBlbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBoZWlnaHRzW2ldIDwgbWF4OyB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7aGVpZ2h0OiBtYXgsIGVsZW1lbnRzOiBlbGVtZW50c307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgSGVpZ2h0Vmlld3BvcnQgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnaGVpZ2h0LXZpZXdwb3J0Jywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBleHBhbmQ6IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXRUb3A6IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXRCb3R0b206IEJvb2xlYW4sXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IE51bWJlclxuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBleHBhbmQ6IGZhbHNlLFxuICAgICAgICAgICAgb2Zmc2V0VG9wOiBmYWxzZSxcbiAgICAgICAgICAgIG9mZnNldEJvdHRvbTogZmFsc2UsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDBcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnYm94U2l6aW5nJywgJ2JvcmRlci1ib3gnKTtcblxuICAgICAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9IGhlaWdodCh3aW4pLCBtaW5IZWlnaHQsIG9mZnNldFRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBhbmQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtoZWlnaHQ6ICcnLCBtaW5IZWlnaHQ6ICcnfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpZmYgPSB2aWV3cG9ydCAtIG9mZnNldEhlaWdodChkb2NFbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQgPSBvZmZzZXRIZWlnaHQodGhpcy4kZWwpICsgZGlmZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gb2Zmc2V0KHRoaXMuJGVsKS50b3A7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvcCA8IHZpZXdwb3J0IC8gMiAmJiB0aGlzLm9mZnNldFRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IHRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9mZnNldEJvdHRvbSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRUb3AgKz0gb2Zmc2V0SGVpZ2h0KHRoaXMuJGVsLm5leHRFbGVtZW50U2libGluZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc051bWVyaWModGhpcy5vZmZzZXRCb3R0b20pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSAodmlld3BvcnQgLyAxMDApICogdGhpcy5vZmZzZXRCb3R0b207XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9mZnNldEJvdHRvbSAmJiBlbmRzV2l0aCh0aGlzLm9mZnNldEJvdHRvbSwgJ3B4JykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IHRvRmxvYXQodGhpcy5vZmZzZXRCb3R0b20pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGhpcy5vZmZzZXRCb3R0b20pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFRvcCArPSBvZmZzZXRIZWlnaHQocXVlcnkodGhpcy5vZmZzZXRCb3R0b20sIHRoaXMuJGVsKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uIG1vYmlsZSBkZXZpY2VzIChpT1MgYW5kIEFuZHJvaWQpIHdpbmRvdy5pbm5lckhlaWdodCAhPT0gMTAwdmhcbiAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0ID0gb2Zmc2V0VG9wID8gKFwiY2FsYygxMDB2aCAtIFwiICsgb2Zmc2V0VG9wICsgXCJweClcIikgOiAnMTAwdmgnO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtaW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge2hlaWdodDogJycsIG1pbkhlaWdodDogbWluSGVpZ2h0fSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxIZWlnaHQgPSB0aGlzLiRlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWluSGVpZ2h0ICYmIHRoaXMubWluSGVpZ2h0ID4gZWxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWluSGVpZ2h0JywgdGhpcy5taW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElFIDEwLTExIGZpeCAobWluLWhlaWdodCBvbiBhIGZsZXggY29udGFpbmVyIHdvbid0IGFwcGx5IHRvIGl0cyBmbGV4IGl0ZW1zKVxuICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydCAtIG9mZnNldFRvcCA+PSBlbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdoZWlnaHQnLCBtaW5IZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9mZnNldEhlaWdodChlbCkge1xuICAgICAgICByZXR1cm4gZWwgJiYgZWwub2Zmc2V0SGVpZ2h0IHx8IDA7XG4gICAgfVxuXG59O1xuXG52YXIgSG92ZXIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoIWhhc1RvdWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2xzID0gJ3VrLWhvdmVyJztcblxuICAgICAgICBvbihkb2MsICd0YXAnLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQoKFwiLlwiICsgY2xzKSkuZm9yRWFjaChmdW5jdGlvbiAoXywgZWwpIHsgcmV0dXJuICF3aXRoaW4odGFyZ2V0LCBlbCkgJiYgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7IH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlraXQsICdob3ZlclNlbGVjdG9yJywge1xuXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIG9uKGRvYywgJ3RhcCcsIHNlbGVjdG9yLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFkZENsYXNzKGN1cnJlbnQsIGNscyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgVUlraXQuaG92ZXJTZWxlY3RvciA9ICcudWstYW5pbWF0aW9uLXRvZ2dsZSwgLnVrLXRyYW5zaXRpb24tdG9nZ2xlLCBbdWstaG92ZXJdJztcblxuICAgIH0pO1xuXG59O1xuXG52YXIgY2xvc2VJY29uID0gXCI8c3ZnIHdpZHRoPVxcXCIxNFxcXCIgaGVpZ2h0PVxcXCIxNFxcXCIgdmlld0JveD1cXFwiMCAwIDE0IDE0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjEzXFxcIiB5Mj1cXFwiMTNcXFwiPjwvbGluZT48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiB4MT1cXFwiMTNcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMVxcXCIgeTI9XFxcIjEzXFxcIj48L2xpbmU+PC9zdmc+XCI7XG5cbnZhciBjbG9zZUxhcmdlID0gXCI8c3ZnIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgdmlld0JveD1cXFwiMCAwIDIwIDIwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjE5XFxcIiB5Mj1cXFwiMTlcXFwiPjwvbGluZT48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS40XFxcIiB4MT1cXFwiMTlcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMVxcXCIgeTI9XFxcIjE5XFxcIj48L2xpbmU+PC9zdmc+XCI7XG5cbnZhciBtYXJrZXIgPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHJlY3QgeD1cXFwiOVxcXCIgeT1cXFwiNFxcXCIgd2lkdGg9XFxcIjFcXFwiIGhlaWdodD1cXFwiMTFcXFwiPjwvcmVjdD48cmVjdCB4PVxcXCI0XFxcIiB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiMTFcXFwiIGhlaWdodD1cXFwiMVxcXCI+PC9yZWN0Pjwvc3ZnPlwiO1xuXG52YXIgbmF2YmFyVG9nZ2xlSWNvbiA9IFwiPHN2ZyB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHZpZXdCb3g9XFxcIjAgMCAyMCAyMFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cmVjdCB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMlxcXCI+PC9yZWN0PjxyZWN0IHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyXFxcIj48L3JlY3Q+PHJlY3QgeT1cXFwiMTVcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyXFxcIj48L3JlY3Q+PC9zdmc+XCI7XG5cbnZhciBvdmVybGF5SWNvbiA9IFwiPHN2ZyB3aWR0aD1cXFwiNDBcXFwiIGhlaWdodD1cXFwiNDBcXFwiIHZpZXdCb3g9XFxcIjAgMCA0MCA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cmVjdCB4PVxcXCIxOVxcXCIgeT1cXFwiMFxcXCIgd2lkdGg9XFxcIjFcXFwiIGhlaWdodD1cXFwiNDBcXFwiPjwvcmVjdD48cmVjdCB4PVxcXCIwXFxcIiB5PVxcXCIxOVxcXCIgd2lkdGg9XFxcIjQwXFxcIiBoZWlnaHQ9XFxcIjFcXFwiPjwvcmVjdD48L3N2Zz5cIjtcblxudmFyIHBhZ2luYXRpb25OZXh0ID0gXCI8c3ZnIHdpZHRoPVxcXCI3XFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiB2aWV3Qm94PVxcXCIwIDAgNyAxMlxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMlxcXCIgcG9pbnRzPVxcXCIxIDEgNiA2IDEgMTFcXFwiPjwvcG9seWxpbmU+PC9zdmc+XCI7XG5cbnZhciBwYWdpbmF0aW9uUHJldmlvdXMgPSBcIjxzdmcgd2lkdGg9XFxcIjdcXFwiIGhlaWdodD1cXFwiMTJcXFwiIHZpZXdCb3g9XFxcIjAgMCA3IDEyXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4yXFxcIiBwb2ludHM9XFxcIjYgMSAxIDYgNiAxMVxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIHNlYXJjaEljb24gPSBcIjxzdmcgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjIwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjAgMjBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PGNpcmNsZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS4xXFxcIiBjeD1cXFwiOVxcXCIgY3k9XFxcIjlcXFwiIHI9XFxcIjdcXFwiPjwvY2lyY2xlPjxwYXRoIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIGQ9XFxcIk0xNCwxNCBMMTgsMTggTDE0LDE0IFpcXFwiPjwvcGF0aD48L3N2Zz5cIjtcblxudmFyIHNlYXJjaExhcmdlID0gXCI8c3ZnIHdpZHRoPVxcXCI0MFxcXCIgaGVpZ2h0PVxcXCI0MFxcXCIgdmlld0JveD1cXFwiMCAwIDQwIDQwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxjaXJjbGUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuOFxcXCIgY3g9XFxcIjE3LjVcXFwiIGN5PVxcXCIxNy41XFxcIiByPVxcXCIxNi41XFxcIj48L2NpcmNsZT48bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS44XFxcIiB4MT1cXFwiMzhcXFwiIHkxPVxcXCIzOVxcXCIgeDI9XFxcIjI5XFxcIiB5Mj1cXFwiMzBcXFwiPjwvbGluZT48L3N2Zz5cIjtcblxudmFyIHNlYXJjaE5hdmJhciA9IFwiPHN2ZyB3aWR0aD1cXFwiMjRcXFwiIGhlaWdodD1cXFwiMjRcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48Y2lyY2xlIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjFcXFwiIGN4PVxcXCIxMC41XFxcIiBjeT1cXFwiMTAuNVxcXCIgcj1cXFwiOS41XFxcIi8+PGxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjEuMVxcXCIgeDE9XFxcIjIzXFxcIiB5MT1cXFwiMjNcXFwiIHgyPVxcXCIxN1xcXCIgeTI9XFxcIjE3XFxcIi8+PC9zdmc+XCI7XG5cbnZhciBzbGlkZW5hdk5leHQgPSBcIjxzdmcgd2lkdGg9XFxcIjE0cHhcXFwiIGhlaWdodD1cXFwiMjRweFxcXCIgdmlld0JveD1cXFwiMCAwIDE0IDI0XFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxwb2x5bGluZSBmaWxsPVxcXCJub25lXFxcIiBzdHJva2U9XFxcIiMwMDBcXFwiIHN0cm9rZS13aWR0aD1cXFwiMS40XFxcIiBwb2ludHM9XFxcIjEuMjI1LDIzIDEyLjc3NSwxMiAxLjIyNSwxIFxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIHNsaWRlbmF2TmV4dExhcmdlID0gXCI8c3ZnIHdpZHRoPVxcXCIyNXB4XFxcIiBoZWlnaHQ9XFxcIjQwcHhcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNSA0MFxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIj48cG9seWxpbmUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBzdHJva2Utd2lkdGg9XFxcIjJcXFwiIHBvaW50cz1cXFwiNC4wMDIsMzguNTQ3IDIyLjUyNywyMC4wMjQgNCwxLjUgXFxcIj48L3BvbHlsaW5lPjwvc3ZnPlwiO1xuXG52YXIgc2xpZGVuYXZQcmV2aW91cyA9IFwiPHN2ZyB3aWR0aD1cXFwiMTRweFxcXCIgaGVpZ2h0PVxcXCIyNHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMTQgMjRcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjRcXFwiIHBvaW50cz1cXFwiMTIuNzc1LDEgMS4yMjUsMTIgMTIuNzc1LDIzIFxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIHNsaWRlbmF2UHJldmlvdXNMYXJnZSA9IFwiPHN2ZyB3aWR0aD1cXFwiMjVweFxcXCIgaGVpZ2h0PVxcXCI0MHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgMjUgNDBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIyXFxcIiBwb2ludHM9XFxcIjIwLjUyNywxLjUgMiwyMC4wMjQgMjAuNTI1LDM4LjU0NyBcXFwiPjwvcG9seWxpbmU+PC9zdmc+XCI7XG5cbnZhciBzcGlubmVyID0gXCI8c3ZnIHdpZHRoPVxcXCIzMFxcXCIgaGVpZ2h0PVxcXCIzMFxcXCIgdmlld0JveD1cXFwiMCAwIDMwIDMwXFxcIiB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiPjxjaXJjbGUgZmlsbD1cXFwibm9uZVxcXCIgc3Ryb2tlPVxcXCIjMDAwXFxcIiBjeD1cXFwiMTVcXFwiIGN5PVxcXCIxNVxcXCIgcj1cXFwiMTRcXFwiPjwvY2lyY2xlPjwvc3ZnPlwiO1xuXG52YXIgdG90b3AgPSBcIjxzdmcgd2lkdGg9XFxcIjE4XFxcIiBoZWlnaHQ9XFxcIjEwXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTggMTBcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCI+PHBvbHlsaW5lIGZpbGw9XFxcIm5vbmVcXFwiIHN0cm9rZT1cXFwiIzAwMFxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxLjJcXFwiIHBvaW50cz1cXFwiMSA5IDkgMSAxNyA5IFxcXCI+PC9wb2x5bGluZT48L3N2Zz5cIjtcblxudmFyIEljb24gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBwYXJzZWQgPSB7fSxcbiAgICAgICAgaWNvbnMgPSB7XG4gICAgICAgICAgICBzcGlubmVyOiBzcGlubmVyLFxuICAgICAgICAgICAgdG90b3A6IHRvdG9wLFxuICAgICAgICAgICAgbWFya2VyOiBtYXJrZXIsXG4gICAgICAgICAgICAnY2xvc2UtaWNvbic6IGNsb3NlSWNvbixcbiAgICAgICAgICAgICdjbG9zZS1sYXJnZSc6IGNsb3NlTGFyZ2UsXG4gICAgICAgICAgICAnbmF2YmFyLXRvZ2dsZS1pY29uJzogbmF2YmFyVG9nZ2xlSWNvbixcbiAgICAgICAgICAgICdvdmVybGF5LWljb24nOiBvdmVybGF5SWNvbixcbiAgICAgICAgICAgICdwYWdpbmF0aW9uLW5leHQnOiBwYWdpbmF0aW9uTmV4dCxcbiAgICAgICAgICAgICdwYWdpbmF0aW9uLXByZXZpb3VzJzogcGFnaW5hdGlvblByZXZpb3VzLFxuICAgICAgICAgICAgJ3NlYXJjaC1pY29uJzogc2VhcmNoSWNvbixcbiAgICAgICAgICAgICdzZWFyY2gtbGFyZ2UnOiBzZWFyY2hMYXJnZSxcbiAgICAgICAgICAgICdzZWFyY2gtbmF2YmFyJzogc2VhcmNoTmF2YmFyLFxuICAgICAgICAgICAgJ3NsaWRlbmF2LW5leHQnOiBzbGlkZW5hdk5leHQsXG4gICAgICAgICAgICAnc2xpZGVuYXYtbmV4dC1sYXJnZSc6IHNsaWRlbmF2TmV4dExhcmdlLFxuICAgICAgICAgICAgJ3NsaWRlbmF2LXByZXZpb3VzJzogc2xpZGVuYXZQcmV2aW91cyxcbiAgICAgICAgICAgICdzbGlkZW5hdi1wcmV2aW91cy1sYXJnZSc6IHNsaWRlbmF2UHJldmlvdXNMYXJnZVxuICAgICAgICB9O1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdpY29uJywgVUlraXQuY29tcG9uZW50cy5zdmcuZXh0ZW5kKHtcblxuICAgICAgICBhdHRyczogWydpY29uJywgJ3JhdGlvJ10sXG5cbiAgICAgICAgbWl4aW5zOiBbQ2xhc3NdLFxuXG4gICAgICAgIG5hbWU6ICdpY29uJyxcblxuICAgICAgICBhcmdzOiAnaWNvbicsXG5cbiAgICAgICAgcHJvcHM6IFsnaWNvbiddLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7ZXhjbHVkZTogWydpZCcsICdzdHlsZScsICdjbGFzcycsICdzcmMnLCAnaWNvbiddfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1pY29uJyk7XG5cbiAgICAgICAgICAgIGlmIChpc1J0bCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWNvbiA9IHN3YXAoc3dhcCh0aGlzLmljb24sICdsZWZ0JywgJ3JpZ2h0JyksICdwcmV2aW91cycsICduZXh0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kZWxheTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGdldFN2ZzogZnVuY3Rpb24gZ2V0U3ZnKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGljb24gPSBnZXRJY29uKHRoaXMuaWNvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdJY29uIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGljb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pKTtcblxuICAgIFtcbiAgICAgICAgJ21hcmtlcicsXG4gICAgICAgICduYXZiYXItdG9nZ2xlLWljb24nLFxuICAgICAgICAnb3ZlcmxheS1pY29uJyxcbiAgICAgICAgJ3BhZ2luYXRpb24tcHJldmlvdXMnLFxuICAgICAgICAncGFnaW5hdGlvbi1uZXh0JyxcbiAgICAgICAgJ3RvdG9wJ1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gcmVnaXN0ZXJDb21wb25lbnQobmFtZSk7IH0pO1xuXG4gICAgW1xuICAgICAgICAnc2xpZGVuYXYtcHJldmlvdXMnLFxuICAgICAgICAnc2xpZGVuYXYtbmV4dCdcbiAgICBdLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHJlZ2lzdGVyQ29tcG9uZW50KG5hbWUsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1zbGlkZW5hdicpO1xuXG4gICAgICAgICAgICBpZiAoaGFzQ2xhc3ModGhpcy4kZWwsICd1ay1zbGlkZW5hdi1sYXJnZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uICs9ICctbGFyZ2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTsgfSk7XG5cbiAgICByZWdpc3RlckNvbXBvbmVudCgnc2VhcmNoLWljb24nLCB7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLXNlYXJjaC1pY29uJykgJiYgcGFyZW50cyh0aGlzLiRlbCwgJy51ay1zZWFyY2gtbGFyZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb24gPSAnc2VhcmNoLWxhcmdlJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50cyh0aGlzLiRlbCwgJy51ay1zZWFyY2gtbmF2YmFyJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gJ3NlYXJjaC1uYXZiYXInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KCdjbG9zZScsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5pY29uID0gXCJjbG9zZS1cIiArIChoYXNDbGFzcyh0aGlzLiRlbCwgJ3VrLWNsb3NlLWxhcmdlJykgPyAnbGFyZ2UnIDogJ2ljb24nKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZWdpc3RlckNvbXBvbmVudCgnc3Bpbm5lcicsIHtcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnN2Zy50aGVuKGZ1bmN0aW9uIChzdmcpIHsgcmV0dXJuIHRoaXMkMS5yYXRpbyAhPT0gMSAmJiBjc3MoJCQxKCdjaXJjbGUnLCBzdmcpLCAnc3Ryb2tlLXdpZHRoJywgMSAvIHRoaXMkMS5yYXRpbyk7IH0sIG5vb3ApO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0Lmljb24uYWRkID0gZnVuY3Rpb24gKGFkZGVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFkZGVkKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBpY29uc1tuYW1lXSA9IGFkZGVkW25hbWVdO1xuICAgICAgICAgICAgZGVsZXRlIHBhcnNlZFtuYW1lXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKFVJa2l0Ll9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgZWFjaChVSWtpdC5pbnN0YW5jZXMsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LiRvcHRpb25zLm5hbWUgPT09ICdpY29uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuJHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQobmFtZSwgbWl4aW4kJDEpIHtcblxuICAgICAgICBVSWtpdC5jb21wb25lbnQobmFtZSwgVUlraXQuY29tcG9uZW50cy5pY29uLmV4dGVuZCh7XG5cbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG5cbiAgICAgICAgICAgIG1peGluczogbWl4aW4kJDEgPyBbbWl4aW4kJDFdIDogW10sXG5cbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICAgICAgaWNvbjogbmFtZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJY29uKGljb24pIHtcblxuICAgICAgICBpZiAoIWljb25zW2ljb25dKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyc2VkW2ljb25dKSB7XG4gICAgICAgICAgICBwYXJzZWRbaWNvbl0gPSAkJDEoaWNvbnNbaWNvbl0udHJpbSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRbaWNvbl07XG4gICAgfVxuXG59O1xuXG52YXIgTGVhZGVyID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2xlYWRlcicsIHtcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGZpbGw6IFN0cmluZyxcbiAgICAgICAgICAgIG1lZGlhOiAnbWVkaWEnXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGZpbGw6ICcnLFxuICAgICAgICAgICAgbWVkaWE6IGZhbHNlLFxuICAgICAgICAgICAgY2xzV3JhcHBlcjogJ3VrLWxlYWRlci1maWxsJyxcbiAgICAgICAgICAgIGNsc0hpZGU6ICd1ay1sZWFkZXItaGlkZScsXG4gICAgICAgICAgICBhdHRyRmlsbDogJ2RhdGEtZmlsbCdcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBmaWxsOiBmdW5jdGlvbiBmaWxsKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBmaWxsID0gcmVmLmZpbGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsbCB8fCBnZXRDc3NWYXIoJ2xlYWRlci1maWxsJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHdyYXBJbm5lcih0aGlzLiRlbCwgKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzV3JhcHBlcikgKyBcIlxcXCI+XCIpKVswXTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHVud3JhcCh0aGlzLndyYXBwZXIuY2hpbGROb2Rlcyk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fd2lkdGg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5fd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gTWF0aC5mbG9vcih0aGlzLiRlbC5vZmZzZXRXaWR0aCAvIDIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkID0gcHJldiAhPT0gdGhpcy5fd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUgPSB0aGlzLm1lZGlhICYmICF3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy53cmFwcGVyLCB0aGlzLmNsc0hpZGUsIHRoaXMuX2hpZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyKHRoaXMud3JhcHBlciwgdGhpcy5hdHRyRmlsbCwgbmV3IEFycmF5KHRoaXMuX3dpZHRoKS5qb2luKHRoaXMuZmlsbCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG5cbn07XG5cbnZhciBNYXJnaW4gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbWFyZ2luJywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBtYXJnaW46IFN0cmluZyxcbiAgICAgICAgICAgIGZpcnN0Q29sdW1uOiBCb29sZWFuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIG1hcmdpbjogJ3VrLW1hcmdpbi1zbWFsbC10b3AnLFxuICAgICAgICAgICAgZmlyc3RDb2x1bW46ICd1ay1maXJzdC1jb2x1bW4nXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHRoaXMuJGVsLmNoaWxkcmVuO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGggfHwgIWlzVmlzaWJsZSh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgcm93cyA9IFtbXV07XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gaXRlbXNbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpbS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHJvd3MubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHJvd3Nbal07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcm93WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdERpbSA9IHJvd1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpbS50b3AgPj0gTWF0aC5mbG9vcihsZWZ0RGltLmJvdHRvbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLnB1c2goW2VsXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKGRpbS5ib3R0b20pID4gbGVmdERpbS50b3ApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zdGFja3MgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaW0ubGVmdCA8IGxlZnREaW0ubGVmdCAmJiAhaXNSdGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnVuc2hpZnQoZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy51bnNoaWZ0KFtlbF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucm93cyA9IHJvd3M7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzICYmIHRoaXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3csIGkpIHsgcmV0dXJuIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMkMS5tYXJnaW4sIGkgIT09IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIHRoaXMkMS5maXJzdENvbHVtbiwgaiA9PT0gMCk7XG4gICAgICAgICAgICAgICAgICAgIH0pOyB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxudmFyIE1vZGFsJDEgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbW9kYWwnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbTW9kYWxdLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBjbHNQYWdlOiAndWstbW9kYWwtcGFnZScsXG4gICAgICAgICAgICBjbHNQYW5lbDogJ3VrLW1vZGFsLWRpYWxvZycsXG4gICAgICAgICAgICBzZWxDbG9zZTogJy51ay1tb2RhbC1jbG9zZSwgLnVrLW1vZGFsLWNsb3NlLWRlZmF1bHQsIC51ay1tb2RhbC1jbG9zZS1vdXRzaWRlLCAudWstbW9kYWwtY2xvc2UtZnVsbCdcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNDbGFzcyh0aGlzLnBhbmVsLCAndWstbWFyZ2luLWF1dG8tdmVydGljYWwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1mbGV4Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy4kZWwpOyAvLyBmb3JjZSByZWZsb3dcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGRlbicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLiRlbCwgJ3VrLWZsZXgnKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnb3ZlcmZsb3ctYXV0bycsIHtcblxuICAgICAgICBtaXhpbnM6IFtDbGFzc10sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgbW9kYWw6IGZ1bmN0aW9uIG1vZGFsKF8sICRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbG9zZXN0KCRlbCwgJy51ay1tb2RhbCcpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGFuZWw6IGZ1bmN0aW9uIHBhbmVsKF8sICRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbG9zZXN0KCRlbCwgJy51ay1tb2RhbC1kaWFsb2cnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbm5lY3RlZDogZnVuY3Rpb24gY29ubmVjdGVkKCkge1xuICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWluSGVpZ2h0JywgMTUwKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhbmVsIHx8ICF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IGNzcyh0aGlzLiRlbCwgJ21heEhlaWdodCcpO1xuXG4gICAgICAgICAgICAgICAgY3NzKGNzcyh0aGlzLiRlbCwgJ21heEhlaWdodCcsIDE1MCksICdtYXhIZWlnaHQnLCBNYXRoLm1heCgxNTAsIDE1MCArIGhlaWdodCh0aGlzLm1vZGFsKSAtIHRoaXMucGFuZWwub2Zmc2V0SGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IGNzcyh0aGlzLiRlbCwgJ21heEhlaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgVUlraXQubW9kYWwuZGlhbG9nID0gZnVuY3Rpb24gKGNvbnRlbnQsIG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgZGlhbG9nID0gVUlraXQubW9kYWwoKFwiIDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsXFxcIj4gPGRpdiBjbGFzcz1cXFwidWstbW9kYWwtZGlhbG9nXFxcIj5cIiArIGNvbnRlbnQgKyBcIjwvZGl2PiA8L2Rpdj4gXCIpLCBvcHRpb25zKTtcblxuICAgICAgICBvbihkaWFsb2cuJGVsLCAnaGlkZGVuJywgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHJlZi5jdXJyZW50O1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgZGlhbG9nLiRkZXN0cm95KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGlhbG9nLnNob3coKTtcblxuICAgICAgICByZXR1cm4gZGlhbG9nO1xuICAgIH07XG5cbiAgICBVSWtpdC5tb2RhbC5hbGVydCA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XG5cbiAgICAgICAgb3B0aW9ucyA9IGFzc2lnbih7YmdDbG9zZTogZmFsc2UsIGVzY0Nsb3NlOiBmYWxzZSwgbGFiZWxzOiBVSWtpdC5tb2RhbC5sYWJlbHN9LCBvcHRpb25zKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gb24oVUlraXQubW9kYWwuZGlhbG9nKChcIiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIj5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5IHVrLW1vZGFsLWNsb3NlXFxcIiBhdXRvZm9jdXM+XCIgKyAob3B0aW9ucy5sYWJlbHMub2spICsgXCI8L2J1dHRvbj4gPC9kaXY+IFwiKSwgb3B0aW9ucykuJGVsLCAnaGlkZScsIHJlc29sdmUpOyB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLmNvbmZpcm0gPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe2JnQ2xvc2U6IGZhbHNlLCBlc2NDbG9zZTogZmFsc2UsIGxhYmVsczogVUlraXQubW9kYWwubGFiZWxzfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyByZXR1cm4gb24oVUlraXQubW9kYWwuZGlhbG9nKChcIiA8ZGl2IGNsYXNzPVxcXCJ1ay1tb2RhbC1ib2R5XFxcIj5cIiArIChpc1N0cmluZyhtZXNzYWdlKSA/IG1lc3NhZ2UgOiBodG1sKG1lc3NhZ2UpKSArIFwiPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0IHVrLW1vZGFsLWNsb3NlXFxcIj5cIiArIChvcHRpb25zLmxhYmVscy5jYW5jZWwpICsgXCI8L2J1dHRvbj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1wcmltYXJ5IHVrLW1vZGFsLWNsb3NlXFxcIiBhdXRvZm9jdXM+XCIgKyAob3B0aW9ucy5sYWJlbHMub2spICsgXCI8L2J1dHRvbj4gPC9kaXY+IFwiKSwgb3B0aW9ucykuJGVsLCAnY2xpY2snLCAnLnVrLW1vZGFsLWZvb3RlciBidXR0b24nLCBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXgodGFyZ2V0KSA9PT0gMCA/IHJlamVjdCgpIDogcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pOyB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLnByb21wdCA9IGZ1bmN0aW9uIChtZXNzYWdlLCB2YWx1ZSwgb3B0aW9ucykge1xuXG4gICAgICAgIG9wdGlvbnMgPSBhc3NpZ24oe2JnQ2xvc2U6IGZhbHNlLCBlc2NDbG9zZTogZmFsc2UsIGxhYmVsczogVUlraXQubW9kYWwubGFiZWxzfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIHZhciByZXNvbHZlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHByb21wdCA9IFVJa2l0Lm1vZGFsLmRpYWxvZygoXCIgPGZvcm0gY2xhc3M9XFxcInVrLWZvcm0tc3RhY2tlZFxcXCI+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWJvZHlcXFwiPiA8bGFiZWw+XCIgKyAoaXNTdHJpbmcobWVzc2FnZSkgPyBtZXNzYWdlIDogaHRtbChtZXNzYWdlKSkgKyBcIjwvbGFiZWw+IDxpbnB1dCBjbGFzcz1cXFwidWstaW5wdXRcXFwiIGF1dG9mb2N1cz4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInVrLW1vZGFsLWZvb3RlciB1ay10ZXh0LXJpZ2h0XFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstYnV0dG9uIHVrLWJ1dHRvbi1kZWZhdWx0IHVrLW1vZGFsLWNsb3NlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPlwiICsgKG9wdGlvbnMubGFiZWxzLmNhbmNlbCkgKyBcIjwvYnV0dG9uPiA8YnV0dG9uIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXByaW1hcnlcXFwiPlwiICsgKG9wdGlvbnMubGFiZWxzLm9rKSArIFwiPC9idXR0b24+IDwvZGl2PiA8L2Zvcm0+IFwiKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAkJDEoJ2lucHV0JywgcHJvbXB0LiRlbCk7XG5cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIG9uKHByb21wdC4kZWwsICdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcm9tcHQuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvbihwcm9tcHQuJGVsLCAnaGlkZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFVJa2l0Lm1vZGFsLmxhYmVscyA9IHtcbiAgICAgICAgb2s6ICdPaycsXG4gICAgICAgIGNhbmNlbDogJ0NhbmNlbCdcbiAgICB9O1xuXG59O1xuXG52YXIgTmF2ID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ25hdicsIFVJa2l0LmNvbXBvbmVudHMuYWNjb3JkaW9uLmV4dGVuZCh7XG5cbiAgICAgICAgbmFtZTogJ25hdicsXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldHM6ICc+IC51ay1wYXJlbnQnLFxuICAgICAgICAgICAgdG9nZ2xlOiAnPiBhJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICc+IHVsJ1xuICAgICAgICB9XG5cbiAgICB9KSk7XG5cbn07XG5cbnZhciBOYXZiYXIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbmF2YmFyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZHJvcGRvd246IFN0cmluZyxcbiAgICAgICAgICAgIG1vZGU6ICdsaXN0JyxcbiAgICAgICAgICAgIGFsaWduOiBTdHJpbmcsXG4gICAgICAgICAgICBvZmZzZXQ6IE51bWJlcixcbiAgICAgICAgICAgIGJvdW5kYXJ5OiBCb29sZWFuLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogQm9vbGVhbixcbiAgICAgICAgICAgIGNsc0Ryb3A6IFN0cmluZyxcbiAgICAgICAgICAgIGRlbGF5U2hvdzogTnVtYmVyLFxuICAgICAgICAgICAgZGVsYXlIaWRlOiBOdW1iZXIsXG4gICAgICAgICAgICBkcm9wYmFyOiBCb29sZWFuLFxuICAgICAgICAgICAgZHJvcGJhck1vZGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRyb3BiYXJBbmNob3I6ICdxdWVyeScsXG4gICAgICAgICAgICBkdXJhdGlvbjogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGRyb3Bkb3duOiAnLnVrLW5hdmJhci1uYXYgPiBsaScsXG4gICAgICAgICAgICBhbGlnbjogIWlzUnRsID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGNsc0Ryb3A6ICd1ay1uYXZiYXItZHJvcGRvd24nLFxuICAgICAgICAgICAgbW9kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb2Zmc2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkZWxheVNob3c6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlbGF5SGlkZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYm91bmRhcnlBbGlnbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZmxpcDogJ3gnLFxuICAgICAgICAgICAgYm91bmRhcnk6IHRydWUsXG4gICAgICAgICAgICBkcm9wYmFyOiBmYWxzZSxcbiAgICAgICAgICAgIGRyb3BiYXJNb2RlOiAnc2xpZGUnLFxuICAgICAgICAgICAgZHJvcGJhckFuY2hvcjogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGJvdW5kYXJ5OiBmdW5jdGlvbiBib3VuZGFyeShyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHJlZi5ib3VuZGFyeTtcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRhcnlBbGlnbiA9IHJlZi5ib3VuZGFyeUFsaWduO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChib3VuZGFyeSA9PT0gdHJ1ZSB8fCBib3VuZGFyeUFsaWduKSA/ICRlbCA6IGJvdW5kYXJ5XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwb3M6IGZ1bmN0aW9uIHBvcyhyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWxpZ24gPSByZWYuYWxpZ247XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFwiYm90dG9tLVwiICsgYWxpZ24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcm9wYmFyKSB7XG4gICAgICAgICAgICAgICAgVUlraXQubmF2YmFyRHJvcGJhcihcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkodGhpcy5kcm9wYmFyLCB0aGlzLiRlbCkgfHwgYWZ0ZXIodGhpcy5kcm9wYmFyQW5jaG9yIHx8IHRoaXMuJGVsLCAnPGRpdj48L2Rpdj4nKSxcbiAgICAgICAgICAgICAgICAgICAge2Nsc0Ryb3A6IHRoaXMuY2xzRHJvcCwgbW9kZTogdGhpcy5kcm9wYmFyTW9kZSwgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sIG5hdmJhcjogdGhpc31cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgICAgICAgICAgIFVJa2l0LmRyb3AoXG4gICAgICAgICAgICAgICAgJCQoKCh0aGlzLmRyb3Bkb3duKSArIFwiIC5cIiArICh0aGlzLmNsc0Ryb3ApKSwgdGhpcy4kZWwpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICFVSWtpdC5nZXRDb21wb25lbnQoZWwsICdkcm9wZG93bicpOyB9KSxcbiAgICAgICAgICAgICAgICBhc3NpZ24oe30sIHRoaXMuJHByb3BzLCB7Ym91bmRhcnk6IHRoaXMuYm91bmRhcnksIHBvczogdGhpcy5wb3N9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ21vdXNlb3ZlcicsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHJlZi5jdXJyZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlICYmIGFjdGl2ZS50b2dnbGUgJiYgIXdpdGhpbihhY3RpdmUudG9nZ2xlLiRlbCwgY3VycmVudCkgJiYgIWFjdGl2ZS50cmFja2VyLm1vdmVzVG8oYWN0aXZlLiRlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5oaWRlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBnZXRBY3RpdmU6IGZ1bmN0aW9uIGdldEFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gVUlraXQuZHJvcC5nZXRBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlICYmIGluY2x1ZGVzKGFjdGl2ZS5tb2RlLCAnaG92ZXInKSAmJiB3aXRoaW4oYWN0aXZlLnRvZ2dsZS4kZWwsIHRoaXMuJGVsKSAmJiBhY3RpdmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ25hdmJhci1kcm9wYmFyJywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY2xzRHJvcDogJycsXG4gICAgICAgICAgICBtb2RlOiAnc2xpZGUnLFxuICAgICAgICAgICAgbmF2YmFyOiBudWxsLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLiRlbCwgJ3VrLW5hdmJhci1kcm9wYmFyLXNsaWRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzaG93JyxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF2YmFyLiRlbDtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlLCBkcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSBkcm9wLiRlbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IGRyb3AuZGlyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyID09PSAnYm90dG9tJyAmJiAhd2l0aGluKCRlbCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmQodGhpcy4kZWwsICRlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnbW91c2VsZWF2ZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5uYXZiYXIuZ2V0QWN0aXZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSAmJiAhbWF0Y2hlcyh0aGlzLiRlbCwgJzpob3ZlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoXywgcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSByZWYuJGVsO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xzRHJvcCAmJiBhZGRDbGFzcygkZWwsICgodGhpcy5jbHNEcm9wKSArIFwiLWRyb3BiYXJcIikpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygkZWwub2Zmc2V0SGVpZ2h0ICsgdG9GbG9hdChjc3MoJGVsLCAnbWFyZ2luLXRvcCcpKSArIHRvRmxvYXQoY3NzKCRlbCwgJ21hcmdpbi1ib3R0b20nKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3JlaGlkZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUsIHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gcmVmLiRlbDtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLm5hdmJhci5nZXRBY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyh0aGlzLiRlbCwgJzpob3ZlcicpICYmIGFjdGl2ZSAmJiBhY3RpdmUuJGVsID09PSAkZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZScsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKF8sIHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gcmVmLiRlbDtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLm5hdmJhci5nZXRBY3RpdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSB8fCBhY3RpdmUgJiYgYWN0aXZlLiRlbCA9PT0gJGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25UbygwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgdHJhbnNpdGlvblRvOiBmdW5jdGlvbiB0cmFuc2l0aW9uVG8obmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsLCBpc1Zpc2libGUodGhpcy4kZWwpID8gaGVpZ2h0KHRoaXMuJGVsKSA6IDApO1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gVHJhbnNpdGlvbi5zdGFydCh0aGlzLiRlbCwge2hlaWdodDogbmV3SGVpZ2h0fSwgdGhpcy5kdXJhdGlvbikudGhlbihudWxsLCBub29wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxufTtcblxudmFyIHNjcm9sbDtcblxudmFyIE9mZmNhbnZhcyA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdvZmZjYW52YXMnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbTW9kYWxdLFxuXG4gICAgICAgIGFyZ3M6ICdtb2RlJyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgY29udGVudDogU3RyaW5nLFxuICAgICAgICAgICAgbW9kZTogU3RyaW5nLFxuICAgICAgICAgICAgZmxpcDogQm9vbGVhbixcbiAgICAgICAgICAgIG92ZXJsYXk6IEJvb2xlYW5cbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY29udGVudDogJy51ay1vZmZjYW52YXMtY29udGVudCcsXG4gICAgICAgICAgICBtb2RlOiAnc2xpZGUnLFxuICAgICAgICAgICAgZmxpcDogZmFsc2UsXG4gICAgICAgICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGNsc1BhZ2U6ICd1ay1vZmZjYW52YXMtcGFnZScsXG4gICAgICAgICAgICBjbHNDb250YWluZXI6ICd1ay1vZmZjYW52YXMtY29udGFpbmVyJyxcbiAgICAgICAgICAgIGNsc1BhbmVsOiAndWstb2ZmY2FudmFzLWJhcicsXG4gICAgICAgICAgICBjbHNGbGlwOiAndWstb2ZmY2FudmFzLWZsaXAnLFxuICAgICAgICAgICAgY2xzQ29udGVudDogJ3VrLW9mZmNhbnZhcy1jb250ZW50JyxcbiAgICAgICAgICAgIGNsc0NvbnRlbnRBbmltYXRpb246ICd1ay1vZmZjYW52YXMtY29udGVudC1hbmltYXRpb24nLFxuICAgICAgICAgICAgY2xzU2lkZWJhckFuaW1hdGlvbjogJ3VrLW9mZmNhbnZhcy1iYXItYW5pbWF0aW9uJyxcbiAgICAgICAgICAgIGNsc01vZGU6ICd1ay1vZmZjYW52YXMnLFxuICAgICAgICAgICAgY2xzT3ZlcmxheTogJ3VrLW9mZmNhbnZhcy1vdmVybGF5JyxcbiAgICAgICAgICAgIHNlbENsb3NlOiAnLnVrLW9mZmNhbnZhcy1jbG9zZSdcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBjb250ZW50OiBmdW5jdGlvbiBjb250ZW50KHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVmLmNvbnRlbnQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQxKGNvbnRlbnQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2xzRmxpcDogZnVuY3Rpb24gY2xzRmxpcChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpcCA9IHJlZi5mbGlwO1xuICAgICAgICAgICAgICAgIHZhciBjbHNGbGlwID0gcmVmLmNsc0ZsaXA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmxpcCA/IGNsc0ZsaXAgOiAnJztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsc092ZXJsYXk6IGZ1bmN0aW9uIGNsc092ZXJsYXkocmVmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG92ZXJsYXkgPSByZWYub3ZlcmxheTtcbiAgICAgICAgICAgICAgICB2YXIgY2xzT3ZlcmxheSA9IHJlZi5jbHNPdmVybGF5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG92ZXJsYXkgPyBjbHNPdmVybGF5IDogJyc7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbHNNb2RlOiBmdW5jdGlvbiBjbHNNb2RlKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGNsc01vZGUgPSByZWYuY2xzTW9kZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoY2xzTW9kZSArIFwiLVwiICsgbW9kZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbHNTaWRlYmFyQW5pbWF0aW9uOiBmdW5jdGlvbiBjbHNTaWRlYmFyQW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGNsc1NpZGViYXJBbmltYXRpb24gPSByZWYuY2xzU2lkZWJhckFuaW1hdGlvbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlID09PSAnbm9uZScgfHwgbW9kZSA9PT0gJ3JldmVhbCcgPyAnJyA6IGNsc1NpZGViYXJBbmltYXRpb247XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbHNDb250ZW50QW5pbWF0aW9uOiBmdW5jdGlvbiBjbHNDb250ZW50QW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlID0gcmVmLm1vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGNsc0NvbnRlbnRBbmltYXRpb24gPSByZWYuY2xzQ29udGVudEFuaW1hdGlvbjtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlICE9PSAncHVzaCcgJiYgbW9kZSAhPT0gJ3JldmVhbCcgPyAnJyA6IGNsc0NvbnRlbnRBbmltYXRpb25cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zaXRpb25FbGVtZW50OiBmdW5jdGlvbiB0cmFuc2l0aW9uRWxlbWVudChyZWYpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZSA9IHJlZi5tb2RlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGUgPT09ICdyZXZlYWwnID8gdGhpcy5wYW5lbC5wYXJlbnROb2RlIDogdGhpcy5wYW5lbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBY3RpdmUoKSA9PT0gdGhpcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXkgfHwgdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCh0aGlzLmNvbnRlbnQsIHdpZHRoKHdpbikgLSB0aGlzLnNjcm9sbGJhcldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLmNvbnRlbnQsIGhlaWdodCh3aW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsVG9wID0gc2Nyb2xsLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ3Jlc2l6ZSddXG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NsaWNrJyxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhW2hyZWZePVwiI1wiXSc7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcmVmLmN1cnJlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaGFzaCAmJiAkJDEoY3VycmVudC5oYXNoLCB0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVzY3JvbGwnLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSwgc2Nyb2xsLCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCAmJiB0YXJnZXQgJiYgdGhpcy5pc1RvZ2dsZWQoKSAmJiAkJDEodGFyZ2V0LCB0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNlKHRoaXMuJGVsLCAnaGlkZGVuJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gc2Nyb2xsLnNjcm9sbFRvKHRhcmdldCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gc2Nyb2xsIHx8IHt4OiB3aW4ucGFnZVhPZmZzZXQsIHk6IHdpbi5wYWdlWU9mZnNldH07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3JldmVhbCcgJiYgIWhhc0NsYXNzKHRoaXMucGFuZWwsIHRoaXMuY2xzTW9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBBbGwodGhpcy5wYW5lbCwgJzxkaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLnBhbmVsLnBhcmVudE5vZGUsIHRoaXMuY2xzTW9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jRWwsICdvdmVyZmxvd1knLCAoIXRoaXMuY2xzQ29udGVudEFuaW1hdGlvbiB8fCB0aGlzLmZsaXApICYmIHRoaXMuc2Nyb2xsYmFyV2lkdGggJiYgdGhpcy5vdmVybGF5ID8gJ3Njcm9sbCcgOiAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGRvYy5ib2R5LCAoKHRoaXMuY2xzQ29udGFpbmVyKSArIFwiIFwiICsgKHRoaXMuY2xzRmxpcCkgKyBcIiBcIiArICh0aGlzLmNsc092ZXJsYXkpKSk7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodChkb2MuYm9keSk7IC8vIGZvcmNlIHJlZmxvd1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyh0aGlzLmNvbnRlbnQsIHRoaXMuY2xzQ29udGVudEFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMucGFuZWwsICgodGhpcy5jbHNTaWRlYmFyQW5pbWF0aW9uKSArIFwiIFwiICsgKHRoaXMubW9kZSAhPT0gJ3JldmVhbCcgPyB0aGlzLmNsc01vZGUgOiAnJykpKTtcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzT3ZlcmxheSk7XG4gICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsKTsgLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuY29udGVudCwgdGhpcy5jbHNDb250ZW50QW5pbWF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ25vbmUnIHx8IGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMgJiYgYWN0aXZlICE9PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy5wYW5lbCwgdHJhbnNpdGlvbmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hpZGRlbicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAncmV2ZWFsJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW53cmFwKHRoaXMucGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IHt4OiB3aW4ucGFnZVhPZmZzZXQsIHk6IHdpbi5wYWdlWU9mZnNldH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4ID0gcmVmLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHJlZi5zY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSB7eDogeCwgeTogeX07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCAoKHRoaXMuY2xzU2lkZWJhckFuaW1hdGlvbikgKyBcIiBcIiArICh0aGlzLmNsc01vZGUpKSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc092ZXJsYXkpO1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsICdkaXNwbGF5JywgJycpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2MuYm9keSwgKCh0aGlzLmNsc0NvbnRhaW5lcikgKyBcIiBcIiArICh0aGlzLmNsc0ZsaXApICsgXCIgXCIgKyAodGhpcy5jbHNPdmVybGF5KSkpO1xuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5zY3JvbGxUb3AgPSBzY3JvbGwueTtcblxuICAgICAgICAgICAgICAgICAgICBjc3MoZG9jRWwsICdvdmVyZmxvdy15JywgJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoKHRoaXMuY29udGVudCwgJycpO1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQodGhpcy5jb250ZW50LCAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKHNjcm9sbC54LCBzY3JvbGwueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3dpcGVMZWZ0IHN3aXBlUmlnaHQnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkgJiYgaXNUb3VjaChlKSAmJiAoZS50eXBlID09PSAnc3dpcGVMZWZ0JyAmJiAhdGhpcy5mbGlwIHx8IGUudHlwZSA9PT0gJ3N3aXBlUmlnaHQnICYmIHRoaXMuZmxpcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBSZXNwb25zaXZlID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3Jlc3BvbnNpdmUnLCB7XG5cbiAgICAgICAgcHJvcHM6IFsnd2lkdGgnLCAnaGVpZ2h0J10sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstcmVzcG9uc2l2ZS13aWR0aCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZToge1xuXG4gICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kaW0gPSBpc1Zpc2libGUodGhpcy4kZWwpICYmIHRoaXMud2lkdGggJiYgdGhpcy5oZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgPyB7d2lkdGg6IHdpZHRoKHRoaXMuJGVsLnBhcmVudE5vZGUpLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMuJGVsLCBEaW1lbnNpb25zLmNvbnRhaW4oe2hlaWdodDogdGhpcy5oZWlnaHQsIHdpZHRoOiB0aGlzLndpZHRofSwgdGhpcy5kaW0pLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgU2Nyb2xsID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3Njcm9sbCcsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZHVyYXRpb246IE51bWJlcixcbiAgICAgICAgICAgIG9mZnNldDogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzY3JvbGxUbzogZnVuY3Rpb24gc2Nyb2xsVG8oZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgZWwgPSBlbCAmJiAkJDEoaXNTdHJpbmcoZWwpID8gZWwucmVwbGFjZSgvXFwvL2csICdcXFxcLycpIDogZWwpIHx8IGRvYy5ib2R5O1xuXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IG9mZnNldChlbCkudG9wIC0gdGhpcy5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIGRvY0hlaWdodCA9IGhlaWdodChkb2MpLFxuICAgICAgICAgICAgICAgICAgICB3aW5IZWlnaHQgPSBoZWlnaHQod2luKTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgKyB3aW5IZWlnaHQgPiBkb2NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gZG9jSGVpZ2h0IC0gd2luSGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdHJpZ2dlcih0aGlzLiRlbCwgJ2JlZm9yZXNjcm9sbCcsIFt0aGlzLCBlbF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydFkgPSB3aW4ucGFnZVlPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudFkgPSBzdGFydFkgKyAodGFyZ2V0IC0gc3RhcnRZKSAqIGVhc2UoY2xhbXAoKERhdGUubm93KCkgLSBzdGFydCkgLyB0aGlzJDEuZHVyYXRpb24pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKHdpbi5wYWdlWE9mZnNldCwgY3VycmVudFkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzY3JvbGwgbW9yZSBpZiB3ZSBoYXZlIG5vdCByZWFjaGVkIG91ciBkZXN0aW5hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRZICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcyQxLiRlbCwgJ3Njcm9sbGVkJywgW3RoaXMkMSwgZWxdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHN0ZXAoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiB7XG5cbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyh0aGlzLiRlbC5oYXNoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGVhc2Uoaykge1xuICAgICAgICByZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xuICAgIH1cblxufTtcblxudmFyIFNjcm9sbHNweSA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzY3JvbGxzcHknLCB7XG5cbiAgICAgICAgYXJnczogJ2NscycsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNsczogJ2xpc3QnLFxuICAgICAgICAgICAgdGFyZ2V0OiBTdHJpbmcsXG4gICAgICAgICAgICBoaWRkZW46IEJvb2xlYW4sXG4gICAgICAgICAgICBvZmZzZXRUb3A6IE51bWJlcixcbiAgICAgICAgICAgIG9mZnNldExlZnQ6IE51bWJlcixcbiAgICAgICAgICAgIHJlcGVhdDogQm9vbGVhbixcbiAgICAgICAgICAgIGRlbGF5OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY2xzOiBbJ3VrLXNjcm9sbHNweS1pbnZpZXcnXSxcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICBvZmZzZXRUb3A6IDAsXG4gICAgICAgICAgICBvZmZzZXRMZWZ0OiAwLFxuICAgICAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgICAgaW5WaWV3Q2xhc3M6ICd1ay1zY3JvbGxzcHktaW52aWV3J1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzOiBmdW5jdGlvbiBlbGVtZW50cyhyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCAmJiAkJCh0YXJnZXQsICRlbCkgfHwgWyRlbF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyhmaWx0ZXIodGhpcy5lbGVtZW50cywgKFwiOm5vdCguXCIgKyAodGhpcy5pblZpZXdDbGFzcykgKyBcIilcIikpLCAndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVsLl9zY3JvbGxzcHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xzID0gYXR0cihlbCwgJ3VrLXNjcm9sbHNweS1jbGFzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLl9zY3JvbGxzcHkgPSB7dG9nZ2xlczogY2xzICYmIGNscy5zcGxpdCgnLCcpIHx8IHRoaXMkMS5jbHN9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5fc2Nyb2xsc3B5LnNob3cgPSBpc0luVmlldyhlbCwgdGhpcyQxLm9mZnNldFRvcCwgdGhpcyQxLm9mZnNldExlZnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGggPT09IDEgPyAxIDogMDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZWwuX3Njcm9sbHNweSwgY2xzID0gZGF0YS50b2dnbGVzW2ldIHx8IGRhdGEudG9nZ2xlc1swXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc2hvdykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmludmlldyAmJiAhZGF0YS50aW1lcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCAndmlzaWJpbGl0eScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKGVsLCB0aGlzJDEuaW5WaWV3Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWwsIGNscyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsICdpbnZpZXcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiR1cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5pbnZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGEudGltZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5kZWxheSAmJiBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS50aW1lciA9IHNldFRpbWVvdXQoc2hvdywgdGhpcyQxLmRlbGF5ICogaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmludmlldyAmJiB0aGlzJDEucmVwZWF0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChkYXRhLnRpbWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhLnRpbWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGVsLCAndmlzaWJpbGl0eScsIHRoaXMkMS5oaWRkZW4gPyAnaGlkZGVuJyA6ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsIHRoaXMkMS5pblZpZXdDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGVsLCBjbHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoZWwsICdvdXR2aWV3Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLiR1cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmludmlldyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdXG5cbiAgICB9KTtcblxufTtcblxudmFyIFNjcm9sbHNweU5hdiA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzY3JvbGxzcHktbmF2Jywge1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBjbHM6IFN0cmluZyxcbiAgICAgICAgICAgIGNsb3Nlc3Q6IFN0cmluZyxcbiAgICAgICAgICAgIHNjcm9sbDogQm9vbGVhbixcbiAgICAgICAgICAgIG92ZXJmbG93OiBCb29sZWFuLFxuICAgICAgICAgICAgb2Zmc2V0OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgY2xzOiAndWstYWN0aXZlJyxcbiAgICAgICAgICAgIGNsb3Nlc3Q6IGZhbHNlLFxuICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZSxcbiAgICAgICAgICAgIG92ZXJmbG93OiB0cnVlLFxuICAgICAgICAgICAgb2Zmc2V0OiAwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgbGlua3M6IGZ1bmN0aW9uIGxpbmtzKF8sICRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkJCgnYVtocmVmXj1cIiNcIl0nLCAkZWwpLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmhhc2g7IH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZWxlbWVudHM6IGZ1bmN0aW9uIGVsZW1lbnRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3QgPyBjbG9zZXN0KHRoaXMubGlua3MsIHRoaXMuY2xvc2VzdCkgOiB0aGlzLmxpbmtzO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdGFyZ2V0czogZnVuY3Rpb24gdGFyZ2V0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodGhpcy5saW5rcy5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5oYXNoOyB9KS5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlraXQuc2Nyb2xsKHRoaXMubGlua3MsIHtvZmZzZXQ6IHRoaXMub2Zmc2V0IHx8IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsID0gd2luLnBhZ2VZT2Zmc2V0ICsgdGhpcy5vZmZzZXQgKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gaGVpZ2h0KGRvYykgLSBoZWlnaHQod2luKSArIHRoaXMub2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRzLmV2ZXJ5KGZ1bmN0aW9uIChlbCwgaSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9wID0gb2Zmc2V0KGVsKS50b3AsIGxhc3QgPSBpICsgMSA9PT0gdGhpcyQxLnRhcmdldHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEub3ZlcmZsb3cgJiYgKGkgPT09IDAgJiYgdG9wID4gc2Nyb2xsIHx8IGxhc3QgJiYgdG9wICsgZWwub2Zmc2V0VG9wIDwgc2Nyb2xsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXN0ICYmIG9mZnNldCh0aGlzJDEudGFyZ2V0c1tpICsgMV0pLnRvcCA8PSBzY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbCA+PSBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gdGhpcyQxLnRhcmdldHMubGVuZ3RoIC0gMTsgaiA+IGk7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblZpZXcodGhpcyQxLnRhcmdldHNbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbCA9IHRoaXMkMS50YXJnZXRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKHRoaXMkMS5hY3RpdmUgPSAkJDEoZmlsdGVyKHRoaXMkMS5saW5rcywgKFwiW2hyZWY9XFxcIiNcIiArIChlbC5pZCkgKyBcIlxcXCJdXCIpKSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5ibHVyKCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRzLCB0aGlzLmNscyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKHRoaXMuJGVsLCAnYWN0aXZlJywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuY2xvc2VzdCA/IGNsb3Nlc3QodGhpcy5hY3RpdmUsIHRoaXMuY2xvc2VzdCkgOiB0aGlzLmFjdGl2ZSwgdGhpcy5jbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydzY3JvbGwnLCAnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBTdGlja3kgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc3RpY2t5Jywge1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICAgICAgYm90dG9tOiBCb29sZWFuLFxuICAgICAgICAgICAgb2Zmc2V0OiBOdW1iZXIsXG4gICAgICAgICAgICBhbmltYXRpb246IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzSW5hY3RpdmU6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0ZpeGVkOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNCZWxvdzogU3RyaW5nLFxuICAgICAgICAgICAgc2VsVGFyZ2V0OiBTdHJpbmcsXG4gICAgICAgICAgICB3aWR0aEVsZW1lbnQ6ICdxdWVyeScsXG4gICAgICAgICAgICBzaG93T25VcDogQm9vbGVhbixcbiAgICAgICAgICAgIG1lZGlhOiAnbWVkaWEnLFxuICAgICAgICAgICAgdGFyZ2V0OiBOdW1iZXJcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgYm90dG9tOiBmYWxzZSxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogJycsXG4gICAgICAgICAgICBjbHNBY3RpdmU6ICd1ay1hY3RpdmUnLFxuICAgICAgICAgICAgY2xzSW5hY3RpdmU6ICcnLFxuICAgICAgICAgICAgY2xzRml4ZWQ6ICd1ay1zdGlja3ktZml4ZWQnLFxuICAgICAgICAgICAgY2xzQmVsb3c6ICd1ay1zdGlja3ktYmVsb3cnLFxuICAgICAgICAgICAgc2VsVGFyZ2V0OiAnJyxcbiAgICAgICAgICAgIHdpZHRoRWxlbWVudDogZmFsc2UsXG4gICAgICAgICAgICBzaG93T25VcDogZmFsc2UsXG4gICAgICAgICAgICBtZWRpYTogZmFsc2UsXG4gICAgICAgICAgICB0YXJnZXQ6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgc2VsVGFyZ2V0OiBmdW5jdGlvbiBzZWxUYXJnZXQocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsVGFyZ2V0ID0gcmVmLnNlbFRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxUYXJnZXQgJiYgJCQxKHNlbFRhcmdldCwgJGVsKSB8fCAkZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcblxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICQkMSgnPGRpdiBjbGFzcz1cInVrLXN0aWNreS1wbGFjZWhvbGRlclwiPjwvZGl2PicpO1xuICAgICAgICAgICAgdGhpcy53aWR0aEVsZW1lbnQgPSB0aGlzLiRwcm9wcy53aWR0aEVsZW1lbnQgfHwgdGhpcy5wbGFjZWhvbGRlcjtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0luYWN0aXZlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVtb3ZlKHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndpZHRoRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgaWYgKCEodGhpcy50YXJnZXQgJiYgbG9jYXRpb24uaGFzaCAmJiB3aW4ucGFnZVlPZmZzZXQgPiAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQkMShsb2NhdGlvbi5oYXNoKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9IG9mZnNldCh0YXJnZXQpLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsVG9wID0gb2Zmc2V0KHRoaXMkMS4kZWwpLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsSGVpZ2h0ID0gdGhpcyQxLiRlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsVG9wICsgZWxIZWlnaHQgPj0gdG9wICYmIGVsVG9wIDw9IHRvcCArIHRhcmdldC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbygwLCB0b3AgLSBlbEhlaWdodCAtIHRoaXMkMS50YXJnZXQgLSB0aGlzJDEub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFtcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdhY3RpdmUnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VDbGFzcyh0aGlzLnNlbFRhcmdldCwgdGhpcy5jbHNJbmFjdGl2ZSwgdGhpcy5jbHNBY3RpdmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpbmFjdGl2ZScsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUNsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSwgdGhpcy5jbHNJbmFjdGl2ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRlckhlaWdodCA9ICh0aGlzLmlzQWN0aXZlID8gcGxhY2Vob2xkZXIgOiB0aGlzLiRlbCkub2Zmc2V0SGVpZ2h0LCBlbDtcblxuICAgICAgICAgICAgICAgICAgICBjc3MocGxhY2Vob2xkZXIsIGFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHtoZWlnaHQ6IGNzcyh0aGlzLiRlbCwgJ3Bvc2l0aW9uJykgIT09ICdhYnNvbHV0ZScgPyBvdXRlckhlaWdodCA6ICcnfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgWydtYXJnaW5Ub3AnLCAnbWFyZ2luQm90dG9tJywgJ21hcmdpbkxlZnQnLCAnbWFyZ2luUmlnaHQnXSlcbiAgICAgICAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3aXRoaW4ocGxhY2Vob2xkZXIsIGRvY0VsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIodGhpcy4kZWwsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIocGxhY2Vob2xkZXIsICdoaWRkZW4nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhdHRyKHRoaXMud2lkdGhFbGVtZW50LCAnaGlkZGVuJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLndpZHRoRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgYXR0cih0aGlzLndpZHRoRWxlbWVudCwgJ2hpZGRlbicsIHRoaXMuaXNBY3RpdmUgPyBudWxsIDogJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wT2Zmc2V0ID0gb2Zmc2V0KHRoaXMuaXNBY3RpdmUgPyBwbGFjZWhvbGRlciA6IHRoaXMuJGVsKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tT2Zmc2V0ID0gdGhpcy50b3BPZmZzZXQgKyBvdXRlckhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBbJ3RvcCcsICdib3R0b20nXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMVtwcm9wXSA9IHRoaXMkMS4kcHJvcHNbcHJvcF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcyQxW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOdW1lcmljKHRoaXMkMVtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMVtwcm9wXSA9IHRoaXMkMVsocHJvcCArIFwiT2Zmc2V0XCIpXSArIHRvRmxvYXQodGhpcyQxW3Byb3BdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyh0aGlzJDFbcHJvcF0pICYmIHRoaXMkMVtwcm9wXS5tYXRjaCgvXi0/XFxkK3ZoJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMVtwcm9wXSA9IGhlaWdodCh3aW4pICogdG9GbG9hdCh0aGlzJDFbcHJvcF0pIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSB0aGlzJDFbcHJvcF0gPT09IHRydWUgPyB0aGlzJDEuJGVsLnBhcmVudE5vZGUgOiBxdWVyeSh0aGlzJDFbcHJvcF0sIHRoaXMkMS4kZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW3Byb3BdID0gb2Zmc2V0KGVsKS50b3AgKyBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9wID0gTWF0aC5tYXgodG9GbG9hdCh0aGlzLnRvcCksIHRoaXMudG9wT2Zmc2V0KSAtIHRoaXMub2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbSA9IHRoaXMuYm90dG9tICYmIHRoaXMuYm90dG9tIC0gb3V0ZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5hY3RpdmUgPSB0aGlzLm1lZGlhICYmICF3aW4ubWF0Y2hNZWRpYSh0aGlzLm1lZGlhKS5tYXRjaGVzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0VG9wID0gb2Zmc2V0KHRoaXMuJGVsKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsID0gd2luLnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc2libGUgPSBpc1Zpc2libGUodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXIgPSByZWYuZGlyO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbCA9IHRoaXMuc2Nyb2xsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGwgPCAwIHx8ICF0aGlzLnZpc2libGUgfHwgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnNob3dPblVwICYmICFkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmluYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBzY3JvbGwgPCB0aGlzLnRvcFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5zaG93T25VcCAmJiAoc2Nyb2xsIDw9IHRoaXMudG9wIHx8IGRpciA9PT0gJ2Rvd24nIHx8IGRpciA9PT0gJ3VwJyAmJiAhdGhpcy5pc0FjdGl2ZSAmJiBzY3JvbGwgPD0gdGhpcy5ib3R0b21PZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uICYmIHNjcm9sbCA+IHRoaXMudG9wT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uLm91dCh0aGlzLiRlbCwgdGhpcy5hbmltYXRpb24pLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLmhpZGUoKTsgfSwgbm9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0FjdGl2ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uLmNhbmNlbCh0aGlzLiRlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFuaW1hdGlvbi5pbih0aGlzLiRlbCwgdGhpcy5hbmltYXRpb24pLnRoZW4obnVsbCwgbm9vcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCddXG5cbiAgICAgICAgICAgIH0gXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy5wbGFjZWhvbGRlciwgJ2hpZGRlbicsIG51bGwpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlIHx8IGhhc0NsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRml4ZWQsIHRoaXMuY2xzQmVsb3cpO1xuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwge3Bvc2l0aW9uOiAnJywgdG9wOiAnJywgd2lkdGg6ICcnfSk7XG4gICAgICAgICAgICAgICAgYXR0cih0aGlzLnBsYWNlaG9sZGVyLCAnaGlkZGVuJywgJycpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0b3AgPSBNYXRoLm1heCgwLCB0aGlzLm9mZnNldCksIGFjdGl2ZSA9IHRoaXMuc2Nyb2xsID4gdGhpcy50b3A7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3R0b20gJiYgdGhpcy5zY3JvbGwgPiB0aGlzLmJvdHRvbSAtIHRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHRoaXMuYm90dG9tIC0gdGhpcy5zY3JvbGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICh0b3AgKyBcInB4XCIpLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0NsYXNzKHRoaXMuc2VsVGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzQmVsb3csIHRoaXMuc2Nyb2xsID4gdGhpcy5ib3R0b21PZmZzZXQpO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0ZpeGVkKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgc3ZncyA9IHt9O1xuXG52YXIgU3ZnID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3N2ZycsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IFN0cmluZyxcbiAgICAgICAgICAgIGljb246IFN0cmluZyxcbiAgICAgICAgICAgIHNyYzogU3RyaW5nLFxuICAgICAgICAgICAgc3R5bGU6IFN0cmluZyxcbiAgICAgICAgICAgIHdpZHRoOiBOdW1iZXIsXG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlcixcbiAgICAgICAgICAgIHJhdGlvOiBOdW1iZXIsXG4gICAgICAgICAgICAnY2xhc3MnOiBTdHJpbmdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgcmF0aW86IDEsXG4gICAgICAgICAgICBpZDogZmFsc2UsXG4gICAgICAgICAgICBleGNsdWRlOiBbJ3NyYyddLFxuICAgICAgICAgICAgJ2NsYXNzJzogJydcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdGhpcy5jbGFzcyArPSAnIHVrLXN2Zyc7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiBpbmNsdWRlcyh0aGlzLnNyYywgJyMnKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5zcmMuc3BsaXQoJyMnKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3JjID0gcGFydHNbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbiA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zdmcgPSB0aGlzLmdldFN2ZygpLnRoZW4oZnVuY3Rpb24gKHN2Zykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHN2ZykpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmljb24gJiYgaW5jbHVkZXMoc3ZnLCAnPHN5bWJvbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdmcgPSBwYXJzZVN5bWJvbHMoc3ZnLCB0aGlzJDEuaWNvbikgfHwgc3ZnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwgPSAkJDEoc3ZnLnN1YnN0cihzdmcuaW5kZXhPZignPHN2ZycpKSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IHN2Zy5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1NWRyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBhdHRyKGVsLCAndmlld0JveCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpbWVuc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucyA9IGRpbWVuc2lvbnMuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLndpZHRoID0gdGhpcyQxLiRwcm9wcy53aWR0aCB8fCBkaW1lbnNpb25zWzJdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEuaGVpZ2h0ID0gdGhpcyQxLiRwcm9wcy5oZWlnaHQgfHwgZGltZW5zaW9uc1szXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzJDEud2lkdGggKj0gdGhpcyQxLnJhdGlvO1xuICAgICAgICAgICAgICAgIHRoaXMkMS5oZWlnaHQgKj0gdGhpcyQxLnJhdGlvO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzJDEuJG9wdGlvbnMucHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMkMVtwcm9wXSAmJiAhaW5jbHVkZXModGhpcyQxLmV4Y2x1ZGUsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyKGVsLCBwcm9wLCB0aGlzJDFbcHJvcF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzJDEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQXR0cihlbCwgJ2lkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS53aWR0aCAmJiAhdGhpcyQxLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnaGVpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5oZWlnaHQgJiYgIXRoaXMkMS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBdHRyKGVsLCAnd2lkdGgnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMkMS4kZWw7XG4gICAgICAgICAgICAgICAgaWYgKGlzVm9pZEVsZW1lbnQocm9vdCkgfHwgcm9vdC50YWdOYW1lID09PSAnQ0FOVkFTJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGF0dHIocm9vdCwge2hpZGRlbjogdHJ1ZSwgaWQ6IG51bGx9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHJvb3QubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBlbC5pc0VxdWFsTm9kZShuZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBuZXh0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIocm9vdCwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcm9vdC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCAmJiBlbC5pc0VxdWFsTm9kZShsYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBsYXN0O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kKHJvb3QsIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcyQxLnN2Z0VsID0gZWw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG5cbiAgICAgICAgICAgIH0sIG5vb3ApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICBpZiAoaXNWb2lkRWxlbWVudCh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMuJGVsLCB7aGlkZGVuOiBudWxsLCBpZDogdGhpcy5pZCB8fCBudWxsfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN2Zykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ZnLnRoZW4oZnVuY3Rpb24gKHN2ZykgeyByZXR1cm4gKCF0aGlzJDEuX2Nvbm5lY3RlZCB8fCBzdmcgIT09IHRoaXMkMS5zdmdFbCkgJiYgcmVtb3ZlKHN2Zyk7IH0sIG5vb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IHRoaXMuc3ZnRWwgPSBudWxsO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBnZXRTdmc6IGZ1bmN0aW9uIGdldFN2ZygpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNyYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc3Znc1t0aGlzLnNyY10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN2Z3NbdGhpcy5zcmNdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN2Z3NbdGhpcy5zcmNdID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydHNXaXRoKHRoaXMkMS5zcmMsICdkYXRhOicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRlY29kZVVSSUNvbXBvbmVudCh0aGlzJDEuc3JjLnNwbGl0KCcsJylbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWpheCh0aGlzJDEuc3JjKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh4aHIpIHsgcmV0dXJuIHJlc29sdmUoeGhyLnJlc3BvbnNlKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiByZWplY3QoJ1NWRyBub3QgZm91bmQuJyk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc3Znc1t0aGlzLnNyY107XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHZhciBzeW1ib2xSZSA9IC88c3ltYm9sKC4qP2lkPShbJ1wiXSkoLio/KVxcMlteXSo/PFxcLylzeW1ib2w+L2csXG4gICAgICAgIHN5bWJvbHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlU3ltYm9scyhzdmcsIGljb24pIHtcblxuICAgICAgICBpZiAoIXN5bWJvbHNbc3ZnXSkge1xuXG4gICAgICAgICAgICBzeW1ib2xzW3N2Z10gPSB7fTtcblxuICAgICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgICAgd2hpbGUgKG1hdGNoID0gc3ltYm9sUmUuZXhlYyhzdmcpKSB7XG4gICAgICAgICAgICAgICAgc3ltYm9sc1tzdmddW21hdGNoWzNdXSA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiXCIgKyAobWF0Y2hbMV0pICsgXCJzdmc+XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzeW1ib2xzW3N2Z11baWNvbl07XG4gICAgfVxuXG59O1xuXG52YXIgU3dpdGNoZXIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc3dpdGNoZXInLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbVG9nZ2xhYmxlXSxcblxuICAgICAgICBhcmdzOiAnY29ubmVjdCcsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGNvbm5lY3Q6IFN0cmluZyxcbiAgICAgICAgICAgIHRvZ2dsZTogU3RyaW5nLFxuICAgICAgICAgICAgYWN0aXZlOiBOdW1iZXIsXG4gICAgICAgICAgICBzd2lwaW5nOiBCb29sZWFuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGNvbm5lY3Q6ICd+LnVrLXN3aXRjaGVyJyxcbiAgICAgICAgICAgIHRvZ2dsZTogJz4gKicsXG4gICAgICAgICAgICBhY3RpdmU6IDAsXG4gICAgICAgICAgICBzd2lwaW5nOiB0cnVlLFxuICAgICAgICAgICAgY2xzOiAndWstYWN0aXZlJyxcbiAgICAgICAgICAgIGNsc0NvbnRhaW5lcjogJ3VrLXN3aXRjaGVyJyxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstc3dpdGNoZXItaXRlbScsXG4gICAgICAgICAgICBxdWV1ZWQ6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBjb25uZWN0czogZnVuY3Rpb24gY29ubmVjdHMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdCA9IHJlZi5jb25uZWN0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5QWxsKGNvbm5lY3QsICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0b2dnbGVzOiBmdW5jdGlvbiB0b2dnbGVzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IHJlZi50b2dnbGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJCQodG9nZ2xlLCAkZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMudG9nZ2xlKSArIFwiOm5vdCgudWstZGlzYWJsZWQpXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZS5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0cztcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdLFtkYXRhLVwiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZGF0YShlLmN1cnJlbnQsIHRoaXMuYXR0ckl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3N3aXBlUmlnaHQgc3dpcGVMZWZ0JyxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zd2lwaW5nO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3RzO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RvdWNoKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghd2luLmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhlLnR5cGUgPT09ICdzd2lwZUxlZnQnID8gJ25leHQnIDogJ3ByZXZpb3VzJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHRoaXMuY29ubmVjdHMuZm9yRWFjaChmdW5jdGlvbiAobGlzdCkgeyByZXR1cm4gdGhpcyQxLnVwZGF0ZUFyaWEobGlzdC5jaGlsZHJlbik7IH0pO1xuICAgICAgICAgICAgdGhpcy5zaG93KGZpbHRlcih0aGlzLnRvZ2dsZXMsIChcIi5cIiArICh0aGlzLmNscykpKVswXSB8fCB0aGlzLnRvZ2dsZXNbdGhpcy5hY3RpdmVdIHx8IHRoaXMudG9nZ2xlc1swXSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy50b2dnbGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IGluZGV4KGZpbHRlcih0aGlzLmNvbm5lY3RzWzBdLmNoaWxkcmVuLCAoXCIuXCIgKyAodGhpcy5jbHMpKSlbMF0pLFxuICAgICAgICAgICAgICAgICAgICBoYXNQcmV2ID0gcHJldiA+PSAwLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gZ2V0SW5kZXgoaXRlbSwgdGhpcy50b2dnbGVzLCBwcmV2KSxcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gaXRlbSA9PT0gJ3ByZXZpb3VzJyA/IC0xIDogMSxcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKywgbmV4dCA9IChuZXh0ICsgZGlyICsgbGVuZ3RoKSAlIGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoZXModGhpcyQxLnRvZ2dsZXNbbmV4dF0sICcudWstZGlzYWJsZWQsIFtkaXNhYmxlZF0nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlID0gdGhpcyQxLnRvZ2dsZXNbbmV4dF07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdG9nZ2xlIHx8IHByZXYgPj0gMCAmJiBoYXNDbGFzcyh0b2dnbGUsIHRoaXMuY2xzKSB8fCBwcmV2ID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnRvZ2dsZXMsIHRoaXMuY2xzKTtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMudG9nZ2xlcywgJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModG9nZ2xlLCB0aGlzLmNscyk7XG4gICAgICAgICAgICAgICAgYXR0cih0b2dnbGUsICdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RzLmZvckVhY2goZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNQcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEudG9nZ2xlTm93KGxpc3QuY2hpbGRyZW5bbmV4dF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZUVsZW1lbnQoW2xpc3QuY2hpbGRyZW5bcHJldl0sIGxpc3QuY2hpbGRyZW5bbmV4dF1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBUYWIgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndGFiJywgVUlraXQuY29tcG9uZW50cy5zd2l0Y2hlci5leHRlbmQoe1xuXG4gICAgICAgIG1peGluczogW0NsYXNzXSxcblxuICAgICAgICBuYW1lOiAndGFiJyxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgbWVkaWE6ICdtZWRpYSdcbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbWVkaWE6IDk2MCxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstdGFiLWl0ZW0nXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcblxuICAgICAgICAgICAgdmFyIGNscyA9IGhhc0NsYXNzKHRoaXMuJGVsLCAndWstdGFiLWxlZnQnKVxuICAgICAgICAgICAgICAgID8gJ3VrLXRhYi1sZWZ0J1xuICAgICAgICAgICAgICAgIDogaGFzQ2xhc3ModGhpcy4kZWwsICd1ay10YWItcmlnaHQnKVxuICAgICAgICAgICAgICAgICAgICA/ICd1ay10YWItcmlnaHQnXG4gICAgICAgICAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChjbHMpIHtcbiAgICAgICAgICAgICAgICBVSWtpdC50b2dnbGUodGhpcy4kZWwsIHtjbHM6IGNscywgbW9kZTogJ21lZGlhJywgbWVkaWE6IHRoaXMubWVkaWF9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG59O1xuXG52YXIgVG9nZ2xlID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3RvZ2dsZScsIHtcblxuICAgICAgICBtaXhpbnM6IFtVSWtpdC5taXhpbi50b2dnbGFibGVdLFxuXG4gICAgICAgIGFyZ3M6ICd0YXJnZXQnLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBocmVmOiBTdHJpbmcsXG4gICAgICAgICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICAgICAgICBtb2RlOiAnbGlzdCcsXG4gICAgICAgICAgICBtZWRpYTogJ21lZGlhJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBocmVmOiBmYWxzZSxcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICBtb2RlOiAnY2xpY2snLFxuICAgICAgICAgICAgcXVldWVkOiB0cnVlLFxuICAgICAgICAgICAgbWVkaWE6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbiB0YXJnZXQocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9IHJlZi5ocmVmO1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gcXVlcnlBbGwodGFyZ2V0IHx8IGhyZWYsICRlbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5sZW5ndGggJiYgdGFyZ2V0IHx8IFskZWxdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IChwb2ludGVyRW50ZXIgKyBcIiBcIiArIHBvaW50ZXJMZWF2ZSksXG5cbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzKHRoaXMubW9kZSwgJ2hvdmVyJyk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVG91Y2goZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKChcInRvZ2dsZVwiICsgKGUudHlwZSA9PT0gcG9pbnRlckVudGVyID8gJ3Nob3cnIDogJ2hpZGUnKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmNsdWRlcyh0aGlzLm1vZGUsICdjbGljaycpIHx8IGhhc1RvdWNoO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVG91Y2goZSkgJiYgIWluY2x1ZGVzKHRoaXMubW9kZSwgJ2NsaWNrJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gYmV0dGVyIGlzVG9nZ2xlZCBoYW5kbGluZ1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3Nlc3QoZS50YXJnZXQsICdhW2hyZWY9XCIjXCJdLCBidXR0b24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGxpbmsgPSBjbG9zZXN0KGUudGFyZ2V0LCAnYVtocmVmXScpKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCAhaXNWaXNpYmxlKHRoaXMudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGxpbmsuaGFzaCAmJiBtYXRjaGVzKHRoaXMudGFyZ2V0LCBsaW5rLmhhc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpbmNsdWRlcyh0aGlzLm1vZGUsICdtZWRpYScpIHx8ICF0aGlzLm1lZGlhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlZCA9IHRoaXMuaXNUb2dnbGVkKHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAod2luLm1hdGNoTWVkaWEodGhpcy5tZWRpYSkubWF0Y2hlcyA/ICF0b2dnbGVkIDogdG9nZ2xlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUodHlwZSkge1xuICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyKHRoaXMudGFyZ2V0LCB0eXBlIHx8ICd0b2dnbGUnLCBbdGhpc10pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG52YXIgVmlkZW8gPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndmlkZW8nLCB7XG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGF1dG9tdXRlOiBCb29sZWFuLFxuICAgICAgICAgICAgYXV0b3BsYXk6IEJvb2xlYW4sXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHthdXRvbXV0ZTogZmFsc2UsIGF1dG9wbGF5OiB0cnVlfSxcblxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkoKSB7XG5cbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9tdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubXV0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiB7XG5cbiAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKHRoaXMuJGVsKSB8fCBjc3ModGhpcy4kZWwsICd2aXNpYmlsaXR5JykgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGV2ZW50czogWydsb2FkJ11cblxuICAgICAgICB9LFxuXG4gICAgfSk7XG5cbn07XG5cbnZhciBjb3JlID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgc2Nyb2xsID0gMCwgc3RhcnRlZCA9IDA7XG5cbiAgICBvbih3aW4sICdsb2FkIHJlc2l6ZScsIFVJa2l0LnVwZGF0ZSk7XG4gICAgb24od2luLCAnc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5kaXIgPSBzY3JvbGwgPCB3aW4ucGFnZVlPZmZzZXQgPyAnZG93bicgOiAndXAnO1xuICAgICAgICBzY3JvbGwgPSB3aW4ucGFnZVlPZmZzZXQ7XG4gICAgICAgIFVJa2l0LnVwZGF0ZShlKTtcbiAgICAgICAgZmFzdGRvbS5mbHVzaCgpO1xuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uc3RhcnQgJiYgb24oZG9jLCBhbmltYXRpb25zdGFydCwgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICBpZiAoKGNzcyh0YXJnZXQsICdhbmltYXRpb25OYW1lJykgfHwgJycpLm1hdGNoKC9edWstLioobGVmdHxyaWdodCkvKSkge1xuICAgICAgICAgICAgc3RhcnRlZCsrO1xuICAgICAgICAgICAgZG9jLmJvZHkuc3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIS0tc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBkb2MuYm9keS5zdHlsZS5vdmVyZmxvd1ggPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0b01zKGNzcyh0YXJnZXQsICdhbmltYXRpb25EdXJhdGlvbicpKSArIDEwMCk7XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIGNvcmUgY29tcG9uZW50c1xuICAgIFVJa2l0LnVzZShUb2dnbGUpO1xuICAgIFVJa2l0LnVzZShBY2NvcmRpb24pO1xuICAgIFVJa2l0LnVzZShBbGVydCk7XG4gICAgVUlraXQudXNlKFZpZGVvKTtcbiAgICBVSWtpdC51c2UoQ292ZXIpO1xuICAgIFVJa2l0LnVzZShEcm9wKTtcbiAgICBVSWtpdC51c2UoRHJvcGRvd24pO1xuICAgIFVJa2l0LnVzZShGb3JtQ3VzdG9tKTtcbiAgICBVSWtpdC51c2UoSGVpZ2h0TWF0Y2gpO1xuICAgIFVJa2l0LnVzZShIZWlnaHRWaWV3cG9ydCk7XG4gICAgVUlraXQudXNlKEhvdmVyKTtcbiAgICBVSWtpdC51c2UoTWFyZ2luKTtcbiAgICBVSWtpdC51c2UoR2lmKTtcbiAgICBVSWtpdC51c2UoR3JpZCk7XG4gICAgVUlraXQudXNlKExlYWRlcik7XG4gICAgVUlraXQudXNlKE1vZGFsJDEpO1xuICAgIFVJa2l0LnVzZShOYXYpO1xuICAgIFVJa2l0LnVzZShOYXZiYXIpO1xuICAgIFVJa2l0LnVzZShPZmZjYW52YXMpO1xuICAgIFVJa2l0LnVzZShSZXNwb25zaXZlKTtcbiAgICBVSWtpdC51c2UoU2Nyb2xsKTtcbiAgICBVSWtpdC51c2UoU2Nyb2xsc3B5KTtcbiAgICBVSWtpdC51c2UoU2Nyb2xsc3B5TmF2KTtcbiAgICBVSWtpdC51c2UoU3RpY2t5KTtcbiAgICBVSWtpdC51c2UoU3ZnKTtcbiAgICBVSWtpdC51c2UoSWNvbik7XG4gICAgVUlraXQudXNlKFN3aXRjaGVyKTtcbiAgICBVSWtpdC51c2UoVGFiKTtcblxufTtcblxuVUlraXQkMi52ZXJzaW9uID0gJzMuMC4wLWJldGEuMzMnO1xuXG5taXhpbihVSWtpdCQyKTtcbmNvcmUoVUlraXQkMik7XG5cbmZ1bmN0aW9uIHBsdWdpbihVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkID0gcmVmLiQ7XG4gICAgdmFyIGRvYyA9IHJlZi5kb2M7XG4gICAgdmFyIGVtcHR5ID0gcmVmLmVtcHR5O1xuICAgIHZhciBodG1sID0gcmVmLmh0bWw7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ2NvdW50ZG93bicsIHtcblxuICAgICAgICBtaXhpbnM6IFtVSWtpdC5taXhpbi5jbGFzc10sXG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRhdGU6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc1dyYXBwZXI6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBkYXRlOiAnJyxcbiAgICAgICAgICAgIGNsc1dyYXBwZXI6ICcudWstY291bnRkb3duLSV1bml0JSdcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBkYXRlOiBmdW5jdGlvbiBkYXRlKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gcmVmLmRhdGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZS5wYXJzZShkYXRlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRheXM6IGZ1bmN0aW9uIGRheXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnZGF5cycpLCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaG91cnM6IGZ1bmN0aW9uIGhvdXJzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsc1dyYXBwZXIgPSByZWYuY2xzV3JhcHBlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkKGNsc1dyYXBwZXIucmVwbGFjZSgnJXVuaXQlJywgJ2hvdXJzJyksICRlbCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBtaW51dGVzOiBmdW5jdGlvbiBtaW51dGVzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsc1dyYXBwZXIgPSByZWYuY2xzV3JhcHBlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkKGNsc1dyYXBwZXIucmVwbGFjZSgnJXVuaXQlJywgJ21pbnV0ZXMnKSwgJGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNlY29uZHM6IGZ1bmN0aW9uIHNlY29uZHMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzV3JhcHBlciA9IHJlZi5jbHNXcmFwcGVyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoY2xzV3JhcHBlci5yZXBsYWNlKCcldW5pdCUnLCAnc2Vjb25kcycpLCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdW5pdHM6IGZ1bmN0aW9uIHVuaXRzKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXS5maWx0ZXIoZnVuY3Rpb24gKHVuaXQpIHsgcmV0dXJuIHRoaXMkMVt1bml0XTsgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjb25uZWN0ZWQ6IGZ1bmN0aW9uIGNvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChmdW5jdGlvbiAodW5pdCkgeyByZXR1cm4gZW1wdHkodGhpcyQxW3VuaXRdKTsgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd2aXNpYmlsaXR5Y2hhbmdlJyxcblxuICAgICAgICAgICAgICAgIGVsOiBkb2MsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgdGltZXNwYW4gPSBnZXRUaW1lU3Bhbih0aGlzLmRhdGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzcGFuLnRvdGFsIDw9IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aW1lc3Bhbi5kYXlzXG4gICAgICAgICAgICAgICAgICAgICAgICA9IHRpbWVzcGFuLmhvdXJzXG4gICAgICAgICAgICAgICAgICAgICAgICA9IHRpbWVzcGFuLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgID0gdGltZXNwYW4uc2Vjb25kc1xuICAgICAgICAgICAgICAgICAgICAgICAgPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudW5pdHMuZm9yRWFjaChmdW5jdGlvbiAodW5pdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWdpdHMgPSBTdHJpbmcoTWF0aC5mbG9vcih0aW1lc3Bhblt1bml0XSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRpZ2l0cyA9IGRpZ2l0cy5sZW5ndGggPCAyID8gKFwiMFwiICsgZGlnaXRzKSA6IGRpZ2l0cztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzJDFbdW5pdF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC50ZXh0Q29udGVudCAhPT0gZGlnaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHMgPSBkaWdpdHMuc3BsaXQoJycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlnaXRzLmxlbmd0aCAhPT0gZWwuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbChlbCwgZGlnaXRzLm1hcChmdW5jdGlvbiAoKSB7IHJldHVybiAnPHNwYW4+PC9zcGFuPic7IH0pLmpvaW4oJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGlnaXRzLmZvckVhY2goZnVuY3Rpb24gKGRpZ2l0LCBpKSB7IHJldHVybiBlbC5jaGlsZHJlbltpXS50ZXh0Q29udGVudCA9IGRpZ2l0OyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGUgJiYgdGhpcy51bml0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLiRlbWl0KCk7IH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0VGltZVNwYW4oZGF0ZSkge1xuXG4gICAgICAgIHZhciB0b3RhbCA9IGRhdGUgLSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3RhbDogdG90YWwsXG4gICAgICAgICAgICBzZWNvbmRzOiB0b3RhbCAvIDEwMDAgJSA2MCxcbiAgICAgICAgICAgIG1pbnV0ZXM6IHRvdGFsIC8gMTAwMCAvIDYwICUgNjAsXG4gICAgICAgICAgICBob3VyczogdG90YWwgLyAxMDAwIC8gNjAgLyA2MCAlIDI0LFxuICAgICAgICAgICAgZGF5czogdG90YWwgLyAxMDAwIC8gNjAgLyA2MCAvIDI0XG4gICAgICAgIH07XG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbik7XG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQxKFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDEuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgJCQgPSByZWYuJCQ7XG4gICAgdmFyIGFkZENsYXNzID0gcmVmLmFkZENsYXNzO1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuICAgIHZhciBzY3JvbGxlZE92ZXIgPSByZWYuc2Nyb2xsZWRPdmVyO1xuICAgIHZhciB0b0Zsb2F0ID0gcmVmLnRvRmxvYXQ7XG4gICAgdmFyIHRvTm9kZXMgPSByZWYudG9Ob2RlcztcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnZ3JpZC1wYXJhbGxheCcsIFVJa2l0LmNvbXBvbmVudHMuZ3JpZC5leHRlbmQoe1xuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICB0YXJnZXQ6IFN0cmluZyxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IDE1MFxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSByZWYudHJhbnNsYXRlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRyYW5zbGF0ZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMocmVmLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQgPyAkJCh0YXJnZXQsICRlbCkgOiB0b05vZGVzKCRlbC5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwsICd1ay1ncmlkJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBjc3ModGhpcy4kZWwsICdtYXJnaW5Cb3R0b20nLCAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMucm93cyAmJiB0aGlzLnJvd3NbMF0gJiYgdGhpcy5yb3dzWzBdLmxlbmd0aCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3MgPSB0aGlzLnJvd3MgJiYgdGhpcy5yb3dzLm1hcChmdW5jdGlvbiAoZWxlbWVudHMpIHsgcmV0dXJuIHNvcnRCeShlbGVtZW50cywgJ29mZnNldExlZnQnKTsgfSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCAnbWFyZ2luQm90dG9tJywgdGhpcy5jb2x1bW5zID4gMVxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyYW5zbGF0ZSArIHRvRmxvYXQoY3NzKGNzcyh0aGlzLiRlbCwgJ21hcmdpbkJvdHRvbScsICcnKSwgJ21hcmdpbkJvdHRvbScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnJyk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsZWQgPSBzY3JvbGxlZE92ZXIodGhpcy4kZWwpICogdGhpcy50cmFuc2xhdGU7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yb3dzIHx8IHRoaXMuY29sdW1ucyA9PT0gMSB8fCAhdGhpcy5zY3JvbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHsgcmV0dXJuIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gY3NzKGVsLCAndHJhbnNmb3JtJywgKFwidHJhbnNsYXRlWShcIiArIChpICUgMiA/IHRoaXMkMS5zY3JvbGxlZCA6IHRoaXMkMS5zY3JvbGxlZCAvIDgpICsgXCJweClcIikpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApOyB9XG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuaXRlbXMsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSkpO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdncmlkLXBhcmFsbGF4Jykub3B0aW9ucy51cGRhdGUudW5zaGlmdCh7XG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzb3J0QnkoY29sbGVjdGlvbiwgcHJvcCkge1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhW3Byb3BdID4gYltwcm9wXVxuICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgIDogYltwcm9wXSA+IGFbcHJvcF1cbiAgICAgICAgICAgICAgICAgICAgPyAtMVxuICAgICAgICAgICAgICAgICAgICA6IDA7IH1cbiAgICAgICAgKVxuICAgIH1cblxufVxuXG5pZiAoIXRydWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlVJa2l0KSB7XG4gICAgd2luZG93LlVJa2l0LnVzZShwbHVnaW4kMSk7XG59XG5cbnZhciBBbmltYXRpb25zID0gZnVuY3Rpb24gKFVJa2l0KSB7XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgY3NzID0gcmVmLmNzcztcblxuICAgIHZhciBBbmltYXRpb25zID0ge1xuXG4gICAgICAgIHNsaWRlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKGRpciAqIC0xMDApfSxcbiAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHBlcmNlbnQ6IGZ1bmN0aW9uIHBlcmNlbnQoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBBbmltYXRpb25zLnRyYW5zbGF0ZWQoY3VycmVudCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQxKHBlcmNlbnQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZShkaXIgKiAtMTAwICogcGVyY2VudCl9LFxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoZGlyICogMTAwICogKDEgLSBwZXJjZW50KSl9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyYW5zbGF0ZWQ6IGZ1bmN0aW9uIHRyYW5zbGF0ZWQoZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhjc3MoZWwsICd0cmFuc2Zvcm0nKS5zcGxpdCgnLCcpWzRdIC8gZWwub2Zmc2V0V2lkdGgpXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gQW5pbWF0aW9ucztcblxufTtcblxuZnVuY3Rpb24gdHJhbnNsYXRlKHZhbHVlKSB7XG4gICAgaWYgKCB2YWx1ZSA9PT0gdm9pZCAwICkgdmFsdWUgPSAwO1xuXG4gICAgcmV0dXJuIChcInRyYW5zbGF0ZShcIiArIHZhbHVlICsgKHZhbHVlID8gJyUnIDogJycpICsgXCIsIDApXCIpOyAvLyBjdXJyZW50bHkgbm90IHRyYW5zbGF0ZTNkIHRvIHN1cHBvcnQgSUUsIHRyYW5zbGF0ZTNkIHdpdGhpbiB0cmFuc2xhdGUzZCBkb2VzIG5vdCB3b3JrIHdoaWxlIHRyYW5zaXRpb25pbmdcbn1cblxuZnVuY3Rpb24gc2NhbGUzZCh2YWx1ZSkge1xuICAgIHJldHVybiAoXCJzY2FsZTNkKFwiICsgdmFsdWUgKyBcIiwgXCIgKyB2YWx1ZSArIFwiLCAxKVwiKTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDMoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kMy5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkJCA9IHJlZi4kJDtcbiAgICB2YXIgJCA9IHJlZi4kO1xuICAgIHZhciBhZGRDbGFzcyA9IHJlZi5hZGRDbGFzcztcbiAgICB2YXIgYXNzaWduID0gcmVmLmFzc2lnbjtcbiAgICB2YXIgY3JlYXRlRXZlbnQgPSByZWYuY3JlYXRlRXZlbnQ7XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gICAgdmFyIGRhdGEgPSByZWYuZGF0YTtcbiAgICB2YXIgZG9jID0gcmVmLmRvYztcbiAgICB2YXIgZW5kc1dpdGggPSByZWYuZW5kc1dpdGg7XG4gICAgdmFyIGZhc3Rkb20gPSByZWYuZmFzdGRvbTtcbiAgICB2YXIgZ2V0SW5kZXggPSByZWYuZ2V0SW5kZXg7XG4gICAgdmFyIGdldFBvcyA9IHJlZi5nZXRQb3M7XG4gICAgdmFyIGhhc0NsYXNzID0gcmVmLmhhc0NsYXNzO1xuICAgIHZhciBpbmRleCA9IHJlZi5pbmRleDtcbiAgICB2YXIgaXNUb3VjaCA9IHJlZi5pc1RvdWNoO1xuICAgIHZhciBub29wID0gcmVmLm5vb3A7XG4gICAgdmFyIG9mZiA9IHJlZi5vZmY7XG4gICAgdmFyIG9uID0gcmVmLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHJlZi5wb2ludGVyRG93bjtcbiAgICB2YXIgcG9pbnRlck1vdmUgPSByZWYucG9pbnRlck1vdmU7XG4gICAgdmFyIHBvaW50ZXJVcCA9IHJlZi5wb2ludGVyVXA7XG4gICAgdmFyIHByZXZlbnRDbGljayA9IHJlZi5wcmV2ZW50Q2xpY2s7XG4gICAgdmFyIFByb21pc2UgPSByZWYuUHJvbWlzZTtcbiAgICB2YXIgcmVtb3ZlQ2xhc3MgPSByZWYucmVtb3ZlQ2xhc3M7XG4gICAgdmFyIHRvZ2dsZUNsYXNzID0gcmVmLnRvZ2dsZUNsYXNzO1xuICAgIHZhciB0b05vZGVzID0gcmVmLnRvTm9kZXM7XG4gICAgdmFyIFRyYW5zaXRpb24gPSByZWYuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHJlZi50cmlnZ2VyO1xuICAgIHZhciB3aW4gPSByZWYud2luO1xuXG4gICAgdmFyIGFicyA9IE1hdGguYWJzO1xuXG4gICAgVUlraXQubWl4aW4uc2xpZGVzaG93ID0ge1xuXG4gICAgICAgIGF0dHJzOiB0cnVlLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBhdXRvcGxheTogQm9vbGVhbixcbiAgICAgICAgICAgIGF1dG9wbGF5SW50ZXJ2YWw6IE51bWJlcixcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogQm9vbGVhbixcbiAgICAgICAgICAgIGFuaW1hdGlvbjogU3RyaW5nLFxuICAgICAgICAgICAgZWFzaW5nOiBTdHJpbmcsXG4gICAgICAgICAgICB2ZWxvY2l0eTogTnVtYmVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5SW50ZXJ2YWw6IDcwMDAsXG4gICAgICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRpb246ICdzbGlkZScsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICAgICAgICAgIHZlbG9jaXR5OiAxLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBzdGFjazogW10sXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDEwLFxuICAgICAgICAgICAgcGVyY2VudDogMCxcbiAgICAgICAgICAgIGNsc0FjdGl2ZTogJ3VrLWFjdGl2ZScsXG4gICAgICAgICAgICBjbHNBY3RpdmF0ZWQ6ICd1ay10cmFuc2l0aW9uLWFjdGl2ZScsXG4gICAgICAgICAgICBpbml0aWFsQW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIEFuaW1hdGlvbnM6IEFuaW1hdGlvbnMoVUlraXQpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICAgICAgbGlzdDogZnVuY3Rpb24gbGlzdChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxMaXN0ID0gcmVmLnNlbExpc3Q7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJChzZWxMaXN0LCAkZWwpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2xpZGVzOiBmdW5jdGlvbiBzbGlkZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvTm9kZXModGhpcy5saXN0LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFuaW1hdGlvbjogZnVuY3Rpb24gYW5pbWF0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSByZWYuYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBBbmltYXRpb25zJCQxID0gcmVmLkFuaW1hdGlvbnM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYXNzaWduKGFuaW1hdGlvbiBpbiBBbmltYXRpb25zJCQxID8gQW5pbWF0aW9ucyQkMVthbmltYXRpb25dIDogQW5pbWF0aW9ucyQkMS5zbGlkZSwge25hbWU6IGFuaW1hdGlvbn0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHVyYXRpb246IGZ1bmN0aW9uIGR1cmF0aW9uKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gcmVmLnZlbG9jaXR5O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwZWVkVXAoJGVsLm9mZnNldFdpZHRoIC8gdmVsb2NpdHkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICBbJ3N0YXJ0JywgJ21vdmUnLCAnZW5kJ10uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZuID0gdGhpcyQxW2tleV07XG4gICAgICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnZXRQb3MoZSkueDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzJDEucHJldlBvcyA9IHBvcyAhPT0gdGhpcyQxLnBvcyA/IHRoaXMkMS5wb3MgOiB0aGlzJDEucHJldlBvcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvcyA9IHBvcztcblxuICAgICAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jb21wdXRlZHMuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGV2ZW50czogWydsb2FkJywgJ3Jlc2l6ZSddXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnY2xpY2snLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiW1wiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdLFtkYXRhLVwiICsgKHRoaXMuYXR0ckl0ZW0pICsgXCJdXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coZGF0YShlLmN1cnJlbnQsIHRoaXMuYXR0ckl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IHBvaW50ZXJEb3duLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNlbExpc3QpICsgXCIgPiAqXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVG91Y2goZSkgfHwgIWhhc1RleHROb2Rlc09ubHkoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAndmlzaWJpbGl0eWNoYW5nZScsXG5cbiAgICAgICAgICAgICAgICBlbDogZG9jLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvYy5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6IHBvaW50ZXJEb3duLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICdzdG9wQXV0b3BsYXknXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdtb3VzZWVudGVyJyxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvcGxheTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0hvdmVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdtb3VzZWxlYXZlJyxcblxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvcGxheTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0hvdmVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnYmVmb3JlaXRlbXNob3cnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBmdW5jdGlvbiBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodGhpcy5zZWxMaXN0KSArIFwiID4gKlwiKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHJlZi50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3ModGFyZ2V0LCB0aGlzLmNsc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXNob3duJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmF0ZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93IGl0ZW1oaWRlJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKCQkKChcIltcIiArICh0aGlzLmF0dHJJdGVtKSArIFwiPVxcXCJcIiArIChpbmRleCh0YXJnZXQpKSArIFwiXFxcIl0sW2RhdGEtXCIgKyAodGhpcy5hdHRySXRlbSkgKyBcIj1cXFwiXCIgKyAoaW5kZXgodGFyZ2V0KSkgKyBcIlxcXCJdXCIpLCB0aGlzLiRlbCksIHRoaXMuY2xzQWN0aXZlLCBlbmRzV2l0aCh0eXBlLCAnc2hvdycpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtaGlkZGVuJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRhcmdldCwgdGhpcy5jbHNBY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0YXJnZXQsIHRoaXMuY2xzQWN0aXZhdGVkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtc2hvdyBpdGVtaGlkZSBpdGVtc2hvd24gaXRlbWhpZGRlbicsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNlbExpc3QpICsgXCIgPiAqXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuICAgICAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZHJhZ3N0YXJ0JyxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGUuYnV0dG9uICYmIGUuYnV0dG9uICE9PSAwIHx8IHRoaXMuc2xpZGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb24gJiYgdGhpcy5fYW5pbWF0aW9uLmFuaW1hdGlvbiAhPT0gdGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5fYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyID0gcmVmLmRpcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdldFBlcmNlbnQgPSByZWYucGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbmNlbCA9IHJlZi5jYW5jZWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGUkJDEgPSByZWYudHJhbnNsYXRlO1xuXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBnZXRQZXJjZW50KCkgKiBkaXI7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gYWJzKHBlcmNlbnQpICogLWRpcjtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnNwbGljZSgwLCB0aGlzLnN0YWNrLmxlbmd0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSQkMShhYnMocGVyY2VudCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldEluZGV4KHRoaXMuaW5kZXggLSBkaXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTW92ZSA9IG9uKGRvYywgcG9pbnRlck1vdmUsIHRoaXMubW92ZSwge2NhcHR1cmU6IHRydWUsIHBhc3NpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgb24od2luLCAnc2Nyb2xsJywgdGhpcy51bmJpbmRNb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihkb2MsIHBvaW50ZXJVcCwgdGhpcy5lbmQsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnID0gdGhpcy5wb3MgKyB0aGlzLiRlbC5vZmZzZXRXaWR0aCAqIHBlcmNlbnQ7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLnBvcyAtIHRoaXMuZHJhZztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXZQb3MgPT09IHRoaXMucG9zIHx8ICF0aGlzLmRyYWdnaW5nICYmIGFicyhkaXN0YW5jZSkgPCB0aGlzLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZS5jYW5jZWxhYmxlICYmIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBkaXN0YW5jZSAvIHRoaXMuJGVsLm9mZnNldFdpZHRoO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGVyY2VudCA9PT0gcGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuZ2V0SW5kZXgodGhpcy5pbmRleCAtIHRydW5jKHRoaXMucGVyY2VudCkpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuZ2V0SW5kZXgodGhpcy5pbmRleCAtIHRydW5jKHBlcmNlbnQpKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXMuc2xpZGVzW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgZGlyID0gcGVyY2VudCA8IDAgPyAxIDogLTEsXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IGdldEluZGV4KHBlcmNlbnQgPCAwID8gJ25leHQnIDogJ3ByZXZpb3VzJywgdGhpcy5zbGlkZXMsIGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuc2xpZGVzW25leHRJbmRleF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gdG9nZ2xlQ2xhc3MoZWwsIHRoaXMkMS5jbHNBY3RpdmUsIGkgPT09IGluZGV4IHx8IGkgPT09IG5leHRJbmRleCk7IH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uICYmIHRoaXMuX2FuaW1hdGlvbi5yZXNldCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBwcmV2SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLnNsaWRlc1twcmV2SW5kZXhdLCAnaXRlbWhpZGUnLCBbdGhpc10pO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKGN1cnJlbnQsICdpdGVtc2hvdycsIFt0aGlzXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbmV3IFRyYW5zaXRpb25lcih0aGlzLmFuaW1hdGlvbiwgdGhpcy5lYXNpbmcsIGN1cnJlbnQsIG5leHQsIGRpciwgbm9vcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZShhYnMocGVyY2VudCAlIDEpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IHBlcmNlbnQ7XG5cbiAgICAgICAgICAgICAgICBVSWtpdC51cGRhdGUobnVsbCwgY3VycmVudCk7XG4gICAgICAgICAgICAgICAgVUlraXQudXBkYXRlKG51bGwsIG5leHQpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG5cbiAgICAgICAgICAgICAgICBvZmYod2luLCAnc2Nyb2xsJywgdGhpcy51bmJpbmRNb3ZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1vdmUoKTtcbiAgICAgICAgICAgICAgICBvZmYoZG9jLCBwb2ludGVyVXAsIHRoaXMuZW5kLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50ID0gYWJzKHRoaXMucGVyY2VudCkgJSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5nZXRJbmRleCh0aGlzLmluZGV4IC0gdHJ1bmMocGVyY2VudCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlcmNlbnQgPCAuMSB8fCBwZXJjZW50IDwgMCA9PT0gdGhpcy5wb3MgPiB0aGlzLnByZXZQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmdldEluZGV4KHBlcmNlbnQgPiAwID8gJ3ByZXZpb3VzJyA6ICduZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSAxIC0gdGhpcy5wZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudCAqPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiAmJiB0aGlzLl9hbmltYXRpb24ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHBlcmNlbnQgPiAwID8gJ3ByZXZpb3VzJyA6ICduZXh0JywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJldmVudENsaWNrKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdcbiAgICAgICAgICAgICAgICAgICAgPSB0aGlzLmRyYWdnaW5nXG4gICAgICAgICAgICAgICAgICAgID0gdGhpcy5wZXJjZW50XG4gICAgICAgICAgICAgICAgICAgID0gbnVsbDtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhpbmRleCwgZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIGZvcmNlID09PSB2b2lkIDAgKSBmb3JjZSA9IGZhbHNlO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmIHRoaXMuZHJhZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFja1tmb3JjZSA/ICd1bnNoaWZ0JyA6ICdwdXNoJ10oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmb3JjZSAmJiB0aGlzLnN0YWNrLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5mb3J3YXJkKDI1MCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoaW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gaGFzQ2xhc3ModGhpcy5zbGlkZXMsICd1ay1hY3RpdmUnKSAmJiB0aGlzLnNsaWRlc1twcmV2SW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5zbGlkZXNbbmV4dEluZGV4XTtcblxuICAgICAgICAgICAgICAgIGlmIChwcmV2ID09PSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbZm9yY2UgPyAnc2hpZnQnIDogJ3BvcCddKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV2ICYmIHRyaWdnZXIocHJldiwgJ2JlZm9yZWl0ZW1oaWRlJywgW3RoaXNdKTtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyKG5leHQsICdiZWZvcmVpdGVtc2hvdycsIFt0aGlzXSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gbmV4dEluZGV4O1xuXG4gICAgICAgICAgICAgICAgdmFyIGRvbmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJldiAmJiB0cmlnZ2VyKHByZXYsICdpdGVtaGlkZGVuJywgW3RoaXMkMV0pO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyKG5leHQsICdpdGVtc2hvd24nLCBbdGhpcyQxXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZmFzdGRvbS5tdXRhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5zaG93KHRoaXMkMS5zdGFjay5zaGlmdCgpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl9hbmltYXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZXYgfHwgdGhpcy5pbml0aWFsQW5pbWF0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvdyhcbiAgICAgICAgICAgICAgICAgICAgICAgICFwcmV2ID8gdGhpcy5BbmltYXRpb25zW3RoaXMuaW5pdGlhbEFuaW1hdGlvbl0gOiB0aGlzLmFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlID8gJ2N1YmljLWJlemllcigwLjE2NSwgMC44NDAsIDAuNDQwLCAxLjAwMCknIDogdGhpcy5lYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldERpcmVjdGlvbihpbmRleCwgcHJldkluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2subGVuZ3RoID4gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXYgJiYgdHJpZ2dlcihwcmV2LCAnaXRlbWhpZGUnLCBbdGhpc10pO1xuICAgICAgICAgICAgICAgIHRyaWdnZXIobmV4dCwgJ2l0ZW1zaG93JywgW3RoaXNdKTtcblxuICAgICAgICAgICAgICAgIGlmICghcHJldiAmJiAhdGhpcy5pbml0aWFsQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV2ICYmIGZhc3Rkb20uZmx1c2goKTsgLy8gaU9TIDEwKyB3aWxsIGhvbm9yIHRoZSB2aWRlby5wbGF5IG9ubHkgaWYgY2FsbGVkIGZyb20gYSBnZXN0dXJlIGhhbmRsZXJcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgX3Nob3c6IGZ1bmN0aW9uIF9zaG93KGFuaW1hdGlvbiwgZWFzaW5nLCBwcmV2LCBuZXh0LCBkaXIsIGZvcndhcmQsIGRvbmUpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IG5ldyBUcmFuc2l0aW9uZXIoXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nLFxuICAgICAgICAgICAgICAgICAgICBwcmV2LFxuICAgICAgICAgICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgICAgICAgICBkaXIsXG4gICAgICAgICAgICAgICAgICAgIGRvbmVcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnNob3coXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPT09IG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gMzAwXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZvcndhcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDE1MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJjZW50LFxuICAgICAgICAgICAgICAgICAgICBmb3J3YXJkXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0SW5kZXg6IGZ1bmN0aW9uIGdldEluZGV4JDEoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID09PSB2b2lkIDAgKSBpbmRleCA9IHRoaXMuaW5kZXg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0SW5kZXgoaW5kZXgsIHRoaXMuc2xpZGVzLCB0aGlzLmluZGV4KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0YXJ0QXV0b3BsYXk6IGZ1bmN0aW9uIHN0YXJ0QXV0b3BsYXkoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkgeyByZXR1cm4gISh0aGlzJDEuaXNIb3ZlcmluZyAmJiB0aGlzJDEucGF1c2VPbkhvdmVyKSAmJiB0aGlzJDEuc2hvdygnbmV4dCcpOyB9LCB0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3RvcEF1dG9wbGF5OiBmdW5jdGlvbiBzdG9wQXV0b3BsYXkoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFRyYW5zaXRpb25lcihhbmltYXRpb24sIGVhc2luZywgY3VycmVudCwgbmV4dCwgZGlyLCBjYikge1xuXG4gICAgICAgIHZhciBwZXJjZW50ID0gYW5pbWF0aW9uLnBlcmNlbnQ7XG4gICAgICAgIHZhciB0cmFuc2xhdGUkJDEgPSBhbmltYXRpb24udHJhbnNsYXRlO1xuICAgICAgICB2YXIgc2hvdyA9IGFuaW1hdGlvbi5zaG93O1xuICAgICAgICB2YXIgcHJvcHMgPSBzaG93KGRpcik7XG5cbiAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgICAgICBuZXh0OiBuZXh0LFxuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGR1cmF0aW9uLCBwZXJjZW50LCBsaW5lYXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIHBlcmNlbnQgPT09IHZvaWQgMCApIHBlcmNlbnQgPSAwO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZWFzZSA9IGxpbmVhciA/ICdsaW5lYXInIDogZWFzaW5nO1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uIC09IE1hdGgucm91bmQoZHVyYXRpb24gKiBwZXJjZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlKHBlcmNlbnQpO1xuXG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZShuZXh0LCAnaXRlbWluJywge3BlcmNlbnQ6IHBlcmNlbnQsIGR1cmF0aW9uOiBkdXJhdGlvbiwgZWFzZTogZWFzZSwgZGlyOiBkaXJ9KTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ICYmIHRyaWdnZXJVcGRhdGUoY3VycmVudCwgJ2l0ZW1vdXQnLCB7cGVyY2VudDogMSAtIHBlcmNlbnQsIGR1cmF0aW9uOiBkdXJhdGlvbiwgZWFzZTogZWFzZSwgZGlyOiBkaXJ9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQobmV4dCwgcHJvcHNbMV0sIGR1cmF0aW9uLCBlYXNlKSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCAmJiBUcmFuc2l0aW9uLnN0YXJ0KGN1cnJlbnQsIHByb3BzWzBdLCBkdXJhdGlvbiwgZWFzZSlcbiAgICAgICAgICAgICAgICBdKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICAgICAgfSwgbm9vcCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBUcmFuc2l0aW9uLnN0b3AoW25leHQsIGN1cnJlbnRdKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKFtuZXh0LCBjdXJyZW50XSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBjc3MoW25leHQsIGN1cnJlbnRdLCBwcm9wLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9yd2FyZDogZnVuY3Rpb24gZm9yd2FyZChkdXJhdGlvbikge1xuXG4gICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSB0aGlzLnBlcmNlbnQoKTtcbiAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLmNhbmNlbChbbmV4dCwgY3VycmVudF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdyhkdXJhdGlvbiwgcGVyY2VudCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJDEocGVyY2VudCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb3BzID0gdHJhbnNsYXRlJCQxKHBlcmNlbnQsIGRpcik7XG4gICAgICAgICAgICAgICAgY3NzKG5leHQsIHByb3BzWzFdKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ICYmIGNzcyhjdXJyZW50LCBwcm9wc1swXSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlclVwZGF0ZShuZXh0LCAnaXRlbXRyYW5zbGF0ZWluJywge3BlcmNlbnQ6IHBlcmNlbnQsIGRpcjogZGlyfSk7XG4gICAgICAgICAgICAgICAgY3VycmVudCAmJiB0cmlnZ2VyVXBkYXRlKGN1cnJlbnQsICdpdGVtdHJhbnNsYXRlb3V0Jywge3BlcmNlbnQ6IDEgLSBwZXJjZW50LCBkaXI6IGRpcn0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudCQxKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50KGN1cnJlbnQsIG5leHQsIGRpcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZShlbCwgdHlwZSwgZGF0YSkge1xuICAgICAgICB0cmlnZ2VyKGVsLCBjcmVhdGVFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRhdGEpKTtcbiAgICB9XG5cbiAgICAvLyBwb2x5ZmlsbCBmb3IgTWF0aC50cnVuYyAoSUUpXG4gICAgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICAgICAgICByZXR1cm4gfn54O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERpcmVjdGlvbihpbmRleCwgcHJldkluZGV4KSB7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gJ25leHQnXG4gICAgICAgICAgICA/IDFcbiAgICAgICAgICAgIDogaW5kZXggPT09ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgOiBpbmRleCA8IHByZXZJbmRleFxuICAgICAgICAgICAgICAgICAgICA/IC0xXG4gICAgICAgICAgICAgICAgICAgIDogMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGVlZFVwKHgpIHtcbiAgICAgICAgcmV0dXJuIC41ICogeCArIDMwMDsgLy8gcGFyYWJvbGEgdGhyb3VnaCAoNDAwLDUwMDsgNjAwLDYwMDsgMTgwMCwxMjAwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc1RleHROb2Rlc09ubHkoZWwpIHtcbiAgICAgICAgcmV0dXJuICFlbC5jaGlsZHJlbi5sZW5ndGggJiYgZWwuY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgfVxuXG59XG5cbnZhciBBbmltYXRpb25zJDEgPSBmdW5jdGlvbiAoVUlraXQpIHtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBhc3NpZ24gPSByZWYuYXNzaWduO1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuXG4gICAgcmV0dXJuIGFzc2lnbih7fSwgbWl4aW4uc2xpZGVzaG93LmRlZmF1bHRzLkFuaW1hdGlvbnMsIHtcblxuICAgICAgICBmYWRlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJCQxKHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnR9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogcGVyY2VudH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2NhbGU6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMil9LFxuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiBzY2FsZTNkKDEpfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkJDEocGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudCwgdHJhbnNmb3JtOiBzY2FsZTNkKDEgLSAuMiAqIHBlcmNlbnQpfSxcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxIC0gLjIgKyAuMiAqIHBlcmNlbnQpfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIHBsdWdpbiQyKFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDIuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBVSWtpdC51c2UocGx1Z2luJDMpO1xuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIHV0aWwgPSBVSWtpdC51dGlsO1xuICAgIHZhciAkID0gdXRpbC4kO1xuICAgIHZhciAkJCA9IHV0aWwuJCQ7XG4gICAgdmFyIGFkZENsYXNzID0gdXRpbC5hZGRDbGFzcztcbiAgICB2YXIgYWpheCA9IHV0aWwuYWpheDtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGFzc2lnbiA9IHV0aWwuYXNzaWduO1xuICAgIHZhciBhdHRyID0gdXRpbC5hdHRyO1xuICAgIHZhciBjc3MgPSB1dGlsLmNzcztcbiAgICB2YXIgZG9jID0gdXRpbC5kb2M7XG4gICAgdmFyIGRvY0VsID0gdXRpbC5kb2NFbDtcbiAgICB2YXIgZGF0YSA9IHV0aWwuZGF0YTtcbiAgICB2YXIgZ2V0SW1hZ2UgPSB1dGlsLmdldEltYWdlO1xuICAgIHZhciBodG1sID0gdXRpbC5odG1sO1xuICAgIHZhciBpbmRleCA9IHV0aWwuaW5kZXg7XG4gICAgdmFyIG9uID0gdXRpbC5vbjtcbiAgICB2YXIgcG9pbnRlckRvd24gPSB1dGlsLnBvaW50ZXJEb3duO1xuICAgIHZhciBwb2ludGVyTW92ZSA9IHV0aWwucG9pbnRlck1vdmU7XG4gICAgdmFyIHJlbW92ZUNsYXNzID0gdXRpbC5yZW1vdmVDbGFzcztcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHV0aWwuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHV0aWwudHJpZ2dlcjtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbGlnaHRib3gnLCB7XG5cbiAgICAgICAgYXR0cnM6IHRydWUsXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogU3RyaW5nLFxuICAgICAgICAgICAgdG9nZ2xlOiBTdHJpbmcsXG4gICAgICAgICAgICBhdXRvcGxheTogQm9vbGVhbixcbiAgICAgICAgICAgIGF1dG9wbGF5SW50ZXJ2YWw6IE51bWJlcixcbiAgICAgICAgICAgIHZpZGVvQXV0b3BsYXk6IEJvb2xlYW5cbiAgICAgICAgfSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0b2dnbGU6ICdhJyxcbiAgICAgICAgICAgIGF1dG9wbGF5OiAwLFxuICAgICAgICAgICAgdmlkZW9BdXRvcGxheTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0b2dnbGVzOiBmdW5jdGlvbiB0b2dnbGVzKHJlZiwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IHJlZi50b2dnbGU7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlcyA9ICQkKHRvZ2dsZSwgJGVsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQgPSAhdGhpcy5fdG9nZ2xlc1xuICAgICAgICAgICAgICAgICAgICB8fCB0b2dnbGVzLmxlbmd0aCAhPT0gdGhpcy5fdG9nZ2xlcy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfHwgdG9nZ2xlcy5zb21lKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gZWwgIT09IHRoaXMkMS5fdG9nZ2xlc1tpXTsgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9nZ2xlcyA9IHRvZ2dsZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsLiRkZXN0cm95KHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMudG9nZ2xlKSArIFwiOm5vdCgudWstZGlzYWJsZWQpXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coaW5kZXgodGhpcy50b2dnbGVzLCBlLmN1cnJlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wYW5lbCAmJiB0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuJHByb3BzLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWwuJGVtaXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRvZ2dsZXMubGVuZ3RoIHx8ICF0aGlzLl9jaGFuZ2VkIHx8ICF0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhbmVsLiRkZXN0cm95KHRydWUpO1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWwgPSB0aGlzLnBhbmVsIHx8IFVJa2l0LmxpZ2h0Ym94UGFuZWwoYXNzaWduKHt9LCB0aGlzLiRwcm9wcywge1xuICAgICAgICAgICAgICAgICAgICBpdGVtczogdGhpcy50b2dnbGVzLnJlZHVjZShmdW5jdGlvbiAoaXRlbXMsIGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKFsnaHJlZicsICdjYXB0aW9uJywgJ3R5cGUnLCAncG9zdGVyJ10ucmVkdWNlKGZ1bmN0aW9uIChvYmosIGF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ciA9PT0gJ2hyZWYnID8gJ3NvdXJjZScgOiBhdHRyXSA9IGRhdGEoZWwsIGF0dHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgICAgICAgICAgICB9LCBbXSlcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhbmVsLnNob3coaW5kZXgpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFuZWwgJiYgdGhpcy5wYW5lbC5oaWRlKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbGlnaHRib3gtcGFuZWwnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbbWl4aW4uY29udGFpbmVyLCBtaXhpbi50b2dnbGFibGUsIG1peGluLnNsaWRlc2hvd10sXG5cbiAgICAgICAgZnVuY3Rpb25hbDogdHJ1ZSxcblxuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgcHJlbG9hZDogMSxcbiAgICAgICAgICAgIHZpZGVvQXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXlDb250cm9sczogMzAwMCxcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIGNsczogJ3VrLW9wZW4nLFxuICAgICAgICAgICAgY2xzUGFnZTogJ3VrLWxpZ2h0Ym94LXBhZ2UnLFxuICAgICAgICAgICAgc2VsTGlzdDogJy51ay1saWdodGJveC1pdGVtcycsXG4gICAgICAgICAgICBhdHRySXRlbTogJ3VrLWxpZ2h0Ym94LWl0ZW0nLFxuICAgICAgICAgICAgaW5pdGlhbEFuaW1hdGlvbjogJ3NjYWxlJyxcbiAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogZmFsc2UsXG4gICAgICAgICAgICB2ZWxvY2l0eTogMixcbiAgICAgICAgICAgIEFuaW1hdGlvbnM6IEFuaW1hdGlvbnMkMShVSWtpdCksXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPVxcXCJ1ay1saWdodGJveCB1ay1vdmVyZmxvdy1oaWRkZW5cXFwiPiA8dWwgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWl0ZW1zXFxcIj48L3VsPiA8ZGl2IGNsYXNzPVxcXCJ1ay1saWdodGJveC10b29sYmFyIHVrLXBvc2l0aW9uLXRvcCB1ay10ZXh0LXJpZ2h0IHVrLXRyYW5zaXRpb24tc2xpZGUtdG9wIHVrLXRyYW5zaXRpb24tb3BhcXVlXFxcIj4gPGJ1dHRvbiBjbGFzcz1cXFwidWstbGlnaHRib3gtdG9vbGJhci1pY29uIHVrLWNsb3NlLWxhcmdlXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHVrLWNsb3NlIHVrLXRvZ2dsZT1cXFwiIS51ay1saWdodGJveFxcXCI+PC9idXR0b24+IDwvZGl2PiA8YSBjbGFzcz1cXFwidWstbGlnaHRib3gtYnV0dG9uIHVrLXBvc2l0aW9uLWNlbnRlci1sZWZ0IHVrLXBvc2l0aW9uLW1lZGl1bSB1ay10cmFuc2l0aW9uLWZhZGVcXFwiIGhyZWY9XFxcIiNcXFwiIHVrLXNsaWRlbmF2LXByZXZpb3VzIHVrLWxpZ2h0Ym94LWl0ZW09XFxcInByZXZpb3VzXFxcIj48L2E+IDxhIGNsYXNzPVxcXCJ1ay1saWdodGJveC1idXR0b24gdWstcG9zaXRpb24tY2VudGVyLXJpZ2h0IHVrLXBvc2l0aW9uLW1lZGl1bSB1ay10cmFuc2l0aW9uLWZhZGVcXFwiIGhyZWY9XFxcIiNcXFwiIHVrLXNsaWRlbmF2LW5leHQgdWstbGlnaHRib3gtaXRlbT1cXFwibmV4dFxcXCI+PC9hPiA8ZGl2IGNsYXNzPVxcXCJ1ay1saWdodGJveC10b29sYmFyIHVrLWxpZ2h0Ym94LWNhcHRpb24gdWstcG9zaXRpb24tYm90dG9tIHVrLXRleHQtY2VudGVyIHVrLXRyYW5zaXRpb24tc2xpZGUtYm90dG9tIHVrLXRyYW5zaXRpb24tb3BhcXVlXFxcIj48L2Rpdj4gPC9kaXY+XCJcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVkOiBmdW5jdGlvbiBjcmVhdGVkKCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgdGhpcy4kbW91bnQoYXBwZW5kKHRoaXMuY29udGFpbmVyLCB0aGlzLnRlbXBsYXRlKSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbiA9ICQoJy51ay1saWdodGJveC1jYXB0aW9uJywgdGhpcy4kZWwpO1xuXG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7IHJldHVybiBhcHBlbmQodGhpcyQxLmxpc3QsIFwiPGxpPjwvbGk+XCIpOyB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogW1xuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAocG9pbnRlck1vdmUgKyBcIiBcIiArIHBvaW50ZXJEb3duICsgXCIga2V5ZG93blwiKSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICdzaG93Q29udHJvbHMnXG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdjbGljaycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNlbExpc3QpICsgXCIgPiAqXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRDbGFzcyhkb2NFbCwgdGhpcy5jbHNQYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvd24nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICdzaG93Q29udHJvbHMnXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBuYW1lOiAnaGlkZScsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogJ2hpZGVDb250cm9scydcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdoaWRkZW4nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKGRvY0VsLCB0aGlzLmNsc1BhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdrZXl1cCcsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2M7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1RvZ2dsZWQodGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCdwcmV2aW91cycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coJ25leHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICd0b2dnbGUnLFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdiZWZvcmVpdGVtc2hvdycsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZGVsZWdhdGU6IGZ1bmN0aW9uIGRlbGVnYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCh0aGlzLnNlbExpc3QpICsgXCIgPiAqXCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTm93KHRoaXMuJGVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgbmFtZTogJ2l0ZW1zaG93JyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBkZWxlZ2F0ZTogZnVuY3Rpb24gZGVsZWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHRoaXMuc2VsTGlzdCkgKyBcIiA+ICpcIik7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcmVmLnRhcmdldDtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gaW5kZXgodGFyZ2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb24gPSB0aGlzLmdldEl0ZW0oaSkuY2FwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzLmNhcHRpb24sICdkaXNwbGF5JywgY2FwdGlvbiA/ICcnIDogJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwodGhpcy5jYXB0aW9uLCBjYXB0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSB0aGlzLnByZWxvYWQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmxvYWRJdGVtKHRoaXMkMS5nZXRJbmRleChpICsgaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmxvYWRJdGVtKHRoaXMkMS5nZXRJbmRleChpIC0gaikpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtbG9hZCcsXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKF8sIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gaXRlbS5zb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gaXRlbS50eXBlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEl0ZW0oaXRlbSwgJzxzcGFuIHVrLXNwaW5uZXI+PC9zcGFuPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBJbWFnZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2ltYWdlJyB8fCBzb3VyY2UubWF0Y2goL1xcLihqcChlKT9nfHBuZ3xnaWZ8c3ZnKSQvaSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW1hZ2Uoc291cmNlKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChpbWcpIHsgcmV0dXJuIHRoaXMkMS5zZXRJdGVtKGl0ZW0sIChcIjxpbWcgd2lkdGg9XFxcIlwiICsgKGltZy53aWR0aCkgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIChpbWcuaGVpZ2h0KSArIFwiXFxcIiBzcmM9XFxcIlwiICsgc291cmNlICsgXCJcXFwiPlwiKSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNldEVycm9yKGl0ZW0pOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJyB8fCBzb3VyY2UubWF0Y2goL1xcLihtcDR8d2VibXxvZ3YpJC9pKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW8gPSAkKChcIjx2aWRlbyBjb250cm9scyBwbGF5c2lubGluZVwiICsgKGl0ZW0ucG9zdGVyID8gKFwiIHBvc3Rlcj1cXFwiXCIgKyAoaXRlbS5wb3N0ZXIpICsgXCJcXFwiXCIpIDogJycpICsgXCIgdWstdmlkZW89XFxcImF1dG9wbGF5OiBcIiArICh0aGlzLnZpZGVvQXV0b3BsYXkpICsgXCJcXFwiPjwvdmlkZW8+XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIodmlkZW8sICdzcmMnLCBzb3VyY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbih2aWRlbywgJ2Vycm9yJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnNldEVycm9yKGl0ZW0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uKHZpZGVvLCAnbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cih2aWRlbywge3dpZHRoOiB2aWRlby52aWRlb1dpZHRoLCBoZWlnaHQ6IHZpZGVvLnZpZGVvSGVpZ2h0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNldEl0ZW0oaXRlbSwgdmlkZW8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWZyYW1lXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2lmcmFtZScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0sIChcIjxpZnJhbWUgY2xhc3M9XFxcInVrLWxpZ2h0Ym94LWlmcmFtZVxcXCIgc3JjPVxcXCJcIiArIHNvdXJjZSArIFwiXFxcIiBmcmFtZWJvcmRlcj1cXFwiMFxcXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlwiKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gWW91dHViZVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZXMgPSBzb3VyY2UubWF0Y2goL1xcL1xcLy4qP3lvdXR1YmVcXC5bYS16XStcXC93YXRjaFxcP3Y9KFteJlxcc10rKS8pIHx8IHNvdXJjZS5tYXRjaCgveW91dHVcXC5iZVxcLyguKikvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBtYXRjaGVzWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElmcmFtZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggd2lkdGggPT09IHZvaWQgMCApIHdpZHRoID0gNjQwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGhlaWdodCA9PT0gdm9pZCAwICkgaGVpZ2h0ID0gNDUwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEuc2V0SXRlbShpdGVtLCBnZXRJZnJhbWUoKFwiLy93d3cueW91dHViZS5jb20vZW1iZWQvXCIgKyBpZCksIHdpZHRoLCBoZWlnaHQsIHRoaXMkMS52aWRlb0F1dG9wbGF5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbWFnZSgoXCIvL2ltZy55b3V0dWJlLmNvbS92aS9cIiArIGlkICsgXCIvbWF4cmVzZGVmYXVsdC5qcGdcIikpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWYud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veW91dHViZSBkZWZhdWx0IDQwNCB0aHVtYiwgZmFsbCBiYWNrIHRvIGxvd3Jlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGggPT09IDEyMCAmJiBoZWlnaHQgPT09IDkwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbWFnZSgoXCIvL2ltZy55b3V0dWJlLmNvbS92aS9cIiArIGlkICsgXCIvMC5qcGdcIikpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWYud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSByZWYuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRJZnJhbWUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElmcmFtZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpbWVvXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlcyA9IHNvdXJjZS5tYXRjaCgvKFxcL1xcLy4qPyl2aW1lb1xcLlthLXpdK1xcLyhbMC05XSspLio/LykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWpheCgoXCIvL3ZpbWVvLmNvbS9hcGkvb2VtYmVkLmpzb24/bWF4d2lkdGg9MTkyMCZ1cmw9XCIgKyAoZW5jb2RlVVJJKHNvdXJjZSkpKSwge3Jlc3BvbnNlVHlwZTogJ2pzb24nfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmX3Jlc3BvbnNlID0gcmVmLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IHJlZl9yZXNwb25zZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSByZWZfcmVzcG9uc2Uud2lkdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzJDEuc2V0SXRlbShpdGVtLCBnZXRJZnJhbWUoKFwiLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1wiICsgKG1hdGNoZXNbMl0pKSwgd2lkdGgsIGhlaWdodCwgdGhpcyQxLnZpZGVvQXV0b3BsYXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuXG4gICAgICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1RvZ2dsZWQoKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2dnbGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVOb3codGhpcy4kZWwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyh0aGlzLnNsaWRlcywgdGhpcy5jbHNBY3RpdmUpO1xuICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RvcCh0aGlzLnNsaWRlcyk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5pbmRleDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5wZXJjZW50O1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hbmltYXRpb247XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxvYWRJdGVtOiBmdW5jdGlvbiBsb2FkSXRlbShpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gdGhpcy5pbmRleDtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ2l0ZW1sb2FkJywgW2l0ZW1dKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldEl0ZW06IGZ1bmN0aW9uIGdldEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID09PSB2b2lkIDAgKSBpbmRleCA9IHRoaXMuaW5kZXg7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1tpbmRleF0gfHwge307XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXRJdGVtOiBmdW5jdGlvbiBzZXRJdGVtKGl0ZW0sIGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBhc3NpZ24oaXRlbSwge2NvbnRlbnQ6IGNvbnRlbnR9KTtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBodG1sKHRoaXMuc2xpZGVzW3RoaXMuaXRlbXMuaW5kZXhPZihpdGVtKV0sIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdpdGVtbG9hZGVkJywgW3RoaXMsIGVsXSk7XG4gICAgICAgICAgICAgICAgVUlraXQudXBkYXRlKG51bGwsIGVsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldEVycm9yOiBmdW5jdGlvbiBzZXRFcnJvcihpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJdGVtKGl0ZW0sICc8c3BhbiB1ay1pY29uPVwiaWNvbjogYm9sdDsgcmF0aW86IDJcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzaG93Q29udHJvbHM6IGZ1bmN0aW9uIHNob3dDb250cm9scygpIHtcblxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNvbnRyb2xzVGltZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHNUaW1lciA9IHNldFRpbWVvdXQodGhpcy5oaWRlQ29udHJvbHMsIHRoaXMuZGVsYXlDb250cm9scyk7XG5cbiAgICAgICAgICAgICAgICBhdHRyKCQkKChcIltcIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXSxbZGF0YS1cIiArICh0aGlzLmF0dHJJdGVtKSArIFwiXVwiKSwgdGhpcy4kZWwpLCAnaGlkZGVuJywgdGhpcy5pdGVtcy5sZW5ndGggPCAyID8gJycgOiBudWxsKTtcblxuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlIHVrLXRyYW5zaXRpb24tYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGVDb250cm9sczogZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCAndWstYWN0aXZlIHVrLXRyYW5zaXRpb24tYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRJZnJhbWUoc3JjLCB3aWR0aCwgaGVpZ2h0LCBhdXRvcGxheSkge1xuICAgICAgICByZXR1cm4gKFwiPGlmcmFtZSBzcmM9XFxcIlwiICsgc3JjICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIHdpZHRoICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBoZWlnaHQgKyBcIlxcXCIgc3R5bGU9XFxcIm1heC13aWR0aDogMTAwJTsgYm94LXNpemluZzogYm9yZGVyLWJveDtcXFwiIGZyYW1lYm9yZGVyPVxcXCIwXFxcIiBhbGxvd2Z1bGxzY3JlZW4gdWstdmlkZW89XFxcImF1dG9wbGF5OiBcIiArIGF1dG9wbGF5ICsgXCJcXFwiIHVrLXJlc3BvbnNpdmU+PC9pZnJhbWU+XCIpO1xuICAgIH1cblxufVxuXG5pZiAoIXRydWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlVJa2l0KSB7XG4gICAgd2luZG93LlVJa2l0LnVzZShwbHVnaW4kMik7XG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQ0KFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDQuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVmID0gVUlraXQudXRpbDtcbiAgICB2YXIgYXBwZW5kID0gcmVmLmFwcGVuZDtcbiAgICB2YXIgY2xvc2VzdCA9IHJlZi5jbG9zZXN0O1xuICAgIHZhciBjc3MgPSByZWYuY3NzO1xuICAgIHZhciBlYWNoID0gcmVmLmVhY2g7XG4gICAgdmFyIHBvaW50ZXJFbnRlciA9IHJlZi5wb2ludGVyRW50ZXI7XG4gICAgdmFyIHBvaW50ZXJMZWF2ZSA9IHJlZi5wb2ludGVyTGVhdmU7XG4gICAgdmFyIHJlbW92ZSA9IHJlZi5yZW1vdmU7XG4gICAgdmFyIHRvRmxvYXQgPSByZWYudG9GbG9hdDtcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHJlZi5UcmFuc2l0aW9uO1xuICAgIHZhciB0cmlnZ2VyID0gcmVmLnRyaWdnZXI7XG4gICAgdmFyIGNvbnRhaW5lcnMgPSB7fTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnbm90aWZpY2F0aW9uJywge1xuXG4gICAgICAgIGZ1bmN0aW9uYWw6IHRydWUsXG5cbiAgICAgICAgYXJnczogWydtZXNzYWdlJywgJ3N0YXR1cyddLFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICAgICAgZ3JvdXA6IG51bGwsXG4gICAgICAgICAgICBwb3M6ICd0b3AtY2VudGVyJyxcbiAgICAgICAgICAgIGNsc0Nsb3NlOiAndWstbm90aWZpY2F0aW9uLWNsb3NlJyxcbiAgICAgICAgICAgIGNsc01zZzogJ3VrLW5vdGlmaWNhdGlvbi1tZXNzYWdlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uIGNyZWF0ZWQoKSB7XG5cbiAgICAgICAgICAgIGlmICghY29udGFpbmVyc1t0aGlzLnBvc10pIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJzW3RoaXMucG9zXSA9IGFwcGVuZChVSWtpdC5jb250YWluZXIsIChcIjxkaXYgY2xhc3M9XFxcInVrLW5vdGlmaWNhdGlvbiB1ay1ub3RpZmljYXRpb24tXCIgKyAodGhpcy5wb3MpICsgXCJcXFwiPjwvZGl2PlwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBjc3MoY29udGFpbmVyc1t0aGlzLnBvc10sICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICAgICAgICAgIHRoaXMuJG1vdW50KGFwcGVuZChjb250YWluZXIsXG4gICAgICAgICAgICAgICAgKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNNc2cpICsgKHRoaXMuc3RhdHVzID8gKFwiIFwiICsgKHRoaXMuY2xzTXNnKSArIFwiLVwiICsgKHRoaXMuc3RhdHVzKSkgOiAnJykgKyBcIlxcXCI+IDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJcIiArICh0aGlzLmNsc0Nsb3NlKSArIFwiXFxcIiBkYXRhLXVrLWNsb3NlPjwvYT4gPGRpdj5cIiArICh0aGlzLm1lc3NhZ2UpICsgXCI8L2Rpdj4gPC9kaXY+XCIpXG4gICAgICAgICAgICApKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHZhciBtYXJnaW5Cb3R0b20gPSB0b0Zsb2F0KGNzcyh0aGlzLiRlbCwgJ21hcmdpbkJvdHRvbScpKTtcbiAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQoXG4gICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7b3BhY2l0eTogMCwgbWFyZ2luVG9wOiAtMSAqIHRoaXMuJGVsLm9mZnNldEhlaWdodCwgbWFyZ2luQm90dG9tOiAwfSksXG4gICAgICAgICAgICAgICAge29wYWNpdHk6IDEsIG1hcmdpblRvcDogMCwgbWFyZ2luQm90dG9tOiBtYXJnaW5Cb3R0b219XG4gICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzJDEudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzJDEudGltZXIgPSBzZXRUaW1lb3V0KHRoaXMkMS5jbG9zZSwgdGhpcyQxLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHtcblxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xvc2VzdChlLnRhcmdldCwgJ2FbaHJlZj1cIiNcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBvYmpbcG9pbnRlckVudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb2JqW3BvaW50ZXJMZWF2ZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCh0aGlzLmNsb3NlLCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9iaiApLFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlRm4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzJDEuJGVsLCAnY2xvc2UnLCBbdGhpcyQxXSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZSh0aGlzJDEuJGVsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lcnNbdGhpcyQxLnBvc10uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoY29udGFpbmVyc1t0aGlzJDEucG9zXSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRm4oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBUcmFuc2l0aW9uLnN0YXJ0KHRoaXMuJGVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAtMSAqIHRoaXMuJGVsLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogMFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlbW92ZUZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgdmFyIG9iajtcblxuICAgIFVJa2l0Lm5vdGlmaWNhdGlvbi5jbG9zZUFsbCA9IGZ1bmN0aW9uIChncm91cCwgaW1tZWRpYXRlKSB7XG4gICAgICAgIGVhY2goVUlraXQuaW5zdGFuY2VzLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50LiRvcHRpb25zLm5hbWUgPT09ICdub3RpZmljYXRpb24nICYmICghZ3JvdXAgfHwgZ3JvdXAgPT09IGNvbXBvbmVudC5ncm91cCkpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY2xvc2UoaW1tZWRpYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxufVxuXG5pZiAoIXRydWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlVJa2l0KSB7XG4gICAgd2luZG93LlVJa2l0LnVzZShwbHVnaW4kNCk7XG59XG5cbmZ1bmN0aW9uIHBsdWdpbiQ1KFVJa2l0KSB7XG5cbiAgICBpZiAocGx1Z2luJDUuaW5zdGFsbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgdXRpbCA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGNsYW1wID0gdXRpbC5jbGFtcDtcbiAgICB2YXIgY3NzID0gdXRpbC5jc3M7XG4gICAgdmFyIERpbWVuc2lvbnMgPSB1dGlsLkRpbWVuc2lvbnM7XG4gICAgdmFyIGVhY2ggPSB1dGlsLmVhY2g7XG4gICAgdmFyIGdldEltYWdlID0gdXRpbC5nZXRJbWFnZTtcbiAgICB2YXIgaW5jbHVkZXMgPSB1dGlsLmluY2x1ZGVzO1xuICAgIHZhciBpc051bWJlciA9IHV0aWwuaXNOdW1iZXI7XG4gICAgdmFyIGlzVW5kZWZpbmVkID0gdXRpbC5pc1VuZGVmaW5lZDtcbiAgICB2YXIgc2Nyb2xsZWRPdmVyID0gdXRpbC5zY3JvbGxlZE92ZXI7XG4gICAgdmFyIHRvRmxvYXQgPSB1dGlsLnRvRmxvYXQ7XG4gICAgdmFyIHF1ZXJ5ID0gdXRpbC5xdWVyeTtcbiAgICB2YXIgd2luID0gdXRpbC53aW47XG5cbiAgICB2YXIgcHJvcHMgPSBbJ3gnLCAneScsICdiZ3gnLCAnYmd5JywgJ3JvdGF0ZScsICdzY2FsZScsICdjb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InLCAnYm9yZGVyQ29sb3InLCAnb3BhY2l0eScsICdibHVyJywgJ2h1ZScsICdncmF5c2NhbGUnLCAnaW52ZXJ0JywgJ3NhdHVyYXRlJywgJ3NlcGlhJywgJ2ZvcGFjaXR5J107XG5cbiAgICBtaXhpbi5wYXJhbGxheCA9IHtcblxuICAgICAgICBwcm9wczogcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcCkge1xuICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSAnbGlzdCc7XG4gICAgICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIG1lZGlhOiAnbWVkaWEnXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGRlZmF1bHRzOiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGRlZmF1bHRzLCBwcm9wKSB7XG4gICAgICAgICAgICBkZWZhdWx0c1twcm9wXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbWVkaWE6IGZhbHNlXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgICAgIHByb3BzOiBmdW5jdGlvbiBwcm9wcyQxKHByb3BlcnRpZXMsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChwcm9wcywgcHJvcCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChwcm9wZXJ0aWVzW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29sb3IgPSBwcm9wLm1hdGNoKC9jb2xvci9pKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3NzUHJvcCA9IGlzQ29sb3IgfHwgcHJvcCA9PT0gJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBwcm9wZXJ0aWVzW3Byb3BdLnNsaWNlKDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLCBiZ1BvcywgZGlmZjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDc3NQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoJGVsLCBwcm9wLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMudW5zaGlmdCgocHJvcCA9PT0gJ3NjYWxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXNDc3NQcm9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gY3NzKCRlbCwgcHJvcClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwKSB8fCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1bml0ID0gaW5jbHVkZXMoc3RlcHMuam9pbignJyksICclJykgPyAnJScgOiAncHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbG9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9ICRlbC5zdHlsZS5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzID0gc3RlcHMubWFwKGZ1bmN0aW9uIChzdGVwKSB7IHJldHVybiBwYXJzZUNvbG9yKCRlbCwgc3RlcCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLnN0eWxlLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSBzdGVwcy5tYXAodG9GbG9hdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wLm1hdGNoKC9eYmcvKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MoJGVsLCAoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLVwiICsgKHByb3BbMl0pKSwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmdQb3MgPSBjc3MoJGVsLCAnYmFja2dyb3VuZFBvc2l0aW9uJykuc3BsaXQoJyAnKVtwcm9wWzJdID09PSAneCcgPyAwIDogMV07IC8vIElFIDExIGNhbid0IHJlYWQgYmFja2dyb3VuZC1wb3NpdGlvbi1beHx5XVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmNvdmVycykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluLmFwcGx5KE1hdGgsIHN0ZXBzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgc3RlcHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3duID0gc3RlcHMuaW5kZXhPZihtaW4pIDwgc3RlcHMuaW5kZXhPZihtYXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZiA9IG1heCAtIG1pbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzID0gc3RlcHMubWFwKGZ1bmN0aW9uIChzdGVwKSB7IHJldHVybiBzdGVwIC0gKGRvd24gPyBtaW4gOiBtYXgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSAoZG93biA/IC1kaWZmIDogMCkgKyBcInB4XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBiZ1BvcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSB7c3RlcHM6IHN0ZXBzLCB1bml0OiB1bml0LCBwb3M6IHBvcywgYmdQb3M6IGJnUG9zLCBkaWZmOiBkaWZmfTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHM7XG5cbiAgICAgICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGJnUHJvcHM6IGZ1bmN0aW9uIGJnUHJvcHMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gWydiZ3gnLCAnYmd5J10uZmlsdGVyKGZ1bmN0aW9uIChiZykgeyByZXR1cm4gYmcgaW4gdGhpcyQxLnByb3BzOyB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvdmVyczogZnVuY3Rpb24gY292ZXJzKF8sICRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjc3MoJGVsLnN0eWxlLmJhY2tncm91bmRTaXplICE9PSAnJyA/IGNzcygkZWwsICdiYWNrZ3JvdW5kU2l6ZScsICcnKSA6ICRlbCwgJ2JhY2tncm91bmRTaXplJykgPT09ICdjb3Zlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBkaXNjb25uZWN0ZWQ6IGZ1bmN0aW9uIGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9pbWFnZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY29tcHV0ZWRzLnByb3BzO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9ICF0aGlzLm1lZGlhIHx8IHdpbi5tYXRjaE1lZGlhKHRoaXMubWVkaWEpLm1hdGNoZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWFnZS5kaW1FbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy4kZWwub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLiRlbC5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX2ltYWdlKSB8fCAhdGhpcy5jb3ZlcnMgfHwgIXRoaXMuYmdQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcmMgPSBjc3ModGhpcy4kZWwsICdiYWNrZ3JvdW5kSW1hZ2UnKS5yZXBsYWNlKC9ebm9uZXx1cmxcXChbXCInXT8oLis/KVtcIiddP1xcKSQvLCAnJDEnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBnZXRJbWFnZShzcmMpLnRoZW4oZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLl9pbWFnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogaW1nLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGltZy5uYXR1cmFsSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJGVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5faW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHtiYWNrZ3JvdW5kU2l6ZTogJycsIGJhY2tncm91bmRSZXBlYXQ6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSB0aGlzLl9pbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbUVsID0gaW1hZ2UuZGltRWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaW0gPSBEaW1lbnNpb25zLmNvdmVyKGltYWdlLCBkaW1FbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZ1Byb3BzLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IHRoaXMkMS5wcm9wc1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWZmID0gcmVmLmRpZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmdQb3MgPSByZWYuYmdQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcHMgPSByZWYuc3RlcHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IHByb3AgPT09ICdiZ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYW4gPSBkaW1bYXR0cl0gLSBkaW1FbFthdHRyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFiZ1Bvcy5tYXRjaCgvJSR8MHB4LykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuIDwgZGlmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpbUVsW2F0dHJdID0gZGltW2F0dHJdICsgZGlmZiAtIHNwYW47XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNwYW4gPiBkaWZmKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZ1BvcyA9IHBhcnNlRmxvYXQoYmdQb3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJnUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5wcm9wc1twcm9wXS5zdGVwcyA9IHN0ZXBzLm1hcChmdW5jdGlvbiAoc3RlcCkgeyByZXR1cm4gc3RlcCAtIChzcGFuIC0gZGlmZikgLyAoMTAwIC8gYmdQb3MpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpbSA9IERpbWVuc2lvbnMuY292ZXIoaW1hZ2UsIGRpbUVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogKChkaW0ud2lkdGgpICsgXCJweCBcIiArIChkaW0uaGVpZ2h0KSArIFwicHhcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAnbm8tcmVwZWF0J1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBldmVudHM6IFsnbG9hZCcsICdyZXNpemUnXVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgICAgIGVhY2godGhpcy5nZXRDc3MoMCksIGZ1bmN0aW9uIChfLCBwcm9wKSB7IHJldHVybiBjc3ModGhpcyQxLiRlbCwgcHJvcCwgJycpOyB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldENzczogZnVuY3Rpb24gZ2V0Q3NzKHBlcmNlbnQpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzID0gdGhpcy5wcm9wcztcblxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcykucmVkdWNlKGZ1bmN0aW9uIChjc3MsIHByb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gcHJvcHNbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwcyA9IHJlZi5zdGVwcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXQgPSByZWYudW5pdDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IHJlZi5wb3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKHN0ZXBzLCBwZXJjZW50KTtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3ApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNmb3Jtc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWYkMSA9IFsneCcsICd5J10ubWFwKGZ1bmN0aW9uIChkaXIpIHsgcmV0dXJuIHByb3AgPT09IGRpclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHZhbHVlICsgdW5pdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHByb3BzW2Rpcl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0VmFsdWUocHJvcHNbZGlyXS5zdGVwcywgcGVyY2VudCkgKyBwcm9wc1tkaXJdLnVuaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMDsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gcmVmJDFbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciB5ID0gcmVmJDFbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkID0gY3NzLnRyYW5zZm9ybSArPSBcIiB0cmFuc2xhdGUzZChcIiArIHggKyBcIiwgXCIgKyB5ICsgXCIsIDApXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyb3RhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy50cmFuc2Zvcm0gKz0gXCIgcm90YXRlKFwiICsgdmFsdWUgKyBcImRlZylcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NjYWxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MudHJhbnNmb3JtICs9IFwiIHNjYWxlKFwiICsgdmFsdWUgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmcgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JneSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdiZ3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1soXCJiYWNrZ3JvdW5kLXBvc2l0aW9uLVwiICsgKHByb3BbMl0pKV0gPSBcImNhbGMoXCIgKyBwb3MgKyBcIiArIFwiICsgKHZhbHVlICsgdW5pdCkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JhY2tncm91bmRDb2xvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib3JkZXJDb2xvcic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmJDIgPSBnZXRTdGVwKHN0ZXBzLCBwZXJjZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcmVmJDJbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmQgPSByZWYkMlsxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSByZWYkMlsyXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc1twcm9wXSA9IFwicmdiYShcIiArIChzdGFydC5tYXAoZnVuY3Rpb24gKHZhbHVlLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgcCAqIChlbmRbaV0gLSB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMyA/IHRvRmxvYXQodmFsdWUpIDogcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLCcpKSArIFwiKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDU1MgRmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuZmlsdGVyICs9IFwiIGJsdXIoXCIgKyB2YWx1ZSArIFwicHgpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdodWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzcy5maWx0ZXIgKz0gXCIgaHVlLXJvdGF0ZShcIiArIHZhbHVlICsgXCJkZWcpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmb3BhY2l0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzLmZpbHRlciArPSBcIiBvcGFjaXR5KFwiICsgdmFsdWUgKyBcIiUpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdncmF5c2NhbGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW52ZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NhdHVyYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlcGlhJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3MuZmlsdGVyICs9IFwiIFwiICsgcHJvcCArIFwiKFwiICsgdmFsdWUgKyBcIiUpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3NzO1xuXG4gICAgICAgICAgICAgICAgfSwge3RyYW5zZm9ybTogJycsIGZpbHRlcjogJyd9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3BhcmFsbGF4Jywge1xuXG4gICAgICAgIG1peGluczogW21peGluLnBhcmFsbGF4XSxcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgdGFyZ2V0OiBTdHJpbmcsXG4gICAgICAgICAgICB2aWV3cG9ydDogTnVtYmVyLFxuICAgICAgICAgICAgZWFzaW5nOiBOdW1iZXIsXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHRhcmdldDogZmFsc2UsXG4gICAgICAgICAgICB2aWV3cG9ydDogMSxcbiAgICAgICAgICAgIGVhc2luZzogMSxcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uIHRhcmdldChyZWYsICRlbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSByZWYudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldCAmJiBxdWVyeSh0YXJnZXQsICRlbCkgfHwgJGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJldjtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IFtcblxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZXJjZW50ID0gZWFzZShzY3JvbGxlZE92ZXIodGhpcy50YXJnZXQpIC8gKHRoaXMudmlld3BvcnQgfHwgMSksIHRoaXMuZWFzaW5nKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gJ3Njcm9sbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcmV2ICE9PSB0aGlzLl9wZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHRoaXMuZ2V0Q3NzKHRoaXMuX3BlcmNlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXYgPSB0aGlzLl9wZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbJ3Njcm9sbCcsICdsb2FkJywgJ3Jlc2l6ZSddXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBlYXNlKHBlcmNlbnQsIGVhc2luZykge1xuICAgICAgICByZXR1cm4gY2xhbXAocGVyY2VudCAqICgxIC0gKGVhc2luZyAtIGVhc2luZyAqIHBlcmNlbnQpKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZUNvbG9yKGVsLCBjb2xvcikge1xuICAgICAgICByZXR1cm4gY3NzKGNzcyhlbCwgJ2NvbG9yJywgY29sb3IpLCAnY29sb3InKS5zcGxpdCgvWygpLF0vZykuc2xpY2UoMSwgLTEpLmNvbmNhdCgxKS5zbGljZSgwLCA0KS5tYXAoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIHRvRmxvYXQobik7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0ZXAoc3RlcHMsIHBlcmNlbnQpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gc3RlcHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIGluZGV4ID0gTWF0aC5taW4oTWF0aC5mbG9vcihjb3VudCAqIHBlcmNlbnQpLCBjb3VudCAtIDEpLFxuICAgICAgICAgICAgc3RlcCA9IHN0ZXBzLnNsaWNlKGluZGV4LCBpbmRleCArIDIpO1xuXG4gICAgICAgIHN0ZXAucHVzaChwZXJjZW50ID09PSAxID8gMSA6IHBlcmNlbnQgJSAoMSAvIGNvdW50KSAqIGNvdW50KTtcblxuICAgICAgICByZXR1cm4gc3RlcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWYWx1ZShzdGVwcywgcGVyY2VudCkge1xuICAgICAgICB2YXIgcmVmID0gZ2V0U3RlcChzdGVwcywgcGVyY2VudCk7XG4gICAgICAgIHZhciBzdGFydCA9IHJlZlswXTtcbiAgICAgICAgdmFyIGVuZCA9IHJlZlsxXTtcbiAgICAgICAgdmFyIHAgPSByZWZbMl07XG4gICAgICAgIHJldHVybiAoaXNOdW1iZXIoc3RhcnQpXG4gICAgICAgICAgICA/IHN0YXJ0ICsgTWF0aC5hYnMoc3RhcnQgLSBlbmQpICogcCAqIChzdGFydCA8IGVuZCA/IDEgOiAtMSlcbiAgICAgICAgICAgIDogK2VuZFxuICAgICAgICApLnRvRml4ZWQoMik7XG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQ1KTtcbn1cblxudmFyIEFuaW1hdGlvbnMkMiA9IGZ1bmN0aW9uIChVSWtpdCkge1xuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIHJlZiA9IFVJa2l0LnV0aWw7XG4gICAgdmFyIGFzc2lnbiA9IHJlZi5hc3NpZ247XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG5cbiAgICB2YXIgQW5pbWF0aW9ucyQkMSA9IGFzc2lnbih7fSwgbWl4aW4uc2xpZGVzaG93LmRlZmF1bHRzLkFuaW1hdGlvbnMsIHtcblxuICAgICAgICBmYWRlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgIHt6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIGNzcyhjdXJyZW50LCAnb3BhY2l0eScpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdHJhbnNsYXRlOiBmdW5jdGlvbiB0cmFuc2xhdGUkJDEocGVyY2VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHtvcGFjaXR5OiAxIC0gcGVyY2VudCwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAge3pJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHNjYWxlOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge29wYWNpdHk6IDAsIHRyYW5zZm9ybTogc2NhbGUzZCgxICsgLjUpLCB6SW5kZXg6IDB9LFxuICAgICAgICAgICAgICAgICAgICB7ekluZGV4OiAtMX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBjc3MoY3VycmVudCwgJ29wYWNpdHknKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJCQxKHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7b3BhY2l0eTogMSAtIHBlcmNlbnQsIHRyYW5zZm9ybTogc2NhbGUzZCgxICsgLjUgKiBwZXJjZW50KSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAge3pJbmRleDogLTF9XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHB1bGw6IHtcblxuICAgICAgICAgICAgc2hvdzogZnVuY3Rpb24gc2hvdyhkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMCksIHpJbmRleDogLTF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKCksIHpJbmRleDogMH0gXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwKSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpLCB6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcGVyY2VudDogZnVuY3Rpb24gcGVyY2VudChjdXJyZW50LCBuZXh0LCBkaXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlyIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IDEgLSBBbmltYXRpb25zJCQxLnRyYW5zbGF0ZWQobmV4dClcbiAgICAgICAgICAgICAgICAgICAgOiBBbmltYXRpb25zJCQxLnRyYW5zbGF0ZWQoY3VycmVudCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uIHRyYW5zbGF0ZSQxKHBlcmNlbnQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDMwICogcGVyY2VudCksIHpJbmRleDogLTF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAgKiAoMSAtIHBlcmNlbnQpKSwgekluZGV4OiAwfSBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKC1wZXJjZW50ICogMTAwKSwgekluZGV4OiAwfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMCAqICgxIC0gcGVyY2VudCkpLCB6SW5kZXg6IC0xfVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHVzaDoge1xuXG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbiBzaG93KGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoKSwgekluZGV4OiAtMX0gXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzApLCB6SW5kZXg6IC0xfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZSgpLCB6SW5kZXg6IDB9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBwZXJjZW50OiBmdW5jdGlvbiBwZXJjZW50KGN1cnJlbnQsIG5leHQsIGRpcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXIgPiAwXG4gICAgICAgICAgICAgICAgICAgID8gMSAtIEFuaW1hdGlvbnMkJDEudHJhbnNsYXRlZChuZXh0KVxuICAgICAgICAgICAgICAgICAgICA6IEFuaW1hdGlvbnMkJDEudHJhbnNsYXRlZChjdXJyZW50KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24gdHJhbnNsYXRlJDIocGVyY2VudCwgZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpciA8IDBcbiAgICAgICAgICAgICAgICAgICAgPyBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUocGVyY2VudCAqIDEwMCksIHpJbmRleDogMH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwICogKDEgLSBwZXJjZW50KSksIHpJbmRleDogLTF9IF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMwICogcGVyY2VudCksIHpJbmRleDogLTF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCAqICgxIC0gcGVyY2VudCkpLCB6SW5kZXg6IDB9XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gQW5pbWF0aW9ucyQkMTtcblxufTtcblxuZnVuY3Rpb24gcGx1Z2luJDYoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kNi5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJa2l0LnVzZShwbHVnaW4kNSk7XG4gICAgVUlraXQudXNlKHBsdWdpbiQzKTtcblxuICAgIHZhciBtaXhpbiA9IFVJa2l0Lm1peGluO1xuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBjbG9zZXN0ID0gcmVmLmNsb3Nlc3Q7XG4gICAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gICAgdmFyIGZhc3Rkb20gPSByZWYuZmFzdGRvbTtcbiAgICB2YXIgZW5kc1dpdGggPSByZWYuZW5kc1dpdGg7XG4gICAgdmFyIGhlaWdodCA9IHJlZi5oZWlnaHQ7XG4gICAgdmFyIG5vb3AgPSByZWYubm9vcDtcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHJlZi5UcmFuc2l0aW9uO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzbGlkZXNob3cnLCB7XG5cbiAgICAgICAgbWl4aW5zOiBbbWl4aW4uY2xhc3MsIG1peGluLnNsaWRlc2hvd10sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHJhdGlvOiBTdHJpbmcsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IEJvb2xlYW4sXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IEJvb2xlYW4sXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgICAgIHJhdGlvOiAnMTY6OScsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIHNlbExpc3Q6ICcudWstc2xpZGVzaG93LWl0ZW1zJyxcbiAgICAgICAgICAgIGF0dHJJdGVtOiAndWstc2xpZGVzaG93LWl0ZW0nLFxuICAgICAgICAgICAgQW5pbWF0aW9uczogQW5pbWF0aW9ucyQyKFVJa2l0KVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWR5OiBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICBmYXN0ZG9tLm11dGF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuc2hvdyh0aGlzJDEuaW5kZXgpOyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gdGhpcy5yYXRpby5zcGxpdCgnOicpLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHJlZlswXTtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy4kZWwub2Zmc2V0V2lkdGggLyB3aWR0aDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KHRoaXMubWluSGVpZ2h0LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5taW4odGhpcy5tYXhIZWlnaHQsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0KHRoaXMubGlzdCwgTWF0aC5mbG9vcih0aGlzLmhlaWdodCkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZXZlbnRzOiBbJ2xvYWQnLCAncmVzaXplJ11cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgnc2xpZGVzaG93LXBhcmFsbGF4Jywge1xuXG4gICAgICAgIG1peGluczogW21peGluLnBhcmFsbGF4XSxcblxuICAgICAgICBjb21wdXRlZDoge1xuXG4gICAgICAgICAgICBpdGVtOiBmdW5jdGlvbiBpdGVtKCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXNob3cgPSBVSWtpdC5nZXRDb21wb25lbnQoY2xvc2VzdCh0aGlzLiRlbCwgJy51ay1zbGlkZXNob3cnKSwgJ3NsaWRlc2hvdycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzbGlkZXNob3cgJiYgY2xvc2VzdCh0aGlzLiRlbCwgKChzbGlkZXNob3cuc2VsTGlzdCkgKyBcIiA+ICpcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiBbXG5cbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtc2hvd24nLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB0aGlzLmdldENzcyguNSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdpdGVtaW4gaXRlbW91dCcsXG5cbiAgICAgICAgICAgICAgICBzZWxmOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZWw6IGZ1bmN0aW9uIGVsKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiBoYW5kbGVyKHJlZikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVmX2RldGFpbCA9IHJlZi5kZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcmVmX2RldGFpbC5wZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSByZWZfZGV0YWlsLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWFzZSA9IHJlZl9kZXRhaWwuZWFzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZl9kZXRhaWwuZGlyO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgVHJhbnNpdGlvbi5jYW5jZWwodGhpcy4kZWwpO1xuICAgICAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwsIHRoaXMuZ2V0Q3NzKGdldEN1cnJlbnQodHlwZSwgZGlyLCBwZXJjZW50KSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uc3RhcnQodGhpcy4kZWwsIHRoaXMuZ2V0Q3NzKGlzSW4odHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gLjVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZGlyID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogMFxuICAgICAgICAgICAgICAgICAgICApLCBkdXJhdGlvbiwgZWFzZSkuY2F0Y2gobm9vcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3RyYW5zaXRpb25jYW5jZWxlZCB0cmFuc2l0aW9uZW5kJyxcblxuICAgICAgICAgICAgICAgIHNlbGY6IHRydWUsXG5cbiAgICAgICAgICAgICAgICBlbDogZnVuY3Rpb24gZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnaXRlbXRyYW5zbGF0ZWluIGl0ZW10cmFuc2xhdGVvdXQnLFxuXG4gICAgICAgICAgICAgICAgc2VsZjogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGVsOiBmdW5jdGlvbiBlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gaGFuZGxlcihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZl9kZXRhaWwgPSByZWYuZGV0YWlsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IHJlZl9kZXRhaWwucGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IHJlZl9kZXRhaWwuZGlyO1xuXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zaXRpb24uY2FuY2VsKHRoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgY3NzKHRoaXMuJGVsLCB0aGlzLmdldENzcyhnZXRDdXJyZW50KHR5cGUsIGRpciwgcGVyY2VudCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBpc0luKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGVuZHNXaXRoKHR5cGUsICdpbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnQodHlwZSwgZGlyLCBwZXJjZW50KSB7XG5cbiAgICAgICAgcGVyY2VudCAvPSAyO1xuXG4gICAgICAgIHJldHVybiAhaXNJbih0eXBlKVxuICAgICAgICAgICAgPyBkaXIgPCAwXG4gICAgICAgICAgICAgICAgPyBwZXJjZW50XG4gICAgICAgICAgICAgICAgOiAxIC0gcGVyY2VudFxuICAgICAgICAgICAgOiBkaXIgPCAwXG4gICAgICAgICAgICAgICAgPyAxIC0gcGVyY2VudFxuICAgICAgICAgICAgICAgIDogcGVyY2VudDtcbiAgICB9XG5cbn1cblxuaWYgKCF0cnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5VSWtpdCkge1xuICAgIHdpbmRvdy5VSWtpdC51c2UocGx1Z2luJDYpO1xufVxuXG5mdW5jdGlvbiBwbHVnaW4kNyhVSWtpdCkge1xuXG4gICAgaWYgKHBsdWdpbiQ3Lmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1peGluID0gVUlraXQubWl4aW47XG4gICAgdmFyIHV0aWwgPSBVSWtpdC51dGlsO1xuICAgIHZhciBhZGRDbGFzcyA9IHV0aWwuYWRkQ2xhc3M7XG4gICAgdmFyIGFmdGVyID0gdXRpbC5hZnRlcjtcbiAgICB2YXIgYXNzaWduID0gdXRpbC5hc3NpZ247XG4gICAgdmFyIGFwcGVuZCA9IHV0aWwuYXBwZW5kO1xuICAgIHZhciBhdHRyID0gdXRpbC5hdHRyO1xuICAgIHZhciBiZWZvcmUgPSB1dGlsLmJlZm9yZTtcbiAgICB2YXIgY2xvc2VzdCA9IHV0aWwuY2xvc2VzdDtcbiAgICB2YXIgY3NzID0gdXRpbC5jc3M7XG4gICAgdmFyIGRvYyA9IHV0aWwuZG9jO1xuICAgIHZhciBkb2NFbCA9IHV0aWwuZG9jRWw7XG4gICAgdmFyIGhlaWdodCA9IHV0aWwuaGVpZ2h0O1xuICAgIHZhciBmYXN0ZG9tID0gdXRpbC5mYXN0ZG9tO1xuICAgIHZhciBnZXRQb3MgPSB1dGlsLmdldFBvcztcbiAgICB2YXIgaW5jbHVkZXMgPSB1dGlsLmluY2x1ZGVzO1xuICAgIHZhciBpbmRleCA9IHV0aWwuaW5kZXg7XG4gICAgdmFyIGlzSW5wdXQgPSB1dGlsLmlzSW5wdXQ7XG4gICAgdmFyIG5vb3AgPSB1dGlsLm5vb3A7XG4gICAgdmFyIG9mZnNldCA9IHV0aWwub2Zmc2V0O1xuICAgIHZhciBvZmYgPSB1dGlsLm9mZjtcbiAgICB2YXIgb24gPSB1dGlsLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHV0aWwucG9pbnRlckRvd247XG4gICAgdmFyIHBvaW50ZXJNb3ZlID0gdXRpbC5wb2ludGVyTW92ZTtcbiAgICB2YXIgcG9pbnRlclVwID0gdXRpbC5wb2ludGVyVXA7XG4gICAgdmFyIHBvc2l0aW9uID0gdXRpbC5wb3NpdGlvbjtcbiAgICB2YXIgcHJldmVudENsaWNrID0gdXRpbC5wcmV2ZW50Q2xpY2s7XG4gICAgdmFyIFByb21pc2UgPSB1dGlsLlByb21pc2U7XG4gICAgdmFyIHJlbW92ZSA9IHV0aWwucmVtb3ZlO1xuICAgIHZhciByZW1vdmVDbGFzcyA9IHV0aWwucmVtb3ZlQ2xhc3M7XG4gICAgdmFyIHRvZ2dsZUNsYXNzID0gdXRpbC50b2dnbGVDbGFzcztcbiAgICB2YXIgdG9Ob2RlcyA9IHV0aWwudG9Ob2RlcztcbiAgICB2YXIgVHJhbnNpdGlvbiA9IHV0aWwuVHJhbnNpdGlvbjtcbiAgICB2YXIgdHJpZ2dlciA9IHV0aWwudHJpZ2dlcjtcbiAgICB2YXIgd2luID0gdXRpbC53aW47XG4gICAgdmFyIHdpdGhpbiA9IHV0aWwud2l0aGluO1xuXG4gICAgVUlraXQuY29tcG9uZW50KCdzb3J0YWJsZScsIHtcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jbGFzc10sXG5cbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGdyb3VwOiBTdHJpbmcsXG4gICAgICAgICAgICBhbmltYXRpb246IE51bWJlcixcbiAgICAgICAgICAgIHRocmVzaG9sZDogTnVtYmVyLFxuICAgICAgICAgICAgY2xzSXRlbTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzUGxhY2Vob2xkZXI6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0RyYWc6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0RyYWdTdGF0ZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzQmFzZTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzTm9EcmFnOiBTdHJpbmcsXG4gICAgICAgICAgICBjbHNFbXB0eTogU3RyaW5nLFxuICAgICAgICAgICAgY2xzQ3VzdG9tOiBTdHJpbmcsXG4gICAgICAgICAgICBoYW5kbGU6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBncm91cDogZmFsc2UsXG4gICAgICAgICAgICBhbmltYXRpb246IDE1MCxcbiAgICAgICAgICAgIHRocmVzaG9sZDogNSxcbiAgICAgICAgICAgIGNsc0l0ZW06ICd1ay1zb3J0YWJsZS1pdGVtJyxcbiAgICAgICAgICAgIGNsc1BsYWNlaG9sZGVyOiAndWstc29ydGFibGUtcGxhY2Vob2xkZXInLFxuICAgICAgICAgICAgY2xzRHJhZzogJ3VrLXNvcnRhYmxlLWRyYWcnLFxuICAgICAgICAgICAgY2xzRHJhZ1N0YXRlOiAndWstZHJhZycsXG4gICAgICAgICAgICBjbHNCYXNlOiAndWstc29ydGFibGUnLFxuICAgICAgICAgICAgY2xzTm9EcmFnOiAndWstc29ydGFibGUtbm9kcmFnJyxcbiAgICAgICAgICAgIGNsc0VtcHR5OiAndWstc29ydGFibGUtZW1wdHknLFxuICAgICAgICAgICAgY2xzQ3VzdG9tOiAnJyxcbiAgICAgICAgICAgIGhhbmRsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIFsnaW5pdCcsICdzdGFydCcsICdtb3ZlJywgJ2VuZCddLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBmbiA9IHRoaXMkMVtrZXldO1xuICAgICAgICAgICAgICAgIHRoaXMkMVtrZXldID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnNjcm9sbFkgPSB3aW4uc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZiA9IGdldFBvcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSByZWYueDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkgPSByZWYueTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnBvcyA9IHt4OiB4LCB5OiB5fTtcblxuICAgICAgICAgICAgICAgICAgICBmbihlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZXZlbnRzOiAoIG9iaiA9IHt9LCBvYmpbcG9pbnRlckRvd25dID0gJ2luaXQnLCBvYmogKSxcblxuICAgICAgICB1cGRhdGU6IHtcblxuICAgICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy4kZWwsIHRoaXMuY2xzRW1wdHksICF0aGlzLiRlbC5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kcmFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvZmZzZXQodGhpcy5kcmFnLCB7dG9wOiB0aGlzLnBvcy55ICsgdGhpcy5vcmlnaW4udG9wLCBsZWZ0OiB0aGlzLnBvcy54ICsgdGhpcy5vcmlnaW4ubGVmdH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IG9mZnNldCh0aGlzLmRyYWcpLnRvcCxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tID0gdG9wICsgdGhpcy5kcmFnLm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA+IDAgJiYgdG9wIDwgdGhpcy5zY3JvbGxZKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbCA9IHRoaXMuc2Nyb2xsWSAtIDU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib3R0b20gPCBoZWlnaHQoZG9jKSAmJiBib3R0b20gPiBoZWlnaHQod2luKSArIHRoaXMuc2Nyb2xsWSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGwgPSB0aGlzLnNjcm9sbFkgKyA1O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNjcm9sbCAmJiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpbi5zY3JvbGxUbyh3aW4uc2Nyb2xsWCwgc2Nyb2xsKTsgfSwgNSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBlLmJ1dHRvbjtcbiAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFByZXZlbnRlZCA9IGUuZGVmYXVsdFByZXZlbnRlZDtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB0b05vZGVzKHRoaXMuJGVsLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiB3aXRoaW4odGFyZ2V0LCBlbCk7IH0pWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICAgICB8fCBpc0lucHV0KGUudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLmhhbmRsZSAmJiAhd2l0aGluKHRhcmdldCwgdGhpcy5oYW5kbGUpXG4gICAgICAgICAgICAgICAgICAgIHx8IGJ1dHRvbiAhPT0gMFxuICAgICAgICAgICAgICAgICAgICB8fCB3aXRoaW4odGFyZ2V0LCAoXCIuXCIgKyAodGhpcy5jbHNOb0RyYWcpKSlcbiAgICAgICAgICAgICAgICAgICAgfHwgZGVmYXVsdFByZXZlbnRlZFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaGVkID0gW3RoaXNdO1xuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbiA9IGFzc2lnbih7dGFyZ2V0OiB0YXJnZXQsIGluZGV4OiBpbmRleChwbGFjZWhvbGRlcil9LCB0aGlzLnBvcyk7XG5cbiAgICAgICAgICAgICAgICBvbihkb2NFbCwgcG9pbnRlck1vdmUsIHRoaXMubW92ZSk7XG4gICAgICAgICAgICAgICAgb24oZG9jRWwsIHBvaW50ZXJVcCwgdGhpcy5lbmQpO1xuICAgICAgICAgICAgICAgIG9uKHdpbiwgJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydChlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChlKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWcgPSBhcHBlbmQoVUlraXQuY29udGFpbmVyLCB0aGlzLnBsYWNlaG9sZGVyLm91dGVySFRNTC5yZXBsYWNlKC9ePGxpL2ksICc8ZGl2JykucmVwbGFjZSgvbGk+JC9pLCAnZGl2PicpKTtcblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLmRyYWcsIGFzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5wbGFjZWhvbGRlci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnBsYWNlaG9sZGVyLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgIH0sIGNzcyh0aGlzLnBsYWNlaG9sZGVyLCBbJ3BhZGRpbmdMZWZ0JywgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nVG9wJywgJ3BhZGRpbmdCb3R0b20nXSkpKTtcbiAgICAgICAgICAgICAgICBhdHRyKHRoaXMuZHJhZywgJ3VrLW5vLWJvb3QnLCAnJyk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5kcmFnLCAoKHRoaXMuY2xzRHJhZykgKyBcIiBcIiArICh0aGlzLmNsc0N1c3RvbSkpKTtcblxuICAgICAgICAgICAgICAgIGhlaWdodCh0aGlzLmRyYWcuZmlyc3RFbGVtZW50Q2hpbGQsIGhlaWdodCh0aGlzLnBsYWNlaG9sZGVyLmZpcnN0RWxlbWVudENoaWxkKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmID0gb2Zmc2V0KHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gcmVmLmxlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRvcCA9IHJlZi50b3A7XG4gICAgICAgICAgICAgICAgYXNzaWduKHRoaXMub3JpZ2luLCB7bGVmdDogbGVmdCAtIHRoaXMucG9zLngsIHRvcDogdG9wIC0gdGhpcy5wb3MueX0pO1xuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy5wbGFjZWhvbGRlciwgdGhpcy5jbHNQbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwuY2hpbGRyZW4sIHRoaXMuY2xzSXRlbSk7XG4gICAgICAgICAgICAgICAgYWRkQ2xhc3MoZG9jRWwsIHRoaXMuY2xzRHJhZ1N0YXRlKTtcblxuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdzdGFydCcsIFt0aGlzLCB0aGlzLnBsYWNlaG9sZGVyLCB0aGlzLmRyYWddKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShlKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIG1vdmUoZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5wb3MueCAtIHRoaXMub3JpZ2luLngpID4gdGhpcy50aHJlc2hvbGQgfHwgTWF0aC5hYnModGhpcy5wb3MueSAtIHRoaXMub3JpZ2luLnkpID4gdGhpcy50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudHlwZSA9PT0gJ21vdXNlbW92ZScgPyBlLnRhcmdldCA6IGRvYy5lbGVtZW50RnJvbVBvaW50KHRoaXMucG9zLnggLSBkb2MuYm9keS5zY3JvbGxMZWZ0LCB0aGlzLnBvcy55IC0gZG9jLmJvZHkuc2Nyb2xsVG9wKSxcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGUgPSBnZXRTb3J0YWJsZSh0YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGdldFNvcnRhYmxlKHRoaXMucGxhY2Vob2xkZXIpLFxuICAgICAgICAgICAgICAgICAgICBtb3ZlID0gc29ydGFibGUgIT09IHByZXZpb3VzO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzb3J0YWJsZSB8fCB3aXRoaW4odGFyZ2V0LCB0aGlzLnBsYWNlaG9sZGVyKSB8fCBtb3ZlICYmICghc29ydGFibGUuZ3JvdXAgfHwgc29ydGFibGUuZ3JvdXAgIT09IHByZXZpb3VzLmdyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gc29ydGFibGUuJGVsID09PSB0YXJnZXQucGFyZW50Tm9kZSAmJiB0YXJnZXQgfHwgdG9Ob2Rlcyhzb3J0YWJsZS4kZWwuY2hpbGRyZW4pLmZpbHRlcihmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gd2l0aGluKHRhcmdldCwgZWxlbWVudCk7IH0pWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMucmVtb3ZlKHRoaXMucGxhY2Vob2xkZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc29ydGFibGUuaW5zZXJ0KHRoaXMucGxhY2Vob2xkZXIsIHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVzKHRoaXMudG91Y2hlZCwgc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hlZC5wdXNoKHNvcnRhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNjcm9sbDogZnVuY3Rpb24gc2Nyb2xsKCkge1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGwgPSB3aW4uc2Nyb2xsWTtcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsICE9PSB0aGlzLnNjcm9sbFkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3MueSArPSBzY3JvbGwgLSB0aGlzLnNjcm9sbFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsWSA9IHNjcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gZW5kKGUpIHtcblxuICAgICAgICAgICAgICAgIG9mZihkb2NFbCwgcG9pbnRlck1vdmUsIHRoaXMubW92ZSk7XG4gICAgICAgICAgICAgICAgb2ZmKGRvY0VsLCBwb2ludGVyVXAsIHRoaXMuZW5kKTtcbiAgICAgICAgICAgICAgICBvZmYod2luLCAnc2Nyb2xsJywgdGhpcy5zY3JvbGwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAnbW91c2V1cCcgJiYgd2l0aGluKGUudGFyZ2V0LCAnYVtocmVmXScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gY2xvc2VzdChlLnRhcmdldCwgJ2FbaHJlZl0nKS5ocmVmO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXZlbnRDbGljaygpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRhYmxlID0gZ2V0U29ydGFibGUodGhpcy5wbGFjZWhvbGRlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gc29ydGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3JpZ2luLmluZGV4ICE9PSBpbmRleCh0aGlzLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ21vdmVkJywgW3RoaXMsIHRoaXMucGxhY2Vob2xkZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIoc29ydGFibGUuJGVsLCAnYWRkZWQnLCBbc29ydGFibGUsIHRoaXMucGxhY2Vob2xkZXJdKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcih0aGlzLiRlbCwgJ3JlbW92ZWQnLCBbdGhpcywgdGhpcy5wbGFjZWhvbGRlcl0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICdzdG9wJywgW3RoaXNdKTtcblxuICAgICAgICAgICAgICAgIHJlbW92ZSh0aGlzLmRyYWcpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZyA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IHRoaXMudG91Y2hlZC5tYXAoZnVuY3Rpb24gKHNvcnRhYmxlKSB7IHJldHVybiAoKHNvcnRhYmxlLmNsc1BsYWNlaG9sZGVyKSArIFwiIFwiICsgKHNvcnRhYmxlLmNsc0l0ZW0pKTsgfSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hlZC5mb3JFYWNoKGZ1bmN0aW9uIChzb3J0YWJsZSkgeyByZXR1cm4gcmVtb3ZlQ2xhc3Moc29ydGFibGUuJGVsLmNoaWxkcmVuLCBjbGFzc2VzKTsgfSk7XG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcyhkb2NFbCwgdGhpcy5jbHNEcmFnU3RhdGUpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydChlbGVtZW50LCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3ModGhpcy4kZWwuY2hpbGRyZW4sIHRoaXMuY2xzSXRlbSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3aXRoaW4oZWxlbWVudCwgdGhpcyQxLiRlbCkgfHwgaXNQcmVkZWNlc3NvcihlbGVtZW50LCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlKHRhcmdldCwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyKHRhcmdldCwgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZCh0aGlzJDEuJGVsLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUoaW5zZXJ0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlJDEoZWxlbWVudCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF3aXRoaW4oZWxlbWVudCwgdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW92ZShlbGVtZW50KTsgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYW5pbWF0ZTogZnVuY3Rpb24gYW5pbWF0ZShhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgdmFyIHByb3BzID0gW10sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gdG9Ob2Rlcyh0aGlzLiRlbC5jaGlsZHJlbiksXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0ID0ge3Bvc2l0aW9uOiAnJywgd2lkdGg6ICcnLCBoZWlnaHQ6ICcnLCBwb2ludGVyRXZlbnRzOiAnJywgdG9wOiAnJywgbGVmdDogJycsIGJvdHRvbTogJycsIHJpZ2h0OiAnJ307XG5cbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5wdXNoKGFzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBlbC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZWwub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIH0sIHBvc2l0aW9uKGVsKSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKFRyYW5zaXRpb24uY2FuY2VsKTtcbiAgICAgICAgICAgICAgICBjc3ModGhpcy4kZWwuY2hpbGRyZW4sIHJlc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLiR1cGRhdGUoJ3VwZGF0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGZhc3Rkb20uZmx1c2goKTtcblxuICAgICAgICAgICAgICAgIGNzcyh0aGlzLiRlbCwgJ21pbkhlaWdodCcsIGhlaWdodCh0aGlzLiRlbCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9ucyA9IGNoaWxkcmVuLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHBvc2l0aW9uKGVsKTsgfSk7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChlbCwgaSkgeyByZXR1cm4gVHJhbnNpdGlvbi5zdGFydChjc3MoZWwsIHByb3BzW2ldKSwgcG9zaXRpb25zW2ldLCB0aGlzJDEuYW5pbWF0aW9uKTsgfSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcyh0aGlzJDEuJGVsLCAnbWluSGVpZ2h0JywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzKGNoaWxkcmVuLCByZXNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuJHVwZGF0ZSgndXBkYXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYXN0ZG9tLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG5vb3ApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgdmFyIG9iajtcblxuICAgIGZ1bmN0aW9uIGdldFNvcnRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgJiYgKFVJa2l0LmdldENvbXBvbmVudChlbGVtZW50LCAnc29ydGFibGUnKSB8fCBnZXRTb3J0YWJsZShlbGVtZW50LnBhcmVudE5vZGUpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1ByZWRlY2Vzc29yKGVsZW1lbnQsIHRhcmdldCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlID09PSB0YXJnZXQucGFyZW50Tm9kZSAmJiBpbmRleChlbGVtZW50KSA+IGluZGV4KHRhcmdldCk7XG4gICAgfVxuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQ3KTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDgoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kOC5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1dGlsID0gVUlraXQudXRpbDtcbiAgICB2YXIgbWl4aW4gPSBVSWtpdC5taXhpbjtcbiAgICB2YXIgYXBwZW5kID0gdXRpbC5hcHBlbmQ7XG4gICAgdmFyIGF0dHIgPSB1dGlsLmF0dHI7XG4gICAgdmFyIGRvYyA9IHV0aWwuZG9jO1xuICAgIHZhciBmYXN0ZG9tID0gdXRpbC5mYXN0ZG9tO1xuICAgIHZhciBmbGlwUG9zaXRpb24gPSB1dGlsLmZsaXBQb3NpdGlvbjtcbiAgICB2YXIgaW5jbHVkZXMgPSB1dGlsLmluY2x1ZGVzO1xuICAgIHZhciBpc1RvdWNoID0gdXRpbC5pc1RvdWNoO1xuICAgIHZhciBpc1Zpc2libGUgPSB1dGlsLmlzVmlzaWJsZTtcbiAgICB2YXIgbWF0Y2hlcyA9IHV0aWwubWF0Y2hlcztcbiAgICB2YXIgb24gPSB1dGlsLm9uO1xuICAgIHZhciBwb2ludGVyRG93biA9IHV0aWwucG9pbnRlckRvd247XG4gICAgdmFyIHBvaW50ZXJFbnRlciA9IHV0aWwucG9pbnRlckVudGVyO1xuICAgIHZhciBwb2ludGVyTGVhdmUgPSB1dGlsLnBvaW50ZXJMZWF2ZTtcbiAgICB2YXIgcmVtb3ZlID0gdXRpbC5yZW1vdmU7XG4gICAgdmFyIHdpdGhpbiA9IHV0aWwud2l0aGluO1xuXG4gICAgdmFyIGFjdGl2ZXMgPSBbXTtcblxuICAgIFVJa2l0LmNvbXBvbmVudCgndG9vbHRpcCcsIHtcblxuICAgICAgICBhdHRyczogdHJ1ZSxcblxuICAgICAgICBtaXhpbnM6IFttaXhpbi5jb250YWluZXIsIG1peGluLnRvZ2dsYWJsZSwgbWl4aW4ucG9zaXRpb25dLFxuXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBkZWxheTogTnVtYmVyLFxuICAgICAgICAgICAgdGl0bGU6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBwb3M6ICd0b3AnLFxuICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICBhbmltYXRpb246IFsndWstYW5pbWF0aW9uLXNjYWxlLXVwJ10sXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwLFxuICAgICAgICAgICAgY2xzOiAndWstYWN0aXZlJyxcbiAgICAgICAgICAgIGNsc1BvczogJ3VrLXRvb2x0aXAnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbiBjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgICAgICAgICAgZmFzdGRvbS5tdXRhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXR0cih0aGlzJDEuJGVsLCB7dGl0bGU6IG51bGwsICdhcmlhLWV4cGFuZGVkJzogZmFsc2V9KTsgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlzY29ubmVjdGVkOiBmdW5jdGlvbiBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblxuICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlcyhhY3RpdmVzLCB0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWN0aXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChhY3RpdmUpIHsgcmV0dXJuIGFjdGl2ZS5oaWRlKCk7IH0pO1xuICAgICAgICAgICAgICAgIGFjdGl2ZXMucHVzaCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3VuYmluZCA9IG9uKGRvYywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuICF3aXRoaW4oZS50YXJnZXQsIHRoaXMkMS4kZWwpICYmIHRoaXMkMS5oaWRlKCk7IH0pO1xuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2hvd1RpbWVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9vbHRpcCA9IGFwcGVuZCh0aGlzLmNvbnRhaW5lciwgKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAodGhpcy5jbHNQb3MpICsgXCJcXFwiIGFyaWEtaGlkZGVuPjxkaXYgY2xhc3M9XFxcIlwiICsgKHRoaXMuY2xzUG9zKSArIFwiLWlubmVyXFxcIj5cIiArICh0aGlzLnRpdGxlKSArIFwiPC9kaXY+PC9kaXY+XCIpKTtcblxuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsICdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uQXQodGhpcy50b29sdGlwLCB0aGlzLiRlbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMuZ2V0QXhpcygpID09PSAneScgPyAoKGZsaXBQb3NpdGlvbih0aGlzLmRpcikpICsgXCItXCIgKyAodGhpcy5hbGlnbikpIDogKCh0aGlzLmFsaWduKSArIFwiLVwiICsgKGZsaXBQb3NpdGlvbih0aGlzLmRpcikpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnRvZ2dsZUVsZW1lbnQodGhpcyQxLnRvb2x0aXAsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMS5oaWRlVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKHRoaXMkMS4kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCAxNTApO1xuXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5kZWxheSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gYWN0aXZlcy5pbmRleE9mKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF+aW5kZXggfHwgbWF0Y2hlcyh0aGlzLiRlbCwgJ2lucHV0JykgJiYgdGhpcy4kZWwgPT09IGRvYy5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3RpdmVzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZXIpO1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5oaWRlVGltZXIpO1xuICAgICAgICAgICAgICAgIGF0dHIodGhpcy4kZWwsICdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnRvb2x0aXAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2x0aXAgJiYgcmVtb3ZlKHRoaXMudG9vbHRpcCk7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sdGlwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5iaW5kKCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGV2ZW50czogKCBvYmogPSB7XG5cbiAgICAgICAgICAgICdibHVyJzogJ2hpZGUnXG5cbiAgICAgICAgfSwgb2JqWyhcImZvY3VzIFwiICsgcG9pbnRlckVudGVyICsgXCIgXCIgKyBwb2ludGVyRG93bildID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSBwb2ludGVyRG93biB8fCAhaXNUb3VjaChlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvYmpbcG9pbnRlckxlYXZlXSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1RvdWNoKGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9iaiApXG5cbiAgICB9KTtcbiAgICB2YXIgb2JqO1xuXG59XG5cbmlmICghdHJ1ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuVUlraXQpIHtcbiAgICB3aW5kb3cuVUlraXQudXNlKHBsdWdpbiQ4KTtcbn1cblxuZnVuY3Rpb24gcGx1Z2luJDkoVUlraXQpIHtcblxuICAgIGlmIChwbHVnaW4kOS5pbnN0YWxsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWYgPSBVSWtpdC51dGlsO1xuICAgIHZhciBhZGRDbGFzcyA9IHJlZi5hZGRDbGFzcztcbiAgICB2YXIgYWpheCA9IHJlZi5hamF4O1xuICAgIHZhciBtYXRjaGVzID0gcmVmLm1hdGNoZXM7XG4gICAgdmFyIG5vb3AgPSByZWYubm9vcDtcbiAgICB2YXIgb24gPSByZWYub247XG4gICAgdmFyIHJlbW92ZUNsYXNzID0gcmVmLnJlbW92ZUNsYXNzO1xuICAgIHZhciB0cmlnZ2VyID0gcmVmLnRyaWdnZXI7XG5cbiAgICBVSWtpdC5jb21wb25lbnQoJ3VwbG9hZCcsIHtcblxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgYWxsb3c6IFN0cmluZyxcbiAgICAgICAgICAgIGNsc0RyYWdvdmVyOiBTdHJpbmcsXG4gICAgICAgICAgICBjb25jdXJyZW50OiBOdW1iZXIsXG4gICAgICAgICAgICBtaW1lOiBTdHJpbmcsXG4gICAgICAgICAgICBtc2dJbnZhbGlkTWltZTogU3RyaW5nLFxuICAgICAgICAgICAgbXNnSW52YWxpZE5hbWU6IFN0cmluZyxcbiAgICAgICAgICAgIG11bHRpcGxlOiBCb29sZWFuLFxuICAgICAgICAgICAgbmFtZTogU3RyaW5nLFxuICAgICAgICAgICAgcGFyYW1zOiBPYmplY3QsXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICB1cmw6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICAgICBhbGxvdzogZmFsc2UsXG4gICAgICAgICAgICBjbHNEcmFnb3ZlcjogJ3VrLWRyYWdvdmVyJyxcbiAgICAgICAgICAgIGNvbmN1cnJlbnQ6IDEsXG4gICAgICAgICAgICBtaW1lOiBmYWxzZSxcbiAgICAgICAgICAgIG1zZ0ludmFsaWRNaW1lOiAnSW52YWxpZCBGaWxlIFR5cGU6ICVzJyxcbiAgICAgICAgICAgIG1zZ0ludmFsaWROYW1lOiAnSW52YWxpZCBGaWxlIE5hbWU6ICVzJyxcbiAgICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcbiAgICAgICAgICAgIG5hbWU6ICdmaWxlc1tdJyxcbiAgICAgICAgICAgIHBhcmFtczoge30sXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcnLFxuICAgICAgICAgICAgYWJvcnQ6IG5vb3AsXG4gICAgICAgICAgICBiZWZvcmVBbGw6IG5vb3AsXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBub29wLFxuICAgICAgICAgICAgY29tcGxldGU6IG5vb3AsXG4gICAgICAgICAgICBjb21wbGV0ZUFsbDogbm9vcCxcbiAgICAgICAgICAgIGVycm9yOiBub29wLFxuICAgICAgICAgICAgZmFpbDogbm9vcCxcbiAgICAgICAgICAgIGxvYWQ6IG5vb3AsXG4gICAgICAgICAgICBsb2FkRW5kOiBub29wLFxuICAgICAgICAgICAgbG9hZFN0YXJ0OiBub29wLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IG5vb3BcbiAgICAgICAgfSxcblxuICAgICAgICBldmVudHM6IHtcblxuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiBjaGFuZ2UoZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaGVzKGUudGFyZ2V0LCAnaW5wdXRbdHlwZT1cImZpbGVcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKGUudGFyZ2V0LmZpbGVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJvcDogZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgICAgICAgICAgICAgc3RvcChlKTtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2ZlciA9IGUuZGF0YVRyYW5zZmVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0cmFuc2ZlciB8fCAhdHJhbnNmZXIuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkKHRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRyYWdlbnRlcjogZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZHJhZ292ZXI6IGZ1bmN0aW9uIGRyYWdvdmVyKGUpIHtcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xuICAgICAgICAgICAgICAgIGFkZENsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRyYWdsZWF2ZTogZnVuY3Rpb24gZHJhZ2xlYXZlKGUpIHtcbiAgICAgICAgICAgICAgICBzdG9wKGUpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKHRoaXMuJGVsLCB0aGlzLmNsc0RyYWdvdmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIG1ldGhvZHM6IHtcblxuICAgICAgICAgICAgdXBsb2FkOiBmdW5jdGlvbiB1cGxvYWQoZmlsZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgICAgICAgICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRyaWdnZXIodGhpcy4kZWwsICd1cGxvYWQnLCBbZmlsZXNdKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLmFsbG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKHRoaXMkMS5hbGxvdywgZmlsZXNbaV0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuZmFpbCh0aGlzJDEubXNnSW52YWxpZE5hbWUucmVwbGFjZSgvJXMvLCB0aGlzJDEuYWxsb3cpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcyQxLm1pbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2godGhpcyQxLm1pbWUsIGZpbGVzW2ldLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmZhaWwodGhpcyQxLm1zZ0ludmFsaWRNaW1lLnJlcGxhY2UoLyVzLywgdGhpcyQxLm1pbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlcyA9IFtmaWxlc1swXV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVBbGwodGhpcywgZmlsZXMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNodW5rcyA9IGNodW5rKGZpbGVzLCB0aGlzLmNvbmN1cnJlbnQpLFxuICAgICAgICAgICAgICAgICAgICB1cGxvYWQgPSBmdW5jdGlvbiAoZmlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkgeyByZXR1cm4gZGF0YS5hcHBlbmQodGhpcyQxLm5hbWUsIGZpbGUpOyB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMkMS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZChrZXksIHRoaXMkMS5wYXJhbXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFqYXgodGhpcyQxLnVybCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzJDEudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoZW52KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IGVudi54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci51cGxvYWQgJiYgb24oeGhyLnVwbG9hZCwgJ3Byb2dyZXNzJywgdGhpcyQxLnByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWydsb2FkU3RhcnQnLCAnbG9hZCcsICdsb2FkRW5kJywgJ2Fib3J0J10uZm9yRWFjaChmdW5jdGlvbiAodHlwZSkgeyByZXR1cm4gb24oeGhyLCB0eXBlLnRvTG93ZXJDYXNlKCksIHRoaXMkMVt0eXBlXSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuYmVmb3JlU2VuZChlbnYpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoeGhyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxLmNvbXBsZXRlKHhocik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNodW5rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwbG9hZChjaHVua3Muc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzJDEuY29tcGxldGVBbGwoeGhyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkgeyByZXR1cm4gdGhpcyQxLmVycm9yKGUubWVzc2FnZSk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHVwbG9hZChjaHVua3Muc2hpZnQoKSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1hdGNoKHBhdHRlcm4sIHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgubWF0Y2gobmV3IFJlZ0V4cCgoXCJeXCIgKyAocGF0dGVybi5yZXBsYWNlKC9cXC8vZywgJ1xcXFwvJykucmVwbGFjZSgvXFwqXFwqL2csICcoXFxcXC9bXlxcXFwvXSspKicpLnJlcGxhY2UoL1xcKi9nLCAnW15cXFxcL10rJykucmVwbGFjZSgvKCg/IVxcXFwpKVxcPy9nLCAnJDEuJykpICsgXCIkXCIpLCAnaScpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaHVuayhmaWxlcywgc2l6ZSkge1xuICAgICAgICB2YXIgY2h1bmtzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IHNpemUpIHtcbiAgICAgICAgICAgIHZhciBjaHVuayA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjaHVuay5wdXNoKGZpbGVzW2kgKyBqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNodW5rcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxufVxuXG5pZiAoIXRydWUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlVJa2l0KSB7XG4gICAgd2luZG93LlVJa2l0LnVzZShwbHVnaW4kOSk7XG59XG5cblVJa2l0JDIudXNlKHBsdWdpbik7XG5VSWtpdCQyLnVzZShwbHVnaW4kMSk7XG5VSWtpdCQyLnVzZShwbHVnaW4kMik7XG5VSWtpdCQyLnVzZShwbHVnaW4kNCk7XG5VSWtpdCQyLnVzZShwbHVnaW4kNSk7XG5VSWtpdCQyLnVzZShwbHVnaW4kNik7XG5VSWtpdCQyLnVzZShwbHVnaW4kNyk7XG5VSWtpdCQyLnVzZShwbHVnaW4kOCk7XG5VSWtpdCQyLnVzZShwbHVnaW4kOSk7XG5cbntcbiAgICBib290KFVJa2l0JDIpO1xufVxuXG5yZXR1cm4gVUlraXQkMjtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Vpa2l0L2Rpc3QvanMvdWlraXQuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwidmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3B1YmxpYy9zdHlsZXNoZWV0cy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFtcIlVJa2l0XCJdID0gcmVxdWlyZShcIi0hLi91aWtpdC5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91aWtpdC9kaXN0L2pzL3Vpa2l0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIl0sInNvdXJjZVJvb3QiOiIifQ==