# Path utilities

Build and inspect file paths from a Kordex script.

This recipe uses `kordex:path`.

## Goal

Use path helpers instead of manually joining strings.

## Permission

`kordex:path` does not require a permission flag.

Run normally:

```bash id="vfl8z4"
kordex run main.js
```

## Create `main.js`

```js id="pa1mry"
import {
  join,
  normalize,
  dirname,
  basename,
  extension,
  isAbsolute,
  isRelative,
} from "kordex:path";

const file = join(".", "data", "notes", "today.txt");

console.log("file:", file);
console.log("normal:", normalize("./data/../data/notes/today.txt"));
console.log("dir:", dirname(file));
console.log("base:", basename(file));
console.log("ext:", extension(file));
console.log("absolute:", isAbsolute(file));
console.log("relative:", isRelative(file));
```

## Run it

```bash id="h58pv3"
kordex run main.js
```

## Example output

```txt id="ov24sh"
file: data/notes/today.txt
normal: data/notes/today.txt
dir: data/notes
base: today.txt
ext: .txt
absolute: false
relative: true
```

The exact path separator can depend on the operating system.

## Import

```js id="emcbcr"
import { join } from "kordex:path";
```

Or import everything:

```js id="g1rxw1"
import * as path from "kordex:path";

console.log(path.join(".", "data", "app.txt"));
```

## Functions

```txt id="h5uc29"
join(...segments)
normalize(path)
dirname(path)
basename(path)
extension(path)
isAbsolute(path)
isRelative(path)
```

## `join`

Join path segments.

```js id="wwnmgt"
import { join } from "kordex:path";

const file = join(".", "data", "app.txt");

console.log(file);
```

Use `join()` instead of building paths with `+`.

Good:

```js id="ghn0sm"
const file = join(".", "data", "app.txt");
```

Avoid:

```js id="j4e2ut"
const file = "./" + "data" + "/" + "app.txt";
```

## `normalize`

Clean a path lexically.

```js id="uwc9fi"
import { normalize } from "kordex:path";

console.log(normalize("./data/../data/app.txt"));
```

Example output:

```txt id="pbqwan"
data/app.txt
```

Use it when a path may contain `.` or `..`.

## `dirname`

Return the parent directory.

```js id="ka7438"
import { dirname } from "kordex:path";

console.log(dirname("data/notes/today.txt"));
```

Example output:

```txt id="mml1zj"
data/notes
```

## `basename`

Return the filename.

```js id="suz9am"
import { basename } from "kordex:path";

console.log(basename("data/notes/today.txt"));
```

Example output:

```txt id="gnmmsf"
today.txt
```

## `extension`

Return the file extension.

```js id="wnbirg"
import { extension } from "kordex:path";

console.log(extension("data/notes/today.txt"));
console.log(extension("kordex.json"));
```

Example output:

```txt id="mn2lap"
.txt
.json
```

## `isAbsolute`

Return `true` if the path is absolute.

```js id="z1xsak"
import { isAbsolute } from "kordex:path";

console.log(isAbsolute("/tmp/kordex/app.txt"));
console.log(isAbsolute("data/app.txt"));
```

Example output on Linux:

```txt id="txevgn"
true
false
```

## `isRelative`

Return `true` if the path is relative.

```js id="sl7dgm"
import { isRelative } from "kordex:path";

console.log(isRelative("data/app.txt"));
console.log(isRelative("/tmp/kordex/app.txt"));
```

Example output on Linux:

```txt id="j0hzn9"
true
false
```

## Use with `kordex:fs`

Build paths with `kordex:path`, then read or write files with `kordex:fs`.

```js id="z18s4s"
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";

const file = join(".", "data", "message.txt");

writeText(file, "Hello from Kordex");

console.log(readText(file));
```

Run:

```bash id="f2e5ea"
mkdir -p data
kordex run main.js --allow-fs
```

Permissions:

```txt id="l5jg7i"
kordex:path  no permission needed
kordex:fs    requires --allow-fs
```

## Build paths for local data

```js id="i08wih"
import { join } from "kordex:path";

const dataDir = join(".", ".kordex", "data");
const walPath = join(dataDir, "app.wal");
const logPath = join(dataDir, "app.log");

console.log(dataDir);
console.log(walPath);
console.log(logPath);
```

