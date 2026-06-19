# Hashing

Create stable hashes from a Kordex script.

This recipe uses `kordex:crypto`.

## Goal

Turn a string into a stable hexadecimal hash.

Useful for:

```txt id="ha8o6s"
cache keys
file names
local storage keys
deduplication keys
simple identifiers
```

## Permission

`kordex:crypto` does not require a permission flag.

Run normally:

```bash id="a5fs2j"
kordex run main.js
```

## Create `main.js`

```js id="udz0h1"
import { hash } from "kordex:crypto";

const input = "hello-kordex";
const key = hash(input);

console.log(key);
```

## Run it

```bash id="y1ns4u"
kordex run main.js
```

## Output

```txt id="gk8mj7"
a stable hexadecimal hash
```

The same input returns the same hash every time.

## Import

```js id="znh4hz"
import { hash, random, randomInt, equals } from "kordex:crypto";
```

Or import everything:

```js id="ldszbh"
import * as crypto from "kordex:crypto";

console.log(crypto.hash("kordex"));
```

## Functions

```txt id="qpjxpv"
hash(value)
random()
randomInt(min, max)
equals(a, b)
```

## `hash`

Return a deterministic hexadecimal hash for a string.

```js id="runq7r"
import { hash } from "kordex:crypto";

console.log(hash("kordex"));
console.log(hash("kordex"));
console.log(hash("softadastra"));
```

The first two values are the same because the input is the same.

## Build a cache key

```js id="d8tkq6"
import { hash } from "kordex:crypto";

const url = "https://api.example.com/products";
const cacheKey = "cache:" + hash(url);

console.log(cacheKey);
```

Run:

```bash id="r6plnr"
kordex run main.js
```

## Build a local storage key

```js id="kvhdqx"
import { hash } from "kordex:crypto";

const productId = "softadastra-aegis";
const key = "product:" + hash(productId);

console.log(key);
```

## Use with Softadastra storage

```js id="z7umx0"
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "cache-app", ".kordex/data/cache.wal");

const input = "product:softadastra-aegis";
const key = "cache:" + hash(input);

softadastra.put(key, "cached value");

console.log(softadastra.get(key));

softadastra.close();
```

Run:

```bash id="pqq7ow"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

Permissions:

```txt id="rwl2w8"
kordex:crypto        no permission needed
kordex:softadastra   requires --allow-softadastra
```

## Hash JSON data

When hashing objects, convert them to a stable string first.

```js id="ekshcv"
import { hash } from "kordex:crypto";

const user = {
  name: "Kordex",
  type: "runtime",
};

const text = JSON.stringify(user);
const id = hash(text);

console.log(id);
```

Run:

```bash id="b3nsdu"
kordex run main.js
```

## Build file names

```js id="hfyxlp"
import { hash } from "kordex:crypto";
import { join } from "kordex:path";

const source = "https://example.com/image.png";
const file = join(".", "cache", hash(source) + ".txt");

console.log(file);
```

Run:

```bash id="fztdqs"
kordex run main.js
```

## Use with `kordex:fs`

```js id="jt7bjp"
import { hash } from "kordex:crypto";
import { join } from "kordex:path";
import { writeText, readText } from "kordex:fs";

const input = "local-first runtime";
const file = join(".", "cache", hash(input) + ".txt");

writeText(file, input);

console.log(readText(file));
```

Run:

```bash id="yfx8pa"
mkdir -p cache
kordex run main.js --allow-fs
```

## `random`

Return a random number in the range `[0, 1)`.

```js id="scifnb"
import { random } from "kordex:crypto";

console.log(random());
console.log(random());
console.log(random());
```

Run:

```bash id="bynlwx"
kordex run main.js
```

Use `random()` for simple runtime values, not for security-critical secrets.

## `randomInt`

Return a random integer between `min` and `max`, inclusive.

```js id="feqf2g"
import { randomInt } from "kordex:crypto";

console.log(randomInt(1, 10));
console.log(randomInt(100, 999));
```

Run:

```bash id="v8go7d"
kordex run main.js
```

## Generate a simple local id

```js id="lrixfu"
import { randomInt } from "kordex:crypto";
import { unixMs } from "kordex:timer";

const id = "item-" + unixMs() + "-" + randomInt(1000, 9999);

console.log(id);
```

Run:

```bash id="zc5ufo"
kordex run main.js
```

## `equals`

Return `true` when two strings are equal.

```js id="xm47ct"
import { equals } from "kordex:crypto";

