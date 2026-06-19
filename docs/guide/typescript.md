# TypeScript

Kordex can run TypeScript files directly.

TypeScript support is currently MVP-level. It is useful for simple scripts, typed local modules, and early project workflows.

## Run a TypeScript file

Create `main.ts`:

```ts id="lw6vap"
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run it:

```bash id="lrid50"
kordex run main.ts
```

Output:

```txt id="p7r0gm"
Hello from Kordex
```

With `npx`:

```bash id="tgholq"
npx kordex run main.ts
```

## Project entry

A Kordex project can use a TypeScript entry file.

Example `kordex.json`:

```json id="mm6f5s"
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.ts",
  "scripts": {
    "dev": "kordex run",
    "start": "kordex run",
    "build": "kordex build"
  }
}
```

Project structure:

```txt id="vaj801"
app/
├── package.json
├── kordex.json
└── src/
    └── main.ts
```

Run the project:

```bash id="yq7h54"
kordex run
```

## Import TypeScript files

Create `src/message.ts`:

```ts id="k0z6hw"
export function message(): string {
  return "Hello from TypeScript";
}
```

Create `src/main.ts`:

```ts id="d0f1e6"
import { message } from "./message.ts";

console.log(message());
```

Run it:

```bash id="ft6mvm"
kordex run src/main.ts
```

Output:

```txt id="cffu2s"
Hello from TypeScript
```

## Import without extension

Kordex can resolve local imports without the extension.

```ts id="a28b6e"
import { message } from "./message";

console.log(message());
```

This can resolve files such as:

```txt id="b05d5b"
message.ts
message.js
message.json
```

Use explicit extensions when you want clearer imports.

## JSON imports

TypeScript files can import JSON files.

Create `config.json`:

```json id="pn0yjj"
{
  "name": "Kordex",
  "mode": "local-first"
}
```

Create `main.ts`:

```ts id="hcvn6r"
import config from "./config.json";

console.log(config.name);
console.log(config.mode);
```

Run:

```bash id="ehme1d"
kordex run main.ts
```

Output:

```txt id="uw6cnv"
Kordex
local-first
```

## Use built-in modules

TypeScript can import Kordex built-in modules.

```ts id="t6igwp"
import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file: string = join("data", "hello.txt");

console.log(file);
console.log(hash("hello"));
```

Run:

```bash id="l4v1fo"
kordex run main.ts
```

## Use permission-gated modules

Sensitive modules still require explicit permissions.

Example with `kordex:fs`:

```ts id="qm75n9"
import { writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

const text: string = readText("hello.txt");

console.log(text);
```

Run with filesystem permission:

```bash id="c2xjb8"
kordex run main.ts --allow-fs
```

Without `--allow-fs`, filesystem access is rejected.

## Softadastra from TypeScript

`kordex:softadastra` can be used from TypeScript.

```ts id="a7qbrd"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "typescript-app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");
softadastra.put("language", "typescript");

console.log(softadastra.get("runtime"));
console.log(softadastra.get("language"));

softadastra.close();
```

Run:

```bash id="ljkmr0"
kordex run main.ts --allow-softadastra
```

## Check TypeScript

Use `kordex check` to inspect a TypeScript file.

```bash id="uh6mtl"
kordex check main.ts
```

With details:

```bash id="tmi4io"
kordex check main.ts --details
```

## Build TypeScript

Build a TypeScript file:

```bash id="a00152"
kordex build main.ts --out-dir dist --force
```

Build a project:

```bash id="ts69el"
kordex build . --project --out-dir dist --force
```

Example output:

```txt id="v3sjky"
dist/main.js
```

## Current TypeScript status

TypeScript support is early and practical.

Good use cases:

```txt id="g8mslu"
simple typed scripts
local TypeScript modules
JSON imports
kordex:* module imports
small local-first project entry files
```

Current limitations:

```txt id="kdih65"
full TypeScript compiler integration is not complete
advanced type checking is not the main focus yet
some unsupported syntax may be rejected or simplified
package import resolution is still early-stage
```

For now, keep TypeScript simple and focused.

## Recommended style

Prefer small files:

```txt id="w8qovw"
src/
├── main.ts
├── app.ts
├── storage.ts
└── config.ts
```

Use `main.ts` as the entry.

Use local modules for real logic.

Use permission-gated modules only where needed.

Example:

```ts id="dp1gt4"
// src/main.ts
import { start } from "./app.ts";

start();
```

```ts id="fo2vjx"
// src/app.ts
export function start(): void {
  console.log("Kordex app started");
}
```

## When to use JavaScript instead

Use JavaScript when you want the simplest path:

```js id="ubkqg8"
console.log("Hello from Kordex");
```

Use TypeScript when you want typed code:

```ts id="f6agkj"
const name: string = "Kordex";

console.log(name);
```

Both work with `kordex run`.

## Next steps

Continue with:

- [Running Scripts](./running-scripts.md)
- [Imports](./imports.md)
- [Permissions](./permissions.md)
- [Project Structure](./project-structure.md)
