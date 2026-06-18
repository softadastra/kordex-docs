# kordex.json

`kordex.json` is the main project manifest used by Kordex.

Kordex reads this file to know:

```txt
project name
project version
entry file
registry
dependencies
scripts
plugin commands
```

Kordex looks for `kordex.json` before `package.json`.

## Basic example

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "registry": "https://registry.vixcpp.com",
  "dependencies": {
    "kordex/std": "0.1.0"
  },
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project"
  }
}
```

## Minimal example

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

With this file, you can run the project entry with:

```bash
kordex run
```

Instead of:

```bash
kordex run src/main.js
```

## Fields

| Field          |   Type |    Required | Description                         |
| -------------- | -----: | ----------: | ----------------------------------- |
| `name`         | string | recommended | Project name                        |
| `version`      | string | recommended | Project version                     |
| `entry`        | string | recommended | Main JavaScript or TypeScript file  |
| `registry`     | string |    optional | Registry URL used by install/update |
| `dependencies` | object |    optional | Kordex package dependencies         |
| `scripts`      | object |    optional | Project commands                    |
| `plugins`      | object |    optional | Plugin command configuration        |

## `name`

Project name.

```json
{
  "name": "notes-app"
}
```

Use a short lowercase name:

```txt
notes-app
local-cache
sync-worker
```

## `version`

Project version.

```json
{
  "version": "0.1.0"
}
```

Use semantic version format:

```txt
0.1.0
1.0.0
1.2.3
```

## `entry`

Main file executed by `kordex run`.

```json
{
  "entry": "src/main.js"
}
```

JavaScript entry:

```json
{
  "entry": "src/main.js"
}
```

TypeScript entry:

```json
{
  "entry": "src/main.ts"
}
```

Then run:

```bash
kordex run
```

Kordex will execute the file from `entry`.

## Entry resolution

When `kordex.json` exists, Kordex uses:

```txt
kordex.json entry
```

Example:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.ts"
}
```

Then:

```bash
kordex run
```

is the same as:

```bash
kordex run src/main.ts
```

## `registry`

Registry URL used by package commands.

```json
{
  "registry": "https://registry.vixcpp.com"
}
```

Used by:

```bash
kordex install
kordex update
```

You can also pass a registry directly:

```bash
kordex install --registry https://registry.vixcpp.com
```

## `dependencies`

Project dependencies.

```json
{
  "dependencies": {
    "kordex/std": "0.1.0",
    "softadastra/plugin-example": "0.1.0"
  }
}
```

Install them with:

```bash
kordex install
```

This writes:

```txt
kordex.lock
```

## Dependency format

```json
{
  "dependencies": {
    "package-name": "version"
  }
}
```

Example:

```json
{
  "dependencies": {
    "softadastra/plugin-example": "0.1.0"
  }
}
```

## `scripts`

Project scripts.

```json
{
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run src/main.js",
    "build": "kordex build . --project",
    "check": "kordex check src/main.js"
  }
}
```

Recommended script names:

```txt
dev
start
build
check
test
```

## Common script examples

```json
{
  "scripts": {
    "dev": "kordex run",
    "dev:debug": "kordex run --debug",
    "build": "kordex build . --project --out-dir dist --force",
    "check": "kordex check src/main.js"
  }
}
```

## `plugins`

Plugin command configuration.

```json
{
  "plugins": {
    "commands": [
      {
        "name": "hello",
        "summary": "Run hello plugin",
        "description": "Execute the local hello plugin command.",
        "usage": "kordex hello",
        "run": "scripts/hello.js",
        "aliases": ["hi"],
        "permissions": {
          "fs": false,
          "env": false,
          "net": false,
          "process": false
        }
      }
    ]
  }
}
```

Then run:

```bash
kordex hello
```

or:

```bash
kordex hi
```

## Plugin command fields

| Field         |    Type | Required | Description                        |
| ------------- | ------: | -------: | ---------------------------------- |
| `name`        |  string |      yes | Command name                       |
| `summary`     |  string | optional | Short help text                    |
| `description` |  string | optional | Longer command description         |
| `usage`       |  string | optional | Usage shown in help                |
| `run`         |  string |      yes | Script executed by the command     |
| `aliases`     |   array | optional | Alternative command names          |
| `permissions` |  object | optional | Runtime permissions for the plugin |
| `enabled`     | boolean | optional | Enable or disable the command      |
| `hidden`      | boolean | optional | Hide from normal help output       |

## Plugin permissions

