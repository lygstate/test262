// Copyright (C) 2018 Amal Hussein.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.wait
description: >
  NaN timeout arg should result in an infinite timeout
info: |
  Atomics.wait( typedArray, index, value, timeout )

  4.Let q be ? ToNumber(timeout).
    ...
    Undefined    Return NaN.
  5.If q is NaN, let t be +∞, else let t be max(q, 0)

includes: [atomicsHelper.js]
features: [Atomics, BigInt, SharedArrayBuffer, TypedArray]
---*/

$262.agent.start(`
  $262.agent.receiveBroadcast(function(sab) {
    const i64a = new BigInt64Array(sab);
    $262.agent.report(Atomics.wait(i64a, 0, 0, NaN));  // NaN => +Infinity
    $262.agent.leaving();
  });
`);

const i64a = new BigInt64Array(
  new SharedArrayBuffer(BigInt64Array.BYTES_PER_ELEMENT)
);

$262.agent.broadcast(i64a.buffer);
$262.agent.sleep(100);
assert.sameValue(Atomics.wake(i64a, 0), 1);
assert.sameValue(getReport(), 'ok');
