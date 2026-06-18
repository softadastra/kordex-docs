# `kordex version`

Show the installed Kordex version.

```bash id="ftxz2j"
kordex version
```

## Basic usage

```bash id="e31h1p"
kordex version
```

Example output:

```txt id="v8ro5m"
Kordex 0.1.0
```

## Short aliases

You can also use:

```bash id="lb3h0a"
kordex v
```

or the global version flag:

```bash id="qs8i4z"
kordex --version
```

Short global flag:

```bash id="h92dgo"
kordex -V
```

## Use with `npx`

```bash id="p1z9ou"
npx kordex version
```

```bash id="k98zvn"
npx kordex --version
```

## Detailed version

Use `--details` to show all Kordex component versions.

```bash id="e18uat"
kordex version --details
```

Example output:

```txt id="exlhrd"
Kordex
cli      = 0.1.0
runtime  = 0.1.0
bindings = 0.1.0
std      = 0.1.0
```

You can also use `--full`:

```bash id="g55ltq"
kordex version --full
```

## JSON output

Use `--json` when another tool needs to read the version information.

```bash id="a5zgwe"
kordex version --json
```

Example output:

```json id="u1emjk"
{
  "product": "Kordex",
  "cli": "0.1.0",
  "runtime": "0.1.0",
  "bindings": "0.1.0",
  "std": "0.1.0"
}
```

## Detailed JSON output

```bash id="xkr7w0"
kordex version --details --json
```

The JSON output includes the same component fields:

```txt id="f7syeg"
product
cli
runtime
bindings
std
```

## What the fields mean

```txt id="tbbqb3"
cli       Kordex command-line interface
runtime   Kordex runtime layer
bindings  JavaScript engine bindings layer
std       Kordex standard modules
```

## Check installed package

When using the npm package:

```bash id="ypwvjk"
npm install kordex
```

Check the installed CLI:

```bash id="hhtmza"
npx kordex version
```

or:

```bash id="gmkr99"
npx kordex version --details
```

## Check after installation

After installing Kordex, run:

```bash id="hepy8g"
kordex version
```

If using `npx`:

```bash id="ustynf"
npx kordex version
```

Expected output:

```txt id="l0acc7"
Kordex 0.1.0
```

## Check before running a project

Inside a project:

```bash id="mwvixw"
kordex version --details
kordex run
```

This confirms the installed CLI and runtime component versions before running the project.

## Check in scripts

Use JSON output for scripts:

```bash id="eo1fqd"
kordex version --json
```

Example shell usage:

```bash id="ongczl"
kordex version --json > kordex-version.json
```

## Common commands

```bash id="egsz2w"
kordex version
```

```bash id="lc16tz"
kordex v
```

```bash id="bedbk1"
kordex --version
```

```bash id="j6b7mm"
kordex -V
```

```bash id="wk3m6t"
kordex version --details
```

```bash id="piz750"
kordex version --full
```

```bash id="tg5j9h"
kordex version --json
```

```bash id="vqmn8i"
kordex version --details --json
```

## Common errors

### Unknown option

Wrong:

```bash id="nt81wo"
kordex version --long
```

Correct:

```bash id="d374rf"
kordex version --details
```

or:

```bash id="j26lhq"
kordex version --full
```

### Unexpected argument

Wrong:

```bash id="mupm9f"
kordex version app
```

Correct:

```bash id="aeyvu4"
kordex version
```

### Kordex command not found

If this fails:

```bash id="ixy1qt"
kordex version
```

try:

```bash id="s6k9nn"
npx kordex version
```

or install Kordex first.

```bash id="hsoxtp"
npm install kordex
```

## Related pages

- [Installation](../guide/installation.md)
- [`kordex init`](./init.md)
- [`kordex run`](./run.md)
- [CLI overview](./index.md)
