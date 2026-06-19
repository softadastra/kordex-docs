# `kordex:console`

Console output module for Kordex scripts.

Use it when you want explicit console functions from the Kordex standard module system.

```js
import { log, info, warn, error, debug } from "kordex:console";

log("Hello from Kordex");
info("Runtime ready");
warn("This is a warning");
error("Something failed");
debug("Debug message");
```

Run:

```bash
kordex run main.js
```

## Import

```js
import { log } from "kordex:console";
```

Or import everything:

```js
import * as console from "kordex:console";

console.log("Hello");
console.info("Ready");
console.warn("Warning");
console.error("Error");
console.debug("Debug");
```

## Permission

`kordex:console` does not require a permission flag.

```bash
kordex run main.js
```

No need for:

```bash
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Console output is considered a safe utility capability.

## Functions

```txt
log(...values)
info(...values)
warn(...values)
error(...values)
debug(...values)
```

Each function accepts any number of values.

## `log`

Write a normal message.

```js
import { log } from "kordex:console";

log("Hello from Kordex");
log("count =", 3);
```

Output:

```txt
[log] Hello from Kordex
[log] count = 3
```

## `info`

Write an informational message.

```js
import { info } from "kordex:console";

info("Application started");
info("mode =", "local-first");
```

Output:

```txt
[info] Application started
[info] mode = local-first
```

## `warn`

Write a warning message.

```js
import { warn } from "kordex:console";

warn("Cache file not found");
warn("Using default configuration");
```

Output:

```txt
[warn] Cache file not found
[warn] Using default configuration
```

## `error`

Write an error message.

```js
import { error } from "kordex:console";

error("Failed to load project");
error("Missing file:", "kordex.json");
```

Output:

```txt
[error] Failed to load project
[error] Missing file: kordex.json
```

## `debug`

Write a debug message.

```js
import { debug } from "kordex:console";

debug("entry =", "src/main.js");
debug("loaded modules =", 4);
```

Output:

```txt
[debug] entry = src/main.js
[debug] loaded modules = 4
```

## Multiple values

Console functions can receive multiple values.

```js
import { log } from "kordex:console";

const name = "Kordex";
const version = "0.1.0";

log("runtime:", name, "version:", version);
```

Output:

```txt
[log] runtime: Kordex version: 0.1.0
```

## Booleans and numbers

```js
import { log } from "kordex:console";

log("ready:", true);
log("items:", 12);
log("ratio:", 0.75);
```

Output:

```txt
[log] ready: true
[log] items: 12
[log] ratio: 0.75
```

## Null and undefined

```js
import { log } from "kordex:console";

log(null);
log(undefined);
```

Output:

```txt
[log] null
[log] undefined
```

## Use in a script

Create `main.js`:

```js
import { log, info, warn, error } from "kordex:console";

log("Starting app");

const configExists = false;

if (!configExists) {
  warn("No config file found");
  info("Using default settings");
}

error("Example error output");
```

Run:

```bash
kordex run main.js
```

## Use with local imports

`logger.js`:

```js
import { log, error } from "kordex:console";

export function success(message) {
  log("success:", message);
}

export function fail(message) {
  error("failed:", message);
}
```

`main.js`:

```js
import { success, fail } from "./logger.js";

success("project loaded");
fail("missing optional cache");
```

Run:

```bash
kordex run main.js
```

## Use with other modules

```js
import { log } from "kordex:console";
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file = join("data", "notes.txt");

log("file:", file);
log("hash:", hash(file));
```

Run:

```bash
kordex run main.js
```

## Use with permission modules

Console itself needs no permission.

If the script uses another sensitive module, only that module needs permission.

Example with filesystem:

```js
import { log } from "kordex:console";
import { readText } from "kordex:fs";

const text = readText("README.md");

log(text);
```

Run:

```bash
kordex run main.js --allow-fs
```

The permission is for `kordex:fs`, not for `kordex:console`.

## `kordex:console` vs global `console`

Kordex examples can use normal JavaScript console output:

```js
console.log("Hello");
```

The `kordex:console` module is the explicit Kordex standard module version:

```js
import { log } from "kordex:console";

log("Hello");
```

Use `kordex:console` when you want your script to clearly depend on the Kordex standard module system.

## Common usage

```js
import { log, warn, error } from "kordex:console";

log("app started");

warn("offline mode enabled");

error("sync failed");
```

## Common errors

### Wrong import name

Wrong:

```js
import { print } from "kordex:console";
```

Correct:

```js
import { log } from "kordex:console";
```

Available functions:

```txt
log
info
warn
error
debug
```

### Wrong module name

Wrong:

```js
import { log } from "console";
```

Correct:

```js
import { log } from "kordex:console";
```

Kordex standard modules use the `kordex:` prefix.

### Adding unnecessary permissions

Wrong:

```bash
kordex run main.js --allow-fs
```

when the script only uses:

```js
import { log } from "kordex:console";
```

Correct:

```bash
kordex run main.js
```

## Related pages

- [Modules](./index.md)
- [Path module](./path.md)
- [Timer module](./timer.md)
- [Crypto module](./crypto.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
