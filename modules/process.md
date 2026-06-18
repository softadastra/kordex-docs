# `kordex:process`

Process module for Kordex scripts.

Use it to read the current working directory, change directory, or run a shell command.

```js id="s1x8d4"
import { cwd, run } from "kordex:process";

console.log(cwd());

const code = run("echo Hello from Kordex");

console.log("exit code:", code);
```

Run with process permission:

```bash id="x2mp7a"
kordex run main.js --allow-process
```

## Import

```js id="h9r4sc"
import { cwd } from "kordex:process";
```

Or import everything:

```js id="p7f3le"
import * as process from "kordex:process";

console.log(process.cwd());

process.run("echo ready");
```

## Permission

`kordex:process` requires process permission.

```bash id="lnz42q"
--allow-process
```

Correct:

```bash id="aq7k9m"
kordex run main.js --allow-process
```

Without permission, scripts should not access `kordex:process`.

Process access is sensitive because it can change the current working directory and execute shell commands.

## Functions

```txt id="gj9ops"
cwd()
chdir(path)
run(command)
```

## `cwd`

Return the current working directory.

```js id="k2zv0c"
import { cwd } from "kordex:process";

console.log(cwd());
```

Run:

```bash id="y1a7bm"
kordex run main.js --allow-process
```

Example output:

```txt id="q8u1wf"
/home/user/app
```

## `chdir`

Change the current working directory.

```js id="z8ms2e"
import { cwd, chdir } from "kordex:process";

console.log("before:", cwd());

chdir("src");

console.log("after:", cwd());
```

Run:

```bash id="xma2ls"
kordex run main.js --allow-process
```

`chdir()` affects the current Kordex process.

After calling `chdir()`, relative paths are resolved from the new directory.

## `run`

Run a shell command and return its exit code.

```js id="uz7wf8"
import { run } from "kordex:process";

const code = run("echo Hello from Kordex");

console.log("exit code:", code);
```

Run:

```bash id="gch6x2"
kordex run main.js --allow-process
```

Example output:

```txt id="w83e92"
Hello from Kordex
exit code: 0
```

A successful command usually returns `0`.

A failed command usually returns a non-zero value.

## Check command result

```js id="y1xqog"
import { run } from "kordex:process";

const code = run("ls README.md");

if (code === 0) {
  console.log("README exists");
} else {
  console.log("README not found");
}
```

Run:

```bash id="zhuzc7"
kordex run main.js --allow-process
```

## Use with `kordex:console`

```js id="c54tjr"
import { log, error } from "kordex:console";
import { run } from "kordex:process";

const code = run("echo building");

if (code === 0) {
  log("command succeeded");
} else {
  error("command failed:", code);
}
```

Run:

```bash id="j1d6by"
kordex run main.js --allow-process
```

## Use with `kordex:path`

```js id="m0hfi2"
import { cwd } from "kordex:process";
import { join } from "kordex:path";

const configFile = join(cwd(), "kordex.json");

console.log(configFile);
```

Run:

```bash id="j5nv8m"
kordex run main.js --allow-process
```

`kordex:path` does not require permission.

`kordex:process` requires `--allow-process`.

## Use with filesystem

```js id="dl9axc"
import { cwd } from "kordex:process";
import { join } from "kordex:path";
import { exists } from "kordex:fs";

const file = join(cwd(), "README.md");

console.log(exists(file));
```

Run:

```bash id="axw9ou"
kordex run main.js --allow-process --allow-fs
```

Permissions:

```txt id="evw1xi"
--allow-process  needed for kordex:process
--allow-fs       needed for kordex:fs
```

## Change directory before reading a file

```js id="t5lqpd"
import { chdir, cwd } from "kordex:process";
import { readText } from "kordex:fs";

chdir("docs");

console.log("cwd:", cwd());
console.log(readText("index.md"));
```

Run:

```bash id="qypr3i"
kordex run main.js --allow-process --allow-fs
```

After `chdir("docs")`, `readText("index.md")` reads from:

```txt id="lhnw73"
docs/index.md
```

## Run a project command

```js id="ol9bqd"
import { run } from "kordex:process";

const code = run("npm test");

console.log("test exit code:", code);
```

Run:

```bash id="z2uj96"
kordex run main.js --allow-process
```

Use this only when the script is trusted.

## Run a build command

```js id="c2zzgi"
import { run } from "kordex:process";

const code = run("npm run build");

if (code !== 0) {
  console.log("build failed");
}
```

Run:

