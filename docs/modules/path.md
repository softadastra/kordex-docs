# `kordex:path`

Path utility module for Kordex scripts.

Use it to join, normalize, and inspect file paths in a portable way.

```js id="wzq7fn"
import { join, dirname, basename, extension } from "kordex:path";

const file = join("data", "users", "gaspard.json");

console.log(file);
console.log(dirname(file));
console.log(basename(file));
console.log(extension(file));
```

Run:

```bash id="b489vj"
kordex run main.js
```

## Import

```js id="qqs4hp"
import { join } from "kordex:path";
```

Or import everything:

```js id="dl2q7s"
import * as path from "kordex:path";

console.log(path.join("data", "file.txt"));
```

## Permission

`kordex:path` does not require a permission flag.

```bash id="ozf1d8"
kordex run main.js
```

No need for:

```bash id="vvqzqh"
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Path operations only manipulate strings.

They do not read files, write files, or access the operating system directly.

## Functions

```txt id="k3hkao"
normalize(path)
join(...segments)
dirname(path)
basename(path)
extension(path)
isAbsolute(path)
isRelative(path)
```

## `join`

Join path segments into one path.

```js id="ncgp75"
import { join } from "kordex:path";

console.log(join("data", "users", "profile.json"));
```

Output:

```txt id="rlj2gu"
data/users/profile.json
```

Use `join` instead of manually adding `/`.

Good:

```js id="jy65ap"
join("data", "users", "profile.json");
```

Avoid:

```js id="mamvlo"
"data/" + "users/" + "profile.json";
```

## `normalize`

Normalize a path lexically.

```js id="q4web3"
import { normalize } from "kordex:path";

console.log(normalize("data/../data/users/./profile.json"));
```

Example output:

```txt id="hyjq8i"
data/users/profile.json
```

`normalize` works on the path string.

It does not check if the path exists.

## `dirname`

Return the parent directory of a path.

```js id="jdon4o"
import { dirname } from "kordex:path";

console.log(dirname("data/users/profile.json"));
```

Output:

```txt id="idbc22"
data/users
```

## `basename`

Return the last part of a path.

```js id="g8kf5n"
import { basename } from "kordex:path";

console.log(basename("data/users/profile.json"));
```

Output:

```txt id="mzbv06"
profile.json
```

## `extension`

Return the file extension.

```js id="mvhk7i"
import { extension } from "kordex:path";

console.log(extension("data/users/profile.json"));
```

Output:

```txt id="sdi7hu"
.json
```

Another example:

```js id="vcyg5g"
import { extension } from "kordex:path";

console.log(extension("main.js"));
console.log(extension("main.ts"));
console.log(extension("README"));
```

Example output:

```txt id="g8yk38"
.js
.ts

```

A file without an extension returns an empty string.

## `isAbsolute`

Return `true` if a path is absolute.

```js id="xn6n1k"
import { isAbsolute } from "kordex:path";

console.log(isAbsolute("/home/user/app"));
console.log(isAbsolute("src/main.js"));
```

Example output:

```txt id="ut81ml"
true
false
```

## `isRelative`

Return `true` if a path is relative.

```js id="swkbze"
import { isRelative } from "kordex:path";

console.log(isRelative("src/main.js"));
console.log(isRelative("/home/user/app"));
```

Example output:

```txt id="efh3n5"
true
false
```

## Use with filesystem

`kordex:path` does not need permission.

`kordex:fs` does.

Example:

```js id="rf5d2z"
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";

const file = join("data", "message.txt");

writeText(file, "Hello from Kordex");

console.log(readText(file));
```

Run with filesystem permission:

```bash id="ygs61i"
kordex run main.js --allow-fs
```

The permission is required because of `kordex:fs`, not because of `kordex:path`.

## Use with project files

Example project:

```txt id="gmjkpj"
app/
├── kordex.json
└── src/
    ├── main.js
    └── data/
        └── user.json
