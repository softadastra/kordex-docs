<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import DefaultTheme from "vitepress/theme";
import { useRoute, withBase } from "vitepress";
import Breadcrumb from "./Breadcrumb.vue";

const { Layout } = DefaultTheme;
const route = useRoute();

const showBanner = ref(true);
const isDark = ref(true);

const navLinks = [
  { text: "Guide", href: "/guide/getting-started" },
  { text: "CLI", href: "/cli/" },
  { text: "Modules", href: "/modules/" },
  { text: "Recipes", href: "/recipes/" },
  { text: "Reference", href: "/reference/" },
  { text: "Roadmap", href: "/roadmap" },
  { text: "Changelog", href: "/changelog" },
];

const footerLinks = [
  { text: "Docs", href: "/" },
  { text: "Guide", href: "/guide/getting-started" },
  { text: "CLI", href: "/cli/" },
  { text: "Modules", href: "/modules/" },
  { text: "Recipes", href: "/recipes/" },
  { text: "Reference", href: "/reference/" },
  { text: "Roadmap", href: "/roadmap" },
  { text: "Changelog", href: "/changelog" },
  { text: "GitHub", href: "https://github.com/softadastra/kordex" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/softadastra/kordex",
    icon: `<path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>`,
  },
];

const isExternalLink = (href) => {
  return /^https?:\/\//.test(href);
};

const resolveHref = (href) => {
  if (!href) {
    return withBase("/");
  }

  if (isExternalLink(href)) {
    return href;
  }

  return withBase(href);
};

const normalizePath = (path) => {
  if (!path) {
    return "/";
  }

  let clean = path.split("#")[0].split("?")[0];

  if (clean.startsWith("/docs/")) {
    clean = clean.slice("/docs".length);
  }

  if (clean === "/docs") {
    clean = "/";
  }

  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.slice(0, -1);
  }

  return clean;
};

