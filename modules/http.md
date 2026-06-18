# `kordex:http`

HTTP utility module for Kordex scripts.

Use it to inspect HTTP status codes, normalize HTTP methods, check supported methods, and build URLs.

```js
import {
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusText,
} from "kordex:http";

console.log(isSuccess(200));
console.log(isRedirect(302));
console.log(isClientError(404));
console.log(isServerError(500));
console.log(statusText(404));
```

Run with network permission:

```bash
kordex run main.js --allow-net
```

## Import

```js
import { statusText } from "kordex:http";
```

Or import everything:

```js
import * as http from "kordex:http";

console.log(http.statusText(200));
console.log(http.isSuccess(200));
```

## Permission

`kordex:http` requires network permission.

```bash
--allow-net
```

Correct:

```bash
kordex run main.js --allow-net
```

The current module provides HTTP helpers.

It does not perform real network requests yet.

The permission is still explicit because HTTP belongs to the network capability family.

## Functions

```txt
isSuccess(statusCode)
isRedirect(statusCode)
isClientError(statusCode)
isServerError(statusCode)
statusText(statusCode)
buildUrl(base, path)
normalizeMethod(method)
isMethod(method)
```

## `isSuccess`

Return `true` if the status code is successful.

Successful HTTP status codes are in the `200` range.

```js
import { isSuccess } from "kordex:http";

console.log(isSuccess(200));
console.log(isSuccess(201));
console.log(isSuccess(404));
```

Example output:

```txt
true
true
false
```

## `isRedirect`

Return `true` if the status code is a redirect.

Redirect status codes are in the `300` range.

```js
import { isRedirect } from "kordex:http";

console.log(isRedirect(301));
console.log(isRedirect(302));
console.log(isRedirect(200));
```

Example output:

```txt
true
true
false
```

## `isClientError`

Return `true` if the status code is a client error.

Client error status codes are in the `400` range.

```js
import { isClientError } from "kordex:http";

console.log(isClientError(400));
console.log(isClientError(404));
console.log(isClientError(500));
```

Example output:

```txt
true
true
false
```

## `isServerError`

Return `true` if the status code is a server error.

Server error status codes are in the `500` range.

```js
import { isServerError } from "kordex:http";

console.log(isServerError(500));
console.log(isServerError(503));
console.log(isServerError(404));
```

Example output:

```txt
true
true
false
```

## `statusText`

Return the standard reason phrase for an HTTP status code.

```js
import { statusText } from "kordex:http";

console.log(statusText(200));
console.log(statusText(404));
console.log(statusText(500));
```

Example output:

```txt
OK
Not Found
Internal Server Error
```

Use it when you want human-readable status messages.

```js
import { statusText } from "kordex:http";

const code = 404;

console.log("request failed:", code, statusText(code));
```

## `buildUrl`

Build a URL from a base URL and a path.

```js
import { buildUrl } from "kordex:http";

console.log(buildUrl("https://api.example.com", "/users"));
```

Example output:

```txt
https://api.example.com/users
```

Use `buildUrl` instead of manually joining URL strings.

Good:

```js
buildUrl("https://api.example.com", "/users");
```

Avoid:

```js
"https://api.example.com" + "/users";
```

## `normalizeMethod`

Normalize an HTTP method.

```js
import { normalizeMethod } from "kordex:http";

console.log(normalizeMethod("get"));
console.log(normalizeMethod("post"));
console.log(normalizeMethod("PATCH"));
```

Example output:

```txt
GET
POST
PATCH
```

Use it when method names may come from config, user input, or a JSON file.

## `isMethod`

Return `true` if a string is a supported HTTP method.

```js
import { isMethod } from "kordex:http";

console.log(isMethod("GET"));
console.log(isMethod("POST"));
console.log(isMethod("INVALID"));
```

Example output:

```txt
true
true
false
```

## Check a response status

```js
import {
  isSuccess,
  isClientError,
  isServerError,
  statusText,
} from "kordex:http";

const status = 404;

if (isSuccess(status)) {
  console.log("request ok");
} else if (isClientError(status)) {
  console.log("client error:", statusText(status));
} else if (isServerError(status)) {
  console.log("server error:", statusText(status));
} else {
  console.log("status:", status, statusText(status));
}
```

Run:

```bash
kordex run main.js --allow-net
```

## Build API URLs

```js
import { buildUrl } from "kordex:http";

const api = "https://api.example.com";
const users = buildUrl(api, "/users");
const posts = buildUrl(api, "/posts");

console.log(users);
console.log(posts);
```

Run:

```bash
kordex run main.js --allow-net
```

## Validate methods from config

`config.json`:

```json
{
  "method": "post",
  "baseUrl": "https://api.example.com",
  "path": "/messages"
}
```

`main.js`:

```js
import config from "./config.json";
import { normalizeMethod, isMethod, buildUrl } from "kordex:http";

const method = normalizeMethod(config.method);

if (!isMethod(method)) {
  throw new Error("Unsupported HTTP method: " + config.method);
}

const url = buildUrl(config.baseUrl, config.path);

console.log(method, url);
```

Run:

