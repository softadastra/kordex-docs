# Permissions

Kordex uses explicit permissions for native capabilities.

A script does not get filesystem, environment, network, process, or Softadastra access silently.

You enable only what the script needs.

## Permission flags

```txt id="8zn3kd"
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

## Permission table

| Flag                  | Enables                           | Module               |
| --------------------- | --------------------------------- | -------------------- |
| `--allow-fs`          | Filesystem access                 | `kordex:fs`          |
| `--allow-env`         | Environment variables             | `kordex:env`         |
| `--allow-net`         | HTTP helpers / network capability | `kordex:http`        |
| `--allow-process`     | Process commands and cwd changes  | `kordex:process`     |
| `--allow-softadastra` | Softadastra local-first storage   | `kordex:softadastra` |

## Safe modules

These modules are available without extra permission:

```txt id="eu2t7s"
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

Example:

```js id="ep5nnb"
import { join } from "kordex:path";
import { hash } from "kordex:crypto";
import { unixMs } from "kordex:timer";

console.log(join(".", "data", "app.json"));
console.log(hash("kordex"));
console.log(unixMs());
```

Run:

```bash id="gy6j7u"
kordex run main.js
```

No permission flag is required.

## Permission-gated modules

These modules need permission:

```txt id="kv9i4u"
kordex:fs          requires --allow-fs
kordex:env         requires --allow-env
kordex:http        requires --allow-net
kordex:process     requires --allow-process
kordex:softadastra requires --allow-softadastra
```

## Filesystem permission

Use `--allow-fs` when a script imports `kordex:fs`.

```js id="fel5de"
import { exists, readText } from "kordex:fs";

if (exists("config.json")) {
  console.log(readText("config.json"));
}
```

Run:

```bash id="beqjpc"
kordex run main.js --allow-fs
```

Without permission:

```bash id="hpbpft"
kordex run main.js
```

the filesystem module is not available.

## Environment permission

Use `--allow-env` when a script imports `kordex:env`.

```js id="yq9blo"
import { get, has } from "kordex:env";

if (has("APP_ENV")) {
  console.log(get("APP_ENV"));
}
```

Run:

```bash id="i10l39"
APP_ENV=development kordex run main.js --allow-env
```

## Network permission

Use `--allow-net` when a script imports `kordex:http`.

```js id="ldw0at"
import { buildUrl, statusText } from "kordex:http";

console.log(buildUrl("https://api.example.com", "/health"));
console.log(statusText(200));
```

Run:

```bash id="n9gjpx"
kordex run main.js --allow-net
```

`kordex:http` currently provides helpers such as status checks, method normalization, and URL building.

## Process permission

Use `--allow-process` when a script imports `kordex:process`.

```js id="spz1wr"
import { cwd, run } from "kordex:process";

console.log(cwd());

const code = run("echo hello");
console.log(code);
```

Run:

```bash id="jmq16t"
kordex run main.js --allow-process
```

Only use this permission when it is really needed.

Process access can execute shell commands.

## Softadastra permission

Use `--allow-softadastra` when a script imports `kordex:softadastra`.

```js id="w1oa8w"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash id="mv5ycf"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Multiple permissions

Use multiple flags when a script imports multiple permission-gated modules.

```js id="s8n1i4"
import { get } from "kordex:env";
import { writeText } from "kordex:fs";

const name = get("APP_NAME") || "kordex";

writeText("app.txt", name);

