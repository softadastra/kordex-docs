# Environment variables

Read and use environment variables from a Kordex script.

This recipe uses `kordex:env`.

## Goal

Read configuration from the environment instead of hardcoding values in your source code.

## Permission

Environment access requires:

```bash id="y3vr0f"
--allow-env
```

Run scripts that use `kordex:env` like this:

```bash id="m9q42s"
kordex run main.js --allow-env
```

## Create `main.js`

```js id="i7n6pb"
import { get, has } from "kordex:env";

const appName = get("APP_NAME") || "Kordex App";
const mode = get("APP_MODE") || "development";

console.log("app:", appName);
console.log("mode:", mode);
console.log("has API_URL:", has("API_URL"));
```

## Run it

```bash id="i1uora"
APP_NAME=Demo APP_MODE=local kordex run main.js --allow-env
```

## Output

```txt id="afv3kn"
app: Demo
mode: local
has API_URL: false
```

## Import

```js id="pgbsfc"
import { get, has, set, unset } from "kordex:env";
```

Or import everything:

```js id="d3yqum"
import * as env from "kordex:env";

console.log(env.get("APP_NAME"));
```

## Functions

```txt id="y0txc7"
get(name)
has(name)
set(name, value)
unset(name)
```

## `get`

Read an environment variable.

```js id="nzhwv6"
import { get } from "kordex:env";

console.log(get("APP_NAME"));
```

Run:

```bash id="cnwh80"
APP_NAME=Kordex kordex run main.js --allow-env
```

Output:

```txt id="edndud"
Kordex
```

If the variable does not exist, `get()` returns `null`.

```js id="gkwo18"
import { get } from "kordex:env";

const value = get("MISSING_VALUE");

console.log(value);
```

## Use fallback values

```js id="jkwwom"
import { get } from "kordex:env";

const port = get("PORT") || "3000";
const mode = get("APP_MODE") || "development";

console.log("port:", port);
console.log("mode:", mode);
```

Run:

```bash id="a30xkk"
kordex run main.js --allow-env
```

Output:

```txt id="dujc86"
port: 3000
mode: development
```

## `has`

Check if an environment variable exists.

```js id="yrkb6m"
import { has } from "kordex:env";

console.log(has("HOME"));
console.log(has("MISSING_VALUE"));
```

Run:

```bash id="hm3eci"
kordex run main.js --allow-env
```

## `set`

Set an environment variable for the current Kordex process.

```js id="i1b5sg"
import { set, get } from "kordex:env";

set("APP_STATUS", "ready");

console.log(get("APP_STATUS"));
```

Run:

```bash id="c2t2i2"
kordex run main.js --allow-env
```

Output:

```txt id="mhe3bf"
ready
```

`set()` affects the current Kordex process.

It does not permanently modify your shell environment after Kordex exits.

## `unset`

Remove an environment variable from the current Kordex process.

```js id="k95q0n"
import { set, get, has, unset } from "kordex:env";

set("TEMP_VALUE", "yes");

console.log(has("TEMP_VALUE"));
console.log(get("TEMP_VALUE"));

unset("TEMP_VALUE");

console.log(has("TEMP_VALUE"));
console.log(get("TEMP_VALUE"));
```

Run:

```bash id="azvd5y"
kordex run main.js --allow-env
```

## Configuration example

```js id="y9mgqx"
import { get } from "kordex:env";

const config = {
  appName: get("APP_NAME") || "Kordex",
  mode: get("APP_MODE") || "development",
  apiUrl: get("API_URL") || "http://localhost:3000",
};

console.log(config.appName);
console.log(config.mode);
console.log(config.apiUrl);
```

Run:

```bash id="memq7i"
APP_NAME=Softadastra API_URL=https://api.softadastra.com kordex run main.js --allow-env
```

## Use with `kordex:http`

```js id="eq6oli"
import { get } from "kordex:env";
import { buildUrl } from "kordex:http";

const baseUrl = get("API_URL") || "https://api.example.com";
const healthUrl = buildUrl(baseUrl, "/health");

console.log(healthUrl);
```

Run:

```bash id="wsgcp7"
API_URL=https://api.softadastra.com kordex run main.js --allow-env --allow-net
```

Permissions:

```txt id="htaa5i"
--allow-env  needed for kordex:env
--allow-net  needed for kordex:http
```

## Use with `kordex:fs`

```js id="eg3i94"
import { get } from "kordex:env";
import { join } from "kordex:path";
import { writeText } from "kordex:fs";

const dataDir = get("DATA_DIR") || "data";
const file = join(dataDir, "app.txt");

writeText(file, "configured from environment");
```

Run:

```bash id="ejeuu7"
mkdir -p data
DATA_DIR=data kordex run main.js --allow-env --allow-fs
```

Permissions:

```txt id="jscn19"
--allow-env  needed for kordex:env
--allow-fs   needed for kordex:fs
```

