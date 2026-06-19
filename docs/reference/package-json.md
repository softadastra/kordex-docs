# package.json

Kordex can read `package.json` when a project does not have `kordex.json`.

Use `package.json` when you want a normal JavaScript project layout and still want Kordex to find the project entry.

Kordex checks `kordex.json` first.

If `kordex.json` is missing, Kordex can use supported fields from `package.json`.

## Basic example

```json
{
  "name": "my-kordex-app",
  "version": "0.1.0",
  "type": "module",
  "main": "src/main.js",
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project",
    "check": "kordex check src/main.js"
  }
}
```

Run the project:

```bash
kordex run
```

Kordex uses `main` as the entry file.

## Recommended example

```json
{
  "name": "my-kordex-app",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.js"
  },
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build . --project --out-dir dist --force",
    "check": "kordex check src/main.js"
  },
  "devDependencies": {
    "kordex": "^0.1.0"
  }
}
```

This is clearer because the Kordex entry is explicit.

## Fields used by Kordex

| Field                    |   Type | Used for                           |
| ------------------------ | -----: | ---------------------------------- |
| `name`                   | string | Project name                       |
| `version`                | string | Project version                    |
| `kordex.entry`           | string | Preferred Kordex entry file        |
| `module`                 | string | Entry fallback                     |
| `main`                   | string | Entry fallback                     |
| `scripts`                | object | Project commands                   |
| `devDependencies.kordex` | string | Local CLI installation through npm |

## Entry resolution

When there is no `kordex.json`, Kordex can resolve the project entry from `package.json`.

Order:

```txt
package.json kordex.entry
package.json module
package.json main
fallback files
```

Fallback files can include:

```txt
src/main.ts
src/main.js
index.ts
index.js
```

## `kordex.entry`

Preferred Kordex-specific entry field.

```json
{
  "kordex": {
    "entry": "src/main.ts"
  }
}
```

Then run:

```bash
kordex run
```

This is the same as:

```bash
kordex run src/main.ts
```

## `module`

ES module entry fallback.

```json
{
  "type": "module",
  "module": "src/main.js"
}
```

Kordex can use this when `kordex.entry` is missing.

## `main`

Common JavaScript entry fallback.

```json
{
  "main": "src/main.js"
}
```

Kordex can use this when `kordex.entry` and `module` are missing.

## `scripts`

Use scripts to make commands shorter.

```json
{
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project",
    "check": "kordex check src/main.js"
  }
}
```

Then run:

```bash
npm run dev
npm run build
npm run check
```

## JavaScript project

```json
{
  "name": "hello-kordex",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.js"
  },
  "scripts": {
    "dev": "kordex run"
  }
}
```

Project:

```txt
hello-kordex/
├── package.json
└── src/
    └── main.js
```

`src/main.js`:

```js
console.log("Hello from Kordex");
```

Run:

```bash
kordex run
```

or:

```bash
npm run dev
```

## TypeScript project

```json
{
  "name": "hello-kordex-ts",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.ts"
  },
  "scripts": {
    "dev": "kordex run",
    "check": "kordex check src/main.ts"
  }
}
```

`src/main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run:

```bash
kordex run
```

TypeScript support is currently MVP-level.

## With npm package

Install Kordex locally:

```bash
npm install --save-dev kordex
```

Then use `npx`:

```bash
npx kordex run
```

Or use scripts:

```json
{
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project --out-dir dist --force"
  },
  "devDependencies": {
    "kordex": "^0.1.0"
  }
}
```

Run:

```bash
npm run dev
```

## With local-first storage

```json
{
  "name": "local-store",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.js"
  },
  "scripts": {
    "dev": "kordex run --allow-softadastra"
  },
  "devDependencies": {
    "kordex": "^0.1.0"
  }
}
```

`src/main.js`:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "local-store", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
npm run dev
```

## With permissions

Permissions can be placed in scripts.

```json
{
  "scripts": {
    "files": "kordex run src/files.js --allow-fs",
    "env": "kordex run src/env.js --allow-env",
    "net": "kordex run src/http.js --allow-net",
    "process": "kordex run src/process.js --allow-process",
    "store": "kordex run src/store.js --allow-softadastra"
  }
}
```

