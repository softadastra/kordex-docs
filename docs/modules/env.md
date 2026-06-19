# `kordex:env`

Environment variable module for Kordex scripts.

Use it to read, check, set, or remove environment variables during a script run.

```js id="m4h7qa"
import { has, get } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run with environment permission:

```bash id="nxm2e9"
kordex run main.js --allow-env
```

## Import

```js id="h3zbcn"
import { get } from "kordex:env";
```

Or import everything:

```js id="xmd42n"
import * as env from "kordex:env";

console.log(env.has("HOME"));
console.log(env.get("HOME"));
```

## Permission

`kordex:env` requires environment permission.

```bash id="ygk14s"
--allow-env
```

Correct:

```bash id="km8x5c"
kordex run main.js --allow-env
```

Without permission, scripts should not access `kordex:env`.

Environment access is sensitive because environment variables can contain paths, tokens, secrets, API keys, or deployment configuration.

## Functions

```txt id="rk6lvg"
get(name)
has(name)
set(name, value)
unset(name)
```

## `get`

Return the value of an environment variable.

```js id="f44n3a"
import { get } from "kordex:env";

console.log(get("HOME"));
```

Run:

```bash id="j1zz3c"
kordex run main.js --allow-env
```

If the variable does not exist, `get()` returns `null`.

```js id="lh6gsm"
import { get } from "kordex:env";

console.log(get("MISSING_VARIABLE"));
```

Example output:

```txt id="v20al8"
null
```

## `has`

Return `true` if an environment variable exists.

```js id="yq3ibc"
import { has } from "kordex:env";

console.log(has("HOME"));
console.log(has("MISSING_VARIABLE"));
```

Run:

```bash id="grqcd9"
kordex run main.js --allow-env
```

Example output:

```txt id="e3h8yb"
true
false
```

## `set`

Set an environment variable for the current process.

```js id="dpkpxp"
import { set, get } from "kordex:env";

set("KORDEX_MODE", "local-first");

console.log(get("KORDEX_MODE"));
```

Run:

```bash id="dtcck6"
kordex run main.js --allow-env
```

Output:

```txt id="d84nd1"
local-first
```

`set()` expects two strings:

```txt id="rs6k4o"
name
value
```

## `unset`

Remove an environment variable from the current process.

```js id="l0nl5l"
import { set, has, unset } from "kordex:env";

set("KORDEX_TEMP", "yes");

console.log(has("KORDEX_TEMP"));

unset("KORDEX_TEMP");

console.log(has("KORDEX_TEMP"));
```

Run:

```bash id="p78wmn"
kordex run main.js --allow-env
```

Example output:

```txt id="oh09av"
true
false
```

## Read configuration from env

```js id="c6qzwg"
import { get, has } from "kordex:env";

const mode = has("APP_MODE") ? get("APP_MODE") : "development";

console.log("mode:", mode);
```

Run:

```bash id="h0xkqk"
APP_MODE=production kordex run main.js --allow-env
```

Output:

```txt id="xp2k3l"
mode: production
```

## Use a fallback value

```js id="xyky48"
import { get } from "kordex:env";

const port = get("PORT") || "3000";

console.log("port:", port);
```

Run:

```bash id="l3s4xq"
kordex run main.js --allow-env
```

If `PORT` is missing, the script uses:

```txt id="gb296k"
3000
```

## Use with `kordex:console`

```js id="q6kmq4"
import { log, warn } from "kordex:console";
import { has, get } from "kordex:env";

if (has("APP_NAME")) {
  log("app:", get("APP_NAME"));
} else {
  warn("APP_NAME is not set");
}
```

Run:

```bash id="p4jq22"
kordex run main.js --allow-env
```

## Use with `kordex:path`

```js id="lhv4o6"
import { get } from "kordex:env";
import { join } from "kordex:path";

const home = get("HOME") || ".";
const file = join(home, ".kordex", "config.json");

console.log(file);
```

Run:

```bash id="bt7905"
kordex run main.js --allow-env
```

`kordex:path` does not require permission.

`kordex:env` requires `--allow-env`.

## Use with filesystem

```js id="lxx3af"
import { get } from "kordex:env";
import { readText } from "kordex:fs";
import { join } from "kordex:path";

const root = get("APP_ROOT") || ".";
const configFile = join(root, "config.json");