## Use with Softadastra storage

```js id="lwc0s1"
import { get } from "kordex:env";
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const nodeId = get("NODE_ID") || "local-node";
const dataDir = get("KORDEX_DATA_DIR") || ".kordex/data";
const walPath = join(dataDir, "app.wal");

softadastra.open("durable", nodeId, walPath);

softadastra.put("runtime", "kordex");
softadastra.put("node", nodeId);

console.log(softadastra.get("runtime"));
console.log(softadastra.get("node"));

softadastra.close();
```

Run:

```bash id="qdbnnu"
mkdir -p .kordex/data
NODE_ID=demo-node kordex run main.js --allow-env --allow-softadastra
```

## Local-first app settings

Environment variables are useful for runtime settings.

```js id="phpyi6"
import { get } from "kordex:env";

const settings = {
  app: get("APP_NAME") || "Kordex",
  mode: get("APP_MODE") || "local",
  sync: get("SYNC_ENABLED") || "false",
};

console.log(JSON.stringify(settings, null, 2));
```

Run:

```bash id="zvl3j0"
APP_NAME=Notes APP_MODE=offline SYNC_ENABLED=false kordex run main.js --allow-env
```

Output:

```json id="xorxzc"
{
  "app": "Notes",
  "mode": "offline",
  "sync": "false"
}
```

## Convert values

Environment variables are strings.

Convert values when needed.

```js id="dp1g1p"
import { get } from "kordex:env";

const port = Number(get("PORT") || "3000");
const debug = get("DEBUG") === "true";

console.log(port);
console.log(debug);
```

Run:

```bash id="ii4jbr"
PORT=8080 DEBUG=true kordex run main.js --allow-env
```

## Keep secrets out of source code

Do not hardcode secrets in JavaScript files.

Avoid:

```js id="q0xtpc"
const token = "secret-token";
```

Better:

```js id="d0chjg"
import { get } from "kordex:env";

const token = get("API_TOKEN");

if (!token) {
  throw new Error("API_TOKEN is required");
}
```

Run:

```bash id="f9ha86"
API_TOKEN=secret-token kordex run main.js --allow-env
```

## Required variables

```js id="yhur68"
import { get } from "kordex:env";

function requireEnv(name) {
  const value = get(name);

  if (!value) {
    throw new Error(name + " is required");
  }

  return value;
}

const apiUrl = requireEnv("API_URL");

console.log(apiUrl);
```

Run:

```bash id="vhhdnc"
API_URL=https://api.example.com kordex run main.js --allow-env
```

## Recommended usage

Use environment variables for values that change between machines:

```txt id="gs4j1b"
APP_NAME
APP_MODE
API_URL
DATA_DIR
NODE_ID
```

Use fallback values for optional configuration:

```js id="v7vwgz"
const mode = get("APP_MODE") || "development";
```

Use required checks for important values:

```js id="rkauiy"
if (!get("API_URL")) {
  throw new Error("API_URL is required");
}
```

Convert strings when needed:

```js id="zx40ta"
const port = Number(get("PORT") || "3000");
```

## Common errors

### Missing permission

Wrong:

```bash id="ryophd"
kordex run main.js
```

when the script uses:

```js id="b293fd"
import { get } from "kordex:env";
```

Correct:

```bash id="tu5m8r"
kordex run main.js --allow-env
```

### Wrong module name

Wrong:

```js id="m7rt51"
import { get } from "env";
```

Correct:

```js id="k8q8xy"
import { get } from "kordex:env";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="xj6c46"
import { getenv } from "kordex:env";
```

Correct:

```js id="qnr7e6"
import { get } from "kordex:env";
```

Available functions:

```txt id="sfh2vg"
get
has
set
unset
```

### Passing an empty variable name

Wrong:

```js id="bwvj6u"
get("");
```

Correct:

```js id="quzqhf"
get("APP_NAME");
```

The variable name cannot be empty.

### Expecting numbers directly

Wrong:

```js id="sjq5qg"
const port = get("PORT") + 1;
```

Correct:

```js id="b2h9x7"
const port = Number(get("PORT") || "3000") + 1;
```

Environment values are strings.

### Expecting `set()` to persist forever

```js id="se909o"
set("APP_MODE", "local");
```

This updates the current Kordex process.

It does not permanently update your terminal, operating system, or deployment settings.

### Giving too many permissions

Wrong:

```bash id="o4sm18"
kordex run main.js --allow-env --allow-fs --allow-process --allow-net
```

when the script only reads environment variables.

Better:

```bash id="t7yfh0"
kordex run main.js --allow-env
```

## Related pages

- [Environment module](../modules/env.md)
- [Permissions](../guide/permissions.md)
- [Running scripts](../guide/running-scripts.md)
- [HTTP helpers](./http-helpers.md)
- [Softadastra storage](./softadastra-storage.md)
