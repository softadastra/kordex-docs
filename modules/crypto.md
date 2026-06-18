# `kordex:crypto`

Crypto utility module for Kordex scripts.

Use it for simple hashing, random values, random integers, and string equality checks.

```js id="ql57e0"
import { hash, random, randomInt, equals } from "kordex:crypto";

console.log(hash("kordex"));
console.log(random());
console.log(randomInt(1, 10));
console.log(equals("kordex", "kordex"));
```

Run:

```bash id="gztv0i"
kordex run main.js
```

## Import

```js id="xj8hg9"
import { hash } from "kordex:crypto";
```

Or import everything:

```js id="evh3xl"
import * as crypto from "kordex:crypto";

console.log(crypto.hash("kordex"));
console.log(crypto.random());
console.log(crypto.randomInt(1, 100));
```

## Permission

`kordex:crypto` does not require a permission flag.

```bash id="il4xbz"
kordex run main.js
```

No need for:

```bash id="kmh4ca"
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Crypto helpers are safe utility functions.

## Functions

```txt id="ysjvwl"
hash(value)
random()
randomInt(min, max)
equals(left, right)
```

## Important note

`kordex:crypto` currently provides utility primitives.

The current `hash()` function returns a stable deterministic hexadecimal hash.

Do not use it for passwords, private keys, tokens, signatures, or security-critical cryptography.

Use it for simple stable identifiers, cache keys, checks, and examples.

## `hash`

Return a deterministic hexadecimal hash for a string.

```js id="a7nd0t"
import { hash } from "kordex:crypto";

console.log(hash("kordex"));
console.log(hash("local-first"));
```

The same input returns the same output.

```js id="y5bipi"
import { hash } from "kordex:crypto";

console.log(hash("kordex"));
console.log(hash("kordex"));
```

This is useful when you need a stable value from text.

## Use `hash` for cache keys

```js id="ep6nyk"
import { hash } from "kordex:crypto";

const key = "user:gaspard";
const cacheKey = "cache:" + hash(key);

console.log(cacheKey);
```

## Use `hash` with files

```js id="cjfqbl"
import { hash } from "kordex:crypto";
import { readText } from "kordex:fs";

const content = readText("README.md");

console.log(hash(content));
```

Run with filesystem permission:

```bash id="l82uez"
kordex run main.js --allow-fs
```

The permission is required because of `kordex:fs`, not because of `kordex:crypto`.

## `random`

Return a random number between `0` and `1`.

```js id="fjnh0w"
import { random } from "kordex:crypto";

console.log(random());
```

Example output:

```txt id="zmbfkd"
0.482193
```

Use `random()` when you need a simple random decimal value.

## `randomInt`

Return a random integer between `min` and `max`.

Both `min` and `max` are included.

```js id="wyzqi1"
import { randomInt } from "kordex:crypto";

console.log(randomInt(1, 6));
```

This can return:

```txt id="bz355g"
1
2
3
4
5
6
```

## Random choice

```js id="v81c1f"
import { randomInt } from "kordex:crypto";

const choices = ["local", "offline", "sync"];
const index = randomInt(0, choices.length - 1);

console.log(choices[index]);
```

## `equals`

Return `true` when two strings are equal.

```js id="qyy074"
import { equals } from "kordex:crypto";

console.log(equals("kordex", "kordex"));
console.log(equals("kordex", "node"));
```

Output:

```txt id="elxhe6"
true
false
```

## Use `equals` for simple checks

```js id="u650du"
import { equals } from "kordex:crypto";

const expected = "local-first";
const actual = "local-first";

if (equals(expected, actual)) {
  console.log("match");
} else {
  console.log("different");
}
```

## Use with `kordex:console`

```js id="wlam8n"
import { log } from "kordex:console";
import { hash, randomInt } from "kordex:crypto";

log("hash:", hash("kordex"));
log("random id:", randomInt(1000, 9999));
```

Run:

```bash id="q0skfd"
kordex run main.js
```

## Use with local-first data

Use `hash()` to create stable local keys.

```js id="nsv8u9"
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "crypto-demo", ".kordex/data/crypto-demo.wal");

const username = "gaspard";
const key = "user:" + hash(username);

softadastra.put(key, username);

console.log(softadastra.get(key));

softadastra.close();
```

Run:

```bash id="yf8l71"
kordex run main.js --allow-softadastra
```

## Use with JSON imports

`user.json`:

```json id="kxhh6d"
{
  "name": "Kordex",
  "type": "runtime"
}
```

`main.js`:

```js id="n8sztp"
import { hash } from "kordex:crypto";
import user from "./user.json";

const id = hash(user.name + ":" + user.type);

console.log(id);
```

Run:

```bash id="kgl933"
kordex run main.js
```

## Recommended usage

Use `hash()` for stable identifiers:

```js id="ya5qiv"
const id = hash("project:kordex");
```

Use `random()` for random decimal values:

```js id="bf8ws7"
const value = random();
```

Use `randomInt()` for ranges:

```js id="sqx6bf"
const port = randomInt(3000, 9999);
```

Use `equals()` for string comparison:

```js id="dsz89m"
const same = equals("a", "a");
```

## Not for passwords

Do not use `hash()` for password storage.

Wrong:

```js id="aabjhw"
const passwordHash = hash(password);
```

Use a real password hashing algorithm outside this utility module when building authentication.

## Not for secrets

Do not use `random()` or `randomInt()` for secret tokens.

Wrong:

```js id="wxue69"
const token = String(randomInt(100000, 999999));
```

Use a cryptographically secure token generator when the value protects access to an account, key, or private system.

## Common usage

```js id="cxh5od"
import { hash, random, randomInt, equals } from "kordex:crypto";

const name = "kordex";

console.log("hash:", hash(name));
console.log("random:", random());
console.log("id:", randomInt(1000, 9999));
console.log("same:", equals(name, "kordex"));
```

Run:

```bash id="x3x1xb"
kordex run main.js
```

## Common errors

### Wrong module name

Wrong:

```js id="yg3w49"
import { hash } from "crypto";
```

Correct:

```js id="tqu9z4"
import { hash } from "kordex:crypto";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function name

Wrong:

```js id="a2vfbp"
import { random_int } from "kordex:crypto";
```

Correct:

```js id="emk9jy"
import { randomInt } from "kordex:crypto";
```

Available functions:

```txt id="n6zq76"
hash
random
randomInt
equals
```

### Passing numbers to `hash`

Wrong:

```js id="cqxdc9"
hash(123);
```

Correct:

```js id="aff3wc"
hash("123");
```

`hash()` expects a string.

### Passing strings to `randomInt`

Wrong:

```js id="qgm9f9"
randomInt("1", "10");
```

Correct:

```js id="qmms3t"
randomInt(1, 10);
```

`randomInt()` expects numbers.

### Reversing the range

Wrong:

```js id="xdfmi9"
randomInt(10, 1);
```

Correct:

```js id="pj3yd9"
randomInt(1, 10);
```

The minimum value should be less than or equal to the maximum value.

### Adding unnecessary permissions

Wrong:

```bash id="qzvo08"
kordex run main.js --allow-fs
```

when the script only uses:

```js id="h2brw9"
import { hash } from "kordex:crypto";
```

Correct:

```bash id="y25cyt"
kordex run main.js
```

## Related pages

- [Modules](./index.md)
- [Timer module](./timer.md)
- [Path module](./path.md)
- [Filesystem module](./fs.md)
- [Permissions](../guide/permissions.md)
- [Local-first](../guide/local-first.md)