const isActiveLink = (href) => {
  if (!href || isExternalLink(href)) {
    return false;
  }

  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(href);

  if (targetPath === "/") {
    return currentPath === "/";
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
};

const openSearch = () => {
  const searchButton = document.querySelector(
    ".DocSearch-Button, .VPNavBarSearchButton, .VPLocalSearchBox button",
  );

  if (searchButton instanceof HTMLElement) {
    searchButton.click();
  }
};

const applyTheme = (dark) => {
  isDark.value = dark;

  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("vitepress-theme-appearance", dark ? "dark" : "light");
};

const toggleTheme = () => {
  applyTheme(!isDark.value);
};

const syncHeaderState = async () => {
  await nextTick();

  document.body.classList.toggle("kordex-banner-visible", showBanner.value);
  document.body.classList.toggle("kordex-banner-hidden", !showBanner.value);
};

const closeBanner = () => {
  showBanner.value = false;
};

watch(showBanner, () => {
  syncHeaderState();
});

onMounted(() => {
  const savedTheme = localStorage.getItem("vitepress-theme-appearance");

  if (savedTheme === "dark") {
    applyTheme(true);
  } else if (savedTheme === "light") {
    applyTheme(false);
  } else {
    isDark.value = document.documentElement.classList.contains("dark");
  }

  syncHeaderState();
});

onBeforeUnmount(() => {
  document.body.classList.remove(
    "kordex-banner-visible",
    "kordex-banner-hidden",
  );
});
</script>

<template>
  <header class="kordex-nav">
    <div v-if="showBanner" class="kordex-nav__banner">
      <span class="kordex-nav__banner-mark" aria-hidden="true">
        <img src="/logo.png" alt="" />
      </span>

      <span
        >Kordex is a JavaScript and TypeScript runtime for reliable local-first
        applications.</span
      >

      <a
        href="https://github.com/softadastra/kordex"
        target="_blank"
        rel="noreferrer"
        aria-label="Open the Kordex GitHub repository"
      >
        View on GitHub
      </a>

      <button
        class="kordex-nav__banner-close"
        type="button"
        aria-label="Close announcement"
        @click="closeBanner"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>

    <div class="kordex-nav__bar">
      <div class="kordex-nav__inner">
        <a class="kordex-nav__brand" href="/" aria-label="Kordex Documentation">
          <span class="kordex-nav__brand-mark" aria-hidden="true">
            <img src="/logo.png" alt="" />
          </span>

          <span class="kordex-nav__brand-name">Kordex</span>
          <span class="kordex-nav__slash">/</span>
          <span class="kordex-nav__docs">Docs</span>
        </a>

        <nav class="kordex-nav__links" aria-label="Main navigation">
          <a
            v-for="link in navLinks"
            :key="link.text"
            :class="[
              'kordex-nav__link',
              { 'is-active': isActiveLink(link.href) },
            ]"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ link.text }}
          </a>
        </nav>

        <div class="kordex-nav__right">
          <button
            class="kordex-nav__theme"
            type="button"
            :aria-label="
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            "
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M12 4V2" />
              <path d="M12 22v-2" />
              <path d="m4.93 4.93-1.41-1.41" />
              <path d="m20.48 20.48-1.41-1.41" />
              <path d="M4 12H2" />
              <path d="M22 12h-2" />
              <path d="m4.93 19.07-1.41 1.41" />
              <path d="m20.48 3.52-1.41 1.41" />
              <circle cx="12" cy="12" r="4" />
            </svg>

            <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.8 6.8 0 0 0 9.8 9.8Z" />
            </svg>
          </button>

          <a
            v-for="item in socials"
            :key="item.label"
            class="kordex-nav__icon"
            :href="item.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="item.label"
          >
            <svg
              class="kordex-nav__social-svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              v-html="item.icon"
            ></svg>
          </a>

          <button
            class="kordex-nav__search"
            type="button"
            aria-label="Search"
            @click="openSearch"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <span>Search Docs</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="kordex-doc-shell">
    <Layout>
      <template #doc-before>
        <Breadcrumb />
      </template>

      <template #layout-bottom>
        <footer class="kordex-footer" role="contentinfo">
          <div class="kordex-footer-inner">
            <div class="kordex-footer-brand">
              <span class="kordex-footer-name">Kordex</span>
              <span class="kordex-footer-desc">
                JavaScript and TypeScript runtime for reliable local-first
                applications.
              </span>
            </div>

            <nav class="kordex-footer-nav" aria-label="Footer navigation">
              <a
                v-for="link in footerLinks"
                :key="link.text"
                class="kordex-footer-link"
                :href="link.href"
                :target="link.href.startsWith('http') ? '_blank' : undefined"
                :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
              >
                {{ link.text }}
              </a>
            </nav>
          </div>

          <div class="kordex-footer-meta">
            <span>MIT License</span>
            <span>Copyright © 2026 Softadastra</span>
            <span
              >Built for local-first JavaScript and TypeScript
              applications</span
            >
          </div>
        </footer>
      </template>
    </Layout>
  </div>
</template>

<style>
:root {
  --kordex-doc-sidebar-width: 250px;
  --kx-accent: #22c55e;
  --kx-accent-strong: #4ade80;
  --kx-accent-soft: rgba(34, 197, 94, 0.12);
  --kx-accent-border: rgba(34, 197, 94, 0.28);
}

@media (min-width: 1440px) {
  :root {
    --kordex-doc-sidebar-width: 250px;
  }
}

.VPNav {
  display: none !important;
}

.VPFooter {
  display: none !important;
}

.VPContent {
  padding-top: 0 !important;
}

/* ============================================================
   Kordex custom documentation header
   ============================================================ */

.kordex-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 10000;
  width: 100%;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg) !important;
  border-bottom: 1px solid var(--vp-c-divider);
}

.kordex-nav__banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  padding: 8px 56px;
  color: var(--vp-c-text-1);
  background:
    radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.14), transparent 42%),
    var(--vp-c-bg) !important;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.2;
  text-align: center;
}

.kordex-nav__banner a {
  color: var(--kx-accent-strong) !important;
  font-weight: 760;
  text-decoration: underline !important;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
  white-space: nowrap;
}

.kordex-nav__banner a:hover {
  color: #86efac !important;
  text-decoration: underline !important;
}

.kordex-nav__banner-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 3px;
  flex-shrink: 0;
}

.kordex-nav__banner-mark img {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  object-fit: contain;
}

.kordex-nav__banner-close {
  position: absolute;
  top: 50%;
  right: 16px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transform: translateY(-50%);
}

