# CLI

The Kordex CLI is the main command-line tool used to create projects, run scripts, check files, build output, manage packages, and start quick evaluations.

```bash
kordex <command> [options] [args]
```

## Commands

```txt
help     Show help
init     Create a new Kordex project
run      Run a JavaScript or TypeScript file
repl     Start an interactive Kordex session
check    Check a source file
build    Build a source file or project
install  Install project dependencies
update   Update project dependencies
version  Show Kordex version
```

## Quick examples

Create a project:

```bash
kordex init app
cd app
```

Run the project entry:

```bash
kordex run
```

Run one file:

```bash
kordex run main.js
```

Run TypeScript:

```bash
kordex run main.ts
```

Evaluate code:

```bash
kordex repl --eval "1 + 2"
```

Check a file:

```bash
kordex check main.js
```

Build a project:

```bash
kordex build . --project --out-dir dist --force
```

Show version:

```bash
kordex version --details
```

## Global options

```txt
-h, --help       Show help
-V, --version    Show version
-v, --verbose    Enable verbose output
--debug          Enable debug output
-q, --quiet      Disable normal output
--json           Render JSON output
--no-color       Disable colored output
--dry-run        Show what would happen without executing
```

## Runtime permissions

Kordex does not give scripts sensitive system access by default.

Use permission flags when a script needs native capabilities.

```txt
--allow-fs           Allow filesystem access
--allow-env          Allow environment variable access
--allow-net          Allow network-related access
--allow-process      Allow process access
--allow-softadastra  Allow Softadastra local-first storage access
```

Example:

```bash
kordex run main.js --allow-fs
```

Example with Softadastra:

```bash
kordex run main.js --allow-softadastra
```

## Project entry

Inside a project, `kordex run` resolves the entry from `kordex.json`.

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js"
}
```

Then:

```bash
kordex run
```

runs:

```bash
kordex run src/main.js
```

## JSON output

Use `--json` when another tool needs to read the result.

```bash
kordex version --json
```

Example output:

```json
{
  "product": "Kordex",
  "cli": "0.1.0",
  "runtime": "0.1.0",
  "bindings": "0.1.0",
  "std": "0.1.0"
}
```

## Command pages

- [init](./init.md)
- [run](./run.md)
- [repl](./repl.md)
- [check](./check.md)
- [build](./build.md)
- [install](./install.md)
- [update](./update.md)
- [version](./version.md)
