# HTTP helpers

Work with HTTP status codes, methods, and URLs from a Kordex script.

This recipe uses `kordex:http`.

## Goal

Use small HTTP helpers before real network code is connected.

`kordex:http` is useful for:

```txt
status code checks
method validation
method normalization
URL building
simple API helper logic
```

## Permission

HTTP helpers are behind the network permission.

Run scripts that use `kordex:http` like this:

```bash
kordex run main.js --allow-net
```

## Create `main.js`

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
const url = buildUrl("https://api.example.com", "/users");

console.log("url:", url);
console.log("status:", status);
console.log("text:", statusText(status));
console.log("success:", isSuccess(status));
console.log("redirect:", isRedirect(status));
console.log("client error:", isClientError(status));
console.log("server error:", isServerError(status));
console.log("method:", normalizeMethod("post"));
console.log("valid method:", isMethod("POST"));
```

## Run it

```bash
kordex run main.js --allow-net
```

## Example output

```txt
url: https://api.example.com/users
status: 201
text: Created
success: true
redirect: false
client error: false
server error: false
method: POST
valid method: true
```

## Import

```js
import { statusText, isSuccess } from "kordex:http";
```

Or import everything:

```js
import * as http from "kordex:http";

console.log(http.statusText(404));
```

## Functions

```txt
isSuccess(status)
isRedirect(status)
isClientError(status)
isServerError(status)
statusText(status)
buildUrl(base, path)
normalizeMethod(method)
isMethod(method)
```

## `isSuccess`

Return `true` for successful status codes.

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

Return `true` for redirect status codes.

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

Return `true` for client error status codes.

```js
import { isClientError } from "kordex:http";

console.log(isClientError(400));
console.log(isClientError(401));
console.log(isClientError(404));
console.log(isClientError(500));
```

Example output:

```txt
true
true
true
false
```

## `isServerError`

Return `true` for server error status codes.

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

Return the standard reason phrase for a status code.

```js
import { statusText } from "kordex:http";

console.log(statusText(200));
console.log(statusText(201));
console.log(statusText(404));
console.log(statusText(500));
```

Example output:

```txt
OK
Created
Not Found
Internal Server Error
```

## `buildUrl`

Build a URL from a base URL and a path.

```js
import { buildUrl } from "kordex:http";

console.log(buildUrl("https://api.example.com", "/users"));
console.log(buildUrl("https://api.example.com/", "users"));
```

Example output:

```txt
https://api.example.com/users
https://api.example.com/users
```

Use it to avoid double slashes or missing slashes when composing URLs.

## `normalizeMethod`

Normalize an HTTP method.

```js
import { normalizeMethod } from "kordex:http";

console.log(normalizeMethod("get"));
console.log(normalizeMethod("post"));
console.log(normalizeMethod("DELETE"));
```

Example output:

```txt
GET
POST
DELETE
```

## `isMethod`

Return `true` when a string is a supported HTTP method.

```js
import { isMethod } from "kordex:http";

console.log(isMethod("GET"));
console.log(isMethod("post"));
console.log(isMethod("INVALID"));
```

Example output:

```txt
true
true
false
```

## Build a small API helper

```js
import { buildUrl, normalizeMethod, isMethod } from "kordex:http";

function requestInfo(baseUrl, path, method) {
  const normalized = normalizeMethod(method);

  if (!isMethod(normalized)) {
    throw new Error("Unsupported HTTP method: " + method);
  }

  return {
    url: buildUrl(baseUrl, path),
    method: normalized,
  };
}

const request = requestInfo("https://api.example.com", "/products", "get");

console.log(request.method);
console.log(request.url);
```

Run:

```bash
kordex run main.js --allow-net
```

Output:

```txt
GET
https://api.example.com/products
```

## Classify status codes

```js
import {
  isSuccess,
  isRedirect,
  isClientError,
  isServerError,
  statusText,
} from "kordex:http";

function classify(status) {
  if (isSuccess(status)) {
    return "success";
  }

  if (isRedirect(status)) {
    return "redirect";
  }

  if (isClientError(status)) {
    return "client_error";
  }

  if (isServerError(status)) {
    return "server_error";
  }

  return "unknown";
}

