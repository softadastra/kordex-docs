# Reference

Technical reference for Kordex projects, configuration files, permissions, and module imports.

This section is for checking exact names, fields, flags, and import formats.

## Pages

| Page                                  | Description                       |
| ------------------------------------- | --------------------------------- |
| [kordex.json](./kordex-json.md)       | Project manifest used by Kordex   |
| [package.json](./package-json.md)     | Supported package.json fields     |
| [Permissions](./permissions.md)       | Runtime permission flags          |
| [Module imports](./module-imports.md) | Import formats for Kordex modules |

## Project files

A Kordex project can use:

```txt
kordex.json
package.json
kordex.lock
src/main.js
src/main.ts
```

Kordex looks for `kordex.json` first.

If `kordex.json` is not found, Kordex can read supported fields from `package.json`.

## `kordex.json`

Example:

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
    "dev": "kordex run src/main.js",
    "build": "kordex build . --project"
  }
}
```

Common fields:

```txt
name
version
entry
registry
dependencies
scripts
plugins
```

See: [kordex.json](./kordex-json.md)

## `package.json`

Kordex can use `package.json` when there is no `kordex.json`.

Example:

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "main": "src/main.js",
  "scripts": {
    "dev": "kordex run",
    "build": "kordex build . --project"
  },
  "kordex": {
    "entry": "src/main.js"
  }
}
```

Entry resolution can use:

```txt
kordex.entry
module
main
```

See: [package.json](./package-json.md)

## Runtime permissions

Kordex uses explicit permissions for sensitive native capabilities.

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Safe utility modules do not need permission.

Permission-gated modules require the matching flag.

See: [Permissions](./permissions.md)

## Module imports

Kordex standard modules use the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { readText } from "kordex:fs";
import * as softadastra from "kordex:softadastra";
```

Available standard modules:

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

See: [Module imports](./module-imports.md)

## CLI reference

Main command format:

```bash
kordex <command> [options] [args]
```

Common commands:

```txt
kordex init <name>
kordex run [file]
kordex repl --eval <source>
kordex check <file>
kordex build <file|project>
kordex install [package[@version]]
kordex update [package]
kordex version
kordex help
```

CLI pages:

- [CLI overview](../cli/index.md)
- [init](../cli/init.md)
- [run](../cli/run.md)
- [repl](../cli/repl.md)
- [check](../cli/check.md)
- [build](../cli/build.md)
- [install](../cli/install.md)
- [update](../cli/update.md)
- [version](../cli/version.md)

## Standard modules reference

Module pages:

- [console](../modules/console.md)
- [path](../modules/path.md)
- [timer](../modules/timer.md)
- [crypto](../modules/crypto.md)
- [fs](../modules/fs.md)
- [env](../modules/env.md)
- [process](../modules/process.md)
- [http](../modules/http.md)
- [softadastra](../modules/softadastra.md)

## Common file patterns

Simple JavaScript entry:

```txt
src/main.js
```

Simple TypeScript entry:

```txt
src/main.ts
```

Local data directory:

```txt
.kordex/data
```

Softadastra WAL file:

```txt
.kordex/data/app.wal
```

Build output:

```txt
dist/main.js
dist/main.js.map
```

Lock file:

```txt
kordex.lock
```

## Related guide pages

- [Getting started](../guide/getting-started.md)
- [Installation](../guide/installation.md)
- [Project structure](../guide/project-structure.md)
- [Running scripts](../guide/running-scripts.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [TypeScript](../guide/typescript.md)
- [Local-first](../guide/local-first.md)