console.log(readText(configFile));
```

Run:

```bash id="fza9ha"
APP_ROOT=. kordex run main.js --allow-env --allow-fs
```

Permissions:

```txt id="e27o7a"
--allow-env  needed for kordex:env
--allow-fs   needed for kordex:fs
```

## Use with local-first data

Environment variables can choose where local data is stored.

```js id="to2d3f"
import { get } from "kordex:env";
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const dataDir = get("KORDEX_DATA_DIR") || ".kordex/data";
const store = join(dataDir, "app.wal");

softadastra.open("durable", "env-demo", store);

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash id="c6k6oq"
KORDEX_DATA_DIR=.kordex/data kordex run main.js --allow-env --allow-softadastra
```

## Current process only

`set()` and `unset()` affect the current Kordex process.

Example:

```js id="l5hxdo"
import { set, get } from "kordex:env";

set("KORDEX_SESSION", "local");

console.log(get("KORDEX_SESSION"));
```

Run:

```bash id="zjrlfu"
kordex run main.js --allow-env
```

This does not permanently edit your shell profile.

It does not write to:

```txt id="yw0y93"
.bashrc
.zshrc
.profile
.env
```

## Do not print secrets

Environment variables can contain secrets.

Avoid printing sensitive values.

Wrong:

```js id="cjvbll"
import { get } from "kordex:env";

console.log(get("API_KEY"));
```

Better:

```js id="jz64k2"
import { has } from "kordex:env";

if (has("API_KEY")) {
  console.log("API_KEY is configured");
}
```

## Recommended usage

Use `has()` before reading optional values:

```js id="vvpxvx"
if (has("APP_MODE")) {
  console.log(get("APP_MODE"));
}
```

Use `get()` with fallback values:

```js id="xv3cmb"
const mode = get("APP_MODE") || "development";
```

Use `set()` for temporary values inside the current script:

```js id="fy3fm9"
set("KORDEX_MODE", "test");
```

Use `unset()` to clean temporary variables:

```js id="utq5a5"
unset("KORDEX_MODE");
```

## Permission model

`kordex:env` is disabled unless the script is run with:

```bash id="ntebxf"
--allow-env
```

Good:

```bash id="cq6wou"
kordex run main.js --allow-env
```

Avoid giving permissions that the script does not need.

Wrong:

```bash id="m7u0d6"
kordex run main.js --allow-env --allow-fs --allow-process
```

when the script only reads one environment variable.

Better:

```bash id="nm6p9g"
kordex run main.js --allow-env
```

## Common usage

```js id="ty3sfq"
import { get, has, set, unset } from "kordex:env";

console.log("HOME exists:", has("HOME"));
console.log("HOME:", get("HOME"));

set("KORDEX_TEMP", "yes");
console.log(get("KORDEX_TEMP"));

unset("KORDEX_TEMP");
console.log(has("KORDEX_TEMP"));
```

Run:

```bash id="fztwtt"
kordex run main.js --allow-env
```

## Common errors

### Missing permission

Wrong:

```bash id="ea06ph"
kordex run main.js
```

when the script uses:

```js id="dtmq9r"
import { get } from "kordex:env";
```

Correct:

```bash id="a7e12e"
kordex run main.js --allow-env
```

### Wrong module name

Wrong:

```js id="ydy6pe"
import { get } from "env";
```

Correct:

```js id="vt2ar9"
import { get } from "kordex:env";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="q2g5sh"
import { getenv, setenv } from "kordex:env";
```

Correct:

```js id="gncnfo"
import { get, set } from "kordex:env";
```

Available functions:

```txt id="pa4h21"
get
has
set
unset
```

### Empty variable name

Wrong:

```js id="ebppym"
get("");
```

Correct:

```js id="wf7092"
get("HOME");
```

The environment variable name cannot be empty.

### Passing non-string values

Wrong:

```js id="brrq49"
set("PORT", 3000);
```

Correct:

```js id="o731ne"
set("PORT", "3000");
```

`set()` expects a string name and a string value.

### Assuming `get()` always returns a string

Wrong:

```js id="qobme1"
const value = get("MISSING_VARIABLE");
console.log(value.length);
```

Better:

```js id="sdc5s4"
const value = get("MISSING_VARIABLE");

if (value !== null) {
  console.log(value.length);
}
```

A missing variable returns `null`.

## Related pages

- [Modules](./index.md)
- [Filesystem module](./fs.md)
- [Process module](./process.md)
- [Permissions](../guide/permissions.md)
- [Running scripts](../guide/running-scripts.md)
- [Local-first](../guide/local-first.md)
