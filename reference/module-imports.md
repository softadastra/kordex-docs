# Module imports

Kordex modules are imported with the `kordex:` prefix.

Use this page to check the exact import format for standard modules.

## Import format

```js id="x9o4p2"
import { name } from "kordex:module";
```

Example:

```js id="e4n7qh"
import { join } from "kordex:path";

console.log(join(".", "src", "main.js"));
```

## Available modules

```txt id="tw8nc2"
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

## Permission summary

| Module               | Permission            |
| -------------------- | --------------------- |
| `kordex:console`     | none                  |
| `kordex:path`        | none                  |
| `kordex:timer`       | none                  |
| `kordex:crypto`      | none                  |
| `kordex:fs`          | `--allow-fs`          |
| `kordex:env`         | `--allow-env`         |
| `kordex:process`     | `--allow-process`     |
| `kordex:http`        | `--allow-net`         |
| `kordex:softadastra` | `--allow-softadastra` |

## Safe imports

These modules can be used without extra permission:

```js id="mddbsb"
import { log } from "kordex:console";
import { join } from "kordex:path";
import { unixMs } from "kordex:timer";
import { hash } from "kordex:crypto";

log("Kordex");
console.log(join(".", "data", "app.json"));
console.log(unixMs());
console.log(hash("kordex"));
```

Run:

```bash id="lyf2jz"
kordex run main.js
```

## Permission-gated imports

These modules require explicit flags:

```js id="cwyahj"
import { readText } from "kordex:fs";
import { get } from "kordex:env";
import { run } from "kordex:process";
import { buildUrl } from "kordex:http";
import * as softadastra from "kordex:softadastra";
```

Run with the permissions used by the script:

```bash id="i1cfl6"
kordex run main.js --allow-fs --allow-env --allow-process --allow-net --allow-softadastra
```

Enable only the permissions you need.

## `kordex:console`

Console helpers.

```js id="nt6g0l"
import { log, info, warn, error, debug } from "kordex:console";

log("normal message");
info("info message");
warn("warning message");
error("error message");
debug("debug message");
```

No permission is required.

Exports:

```txt id="y4497d"
log
info
warn
error
debug
```

## `kordex:path`

Path utilities.

```js id="sf24xm"
import {
  normalize,
  join,
  dirname,
  basename,
  extension,
  isAbsolute,
  isRelative,
} from "kordex:path";

console.log(normalize("./src/../src/main.js"));
console.log(join(".", "src", "main.js"));
console.log(dirname("src/main.js"));
console.log(basename("src/main.js"));
console.log(extension("src/main.js"));
console.log(isAbsolute("/tmp/app"));
console.log(isRelative("src/main.js"));
```

No permission is required.

Exports:

```txt id="o04b88"
normalize
join
dirname
basename
extension
isAbsolute
isRelative
```

## `kordex:timer`

Time helpers.

```js id="v7wm80"
import { now, sleep, unixMs } from "kordex:timer";

console.log("steady:", now());
console.log("unix:", unixMs());

sleep(100);

console.log("done");
```

No permission is required.

Exports:

```txt id="kvfspa"
now
sleep
unixMs
```

## `kordex:crypto`

Crypto-style utility helpers.

```js id="g337f9"
import { hash, random, randomInt, equals } from "kordex:crypto";

console.log(hash("kordex"));
console.log(random());
console.log(randomInt(1, 10));
console.log(equals("a", "a"));
```

No permission is required.

Exports:

```txt id="qgx13q"
hash
random
randomInt
equals
```

## `kordex:fs`

Filesystem helpers.

```js id="gfsfo1"
import {
  exists,
  isFile,
  isDirectory,
  readText,
  writeText,
  remove,
} from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(exists("hello.txt"));
console.log(isFile("hello.txt"));
console.log(readText("hello.txt"));

remove("hello.txt");
```

Run:

```bash id="tt4gd0"
kordex run main.js --allow-fs
```

Exports:

```txt id="kcbe7h"
exists
isFile
isDirectory
readText
writeText
remove
```

Permission:

```txt id="am7rq8"
--allow-fs
```

## `kordex:env`

Environment variable helpers.

```js id="ljyz7e"
import { get, has, set, unset } from "kordex:env";

