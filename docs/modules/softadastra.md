# `kordex:softadastra`

Softadastra storage module for Kordex scripts.

Use it to open a local-first store, write values, read values, remove values, inspect local state, and run a sync tick.

```js id="ql3n6t"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "my-app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");
softadastra.put("mode", "local-first");

console.log(softadastra.get("runtime"));
console.log(softadastra.get("mode"));
console.log("size:", softadastra.size());

softadastra.close();
```

Run with Softadastra permission:

```bash id="k35fuu"
kordex run main.js --allow-softadastra
```

## Import

```js id="x9ro9k"
import * as softadastra from "kordex:softadastra";
```

The module is usually imported as a namespace because it exposes storage operations:

```js id="b22grz"
softadastra.open("durable", "app", ".kordex/data/app.wal");
softadastra.put("key", "value");
console.log(softadastra.get("key"));
softadastra.close();
```

## Permission

`kordex:softadastra` requires Softadastra permission.

```bash id="a61bcb"
--allow-softadastra
```

Correct:

```bash id="m5u6bm"
kordex run main.js --allow-softadastra
```

Without permission, scripts should not access `kordex:softadastra`.

Softadastra access is sensitive because it opens a local durable store and writes local application data.

## Functions

```txt id="q5ij2r"
open(mode, nodeId, walPath)
close()
isOpen()
put(key, value)
get(key)
remove(key)
contains(key)
size()
tick()
syncState()
nodeInfo()
```

## `open`

Open the Softadastra local store.

```js id="h3i1qh"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "my-app", ".kordex/data/my-app.wal");
```

Arguments:

```txt id="uyc9aq"
mode
nodeId
walPath
```

Example:

```js id="pl38wo"
softadastra.open("durable", "kordex-example", ".kordex/data/example.wal");
```

## Store modes

Supported modes:

```txt id="o74oxe"
durable
persistent
fast
local
memory
```

Use `durable` when you want a reliable local-first store.

```js id="h0hjlm"
softadastra.open("durable", "app", ".kordex/data/app.wal");
```

Use `memory` when you only need temporary data during the current run.

```js id="cm4i0g"
softadastra.open("memory", "test", "");
```

## `close`

Close the current Softadastra store.

```js id="bi163d"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("name", "Kordex");

softadastra.close();
```

Always close the store when your script is done.

## `isOpen`

Return `true` if the Softadastra store is open.

```js id="jy6hul"
import * as softadastra from "kordex:softadastra";

console.log(softadastra.isOpen());

softadastra.open("durable", "app", ".kordex/data/app.wal");

console.log(softadastra.isOpen());

softadastra.close();

console.log(softadastra.isOpen());
```

Run:

```bash id="vojf3m"
kordex run main.js --allow-softadastra
```

## `put`

Store a string value by key.

```js id="ugf0xv"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

softadastra.close();
```

`put()` expects strings:

```txt id="ao62r3"
key
value
```

For numbers or objects, convert them before storing.

```js id="n4x6qq"
softadastra.put("count", String(12));
softadastra.put("user", JSON.stringify({ name: "Kordex" }));
```

## `get`

Read a string value by key.

```js id="aut5nt"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Output:

```txt id="l063ot"
kordex
```

## `remove`

Remove a value by key.

```js id="vah6hg"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("temp", "yes");

console.log(softadastra.contains("temp"));

softadastra.remove("temp");

console.log(softadastra.contains("temp"));

softadastra.close();
```

Example output:

```txt id="od9vx4"
true
false
```

## `contains`

Return `true` if a key exists.

```js id="n0efcb"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("status", "ready");

console.log(softadastra.contains("status"));
console.log(softadastra.contains("missing"));

softadastra.close();
```

Example output:

```txt id="w8ishk"
true
false
```

## `size`

Return the local store size.

```js id="iq4izr"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("a", "one");
softadastra.put("b", "two");

console.log(softadastra.size());

softadastra.close();
```

## `tick`

Run one Softadastra sync tick.

```js id="dfnmxu"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("message", "local first");

softadastra.tick();

softadastra.close();
```

Use `tick()` when you want the store to advance one sync step.

In the current Kordex module, this is a low-level primitive.

## `syncState`

Return the Softadastra sync state as a JSON string.

```js id="da7n47"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

const state = softadastra.syncState();

console.log(state);

softadastra.close();
```

You can parse it when you need structured data:

```js id="dysvdc"
const state = JSON.parse(softadastra.syncState());

