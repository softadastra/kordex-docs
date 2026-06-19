# Changelog

All notable changes to Kordex will be documented here.

Kordex is a JavaScript and TypeScript runtime for reliable local-first applications.

## Unreleased

### Added

- Added public documentation site structure for `kordex.softadastra.com`.
- Added guide pages for installation, project structure, running scripts, permissions, imports, TypeScript, and local-first usage.
- Added CLI documentation pages.
- Added standard module documentation pages.
- Added recipe pages for common JavaScript workflows.
- Added reference pages for `kordex.json`, `package.json`, permissions, and module imports.
- Planned `/install` endpoint for simple installation with `curl`.

### Planned

- Improve the installation flow.
- Add the public install script.
- Add more real JavaScript examples.
- Add more local-first storage examples.
- Improve TypeScript examples.
- Improve package installation documentation.
- Add plugin command documentation.
- Add registry documentation.

## 0.1.0

Initial Kordex release.

### Added

- Added the `kordex` CLI.
- Added JavaScript file execution with:

```bash
kordex run main.js
```

- Added TypeScript MVP execution with:

```bash
kordex run main.ts
```

- Added project entry resolution with:

```bash
kordex run
```

- Added support for `kordex.json`.
- Added support for `package.json` entry fallback.
- Added local relative imports.
- Added extension resolution for local imports.
- Added directory index import resolution.
- Added JSON imports.
- Added `repl --eval` for direct source evaluation.

### CLI

Added the first set of CLI commands:

```txt
kordex help
kordex init
kordex run
kordex repl
kordex check
kordex build
kordex install
kordex update
kordex version
```

### Project initialization

Added project creation with:

```bash
kordex init app
```

Generated project foundation:

```txt
app/
├── kordex.json
└── src/
    └── main.js
```

### Running scripts

Added script execution:

```bash
kordex run src/main.js
```

Added project entry execution:

```bash
kordex run
```

Kordex can resolve the entry from:

```txt
kordex.json entry
package.json kordex.entry
package.json module
package.json main
fallback files
```

Fallback files include:

```txt
src/main.ts
src/main.js
index.ts
index.js
```

### TypeScript

Added MVP-level TypeScript support.

Supported direction:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run:

```bash
kordex run main.ts
```

TypeScript support is still early and will continue improving.

### Imports

Added local imports:

```js
import { message } from "./message.js";

console.log(message());
```

Added JSON imports:

```js
import user from "./user.json";

console.log(user.name);
```

Added standard module imports with the `kordex:` prefix:

```js
import { join } from "kordex:path";

console.log(join(".", "src", "main.js"));
```

### Standard modules

Added native standard modules:

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

### Safe modules

These modules are available without extra permission:

```txt
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

### Permission-gated modules

These modules require explicit permissions:

```txt
kordex:fs          -> --allow-fs
kordex:env         -> --allow-env
kordex:http        -> --allow-net
kordex:process     -> --allow-process
kordex:softadastra -> --allow-softadastra
```

### Permissions

Added explicit runtime permission flags:

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Example:

```bash
kordex run main.js --allow-fs
```

This makes native access visible at command execution time.

### `kordex:console`

Added console helpers:

```txt
log
info
warn
error
debug
```

Example:

```js
import { log } from "kordex:console";

log("Hello from Kordex");
```

### `kordex:path`

Added path helpers:

```txt
normalize
join
dirname
basename
extension
isAbsolute
isRelative
```

Example:

```js
import { join } from "kordex:path";

console.log(join(".", "data", "app.json"));
```

### `kordex:timer`

Added timer helpers:

```txt
now
sleep
unixMs
```

Example:

```js
import { unixMs } from "kordex:timer";

console.log(unixMs());
```

### `kordex:crypto`

Added crypto-style utility helpers:

```txt
hash
random
randomInt
equals
```

Example:

```js
import { hash } from "kordex:crypto";