console.log(has("APP_ENV"));
console.log(get("APP_ENV"));

set("KORDEX_DEMO", "yes");
console.log(get("KORDEX_DEMO"));

unset("KORDEX_DEMO");
```

Run:

```bash id="vdvkyf"
APP_ENV=development kordex run main.js --allow-env
```

Exports:

```txt id="c4u4mu"
get
has
set
unset
```

Permission:

```txt id="en8loi"
--allow-env
```

## `kordex:process`

Process helpers.

```js id="u14f9o"
import { cwd, chdir, run } from "kordex:process";

console.log(cwd());

chdir(".");

const exitCode = run("echo hello");

console.log(exitCode);
```

Run:

```bash id="cf47ty"
kordex run main.js --allow-process
```

Exports:

```txt id="mv5yqq"
cwd
chdir
run
```

Permission:

```txt id="ru5rmp"
--allow-process
```

Use this permission carefully.

`run()` can execute shell commands.

## `kordex:http`

HTTP utility helpers.

```js id="mdzvzc"
import {
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusText,
  buildUrl,
  normalizeMethod,
  isMethod,
} from "kordex:http";

console.log(isSuccess(200));
console.log(isRedirect(302));
console.log(isClientError(404));
console.log(isServerError(500));
console.log(statusText(200));
console.log(buildUrl("https://api.example.com", "/users"));
console.log(normalizeMethod("post"));
console.log(isMethod("GET"));
```

Run:

```bash id="z5915z"
kordex run main.js --allow-net
```

Exports:

```txt id="x2l68v"
isSuccess
isRedirect
isClientError
isServerError
statusText
buildUrl
normalizeMethod
isMethod
```

Permission:

```txt id="dt8fso"
--allow-net
```

`kordex:http` currently provides safe HTTP helpers.

## `kordex:softadastra`

Softadastra local-first storage helpers.

```js id="qj8da1"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));
console.log(softadastra.contains("runtime"));
console.log(softadastra.size());

softadastra.close();
```

Run:

```bash id="wzucna"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

Exports:

```txt id="ffdbjs"
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

Permission:

```txt id="tgf72p"
--allow-softadastra
```

## Named imports

Use named imports when you need a few functions.

```js id="dzci4y"
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

console.log(join(".", "cache", hash("key")));
```

## Namespace imports

Use namespace imports when you need many functions from the same module.

```js id="mse7rs"
import * as path from "kordex:path";
import * as softadastra from "kordex:softadastra";

const walPath = path.join(".", ".kordex", "data", "app.wal");

softadastra.open("durable", "app", walPath);
softadastra.close();
```

## Mixed imports

You can import from several modules in one script.

```js id="tuslyt"
import { join } from "kordex:path";
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

const key = "cache:" + hash("products");
const walPath = join(".", ".kordex", "data", "cache.wal");

softadastra.open("durable", "cache-app", walPath);

softadastra.put(key, "cached value");

console.log(softadastra.get(key));

softadastra.close();
```

Run:

```bash id="b9b0hi"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

Only `kordex:softadastra` needs permission in this example.

## Relative imports

Kordex also supports local relative imports.

`lib/message.js`:

```js id="peafym"
export function message() {
  return "Hello from a local module";
}
```

`main.js`:

```js id="yxsso3"
import { message } from "./lib/message.js";

console.log(message());
```

Run:

```bash id="kvfbu2"
kordex run main.js
```

## Extension resolution

You can import without the extension.

```js id="fmcc4f"
import { message } from "./lib/message";

console.log(message());
```

Kordex can resolve common JavaScript and TypeScript extensions.

## Directory index imports

You can import a directory when it has an index file.

```txt id="mnc2ug"
lib/
└── tools/
    └── index.js
```

`main.js`:

```js id="or7xha"
import { toolName } from "./lib/tools";

console.log(toolName);
```