const statuses = [200, 201, 301, 404, 500];

for (const status of statuses) {
  console.log(status, statusText(status), classify(status));
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

const baseUrl = get("API_URL") || "https://api.example.com";
const healthUrl = buildUrl(baseUrl, "/health");

console.log(healthUrl);
```

Run:

```bash
API_URL=https://api.softadastra.com kordex run main.js --allow-env --allow-net
```

Permissions:

```txt
kordex:env   requires --allow-env
kordex:http  requires --allow-net
```

## Use with JSON config

`config.json`:

```json
{
  "apiUrl": "https://api.example.com",
  "healthPath": "/health"
}
```

`main.js`:

```js
import config from "./config.json";
import { buildUrl } from "kordex:http";

const url = buildUrl(config.apiUrl, config.healthPath);

console.log(url);
```

Run:

```bash
kordex run main.js --allow-net
```

Output:

```txt
https://api.example.com/health
```

## Use with local-first state

You can store request metadata locally before adding real network sync.

```js
import { buildUrl, normalizeMethod } from "kordex:http";
import { hash } from "kordex:crypto";
import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "api-cache", ".kordex/data/api-cache.wal");

const method = normalizeMethod("get");
const url = buildUrl("https://api.example.com", "/products");
const key = "request:" + hash(method + ":" + url);

softadastra.put(
  key,
  JSON.stringify({
    method,
    url,
    status: "pending",
  }),
);

console.log(softadastra.get(key));

softadastra.close();
```

Run:

```bash
mkdir -p .kordex/data
kordex run main.js --allow-net --allow-softadastra
```

## Important note

`kordex:http` currently provides helper functions.

It does not yet perform real HTTP requests.

Use it today for:

```txt
URL composition
method checks
status code handling
request metadata
local-first request records
```

Real network request APIs can be added later behind the same permission model.

## Recommended usage

Use `buildUrl()` instead of manually joining URLs:

```js
const url = buildUrl("https://api.example.com", "/users");
```

Normalize methods before storing or comparing them:

```js
const method = normalizeMethod("post");
```

Validate methods before accepting user input:

```js
if (!isMethod(method)) {
  throw new Error("Invalid method");
}
```

Classify responses with status helpers:

```js
if (isSuccess(status)) {
  console.log("ok");
}
```

Store request metadata locally when building offline-ready flows:

```js
const key = "request:" + hash(method + ":" + url);
```

## Common errors

### Missing permission

Wrong:

```bash
kordex run main.js
```

when the script uses:

```js
import { buildUrl } from "kordex:http";
```

Correct:

```bash
kordex run main.js --allow-net
```

### Wrong module name

Wrong:

```js
import { buildUrl } from "http";
```

Correct:

```js
import { buildUrl } from "kordex:http";
```

Kordex standard modules use the `kordex:` prefix.

### Wrong function names

Wrong:

```js
import { status_text } from "kordex:http";
```

Correct:

```js
import { statusText } from "kordex:http";
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

### Expecting real network requests

Wrong expectation:

```js
import { get } from "kordex:http";

const response = get("https://api.example.com");
```

`kordex:http` does not provide real request functions yet.

Use it for helpers today.

### Passing a non-number status

Wrong:

```js
statusText("200");
```

Better:

```js
statusText(200);
```

Status helpers expect numbers.

### Passing an empty URL part

Wrong:

```js
buildUrl("", "/users");
```

Correct:

```js
buildUrl("https://api.example.com", "/users");
```

### Giving unrelated permissions

Wrong:

```bash
kordex run main.js --allow-net --allow-fs --allow-env --allow-process
```

when the script only uses `kordex:http`.

Better:

```bash
kordex run main.js --allow-net
```

## Related pages

- [HTTP module](../modules/http.md)
- [Permissions](../guide/permissions.md)
- [Imports](../guide/imports.md)
- [Environment variables](./environment-variables.md)
- [Hashing](./hashing.md)
- [Softadastra storage](./softadastra-storage.md)
