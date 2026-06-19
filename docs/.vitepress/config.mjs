import { defineConfig } from "vitepress";

const nav = [
  { text: "Guide", link: "/guide/getting-started" },
  { text: "CLI", link: "/cli/" },
  { text: "Modules", link: "/modules/" },
  { text: "Recipes", link: "/recipes/" },
  { text: "Reference", link: "/reference/" },
  { text: "Roadmap", link: "/roadmap" },
  { text: "Changelog", link: "/changelog" },
];

const guide = {
  text: "Guide",
  collapsed: false,
  items: [
    { text: "Getting Started", link: "/guide/getting-started" },
    { text: "Installation", link: "/guide/installation" },
    { text: "Project Structure", link: "/guide/project-structure" },
    { text: "Running Scripts", link: "/guide/running-scripts" },
    { text: "Permissions", link: "/guide/permissions" },
    { text: "Imports", link: "/guide/imports" },
    { text: "TypeScript", link: "/guide/typescript" },
    { text: "Local-first", link: "/guide/local-first" },
  ],
};

const cli = {
  text: "CLI",
  collapsed: false,
  items: [
    { text: "Overview", link: "/cli/" },
    { text: "init", link: "/cli/init" },
    { text: "run", link: "/cli/run" },
    { text: "repl", link: "/cli/repl" },
    { text: "check", link: "/cli/check" },
    { text: "build", link: "/cli/build" },
    { text: "install", link: "/cli/install" },
    { text: "update", link: "/cli/update" },
    { text: "version", link: "/cli/version" },
  ],
};

const modules = {
  text: "Modules",
  collapsed: false,
  items: [
    { text: "Overview", link: "/modules/" },
    { text: "console", link: "/modules/console" },
    { text: "path", link: "/modules/path" },
    { text: "timer", link: "/modules/timer" },
    { text: "crypto", link: "/modules/crypto" },
    { text: "fs", link: "/modules/fs" },
    { text: "env", link: "/modules/env" },
    { text: "process", link: "/modules/process" },
    { text: "http", link: "/modules/http" },
    { text: "softadastra", link: "/modules/softadastra" },
  ],
};

const recipes = {
  text: "Recipes",
  collapsed: true,
  items: [
    { text: "Overview", link: "/recipes/" },
    { text: "Hello World", link: "/recipes/hello-world" },
    { text: "Read and Write Files", link: "/recipes/read-write-files" },
    { text: "Environment Variables", link: "/recipes/environment-variables" },
    { text: "Path Utilities", link: "/recipes/path-utilities" },
    { text: "Hashing", link: "/recipes/hashing" },
    { text: "HTTP Helpers", link: "/recipes/http-helpers" },
    { text: "Softadastra Storage", link: "/recipes/softadastra-storage" },
  ],
};

const reference = {
  text: "Reference",
  collapsed: true,
  items: [
    { text: "Overview", link: "/reference/" },
    { text: "kordex.json", link: "/reference/kordex-json" },
    { text: "package.json", link: "/reference/package-json" },
    { text: "Permissions", link: "/reference/permissions" },
    { text: "Module Imports", link: "/reference/module-imports" },
  ],
};

const project = {
  text: "Project",
  collapsed: true,
  items: [
    { text: "Roadmap", link: "/roadmap" },
    { text: "Changelog", link: "/changelog" },
  ],
};

const sidebar = [guide, cli, modules, recipes, reference, project];

const redirectDocsDevRootToVueHome = {
  name: "redirect-docs-dev-root-to-vue-home",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === "/" || req.url === "/index.html") {
        res.statusCode = 302;
        res.setHeader("Location", "http://localhost:5173/");
        res.end();
        return;
      }

      next();
    });
  },
};

export default defineConfig({
  lang: "en-US",

  title: "Kordex Documentation",
  description:
    "Kordex is a JavaScript and TypeScript runtime for reliable local-first applications.",

  base: "/docs/",
  outDir: "../dist/docs",

  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    html: true,
    lineNumbers: true,
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/docs/favicon.svg" }],
    ["link", { rel: "icon", href: "/docs/favicon.svg" }],
    ["link", { rel: "apple-touch-icon", href: "/docs/logo.png" }],

    ["meta", { name: "theme-color", content: "#0b0e14" }],
    ["meta", { name: "mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Kordex Docs" }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Kordex Documentation" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Learn how to build reliable local-first JavaScript and TypeScript applications with Kordex.",
      },
    ],
    ["meta", { property: "og:site_name", content: "Kordex Documentation" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Kordex Documentation" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Kordex is a JavaScript and TypeScript runtime for reliable local-first applications.",
      },
    ],
  ],

  vite: {
    plugins: [redirectDocsDevRootToVueHome],

    optimizeDeps: {
      include: ["mark.js", "minisearch"],
    },

    ssr: {
      noExternal: ["mark.js"],
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            if (id.includes("minisearch")) return "minisearch";
            if (id.includes("mark.js")) return "markjs";

            return "vendor";
          },
        },
      },
    },
  },

  themeConfig: {
    siteTitle: "Kordex",
    logo: "/logo.png",

    appearance: true,

    nav,
    sidebar,

    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/softadastra/kordex",
      },
      {
        icon: "x",
        link: "https://x.com/softadastra",
      },
    ],

    outline: {
      level: "deep",
      label: "On this page",
    },

    returnToTopLabel: "Back to top",

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },

    editLink: {
      pattern: "https://github.com/softadastra/kordex-docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Softadastra",
    },
  },
});