Run:

```bash id="ki59en"
kordex run main.js
```

## Use with Softadastra storage

```js id="v5p763"
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const storePath = join(".", ".kordex", "data", "notes.wal");

softadastra.open("durable", "notes-app", storePath);

softadastra.put("note:1", "Write locally first");

console.log(softadastra.get("note:1"));

softadastra.close();
```

Run:

```bash id="qn3xqb"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## Inspect a source file path

```js id="i3o14p"
import { dirname, basename, extension } from "kordex:path";

const source = "src/main.ts";

console.log("directory:", dirname(source));
console.log("file:", basename(source));
console.log("extension:", extension(source));
```

Run:

```bash id="kqc1nt"
kordex run main.js
```

Output:

```txt id="j2zqbk"
directory: src
file: main.ts
extension: .ts
```

## Validate config paths

`config.json`:

```json id="pfalel"
{
  "dataDir": ".kordex/data",
  "store": "app.wal"
}
```

`main.js`:

```js id="vfojfq"
import config from "./config.json";
import { join, normalize, isRelative } from "kordex:path";

const file = normalize(join(config.dataDir, config.store));

if (!isRelative(file)) {
  throw new Error("The store path must be relative");
}

console.log(file);
```

Run:

```bash id="opsihb"
kordex run main.js
```

## Path helper for app files

```js id="yy8wv2"
import { join } from "kordex:path";

function appPath(...segments) {
  return join(".", ".kordex", ...segments);
}

console.log(appPath("data", "app.wal"));
console.log(appPath("cache", "index.json"));
console.log(appPath("logs", "app.log"));
```

Run:

```bash id="h2o0g2"
kordex run main.js
```

## Recommended usage

Use `join()` for paths built from parts:

```js id="jd8yfz"
const file = join(".", "data", "app.txt");
```

Use `normalize()` when a path may contain `.` or `..`:

```js id="iubpfu"
const clean = normalize("./data/../data/app.txt");
```

Use `dirname()` when you need the parent folder:

```js id="zjdz7s"
const dir = dirname("src/main.js");
```

Use `basename()` when you need the filename:

```js id="di6mx3"
const name = basename("src/main.js");
```

Use `extension()` before accepting a file type:

```js id="fuqwfn"
if (extension(file) !== ".json") {
  throw new Error("Expected a JSON file");
}
```

Use `isRelative()` when you want project-local paths:

```js id="izs5l3"
if (!isRelative(file)) {
  throw new Error("Use a relative path");
}
```

## Common errors

### Wrong module name

Wrong:

```js id="cf2k4h"
import { join } from "path";
```

Correct:

```js id="fge21e"
import { join } from "kordex:path";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js id="anty3n"
import { is_absolute, is_relative } from "kordex:path";
```

Correct:

```js id="ry65k0"
import { isAbsolute, isRelative } from "kordex:path";
```

Available functions:

```txt id="jdro0t"
join
normalize
dirname
basename
extension
isAbsolute
isRelative
```

### Manually joining paths

Avoid:

```js id="zhx9rb"
const file = ".kordex/" + "data/" + "app.wal";
```

Better:

```js id="bjhngo"
const file = join(".", ".kordex", "data", "app.wal");
```

### Passing an empty path

Wrong:

```js id="clxykr"
dirname("");
```

Correct:

```js id="cfe7ol"
dirname("src/main.js");
```

The path cannot be empty.

### Expecting `kordex:path` to create folders

`kordex:path` only builds and inspects path strings.

It does not create folders.

Wrong expectation:

```js id="mo1343"
join(".", "data", "app.txt");
```

This only returns a path string.

To use that path with files, create the folder first:

```bash id="wko2kp"
mkdir -p data
kordex run main.js --allow-fs
```

### Giving permissions for no reason

Wrong:

```bash id="lasznb"
kordex run main.js --allow-fs --allow-env --allow-net
```

when the script only uses:

```js id="q4o1cl"
import { join } from "kordex:path";
```

Better:

```bash id="x7dk4s"
kordex run main.js
```

`kordex:path` does not need permission.

## Related pages

- [Path module](../modules/path.md)
- [Filesystem module](../modules/fs.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Read and write files](./read-write-files.md)
- [Softadastra storage](./softadastra-storage.md)
