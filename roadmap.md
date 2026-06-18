# Roadmap

Kordex is moving toward a JavaScript and TypeScript runtime for reliable local-first applications.

The goal is not to copy Node.js, Deno, or Bun.

The goal is to make JavaScript useful for applications that must keep working locally, even when the network is unstable.

```txt
JavaScript
+ explicit permissions
+ native modules
+ local durable state
+ offline-ready workflows
```

## Current status

Kordex is early-stage.

The foundation is already in place:

- JavaScript execution
- TypeScript MVP loading
- local relative imports
- JSON imports
- `kordex:` standard modules
- explicit runtime permissions
- project entry resolution from `kordex.json`
- project entry resolution from `package.json`
- CLI workflow
- build workflow
- package install/update foundations
- `kordex.lock`
- Linux x64 npm package distribution
- Softadastra local-first storage module foundation

## Direction

Kordex is built around one idea:

```txt
Reliable local-first JavaScript.
```

That means:

- scripts can run locally
- native capabilities are explicit
- local state can be written before sync
- offline mode is part of the design
- apps can continue working without a perfect network
- C++ native modules can expose fast system features safely

## Runtime roadmap

### JavaScript execution

Current:

- JavaScript files can run
- local imports are supported
- JSON imports are supported
- QuickJS backend foundation exists

Planned:

- stronger ES module support
- better runtime errors
- better stack traces
- better diagnostics
- more complete JavaScript runtime behavior
- improved module loading performance

## TypeScript roadmap

Current:

- `.ts` files can run
- basic TypeScript syntax can be transformed
- TypeScript support is MVP-level

Planned:

- fuller TypeScript syntax support
- better TypeScript diagnostics
- stricter checking mode
- better unsupported syntax warnings
- optional full TypeScript compiler integration
- better source map support

## Module system roadmap

Current:

- relative imports work
- extension resolution works
- directory index imports work
- JSON imports work
- `kordex:` native modules work

Planned:

- package import resolution
- improved module cache
- better circular dependency handling
- native ES module execution path
- better error messages for missing modules
- package registry integration

## Standard modules roadmap

Current modules:

```txt
kordex:console
kordex:path
kordex:timer
kordex:crypto
kordex:fs
kordex:env
kordex:process
kordex:http
kordex:softadastra
```

Current direction:

- safe utility modules stay available by default
- sensitive modules require explicit permission
- modules use stable `kordex:` imports

Planned:

- richer filesystem APIs
- better HTTP/network APIs
- stronger crypto backend
- better process controls
- more local-first storage helpers
- clearer permission errors
- richer documentation examples for every module

## Permissions roadmap

Current permission flags:

```txt
--allow-fs
--allow-env
--allow-net
--allow-process
--allow-softadastra
```

Current behavior:

- sensitive modules are disabled unless permission is passed
- permissions are visible at command execution time

Planned:

- permission profiles
- project-level permission declarations
- better plugin permission isolation
- better permission error messages
- dry-run permission inspection
- command-level permission summaries

## CLI roadmap

Current commands:

```txt
kordex help
kordex init
kordex run
kordex repl
kordex check
kordex build
kordex install
kordex update
kordex version
```

Planned:

- better `kordex init` templates
- improved `kordex check`
- better `kordex build` reports
- richer `kordex repl`
- clearer JSON output
- better install/update registry behavior
- better project discovery messages
- better plugin command execution

## Build roadmap

Current:

- single file build
- project build
- output to `dist`
- optional source map generation foundation
- project entry resolution

Planned:

- better bundling output
- richer source maps
- minification improvements
- build cache
- dependency graph reporting
- production build profile
- watch mode

## Package roadmap

Current:

- `kordex install`
- `kordex update`
- dependency metadata foundation
- `kordex.lock`

Planned:

- real package downloads from registry
- package integrity checks
- package cache
- package import resolution
- registry authentication
- package publishing workflow
- lockfile verification
- offline package cache mode

## Plugin roadmap

Current:

- plugin command definitions can be read from project configuration
- plugin permissions are declared separately
- plugin commands cannot override built-in commands

Planned:

- real plugin command execution
- plugin isolation
- plugin install/update workflow
- plugin templates
- plugin permission reports
- plugin documentation format
- plugin registry support

## Softadastra roadmap

Current:

- `kordex:softadastra` exists as a local-first storage module
- scripts can open a local store
- scripts can put, get, remove, and check values
- scripts can inspect local state

Planned:

- deeper Softadastra SDK integration
- richer local store APIs
- sync state improvements
- better node metadata
- conflict handling helpers
- local-first app examples
- durable queue examples
- offline-first recipes
- sync workflow recipes

## Documentation roadmap

Current documentation sections:

```txt
guide/
cli/
modules/
recipes/
reference/
```

Planned:

- complete guide pages
- complete CLI reference
- complete module examples
- recipes for real local-first workflows
- installation script page
- package registry page
- plugin development guide
- local-first app tutorial
- migration notes from Node.js, Deno, and Bun

## Website roadmap

The site at:

```txt
kordex.softadastra.com
```

will include:

- landing page
- installation guide
- getting started guide
- CLI documentation
- standard module documentation
- recipes
- reference pages
- roadmap
- changelog
- `/install` script endpoint

The `/install` endpoint will be used later for simple installation with `curl`.

## Platform roadmap

Current package direction:

```txt
kordex
@softadastra/kordex-linux-x64
```

Planned platforms:

- Linux x64
- Linux arm64
- macOS arm64
- macOS x64
- Windows x64

## Short-term priorities

1. Finish the public documentation site.
2. Keep examples focused on JavaScript usage.
3. Improve install experience.
4. Stabilize `kordex run`.
5. Stabilize standard module imports.
6. Improve permission errors.
7. Improve TypeScript MVP behavior.
8. Improve build output.
9. Prepare the package registry workflow.
10. Prepare real local-first examples with Softadastra.

## Long-term direction

Kordex should become a runtime for apps where local reliability matters.

Examples:

- offline-ready tools
- local-first dashboards
- scripts that write local state first
- sync-ready applications
- edge/local workers
- embedded JavaScript workflows
- developer tools that need native power with clear permissions

The final direction:

```txt
A small, reliable JavaScript runtime
for local-first applications
powered by C++ native foundations.
```

## What Kordex is not

Kordex is not trying to replace every JavaScript runtime.

It is not trying to become a full Node.js clone.

It is not only a bundler.

It is not only a CLI.

Kordex is focused on reliability, local execution, explicit permissions, and local-first application design.

## What Kordex is building toward

Kordex is building toward this:

```txt
Run JavaScript locally.
Use native power safely.
Write data locally first.
Sync when possible.
Keep working when the network fails.
```
