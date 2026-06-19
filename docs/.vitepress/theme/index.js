import DefaultTheme from "vitepress/theme";
import "./custom.css";

import Layout from "./Layout.vue";
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

    app.component("CodeTabs", CodeTabs);
    app.component("CodeBlock", CodeBlock);

    if (typeof window === "undefined") {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const syncHeaderHeight = () => {
      const header = document.querySelector(".kordex-nav, .kx-nav, .VPNav");

      if (!header) {
        return;
      }

      const value = `${Math.ceil(header.getBoundingClientRect().height)}px`;

      document.documentElement.style.setProperty(
        "--kordex-header-height",
        value,
      );

      document.documentElement.style.setProperty("--kx-header-height", value);
    };

    const escapeHtml = (value) =>
      String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

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

    const schedulePageEffects = () => {
      window.requestAnimationFrame(() => {
        syncHeaderHeight();
        applyCodeHighlighting();

        setTimeout(() => {
          syncHeaderHeight();
          applyCodeHighlighting();
        }, 80);
      });
    };

    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
      schedulePageEffects();
    });

    window.addEventListener("resize", syncHeaderHeight);

    schedulePageEffects();

    const previousAfterRouteChanged = router.onAfterRouteChanged;

    router.onAfterRouteChanged = (to) => {
      previousAfterRouteChanged?.(to);

      window.scrollTo(0, 0);
      schedulePageEffects();
    };

    const observer = new MutationObserver(() => {
      syncHeaderHeight();

      const pendingCodeBlock = document.querySelector(
        '.vp-doc [class*="language-"] code:not([data-kordex-highlighted])',
      );

      if (pendingCodeBlock) {
        applyCodeHighlighting();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
};
