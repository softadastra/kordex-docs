# Running Scripts

Kordex runs JavaScript and TypeScript files from the command line.

The main command is:

```bash
kordex run
```

You can run a specific file, or let Kordex find the project entry from `kordex.json`.

## Run a JavaScript file

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

With `npx`:

```bash
npx kordex run main.js
```

## Run a TypeScript file

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

Inside a Kordex project, you can run:

```bash
kordex run
```

Kordex reads the entry from `kordex.json`.

Example:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

Then:

```bash
kordex run
```

is the same as:

```bash
kordex run src/main.js
```

## Recommended workflow

For a project:

```bash
kordex init app
cd app
kordex run
```

For one file:

```bash
kordex run main.js
```

For local project usage:

```bash
npx kordex run src/main.js
```

## Use local imports

Kordex supports local JavaScript imports.

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

## Import without extension

Kordex can resolve local imports without the file extension.

```js
import { message } from "./message";

console.log(message());
```

This can resolve:

```txt
message.js
message.ts
message.json
```

Use explicit extensions when you want the import to be clear.

## Directory imports

Kordex can resolve a directory import through its index file.

Example structure:

```txt
src/
├── main.js
└── lib/
    └── index.js
```

`src/lib/index.js`:

```js
export const name = "Kordex";
```

`src/main.js`:

```js
import { name } from "./lib";

console.log(name);
```

Run:

```bash
kordex run src/main.js
```

## JSON imports

Create `user.json`:

```json
{
  "name": "Kordex",
  "type": "runtime"
}
```

Create `main.js`:

```js
import user from "./user.json";

console.log(user.name);
console.log(user.type);
```

Run:

```bash
kordex run main.js
```

Output:

```txt
Kordex
runtime
```

## Use built-in modules

Built-in modules use the `kordex:` prefix.

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

## Run with permissions

Kordex keeps sensitive system access behind explicit permissions.

Available permission flags:

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Example with filesystem access:

```js
import { writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(readText("hello.txt"));
```

Run with filesystem permission:

```bash
kordex run main.js --allow-fs
```

Without `--allow-fs`, filesystem access is rejected.

## Filesystem access

Use `--allow-fs` when a script imports `kordex:fs`.

```bash
kordex run main.js --allow-fs
```

Example:

```js
import { exists } from "kordex:fs";

console.log(exists("main.js"));
```

## Environment access

Use `--allow-env` when a script imports `kordex:env`.

```bash
kordex run main.js --allow-env
```

Example:

```js
import { get, has } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

## Process access

Use `--allow-process` when a script imports `kordex:process`.

```bash
kordex run main.js --allow-process
```

Example:

```js
import { cwd } from "kordex:process";

console.log(cwd());
```

## Network helpers

Use `--allow-net` when a script imports network-related native capabilities.

```bash
kordex run main.js --allow-net
```

The current `kordex:http` module provides HTTP utility helpers.

Example:

```js
import { isSuccess, statusText } from "kordex:http";

console.log(isSuccess(200));
console.log(statusText(404));
```

## Softadastra access

Use `--allow-softadastra` when a script imports `kordex:softadastra`.

```bash
kordex run main.js --allow-softadastra
```

Example:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

## Debug output

Use `--debug` when you need more diagnostic information.

```bash
kordex run main.js --debug
```

Debug mode is useful while developing a script or checking runtime behavior.

## Verbose output

Use `--verbose` for more CLI output.

```bash
kordex run main.js --verbose
```

## JSON output

Use `--json` when a command result needs to be read by another tool.

```bash
kordex run main.js --json
```

## Quiet output

Use `--quiet` to suppress normal CLI output.

```bash
kordex run main.js --quiet
```

## Common errors

### Missing file

If the file does not exist, Kordex returns an error.

```bash
kordex run missing.js
```

Fix it by checking the file path:

```bash
ls
kordex run main.js
```

### No project entry

If you run:

```bash
kordex run
```

outside a project, Kordex may not find an entry file.

Fix it by creating `kordex.json`:

```json
{
  "entry": "src/main.js"
}
```

Or run a file directly:

```bash
kordex run main.js
```

### Missing permission

If a script imports a sensitive module without permission, Kordex rejects it.

Example:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run with:

```bash
kordex run main.js --allow-fs
```

## Next steps

Continue with:

- [Permissions](./permissions.md)
- [Imports](./imports.md)
- [TypeScript](./typescript.md)
- [CLI run](../cli/run.md)
- [Built-in Modules](../modules/index.md)
