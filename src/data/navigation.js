export const navigation = [
  {
    label: "Why Kordex",
    to: "/why",
    type: "route",
  },
  {
    label: "Use Cases",
    to: "/use-cases",
    type: "route",
  },
  {
    label: "Runtime",
    to: "/runtime",
    type: "route",
  },
  {
    label: "Modules",
    to: "/modules",
    type: "route",
  },
  {
    label: "Docs",
    href: "/docs/",
    type: "external",
  },
];

export const headerActions = [
  {
    label: "Docs",
    href: "/docs/",
    variant: "secondary",
  },
  {
    label: "Get started",
    href: "/docs/guide/getting-started.html",
    variant: "primary",
  },
];

export const footerGroups = [
  {
    title: "Product",
    links: [
      {
        label: "Why Kordex",
        to: "/why",
      },
      {
        label: "Use Cases",
        to: "/use-cases",
      },
      {
        label: "Runtime Model",
        to: "/runtime",
      },
      {
        label: "Roadmap",
        to: "/roadmap",
      },
    ],
  },
  {
    title: "Developers",
    links: [
      {
        label: "Documentation",
        href: "/docs/",
      },
      {
        label: "Getting Started",
        href: "/docs/guide/getting-started.html",
      },
      {
        label: "CLI",
        href: "/docs/cli/",
      },
      {
        label: "Modules",
        href: "/docs/modules/",
      },
    ],
  },
  {
    title: "Reference",
    links: [
      {
        label: "kordex.json",
        href: "/docs/reference/kordex-json.html",
      },
      {
        label: "Permissions",
        href: "/docs/reference/permissions.html",
      },
      {
        label: "Module Imports",
        href: "/docs/reference/module-imports.html",
      },
      {
        label: "Changelog",
        href: "/docs/changelog.html",
      },
    ],
  },
];
