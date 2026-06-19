# `kordex run`

Run a JavaScript or TypeScript file with Kordex.

```bash
kordex run [file] [options]
```

## Basic usage

Run a JavaScript file:

```bash
kordex run main.js
```

Run a TypeScript file:

```bash
kordex run main.ts
```

Run the project entry:

```bash
kordex run
```

When no file is provided, Kordex looks for the project entry from `kordex.json` or `package.json`.

## Run JavaScript

Create `main.js`:

```js
console.log("Hello from Kordex");
```

Run it:

```bash
kordex run main.js
```

Output:

```txt
Hello from Kordex
```

## Run TypeScript

Create `main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run it:

```bash
kordex run main.ts
```

Output:

```txt
Hello from Kordex
```

TypeScript support is currently MVP-level.

## Run the project entry

Example `kordex.json`:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

Run:

```bash
kordex run
```

This runs:

```bash
kordex run src/main.js
```

## Entry resolution

When no file is provided, Kordex searches for a project entry.

Recommended:

```txt
kordex.json -> entry
```

Example:

```json
{
  "entry": "src/main.js"
}
```

Kordex can also use `package.json` fields when needed.

Common fallback files:

```txt
src/main.ts
src/main.js
index.ts
index.js
```

## Local imports

Create `message.js`:

```js
export function message() {
  return "Local import works";
}
```

Create `main.js`:

```js
import { message } from "./message.js";

console.log(message());
```

Run:

```bash
kordex run main.js
```

Output:

```txt
Local import works
```

## JSON imports

Create `config.json`:

```json
{
  "name": "Kordex",
  "mode": "local-first"
}
```

Create `main.js`:

```js
import config from "./config.json";

console.log(config.name);
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

## Built-in modules

Kordex built-in modules use the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

console.log(join("data", "file.txt"));
console.log(hash("kordex"));
```

Run:

```bash
kordex run main.js
```

## Permissions

Sensitive modules require explicit permission flags.

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

## Filesystem access

Use `--allow-fs` for `kordex:fs`.

```js
import { writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(readText("hello.txt"));
```

Run:

```bash
kordex run main.js --allow-fs
```

## Environment access

Use `--allow-env` for `kordex:env`.

```js
import { get, has } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run:

```bash
kordex run main.js --allow-env
```

## Process access

Use `--allow-process` for `kordex:process`.

```js
import { cwd } from "kordex:process";

console.log(cwd());
```

Run:

```bash
kordex run main.js --allow-process
```

## Network helpers

Use `--allow-net` for `kordex:http`.

```js
import { isSuccess, statusText } from "kordex:http";

console.log(isSuccess(200));
console.log(statusText(404));
```

Run:

```bash
kordex run main.js --allow-net
```

## Softadastra access

Use `--allow-softadastra` for `kordex:softadastra`.

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

## Multiple permissions

Use only the permissions the script needs.

```bash
kordex run main.js --allow-fs --allow-env
```

Example:

```js
import { readText } from "kordex:fs";
import { get } from "kordex:env";

console.log(readText("README.md"));
console.log(get("HOME"));
```

## Debug mode

Use `--debug` when you need more runtime diagnostics.

```bash
kordex run main.js --debug
```

## Verbose output

Use `--verbose` for more CLI output.

```bash
kordex run main.js --verbose
```

## JSON output

Use `--json` when another tool needs to read the command result.

```bash
kordex run main.js --json
```

## Quiet output

Use `--quiet` to suppress normal CLI output.

```bash
kordex run main.js --quiet
```

## Use with `npx`

```bash
npx kordex run main.js
```

Project entry:

```bash
npx kordex run
```

With permission:

```bash
npx kordex run main.js --allow-fs
```

## Recommended usage

For a simple file:

```bash
kordex run main.js
```

For a project:

```bash
kordex run
```

For filesystem work:

```bash
kordex run main.js --allow-fs
```

For local-first storage:

```bash
kordex run main.js --allow-softadastra
```

For sync logic later:

```bash
kordex run sync.js --allow-net --allow-softadastra
```

## Common errors

### Missing file

Wrong:

```bash
kordex run missing.js
```

Fix:

```bash
ls
kordex run main.js
```

### No project entry

If this fails:

```bash
kordex run
```

Add an entry to `kordex.json`:

```json
{
  "entry": "src/main.js"
}
```

Or run a file directly:

```bash
kordex run src/main.js
```

### Missing permission

This script needs filesystem permission:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run it with:

```bash
kordex run main.js --allow-fs
```

### Wrong built-in import

Wrong:

```js
import { join } from "path";
```

Correct:

```js
import { join } from "kordex:path";
```

Kordex built-in modules use the `kordex:` prefix.

## Related pages

- [Running scripts](../guide/running-scripts.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Modules](../modules/index.md)
- [`kordex repl`](./repl.md)
- [`kordex check`](./check.md)
