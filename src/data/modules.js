export const modules = [
  {
    name: "kordex:console",
    category: "Safe utility",
    permission: "none",
    status: "Available",
    description: "Explicit console helpers for Kordex scripts.",
    exports: ["log", "info", "warn", "error", "debug"],
    docs: "/docs/modules/console.html",
  },
  {
    name: "kordex:path",
    category: "Safe utility",
    permission: "none",
    status: "Available",
    description:
      "Portable path helpers for joining, normalizing, and inspecting paths.",
    exports: [
      "normalize",
      "join",
      "dirname",
      "basename",
      "extension",
      "isAbsolute",
      "isRelative",
    ],
    docs: "/docs/modules/path.html",
  },
  {
    name: "kordex:timer",
    category: "Safe utility",
    permission: "none",
    status: "Available",
    description: "Time helpers for timestamps, elapsed time, and short pauses.",
    exports: ["now", "sleep", "unixMs"],
    docs: "/docs/modules/timer.html",
  },
  {
    name: "kordex:crypto",
    category: "Safe utility",
    permission: "none",
    status: "Available",
    description:
      "Utility primitives for stable hashes, random values, and equality checks.",
    exports: ["hash", "random", "randomInt", "equals"],
    docs: "/docs/modules/crypto.html",
  },
  {
    name: "kordex:fs",
    category: "Permission gated",
    permission: "--allow-fs",
    status: "Available",
    description:
      "Filesystem helpers for reading, writing, checking, and removing files.",
    exports: [
      "exists",
      "isFile",
      "isDirectory",
      "readText",
      "writeText",
      "remove",
    ],
    docs: "/docs/modules/fs.html",
  },
  {
    name: "kordex:env",
    category: "Permission gated",
    permission: "--allow-env",
    status: "Available",
    description: "Environment variable helpers for runtime configuration.",
    exports: ["get", "has", "set", "unset"],
    docs: "/docs/modules/env.html",
  },
  {
    name: "kordex:process",
    category: "Permission gated",
    permission: "--allow-process",
    status: "Available",
    description:
      "Process helpers for cwd, directory changes, and trusted shell commands.",
    exports: ["cwd", "chdir", "run"],
    docs: "/docs/modules/process.html",
  },
  {
    name: "kordex:http",
    category: "Permission gated",
    permission: "--allow-net",
    status: "Helper module",
    description:
      "HTTP helpers for status codes, method normalization, validation, and URL building.",
    exports: [
      "isSuccess",
      "isRedirect",
      "isClientError",
      "isServerError",
      "statusText",
      "buildUrl",
      "normalizeMethod",
      "isMethod",
    ],
    docs: "/docs/modules/http.html",
  },
  {
    name: "kordex:softadastra",
    category: "Local-first storage",
    permission: "--allow-softadastra",
    status: "Foundation",
    description:
      "Softadastra local-first storage primitives for durable local application state.",
    exports: [
      "open",
      "close",
      "isOpen",
      "put",
      "get",
      "remove",
      "contains",
      "size",
      "tick",
      "syncState",
      "nodeInfo",
    ],
    docs: "/docs/modules/softadastra.html",
  },
];

export const moduleGroups = [
  {
    title: "Safe by default",
    description: "Utility modules that do not need extra runtime permissions.",
    modules: ["kordex:console", "kordex:path", "kordex:timer", "kordex:crypto"],
  },
  {
    title: "Explicit native access",
    description:
      "Powerful native capabilities enabled only with visible command-line flags.",
    modules: ["kordex:fs", "kordex:env", "kordex:process", "kordex:http"],
  },
  {
    title: "Local-first foundation",
    description:
      "Durable local state powered by Softadastra storage primitives.",
    modules: ["kordex:softadastra"],
  },
];

export const permissionMap = [
  {
    module: "kordex:fs",
    permission: "--allow-fs",
    capability: "Filesystem access",
  },
  {
    module: "kordex:env",
    permission: "--allow-env",
    capability: "Environment variables",
  },
  {
    module: "kordex:http",
    permission: "--allow-net",
    capability: "Network capability family",
  },
  {
    module: "kordex:process",
    permission: "--allow-process",
    capability: "Process and shell commands",
  },
  {
    module: "kordex:softadastra",
    permission: "--allow-softadastra",
    capability: "Durable local-first storage",
  },
];
