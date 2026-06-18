# Hello world

Create and run your first Kordex script.

This recipe shows the smallest possible Kordex program.

## Goal

Run a JavaScript file with Kordex.

## Create a file

Create `main.js`:

```bash
touch main.js
```

Add this code:

```js
console.log("Hello from Kordex");
```

## Run it

If Kordex is installed in the project:

```bash
npx kordex run main.js
```

If Kordex is installed globally:

```bash
kordex run main.js
```

## Output

```txt
Hello from Kordex
```

## Use `kordex:console`

Kordex also provides a native console module.

Create `main.js`:

```js
import { log } from "kordex:console";

log("Hello from Kordex");
```

Run:

```bash
kordex run main.js
```

Output:

```txt
[log] Hello from Kordex
```

`kordex:console` does not require a permission flag.

## Run from a project

A small project can look like this:

```txt
app/
├── kordex.json
└── src/
    └── main.js
```

Create the folders:

```bash
mkdir -p app/src
cd app
```

Create `kordex.json`:

```json
{
  "name": "hello-kordex",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

Create `src/main.js`:

```js
console.log("Hello from a Kordex project");
```

Run the project entry:

```bash
kordex run
```

Output:

```txt
Hello from a Kordex project
```

## Run TypeScript

Create `main.ts`:

```ts
const runtime: string = "Kordex";

console.log("Hello from " + runtime);
```

Run:

```bash
kordex run main.ts
```

Output:

```txt
Hello from Kordex
```

TypeScript support is currently MVP-level.

## Add a local import

Create `message.js`:

```js
export function message() {
  return "Local import works";
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
Local import works
```

## Check the file

Before running a script, you can check it:

```bash
kordex check main.js
```

Example output:

```txt
Check completed
file = main.js
type = javascript
ok = true
```

## Common errors

### File does not exist

Wrong:

```bash
kordex run app.js
```

when `app.js` does not exist.

Correct:

```bash
kordex run main.js
```

### Wrong import prefix

Wrong:

```js
import { log } from "console";
```

Correct:

```js
import { log } from "kordex:console";
```

Kordex standard modules use the `kordex:` prefix.

### Running an empty file

An empty script does not give you a useful result.

Add at least one statement:

```js
console.log("Hello from Kordex");
```

## Next steps

After this recipe, continue with:

- [Path utilities](./path-utilities.md)
- [Hashing](./hashing.md)
- [Read and write files](./read-write-files.md)
- [Softadastra storage](./softadastra-storage.md)
