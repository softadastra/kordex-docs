# `kordex:timer`

Time utility module for Kordex scripts.

Use it to read timestamps or pause execution for a short time.

```js id="i4dqbi"
import { now, unixMs, sleep } from "kordex:timer";

console.log(now());
console.log(unixMs());

sleep(100);

console.log("done");
```

Run:

```bash id="m3hx4d"
kordex run main.js
```

## Import

```js id="vx9vcl"
import { now } from "kordex:timer";
```

Or import everything:

```js id="o5r6n2"
import * as timer from "kordex:timer";

console.log(timer.now());
console.log(timer.unixMs());
```

## Permission

`kordex:timer` does not require a permission flag.

```bash id="hpi1lj"
kordex run main.js
```

No need for:

```bash id="a2iuid"
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Timer functions are safe utility functions.

## Functions

```txt id="b9ssw6"
now()
sleep(milliseconds)
unixMs()
```

## `now`

Return a monotonic timestamp in milliseconds.

```js id="k0n4rh"
import { now } from "kordex:timer";

const start = now();

// work here

const end = now();

console.log("elapsed:", end - start);
```

`now()` is useful for measuring elapsed time.

It is not meant to represent the current calendar date.

## `unixMs`

Return the current UNIX timestamp in milliseconds.

```js id="eon3pl"
import { unixMs } from "kordex:timer";

console.log(unixMs());
```

Use `unixMs()` when you need a real timestamp that can be stored, logged, or compared across runs.

Example:

```js id="fxwhie"
import { unixMs } from "kordex:timer";

const event = {
  type: "created",
  createdAt: unixMs(),
};

console.log(event.createdAt);
```

## `sleep`

Pause execution for a number of milliseconds.

```js id="x53p0q"
import { sleep } from "kordex:timer";

console.log("before");

sleep(500);

console.log("after");
```

`sleep()` is synchronous.

That means the script waits until the delay is finished before continuing.

## Measure elapsed time

```js id="wep0ow"
import { now, sleep } from "kordex:timer";

const start = now();

sleep(250);

const end = now();

console.log("elapsed ms:", end - start);
```

Run:

```bash id="l4xrru"
kordex run main.js
```

## Add timestamps to logs

```js id="cgjyb7"
import { unixMs } from "kordex:timer";

console.log("started at", unixMs());
console.log("finished at", unixMs());
```

## Use with `kordex:console`

```js id="u32n48"
import { log } from "kordex:console";
import { now, sleep } from "kordex:timer";

const start = now();

sleep(100);

log("elapsed:", now() - start, "ms");
```

Run:

```bash id="suybxc"
kordex run main.js
```

## Use with local-first data

Use `unixMs()` when saving local records.

```js id="dgb6fy"
import { unixMs } from "kordex:timer";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "timer-demo", ".kordex/data/timer-demo.wal");

softadastra.put("last_run", String(unixMs()));

console.log(softadastra.get("last_run"));

softadastra.close();
```

Run:

```bash id="dh06ap"
kordex run main.js --allow-softadastra
```

## Use with filesystem

```js id="ty99zk"
import { unixMs } from "kordex:timer";
import { writeText } from "kordex:fs";

writeText("last-run.txt", String(unixMs()));
```

Run:

```bash id="c61zdt"
kordex run main.js --allow-fs
```

The permission is required because of `kordex:fs`, not because of `kordex:timer`.

## Delay before an operation

```js id="fcoaz4"
import { sleep } from "kordex:timer";

console.log("Preparing...");

sleep(1000);

console.log("Ready");
```

## Recommended usage

Use `now()` for performance timing:

```js id="a6xf27"
const start = now();
// work
const elapsed = now() - start;
```

Use `unixMs()` for stored timestamps:

```js id="bezjui"
const createdAt = unixMs();
```

Use `sleep()` only when you really want to block the script:

```js id="mlsdv5"
sleep(500);
```

## Common usage

```js id="pe3tld"
import { now, unixMs, sleep } from "kordex:timer";

console.log("unix:", unixMs());

const start = now();

sleep(100);

console.log("elapsed:", now() - start);
```

Run:

```bash id="j304u0"
kordex run main.js
```

## Common errors

### Wrong function name

Wrong:

```js id="a1y6n8"
import { unix_ms } from "kordex:timer";
```

Correct:

```js id="oqw4go"
import { unixMs } from "kordex:timer";
```

Available functions:

```txt id="zw1fp5"
now
sleep
unixMs
```

### Passing a string to `sleep`

Wrong:

```js id="gk4zuf"
sleep("1000");
```

Correct:

```js id="beo107"
sleep(1000);
```

`sleep()` expects a number.

### Passing a negative delay

Wrong:

```js id="hvj8pv"
sleep(-100);
```

Correct:

```js id="qz2o4h"
sleep(100);
```

The delay must be a positive number or zero.

### Expecting `sleep` to be async

Wrong:

```js id="cp6q7o"
await sleep(100);
```

Correct:

```js id="n7jamv"
sleep(100);
```

`sleep()` is synchronous in the current Kordex standard module.

### Adding unnecessary permissions

Wrong:

```bash id="l54q76"
kordex run main.js --allow-fs
```

when the script only uses:

```js id="xbmkk4"
import { now } from "kordex:timer";
```

Correct:

```bash id="yqj44o"
kordex run main.js
```

## Related pages

- [Modules](./index.md)
- [Console module](./console.md)
- [Crypto module](./crypto.md)
- [Filesystem module](./fs.md)
- [Permissions](../guide/permissions.md)
- [Local-first](../guide/local-first.md)
