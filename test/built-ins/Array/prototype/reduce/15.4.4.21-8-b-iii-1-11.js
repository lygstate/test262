// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.reduce
es5id: 15.4.4.21-8-b-iii-1-11
description: >
    Array.prototype.reduce - element to be retrieved is own accessor
    property that overrides an inherited data property on an
    Array-like object
---*/

var testResult = false;

function callbackfn(prevVal, curVal, idx, obj) {
  if (idx === 1) {
    testResult = (prevVal === "9");
  }
}

var proto = {
  0: 0,
  1: 1,
  2: 2
};

var Con = function() {};
Con.prototype = proto;

var child = new Con();
child.length = 3;

Object.defineProperty(child, "0", {
  get: function() {
    return "9";
  },
  configurable: true
});

Array.prototype.reduce.call(child, callbackfn);

assert(testResult, 'testResult !== true');
