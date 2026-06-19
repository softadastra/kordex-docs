import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Download from "./pages/Download.vue";

import "./style.css";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/download", component: Download },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
