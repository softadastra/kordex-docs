# Recipes

Practical Kordex examples.

Recipes are small examples you can copy into a project and run directly with the Kordex CLI.

They focus on how to use Kordex from JavaScript and TypeScript.

## Available recipes

| Recipe                                              | What it shows                              |
| --------------------------------------------------- | ------------------------------------------ |
| [Hello world](./hello-world.md)                     | Run a simple JavaScript file               |
| [Read and write files](./read-write-files.md)       | Use `kordex:fs` with `--allow-fs`          |
| [Environment variables](./environment-variables.md) | Read configuration with `kordex:env`       |
| [Path utilities](./path-utilities.md)               | Build and inspect paths with `kordex:path` |
| [Hashing](./hashing.md)                             | Create stable hashes with `kordex:crypto`  |
| [HTTP helpers](./http-helpers.md)                   | Work with status codes, methods, and URLs  |
| [Softadastra storage](./softadastra-storage.md)     | Store durable local-first data             |

## Before you start

Install Kordex:

```bash
npm install kordex
```

Check the version:

```bash
npx kordex --version
```

Create a file:

```bash
touch main.js
```

Run it:

```bash
npx kordex run main.js
```

If Kordex is installed globally, you can use:

```bash
kordex run main.js
```

## Basic project

A small Kordex project can look like this:

```txt
app/
├── kordex.json
└── src/
    └── main.js
```

`kordex.json`:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

Run the project entry:

```bash
kordex run
```

Or run a file directly:

```bash
kordex run src/main.js
```

## Permissions used in recipes

Some recipes need explicit permissions.

| Permission            | Used by              |
| --------------------- | -------------------- |
| `--allow-fs`          | `kordex:fs`          |
| `--allow-env`         | `kordex:env`         |
| `--allow-net`         | `kordex:http`        |
| `--allow-process`     | `kordex:process`     |
| `--allow-softadastra` | `kordex:softadastra` |

Example:

```bash
kordex run main.js --allow-fs
```

Do not enable every permission by default.

Use only the permission required by the script.

## Standard modules used in recipes

Kordex modules are imported with the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";
import { readText } from "kordex:fs";
```

Common modules:

```txt
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

## Run JavaScript

```js
console.log("Hello from Kordex");
```

Run:

```bash
kordex run main.js
```

## Run TypeScript

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run:

```bash
kordex run main.ts
```

TypeScript support is currently MVP-level.

## Use local imports

`message.js`:

```js
export function message() {
  return "Local import works";
}
```

`main.js`:

```js
import { message } from "./message.js";

console.log(message());
```

Run:

```bash
kordex run main.js
```

## Use JSON imports

`user.json`:

```json
{
  "name": "Kordex",
  "type": "runtime"
}
```

`main.js`:

```js
import user from "./user.json";

console.log(user.name);
console.log(user.type);
```

Run:

```bash
kordex run main.js
```

## Recipe style

Each recipe follows the same structure:

```txt
goal
files
code
run command
output
notes
common errors
```

This keeps examples easy to copy, test, and modify.

## Recommended learning order

Start here:

1. [Hello world](./hello-world.md)
2. [Path utilities](./path-utilities.md)
3. [Hashing](./hashing.md)
4. [Environment variables](./environment-variables.md)
5. [Read and write files](./read-write-files.md)
6. [HTTP helpers](./http-helpers.md)
7. [Softadastra storage](./softadastra-storage.md)

## Related pages

- [Getting started](../guide/getting-started.md)
- [Installation](../guide/installation.md)
- [Running scripts](../guide/running-scripts.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Modules](../modules/index.md)
