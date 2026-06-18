# Modules

Kordex exposes native modules to JavaScript with the `kordex:` import prefix.

These modules are part of the runtime. They are not npm packages and they are not Node.js built-ins.

```js id="npz0jc"
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

console.log(join("data", "file.txt"));
console.log(hash("kordex"));
```

## Available modules

```txt id="tqtz97"
kordex:console
kordex:path
kordex:timer
kordex:crypto
kordex:fs
kordex:env
kordex:process
kordex:http
kordex:softadastra
```

## Safe utility modules

These modules are available for normal scripts.

```txt id="j8alm3"
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

They are useful for:

```txt id="hdyqkz"
printing output
joining paths
measuring time
sleeping
hashing strings
generating random values
checking HTTP status helpers
```

Example:

```js id="ykl56u"
import { join } from "kordex:path";
import { now } from "kordex:timer";
import { hash } from "kordex:crypto";

console.log(join("data", "notes.txt"));
console.log(now());
console.log(hash("kordex"));
```

Run:

```bash id="e9qx9e"
kordex run main.js
```

## Permission-gated modules

Some modules can access the local system or external capabilities.

They require explicit runtime permissions.

| Module               | Permission            |
| -------------------- | --------------------- |
| `kordex:fs`          | `--allow-fs`          |
| `kordex:env`         | `--allow-env`         |
| `kordex:process`     | `--allow-process`     |
| `kordex:http`        | `--allow-net`         |
| `kordex:softadastra` | `--allow-softadastra` |

Example:

```js id="yq9wnu"
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run:

```bash id="uu82ks"
kordex run main.js --allow-fs
```

Without `--allow-fs`, the script should not access `kordex:fs`.

## Import style

Use the `kordex:` prefix.

Correct:

```js id="rcr8d4"
import { join } from "kordex:path";
```

Wrong:

```js id="txpis2"
import { join } from "path";
```

Kordex does not use Node.js built-in module names for its native modules.

## `kordex:console`

Console output helpers.

```js id="dqz3fr"
import { log, info, warn, error, debug } from "kordex:console";

log("normal message");
info("info message");
warn("warning message");
error("error message");
debug("debug message");
```

Page:

- [console](./console.md)

## `kordex:path`

Path utility helpers.

```js id="x5p9x5"
import { join, dirname, basename, extension } from "kordex:path";

console.log(join("data", "users", "gaspard.json"));
console.log(dirname("data/users/gaspard.json"));
console.log(basename("data/users/gaspard.json"));
console.log(extension("data/users/gaspard.json"));
```

Page:

- [path](./path.md)

## `kordex:timer`

Time helpers.

```js id="apsdjp"
import { now, unixMs, sleep } from "kordex:timer";

console.log(now());
console.log(unixMs());

sleep(100);

console.log("done");
```

Page:

- [timer](./timer.md)

## `kordex:crypto`

Small deterministic crypto utility helpers.

```js id="p1ovov"
import { hash, random, randomInt, equals } from "kordex:crypto";

console.log(hash("kordex"));
console.log(random());
console.log(randomInt(1, 10));
console.log(equals("a", "a"));
```

Page:

- [crypto](./crypto.md)

## `kordex:fs`

Filesystem helpers.

Requires:

```bash id="i5xrhs"
--allow-fs
```

Example:

```js id="dyefdh"
import { exists, writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

if (exists("hello.txt")) {
  console.log(readText("hello.txt"));
}
```

Run:

```bash id="0e531b"
kordex run main.js --allow-fs
```

Page:

- [fs](./fs.md)

## `kordex:env`

Environment variable helpers.

Requires:

```bash id="bmxm7u"
--allow-env
```

Example:

```js id="vttql3"
import { has, get } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run:

```bash id="llqg4a"
kordex run main.js --allow-env
```

Page:

- [env](./env.md)

## `kordex:process`

Process helpers.

Requires:

```bash id="8bkbcy"
--allow-process
```

Example:

```js id="sjtd7e"
import { cwd, chdir, run } from "kordex:process";

console.log(cwd());

run("echo hello from kordex");
```

Run:

```bash id="rp8pcx"
kordex run main.js --allow-process
```

Process access can run shell commands.

Use it only when the script really needs it.

Page:

- [process](./process.md)

## `kordex:http`

HTTP utility helpers.

Requires:

```bash id="js2l7e"
--allow-net
```

The current module provides safe HTTP helpers.

```js id="u49u04"
import {
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusText,
  buildUrl,
  normalizeMethod,
  isMethod,
} from "kordex:http";

console.log(isSuccess(200));
console.log(isRedirect(301));
console.log(isClientError(404));
console.log(isServerError(500));
console.log(statusText(404));
console.log(buildUrl("https://example.com", "/api/users"));
console.log(normalizeMethod("post"));
console.log(isMethod("GET"));
```

Run:

```bash id="p9wnmt"
kordex run main.js --allow-net
```

Page:

- [http](./http.md)

## `kordex:softadastra`

Local-first storage helpers powered by Softadastra.

Requires:

```bash id="mf6jaf"
--allow-softadastra
```

Example:

```js id="29mfv4"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "my-app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");
softadastra.put("mode", "local-first");

console.log(softadastra.get("runtime"));
console.log(softadastra.get("mode"));
console.log(softadastra.size());

softadastra.close();
```

Run:

```bash id="rtz88r"
kordex run main.js --allow-softadastra
```

Page:

- [softadastra](./softadastra.md)

## Combine modules

A script can use multiple modules.

Example:

```js id="spbxtz"
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";
import { hash } from "kordex:crypto";

const file = join("data", "message.txt");
const text = "Hello from Kordex";

writeText(file, text);

console.log(readText(file));
console.log(hash(text));
```

Run with filesystem permission:

```bash id="vh2x16"
kordex run main.js --allow-fs
```

## Use only the permissions needed

Good:

```bash id="kzuagu"
kordex run main.js --allow-fs
```

Only add more permissions when the script needs them.

Example with filesystem and environment access:

```bash id="4bb2v6"
kordex run main.js --allow-fs --allow-env
```

Example with local-first storage and network helpers:

```bash id="qh8a29"
kordex run sync.js --allow-softadastra --allow-net
```

## Module pages

- [console](./console.md)
- [path](./path.md)
- [timer](./timer.md)
- [crypto](./crypto.md)
- [fs](./fs.md)
- [env](./env.md)
- [process](./process.md)
- [http](./http.md)
- [softadastra](./softadastra.md)

## Related pages

- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Running scripts](../guide/running-scripts.md)
- [Local-first](../guide/local-first.md)
- [Module imports reference](../reference/module-imports.md)