```json
{
  "permissions": {
    "fs": true,
    "env": false,
    "net": false,
    "process": false
  }
}
```

Available plugin permissions:

```txt
fs
env
net
process
```

Use only what the plugin needs.

## Plugin example with filesystem access

```json
{
  "plugins": {
    "commands": [
      {
        "name": "write-cache",
        "summary": "Write local cache",
        "run": "scripts/write-cache.js",
        "permissions": {
          "fs": true,
          "env": false,
          "net": false,
          "process": false
        }
      }
    ]
  }
}
```

Then:

```bash
kordex write-cache
```

## Full example

```json
{
  "name": "local-notes",
  "version": "0.1.0",
  "entry": "src/main.ts",
  "registry": "https://registry.vixcpp.com",
  "dependencies": {
    "kordex/std": "0.1.0"
  },
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project --out-dir dist --force",
    "check": "kordex check src/main.ts"
  },
  "plugins": {
    "commands": [
      {
        "name": "seed",
        "summary": "Seed local data",
        "run": "scripts/seed.ts",
        "permissions": {
          "fs": true,
          "env": false,
          "net": false,
          "process": false
        }
      }
    ]
  }
}
```

## Project structure example

```txt
my-app/
├── kordex.json
├── kordex.lock
├── src/
│   └── main.ts
└── scripts/
    └── seed.ts
```

## Use with JavaScript

`kordex.json`:

```json
{
  "name": "hello-js",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

`src/main.js`:

```js
console.log("Hello from Kordex");
```

Run:

```bash
kordex run
```

## Use with TypeScript

`kordex.json`:

```json
{
  "name": "hello-ts",
  "version": "0.1.0",
  "entry": "src/main.ts"
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

## Use with local-first storage

```json
{
  "name": "local-store",
  "version": "0.1.0",
  "entry": "src/main.js",
  "scripts": {
    "dev": "kordex run --allow-softadastra"
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
kordex run --allow-softadastra
```

## Build from `kordex.json`

```json
{
  "name": "build-demo",
  "version": "0.1.0",
  "entry": "src/main.js",
  "scripts": {
    "build": "kordex build . --project --out-dir dist --force"
  }
}
```

Build:

```bash
kordex build . --project --out-dir dist --force
```

Output:

```txt
dist/main.js
```

## Install dependencies

```json
{
  "name": "install-demo",
  "version": "0.1.0",
  "entry": "src/main.js",
  "registry": "https://registry.vixcpp.com",
  "dependencies": {
    "softadastra/plugin-example": "0.1.0"
  }
}
```

Install:

```bash
kordex install
```

Update:

```bash
kordex update
```

## Recommended manifest

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "registry": "https://registry.vixcpp.com",
  "dependencies": {},
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project"
  }
}
```

## Common errors

### Missing entry

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
  "entry": "src/main.js"
}
```

### Entry points to a missing file

Wrong:

```json
{
  "entry": "src/app.js"
}
```

when the file does not exist.

Correct:

```json
{
  "entry": "src/main.js"
}
```

and create:

```txt
src/main.js
```

### Wrong dependency shape

Wrong:

```json
{
  "dependencies": ["softadastra/plugin-example"]
}
```

Correct:

```json
{
  "dependencies": {
    "softadastra/plugin-example": "0.1.0"
  }
}
```

### Registry without URL scheme

Wrong:

```json
{
  "registry": "registry.vixcpp.com"
}
```

Better:

```json
{
  "registry": "https://registry.vixcpp.com"
}
```

### Plugin command without `run`

Wrong:

```json
{
  "plugins": {
    "commands": [
      {
        "name": "hello"
      }
    ]
  }
}
```

Correct:

```json
{
  "plugins": {
    "commands": [
      {
        "name": "hello",
        "run": "scripts/hello.js"
      }
    ]
  }
}
```

### Giving too many permissions

Avoid:

```json
{
  "permissions": {
    "fs": true,
    "env": true,
    "net": true,
    "process": true
  }
}
```

when the plugin only reads files.

Better:

```json
{
  "permissions": {
    "fs": true,
    "env": false,
    "net": false,
    "process": false
  }
}
```

## Related pages

- [package.json](./package-json.md)
- [Permissions](./permissions.md)
- [Module imports](./module-imports.md)
- [Project structure](../guide/project-structure.md)
- [Running scripts](../guide/running-scripts.md)
- [CLI install](../cli/install.md)
- [CLI update](../cli/update.md)
