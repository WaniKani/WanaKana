(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wanakana = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = /*#__PURE__*/Object.freeze({
		default: _global,
		__moduleExports: _global
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _core$1 = /*#__PURE__*/Object.freeze({
		default: _core,
		__moduleExports: _core,
		version: _core_1
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$1 = /*#__PURE__*/Object.freeze({
		default: _isObject,
		__moduleExports: _isObject
	});

	var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

	var _anObject = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$1 = /*#__PURE__*/Object.freeze({
		default: _anObject,
		__moduleExports: _anObject
	});

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$1 = /*#__PURE__*/Object.freeze({
		default: _fails,
		__moduleExports: _fails
	});

	var require$$1 = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !require$$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var global$1 = ( _global$1 && _global ) || _global$1;

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document$1) && isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var require$$0 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !require$$0 && !require$$1(function () {
	  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine,
		__moduleExports: _ie8DomDefine
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive,
		__moduleExports: _toPrimitive
	});

	var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

	var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

	var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

	var dP = Object.defineProperty;

	var f = require$$0 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _objectDp$1 = /*#__PURE__*/Object.freeze({
		default: _objectDp,
		__moduleExports: _objectDp,
		f: f
	});

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc,
		__moduleExports: _propertyDesc
	});

	var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var descriptor = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = require$$0 ? function (object, key, value) {
	  return dP$1.f(object, key, descriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var require$$0$1 = ( _hide$1 && _hide ) || _hide$1;

	var has = ( _has$1 && _has ) || _has$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var require$$1$1 = ( _core$1 && _core ) || _core$1;

	var _redefine = createCommonjsModule(function (module) {
	var SRC = uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	require$$1$1.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || require$$0$1(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || require$$0$1(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global$1) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    require$$0$1(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    require$$0$1(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _redefine$1 = /*#__PURE__*/Object.freeze({
		default: _redefine,
		__moduleExports: _redefine
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$1 = /*#__PURE__*/Object.freeze({
		default: _aFunction,
		__moduleExports: _aFunction
	});

	var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _ctx$1 = /*#__PURE__*/Object.freeze({
		default: _ctx,
		__moduleExports: _ctx
	});

	var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

	var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? require$$1$1 : require$$1$1[name] || (require$$1$1[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) require$$0$1(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global$1.core = require$$1$1;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _export$1 = /*#__PURE__*/Object.freeze({
		default: _export,
		__moduleExports: _export
	});

	var TYPED = uid('typed_array');
	var VIEW = uid('view');
	var ABV = !!(global$1.ArrayBuffer && global$1.DataView);
	var CONSTR = ABV;
	var i = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i < l) {
	  if (Typed = global$1[TypedArrayConstructors[i++]]) {
	    require$$0$1(Typed.prototype, TYPED, true);
	    require$$0$1(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	var _typed = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};
	var _typed_1 = _typed.ABV;
	var _typed_2 = _typed.CONSTR;
	var _typed_3 = _typed.TYPED;
	var _typed_4 = _typed.VIEW;

	var _typed$1 = /*#__PURE__*/Object.freeze({
		default: _typed,
		__moduleExports: _typed,
		ABV: _typed_1,
		CONSTR: _typed_2,
		TYPED: _typed_3,
		VIEW: _typed_4
	});

	var _library = false;

	var _library$1 = /*#__PURE__*/Object.freeze({
		default: _library,
		__moduleExports: _library
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) redefine(target, key, src[key], safe);
	  return target;
	};

	var _redefineAll$1 = /*#__PURE__*/Object.freeze({
		default: _redefineAll,
		__moduleExports: _redefineAll
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _anInstance$1 = /*#__PURE__*/Object.freeze({
		default: _anInstance,
		__moduleExports: _anInstance
	});

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	// https://tc39.github.io/ecma262/#sec-toindex


	var _toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};

	var _toIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toIndex,
		__moduleExports: _toIndex
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var cof = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var SHARED = '__core-js_shared__';
	var store = global$1[SHARED] || (global$1[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var require$$0$2 = ( _shared$1 && _shared ) || _shared$1;

	var shared = require$$0$2('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var require$$0$3 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var require$$1$2 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	var arrayIndexOf = require$$0$3(false);
	var IE_PROTO = require$$1$2('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var require$$0$4 = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = require$$0$4.concat('length', 'prototype');

	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$1
	};

	var _objectGopn$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopn,
		__moduleExports: _objectGopn,
		f: f$1
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var aLen = arguments.length;
	  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var _arrayFill$1 = /*#__PURE__*/Object.freeze({
		default: _arrayFill,
		__moduleExports: _arrayFill
	});

	var _wks = createCommonjsModule(function (module) {
	var store = require$$0$2('wks');

	var Symbol = global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = /*#__PURE__*/Object.freeze({
		default: _wks,
		__moduleExports: _wks
	});

	var require$$0$5 = ( _wks$1 && _wks ) || _wks$1;

	var def = dP$1.f;

	var TAG = require$$0$5('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
		default: _setToStringTag,
		__moduleExports: _setToStringTag
	});

	var LIBRARY = ( _library$1 && _library ) || _library$1;

	var require$$5 = ( _typed$1 && _typed ) || _typed$1;

	var redefineAll = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

	var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

	var require$$14 = ( _toIndex$1 && _toIndex ) || _toIndex$1;

	var require$$0$6 = ( _objectGopn$1 && _objectGopn ) || _objectGopn$1;

	var require$$35 = ( _arrayFill$1 && _arrayFill ) || _arrayFill$1;

	var setToStringTag = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

	var _typedBuffer = createCommonjsModule(function (module, exports) {











	var gOPN = require$$0$6.f;
	var dP = dP$1.f;


	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = global$1[ARRAY_BUFFER];
	var $DataView = global$1[DATA_VIEW];
	var Math = global$1.Math;
	var RangeError = global$1.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = global$1.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = require$$0 ? '_b' : BUFFER;
	var $LENGTH = require$$0 ? '_l' : BYTE_LENGTH;
	var $OFFSET = require$$0 ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = require$$14(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = require$$14(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!require$$5.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = require$$14(length);
	    this._b = require$$35.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (require$$0) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!require$$1(function () {
	    $ArrayBuffer(1);
	  }) || !require$$1(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || require$$1(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(require$$14(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) require$$0$1($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	require$$0$1($DataView[PROTOTYPE], require$$5.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;
	});

	var _typedBuffer$1 = /*#__PURE__*/Object.freeze({
		default: _typedBuffer,
		__moduleExports: _typedBuffer
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = require$$0$5('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

	var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _speciesConstructor,
		__moduleExports: _speciesConstructor
	});

	var SPECIES$1 = require$$0$5('species');

	var _setSpecies = function (KEY) {
	  var C = global$1[KEY];
	  if (require$$0 && C && !C[SPECIES$1]) dP$1.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _setSpecies$1 = /*#__PURE__*/Object.freeze({
		default: _setSpecies,
		__moduleExports: _setSpecies
	});

	var $export$1 = ( _export$1 && _export ) || _export$1;

	var require$$6 = ( _typedBuffer$1 && _typedBuffer ) || _typedBuffer$1;

	var require$$30 = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

	var setSpecies = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

	var ArrayBuffer = global$1.ArrayBuffer;

	var $ArrayBuffer = require$$6.ArrayBuffer;
	var $DataView = require$$6.DataView;
	var $isView = require$$5.ABV && ArrayBuffer.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW$1 = require$$5.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	$export$1($export$1.G + $export$1.W + $export$1.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	$export$1($export$1.S + $export$1.F * !require$$5.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject(it) && VIEW$1 in it;
	  }
	});

	$export$1($export$1.P + $export$1.U + $export$1.F * require$$1(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	    var len = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, len);
	    var final = toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (require$$30(this, $ArrayBuffer))(toLength(final - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < final) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	setSpecies(ARRAY_BUFFER);

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = require$$0$5('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _classof$1 = /*#__PURE__*/Object.freeze({
		default: _classof,
		__moduleExports: _classof
	});

	var _iterators = {};

	var _iterators$1 = /*#__PURE__*/Object.freeze({
		default: _iterators,
		__moduleExports: _iterators
	});

	var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

	// check on default Array iterator

	var ITERATOR = require$$0$5('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

	var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
		default: _isArrayIter,
		__moduleExports: _isArrayIter
	});

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, require$$0$4);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var _objectDps = require$$0 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP$1.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _objectDps$1 = /*#__PURE__*/Object.freeze({
		default: _objectDps,
		__moduleExports: _objectDps
	});

	var document$2 = global$1.document;
	var _html = document$2 && document$2.documentElement;

	var _html$1 = /*#__PURE__*/Object.freeze({
		default: _html,
		__moduleExports: _html
	});

	var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

	var html = ( _html$1 && _html ) || _html$1;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = require$$1$2('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = require$$2('iframe');
	  var i = require$$0$4.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][require$$0$4[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectCreate$1 = /*#__PURE__*/Object.freeze({
		default: _objectCreate,
		__moduleExports: _objectCreate
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = require$$1$2('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var _objectGpo$1 = /*#__PURE__*/Object.freeze({
		default: _objectGpo,
		__moduleExports: _objectGpo
	});

	var classof = ( _classof$1 && _classof ) || _classof$1;

	var ITERATOR$1 = require$$0$5('iterator');

	var core_getIteratorMethod = require$$1$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

	var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
		default: core_getIteratorMethod,
		__moduleExports: core_getIteratorMethod
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

	var _isArray$1 = /*#__PURE__*/Object.freeze({
		default: _isArray,
		__moduleExports: _isArray
	});

	var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

	var SPECIES$2 = require$$0$5('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	var _arraySpeciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesConstructor,
		__moduleExports: _arraySpeciesConstructor
	});

	var speciesConstructor = ( _arraySpeciesConstructor$1 && _arraySpeciesConstructor ) || _arraySpeciesConstructor$1;

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

	var _arraySpeciesCreate$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesCreate,
		__moduleExports: _arraySpeciesCreate
	});

	var asc = ( _arraySpeciesCreate$1 && _arraySpeciesCreate ) || _arraySpeciesCreate$1;

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = IObject(O);
	    var f = ctx(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _arrayMethods$1 = /*#__PURE__*/Object.freeze({
		default: _arrayMethods,
		__moduleExports: _arrayMethods
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = require$$0$5('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) require$$0$1(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	var _addToUnscopables$1 = /*#__PURE__*/Object.freeze({
		default: _addToUnscopables,
		__moduleExports: _addToUnscopables
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterStep$1 = /*#__PURE__*/Object.freeze({
		default: _iterStep,
		__moduleExports: _iterStep
	});

	var create = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require$$0$1(IteratorPrototype, require$$0$5('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

	var _iterCreate$1 = /*#__PURE__*/Object.freeze({
		default: _iterCreate,
		__moduleExports: _iterCreate
	});

	var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

	var getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

	var ITERATOR$2 = require$$0$5('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$2] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR$2] != 'function') require$$0$1(IteratorPrototype, ITERATOR$2, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$2])) {
	    require$$0$1(proto, ITERATOR$2, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterDefine$1 = /*#__PURE__*/Object.freeze({
		default: _iterDefine,
		__moduleExports: _iterDefine
	});

	var require$$1$3 = ( _addToUnscopables$1 && _addToUnscopables ) || _addToUnscopables$1;

	var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

	var $iterDefine = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = $iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	require$$1$3('keys');
	require$$1$3('values');
	require$$1$3('entries');

	var ITERATOR$3 = require$$0$5('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var _iterDetect$1 = /*#__PURE__*/Object.freeze({
		default: _iterDetect,
		__moduleExports: _iterDetect
	});

	var _arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var _arrayCopyWithin$1 = /*#__PURE__*/Object.freeze({
		default: _arrayCopyWithin,
		__moduleExports: _arrayCopyWithin
	});

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$2
	});

	var require$$0$7 = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$3 = require$$0 ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return descriptor(!require$$0$7.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$3
	};

	var _objectGopd$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopd,
		__moduleExports: _objectGopd,
		f: f$3
	});

	var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

	var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

	var createArrayMethod = ( _arrayMethods$1 && _arrayMethods ) || _arrayMethods$1;

	var $iterDetect = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

	var require$$36 = ( _arrayCopyWithin$1 && _arrayCopyWithin ) || _arrayCopyWithin$1;

	var require$$1$4 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

	var _typedArray = createCommonjsModule(function (module) {
	if (require$$0) {
	  var LIBRARY$$1 = LIBRARY;
	  var global = global$1;
	  var fails = require$$1;
	  var $export = $export$1;
	  var $typed = require$$5;
	  var $buffer = require$$6;
	  var ctx$$1 = ctx;
	  var anInstance$$1 = anInstance;
	  var propertyDesc = descriptor;
	  var hide = require$$0$1;
	  var redefineAll$$1 = redefineAll;
	  var toInteger$$1 = toInteger;
	  var toLength$$1 = toLength;
	  var toIndex = require$$14;
	  var toAbsoluteIndex$$1 = toAbsoluteIndex;
	  var toPrimitive$$1 = toPrimitive;
	  var has$$1 = has;
	  var classof$$1 = classof;
	  var isObject$$1 = isObject;
	  var toObject$$1 = toObject;
	  var isArrayIter$$1 = isArrayIter;
	  var create$$1 = create;
	  var getPrototypeOf$$1 = getPrototypeOf;
	  var gOPN = require$$0$6.f;
	  var getIterFn$$1 = getIterFn;
	  var uid$$1 = uid;
	  var wks = require$$0$5;
	  var createArrayMethod$$1 = createArrayMethod;
	  var createArrayIncludes = require$$0$3;
	  var speciesConstructor = require$$30;
	  var ArrayIterators = es6_array_iterator;
	  var Iterators$$1 = Iterators;
	  var $iterDetect$$1 = $iterDetect;
	  var setSpecies$$1 = setSpecies;
	  var arrayFill = require$$35;
	  var arrayCopyWithin = require$$36;
	  var $DP = dP$1;
	  var $GOPD = require$$1$4;
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod$$1(0);
	  var arrayFilter = createArrayMethod$$1(2);
	  var arraySome = createArrayMethod$$1(3);
	  var arrayEvery = createArrayMethod$$1(4);
	  var arrayFind = createArrayMethod$$1(5);
	  var arrayFindIndex = createArrayMethod$$1(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid$$1('typed_constructor');
	  var DEF_CONSTRUCTOR = uid$$1('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod$$1(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger$$1(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject$$1(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject$$1(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject$$1(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn$$1(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter$$1(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx$$1(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength$$1(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex$$1(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength$$1((end === undefined ? length : toAbsoluteIndex$$1(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject$$1(arrayLike);
	    var len = toLength$$1(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject$$1(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive$$1(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive$$1(key, true))
	      && isObject$$1(desc)
	      && has$$1(desc, 'value')
	      && !has$$1(desc, 'get')
	      && !has$$1(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has$$1(desc, 'writable') || desc.writable)
	      && (!has$$1(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll$$1({}, proto);
	  redefineAll$$1($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll$$1($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf$$1(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$$1(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject$$1(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof$$1(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$$1($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create$$1($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect$$1(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance$$1(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject$$1(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof$$1(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY$$1) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies$$1(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (!LIBRARY$$1 && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators$$1[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY$$1 && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };
	});

	var _typedArray$1 = /*#__PURE__*/Object.freeze({
		default: _typedArray,
		__moduleExports: _typedArray
	});

	var require$$0$8 = ( _typedArray$1 && _typedArray ) || _typedArray$1;

	require$$0$8('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	require$$0$8('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	require$$0$8('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterCall$1 = /*#__PURE__*/Object.freeze({
		default: _iterCall,
		__moduleExports: _iterCall
	});

	var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _forOf$1 = /*#__PURE__*/Object.freeze({
		default: _forOf,
		__moduleExports: _forOf
	});

	var _meta = createCommonjsModule(function (module) {
	var META = uid('meta');


	var setDesc = dP$1.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !require$$1(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _meta$1 = /*#__PURE__*/Object.freeze({
		default: _meta,
		__moduleExports: _meta,
		KEY: _meta_1,
		NEED: _meta_2,
		fastKey: _meta_3,
		getWeak: _meta_4,
		onFreeze: _meta_5
	});

	var _validateCollection = function (it, TYPE) {
	  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var _validateCollection$1 = /*#__PURE__*/Object.freeze({
		default: _validateCollection,
		__moduleExports: _validateCollection
	});

	var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

	var require$$0$9 = ( _meta$1 && _meta ) || _meta$1;

	var validate = ( _validateCollection$1 && _validateCollection ) || _validateCollection$1;

	var dP$2 = dP$1.f;









	var fastKey = require$$0$9.fastKey;

	var SIZE = require$$0 ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate(this, NAME);
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate(this, NAME), key);
	      }
	    });
	    if (require$$0) dP$2(C.prototype, 'size', {
	      get: function () {
	        return validate(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};
	var _collectionStrong_1 = _collectionStrong.getConstructor;
	var _collectionStrong_2 = _collectionStrong.def;
	var _collectionStrong_3 = _collectionStrong.getEntry;
	var _collectionStrong_4 = _collectionStrong.setStrong;

	var _collectionStrong$1 = /*#__PURE__*/Object.freeze({
		default: _collectionStrong,
		__moduleExports: _collectionStrong,
		getConstructor: _collectionStrong_1,
		def: _collectionStrong_2,
		getEntry: _collectionStrong_3,
		setStrong: _collectionStrong_4
	});

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = ctx(Function.call, require$$1$4.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var _setProto$1 = /*#__PURE__*/Object.freeze({
		default: _setProto,
		__moduleExports: _setProto,
		set: _setProto_1,
		check: _setProto_2
	});

	var require$$0$10 = ( _setProto$1 && _setProto ) || _setProto$1;

	var setPrototypeOf = require$$0$10.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var _inheritIfRequired$1 = /*#__PURE__*/Object.freeze({
		default: _inheritIfRequired,
		__moduleExports: _inheritIfRequired
	});

	var inheritIfRequired = ( _inheritIfRequired$1 && _inheritIfRequired ) || _inheritIfRequired$1;

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global$1[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !require$$1(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    require$$0$9.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = require$$1(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && require$$1(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export$1($export$1.G + $export$1.W + $export$1.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var _collection$1 = /*#__PURE__*/Object.freeze({
		default: _collection,
		__moduleExports: _collection
	});

	var strong = ( _collectionStrong$1 && _collectionStrong ) || _collectionStrong$1;

	var require$$1$5 = ( _collection$1 && _collection ) || _collection$1;

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = require$$1$5(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(validate(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong, true);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = require$$1$5(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);

	var f$4 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$4
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$4
	});

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || require$$1(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = require$$0$7.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var getWeak = require$$0$9.getWeak;







	var arrayFind = createArrayMethod(5);
	var arrayFindIndex = createArrayMethod(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
	        return data && has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has$$1(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
	        return data && has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};
	var _collectionWeak_1 = _collectionWeak.getConstructor;
	var _collectionWeak_2 = _collectionWeak.def;
	var _collectionWeak_3 = _collectionWeak.ufstore;

	var _collectionWeak$1 = /*#__PURE__*/Object.freeze({
		default: _collectionWeak,
		__moduleExports: _collectionWeak,
		getConstructor: _collectionWeak_1,
		def: _collectionWeak_2,
		ufstore: _collectionWeak_3
	});

	var require$$0$11 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	var weak = ( _collectionWeak$1 && _collectionWeak ) || _collectionWeak$1;

	var es6_weakMap = createCommonjsModule(function (module) {
	var each = createArrayMethod(0);







	var WEAK_MAP = 'WeakMap';
	var getWeak = require$$0$9.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak.ufstore;
	var tmp = {};
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(validate(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = require$$1$5(WEAK_MAP, wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (require$$1(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
	  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
	  require$$0$11(InternalMap.prototype, methods);
	  require$$0$9.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	require$$1$5(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)



	var rApply = (global$1.Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export$1($export$1.S + $export$1.F * !require$$1(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction(target);
	    var L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var _invoke$1 = /*#__PURE__*/Object.freeze({
		default: _invoke,
		__moduleExports: _invoke
	});

	var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	var _bind$1 = /*#__PURE__*/Object.freeze({
		default: _bind,
		__moduleExports: _bind
	});

	var bind = ( _bind$1 && _bind ) || _bind$1;

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (global$1.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = require$$1(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !require$$1(function () {
	  rConstruct(function () { /* empty */ });
	});

	$export$1($export$1.S + $export$1.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)





	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export$1($export$1.S + $export$1.F * require$$1(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(dP$1.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP$1.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)

	var gOPD$1 = require$$1$4.f;


	$export$1($export$1.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD$1(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (anObject(target) === receiver) return target[propertyKey];
	  if (desc = require$$1$4.f(target, propertyKey)) return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}

	$export$1($export$1.S, 'Reflect', { get: get });

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)




	$export$1($export$1.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return require$$1$4.f(anObject(target), propertyKey);
	  }
	});

	// 26.1.8 Reflect.getPrototypeOf(target)




	$export$1($export$1.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf$$1(target) {
	    return getPrototypeOf(anObject(target));
	  }
	});

	// 26.1.9 Reflect.has(target, propertyKey)


	$export$1($export$1.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});

	// 26.1.10 Reflect.isExtensible(target)


	var $isExtensible = Object.isExtensible;

	$export$1($export$1.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = global$1.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = require$$0$6.f(anObject(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var _ownKeys$1 = /*#__PURE__*/Object.freeze({
		default: _ownKeys,
		__moduleExports: _ownKeys
	});

	var ownKeys = ( _ownKeys$1 && _ownKeys ) || _ownKeys$1;

	// 26.1.11 Reflect.ownKeys(target)


	$export$1($export$1.S, 'Reflect', { ownKeys: ownKeys });

	// 26.1.12 Reflect.preventExtensions(target)


	var $preventExtensions = Object.preventExtensions;

	$export$1($export$1.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])









	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = require$$1$4.f(anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (isObject(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = descriptor(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject(receiver)) return false;
	    if (existingDescriptor = require$$1$4.f(receiver, propertyKey)) {
	      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
	      existingDescriptor.value = V;
	      dP$1.f(receiver, propertyKey, existingDescriptor);
	    } else dP$1.f(receiver, propertyKey, descriptor(0, V));
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export$1($export$1.S, 'Reflect', { set: set });

	// 26.1.14 Reflect.setPrototypeOf(target, proto)



	if (require$$0$10) $export$1($export$1.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    require$$0$10.check(target, proto);
	    try {
	      require$$0$10.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});

	var process = global$1.process;
	var setTask = global$1.setImmediate;
	var clearTask = global$1.clearImmediate;
	var MessageChannel = global$1.MessageChannel;
	var Dispatch = global$1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$1.addEventListener && typeof postMessage == 'function' && !global$1.importScripts) {
	    defer = function (id) {
	      global$1.postMessage(id + '', '*');
	    };
	    global$1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in require$$2('script')) {
	    defer = function (id) {
	      html.appendChild(require$$2('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var _task$1 = /*#__PURE__*/Object.freeze({
		default: _task,
		__moduleExports: _task,
		set: _task_1,
		clear: _task_2
	});

	var require$$0$12 = ( _task$1 && _task ) || _task$1;

	var macrotask = require$$0$12.set;
	var Observer = global$1.MutationObserver || global$1.WebKitMutationObserver;
	var process$1 = global$1.process;
	var Promise$1 = global$1.Promise;
	var isNode = cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$1.navigator && global$1.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    var promise = Promise$1.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$1, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _microtask$1 = /*#__PURE__*/Object.freeze({
		default: _microtask,
		__moduleExports: _microtask
	});

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$5
	};

	var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
		default: _newPromiseCapability,
		__moduleExports: _newPromiseCapability,
		f: f$5
	});

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _perform$1 = /*#__PURE__*/Object.freeze({
		default: _perform,
		__moduleExports: _perform
	});

	var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

	var _promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
		default: _promiseResolve,
		__moduleExports: _promiseResolve
	});

	var require$$1$6 = ( _microtask$1 && _microtask ) || _microtask$1;

	var perform = ( _perform$1 && _perform ) || _perform$1;

	var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

	var task = require$$0$12.set;
	var microtask = require$$1$6();



	var PROMISE = 'Promise';
	var TypeError$1 = global$1.TypeError;
	var process$2 = global$1.process;
	var $Promise = global$1[PROMISE];
	var isNode$1 = classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[require$$0$5('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = global$1.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global$1.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = global$1.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(require$$30(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Promise: $Promise });
	setToStringTag($Promise, PROMISE);
	setSpecies(PROMISE);
	Wrapper = require$$1$1[PROMISE];

	// statics
	$export$1($export$1.S + $export$1.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$1($export$1.S + $export$1.F * !(USE_NATIVE && $iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var f$6 = require$$0$5;

	var _wksExt = {
		f: f$6
	};

	var _wksExt$1 = /*#__PURE__*/Object.freeze({
		default: _wksExt,
		__moduleExports: _wksExt,
		f: f$6
	});

	var wksExt = ( _wksExt$1 && _wksExt ) || _wksExt$1;

	var defineProperty = dP$1.f;
	var _wksDefine = function (name) {
	  var $Symbol = require$$1$1.Symbol || (require$$1$1.Symbol = LIBRARY ? {} : global$1.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

	var _wksDefine$1 = /*#__PURE__*/Object.freeze({
		default: _wksDefine,
		__moduleExports: _wksDefine
	});

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = require$$0$7.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var _enumKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumKeys,
		__moduleExports: _enumKeys
	});

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = require$$0$6.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$7 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

	var _objectGopnExt = {
		f: f$7
	};

	var _objectGopnExt$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopnExt,
		__moduleExports: _objectGopnExt,
		f: f$7
	});

	var wksDefine = ( _wksDefine$1 && _wksDefine ) || _wksDefine$1;

	var enumKeys = ( _enumKeys$1 && _enumKeys ) || _enumKeys$1;

	var require$$1$7 = ( _objectGopnExt$1 && _objectGopnExt ) || _objectGopnExt$1;

	// ECMAScript 6 symbols shim





	var META = require$$0$9.KEY;



















	var gOPD$2 = require$$1$4.f;
	var dP$3 = dP$1.f;
	var gOPN$1 = require$$1$7.f;
	var $Symbol = global$1.Symbol;
	var $JSON = global$1.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = require$$0$5('_hidden');
	var TO_PRIMITIVE = require$$0$5('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = require$$0$2('symbol-registry');
	var AllSymbols = require$$0$2('symbols');
	var OPSymbols = require$$0$2('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function';
	var QObject = global$1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = require$$0 && require$$1(function () {
	  return create(dP$3({}, 'a', {
	    get: function () { return dP$3(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$2(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$3(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$3(ObjectProto$1, key, protoDesc);
	} : dP$3;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP$3(it, HIDDEN, descriptor(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = create(D, { enumerable: descriptor(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$3(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create$$1(it, P) {
	  return P === undefined ? create(it) : $defineProperties(create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD$2(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, descriptor(1, value));
	    };
	    if (require$$0 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  require$$1$4.f = $getOwnPropertyDescriptor;
	  dP$1.f = $defineProperty;
	  require$$0$6.f = require$$1$7.f = $getOwnPropertyNames;
	  require$$0$7.f = $propertyIsEnumerable;
	  gOPS.f = $getOwnPropertySymbols;

	  if (require$$0 && !LIBRARY) {
	    redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(require$$0$5(name));
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)require$$0$5(es6Symbols[j++]);

	for (var wellKnownSymbols = getKeys(require$$0$5.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$1($export$1.S + $export$1.F * (!USE_NATIVE$1 || require$$1(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || require$$0$1($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global$1.JSON, 'JSON', true);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (require$$1$1.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * require$$1(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var require$$0$13 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.5 Object.freeze(O)

	var meta = require$$0$9.onFreeze;

	require$$0$13('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	// 19.1.2.17 Object.seal(O)

	var meta$1 = require$$0$9.onFreeze;

	require$$0$13('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject(it) ? $seal(meta$1(it)) : it;
	  };
	});

	// 19.1.2.15 Object.preventExtensions(O)

	var meta$2 = require$$0$9.onFreeze;

	require$$0$13('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta$2(it)) : it;
	  };
	});

	// 19.1.2.12 Object.isFrozen(O)


	require$$0$13('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

	// 19.1.2.13 Object.isSealed(O)


	require$$0$13('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

	// 19.1.2.11 Object.isExtensible(O)


	require$$0$13('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = require$$1$4.f;

	require$$0$13('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(toIObject(it), key);
	  };
	});

	// 19.1.2.9 Object.getPrototypeOf(O)



	require$$0$13('getPrototypeOf', function () {
	  return function getPrototypeOf$$1(it) {
	    return getPrototypeOf(toObject(it));
	  };
	});

	// 19.1.2.14 Object.keys(O)



	require$$0$13('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	require$$0$13('getOwnPropertyNames', function () {
	  return require$$1$7.f;
	});

	// 19.1.3.1 Object.assign(target, source)


	$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$11 });

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	var _sameValue$1 = /*#__PURE__*/Object.freeze({
		default: _sameValue,
		__moduleExports: _sameValue
	});

	var require$$0$14 = ( _sameValue$1 && _sameValue ) || _sameValue$1;

	// 19.1.3.10 Object.is(value1, value2)

	$export$1($export$1.S, 'Object', { is: require$$0$14 });

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	$export$1($export$1.S, 'Object', { setPrototypeOf: require$$0$10.set });

	var dP$4 = dP$1.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || require$$0 && dP$4(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	$export$1($export$1.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject(callSite.raw);
	    var len = toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export$1($export$1.S + $export$1.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _stringAt$1 = /*#__PURE__*/Object.freeze({
		default: _stringAt,
		__moduleExports: _stringAt
	});

	var require$$0$15 = ( _stringAt$1 && _stringAt ) || _stringAt$1;

	var $at = require$$0$15(false);
	$export$1($export$1.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

	var _stringRepeat = function repeat(count) {
	  var str = String(defined(this));
	  var res = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};

	var _stringRepeat$1 = /*#__PURE__*/Object.freeze({
		default: _stringRepeat,
		__moduleExports: _stringRepeat
	});

	var repeat = ( _stringRepeat$1 && _stringRepeat ) || _stringRepeat$1;

	$export$1($export$1.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: repeat
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = require$$0$5('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

	var _isRegexp$1 = /*#__PURE__*/Object.freeze({
		default: _isRegexp,
		__moduleExports: _isRegexp
	});

	var isRegExp = ( _isRegexp$1 && _isRegexp ) || _isRegexp$1;

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

	var _stringContext$1 = /*#__PURE__*/Object.freeze({
		default: _stringContext,
		__moduleExports: _stringContext
	});

	var MATCH$1 = require$$0$5('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var _failsIsRegexp$1 = /*#__PURE__*/Object.freeze({
		default: _failsIsRegexp,
		__moduleExports: _failsIsRegexp
	});

	var context = ( _stringContext$1 && _stringContext ) || _stringContext$1;

	var require$$0$16 = ( _failsIsRegexp$1 && _failsIsRegexp ) || _failsIsRegexp$1;

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	$export$1($export$1.P + $export$1.F * require$$0$16(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH);
	    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	$export$1($export$1.P + $export$1.F * require$$0$16(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = context(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var INCLUDES = 'includes';

	$export$1($export$1.P + $export$1.F * require$$0$16(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var _flags$1 = /*#__PURE__*/Object.freeze({
		default: _flags,
		__moduleExports: _flags
	});

	var require$$2$1 = ( _flags$1 && _flags ) || _flags$1;

	// 21.2.5.3 get RegExp.prototype.flags()
	if (require$$0 && /./g.flags != 'g') dP$1.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: require$$2$1
	});

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = require$$0$5(KEY);
	  var fns = exec(defined, SYMBOL, ''[KEY]);
	  var strfn = fns[0];
	  var rxfn = fns[1];
	  if (require$$1(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  })) {
	    redefine(String.prototype, KEY, strfn);
	    require$$0$1(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var _fixReWks$1 = /*#__PURE__*/Object.freeze({
		default: _fixReWks,
		__moduleExports: _fixReWks
	});

	var require$$0$17 = ( _fixReWks$1 && _fixReWks ) || _fixReWks$1;

	// @@match logic
	require$$0$17('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

	// @@replace logic
	require$$0$17('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

	// @@split logic
	require$$0$17('split', 2, function (defined, SPLIT, $split) {
	  var isRegExp$$1 = isRegExp;
	  var _split = $split;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX = 'lastIndex';
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$$1(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          // eslint-disable-next-line no-loop-func
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    $split = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this);
	    var fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

	// @@search logic
	require$$0$17('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

	var _createProperty = function (object, index, value) {
	  if (index in object) dP$1.f(object, index, descriptor(0, value));
	  else object[index] = value;
	};

	var _createProperty$1 = /*#__PURE__*/Object.freeze({
		default: _createProperty,
		__moduleExports: _createProperty
	});

	var createProperty = ( _createProperty$1 && _createProperty ) || _createProperty$1;

	$export$1($export$1.S + $export$1.F * !$iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	// WebKit Array.of isn't generic
	$export$1($export$1.S + $export$1.F * require$$1(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


	$export$1($export$1.P, 'Array', { copyWithin: require$$36 });

	require$$1$3('copyWithin');

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = createArrayMethod(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export$1($export$1.P + $export$1.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	require$$1$3(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = createArrayMethod(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	$export$1($export$1.P + $export$1.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	require$$1$3(KEY$1);

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	$export$1($export$1.P, 'Array', { fill: require$$35 });

	require$$1$3('fill');

	// 20.1.2.2 Number.isFinite(number)

	var _isFinite = global$1.isFinite;

	$export$1($export$1.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	var _isInteger$1 = /*#__PURE__*/Object.freeze({
		default: _isInteger,
		__moduleExports: _isInteger
	});

	var isInteger = ( _isInteger$1 && _isInteger ) || _isInteger$1;

	// 20.1.2.3 Number.isInteger(number)


	$export$1($export$1.S, 'Number', { isInteger: isInteger });

	// 20.1.2.5 Number.isSafeInteger(number)


	var abs = Math.abs;

	$export$1($export$1.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

	// 20.1.2.4 Number.isNaN(number)


	$export$1($export$1.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	// 20.1.2.1 Number.EPSILON


	$export$1($export$1.S, 'Number', { EPSILON: Math.pow(2, -52) });

	// 20.1.2.10 Number.MIN_SAFE_INTEGER


	$export$1($export$1.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

	// 20.1.2.6 Number.MAX_SAFE_INTEGER


	$export$1($export$1.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

	// 20.2.2.20 Math.log1p(x)
	var _mathLog1p = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

	var _mathLog1p$1 = /*#__PURE__*/Object.freeze({
		default: _mathLog1p,
		__moduleExports: _mathLog1p
	});

	var require$$0$18 = ( _mathLog1p$1 && _mathLog1p ) || _mathLog1p$1;

	// 20.2.2.3 Math.acosh(x)


	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	$export$1($export$1.S + $export$1.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : require$$0$18(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

	// 20.2.2.5 Math.asinh(x)

	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	$export$1($export$1.S + $export$1.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

	// 20.2.2.7 Math.atanh(x)

	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	$export$1($export$1.S + $export$1.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	var _mathSign$1 = /*#__PURE__*/Object.freeze({
		default: _mathSign,
		__moduleExports: _mathSign
	});

	var sign = ( _mathSign$1 && _mathSign ) || _mathSign$1;

	// 20.2.2.9 Math.cbrt(x)



	$export$1($export$1.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

	// 20.2.2.11 Math.clz32(x)


	$export$1($export$1.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

	// 20.2.2.12 Math.cosh(x)

	var exp = Math.exp;

	$export$1($export$1.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	var _mathExpm1 = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

	var _mathExpm1$1 = /*#__PURE__*/Object.freeze({
		default: _mathExpm1,
		__moduleExports: _mathExpm1
	});

	var expm1 = ( _mathExpm1$1 && _mathExpm1 ) || _mathExpm1$1;

	// 20.2.2.14 Math.expm1(x)



	$export$1($export$1.S + $export$1.F * (expm1 != Math.expm1), 'Math', { expm1: expm1 });

	// 20.2.2.16 Math.fround(x)

	var pow = Math.pow;
	var EPSILON = pow(2, -52);
	var EPSILON32 = pow(2, -23);
	var MAX32 = pow(2, 127) * (2 - EPSILON32);
	var MIN32 = pow(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	var _mathFround = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = sign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};

	var _mathFround$1 = /*#__PURE__*/Object.freeze({
		default: _mathFround,
		__moduleExports: _mathFround
	});

	var require$$0$19 = ( _mathFround$1 && _mathFround ) || _mathFround$1;

	// 20.2.2.16 Math.fround(x)


	$export$1($export$1.S, 'Math', { fround: require$$0$19 });

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

	var abs$1 = Math.abs;

	$export$1($export$1.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs$1(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

	// 20.2.2.18 Math.imul(x, y)

	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export$1($export$1.S + $export$1.F * require$$1(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

	// 20.2.2.20 Math.log1p(x)


	$export$1($export$1.S, 'Math', { log1p: require$$0$18 });

	// 20.2.2.21 Math.log10(x)


	$export$1($export$1.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});

	// 20.2.2.22 Math.log2(x)


	$export$1($export$1.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});

	// 20.2.2.28 Math.sign(x)


	$export$1($export$1.S, 'Math', { sign: sign });

	// 20.2.2.30 Math.sinh(x)


	var exp$1 = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export$1($export$1.S + $export$1.F * require$$1(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
	  }
	});

	// 20.2.2.33 Math.tanh(x)


	var exp$2 = Math.exp;

	$export$1($export$1.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x);
	    var b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
	  }
	});

	// 20.2.2.34 Math.trunc(x)


	$export$1($export$1.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = require$$0$3(true);

	$export$1($export$1.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	require$$1$3('includes');

	var isEnum$1 = require$$0$7.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	var _objectToArray$1 = /*#__PURE__*/Object.freeze({
		default: _objectToArray,
		__moduleExports: _objectToArray
	});

	var require$$0$20 = ( _objectToArray$1 && _objectToArray ) || _objectToArray$1;

	// https://github.com/tc39/proposal-object-values-entries

	var $values = require$$0$20(false);

	$export$1($export$1.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = require$$0$20(true);

	$export$1($export$1.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	$export$1($export$1.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object);
	    var getDesc = require$$1$4.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end




	var _stringPad = function (that, maxLength, fillString, left) {
	  var S = String(defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

	var _stringPad$1 = /*#__PURE__*/Object.freeze({
		default: _stringPad,
		__moduleExports: _stringPad
	});

	var navigator = global$1.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _userAgent$1 = /*#__PURE__*/Object.freeze({
		default: _userAgent,
		__moduleExports: _userAgent
	});

	var $pad = ( _stringPad$1 && _stringPad ) || _stringPad$1;

	var userAgent = ( _userAgent$1 && _userAgent ) || _userAgent$1;

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	$export$1($export$1.P + $export$1.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

	// https://github.com/tc39/proposal-string-pad-start-end




	// https://github.com/zloirock/core-js/issues/280
	$export$1($export$1.P + $export$1.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

	// ie9- setTimeout & setInterval additional parameters fix



	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap$1 = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	$export$1($export$1.G + $export$1.B + $export$1.F * MSIE, {
	  setTimeout: wrap$1(global$1.setTimeout),
	  setInterval: wrap$1(global$1.setInterval)
	});

	$export$1($export$1.G + $export$1.B, {
	  setImmediate: require$$0$12.set,
	  clearImmediate: require$$0$12.clear
	});

	var ITERATOR$4 = require$$0$5('iterator');
	var TO_STRING_TAG = require$$0$5('toStringTag');
	var ArrayValues = Iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = getKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
	  var NAME$1 = collections[i$1];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = global$1[NAME$1];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$4]) require$$0$1(proto, ITERATOR$4, ArrayValues);
	    if (!proto[TO_STRING_TAG]) require$$0$1(proto, TO_STRING_TAG, NAME$1);
	    Iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = 'object' === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof global.process === "object" && global.process.domain) {
	      invoke = global.process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof commonjsGlobal === "object" ? commonjsGlobal :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : commonjsGlobal
	);
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	/**
	 * Returns detailed type as string (instead of just 'object' for arrays etc)
	 * @private
	 * @param {any} value js value
	 * @returns {String} type of value
	 * @example
	 * typeOf({}); // 'object'
	 * typeOf([]); // 'array'
	 * typeOf(function() {}); // 'function'
	 * typeOf(/a/); // 'regexp'
	 * typeOf(new Date()); // 'date'
	 * typeOf(null); // 'null'
	 * typeOf(undefined); // 'undefined'
	 * typeOf('a'); // 'string'
	 * typeOf(1); // 'number'
	 * typeOf(true); // 'boolean'
	 * typeOf(new Map()); // 'map'
	 * typeOf(new Set()); // 'map'
	 */
	function typeOf(value) {
	  if (value === null) {
	    return 'null';
	  }
	  if (value !== Object(value)) {
	    return typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  }
	  return {}.toString.call(value).slice(8, -1).toLowerCase();
	}

	/**
	 * Checks if input string is empty
	 * @param  {String} input text input
	 * @return {Boolean} true if no input
	 */
	function isEmpty(input) {
	  if (typeOf(input) !== 'string') {
	    return true;
	  }
	  return !input.length;
	}

	/**
	 * Takes a character and a unicode range. Returns true if the char is in the range.
	 * @param  {String}  char  unicode character
	 * @param  {Number}  start unicode start range
	 * @param  {Number}  end   unicode end range
	 * @return {Boolean}
	 */
	function isCharInRange() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var start = arguments[1];
	  var end = arguments[2];

	  if (isEmpty(char)) return false;
	  var code = char.charCodeAt(0);
	  return start <= code && code <= end;
	}

	var VERSION = '4.0.1';

	var TO_KANA_METHODS = {
	  HIRAGANA: 'toHiragana',
	  KATAKANA: 'toKatakana'
	};

	var ROMANIZATIONS = {
	  HEPBURN: 'hepburn'
	};

	/**
	 * Default config for WanaKana, user passed options will be merged with these
	 * @type {DefaultOptions}
	 * @name defaultOptions
	 * @property {Boolean} [useObsoleteKana=false] - Set to true to use obsolete characters, such as ゐ and ゑ.
	 * @example
	 * toHiragana('we', { useObsoleteKana: true })
	 * // => 'ゑ'
	 * @property {Boolean} [passRomaji=false] - Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
	 * @example
	 * toHiragana('only convert the katakana: ヒラガナ', { passRomaji: true })
	 * // => "only convert the katakana: ひらがな"
	 * @property {Boolean} [upcaseKatakana=false] - Set to true to convert katakana to uppercase using toRomaji()
	 * @example
	 * toRomaji('ひらがな カタカナ', { upcaseKatakana: true })
	 * // => "hiragana KATAKANA"
	 * @property {Boolean|String} [IMEMode=false] - Set to true, 'toHiragana', or 'toKatakana' to handle conversion while it is being typed.
	 * @property {String} [romanization='hepburn'] - choose toRomaji() romanization map (currently only 'hepburn')
	 * @property {Object} [customKanaMapping] - custom map will be merged with default conversion
	 * @example
	 * toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'Bana' }) };
	 * // => 'わにBanaに'
	 * @property {Object} [customRomajiMapping] - custom map will be merged with default conversion
	 * @example
	 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
	 * // => 'tuzigili'
	 */
	var DEFAULT_OPTIONS = {
	  useObsoleteKana: false,
	  passRomaji: false,
	  upcaseKatakana: false,
	  ignoreCase: false,
	  IMEMode: false,
	  romanization: ROMANIZATIONS.HEPBURN
	};
	var LATIN_UPPERCASE_START = 0x41;
	var LATIN_UPPERCASE_END = 0x5a;
	var LOWERCASE_ZENKAKU_START = 0xff41;
	var LOWERCASE_ZENKAKU_END = 0xff5a;
	var UPPERCASE_ZENKAKU_START = 0xff21;
	var UPPERCASE_ZENKAKU_END = 0xff3a;
	var HIRAGANA_START = 0x3041;
	var HIRAGANA_END = 0x3096;
	var KATAKANA_START = 0x30a1;
	var KATAKANA_END = 0x30fc;
	var KANJI_START = 0x4e00;
	var KANJI_END = 0x9faf;
	var PROLONGED_SOUND_MARK = 0x30fc;
	var KANA_SLASH_DOT = 0x30fb;

	var ZENKAKU_NUMBERS = [0xff10, 0xff19];
	var ZENKAKU_UPPERCASE = [UPPERCASE_ZENKAKU_START, UPPERCASE_ZENKAKU_END];
	var ZENKAKU_LOWERCASE = [LOWERCASE_ZENKAKU_START, LOWERCASE_ZENKAKU_END];
	var ZENKAKU_PUNCTUATION_1 = [0xff01, 0xff0f];
	var ZENKAKU_PUNCTUATION_2 = [0xff1a, 0xff1f];
	var ZENKAKU_PUNCTUATION_3 = [0xff3b, 0xff3f];
	var ZENKAKU_PUNCTUATION_4 = [0xff5b, 0xff60];
	var ZENKAKU_SYMBOLS_CURRENCY = [0xffe0, 0xffee];

	var HIRAGANA_CHARS = [0x3040, 0x309f];
	var KATAKANA_CHARS = [0x30a0, 0x30ff];
	var HANKAKU_KATAKANA = [0xff66, 0xff9f];
	var KATAKANA_PUNCTUATION = [0x30fb, 0x30fc];
	var KANA_PUNCTUATION = [0xff61, 0xff65];
	var CJK_SYMBOLS_PUNCTUATION = [0x3000, 0x303f];
	var COMMON_CJK = [0x4e00, 0x9fff];
	var RARE_CJK = [0x3400, 0x4dbf];

	var KANA_RANGES = [HIRAGANA_CHARS, KATAKANA_CHARS, KANA_PUNCTUATION, HANKAKU_KATAKANA];

	var JA_PUNCTUATION_RANGES = [CJK_SYMBOLS_PUNCTUATION, KANA_PUNCTUATION, KATAKANA_PUNCTUATION, ZENKAKU_PUNCTUATION_1, ZENKAKU_PUNCTUATION_2, ZENKAKU_PUNCTUATION_3, ZENKAKU_PUNCTUATION_4, ZENKAKU_SYMBOLS_CURRENCY];

	// All Japanese unicode start and end ranges
	// Includes kanji, kana, zenkaku latin chars, punctuation, and number ranges.
	var JAPANESE_RANGES = [].concat(KANA_RANGES, JA_PUNCTUATION_RANGES, [ZENKAKU_UPPERCASE, ZENKAKU_LOWERCASE, ZENKAKU_NUMBERS, COMMON_CJK, RARE_CJK]);

	var MODERN_ENGLISH = [0x0000, 0x007f];
	var HEPBURN_MACRON_RANGES = [[0x0100, 0x0101], // Ā ā
	[0x0112, 0x0113], // Ē ē
	[0x012a, 0x012b], // Ī ī
	[0x014c, 0x014d], // Ō ō
	[0x016a, 0x016b]];
	var SMART_QUOTE_RANGES = [[0x2018, 0x2019], // ‘ ’
	[0x201c, 0x201d]];

	var ROMAJI_RANGES = [MODERN_ENGLISH].concat(HEPBURN_MACRON_RANGES);

	var EN_PUNCTUATION_RANGES = [[0x20, 0x2f], [0x3a, 0x3f], [0x5b, 0x60], [0x7b, 0x7e]].concat(SMART_QUOTE_RANGES);

	/**
	 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharJapanese() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  return JAPANESE_RANGES.some(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];

	    return isCharInRange(char, start, end);
	  });
	}

	/**
	 * Test if `input` only includes [Kanji](https://en.wikipedia.org/wiki/Kanji), [Kana](https://en.wikipedia.org/wiki/Kana), zenkaku numbers, and JA punctuation/symbols.”
	 * @param  {String} [input=''] text
	 * @param  {Regexp} [allowed] additional test allowed to pass for each char
	 * @return {Boolean} true if passes checks
	 * @example
	 * isJapanese('泣き虫')
	 * // => true
	 * isJapanese('あア')
	 * // => true
	 * isJapanese('２月') // Zenkaku numbers allowed
	 * // => true
	 * isJapanese('泣き虫。！〜＄') // Zenkaku/JA punctuation
	 * // => true
	 * isJapanese('泣き虫.!~$') // Latin punctuation fails
	 * // => false
	 * isJapanese('A泣き虫')
	 * // => false
	 * isJapanese('≪偽括弧≫', /[≪≫]/);
	 * // => true
	 */
	function isJapanese() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var allowed = arguments[1];

	  var augmented = typeOf(allowed) === 'regexp';
	  return isEmpty(input) ? false : [].concat(toConsumableArray(input)).every(function (char) {
	    var isJa = isCharJapanese(char);
	    return !augmented ? isJa : isJa || allowed.test(char);
	  });
	}

	/**
	 * Easy re-use of merging with default options
	 * @param {Object} opts user options
	 * @returns user options merged over default options
	 */
	var mergeWithDefaultOptions = function mergeWithDefaultOptions() {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  return Object.assign({}, DEFAULT_OPTIONS, opts);
	};

	function applyMapping(string, mapping, convertEnding) {
	  var root = mapping;

	  function nextSubtree(tree, nextChar) {
	    var subtree = tree[nextChar];
	    if (subtree === undefined) {
	      return undefined;
	    }
	    // if the next child node does not have a node value, set its node value to the input
	    return Object.assign({ '': tree[''] + nextChar }, tree[nextChar]);
	  }

	  function newChunk(remaining, currentCursor) {
	    // start parsing a new chunk
	    var firstChar = remaining.charAt(0);

	    return parse(Object.assign({ '': firstChar }, root[firstChar]), remaining.slice(1), currentCursor, currentCursor + 1);
	  }

	  function parse(tree, remaining, lastCursor, currentCursor) {
	    if (!remaining) {
	      if (convertEnding || Object.keys(tree).length === 1) {
	        // nothing more to consume, just commit the last chunk and return it
	        // so as to not have an empty element at the end of the result
	        return tree[''] ? [[lastCursor, currentCursor, tree['']]] : [];
	      }
	      // if we don't want to convert the ending, because there are still possible continuations
	      // return null as the final node value
	      return [[lastCursor, currentCursor, null]];
	    }

	    if (Object.keys(tree).length === 1) {
	      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
	    }

	    var subtree = nextSubtree(tree, remaining.charAt(0));

	    if (subtree === undefined) {
	      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
	    }
	    // continue current branch
	    return parse(subtree, remaining.slice(1), lastCursor, currentCursor + 1);
	  }

	  return newChunk(string, 0);
	}

	// transform the tree, so that for example hepburnTree['ゔ']['ぁ'][''] === 'va'
	// or kanaTree['k']['y']['a'][''] === 'きゃ'
	function transform(tree) {
	  return Object.entries(tree).reduce(function (map, _ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        char = _ref2[0],
	        subtree = _ref2[1];

	    var endOfBranch = typeOf(subtree) === 'string';
	    map[char] = endOfBranch ? { '': subtree } : transform(subtree);
	    return map;
	  }, {});
	}

	function getSubTreeOf(tree, string) {
	  return string.split('').reduce(function (correctSubTree, char) {
	    if (correctSubTree[char] === undefined) {
	      correctSubTree[char] = {};
	    }
	    return correctSubTree[char];
	  }, tree);
	}

	/**
	 * Creates a custom mapping tree, returns a function that accepts a defaultMap which the newly created customMapping will be merged with and returned
	 * (customMap) => (defaultMap) => mergedMap
	 * @param  {Object} customMap { 'ka' : 'な' }
	 * @return {Function} (defaultMap) => defaultMergedWithCustomMap
	 * @example
	 * const sillyMap = createCustomMapping({ 'ちゃ': 'time', '茎': 'cookie'　});
	 * // sillyMap is passed defaultMapping to merge with when called in toRomaji()
	 * toRomaji("It's 茎 ちゃ よ", { customRomajiMapping: sillyMap });
	 * // => 'It's cookie time yo';
	 */
	function createCustomMapping() {
	  var customMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var customTree = {};

	  if (typeOf(customMap) === 'object') {
	    Object.entries(customMap).forEach(function (_ref3) {
	      var _ref4 = slicedToArray(_ref3, 2),
	          roma = _ref4[0],
	          kana = _ref4[1];

	      var subTree = customTree;
	      roma.split('').forEach(function (char) {
	        if (subTree[char] === undefined) {
	          subTree[char] = {};
	        }
	        subTree = subTree[char];
	      });
	      subTree[''] = kana;
	    });
	  }

	  return function makeMap(map) {
	    var mapCopy = JSON.parse(JSON.stringify(map));

	    function transformMap(mapSubtree, customSubtree) {
	      if (mapSubtree === undefined || typeOf(mapSubtree) === 'string') {
	        return customSubtree;
	      }
	      return Object.entries(customSubtree).reduce(function (newSubtree, _ref5) {
	        var _ref6 = slicedToArray(_ref5, 2),
	            char = _ref6[0],
	            subtree = _ref6[1];

	        newSubtree[char] = transformMap(mapSubtree[char], subtree);
	        return newSubtree;
	      }, mapSubtree);
	    }

	    return transformMap(mapCopy, customTree);
	  };
	}

	// allow consumer to pass either function or object as customMapping
	function mergeCustomMapping(map, customMapping) {
	  if (!customMapping) {
	    return map;
	  }
	  return typeOf(customMapping) === 'function' ? customMapping(map) : createCustomMapping(customMapping)(map);
	}

	// NOTE: not exactly kunrei shiki, for example ぢゃ -> dya instead of zya, to avoid name clashing
	/* eslint-disable */
	// prettier-ignore
	var BASIC_KUNREI = {
	  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
	  k: { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ' },
	  s: { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ' },
	  t: { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と' },
	  n: { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の' },
	  h: { a: 'は', i: 'ひ', u: 'ふ', e: 'へ', o: 'ほ' },
	  m: { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も' },
	  y: { a: 'や', u: 'ゆ', o: 'よ' },
	  r: { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ' },
	  w: { a: 'わ', i: 'ゐ', e: 'ゑ', o: 'を' },
	  g: { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご' },
	  z: { a: 'ざ', i: 'じ', u: 'ず', e: 'ぜ', o: 'ぞ' },
	  d: { a: 'だ', i: 'ぢ', u: 'づ', e: 'で', o: 'ど' },
	  b: { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ' },
	  p: { a: 'ぱ', i: 'ぴ', u: 'ぷ', e: 'ぺ', o: 'ぽ' },
	  v: { a: 'ゔぁ', i: 'ゔぃ', u: 'ゔ', e: 'ゔぇ', o: 'ゔぉ' }
	};

	var SPECIAL_SYMBOLS = {
	  '.': '。',
	  ',': '、',
	  ':': '：',
	  '/': '・',
	  '!': '！',
	  '?': '？',
	  '~': '〜',
	  '-': 'ー',
	  '‘': '「',
	  '’': '」',
	  '“': '『',
	  '”': '』',
	  '[': '［',
	  ']': '］',
	  '(': '（',
	  ')': '）',
	  '{': '｛',
	  '}': '｝'
	};

	var CONSONANTS = {
	  k: 'き',
	  s: 'し',
	  t: 'ち',
	  n: 'に',
	  h: 'ひ',
	  m: 'み',
	  r: 'り',
	  g: 'ぎ',
	  z: 'じ',
	  d: 'ぢ',
	  b: 'び',
	  p: 'ぴ',
	  v: 'ゔ',
	  q: 'く',
	  f: 'ふ'
	};
	var SMALL_Y = { ya: 'ゃ', yi: 'ぃ', yu: 'ゅ', ye: 'ぇ', yo: 'ょ' };
	var SMALL_VOWELS = { a: 'ぁ', i: 'ぃ', u: 'ぅ', e: 'ぇ', o: 'ぉ' };

	// typing one should be the same as having typed the other instead
	var ALIASES = {
	  sh: 'sy', // sha -> sya
	  ch: 'ty', // cho -> tyo
	  cy: 'ty', // cyo -> tyo
	  chy: 'ty', // chyu -> tyu
	  shy: 'sy', // shya -> sya
	  j: 'zy', // ja -> zya
	  jy: 'zy', // jye -> zye

	  // exceptions to above rules
	  shi: 'si',
	  chi: 'ti',
	  tsu: 'tu',
	  ji: 'zi',
	  fu: 'hu'
	};

	// xtu -> っ
	var SMALL_LETTERS = Object.assign({
	  tu: 'っ',
	  wa: 'ゎ',
	  ka: 'ヵ',
	  ke: 'ヶ'
	}, SMALL_VOWELS, SMALL_Y);

	// don't follow any notable patterns
	var SPECIAL_CASES = {
	  yi: 'い',
	  wu: 'う',
	  ye: 'いぇ',
	  wi: 'うぃ',
	  we: 'うぇ',
	  kwa: 'くぁ',
	  whu: 'う',
	  // because it's not thya for てゃ but tha
	  // and tha is not てぁ, but てゃ
	  tha: 'てゃ',
	  thu: 'てゅ',
	  tho: 'てょ',
	  dha: 'でゃ',
	  dhu: 'でゅ',
	  dho: 'でょ'
	};

	var AIUEO_CONSTRUCTIONS = {
	  wh: 'う',
	  qw: 'く',
	  q: 'く',
	  gw: 'ぐ',
	  sw: 'す',
	  ts: 'つ',
	  th: 'て',
	  tw: 'と',
	  dh: 'で',
	  dw: 'ど',
	  fw: 'ふ',
	  f: 'ふ'
	};

	/* eslint-enable */
	function createRomajiToKanaMap() {
	  var kanaTree = transform(BASIC_KUNREI);
	  // pseudo partial application
	  var subtreeOf = function subtreeOf(string) {
	    return getSubTreeOf(kanaTree, string);
	  };

	  // add tya, sya, etc.
	  Object.entries(CONSONANTS).forEach(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        consonant = _ref2[0],
	        yKana = _ref2[1];

	    Object.entries(SMALL_Y).forEach(function (_ref3) {
	      var _ref4 = slicedToArray(_ref3, 2),
	          roma = _ref4[0],
	          kana = _ref4[1];

	      // for example kyo -> き + ょ
	      subtreeOf(consonant + roma)[''] = yKana + kana;
	    });
	  });

	  Object.entries(SPECIAL_SYMBOLS).forEach(function (_ref5) {
	    var _ref6 = slicedToArray(_ref5, 2),
	        symbol = _ref6[0],
	        jsymbol = _ref6[1];

	    subtreeOf(symbol)[''] = jsymbol;
	  });

	  // things like うぃ, くぃ, etc.
	  Object.entries(AIUEO_CONSTRUCTIONS).forEach(function (_ref7) {
	    var _ref8 = slicedToArray(_ref7, 2),
	        consonant = _ref8[0],
	        aiueoKana = _ref8[1];

	    Object.entries(SMALL_VOWELS).forEach(function (_ref9) {
	      var _ref10 = slicedToArray(_ref9, 2),
	          vowel = _ref10[0],
	          kana = _ref10[1];

	      var subtree = subtreeOf(consonant + vowel);
	      subtree[''] = aiueoKana + kana;
	    });
	  });

	  // different ways to write ん
	  ['n', "n'", 'xn'].forEach(function (nChar) {
	    subtreeOf(nChar)[''] = 'ん';
	  });

	  // c is equivalent to k, but not for chi, cha, etc. that's why we have to make a copy of k
	  kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));

	  Object.entries(ALIASES).forEach(function (_ref11) {
	    var _ref12 = slicedToArray(_ref11, 2),
	        string = _ref12[0],
	        alternative = _ref12[1];

	    var allExceptLast = string.slice(0, string.length - 1);
	    var last = string.charAt(string.length - 1);
	    var parentTree = subtreeOf(allExceptLast);
	    // copy to avoid recursive containment
	    parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
	  });

	  function getAlternatives(string) {
	    return [].concat(toConsumableArray(Object.entries(ALIASES)), [['c', 'k']]).reduce(function (list, _ref13) {
	      var _ref14 = slicedToArray(_ref13, 2),
	          alt = _ref14[0],
	          roma = _ref14[1];

	      return string.startsWith(roma) ? list.concat(string.replace(roma, alt)) : list;
	    }, []);
	  }

	  Object.entries(SMALL_LETTERS).forEach(function (_ref15) {
	    var _ref16 = slicedToArray(_ref15, 2),
	        kunreiRoma = _ref16[0],
	        kana = _ref16[1];

	    var last = function last(char) {
	      return char.charAt(char.length - 1);
	    };
	    var allExceptLast = function allExceptLast(chars) {
	      return chars.slice(0, chars.length - 1);
	    };
	    var xRoma = 'x' + kunreiRoma;
	    var xSubtree = subtreeOf(xRoma);
	    xSubtree[''] = kana;

	    // ltu -> xtu -> っ
	    var parentTree = subtreeOf('l' + allExceptLast(kunreiRoma));
	    parentTree[last(kunreiRoma)] = xSubtree;

	    // ltsu -> ltu -> っ
	    getAlternatives(kunreiRoma).forEach(function (altRoma) {
	      ['l', 'x'].forEach(function (prefix) {
	        var altParentTree = subtreeOf(prefix + allExceptLast(altRoma));
	        altParentTree[last(altRoma)] = subtreeOf(prefix + kunreiRoma);
	      });
	    });
	  });

	  Object.entries(SPECIAL_CASES).forEach(function (_ref17) {
	    var _ref18 = slicedToArray(_ref17, 2),
	        string = _ref18[0],
	        kana = _ref18[1];

	    subtreeOf(string)[''] = kana;
	  });

	  // add kka, tta, etc.
	  function addTsu(tree) {
	    return Object.entries(tree).reduce(function (tsuTree, _ref19) {
	      var _ref20 = slicedToArray(_ref19, 2),
	          key = _ref20[0],
	          value = _ref20[1];

	      if (!key) {
	        // we have reached the bottom of this branch
	        tsuTree[key] = '\u3063' + value;
	      } else {
	        // more subtrees
	        tsuTree[key] = addTsu(value);
	      }
	      return tsuTree;
	    }, {});
	  }
	  // have to explicitly name c here, because we made it a copy of k, not a reference
	  [].concat(toConsumableArray(Object.keys(CONSONANTS)), ['c', 'y', 'w', 'j']).forEach(function (consonant) {
	    var subtree = kanaTree[consonant];
	    subtree[consonant] = addTsu(subtree);
	  });
	  // nn should not be っん
	  delete kanaTree.n.n;
	  // solidify the results, so that there there is referential transparency within the tree
	  return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
	}

	var romajiToKanaMap = null;

	function getRomajiToKanaTree() {
	  if (romajiToKanaMap == null) {
	    romajiToKanaMap = createRomajiToKanaMap();
	  }
	  return romajiToKanaMap;
	}

	var USE_OBSOLETE_KANA_MAP = createCustomMapping({ wi: 'ゐ', we: 'ゑ' });

	function IME_MODE_MAP(map) {
	  // in IME mode, we do not want to convert single ns
	  var mapCopy = JSON.parse(JSON.stringify(map));
	  mapCopy.n.n = { '': 'ん' };
	  mapCopy.n[' '] = { '': 'ん' };
	  return mapCopy;
	}

	/**
	 * Tests if char is in English unicode uppercase range
	 * @param  {String} char
	 * @return {Boolean}
	 */
	function isCharUpperCase() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return isCharInRange(char, LATIN_UPPERCASE_START, LATIN_UPPERCASE_END);
	}

	/**
	 * Returns true if char is 'ー'
	 * @param  {String} char to test
	 * @return {Boolean}
	 */
	function isCharLongDash() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
	}

	/**
	 * Tests if char is '・'
	 * @param  {String} char
	 * @return {Boolean} true if '・'
	 */
	function isCharSlashDot() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return char.charCodeAt(0) === KANA_SLASH_DOT;
	}

	/**
	 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharHiragana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  if (isCharLongDash(char)) return true;
	  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
	}

	/**
	 * Convert [Hiragana](https://en.wikipedia.org/wiki/Hiragana) to [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * Passes through any non-hiragana chars
	 * @private
	 * @param  {String} [input=''] text input
	 * @return {String} converted text
	 * @example
	 * hiraganaToKatakana('ひらがな')
	 * // => "ヒラガナ"
	 * hiraganaToKatakana('ひらがな is a type of kana')
	 * // => "ヒラガナ is a type of kana"
	 */
	function hiraganaToKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  var kata = [];
	  input.split('').forEach(function (char) {
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
	    if (isCharLongDash(char) || isCharSlashDot(char)) {
	      kata.push(char);
	    } else if (isCharHiragana(char)) {
	      // Shift charcode.
	      var code = char.charCodeAt(0) + (KATAKANA_START - HIRAGANA_START);
	      var kataChar = String.fromCharCode(code);
	      kata.push(kataChar);
	    } else {
	      // Pass non-hiragana chars through
	      kata.push(char);
	    }
	  });
	  return kata.join('');
	}

	/**
	 * Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Kana](https://en.wikipedia.org/wiki/Kana), lowercase text will result in [Hiragana](https://en.wikipedia.org/wiki/Hiragana) and uppercase text will result in [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} [input=''] text
	 * @param  {DefaultOptions} [options=defaultOptions]
	 * @return {String} converted text
	 * @example
	 * toKana('onaji BUTTSUUJI')
	 * // => 'おなじ ブッツウジ'
	 * toKana('ONAJI buttsuuji')
	 * // => 'オナジ ぶっつうじ'
	 * toKana('座禅‘zazen’スタイル')
	 * // => '座禅「ざぜん」スタイル'
	 * toKana('batsuge-mu')
	 * // => 'ばつげーむ'
	 * toKana('!?.:/,~-‘’“”[](){}') // Punctuation conversion
	 * // => '！？。：・、〜ー「」『』［］（）｛｝'
	 * toKana('we', { useObsoleteKana: true })
	 * // => 'ゑ'
	 * toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'bana' } });
	 * // => 'わにbanaに'
	 */
	function toKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var map = arguments[2];

	  var config = void 0;
	  if (!map) {
	    config = mergeWithDefaultOptions(options);
	    map = createRomajiToKanaMap$1(config);
	  } else {
	    config = options;
	  }

	  // throw away the substring index information and just concatenate all the kana
	  return splitIntoConvertedKana(input, config, map).map(function (kanaToken) {
	    var _kanaToken = slicedToArray(kanaToken, 3),
	        start = _kanaToken[0],
	        end = _kanaToken[1],
	        kana = _kanaToken[2];

	    if (kana === null) {
	      // haven't converted the end of the string, since we are in IME mode
	      return input.slice(start);
	    }
	    var enforceHiragana = config.IMEMode === TO_KANA_METHODS.HIRAGANA;
	    var enforceKatakana = config.IMEMode === TO_KANA_METHODS.KATAKANA || [].concat(toConsumableArray(input.slice(start, end))).every(isCharUpperCase);

	    return enforceHiragana || !enforceKatakana ? kana : hiraganaToKatakana(kana);
	  }).join('');
	}

	/**
	 *
	 * @private
	 * @param {String} [input=''] input text
	 * @param {Object} [options={}] toKana options
	 * @returns {Array[]} [[start, end, token]]
	 * @example
	 * splitIntoConvertedKana('buttsuuji')
	 * // => [[0, 2, 'ぶ'], [2, 6, 'っつ'], [6, 7, 'う'], [7, 9, 'じ']]
	 */
	function splitIntoConvertedKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var map = arguments[2];

	  if (!map) {
	    map = createRomajiToKanaMap$1(options);
	  }
	  return applyMapping(input.toLowerCase(), map, !options.IMEMode);
	}

	var customMapping = null;
	function createRomajiToKanaMap$1() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var map = getRomajiToKanaTree();

	  map = options.IMEMode ? IME_MODE_MAP(map) : map;
	  map = options.useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;

	  if (options.customKanaMapping) {
	    if (customMapping == null) {
	      customMapping = mergeCustomMapping(map, options.customKanaMapping);
	    }
	    map = customMapping;
	  }

	  return map;
	}

	var LISTENERS = [];
	/**
	 * Automagically replaces input values with converted text to kana
	 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
	 * @return {Function} event handler with bound options
	 * @private
	 */
	function makeOnInput(options) {
	  var prevInput = void 0;
	  // Enforce IMEMode if not already specified
	  var mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
	    IMEMode: options.IMEMode || true
	  });
	  var preConfiguredMap = createRomajiToKanaMap$1(mergedConfig);
	  var triggers = [].concat(toConsumableArray(Object.keys(preConfiguredMap)), toConsumableArray(Object.keys(preConfiguredMap).map(function (char) {
	    return char.toUpperCase();
	  })));

	  return function onInput(_ref) {
	    var target = _ref.target;

	    if (target.value !== prevInput && target.dataset.ignoreComposition !== 'true') {
	      convertInput(target, mergedConfig, preConfiguredMap, triggers, prevInput);
	    }
	  };
	}

	function convertInput(target, options, map, triggers, prevInput) {
	  var _splitInput = splitInput(target.value, target.selectionEnd, triggers),
	      _splitInput2 = slicedToArray(_splitInput, 3),
	      head = _splitInput2[0],
	      textToConvert = _splitInput2[1],
	      tail = _splitInput2[2];

	  var convertedText = toKana(textToConvert, options, map);
	  var changed = textToConvert !== convertedText;

	  if (changed) {
	    var newCursor = head.length + convertedText.length;
	    var newValue = head + convertedText + tail;
	    target.value = newValue;
	    prevInput = newValue;

	    if (tail.length) {
	      // push later on event loop (otherwise mid-text insertion can be 1 char too far to the right)
	      setTimeout(function () {
	        return target.setSelectionRange(newCursor, newCursor);
	      }, 1);
	    } else {
	      target.setSelectionRange(newCursor, newCursor);
	    }
	  } else {
	    prevInput = target.value;
	  }
	}

	function onComposition(_ref2) {
	  var type = _ref2.type,
	      target = _ref2.target,
	      data = _ref2.data;

	  // navigator.platform is not 100% reliable for singling out all OS,
	  // but for determining desktop "Mac OS" it is effective enough.
	  var isMacOS = /Mac/.test(window.navigator && window.navigator.platform);
	  // We don't want to ignore on Android:
	  // https://github.com/WaniKani/WanaKana/issues/82
	  // But MacOS IME auto-closes if we don't ignore:
	  // https://github.com/WaniKani/WanaKana/issues/71
	  // Other platform Japanese IMEs pass through happily
	  if (isMacOS) {
	    if (type === 'compositionupdate' && isJapanese(data)) {
	      target.dataset.ignoreComposition = 'true';
	    }

	    if (type === 'compositionend') {
	      target.dataset.ignoreComposition = 'false';
	    }
	  }
	}

	function trackListeners(id, inputHandler, compositionHandler) {
	  LISTENERS = LISTENERS.concat({
	    id: id,
	    inputHandler: inputHandler,
	    compositionHandler: compositionHandler
	  });
	}

	function untrackListeners(_ref3) {
	  var targetId = _ref3.id;

	  LISTENERS = LISTENERS.filter(function (_ref4) {
	    var id = _ref4.id;
	    return id !== targetId;
	  });
	}

	function findListeners(el) {
	  return el && LISTENERS.find(function (_ref5) {
	    var id = _ref5.id;
	    return id === el.getAttribute('data-wanakana-id');
	  });
	}

	// Handle non-terminal inserted input conversion:
	// | -> わ| -> わび| -> わ|び -> わs|び -> わsh|び -> わshi|び -> わし|び
	// or multiple ambiguous positioning (to select which "s" to work from)
	// こsこs|こsこ -> こsこso|こsこ -> こsこそ|こsこ
	function splitInput() {
	  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var triggers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	  var head = void 0;
	  var toConvert = void 0;
	  var tail = void 0;

	  if (cursor === 0 && triggers.includes(text[0])) {
	    var _workFromStart = workFromStart(text, triggers);

	    var _workFromStart2 = slicedToArray(_workFromStart, 3);

	    head = _workFromStart2[0];
	    toConvert = _workFromStart2[1];
	    tail = _workFromStart2[2];
	  } else if (cursor > 0) {
	    var _workBackwards = workBackwards(text, cursor);

	    var _workBackwards2 = slicedToArray(_workBackwards, 3);

	    head = _workBackwards2[0];
	    toConvert = _workBackwards2[1];
	    tail = _workBackwards2[2];
	  } else {
	    var _takeWhileAndSlice = takeWhileAndSlice(text, function (char) {
	      return !triggers.includes(char);
	    });

	    var _takeWhileAndSlice2 = slicedToArray(_takeWhileAndSlice, 2);

	    head = _takeWhileAndSlice2[0];
	    toConvert = _takeWhileAndSlice2[1];

	    var _takeWhileAndSlice3 = takeWhileAndSlice(toConvert, function (char) {
	      return !isJapanese(char);
	    });

	    var _takeWhileAndSlice4 = slicedToArray(_takeWhileAndSlice3, 2);

	    toConvert = _takeWhileAndSlice4[0];
	    tail = _takeWhileAndSlice4[1];
	  }

	  return [head, toConvert, tail];
	}

	function workFromStart(text, catalystChars) {
	  return [''].concat(toConsumableArray(takeWhileAndSlice(text, function (char) {
	    return catalystChars.includes(char) || !isJapanese(char, /[0-9]/);
	  })));
	}

	function workBackwards() {
	  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  var _takeWhileAndSlice5 = takeWhileAndSlice([].concat(toConsumableArray(text.slice(0, startIndex))).reverse(), function (char) {
	    return !isJapanese(char);
	  }),
	      _takeWhileAndSlice6 = slicedToArray(_takeWhileAndSlice5, 2),
	      toConvert = _takeWhileAndSlice6[0],
	      head = _takeWhileAndSlice6[1];

	  return [head.reverse().join(''), toConvert.split('').reverse().join(''), text.slice(startIndex)];
	}

	function takeWhileAndSlice() {
	  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
	    return !!x;
	  };

	  var result = [];
	  var length = source.length;

	  var i = 0;
	  while (i < length && predicate(source[i], i)) {
	    result.push(source[i]);
	    i += 1;
	  }
	  return [result.join(''), source.slice(i)];
	}

	/* eslint-disable no-console */
	var onInput = function onInput(_ref) {
	  var _ref$target = _ref.target,
	      value = _ref$target.value,
	      selectionStart = _ref$target.selectionStart,
	      selectionEnd = _ref$target.selectionEnd;
	  return console.log('input:', { value: value, selectionStart: selectionStart, selectionEnd: selectionEnd });
	};
	var onCompositionStart = function onCompositionStart() {
	  return console.log('compositionstart');
	};
	var onCompositionUpdate = function onCompositionUpdate(_ref2) {
	  var _ref2$target = _ref2.target,
	      value = _ref2$target.value,
	      selectionStart = _ref2$target.selectionStart,
	      selectionEnd = _ref2$target.selectionEnd,
	      data = _ref2.data;
	  return console.log('compositionupdate', {
	    data: data,
	    value: value,
	    selectionStart: selectionStart,
	    selectionEnd: selectionEnd
	  });
	};
	var onCompositionEnd = function onCompositionEnd() {
	  return console.log('compositionend');
	};

	var events = {
	  input: onInput,
	  compositionstart: onCompositionStart,
	  compositionupdate: onCompositionUpdate,
	  compositionend: onCompositionEnd
	};

	var addDebugListeners = function addDebugListeners(input) {
	  Object.entries(events).forEach(function (_ref3) {
	    var _ref4 = slicedToArray(_ref3, 2),
	        event = _ref4[0],
	        handler = _ref4[1];

	    return input.addEventListener(event, handler);
	  });
	};

	var removeDebugListeners = function removeDebugListeners(input) {
	  Object.entries(events).forEach(function (_ref5) {
	    var _ref6 = slicedToArray(_ref5, 2),
	        event = _ref6[0],
	        handler = _ref6[1];

	    return input.removeEventListener(event, handler);
	  });
	};

	var ELEMENTS = ['TEXTAREA', 'INPUT'];

	var idCounter = 0;
	var newId = function newId() {
	  idCounter += 1;
	  return '' + Date.now() + idCounter;
	};

	/**
	 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
	 * Can pass `{ IMEMode: 'toHiragana' || 'toKatakana' }` to enforce kana conversion type
	 * @param  {HTMLElement} element textarea, input[type="text"] etc
	 * @param  {DefaultOptions} [options=defaultOptions] defaults to { IMEMode: true } using `toKana`
	 * @example
	 * bind(document.querySelector('#myInput'));
	 */
	function bind$1() {
	  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  if (!ELEMENTS.includes(element.nodeName)) {
	    throw new Error('Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (' + JSON.stringify(element) + ')');
	  }
	  var onInput = makeOnInput(options);
	  var id = newId();
	  element.setAttribute('data-wanakana-id', id);
	  element.setAttribute('lang', 'ja');
	  element.setAttribute('autoCapitalize', 'none');
	  element.setAttribute('autoCorrect', 'off');
	  element.setAttribute('autoComplete', 'off');
	  element.setAttribute('spellCheck', 'false');
	  element.addEventListener('input', onInput);
	  element.addEventListener('compositionupdate', onComposition);
	  element.addEventListener('compositionend', onComposition);
	  trackListeners(id, onInput, onComposition);
	  if (debug === true) {
	    addDebugListeners(element);
	  }
	}

	/**
	 * Unbinds eventListener from input field
	 * @param  {HTMLElement} element textarea, input
	 */
	function unbind(element) {
	  var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var listeners = findListeners(element);
	  if (listeners == null) {
	    throw new Error('Element provided to Wanakana unbind() had no listener registered.\n Received: ' + JSON.stringify(element));
	  }
	  var inputHandler = listeners.inputHandler,
	      compositionHandler = listeners.compositionHandler;

	  element.removeAttribute('data-wanakana-id');
	  element.removeAttribute('data-ignore-composition');
	  element.removeEventListener('input', inputHandler);
	  element.removeEventListener('compositionstart', compositionHandler);
	  element.removeEventListener('compositionupdate', compositionHandler);
	  element.removeEventListener('compositionend', compositionHandler);
	  untrackListeners(listeners);
	  if (debug === true) {
	    removeDebugListeners(element);
	  }
	}

	/**
	 * Tests a character. Returns true if the character is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharRomaji() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return ROMAJI_RANGES.some(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];

	    return isCharInRange(char, start, end);
	  });
	}

	/**
	 * Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
	 * @param  {String} [input=''] text
	 * @param  {Regexp} [allowed] additional test allowed to pass for each char
	 * @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
	 * @example
	 * isRomaji('Tōkyō and Ōsaka')
	 * // => true
	 * isRomaji('12a*b&c-d')
	 * // => true
	 * isRomaji('あアA')
	 * // => false
	 * isRomaji('お願い')
	 * // => false
	 * isRomaji('a！b&cーd') // Zenkaku punctuation fails
	 * // => false
	 * isRomaji('a！b&cーd', /[！ー]/)
	 * // => true
	 */
	function isRomaji() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var allowed = arguments[1];

	  var augmented = typeOf(allowed) === 'regexp';
	  return isEmpty(input) ? false : [].concat(toConsumableArray(input)).every(function (char) {
	    var isRoma = isCharRomaji(char);
	    return !augmented ? isRoma : isRoma || allowed.test(char);
	  });
	}

	/**
	 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKatakana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
	}

	/**
	 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana) or [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return isCharHiragana(char) || isCharKatakana(char);
	}

	/**
	 * Test if `input` is [Kana](https://en.wikipedia.org/wiki/Kana) ([Katakana](https://en.wikipedia.org/wiki/Katakana) and/or [Hiragana](https://en.wikipedia.org/wiki/Hiragana))
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Kana](https://en.wikipedia.org/wiki/Kana)
	 * @example
	 * isKana('あ')
	 * // => true
	 * isKana('ア')
	 * // => true
	 * isKana('あーア')
	 * // => true
	 * isKana('A')
	 * // => false
	 * isKana('あAア')
	 * // => false
	 */
	function isKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(input)) return false;
	  return [].concat(toConsumableArray(input)).every(isCharKana);
	}

	/**
	 * Test if `input` is [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @example
	 * isHiragana('げーむ')
	 * // => true
	 * isHiragana('A')
	 * // => false
	 * isHiragana('あア')
	 * // => false
	 */
	function isHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(input)) return false;
	  return [].concat(toConsumableArray(input)).every(isCharHiragana);
	}

	/**
	 * Test if `input` is [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @example
	 * isKatakana('ゲーム')
	 * // => true
	 * isKatakana('あ')
	 * // => false
	 * isKatakana('A')
	 * // => false
	 * isKatakana('あア')
	 * // => false
	 */
	function isKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(input)) return false;
	  return [].concat(toConsumableArray(input)).every(isCharKatakana);
	}

	/**
	 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKanji() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  return isCharInRange(char, KANJI_START, KANJI_END);
	}

	/**
	 * Tests if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) ([Japanese CJK ideographs](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs))
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji)
	 * @example
	 * isKanji('刀')
	 * // => true
	 * isKanji('切腹')
	 * // => true
	 * isKanji('勢い')
	 * // => false
	 * isKanji('あAア')
	 * // => false
	 * isKanji('🐸')
	 * // => false
	 */
	function isKanji() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(input)) return false;
	  return [].concat(toConsumableArray(input)).every(isCharKanji);
	}

	/**
	 * Test if `input` contains a mix of [Romaji](https://en.wikipedia.org/wiki/Romaji) *and* [Kana](https://en.wikipedia.org/wiki/Kana), defaults to pass through [Kanji](https://en.wikipedia.org/wiki/Kanji)
	 * @param  {String} input text
	 * @param  {Object} [options={ passKanji: true }] optional config to pass through kanji
	 * @return {Boolean} true if mixed
	 * @example
	 * isMixed('Abあア'))
	 * // => true
	 * isMixed('お腹A')) // ignores kanji by default
	 * // => true
	 * isMixed('お腹A', { passKanji: false }))
	 * // => false
	 * isMixed('ab'))
	 * // => false
	 * isMixed('あア'))
	 * // => false
	 */
	function isMixed() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { passKanji: true };

	  var chars = [].concat(toConsumableArray(input));
	  var hasKanji = false;
	  if (!options.passKanji) {
	    hasKanji = chars.some(isKanji);
	  }
	  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
	}

	var isCharInitialLongDash = function isCharInitialLongDash(char, index) {
	  return isCharLongDash(char) && index < 1;
	};
	var isCharInnerLongDash = function isCharInnerLongDash(char, index) {
	  return isCharLongDash(char) && index > 0;
	};
	var isKanaAsSymbol = function isKanaAsSymbol(char) {
	  return ['ヶ', 'ヵ'].includes(char);
	};
	var LONG_VOWELS = {
	  a: 'あ',
	  i: 'い',
	  u: 'う',
	  e: 'え',
	  o: 'う'
	};

	// inject toRomaji to avoid circular dependency between toRomaji <-> katakanaToHiragana
	function katakanaToHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var toRomaji = arguments[1];
	  var isDestinationRomaji = arguments[2];

	  var previousKana = '';

	  return input.split('').reduce(function (hira, char, index) {
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
	    if (isCharSlashDot(char) || isCharInitialLongDash(char, index) || isKanaAsSymbol(char)) {
	      return hira.concat(char);
	      // Transform long vowels: 'オー' to 'おう'
	    } else if (previousKana && isCharInnerLongDash(char, index)) {
	      // Transform previousKana back to romaji, and slice off the vowel
	      var romaji = toRomaji(previousKana).slice(-1);
	      // However, ensure 'オー' => 'おお' => 'oo' if this is a transform on the way to romaji
	      if (isCharKatakana(input[index - 1]) && romaji === 'o' && isDestinationRomaji) {
	        return hira.concat('お');
	      }
	      return hira.concat(LONG_VOWELS[romaji]);
	    } else if (!isCharLongDash(char) && isCharKatakana(char)) {
	      // Shift charcode.
	      var code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
	      var hiraChar = String.fromCharCode(code);
	      previousKana = hiraChar;
	      return hira.concat(hiraChar);
	    }
	    // Pass non katakana chars through
	    previousKana = '';
	    return hira.concat(char);
	  }, []).join('');
	}

	var kanaToHepburnMap = null;

	/* eslint-disable */
	// prettier-ignore
	var BASIC_ROMAJI = {
	  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
	  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
	  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
	  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
	  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
	  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
	  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
	  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
	  や: 'ya', ゆ: 'yu', よ: 'yo',
	  わ: 'wa', ゐ: 'wi', ゑ: 'we', を: 'wo',
	  ん: 'n',
	  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
	  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
	  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
	  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
	  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
	  ゔぁ: 'va', ゔぃ: 'vi', ゔ: 'vu', ゔぇ: 've', ゔぉ: 'vo'
	};
	/* eslint-enable  */

	var SPECIAL_SYMBOLS$1 = {
	  '。': '.',
	  '、': ',',
	  '：': ':',
	  '・': '/',
	  '！': '!',
	  '？': '?',
	  '〜': '~',
	  'ー': '-',
	  '「': '‘',
	  '」': '’',
	  '『': '“',
	  '』': '”',
	  '［': '[',
	  '］': ']',
	  '（': '(',
	  '）': ')',
	  '｛': '{',
	  '｝': '}',
	  '　': ' '
	};

	// んい -> n'i
	var AMBIGUOUS_VOWELS = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ'];
	var SMALL_Y$1 = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
	var SMALL_Y_EXTRA = { ぃ: 'yi', ぇ: 'ye' };
	var SMALL_AIUEO = {
	  ぁ: 'a',
	  ぃ: 'i',
	  ぅ: 'u',
	  ぇ: 'e',
	  ぉ: 'o'
	};
	var YOON_KANA = ['き', 'に', 'ひ', 'み', 'り', 'ぎ', 'び', 'ぴ', 'ゔ', 'く', 'ふ'];
	var YOON_EXCEPTIONS = {
	  し: 'sh',
	  ち: 'ch',
	  じ: 'j',
	  ぢ: 'j'
	};
	var SMALL_KANA = {
	  っ: '',
	  ゃ: 'ya',
	  ゅ: 'yu',
	  ょ: 'yo',
	  ぁ: 'a',
	  ぃ: 'i',
	  ぅ: 'u',
	  ぇ: 'e',
	  ぉ: 'o'
	};

	// going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
	// in other words, just assume the sokuon could have been applied to anything
	var SOKUON_WHITELIST = {
	  b: 'b',
	  c: 't',
	  d: 'd',
	  f: 'f',
	  g: 'g',
	  h: 'h',
	  j: 'j',
	  k: 'k',
	  m: 'm',
	  p: 'p',
	  q: 'q',
	  r: 'r',
	  s: 's',
	  t: 't',
	  v: 'v',
	  w: 'w',
	  x: 'x',
	  z: 'z'
	};

	function getKanaToHepburnTree() {
	  if (kanaToHepburnMap == null) {
	    kanaToHepburnMap = createKanaToHepburnMap();
	  }
	  return kanaToHepburnMap;
	}

	function getKanaToRomajiTree(fullOptions) {
	  switch (fullOptions.romanization) {
	    case ROMANIZATIONS.HEPBURN:
	      return getKanaToHepburnTree(fullOptions);
	    default:
	      return {};
	  }
	}

	function createKanaToHepburnMap() {
	  var romajiTree = transform(BASIC_ROMAJI);

	  var subtreeOf = function subtreeOf(string) {
	    return getSubTreeOf(romajiTree, string);
	  };
	  var setTrans = function setTrans(string, transliteration) {
	    subtreeOf(string)[''] = transliteration;
	  };

	  Object.entries(SPECIAL_SYMBOLS$1).forEach(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        jsymbol = _ref2[0],
	        symbol = _ref2[1];

	    subtreeOf(jsymbol)[''] = symbol;
	  });

	  [].concat(toConsumableArray(Object.entries(SMALL_Y$1)), toConsumableArray(Object.entries(SMALL_AIUEO))).forEach(function (_ref3) {
	    var _ref4 = slicedToArray(_ref3, 2),
	        roma = _ref4[0],
	        kana = _ref4[1];

	    setTrans(roma, kana);
	  });

	  // きゃ -> kya
	  YOON_KANA.forEach(function (kana) {
	    var firstRomajiChar = subtreeOf(kana)[''][0];
	    Object.entries(SMALL_Y$1).forEach(function (_ref5) {
	      var _ref6 = slicedToArray(_ref5, 2),
	          yKana = _ref6[0],
	          yRoma = _ref6[1];

	      setTrans(kana + yKana, firstRomajiChar + yRoma);
	    });
	    // きぃ -> kyi
	    Object.entries(SMALL_Y_EXTRA).forEach(function (_ref7) {
	      var _ref8 = slicedToArray(_ref7, 2),
	          yKana = _ref8[0],
	          yRoma = _ref8[1];

	      setTrans(kana + yKana, firstRomajiChar + yRoma);
	    });
	  });

	  Object.entries(YOON_EXCEPTIONS).forEach(function (_ref9) {
	    var _ref10 = slicedToArray(_ref9, 2),
	        kana = _ref10[0],
	        roma = _ref10[1];

	    // じゃ -> ja
	    Object.entries(SMALL_Y$1).forEach(function (_ref11) {
	      var _ref12 = slicedToArray(_ref11, 2),
	          yKana = _ref12[0],
	          yRoma = _ref12[1];

	      setTrans(kana + yKana, roma + yRoma[1]);
	    });
	    // じぃ -> jyi, じぇ -> je
	    setTrans(kana + '\u3043', roma + 'yi');
	    setTrans(kana + '\u3047', roma + 'e');
	  });

	  romajiTree['っ'] = resolveTsu(romajiTree);

	  Object.entries(SMALL_KANA).forEach(function (_ref13) {
	    var _ref14 = slicedToArray(_ref13, 2),
	        kana = _ref14[0],
	        roma = _ref14[1];

	    setTrans(kana, roma);
	  });

	  AMBIGUOUS_VOWELS.forEach(function (kana) {
	    setTrans('\u3093' + kana, 'n\'' + subtreeOf(kana)['']);
	  });

	  // NOTE: could be re-enabled with an option?
	  // // んば -> mbo
	  // const LABIAL = [
	  //   'ば', 'び', 'ぶ', 'べ', 'ぼ',
	  //   'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
	  //   'ま', 'み', 'む', 'め', 'も',
	  // ];
	  // LABIAL.forEach((kana) => {
	  //   setTrans(`ん${kana}`, `m${subtreeOf(kana)['']}`);
	  // });

	  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
	}

	function resolveTsu(tree) {
	  return Object.entries(tree).reduce(function (tsuTree, _ref15) {
	    var _ref16 = slicedToArray(_ref15, 2),
	        key = _ref16[0],
	        value = _ref16[1];

	    if (!key) {
	      // we have reached the bottom of this branch
	      var consonant = value.charAt(0);
	      tsuTree[key] = Object.keys(SOKUON_WHITELIST).includes(consonant) ? SOKUON_WHITELIST[consonant] + value : value;
	    } else {
	      // more subtrees
	      tsuTree[key] = resolveTsu(value);
	    }
	    return tsuTree;
	  }, {});
	}

	/**
	 * Convert kana to romaji
	 * @param  {String} kana text input
	 * @param  {DefaultOptions} [options=defaultOptions]
	 * @return {String} converted text
	 * @example
	 * toRomaji('ひらがな　カタカナ')
	 * // => 'hiragana katakana'
	 * toRomaji('げーむ　ゲーム')
	 * // => 'ge-mu geemu'
	 * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
	 * // => 'hiragana KATAKANA'
	 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' } });
	 * // => 'tuzigili'
	 */
	function toRomaji() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var mergedOptions = mergeWithDefaultOptions(options);
	  // just throw away the substring index information and just concatenate all the kana
	  return splitIntoRomaji(input, mergedOptions).map(function (romajiToken) {
	    var _romajiToken = slicedToArray(romajiToken, 3),
	        start = _romajiToken[0],
	        end = _romajiToken[1],
	        romaji = _romajiToken[2];

	    var makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
	    return makeUpperCase ? romaji.toUpperCase() : romaji;
	  }).join('');
	}

	var customMapping$1 = null;
	function splitIntoRomaji(input, options) {
	  var map = getKanaToRomajiTree(options);

	  if (options.customRomajiMapping) {
	    if (customMapping$1 == null) {
	      customMapping$1 = mergeCustomMapping(map, options.customRomajiMapping);
	    }
	    map = customMapping$1;
	  }

	  return applyMapping(katakanaToHiragana(input, toRomaji, true), map, !options.IMEMode);
	}

	/**
	 * Tests a character. Returns true if the character is considered English punctuation.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharEnglishPunctuation() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return EN_PUNCTUATION_RANGES.some(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];

	    return isCharInRange(char, start, end);
	  });
	}

	/**
	 * Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @param  {String} [input=''] text
	 * @param  {DefaultOptions} [options=defaultOptions]
	 * @return {String} converted text
	 * @example
	 * toHiragana('toukyou, オオサカ')
	 * // => 'とうきょう、　おおさか'
	 * toHiragana('only カナ', { passRomaji: true })
	 * // => 'only かな'
	 * toHiragana('wi')
	 * // => 'うぃ'
	 * toHiragana('wi', { useObsoleteKana: true })
	 * // => 'ゐ'
	 */
	function toHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var config = mergeWithDefaultOptions(options);
	  if (config.passRomaji) {
	    return katakanaToHiragana(input, toRomaji);
	  }

	  if (isMixed(input, { passKanji: true })) {
	    var convertedKatakana = katakanaToHiragana(input, toRomaji);
	    return toKana(convertedKatakana.toLowerCase(), config);
	  }

	  if (isRomaji(input) || isCharEnglishPunctuation(input)) {
	    return toKana(input.toLowerCase(), config);
	  }

	  return katakanaToHiragana(input, toRomaji);
	}

	/**
	 * Convert input to [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @param  {String} [input=''] text
	 * @param  {DefaultOptions} [options=defaultOptions]
	 * @return {String} converted text
	 * @example
	 * toKatakana('toukyou, おおさか')
	 * // => 'トウキョウ、　オオサカ'
	 * toKatakana('only かな', { passRomaji: true })
	 * // => 'only カナ'
	 * toKatakana('wi')
	 * // => 'ウィ'
	 * toKatakana('wi', { useObsoleteKana: true })
	 * // => 'ヰ'
	 */
	function toKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var mergedOptions = mergeWithDefaultOptions(options);
	  if (mergedOptions.passRomaji) {
	    return hiraganaToKatakana(input);
	  }

	  if (isMixed(input) || isRomaji(input) || isCharEnglishPunctuation(input)) {
	    var hiragana = toKana(input.toLowerCase(), mergedOptions);
	    return hiraganaToKatakana(hiragana);
	  }

	  return hiraganaToKatakana(input);
	}

	/**
	 * Tests a character. Returns true if the character is considered English punctuation.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharJapanesePunctuation() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  if (isEmpty(char)) return false;
	  return JA_PUNCTUATION_RANGES.some(function (_ref) {
	    var _ref2 = slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];

	    return isCharInRange(char, start, end);
	  });
	}

	var isCharEnSpace = function isCharEnSpace(x) {
	  return x === ' ';
	};
	var isCharJaSpace = function isCharJaSpace(x) {
	  return x === '　';
	};
	var isCharJaNum = function isCharJaNum(x) {
	  return (/[０-９]/.test(x)
	  );
	};
	var isCharEnNum = function isCharEnNum(x) {
	  return (/[0-9]/.test(x)
	  );
	};

	var TOKEN_TYPES = {
	  EN: 'en',
	  JA: 'ja',
	  EN_NUM: 'englishNumeral',
	  JA_NUM: 'japaneseNumeral',
	  EN_PUNC: 'englishPunctuation',
	  JA_PUNC: 'japanesePunctuation',
	  KANJI: 'kanji',
	  HIRAGANA: 'hiragana',
	  KATAKANA: 'katakana',
	  SPACE: 'space',
	  OTHER: 'other'
	};

	// prettier-ignore
	function getType(input) {
	  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  var EN = TOKEN_TYPES.EN,
	      JA = TOKEN_TYPES.JA,
	      EN_NUM = TOKEN_TYPES.EN_NUM,
	      JA_NUM = TOKEN_TYPES.JA_NUM,
	      EN_PUNC = TOKEN_TYPES.EN_PUNC,
	      JA_PUNC = TOKEN_TYPES.JA_PUNC,
	      KANJI = TOKEN_TYPES.KANJI,
	      HIRAGANA = TOKEN_TYPES.HIRAGANA,
	      KATAKANA = TOKEN_TYPES.KATAKANA,
	      SPACE = TOKEN_TYPES.SPACE,
	      OTHER = TOKEN_TYPES.OTHER;


	  if (compact) {
	    switch (true) {
	      case isCharJaNum(input):
	        return OTHER;
	      case isCharEnNum(input):
	        return OTHER;
	      case isCharEnSpace(input):
	        return EN;
	      case isCharEnglishPunctuation(input):
	        return OTHER;
	      case isCharJaSpace(input):
	        return JA;
	      case isCharJapanesePunctuation(input):
	        return OTHER;
	      case isCharJapanese(input):
	        return JA;
	      case isCharRomaji(input):
	        return EN;
	      default:
	        return OTHER;
	    }
	  } else {
	    switch (true) {
	      case isCharJaSpace(input):
	        return SPACE;
	      case isCharEnSpace(input):
	        return SPACE;
	      case isCharJaNum(input):
	        return JA_NUM;
	      case isCharEnNum(input):
	        return EN_NUM;
	      case isCharEnglishPunctuation(input):
	        return EN_PUNC;
	      case isCharJapanesePunctuation(input):
	        return JA_PUNC;
	      case isCharKanji(input):
	        return KANJI;
	      case isCharHiragana(input):
	        return HIRAGANA;
	      case isCharKatakana(input):
	        return KATAKANA;
	      case isCharJapanese(input):
	        return JA;
	      case isCharRomaji(input):
	        return EN;
	      default:
	        return OTHER;
	    }
	  }
	}

	/**
	 * Splits input into array of strings separated by opinionated token types
	 * `'en', 'ja', 'englishNumeral', 'japaneseNumeral','englishPunctuation', 'japanesePunctuation','kanji', 'hiragana', 'katakana', 'space', 'other'`.
	 * If `{ compact: true }` then many same-language tokens are combined (spaces + text, kanji + kana, numeral + punctuation).
	 * If `{ detailed: true }` then return array will contain `{ type, value }` instead of `'value'`
	 * @param  {String} input text
	 * @param  {Object} [options={ compact: false, detailed: false}] options to modify output style
	 * @return {String|Object[]} text split into tokens containing values, or detailed object
	 * @example
	 * tokenize('ふふフフ')
	 * // ['ふふ', 'フフ']
	 *
	 * tokenize('感じ')
	 * // ['感', 'じ']
	 *
	 * tokenize('truly 私は悲しい')
	 * // ['truly', ' ', '私', 'は', '悲', 'しい']
	 *
	 * tokenize('truly 私は悲しい', { compact: true })
	 * // ['truly ', '私は悲しい']
	 *
	 * tokenize('5romaji here...!?漢字ひらがな４カタ　カナ「ＳＨＩＯ」。！')
	 * // [ '5', 'romaji', ' ', 'here', '...!?', '漢字', 'ひらがな', 'カタ', '　', 'カナ', '４', '「', 'ＳＨＩＯ', '」。！']
	 *
	 * tokenize('5romaji here...!?漢字ひらがな４カタ　カナ「ＳＨＩＯ」。！', { compact: true })
	 * // [ '5', 'romaji here', '...!?', '漢字ひらがなカタ　カナ', '４「', 'ＳＨＩＯ', '」。！']
	 *
	 * tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', { detailed: true })
	 * // [
	 *  { type: 'englishNumeral', value: '5' },
	 *  { type: 'en', value: 'romaji' },
	 *  { type: 'space', value: ' ' },
	 *  { type: 'en', value: 'here' },
	 *  { type: 'englishPunctuation', value: '...!?' },
	 *  { type: 'kanji', value: '漢字' },
	 *  { type: 'hiragana', value: 'ひらがな' },
	 *  { type: 'katakana', value: 'カタ' },
	 *  { type: 'space', value: '　' },
	 *  { type: 'katakana', value: 'カナ' },
	 *  { type: 'japaneseNumeral', value: '４' },
	 *  { type: 'japanesePunctuation', value: '「' },
	 *  { type: 'ja', value: 'ＳＨＩＯ' },
	 *  { type: 'japanesePunctuation', value: '」。！' },
	 *  { type: 'space', value: ' ' },
	 *  { type: 'other', value: 'لنذهب' },
	 * ]
	 *
	 * tokenize('5romaji here...!?漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', { compact: true, detailed: true})
	 * // [
	 *  { type: 'other', value: '5' },
	 *  { type: 'en', value: 'romaji here' },
	 *  { type: 'other', value: '...!?' },
	 *  { type: 'ja', value: '漢字ひらがなカタ　カナ' },
	 *  { type: 'other', value: '４「' },
	 *  { type: 'ja', value: 'ＳＨＩＯ' },
	 *  { type: 'other', value: '」。！' },
	 *  { type: 'en', value: ' ' },
	 *  { type: 'other', value: 'لنذهب' },
	 *]
	 */
	function tokenize(input) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$compact = _ref.compact,
	      compact = _ref$compact === undefined ? false : _ref$compact,
	      _ref$detailed = _ref.detailed,
	      detailed = _ref$detailed === undefined ? false : _ref$detailed;

	  if (input == null || isEmpty(input)) {
	    return [];
	  }
	  var chars = [].concat(toConsumableArray(input));
	  var initial = chars.shift();
	  var prevType = getType(initial, compact);
	  initial = detailed ? { type: prevType, value: initial } : initial;

	  var result = chars.reduce(function (tokens, char) {
	    var currType = getType(char, compact);
	    var sameType = currType === prevType;
	    prevType = currType;
	    var newValue = char;

	    if (sameType) {
	      newValue = (detailed ? tokens.pop().value : tokens.pop()) + newValue;
	    }

	    return detailed ? tokens.concat({ type: currType, value: newValue }) : tokens.concat(newValue);
	  }, [initial]);
	  return result;
	}

	var isLeadingWithoutInitialKana = function isLeadingWithoutInitialKana(input, leading) {
	  return leading && !isKana(input[0]);
	};
	var isTrailingWithoutFinalKana = function isTrailingWithoutFinalKana(input, leading) {
	  return !leading && !isKana(input[input.length - 1]);
	};
	var isInvalidMatcher = function isInvalidMatcher(input, matchKanji) {
	  return matchKanji && ![].concat(toConsumableArray(matchKanji)).some(isKanji) || !matchKanji && isKana(input);
	};

	/**
	 * Strips [Okurigana](https://en.wikipedia.org/wiki/Okurigana)
	 * @param  {String} input text
	 * @param  {Object} [options={ leading: false, matchKanji: '' }] optional config
	 * @return {String} text with okurigana removed
	 * @example
	 * stripOkurigana('踏み込む')
	 * // => '踏み込'
	 * stripOkurigana('お祝い')
	 * // => 'お祝'
	 * stripOkurigana('お腹', { leading: true });
	 * // => '腹'
	 * stripOkurigana('ふみこむ', { matchKanji: '踏み込む' });
	 * // => 'ふみこ'
	 * stripOkurigana('おみまい', { matchKanji: 'お祝い', leading: true });
	 * // => 'みまい'
	 */
	function stripOkurigana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$leading = _ref.leading,
	      leading = _ref$leading === undefined ? false : _ref$leading,
	      _ref$matchKanji = _ref.matchKanji,
	      matchKanji = _ref$matchKanji === undefined ? '' : _ref$matchKanji;

	  if (!isJapanese(input) || isLeadingWithoutInitialKana(input, leading) || isTrailingWithoutFinalKana(input, leading) || isInvalidMatcher(input, matchKanji)) {
	    return input;
	  }

	  var chars = matchKanji || input;
	  var okuriganaRegex = new RegExp(leading ? '^' + tokenize(chars).shift() : tokenize(chars).pop() + '$');
	  return input.replace(okuriganaRegex, '');
	}

	exports.bind = bind$1;
	exports.unbind = unbind;
	exports.isRomaji = isRomaji;
	exports.isJapanese = isJapanese;
	exports.isKana = isKana;
	exports.isHiragana = isHiragana;
	exports.isKatakana = isKatakana;
	exports.isMixed = isMixed;
	exports.isKanji = isKanji;
	exports.toRomaji = toRomaji;
	exports.toKana = toKana;
	exports.toHiragana = toHiragana;
	exports.toKatakana = toKatakana;
	exports.stripOkurigana = stripOkurigana;
	exports.tokenize = tokenize;
	exports.VERSION = VERSION;
	exports.TO_KANA_METHODS = TO_KANA_METHODS;
	exports.ROMANIZATIONS = ROMANIZATIONS;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
