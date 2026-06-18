# Getting Started

Kordex is a JavaScript and TypeScript runtime for reliable local-first applications.

It runs scripts, supports local imports, exposes native `kordex:` modules, and keeps sensitive system access behind explicit permissions.

Kordex is close to runtimes like Deno and Bun in spirit, but it has a different center of gravity:

```txt
reliable local-first JavaScript
```

The goal is not only to run JavaScript fast.

The goal is to run JavaScript in a way that can support applications that need local execution, predictable permissions, offline-ready behavior, and durable local state.

## Install

Use Kordex with `npx`:

```bash
npx kordex --version
```

Or install it globally:

```bash
npm install -g kordex
```

Then check:

```bash
kordex --version
```

## Run your first file

Create `main.js`:

```js
console.log("Hello from Kordex");
```

Run it:

```bash
npx kordex run main.js
```

Output:

```txt
Hello from Kordex
```

If Kordex is installed globally, you can also run:

```bash
kordex run main.js
```

## Run TypeScript

Create `main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run it:

```bash
npx kordex run main.ts
```

Output:

```txt
Hello from Kordex
```

TypeScript support is currently MVP-level.

## Create a project

Create a new Kordex project:

```bash
npx kordex init app
cd app
```

Run the project entry:

```bash
npx kordex run
```

A basic project looks like this:

```txt
app/
├── package.json
├── kordex.json
└── src/
    └── main.js
```

Kordex uses `kordex.json` to find the project entry.

Example:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build"
  }
}
```

## Use local imports

Create `message.js`:

```js
export function message() {
  return "Import works";
}
```

Create `main.js`:

```js
import { message } from "./message.js";

console.log(message());
```

Run it:

```bash
npx kordex run main.js
```

Output:

```txt
Import works
```

## Use built-in modules

Kordex exposes built-in modules with the `kordex:` prefix.

Example with `kordex:path`:

```js
import { join } from "kordex:path";

const file = join("data", "hello.txt");

console.log(file);
```

Run it:

```bash
npx kordex run main.js
```

Some modules are safe utility modules. Others need explicit permissions.

## Permissions

Kordex does not give scripts full system access by default.

Sensitive modules need permission flags:

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

Run it with filesystem permission:

```bash
npx kordex run main.js --allow-fs
```

Without `--allow-fs`, filesystem access is rejected.

## Use Softadastra storage

The `kordex:softadastra` module gives scripts access to local-first storage foundations.

It requires explicit permission.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "kordex-app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run it:

```bash
npx kordex run main.js --allow-softadastra
```

This is where Kordex becomes different from a normal script runner.

The script can work with local durable state first, then synchronization can be added later.

## Check a file

Check a source file before running it:

```bash
npx kordex check main.js
```

For more details:

```bash
npx kordex check main.js --details
```

## Build a file or project

Build one file:

```bash
npx kordex build main.js
```

Build the current project:

```bash
npx kordex build . --project --out-dir dist --force
```

## Next steps

Continue with:

- [Installation](./installation.md)
- [Running Scripts](./running-scripts.md)
- [Permissions](./permissions.md)
- [Imports](./imports.md)
- [Modules](../modules/index.md)
- [CLI](../cli/index.md)