```bash id="se7xmm"
kordex run main.js --allow-process
```

## Current process only

`chdir()` changes the working directory for the current Kordex process.

It does not permanently change your terminal directory after Kordex exits.

Example:

```js id="m7evkw"
import { cwd, chdir } from "kordex:process";

console.log(cwd());

chdir("src");

console.log(cwd());
```

Run:

```bash id="ffjxbx"
kordex run main.js --allow-process
```

When the command finishes, your shell stays where it was before.

## Be careful with shell commands

`run()` executes a shell command.

Avoid passing untrusted user input directly into `run()`.

Wrong:

```js id="mm88yx"
import { run } from "kordex:process";

const filename = userInput;

run("cat " + filename);
```

Better:

```js id="j64a5e"
import { run } from "kordex:process";

const allowed = "README.md";

run("cat " + allowed);
```

For scripts that handle user input, prefer safer APIs when possible.

Use `kordex:fs` for file reads and writes instead of shell commands.

## Prefer `kordex:fs` for files

Instead of:

```js id="p1mkpa"
import { run } from "kordex:process";

run("cat README.md");
```

Prefer:

```js id="dzgafe"
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run:

```bash id="mpv6pc"
kordex run main.js --allow-fs
```

Use `kordex:process` when you really need to execute a command.

## Permission model

`kordex:process` is disabled unless the script is run with:

```bash id="l9xb6q"
--allow-process
```

Good:

```bash id="a8qil6"
kordex run main.js --allow-process
```

Avoid giving permissions that the script does not need.

Wrong:

```bash id="y9xxzm"
kordex run main.js --allow-process --allow-env --allow-fs --allow-net
```

when the script only needs to run one command.

Better:

```bash id="e1t9dc"
kordex run main.js --allow-process
```

## Recommended usage

Use `cwd()` to inspect the current project directory:

```js id="p8lfwr"
console.log(cwd());
```

Use `chdir()` when the script must run from another folder:

```js id="qlpyfh"
chdir("src");
```

Use `run()` for trusted project commands:

```js id="b4vuj1"
const code = run("npm test");
```

Check the exit code:

```js id="t3j1hz"
if (code !== 0) {
  console.log("command failed");
}
```

## Common usage

```js id="nsvm6v"
import { cwd, chdir, run } from "kordex:process";

console.log("root:", cwd());

const code = run("echo Kordex process module");

console.log("exit code:", code);
```

Run:

```bash id="cdqog2"
kordex run main.js --allow-process
```

## Common errors

### Missing permission

Wrong:

```bash id="q8to96"
kordex run main.js
```

when the script uses:

```js id="y2fq2p"
import { run } from "kordex:process";
```

Correct:

```bash id="r2hs1a"
kordex run main.js --allow-process
```

### Wrong module name

Wrong:

```js id="pun32w"
import { cwd } from "process";
```

Correct:

```js id="kityiq"
import { cwd } from "kordex:process";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="emmniq"
import { exec } from "kordex:process";
```

Correct:

```js id="tejzx2"
import { run } from "kordex:process";
```

Available functions:

```txt id="md2lwq"
cwd
chdir
run
```

### Passing a non-string command

Wrong:

```js id="gd5lzs"
run(123);
```

Correct:

```js id="dk4cx0"
run("echo hello");
```

`run()` expects a string command.

### Passing an empty command

Wrong:

```js id="e45mya"
run("");
```

Correct:

```js id="qtwd9i"
run("echo hello");
```

The command cannot be empty.

### Passing a non-string path to `chdir`

Wrong:

```js id="kdn88n"
chdir(123);
```

Correct:

```js id="g6talm"
chdir("src");
```

`chdir()` expects a string path.

### Assuming `run()` returns command output

Wrong:

```js id="puw5xq"
const output = run("echo hello");

console.log(output);
```

`run()` returns the exit code.

It does not return the command output as a string.

Correct:

```js id="aj784o"
const code = run("echo hello");

console.log("exit code:", code);
```

### Using process when filesystem is enough

Avoid:

```js id="limgf7"
run("cat README.md");
```

Prefer:

```js id="f9k4sq"
import { readText } from "kordex:fs";

console.log(readText("README.md"));
```

Run with:

```bash id="b8lr5g"
kordex run main.js --allow-fs
```

## Related pages

- [Modules](./index.md)
- [Filesystem module](./fs.md)
- [Environment module](./env.md)
- [Path module](./path.md)
- [Permissions](../guide/permissions.md)
- [Running scripts](../guide/running-scripts.md)
