# `kordex install`

Install project dependencies and update the Kordex lock file.

```bash
kordex install [package[@version]] [options]
```

## Basic usage

Install dependencies declared in the project:

```bash
kordex install
```

Install one package:

```bash
kordex install softadastra/plugin-example
```

Install a specific version:

```bash
kordex install softadastra/plugin-example@0.1.0
```

Use a custom registry:

```bash
kordex install softadastra/plugin-example@0.1.0 --registry https://registry.vixcpp.com
```

## Use with `npx`

```bash
npx kordex install
```

```bash
npx kordex install softadastra/plugin-example@0.1.0
```

## What it does

`kordex install` reads the project manifest, resolves dependencies, and writes a lock file.

The command works with:

```txt
kordex.json
kordex.lock
```

A project can declare dependencies in `kordex.json`.

Example:

```json
{
  "name": "app",
  "version": "0.1.0",
  "entry": "src/main.js",
  "dependencies": {
    "kordex/std": "0.1.0",
    "softadastra/plugin-example": "0.1.0"
  }
}
```

Then run:

```bash
kordex install
```

This creates or updates:

```txt
kordex.lock
```

## Install all dependencies

Inside a Kordex project:

```bash
kordex install
```

Example project:

```txt
app/
├── kordex.json
└── src/
    └── main.js
```

After install:

```txt
app/
├── kordex.json
├── kordex.lock
└── src/
    └── main.js
```

## Install one package

```bash
kordex install softadastra/plugin-example
```

This adds or resolves one package for the current project.

## Install a package version

Use `@version` to install a specific version.

```bash
kordex install softadastra/plugin-example@0.1.0
```

Recommended format:

```txt
package-name@version
```

Example:

```txt
softadastra/plugin-example@0.1.0
```

## Registry

Use `--registry` to choose a registry URL.

```bash
kordex install --registry https://registry.vixcpp.com
```

Or with one package:

```bash
kordex install softadastra/plugin-example@0.1.0 --registry https://registry.vixcpp.com
```

The registry URL must include a scheme.

Correct:

```txt
https://registry.vixcpp.com
```

Wrong:

```txt
registry.vixcpp.com
```

## Project directory

Use `--project` when you want to install dependencies for another project directory.

```bash
kordex install --project ./app
```

Install one package into another project:

```bash
kordex install softadastra/plugin-example@0.1.0 --project ./app
```

## Dry run

Use `--dry-run` to see what would happen without writing changes.

```bash
kordex install --dry-run
```

With one package:

```bash
kordex install softadastra/plugin-example@0.1.0 --dry-run
```

This is useful before changing `kordex.lock`.

## Force

Use `--force` when you want Kordex to overwrite or refresh generated install data.

```bash
kordex install --force
```

With a package:

```bash
kordex install softadastra/plugin-example@0.1.0 --force
```

Use this when the lock file needs to be regenerated.

## Lock file

`kordex.lock` records resolved dependencies.

Example shape:

```txt
kordex.lock
```

The lock file helps make installs repeatable.

Commit it with your project when you want other machines to use the same dependency resolution.

## Install workflow

Recommended project workflow:

```bash
kordex init app
cd app
kordex install
kordex run
```

With a package:

```bash
kordex install softadastra/plugin-example@0.1.0
kordex run
```

With a custom registry:

```bash
kordex install --registry https://registry.vixcpp.com
```

## Plugin packages

Kordex can use project plugin commands declared in `kordex.json`.

Example:

```json
{
  "plugins": {
    "commands": [
      {
        "name": "hello",
        "summary": "Run hello plugin",
        "run": "scripts/hello.ts",
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

After install, plugin commands can be available from the project.

```bash
kordex hello
```

or:

```bash
kordex hi
```

Plugin commands cannot override built-in commands.

## Current package status

Kordex package management is early-stage.

The install command is used for:

```txt
reading project dependencies
resolving package metadata
writing kordex.lock
supporting plugin workflows
preparing package-managed projects
```

Full package import resolution is still part of the roadmap.

For application code today, prefer:

```txt
local imports
JSON imports
kordex:* built-in modules
project plugin commands
```

## Common commands

```bash
kordex install
```

```bash
kordex install softadastra/plugin-example
```

```bash
kordex install softadastra/plugin-example@0.1.0
```

```bash
kordex install --registry https://registry.vixcpp.com
```

```bash
kordex install --project ./app
```

```bash
kordex install --dry-run
```

```bash
kordex install --force
```

## Common errors

### Missing project manifest

If this fails:

```bash
kordex install
```

make sure the project has a manifest:

```txt
kordex.json
```

Create a project first:

```bash
kordex init app
cd app
kordex install
```

### Invalid registry URL

Wrong:

```bash
kordex install --registry registry.vixcpp.com
```

Correct:

```bash
kordex install --registry https://registry.vixcpp.com
```

### Wrong project directory

Wrong:

```bash
kordex install --project ./missing-app
```

Fix:

```bash
ls
kordex install --project ./app
```

### Wrong package format

Prefer:

```bash
kordex install softadastra/plugin-example@0.1.0
```

Avoid empty package names or incomplete package strings.

## Related pages

- [`kordex update`](./update.md)
- [`kordex init`](./init.md)
- [`kordex run`](./run.md)
- [Project structure](../guide/project-structure.md)
- [Package JSON reference](../reference/package-json.md)
- [Kordex JSON reference](../reference/kordex-json.md)
