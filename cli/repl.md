# `kordex repl`

Start a Kordex REPL session or evaluate JavaScript directly from the command line.

```bash
kordex repl [options]
```

## Basic usage

Start an interactive session:

```bash
kordex repl
```

Evaluate code directly:

```bash
kordex repl --eval "1 + 2"
```

Evaluate JavaScript with output:

```bash
kordex repl --eval "console.log('Hello from Kordex')"
```

## Use with `npx`

```bash
npx kordex repl
```

```bash
npx kordex repl --eval "console.log('Hello from Kordex')"
```

## `--eval`

Use `--eval` when you want to run a small piece of JavaScript without creating a file.

```bash
kordex repl --eval "console.log(1 + 2)"
```

Output:

```txt
3
```

Another example:

```bash
kordex repl --eval "const name = 'Kordex'; console.log(name)"
```

Output:

```txt
Kordex
```

## When to use `repl`

Use `kordex repl` for quick tests:

```txt
testing small JavaScript snippets
checking runtime behavior
testing built-in modules
checking permission flags
debugging simple code
```

Use `kordex run` when the code belongs in a real file or project.

## Safe built-in modules

Some modules can be used without permission flags:

```txt
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

Example:

```bash
kordex repl --eval "console.log('Kordex is running')"
```

For module imports, prefer a file when the code becomes larger.

Example `main.js`:

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

console.log(join("data", "file.txt"));
console.log(hash("kordex"));
```

Run it with:

```bash
kordex run main.js
```

## Filesystem permission

Use `--allow-fs` when the code needs `kordex:fs`.

Example `main.js`:

```js
import { exists, readText } from "kordex:fs";

console.log(exists("README.md"));

if (exists("README.md")) {
  console.log(readText("README.md"));
}
```

Run:

```bash
kordex run main.js --allow-fs
```

For quick checks:

```bash
kordex repl --eval "console.log('filesystem test')" --allow-fs
```

## Environment permission

Use `--allow-env` when the code needs environment variables.

Example `main.js`:

```js
import { has, get } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run:

```bash
kordex run main.js --allow-env
```

## Network permission

Use `--allow-net` when the code needs network-related native capabilities.

The current `kordex:http` module provides HTTP helpers.

Example `main.js`:

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

## Process permission

Use `--allow-process` when the code needs process access.

Example `main.js`:

```js
import { cwd, run } from "kordex:process";

console.log(cwd());

run("echo hello");
```

Run:

```bash
kordex run main.js --allow-process
```

Process access can run shell commands.

Use it only when needed.

## Softadastra permission

Use `--allow-softadastra` when the code needs local-first storage.

Example `main.js`:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "repl-app", ".kordex/data/repl.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
kordex run main.js --allow-softadastra
```

## Multiple permissions

You can combine permissions.

```bash
kordex repl --eval "console.log('ready')" --allow-fs --allow-env
```

For real code:

```bash
kordex run main.js --allow-fs --allow-env
```

Use only the permissions needed by the code.

## Debug mode

Use `--debug` when you need more diagnostics.

```bash
kordex repl --eval "console.log('debug')" --debug
```

## Verbose output

Use `--verbose` for more CLI output.

```bash
kordex repl --eval "console.log('verbose')" --verbose
```

## JSON output

Use `--json` when another tool needs machine-readable output.

```bash
kordex repl --eval "1 + 2" --json
```

## Quiet output

Use `--quiet` to suppress normal CLI output.

```bash
kordex repl --eval "1 + 2" --quiet
```

## Recommended workflow

Use `repl` for quick tests:

```bash
kordex repl --eval "1 + 2"
```

Use `run` for files:

```bash
kordex run main.js
```

Use `check` before running larger code:

```bash
kordex check main.js
kordex run main.js
```

## Common errors

### Missing `--eval` value

Wrong:

```bash
kordex repl --eval
```

Correct:

```bash
kordex repl --eval "console.log('hello')"
```

### Missing permission

This code needs filesystem permission:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run it with:

```bash
kordex run main.js --allow-fs
```

### Too much code in `--eval`

For small snippets:

```bash
kordex repl --eval "console.log('hello')"
```

For real code, create a file:

```bash
kordex run main.js
```

## Related pages

- [`kordex run`](./run.md)
- [`kordex check`](./check.md)
- [Running scripts](../guide/running-scripts.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