console.log(hash("kordex"));
```

### `kordex:fs`

Added filesystem helpers:

```txt
exists
isFile
isDirectory
readText
writeText
remove
```

Requires:

```txt
--allow-fs
```

Example:

```js
import { writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(readText("hello.txt"));
```

Run:

```bash
kordex run main.js --allow-fs
```

### `kordex:env`

Added environment helpers:

```txt
get
has
set
unset
```

Requires:

```txt
--allow-env
```

Example:

```js
import { get } from "kordex:env";

console.log(get("APP_ENV"));
```

Run:

```bash
APP_ENV=development kordex run main.js --allow-env
```

### `kordex:process`

Added process helpers:

```txt
cwd
chdir
run
```

Requires:

```txt
--allow-process
```

Example:

```js
import { cwd, run } from "kordex:process";

console.log(cwd());
console.log(run("echo hello"));
```

Run:

```bash
kordex run main.js --allow-process
```

### `kordex:http`

Added HTTP utility helpers:

```txt
isSuccess
isRedirect
isClientError
isServerError
statusText
buildUrl
normalizeMethod
isMethod
```

Requires:

```txt
--allow-net
```

Example:

```js
import { buildUrl, statusText } from "kordex:http";

console.log(buildUrl("https://api.example.com", "/health"));
console.log(statusText(200));
```

Run:

```bash
kordex run main.js --allow-net
```

### `kordex:softadastra`

Added Softadastra local-first storage helpers:

```txt
open
close
isOpen
put
get
remove
contains
size
tick
syncState
nodeInfo
```

Requires:

```txt
--allow-softadastra
```

Example:

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

### Build

Added build command:

```bash
kordex build main.js
```

Added project build:

```bash
kordex build . --project --out-dir dist --force
```

Output:

```txt
dist/main.js
```

Added source map option foundation:

```bash
kordex build . --project --source-map --force
```

### Check

Added source checking command:

```bash
kordex check main.js
```

Added JSON output support:

```bash
kordex check main.js --json
```

### REPL

Added direct source evaluation:

```bash
kordex repl --eval "1 + 2"
```

Added permission support for `repl --eval`:

```bash
kordex repl --eval "import { get } from 'kordex:env'; console.log(get('HOME'))" --allow-env
```

### Packages

Added package command foundations:

```bash
kordex install
kordex update
```

Added one-package install syntax:

```bash
kordex install softadastra/plugin-example@0.1.0
```

Added one-package update syntax:

```bash
kordex update softadastra/plugin-example
```

Added custom registry option:

```bash
kordex install --registry https://registry.vixcpp.com
```

Added lockfile foundation:

```txt
kordex.lock
```

### Plugin commands

Added plugin command discovery foundation from `kordex.json`.

Example:

```json
{
  "plugins": {
    "commands": [
      {
        "name": "hello",
        "summary": "Run hello plugin",
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

Run:

```bash
kordex hello
```

or:

```bash
kordex hi
```

### npm package

Added npm package direction:

```txt
kordex
@softadastra/kordex-linux-x64
```

The `kordex` package is the CLI wrapper.

The native platform package contains the Kordex binary.

### Linux x64

Added Linux x64 package distribution foundation.

### Documentation

Added initial documentation direction for:

```txt
guide/
cli/
modules/
recipes/
reference/
```

### Known limitations

- TypeScript support is still MVP-level.
- Package downloads from registry are still planned.
- Plugin execution is still planned.
- Source maps are still basic.
- Package import resolution is still planned.
- Native ES module execution is still planned.
- Softadastra sync integration is still early.
- More local-first JavaScript APIs are planned.

## Design notes

Kordex is focused on:

```txt
local execution
explicit permissions
native modules
durable local state
offline-ready workflows
reliable local-first applications
```

Kordex is not trying to be a full Node.js clone.

Kordex is building toward:

```txt
Run JavaScript locally.
Use native power safely.
Write data locally first.
Sync when possible.
Keep working when the network fails.
```