console.log(equals("kordex", "kordex"));
console.log(equals("kordex", "node"));
```

Example output:

```txt id="iqbq5r"
true
false
```

## Compare hashes

```js id="zu3qhu"
import { hash, equals } from "kordex:crypto";

const a = hash("hello");
const b = hash("hello");
const c = hash("world");

console.log(equals(a, b));
console.log(equals(a, c));
```

Output:

```txt id="wj3q8x"
true
false
```

## Deduplicate strings

```js id="ef5s99"
import { hash } from "kordex:crypto";

const values = ["kordex", "softadastra", "kordex", "local-first"];

const seen = {};
const unique = [];

for (const value of values) {
  const key = hash(value);

  if (!seen[key]) {
    seen[key] = true;
    unique.push(value);
  }
}

console.log(unique.join(", "));
```

Run:

```bash id="qxymrg"
kordex run main.js
```

Output:

```txt id="zrdwbu"
kordex, softadastra, local-first
```

## Build stable note ids

```js id="oy5xkg"
import { hash } from "kordex:crypto";

function noteId(title) {
  return "note:" + hash(title);
}

console.log(noteId("Write Kordex docs"));
console.log(noteId("Write Kordex docs"));
```

The same title produces the same id.

## Use hash for local-first state

```js id="w8excr"
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "notes", ".kordex/data/notes.wal");

const title = "Offline first";
const content = "The app should write locally before syncing.";

const id = "note:" + hash(title);

softadastra.put(
  id,
  JSON.stringify({
    title,
    content,
  }),
);

const saved = JSON.parse(softadastra.get(id));

console.log(saved.title);
console.log(saved.content);

softadastra.close();
```

Run:

```bash id="nz6n1t"
mkdir -p .kordex/data
kordex run main.js --allow-softadastra
```

## What hashing is good for

Use `hash()` for stable identifiers:

```txt id="htbthr"
cache keys
deduplication
local map keys
file names
simple fingerprints
```

Example:

```js id="d3wxnw"
const key = "cache:" + hash("https://api.example.com/products");
```

## What hashing is not for

Do not use this first version of `kordex:crypto` for security-critical cryptography.

Avoid using it for:

```txt id="po3d65"
password hashing
authentication tokens
private keys
payment security
cryptographic signatures
secret storage
```

For now, treat `hash()` as a deterministic utility hash.

## Recommended usage

Use strings as input:

```js id="y6z2ct"
hash("hello");
```

Convert numbers first:

```js id="yuyjlr"
hash(String(123));
```

Convert objects first:

```js id="yxmzor"
hash(JSON.stringify({ name: "Kordex" }));
```

Prefix keys by purpose:

```js id="bz8zgi"
const key = "cache:" + hash(input);
```

Use stable input when you need stable output:

```js id="vf4mxm"
const key = hash("product:123");
```

Avoid random input when you want repeatable keys:

```js id="jyg6rz"
const key = hash(String(Date.now()));
```

## Common errors

### Wrong module name

Wrong:

```js id="mhd8qr"
import { hash } from "crypto";
```

Correct:

```js id="l5i3k4"
import { hash } from "kordex:crypto";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function name

Wrong:

```js id="jmmske"
import { sha256 } from "kordex:crypto";
```

Correct:

```js id="ircqlw"
import { hash } from "kordex:crypto";
```

Available functions:

```txt id="wod3m5"
hash
random
randomInt
equals
```

### Passing non-string data directly to `hash`

Avoid:

```js id="pajc07"
hash({ name: "Kordex" });
```

Better:

```js id="q4woyh"
hash(JSON.stringify({ name: "Kordex" }));
```

### Expecting a secure password hash

Avoid:

```js id="r3s10n"
const passwordHash = hash(password);
```

`hash()` is a deterministic utility hash in this version.

Do not use it for passwords.

### Expecting `random()` to create secrets

Avoid:

```js id="kncch9"
const token = String(random());
```

Use `random()` for simple runtime randomness, not security tokens.

### Giving permissions for no reason

Wrong:

```bash id="nbs9ry"
kordex run main.js --allow-fs --allow-env --allow-net
```

when the script only uses:

```js id="jbj3dq"
import { hash } from "kordex:crypto";
```

Better:

```bash id="t4pblp"
kordex run main.js
```

`kordex:crypto` does not need permission.

## Related pages

- [Crypto module](../modules/crypto.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Path utilities](./path-utilities.md)
- [Softadastra storage](./softadastra-storage.md)
