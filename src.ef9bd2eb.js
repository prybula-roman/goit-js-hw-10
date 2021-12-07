// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"TZhv":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"hZhY":[function(require,module,exports) {
var define;
var global = arguments[3];
/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["Handlebars"] = factory();else root["Handlebars"] = factory();
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }
    /************************************************************************/

    /******/
    ([
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _handlebarsBase = __webpack_require__(3);

      var base = _interopRequireWildcard(_handlebarsBase); // Each of these augment the Handlebars object. No need to setup here.
      // (This is done to easily share code between commonjs and browse envs)


      var _handlebarsSafeString = __webpack_require__(36);

      var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

      var _handlebarsException = __webpack_require__(5);

      var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

      var _handlebarsUtils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_handlebarsUtils);

      var _handlebarsRuntime = __webpack_require__(37);

      var runtime = _interopRequireWildcard(_handlebarsRuntime);

      var _handlebarsNoConflict = __webpack_require__(43);

      var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict); // For compatibility and usage outside of module systems, make the Handlebars object a namespace


      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _handlebarsSafeString2['default'];
        hb.Exception = _handlebarsException2['default'];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;

        hb.template = function (spec) {
          return runtime.template(spec, hb);
        };

        return hb;
      }

      var inst = create();
      inst.create = create;

      _handlebarsNoConflict2['default'](inst);

      inst['default'] = inst;
      exports['default'] = inst;
      module.exports = exports['default'];
      /***/
    },
    /* 1 */

    /***/
    function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};

          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }

          newObj["default"] = obj;
          return newObj;
        }
      };

      exports.__esModule = true;
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      };

      exports.__esModule = true;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.HandlebarsEnvironment = HandlebarsEnvironment;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _helpers = __webpack_require__(9);

      var _decorators = __webpack_require__(29);

      var _logger = __webpack_require__(31);

      var _logger2 = _interopRequireDefault(_logger);

      var _internalProtoAccess = __webpack_require__(32);

      var VERSION = '4.7.7';
      exports.VERSION = VERSION;
      var COMPILER_REVISION = 8;
      exports.COMPILER_REVISION = COMPILER_REVISION;
      var LAST_COMPATIBLE_COMPILER_REVISION = 7;
      exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
      var REVISION_CHANGES = {
        1: '<= 1.0.rc.2',
        // 1.0.rc.2 is actually rev2 but doesn't report it
        2: '== 1.0.0-rc.3',
        3: '== 1.0.0-rc.4',
        4: '== 1.x.x',
        5: '== 2.0.0-alpha.x',
        6: '>= 2.0.0-beta.1',
        7: '>= 4.0.0 <4.3.0',
        8: '>= 4.3.0'
      };
      exports.REVISION_CHANGES = REVISION_CHANGES;
      var objectType = '[object Object]';

      function HandlebarsEnvironment(helpers, partials, decorators) {
        this.helpers = helpers || {};
        this.partials = partials || {};
        this.decorators = decorators || {};

        _helpers.registerDefaultHelpers(this);

        _decorators.registerDefaultDecorators(this);
      }

      HandlebarsEnvironment.prototype = {
        constructor: HandlebarsEnvironment,
        logger: _logger2['default'],
        log: _logger2['default'].log,
        registerHelper: function registerHelper(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple helpers');
            }

            _utils.extend(this.helpers, name);
          } else {
            this.helpers[name] = fn;
          }
        },
        unregisterHelper: function unregisterHelper(name) {
          delete this.helpers[name];
        },
        registerPartial: function registerPartial(name, partial) {
          if (_utils.toString.call(name) === objectType) {
            _utils.extend(this.partials, name);
          } else {
            if (typeof partial === 'undefined') {
              throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
            }

            this.partials[name] = partial;
          }
        },
        unregisterPartial: function unregisterPartial(name) {
          delete this.partials[name];
        },
        registerDecorator: function registerDecorator(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple decorators');
            }

            _utils.extend(this.decorators, name);
          } else {
            this.decorators[name] = fn;
          }
        },
        unregisterDecorator: function unregisterDecorator(name) {
          delete this.decorators[name];
        },

        /**
         * Reset the memory of illegal property accesses that have already been logged.
         * @deprecated should only be used in handlebars test-cases
         */
        resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
          _internalProtoAccess.resetLoggedProperties();
        }
      };
      var log = _logger2['default'].log;
      exports.log = log;
      exports.createFrame = _utils.createFrame;
      exports.logger = _logger2['default'];
      /***/
    },
    /* 4 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.extend = extend;
      exports.indexOf = indexOf;
      exports.escapeExpression = escapeExpression;
      exports.isEmpty = isEmpty;
      exports.createFrame = createFrame;
      exports.blockParams = blockParams;
      exports.appendContextPath = appendContextPath;
      var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      var badChars = /[&<>"'`=]/g,
          possible = /[&<>"'`=]/;

      function escapeChar(chr) {
        return escape[chr];
      }

      function extend(obj
      /* , ...source */
      ) {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              obj[key] = arguments[i][key];
            }
          }
        }

        return obj;
      }

      var toString = Object.prototype.toString;
      exports.toString = toString; // Sourced from lodash
      // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt

      /* eslint-disable func-style */

      var isFunction = function isFunction(value) {
        return typeof value === 'function';
      }; // fallback for older versions of Chrome and Safari

      /* istanbul ignore next */


      if (isFunction(/x/)) {
        exports.isFunction = isFunction = function (value) {
          return typeof value === 'function' && toString.call(value) === '[object Function]';
        };
      }

      exports.isFunction = isFunction;
      /* eslint-enable func-style */

      /* istanbul ignore next */

      var isArray = Array.isArray || function (value) {
        return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
      };

      exports.isArray = isArray; // Older IE versions do not directly support indexOf so we must implement our own, sadly.

      function indexOf(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === value) {
            return i;
          }
        }

        return -1;
      }

      function escapeExpression(string) {
        if (typeof string !== 'string') {
          // don't escape SafeStrings, since they're already safe
          if (string && string.toHTML) {
            return string.toHTML();
          } else if (string == null) {
            return '';
          } else if (!string) {
            return string + '';
          } // Force a string conversion as this will be done by the append regardless and
          // the regex test will do this transparently behind the scenes, causing issues if
          // an object's to string has escaped characters in it.


          string = '' + string;
        }

        if (!possible.test(string)) {
          return string;
        }

        return string.replace(badChars, escapeChar);
      }

      function isEmpty(value) {
        if (!value && value !== 0) {
          return true;
        } else if (isArray(value) && value.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      function createFrame(object) {
        var frame = extend({}, object);
        frame._parent = object;
        return frame;
      }

      function blockParams(params, ids) {
        params.path = ids;
        return params;
      }

      function appendContextPath(contextPath, id) {
        return (contextPath ? contextPath + '.' : '') + id;
      }
      /***/

    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$defineProperty = __webpack_require__(6)['default'];

      exports.__esModule = true;
      var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

      function Exception(message, node) {
        var loc = node && node.loc,
            line = undefined,
            endLineNumber = undefined,
            column = undefined,
            endColumn = undefined;

        if (loc) {
          line = loc.start.line;
          endLineNumber = loc.end.line;
          column = loc.start.column;
          endColumn = loc.end.column;
          message += ' - ' + line + ':' + column;
        }

        var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

        for (var idx = 0; idx < errorProps.length; idx++) {
          this[errorProps[idx]] = tmp[errorProps[idx]];
        }
        /* istanbul ignore else */


        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, Exception);
        }

        try {
          if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber; // Work around issue under safari where we can't directly set the column value

            /* istanbul ignore next */

            if (_Object$defineProperty) {
              Object.defineProperty(this, 'column', {
                value: column,
                enumerable: true
              });
              Object.defineProperty(this, 'endColumn', {
                value: endColumn,
                enumerable: true
              });
            } else {
              this.column = column;
              this.endColumn = endColumn;
            }
          }
        } catch (nop) {
          /* Ignore if the browser is very particular */
        }
      }

      Exception.prototype = new Error();
      exports['default'] = Exception;
      module.exports = exports['default'];
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(7),
        __esModule: true
      };
      /***/
    },
    /* 7 */

    /***/
    function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function defineProperty(it, key, desc) {
        return $.setDesc(it, key, desc);
      };
      /***/

    },
    /* 8 */

    /***/
    function (module, exports) {
      var $Object = Object;
      module.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
      };
      /***/
    },
    /* 9 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultHelpers = registerDefaultHelpers;
      exports.moveHelperToHooks = moveHelperToHooks;

      var _helpersBlockHelperMissing = __webpack_require__(10);

      var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

      var _helpersEach = __webpack_require__(11);

      var _helpersEach2 = _interopRequireDefault(_helpersEach);

      var _helpersHelperMissing = __webpack_require__(24);

      var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

      var _helpersIf = __webpack_require__(25);

      var _helpersIf2 = _interopRequireDefault(_helpersIf);

      var _helpersLog = __webpack_require__(26);

      var _helpersLog2 = _interopRequireDefault(_helpersLog);

      var _helpersLookup = __webpack_require__(27);

      var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

      var _helpersWith = __webpack_require__(28);

      var _helpersWith2 = _interopRequireDefault(_helpersWith);

      function registerDefaultHelpers(instance) {
        _helpersBlockHelperMissing2['default'](instance);

        _helpersEach2['default'](instance);

        _helpersHelperMissing2['default'](instance);

        _helpersIf2['default'](instance);

        _helpersLog2['default'](instance);

        _helpersLookup2['default'](instance);

        _helpersWith2['default'](instance);
      }

      function moveHelperToHooks(instance, helperName, keepHelper) {
        if (instance.helpers[helperName]) {
          instance.hooks[helperName] = instance.helpers[helperName];

          if (!keepHelper) {
            delete instance.helpers[helperName];
          }
        }
      }
      /***/

    },
    /* 10 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerHelper('blockHelperMissing', function (context, options) {
          var inverse = options.inverse,
              fn = options.fn;

          if (context === true) {
            return fn(this);
          } else if (context === false || context == null) {
            return inverse(this);
          } else if (_utils.isArray(context)) {
            if (context.length > 0) {
              if (options.ids) {
                options.ids = [options.name];
              }

              return instance.helpers.each(context, options);
            } else {
              return inverse(this);
            }
          } else {
            if (options.data && options.ids) {
              var data = _utils.createFrame(options.data);

              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
              options = {
                data: data
              };
            }

            return fn(context, options);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 11 */

    /***/
    function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        var _Object$keys = __webpack_require__(12)['default'];

        var _interopRequireDefault = __webpack_require__(2)['default'];

        exports.__esModule = true;

        var _utils = __webpack_require__(4);

        var _exception = __webpack_require__(5);

        var _exception2 = _interopRequireDefault(_exception);

        exports['default'] = function (instance) {
          instance.registerHelper('each', function (context, options) {
            if (!options) {
              throw new _exception2['default']('Must pass iterator to #each');
            }

            var fn = options.fn,
                inverse = options.inverse,
                i = 0,
                ret = '',
                data = undefined,
                contextPath = undefined;

            if (options.data && options.ids) {
              contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
            }

            if (_utils.isFunction(context)) {
              context = context.call(this);
            }

            if (options.data) {
              data = _utils.createFrame(options.data);
            }

            function execIteration(field, index, last) {
              if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;

                if (contextPath) {
                  data.contextPath = contextPath + field;
                }
              }

              ret = ret + fn(context[field], {
                data: data,
                blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
              });
            }

            if (context && typeof context === 'object') {
              if (_utils.isArray(context)) {
                for (var j = context.length; i < j; i++) {
                  if (i in context) {
                    execIteration(i, i, i === context.length - 1);
                  }
                }
              } else if (global.Symbol && context[global.Symbol.iterator]) {
                var newContext = [];
                var iterator = context[global.Symbol.iterator]();

                for (var it = iterator.next(); !it.done; it = iterator.next()) {
                  newContext.push(it.value);
                }

                context = newContext;

                for (var j = context.length; i < j; i++) {
                  execIteration(i, i, i === context.length - 1);
                }
              } else {
                (function () {
                  var priorKey = undefined;

                  _Object$keys(context).forEach(function (key) {
                    // We're running the iterations one step out of sync so we can detect
                    // the last iteration without have to scan the object twice and create
                    // an itermediate keys array.
                    if (priorKey !== undefined) {
                      execIteration(priorKey, i - 1);
                    }

                    priorKey = key;
                    i++;
                  });

                  if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1, true);
                  }
                })();
              }
            }

            if (i === 0) {
              ret = inverse(this);
            }

            return ret;
          });
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    },
    /* 12 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(13),
        __esModule: true
      };
      /***/
    },
    /* 13 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(14);

      module.exports = __webpack_require__(20).Object.keys;
      /***/
    },
    /* 14 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__(15);

      __webpack_require__(17)('keys', function ($keys) {
        return function keys(it) {
          return $keys(toObject(it));
        };
      });
      /***/

    },
    /* 15 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(16);

      module.exports = function (it) {
        return Object(defined(it));
      };
      /***/

    },
    /* 16 */

    /***/
    function (module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };
      /***/

    },
    /* 17 */

    /***/
    function (module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__(18),
          core = __webpack_require__(20),
          fails = __webpack_require__(23);

      module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
          fn(1);
        }), 'Object', exp);
      };
      /***/

    },
    /* 18 */

    /***/
    function (module, exports, __webpack_require__) {
      var global = __webpack_require__(19),
          core = __webpack_require__(20),
          ctx = __webpack_require__(21),
          PROTOTYPE = 'prototype';

      var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F,
            IS_GLOBAL = type & $export.G,
            IS_STATIC = type & $export.S,
            IS_PROTO = type & $export.P,
            IS_BIND = type & $export.B,
            IS_WRAP = type & $export.W,
            exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
            target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
            key,
            own,
            out;
        if (IS_GLOBAL) source = name;

        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && key in target;
          if (own && key in exports) continue; // export native or passed

          out = own ? target[key] : source[key]; // prevent global pollution for namespaces

          exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
          : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function (param) {
              return this instanceof C ? new C(param) : C(param);
            };

            F[PROTOTYPE] = C[PROTOTYPE];
            return F; // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
          if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
        }
      }; // type bitmap


      $export.F = 1; // forced

      $export.G = 2; // global

      $export.S = 4; // static

      $export.P = 8; // proto

      $export.B = 16; // bind

      $export.W = 32; // wrap

      module.exports = $export;
      /***/
    },
    /* 19 */

    /***/
    function (module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    },
    /* 20 */

    /***/
    function (module, exports) {
      var core = module.exports = {
        version: '1.2.6'
      };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    },
    /* 21 */

    /***/
    function (module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(22);

      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;

        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };

          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };

          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }

        return function
          /* ...args */
        () {
          return fn.apply(that, arguments);
        };
      };
      /***/

    },
    /* 22 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };
      /***/

    },
    /* 23 */

    /***/
    function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      /***/

    },
    /* 24 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('helperMissing', function ()
        /* [args, ]options */
        {
          if (arguments.length === 1) {
            // A missing field in a {{foo}} construct.
            return undefined;
          } else {
            // Someone is actually trying to call something, blow up.
            throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 25 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('if', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#if requires exactly one argument');
          }

          if (_utils.isFunction(conditional)) {
            conditional = conditional.call(this);
          } // Default behavior is to render the positive path if the value is truthy and not empty.
          // The `includeZero` option may be set to treat the condtional as purely not empty based on the
          // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.


          if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
            return options.inverse(this);
          } else {
            return options.fn(this);
          }
        });
        instance.registerHelper('unless', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#unless requires exactly one argument');
          }

          return instance.helpers['if'].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
          });
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 26 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('log', function ()
        /* message, options */
        {
          var args = [undefined],
              options = arguments[arguments.length - 1];

          for (var i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
          }

          var level = 1;

          if (options.hash.level != null) {
            level = options.hash.level;
          } else if (options.data && options.data.level != null) {
            level = options.data.level;
          }

          args[0] = level;
          instance.log.apply(instance, args);
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 27 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('lookup', function (obj, field, options) {
          if (!obj) {
            // Note for 5.0: Change to "obj == null" in 5.0
            return obj;
          }

          return options.lookupProperty(obj, field);
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 28 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('with', function (context, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#with requires exactly one argument');
          }

          if (_utils.isFunction(context)) {
            context = context.call(this);
          }

          var fn = options.fn;

          if (!_utils.isEmpty(context)) {
            var data = options.data;

            if (options.data && options.ids) {
              data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
            }

            return fn(context, {
              data: data,
              blockParams: _utils.blockParams([context], [data && data.contextPath])
            });
          } else {
            return options.inverse(this);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 29 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultDecorators = registerDefaultDecorators;

      var _decoratorsInline = __webpack_require__(30);

      var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

      function registerDefaultDecorators(instance) {
        _decoratorsInline2['default'](instance);
      }
      /***/

    },
    /* 30 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerDecorator('inline', function (fn, props, container, options) {
          var ret = fn;

          if (!props.partials) {
            props.partials = {};

            ret = function (context, options) {
              // Create a new partials stack frame prior to exec.
              var original = container.partials;
              container.partials = _utils.extend({}, original, props.partials);
              var ret = fn(context, options);
              container.partials = original;
              return ret;
            };
          }

          props.partials[options.args[0]] = options.fn;
          return ret;
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 31 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var logger = {
        methodMap: ['debug', 'info', 'warn', 'error'],
        level: 'info',
        // Maps a given level value to the `methodMap` indexes above.
        lookupLevel: function lookupLevel(level) {
          if (typeof level === 'string') {
            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());

            if (levelMap >= 0) {
              level = levelMap;
            } else {
              level = parseInt(level, 10);
            }
          }

          return level;
        },
        // Can be overridden in the host environment
        log: function log(level) {
          level = logger.lookupLevel(level);

          if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
            var method = logger.methodMap[level]; // eslint-disable-next-line no-console

            if (!console[method]) {
              method = 'log';
            }

            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              message[_key - 1] = arguments[_key];
            }

            console[method].apply(console, message); // eslint-disable-line no-console
          }
        }
      };
      exports['default'] = logger;
      module.exports = exports['default'];
      /***/
    },
    /* 32 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      exports.__esModule = true;
      exports.createProtoAccessControl = createProtoAccessControl;
      exports.resultIsAllowed = resultIsAllowed;
      exports.resetLoggedProperties = resetLoggedProperties;

      var _createNewLookupObject = __webpack_require__(35);

      var _logger = __webpack_require__(31);

      var logger = _interopRequireWildcard(_logger);

      var loggedProperties = _Object$create(null);

      function createProtoAccessControl(runtimeOptions) {
        var defaultMethodWhiteList = _Object$create(null);

        defaultMethodWhiteList['constructor'] = false;
        defaultMethodWhiteList['__defineGetter__'] = false;
        defaultMethodWhiteList['__defineSetter__'] = false;
        defaultMethodWhiteList['__lookupGetter__'] = false;

        var defaultPropertyWhiteList = _Object$create(null); // eslint-disable-next-line no-proto


        defaultPropertyWhiteList['__proto__'] = false;
        return {
          properties: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
          },
          methods: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
          }
        };
      }

      function resultIsAllowed(result, protoAccessControl, propertyName) {
        if (typeof result === 'function') {
          return checkWhiteList(protoAccessControl.methods, propertyName);
        } else {
          return checkWhiteList(protoAccessControl.properties, propertyName);
        }
      }

      function checkWhiteList(protoAccessControlForType, propertyName) {
        if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
          return protoAccessControlForType.whitelist[propertyName] === true;
        }

        if (protoAccessControlForType.defaultValue !== undefined) {
          return protoAccessControlForType.defaultValue;
        }

        logUnexpecedPropertyAccessOnce(propertyName);
        return false;
      }

      function logUnexpecedPropertyAccessOnce(propertyName) {
        if (loggedProperties[propertyName] !== true) {
          loggedProperties[propertyName] = true;
          logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
        }
      }

      function resetLoggedProperties() {
        _Object$keys(loggedProperties).forEach(function (propertyName) {
          delete loggedProperties[propertyName];
        });
      }
      /***/

    },
    /* 33 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(34),
        __esModule: true
      };
      /***/
    },
    /* 34 */

    /***/
    function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function create(P, D) {
        return $.create(P, D);
      };
      /***/

    },
    /* 35 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      exports.__esModule = true;
      exports.createNewLookupObject = createNewLookupObject;

      var _utils = __webpack_require__(4);
      /**
       * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
       * The resulting object can be used with "object[property]" to check if a property exists
       * @param {...object} sources a varargs parameter of source objects that will be merged
       * @returns {object}
       */


      function createNewLookupObject() {
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }

        return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
      }
      /***/

    },
    /* 36 */

    /***/
    function (module, exports) {
      // Build out our basic SafeString type
      'use strict';

      exports.__esModule = true;

      function SafeString(string) {
        this.string = string;
      }

      SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
        return '' + this.string;
      };

      exports['default'] = SafeString;
      module.exports = exports['default'];
      /***/
    },
    /* 37 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$seal = __webpack_require__(38)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.checkRevision = checkRevision;
      exports.template = template;
      exports.wrapProgram = wrapProgram;
      exports.resolvePartial = resolvePartial;
      exports.invokePartial = invokePartial;
      exports.noop = noop;

      var _utils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_utils);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _base = __webpack_require__(3);

      var _helpers = __webpack_require__(9);

      var _internalWrapHelper = __webpack_require__(42);

      var _internalProtoAccess = __webpack_require__(32);

      function checkRevision(compilerInfo) {
        var compilerRevision = compilerInfo && compilerInfo[0] || 1,
            currentRevision = _base.COMPILER_REVISION;

        if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
          return;
        }

        if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
              compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
        }
      }

      function template(templateSpec, env) {
        /* istanbul ignore next */
        if (!env) {
          throw new _exception2['default']('No environment passed to template');
        }

        if (!templateSpec || !templateSpec.main) {
          throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
        }

        templateSpec.main.decorator = templateSpec.main_d; // Note: Using env.VM references rather than local var references throughout this section to allow
        // for external users to override these as pseudo-supported APIs.

        env.VM.checkRevision(templateSpec.compiler); // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)

        var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

        function invokePartialWrapper(partial, context, options) {
          if (options.hash) {
            context = Utils.extend({}, context, options.hash);

            if (options.ids) {
              options.ids[0] = true;
            }
          }

          partial = env.VM.resolvePartial.call(this, partial, context, options);
          var extendedOptions = Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
          });
          var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

          if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
          }

          if (result != null) {
            if (options.indent) {
              var lines = result.split('\n');

              for (var i = 0, l = lines.length; i < l; i++) {
                if (!lines[i] && i + 1 === l) {
                  break;
                }

                lines[i] = options.indent + lines[i];
              }

              result = lines.join('\n');
            }

            return result;
          } else {
            throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
          }
        } // Just add water


        var container = {
          strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) {
              throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
                loc: loc
              });
            }

            return container.lookupProperty(obj, name);
          },
          lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];

            if (result == null) {
              return result;
            }

            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return result;
            }

            if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
              return result;
            }

            return undefined;
          },
          lookup: function lookup(depths, name) {
            var len = depths.length;

            for (var i = 0; i < len; i++) {
              var result = depths[i] && container.lookupProperty(depths[i], name);

              if (result != null) {
                return depths[i][name];
              }
            }
          },
          lambda: function lambda(current, context) {
            return typeof current === 'function' ? current.call(context) : current;
          },
          escapeExpression: Utils.escapeExpression,
          invokePartial: invokePartialWrapper,
          fn: function fn(i) {
            var ret = templateSpec[i];
            ret.decorator = templateSpec[i + '_d'];
            return ret;
          },
          programs: [],
          program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i],
                fn = this.fn(i);

            if (data || depths || blockParams || declaredBlockParams) {
              programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            } else if (!programWrapper) {
              programWrapper = this.programs[i] = wrapProgram(this, i, fn);
            }

            return programWrapper;
          },
          data: function data(value, depth) {
            while (value && depth--) {
              value = value._parent;
            }

            return value;
          },
          mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;

            if (param && common && param !== common) {
              obj = Utils.extend({}, common, param);
            }

            return obj;
          },
          // An empty object to use as replacement for null-contexts
          nullContext: _Object$seal({}),
          noop: env.VM.noop,
          compilerInfo: templateSpec.compiler
        };

        function ret(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var data = options.data;

          ret._setup(options);

          if (!options.partial && templateSpec.useData) {
            data = initData(context, data);
          }

          var depths = undefined,
              blockParams = templateSpec.useBlockParams ? [] : undefined;

          if (templateSpec.useDepths) {
            if (options.depths) {
              depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
            } else {
              depths = [context];
            }
          }

          function main(context
          /*, options*/
          ) {
            return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
          }

          main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
          return main(context, options);
        }

        ret.isTop = true;

        ret._setup = function (options) {
          if (!options.partial) {
            var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
            wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;

            if (templateSpec.usePartial) {
              // Use mergeIfNeeded here to prevent compiling global partials multiple times
              container.partials = container.mergeIfNeeded(options.partials, env.partials);
            }

            if (templateSpec.usePartial || templateSpec.useDecorators) {
              container.decorators = Utils.extend({}, env.decorators, options.decorators);
            }

            container.hooks = {};
            container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;

            _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);

            _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
          } else {
            container.protoAccessControl = options.protoAccessControl; // internal option

            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
          }
        };

        ret._child = function (i, data, blockParams, depths) {
          if (templateSpec.useBlockParams && !blockParams) {
            throw new _exception2['default']('must pass block params');
          }

          if (templateSpec.useDepths && !depths) {
            throw new _exception2['default']('must pass parent depths');
          }

          return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
        };

        return ret;
      }

      function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
        function prog(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var currentDepths = depths;

          if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
            currentDepths = [context].concat(depths);
          }

          return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
        }

        prog = executeDecorators(fn, prog, container, depths, data, blockParams);
        prog.program = i;
        prog.depth = depths ? depths.length : 0;
        prog.blockParams = declaredBlockParams || 0;
        return prog;
      }
      /**
       * This is currently part of the official API, therefore implementation details should not be changed.
       */


      function resolvePartial(partial, context, options) {
        if (!partial) {
          if (options.name === '@partial-block') {
            partial = options.data['partial-block'];
          } else {
            partial = options.partials[options.name];
          }
        } else if (!partial.call && !options.name) {
          // This is a dynamic partial that returned a string
          options.name = partial;
          partial = options.partials[partial];
        }

        return partial;
      }

      function invokePartial(partial, context, options) {
        // Use the current closure context to save the partial-block if this partial
        var currentPartialBlock = options.data && options.data['partial-block'];
        options.partial = true;

        if (options.ids) {
          options.data.contextPath = options.ids[0] || options.data.contextPath;
        }

        var partialBlock = undefined;

        if (options.fn && options.fn !== noop) {
          (function () {
            options.data = _base.createFrame(options.data); // Wrapper function to get access to currentPartialBlock from the closure

            var fn = options.fn;

            partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
              var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]; // Restore the partial-block from the closure for the execution of the block
              // i.e. the part inside the block of the partial call.

              options.data = _base.createFrame(options.data);
              options.data['partial-block'] = currentPartialBlock;
              return fn(context, options);
            };

            if (fn.partials) {
              options.partials = Utils.extend({}, options.partials, fn.partials);
            }
          })();
        }

        if (partial === undefined && partialBlock) {
          partial = partialBlock;
        }

        if (partial === undefined) {
          throw new _exception2['default']('The partial ' + options.name + ' could not be found');
        } else if (partial instanceof Function) {
          return partial(context, options);
        }
      }

      function noop() {
        return '';
      }

      function initData(context, data) {
        if (!data || !('root' in data)) {
          data = data ? _base.createFrame(data) : {};
          data.root = context;
        }

        return data;
      }

      function executeDecorators(fn, prog, container, depths, data, blockParams) {
        if (fn.decorator) {
          var props = {};
          prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
          Utils.extend(prog, props);
        }

        return prog;
      }

      function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
        _Object$keys(mergedHelpers).forEach(function (helperName) {
          var helper = mergedHelpers[helperName];
          mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
        });
      }

      function passLookupPropertyOption(helper, container) {
        var lookupProperty = container.lookupProperty;
        return _internalWrapHelper.wrapHelper(helper, function (options) {
          return Utils.extend({
            lookupProperty: lookupProperty
          }, options);
        });
      }
      /***/

    },
    /* 38 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(39),
        __esModule: true
      };
      /***/
    },
    /* 39 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(40);

      module.exports = __webpack_require__(20).Object.seal;
      /***/
    },
    /* 40 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.17 Object.seal(O)
      var isObject = __webpack_require__(41);

      __webpack_require__(17)('seal', function ($seal) {
        return function seal(it) {
          return $seal && isObject(it) ? $seal(it) : it;
        };
      });
      /***/

    },
    /* 41 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };
      /***/

    },
    /* 42 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.wrapHelper = wrapHelper;

      function wrapHelper(helper, transformOptionsFn) {
        if (typeof helper !== 'function') {
          // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
          // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
          return helper;
        }

        var wrapper = function wrapper()
        /* dynamic arguments */
        {
          var options = arguments[arguments.length - 1];
          arguments[arguments.length - 1] = transformOptionsFn(options);
          return helper.apply(this, arguments);
        };

        return wrapper;
      }
      /***/

    },
    /* 43 */

    /***/
    function (module, exports) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        exports.__esModule = true;

        exports['default'] = function (Handlebars) {
          /* istanbul ignore next */
          var root = typeof global !== 'undefined' ? global : window,
              $Handlebars = root.Handlebars;
          /* istanbul ignore next */

          Handlebars.noConflict = function () {
            if (root.Handlebars === Handlebars) {
              root.Handlebars = $Handlebars;
            }

            return Handlebars;
          };
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    }
    /******/
    ])
  );
});