Available permission flags:

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

## Build script

```json
{
  "scripts": {
    "build": "kordex build . --project --out-dir dist --force"
  }
}
```

Run:

```bash
npm run build
```

Output:

```txt
dist/main.js
```

## Check script

```json
{
  "scripts": {
    "check": "kordex check src/main.js"
  }
}
```

Run:

```bash
npm run check
```

## Version script

```json
{
  "scripts": {
    "version:kordex": "kordex version --details"
  }
}
```

Run:

```bash
npm run version:kordex
```

## Package manager usage

With npm:

```bash
npm install --save-dev kordex
npx kordex version
```

With pnpm:

```bash
pnpm add -D kordex
pnpm kordex version
```

With yarn:

```bash
yarn add -D kordex
yarn kordex version
```

## `kordex.json` vs `package.json`

Use `kordex.json` when the project is mainly a Kordex project.

Use `package.json` when the project is also a normal JavaScript/npm project.

Recommended for pure Kordex apps:

```txt
kordex.json
```

Recommended for npm-based apps:

```txt
package.json
```

You can keep both, but Kordex reads `kordex.json` first.

## If both files exist

When both files exist:

```txt
kordex.json
package.json
```

Kordex prefers:

```txt
kordex.json
```

So this entry wins:

```json
{
  "entry": "src/main.ts"
}
```

even if `package.json` has:

```json
{
  "main": "src/index.js"
}
```

## Recommended package.json

```json
{
  "name": "my-kordex-app",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.js"
  },
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project --out-dir dist --force",
    "check": "kordex check src/main.js",
    "version:kordex": "kordex version --details"
  },
  "devDependencies": {
    "kordex": "^0.1.0"
  }
}
```

## Common errors

### No entry field

Wrong:

```json
{
  "name": "app",
  "version": "0.1.0"
}
```

Better:

```json
{
  "name": "app",
  "version": "0.1.0",
  "kordex": {
    "entry": "src/main.js"
  }
}
```

### Entry points to a missing file

Wrong:

```json
{
  "kordex": {
    "entry": "src/app.js"
  }
}
```

when the file does not exist.

Correct:

```json
{
  "kordex": {
    "entry": "src/main.js"
  }
}
```

and create:

```txt
src/main.js
```

### Wrong `kordex` shape

Wrong:

```json
{
  "kordex": "src/main.js"
}
```

Correct:

```json
{
  "kordex": {
    "entry": "src/main.js"
  }
}
```

### Missing `type: module`

If your files use `import` / `export`, use:

```json
{
  "type": "module"
}
```

Recommended:

```json
{
  "name": "app",
  "version": "0.1.0",
  "type": "module",
  "kordex": {
    "entry": "src/main.js"
  }
}
```

### Script without permission

Wrong:

```json
{
  "scripts": {
    "store": "kordex run src/store.js"
  }
}
```

when `src/store.js` uses:

```js
import * as softadastra from "kordex:softadastra";
```

Correct:

```json
{
  "scripts": {
    "store": "kordex run src/store.js --allow-softadastra"
  }
}
```

### Too many permissions

Avoid:

```json
{
  "scripts": {
    "dev": "kordex run --allow-fs --allow-env --allow-net --allow-process --allow-softadastra"
  }
}
```

Better: enable only what the script uses.

```json
{
  "scripts": {
    "dev": "kordex run --allow-softadastra"
  }
}
```

### Confusing npm dependencies with Kordex packages

`package.json` dependencies are for npm.

```json
{
  "dependencies": {
    "some-npm-package": "^1.0.0"
  }
}
```

Kordex package installation uses Kordex project metadata and writes:

```txt
kordex.lock
```

For a pure Kordex package workflow, prefer `kordex.json`.

## Related pages

- [kordex.json](./kordex-json.md)
- [Permissions](./permissions.md)
- [Module imports](./module-imports.md)
- [Project structure](../guide/project-structure.md)
- [Running scripts](../guide/running-scripts.md)
- [Installation](../guide/installation.md)
- [CLI run](../cli/run.md)
- [CLI build](../cli/build.md)
