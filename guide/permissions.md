# Permissions

Kordex does not give scripts full system access by default.

A script can run normal JavaScript, import safe utility modules, and use local code without special flags.

Sensitive native modules must be enabled explicitly when the script runs.

## Why permissions exist

Kordex is built for reliable local-first applications.

That means scripts may need access to files, environment variables, processes, network helpers, or local durable storage.

Those capabilities are useful, but they are also sensitive.

Kordex keeps them behind clear runtime flags.

```txt
no silent access
no hidden system power
explicit permissions only
```

## Permission flags

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

## Safe modules

These modules are available by default:

```txt
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

They do not need permission flags.

Example:

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file = join("data", "hello.txt");

console.log(file);
console.log(hash("hello"));
```

Run:

```bash
kordex run main.js
```

## Permission-gated modules

These modules need explicit permission:

| Module               | Permission            |
| -------------------- | --------------------- |
| `kordex:fs`          | `--allow-fs`          |
| `kordex:env`         | `--allow-env`         |
| `kordex:http`        | `--allow-net`         |
| `kordex:process`     | `--allow-process`     |
| `kordex:softadastra` | `--allow-softadastra` |

## Filesystem access

Use `--allow-fs` when a script imports `kordex:fs`.

```js
import { writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(readText("hello.txt"));
```

Run:

```bash
kordex run main.js --allow-fs
```

Without `--allow-fs`, filesystem access is rejected.

## Environment access

Use `--allow-env` when a script imports `kordex:env`.

```js
import { get, has } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run:

```bash
kordex run main.js --allow-env
```

Environment variables can contain secrets, tokens, local paths, or deployment details.

Only enable this permission when the script needs it.

## Network helpers

Use `--allow-net` when a script imports `kordex:http`.

```js
import { isSuccess, statusText, buildUrl } from "kordex:http";

console.log(isSuccess(200));
console.log(statusText(404));
console.log(buildUrl("https://example.com", "/api"));
```

Run:

```bash
kordex run main.js --allow-net
```

The current `kordex:http` module provides HTTP utility helpers.

Real network APIs can be added behind the same permission model later.

## Process access

Use `--allow-process` when a script imports `kordex:process`.

```js
import { cwd, chdir, run } from "kordex:process";

console.log(cwd());

chdir("scripts");

console.log(cwd());

run("echo hello");
```

Run:

```bash
kordex run main.js --allow-process
```

Process access is powerful.

It can change the working directory or run shell commands.

Use it carefully.

## Softadastra access

Use `--allow-softadastra` when a script imports `kordex:softadastra`.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
kordex run main.js --allow-softadastra
```

This permission gives the script access to Softadastra local-first storage foundations.

Use it when the app needs durable local state.

## Multiple permissions

A script can use multiple permissions.

Example:

```js
import { readText } from "kordex:fs";
import { get } from "kordex:env";

console.log(readText("README.md"));
console.log(get("HOME"));
```

Run:

```bash
kordex run main.js --allow-fs --allow-env
```

## REPL permissions

Permissions also apply to `kordex repl`.

Example:

```bash
kordex repl --eval "1 + 2"
```

Filesystem access:

```bash
kordex repl --eval "import { exists } from 'kordex:fs'; exists('main.js')" --allow-fs
```

Softadastra access:

```bash
kordex repl --eval "import * as db from 'kordex:softadastra'; db.isOpen()" --allow-softadastra
```

## Project scripts

Permissions can be used inside project scripts.

Example `kordex.json`:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "scripts": {
    "dev": "kordex run --allow-fs",
    "start": "kordex run",
    "storage": "kordex run src/storage.js --allow-softadastra"
  }
}
```

Use the smallest permission set needed by each script.

## Recommended permission style

Prefer this:

```bash
kordex run src/storage.js --allow-softadastra
```

Instead of always running everything with every permission.

Avoid this unless it is really needed:

```bash
kordex run main.js --allow-fs --allow-env --allow-net --allow-process --allow-softadastra
```

Good local-first applications should keep system access clear and predictable.

## Permission checklist

Before adding a permission, ask:

```txt
Does this script really need this capability?
Can this logic run without system access?
Can this access be isolated in one file?
Can this command use fewer permissions?
```

## Common errors

### Missing filesystem permission

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Fix:

```bash
kordex run main.js --allow-fs
```

### Missing environment permission

```js
import { get } from "kordex:env";

console.log(get("HOME"));
```

Fix:

```bash
kordex run main.js --allow-env
```

### Missing process permission

```js
import { run } from "kordex:process";

run("echo hello");
```

Fix:

```bash
kordex run main.js --allow-process
```

### Missing Softadastra permission

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");
```

Fix:

```bash
kordex run main.js --allow-softadastra
```

## Next steps

Continue with:

- [Imports](./imports.md)
- [Running Scripts](./running-scripts.md)
- [Built-in Modules](../modules/index.md)
- [Softadastra Module](../modules/softadastra.md)
