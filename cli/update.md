# `kordex update`

Update project dependencies and refresh `kordex.lock`.

```bash
kordex update [package] [options]
```

## Basic usage

Update all project dependencies:

```bash
kordex update
```

Update one package:

```bash
kordex update softadastra/plugin-example
```

Use a custom registry:

```bash
kordex update --registry https://registry.vixcpp.com
```

Update one package from a custom registry:

```bash
kordex update softadastra/plugin-example --registry https://registry.vixcpp.com
```

## Use with `npx`

```bash
npx kordex update
```

```bash
npx kordex update softadastra/plugin-example
```

## What it does

`kordex update` refreshes dependency versions for a Kordex project.

It reads the project manifest, resolves the latest available versions, and updates the lock file.

The command works with:

```txt
kordex.json
kordex.lock
```

Example project:

```txt
app/
├── kordex.json
├── kordex.lock
└── src/
    └── main.js
```

Run:

```bash
kordex update
```

This refreshes:

```txt
kordex.lock
```

## Update all dependencies

Inside a Kordex project:

```bash
kordex update
```

Example `kordex.json`:

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

Run:

```bash
kordex update
```

Kordex resolves newer dependency versions and rewrites the lock file.

## Update one package

```bash
kordex update softadastra/plugin-example
```

This updates only the selected package.

## Registry

Use `--registry` to choose a registry URL.

```bash
kordex update --registry https://registry.vixcpp.com
```

With one package:

```bash
kordex update softadastra/plugin-example --registry https://registry.vixcpp.com
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

Use `--project` to update another project directory.

```bash
kordex update --project ./app
```

Update one package in another project:

```bash
kordex update softadastra/plugin-example --project ./app
```

## Dry run

Use `--dry-run` to see what would happen without writing changes.

```bash
kordex update --dry-run
```

With one package:

```bash
kordex update softadastra/plugin-example --dry-run
```

Use this before changing the lock file.

## Force

Use `--force` when you want Kordex to refresh generated update data.

```bash
kordex update --force
```

Short form:

```bash
kordex update -f
```

With one package:

```bash
kordex update softadastra/plugin-example --force
```

## Lock file

`kordex.lock` records the resolved dependency versions.

After an update, the lock file is refreshed so the project can keep repeatable dependency resolution.

Recommended:

```bash
kordex update
kordex run
```

Commit `kordex.lock` when the updated versions should be shared with the project.

## Install vs update

Use `install` when setting up dependencies.

```bash
kordex install
```

Use `update` when refreshing dependency versions.

```bash
kordex update
```

Use `install package@version` when you want a specific version.

```bash
kordex install softadastra/plugin-example@0.1.0
```

Use `update package` when you want the latest resolved version.

```bash
kordex update softadastra/plugin-example
```

## Recommended workflow

Create a project:

```bash
kordex init app
cd app
```

Install dependencies:

```bash
kordex install
```

Run the project:

```bash
kordex run
```

Later, update dependencies:

```bash
kordex update
```

Run again:

```bash
kordex run
```

## With custom registry

```bash
kordex update --registry https://registry.vixcpp.com
```

For another project:

```bash
kordex update --project ./app --registry https://registry.vixcpp.com
```

With dry run:

```bash
kordex update --registry https://registry.vixcpp.com --dry-run
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

After dependencies are updated, plugin command metadata can be refreshed through the project lock workflow.

Run the plugin command:

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

The update command is used for:

```txt
refreshing dependency versions
rewriting kordex.lock
updating one package
updating all project packages
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
kordex update
```

```bash
kordex update softadastra/plugin-example
```

```bash
kordex update --registry https://registry.vixcpp.com
```

```bash
kordex update --project ./app
```

```bash
kordex update --dry-run
```

```bash
kordex update --force
```

```bash
kordex update -f
```

## Common errors

### Missing project manifest

If this fails:

```bash
kordex update
```

make sure the project has:

```txt
kordex.json
```

Create a project first:

```bash
kordex init app
cd app
kordex update
```

### Invalid registry URL

Wrong:

```bash
kordex update --registry registry.vixcpp.com
```

Correct:

```bash
kordex update --registry https://registry.vixcpp.com
```

### Wrong project directory

Wrong:

```bash
kordex update --project ./missing-app
```

Fix:

```bash
ls
kordex update --project ./app
```

### Unknown option

Wrong:

```bash
kordex update --latest
```

Correct:

```bash
kordex update
```

or:

```bash
kordex update softadastra/plugin-example
```

### Use install for a fixed version

Wrong:

```bash
kordex update softadastra/plugin-example@0.1.0
```

Better:

```bash
kordex install softadastra/plugin-example@0.1.0
```

Use `update` to resolve the latest version.

Use `install` to request a fixed version.

## Related pages

- [`kordex install`](./install.md)
- [`kordex init`](./init.md)
- [`kordex run`](./run.md)
- [Project structure](../guide/project-structure.md)
- [Kordex JSON reference](../reference/kordex-json.md)
- [Package JSON reference](../reference/package-json.md)