.kordex-nav__banner-close:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.kordex-nav__banner-close span {
  font-size: 24px;
  line-height: 1;
}

.kordex-nav__bar {
  height: 60px;
  background: var(--vp-c-bg) !important;
}

.kordex-nav__inner {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr) auto;
  align-items: center;
  gap: 26px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 18px;
  background: var(--vp-c-bg) !important;
}

.kordex-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  color: var(--vp-c-text-1);
  text-decoration: none;
  white-space: nowrap;
}

.kordex-nav__brand:hover {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.kordex-nav__brand-mark {
  display: inline-flex;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.kordex-nav__brand-mark img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  object-fit: contain;
}

.kordex-nav__brand-name {
  font-size: 17px;
  font-weight: 780;
  letter-spacing: -0.035em;
}

.kordex-nav__slash {
  color: var(--vp-c-text-2);
  font-size: 18px;
  font-weight: 500;
}

.kordex-nav__docs {
  color: var(--vp-c-text-1);
  font-size: 17px;
  font-weight: 720;
  letter-spacing: -0.03em;
}

.kordex-nav__links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  min-width: 0;
  overflow: hidden;
}

.kordex-nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 13.5px;
  font-weight: 620;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color 0.14s ease,
    background-color 0.14s ease;
}

.kordex-nav__link:hover {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.kordex-nav__link.is-active {
  color: var(--vp-c-text-1) !important;
  font-weight: 760 !important;
}

.kordex-nav__link.is-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  display: block;
  height: 2px;
  border-radius: 999px;
  background: var(--kx-accent);
}

.kordex-nav__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-width: 0;
}

.kordex-nav__theme,
.kordex-nav__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-1) !important;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  opacity: 1 !important;
  flex-shrink: 0;
  transition:
    background 0.14s ease,
    border-color 0.14s ease,
    transform 0.14s ease;
}

.kordex-nav__theme {
  border-radius: 999px;
}

.kordex-nav__theme:hover,
.kordex-nav__icon:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--kx-accent);
  transform: translateY(-1px);
}

.kordex-nav__theme svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.kordex-nav__social-svg {
  display: block;
  width: 17px;
  height: 17px;
  color: currentColor !important;
  fill: currentColor !important;
}

.kordex-nav__social-svg path {
  fill: currentColor !important;
}

.kordex-nav__search {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 36px;
  padding: 0 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
}

.kordex-nav__search:hover {
  background: var(--vp-c-bg-alt);
  border-color: var(--kx-accent);
}

.kordex-nav__search svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.kordex-nav__search span {
  font-size: 13px;
  font-weight: 650;
  white-space: nowrap;
}

