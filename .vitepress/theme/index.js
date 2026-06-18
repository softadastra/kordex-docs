import DefaultTheme from "vitepress/theme";
import "./custom.css";

import Layout from "./Layout.vue";
import DocsHomeHero from "./HomePage.vue";
import CodeTabs from "./CodeTabs.vue";
import CodeBlock from "./CodeBlock.vue";

import {
  highlightJs,
  highlightJson,
  highlightShell,
  highlightText,
  normalizeLang,
} from "./highlighter";

export default {
  ...DefaultTheme,

  Layout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);

    const { app, router } = ctx;

    app.component("DocsHomeHero", DocsHomeHero);
    app.component("CodeTabs", CodeTabs);
    app.component("CodeBlock", CodeBlock);

    if (typeof window === "undefined") {
      return;
    }

    /*
     * Disable browser scroll restoration for client-side navigation.
     * VitePress works as an SPA after the first load, so every page change
     * should start from a predictable scroll position.
     */
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
    });

    /*
     * Keep the Kordex documentation header height available to CSS.
     * Layout elements can use this value to offset anchors, sticky sections,
     * and custom navigation spacing.
     */
    const syncHeaderHeight = () => {
      const header = document.querySelector(".kordex-nav, .kx-nav, .VPNav");
      if (!header) {
        return;
      }

      const height = Math.ceil(header.getBoundingClientRect().height);
      const value = `${height}px`;

      document.documentElement.style.setProperty(
        "--kordex-header-height",
        value,
      );

      document.documentElement.style.setProperty("--kx-header-height", value);
    };

    window.addEventListener("load", syncHeaderHeight);
    window.addEventListener("resize", syncHeaderHeight);

    window.requestAnimationFrame(() => {
      syncHeaderHeight();
      setTimeout(syncHeaderHeight, 80);
    });

    const headerObserver = new MutationObserver(syncHeaderHeight);

    headerObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    /*
     * Escape raw text before assigning it to innerHTML.
     * This prevents unsupported code blocks from being interpreted as HTML.
     */
    const escapeHtml = (value) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    /*
     * Render code blocks with the local Kordex highlighter.
     * Supported languages are JavaScript, TypeScript, JSON, shell, and text.
     */
    const renderHighlightedCode = (raw, lang) => {
      if (lang === "js" || lang === "ts") {
        return highlightJs(raw);
      }

      if (lang === "json") {
        return highlightJson(raw);
      }

      if (lang === "shell") {
        return highlightShell(raw);
      }

      if (lang === "text") {
        return highlightText(raw);
      }

      return escapeHtml(raw);
    };

    /*
     * Apply syntax highlighting to native VitePress fenced code blocks.
     * Each block is marked after processing to avoid duplicate rendering.
     */
    const applyCodeHighlighting = () => {
      const blocks = document.querySelectorAll(
        '.vp-doc div[class*="language-"] code, .vp-doc [class*="language-"] code',
      );

      blocks.forEach((codeEl) => {
        if (codeEl.dataset.kordexHighlighted === "1") {
          return;
        }

        const container = codeEl.closest('[class*="language-"]');
        if (!container) {
          return;
        }

        const match = container.className.match(/language-([\w+-]+)/);
        const rawLang = match ? match[1] : "text";
        const lang = normalizeLang(rawLang);
        const raw = codeEl.textContent || "";

        codeEl.innerHTML = renderHighlightedCode(raw, lang);
        codeEl.dataset.kordexHighlighted = "1";

        container.classList.add("kordex-styled");
      });
    };

    /*
     * Schedule highlighting after VitePress has updated the page DOM.
     * The second pass catches wrappers such as line numbers that may mount
     * slightly after the first render.
     */
    const scheduleCodeHighlighting = () => {
      window.requestAnimationFrame(() => {
        applyCodeHighlighting();
        setTimeout(applyCodeHighlighting, 50);
      });
    };

    scheduleCodeHighlighting();

    /*
     * Re-run highlighting after every VitePress route change.
     */
    const previousAfterRouteChanged = router.onAfterRouteChanged;

    router.onAfterRouteChanged = (to) => {
      previousAfterRouteChanged?.(to);
      scheduleCodeHighlighting();
      window.scrollTo(0, 0);
    };

    /*
     * Handle code blocks inserted after the initial page render.
     * This keeps dynamically rendered documentation content consistent.
     */
    const codeObserver = new MutationObserver(() => {
      const pending = document.querySelector(
        '.vp-doc [class*="language-"] code:not([data-kordex-highlighted])',
      );

      if (pending) {
        applyCodeHighlighting();
      }
    });

    codeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
};
