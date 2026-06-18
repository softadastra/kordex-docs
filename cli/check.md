# `kordex check`

Check a JavaScript or TypeScript file before running it.

```bash
kordex check <file>
```

`kordex check` reads a source file, detects its type, validates basic runtime compatibility, and prints diagnostics.

## Basic usage

Check a JavaScript file:

```bash
kordex check main.js
```

Check a TypeScript file:

```bash
kordex check main.ts
```

Check with more details:

```bash
kordex check main.js --details
```

Use JSON output:

```bash
kordex check main.js --json
```

## Use with `npx`

```bash
npx kordex check main.js
```

```bash
npx kordex check main.ts --details
```

## Check JavaScript

Create `main.js`:

```js
console.log("Hello from Kordex");
```

Check it:

```bash
kordex check main.js
```

Example output:

```txt
Check completed
file = main.js
type = javascript
ok   = true
```

Run it after checking:

```bash
kordex run main.js
```

## Check TypeScript

Create `main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Check it:

```bash
kordex check main.ts
```

Then run it:

```bash
kordex run main.ts
```

TypeScript support is currently basic.

Use `check` to catch simple source and runtime compatibility issues before running the file.

## Check JSON imports

If your script imports JSON, check the entry file.

Example:

```js
import config from "./config.json";

console.log(config.name);
```

Check:

```bash
kordex check main.js
```

Run:

```bash
kordex run main.js
```

## Check local imports

For a local module:

```js
import { message } from "./message.js";

console.log(message());
```

Check the entry file:

```bash
kordex check main.js
```

Then run:

```bash
kordex run main.js
```

## Use `--details`

Use `--details` when you want more information about the checked file.

```bash
kordex check main.js --details
```

This is useful when checking:

```txt
source type
source size
line count
runtime compatibility
diagnostics
```

## Use `--json`

Use `--json` when another tool needs to read the result.

```bash
kordex check main.js --json
```

Example output:

```json
{
  "file": "main.js",
  "type": "javascript",
  "ok": true,
  "diagnostics": []
}
```

This is useful in scripts, CI, editors, and automated checks.

## What `check` validates

`kordex check` is focused on the source file.

It can report information such as:

```txt
file path
source type
source size
line count
whether the file can be executed
diagnostics
```

Supported source types include:

```txt
JavaScript
TypeScript
JSON
```

JavaScript and TypeScript files are executable.

JSON files are importable data files.

## `check` does not run the script

`kordex check` does not execute your program.

This means it should not:

```txt
write files
read environment variables
run shell commands
open Softadastra storage
perform runtime side effects
```

Use `kordex run` when you want to execute the file.

```bash
kordex run main.js
```

## Permissions

`kordex check` checks the file.

Runtime permissions are mainly used by `kordex run` and `kordex repl`.

Example script:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Check it:

```bash
kordex check main.js
```

Run it with permission:

```bash
kordex run main.js --allow-fs
```

## Recommended workflow

For a single file:

```bash
kordex check main.js
kordex run main.js
```

For TypeScript:

```bash
kordex check main.ts
kordex run main.ts
```

For a project:

```bash
kordex check src/main.js
kordex run
```

For detailed output:

```bash
kordex check src/main.js --details
```

For tool output:

```bash
kordex check src/main.js --json
```

## Before build

Use `check` before building.

```bash
kordex check src/main.js
kordex build . --project --out-dir dist --force
```

For TypeScript:

```bash
kordex check src/main.ts
kordex build . --project --out-dir dist --force
```

## Common errors

### Missing file

Wrong:

```bash
kordex check missing.js
```

Fix:

```bash
ls
kordex check main.js
```

### Unsupported file type

Wrong:

```bash
kordex check notes.txt
```

Use a supported source file:

```bash
kordex check main.js
kordex check main.ts
kordex check config.json
```

### Empty file

If the file is empty, Kordex can report that the source is not valid.

Fix it by adding source code:

```js
console.log("Hello from Kordex");
```

Then check again:

```bash
kordex check main.js
```

### Wrong command

Wrong:

```bash
kordex check
```

Correct:

```bash
kordex check main.js
```

## Related pages

- [`kordex run`](./run.md)
- [`kordex build`](./build.md)
- [Running scripts](../guide/running-scripts.md)
- [Imports](../guide/imports.md)
- [TypeScript](../guide/typescript.md)