;
},{}],"bkJD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "\r\n  <li class=\"item-box\">\r\n    <div class=\"item\">\r\n      <img class=\"flag\" src=\"" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "flags") : depth0) != null ? lookupProperty(stack1, "svg") : stack1, depth0)) + "\" />\r\n      <p class=\"country-name\">" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "name") : depth0) != null ? lookupProperty(stack1, "oficial") : stack1, depth0)) + "</p>\r\n    </div>\r\n    <div class=\"capital\"><p class=\"strong-name\">Capital:</p><p\r\n      >&nbsp" + alias2(alias1(depth0 != null ? lookupProperty(depth0, "capital") : depth0, depth0)) + "</p>\r\n    </div>\r\n    <div class=\"capital\"><p class=\"strong-name\">Population:</p><p\r\n      >&nbsp" + alias2(alias1(depth0 != null ? lookupProperty(depth0, "population") : depth0, depth0)) + "</p>\r\n    </div>\r\n\r\n    <div class=\"capital\"><p class=\"strong-name\">Languages:</p>\r\n      <ul class=\"langs\">\r\n" + ((stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0 != null ? lookupProperty(depth0, "languages") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(2, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 17,
          "column": 8
        },
        "end": {
          "line": 21,
          "column": 17
        }
      }
    })) != null ? stack1 : "") + "      </ul>\r\n    </div>\r\n  </li>\r\n";
  },
  "2": function _(container, depth0, helpers, partials, data) {
    var lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "\r\n          <li class=\"lang-item\">" + container.escapeExpression(container.lambda(depth0 != null ? lookupProperty(depth0, "name") : depth0, depth0)) + ", &nbsp </li>\r\n\r\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return (stack1 = lookupProperty(helpers, "each").call(depth0 != null ? depth0 : container.nullContext || {}, depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 25,
          "column": 9
        }
      }
    })) != null ? stack1 : "";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"hZhY"}],"vsWf":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