console.log("saved");
```

Run:

```bash id="z52hqq"
APP_NAME=demo kordex run main.js --allow-env --allow-fs
```

## Use only what you need

Good:

```bash id="ban2z1"
kordex run main.js --allow-fs
```

Bad:

```bash id="q1akw1"
kordex run main.js --allow-fs --allow-env --allow-net --allow-process --allow-softadastra
```

Do not enable every permission by default.

## Permissions with `repl`

Permissions also apply to `repl --eval`.

```bash id="l95rq4"
kordex repl --eval "import { get } from 'kordex:env'; console.log(get('HOME'))" --allow-env
```

For Softadastra:

```bash id="ncn2u9"
kordex repl --eval "import * as s from 'kordex:softadastra'; console.log(s.isOpen())" --allow-softadastra
```

## Permissions in npm scripts

You can place permissions in `package.json`.

```json id="gd0ag1"
{
  "scripts": {
    "dev": "kordex run",
    "files": "kordex run src/files.js --allow-fs",
    "env": "kordex run src/env.js --allow-env",
    "store": "kordex run src/store.js --allow-softadastra"
  }
}
```

Then run:

```bash id="cyzej1"
npm run store
```

## Permissions in `kordex.json` scripts

```json id="lnyz2o"
{
  "scripts": {
    "dev": "kordex run",
    "store": "kordex run --allow-softadastra",
    "files": "kordex run src/files.js --allow-fs"
  }
}
```

## Plugin command permissions

Plugin commands can declare their own permissions in `kordex.json`.

```json id="2pma8u"
{
  "plugins": {
    "commands": [
      {
        "name": "seed",
        "summary": "Seed local data",
        "run": "scripts/seed.js",
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

```bash id="8lqkme"
kordex seed
```

Plugin permissions use these names:

```txt id="hxvs5m"
fs
env
net
process
```

## Permission mapping

Runtime flags map to modules like this:

```txt id="piqbo8"
--allow-fs          -> kordex:fs
--allow-env         -> kordex:env
--allow-net         -> kordex:http
--allow-process     -> kordex:process
--allow-softadastra -> kordex:softadastra
```

## Common examples

### Read a file

```js id="ob0wvz"
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run:

```bash id="zxeifn"
kordex run main.js --allow-fs
```

### Read an environment variable

```js id="ppcne6"
import { get } from "kordex:env";

console.log(get("APP_ENV"));
```

Run:

```bash id="bqj84c"
APP_ENV=production kordex run main.js --allow-env
```

### Build a URL

```js id="u95ywi"
import { buildUrl } from "kordex:http";

console.log(buildUrl("https://api.example.com", "/users"));
```

Run:

```bash id="gk2bwr"
kordex run main.js --allow-net
```

### Run a shell command

```js id="f8o1ja"
import { run } from "kordex:process";

console.log(run("echo Kordex"));
```

Run:

```bash id="nx6a2e"
kordex run main.js --allow-process
```

### Write local-first data

```js id="tm46hx"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "demo", ".kordex/data/demo.wal");
softadastra.put("status", "saved locally");
console.log(softadastra.get("status"));
softadastra.close();
```

Run:

```bash id="ipk9hp"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Recommended defaults

For normal scripts:

```bash id="u4fkjb"
kordex run main.js
```

For local file scripts:

```bash id="vc3epm"
kordex run main.js --allow-fs
```

For scripts that read configuration from the environment:

```bash id="ceqw8p"
kordex run main.js --allow-env
```

For local-first storage:

```bash id="aa41no"
kordex run main.js --allow-softadastra
```

For shell/process scripts:

```bash id="wddhml"
kordex run main.js --allow-process
```

## Permission design

Kordex permissions are part of the runtime model.

The goal is simple:

```txt id="gde1cx"
JavaScript can use native power,
but native power must be explicit.
```

This makes scripts easier to review.

A command like this is clear:

```bash id="ogs45i"
kordex run sync.js --allow-env --allow-softadastra
```

It tells you the script can read environment variables and use local-first storage.

A command like this is more dangerous:

```bash id="gztuse"
kordex run task.js --allow-process
```

It tells you the script can execute process commands.

## Common errors

### Missing filesystem permission

Script:

```js id="w1tmnd"
import { exists } from "kordex:fs";

console.log(exists("README.md"));
```

Wrong:

```bash id="uaxc62"
kordex run main.js
```

Correct:

```bash id="v6uzud"
kordex run main.js --allow-fs
```

### Missing environment permission

Script:

```js id="ge6n5x"
import { get } from "kordex:env";

console.log(get("HOME"));
```

Correct:

```bash id="zrjhe3"
kordex run main.js --allow-env
```

### Missing network permission

Script:

```js id="flgkup"
import { statusText } from "kordex:http";

console.log(statusText(200));
```

Correct:

```bash id="jjz9pb"
kordex run main.js --allow-net
```

### Missing process permission

Script:

```js id="w4vbef"
import { run } from "kordex:process";

run("echo hello");
```

Correct:

```bash id="i750r9"
kordex run main.js --allow-process
```

### Missing Softadastra permission

Script:

```js id="zjb6ib"
import * as softadastra from "kordex:softadastra";

console.log(softadastra.isOpen());
```

Correct:

```bash id="wbwf7f"
kordex run main.js --allow-softadastra
```

### Wrong module for permission

Wrong:

```bash id="s5zg6j"
kordex run main.js --allow-net
```

when the script imports:

```js id="i5ntvg"
import { readText } from "kordex:fs";
```

Correct:

```bash id="qtn52v"
kordex run main.js --allow-fs
```

### Importing without the `kordex:` prefix

Wrong:

```js id="vj8vmz"
import { readText } from "fs";
```

Correct:

```js id="53ey5e"
import { readText } from "kordex:fs";
```

## Related pages

- [Guide: Permissions](../guide/permissions.md)
- [Module imports](./module-imports.md)
- [kordex.json](./kordex-json.md)
- [package.json](./package-json.md)
- [Filesystem module](../modules/fs.md)
- [Environment module](../modules/env.md)
- [HTTP module](../modules/http.md)
- [Process module](../modules/process.md)
- [Softadastra module](../modules/softadastra.md)
