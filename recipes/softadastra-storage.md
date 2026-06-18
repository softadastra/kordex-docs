# Softadastra storage

Store local-first data from a Kordex script.

This recipe uses `kordex:softadastra`.

## Goal

Open a local durable store, write values, read them back, and close the store.

Use this when a script needs local state that can survive after the process exits.

## Permission

Softadastra access requires:

```bash
--allow-softadastra
```

Run scripts that use `kordex:softadastra` like this:

```bash
kordex run main.js --allow-softadastra
```

## Create `main.js`

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "notes-app", ".kordex/data/notes.wal");

softadastra.put("runtime", "kordex");
softadastra.put("mode", "local-first");

console.log("runtime:", softadastra.get("runtime"));
console.log("mode:", softadastra.get("mode"));
console.log("size:", softadastra.size());

softadastra.close();
```

## Run it

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Output

```txt
runtime: kordex
mode: local-first
size: 2
```

## Import

```js
import * as softadastra from "kordex:softadastra";
```

## Functions

```txt
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

Open a Softadastra local store.

```js
softadastra.open("durable", "my-node", ".kordex/data/app.wal");
```

Arguments:

| Argument  | Meaning                    |
| --------- | -------------------------- |
| `mode`    | Storage mode               |
| `nodeId`  | Local node identifier      |
| `walPath` | Local write-ahead-log path |

Common mode values:

```txt
durable
persistent
fast
local
memory
```

Use `durable` when you want local data to survive after the process exits.

## `close`

Close the current store.

```js
softadastra.close();
```

Call it when your script is done writing or reading data.

## `isOpen`

Check if the store is open.

```js
import * as softadastra from "kordex:softadastra";

console.log(softadastra.isOpen());

softadastra.open("durable", "app", ".kordex/data/app.wal");

console.log(softadastra.isOpen());

softadastra.close();

console.log(softadastra.isOpen());
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## `put`

Store a string value by key.

```js
softadastra.put("app:name", "Kordex");
softadastra.put("app:type", "runtime");
```

Keys and values should be strings.

For objects, use `JSON.stringify()`.

## `get`

Read a value by key.

```js
const name = softadastra.get("app:name");

console.log(name);
```

## `contains`

Check if a key exists.

```js
if (softadastra.contains("app:name")) {
  console.log(softadastra.get("app:name"));
}
```

## `remove`

Remove a value by key.

```js
softadastra.put("temp", "value");

console.log(softadastra.contains("temp"));

softadastra.remove("temp");

console.log(softadastra.contains("temp"));
```

## `size`

Return the number of stored entries.

```js
softadastra.put("one", "1");
softadastra.put("two", "2");

console.log(softadastra.size());
```

## Store JSON

Use JSON when the value is structured.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "profile-app", ".kordex/data/profile.wal");

const user = {
  name: "Kordex",
  type: "runtime",
  mode: "local-first",
};

softadastra.put("user:1", JSON.stringify(user));

const saved = JSON.parse(softadastra.get("user:1"));

console.log(saved.name);
console.log(saved.type);
console.log(saved.mode);

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Store notes locally

```js
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "notes-app", ".kordex/data/notes.wal");

function saveNote(title, body) {
  const id = "note:" + hash(title);

  softadastra.put(
    id,
    JSON.stringify({
      id,
      title,
      body,
      savedAt: Date.now(),
    }),
  );

  return id;
}

const id = saveNote("Local-first", "Write locally before syncing.");

const note = JSON.parse(softadastra.get(id));

console.log(note.title);
console.log(note.body);

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

`kordex:crypto` does not require permission.

`kordex:softadastra` requires `--allow-softadastra`.

## Use with `kordex:path`

Build the WAL path with `kordex:path`.

```js
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const walPath = join(".", ".kordex", "data", "app.wal");

softadastra.open("durable", "app-node", walPath);

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Use with environment variables

```js
import { get } from "kordex:env";
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const nodeId = get("NODE_ID") || "local-node";
const dataDir = get("KORDEX_DATA_DIR") || ".kordex/data";
const walPath = join(dataDir, "app.wal");

softadastra.open("durable", nodeId, walPath);

softadastra.put("node", nodeId);

console.log(softadastra.get("node"));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
NODE_ID=demo-node kordex run main.js --allow-env --allow-softadastra
```

Permissions:

```txt
kordex:env          requires --allow-env
kordex:softadastra  requires --allow-softadastra
```

## Read after restart

First run:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "restart-demo", ".kordex/data/restart.wal");

softadastra.put("message", "stored locally");

console.log("saved");

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

Second run:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "restart-demo", ".kordex/data/restart.wal");

console.log(softadastra.get("message"));

softadastra.close();
```

