# `kordex init`

Create a new Kordex project.

```bash
kordex init <name>
```

## Basic usage

```bash
kordex init app
```

This creates a new project directory:

```txt
app/
├── package.json
├── kordex.json
└── src/
    └── main.js
```

Then enter the project:

```bash
cd app
```

Run it:

```bash
kordex run
```

## What it creates

A default Kordex project contains:

```txt
package.json
kordex.json
src/main.js
```

### `kordex.json`

`kordex.json` is the main Kordex project file.

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

The default entry file:

```js
console.log("Hello from Kordex");
```

Run it with:

```bash
kordex run
```

## Create a project with another name

```bash
kordex init local-notes
```

This creates:

```txt
local-notes/
├── package.json
├── kordex.json
└── src/
    └── main.js
```

Then:

```bash
cd local-notes
kordex run
```

## Use with `npx`

```bash
npx kordex init app
cd app
npx kordex run
```

## Existing directory

If the target directory already exists, Kordex protects existing files by default.

Use `--force` when you want to overwrite generated files:

```bash
kordex init app --force
```

Use this carefully.

## Recommended first commands

```bash
kordex init app
cd app
kordex run
kordex check src/main.js
kordex build . --project --out-dir dist --force
```

## Project scripts

After project creation, you can use scripts from `kordex.json`.

Example:

```json
{
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build"
  }
}
```

Run the project directly:

```bash
kordex run
```

Build it:

```bash
kordex build . --project
```

## Local-first project direction

A Kordex project is designed to grow toward reliable local-first JavaScript.

A simple project can start like this:

```txt
app/
├── kordex.json
└── src/
    └── main.js
```

Then grow into:

```txt
app/
├── kordex.json
├── kordex.lock
└── src/
    ├── main.js
    ├── storage.js
    ├── config.js
    └── sync.js
```

Use:

```bash
kordex run
```

for local execution.

Use:

```bash
kordex run src/storage.js --allow-softadastra
```

when the script needs local durable storage.

Use:

```bash
kordex run src/sync.js --allow-net --allow-softadastra
```

when the script needs sync logic.

## Common errors

### Missing project name

Wrong:

```bash
kordex init
```

Correct:

```bash
kordex init app
```

### Directory already exists

If `app/` already exists, Kordex may refuse to overwrite files.

Use:

```bash
kordex init app --force
```

only when you want to replace generated files.

### Run from the wrong directory

After creating the project, enter the folder:

```bash
cd app
kordex run
```

## Related pages

- [Running scripts](../guide/running-scripts.md)
- [Project structure](../guide/project-structure.md)
- [Permissions](../guide/permissions.md)
- [`kordex run`](./run.md)