```bash
kordex run main.js --allow-net
```

## Use with `kordex:console`

```js
import { log, error } from "kordex:console";
import { isSuccess, statusText } from "kordex:http";

const status = 500;

if (isSuccess(status)) {
  log("request succeeded");
} else {
  error("request failed:", status, statusText(status));
}
```

Run:

```bash
kordex run main.js --allow-net
```

## Use with environment variables

```js
import { get } from "kordex:env";
import { buildUrl } from "kordex:http";

const base = get("API_URL") || "https://api.example.com";
const url = buildUrl(base, "/health");

console.log(url);
```

Run:

```bash
API_URL=https://api.softadastra.com kordex run main.js --allow-env --allow-net
```

Permissions:

```txt
--allow-env  needed for kordex:env
--allow-net  needed for kordex:http
```

## Use with local-first data

HTTP helpers can prepare sync metadata without performing network requests.

```js
import { buildUrl, normalizeMethod } from "kordex:http";
import { unixMs } from "kordex:timer";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "http-demo", ".kordex/data/http-demo.wal");

const syncUrl = buildUrl("https://api.example.com", "/sync");
const method = normalizeMethod("post");

softadastra.put("sync_url", syncUrl);
softadastra.put("sync_method", method);
softadastra.put("sync_created_at", String(unixMs()));

console.log(softadastra.get("sync_url"));
console.log(softadastra.get("sync_method"));

softadastra.close();
```

Run:

```bash
kordex run main.js --allow-net --allow-softadastra
```

## Current scope

`kordex:http` is currently an HTTP helper module.

It can:

```txt
check status code groups
return reason phrases
normalize methods
validate methods
build URLs
```

It does not currently expose:

```txt
fetch()
request()
get()
post()
put()
delete()
headers()
body streaming
```

For now, use it to prepare and validate HTTP-related values.

Real network requests can be added later behind the same permission model.

## Permission model

`kordex:http` is disabled unless the script is run with:

```bash
--allow-net
```

Good:

```bash
kordex run main.js --allow-net
```

Avoid giving permissions that the script does not need.

Wrong:

```bash
kordex run main.js --allow-net --allow-fs --allow-env --allow-process
```

when the script only checks one status code.

Better:

```bash
kordex run main.js --allow-net
```

## Recommended usage

Use `isSuccess()` for success checks:

```js
if (isSuccess(status)) {
  console.log("ok");
}
```

Use `statusText()` for readable messages:

```js
console.log(status, statusText(status));
```

Use `normalizeMethod()` before storing method names:

```js
const method = normalizeMethod("post");
```

Use `isMethod()` before accepting a method from config:

```js
if (!isMethod(method)) {
  throw new Error("invalid method");
}
```

Use `buildUrl()` for base URL plus path:

```js
const url = buildUrl("https://api.example.com", "/users");
```

## Common usage

```js
import {
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusText,
  buildUrl,
  normalizeMethod,
  isMethod,
} from "kordex:http";

const status = 201;
const method = normalizeMethod("post");
const url = buildUrl("https://api.example.com", "/items");

console.log("url:", url);
console.log("method:", method);
console.log("method ok:", isMethod(method));
console.log("success:", isSuccess(status));
console.log("redirect:", isRedirect(status));
console.log("client error:", isClientError(status));
console.log("server error:", isServerError(status));
console.log("text:", statusText(status));
```

Run:

```bash
kordex run main.js --allow-net
```

## Common errors

### Missing permission

Wrong:

```bash
kordex run main.js
```

when the script uses:

```js
import { statusText } from "kordex:http";
```

Correct:

```bash
kordex run main.js --allow-net
```

### Wrong module name

Wrong:

```js
import { statusText } from "http";
```

Correct:

```js
import { statusText } from "kordex:http";
```

Kordex standard modules use the `kordex:` prefix.

### Expecting `fetch`

Wrong:

```js
import { fetch } from "kordex:http";
```

Correct for the current module:

```js
import { buildUrl, statusText } from "kordex:http";
```

`kordex:http` currently provides helpers, not real network requests.

### Wrong function names

Wrong:

```js
import { is_success, build_url } from "kordex:http";
```

Correct:

```js
import { isSuccess, buildUrl } from "kordex:http";
```

Available functions:

```txt
isSuccess
isRedirect
isClientError
isServerError
statusText
buildUrl
normalizeMethod
isMethod
```

### Passing strings to status helpers

Wrong:

```js
isSuccess("200");
```

Correct:

```js
isSuccess(200);
```

Status helpers expect a number.

### Passing an empty method

Wrong:

```js
normalizeMethod("");
```

Correct:

```js
normalizeMethod("GET");
```

The method cannot be empty.

### Passing an unsupported method

```js
import { isMethod } from "kordex:http";

const method = "CUSTOM";

if (!isMethod(method)) {
  console.log("unsupported method");
}
```

Use supported standard methods such as:

```txt
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

## Related pages

- [Modules](./index.md)
- [Environment module](./env.md)
- [Timer module](./timer.md)
- [Crypto module](./crypto.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Local-first](../guide/local-first.md)
