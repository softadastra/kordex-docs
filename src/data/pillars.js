export const pillars = [
  {
    number: "01",
    title: "Run locally",
    shortTitle: "Local execution",
    text: "Run JavaScript and TypeScript close to the machine, without depending on a server before the app becomes useful.",
    points: [
      "JavaScript file execution",
      "TypeScript MVP support",
      "Local imports",
      "JSON imports",
      "Project entry from kordex.json",
    ],
  },
  {
    number: "02",
    title: "Grant explicitly",
    shortTitle: "Visible native power",
    text: "Native capabilities are not silent. Filesystem, environment, process, network, and storage access are enabled with clear flags.",
    points: [
      "--allow-fs for files",
      "--allow-env for environment variables",
      "--allow-net for HTTP helpers",
      "--allow-process for shell commands",
      "--allow-softadastra for local-first storage",
    ],
  },
  {
    number: "03",
    title: "Store durably",
    shortTitle: "Local-first state",
    text: "Write useful application state locally first through Softadastra foundations, then prepare for synchronization later.",
    points: [
      "Durable local store",
      "Stable local keys",
      "Offline-ready workflows",
      "Sync-ready direction",
      "Softadastra storage module",
    ],
  },
];

export const positioningPillars = [
  {
    label: "Local first",
    value: "Useful before the network is available.",
  },
  {
    label: "Permission first",
    value: "Native power is visible at the command line.",
  },
  {
    label: "State first",
    value: "Applications can write durable local state before syncing.",
  },
];