console.log(state);
```

## `nodeInfo`

Return local node metadata as a JSON string.

```js id="tl86sk"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app-node", ".kordex/data/app.wal");

const info = softadastra.nodeInfo();

console.log(info);

softadastra.close();
```

You can parse it:

```js id="stt7ke"
const info = JSON.parse(softadastra.nodeInfo());

console.log(info);
```

## Local-first storage example

```js id="owx5q5"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "notes-app", ".kordex/data/notes.wal");

softadastra.put("note:1", "Write docs");
softadastra.put("note:2", "Run locally first");

console.log(softadastra.get("note:1"));
console.log(softadastra.get("note:2"));

console.log("contains note:1:", softadastra.contains("note:1"));
console.log("store size:", softadastra.size());

softadastra.close();
```

Run:

```bash id="l54lyw"
kordex run main.js --allow-softadastra
```

## Store JSON data

Softadastra values are strings.

Use `JSON.stringify()` before storing objects.

```js id="nptklu"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "users", ".kordex/data/users.wal");

const user = {
  name: "Kordex",
  type: "runtime",
  localFirst: true,
};

softadastra.put("user:1", JSON.stringify(user));

const saved = JSON.parse(softadastra.get("user:1"));

console.log(saved.name);
console.log(saved.type);
console.log(saved.localFirst);

softadastra.close();
```

Run:

```bash id="a3ym2l"
kordex run main.js --allow-softadastra
```

## Store timestamps

```js id="mj341u"
import { unixMs } from "kordex:timer";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "events", ".kordex/data/events.wal");

softadastra.put("last_event_at", String(unixMs()));

console.log(softadastra.get("last_event_at"));

softadastra.close();
```

Run:

```bash id="yhk7l7"
kordex run main.js --allow-softadastra
```

`kordex:timer` does not require permission.

`kordex:softadastra` requires `--allow-softadastra`.

## Use stable keys with `kordex:crypto`

```js id="h6736t"
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "cache", ".kordex/data/cache.wal");

const input = "product:softadastra-aegis";
const key = "cache:" + hash(input);

softadastra.put(key, "cached value");

console.log(softadastra.get(key));

softadastra.close();
```

Run:

```bash id="ha45o1"
kordex run main.js --allow-softadastra
```

`kordex:crypto` does not require permission.

## Use environment for store path

```js id="dzofme"
import { get } from "kordex:env";
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const dataDir = get("KORDEX_DATA_DIR") || ".kordex/data";
const storePath = join(dataDir, "app.wal");

softadastra.open("durable", "env-app", storePath);

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash id="tsg18p"
KORDEX_DATA_DIR=.kordex/data kordex run main.js --allow-env --allow-softadastra
```

Permissions:

```txt id="ckjmu3"
--allow-env          needed for kordex:env
--allow-softadastra  needed for kordex:softadastra
```

## Use with `kordex:console`

```js id="p7rbm7"
import { log } from "kordex:console";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "console-demo", ".kordex/data/console-demo.wal");

softadastra.put("status", "ready");

log("status:", softadastra.get("status"));
log("size:", softadastra.size());

softadastra.close();
```

Run:

```bash id="wklx6a"
kordex run main.js --allow-softadastra
```

## Durable app state

Use Softadastra when local state matters.

```js id="si7x3r"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "counter-app", ".kordex/data/counter.wal");

const current = softadastra.contains("count")
  ? Number(softadastra.get("count"))
  : 0;

const next = current + 1;

softadastra.put("count", String(next));

console.log("run count:", next);

