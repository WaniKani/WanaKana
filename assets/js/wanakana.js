(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.wanakana = {}));
}(this, (exports) => {
  const commonjsGlobal =
    typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
    return (module = { exports: {} }), fn(module, module.exports), module.exports;
  }

  const _global = createCommonjsModule((module) => {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    const global = (module.exports =
      typeof window !== 'undefined' && window.Math == Math
        ? window
        : typeof self !== 'undefined' && self.Math == Math
          ? self
          : // eslint-disable-next-line no-new-func
          Function('return this')());
    if (typeof __g === 'number') __g = global; // eslint-disable-line no-undef
  });

  const _core = createCommonjsModule((module) => {
    const core = (module.exports = { version: '2.5.3' });
    if (typeof __e === 'number') __e = core; // eslint-disable-line no-undef
  });
  const _core_1 = _core.version;

  const _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  const _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(`${it} is not an object!`);
    return it;
  };

  const _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  const _descriptors = !_fails(() => (
    Object.defineProperty({}, 'a', {
      get() {
        return 7;
      },
    }).a != 7
  ));

  const document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  const is = _isObject(document$1) && _isObject(document$1.createElement);
  const _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  const _ie8DomDefine =
    !_descriptors &&
    !_fails(() => (
      Object.defineProperty(_domCreate('div'), 'a', {
        get() {
          return 7;
        },
      }).a != 7
    ));

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  const _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    let fn,
      val;
    if (S && typeof (fn = it.toString) === 'function' && !_isObject((val = fn.call(it)))) return val;
    if (typeof (fn = it.valueOf) === 'function' && !_isObject((val = fn.call(it)))) return val;
    if (!S && typeof (fn = it.toString) === 'function' && !_isObject((val = fn.call(it)))) { return val; }
    throw TypeError("Can't convert object to primitive value");
  };

  const dP = Object.defineProperty;

  const f = _descriptors
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
      _anObject(O);
      P = _toPrimitive(P, true);
      _anObject(Attributes);
      if (_ie8DomDefine) {
        try {
          return dP(O, P, Attributes);
        } catch (e) {
          /* empty */
        }
      }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

  const _objectDp = {
    f,
  };

  const _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value,
    };
  };

  const _hide = _descriptors
    ? function (object, key, value) {
      return _objectDp.f(object, key, _propertyDesc(1, value));
    }
    : function (object, key, value) {
      object[key] = value;
      return object;
    };

  const hasOwnProperty = {}.hasOwnProperty;
  const _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  let id = 0;
  const px = Math.random();
  const _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  const _redefine = createCommonjsModule((module) => {
    const SRC = _uid('src');
    const TO_STRING = 'toString';
    const $toString = Function[TO_STRING];
    const TPL = (`${$toString}`).split(TO_STRING);

    _core.inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      const isFunction = typeof val === 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) { _has(val, SRC) || _hide(val, SRC, O[key] ? `${O[key]}` : TPL.join(String(key))); }
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return (typeof this === 'function' && this[SRC]) || $toString.call(this);
    });
  });

  const _aFunction = function (it) {
    if (typeof it !== 'function') throw TypeError(`${it} is not a function!`);
    return it;
  };

  // optional / simple context binding

  const _ctx = function (fn, that, length) {
    _aFunction(fn);
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
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  const PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    const IS_FORCED = type & $export.F;
    const IS_GLOBAL = type & $export.G;
    const IS_STATIC = type & $export.S;
    const IS_PROTO = type & $export.P;
    const IS_BIND = type & $export.B;
    const target = IS_GLOBAL
      ? _global
      : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    const exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    const expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    let key,
      own,
      out,
      exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp =
        IS_BIND && own
          ? _ctx(out, _global)
          : IS_PROTO && typeof out === 'function' ? _ctx(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1; // forced
  $export.G = 2; // global
  $export.S = 4; // static
  $export.P = 8; // proto
  $export.B = 16; // bind
  $export.W = 32; // wrap
  $export.U = 64; // safe
  $export.R = 128; // real proto method for `library`
  const _export = $export;

  const TYPED = _uid('typed_array');
  const VIEW = _uid('view');
  const ABV = !!(_global.ArrayBuffer && _global.DataView);
  let CONSTR = ABV;
  let i = 0;
  const l = 9;
  let Typed;

  const TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(
    ','
  );

  while (i < l) {
    if ((Typed = _global[TypedArrayConstructors[i++]])) {
      _hide(Typed.prototype, TYPED, true);
      _hide(Typed.prototype, VIEW, true);
    } else CONSTR = false;
  }

  const _typed = {
    ABV,
    CONSTR,
    TYPED,
    VIEW,
  };

  const _library = false;

  const _redefineAll = function (target, src, safe) {
    for (const key in src) _redefine(target, key, src[key], safe);
    return target;
  };

  const _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(`${name}: incorrect invocation!`);
    }
    return it;
  };

  // 7.1.4 ToInteger
  const ceil = Math.ceil;
  const floor = Math.floor;
  const _toInteger = function (it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  const min = Math.min;
  const _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // https://tc39.github.io/ecma262/#sec-toindex

  const _toIndex = function (it) {
    if (it === undefined) return 0;
    const number = _toInteger(it);
    const length = _toLength(number);
    if (number !== length) throw RangeError('Wrong length!');
    return length;
  };

  const toString = {}.toString;

  const _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  const _iobject = Object('z').propertyIsEnumerable(0)
    ? Object
    : function (it) {
      return _cof(it) == 'String' ? it.split('') : Object(it);
    };

  // 7.2.1 RequireObjectCoercible(argument)
  const _defined = function (it) {
    if (it == undefined) throw TypeError(`Can't call method on  ${it}`);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings

  const _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  const max = Math.max;
  const min$1 = Math.min;
  const _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes

  const _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      const O = _toIobject($this);
      const length = _toLength(O.length);
      let index = _toAbsoluteIndex(fromIndex, length);
      let value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) {
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
      } else {
        for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }
      }
      return !IS_INCLUDES && -1;
    };
  };

  const SHARED = '__core-js_shared__';
  const store = _global[SHARED] || (_global[SHARED] = {});
  const _shared = function (key) {
    return store[key] || (store[key] = {});
  };

  const shared$1 = _shared('keys');

  const _sharedKey = function (key) {
    return shared$1[key] || (shared$1[key] = _uid(key));
  };

  const arrayIndexOf = _arrayIncludes(false);
  const IE_PROTO = _sharedKey('IE_PROTO');

  const _objectKeysInternal = function (object, names) {
    const O = _toIobject(object);
    let i = 0;
    const result = [];
    let key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) {
      if (_has(O, (key = names[i++]))) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    }
    return result;
  };

  // IE 8- don't enum bug keys
  const _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
    ','
  );

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  const hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  const f$1 =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return _objectKeysInternal(O, hiddenKeys);
    };

  const _objectGopn = {
    f: f$1,
  };

  // 7.1.13 ToObject(argument)

  const _toObject = function (it) {
    return Object(_defined(it));
  };

  const _arrayFill = function fill(value /* , start = 0, end = @length */) {
    const O = _toObject(this);
    const length = _toLength(O.length);
    const aLen = arguments.length;
    let index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
    const end = aLen > 2 ? arguments[2] : undefined;
    const endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  const _wks = createCommonjsModule((module) => {
    const store = _shared('wks');

    const Symbol = _global.Symbol;
    const USE_SYMBOL = typeof Symbol === 'function';

    const $exports = (module.exports = function (name) {
      return (
        store[name] ||
        (store[name] =
          (USE_SYMBOL && Symbol[name]) || (USE_SYMBOL ? Symbol : _uid)(`Symbol.${name}`))
      );
    });

    $exports.store = store;
  });

  const def = _objectDp.f;

  const TAG = _wks('toStringTag');

  const _setToStringTag = function (it, tag, stat) {
    if (it && !_has((it = stat ? it : it.prototype), TAG)) { def(it, TAG, { configurable: true, value: tag }); }
  };

  const _typedBuffer = createCommonjsModule((module, exports) => {
    const gOPN = _objectGopn.f;
    const dP = _objectDp.f;

    const ARRAY_BUFFER = 'ArrayBuffer';
    const DATA_VIEW = 'DataView';
    const PROTOTYPE = 'prototype';
    const WRONG_LENGTH = 'Wrong length!';
    const WRONG_INDEX = 'Wrong index!';
    let $ArrayBuffer = _global[ARRAY_BUFFER];
    let $DataView = _global[DATA_VIEW];
    const Math = _global.Math;
    const RangeError = _global.RangeError;
    // eslint-disable-next-line no-shadow-restricted-names
    const Infinity = _global.Infinity;
    const BaseBuffer = $ArrayBuffer;
    const abs = Math.abs;
    const pow = Math.pow;
    const floor = Math.floor;
    const log = Math.log;
    const LN2 = Math.LN2;
    const BUFFER = 'buffer';
    const BYTE_LENGTH = 'byteLength';
    const BYTE_OFFSET = 'byteOffset';
    const $BUFFER = _descriptors ? '_b' : BUFFER;
    const $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
    const $OFFSET = _descriptors ? '_o' : BYTE_OFFSET;

    // IEEE754 conversions based on https://github.com/feross/ieee754
    function packIEEE754(value, mLen, nBytes) {
      const buffer = new Array(nBytes);
      let eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      const rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      let i = 0;
      const s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
      let e,
        m,
        c;
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
          e += eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
      e = (e << mLen) | m;
      eLen += mLen;
      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
      buffer[--i] |= s * 128;
      return buffer;
    }
    function unpackIEEE754(buffer, mLen, nBytes) {
      const eLen = nBytes * 8 - mLen - 1;
      const eMax = (1 << eLen) - 1;
      const eBias = eMax >> 1;
      let nBits = eLen - 7;
      let i = nBytes - 1;
      let s = buffer[i--];
      let e = s & 127;
      let m;
      s >>= 7;
      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
      m = e & ((1 << -nBits) - 1);
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m += pow(2, mLen);
        e -= eBias;
      }
      return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    }
    function packI8(it) {
      return [it & 0xff];
    }
    function packI16(it) {
      return [it & 0xff, (it >> 8) & 0xff];
    }
    function packI32(it) {
      return [it & 0xff, (it >> 8) & 0xff, (it >> 16) & 0xff, (it >> 24) & 0xff];
    }
    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }
    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, {
        get() {
          return this[internal];
        },
      });
    }

    function get(view, bytes, index, isLittleEndian) {
      const numIndex = +index;
      const intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      const store = view[$BUFFER]._b;
      const start = intIndex + view[$OFFSET];
      const pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }
    function set(view, bytes, index, conversion, value, isLittleEndian) {
      const numIndex = +index;
      const intIndex = _toIndex(numIndex);
      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      const store = view[$BUFFER]._b;
      const start = intIndex + view[$OFFSET];
      const pack = conversion(+value);
      for (let i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
    }

    if (!_typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
        const byteLength = _toIndex(length);
        this._b = _arrayFill.call(new Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        _anInstance(this, $DataView, DATA_VIEW);
        _anInstance(buffer, $ArrayBuffer, DATA_VIEW);
        const bufferLength = buffer[$LENGTH];
        const offset = _toInteger(byteOffset);
        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (_descriptors) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      _redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return (get(this, 1, byteOffset)[0] << 24) >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset /* , littleEndian */) {
          const bytes = get(this, 2, byteOffset, arguments[1]);
          return (((bytes[1] << 8) | bytes[0]) << 16) >> 16;
        },
        getUint16: function getUint16(byteOffset /* , littleEndian */) {
          const bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8) | bytes[0];
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
        },
      });
    } else {
      if (
        !_fails(() => {
          $ArrayBuffer(1);
        }) ||
        !_fails(() => {
          new $ArrayBuffer(-1); // eslint-disable-line no-new
        }) ||
        _fails(() => {
          new $ArrayBuffer(); // eslint-disable-line no-new
          new $ArrayBuffer(1.5); // eslint-disable-line no-new
          new $ArrayBuffer(NaN); // eslint-disable-line no-new
          return $ArrayBuffer.name != ARRAY_BUFFER;
        })
      ) {
        $ArrayBuffer = function ArrayBuffer(length) {
          _anInstance(this, $ArrayBuffer);
          return new BaseBuffer(_toIndex(length));
        };
        const ArrayBufferProto = ($ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE]);
        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
        }
        if (!_library) ArrayBufferProto.constructor = $ArrayBuffer;
      }
      // iOS Safari 7.x bug
      const view = new $DataView(new $ArrayBuffer(2));
      const $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) {
        _redefineAll(
          $DataView[PROTOTYPE],
          {
            setInt8: function setInt8(byteOffset, value) {
              $setInt8.call(this, byteOffset, (value << 24) >> 24);
            },
            setUint8: function setUint8(byteOffset, value) {
              $setInt8.call(this, byteOffset, (value << 24) >> 24);
            },
          },
          true
        );
      }
    }
    _setToStringTag($ArrayBuffer, ARRAY_BUFFER);
    _setToStringTag($DataView, DATA_VIEW);
    _hide($DataView[PROTOTYPE], _typed.VIEW, true);
    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)

  const SPECIES = _wks('species');
  const _speciesConstructor = function (O, D) {
    const C = _anObject(O).constructor;
    let S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  const SPECIES$1 = _wks('species');

  const _setSpecies = function (KEY) {
    const C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) {
      _objectDp.f(C, SPECIES$1, {
        configurable: true,
        get() {
          return this;
        },
      });
    }
  };

  const ArrayBuffer = _global.ArrayBuffer;

  const $ArrayBuffer = _typedBuffer.ArrayBuffer;
  const $DataView = _typedBuffer.DataView;
  const $isView = _typed.ABV && ArrayBuffer.isView;
  const $slice = $ArrayBuffer.prototype.slice;
  const VIEW$1 = _typed.VIEW;
  const ARRAY_BUFFER = 'ArrayBuffer';

  _export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), {
    ArrayBuffer: $ArrayBuffer,
  });

  _export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
    // 24.1.3.1 ArrayBuffer.isView(arg)
    isView: function isView(it) {
      return ($isView && $isView(it)) || (_isObject(it) && VIEW$1 in it);
    },
  });

  _export(
    _export.P +
      _export.U +
      _export.F *
        _fails(() => !new $ArrayBuffer(2).slice(1, undefined).byteLength),
    ARRAY_BUFFER,
    {
      // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
      slice: function slice(start, end) {
        if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix
        const len = _anObject(this).byteLength;
        let first = _toAbsoluteIndex(start, len);
        const final = _toAbsoluteIndex(end === undefined ? len : end, len);
        const result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(final - first));
        const viewS = new $DataView(this);
        const viewT = new $DataView(result);
        let index = 0;
        while (first < final) {
          viewT.setUint8(index++, viewS.getUint8(first++));
        }
        return result;
      },
    }
  );

  _setSpecies(ARRAY_BUFFER);

  // getting tag from 19.1.3.6 Object.prototype.toString()

  const TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  const ARG =
    _cof(
      (function () {
        return arguments;
      })()
    ) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  const tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  const _classof = function (it) {
    let O,
      T,
      B;
    return it === undefined
      ? 'Undefined'
      : it === null
        ? 'Null'
        : // @@toStringTag case
        typeof (T = tryGet((O = Object(it)), TAG$1)) === 'string'
          ? T
          : // builtinTag case
          ARG
            ? _cof(O)
            : // ES3 arguments fallback
            (B = _cof(O)) == 'Object' && typeof O.callee === 'function' ? 'Arguments' : B;
  };

  const _iterators = {};

  // check on default Array iterator

  const ITERATOR = _wks('iterator');
  const ArrayProto = Array.prototype;

  const _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR] === it);
  };

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)

  const _objectKeys =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal(O, _enumBugKeys);
    };

  const _objectDps = _descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
      _anObject(O);
      const keys = _objectKeys(Properties);
      const length = keys.length;
      let i = 0;
      let P;
      while (length > i) _objectDp.f(O, (P = keys[i++]), Properties[P]);
      return O;
    };

  const document$2 = _global.document;
  const _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])

  const IE_PROTO$1 = _sharedKey('IE_PROTO');
  const Empty = function () {
    /* empty */
  };
  const PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    const iframe = _domCreate('iframe');
    let i = _enumBugKeys.length;
    const lt = '<';
    const gt = '>';
    let iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(`${lt}script${gt}document.F=Object${lt}/script${gt}`);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  const _objectCreate =
    Object.create ||
    function create(O, Properties) {
      let result;
      if (O !== null) {
        Empty[PROTOTYPE$1] = _anObject(O);
        result = new Empty();
        Empty[PROTOTYPE$1] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = createDict();
      return Properties === undefined ? result : _objectDps(result, Properties);
    };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)

  const IE_PROTO$2 = _sharedKey('IE_PROTO');
  const ObjectProto = Object.prototype;

  const _objectGpo =
    Object.getPrototypeOf ||
    function (O) {
      O = _toObject(O);
      if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
      if (typeof O.constructor === 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    };

  const ITERATOR$1 = _wks('iterator');

  const core_getIteratorMethod = (_core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || _iterators[_classof(it)];
  });

  // 7.2.2 IsArray(argument)

  const _isArray =
    Array.isArray ||
    function isArray(arg) {
      return _cof(arg) == 'Array';
    };

  const SPECIES$2 = _wks('species');

  const _arraySpeciesConstructor = function (original) {
    let C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C === 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)

  const _arraySpeciesCreate = function (original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex

  const _arrayMethods = function (TYPE, $create) {
    const IS_MAP = TYPE == 1;
    const IS_FILTER = TYPE == 2;
    const IS_SOME = TYPE == 3;
    const IS_EVERY = TYPE == 4;
    const IS_FIND_INDEX = TYPE == 6;
    const NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    const create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      const O = _toObject($this);
      const self = _iobject(O);
      const f = _ctx(callbackfn, that, 3);
      const length = _toLength(self.length);
      let index = 0;
      const result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      let val,
        res;
      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);
          if (TYPE) {
            if (IS_MAP) result[index] = res;
            else if (res)
            // map
            {
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return val; // find
                case 6:
                  return index; // findIndex
                case 2:
                  result.push(val); // filter
              }
            } else if (IS_EVERY) return false; // every
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  const UNSCOPABLES = _wks('unscopables');
  const ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
  const _addToUnscopables = function (key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  };

  const _iterStep = function (done, value) {
    return { value, done: !!done };
  };

  const IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () {
    return this;
  });

  const _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, `${NAME} Iterator`);
  };

  const ITERATOR$2 = _wks('iterator');
  const BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  const FF_ITERATOR = '@@iterator';
  const KEYS = 'keys';
  const VALUES = 'values';

  const returnThis = function () {
    return this;
  };

  const _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    const getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    const TAG = `${NAME} Iterator`;
    const DEF_VALUES = DEFAULT == VALUES;
    let VALUES_BUG = false;
    var proto = Base.prototype;
    const $native = proto[ITERATOR$2] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
    let $default = (!BUGGY && $native) || getMethod(DEFAULT);
    const $entries = DEFAULT ? (!DEF_VALUES ? $default : getMethod('entries')) : undefined;
    const $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    let methods,
      key,
      IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && !_has(IteratorPrototype, ITERATOR$2)) { _hide(IteratorPrototype, ITERATOR$2, returnThis); }
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$2])) {
      _hide(proto, ITERATOR$2, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries,
      };
      if (FORCED) {
        for (key in methods) {
          if (!(key in proto)) _redefine(proto, key, methods[key]);
        }
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  const es6_array_iterator = _iterDefine(
    Array,
    'Array',
    function (iterated, kind) {
      this._t = _toIobject(iterated); // target
      this._i = 0; // next index
      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },
    function () {
      const O = this._t;
      const kind = this._k;
      const index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep(1);
      }
      if (kind == 'keys') return _iterStep(0, index);
      if (kind == 'values') return _iterStep(0, O[index]);
      return _iterStep(0, [index, O[index]]);
    },
    'values'
  );

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  const ITERATOR$3 = _wks('iterator');
  let SAFE_CLOSING = false;

  try {
    const riter = [7][ITERATOR$3]();
    riter.return = function () {
      SAFE_CLOSING = true;
    };
  } catch (e) {
    /* empty */
  }

  const _iterDetect = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    let safe = false;
    try {
      const arr = [7];
      const iter = arr[ITERATOR$3]();
      iter.next = function () {
        return { done: (safe = true) };
      };
      arr[ITERATOR$3] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {
      /* empty */
    }
    return safe;
  };

  const _arrayCopyWithin =
    [].copyWithin ||
    function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
      const O = _toObject(this);
      const len = _toLength(O.length);
      let to = _toAbsoluteIndex(target, len);
      let from = _toAbsoluteIndex(start, len);
      const end = arguments.length > 2 ? arguments[2] : undefined;
      let count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
      let inc = 1;
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
      }
      return O;
    };

  const f$2 = {}.propertyIsEnumerable;

  const _objectPie = {
    f: f$2,
  };

  const gOPD = Object.getOwnPropertyDescriptor;

  const f$3 = _descriptors
    ? gOPD
    : function getOwnPropertyDescriptor(O, P) {
      O = _toIobject(O);
      P = _toPrimitive(P, true);
      if (_ie8DomDefine) {
        try {
          return gOPD(O, P);
        } catch (e) {
          /* empty */
        }
      }
      if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
    };

  const _objectGopd = {
    f: f$3,
  };

  const _typedArray = createCommonjsModule((module) => {
    if (_descriptors) {
      const LIBRARY = _library;
      const global = _global;
      const fails = _fails;
      const $export = _export;
      const $typed = _typed;
      const $buffer = _typedBuffer;
      const ctx = _ctx;
      const anInstance = _anInstance;
      const propertyDesc = _propertyDesc;
      const hide = _hide;
      const redefineAll = _redefineAll;
      const toInteger = _toInteger;
      const toLength = _toLength;
      const toIndex = _toIndex;
      const toAbsoluteIndex = _toAbsoluteIndex;
      const toPrimitive = _toPrimitive;
      const has = _has;
      const classof = _classof;
      const isObject = _isObject;
      const toObject = _toObject;
      const isArrayIter = _isArrayIter;
      const create = _objectCreate;
      const getPrototypeOf = _objectGpo;
      const gOPN = _objectGopn.f;
      const getIterFn = core_getIteratorMethod;
      const uid = _uid;
      const wks = _wks;
      const createArrayMethod = _arrayMethods;
      const createArrayIncludes = _arrayIncludes;
      const speciesConstructor = _speciesConstructor;
      const ArrayIterators = es6_array_iterator;
      const Iterators = _iterators;
      const $iterDetect = _iterDetect;
      const setSpecies = _setSpecies;
      const arrayFill = _arrayFill;
      const arrayCopyWithin = _arrayCopyWithin;
      const $DP = _objectDp;
      const $GOPD = _objectGopd;
      const dP = $DP.f;
      const gOPD = $GOPD.f;
      const RangeError = global.RangeError;
      const TypeError = global.TypeError;
      const Uint8Array = global.Uint8Array;
      const ARRAY_BUFFER = 'ArrayBuffer';
      const SHARED_BUFFER = `Shared${ARRAY_BUFFER}`;
      const BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
      const PROTOTYPE = 'prototype';
      const ArrayProto = Array[PROTOTYPE];
      const $ArrayBuffer = $buffer.ArrayBuffer;
      const $DataView = $buffer.DataView;
      const arrayForEach = createArrayMethod(0);
      const arrayFilter = createArrayMethod(2);
      const arraySome = createArrayMethod(3);
      const arrayEvery = createArrayMethod(4);
      const arrayFind = createArrayMethod(5);
      const arrayFindIndex = createArrayMethod(6);
      const arrayIncludes = createArrayIncludes(true);
      const arrayIndexOf = createArrayIncludes(false);
      const arrayValues = ArrayIterators.values;
      const arrayKeys = ArrayIterators.keys;
      const arrayEntries = ArrayIterators.entries;
      const arrayLastIndexOf = ArrayProto.lastIndexOf;
      const arrayReduce = ArrayProto.reduce;
      const arrayReduceRight = ArrayProto.reduceRight;
      const arrayJoin = ArrayProto.join;
      const arraySort = ArrayProto.sort;
      const arraySlice = ArrayProto.slice;
      let arrayToString = ArrayProto.toString;
      let arrayToLocaleString = ArrayProto.toLocaleString;
      const ITERATOR = wks('iterator');
      const TAG = wks('toStringTag');
      const TYPED_CONSTRUCTOR = uid('typed_constructor');
      const DEF_CONSTRUCTOR = uid('def_constructor');
      const ALL_CONSTRUCTORS = $typed.CONSTR;
      const TYPED_ARRAY = $typed.TYPED;
      const VIEW = $typed.VIEW;
      const WRONG_LENGTH = 'Wrong length!';

      const $map = createArrayMethod(1, (O, length) => allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length));

      const LITTLE_ENDIAN = fails(() =>
        // eslint-disable-next-line no-undef
        new Uint8Array(new Uint16Array([1]).buffer)[0] === 1
      );

      const FORCED_SET =
        !!Uint8Array &&
        !!Uint8Array[PROTOTYPE].set &&
        fails(() => {
          new Uint8Array(1).set({});
        });

      const toOffset = function (it, BYTES) {
        const offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      const validate = function (it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(`${it} is not a typed array!`);
      };

      var allocate = function (C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }
        return new C(length);
      };

      const speciesFromList = function (O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function (C, list) {
        let index = 0;
        const length = list.length;
        const result = allocate(C, length);
        while (length > index) result[index] = list[index++];
        return result;
      };

      const addGetter = function (it, key, internal) {
        dP(it, key, {
          get() {
            return this._d[internal];
          },
        });
      };

      const $from = function from(source /* , mapfn, thisArg */) {
        let O = toObject(source);
        const aLen = arguments.length;
        let mapfn = aLen > 1 ? arguments[1] : undefined;
        const mapping = mapfn !== undefined;
        const iterFn = getIterFn(O);
        let i,
          length,
          values,
          result,
          step,
          iterator;
        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }
          O = values;
        }
        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }
        return result;
      };

      const $of = function of(/* ...items */) {
        let index = 0;
        const length = arguments.length;
        const result = allocate(this, length);
        while (length > index) result[index] = arguments[index++];
        return result;
      };

      // iOS Safari 6.x fails here
      const TO_LOCALE_BUG =
        !!Uint8Array &&
        fails(() => {
          arrayToLocaleString.call(new Uint8Array(1));
        });

      const $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(
          TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this),
          arguments
        );
      };

      const proto = {
        copyWithin: function copyWithin(target, start /* , end */) {
          return arrayCopyWithin.call(
            validate(this),
            target,
            start,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        every: function every(callbackfn /* , thisArg */) {
          return arrayEvery(
            validate(this),
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        fill: function fill(value /* , start, end */) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn /* , thisArg */) {
          return speciesFromList(
            this,
            arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
          );
        },
        find: function find(predicate /* , thisArg */) {
          return arrayFind(
            validate(this),
            predicate,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        findIndex: function findIndex(predicate /* , thisArg */) {
          return arrayFindIndex(
            validate(this),
            predicate,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        forEach: function forEach(callbackfn /* , thisArg */) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement /* , fromIndex */) {
          return arrayIndexOf(
            validate(this),
            searchElement,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        includes: function includes(searchElement /* , fromIndex */) {
          return arrayIncludes(
            validate(this),
            searchElement,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn /* , thisArg */) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn /* , initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn /* , initialValue */) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          const that = this;
          let length = validate(that).length;
          const middle = Math.floor(length / 2);
          let index = 0;
          let value;
          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }
          return that;
        },
        some: function some(callbackfn /* , thisArg */) {
          return arraySome(
            validate(this),
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined
          );
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          const O = validate(this);
          const length = O.length;
          const $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
            O.buffer,
            O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
            toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
          );
        },
      };

      const $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      const $set = function set(arrayLike /* , offset */) {
        validate(this);
        const offset = toOffset(arguments[1], 1);
        const length = this.length;
        const src = toObject(arrayLike);
        const len = toLength(src.length);
        let index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);
        while (index < len) this[offset + index] = src[index++];
      };

      const $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        },
      };

      const isTAIndex = function (target, key) {
        return (
          isObject(target) &&
          target[TYPED_ARRAY] &&
          typeof key !== 'symbol' &&
          key in target &&
          String(+key) == String(key)
        );
      };
      const $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, (key = toPrimitive(key, true)))
          ? propertyDesc(2, target[key])
          : gOPD(target, key);
      };
      const $setDesc = function defineProperty(target, key, desc) {
        if (
          isTAIndex(target, (key = toPrimitive(key, true))) &&
          isObject(desc) &&
          has(desc, 'value') &&
          !has(desc, 'get') &&
          !has(desc, 'set') &&
          // TODO: add validation descriptor w/o calling accessors
          !desc.configurable &&
          (!has(desc, 'writable') || desc.writable) &&
          (!has(desc, 'enumerable') || desc.enumerable)
        ) {
          target[key] = desc.value;
          return target;
        }
        return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc,
      });

      if (
        fails(() => {
          arrayToString.call({});
        })
      ) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      const $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor() {
          /* noop */
        },
        toString: arrayToString,
        toLocaleString: $toLocaleString,
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get() {
          return this[TYPED_ARRAY];
        },
      });

      // eslint-disable-next-line max-statements
      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        const NAME = `${KEY + (CLAMPED ? 'Clamped' : '')}Array`;
        const GETTER = `get${KEY}`;
        const SETTER = `set${KEY}`;
        let TypedArray = global[NAME];
        const Base = TypedArray || {};
        const TAC = TypedArray && getPrototypeOf(TypedArray);
        const FORCED = !TypedArray || !$typed.ABV;
        const O = {};
        let TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
        const getter = function (that, index) {
          const data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };
        const setter = function (that, index, value) {
          const data = that._d;
          if (CLAMPED) { value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff; }
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };
        const addElement = function (that, index) {
          dP(that, index, {
            get() {
              return getter(this, index);
            },
            set(value) {
              return setter(this, index, value);
            },
            enumerable: true,
          });
        };
        if (FORCED) {
          TypedArray = wrapper((that, data, $offset, $length) => {
            anInstance(that, TypedArray, NAME, '_d');
            let index = 0;
            let offset = 0;
            let buffer,
              byteLength,
              length,
              klass;
            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (
              data instanceof $ArrayBuffer ||
              (klass = classof(data)) == ARRAY_BUFFER ||
              klass == SHARED_BUFFER
            ) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              const $len = data.byteLength;
              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
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
              v: new $DataView(buffer),
            });
            while (index < length) addElement(that, index++);
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (
          !fails(() => {
            TypedArray(1);
          }) ||
          !fails(() => {
            new TypedArray(-1); // eslint-disable-line no-new
          }) ||
          !$iterDetect((iter) => {
            new TypedArray(); // eslint-disable-line no-new
            new TypedArray(null); // eslint-disable-line no-new
            new TypedArray(1.5); // eslint-disable-line no-new
            new TypedArray(iter); // eslint-disable-line no-new
          }, true)
        ) {
          TypedArray = wrapper((that, data, $offset, $length) => {
            anInstance(that, TypedArray, NAME);
            let klass;
            // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645
            if (!isObject(data)) return new Base(toIndex(data));
            if (
              data instanceof $ArrayBuffer ||
              (klass = classof(data)) == ARRAY_BUFFER ||
              klass == SHARED_BUFFER
            ) {
              return $length !== undefined
                ? new Base(data, toOffset($offset, BYTES), $length)
                : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }
            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(
            TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base),
            (key) => {
              if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
            }
          );
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }
        const $nativeIterator = TypedArrayPrototype[ITERATOR];
        const CORRECT_ITER_NAME =
          !!$nativeIterator &&
          ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
        const $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get() {
              return NAME;
            },
          });
        }

        O[NAME] = TypedArray;

        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES,
        });

        $export(
          $export.S +
            $export.F *
              fails(() => {
                Base.of.call(TypedArray, 1);
              }),
          NAME,
          {
            from: $from,
            of: $of,
          }
        );

        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) { hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES); }

        $export($export.P, NAME, proto);

        setSpecies(NAME);

        $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) { TypedArrayPrototype.toString = arrayToString; }

        $export(
          $export.P +
            $export.F *
              fails(() => {
                new TypedArray(1).slice();
              }),
          NAME,
          { slice: $slice }
        );

        $export(
          $export.P +
            $export.F *
              (fails(() => [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()) ||
                !fails(() => {
                  TypedArrayPrototype.toLocaleString.call([1, 2]);
                })),
          NAME,
          { toLocaleString: $toLocaleString }
        );

        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else {
      module.exports = function () {
      /* empty */
      };
    }
  });

  _typedArray('Int8', 1, (init) => function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Uint8', 1, (init) => function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray(
    'Uint8',
    1,
    (init) => function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    },
    true
  );

  _typedArray('Int16', 2, (init) => function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Uint16', 2, (init) => function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Int32', 4, (init) => function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Uint32', 4, (init) => function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Float32', 4, (init) => function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  _typedArray('Float64', 8, (init) => function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  });

  // call something on iterator step with safe closing on error

  const _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      const ret = iterator.return;
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  const _forOf = createCommonjsModule((module) => {
    const BREAK = {};
    const RETURN = {};
    const exports = (module.exports = function (iterable, entries, fn, that, ITERATOR) {
      const iterFn = ITERATOR
        ? function () {
          return iterable;
        }
        : core_getIteratorMethod(iterable);
      const f = _ctx(fn, that, entries ? 2 : 1);
      let index = 0;
      let length,
        step,
        iterator,
        result;
      if (typeof iterFn !== 'function') throw TypeError(`${iterable} is not iterable!`);
      // fast case for arrays with default iterator
      if (_isArrayIter(iterFn)) {
        for (length = _toLength(iterable.length); length > index; index++) {
          result = entries
            ? f(_anObject((step = iterable[index]))[0], step[1])
            : f(iterable[index]);
          if (result === BREAK || result === RETURN) return result;
        }
      } else {
        for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
          result = _iterCall(iterator, f, step.value, entries);
          if (result === BREAK || result === RETURN) return result;
        }
      }
    });
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  const _meta = createCommonjsModule((module) => {
    const META = _uid('meta');

    const setDesc = _objectDp.f;
    let id = 0;
    const isExtensible =
      Object.isExtensible ||
      function () {
        return true;
      };
    const FREEZE = !_fails(() => isExtensible(Object.preventExtensions({})));
    const setMeta = function (it) {
      setDesc(it, META, {
        value: {
          i: `O${++id}`, // object ID
          w: {}, // weak collections IDs
        },
      });
    };
    const fastKey = function (it, create) {
      // return primitive with prefix
      if (!_isObject(it)) { return typeof it === 'symbol' ? it : (typeof it === 'string' ? 'S' : 'P') + it; }
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMeta(it);
        // return object ID
      }
      return it[META].i;
    };
    const getWeak = function (it, create) {
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMeta(it);
        // return hash weak collections IDs
      }
      return it[META].w;
    };
    // add metadata on freeze-family methods calling
    const onFreeze = function (it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };
    var meta = (module.exports = {
      KEY: META,
      NEED: false,
      fastKey,
      getWeak,
      onFreeze,
    });
  });
  const _meta_1 = _meta.KEY;
  const _meta_2 = _meta.NEED;
  const _meta_3 = _meta.fastKey;
  const _meta_4 = _meta.getWeak;
  const _meta_5 = _meta.onFreeze;

  const _validateCollection = function (it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) { throw TypeError(`Incompatible receiver, ${TYPE} required!`); }
    return it;
  };

  const dP$1 = _objectDp.f;

  const fastKey = _meta.fastKey;

  const SIZE = _descriptors ? '_s' : 'size';

  const getEntry = function (that, key) {
    // fast case
    const index = fastKey(key);
    let entry;
    if (index !== 'F') return that._i[index];
    // frozen object case
    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  const _collectionStrong = {
    getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper((that, iterable) => {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = _objectCreate(null); // index
        that._f = undefined; // first entry
        that._l = undefined; // last entry
        that[SIZE] = 0; // size
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (
            var that = _validateCollection(this, NAME), data = that._i, entry = that._f;
            entry;
            entry = entry.n
          ) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }
          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        delete(key) {
          const that = _validateCollection(this, NAME);
          const entry = getEntry(that, key);
          if (entry) {
            const next = entry.n;
            const prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          }
          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          _validateCollection(this, NAME);
          const f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          let entry;
          while ((entry = entry ? entry.n : this._f)) {
            f(entry.v, entry.k, this);
            // revert to the last existing entry
            while (entry && entry.r) entry = entry.p;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(_validateCollection(this, NAME), key);
        },
      });
      if (_descriptors) {
        dP$1(C.prototype, 'size', {
          get() {
            return _validateCollection(this, NAME)[SIZE];
          },
        });
      }
      return C;
    },
    def(that, key, value) {
      let entry = getEntry(that, key);
      let prev,
        index;
      // change existing entry
      if (entry) {
        entry.v = value;
        // create new entry
      } else {
        that._l = entry = {
          i: (index = fastKey(key, true)), // <- index
          k: key, // <- key
          v: value, // <- value
          p: (prev = that._l), // <- previous entry
          n: undefined, // <- next entry
          r: false, // <- removed
        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++;
        // add to index
        if (index !== 'F') that._i[index] = entry;
      }
      return that;
    },
    getEntry,
    setStrong(C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(
        C,
        NAME,
        function (iterated, kind) {
          this._t = _validateCollection(iterated, NAME); // target
          this._k = kind; // kind
          this._l = undefined; // previous
        },
        function () {
          const that = this;
          const kind = that._k;
          let entry = that._l;
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
          // get next entry
          if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
            // or finish the iteration
            that._t = undefined;
            return _iterStep(1);
          }
          // return step by kind
          if (kind == 'keys') return _iterStep(0, entry.k);
          if (kind == 'values') return _iterStep(0, entry.v);
          return _iterStep(0, [entry.k, entry.v]);
        },
        IS_MAP ? 'entries' : 'values',
        !IS_MAP,
        true
      );

      // add [@@species], 23.1.2.2, 23.2.2.2
      _setSpecies(NAME);
    },
  };

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */

  const check = function (O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(`${proto}: can't set as prototype!`);
  };
  const _setProto = {
    set:
      Object.setPrototypeOf ||
      ('__proto__' in {} // eslint-disable-line
        ? (function (test, buggy, set) {
          try {
            set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
            set(test, []);
            buggy = !(test instanceof Array);
          } catch (e) {
            buggy = true;
          }
          return function setPrototypeOf(O, proto) {
            check(O, proto);
            if (buggy) O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }({}, false))
        : undefined),
    check,
  };

  const setPrototypeOf = _setProto.set;
  const _inheritIfRequired = function (that, target, C) {
    const S = target.constructor;
    let P;
    if (
      S !== C &&
      typeof S === 'function' &&
      (P = S.prototype) !== C.prototype &&
      _isObject(P) &&
      setPrototypeOf
    ) {
      setPrototypeOf(that, P);
    }
    return that;
  };

  const _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    const Base = _global[NAME];
    let C = Base;
    const ADDER = IS_MAP ? 'set' : 'add';
    const proto = C && C.prototype;
    const O = {};
    const fixMethod = function (KEY) {
      const fn = proto[KEY];
      _redefine(
        proto,
        KEY,
        KEY == 'delete'
          ? function (a) {
            return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
          }
          : KEY == 'has'
            ? function has(a) {
              return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
            }
            : KEY == 'get'
              ? function get(a) {
                return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
              }
              : KEY == 'add'
                ? function add(a) {
                  fn.call(this, a === 0 ? 0 : a);
                  return this;
                }
                : function set(a, b) {
                  fn.call(this, a === 0 ? 0 : a, b);
                  return this;
                }
      );
    };
    if (
      typeof C !== 'function' ||
      !(
        IS_WEAK ||
        (proto.forEach &&
          !_fails(() => {
            new C().entries().next();
          }))
      )
    ) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      _redefineAll(C.prototype, methods);
      _meta.NEED = true;
    } else {
      const instance = new C();
      // early implementations not supports chaining
      const HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      const THROWS_ON_PRIMITIVES = _fails(() => {
        instance.has(1);
      });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      const ACCEPT_ITERABLES = _iterDetect((iter) => {
        new C(iter);
      }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      const BUGGY_ZERO =
        !IS_WEAK &&
        _fails(() => {
          // V8 ~ Chromium 42- fails only with 5+ elements
          const $instance = new C();
          let index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });
      if (!ACCEPT_ITERABLES) {
        C = wrapper((target, iterable) => {
          _anInstance(target, C, NAME);
          const that = _inheritIfRequired(new Base(), target, C);
          if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
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

    _setToStringTag(C, NAME);

    O[NAME] = C;
    _export(_export.G + _export.W + _export.F * (C != Base), O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

    return C;
  };

  const MAP = 'Map';

  // 23.1 Map Objects
  const es6_map = _collection(
    MAP,
    (get) => function Map() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    },
    {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        const entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
        return entry && entry.v;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
      },
    },
    _collectionStrong,
    true
  );

  const SET = 'Set';

  // 23.2 Set Objects
  const es6_set = _collection(
    SET,
    (get) => function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    },
    {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return _collectionStrong.def(
          _validateCollection(this, SET),
          (value = value === 0 ? 0 : value),
          value
        );
      },
    },
    _collectionStrong
  );

  const f$4 = Object.getOwnPropertySymbols;

  const _objectGops = {
    f: f$4,
  };

  // 19.1.2.1 Object.assign(target, source, ...)

  const $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  const _objectAssign =
    !$assign ||
    _fails(() => {
      const A = {};
      const B = {};
      // eslint-disable-next-line no-undef
      const S = Symbol();
      const K = 'abcdefghijklmnopqrst';
      A[S] = 7;
      K.split('').forEach((k) => {
        B[k] = k;
      });
      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    })
      ? function assign(target, source) {
        // eslint-disable-line no-unused-vars
        const T = _toObject(target);
        const aLen = arguments.length;
        let index = 1;
        const getSymbols = _objectGops.f;
        const isEnum = _objectPie.f;
        while (aLen > index) {
          const S = _iobject(arguments[index++]);
          const keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
          const length = keys.length;
          let j = 0;
          var key;
          while (length > j) if (isEnum.call(S, (key = keys[j++]))) T[key] = S[key];
        }
        return T;
      }
      : $assign;

  const getWeak = _meta.getWeak;

  const arrayFind = _arrayMethods(5);
  const arrayFindIndex = _arrayMethods(6);
  let id$1 = 0;

  // fallback for uncaught frozen keys
  const uncaughtFrozenStore = function (that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };
  var UncaughtFrozenStore = function () {
    this.a = [];
  };
  const findUncaughtFrozen = function (store, key) {
    return arrayFind(store.a, (it) => it[0] === key);
  };
  UncaughtFrozenStore.prototype = {
    get(key) {
      const entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has(key) {
      return !!findUncaughtFrozen(this, key);
    },
    set(key, value) {
      const entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.a.push([key, value]);
    },
    delete(key) {
      const index = arrayFindIndex(this.a, (it) => it[0] === key);
      if (~index) this.a.splice(index, 1);
      return !!~index;
    },
  };

  const _collectionWeak = {
    getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper((that, iterable) => {
        _anInstance(that, C, NAME, '_i');
        that._t = NAME; // collection type
        that._i = id$1++; // collection id
        that._l = undefined; // leak store for uncaught frozen objects
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });
      _redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        delete(key) {
          if (!_isObject(key)) return false;
          const data = getWeak(key);
          if (data === true) { return uncaughtFrozenStore(_validateCollection(this, NAME)).delete(key); }
          return data && _has(data, this._i) && delete data[this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          if (!_isObject(key)) return false;
          const data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
          return data && _has(data, this._i);
        },
      });
      return C;
    },
    def(that, key, value) {
      const data = getWeak(_anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);
      else data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore,
  };

  const es6_weakMap = createCommonjsModule((module) => {
    const each = _arrayMethods(0);

    const WEAK_MAP = 'WeakMap';
    const getWeak = _meta.getWeak;
    const isExtensible = Object.isExtensible;
    const uncaughtFrozenStore = _collectionWeak.ufstore;
    const tmp = {};
    let InternalMap;

    const wrapper = function (get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    const methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (_isObject(key)) {
          const data = getWeak(key);
          if (data === true) { return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key); }
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
      },
    };

    // 23.3 WeakMap Objects
    const $WeakMap = (module.exports = _collection(
      WEAK_MAP,
      wrapper,
      methods,
      _collectionWeak,
      true,
      true
    ));

    // IE11 WeakMap frozen keys fix
    if (
      _fails(() => new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7)
    ) {
      InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
      _objectAssign(InternalMap.prototype, methods);
      _meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], (key) => {
        const proto = $WeakMap.prototype;
        const method = proto[key];
        _redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (_isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();
            const result = this._f[key](a, b);
            return key == 'set' ? this : result;
            // store all the rest on native weakmap
          }
          return method.call(this, a, b);
        });
      });
    }
  });

  const WEAK_SET = 'WeakSet';

  // 23.4 WeakSet Objects
  _collection(
    WEAK_SET,
    (get) => function WeakSet() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    },
    {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
      },
    },
    _collectionWeak,
    false,
    true
  );

  // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)

  const rApply = (_global.Reflect || {}).apply;
  const fApply = Function.apply;
  // MS Edge argumentsList argument is optional
  _export(
    _export.S +
      _export.F *
        !_fails(() => {
      rApply(() => {
        /* empty */
      });
    }),
    'Reflect',
    {
      apply: function apply(target, thisArgument, argumentsList) {
        const T = _aFunction(target);
        const L = _anObject(argumentsList);
        return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
      },
    }
  );

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  const _invoke = function (fn, args, that) {
    const un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un
          ? fn(args[0], args[1], args[2], args[3])
          : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };

  const arraySlice = [].slice;
  const factories = {};

  const construct = function (F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) n[i] = `a[${i}]`;
      // eslint-disable-next-line no-new-func
      factories[len] = Function('F,a', `return new F(${n.join(',')})`);
    }
    return factories[len](F, args);
  };

  const _bind =
    Function.bind ||
    function bind(that /* , ...args */) {
      const fn = _aFunction(this);
      const partArgs = arraySlice.call(arguments, 1);
      var bound = function (/* args... */) {
        const args = partArgs.concat(arraySlice.call(arguments));
        return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
      };
      if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
      return bound;
    };

  // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])

  const rConstruct = (_global.Reflect || {}).construct;

  // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it
  const NEW_TARGET_BUG = _fails(() => {
    function F() {
      /* empty */
    }
    return !(
      rConstruct(
        () => {
          /* empty */
        },
        [],
        F
      ) instanceof F
    );
  });
  const ARGS_BUG = !_fails(() => {
    rConstruct(() => {
      /* empty */
    });
  });

  _export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
    construct: function construct(Target, args /* , newTarget */) {
      _aFunction(Target);
      _anObject(args);
      const newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();
          case 1:
            return new Target(args[0]);
          case 2:
            return new Target(args[0], args[1]);
          case 3:
            return new Target(args[0], args[1], args[2]);
          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        }
        // w/o altered newTarget, lot of arguments case
        const $args = [null];
        $args.push(...args);
        return new (_bind.apply(Target, $args))();
      }
      // with altered newTarget, not support built-in constructors
      const proto = newTarget.prototype;
      const instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
      const result = Function.apply.call(Target, instance, args);
      return _isObject(result) ? result : instance;
    },
  });

  // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)

  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
  _export(
    _export.S +
      _export.F *
        _fails(() => {
          // eslint-disable-next-line no-undef
          Reflect.defineProperty(_objectDp.f({}, 1, { value: 1 }), 1, { value: 2 });
        }),
    'Reflect',
    {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        _anObject(target);
        propertyKey = _toPrimitive(propertyKey, true);
        _anObject(attributes);
        try {
          _objectDp.f(target, propertyKey, attributes);
          return true;
        } catch (e) {
          return false;
        }
      },
    }
  );

  // 26.1.4 Reflect.deleteProperty(target, propertyKey)

  const gOPD$2 = _objectGopd.f;

  _export(_export.S, 'Reflect', {
    deleteProperty: function deleteProperty(target, propertyKey) {
      const desc = gOPD$2(_anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
  });

  // 26.1.6 Reflect.get(target, propertyKey [, receiver])

  function get(target, propertyKey /* , receiver */) {
    const receiver = arguments.length < 3 ? target : arguments[2];
    let desc,
      proto;
    if (_anObject(target) === receiver) return target[propertyKey];
    if ((desc = _objectGopd.f(target, propertyKey))) {
      return _has(desc, 'value')
        ? desc.value
        : desc.get !== undefined ? desc.get.call(receiver) : undefined;
    }
    if (_isObject((proto = _objectGpo(target)))) return get(proto, propertyKey, receiver);
  }

  _export(_export.S, 'Reflect', { get });

  // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)

  _export(_export.S, 'Reflect', {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return _objectGopd.f(_anObject(target), propertyKey);
    },
  });

  // 26.1.8 Reflect.getPrototypeOf(target)

  _export(_export.S, 'Reflect', {
    getPrototypeOf: function getPrototypeOf(target) {
      return _objectGpo(_anObject(target));
    },
  });

  // 26.1.9 Reflect.has(target, propertyKey)

  _export(_export.S, 'Reflect', {
    has: function has(target, propertyKey) {
      return propertyKey in target;
    },
  });

  // 26.1.10 Reflect.isExtensible(target)

  const $isExtensible = Object.isExtensible;

  _export(_export.S, 'Reflect', {
    isExtensible: function isExtensible(target) {
      _anObject(target);
      return $isExtensible ? $isExtensible(target) : true;
    },
  });

  // all object keys, includes non-enumerable and symbols

  const Reflect$1 = _global.Reflect;
  const _ownKeys =
    (Reflect$1 && Reflect$1.ownKeys) ||
    function ownKeys(it) {
      const keys = _objectGopn.f(_anObject(it));
      const getSymbols = _objectGops.f;
      return getSymbols ? keys.concat(getSymbols(it)) : keys;
    };

  // 26.1.11 Reflect.ownKeys(target)

  _export(_export.S, 'Reflect', { ownKeys: _ownKeys });

  // 26.1.12 Reflect.preventExtensions(target)

  const $preventExtensions = Object.preventExtensions;

  _export(_export.S, 'Reflect', {
    preventExtensions: function preventExtensions(target) {
      _anObject(target);
      try {
        if ($preventExtensions) $preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    },
  });

  // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])

  function set(target, propertyKey, V /* , receiver */) {
    const receiver = arguments.length < 4 ? target : arguments[3];
    let ownDesc = _objectGopd.f(_anObject(target), propertyKey);
    let existingDescriptor,
      proto;
    if (!ownDesc) {
      if (_isObject((proto = _objectGpo(target)))) {
        return set(proto, propertyKey, V, receiver);
      }
      ownDesc = _propertyDesc(0);
    }
    if (_has(ownDesc, 'value')) {
      if (ownDesc.writable === false || !_isObject(receiver)) return false;
      existingDescriptor = _objectGopd.f(receiver, propertyKey) || _propertyDesc(0);
      existingDescriptor.value = V;
      _objectDp.f(receiver, propertyKey, existingDescriptor);
      return true;
    }
    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }

  _export(_export.S, 'Reflect', { set });

  // 26.1.14 Reflect.setPrototypeOf(target, proto)

  if (_setProto) {
    _export(_export.S, 'Reflect', {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        _setProto.check(target, proto);
        try {
          _setProto.set(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      },
    });
  }

  const process = _global.process;
  let setTask = _global.setImmediate;
  let clearTask = _global.clearImmediate;
  const MessageChannel = _global.MessageChannel;
  const Dispatch = _global.Dispatch;
  let counter = 0;
  const queue = {};
  const ONREADYSTATECHANGE = 'onreadystatechange';
  let defer,
    channel,
    port;
  const run = function () {
    const id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      const fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  const listener = function (event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      const args = [];
      let i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn === 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process) == 'process') {
      defer = function (id) {
        process.nextTick(_ctx(run, id, 1));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(_ctx(run, id, 1));
      };
      // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      _global.addEventListener &&
      typeof postMessage === 'function' &&
      !_global.importScripts
    ) {
      defer = function (id) {
        _global.postMessage(`${id}`, '*');
      };
      _global.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function (id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  const _task = {
    set: setTask,
    clear: clearTask,
  };

  const macrotask = _task.set;
  const Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  const process$1 = _global.process;
  const Promise$1 = _global.Promise;
  const isNode = _cof(process$1) == 'process';

  const _microtask = function () {
    let head,
      last,
      notify;

    const flush = function () {
      let parent,
        fn;
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
      }
      last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode) {
      notify = function () {
        process$1.nextTick(flush);
      };
      // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      let toggle = true;
      const node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      const promise = Promise$1.resolve();
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
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      const task = { fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)

  function PromiseCapability(C) {
    let resolve,
      reject;
    this.promise = new C((($$resolve, $$reject) => {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    }));
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  const f$5 = function (C) {
    return new PromiseCapability(C);
  };

  const _newPromiseCapability = {
    f: f$5,
  };

  const _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  const _promiseResolve = function (C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    const promiseCapability = _newPromiseCapability.f(C);
    const resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  const task = _task.set;
  const microtask = _microtask();

  const PROMISE = 'Promise';
  const TypeError$1 = _global.TypeError;
  const process$2 = _global.process;
  let $Promise = _global[PROMISE];
  const isNode$1 = _classof(process$2) == 'process';
  const empty = function () {
    /* empty */
  };
  let Internal,
    newGenericPromiseCapability,
    OwnPromiseCapability,
    Wrapper;
  let newPromiseCapability$1 = (newGenericPromiseCapability = _newPromiseCapability.f);

  const USE_NATIVE = !!(function () {
    try {
      // correct subclassing with @@species support
      const promise = $Promise.resolve(1);
      const FakePromise = ((promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      });
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (
        (isNode$1 || typeof PromiseRejectionEvent === 'function') &&
        promise.then(empty) instanceof FakePromise
      );
    } catch (e) {
      /* empty */
    }
  }());

  // helpers
  const isThenable = function (it) {
    let then;
    return _isObject(it) && typeof (then = it.then) === 'function' ? then : false;
  };
  const notify = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    const chain = promise._c;
    microtask(() => {
      const value = promise._v;
      const ok = promise._s == 1;
      let i = 0;
      const run = function (reaction) {
        const handler = ok ? reaction.ok : reaction.fail;
        const resolve = reaction.resolve;
        const reject = reaction.reject;
        const domain = reaction.domain;
        let result,
          then;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value);
              if (domain) domain.exit();
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if ((then = isThenable(result))) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
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
    task.call(_global, () => {
      const value = promise._v;
      const unhandled = isUnhandled(promise);
      let result,
        handler,
        console;
      if (unhandled) {
        result = _perform(() => {
          if (isNode$1) {
            process$2.emit('unhandledRejection', value, promise);
          } else if ((handler = _global.onunhandledrejection)) {
            handler({ promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      }
      promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(_global, () => {
      let handler;
      if (isNode$1) {
        process$2.emit('rejectionHandled', promise);
      } else if ((handler = _global.onrejectionhandled)) {
        handler({ promise, reason: promise._v });
      }
    });
  };
  const $reject = function (value) {
    let promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function (value) {
    let promise = this;
    let then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if ((then = isThenable(value))) {
        microtask(() => {
          const wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
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
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);
      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = []; // <- awaiting reactions
      this._a = undefined; // <- checked in isUnhandled reactions
      this._s = 0; // <- state
      this._d = false; // <- done
      this._v = undefined; // <- value
      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false; // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        const reaction = newPromiseCapability$1(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled === 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected === 'function' && onRejected;
        reaction.domain = isNode$1 ? process$2.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      catch(onRejected) {
        return this.then(undefined, onRejected);
      },
    });
    OwnPromiseCapability = function () {
      const promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability$1 = function (C) {
      return C === $Promise || C === Wrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      const capability = newPromiseCapability$1(this);
      const $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    },
  });
  _export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
    },
  });
  _export(
    _export.S +
      _export.F *
        !(
      USE_NATIVE &&
          _iterDetect((iter) => {
            $Promise.all(iter).catch(empty);
          })
    ),
    PROMISE,
    {
      // 25.4.4.1 Promise.all(iterable)
      all: function all(iterable) {
        const C = this;
        const capability = newPromiseCapability$1(C);
        const resolve = capability.resolve;
        const reject = capability.reject;
        const result = _perform(() => {
          const values = [];
          let index = 0;
          let remaining = 1;
          _forOf(iterable, false, (promise) => {
            const $index = index++;
            let alreadyCalled = false;
            values.push(undefined);
            remaining++;
            C.resolve(promise).then((value) => {
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
        const C = this;
        const capability = newPromiseCapability$1(C);
        const reject = capability.reject;
        const result = _perform(() => {
          _forOf(iterable, false, (promise) => {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (result.e) reject(result.v);
        return capability.promise;
      },
    }
  );

  const f$6 = _wks;

  const _wksExt = {
    f: f$6,
  };

  const defineProperty = _objectDp.f;
  const _wksDefine = function (name) {
    const $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) { defineProperty($Symbol, name, { value: _wksExt.f(name) }); }
  };

  // all enumerable object keys, includes symbols

  const _enumKeys = function (it) {
    const result = _objectKeys(it);
    const getSymbols = _objectGops.f;
    if (getSymbols) {
      const symbols = getSymbols(it);
      const isEnum = _objectPie.f;
      let i = 0;
      let key;
      while (symbols.length > i) if (isEnum.call(it, (key = symbols[i++]))) result.push(key);
    }
    return result;
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  const gOPN = _objectGopn.f;
  const toString$1 = {}.toString;

  const windowNames =
    typeof window === 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window)
      : [];

  const getWindowNames = function (it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  const f$7 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]'
      ? getWindowNames(it)
      : gOPN(_toIobject(it));
  };

  const _objectGopnExt = {
    f: f$7,
  };

  // ECMAScript 6 symbols shim

  const META = _meta.KEY;

  const gOPD$3 = _objectGopd.f;
  const dP$2 = _objectDp.f;
  const gOPN$1 = _objectGopnExt.f;
  let $Symbol = _global.Symbol;
  const $JSON = _global.JSON;
  const _stringify = $JSON && $JSON.stringify;
  const PROTOTYPE$2 = 'prototype';
  const HIDDEN = _wks('_hidden');
  const TO_PRIMITIVE = _wks('toPrimitive');
  const isEnum = {}.propertyIsEnumerable;
  const SymbolRegistry = _shared('symbol-registry');
  const AllSymbols = _shared('symbols');
  const OPSymbols = _shared('op-symbols');
  const ObjectProto$1 = Object[PROTOTYPE$2];
  const USE_NATIVE$1 = typeof $Symbol === 'function';
  const QObject = _global.QObject;
  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  let setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  const setSymbolDesc =
    _descriptors &&
    _fails(() => (
      _objectCreate(
        dP$2({}, 'a', {
          get() {
            return dP$2(this, 'a', { value: 7 }).a;
          },
        })
      ).a != 7
    ))
      ? function (it, key, D) {
        const protoDesc = gOPD$3(ObjectProto$1, key);
        if (protoDesc) delete ObjectProto$1[key];
        dP$2(it, key, D);
        if (protoDesc && it !== ObjectProto$1) dP$2(ObjectProto$1, key, protoDesc);
      }
      : dP$2;

  const wrap = function (tag) {
    const sym = (AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]));
    sym._k = tag;
    return sym;
  };

  const isSymbol =
    USE_NATIVE$1 && typeof $Symbol.iterator === 'symbol'
      ? function (it) {
        return typeof it === 'symbol';
      }
      : function (it) {
        return it instanceof $Symbol;
      };

  var $defineProperty$1 = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$2(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
      }
      return setSymbolDesc(it, key, D);
    }
    return dP$2(it, key, D);
  };
  const $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    const keys = _enumKeys((P = _toIobject(P)));
    let i = 0;
    const l = keys.length;
    let key;
    while (l > i) $defineProperty$1(it, (key = keys[i++]), P[key]);
    return it;
  };
  const $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };
  const $propertyIsEnumerable = function propertyIsEnumerable(key) {
    const E = isEnum.call(this, (key = _toPrimitive(key, true)));
    if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E ||
      !_has(this, key) ||
      !_has(AllSymbols, key) ||
      (_has(this, HIDDEN) && this[HIDDEN][key])
      ? E
      : true;
  };
  const $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    const D = gOPD$3(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };
  const $getOwnPropertyNames = function getOwnPropertyNames(it) {
    const names = gOPN$1(_toIobject(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (!_has(AllSymbols, (key = names[i++])) && key != HIDDEN && key != META) result.push(key);
    }
    return result;
  };
  const $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    const IS_OP = it === ObjectProto$1;
    const names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    const result = [];
    let i = 0;
    let key;
    while (names.length > i) {
      if (_has(AllSymbols, (key = names[i++])) && (IS_OP ? _has(ObjectProto$1, key) : true)) { result.push(AllSymbols[key]); }
    }
    return result;
  };

  // 19.4.1.1 Symbol([description])
  if (!USE_NATIVE$1) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
      const tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
      var $set = function (value) {
        if (this === ObjectProto$1) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };
      if (_descriptors && setter) { setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set }); }
      return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty$1;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

  for (
    let es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
        ','
      ),
      j = 0;
    es6Symbols.length > j;

  ) { _wks(es6Symbols[j++]); }

  for (let wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) { _wksDefine(wellKnownSymbols[k++]); }

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    for(key) {
      return _has(SymbolRegistry, (key += ''))
        ? SymbolRegistry[key]
        : (SymbolRegistry[key] = $Symbol(key));
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(`${sym} is not a symbol!`);
      for (const key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter() {
      setter = true;
    },
    useSimple() {
      setter = false;
    },
  });

  _export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty$1,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols,
  });

  // 24.3.2 JSON.stringify(value [, replacer [, space]])
  $JSON &&
    _export(
      _export.S +
        _export.F *
          (!USE_NATIVE$1 ||
            _fails(() => {
              const S = $Symbol();
              // MS Edge converts symbol values to JSON as {}
              // WebKit converts symbol values to JSON as null
              // V8 throws on boxed symbols
              return (
                _stringify([S]) != '[null]' ||
                _stringify({ a: S }) != '{}' ||
                _stringify(Object(S)) != '{}'
              );
            })),
      'JSON',
      {
        stringify: function stringify(it) {
          const args = [it];
          let i = 1;
          let replacer,
            $replacer;
          while (arguments.length > i) args.push(arguments[i++]);
          $replacer = replacer = args[1];
          if ((!_isObject(replacer) && it === undefined) || isSymbol(it)) return; // IE8 returns string on undefined
          if (!_isArray(replacer)) {
            replacer = function (key, value) {
              if (typeof $replacer === 'function') value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
          }
          args[1] = replacer;
          return _stringify.apply($JSON, args);
        },
      }
    );

  // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] ||
    _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
  // 19.4.3.5 Symbol.prototype[@@toStringTag]
  _setToStringTag($Symbol, 'Symbol');
  // 20.2.1.9 Math[@@toStringTag]
  _setToStringTag(Math, 'Math', true);
  // 24.3.3 JSON[@@toStringTag]
  _setToStringTag(_global.JSON, 'JSON', true);

  // most Object methods by ES6 should accept primitives

  const _objectSap = function (KEY, exec) {
    const fn = (_core.Object || {})[KEY] || Object[KEY];
    const exp = {};
    exp[KEY] = exec(fn);
    _export(
      _export.S +
        _export.F *
          _fails(() => {
            fn(1);
          }),
      'Object',
      exp
    );
  };

  // 19.1.2.5 Object.freeze(O)

  const meta = _meta.onFreeze;

  _objectSap('freeze', ($freeze) => function freeze(it) {
    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
  });

  // 19.1.2.17 Object.seal(O)

  const meta$1 = _meta.onFreeze;

  _objectSap('seal', ($seal) => function seal(it) {
    return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
  });

  // 19.1.2.15 Object.preventExtensions(O)

  const meta$2 = _meta.onFreeze;

  _objectSap('preventExtensions', ($preventExtensions) => function preventExtensions(it) {
    return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
  });

  // 19.1.2.12 Object.isFrozen(O)

  _objectSap('isFrozen', ($isFrozen) => function isFrozen(it) {
    return _isObject(it) ? ($isFrozen ? $isFrozen(it) : false) : true;
  });

  // 19.1.2.13 Object.isSealed(O)

  _objectSap('isSealed', ($isSealed) => function isSealed(it) {
    return _isObject(it) ? ($isSealed ? $isSealed(it) : false) : true;
  });

  // 19.1.2.11 Object.isExtensible(O)

  _objectSap('isExtensible', ($isExtensible) => function isExtensible(it) {
    return _isObject(it) ? ($isExtensible ? $isExtensible(it) : true) : false;
  });

  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

  const $getOwnPropertyDescriptor$1 = _objectGopd.f;

  _objectSap('getOwnPropertyDescriptor', () => function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
  });

  // 19.1.2.9 Object.getPrototypeOf(O)

  _objectSap('getPrototypeOf', () => function getPrototypeOf(it) {
    return _objectGpo(_toObject(it));
  });

  // 19.1.2.14 Object.keys(O)

  _objectSap('keys', () => function keys(it) {
    return _objectKeys(_toObject(it));
  });

  // 19.1.2.7 Object.getOwnPropertyNames(O)
  _objectSap('getOwnPropertyNames', () => _objectGopnExt.f);

  // 19.1.3.1 Object.assign(target, source)

  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  // 7.2.9 SameValue(x, y)
  const _sameValue =
    Object.is ||
    function is(x, y) {
      // eslint-disable-next-line no-self-compare
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };

  // 19.1.3.10 Object.is(value1, value2)

  _export(_export.S, 'Object', { is: _sameValue });

  // 19.1.3.19 Object.setPrototypeOf(O, proto)

  _export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

  const dP$3 = _objectDp.f;
  const FProto = Function.prototype;
  const nameRE = /^\s*function ([^ (]*)/;
  const NAME = 'name';

  // 19.2.4.2 name
  NAME in FProto ||
    (_descriptors &&
      dP$3(FProto, NAME, {
        configurable: true,
        get() {
          try {
            return (`${this}`).match(nameRE)[1];
          } catch (e) {
            return '';
          }
        },
      }));

  _export(_export.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite) {
      const tpl = _toIobject(callSite.raw);
      const len = _toLength(tpl.length);
      const aLen = arguments.length;
      const res = [];
      let i = 0;
      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < aLen) res.push(String(arguments[i]));
      }
      return res.join('');
    },
  });

  const fromCharCode = String.fromCharCode;
  const $fromCodePoint = String.fromCodePoint;

  // length should be 1, old FF problem
  _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x) {
      // eslint-disable-line no-unused-vars
      const res = [];
      const aLen = arguments.length;
      let i = 0;
      let code;
      while (aLen > i) {
        code = +arguments[i++];
        if (_toAbsoluteIndex(code, 0x10ffff) !== code) { throw RangeError(`${code} is not a valid code point`); }
        res.push(
          code < 0x10000
            ? fromCharCode(code)
            : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      }
      return res.join('');
    },
  });

  // true  -> String#at
  // false -> String#codePointAt
  const _stringAt = function (TO_STRING) {
    return function (that, pos) {
      const s = String(_defined(that));
      const i = _toInteger(pos);
      const l = s.length;
      let a,
        b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 ||
        a > 0xdbff ||
        i + 1 === l ||
        (b = s.charCodeAt(i + 1)) < 0xdc00 ||
        b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  const $at = _stringAt(false);
  _export(_export.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos) {
      return $at(this, pos);
    },
  });

  const _stringRepeat = function repeat(count) {
    let str = String(_defined(this));
    let res = '';
    let n = _toInteger(count);
    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
    for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
    return res;
  };

  _export(_export.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: _stringRepeat,
  });

  // 7.2.8 IsRegExp(argument)

  const MATCH = _wks('match');
  const _isRegexp = function (it) {
    let isRegExp;
    return (
      _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp')
    );
  };

  // helper for String#{startsWith, endsWith, includes}

  const _stringContext = function (that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError(`String#${NAME} doesn't accept regex!`);
    return String(_defined(that));
  };

  const MATCH$1 = _wks('match');
  const _failsIsRegexp = function (KEY) {
    const re = /./;
    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !'/./'[KEY](re);
      } catch (f) {
        /* empty */
      }
    }
    return true;
  };

  const STARTS_WITH = 'startsWith';
  const $startsWith = ''[STARTS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      const that = _stringContext(this, searchString, STARTS_WITH);
      const index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      const search = String(searchString);
      return $startsWith
        ? $startsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    },
  });

  const ENDS_WITH = 'endsWith';
  const $endsWith = ''[ENDS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      const that = _stringContext(this, searchString, ENDS_WITH);
      const endPosition = arguments.length > 1 ? arguments[1] : undefined;
      const len = _toLength(that.length);
      const end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
      const search = String(searchString);
      return $endsWith
        ? $endsWith.call(that, search, end)
        : that.slice(end - search.length, end) === search;
    },
  });

  const INCLUDES = 'includes';

  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~_stringContext(this, searchString, INCLUDES).indexOf(
        searchString,
        arguments.length > 1 ? arguments[1] : undefined
      );
    },
  });

  // 21.2.5.3 get RegExp.prototype.flags

  const _flags = function () {
    const that = _anObject(this);
    let result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != 'g') {
    _objectDp.f(RegExp.prototype, 'flags', {
      configurable: true,
      get: _flags,
    });
  }

  const _fixReWks = function (KEY, length, exec) {
    const SYMBOL = _wks(KEY);
    const fns = exec(_defined, SYMBOL, ''[KEY]);
    const strfn = fns[0];
    const rxfn = fns[1];
    if (
      _fails(() => {
        const O = {};
        O[SYMBOL] = function () {
          return 7;
        };
        return ''[KEY](O) != 7;
      })
    ) {
      _redefine(String.prototype, KEY, strfn);
      _hide(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
          // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          function (string, arg) {
            return rxfn.call(string, this, arg);
          }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
          // 21.2.5.9 RegExp.prototype[@@search](string)
          function (string) {
            return rxfn.call(string, this);
          }
      );
    }
  };

  // @@match logic
  _fixReWks('match', 1, (defined, MATCH, $match) =>
    // 21.1.3.11 String.prototype.match(regexp)
    [
      function match(regexp) {
        const O = defined(this);
        const fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      $match,
    ]
  );

  // @@replace logic
  _fixReWks('replace', 2, (defined, REPLACE, $replace) =>
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    [
      function replace(searchValue, replaceValue) {
        const O = defined(this);
        const fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
      },
      $replace,
    ]
  );

  // @@split logic
  _fixReWks('split', 2, (defined, SPLIT, $split) => {
    const isRegExp = _isRegexp;
    const _split = $split;
    const $push = [].push;
    const $SPLIT = 'split';
    const LENGTH = 'length';
    const LAST_INDEX = 'lastIndex';
    if (
      'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
      'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
      'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
      '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
      '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
      ''[$SPLIT](/.?/)[LENGTH]
    ) {
      const NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it
      $split = function (separator, limit) {
        const string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        const output = [];
        const flags =
          (separator.ignoreCase ? 'i' : '') +
          (separator.multiline ? 'm' : '') +
          (separator.unicode ? 'u' : '') +
          (separator.sticky ? 'y' : '');
        let lastLastIndex = 0;
        const splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        const separatorCopy = new RegExp(separator.source, `${flags}g`);
        let separator2,
          match,
          lastIndex,
          lastLength,
          i;
        // Doesn't need flags gy, but they don't hurt
        if (!NPCG) separator2 = new RegExp(`^${separatorCopy.source}$(?!\\s)`, flags);
        while ((match = separatorCopy.exec(string))) {
          // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func
            if (!NPCG && match[LENGTH] > 1) {
              match[0].replace(separator2, function () {
                for (i = 1; i < arguments[LENGTH] - 2; i++) { if (arguments[i] === undefined) match[i] = undefined; }
              });
            }
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) { $push.apply(output, match.slice(1)); }
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
    return [
      function split(separator, limit) {
        const O = defined(this);
        const fn = separator == undefined ? undefined : separator[SPLIT];
        return fn !== undefined
          ? fn.call(separator, O, limit)
          : $split.call(String(O), separator, limit);
      },
      $split,
    ];
  });

  // @@search logic
  _fixReWks('search', 1, (defined, SEARCH, $search) =>
    // 21.1.3.15 String.prototype.search(regexp)
    [
      function search(regexp) {
        const O = defined(this);
        const fn = regexp == undefined ? undefined : regexp[SEARCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      $search,
    ]
  );

  const _createProperty = function (object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };

  _export(_export.S + _export.F * !_iterDetect((iter) => {}), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      const O = _toObject(arrayLike);
      const C = typeof this === 'function' ? this : Array;
      const aLen = arguments.length;
      let mapfn = aLen > 1 ? arguments[1] : undefined;
      const mapping = mapfn !== undefined;
      let index = 0;
      const iterFn = core_getIteratorMethod(O);
      let length,
        result,
        step,
        iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      // if object isn't iterable or it's array with default iterator - use simple case
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(
            result,
            index,
            mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value
          );
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    },
  });

  // WebKit Array.of isn't generic
  _export(
    _export.S +
      _export.F *
        _fails(() => {
          function F() {
            /* empty */
          }
          return !(Array.of.call(F) instanceof F);
        }),
    'Array',
    {
      // 22.1.2.3 Array.of( ...items)
      of: function of(/* ...args */) {
        let index = 0;
        const aLen = arguments.length;
        const result = new (typeof this === 'function' ? this : Array)(aLen);
        while (aLen > index) _createProperty(result, index, arguments[index++]);
        result.length = aLen;
        return result;
      },
    }
  );

  // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

  _export(_export.P, 'Array', { copyWithin: _arrayCopyWithin });

  _addToUnscopables('copyWithin');

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  const $find = _arrayMethods(5);
  const KEY = 'find';
  let forced = true;
  // Shouldn't skip holes
  if (KEY in []) {
    Array(1)[KEY](() => {
      forced = false;
    });
  }
  _export(_export.P + _export.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
  });
  _addToUnscopables(KEY);

  // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

  const $find$1 = _arrayMethods(6);
  const KEY$1 = 'findIndex';
  let forced$1 = true;
  // Shouldn't skip holes
  if (KEY$1 in []) {
    Array(1)[KEY$1](() => {
      forced$1 = false;
    });
  }
  _export(_export.P + _export.F * forced$1, 'Array', {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
  });
  _addToUnscopables(KEY$1);

  // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

  _export(_export.P, 'Array', { fill: _arrayFill });

  _addToUnscopables('fill');

  // 20.1.2.2 Number.isFinite(number)

  const _isFinite = _global.isFinite;

  _export(_export.S, 'Number', {
    isFinite: function isFinite(it) {
      return typeof it === 'number' && _isFinite(it);
    },
  });

  // 20.1.2.3 Number.isInteger(number)

  const floor$1 = Math.floor;
  const _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$1(it) === it;
  };

  // 20.1.2.3 Number.isInteger(number)

  _export(_export.S, 'Number', { isInteger: _isInteger });

  // 20.1.2.5 Number.isSafeInteger(number)

  const abs = Math.abs;

  _export(_export.S, 'Number', {
    isSafeInteger: function isSafeInteger(number) {
      return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
    },
  });

  // 20.1.2.4 Number.isNaN(number)

  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    },
  });

  // 20.1.2.1 Number.EPSILON

  _export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

  // 20.1.2.10 Number.MIN_SAFE_INTEGER

  _export(_export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

  // 20.1.2.6 Number.MAX_SAFE_INTEGER

  _export(_export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

  // 20.2.2.20 Math.log1p(x)
  const _mathLog1p =
    Math.log1p ||
    function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
    };

  // 20.2.2.3 Math.acosh(x)

  const sqrt = Math.sqrt;
  const $acosh = Math.acosh;

  _export(
    _export.S +
      _export.F *
        !(
      $acosh &&
          // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
          Math.floor($acosh(Number.MAX_VALUE)) == 710 &&
          // Tor Browser bug: Math.acosh(Infinity) -> NaN
          $acosh(Infinity) == Infinity
    ),
    'Math',
    {
      acosh: function acosh(x) {
        return (x = +x) < 1
          ? NaN
          : x > 94906265.62425156
            ? Math.log(x) + Math.LN2
            : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
      },
    }
  );

  // 20.2.2.5 Math.asinh(x)

  const $asinh = Math.asinh;

  function asinh(x) {
    return !isFinite((x = +x)) || x == 0
      ? x
      : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  }

  // Tor Browser bug: Math.asinh(0) -> -0
  _export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh });

  // 20.2.2.7 Math.atanh(x)

  const $atanh = Math.atanh;

  // Tor Browser bug: Math.atanh(-0) -> 0
  _export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    },
  });

  // 20.2.2.28 Math.sign(x)
  const _mathSign =
    Math.sign ||
    function sign(x) {
      // eslint-disable-next-line no-self-compare
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };

  // 20.2.2.9 Math.cbrt(x)

  _export(_export.S, 'Math', {
    cbrt: function cbrt(x) {
      return _mathSign((x = +x)) * Math.pow(Math.abs(x), 1 / 3);
    },
  });

  // 20.2.2.11 Math.clz32(x)

  _export(_export.S, 'Math', {
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    },
  });

  // 20.2.2.12 Math.cosh(x)

  const exp = Math.exp;

  _export(_export.S, 'Math', {
    cosh: function cosh(x) {
      return (exp((x = +x)) + exp(-x)) / 2;
    },
  });

  // 20.2.2.14 Math.expm1(x)
  const $expm1 = Math.expm1;
  const _mathExpm1 =
    !$expm1 ||
    // Old FF bug
    $expm1(10) > 22025.465794806719 ||
    $expm1(10) < 22025.4657948067165168 ||
    // Tor Browser bug
    $expm1(-2e-17) != -2e-17
      ? function expm1(x) {
        return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
      }
      : $expm1;

  // 20.2.2.14 Math.expm1(x)

  _export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', { expm1: _mathExpm1 });

  // 20.2.2.16 Math.fround(x)

  const pow = Math.pow;
  const EPSILON = pow(2, -52);
  const EPSILON32 = pow(2, -23);
  const MAX32 = pow(2, 127) * (2 - EPSILON32);
  const MIN32 = pow(2, -126);

  const roundTiesToEven = function (n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };

  const _mathFround =
    Math.fround ||
    function fround(x) {
      const $abs = Math.abs(x);
      const $sign = _mathSign(x);
      let a,
        result;
      if ($abs < MIN32) { return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32; }
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      // eslint-disable-next-line no-self-compare
      if (result > MAX32 || result != result) return $sign * Infinity;
      return $sign * result;
    };

  // 20.2.2.16 Math.fround(x)

  _export(_export.S, 'Math', { fround: _mathFround });

  // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])

  const abs$1 = Math.abs;

  _export(_export.S, 'Math', {
    hypot: function hypot(value1, value2) {
      // eslint-disable-line no-unused-vars
      let sum = 0;
      let i = 0;
      const aLen = arguments.length;
      let larg = 0;
      let arg,
        div;
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
    },
  });

  // 20.2.2.18 Math.imul(x, y)

  const $imul = Math.imul;

  // some WebKit versions fails with big numbers, some has wrong arity
  _export(
    _export.S +
      _export.F *
        _fails(() => $imul(0xffffffff, 5) != -5 || $imul.length != 2),
    'Math',
    {
      imul: function imul(x, y) {
        const UINT16 = 0xffff;
        const xn = +x;
        const yn = +y;
        const xl = UINT16 & xn;
        const yl = UINT16 & yn;
        return (
          0 |
          (xl * yl + ((((UINT16 & (xn >>> 16)) * yl + xl * (UINT16 & (yn >>> 16))) << 16) >>> 0))
        );
      },
    }
  );

  // 20.2.2.20 Math.log1p(x)

  _export(_export.S, 'Math', { log1p: _mathLog1p });

  // 20.2.2.21 Math.log10(x)

  _export(_export.S, 'Math', {
    log10: function log10(x) {
      return Math.log(x) * Math.LOG10E;
    },
  });

  // 20.2.2.22 Math.log2(x)

  _export(_export.S, 'Math', {
    log2: function log2(x) {
      return Math.log(x) / Math.LN2;
    },
  });

  // 20.2.2.28 Math.sign(x)

  _export(_export.S, 'Math', { sign: _mathSign });

  // 20.2.2.30 Math.sinh(x)

  const exp$1 = Math.exp;

  // V8 near Chromium 38 has a problem with very small numbers
  _export(
    _export.S +
      _export.F *
        _fails(() => !Math.sinh(-2e-17) != -2e-17),
    'Math',
    {
      sinh: function sinh(x) {
        return Math.abs((x = +x)) < 1
          ? (_mathExpm1(x) - _mathExpm1(-x)) / 2
          : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
      },
    }
  );

  // 20.2.2.33 Math.tanh(x)

  const exp$2 = Math.exp;

  _export(_export.S, 'Math', {
    tanh: function tanh(x) {
      const a = _mathExpm1((x = +x));
      const b = _mathExpm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
    },
  });

  // 20.2.2.34 Math.trunc(x)

  _export(_export.S, 'Math', {
    trunc: function trunc(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    },
  });

  // https://github.com/tc39/Array.prototype.includes

  const $includes = _arrayIncludes(true);

  _export(_export.P, 'Array', {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    },
  });

  _addToUnscopables('includes');

  const isEnum$1 = _objectPie.f;
  const _objectToArray = function (isEntries) {
    return function (it) {
      const O = _toIobject(it);
      const keys = _objectKeys(O);
      const length = keys.length;
      let i = 0;
      const result = [];
      let key;
      while (length > i) {
        if (isEnum$1.call(O, (key = keys[i++]))) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }
      }
      return result;
    };
  };

  // https://github.com/tc39/proposal-object-values-entries

  const $values = _objectToArray(false);

  _export(_export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    },
  });

  // https://github.com/tc39/proposal-object-values-entries

  const $entries = _objectToArray(true);

  _export(_export.S, 'Object', {
    entries: function entries(it) {
      return $entries(it);
    },
  });

  // https://github.com/tc39/proposal-object-getownpropertydescriptors

  _export(_export.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      const O = _toIobject(object);
      const getDesc = _objectGopd.f;
      const keys = _ownKeys(O);
      const result = {};
      let i = 0;
      let key,
        desc;
      while (keys.length > i) {
        desc = getDesc(O, (key = keys[i++]));
        if (desc !== undefined) _createProperty(result, key, desc);
      }
      return result;
    },
  });

  // https://github.com/tc39/proposal-string-pad-start-end

  const _stringPad = function (that, maxLength, fillString, left) {
    const S = String(_defined(that));
    const stringLength = S.length;
    const fillStr = fillString === undefined ? ' ' : String(fillString);
    const intMaxLength = _toLength(maxLength);
    if (intMaxLength <= stringLength || fillStr == '') return S;
    const fillLen = intMaxLength - stringLength;
    let stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  };

  const navigator = _global.navigator;

  const _userAgent = (navigator && navigator.userAgent) || '';

  // https://github.com/tc39/proposal-string-pad-start-end

  // https://github.com/zloirock/core-js/issues/280
  _export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
    padStart: function padStart(maxLength /* , fillString = ' ' */) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    },
  });

  // https://github.com/tc39/proposal-string-pad-start-end

  // https://github.com/zloirock/core-js/issues/280
  _export(_export.P + _export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(_userAgent), 'String', {
    padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
    },
  });

  // ie9- setTimeout & setInterval additional parameters fix

  const slice = [].slice;
  const MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check
  const wrap$1 = function (set) {
    return function (fn, time /* , ...args */) {
      const boundArgs = arguments.length > 2;
      const args = boundArgs ? slice.call(arguments, 2) : false;
      return set(
        boundArgs
          ? function () {
            // eslint-disable-next-line no-new-func
            (typeof fn === 'function' ? fn : Function(fn)).apply(this, args);
          }
          : fn,
        time
      );
    };
  };
  _export(_export.G + _export.B + _export.F * MSIE, {
    setTimeout: wrap$1(_global.setTimeout),
    setInterval: wrap$1(_global.setInterval),
  });

  _export(_export.G + _export.B, {
    setImmediate: _task.set,
    clearImmediate: _task.clear,
  });

  const ITERATOR$4 = _wks('iterator');
  const TO_STRING_TAG = _wks('toStringTag');
  const ArrayValues = _iterators.Array;

  const DOMIterables = {
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
    TouchList: false,
  };

  for (let collections = _objectKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
    const NAME$1 = collections[i$1];
    const explicit = DOMIterables[NAME$1];
    const Collection = _global[NAME$1];
    const proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
      if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit) {
        for (key in es6_array_iterator) { if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true); }
      }
    }
  }

  const runtime = createCommonjsModule((module) => {
    /**
     * Copyright (c) 2014, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
     * additional grant of patent rights can be found in the PATENTS file in
     * the same directory.
     */

    !(function (global) {
      const Op = Object.prototype;
      const hasOwn = Op.hasOwnProperty;
      let undefined; // More compressible than void 0.
      const $Symbol = typeof Symbol === 'function' ? Symbol : {};
      const iteratorSymbol = $Symbol.iterator || '@@iterator';
      const asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
      const toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

      const inModule = 'object' === 'object';
      let runtime = global.regeneratorRuntime;
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
        const protoGenerator =
          outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        const generator = Object.create(protoGenerator.prototype);
        const context = new Context(tryLocsList || []);

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
          return { type: 'normal', arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: 'throw', arg: err };
        }
      }

      const GenStateSuspendedStart = 'suspendedStart';
      const GenStateSuspendedYield = 'suspendedYield';
      const GenStateExecuting = 'executing';
      const GenStateCompleted = 'completed';

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      const ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      let IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      const getProto = Object.getPrototypeOf;
      const NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      const Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
        IteratorPrototype
      ));
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName =
        'GeneratorFunction';

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ['next', 'throw', 'return'].forEach((method) => {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      runtime.isGeneratorFunction = function (genFun) {
        const ctor = typeof genFun === 'function' && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === 'GeneratorFunction'
          : false;
      };

      runtime.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = 'GeneratorFunction';
          }
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      runtime.awrap = function (arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          const record = tryCatch(generator[method], generator, arg);
          if (record.type === 'throw') {
            reject(record.arg);
          } else {
            const result = record.arg;
            const value = result.value;
            if (value && typeof value === 'object' && hasOwn.call(value, '__await')) {
              return Promise.resolve(value.__await).then(
                (value) => {
                  invoke('next', value, resolve, reject);
                },
                (err) => {
                  invoke('throw', err, resolve, reject);
                }
              );
            }

            return Promise.resolve(value).then((unwrapped) => {
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

        if (typeof global.process === 'object' && global.process.domain) {
          invoke = global.process.domain.bind(invoke);
        }

        let previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(((resolve, reject) => {
              invoke(method, arg, resolve, reject);
            }));
          }

          return (previousPromise =
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
            previousPromise
              ? previousPromise.then(
                callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg
              )
              : callInvokeWithMethodAndArg());
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
      runtime.async = function (innerFn, outerFn, self, tryLocsList) {
        const iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

        return runtime.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then((result) => (result.done ? result.value : iter.next()));
      };

      function makeInvokeMethod(innerFn, self, context) {
        let state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error('Generator is already running');
          }

          if (state === GenStateCompleted) {
            if (method === 'throw') {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            const delegate = context.delegate;
            if (delegate) {
              const delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === 'next') {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === 'throw') {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === 'return') {
              context.abrupt('return', context.arg);
            }

            state = GenStateExecuting;

            const record = tryCatch(innerFn, self, context);
            if (record.type === 'normal') {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done,
              };
            } else if (record.type === 'throw') {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = 'throw';
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
        const method = delegate.iterator[context.method];
        if (method === undefined) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === 'throw') {
            if (delegate.iterator.return) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = 'return';
              context.arg = undefined;
              maybeInvokeDelegate(delegate, context);

              if (context.method === 'throw') {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = 'throw';
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        const record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === 'throw') {
          context.method = 'throw';
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        const info = record.arg;

        if (!info) {
          context.method = 'throw';
          context.arg = new TypeError('iterator result is not an object');
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
          if (context.method !== 'return') {
            context.method = 'next';
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

      Gp[toStringTagSymbol] = 'Generator';

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return '[object Generator]';
      };

      function pushTryEntry(locs) {
        const entry = { tryLoc: locs[0] };

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
        const record = entry.completion || {};
        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: 'root' }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      runtime.keys = function (object) {
        const keys = [];
        for (const key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            const key = keys.pop();
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
          const iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === 'function') {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            let i = -1,
              next = function next() {
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

            return (next.next = next);
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

        reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;

          this.method = 'next';
          this.arg = undefined;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (const name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined;
              }
            }
          }
        },

        stop() {
          this.done = true;

          const rootEntry = this.tryEntries[0];
          const rootRecord = rootEntry.completion;
          if (rootRecord.type === 'throw') {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          const context = this;
          function handle(loc, caught) {
            record.type = 'throw';
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = 'next';
              context.arg = undefined;
            }

            return !!caught;
          }

          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === 'root') {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle('end');
            }

            if (entry.tryLoc <= this.prev) {
              const hasCatch = hasOwn.call(entry, 'catchLoc');
              const hasFinally = hasOwn.call(entry, 'finallyLoc');

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
                throw new Error('try statement without catch or finally');
              }
            }
          }
        },

        abrupt(type, arg) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, 'finallyLoc') &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === 'break' || type === 'continue') &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          const record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = 'next';
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete(record, afterLoc) {
          if (record.type === 'throw') {
            throw record.arg;
          }

          if (record.type === 'break' || record.type === 'continue') {
            this.next = record.arg;
          } else if (record.type === 'return') {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
          } else if (record.type === 'normal' && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish(finallyLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch(tryLoc) {
          for (let i = this.tryEntries.length - 1; i >= 0; --i) {
            const entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              const record = entry.completion;
              if (record.type === 'throw') {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error('illegal catch attempt');
        },

        delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc,
          };

          if (this.method === 'next') {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
          }

          return ContinueSentinel;
        },
      };
    }(
      // Among the various tricks for obtaining a reference to the global
      // object, this seems to be the most reliable technique that does not
      // use indirect eval (which violates Content Security Policy).
      typeof commonjsGlobal === 'object'
        ? commonjsGlobal
        : typeof window === 'object' ? window : typeof self === 'object' ? self : commonjsGlobal
    ));
  });

  const _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (obj) {
        return typeof obj;
      }
      : function (obj) {
        return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };

  const slicedToArray = (function () {
    function sliceIterator(arr, i) {
      const _arr = [];
      let _n = true;
      let _d = false;
      let _e;

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
          if (!_n && _i.return) _i.return();
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
      }
      throw new TypeError('Invalid attempt to destructure non-iterable instance');
    };
  }());

  const toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
    return Array.from(arr);
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
    return {}.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase();
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
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const start = arguments[1];
    const end = arguments[2];

    if (isEmpty(char)) return false;
    const code = char.charCodeAt(0);
    return start <= code && code <= end;
  }

  const VERSION = '3.1.0';

  const TO_KANA_METHODS = {
    HIRAGANA: 'toHiragana',
    KATAKANA: 'toKatakana',
  };

  const ROMANIZATIONS = {
    HEPBURN: 'hepburn',
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
  const DEFAULT_OPTIONS = {
    useObsoleteKana: false,
    passRomaji: false,
    upcaseKatakana: false,
    ignoreCase: false,
    IMEMode: false,
    romanization: ROMANIZATIONS.HEPBURN,
  };
  const LATIN_UPPERCASE_START = 0x41;
  const LATIN_UPPERCASE_END = 0x5a;
  const LOWERCASE_ZENKAKU_START = 0xff41;
  const LOWERCASE_ZENKAKU_END = 0xff5a;
  const UPPERCASE_ZENKAKU_START = 0xff21;
  const UPPERCASE_ZENKAKU_END = 0xff3a;
  const HIRAGANA_START = 0x3041;
  const HIRAGANA_END = 0x3096;
  const KATAKANA_START = 0x30a1;
  const KATAKANA_END = 0x30fc;
  const KANJI_START = 0x4e00;
  const KANJI_END = 0x9faf;
  const PROLONGED_SOUND_MARK = 0x30fc;
  const KANA_SLASH_DOT = 0x30fb;

  const ZENKAKU_NUMBERS = [0xff10, 0xff19];
  const ZENKAKU_UPPERCASE = [UPPERCASE_ZENKAKU_START, UPPERCASE_ZENKAKU_END];
  const ZENKAKU_LOWERCASE = [LOWERCASE_ZENKAKU_START, LOWERCASE_ZENKAKU_END];
  const ZENKAKU_PUNCTUATION_1 = [0xff01, 0xff0f];
  const ZENKAKU_PUNCTUATION_2 = [0xff1a, 0xff1f];
  const ZENKAKU_PUNCTUATION_3 = [0xff3b, 0xff3f];
  const ZENKAKU_PUNCTUATION_4 = [0xff5b, 0xff60];
  const ZENKAKU_SYMBOLS_CURRENCY = [0xffe0, 0xffee];

  const HIRAGANA_CHARS = [0x3040, 0x309f];
  const KATAKANA_CHARS = [0x30a0, 0x30ff];
  const HANKAKU_KATAKANA = [0xff66, 0xff9f];
  const KATAKANA_PUNCTUATION = [0x30fb, 0x30fc];
  const KANA_PUNCTUATION = [0xff61, 0xff65];
  const CJK_SYMBOLS_PUNCTUATION = [0x3000, 0x303f];
  const COMMON_CJK = [0x4e00, 0x9fff];
  const RARE_CJK = [0x3400, 0x4dbf];

  const KANA_RANGES = [HIRAGANA_CHARS, KATAKANA_CHARS, KANA_PUNCTUATION, HANKAKU_KATAKANA];

  const JA_PUNCTUATION_RANGES = [
    CJK_SYMBOLS_PUNCTUATION,
    KANA_PUNCTUATION,
    KATAKANA_PUNCTUATION,
    ZENKAKU_PUNCTUATION_1,
    ZENKAKU_PUNCTUATION_2,
    ZENKAKU_PUNCTUATION_3,
    ZENKAKU_PUNCTUATION_4,
    ZENKAKU_SYMBOLS_CURRENCY,
  ];

  // All Japanese unicode start and end ranges
  // Includes kanji, kana, zenkaku latin chars, punctuation, and number ranges.
  const JAPANESE_RANGES = [].concat(KANA_RANGES, JA_PUNCTUATION_RANGES, [
    ZENKAKU_UPPERCASE,
    ZENKAKU_LOWERCASE,
    ZENKAKU_NUMBERS,
    COMMON_CJK,
    RARE_CJK,
  ]);

  const MODERN_ENGLISH = [0x0000, 0x007f];
  const HEPBURN_MACRON_RANGES = [
    [0x0100, 0x0101], // Ā ā
    [0x0112, 0x0113], // Ē ē
    [0x012a, 0x012b], // Ī ī
    [0x014c, 0x014d], // Ō ō
    [0x016a, 0x016b],
  ];
  const SMART_QUOTE_RANGES = [
    [0x2018, 0x2019], // ‘ ’
    [0x201c, 0x201d],
  ];

  const ROMAJI_RANGES = [MODERN_ENGLISH].concat(HEPBURN_MACRON_RANGES);

  const EN_PUNCTUATION_RANGES = [[0x20, 0x2f], [0x3a, 0x3f], [0x5b, 0x60], [0x7b, 0x7e]].concat(
    SMART_QUOTE_RANGES
  );

  /**
   * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharJapanese() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return JAPANESE_RANGES.some((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const allowed = arguments[1];

    const augmented = typeOf(allowed) === 'regexp';
    return isEmpty(input)
      ? false
      : [].concat(toConsumableArray(input)).every((char) => {
        const isJa = isCharJapanese(char);
        return !augmented ? isJa : isJa || allowed.test(char);
      });
  }

  /**
   * Easy re-use of merging with default options
   * @param {Object} opts user options
   * @returns user options merged over default options
   */
  const mergeWithDefaultOptions = function mergeWithDefaultOptions() {
    const opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.assign({}, DEFAULT_OPTIONS, opts);
  };

  function applyMapping(string, mapping, convertEnding) {
    const root = mapping;

    function nextSubtree(tree, nextChar) {
      const subtree = tree[nextChar];
      if (subtree === undefined) {
        return undefined;
      }
      // if the next child node does not have a node value, set its node value to the input
      return Object.assign({ '': tree[''] + nextChar }, tree[nextChar]);
    }

    function newChunk(remaining, currentCursor) {
      // start parsing a new chunk
      const firstChar = remaining.charAt(0);

      return parse(
        Object.assign({ '': firstChar }, root[firstChar]),
        remaining.slice(1),
        currentCursor,
        currentCursor + 1
      );
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

      const subtree = nextSubtree(tree, remaining.charAt(0));

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
    return Object.entries(tree).reduce((map, _ref) => {
      let _ref2 = slicedToArray(_ref, 2),
        char = _ref2[0],
        subtree = _ref2[1];

      const endOfBranch = typeOf(subtree) === 'string';
      map[char] = endOfBranch ? { '': subtree } : transform(subtree);
      return map;
    }, {});
  }

  function getSubTreeOf(tree, string) {
    return string.split('').reduce((correctSubTree, char) => {
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
    const customMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    const customTree = {};

    if (typeOf(customMap) === 'object') {
      Object.entries(customMap).forEach((_ref3) => {
        let _ref4 = slicedToArray(_ref3, 2),
          roma = _ref4[0],
          kana = _ref4[1];

        let subTree = customTree;
        roma.split('').forEach((char) => {
          if (subTree[char] === undefined) {
            subTree[char] = {};
          }
          subTree = subTree[char];
        });
        subTree[''] = kana;
      });
    }

    return function makeMap(map) {
      const mapCopy = JSON.parse(JSON.stringify(map));

      function transformMap(mapSubtree, customSubtree) {
        if (mapSubtree === undefined || typeOf(mapSubtree) === 'string') {
          return customSubtree;
        }
        return Object.entries(customSubtree).reduce((newSubtree, _ref5) => {
          let _ref6 = slicedToArray(_ref5, 2),
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
    return typeOf(customMapping) === 'function'
      ? customMapping(map)
      : createCustomMapping(customMapping)(map);
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
    '}': '｝',
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
    f: 'ふ',
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
    fu: 'hu',
  };

  // xtu -> っ
  var SMALL_LETTERS = Object.assign(
    {
      tu: 'っ',
      wa: 'ゎ',
      ka: 'ヵ',
      ke: 'ヶ',
    },
    SMALL_VOWELS,
    SMALL_Y
  );

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
    dho: 'でょ',
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
    f: 'ふ',
  };

  /* eslint-enable */
  function createRomajiToKanaMap() {
    const kanaTree = transform(BASIC_KUNREI);
    // pseudo partial application
    const subtreeOf = function subtreeOf(string) {
      return getSubTreeOf(kanaTree, string);
    };

    // add tya, sya, etc.
    Object.entries(CONSONANTS).forEach((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
        consonant = _ref2[0],
        yKana = _ref2[1];

      Object.entries(SMALL_Y).forEach((_ref3) => {
        let _ref4 = slicedToArray(_ref3, 2),
          roma = _ref4[0],
          kana = _ref4[1];

        // for example kyo -> き + ょ
        subtreeOf(consonant + roma)[''] = yKana + kana;
      });
    });

    Object.entries(SPECIAL_SYMBOLS).forEach((_ref5) => {
      let _ref6 = slicedToArray(_ref5, 2),
        symbol = _ref6[0],
        jsymbol = _ref6[1];

      subtreeOf(symbol)[''] = jsymbol;
    });

    // things like うぃ, くぃ, etc.
    Object.entries(AIUEO_CONSTRUCTIONS).forEach((_ref7) => {
      let _ref8 = slicedToArray(_ref7, 2),
        consonant = _ref8[0],
        aiueoKana = _ref8[1];

      Object.entries(SMALL_VOWELS).forEach((_ref9) => {
        let _ref10 = slicedToArray(_ref9, 2),
          vowel = _ref10[0],
          kana = _ref10[1];

        const subtree = subtreeOf(consonant + vowel);
        subtree[''] = aiueoKana + kana;
      });
    });

    // different ways to write ん
    ['n', "n'", 'xn'].forEach((nChar) => {
      subtreeOf(nChar)[''] = 'ん';
    });

    // c is equivalent to k, but not for chi, cha, etc. that's why we have to make a copy of k
    kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));

    Object.entries(ALIASES).forEach((_ref11) => {
      let _ref12 = slicedToArray(_ref11, 2),
        string = _ref12[0],
        alternative = _ref12[1];

      const allExceptLast = string.slice(0, string.length - 1);
      const last = string.charAt(string.length - 1);
      const parentTree = subtreeOf(allExceptLast);
      // copy to avoid recursive containment
      parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
    });

    function getAlternatives(string) {
      return []
        .concat(toConsumableArray(Object.entries(ALIASES)), [['c', 'k']])
        .reduce((list, _ref13) => {
          let _ref14 = slicedToArray(_ref13, 2),
            alt = _ref14[0],
            roma = _ref14[1];

          return string.startsWith(roma) ? list.concat(string.replace(roma, alt)) : list;
        }, []);
    }

    Object.entries(SMALL_LETTERS).forEach((_ref15) => {
      let _ref16 = slicedToArray(_ref15, 2),
        kunreiRoma = _ref16[0],
        kana = _ref16[1];

      const last = function last(char) {
        return char.charAt(char.length - 1);
      };
      const allExceptLast = function allExceptLast(chars) {
        return chars.slice(0, chars.length - 1);
      };
      const xRoma = `x${kunreiRoma}`;
      const xSubtree = subtreeOf(xRoma);
      xSubtree[''] = kana;

      // ltu -> xtu -> っ
      const parentTree = subtreeOf(`l${allExceptLast(kunreiRoma)}`);
      parentTree[last(kunreiRoma)] = xSubtree;

      // ltsu -> ltu -> っ
      getAlternatives(kunreiRoma).forEach((altRoma) => {
        ['l', 'x'].forEach((prefix) => {
          const altParentTree = subtreeOf(prefix + allExceptLast(altRoma));
          altParentTree[last(altRoma)] = subtreeOf(prefix + kunreiRoma);
        });
      });
    });

    Object.entries(SPECIAL_CASES).forEach((_ref17) => {
      let _ref18 = slicedToArray(_ref17, 2),
        string = _ref18[0],
        kana = _ref18[1];

      subtreeOf(string)[''] = kana;
    });

    // add kka, tta, etc.
    function addTsu(tree) {
      return Object.entries(tree).reduce((tsuTree, _ref19) => {
        let _ref20 = slicedToArray(_ref19, 2),
          key = _ref20[0],
          value = _ref20[1];

        if (!key) {
          // we have reached the bottom of this branch
          tsuTree[key] = `\u3063${value}`;
        } else {
          // more subtrees
          tsuTree[key] = addTsu(value);
        }
        return tsuTree;
      }, {});
    }
    // have to explicitly name c here, because we made it a copy of k, not a reference
    []
      .concat(toConsumableArray(Object.keys(CONSONANTS)), ['c', 'y', 'w', 'j'])
      .forEach((consonant) => {
        const subtree = kanaTree[consonant];
        subtree[consonant] = addTsu(subtree);
      });
    // nn should not be っん
    delete kanaTree.n.n;
    // solidify the results, so that there there is referential transparency within the tree
    return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
  }

  let romajiToKanaMap = null;

  function getRomajiToKanaTree() {
    if (romajiToKanaMap == null) {
      romajiToKanaMap = createRomajiToKanaMap();
    }
    return romajiToKanaMap;
  }

  const USE_OBSOLETE_KANA_MAP = createCustomMapping({ wi: 'ゐ', we: 'ゑ' });

  function IME_MODE_MAP(map) {
    // in IME mode, we do not want to convert single ns
    const mapCopy = JSON.parse(JSON.stringify(map));
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
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return isCharInRange(char, LATIN_UPPERCASE_START, LATIN_UPPERCASE_END);
  }

  /**
   * Returns true if char is 'ー'
   * @param  {String} char to test
   * @return {Boolean}
   */
  function isCharLongDash() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
  }

  /**
   * Tests if char is '・'
   * @param  {String} char
   * @return {Boolean} true if '・'
   */
  function isCharSlashDot() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return char.charCodeAt(0) === KANA_SLASH_DOT;
  }

  /**
   * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharHiragana() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    const kata = [];
    input.split('').forEach((char) => {
      // Short circuit to avoid incorrect codeshift for 'ー' and '・'
      if (isCharLongDash(char) || isCharSlashDot(char)) {
        kata.push(char);
      } else if (isCharHiragana(char)) {
        // Shift charcode.
        const code = char.charCodeAt(0) + (KATAKANA_START - HIRAGANA_START);
        const kataChar = String.fromCharCode(code);
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let map = arguments[2];

    let config = void 0;
    if (!map) {
      config = mergeWithDefaultOptions(options);
      map = createRomajiToKanaMap$1(config);
    } else {
      config = options;
    }

    // throw away the substring index information and just concatenate all the kana
    return splitIntoConvertedKana(input, config, map)
      .map((kanaToken) => {
        let _kanaToken = slicedToArray(kanaToken, 3),
          start = _kanaToken[0],
          end = _kanaToken[1],
          kana = _kanaToken[2];

        if (kana === null) {
          // haven't converted the end of the string, since we are in IME mode
          return input.slice(start);
        }
        const enforceHiragana = config.IMEMode === TO_KANA_METHODS.HIRAGANA;
        const enforceKatakana =
          config.IMEMode === TO_KANA_METHODS.KATAKANA ||
          [].concat(toConsumableArray(input.slice(start, end))).every(isCharUpperCase);

        return enforceHiragana || !enforceKatakana ? kana : hiraganaToKatakana(kana);
      })
      .join('');
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let map = arguments[2];

    if (!map) {
      map = createRomajiToKanaMap$1(options);
    }
    return applyMapping(input.toLowerCase(), map, !options.IMEMode);
  }

  let customMapping = null;
  function createRomajiToKanaMap$1() {
    const options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    let map = getRomajiToKanaTree();

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

  let LISTENERS = [];
  /**
   * Automagically replaces input values with converted text to kana
   * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
   * @return {Function} event handler with bound options
   * @private
   */
  function makeOnInput(options) {
    const prevInput = void 0;
    const mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
      IMEMode: options.IMEMode || true,
    });
    const preConfiguredMap = createRomajiToKanaMap$1(mergedConfig);
    const triggers = [].concat(
      toConsumableArray(Object.keys(preConfiguredMap)),
      toConsumableArray(
        Object.keys(preConfiguredMap).map((char) => char.toUpperCase())
      )
    );

    return function onInput(_ref) {
      const target = _ref.target;

      if (target.value !== prevInput && target.dataset.ignoreComposition !== 'true') {
        convertInput(target, mergedConfig, preConfiguredMap, triggers, prevInput);
      }
    };
  }

  function convertInput(target, options, map, triggers, prevInput) {
    let _splitInput = splitInput(target.value, target.selectionEnd, triggers),
      _splitInput2 = slicedToArray(_splitInput, 3),
      head = _splitInput2[0],
      textToConvert = _splitInput2[1],
      tail = _splitInput2[2];

    const convertedText = toKana(textToConvert, options, map);

    if (textToConvert !== convertedText) {
      const newCursor = head.length + convertedText.length;
      const newValue = head + convertedText + tail;
      target.value = newValue;
      prevInput = newValue;

      // push later on event loop (otherwise mid-text insertion can be 1 char too far to the right)
      tail.length
        ? setTimeout(() => target.setSelectionRange(newCursor, newCursor), 1)
        : target.setSelectionRange(newCursor, newCursor);
    } else {
      prevInput = target.value;
    }
  }

  function onComposition(_ref2) {
    let type = _ref2.type,
      target = _ref2.target,
      data = _ref2.data;

    if (type === 'compositionupdate' && isJapanese(data)) {
      target.dataset.ignoreComposition = 'true';
    }

    if (type === 'compositionend') {
      target.dataset.ignoreComposition = 'false';
    }
  }

  function trackListeners(id, inputHandler, compositionHandler) {
    LISTENERS = LISTENERS.concat({
      id,
      inputHandler,
      compositionHandler,
    });
  }

  function untrackListeners(_ref3) {
    const targetId = _ref3.id;

    LISTENERS = LISTENERS.filter((_ref4) => {
      const id = _ref4.id;
      return id !== targetId;
    });
  }

  function findListeners(el) {
    return (
      el &&
      LISTENERS.find((_ref5) => {
        const id = _ref5.id;
        return id === el.getAttribute('data-wanakana-id');
      })
    );
  }

  // so we can handle non-terminal inserted input conversion:
  // | -> わ| -> わび| -> わ|び -> わs|び -> わsh|び -> わshi|び -> わし|び
  // or multiple ambiguous positioning (IE select which "s" to work from)
  // こsこs|こsこ -> こsこso|こsこ -> こsこそ|こsこ
  function splitInput() {
    const text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const triggers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    let head = void 0;
    let toConvert = void 0;
    let tail = void 0;

    if (cursor === 0 && triggers.includes(text[0])) {
      const _workFromStart = workFromStart(text, triggers);

      const _workFromStart2 = slicedToArray(_workFromStart, 3);

      head = _workFromStart2[0];
      toConvert = _workFromStart2[1];
      tail = _workFromStart2[2];
    } else if (cursor > 0) {
      const _workBackwards = workBackwards(text, cursor);

      const _workBackwards2 = slicedToArray(_workBackwards, 3);

      head = _workBackwards2[0];
      toConvert = _workBackwards2[1];
      tail = _workBackwards2[2];
    } else {
      const _takeWhileAndSlice = takeWhileAndSlice(text, (char) => !triggers.includes(char));

      const _takeWhileAndSlice2 = slicedToArray(_takeWhileAndSlice, 2);

      head = _takeWhileAndSlice2[0];
      toConvert = _takeWhileAndSlice2[1];

      const _takeWhileAndSlice3 = takeWhileAndSlice(toConvert, (char) => !isJapanese(char));

      const _takeWhileAndSlice4 = slicedToArray(_takeWhileAndSlice3, 2);

      toConvert = _takeWhileAndSlice4[0];
      tail = _takeWhileAndSlice4[1];
    }

    return [head, toConvert, tail];
  }

  function workFromStart(text, catalystChars) {
    return [''].concat(
      toConsumableArray(
        takeWhileAndSlice(text, (char) => catalystChars.includes(char) || !isJapanese(char, /[0-9]/))
      )
    );
  }

  function workBackwards() {
    const text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    let _takeWhileAndSlice5 = takeWhileAndSlice(
        [].concat(toConsumableArray(text.slice(0, startIndex))).reverse(),
        (char) => !isJapanese(char)
      ),
      _takeWhileAndSlice6 = slicedToArray(_takeWhileAndSlice5, 2),
      toConvert = _takeWhileAndSlice6[0],
      head = _takeWhileAndSlice6[1];

    return [
      head.reverse().join(''),
      toConvert
        .split('')
        .reverse()
        .join(''),
      text.slice(startIndex),
    ];
  }

  function takeWhileAndSlice() {
    const source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const predicate =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : function (x) {
          return !!x;
        };

    const result = [];
    const length = source.length;

    let i = 0;
    while (i < length && predicate(source[i], i)) {
      result.push(source[i]);
      i += 1;
    }
    return [result.join(''), source.slice(i)];
  }

  /* eslint-disable no-console */
  const onInput = function onInput(_ref) {
    let _ref$target = _ref.target,
      value = _ref$target.value,
      selectionStart = _ref$target.selectionStart,
      selectionEnd = _ref$target.selectionEnd;
    return console.log('input:', {
      value,
      selectionStart,
      selectionEnd,
    });
  };
  const onCompositionStart = function onCompositionStart() {
    return console.log('compositionstart');
  };
  const onCompositionUpdate = function onCompositionUpdate(_ref2) {
    let _ref2$target = _ref2.target,
      value = _ref2$target.value,
      selectionStart = _ref2$target.selectionStart,
      selectionEnd = _ref2$target.selectionEnd,
      data = _ref2.data;
    return console.log('compositionupdate', {
      data,
      value,
      selectionStart,
      selectionEnd,
    });
  };
  const onCompositionEnd = function onCompositionEnd() {
    return console.log('compositionend');
  };

  const events = {
    input: onInput,
    compositionstart: onCompositionStart,
    compositionupdate: onCompositionUpdate,
    compositionend: onCompositionEnd,
  };

  const addDebugListeners = function addDebugListeners(input) {
    Object.entries(events).forEach((_ref3) => {
      let _ref4 = slicedToArray(_ref3, 2),
        event = _ref4[0],
        handler = _ref4[1];

      return input.addEventListener(event, handler);
    });
  };

  const removeDebugListeners = function removeDebugListeners(input) {
    Object.entries(events).forEach((_ref5) => {
      let _ref6 = slicedToArray(_ref5, 2),
        event = _ref6[0],
        handler = _ref6[1];

      return input.removeEventListener(event, handler);
    });
  };

  const ELEMENTS = ['TEXTAREA', 'INPUT'];

  let idCounter = 0;
  const newId = function newId() {
    idCounter += 1;
    return `${Date.now()}${idCounter}`;
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
    const element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!ELEMENTS.includes(element.nodeName)) {
      throw new Error(
        `Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (${
          JSON.stringify(element)
        })`
      );
    }
    const onInput = makeOnInput(options);
    const id = newId();
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
    const debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    const listeners = findListeners(element);
    if (listeners == null) {
      throw new Error(
        `Element provided to Wanakana unbind() had no listener registered.\n Received: ${
          JSON.stringify(element)}`
      );
    }
    let inputHandler = listeners.inputHandler,
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
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return ROMAJI_RANGES.some((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const allowed = arguments[1];

    const augmented = typeOf(allowed) === 'regexp';
    return isEmpty(input)
      ? false
      : [].concat(toConsumableArray(input)).every((char) => {
        const isRoma = isCharRomaji(char);
        return !augmented ? isRoma : isRoma || allowed.test(char);
      });
  }

  /**
   * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharKatakana() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return isCharInRange(char, KATAKANA_START, KATAKANA_END);
  }

  /**
   * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana) or [Katakana](https://en.wikipedia.org/wiki/Katakana).
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharKana() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(input)) return false;
    return [].concat(toConsumableArray(input)).every(isCharKatakana);
  }

  /**
   * Tests a character. Returns true if the character is a CJK ideograph (kanji).
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharKanji() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { passKanji: true };

    const chars = [].concat(toConsumableArray(input));
    let hasKanji = false;
    if (!options.passKanji) {
      hasKanji = chars.some(isKanji);
    }
    return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
  }

  const isCharInitialLongDash = function isCharInitialLongDash(char, index) {
    return isCharLongDash(char) && index < 1;
  };
  const isCharInnerLongDash = function isCharInnerLongDash(char, index) {
    return isCharLongDash(char) && index > 0;
  };
  const isKanaAsSymbol = function isKanaAsSymbol(char) {
    return ['ヶ', 'ヵ'].includes(char);
  };
  const LONG_VOWELS = {
    a: 'あ',
    i: 'い',
    u: 'う',
    e: 'え',
    o: 'う',
  };

  // inject toRomaji to avoid circular dependency between toRomaji <-> katakanaToHiragana
  function katakanaToHiragana() {
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const toRomaji = arguments[1];
    const isDestinationRomaji = arguments[2];

    let previousKana = '';

    return input
      .split('')
      .reduce((hira, char, index) => {
        // Short circuit to avoid incorrect codeshift for 'ー' and '・'
        if (isCharSlashDot(char) || isCharInitialLongDash(char, index) || isKanaAsSymbol(char)) {
          return hira.concat(char);
          // Transform long vowels: 'オー' to 'おう'
        } else if (previousKana && isCharInnerLongDash(char, index)) {
          // Transform previousKana back to romaji, and slice off the vowel
          const romaji = toRomaji(previousKana).slice(-1);
          // However, ensure 'オー' => 'おお' => 'oo' if this is a transform on the way to romaji
          if (isCharKatakana(input[index - 1]) && romaji === 'o' && isDestinationRomaji) {
            return hira.concat('お');
          }
          return hira.concat(LONG_VOWELS[romaji]);
        } else if (!isCharLongDash(char) && isCharKatakana(char)) {
          // Shift charcode.
          const code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
          const hiraChar = String.fromCharCode(code);
          previousKana = hiraChar;
          return hira.concat(hiraChar);
        }
        // Pass non katakana chars through
        previousKana = '';
        return hira.concat(char);
      }, [])
      .join('');
  }

  let kanaToHepburnMap = null;

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

  const SPECIAL_SYMBOLS$1 = {
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
    '　': ' ',
  };

  // んい -> n'i
  const AMBIGUOUS_VOWELS = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ'];
  const SMALL_Y$1 = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
  const SMALL_Y_EXTRA = { ぃ: 'yi', ぇ: 'ye' };
  const SMALL_AIUEO = {
    ぁ: 'a',
    ぃ: 'i',
    ぅ: 'u',
    ぇ: 'e',
    ぉ: 'o',
  };
  const YOON_KANA = ['き', 'に', 'ひ', 'み', 'り', 'ぎ', 'び', 'ぴ', 'ゔ', 'く', 'ふ'];
  const YOON_EXCEPTIONS = {
    し: 'sh',
    ち: 'ch',
    じ: 'j',
    ぢ: 'j',
  };
  const SMALL_KANA = {
    っ: '',
    ゃ: 'ya',
    ゅ: 'yu',
    ょ: 'yo',
    ぁ: 'a',
    ぃ: 'i',
    ぅ: 'u',
    ぇ: 'e',
    ぉ: 'o',
  };

  // going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
  // in other words, just assume the sokuon could have been applied to anything
  const SOKUON_WHITELIST = {
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
    z: 'z',
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
    const romajiTree = transform(BASIC_ROMAJI);

    const subtreeOf = function subtreeOf(string) {
      return getSubTreeOf(romajiTree, string);
    };
    const setTrans = function setTrans(string, transliteration) {
      subtreeOf(string)[''] = transliteration;
    };

    Object.entries(SPECIAL_SYMBOLS$1).forEach((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
        jsymbol = _ref2[0],
        symbol = _ref2[1];

      subtreeOf(jsymbol)[''] = symbol;
    });

    []
      .concat(
        toConsumableArray(Object.entries(SMALL_Y$1)),
        toConsumableArray(Object.entries(SMALL_AIUEO))
      )
      .forEach((_ref3) => {
        let _ref4 = slicedToArray(_ref3, 2),
          roma = _ref4[0],
          kana = _ref4[1];

        setTrans(roma, kana);
      });

    // きゃ -> kya
    YOON_KANA.forEach((kana) => {
      const firstRomajiChar = subtreeOf(kana)[''][0];
      Object.entries(SMALL_Y$1).forEach((_ref5) => {
        let _ref6 = slicedToArray(_ref5, 2),
          yKana = _ref6[0],
          yRoma = _ref6[1];

        setTrans(kana + yKana, firstRomajiChar + yRoma);
      });
      // きぃ -> kyi
      Object.entries(SMALL_Y_EXTRA).forEach((_ref7) => {
        let _ref8 = slicedToArray(_ref7, 2),
          yKana = _ref8[0],
          yRoma = _ref8[1];

        setTrans(kana + yKana, firstRomajiChar + yRoma);
      });
    });

    Object.entries(YOON_EXCEPTIONS).forEach((_ref9) => {
      let _ref10 = slicedToArray(_ref9, 2),
        kana = _ref10[0],
        roma = _ref10[1];

      // じゃ -> ja
      Object.entries(SMALL_Y$1).forEach((_ref11) => {
        let _ref12 = slicedToArray(_ref11, 2),
          yKana = _ref12[0],
          yRoma = _ref12[1];

        setTrans(kana + yKana, roma + yRoma[1]);
      });
      // じぃ -> jyi, じぇ -> je
      setTrans(`${kana}\u3043`, `${roma}yi`);
      setTrans(`${kana}\u3047`, `${roma}e`);
    });

    romajiTree['っ'] = resolveTsu(romajiTree);

    Object.entries(SMALL_KANA).forEach((_ref13) => {
      let _ref14 = slicedToArray(_ref13, 2),
        kana = _ref14[0],
        roma = _ref14[1];

      setTrans(kana, roma);
    });

    AMBIGUOUS_VOWELS.forEach((kana) => {
      setTrans(`\u3093${kana}`, `n'${subtreeOf(kana)['']}`);
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
    return Object.entries(tree).reduce((tsuTree, _ref15) => {
      let _ref16 = slicedToArray(_ref15, 2),
        key = _ref16[0],
        value = _ref16[1];

      if (!key) {
        // we have reached the bottom of this branch
        const consonant = value.charAt(0);
        tsuTree[key] = Object.keys(SOKUON_WHITELIST).includes(consonant)
          ? SOKUON_WHITELIST[consonant] + value
          : value;
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    const mergedOptions = mergeWithDefaultOptions(options);
    // just throw away the substring index information and just concatenate all the kana
    return splitIntoRomaji(input, mergedOptions)
      .map((romajiToken) => {
        let _romajiToken = slicedToArray(romajiToken, 3),
          start = _romajiToken[0],
          end = _romajiToken[1],
          romaji = _romajiToken[2];

        const makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
        return makeUpperCase ? romaji.toUpperCase() : romaji;
      })
      .join('');
  }

  let customMapping$1 = null;
  function splitIntoRomaji(input, options) {
    let map = getKanaToRomajiTree(options);

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
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return EN_PUNCTUATION_RANGES.some((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    const config = mergeWithDefaultOptions(options);
    if (config.passRomaji) {
      return katakanaToHiragana(input, toRomaji);
    }

    if (isMixed(input, { passKanji: true })) {
      const convertedKatakana = katakanaToHiragana(input, toRomaji);
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
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    const mergedOptions = mergeWithDefaultOptions(options);
    if (mergedOptions.passRomaji) {
      return hiraganaToKatakana(input);
    }

    if (isMixed(input) || isRomaji(input) || isCharEnglishPunctuation(input)) {
      const hiragana = toKana(input.toLowerCase(), mergedOptions);
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
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return JA_PUNCTUATION_RANGES.some((_ref) => {
      let _ref2 = slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

      return isCharInRange(char, start, end);
    });
  }

  /**
   * Tests a character. Returns true if the character is considered Japanese or English punctuation.
   * @param  {String} char character string to test
   * @return {Boolean}
   */
  function isCharPunctuation() {
    const char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (isEmpty(char)) return false;
    return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
  }

  /**
   * Strips trailing [Okurigana](https://en.wikipedia.org/wiki/Okurigana) if `input` is a mix of [Kanji](https://en.wikipedia.org/wiki/Kanji) and [Kana](https://en.wikipedia.org/wiki/Kana)
   * @param  {String} input text
   * @param  {Object} [options={ all: false }] config object specifying if *all* kana should be removed, not just trailing okurigana
   * @return {String} text with okurigana removed
   * @example
   * stripOkurigana('踏み込む')
   * // => '踏み込'
   * stripOkurigana('粘り。')
   * // => '粘。'
   * stripOkurigana('お祝い')
   * // => 'お祝'
   * stripOkurigana('踏み込む', { all: true })
   * // => '踏込'
   * stripOkurigana('お祝い', { all: true })
   * // => '祝'
   */
  function stripOkurigana() {
    const input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    const options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { all: false };

    if (isEmpty(input) || !isJapanese(input) || isKana(input)) {
      return input;
    }
    const chars = [].concat(toConsumableArray(input));

    // strip every kana
    if (options.all) {
      return chars
        .filter((char) => !isCharKana(char))
        .join('');
    }

    // strip trailing only
    const reverseChars = chars.reverse();
    for (let i = 0, len = reverseChars.length; i < len; i += 1) {
      const char = reverseChars[i];
      // pass if it's punctuation
      if (isCharPunctuation(char)) continue; // eslint-disable-line no-continue
      // blank out if not kanji
      if (!isKanji(char)) {
        reverseChars[i] = '';
      } else break; // stop when we hit a kanji char
    }

    return reverseChars.reverse().join('');
  }

  const isCharEnSpace = function isCharEnSpace(x) {
    return x === ' ';
  };
  const isCharJaSpace = function isCharJaSpace(x) {
    return x === '　';
  };
  const isCharJaNum = function isCharJaNum(x) {
    return /[０-９]/.test(x);
  };
  const isCharEnNum = function isCharEnNum(x) {
    return /[0-9]/.test(x);
  };

  const TOKEN_TYPES = {
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
    OTHER: 'other',
  };

  // prettier-ignore
  function getType(input) {
    const compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let EN = TOKEN_TYPES.EN,
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
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$compact = _ref.compact,
      compact = _ref$compact === undefined ? false : _ref$compact,
      _ref$detailed = _ref.detailed,
      detailed = _ref$detailed === undefined ? false : _ref$detailed;

    if (input == null || isEmpty(input)) {
      return [];
    }
    const chars = [].concat(toConsumableArray(input));
    let initial = chars.shift();
    let prevType = getType(initial, compact);
    initial = detailed ? { type: prevType, value: initial } : initial;

    const result = chars.reduce(
      (tokens, char) => {
        const currType = getType(char, compact);
        const sameType = currType === prevType;
        prevType = currType;
        let newValue = char;

        if (sameType) {
          newValue = (detailed ? tokens.pop().value : tokens.pop()) + newValue;
        }

        return detailed
          ? tokens.concat({ type: currType, value: newValue })
          : tokens.concat(newValue);
      },
      [initial]
    );
    return result;
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
}));