Run again:

```bash
kordex run main.js --allow-softadastra
```

Output:

```txt
stored locally
```

## Local cache example

```js
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "cache-app", ".kordex/data/cache.wal");

function cacheKey(input) {
  return "cache:" + hash(input);
}

function setCache(input, value) {
  softadastra.put(cacheKey(input), value);
}

function getCache(input) {
  const key = cacheKey(input);

  if (!softadastra.contains(key)) {
    return null;
  }

  return softadastra.get(key);
}

setCache("products", "cached product list");

console.log(getCache("products"));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Queue work for later sync

A local-first app can save work locally first.

```js
import { hash } from "kordex:crypto";
import { unixMs } from "kordex:timer";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "queue-app", ".kordex/data/queue.wal");

function enqueue(type, payload) {
  const id = "task:" + hash(type + ":" + unixMs());

  softadastra.put(
    id,
    JSON.stringify({
      id,
      type,
      payload,
      status: "pending",
      createdAt: unixMs(),
    }),
  );

  return id;
}

const taskId = enqueue("create-note", {
  title: "Offline note",
  body: "Save first, sync later.",
});

console.log(softadastra.get(taskId));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## `tick`

Run one Softadastra sync tick.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "sync-node", ".kordex/data/sync.wal");

softadastra.tick();

softadastra.close();
```

`tick()` is useful when sync behavior is connected.

## `syncState`

Return sync state as a JSON string.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "sync-node", ".kordex/data/sync.wal");

const state = JSON.parse(softadastra.syncState());

console.log(JSON.stringify(state, null, 2));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## `nodeInfo`

Return local node metadata as a JSON string.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "node-demo", ".kordex/data/node.wal");

const info = JSON.parse(softadastra.nodeInfo());

console.log(JSON.stringify(info, null, 2));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Recommended usage

Create the data directory before running:

```bash
mkdir -p .kordex/data
```

Use one WAL file per app or feature:

```txt
.kordex/data/app.wal
.kordex/data/notes.wal
.kordex/data/cache.wal
```

Use clear key prefixes:

```txt
note:1
cache:products
task:create-note
user:local
```

Store objects as JSON:

```js
softadastra.put("note:1", JSON.stringify(note));
```

Read objects with `JSON.parse()`:

```js
const note = JSON.parse(softadastra.get("note:1"));
```

Close the store when the script is done:

```js
softadastra.close();
```

Enable only the required permission:

```bash
kordex run main.js --allow-softadastra
```

## Common errors

### Missing permission

Wrong:

```bash
kordex run main.js
```

when the script uses:

```js
import * as softadastra from "kordex:softadastra";
```

Correct:

```bash
kordex run main.js --allow-softadastra
```

### Wrong module name

Wrong:

```js
import * as softadastra from "softadastra";
```

Correct:

```js
import * as softadastra from "kordex:softadastra";
```

Kordex standard modules use the `kordex:` prefix.

### Forgetting to open the store

Wrong:

```js
softadastra.put("key", "value");
```

Correct:

```js
softadastra.open("durable", "app", ".kordex/data/app.wal");
softadastra.put("key", "value");
softadastra.close();
```

### Forgetting to create the data directory

Wrong:

```bash
kordex run main.js --allow-softadastra
```

when `.kordex/data` does not exist.

Correct:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

### Passing objects directly

Wrong:

```js
softadastra.put("user:1", {
  name: "Kordex",
});
```

Correct:

```js
softadastra.put(
  "user:1",
  JSON.stringify({
    name: "Kordex",
  }),
);
```

Values should be strings.

### Reading JSON without parsing

Wrong:

```js
const user = softadastra.get("user:1");

console.log(user.name);
```

Correct:

```js
const user = JSON.parse(softadastra.get("user:1"));

console.log(user.name);
```

### Using empty keys

Wrong:

```js
softadastra.put("", "value");
```

Correct:

```js
softadastra.put("app:key", "value");
```

### Giving unrelated permissions

Wrong:

```bash
kordex run main.js --allow-softadastra --allow-fs --allow-env --allow-process --allow-net
```

when the script only uses Softadastra storage.

Better:

```bash
kordex run main.js --allow-softadastra
```

## Related pages

- [Softadastra module](../modules/softadastra.md)
- [Permissions](../guide/permissions.md)
- [Local-first](../guide/local-first.md)
- [Path utilities](./path-utilities.md)
- [Hashing](./hashing.md)
- [Environment variables](./environment-variables.md)
