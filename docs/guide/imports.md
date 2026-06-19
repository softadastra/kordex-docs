# Imports

Kordex supports JavaScript and TypeScript imports for local files, JSON files, and built-in `kordex:` modules.

Imports are used to split code into small files and to access native Kordex capabilities.

## Local imports

Create `message.js`:

```js
export function message() {
  return "Hello from a local module";
}
```

Create `main.js`:

```js
import { message } from "./message.js";

console.log(message());
```

Run:

```bash
kordex run main.js
```

Output:

```txt
Hello from a local module
```

## Import without extension

Kordex can resolve local imports without the file extension.

```js
import { message } from "./message";

console.log(message());
```

This can resolve files such as:

```txt
message.js
message.ts
message.json
```

Use explicit extensions when you want the import to be clear.

Use extensionless imports when you want cleaner local paths.

## Directory imports

Kordex can resolve a directory through its index file.

Example structure:

```txt
src/
├── main.js
└── lib/
    └── index.js
```

`src/lib/index.js`:

```js
export const runtime = "Kordex";
```

`src/main.js`:

```js
import { runtime } from "./lib";

console.log(runtime);
```

Run:

```bash
kordex run src/main.js
```

Output:

```txt
Kordex
```

## JSON imports

Kordex supports JSON imports.

Create `user.json`:

```json
{
  "name": "Kordex",
  "type": "runtime"
}
```

Create `main.js`:

```js
import user from "./user.json";

console.log(user.name);
console.log(user.type);
```

Run:

```bash
kordex run main.js
```

Output:

```txt
Kordex
runtime
```

JSON imports are useful for local configuration, small datasets, manifests, and test fixtures.

## TypeScript imports

TypeScript files can import other TypeScript files.

Create `message.ts`:

```ts
export function message(): string {
  return "Hello from TypeScript";
}
```

Create `main.ts`:

```ts
import { message } from "./message.ts";

console.log(message());
```

Run:

```bash
kordex run main.ts
```

Output:

```txt
Hello from TypeScript
```

TypeScript support is currently MVP-level.

## Built-in modules

Kordex exposes native modules with the `kordex:` prefix.

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";
```

The `kordex:` prefix means the module is provided by Kordex, not by your local project.

Available built-in modules include:

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

## Safe built-in modules

Some modules are safe utility modules and can be used without permission flags.

```txt
kordex:console
kordex:path
kordex:timer
kordex:crypto
```

Example:

```js
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file = join("data", "hello.txt");

console.log(file);
console.log(hash("hello"));
```

Run:

```bash
kordex run main.js
```

## Permission-gated modules

Sensitive modules require explicit permission flags.

| Module               | Permission            |
| -------------------- | --------------------- |
| `kordex:fs`          | `--allow-fs`          |
| `kordex:env`         | `--allow-env`         |
| `kordex:http`        | `--allow-net`         |
| `kordex:process`     | `--allow-process`     |
| `kordex:softadastra` | `--allow-softadastra` |

## Filesystem imports

Use `kordex:fs` when a script needs file access.

```js
import { exists, readText, writeText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

console.log(exists("hello.txt"));
console.log(readText("hello.txt"));
```

Run with filesystem permission:

```bash
kordex run main.js --allow-fs
```

Without `--allow-fs`, Kordex rejects filesystem access.

## Environment imports

Use `kordex:env` when a script needs environment variables.

```js
import { get, has } from "kordex:env";

console.log(has("HOME"));
console.log(get("HOME"));
```

Run with environment permission:

```bash
kordex run main.js --allow-env
```

## Process imports

Use `kordex:process` when a script needs process-level access.

```js
import { cwd } from "kordex:process";

console.log(cwd());
```

Run with process permission:

```bash
kordex run main.js --allow-process
```

Process access can also include operations such as changing directory or running shell commands.

Use it carefully.

## HTTP imports

Use `kordex:http` for HTTP utility helpers.

```js
import { isSuccess, isClientError, statusText, buildUrl } from "kordex:http";

console.log(isSuccess(200));
console.log(isClientError(404));
console.log(statusText(404));
console.log(buildUrl("https://example.com", "/api"));
```

Run with network permission:

```bash
kordex run main.js --allow-net
```

The current HTTP module provides utility helpers.

Real network APIs can be added behind the same permission model later.

## Softadastra imports

Use `kordex:softadastra` when a script needs local-first storage.

```js
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run with Softadastra permission:

```bash
kordex run main.js --allow-softadastra
```

## Namespace imports

Some modules are convenient to import as a namespace.

```js
import * as path from "kordex:path";
import * as crypto from "kordex:crypto";

console.log(path.join("data", "file.txt"));
console.log(crypto.hash("kordex"));
```

This style is useful when you use many functions from the same module.

## Named imports

Use named imports when you only need a few functions.

```js
import { join } from "kordex:path";
import { readText } from "kordex:fs";

const file = join("data", "hello.txt");

console.log(readText(file));
```

Run:

```bash
kordex run main.js --allow-fs
```

## Relative imports vs built-in imports

Use relative imports for your own project code:

```js
import { start } from "./app.js";
```

Use `kordex:` imports for Kordex native modules:

```js
import { join } from "kordex:path";
```

Do not use `kordex:` for local files.

Do not use relative paths for Kordex built-ins.

## Package imports

Kordex package resolution is early-stage.

For now, prefer:

```txt
local imports
JSON imports
kordex:* built-in modules
```

Package installation and update commands exist, but full package import resolution is still part of the roadmap.

## Common errors

### Missing relative prefix

Wrong:

```js
import { message } from "message.js";
```

Correct:

```js
import { message } from "./message.js";
```

Use `./` or `../` for local files.

### Missing permission

This script needs filesystem permission:

```js
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run it with:

```bash
kordex run main.js --allow-fs
```

### Wrong module prefix

Wrong:

```js
import { join } from "path";
```

Correct:

```js
import { join } from "kordex:path";
```

Kordex built-in modules use the `kordex:` prefix.

## Next steps

Continue with:

- [Running Scripts](./running-scripts.md)
- [Permissions](./permissions.md)
- [TypeScript](./typescript.md)
- [Built-in Modules](../modules/index.md)
