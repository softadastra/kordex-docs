# Installation

Kordex can be used with `npx`, installed locally in a project, or installed globally as a CLI.

## Requirements

Kordex requires:

```txt
Node.js
npm
Linux x64
```

The current npm distribution includes the Kordex CLI wrapper and the Linux x64 native binary package.

## Use with npx

The fastest way to try Kordex is with `npx`:

```bash
npx kordex --version
```

Run a JavaScript file:

```bash
npx kordex run main.js
```

Run a TypeScript file:

```bash
npx kordex run main.ts
```

This is useful when you want to test Kordex without installing it globally.

## Install in a project

Install Kordex as a project dependency:

```bash
npm install kordex
```

Then run it with `npx`:

```bash
npx kordex --version
```

Example:

```bash
npx kordex run src/main.js
```

This is recommended for projects because the Kordex version stays attached to the project.

## Install globally

Install the Kordex command globally:

```bash
npm install -g kordex
```

Then check the installed version:

```bash
kordex --version
```

Run a file:

```bash
kordex run main.js
```

Create a project:

```bash
kordex init app
```

## Package structure

The npm distribution is split into two packages:

```txt
kordex
@softadastra/kordex-linux-x64
```

`kordex` is the user-facing CLI wrapper.

`@softadastra/kordex-linux-x64` contains the Linux x64 native binary.

When you install `kordex`, the wrapper resolves the native binary package for the supported platform.

## Check the installation

Run:

```bash
kordex --version
```

Expected output:

```txt
Kordex 0.1.0
```

For detailed version information:

```bash
kordex version --details
```

Example output:

```txt
Kordex
cli      = 0.1.0
runtime  = 0.1.0
bindings = 0.1.0
std      = 0.1.0
```

## Create a test file

Create `main.js`:

```js
console.log("Hello from Kordex");
```

Run it:

```bash
kordex run main.js
```

Output:

```txt
Hello from Kordex
```

## Run with npx after local install

If Kordex is installed only in the project, use:

```bash
npx kordex run main.js
```

If Kordex is installed globally, use:

```bash
kordex run main.js
```

Both commands run the same Kordex CLI.

## Common issues

### `kordex: command not found`

If you installed Kordex globally and the command is not found, your npm global binary path may not be in `PATH`.

Check the npm global bin path:

```bash
npm bin -g
```

Then make sure that directory is available in your shell `PATH`.

You can still use Kordex with:

```bash
npx kordex --version
```

### Unsupported platform

The current native package is Linux x64.

If your platform is not supported yet, installation may fail or the binary may not be available.

### Permission denied

If a script imports sensitive modules, run it with the required permission flag.

Example:

```bash
kordex run main.js --allow-fs
```

For Softadastra storage:

```bash
kordex run main.js --allow-softadastra
```

## Next steps

Continue with:

- [Getting Started](./getting-started.md)
- [Project Structure](./project-structure.md)
- [Running Scripts](./running-scripts.md)
- [Permissions](./permissions.md)