softadastra.close();
```

Run several times:

```bash id="gz8jdj"
kordex run main.js --allow-softadastra
kordex run main.js --allow-softadastra
kordex run main.js --allow-softadastra
```

The value can survive across runs when using a durable store path.

## Current scope

`kordex:softadastra` currently provides local-first storage primitives.

It can:

```txt id="vycppf"
open a local store
close the store
check if the store is open
put string values
get string values
remove values
check keys
return local size
run a sync tick
return sync state
return node metadata
```

It is not a full database query layer.

It does not currently expose:

```txt id="l33g6c"
SQL queries
collections
indexes
transactions from JavaScript
remote account login
automatic cloud sync configuration
```

Use it as a low-level durable local-first foundation.

Higher-level APIs can be built on top of it.

## Permission model

`kordex:softadastra` is disabled unless the script is run with:

```bash id="xq554f"
--allow-softadastra
```

Good:

```bash id="tna3s5"
kordex run main.js --allow-softadastra
```

Avoid giving permissions that the script does not need.

Wrong:

```bash id="pflp86"
kordex run main.js --allow-softadastra --allow-fs --allow-env --allow-process
```

when the script only uses Softadastra storage.

Better:

```bash id="jafoem"
kordex run main.js --allow-softadastra
```

## Recommended usage

Open once near the start:

```js id="a15zyd"
softadastra.open("durable", "app", ".kordex/data/app.wal");
```

Write string values:

```js id="ti6v3k"
softadastra.put("key", "value");
```

Use JSON for objects:

```js id="f9xl5y"
softadastra.put("user", JSON.stringify(user));
```

Read values by key:

```js id="h5mnal"
const value = softadastra.get("key");
```

Close when done:

```js id="serm7l"
softadastra.close();
```

Use a stable `nodeId` for the same app:

```js id="ggigbx"
softadastra.open("durable", "my-app", ".kordex/data/my-app.wal");
```

Use a stable WAL path for durable data:

```js id="lld19o"
.kordex/data/my-app.wal
```

## Common usage

```js id="i9x3k1"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "demo", ".kordex/data/demo.wal");

softadastra.put("hello", "world");

console.log("open:", softadastra.isOpen());
console.log("hello:", softadastra.get("hello"));
console.log("exists:", softadastra.contains("hello"));
console.log("size:", softadastra.size());
console.log("node:", softadastra.nodeInfo());
console.log("sync:", softadastra.syncState());

softadastra.tick();

softadastra.remove("hello");

console.log("exists:", softadastra.contains("hello"));

softadastra.close();
```

Run:

```bash id="onxfwq"
kordex run main.js --allow-softadastra
```

## Common errors

### Missing permission

Wrong:

```bash id="xzv42x"
kordex run main.js
```

when the script uses:

```js id="xuobxd"
import * as softadastra from "kordex:softadastra";
```

Correct:

```bash id="qhluck"
kordex run main.js --allow-softadastra
```

### Wrong module name

Wrong:

```js id="gbafqo"
import * as softadastra from "softadastra";
```

Correct:

```js id="dw8w8n"
import * as softadastra from "kordex:softadastra";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="wnfp8f"
softadastra.set("key", "value");
```

Correct:

```js id="lva3c4"
softadastra.put("key", "value");
```

Available functions:

```txt id="o7ok76"
open
close
isOpen
put
get
remove
contains
size
tick
syncState
nodeInfo
```

### Calling `put` before `open`

Wrong:

```js id="hys5fh"
import * as softadastra from "kordex:softadastra";

softadastra.put("key", "value");
```

Correct:

```js id="r96gtx"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("key", "value");

softadastra.close();
```

Open the store before using storage operations.

### Passing non-string values to `put`

Wrong:

```js id="kl2c9d"
softadastra.put("count", 1);
```

Correct:

```js id="thmdsj"
softadastra.put("count", String(1));
```

For objects:

```js id="q4gd0o"
softadastra.put("user", JSON.stringify(user));
```

### Reading JSON without parsing

Wrong:

```js id="oi5b21"
const user = softadastra.get("user");

console.log(user.name);
```

Correct:

```js id="rbyjt2"
const user = JSON.parse(softadastra.get("user"));

console.log(user.name);
```

Values are stored as strings.

### Forgetting to close the store

Avoid:

```js id="injrz0"
softadastra.open("durable", "app", ".kordex/data/app.wal");
softadastra.put("key", "value");
```

Better:

```js id="gax1z3"
softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("key", "value");

softadastra.close();
```

### Using a different WAL path every run

Avoid:

```js id="r3bkex"
softadastra.open("durable", "app", ".kordex/data/" + Date.now() + ".wal");
```

Better:

```js id="l1a6fz"
softadastra.open("durable", "app", ".kordex/data/app.wal");
```

Use a stable path if you want data to survive across runs.

### Expecting full remote sync

`tick()` is a sync primitive.

It does not mean your app is automatically connected to a remote cloud service.

Use it as a local-first foundation while higher-level sync features evolve.

## Related pages

- [Modules](./index.md)
- [Timer module](./timer.md)
- [Crypto module](./crypto.md)
- [Filesystem module](./fs.md)
- [Environment module](./env.md)
- [Permissions](../guide/permissions.md)
- [Local-first](../guide/local-first.md)
