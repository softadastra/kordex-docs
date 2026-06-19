# Project Structure

A Kordex project is a small JavaScript or TypeScript project with a clear entry file.

A basic project looks like this:

```txt
app/
├── package.json
├── kordex.json
└── src/
    └── main.js
```

## Create a project

```bash
kordex init app
cd app
```

Run the project:

```bash
kordex run
```

Kordex reads the project entry from `kordex.json`.

## Main files

### `kordex.json`

`kordex.json` is the main Kordex project file.

It defines the project name, version, entry file, scripts, dependencies, and runtime settings.

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

### `src/main.js`

This is the default entry file.

```js
console.log("Hello from Kordex");
```

Run it with:

```bash
kordex run
```

Or directly:

```bash
kordex run src/main.js
```

### `package.json`

`package.json` is optional but useful when the project also uses npm.

Example:

```json
{
  "name": "app",
  "version": "0.1.0",
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build"
  },
  "dependencies": {
    "kordex": "^0.1.0"
  }
}
```

## Recommended structure

For a small project:

```txt
app/
├── package.json
├── kordex.json
└── src/
    ├── main.js
    └── message.js
```

Example:

```js
// src/message.js
export function message() {
  return "Hello from Kordex";
}
```

```js
// src/main.js
import { message } from "./message.js";

console.log(message());
```

Run:

```bash
kordex run
```

## TypeScript project

A TypeScript project can use `src/main.ts` as the entry file.

```txt
app/
├── package.json
├── kordex.json
└── src/
    └── main.ts
```

Example `kordex.json`:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.ts",
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build"
  }
}
```

Example `src/main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run:

```bash
kordex run
```

TypeScript support is currently MVP-level.

## Project entry resolution

When you run:

```bash
kordex run
```

Kordex tries to find the project entry.

The recommended source is:

```txt
kordex.json → entry
```

Example:

```json
{
  "entry": "src/main.js"
}
```

Kordex can also resolve entries from `package.json` when needed.

Common fallback files include:

```txt
src/main.ts
src/main.js
index.ts
index.js
```

## Local imports

Kordex supports local imports.

```js
import { message } from "./message.js";
```

Extension resolution is supported:

```js
import { message } from "./message";
```

Directory index resolution is supported:

```js
import { name } from "./pkg";
```

JSON imports are supported:

```js
import user from "./user.json";

console.log(user.name);
```

## Built-in modules

Kordex modules use the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";
```

Modules with sensitive system access require permission flags.

Example:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run with filesystem permission:

```bash
kordex run --allow-fs
```

## Build output

When you build a project:

```bash
kordex build . --project --out-dir dist --force
```

Kordex writes the output into `dist/`.

Example:

```txt
app/
├── dist/
│   └── main.js
├── package.json
├── kordex.json
└── src/
    └── main.js
```

## Lock file

When packages are installed or updated, Kordex can generate:

```txt
kordex.lock
```

Example:

```txt
app/
├── kordex.lock
├── package.json
├── kordex.json
└── src/
    └── main.js
```

The lock file records resolved package versions.

## Common layout

A complete project can look like this:

```txt
app/
├── package.json
├── kordex.json
├── kordex.lock
├── src/
│   ├── main.js
│   ├── config.js
│   ├── storage.js
│   └── data/
│       └── user.json
└── dist/
    └── main.js
```

## Good practice

Keep the entry file small.

Use local modules for real logic:

```txt
src/
├── main.js
├── app.js
├── storage.js
└── config.js
```

Use `kordex.json` for the runtime entry.

Use permission flags only when the script really needs them.

## Next steps

Continue with:

- [Running Scripts](./running-scripts.md)
- [Permissions](./permissions.md)
- [Imports](./imports.md)
- [Modules](../modules/index.md)
