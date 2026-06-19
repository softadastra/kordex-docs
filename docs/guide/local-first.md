# Local-first

Kordex is built for reliable local-first JavaScript applications.

A local-first application keeps working even when the network is slow, unstable, or unavailable.

The application does not wait for the server to be useful.

It can run locally, read local state, write local state, and synchronize later.

## What local-first means

Local-first means the local device is not just a temporary client.

It becomes the first place where the app can work.

```txt
local execution first
local state first
network sync later
```

This is useful for applications that must keep working in real conditions:

```txt
unstable internet
offline work
field usage
local data capture
edge devices
desktop tools
internal tools
reliable scripts
```

## Why Kordex cares about this

Most JavaScript runtimes are designed around servers, web tooling, and online workflows.

Kordex starts from another question:

```txt
What if the app must keep working even when the network is not available?
```

That changes the runtime design.

Kordex focuses on:

```txt
local execution
explicit permissions
native modules
durable local state
offline-ready workflows
predictable system access
```

## Simple local script

Create `main.js`:

```js
console.log("Kordex runs locally");
```

Run:

```bash
kordex run main.js
```

This script does not need a server.

It runs on the local machine.

## Local files

Local-first apps often need local files.

Create `main.js`:

```js
import { writeText, readText } from "kordex:fs";

writeText("note.txt", "Saved locally");

console.log(readText("note.txt"));
```

Run with filesystem permission:

```bash
kordex run main.js --allow-fs
```

Output:

```txt
Saved locally
```

Kordex requires `--allow-fs` because file access is sensitive.

## Local configuration

A local-first app can load local configuration from JSON.

Create `config.json`:

```json
{
  "app": "Kordex",
  "mode": "local-first"
}
```

Create `main.js`:

```js
import config from "./config.json";

console.log(config.app);
console.log(config.mode);
```

Run:

```bash
kordex run main.js
```

Output:

```txt
Kordex
local-first
```

## Local durable state

Kordex can use `kordex:softadastra` for local-first storage foundations.

This module requires explicit permission.

Create `main.js`:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "local-app", ".kordex/data/app.wal");

softadastra.put("status", "offline-ready");
softadastra.put("runtime", "kordex");

console.log(softadastra.get("status"));
console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
kordex run main.js --allow-softadastra
```

Output:

```txt
offline-ready
kordex
```

The script writes data locally first.

Synchronization can be added later.

## Local-first flow

A typical local-first flow looks like this:

```txt
1. start the app locally
2. read local state
3. write changes locally
4. keep working without network
5. sync when possible
```

Kordex is designed to support this direction.

## Permissions make local-first safer

Local-first apps may touch powerful system resources.

Kordex keeps those resources behind explicit flags.

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

This makes system access visible.

Example:

```bash
kordex run main.js --allow-fs --allow-softadastra
```

The command clearly says:

```txt
this script can access files
this script can access Softadastra local storage
```

## Safe modules for local logic

Some modules are safe utilities and can be used without permissions.

```txt
kordex:path
kordex:timer
kordex:crypto
kordex:console
```

Example:

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file = join(".kordex", "data", "app.wal");
const id = hash("local-user");

console.log(file);
console.log(id);
```

Run:

```bash
kordex run main.js
```

## Files plus local storage

A local-first script can combine files and durable storage.

```js
import { exists, readText } from "kordex:fs";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

if (exists("profile.json")) {
  const profile = readText("profile.json");
  softadastra.put("profile", profile);
}

console.log("saved:", softadastra.contains("profile"));

softadastra.close();
```

Run:

```bash
kordex run main.js --allow-fs --allow-softadastra
```

## Offline-ready does not mean no network

Local-first does not mean the app never uses the network.

It means the app does not depend on the network to keep working.

A good local-first app can:

```txt
work locally
store local changes
continue during network failure
sync later when network is available
```

Kordex gives JavaScript a runtime foundation for that direction.

## Good local-first structure

A small project can be organized like this:

```txt
app/
├── kordex.json
└── src/
    ├── main.js
    ├── storage.js
    ├── config.js
    └── sync.js
```

Example `kordex.json`:

```json
{
  "name": "local-app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "scripts": {
    "dev": "kordex run --allow-softadastra",
    "sync": "kordex run src/sync.js --allow-net --allow-softadastra"
  }
}
```

This keeps the local app and sync logic separate.

## Recommended approach

Start simple.

Use local files for simple data.

Use `kordex:softadastra` when the app needs durable local state.

Use network access only where sync is needed.

Keep permissions small and clear.

## What Kordex is aiming for

Kordex is moving toward this model:

```txt
JavaScript execution
+ explicit native permissions
+ local durable state
+ offline-ready behavior
+ optional synchronization
```

Not only:

```txt
run JavaScript
```

But:

```txt
run reliable local-first JavaScript applications
```

## Next steps

Continue with:

- [Permissions](./permissions.md)
- [Imports](./imports.md)
- [Running Scripts](./running-scripts.md)
- [Softadastra Module](../modules/softadastra.md)
