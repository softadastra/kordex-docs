# Read and write files

Read and write local files from a Kordex script.

This recipe uses `kordex:fs`.

## Goal

Create a file, write text into it, read it back, and remove it.

## Permission

Filesystem access requires:

```bash id="ycof13"
--allow-fs
```

Run scripts that use `kordex:fs` like this:

```bash id="au9k31"
kordex run main.js --allow-fs
```

## Create `main.js`

```js id="u9ldx5"
import { writeText, readText, exists, remove } from "kordex:fs";

const file = "message.txt";

writeText(file, "Hello from Kordex");

console.log("exists:", exists(file));
console.log("content:", readText(file));

remove(file);

console.log("exists after remove:", exists(file));
```

## Run it

```bash id="z7h6bn"
kordex run main.js --allow-fs
```

## Output

```txt id="qj356a"
exists: true
content: Hello from Kordex
exists after remove: false
```

## Write a text file

```js id="hm1ezs"
import { writeText } from "kordex:fs";

writeText("hello.txt", "Hello from Kordex");
```

Run:

```bash id="e6cgvr"
kordex run main.js --allow-fs
```

This creates:

```txt id="nbs8ie"
hello.txt
```

## Read a text file

```js id="m2sg18"
import { readText } from "kordex:fs";

const content = readText("hello.txt");

console.log(content);
```

Run:

```bash id="n1s1sb"
kordex run main.js --allow-fs
```

## Check if a path exists

```js id="yib4dp"
import { exists } from "kordex:fs";

console.log(exists("hello.txt"));
console.log(exists("missing.txt"));
```

Output:

```txt id="hgzvh6"
true
false
```

## Check files and folders

```js id="m2wy3t"
import { isFile, isDirectory } from "kordex:fs";

console.log(isFile("hello.txt"));
console.log(isDirectory("."));
```

Run:

```bash id="u6y239"
kordex run main.js --allow-fs
```

## Remove a file

```js id="kmmapw"
import { remove, exists } from "kordex:fs";

if (exists("hello.txt")) {
  remove("hello.txt");
}

console.log(exists("hello.txt"));
```

Run:

```bash id="m1d6mv"
kordex run main.js --allow-fs
```

## Use with `kordex:path`

Use `kordex:path` to build paths safely.

```js id="svk29q"
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";

const file = join(".", "data", "note.txt");

writeText(file, "Local file with Kordex");

console.log(readText(file));
```

Run:

```bash id="wrn1g5"
mkdir -p data
kordex run main.js --allow-fs
```

`kordex:path` does not require permission.

`kordex:fs` requires `--allow-fs`.

## Simple config file

Create `config.json`:

```json id="i4t38k"
{
  "name": "Kordex",
  "mode": "local-first"
}
```

Create `main.js`:

```js id="wy1bvw"
import { readText } from "kordex:fs";

const raw = readText("config.json");
const config = JSON.parse(raw);

console.log(config.name);
console.log(config.mode);
```

Run:

```bash id="dgvkw7"
kordex run main.js --allow-fs
```

Output:

```txt id="ctcvba"
Kordex
local-first
```

## Write JSON data

```js id="ut0uez"
import { writeText, readText } from "kordex:fs";

const user = {
  name: "Kordex",
  type: "runtime",
};

writeText("user.json", JSON.stringify(user, null, 2));

const saved = JSON.parse(readText("user.json"));

console.log(saved.name);
console.log(saved.type);
```

Run:

```bash id="jplgf7"
kordex run main.js --allow-fs
```

## Append-style write

`writeText()` writes the full file content.

To add content, read the old content first, then write the new content.

```js id="jvdzzk"
import { exists, readText, writeText } from "kordex:fs";

const file = "log.txt";

const previous = exists(file) ? readText(file) : "";

writeText(file, previous + "new line\n");

console.log(readText(file));
```

Run:

```bash id="h94q55"
kordex run main.js --allow-fs
```

## Local-first note file

```js id="ff21rl"
import { join } from "kordex:path";
import { writeText, readText, exists } from "kordex:fs";

const file = join(".", "notes", "today.txt");

const note = "Kordex can write local data first.";

writeText(file, note);

if (exists(file)) {
  console.log(readText(file));
}
```

Run:

```bash id="p1o5fl"
mkdir -p notes
kordex run main.js --allow-fs
```

## Recommended usage

Use `exists()` before reading optional files:

```js id="cuc2f3"
if (exists("config.json")) {
  console.log(readText("config.json"));
}
```

Use `join()` for paths:

```js id="gtf9fj"
const file = join(".", "data", "app.txt");
```

Use JSON when storing structured data:

```js id="z0h9nk"
writeText("state.json", JSON.stringify(state, null, 2));
```

Use `remove()` only when the script is trusted:

```js id="cu8y9w"
remove("temp.txt");
```

## Common errors

### Missing permission

Wrong:

```bash id="jnt99l"
kordex run main.js
```

when the script uses:

```js id="sjp58u"
import { readText } from "kordex:fs";
```

Correct:

```bash id="kqom2p"
kordex run main.js --allow-fs
```

### Wrong module name

Wrong:

```js id="je2o04"
import { readText } from "fs";
```

Correct:

```js id="x4umim"
import { readText } from "kordex:fs";
```

Kordex standard modules use the `kordex:` prefix.

### Reading a missing file

Wrong:

```js id="s1xvc6"
console.log(readText("missing.txt"));
```

Better:

```js id="m93h98"
if (exists("missing.txt")) {
  console.log(readText("missing.txt"));
} else {
  console.log("file not found");
}
```

### Passing an empty path

Wrong:

```js id="ai6phu"
readText("");
```

Correct:

```js id="h3g9pl"
readText("message.txt");
```

The path cannot be empty.

### Forgetting to create the folder

Wrong:

```js id="h2o71f"
writeText("data/message.txt", "Hello");
```

when `data/` does not exist.

Correct:

```bash id="ppwv9p"
mkdir -p data
kordex run main.js --allow-fs
```

### Giving too many permissions

Wrong:

```bash id="hquzwf"
kordex run main.js --allow-fs --allow-env --allow-process --allow-net
```

when the script only reads a file.

Better:

```bash id="s6dhg7"
kordex run main.js --allow-fs
```

## Related pages

- [Filesystem module](../modules/fs.md)
- [Path module](../modules/path.md)
- [Permissions](../guide/permissions.md)
- [Running scripts](../guide/running-scripts.md)
- [Local-first](../guide/local-first.md)