* Notiflix (https://notiflix.github.io)
* Version: 3.2.2
* Author: Furkan MT (https://github.com/furcan)
* Copyright 2019 - 2021 Notiflix, MIT Licence (https://opensource.org/licenses/MIT)
*/

/* global define */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory(root);
  } else {
    root.Notiflix = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
  'use strict'; // COMMON: SSR check: begin

  if (typeof window === 'undefined' && typeof window.document === 'undefined') {
    return false;
  } // COMMON: SSR check: end
  // COMMON: Variables: begin


  var notiflixNamespace = 'Notiflix';
  var notiflixConsoleDocs = '\n\nVisit documentation page to learn more: https://notiflix.github.io/documentation';
  var defaultFontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'; // COMMON: Variables: end
  // NOTIFY: Default Settings: begin

  var typesNotify = {
    Success: 'Success',
    Failure: 'Failure',
    Warning: 'Warning',
    Info: 'Info'
  };
  var newNotifySettings;
  var notifySettings = {
    wrapID: 'NotiflixNotifyWrap',
    // can not customizable
    overlayID: 'NotiflixNotifyOverlay',
    // can not customizable
    width: '280px',
    position: 'right-top',
    // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
    distance: '10px',
    opacity: 1,
    borderRadius: '5px',
    rtl: false,
    timeout: 3000,
    messageMaxLength: 110,
    backOverlay: false,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    plainText: true,
    showOnlyTheLastOne: false,
    clickToClose: false,
    pauseOnHover: true,
    ID: 'NotiflixNotify',
    className: 'notiflix-notify',
    zindex: 4001,
    fontFamily: 'Quicksand',
    fontSize: '13px',
    cssAnimation: true,
    cssAnimationDuration: 400,
    cssAnimationStyle: 'fade',
    // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
    closeButton: false,
    useIcon: true,
    useFontAwesome: false,
    fontAwesomeIconStyle: 'basic',
    // 'basic' - 'shadow'
    fontAwesomeIconSize: '34px',
    success: {
      background: '#32c682',
      textColor: '#fff',
      childClassName: 'notiflix-notify-success',
      notiflixIconColor: 'rgba(0,0,0,0.2)',
      fontAwesomeClassName: 'fas fa-check-circle',
      fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
      backOverlayColor: 'rgba(50,198,130,0.2)'
    },
    failure: {
      background: '#ff5549',
      textColor: '#fff',
      childClassName: 'notiflix-notify-failure',
      notiflixIconColor: 'rgba(0,0,0,0.2)',
      fontAwesomeClassName: 'fas fa-times-circle',
      fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
      backOverlayColor: 'rgba(255,85,73,0.2)'
    },
    warning: {
      background: '#eebf31',
      textColor: '#fff',
      childClassName: 'notiflix-notify-warning',
      notiflixIconColor: 'rgba(0,0,0,0.2)',
      fontAwesomeClassName: 'fas fa-exclamation-circle',
      fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
      backOverlayColor: 'rgba(238,191,49,0.2)'
    },
    info: {
      background: '#26c0d3',
      textColor: '#fff',
      childClassName: 'notiflix-notify-info',
      notiflixIconColor: 'rgba(0,0,0,0.2)',
      fontAwesomeClassName: 'fas fa-info-circle',
      fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
      backOverlayColor: 'rgba(38,192,211,0.2)'
    }
  }; // NOTIFY: Default Settings: end
  // REPORT: Default Settings: begin

  var typesReport = {
    Success: 'Success',
    Failure: 'Failure',
    Warning: 'Warning',
    Info: 'Info'
  };
  var newReportSettings;
  var reportSettings = {
    ID: 'NotiflixReportWrap',
    // can not customizable
    className: 'notiflix-report',
    width: '320px',
    backgroundColor: '#f8f8f8',
    borderRadius: '25px',
    rtl: false,
    zindex: 4002,
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    fontFamily: 'Quicksand',
    svgSize: '110px',
    plainText: true,
    titleFontSize: '16px',
    titleMaxLength: 34,
    messageFontSize: '13px',
    messageMaxLength: 400,
    buttonFontSize: '14px',
    buttonMaxLength: 34,
    cssAnimation: true,
    cssAnimationDuration: 360,
    cssAnimationStyle: 'fade',
    // 'fade' - 'zoom'
    success: {
      svgColor: '#32c682',
      titleColor: '#1e1e1e',
      messageColor: '#242424',
      buttonBackground: '#32c682',
      buttonColor: '#fff',
      backOverlayColor: 'rgba(50,198,130,0.2)'
    },
    failure: {
      svgColor: '#ff5549',
      titleColor: '#1e1e1e',
      messageColor: '#242424',
      buttonBackground: '#ff5549',
      buttonColor: '#fff',
      backOverlayColor: 'rgba(255,85,73,0.2)'
    },
    warning: {
      svgColor: '#eebf31',
      titleColor: '#1e1e1e',
      messageColor: '#242424',
      buttonBackground: '#eebf31',
      buttonColor: '#fff',
      backOverlayColor: 'rgba(238,191,49,0.2)'
    },
    info: {
      svgColor: '#26c0d3',
      titleColor: '#1e1e1e',
      messageColor: '#242424',
      buttonBackground: '#26c0d3',
      buttonColor: '#fff',
      backOverlayColor: 'rgba(38,192,211,0.2)'
    }
  }; // REPORT: Default Settings: end
  // CONFIRM: Default Settings: begin

  var typesConfirm = {
    Show: 'Show',
    Ask: 'Ask',
    Prompt: 'Prompt'
  };
  var newConfirmSettings;
  var confirmSettings = {
    ID: 'NotiflixConfirmWrap',
    // can not customizable
    className: 'notiflix-confirm',
    width: '300px',
    zindex: 4003,
    position: 'center',
    // 'center' - 'center-top' - 'center-bottom' - 'right-top' - 'right-center' - 'right-bottom' - 'left-top' - 'left-center' - 'left-bottom'
    distance: '10px',
    backgroundColor: '#f8f8f8',
    borderRadius: '25px',
    backOverlay: true,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    rtl: false,
    fontFamily: 'Quicksand',
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: 'fade',
    // 'zoom' - 'fade'
    plainText: true,
    titleColor: '#32c682',
    titleFontSize: '16px',
    titleMaxLength: 34,
    messageColor: '#1e1e1e',
    messageFontSize: '14px',
    messageMaxLength: 110,
    buttonsFontSize: '15px',
    buttonsMaxLength: 34,
    okButtonColor: '#f8f8f8',
    okButtonBackground: '#32c682',
    cancelButtonColor: '#f8f8f8',
    cancelButtonBackground: '#a9a9a9'
  }; // CONFIRM: Default Settings: end
  // LOADING: Default Settings: begin

  var typesLoading = {
    Standard: 'Standard',
    Hourglass: 'Hourglass',
    Circle: 'Circle',
    Arrows: 'Arrows',
    Dots: 'Dots',
    Pulse: 'Pulse',
    Custom: 'Custom',
    Notiflix: 'Notiflix'
  };
  var newLoadingSettings;
  var loadingSettings = {
    ID: 'NotiflixLoadingWrap',
    // can not customizable
    className: 'notiflix-loading',
    zindex: 4000,
    backgroundColor: 'rgba(0,0,0,0.8)',
    rtl: false,
    fontFamily: 'Quicksand',
    cssAnimation: true,
    cssAnimationDuration: 400,
    clickToClose: false,
    customSvgUrl: null,
    customSvgCode: null,
    svgSize: '80px',
    svgColor: '#32c682',
    messageID: 'NotiflixLoadingMessage',
    messageFontSize: '15px',
    messageMaxLength: 34,
    messageColor: '#dcdcdc'
  }; // LOADING: Default Settings: end
  // BLOCK: Default Settings: begin

  var typesBlock = {
    Standard: 'Standard',
    Hourglass: 'Hourglass',
    Circle: 'Circle',
    Arrows: 'Arrows',
    Dots: 'Dots',
    Pulse: 'Pulse'
  };
  var newBlockSettings;
  var blockSettings = {
    ID: 'NotiflixBlockWrap',
    // can not customizable
    querySelectorLimit: 200,
    className: 'notiflix-block',
    position: 'absolute',
    zindex: 1000,
    backgroundColor: 'rgba(255,255,255,0.9)',
    rtl: false,
    fontFamily: 'Quicksand',
    cssAnimation: true,
    cssAnimationDuration: 300,
    svgSize: '45px',
    svgColor: '#383838',
    messageFontSize: '14px',
    messageMaxLength: 34,
    messageColor: '#383838'
  }; // BLOCK: Default Settings: end
  // COMMON: Console Error: begin

  var commonConsoleError = function commonConsoleError(message) {
    return console.error('%c ' + notiflixNamespace + ' Error ', 'padding:2px;border-radius:20px;color:#fff;background:#ff5549', '\n' + message + notiflixConsoleDocs);
  }; // COMMON: Console Error: end
  // COMMON: Console Log: begin


  var commonConsoleLog = function commonConsoleLog(message) {
    return console.log('%c ' + notiflixNamespace + ' Info ', 'padding:2px;border-radius:20px;color:#fff;background:#26c0d3', '\n' + message + notiflixConsoleDocs);
  }; // COMMON: Console Log: end
  // COMMON: Check Head or Body: begin


  var commonCheckHeadOrBody = function commonCheckHeadOrBody(element) {
    if (!element) {
      element = 'head';
    }

    if (window.document[element] === null) {
      commonConsoleError('\nNotiflix needs to be appended to the "<' + element + '>" element, but you called it before the "<' + element + '>" element has been created.');
      return false;
    }

    return true;
  }; // COMMON: Check Head or Body: end
  // COMMON: Set Internal CSS Codes: begin


  var commonSetInternalCSSCodes = function commonSetInternalCSSCodes(getInternalCSSCodes, styleElementId) {
    // check doc head
    if (!commonCheckHeadOrBody('head')) {
      return false;
    } // internal css


    if (getInternalCSSCodes() !== null && !window.document.getElementById(styleElementId)) {
      var internalCSS = window.document.createElement('style');
      internalCSS.id = styleElementId;
      internalCSS.innerHTML = getInternalCSSCodes();
      window.document.head.appendChild(internalCSS);
    }
  }; // COMMON: Set Internal CSS Codes: end
  // COMMON: Extend Options: begin


  var commonExtendOptions = function commonExtendOptions() {
    // variables
    var extended = {};
    var deep = false;
    var i = 0; // check if a deep merge

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    } // merge the object into the extended object


    var merge = function merge(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // if property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = commonExtendOptions(extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    }; // loop through each object and conduct a merge


    for (; i < arguments.length; i++) {
      merge(arguments[i]);
    }

    return extended;
  }; // COMMON: Extend Options: end
  // COMMON: Get Plaintext: begin


  var commonGetPlaintext = function commonGetPlaintext(html) {
    var htmlPool = window.document.createElement('div');
    htmlPool.innerHTML = html;
    return htmlPool.textContent || htmlPool.innerText || '';
  }; // COMMON: Get Plaintext: end
  // REPORT: SVG Icon Success: begin


  var reportSvgIconSuccess = function reportSvgIconSuccess(width, color) {
    if (!width) {
      width = '110px';
    }

    if (!color) {
      color = '#32c682';
    }

    var reportSvgSuccess = '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportSuccess" width="' + width + '" height="' + width + '" fill="' + color + '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportSuccess1-animation{0%{-webkit-transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px)}50%,to{-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px)}60%{-webkit-transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px)}}@keyframes NXReportSuccess1-animation{0%{-webkit-transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.5,.5) translate(-60px,-57.7px)}50%,to{-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px)}60%{-webkit-transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px);transform:translate(60px,57.7px) scale(.95,.95) translate(-60px,-57.7px)}}@-webkit-keyframes NXReportSuccess4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportSuccess4-animation{0%{opacity:0}50%,to{opacity:1}}@-webkit-keyframes NXReportSuccess3-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportSuccess3-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportSuccess2-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportSuccess2-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}#NXReportSuccess *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportSuccess2-animation;animation-name:NXReportSuccess2-animation;-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)"><path d="M60 115.38C29.46 115.38 4.62 90.54 4.62 60 4.62 29.46 29.46 4.62 60 4.62c30.54 0 55.38 24.84 55.38 55.38 0 30.54-24.84 55.38-55.38 55.38zM60 0C26.92 0 0 26.92 0 60s26.92 60 60 60 60-26.92 60-60S93.08 0 60 0z" style="-webkit-animation-name:NXReportSuccess3-animation;animation-name:NXReportSuccess3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportSuccess1-animation;animation-name:NXReportSuccess1-animation;-webkit-transform:translate(60px,57.7px) scale(1,1) translate(-60px,-57.7px);-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)"><path d="M88.27 35.39L52.8 75.29 31.43 58.2c-.98-.81-2.44-.63-3.24.36-.79.99-.63 2.44.36 3.24l23.08 18.46c.43.34.93.51 1.44.51.64 0 1.27-.26 1.74-.78l36.91-41.53a2.3 2.3 0 0 0-.19-3.26c-.95-.86-2.41-.77-3.26.19z" style="-webkit-animation-name:NXReportSuccess4-animation;animation-name:NXReportSuccess4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>';
    return reportSvgSuccess;
  }; // REPORT: SVG Icon Success: end
  // REPORT: SVG Icon Failure: begin


  var reportSvgIconFailure = function reportSvgIconFailure(width, color) {
    if (!width) {
      width = '110px';
    }

    if (!color) {
      color = '#ff5549';
    }

    var reportSvgFailure = '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportFailure" width="' + width + '" height="' + width + '" fill="' + color + '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportFailure2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportFailure2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportFailure1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportFailure1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportFailure3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportFailure3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportFailure4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportFailure4-animation{0%{opacity:0}50%,to{opacity:1}}#NXReportFailure *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportFailure1-animation;animation-name:NXReportFailure1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M4.35 34.95c0-16.82 13.78-30.6 30.6-30.6h50.1c16.82 0 30.6 13.78 30.6 30.6v50.1c0 16.82-13.78 30.6-30.6 30.6h-50.1c-16.82 0-30.6-13.78-30.6-30.6v-50.1zM34.95 120h50.1c19.22 0 34.95-15.73 34.95-34.95v-50.1C120 15.73 104.27 0 85.05 0h-50.1C15.73 0 0 15.73 0 34.95v50.1C0 104.27 15.73 120 34.95 120z" style="-webkit-animation-name:NXReportFailure2-animation;animation-name:NXReportFailure2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportFailure3-animation;animation-name:NXReportFailure3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M82.4 37.6c-.9-.9-2.37-.9-3.27 0L60 56.73 40.86 37.6a2.306 2.306 0 0 0-3.26 3.26L56.73 60 37.6 79.13c-.9.9-.9 2.37 0 3.27.45.45 1.04.68 1.63.68.59 0 1.18-.23 1.63-.68L60 63.26 79.13 82.4c.45.45 1.05.68 1.64.68.58 0 1.18-.23 1.63-.68.9-.9.9-2.37 0-3.27L63.26 60 82.4 40.86c.9-.91.9-2.36 0-3.26z" style="-webkit-animation-name:NXReportFailure4-animation;animation-name:NXReportFailure4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>';
    return reportSvgFailure;
  }; // REPORT: SVG Icon Failure: end
  // REPORT: SVG Icon Warning: begin


  var reportSvgIconWarning = function reportSvgIconWarning(width, color) {
    if (!width) {
      width = '110px';
    }

    if (!color) {
      color = '#eebf31';
    }

    var reportSvgWarning = '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportWarning" width="' + width + '" height="' + width + '" fill="' + color + '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportWarning2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportWarning2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportWarning1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportWarning1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportWarning3-animation{0%{-webkit-transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px)}50%,to{-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)}60%{-webkit-transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px)}}@keyframes NXReportWarning3-animation{0%{-webkit-transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.5,.5) translate(-60px,-66.6px)}50%,to{-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)}60%{-webkit-transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px);transform:translate(60px,66.6px) scale(.95,.95) translate(-60px,-66.6px)}}@-webkit-keyframes NXReportWarning4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportWarning4-animation{0%{opacity:0}50%,to{opacity:1}}#NXReportWarning *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportWarning1-animation;animation-name:NXReportWarning1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M115.46 106.15l-54.04-93.8c-.61-1.06-2.23-1.06-2.84 0l-54.04 93.8c-.62 1.07.21 2.29 1.42 2.29h108.08c1.21 0 2.04-1.22 1.42-2.29zM65.17 10.2l54.04 93.8c2.28 3.96-.65 8.78-5.17 8.78H5.96c-4.52 0-7.45-4.82-5.17-8.78l54.04-93.8c2.28-3.95 8.03-4 10.34 0z" style="-webkit-animation-name:NXReportWarning2-animation;animation-name:NXReportWarning2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportWarning3-animation;animation-name:NXReportWarning3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,66.6px) scale(1,1) translate(-60px,-66.6px)"><path d="M57.83 94.01c0 1.2.97 2.17 2.17 2.17s2.17-.97 2.17-2.17v-3.2c0-1.2-.97-2.17-2.17-2.17s-2.17.97-2.17 2.17v3.2zm0-14.15c0 1.2.97 2.17 2.17 2.17s2.17-.97 2.17-2.17V39.21c0-1.2-.97-2.17-2.17-2.17s-2.17.97-2.17 2.17v40.65z" style="-webkit-animation-name:NXReportWarning4-animation;animation-name:NXReportWarning4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>';
    return reportSvgWarning;
  }; // REPORT: SVG Icon Warning: end
  // REPORT: SVG Icon Info: begin


  var reportSvgIconInfo = function reportSvgIconInfo(width, color) {
    if (!width) {
      width = '110px';
    }

    if (!color) {
      color = '#26c0d3';
    }

    var reportSvgInfo = '<svg xmlns="http://www.w3.org/2000/svg" id="NXReportInfo" width="' + width + '" height="' + width + '" fill="' + color + '" viewBox="0 0 120 120"><style>@-webkit-keyframes NXReportInfo4-animation{0%{opacity:0}50%,to{opacity:1}}@keyframes NXReportInfo4-animation{0%{opacity:0}50%,to{opacity:1}}@-webkit-keyframes NXReportInfo3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportInfo3-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}50%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@-webkit-keyframes NXReportInfo2-animation{0%{opacity:0}40%,to{opacity:1}}@keyframes NXReportInfo2-animation{0%{opacity:0}40%,to{opacity:1}}@-webkit-keyframes NXReportInfo1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}@keyframes NXReportInfo1-animation{0%{-webkit-transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px);transform:translate(60px,60px) scale(.5,.5) translate(-60px,-60px)}40%,to{-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px);transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)}60%{-webkit-transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px);transform:translate(60px,60px) scale(.95,.95) translate(-60px,-60px)}}#NXReportInfo *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g style="-webkit-animation-name:NXReportInfo1-animation;animation-name:NXReportInfo1-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M60 115.38C29.46 115.38 4.62 90.54 4.62 60 4.62 29.46 29.46 4.62 60 4.62c30.54 0 55.38 24.84 55.38 55.38 0 30.54-24.84 55.38-55.38 55.38zM60 0C26.92 0 0 26.92 0 60s26.92 60 60 60 60-26.92 60-60S93.08 0 60 0z" style="-webkit-animation-name:NXReportInfo2-animation;animation-name:NXReportInfo2-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g><g style="-webkit-animation-name:NXReportInfo3-animation;animation-name:NXReportInfo3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform:translate(60px,60px) scale(1,1) translate(-60px,-60px)"><path d="M57.75 43.85c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v48.18c0 1.24-1.01 2.25-2.25 2.25s-2.25-1.01-2.25-2.25V43.85zm0-15.88c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.32c0 1.25-1.01 2.25-2.25 2.25s-2.25-1-2.25-2.25v-3.32z" style="-webkit-animation-name:NXReportInfo4-animation;animation-name:NXReportInfo4-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1)" fill="inherit" data-animator-group="true" data-animator-type="2"/></g></svg>';
    return reportSvgInfo;
  }; // REPORT: SVG Icon Info: end
  // LOADING && BLOCK: SVG Icon Standard: begin


  var loadingAndBlockSvgIconStandard = function loadingAndBlockSvgIconStandard(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var standard = '<svg xmlns="http://www.w3.org/2000/svg" stroke="' + color + '" width="' + width + '" height="' + width + '" transform="scale(.8)" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd" stroke-width="2" transform="translate(1 1)"><circle cx="18" cy="18" r="18" stroke-opacity=".25"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" dur="1s" from="0 18 18" repeatCount="indefinite" to="360 18 18" type="rotate"/></path></g></svg>';
    return standard;
  }; // LOADING && BLOCK: SVG Icon Standard: end
  // LOADING && BLOCK: SVG Icon Hourglass: begin


  var loadingAndBlockSvgIconHourglass = function loadingAndBlockSvgIconHourglass(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var hourglass = '<svg xmlns="http://www.w3.org/2000/svg" id="NXLoadingHourglass" fill="' + color + '" width="' + width + '" height="' + width + '" viewBox="0 0 200 200"><style>@-webkit-keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@keyframes NXhourglass5-animation{0%{-webkit-transform:scale(1,1);transform:scale(1,1)}16.67%{-webkit-transform:scale(1,.8);transform:scale(1,.8)}33.33%{-webkit-transform:scale(.88,.6);transform:scale(.88,.6)}37.5%{-webkit-transform:scale(.85,.55);transform:scale(.85,.55)}41.67%{-webkit-transform:scale(.8,.5);transform:scale(.8,.5)}45.83%{-webkit-transform:scale(.75,.45);transform:scale(.75,.45)}50%{-webkit-transform:scale(.7,.4);transform:scale(.7,.4)}54.17%{-webkit-transform:scale(.6,.35);transform:scale(.6,.35)}58.33%{-webkit-transform:scale(.5,.3);transform:scale(.5,.3)}83.33%,to{-webkit-transform:scale(.2,0);transform:scale(.2,0)}}@-webkit-keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@keyframes NXhourglass3-animation{0%{-webkit-transform:scale(1,.02);transform:scale(1,.02)}79.17%,to{-webkit-transform:scale(1,1);transform:scale(1,1)}}@-webkit-keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes NXhourglass1-animation{0%,83.33%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}#NXLoadingHourglass *{-webkit-animation-duration:1.2s;animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:cubic-bezier(0,0,1,1);animation-timing-function:cubic-bezier(0,0,1,1)}</style><g data-animator-group="true" data-animator-type="1" style="-webkit-animation-name:NXhourglass1-animation;animation-name:NXhourglass1-animation;-webkit-transform-origin:50% 50%;transform-origin:50% 50%;transform-box:fill-box"><g id="NXhourglass2" fill="inherit"><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass3-animation;animation-name:NXhourglass3-animation;-webkit-animation-timing-function:cubic-bezier(.42,0,.58,1);animation-timing-function:cubic-bezier(.42,0,.58,1);-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass4" d="M100 100l-34.38 32.08v31.14h68.76v-31.14z"/></g><g data-animator-group="true" data-animator-type="2" style="-webkit-animation-name:NXhourglass5-animation;animation-name:NXhourglass5-animation;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transform-box:fill-box" opacity=".4"><path id="NXhourglass6" d="M100 100L65.62 67.92V36.78h68.76v31.14z"/></g><path d="M51.14 38.89h8.33v14.93c0 15.1 8.29 28.99 23.34 39.1 1.88 1.25 3.04 3.97 3.04 7.08s-1.16 5.83-3.04 7.09c-15.05 10.1-23.34 23.99-23.34 39.09v14.93h-8.33a4.859 4.859 0 1 0 0 9.72h97.72a4.859 4.859 0 1 0 0-9.72h-8.33v-14.93c0-15.1-8.29-28.99-23.34-39.09-1.88-1.26-3.04-3.98-3.04-7.09s1.16-5.83 3.04-7.08c15.05-10.11 23.34-24 23.34-39.1V38.89h8.33a4.859 4.859 0 1 0 0-9.72H51.14a4.859 4.859 0 1 0 0 9.72zm79.67 14.93c0 15.87-11.93 26.25-19.04 31.03-4.6 3.08-7.34 8.75-7.34 15.15 0 6.41 2.74 12.07 7.34 15.15 7.11 4.78 19.04 15.16 19.04 31.03v14.93H69.19v-14.93c0-15.87 11.93-26.25 19.04-31.02 4.6-3.09 7.34-8.75 7.34-15.16 0-6.4-2.74-12.07-7.34-15.15-7.11-4.78-19.04-15.16-19.04-31.03V38.89h61.62v14.93z"/></g></g></svg>';
    return hourglass;
  }; // LOADING && BLOCK: SVG Icon Hourglass: end
  // LOADING && BLOCK: SVG Icon Circle: begin


  var loadingAndBlockSvgIconCircle = function loadingAndBlockSvgIconCircle(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var circle = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + width + '" viewBox="25 25 50 50" style="-webkit-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;height:' + width + ';-webkit-transform-origin:center center;-ms-transform-origin:center center;transform-origin:center center;width:' + width + ';position:absolute;top:0;left:0;margin:auto"><style>@-webkit-keyframes rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35}to{stroke-dasharray:89,200;stroke-dashoffset:-124}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35}to{stroke-dasharray:89,200;stroke-dashoffset:-124}}</style><circle cx="50" cy="50" r="20" fill="none" stroke="' + color + '" stroke-width="2" style="-webkit-animation:dash 1.5s ease-in-out infinite,color 1.5s ease-in-out infinite;animation:dash 1.5s ease-in-out infinite,color 1.5s ease-in-out infinite" stroke-dasharray="150 200" stroke-dashoffset="-10" stroke-linecap="round"/></svg>';
    return circle;
  }; // LOADING && BLOCK: SVG Icon Circle: end
  // LOADING && BLOCK: SVG Icon Arrows: begin


  var loadingAndBlockSvgIconArrows = function loadingAndBlockSvgIconArrows(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var arrows = '<svg xmlns="http://www.w3.org/2000/svg" fill="' + color + '" width="' + width + '" height="' + width + '" viewBox="0 0 128 128"><g><path fill="inherit" d="M109.25 55.5h-36l12-12a29.54 29.54 0 0 0-49.53 12H18.75A46.04 46.04 0 0 1 96.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0 0 49.53-12h16.97A46.04 46.04 0 0 1 31.1 96.16L18.74 108.5v-36z"/><animateTransform attributeName="transform" dur="1.5s" from="0 64 64" repeatCount="indefinite" to="360 64 64" type="rotate"/></g></svg>';
    return arrows;
  }; // LOADING && BLOCK: SVG Icon Arrows: end
  // LOADING && BLOCK: SVG Icon Dots: begin


  var loadingAndBlockSvgIconDots = function loadingAndBlockSvgIconDots(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var dots = '<svg xmlns="http://www.w3.org/2000/svg" fill="' + color + '" width="' + width + '" height="' + width + '" viewBox="0 0 100 100"><g transform="translate(25 50)"><circle r="9" fill="inherit" transform="scale(.239)"><animateTransform attributeName="transform" begin="-0.266s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g><g transform="translate(50 50)"><circle r="9" fill="inherit" transform="scale(.00152)"><animateTransform attributeName="transform" begin="-0.133s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g><g transform="translate(75 50)"><circle r="9" fill="inherit" transform="scale(.299)"><animateTransform attributeName="transform" begin="0s" calcMode="spline" dur="0.8s" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" keyTimes="0;0.5;1" repeatCount="indefinite" type="scale" values="0;1;0"/></circle></g></svg>';
    return dots;
  }; // LOADING && BLOCK: SVG Icon Dots: end
  // LOADING && BLOCK: SVG Icon Pulse: begin


  var loadingAndBlockSvgIconPulse = function loadingAndBlockSvgIconPulse(width, color) {
    if (!width) {
      width = '60px';
    }

    if (!color) {
      color = '#32c682';
    }

    var pulse = '<svg xmlns="http://www.w3.org/2000/svg" stroke="' + color + '" width="' + width + '" height="' + width + '" viewBox="0 0 44 44"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>';
    return pulse;
  }; // LOADING && BLOCK: SVG Icon Pulse: end
  // LOADING && BLOCK: SVG Icon Notiflix: begin


  var loadingAndBlockSvgIconNotiflix = function loadingAndBlockSvgIconNotiflix(width, white, green) {
    if (!width) {
      width = '60px';
    }

    if (!white) {
      white = '#f8f8f8';
    }

    if (!green) {
      green = '#32c682';
    }

    var notiflixIcon = '<svg xmlns="http://www.w3.org/2000/svg" id="NXLoadingNotiflixLib" width="' + width + '" height="' + width + '" viewBox="0 0 200 200"><defs><style>@keyframes notiflix-n{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes notiflix-x{0%{stroke-dashoffset:1000}to{stroke-dashoffset:0}}@keyframes notiflix-dot{0%,to{stroke-width:0}50%{stroke-width:12}}.nx-icon-line{stroke:' + white + ';stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22;fill:none}</style></defs><path d="M47.97 135.05a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z" style="animation-name:notiflix-dot;animation-timing-function:ease-in-out;animation-duration:1.25s;animation-iteration-count:infinite;animation-direction:normal" fill="' + green + '" stroke="' + green + '" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22" stroke-width="12"/><path class="nx-icon-line" d="M10.14 144.76V87.55c0-5.68-4.54-41.36 37.83-41.36 42.36 0 37.82 35.68 37.82 41.36v57.21" style="animation-name:notiflix-n;animation-timing-function:linear;animation-duration:2.5s;animation-delay:0s;animation-iteration-count:infinite;animation-direction:normal" stroke-dasharray="500"/><path class="nx-icon-line" d="M115.06 144.49c24.98-32.68 49.96-65.35 74.94-98.03M114.89 46.6c25.09 32.58 50.19 65.17 75.29 97.75" style="animation-name:notiflix-x;animation-timing-function:linear;animation-duration:2.5s;animation-delay:.2s;animation-iteration-count:infinite;animation-direction:normal" stroke-dasharray="500"/></svg>';
    return notiflixIcon;
  }; // LOADING && BLOCK: SVG Icon Notiflix: end
  // NOTIFY: Get Internal CSS Codes: begin


  var notifyGetInternalCSSCodes = function notifyGetInternalCSSCodes() {
    var notifyCSS = '';
    return notifyCSS || null;
  }; // NOTIFY: Get Internal CSS Codes: end
  // NOTIFY: Create: begin


  var notifyCreateCounter = 0;

  var notifyCreate = function notifyCreate(notifyType, message, callbackOrOptions, options) {
    // check doc body
    if (!commonCheckHeadOrBody('body')) {
      return false;
    } // if not initialized pretend like init


    if (!newNotifySettings) {
      Notiflix.Notify.init({});
    } // create a backup for new settings


    var newNotifySettingsBackup = commonExtendOptions(true, newNotifySettings, {}); // check callbackOrOptions and options: begin

    if (_typeof(callbackOrOptions) === 'object' && !Array.isArray(callbackOrOptions) || _typeof(options) === 'object' && !Array.isArray(options)) {
      // new options
      var newOptions = {};

      if (_typeof(callbackOrOptions) === 'object') {
        newOptions = callbackOrOptions;
      } else if (_typeof(options) === 'object') {
        newOptions = options;
      } // extend new settings with the new options


      newNotifySettings = commonExtendOptions(true, newNotifySettings, newOptions);
    } // check callbackOrOptions and options: end
    // notify type


    var theType = newNotifySettings[notifyType.toLocaleLowerCase('en')]; // notify counter

    notifyCreateCounter++; // check the message: begin

    if (typeof message !== 'string') {
      message = 'Notiflix ' + notifyType;
    } // check the message: end
    // if plainText is true => HTML tags not allowed: begin


    if (newNotifySettings.plainText) {
      message = commonGetPlaintext(message); // message plain text
    } // if plainText is true => HTML tags not allowed: end
    // if plainText is false but the message length more than messageMaxLength => Possible HTML tags error: begin


    if (!newNotifySettings.plainText && message.length > newNotifySettings.messageMaxLength) {
      // extend settings for error massege
      newNotifySettings = commonExtendOptions(true, newNotifySettings, {
        closeButton: true,
        messageMaxLength: 150
      }); // error message

      message = 'Possible HTML Tags Error: The "plainText" option is "false" and the notification content length is more than the "messageMaxLength" option.';
    } // if plainText is false but the message length more than messageMaxLength => Possible HTML tags error: end
    // check message max length: begin


    if (message.length > newNotifySettings.messageMaxLength) {
      message = message.substring(0, newNotifySettings.messageMaxLength) + '...';
    } // check message max length: end
    // font awesome icon style: begin


    if (newNotifySettings.fontAwesomeIconStyle === 'shadow') {
      theType.fontAwesomeIconColor = theType.background;
    } // font awesome icon style: end
    // if cssAnimaion is false => duration: begin


    if (!newNotifySettings.cssAnimation) {
      newNotifySettings.cssAnimationDuration = 0;
    } // if cssAnimaion is false => duration: end
    // notify wrap: begin


    var ntflxNotifyWrap = window.document.getElementById(notifySettings.wrapID) || window.document.createElement('div');
    ntflxNotifyWrap.id = notifySettings.wrapID;
    ntflxNotifyWrap.style.width = newNotifySettings.width;
    ntflxNotifyWrap.style.zIndex = newNotifySettings.zindex;
    ntflxNotifyWrap.style.opacity = newNotifySettings.opacity; // wrap position: begin

    if (newNotifySettings.position === 'center-center') {
      ntflxNotifyWrap.style.left = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = newNotifySettings.distance;
      ntflxNotifyWrap.style.right = newNotifySettings.distance;
      ntflxNotifyWrap.style.bottom = newNotifySettings.distance;
      ntflxNotifyWrap.style.margin = 'auto';
      ntflxNotifyWrap.classList.add('nx-flex-center-center');
      ntflxNotifyWrap.style.maxHeight = 'calc((100vh - ' + newNotifySettings.distance + ') - ' + newNotifySettings.distance + ')';
      ntflxNotifyWrap.style.display = 'flex';
      ntflxNotifyWrap.style.flexWrap = 'wrap';
      ntflxNotifyWrap.style.flexDirection = 'column';
      ntflxNotifyWrap.style.justifyContent = 'center';
      ntflxNotifyWrap.style.alignItems = 'center';
      ntflxNotifyWrap.style.pointerEvents = 'none';
    } else if (newNotifySettings.position === 'center-top') {
      ntflxNotifyWrap.style.left = newNotifySettings.distance;
      ntflxNotifyWrap.style.right = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = newNotifySettings.distance;
      ntflxNotifyWrap.style.bottom = 'auto';
      ntflxNotifyWrap.style.margin = 'auto';
    } else if (newNotifySettings.position === 'center-bottom') {
      ntflxNotifyWrap.style.left = newNotifySettings.distance;
      ntflxNotifyWrap.style.right = newNotifySettings.distance;
      ntflxNotifyWrap.style.bottom = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = 'auto';
      ntflxNotifyWrap.style.margin = 'auto';
    } else if (newNotifySettings.position === 'right-bottom') {
      ntflxNotifyWrap.style.right = newNotifySettings.distance;
      ntflxNotifyWrap.style.bottom = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = 'auto';
      ntflxNotifyWrap.style.left = 'auto';
    } else if (newNotifySettings.position === 'left-top') {
      ntflxNotifyWrap.style.left = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = newNotifySettings.distance;
      ntflxNotifyWrap.style.right = 'auto';
      ntflxNotifyWrap.style.bottom = 'auto';
    } else if (newNotifySettings.position === 'left-bottom') {
      ntflxNotifyWrap.style.left = newNotifySettings.distance;
      ntflxNotifyWrap.style.bottom = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = 'auto';
      ntflxNotifyWrap.style.right = 'auto';
    } else {
      // 'right-top' or else
      ntflxNotifyWrap.style.right = newNotifySettings.distance;
      ntflxNotifyWrap.style.top = newNotifySettings.distance;
      ntflxNotifyWrap.style.left = 'auto';
      ntflxNotifyWrap.style.bottom = 'auto';
    } // wrap position: end
    // if background overlay is true: begin


    if (newNotifySettings.backOverlay) {
      var ntflxNotifyOverlay = window.document.getElementById(notifySettings.overlayID) || window.document.createElement('div');
      ntflxNotifyOverlay.id = notifySettings.overlayID;
      ntflxNotifyOverlay.style.width = '100%';
      ntflxNotifyOverlay.style.height = '100%';
      ntflxNotifyOverlay.style.position = 'fixed';
      ntflxNotifyOverlay.style.zIndex = newNotifySettings.zindex - 1;
      ntflxNotifyOverlay.style.left = 0;
      ntflxNotifyOverlay.style.top = 0;
      ntflxNotifyOverlay.style.right = 0;
      ntflxNotifyOverlay.style.bottom = 0;
      ntflxNotifyOverlay.style.background = theType.backOverlayColor || newNotifySettings.backOverlayColor;
      ntflxNotifyOverlay.className = newNotifySettings.cssAnimation ? 'nx-with-animation' : '';
      ntflxNotifyOverlay.style.animationDuration = newNotifySettings.cssAnimation ? newNotifySettings.cssAnimationDuration + 'ms' : '';

      if (!window.document.getElementById(notifySettings.overlayID)) {
        window.document.body.appendChild(ntflxNotifyOverlay);
      }
    } // if background overlay is true: end


    if (!window.document.getElementById(notifySettings.wrapID)) {
      window.document.body.appendChild(ntflxNotifyWrap);
    } // notify wrap: end
    // notify content: begin


    var ntflxNotify = window.document.createElement('div');
    ntflxNotify.id = newNotifySettings.ID + '-' + notifyCreateCounter;
    ntflxNotify.className = newNotifySettings.className + ' ' + theType.childClassName + ' ' + (newNotifySettings.cssAnimation ? 'nx-with-animation' : '') + ' ' + (newNotifySettings.useIcon ? 'nx-with-icon' : '') + ' nx-' + newNotifySettings.cssAnimationStyle + ' ' + (newNotifySettings.closeButton && typeof callbackOrOptions !== 'function' ? 'nx-with-close-button' : '') + ' ' + (typeof callbackOrOptions === 'function' ? 'nx-with-callback' : '') + ' ' + (newNotifySettings.clickToClose ? 'nx-click-to-close' : '');
    ntflxNotify.style.fontSize = newNotifySettings.fontSize;
    ntflxNotify.style.color = theType.textColor;
    ntflxNotify.style.background = theType.background;
    ntflxNotify.style.borderRadius = newNotifySettings.borderRadius;
    ntflxNotify.style.pointerEvents = 'all'; // rtl: begin

    if (newNotifySettings.rtl) {
      ntflxNotify.setAttribute('dir', 'rtl');
      ntflxNotify.classList.add('nx-rtl-on');
    } // rtl: end
    // font-family: begin


    ntflxNotify.style.fontFamily = '"' + newNotifySettings.fontFamily + '", ' + defaultFontFamily; // font-family: end
    // use css animation: begin

    if (newNotifySettings.cssAnimation) {
      ntflxNotify.style.animationDuration = newNotifySettings.cssAnimationDuration + 'ms';
    } // use css animation: end
    // close button element: begin


    var closeButtonHTML = '';

    if (newNotifySettings.closeButton && typeof callbackOrOptions !== 'function') {
      closeButtonHTML = '<span class="nx-close-button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g><path fill="' + theType.notiflixIconColor + '" d="M0.38 2.19l7.8 7.81 -7.8 7.81c-0.51,0.5 -0.51,1.31 -0.01,1.81 0.25,0.25 0.57,0.38 0.91,0.38 0.34,0 0.67,-0.14 0.91,-0.38l7.81 -7.81 7.81 7.81c0.24,0.24 0.57,0.38 0.91,0.38 0.34,0 0.66,-0.14 0.9,-0.38 0.51,-0.5 0.51,-1.31 0,-1.81l-7.81 -7.81 7.81 -7.81c0.51,-0.5 0.51,-1.31 0,-1.82 -0.5,-0.5 -1.31,-0.5 -1.81,0l-7.81 7.81 -7.81 -7.81c-0.5,-0.5 -1.31,-0.5 -1.81,0 -0.51,0.51 -0.51,1.32 0,1.82z"/></g></svg></span>';
    } // close buttpon element: end
    // use icon: begin


    if (newNotifySettings.useIcon) {
      // use font awesome
      if (newNotifySettings.useFontAwesome) {
        ntflxNotify.innerHTML = '<i style="color:' + theType.fontAwesomeIconColor + '; font-size:' + newNotifySettings.fontAwesomeIconSize + ';" class="nx-message-icon nx-message-icon-fa ' + theType.fontAwesomeClassName + ' ' + (newNotifySettings.fontAwesomeIconStyle === 'shadow' ? 'nx-message-icon-fa-shadow' : 'nx-message-icon-fa-basic') + '"></i><span class="nx-message nx-with-icon">' + message + '</span>' + (newNotifySettings.closeButton ? closeButtonHTML : '');
      } // use notiflix icon
      else {
        var svgIcon = '';

        if (notifyType === typesNotify.Success) {
          // success
          svgIcon = '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' + theType.notiflixIconColor + '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm-2.4 -13.29l11.52 -12.96c0.37,-0.41 1.01,-0.45 1.42,-0.08 0.42,0.37 0.46,1 0.09,1.42l-12.16 13.67c-0.19,0.22 -0.46,0.34 -0.75,0.34 -0.23,0 -0.45,-0.07 -0.63,-0.22l-7.6 -6.07c-0.43,-0.35 -0.5,-0.99 -0.16,-1.42 0.35,-0.43 0.99,-0.5 1.42,-0.16l6.85 5.48z"/></g></svg>';
        } else if (notifyType === typesNotify.Failure) {
          // failure
          svgIcon = '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' + theType.notiflixIconColor + '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm1.42 -17.98l6.13 6.12c0.39,0.4 0.39,1.04 0,1.43 -0.19,0.19 -0.45,0.29 -0.71,0.29 -0.27,0 -0.53,-0.1 -0.72,-0.29l-6.12 -6.13 -6.13 6.13c-0.19,0.19 -0.44,0.29 -0.71,0.29 -0.27,0 -0.52,-0.1 -0.71,-0.29 -0.39,-0.39 -0.39,-1.03 0,-1.43l6.13 -6.12 -6.13 -6.13c-0.39,-0.39 -0.39,-1.03 0,-1.42 0.39,-0.39 1.03,-0.39 1.42,0l6.13 6.12 6.12 -6.12c0.4,-0.39 1.04,-0.39 1.43,0 0.39,0.39 0.39,1.03 0,1.42l-6.13 6.13z"/></g></svg>';
        } else if (notifyType === typesNotify.Warning) {
          // warning
          svgIcon = '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' + theType.notiflixIconColor + '" d="M21.91 3.48l17.8 30.89c0.84,1.46 -0.23,3.25 -1.91,3.25l-35.6 0c-1.68,0 -2.75,-1.79 -1.91,-3.25l17.8 -30.89c0.85,-1.47 2.97,-1.47 3.82,0zm16.15 31.84l-17.8 -30.89c-0.11,-0.2 -0.41,-0.2 -0.52,0l-17.8 30.89c-0.12,0.2 0.05,0.4 0.26,0.4l35.6 0c0.21,0 0.38,-0.2 0.26,-0.4zm-19.01 -4.12l0 -1.05c0,-0.53 0.42,-0.95 0.95,-0.95 0.53,0 0.95,0.42 0.95,0.95l0 1.05c0,0.53 -0.42,0.95 -0.95,0.95 -0.53,0 -0.95,-0.42 -0.95,-0.95zm0 -4.66l0 -13.39c0,-0.52 0.42,-0.95 0.95,-0.95 0.53,0 0.95,0.43 0.95,0.95l0 13.39c0,0.53 -0.42,0.96 -0.95,0.96 -0.53,0 -0.95,-0.43 -0.95,-0.96z"/></g></svg>';
        } else if (notifyType === typesNotify.Info) {
          // info
          svgIcon = '<svg class="nx-message-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g><path fill="' + theType.notiflixIconColor + '" d="M20 0c11.03,0 20,8.97 20,20 0,11.03 -8.97,20 -20,20 -11.03,0 -20,-8.97 -20,-20 0,-11.03 8.97,-20 20,-20zm0 37.98c9.92,0 17.98,-8.06 17.98,-17.98 0,-9.92 -8.06,-17.98 -17.98,-17.98 -9.92,0 -17.98,8.06 -17.98,17.98 0,9.92 8.06,17.98 17.98,17.98zm-0.99 -23.3c0,-0.54 0.44,-0.98 0.99,-0.98 0.55,0 0.99,0.44 0.99,0.98l0 15.86c0,0.55 -0.44,0.99 -0.99,0.99 -0.55,0 -0.99,-0.44 -0.99,-0.99l0 -15.86zm0 -5.22c0,-0.55 0.44,-0.99 0.99,-0.99 0.55,0 0.99,0.44 0.99,0.99l0 1.09c0,0.54 -0.44,0.99 -0.99,0.99 -0.55,0 -0.99,-0.45 -0.99,-0.99l0 -1.09z"/></g></svg>';
        }

        ntflxNotify.innerHTML = svgIcon + '<span class="nx-message nx-with-icon">' + message + '</span>' + (newNotifySettings.closeButton ? closeButtonHTML : '');
      }
    } // without icon
    else {
      ntflxNotify.innerHTML = '<span class="nx-message">' + message + '</span>' + (newNotifySettings.closeButton ? closeButtonHTML : '');
    } // use icon: end
    // notify content: end
    // notify append or prepend: begin


    if (newNotifySettings.position === 'left-bottom' || newNotifySettings.position === 'right-bottom') {
      // the new one will be first
      var notifyWrap = window.document.getElementById(notifySettings.wrapID);
      notifyWrap.insertBefore(ntflxNotify, notifyWrap.firstChild);
    } else {
      window.document.getElementById(notifySettings.wrapID).appendChild(ntflxNotify);
    } // notify append or prepend: end
    // remove by timeout or click: begin


    var eachNotifyElement = window.document.getElementById(ntflxNotify.id);

    if (eachNotifyElement) {
      // timeout variables
      var timeoutHide;
      var timeoutRemove; // hide notify elm and hide overlay: begin

      var hideNotifyElementsAndOverlay = function hideNotifyElementsAndOverlay() {
        eachNotifyElement.classList.add('nx-remove');
        var removeOverlay = window.document.getElementById(notifySettings.overlayID);

        if (removeOverlay && ntflxNotifyWrap.childElementCount <= 0) {
          removeOverlay.classList.add('nx-remove');
        }

        clearTimeout(timeoutHide);
      }; // hide notify elm and hide overlay: end
      // remove notify elm and wrapper: begin


      var removeNotifyElmentsAndWrapper = function removeNotifyElmentsAndWrapper() {
        if (eachNotifyElement && eachNotifyElement.parentNode !== null) {
          eachNotifyElement.parentNode.removeChild(eachNotifyElement);
        }

        if (ntflxNotifyWrap.childElementCount <= 0 && ntflxNotifyWrap.parentNode !== null) {
          // if childs count === 0 remove wrap
          ntflxNotifyWrap.parentNode.removeChild(ntflxNotifyWrap);
          var removeOverlay = window.document.getElementById(notifySettings.overlayID);

          if (removeOverlay && removeOverlay.parentNode !== null) {
            removeOverlay.parentNode.removeChild(removeOverlay);
          }
        }

        clearTimeout(timeoutRemove);
      }; // remove notify elm and wrapper: end
      // if has close button and callbackOrOptions is not a function: begin


      if (newNotifySettings.closeButton && typeof callbackOrOptions !== 'function') {
        var closeButtonElm = window.document.getElementById(ntflxNotify.id).querySelector('span.nx-close-button');
        closeButtonElm.addEventListener('click', function () {
          hideNotifyElementsAndOverlay();
          var clickToCloseTimeout = setTimeout(function () {
            removeNotifyElmentsAndWrapper();
            clearTimeout(clickToCloseTimeout);
          }, newNotifySettings.cssAnimationDuration);
        });
      } // if has close button and callbackOrOptions is not a function: end
      // if callbackOrOptions or click to close: begin


      if (typeof callbackOrOptions === 'function' || newNotifySettings.clickToClose) {
        eachNotifyElement.addEventListener('click', function () {
          if (typeof callbackOrOptions === 'function') {
            callbackOrOptions();
          }

          hideNotifyElementsAndOverlay();
          var callbackTimeout = setTimeout(function () {
            removeNotifyElmentsAndWrapper();
            clearTimeout(callbackTimeout);
          }, newNotifySettings.cssAnimationDuration);
        });
      } // if callbackOrOptions or click to close: end
      // else auto remove: begin


      if (!newNotifySettings.closeButton && typeof callbackOrOptions !== 'function') {
        // auto remove: begin
        var autoRemove = function autoRemove() {
          timeoutHide = setTimeout(function () {
            hideNotifyElementsAndOverlay();
          }, newNotifySettings.timeout);
          timeoutRemove = setTimeout(function () {
            removeNotifyElmentsAndWrapper();
          }, newNotifySettings.timeout + newNotifySettings.cssAnimationDuration);
        };

        autoRemove(); // auto remove: end
        // pause auto remove: begin

        if (newNotifySettings.pauseOnHover) {
          eachNotifyElement.addEventListener('mouseenter', function () {
            eachNotifyElement.classList.add('nx-paused');
            clearTimeout(timeoutHide);
            clearTimeout(timeoutRemove);
          });
          eachNotifyElement.addEventListener('mouseleave', function () {
            eachNotifyElement.classList.remove('nx-paused');
            autoRemove();
          });
        } // pause auto remove: end

      } // else auto remove: end

    } // remove by timeout or click: end
    // notify - show only the last one: begin


    if (newNotifySettings.showOnlyTheLastOne && notifyCreateCounter > 0) {
      var allNotifyElmNotTheLastOne = window.document.querySelectorAll('[id^=' + newNotifySettings.ID + '-]:not([id=' + newNotifySettings.ID + '-' + notifyCreateCounter + '])');

      for (var i = 0; i < allNotifyElmNotTheLastOne.length; i++) {
        var eachNotifyElmNotLastOne = allNotifyElmNotTheLastOne[i];

        if (eachNotifyElmNotLastOne.parentNode !== null) {
          eachNotifyElmNotLastOne.parentNode.removeChild(eachNotifyElmNotLastOne);
        }
      }
    } // notify - show only the last one: end
    // extend new settings with the backup settings


    newNotifySettings = commonExtendOptions(true, newNotifySettings, newNotifySettingsBackup);
  }; // NOTIFY: Create: end
  // REPORT: Get Internal CSS Codes: begin


  var reportGetInternalCSSCodes = function reportGetInternalCSSCodes() {
    var reportCSS = '';
    return reportCSS || null;
  }; // REPORT: Get Internal CSS Codes: end
  // REPORT: Create: begin


  var reportCreate = function reportCreate(reportType, title, message, buttonText, callbackOrOptions, options) {
    // check doc body
    if (!commonCheckHeadOrBody('body')) {
      return false;
    } // if not initialized pretend like init


    if (!newReportSettings) {
      Notiflix.Report.init({});
    } // create a backup for settings


    var newReportSettingsBackup = {}; // check callbackOrOptions and options: begin

    if (_typeof(callbackOrOptions) === 'object' && !Array.isArray(callbackOrOptions) || _typeof(options) === 'object' && !Array.isArray(options)) {
      // new options
      var newOptions = {};

      if (_typeof(callbackOrOptions) === 'object') {
        newOptions = callbackOrOptions;
      } else if (_typeof(options) === 'object') {
        newOptions = options;
      } // extend the backup settings with new settings


      newReportSettingsBackup = commonExtendOptions(true, newReportSettings, {}); // extend new settings with the options

      newReportSettings = commonExtendOptions(true, newReportSettings, newOptions);
    } // check callbackOrOptions and callback: end
    // report type


    var theType = newReportSettings[reportType.toLocaleLowerCase('en')]; // check the arguments: begin

    if (typeof title !== 'string') {
      title = 'Notiflix ' + reportType;
    }

    if (typeof message !== 'string') {
      if (reportType === typesReport.Success) {
        message = '"Do not try to become a person of success but try to become a person of value." <br><br>- Albert Einstein';
      } else if (reportType === typesReport.Failure) {
        message = '"Failure is simply the opportunity to begin again, this time more intelligently." <br><br>- Henry Ford';
      } else if (reportType === typesReport.Warning) {
        message = '"The peoples who want to live comfortably without producing and fatigue; they are doomed to lose their dignity, then liberty, and then independence and destiny." <br><br>- Mustafa Kemal Ataturk';
      } else if (reportType === typesReport.Info) {
        message = '"Knowledge rests not upon truth alone, but upon error also." <br><br>- Carl Gustav Jung';
      }
    }

    if (typeof buttonText !== 'string') {
      buttonText = 'Okay';
    } // check the arguments: end
    // if plainText is true => HTML tags not allowed: begin


    if (newReportSettings.plainText) {
      title = commonGetPlaintext(title);
      message = commonGetPlaintext(message);
      buttonText = commonGetPlaintext(buttonText);
    } // if plainText is true => HTML tags not allowed: end
    // if plainText is false but the contents length more than ${title | message | buttonText}MaxLength => Possible HTML tags error: begin


    if (!newReportSettings.plainText) {
      if (title.length > newReportSettings.titleMaxLength) {
        title = 'Possible HTML Tags Error';
        message = 'The "plainText" option is "false" and the title content length is more than the "titleMaxLength" option.';
        buttonText = 'Okay';
      }

      if (message.length > newReportSettings.messageMaxLength) {
        title = 'Possible HTML Tags Error';
        message = 'The "plainText" option is "false" and the message content length is more than the "messageMaxLength" option.';
        buttonText = 'Okay';
      }

      if (buttonText.length > newReportSettings.buttonMaxLength) {
        title = 'Possible HTML Tags Error';
        message = 'The "plainText" option is "false" and the button content length is more than the "buttonMaxLength" option.';
        buttonText = 'Okay';
      }
    } // if plainText is false but the contents length more than ${title | message | buttonText}MaxLength => Possible HTML tags error: end
    // max length: begin


    if (title.length > newReportSettings.titleMaxLength) {
      title = title.substring(0, newReportSettings.titleMaxLength) + '...';
    }

    if (message.length > newReportSettings.messageMaxLength) {
      message = message.substring(0, newReportSettings.messageMaxLength) + '...';
    }

    if (buttonText.length > newReportSettings.buttonMaxLength) {
      buttonText = buttonText.substring(0, newReportSettings.buttonMaxLength) + '...';
    } // max length: end
    // if cssAnimaion is false => duration: begin


    if (!newReportSettings.cssAnimation) {
      newReportSettings.cssAnimationDuration = 0;
    } // if cssAnimaion is false => duration: end
    // report wrap: begin


    var ntflxReportWrap = window.document.createElement('div');
    ntflxReportWrap.id = reportSettings.ID;
    ntflxReportWrap.className = newReportSettings.className;
    ntflxReportWrap.style.zIndex = newReportSettings.zindex;
    ntflxReportWrap.style.borderRadius = newReportSettings.borderRadius;
    ntflxReportWrap.style.fontFamily = '"' + newReportSettings.fontFamily + '", ' + defaultFontFamily; // rtl: begin

    if (newReportSettings.rtl) {
      ntflxReportWrap.setAttribute('dir', 'rtl');
      ntflxReportWrap.classList.add('nx-rtl-on');
    } // rtl: end
    // position: begin


    ntflxReportWrap.style.display = 'flex';
    ntflxReportWrap.style.flexWrap = 'wrap';
    ntflxReportWrap.style.flexDirection = 'column';
    ntflxReportWrap.style.alignItems = 'center';
    ntflxReportWrap.style.justifyContent = 'center'; // position: end
    // overlay: begin

    var reportOverlay = '';

    if (newReportSettings.backOverlay) {
      reportOverlay = '<div class="' + newReportSettings.className + '-overlay' + (newReportSettings.cssAnimation ? ' nx-with-animation' : '') + '" style="background:' + (theType.backOverlayColor || newReportSettings.backOverlayColor) + ';animation-duration:' + newReportSettings.cssAnimationDuration + 'ms;"></div>';
    } // overlay: end
    // svg icon: begin


    var svgIcon = '';

    if (reportType === typesReport.Success) {
      svgIcon = reportSvgIconSuccess(newReportSettings.svgSize, theType.svgColor);
    } else if (reportType === typesReport.Failure) {
      svgIcon = reportSvgIconFailure(newReportSettings.svgSize, theType.svgColor);
    } else if (reportType === typesReport.Warning) {
      svgIcon = reportSvgIconWarning(newReportSettings.svgSize, theType.svgColor);
    } else if (reportType === typesReport.Info) {
      svgIcon = reportSvgIconInfo(newReportSettings.svgSize, theType.svgColor);
    } // svg icon: end


    ntflxReportWrap.innerHTML = reportOverlay + '<div class="' + newReportSettings.className + '-content' + (newReportSettings.cssAnimation ? ' nx-with-animation ' : '') + ' nx-' + newReportSettings.cssAnimationStyle + '" style="width:' + newReportSettings.width + '; background:' + newReportSettings.backgroundColor + '; animation-duration:' + newReportSettings.cssAnimationDuration + 'ms;">' + '<div style="width:' + newReportSettings.svgSize + '; height:' + newReportSettings.svgSize + ';" class="' + newReportSettings.className + '-icon">' + svgIcon + '</div>' + '<h5 class="' + newReportSettings.className + '-title" style="font-weight:500; font-size:' + newReportSettings.titleFontSize + '; color:' + theType.titleColor + ';">' + title + '</h5>' + '<p class="' + newReportSettings.className + '-message" style="font-size:' + newReportSettings.messageFontSize + '; color:' + theType.messageColor + ';">' + message + '</p>' + '<a id="NXReportButton" class="' + newReportSettings.className + '-button" style="font-weight:500; font-size:' + newReportSettings.buttonFontSize + '; background:' + theType.buttonBackground + '; color:' + theType.buttonColor + ';">' + buttonText + '</a>' + '</div>'; // if there is no report element

    if (!window.document.getElementById(ntflxReportWrap.id)) {
      // append
      window.document.body.appendChild(ntflxReportWrap); // callback: begin

      var reportWrapper = window.document.getElementById(ntflxReportWrap.id);
      var reportButton = window.document.getElementById('NXReportButton');
      reportButton.addEventListener('click', function () {
        // if callback: begin
        if (typeof callbackOrOptions === 'function') {
          callbackOrOptions();
        } // if callback: end
        // remove element: begin


        reportWrapper.classList.add('nx-remove');
        var timeout = setTimeout(function () {
          if (reportWrapper.parentNode !== null) {
            reportWrapper.parentNode.removeChild(reportWrapper);
          }

          clearTimeout(timeout);
        }, newReportSettings.cssAnimationDuration); // remove element: end
      }); // callback: end
    } // report wrap: end
    // extend new settings with the backup settings


    newReportSettings = commonExtendOptions(true, newReportSettings, newReportSettingsBackup);
  }; // REPORT: Create: end
  // CONFIRM: Get Internal CSS Codes: begin


  var confirmGetInternalCSSCodes = function confirmGetInternalCSSCodes() {
    var confirmCSS = '';
    return confirmCSS || null;
  }; // CONFIRM: Get Internal CSS Codes: end
  // CONFIRM: Create: begin


  var confirmCreate = function confirmCreate(confirmType, title, messageOrQuestion, answer, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options) {
    // check doc body
    if (!commonCheckHeadOrBody('body')) {
      return false;
    } // if not initialized pretend like init


    if (!newConfirmSettings) {
      Notiflix.Confirm.init({});
    } // create a backup for new settings


    var newConfirmSettingsBackup = commonExtendOptions(true, newConfirmSettings, {}); // check the "options": begin

    if (_typeof(options) === 'object' && !Array.isArray(options)) {
      // extend new settings with the new options
      newConfirmSettings = commonExtendOptions(true, newConfirmSettings, options);
    } // check the "options": end
    // check the arguments: begin


    if (typeof title !== 'string') {
      title = 'Notiflix Confirm';
    }

    if (typeof messageOrQuestion !== 'string') {
      messageOrQuestion = 'Do you agree with me?';
    }

    if (typeof okButtonText !== 'string') {
      okButtonText = 'Yes';
    }

    if (typeof cancelButtonText !== 'string') {
      cancelButtonText = 'No';
    }

    if (typeof okButtonCallback !== 'function') {
      okButtonCallback = undefined;
    }

    if (typeof cancelButtonCallback !== 'function') {
      cancelButtonCallback = undefined;
    } // check the arguments: end
    // if plainText is true => HTML tags not allowed: begin


    if (newConfirmSettings.plainText) {
      title = commonGetPlaintext(title);
      messageOrQuestion = commonGetPlaintext(messageOrQuestion);
      okButtonText = commonGetPlaintext(okButtonText);
      cancelButtonText = commonGetPlaintext(cancelButtonText);
    } // if plainText is true => HTML tags not allowed: end
    // if plainText is false but the contents length more than ***MaxLength => Possible HTML tags error: begin


    if (!newConfirmSettings.plainText) {
      if (title.length > newConfirmSettings.titleMaxLength) {
        title = 'Possible HTML Tags Error';
        messageOrQuestion = 'The "plainText" option is "false" and the title content length is more than "titleMaxLength" option.';
        okButtonText = 'Okay';
        cancelButtonText = '...';
      }

      if (messageOrQuestion.length > newConfirmSettings.messageMaxLength) {
        title = 'Possible HTML Tags Error';
        messageOrQuestion = 'The "plainText" option is "false" and the message content length is more than "messageMaxLength" option.';
        okButtonText = 'Okay';
        cancelButtonText = '...';
      }

      if ((okButtonText.length || cancelButtonText.length) > newConfirmSettings.buttonsMaxLength) {
        title = 'Possible HTML Tags Error';
        messageOrQuestion = 'The "plainText" option is "false" and the buttons content length is more than "buttonsMaxLength" option.';
        okButtonText = 'Okay';
        cancelButtonText = '...';
      }
    } // if plainText is false but the contents length more than ***MaxLength => Possible HTML tags error: end
    // max length: begin


    if (title.length > newConfirmSettings.titleMaxLength) {
      title = title.substring(0, newConfirmSettings.titleMaxLength) + '...';
    }

    if (messageOrQuestion.length > newConfirmSettings.messageMaxLength) {
      messageOrQuestion = messageOrQuestion.substring(0, newConfirmSettings.messageMaxLength) + '...';
    }

    if (okButtonText.length > newConfirmSettings.buttonsMaxLength) {
      okButtonText = okButtonText.substring(0, newConfirmSettings.buttonsMaxLength) + '...';
    }

    if (cancelButtonText.length > newConfirmSettings.buttonsMaxLength) {
      cancelButtonText = cancelButtonText.substring(0, newConfirmSettings.buttonsMaxLength) + '...';
    } // max length: end
    // if cssAnimaion is false => duration: begin


    if (!newConfirmSettings.cssAnimation) {
      newConfirmSettings.cssAnimationDuration = 0;
    } // if cssAnimaion is false => duration: end
    // confirm wrap: begin


    var ntflxConfirmWrap = window.document.createElement('div');
    ntflxConfirmWrap.id = confirmSettings.ID;
    ntflxConfirmWrap.className = newConfirmSettings.className + (newConfirmSettings.cssAnimation ? ' nx-with-animation nx-' + newConfirmSettings.cssAnimationStyle : '');
    ntflxConfirmWrap.style.zIndex = newConfirmSettings.zindex;
    ntflxConfirmWrap.style.padding = newConfirmSettings.distance; // rtl: begin

    if (newConfirmSettings.rtl) {
      ntflxConfirmWrap.setAttribute('dir', 'rtl');
      ntflxConfirmWrap.classList.add('nx-rtl-on');
    } // rtl: end
    // position: begin


    var confirmPosition = typeof newConfirmSettings.position === 'string' ? newConfirmSettings.position.trim() : 'center';
    ntflxConfirmWrap.classList.add('nx-position-' + confirmPosition); // position: end
    // font-family

    ntflxConfirmWrap.style.fontFamily = '"' + newConfirmSettings.fontFamily + '", ' + defaultFontFamily; // if background overlay is true: begin

    var confirmOverlay = '';

    if (newConfirmSettings.backOverlay) {
      confirmOverlay = '<div class="' + newConfirmSettings.className + '-overlay' + (newConfirmSettings.cssAnimation ? ' nx-with-animation' : '') + '" style="background:' + newConfirmSettings.backOverlayColor + ';animation-duration:' + newConfirmSettings.cssAnimationDuration + 'ms;"></div>';
    } // if background overlay is true: end
    // if have a callback => add cancel button: begin


    var cancelButtonHTML = '';

    if (typeof okButtonCallback === 'function') {
      cancelButtonHTML = '<a id="NXConfirmButtonCancel" class="nx-confirm-button-cancel" style="color:' + newConfirmSettings.cancelButtonColor + ';background:' + newConfirmSettings.cancelButtonBackground + ';font-size:' + newConfirmSettings.buttonsFontSize + ';">' + cancelButtonText + '</a>';
    } // if have a callback => add cancel button: end
    // check the validation module: begin


    var setValidationInput = '';
    var theExpectedAnswer = null;
    var theClientAnswer = undefined;

    if (confirmType === typesConfirm.Ask || confirmType === typesConfirm.Prompt) {
      theExpectedAnswer = answer || '';
      var inputMaxLength = confirmType === typesConfirm.Ask ? Math.ceil(theExpectedAnswer.length * 1.5) : theExpectedAnswer.length > 200 ? Math.ceil(theExpectedAnswer.length * 1.5) : 250;
      var inputDefaultValueAttr = confirmType === typesConfirm.Prompt ? 'value="' + theExpectedAnswer + '"' : '';
      setValidationInput = '<div><input id="NXConfirmValidationInput" type="text" ' + inputDefaultValueAttr + ' maxlength="' + inputMaxLength + '" style="font-size:' + newConfirmSettings.messageFontSize + ';border-radius: ' + newConfirmSettings.borderRadius + ';" autocomplete="off" spellcheck="false" autocapitalize="none" /></div>';
    } // check the validation module: end
    // confirm wrap content: begin


    ntflxConfirmWrap.innerHTML = confirmOverlay + '<div class="' + newConfirmSettings.className + '-content" style="width:' + newConfirmSettings.width + '; background:' + newConfirmSettings.backgroundColor + '; animation-duration:' + newConfirmSettings.cssAnimationDuration + 'ms; border-radius: ' + newConfirmSettings.borderRadius + ';">' + '<div class="' + newConfirmSettings.className + '-head">' + '<h5 style="color:' + newConfirmSettings.titleColor + ';font-size:' + newConfirmSettings.titleFontSize + ';">' + title + '</h5>' + '<div style="color:' + newConfirmSettings.messageColor + ';font-size:' + newConfirmSettings.messageFontSize + ';">' + messageOrQuestion + setValidationInput + '</div>' + '</div>' + '<div class="' + newConfirmSettings.className + '-buttons">' + '<a id="NXConfirmButtonOk" class="nx-confirm-button-ok' + (typeof okButtonCallback === 'function' ? '' : ' nx-full') + '" style="color:' + newConfirmSettings.okButtonColor + ';background:' + newConfirmSettings.okButtonBackground + ';font-size:' + newConfirmSettings.buttonsFontSize + ';">' + okButtonText + '</a>' + cancelButtonHTML + '</div>' + '</div>'; // confirm wrap content: end
    // confirm wrap: end
    // if there is no confirm box: begin

    if (!window.document.getElementById(ntflxConfirmWrap.id)) {
      window.document.body.appendChild(ntflxConfirmWrap); // buttons && input listener: begin

      var confirmCloseWrap = window.document.getElementById(ntflxConfirmWrap.id);
      var okButton = window.document.getElementById('NXConfirmButtonOk'); // validation input listener: begin

      var validationInput = window.document.getElementById('NXConfirmValidationInput');

      if (validationInput) {
        validationInput.focus();
        validationInput.setSelectionRange(0, (validationInput.value || '').length);
        validationInput.addEventListener('keyup', function (event) {
          var thisValue = event.target.value;

          if (confirmType === typesConfirm.Ask && thisValue !== theExpectedAnswer) {
            event.preventDefault();
            validationInput.classList.add('nx-validation-failure');
            validationInput.classList.remove('nx-validation-success');
          } else {
            if (confirmType === typesConfirm.Ask) {
              validationInput.classList.remove('nx-validation-failure');
              validationInput.classList.add('nx-validation-success');
            }

            var isEnter = (event.key || '').toLocaleLowerCase('en') === 'enter' || event.keyCode === 13;

            if (isEnter) {
              okButton.dispatchEvent(new Event('click'));
            }
          }
        });
      } // validation input listener: end
      // ok button listener: begin


      okButton.addEventListener('click', function (event) {
        // check the answer if the type is "Ask": begin
        if (confirmType === typesConfirm.Ask && theExpectedAnswer && validationInput) {
          var inputValue = (validationInput.value || '').toString();

          if (inputValue !== theExpectedAnswer) {
            validationInput.focus();
            validationInput.classList.add('nx-validation-failure');
            event.stopPropagation();
            event.preventDefault();
            event.returnValue = false;
            event.cancelBubble = true;
            return false;
          } else {
            validationInput.classList.remove('nx-validation-failure');
          }
        } // check the answer if the type is "Ask": end
        // if ok callback && if ok callback is a function


        if (typeof okButtonCallback === 'function') {
          if (confirmType === typesConfirm.Prompt && validationInput) {
            theClientAnswer = validationInput.value || '';
          }

          okButtonCallback(theClientAnswer);
        }

        confirmCloseWrap.classList.add('nx-remove');
        var timeout = setTimeout(function () {
          if (confirmCloseWrap.parentNode !== null) {
            confirmCloseWrap.parentNode.removeChild(confirmCloseWrap);
            clearTimeout(timeout);
          }
        }, newConfirmSettings.cssAnimationDuration);
      }); // ok button listener: end
      // if ok callback && if ok callback a function => add Cancel Button listener: begin

      if (typeof okButtonCallback === 'function') {
        // cancel button listener: begin
        var cancelButton = window.document.getElementById('NXConfirmButtonCancel');
        cancelButton.addEventListener('click', function () {
          // if cancel callback && if cancel callback a function
          if (typeof cancelButtonCallback === 'function') {
            if (confirmType === typesConfirm.Prompt && validationInput) {
              theClientAnswer = validationInput.value || '';
            }

            cancelButtonCallback(theClientAnswer);
          }

          confirmCloseWrap.classList.add('nx-remove');
          var timeout = setTimeout(function () {
            if (confirmCloseWrap.parentNode !== null) {
              confirmCloseWrap.parentNode.removeChild(confirmCloseWrap);
              clearTimeout(timeout);
            }
          }, newConfirmSettings.cssAnimationDuration);
        }); // cancel button listener: end
      } // if ok callback && if ok callback a function => add Cancel Button listener: end
      // buttons && input listener: end

    } // if there is no confirm box: end
    // extend new settings with the backup settings


    newConfirmSettings = commonExtendOptions(true, newConfirmSettings, newConfirmSettingsBackup);
  }; // CONFIRM: Create: end
  // LOADING: Get Internal CSS Codes: begin


  var loadingGetInternalCSSCodes = function loadingGetInternalCSSCodes() {
    var loadingCSS = '';
    return loadingCSS || null;
  }; // LOADING: Get Internal CSS Codes: end
  // LOADING: Create: begin


  var loadingCreate = function loadingCreate(loadingType, messageOrOptions, options, display, delay) {
    // check doc body
    if (!commonCheckHeadOrBody('body')) {
      return false;
    } // if not initialized pretend like init


    if (!newLoadingSettings) {
      Notiflix.Loading.init({});
    } // create a backup for new settings


    var newLoadingSettingsBackup = commonExtendOptions(true, newLoadingSettings, {}); // check "messageOrOptions" and "options": begin

    if (_typeof(messageOrOptions) === 'object' && !Array.isArray(messageOrOptions) || _typeof(options) === 'object' && !Array.isArray(options)) {
      // new options
      var newOptions = {};

      if (_typeof(messageOrOptions) === 'object') {
        newOptions = messageOrOptions;
      } else if (_typeof(options) === 'object') {
        newOptions = options;
      } // extend new settings with the new options


      newLoadingSettings = commonExtendOptions(true, newLoadingSettings, newOptions);
    } // check "messageOrOptions" and "options": end
    // check the message


    var message = '';

    if (typeof messageOrOptions === 'string' && messageOrOptions.length > 0) {
      message = messageOrOptions;
    } // show loading


    if (display) {
      // if message settings: begin
      if (message.length > newLoadingSettings.messageMaxLength) {
        message = commonGetPlaintext(message).toString().substring(0, newLoadingSettings.messageMaxLength) + '...';
      } else {
        message = commonGetPlaintext(message).toString();
      }

      var messageHTML = '';

      if (message.length > 0) {
        messageHTML = '<p id="' + newLoadingSettings.messageID + '" class="nx-loading-message" style="color:' + newLoadingSettings.messageColor + ';font-size:' + newLoadingSettings.messageFontSize + ';">' + message + '</p>';
      } // if message settings: end
      // if cssAnimaion is false => duration: begin


      if (!newLoadingSettings.cssAnimation) {
        newLoadingSettings.cssAnimationDuration = 0;
      } // if cssAnimaion is false => duration: end
      // svgIcon: begin


      var svgIcon = '';

      if (loadingType === typesLoading.Standard) {
        svgIcon = loadingAndBlockSvgIconStandard(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Hourglass) {
        svgIcon = loadingAndBlockSvgIconHourglass(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Circle) {
        svgIcon = loadingAndBlockSvgIconCircle(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Arrows) {
        svgIcon = loadingAndBlockSvgIconArrows(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Dots) {
        svgIcon = loadingAndBlockSvgIconDots(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Pulse) {
        svgIcon = loadingAndBlockSvgIconPulse(newLoadingSettings.svgSize, newLoadingSettings.svgColor);
      } else if (loadingType === typesLoading.Custom && newLoadingSettings.customSvgCode !== null && newLoadingSettings.customSvgUrl === null) {
        svgIcon = newLoadingSettings.customSvgCode || '';
      } else if (loadingType === typesLoading.Custom && newLoadingSettings.customSvgUrl !== null && newLoadingSettings.customSvgCode === null) {
        svgIcon = '<img class="nx-custom-loading-icon" width="' + newLoadingSettings.svgSize + '" height="' + newLoadingSettings.svgSize + '" src="' + newLoadingSettings.customSvgUrl + '" alt="Notiflix">';
      } else if (loadingType === typesLoading.Custom && (newLoadingSettings.customSvgUrl === null || newLoadingSettings.customSvgCode === null)) {
        commonConsoleError('You have to set a static SVG url to "customSvgUrl" option to use Loading Custom.');
        return false;
      } else {
        svgIcon = loadingAndBlockSvgIconNotiflix(newLoadingSettings.svgSize, '#f8f8f8', '#32c682');
      }

      var svgSizeAsDigit = parseInt((newLoadingSettings.svgSize || '').replace(/[^0-9]/g, ''));
      var winWidth = window.innerWidth;
      var maxSvgWidthPx = svgSizeAsDigit >= winWidth ? winWidth - 40 + 'px' : svgSizeAsDigit + 'px';
      var svgIconHTML = '<div style="width:' + maxSvgWidthPx + '; height:' + maxSvgWidthPx + ';" class="' + newLoadingSettings.className + '-icon' + (message.length > 0 ? ' nx-with-message' : '') + '">' + svgIcon + '</div>'; // svgIcon: end
      // loading wrap: begin

      var ntflxLoadingWrap = window.document.createElement('div');
      ntflxLoadingWrap.id = loadingSettings.ID;
      ntflxLoadingWrap.className = newLoadingSettings.className + (newLoadingSettings.cssAnimation ? ' nx-with-animation' : '') + (newLoadingSettings.clickToClose ? ' nx-click-to-close' : '');
      ntflxLoadingWrap.style.zIndex = newLoadingSettings.zindex;
      ntflxLoadingWrap.style.background = newLoadingSettings.backgroundColor;
      ntflxLoadingWrap.style.animationDuration = newLoadingSettings.cssAnimationDuration + 'ms';
      ntflxLoadingWrap.style.fontFamily = '"' + newLoadingSettings.fontFamily + '", ' + defaultFontFamily;
      ntflxLoadingWrap.style.display = 'flex';
      ntflxLoadingWrap.style.flexWrap = 'wrap';
      ntflxLoadingWrap.style.flexDirection = 'column';
      ntflxLoadingWrap.style.alignItems = 'center';
      ntflxLoadingWrap.style.justifyContent = 'center'; // rtl: begin

      if (newLoadingSettings.rtl) {
        ntflxLoadingWrap.setAttribute('dir', 'rtl');
        ntflxLoadingWrap.classList.add('nx-rtl-on');
      } // rtl: end
      // append: begin


      ntflxLoadingWrap.innerHTML = svgIconHTML + messageHTML; // if there is no loading element

      if (!window.document.getElementById(ntflxLoadingWrap.id)) {
        // append
        window.document.body.appendChild(ntflxLoadingWrap); // if click to close

        if (newLoadingSettings.clickToClose) {
          var loadingWrapElm = window.document.getElementById(ntflxLoadingWrap.id);
          loadingWrapElm.addEventListener('click', function () {
            ntflxLoadingWrap.classList.add('nx-remove');
            var timeout = setTimeout(function () {
              if (ntflxLoadingWrap.parentNode !== null) {
                ntflxLoadingWrap.parentNode.removeChild(ntflxLoadingWrap);
                clearTimeout(timeout);
              }
            }, newLoadingSettings.cssAnimationDuration);
          });
        }
      } // append: end

    } // remove loading
    else {
      // if there is a loading element
      if (window.document.getElementById(loadingSettings.ID)) {
        var loadingElm = window.document.getElementById(loadingSettings.ID);
        var timeout = setTimeout(function () {
          loadingElm.classList.add('nx-remove');
          var timeout2 = setTimeout(function () {
            if (loadingElm.parentNode !== null) {
              loadingElm.parentNode.removeChild(loadingElm);
              clearTimeout(timeout2);
            }
          }, newLoadingSettings.cssAnimationDuration);
          clearTimeout(timeout);
        }, delay);
      }
    } // extend new settings with the backup settings


    newLoadingSettings = commonExtendOptions(true, newLoadingSettings, newLoadingSettingsBackup);
  }; // LOADING: Create: end
  // LOADING: Change Message: begin


  var loadingChangeMessage = function loadingChangeMessage(newMessage) {
    // check the new message
    if (typeof newMessage !== 'string') {
      newMessage = '';
    } // if has any loading


    var messageWrap = window.document.getElementById(loadingSettings.ID);

    if (messageWrap) {
      // if there is a new message
      if (newMessage.length > 0) {
        // max length: begin
        if (newMessage.length > newLoadingSettings.messageMaxLength) {
          newMessage = commonGetPlaintext(newMessage).substring(0, newLoadingSettings.messageMaxLength) + '...';
        } else {
          newMessage = commonGetPlaintext(newMessage);
        } // max length: end
        // there is a message element


        var oldMessageElm = messageWrap.getElementsByTagName('p')[0];

        if (oldMessageElm) {
          oldMessageElm.innerHTML = newMessage; // change the message
        } // there is no message element
        else {
          // create a new message element: begin
          var newMessageHTML = window.document.createElement('p');
          newMessageHTML.id = newLoadingSettings.messageID;
          newMessageHTML.className = 'nx-loading-message nx-loading-message-new';
          newMessageHTML.style.color = newLoadingSettings.messageColor;
          newMessageHTML.style.fontSize = newLoadingSettings.messageFontSize;
          newMessageHTML.innerHTML = newMessage;
          messageWrap.appendChild(newMessageHTML); // create a new message element: end
        }
      } // if no message
      else {
        commonConsoleError('Where is the new message?');
      }
    }
  }; // LOADING: Change Message: end
  // BLOCK: Get Internal CSS Codes: begin


  var blockGetInternalCSSCodes = function blockGetInternalCSSCodes() {
    var blockCSS = '';
    return blockCSS || null;
  }; // BLOCK: Get Internal CSS Codes: end
  // BLOCK: Create or Remove: begin


  var blockCreateOrRemoveCounter = 0;

  var blockCreateOrRemove = function blockCreateOrRemove(isCreate, blockType, selectorOrHTMLElements, messageOrOptions, options, delay) {
    var allHTMLElements; // if, check and set Array of HTMLElements

    if (Array.isArray(selectorOrHTMLElements)) {
      if (selectorOrHTMLElements.length < 1) {
        commonConsoleError('Array of HTMLElements should contains at least one HTMLElement.');
        return false;
      }

      allHTMLElements = selectorOrHTMLElements;
    } // else if, check and set NodeListOf<HTMLElement>
    else if (Object.prototype.isPrototypeOf.call(NodeList.prototype, selectorOrHTMLElements)) {
      if (selectorOrHTMLElements.length < 1) {
        commonConsoleError('NodeListOf<HTMLElement> should contains at least one HTMLElement.');
        return false;
      }

      allHTMLElements = Array.prototype.slice.call(selectorOrHTMLElements);
    } // else, check and set the selector
    else {
      // check selector is valid: begin
      var selectorIsNotValid = typeof selectorOrHTMLElements !== 'string' || (selectorOrHTMLElements || '').length < 1 || (selectorOrHTMLElements || '').length === 1 && ((selectorOrHTMLElements || '')[0] === '#' || (selectorOrHTMLElements || '')[0] === '.');

      if (selectorIsNotValid) {
        commonConsoleError('The selector parameter must be a string and matches a specified CSS selector(s).');
        return false;
      } // check selector is valid: end
      // check the selector: begin


      var nodeListOfHTMLElements = window.document.querySelectorAll(selectorOrHTMLElements);

      if (nodeListOfHTMLElements.length < 1) {
        commonConsoleError('You called the "Notiflix.Block..." function with "' + selectorOrHTMLElements + '" selector, but there is no such element(s) in the document.');
        return false;
      } // check the selector: end


      allHTMLElements = nodeListOfHTMLElements;
    } // if not initialized pretend like init: begin


    if (!newBlockSettings) {
      Notiflix.Block.init({});
    } // if not initialized pretend like init: end
    // create a backup for new settings


    var newBlockSettingsBackup = commonExtendOptions(true, newBlockSettings, {}); // check "messageOrOptions" and "options": begin

    if (_typeof(messageOrOptions) === 'object' && !Array.isArray(messageOrOptions) || _typeof(options) === 'object' && !Array.isArray(options)) {
      // new options
      var newOptions = {};

      if (_typeof(messageOrOptions) === 'object') {
        newOptions = messageOrOptions;
      } else if (_typeof(options) === 'object') {
        newOptions = options;
      } // extend new settings with the new options


      newBlockSettings = commonExtendOptions(true, newBlockSettings, newOptions);
    } // check "messageOrOptions" and "options": end
    // check the message: begin


    var message = '';

    if (typeof messageOrOptions === 'string' && messageOrOptions.length > 0) {
      message = messageOrOptions;
    } // check the message: end
    // if cssAnimaion is false => duration: begin


    if (!newBlockSettings.cssAnimation) {
      newBlockSettings.cssAnimationDuration = 0;
    } // if cssAnimaion is false => duration: end
    // check the class name: begin


    var blockClassName = 'notiflix-block';

    if (typeof newBlockSettings.className === 'string') {
      blockClassName = newBlockSettings.className.trim();
    } // check the class name: end
    // check query limit: begin


    var getQueryLimit = typeof newBlockSettings.querySelectorLimit === 'number' ? newBlockSettings.querySelectorLimit : 200;
    var checkQueryLimit = (allHTMLElements || []).length >= getQueryLimit ? getQueryLimit : allHTMLElements.length; // check query limit: end
    // block

    if (isCreate) {
      // void and unavailable elements
      var voidAndUnavailableElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'html', 'head', 'title', 'script', 'style', 'iframe']; // add element(s) and style: begin

      for (var queryIndex = 0; queryIndex < checkQueryLimit; queryIndex++) {
        var eachElement = allHTMLElements[queryIndex];

        if (eachElement) {
          if (voidAndUnavailableElements.indexOf(eachElement.tagName.toLocaleLowerCase('en')) > -1) {
            break;
          } // check block element exist: begin


          var eachBlockElement = eachElement.querySelectorAll('[id^=' + blockSettings.ID + ']');

          if (eachBlockElement.length < 1) {
            // check the icon: begin
            var icon = '';

            if (blockType) {
              if (blockType === typesBlock.Hourglass) {
                icon = loadingAndBlockSvgIconHourglass(newBlockSettings.svgSize, newBlockSettings.svgColor);
              } else if (blockType === typesBlock.Circle) {
                icon = loadingAndBlockSvgIconCircle(newBlockSettings.svgSize, newBlockSettings.svgColor);
              } else if (blockType === typesBlock.Arrows) {
                icon = loadingAndBlockSvgIconArrows(newBlockSettings.svgSize, newBlockSettings.svgColor);
              } else if (blockType === typesBlock.Dots) {
                icon = loadingAndBlockSvgIconDots(newBlockSettings.svgSize, newBlockSettings.svgColor);
              } else if (blockType === typesBlock.Pulse) {
                icon = loadingAndBlockSvgIconPulse(newBlockSettings.svgSize, newBlockSettings.svgColor);
              } else {
                // typesBlock.Standard, also fallback
                icon = loadingAndBlockSvgIconStandard(newBlockSettings.svgSize, newBlockSettings.svgColor);
              }
            }

            var iconElement = '<span class="' + blockClassName + '-icon" style="width:' + newBlockSettings.svgSize + ';height:' + newBlockSettings.svgSize + ';">' + icon + '</span>'; // check the icon: end
            // check the message: begin

            var messageElement = '';

            if (message.length > 0) {
              if (message.length > newBlockSettings.messageMaxLength) {
                message = commonGetPlaintext(message).substring(0, newBlockSettings.messageMaxLength) + '...';
              } else {
                message = commonGetPlaintext(message);
              }

              messageElement = '<span style="font-size:' + newBlockSettings.messageFontSize + ';color:' + newBlockSettings.messageColor + ';" class="' + blockClassName + '-message">' + message + '</span>';
            } // check the message: end
            // block element: begin


            blockCreateOrRemoveCounter++;
            var notiflixBlockWrap = window.document.createElement('div');
            notiflixBlockWrap.id = blockSettings.ID + '-' + blockCreateOrRemoveCounter;
            notiflixBlockWrap.className = blockClassName + '-wrap' + (newBlockSettings.cssAnimation ? ' nx-with-animation' : '');
            notiflixBlockWrap.style.position = newBlockSettings.position;
            notiflixBlockWrap.style.zIndex = newBlockSettings.zindex;
            notiflixBlockWrap.style.background = newBlockSettings.backgroundColor;
            notiflixBlockWrap.style.animationDuration = newBlockSettings.cssAnimationDuration + 'ms';
            notiflixBlockWrap.style.fontFamily = '"' + newBlockSettings.fontFamily + '", ' + defaultFontFamily;
            notiflixBlockWrap.style.display = 'flex';
            notiflixBlockWrap.style.flexWrap = 'wrap';
            notiflixBlockWrap.style.flexDirection = 'column';
            notiflixBlockWrap.style.alignItems = 'center';
            notiflixBlockWrap.style.justifyContent = 'center'; // block element: end
            // block element rtl: begin

            if (newBlockSettings.rtl) {
              notiflixBlockWrap.setAttribute('dir', 'rtl');
              notiflixBlockWrap.classList.add('nx-rtl-on');
            } // block element rtl: end
            // block element data: begin


            notiflixBlockWrap.innerHTML = iconElement + messageElement; // block element data: end
            // append block element: begin

            var getEachElementPosition = window.getComputedStyle(eachElement).getPropertyValue('position');
            var eachElementPosition = typeof getEachElementPosition === 'string' ? getEachElementPosition.toLocaleLowerCase('en') : 'relative';
            var averageMinHeight = Math.round(parseInt(newBlockSettings.svgSize) * 1.25) + 40;
            var eachElementHeight = eachElement.offsetHeight || 0;
            var minHeightStyle = '';

            if (averageMinHeight > eachElementHeight) {
              minHeightStyle = 'min-height:' + averageMinHeight + 'px;';
            } // internal style: begin


            var eachElementIdOrClass = '';

            if (eachElement.getAttribute('id')) {
              eachElementIdOrClass = '#' + eachElement.getAttribute('id');
            } else if (eachElement.classList[0]) {
              eachElementIdOrClass = '.' + eachElement.classList[0];
            } else {
              eachElementIdOrClass = (eachElement.tagName || '').toLocaleLowerCase('en');
            }

            var positionStyle = '';
            var positions = ['absolute', 'relative', 'fixed', 'sticky'];
            var addPosition = positions.indexOf(eachElementPosition) <= -1;

            if (addPosition || minHeightStyle.length > 0) {
              // check doc head
              if (!commonCheckHeadOrBody('head')) {
                return false;
              } // check position style


              if (addPosition) {
                positionStyle = 'position:relative!important;';
              } // create and add internal style to the head


              var style = '<style id="Style-' + blockSettings.ID + '-' + blockCreateOrRemoveCounter + '">' + eachElementIdOrClass + '.' + blockClassName + '-position{' + positionStyle + minHeightStyle + '}' + '</style>';
              var styleRange = window.document.createRange();
              styleRange.selectNode(window.document.head);
              var styleFragment = styleRange.createContextualFragment(style);
              window.document.head.appendChild(styleFragment); // add the "blockClassName" to each element

              eachElement.classList.add(blockClassName + '-position');
            } // internal style: end
            // append


            eachElement.appendChild(notiflixBlockWrap); // append block element: end
          } // check block element exist: end

        }
      } // add element(s) and style: end

    } // unblock/remove
    else {
      // Step 3 => Remove each block element: begin
      var removeBlockElements = function removeBlockElements(eachOne) {
        var timeout = setTimeout(function () {
          // remove element
          if (eachOne.parentNode !== null) {
            eachOne.parentNode.removeChild(eachOne);
          } // remove element's internal style


          var eachOneId = eachOne.getAttribute('id');
          var eachOneStyle = window.document.getElementById('Style-' + eachOneId);

          if (eachOneStyle && eachOneStyle.parentNode !== null) {
            eachOneStyle.parentNode.removeChild(eachOneStyle);
          } // clear timeout


          clearTimeout(timeout);
        }, newBlockSettings.cssAnimationDuration);
      }; // Step 3 => Remove each block element: end
      // Step 2A => Remove each block element: begin


      var removeClassBlockElements = function removeClassBlockElements(eachBlockElement) {
        // if elements exist
        if (eachBlockElement && eachBlockElement.length > 0) {
          for (var i = 0; i < eachBlockElement.length; i++) {
            var eachOne = eachBlockElement[i];

            if (eachOne) {
              // add remove class
              eachOne.classList.add('nx-remove'); // remove block elements

              removeBlockElements(eachOne);
            }
          }
        } // not exist
        else {
          if (typeof selectorOrHTMLElements === 'string') {
            commonConsoleLog('"Notiflix.Block.remove();" function called with "' + selectorOrHTMLElements + '" selector, but this selector does not have a "Block" element to remove.');
          } else {
            commonConsoleLog('"Notiflix.Block.remove();" function called with "' + selectorOrHTMLElements + '", but this "Array<HTMLElement>" or "NodeListOf<HTMLElement>" does not have a "Block" element to remove.');
          }
        }
      }; // Step 2A => Remove each block element: end
      // Step 2B => Remove each element's class name: begin


      var removeEachElementClassName = function removeEachElementClassName(eachElement) {
        var timeout = setTimeout(function () {
          // remove class name
          var positionClass = blockClassName + '-position';
          eachElement.classList.remove(positionClass); // clear timeout

          clearTimeout(timeout);
        }, newBlockSettings.cssAnimationDuration + 300);
      }; // Step 2B => Remove each element's class name: end
      // Step 1 => Remove each element: begin


      var removeElementTimeout = setTimeout(function () {
        for (var i = 0; i < checkQueryLimit; i++) {
          var eachElement = allHTMLElements[i];

          if (eachElement) {
            // remove each element's class name
            removeEachElementClassName(eachElement); // remove each block element

            eachBlockElement = eachElement.querySelectorAll('[id^=' + blockSettings.ID + ']');
            removeClassBlockElements(eachBlockElement);
          }
        } // clear timeout


        clearTimeout(removeElementTimeout);
      }, delay); // Step 1 => Remove each element: end
    } // extend new settings with the backup settings


    newBlockSettings = commonExtendOptions(true, newBlockSettings, newBlockSettingsBackup);
  }; // BLOCK: Create or Remove: end
  // NOTIFLIX: Main: begin


  var Notiflix = {
    // NOTIFLIX.NOTIFY: begin
    Notify: {
      // Init
      init: function init(userNotifyOptions) {
        // extend options
        newNotifySettings = commonExtendOptions(true, notifySettings, userNotifyOptions); // internal css if exist

        commonSetInternalCSSCodes(notifyGetInternalCSSCodes, 'NotiflixNotifyInternalCSS');
      },
      // Merge First Init
      merge: function merge(userNotifyExtendOptions) {
        // if initialized already
        if (newNotifySettings) {
          newNotifySettings = commonExtendOptions(true, newNotifySettings, userNotifyExtendOptions);
        } // initialize first
        else {
          commonConsoleError('You have to initialize the Notify module before call Merge function.');
          return false;
        }
      },
      // Success
      success: function success(message, callbackOrOptions, options) {
        notifyCreate(typesNotify.Success, message, callbackOrOptions, options);
      },
      // Failure
      failure: function failure(message, callbackOrOptions, options) {
        notifyCreate(typesNotify.Failure, message, callbackOrOptions, options);
      },
      // Warning
      warning: function warning(message, callbackOrOptions, options) {
        notifyCreate(typesNotify.Warning, message, callbackOrOptions, options);
      },
      // Info
      info: function info(message, callbackOrOptions, options) {
        notifyCreate(typesNotify.Info, message, callbackOrOptions, options);
      }
    },
    // NOTIFLIX.NOTIFY: end
    // NOTIFLIX.REPORT: begin
    Report: {
      // Init
      init: function init(userReportOptions) {
        // extend options
        newReportSettings = commonExtendOptions(true, reportSettings, userReportOptions); // internal css if exist

        commonSetInternalCSSCodes(reportGetInternalCSSCodes, 'NotiflixReportInternalCSS');
      },
      // Merge First Init
      merge: function merge(userReportExtendOptions) {
        // if initialized already
        if (newReportSettings) {
          newReportSettings = commonExtendOptions(true, newReportSettings, userReportExtendOptions);
        } // initialize first
        else {
          commonConsoleError('You have to initialize the Report module before call Merge function.');
          return false;
        }
      },
      // Success
      success: function success(title, message, buttonText, callbackOrOptions, options) {
        reportCreate(typesReport.Success, title, message, buttonText, callbackOrOptions, options);
      },
      // Failure
      failure: function failure(title, message, buttonText, callbackOrOptions, options) {
        reportCreate(typesReport.Failure, title, message, buttonText, callbackOrOptions, options);
      },
      // Warning
      warning: function warning(title, message, buttonText, callbackOrOptions, options) {
        reportCreate(typesReport.Warning, title, message, buttonText, callbackOrOptions, options);
      },
      // Info
      info: function info(title, message, buttonText, callbackOrOptions, options) {
        reportCreate(typesReport.Info, title, message, buttonText, callbackOrOptions, options);
      }
    },
    // NOTIFLIX.REPORT: end
    // NOTIFLIX.CONFIRM: begin
    Confirm: {
      // Init
      init: function init(userConfirmOptions) {
        // extend options
        newConfirmSettings = commonExtendOptions(true, confirmSettings, userConfirmOptions); // internal css if exist

        commonSetInternalCSSCodes(confirmGetInternalCSSCodes, 'NotiflixConfirmInternalCSS');
      },
      // Merge First Init
      merge: function merge(userConfirmExtendOptions) {
        // if initialized already
        if (newConfirmSettings) {
          newConfirmSettings = commonExtendOptions(true, newConfirmSettings, userConfirmExtendOptions);
        } // initialize first
        else {
          commonConsoleError('You have to initialize the Confirm module before call Merge function.');
          return false;
        }
      },
      // Show
      show: function show(title, message, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options) {
        confirmCreate(typesConfirm.Show, title, message, null, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options);
      },
      // Ask
      ask: function ask(title, question, answer, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options) {
        confirmCreate(typesConfirm.Ask, title, question, answer, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options);
      },
      // Prompt
      prompt: function prompt(title, question, defaultAnswer, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options) {
        confirmCreate(typesConfirm.Prompt, title, question, defaultAnswer, okButtonText, cancelButtonText, okButtonCallback, cancelButtonCallback, options);
      }
    },
    // NOTIFLIX.CONFIRM: end
    // NOTIFLIX.LOADING: begin
    Loading: {
      // Init
      init: function init(userLoadingOptions) {
        // extend options
        newLoadingSettings = commonExtendOptions(true, loadingSettings, userLoadingOptions); // internal css if exist

        commonSetInternalCSSCodes(loadingGetInternalCSSCodes, 'NotiflixLoadingInternalCSS');
      },
      // Merge First Init
      merge: function merge(userLoadingExtendOptions) {
        // if initialized already
        if (newLoadingSettings) {
          newLoadingSettings = commonExtendOptions(true, newLoadingSettings, userLoadingExtendOptions);
        } // initialize first
        else {
          commonConsoleError('You have to initialize the Loading module before call Merge function.');
          return false;
        }
      },
      // Standard
      standard: function standard(messageOrOptions, options) {
        loadingCreate(typesLoading.Standard, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Hourglass
      hourglass: function hourglass(messageOrOptions, options) {
        loadingCreate(typesLoading.Hourglass, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Circle
      circle: function circle(messageOrOptions, options) {
        loadingCreate(typesLoading.Circle, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Arrows
      arrows: function arrows(messageOrOptions, options) {
        loadingCreate(typesLoading.Arrows, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Dots
      dots: function dots(messageOrOptions, options) {
        loadingCreate(typesLoading.Dots, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Pulse
      pulse: function pulse(messageOrOptions, options) {
        loadingCreate(typesLoading.Pulse, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Custom
      custom: function custom(messageOrOptions, options) {
        loadingCreate(typesLoading.Custom, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Notiflix
      notiflix: function notiflix(messageOrOptions, options) {
        loadingCreate(typesLoading.Notiflix, messageOrOptions, options, true, 0); // true => show && 0 => delay
      },
      // Remove
      remove: function remove(delay) {
        if (typeof delay !== 'number') {
          delay = 0;
        }

        loadingCreate(null, null, null, false, delay); // false => hide/remove
      },
      // Change The Message
      change: function change(newMessage) {
        loadingChangeMessage(newMessage);
      }
    },
    // NOTIFLIX.LOADING: end
    // NOTIFLIX.BLOCK: begin
    Block: {
      // Initialize
      init: function init(userBlockOptions) {
        // extend options
        newBlockSettings = commonExtendOptions(true, blockSettings, userBlockOptions); // internal css if exist

        commonSetInternalCSSCodes(blockGetInternalCSSCodes, 'NotiflixBlockInternalCSS');
      },
      // Merge First Initialize
      merge: function merge(userBlockExtendOptions) {
        // if initialized already
        if (newBlockSettings) {
          newBlockSettings = commonExtendOptions(true, newBlockSettings, userBlockExtendOptions);
        } // initialize first
        else {
          commonConsoleError('You have to initialize the "Notiflix.Block" module before call Merge function.');
          return false;
        }
      },
      // Standard
      standard: function standard(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Standard, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Hourglass
      hourglass: function hourglass(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Hourglass, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Circle
      circle: function circle(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Circle, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Arrows
      arrows: function arrows(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Arrows, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Dots
      dots: function dots(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Dots, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Pulse
      pulse: function pulse(selectorOrHTMLElements, messageOrOptions, options) {
        blockCreateOrRemove(true, typesBlock.Pulse, selectorOrHTMLElements, messageOrOptions, options); // true => show
      },
      // Remove
      remove: function remove(selectorOrHTMLElements, delay) {
        if (typeof delay !== 'number') {
          delay = 0;
        }

        blockCreateOrRemove(false, null, selectorOrHTMLElements, null, null, delay); // false => hide/remove
      }
    } // NOTIFLIX.BLOCK: end

  }; // NOTIFLIX: Main: end
  // NOTIFLIX: Return: begin

  return {
    Notify: Notiflix.Notify,
    Report: Notiflix.Report,
    Confirm: Notiflix.Confirm,
    Loading: Notiflix.Loading,
    Block: Notiflix.Block
  }; // NOTIFLIX: Return: end
});
},{}],"H99C":[function(require,module,exports) {
"use strict";

var _owntmpl = _interopRequireDefault(require("../template/owntmpl.hbs"));

var _notiflix = _interopRequireDefault(require("./notiflix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounce = require("lodash.debounce");

// import fetchCountries from "./fetchCountries";
//console.log("Notiflix=", Notiflix);
var inp = document.querySelector(".country");
var setCountry = document.querySelector(".country");
var list = document.querySelector(".list");
setCountry.addEventListener("input", debounce(function (e) {
  fetch("https://restcountries.com/v2/name/".concat(e.target.value.trim())).then(function (response) {
    return response.json();
  }).then(function (resp) {
    if (resp.status) {
      _notiflix.default.Notify.failure("Oops, there is no country with that name");
    }

    if (resp.length > 10) {
      _notiflix.default.Notify.info("Too many matches found. Please enter a more specific name.");

      list.innerHTML = "";
      return;
    } else if (resp.length >= 2 && resp.length <= 10) {
      var items = resp.reduce(function (acc, elem) {
        return acc += "<li class=\"item\"><img class=\"flag\"  src=\"".concat(elem.flags.svg, "\" > <p class=\"country-name\">").concat(elem.name, "</p></li>");
      }, "");
      list.innerHTML = items;
    } else if (resp.length === 1) {
      var inputCountry = document.querySelector(".country");
      list.innerHTML = (0, _owntmpl.default)(resp);
      var langs = document.querySelector(".langs"); //Избавляемся от последней запятой

      var str = langs.lastChild.previousSibling.innerText;
      var lastChar = str.indexOf(",");
      langs.lastChild.previousSibling.innerText = str.substring(0, lastChar);
    }
  }).catch(function (error) {
    _notiflix.default.Notify.failure("Ooooops!!!!!");
  });
}, 500));
},{"lodash.debounce":"TZhv","../template/owntmpl.hbs":"bkJD","./notiflix":"vsWf"}]},{},["H99C"], null)
//# sourceMappingURL=/goit-js-hw-10/src.ef9bd2eb.js.map