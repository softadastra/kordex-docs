export const availableToday = [
  {
    title: "JavaScript execution",
    description: "Run JavaScript files with the Kordex CLI.",
  },
  {
    title: "TypeScript MVP",
    description:
      "Run simple TypeScript files while support continues to mature.",
  },
  {
    title: "Local imports",
    description:
      "Use relative imports, extension resolution, directory imports, and JSON imports.",
  },
  {
    title: "Project entry",
    description:
      "Resolve project entries from kordex.json and supported package.json fields.",
  },
  {
    title: "Explicit permissions",
    description:
      "Use visible flags for filesystem, environment, process, network, and Softadastra access.",
  },
  {
    title: "Native kordex: modules",
    description:
      "Use Kordex standard modules through the kordex: import prefix.",
  },
  {
    title: "Softadastra storage foundation",
    description:
      "Open a local store, write values, read values, inspect state, and close it.",
  },
  {
    title: "CLI workflow",
    description:
      "Use init, run, repl, check, build, install, update, and version commands.",
  },
];

export const comingNext = [
  {
    title: "Stronger TypeScript support",
    description:
      "Improve TypeScript transformation, diagnostics, and unsupported syntax reporting.",
  },
  {
    title: "Richer HTTP APIs",
    description:
      "Move beyond HTTP helpers toward real network request capabilities.",
  },
  {
    title: "Package registry workflow",
    description:
      "Improve install, update, registry integration, package resolution, and lockfile behavior.",
  },
  {
    title: "Plugin execution",
    description:
      "Turn plugin command definitions into a stronger project automation system.",
  },
  {
    title: "Better local-first examples",
    description:
      "Add practical examples for durable local state, sync queues, and offline-ready apps.",
  },
  {
    title: "More platforms",
    description: "Expand native package distribution beyond Linux x64.",
  },
];

export const roadmapLanes = [
  {
    title: "Runtime",
    items: [
      "better ES module behavior",
      "better stack traces",
      "better runtime diagnostics",
      "improved module loading",
    ],
  },
  {
    title: "Local-first",
    items: [
      "richer Softadastra APIs",
      "sync-state improvements",
      "durable queue examples",
      "conflict-handling direction",
    ],
  },
  {
    title: "Developer experience",
    items: [
      "better init templates",
      "clearer permission errors",
      "build reports",
      "watch mode direction",
    ],
  },
  {
    title: "Packages and plugins",
    items: [
      "real package downloads",
      "integrity checks",
      "plugin isolation",
      "registry support",
    ],
  },
];

export const roadmapPrinciples = [
  "Stay focused on reliable local-first JavaScript.",
  "Do not become a Node.js clone.",
  "Make native power explicit and reviewable.",
  "Keep local state useful before the network is available.",
  "Build carefully instead of overpromising.",
];