.kordex-nav__search kbd {
  color: var(--vp-c-text-2);
  background: transparent;
  border: 0;
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* ============================================================
   Kordex documentation footer
   ============================================================ */

.kordex-footer {
  position: relative;
  flex-shrink: 0;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.kordex-footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 32px 14px;
  display: grid;
  grid-template-columns: minmax(220px, auto) 1fr;
  align-items: center;
  gap: 24px;
}

.kordex-footer-brand {
  min-width: 0;
}

.kordex-footer-name {
  display: block;
  font-size: 13px;
  line-height: 1.3;
  font-weight: 760;
  letter-spacing: -0.015em;
  color: var(--vp-c-text-1);
}

.kordex-footer-desc {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  line-height: 1.45;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.kordex-footer-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  flex-wrap: wrap;
}

.kordex-footer-link {
  font-size: 12px;
  line-height: 1.4;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.12s ease;
}

.kordex-footer-link:hover {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.kordex-footer-meta {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: 10px 32px 16px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 11.5px;
  line-height: 1.45;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.kordex-footer-meta::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc(-1 * var(--kordex-doc-sidebar-width, 250px));
  right: 0;
  height: 1px;
  background: var(--vp-c-divider);
}

/* ============================================================
   Responsive layout
   ============================================================ */

@media (max-width: 1180px) {
  .kordex-nav__inner {
    gap: 18px;
  }

  .kordex-nav__links {
    gap: 14px;
  }

  .kordex-nav__link {
    font-size: 13px;
  }

  .kordex-nav__search span {
    display: none;
  }
}

@media (min-width: 960px) {
  .kordex-footer {
    margin-left: 0 !important;
    padding-left: var(--kordex-doc-sidebar-width, 250px);
    border-left: 0 !important;
  }

  .kordex-footer-inner,
  .kordex-footer-meta {
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 980px) {
  .kordex-nav__bar {
    height: auto;
    min-height: 58px;
  }

  .kordex-nav__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 14px;
    padding: 12px 14px;
  }

  .kordex-nav__brand {
    order: 1;
    flex: 1 1 auto;
  }

  .kordex-nav__right {
    order: 2;
    flex: 0 0 auto;
  }

  .kordex-nav__links {
    order: 3;
    flex: 1 1 100%;
    width: 100%;
    gap: 8px;
    overflow-x: auto;
    padding: 4px 0 2px;
    scrollbar-width: none;
  }

  .kordex-nav__links::-webkit-scrollbar {
    display: none;
  }

  .kordex-nav__link {
    padding: 8px 10px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 999px;
    font-size: 12.5px;
    flex-shrink: 0;
  }

  .kordex-nav__link.is-active::after {
    display: none;
  }

  .kordex-nav__link.is-active {
    border-color: var(--kx-accent);
    background: var(--kx-accent-soft);
  }

  .kordex-nav__search {
    width: 32px;
    height: 32px;
    padding: 0;
    justify-content: center;
  }

  .kordex-nav__search kbd {
    display: none;
  }
}

@media (max-width: 959px) {
  .kordex-footer {
    margin-left: 0 !important;
    padding-left: 0 !important;
    border-left: 0;
  }

  .kordex-footer-meta::before {
    left: 0;
  }
}

@media (max-width: 640px) {
  .kordex-nav__banner {
    justify-content: flex-start;
    min-height: 38px;
    padding: 8px 44px 8px 12px;
    font-size: 11.5px;
    text-align: left;
  }

  .kordex-nav__banner-mark {
    width: 22px;
    height: 22px;
  }

  .kordex-nav__banner-mark img {
    width: 22px;
    height: 22px;
  }

  .kordex-nav__banner-close {
    right: 10px;
    width: 28px;
    height: 28px;
  }

  .kordex-nav__inner {
    padding: 10px 12px;
  }

  .kordex-nav__brand-mark {
    width: 28px;
    height: 28px;
  }

  .kordex-nav__brand-mark img {
    width: 28px;
    height: 28px;
  }

  .kordex-nav__brand-name {
    font-size: 15.5px;
    font-weight: 780;
  }

  .kordex-nav__slash,
  .kordex-nav__docs {
    display: none;
  }

  .kordex-nav__theme,
  .kordex-nav__icon,
  .kordex-nav__search {
    width: 30px;
    height: 30px;
  }

  .kordex-nav__right {
    gap: 6px;
  }
}

@media (max-width: 760px) {
  .kordex-footer-inner {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 16px 18px 12px;
  }

  .kordex-footer-nav {
    justify-content: flex-start;
    gap: 14px;
  }

  .kordex-footer-meta {
    padding: 10px 18px 14px;
    gap: 10px;
  }
}

@media (max-width: 420px) {
  .kordex-nav__banner {
    gap: 4px;
    font-size: 11px;
  }

  .kordex-nav__banner a {
    max-width: 116px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .kordex-nav__inner {
    gap: 8px;
  }

  .kordex-nav__link {
    padding: 7px 9px;
    font-size: 12px;
  }
}

@media (max-width: 460px) {
  .kordex-footer-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .kordex-footer-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* ============================================================
   Page offset for the fixed Kordex header
   ============================================================ */

.kordex-doc-shell {
  padding-top: 118px;
}

body.kordex-banner-hidden .kordex-doc-shell {
  padding-top: 78px;
}

@media (max-width: 980px) {
  .kordex-doc-shell {
    padding-top: 132px;
  }

  body.kordex-banner-hidden .kordex-doc-shell {
    padding-top: 92px;
  }
}

@media (max-width: 640px) {
  .kordex-doc-shell {
    padding-top: 122px;
  }

  body.kordex-banner-hidden .kordex-doc-shell {
    padding-top: 84px;
  }
}
</style>
