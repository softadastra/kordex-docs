# `kordex build`

Build a JavaScript or TypeScript file, or bundle a Kordex project into an output directory.

```bash
kordex build <file|project> [options]
```

## Basic usage

Build one file:

```bash
kordex build main.js
```

Build a TypeScript file:

```bash
kordex build main.ts
```

Build a project:

```bash
kordex build . --project
```

Build into `dist`:

```bash
kordex build . --project --out-dir dist
```

Overwrite existing output:

```bash
kordex build . --project --out-dir dist --force
```

## Use with `npx`

```bash
npx kordex build main.js
```

```bash
npx kordex build . --project --out-dir dist --force
```

## Build one JavaScript file

Create `main.js`:

```js
console.log("Hello from Kordex");
```

Build it:

```bash
kordex build main.js --out-dir dist --force
```

Output:

```txt
dist/main.js
```

## Build one TypeScript file

Create `main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Build it:

```bash
kordex build main.ts --out-dir dist --force
```

Output:

```txt
dist/main.js
```

TypeScript support is currently MVP-level.

## Build a project

Example project:

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

Build the project:

```bash
kordex build . --project --out-dir dist --force
```

Output:

```txt
dist/main.js
```

## Project entry

When building a project, Kordex uses the project entry.

Recommended:

```json
{
  "entry": "src/main.js"
}
```

Then:

```bash
kordex build . --project
```

builds the project entry.

## Output directory

Use `--out-dir` to choose the output folder.

```bash
kordex build main.js --out-dir dist
```

```bash
kordex build . --project --out-dir build
```

Default output directory:

```txt
dist
```

## Output file name

Use `--out-file` when you want a specific output file name.

```bash
kordex build . --project --out-dir dist --out-file app.js --force
```

Output:

```txt
dist/app.js
```

## Force overwrite

Kordex protects existing files by default.

Use `--force` to overwrite generated output.

```bash
kordex build main.js --out-dir dist --force
```

Use this when rebuilding the same output many times.

## Source maps

Use `--source-map` when you want a source map.

```bash
kordex build . --project --out-dir dist --source-map --force
```

Output:

```txt
dist/main.js
dist/main.js.map
```

Source maps are still basic.

## Minify

Use `--minify` when you want smaller output.

```bash
kordex build . --project --out-dir dist --minify --force
```

Minification is part of the build workflow and can improve output size.

## Details

Use `--details` to print more build information.

```bash
kordex build . --project --out-dir dist --details --force
```

This is useful when checking:

```txt
input path
entry file
output path
source type
source size
build messages
```

## Build with imports

Kordex can build files that use local imports.

`message.js`:

```js
export function message() {
  return "Build works";
}
```

`main.js`:

```js
import { message } from "./message.js";

console.log(message());
```

Build:

```bash
kordex build main.js --out-dir dist --force
```

## Build with JSON imports

`config.json`:

```json
{
  "name": "Kordex",
  "mode": "local-first"
}
```

`main.js`:

```js
import config from "./config.json";

console.log(config.name);
console.log(config.mode);
```

Build:

```bash
kordex build main.js --out-dir dist --force
```

## Build with built-in modules

Kordex built-in modules use the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

console.log(join("data", "file.txt"));
console.log(hash("kordex"));
```

Build:

```bash
kordex build main.js --out-dir dist --force
```

## Build does not grant runtime permissions

Build prepares output.

Runtime permissions are still used when the script runs.

Example:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Build:

```bash
kordex build main.js --out-dir dist --force
```

Run with permission:

```bash
kordex run dist/main.js --allow-fs
```

Permissions stay explicit.

## Recommended workflow

For one file:

```bash
kordex check main.js
kordex build main.js --out-dir dist --force
kordex run dist/main.js
```

For a project:

```bash
kordex check src/main.js
kordex build . --project --out-dir dist --force
kordex run dist/main.js
```

For TypeScript:

```bash
kordex check src/main.ts
kordex build . --project --out-dir dist --force
kordex run dist/main.js
```

## Common commands

```bash
kordex build main.js
```

```bash
kordex build main.ts
```

```bash
kordex build main.js --out-dir dist --force
```

```bash
kordex build . --project --out-dir dist --force
```

```bash
kordex build . --project --out-dir dist --out-file app.js --force
```

```bash
kordex build . --project --out-dir dist --source-map --force
```

```bash
kordex build . --project --out-dir dist --minify --force
```

## Common errors

### Missing input

Wrong:

```bash
kordex build
```

Correct:

```bash
kordex build main.js
```

or:

```bash
kordex build . --project
```

### Missing project entry

If project build fails, add an entry to `kordex.json`.

```json
{
  "entry": "src/main.js"
}
```

Then:

```bash
kordex build . --project --out-dir dist --force
```

### Output already exists

If the output file already exists, use:

```bash
kordex build main.js --out-dir dist --force
```

### Wrong file type

Use a supported source file:

```bash
kordex build main.js
kordex build main.ts
```

### Running built output without permission

If the built output uses `kordex:fs`, run it with:

```bash
kordex run dist/main.js --allow-fs
```

If it uses `kordex:softadastra`, run it with:

```bash
kordex run dist/main.js --allow-softadastra
```

## Related pages

- [`kordex check`](./check.md)
- [`kordex run`](./run.md)
- [Project structure](../guide/project-structure.md)
- [Imports](../guide/imports.md)
- [Permissions](../guide/permissions.md)
