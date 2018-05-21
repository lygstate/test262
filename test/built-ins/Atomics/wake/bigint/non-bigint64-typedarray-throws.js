// Copyright (C) 2018 Amal Hussein. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wake
description: >
  Throws a TypeError if typedArray arg is not an BigInt64Array
info: |
  Atomics.wake( typedArray, index, count )

  1.Let buffer be ? ValidateSharedIntegerTypedArray(typedArray, true).
    ...
      5.If onlyInt32 is true, then
        If typeName is not "BigInt64Array", throw a TypeError exception.
features: [Atomics, BigInt, TypedArray]
---*/

var poisoned = {
  valueOf: function() {
    throw new Test262Error('should not evaluate this code');
  }
};

assert.throws(TypeError, function() {
  Atomics.wake(new BigUint64Array(), poisoned, poisoned);
}, '`Atomics.wake(new BigUint64Array(), poisoned, poisoned)` throws TypeError');
