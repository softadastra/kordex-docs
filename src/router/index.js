import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import WhyKordex from "../pages/WhyKordex.vue";
import UseCases from "../pages/UseCases.vue";
import RuntimeModel from "../pages/RuntimeModel.vue";
import Modules from "../pages/Modules.vue";
import Roadmap from "../pages/Roadmap.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Kordex",
      description: "Reliable local-first JavaScript.",
    },
  },
  {
    path: "/why",
    name: "why",
    component: WhyKordex,
    meta: {
      title: "Why Kordex",
      description:
        "Why Kordex exists as a focused local-first JavaScript runtime.",
    },
  },
  {
    path: "/use-cases",
    name: "use-cases",
    component: UseCases,
    meta: {
      title: "Use Cases",
      description:
        "Where Kordex fits for JavaScript and TypeScript developers.",
    },
  },
  {
    path: "/runtime",
    name: "runtime",
    component: RuntimeModel,
    meta: {
      title: "Runtime Model",
      description:
        "The Kordex runtime model: local execution, native modules, and explicit permissions.",
    },
  },
  {
    path: "/modules",
    name: "modules",
    component: Modules,
    meta: {
      title: "Modules",
      description: "Kordex native modules with the kordex: import prefix.",
    },
  },
  {
    path: "/roadmap",
    name: "roadmap",
    component: Roadmap,
    meta: {
      title: "Roadmap",
      description: "What exists today and what comes next for Kordex.",
    },
  },
  {
    path: "/docs",
    name: "docs",
    beforeEnter() {
      window.location.href = "/docs/";
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.afterEach((to) => {
  const base = "Kordex";
  document.title =
    to.meta?.title && to.meta.title !== base
      ? `${to.meta.title} — ${base}`
      : base;
});

export default router;
