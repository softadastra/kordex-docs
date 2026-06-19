# `kordex:fs`

Filesystem module for Kordex scripts.

Use it to check files, read text files, write text files, and remove files or empty directories.

```js id="m7zqwa"
import { exists, writeText, readText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");

if (exists("hello.txt")) {
  console.log(readText("hello.txt"));
}
```

Run with filesystem permission:

```bash id="r9kb3v"
kordex run main.js --allow-fs
```

## Import

```js id="w8zl2t"
import { readText } from "kordex:fs";
```

Or import everything:

```js id="h4c9py"
import * as fs from "kordex:fs";

fs.writeText("hello.txt", "Hello");
console.log(fs.readText("hello.txt"));
```

## Permission

`kordex:fs` requires filesystem permission.

```bash id="o3eb6n"
--allow-fs
```

Correct:

```bash id="s89j2a"
kordex run main.js --allow-fs
```

Without permission, scripts should not access `kordex:fs`.

Filesystem access is sensitive because it can read, write, or remove local files.

## Functions

```txt id="qa4uq9"
exists(path)
isFile(path)
isDirectory(path)
readText(path)
writeText(path, content)
remove(path)
```

## `exists`

Return `true` if a path exists.

```js id="vd0j9v"
import { exists } from "kordex:fs";

console.log(exists("README.md"));
console.log(exists("missing.txt"));
```

Run:

```bash id="dt9c64"
kordex run main.js --allow-fs
```

Example output:

```txt id="hckk0w"
true
false
```

## `isFile`

Return `true` if a path is a regular file.

```js id="gt84mj"
import { isFile } from "kordex:fs";

console.log(isFile("README.md"));
console.log(isFile("src"));
```

Run:

```bash id="qk5zhy"
kordex run main.js --allow-fs
```

## `isDirectory`

Return `true` if a path is a directory.

```js id="t6n10c"
import { isDirectory } from "kordex:fs";

console.log(isDirectory("src"));
console.log(isDirectory("README.md"));
```

Run:

```bash id="hx85ul"
kordex run main.js --allow-fs
```

## `readText`

Read a text file.

```js id="o4prma"
import { readText } from "kordex:fs";

const text = readText("README.md");

console.log(text);
```

Run:

```bash id="cld2iy"
kordex run main.js --allow-fs
```

Use `readText` for normal text files:

```txt id="tx0fx8"
.txt
.md
.json
.js
.ts
```

## `writeText`

Write text to a file.

```js id="iad1sf"
import { writeText } from "kordex:fs";

writeText("message.txt", "Hello from Kordex");
```

Run:

```bash id="ke543g"
kordex run main.js --allow-fs
```

Then read it:

```js id="v78xra"
import { writeText, readText } from "kordex:fs";

writeText("message.txt", "Hello from Kordex");

console.log(readText("message.txt"));
```

Output:

```txt id="m7zcqm"
Hello from Kordex
```

## `remove`

Remove a file or an empty directory.

```js id="p80env"
import { writeText, exists, remove } from "kordex:fs";

writeText("temp.txt", "temporary file");

console.log(exists("temp.txt"));

remove("temp.txt");

console.log(exists("temp.txt"));
```

Run:

```bash id="xmigq0"
kordex run main.js --allow-fs
```

Example output:

```txt id="smf6cy"
true
false
```

## Use with `kordex:path`

Use `kordex:path` to build paths safely.

```js id="y9nl0d"
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";

const file = join("data", "message.txt");

writeText(file, "Hello from Kordex");

console.log(readText(file));
```

Run:

```bash id="e57qku"
kordex run main.js --allow-fs
```

`kordex:path` does not require permission.

`kordex:fs` requires `--allow-fs`.

## Create a small local file

```js id="e9v5fd"
import { writeText, readText, exists } from "kordex:fs";

const file = "note.txt";

if (!exists(file)) {
  writeText(file, "First note");
}

console.log(readText(file));
```

Run:

```bash id="j61knv"
kordex run main.js --allow-fs
```

## Read JSON from a file

For static JSON files, prefer JSON imports:

```js id="j7eq9z"
import user from "./user.json";

console.log(user.name);
```

Use `readText` when the file path is dynamic or created at runtime.

```js id="o36h6u"
import { readText } from "kordex:fs";

const text = readText("user.json");
const user = JSON.parse(text);

console.log(user.name);
```

Run:

```bash id="f2v4g6"
kordex run main.js --allow-fs
```

## Write JSON to a file

```js id="l9x5kn"
import { writeText, readText } from "kordex:fs";

const user = {
  name: "Kordex",
  type: "runtime",
};

writeText("user.json", JSON.stringify(user, null, 2));

console.log(readText("user.json"));
```

Run:

```bash id="j9v5ot"
kordex run main.js --allow-fs
```

## Use with `kordex:crypto`

Create a hash of file content.