## JSON imports

JSON files can be imported.

`user.json`:

```json id="xr5xku"
{
  "name": "Kordex",
  "type": "runtime"
}
```

`main.js`:

```js id="b57agv"
import user from "./user.json";

console.log(user.name);
console.log(user.type);
```

Run:

```bash id="j30xq6"
kordex run main.js
```

## TypeScript imports

TypeScript files can import JavaScript, TypeScript, JSON, and Kordex modules.

```ts id="pi77sy"
import { join } from "kordex:path";
import user from "./user.json";
import { message } from "./message";

const file: string = join(".", "data", user.name + ".txt");

console.log(message());
console.log(file);
```

Run:

```bash id="fkieag"
kordex run main.ts
```

TypeScript support is currently MVP-level.

## Import examples by task

### Build a local file path

```js id="ejhhj7"
import { join } from "kordex:path";

const file = join(".", "data", "app.json");

console.log(file);
```

### Hash a cache key

```js id="uhjxzx"
import { hash } from "kordex:crypto";

const key = "cache:" + hash("products");

console.log(key);
```

### Read a config file

```js id="oz0223"
import { readText } from "kordex:fs";

const config = JSON.parse(readText("config.json"));

console.log(config.name);
```

Run:

```bash id="q79uyr"
kordex run main.js --allow-fs
```

### Read an environment variable

```js id="enay2k"
import { get } from "kordex:env";

console.log(get("APP_ENV"));
```

Run:

```bash id="v098er"
APP_ENV=production kordex run main.js --allow-env
```

### Use local-first storage

```js id="ccqgdd"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");
softadastra.put("ready", "yes");
console.log(softadastra.get("ready"));
softadastra.close();
```

Run:

```bash id="uf6g5w"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Wrong imports

### Missing `kordex:` prefix

Wrong:

```js id="f7vt9w"
import { join } from "path";
```

Correct:

```js id="w0gqea"
import { join } from "kordex:path";
```

### Importing Node.js modules directly

Wrong:

```js id="ydsggy"
import fs from "fs";
```

Correct:

```js id="s9zjjq"
import { readText } from "kordex:fs";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong module name

Wrong:

```js id="eamvj4"
import { readText } from "kordex:file";
```

Correct:

```js id="w14hzh"
import { readText } from "kordex:fs";
```

### Missing permission

Script:

```js id="msv7kw"
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Wrong:

```bash id="lot6gr"
kordex run main.js
```

Correct:

```bash id="j5uwb5"
kordex run main.js --allow-fs
```

### Wrong permission

Script:

```js id="jyovbs"
import { readText } from "kordex:fs";
```

Wrong:

```bash id="cfce6t"
kordex run main.js --allow-net
```

Correct:

```bash id="xgwdmj"
kordex run main.js --allow-fs
```

### Wrong function name

Wrong:

```js id="xohyxl"
import { readFile } from "kordex:fs";
```

Correct:

```js id="v95pkg"
import { readText } from "kordex:fs";
```

## Recommended style

Use `kordex:` modules for native capabilities:

```js id="b6ng6v"
import { join } from "kordex:path";
```

Use relative imports for your own files:

```js id="vboz48"
import { message } from "./lib/message.js";
```

Use namespace imports for large modules:

```js id="kqedcr"
import * as softadastra from "kordex:softadastra";
```

Use only the permissions your imports require:

```bash id="arr4n3"
kordex run main.js --allow-fs
```

## Related pages

- [Permissions](./permissions.md)
- [Guide: Imports](../guide/imports.md)
- [Running scripts](../guide/running-scripts.md)
- [TypeScript](../guide/typescript.md)
- [Console module](../modules/console.md)
- [Path module](../modules/path.md)
- [Timer module](../modules/timer.md)
- [Crypto module](../modules/crypto.md)
- [Filesystem module](../modules/fs.md)
- [Environment module](../modules/env.md)
- [Process module](../modules/process.md)
- [HTTP module](../modules/http.md)
- [Softadastra module](../modules/softadastra.md)