```

`src/main.js`:

```js id="z0tg6y"
import { join } from "kordex:path";

const file = join("src", "data", "user.json");

console.log(file);
```

Run:

```bash id="lwxsts"
kordex run src/main.js
```

Output:

```txt id="x0a84e"
src/data/user.json
```

## Use with local-first data

For local-first applications, keep local data in a predictable folder.

```js id="c20mad"
import { join } from "kordex:path";

const dataDir = join(".kordex", "data");
const storeFile = join(dataDir, "app.wal");

console.log(storeFile);
```

Output:

```txt id="hdnaj8"
.kordex/data/app.wal
```

This pattern works well with `kordex:softadastra`.

```js id="v9zkrs"
import { join } from "kordex:path";
import * as softadastra from "kordex:softadastra";

const store = join(".kordex", "data", "app.wal");

softadastra.open("durable", "my-app", store);
softadastra.put("runtime", "kordex");

console.log(softadastra.get("runtime"));

softadastra.close();
```

Run:

```bash id="mij7la"
kordex run main.js --allow-softadastra
```

## Recommended patterns

Use `join` for paths built from parts:

```js id="xbukmz"
join("src", "data", "config.json");
```

Use `normalize` when paths may contain `.` or `..`:

```js id="milz66"
normalize("src/../src/main.js");
```

Use `dirname` when you need the parent directory:

```js id="jd9pds"
dirname("src/data/config.json");
```

Use `basename` when you need the file name:

```js id="e6z5sy"
basename("src/data/config.json");
```

Use `extension` when you need the file type:

```js id="d9zw0m"
extension("src/data/config.json");
```

## `kordex:path` is not Node `path`

Kordex modules use the `kordex:` prefix.

Correct:

```js id="slr8so"
import { join } from "kordex:path";
```

Wrong:

```js id="dr41ws"
import { join } from "path";
```

Kordex is not trying to expose Node.js built-ins as-is.

The module is part of the Kordex standard module system.

## Common usage

```js id="vc8wfu"
import {
  join,
  normalize,
  dirname,
  basename,
  extension,
  isAbsolute,
  isRelative,
} from "kordex:path";

const file = join("data", "notes", "today.md");

console.log("file:", file);
console.log("normal:", normalize(file));
console.log("dir:", dirname(file));
console.log("base:", basename(file));
console.log("ext:", extension(file));
console.log("absolute:", isAbsolute(file));
console.log("relative:", isRelative(file));
```

Run:

```bash id="f9tkjx"
kordex run main.js
```

## Common errors

### Wrong module name

Wrong:

```js id="e9aoot"
import { join } from "path";
```

Correct:

```js id="flk3g7"
import { join } from "kordex:path";
```

### Calling `join` with one manually-built string

Avoid:

```js id="bdsdpx"
join("data/users/profile.json");
```

Prefer:

```js id="iltcwn"
join("data", "users", "profile.json");
```

### Expecting `path` to read files

This does not read a file:

```js id="n9et2q"
import { join } from "kordex:path";

const file = join("data", "user.json");
```

To read the file, use `kordex:fs` with permission:

```js id="dbwi8t"
import { join } from "kordex:path";
import { readText } from "kordex:fs";

const file = join("data", "user.json");

console.log(readText(file));
```

Run:

```bash id="w0l7kq"
kordex run main.js --allow-fs
```

### Adding unnecessary permissions

Wrong:

```bash id="kmzgpx"
kordex run main.js --allow-fs
```

when the script only uses:

```js id="j5ncr5"
import { join } from "kordex:path";
```

Correct:

```bash id="ktlpq6"
kordex run main.js
```

## Related pages

- [Modules](./index.md)
- [Filesystem module](./fs.md)
- [Softadastra module](./softadastra.md)
- [Imports](../guide/imports.md)
- [Permissions](../guide/permissions.md)
- [Local-first](../guide/local-first.md)
