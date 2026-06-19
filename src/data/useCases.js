export const useCases = [
  {
    title: "Offline-ready internal tools",
    label: "Local-first apps",
    description:
      "Build tools that remain useful when the network is slow, unstable, or unavailable.",
    points: [
      "write local state first",
      "run without a backend dependency",
      "sync later when the network returns",
    ],
  },
  {
    title: "Field data capture",
    label: "Real-world reliability",
    description:
      "Use Kordex for scripts and apps that collect data locally before sending it elsewhere.",
    points: ["field usage", "unstable internet", "local durable records"],
  },
  {
    title: "Local-first developer tools",
    label: "Developer workflow",
    description:
      "Create local tools that need predictable native access and durable state without starting from a server.",
    points: ["local config", "local cache", "repeatable scripts"],
  },
  {
    title: "Edge and local workers",
    label: "Close to the machine",
    description:
      "Run small JavaScript workers near files, devices, local data, or native system capabilities.",
    points: ["native modules", "explicit permissions", "small runtime surface"],
  },
  {
    title: "Controlled automation",
    label: "Safe native power",
    description:
      "Build automation scripts where filesystem, process, environment, network, and storage access are visible.",
    points: [
      "reviewable commands",
      "permission-aware scripts",
      "clear native boundaries",
    ],
  },
  {
    title: "Sync-ready applications",
    label: "Future direction",
    description:
      "Prepare applications around a local-first model where local writes come before remote synchronization.",
    points: [
      "local durable state",
      "sync metadata",
      "offline-first architecture",
    ],
  },
];

export const audienceSegments = [
  {
    title: "JavaScript developers",
    description:
      "Developers who want JavaScript outside the browser and beyond a server-first model.",
  },
  {
    title: "TypeScript developers",
    description:
      "Developers who want simple TypeScript execution today and stronger support as Kordex evolves.",
  },
  {
    title: "Tool builders",
    description:
      "Engineers building CLIs, internal tools, automation scripts, and local-first workflows.",
  },
  {
    title: "Local-first builders",
    description:
      "Teams that care about offline reliability, durable local state, and sync-ready architecture.",
  },
];

export const useCaseSummary = [
  "offline-ready tools",
  "field apps",
  "local automation",
  "sync-ready workflows",
  "native-powered scripts",
];
