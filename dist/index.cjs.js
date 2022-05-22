'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isBrowser = function () {
    return typeof window !== "undefined";
};
var tryJSONparse = function (obj) {
    try {
        return JSON.parse(obj);
    }
    catch (_a) {
        return obj;
    }
};
var tryJSONStringify = function (obj) {
    if (typeof obj === "string")
        return obj;
    try {
        return JSON.stringify(obj);
    }
    catch (_a) {
        return obj;
    }
};

var LocalStorageContext = react.createContext({});
var LocalStorageProvider = function (_a) {
    var _b = _a.withState, withState = _b === void 0 ? true : _b, onChange = _a.onChange, children = _a.children;
    var getLocalStorage = react.useCallback(function () {
        if (!isBrowser())
            return {};
        var localStorageKeys = Object.keys(window.localStorage);
        var localStorage = {};
        localStorageKeys.forEach(function (key) {
            var value = window.localStorage[key];
            localStorage[key] = tryJSONparse(value);
        });
        return localStorage;
    }, []);
    var _c = react.useState(getLocalStorage()), localStorage = _c[0], setLocalStorage = _c[1];
    var setItem = react.useCallback(function (_a) {
        var key = _a.key, _value = _a.value;
        if (!key)
            throw new Error("No key passed");
        var value = tryJSONparse(_value);
        window.localStorage.setItem(key, tryJSONStringify(_value));
        if (withState) {
            setLocalStorage(function (old) {
                var _a;
                var newLocalStorage = __assign(__assign({}, old), (_a = {}, _a[key] = value, _a));
                if (onChange)
                    onChange(newLocalStorage);
                return newLocalStorage;
            });
        }
        else {
            onChange(getLocalStorage());
        }
    }, [onChange, withState, getLocalStorage]);
    var getItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        if (withState)
            return localStorage[key];
        else
            return getLocalStorage()[key];
    }, [localStorage, withState, getLocalStorage]);
    var removeItem = react.useCallback(function (key) {
        if (!key)
            throw new Error("No key passed");
        window.localStorage.removeItem(key);
        if (withState)
            setLocalStorage(function (old) {
                var newLocalStorage = __assign({}, old);
                delete newLocalStorage[key];
                if (onChange)
                    onChange(newLocalStorage);
                return newLocalStorage;
            });
        else if (onChange)
            onChange(getLocalStorage());
    }, [onChange, withState, getLocalStorage]);
    return (jsxRuntime.jsx(LocalStorageContext.Provider, __assign({ value: {
            localStorage: localStorage,
            getItem: getItem,
            setItem: setItem,
            removeItem: removeItem
        } }, { children: children })));
};
var useLocalStorageContext = function () {
    var context = react.useContext(LocalStorageContext);
    if (context === undefined) {
        throw new Error('useLocalStorageContext must be used within an LocalStorageContext.Provider');
    }
    return context;
};

var useLocalStorage = function (key) {
    var _a = useLocalStorageContext(), _getItem = _a.getItem, _setItem = _a.setItem, _removeItem = _a.removeItem, localStorage = _a.localStorage;
    var getItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _getItem(key || _key);
    }, [_getItem]);
    var setItem = react.useCallback(function (value) {
        return _setItem({ key: key, value: value });
    }, [_setItem]);
    var setItemWithKey = react.useCallback(function (_key, value) {
        return _setItem({ key: key || _key, value: value });
    }, [_setItem]);
    var removeItem = react.useCallback(function (_key) {
        if (_key === void 0) { _key = undefined; }
        return _removeItem(key || _key);
    }, [_removeItem]);
    return { getItem: getItem, setItem: setItem, removeItem: removeItem, setItemWithKey: setItemWithKey, localStorage: localStorage };
};

exports.LocalStorageProvider = LocalStorageProvider;
exports.useLocalStorage = useLocalStorage;