```js id="xqrcrw"
import { readText } from "kordex:fs";
import { hash } from "kordex:crypto";

const text = readText("README.md");

console.log(hash(text));
```

Run:

```bash id="vbzkdd"
kordex run main.js --allow-fs
```

The permission is required because of `kordex:fs`.

`kordex:crypto` does not require permission.

## Use with local-first data

For simple files, use `kordex:fs`.

For durable local-first storage, use `kordex:softadastra`.

Example with file storage:

```js id="dyfyua"
import { writeText, readText } from "kordex:fs";

writeText(".kordex-note.txt", "offline note");

console.log(readText(".kordex-note.txt"));
```

Run:

```bash id="i2u9ns"
kordex run main.js --allow-fs
```

Example with Softadastra storage:

```js id="dg7n76"
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "fs-demo", ".kordex/data/fs-demo.wal");

softadastra.put("note", "offline note");

console.log(softadastra.get("note"));

softadastra.close();
```

Run:

```bash id="f97xck"
kordex run main.js --allow-softadastra
```

## Project example

```txt id="xx3v4t"
app/
├── kordex.json
└── src/
    └── main.js
```

`src/main.js`:

```js id="zuskrh"
import { join } from "kordex:path";
import { writeText, readText, exists } from "kordex:fs";

const file = join("data", "hello.txt");

writeText(file, "Hello from local file");

if (exists(file)) {
  console.log(readText(file));
}
```

Run:

```bash id="yue98b"
kordex run src/main.js --allow-fs
```

## Recommended usage

Use `exists()` before reading optional files:

```js id="qvt06m"
if (exists("config.json")) {
  console.log(readText("config.json"));
}
```

Use `isFile()` before reading a path that may be a directory:

```js id="ivrxdc"
if (isFile("README.md")) {
  console.log(readText("README.md"));
}
```

Use `isDirectory()` before working with directories:

```js id="trbghv"
if (isDirectory("src")) {
  console.log("src exists");
}
```

Use `writeText()` for generated text files:

```js id="uw8tx7"
writeText("output.txt", "generated by Kordex");
```

Use `remove()` carefully:

```js id="kje7p8"
remove("temp.txt");
```

## Permission model

`kordex:fs` is disabled unless the script is run with:

```bash id="ufq8lq"
--allow-fs
```

This makes filesystem access visible at the command line.

Good:

```bash id="im70uk"
kordex run main.js --allow-fs
```

Avoid giving permissions that the script does not need.

Wrong:

```bash id="w20zeu"
kordex run main.js --allow-fs --allow-env --allow-process
```

when the script only reads one local file.

Better:

```bash id="d9cnmh"
kordex run main.js --allow-fs
```

## Common usage

```js id="u8aiu9"
import {
  exists,
  isFile,
  isDirectory,
  readText,
  writeText,
  remove,
} from "kordex:fs";

writeText("hello.txt", "Hello");

console.log(exists("hello.txt"));
console.log(isFile("hello.txt"));
console.log(isDirectory("hello.txt"));
console.log(readText("hello.txt"));

remove("hello.txt");
```

Run:

```bash id="tgr4f6"
kordex run main.js --allow-fs
```

## Common errors

### Missing permission

Wrong:

```bash id="f8ot0c"
kordex run main.js
```

when the script uses:

```js id="m6lm86"
import { readText } from "kordex:fs";
```

Correct:

```bash id="xa3l7q"
kordex run main.js --allow-fs
```

### Wrong module name

Wrong:

```js id="d5gtr0"
import { readText } from "fs";
```

Correct:

```js id="wof31c"
import { readText } from "kordex:fs";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="bh3o2w"
import { readFile, writeFile } from "kordex:fs";
```

Correct:

```js id="svf3j7"
import { readText, writeText } from "kordex:fs";
```

Available functions:

```txt id="cmijad"
exists
isFile
isDirectory
readText
writeText
remove
```

### Reading a missing file

Wrong:

```js id="g6z1en"
console.log(readText("missing.txt"));
```

Better:

```js id="uj8utv"
if (exists("missing.txt")) {
  console.log(readText("missing.txt"));
} else {
  console.log("file not found");
}
```

### Removing the wrong file

Avoid hard-coded destructive paths.

Risky:

```js id="ffnm54"
remove("important.txt");
```

Better:

```js id="rlw24a"
const file = "temp.txt";

if (exists(file) && isFile(file)) {
  remove(file);
}
```

### Expecting `kordex:fs` to create parent folders

This may fail if `data/` does not exist:

```js id="whcno8"
writeText("data/message.txt", "Hello");
```

Make sure the target directory exists before writing nested files.

For simple examples, write to the current directory:

```js id="ab8rsx"
writeText("message.txt", "Hello");
```

## Related pages

- [Modules](./index.md)
- [Path module](./path.md)
- [Environment module](./env.md)
- [Process module](./process.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Local-first](../guide/local-first.md)
