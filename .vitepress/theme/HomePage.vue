<script setup>
import CodeBlock from "./CodeBlock.vue";

const heroCode = `import { readText, writeText } from "kordex/fs";
import { join } from "kordex/path";
import { env } from "kordex/env";

const workspace = env("KORDEX_WORKSPACE") ?? ".";

const file = join(workspace, "notes.txt");

await writeText(file, "Hello from Kordex");

const content = await readText(file);

console.log(content);`;

const features = [
  {
    title: "Local-first runtime",
    desc: "Build JavaScript and TypeScript applications that can work reliably with local files, local state, and controlled permissions.",
    icon: "runtime",
    href: "/guide/local-first",
    tag: "Runtime",
  },
  {
    title: "Simple CLI workflow",
    desc: "Create projects, run scripts, check permissions, build applications, and manage the Kordex workflow from one command line.",
    icon: "cli",
    href: "/cli/",
    tag: "CLI",
  },
  {
    title: "Built-in modules",
    desc: "Use practical modules for files, paths, environment variables, process tools, timers, crypto, HTTP helpers, and console output.",
    icon: "modules",
    href: "/modules/",
    tag: "Modules",
  },
  {
    title: "Permission-aware design",
    desc: "Keep applications predictable by making file, network, environment, and process access explicit instead of accidental.",
    icon: "permissions",
    href: "/guide/permissions",
    tag: "Security",
  },
];

function iconPath(name) {
  if (name === "runtime") {
    return "M12 3v4m0 10v4M3 12h4m10 0h4M6.3 6.3l2.8 2.8m5.8 5.8 2.8 2.8m0-11.4-2.8 2.8m-5.8 5.8-2.8 2.8";
  }

  if (name === "cli") {
    return "M4 6h16v12H4V6zm4 5 2 2-2 2m5 0h4";
  }

  if (name === "modules") {
    return "M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 17l8 4 8-4";
  }

  if (name === "permissions") {
    return "M12 3l7 4v5c0 4.5-2.9 7.7-7 9-4.1-1.3-7-4.5-7-9V7l7-4zm-2 9 1.5 1.5L15 10";
  }

  return "M6 7h12M6 12h12M6 17h8";
}
</script>

<template>
  <div class="kdh">
    <div class="kdh-left">
      <div class="kdh-eyebrow">
        <span class="kdh-logo" aria-hidden="true">
          <img src="/logo.png" alt="" />
        </span>

        <span class="kdh-badge">Kordex</span>
        <span class="kdh-sep">·</span>
        <span>JavaScript and TypeScript local-first runtime</span>
      </div>

      <h1 class="kdh-h1">
        Reliable local-first<br class="kdh-br" />
        apps with JavaScript.
      </h1>

      <p class="kdh-lead">
        Kordex is a JavaScript and TypeScript runtime for building reliable
        local-first applications with clear permissions, practical built-in
        modules, and a simple developer workflow.
      </p>

      <div class="kdh-actions">
        <a class="kdh-btn kdh-btn--primary" href="/guide/getting-started">
          Get started
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>

        <a class="kdh-btn kdh-btn--ghost" href="/cli/"> Explore the CLI </a>
      </div>

      <div class="kdh-model">
        <div class="kdh-model-item">
          <span class="kdh-model-k">Kordex</span>
          <span class="kdh-model-v"
            >runtime, permissions, local-first execution</span
          >
        </div>

        <div class="kdh-model-arrow">→</div>

        <div class="kdh-model-item">
          <span class="kdh-model-k">Modules</span>
          <span class="kdh-model-v">fs, path, env, process, crypto, http</span>
        </div>

        <div class="kdh-model-arrow">→</div>

        <div class="kdh-model-item">
          <span class="kdh-model-k">Apps</span>
          <span class="kdh-model-v"
            >scripts, tools, automation, local products</span
          >
        </div>
      </div>
    </div>

    <div class="kdh-right">
      <CodeBlock
        title="main.ts"
        lang="ts"
        :chips="['kordex', 'typescript', 'local-first']"
        :code="heroCode"
        :maxHeight="480"
      />

      <div class="kdh-terminal">
        <div class="kdh-terminal-line">
          <span class="kdh-run-prompt">$</span>
          <span class="kdh-run-cmd">npm create kordex@latest my-app</span>
        </div>

        <div class="kdh-terminal-line">
          <span class="kdh-run-prompt">$</span>
          <span class="kdh-run-cmd">cd my-app</span>
        </div>

        <div class="kdh-terminal-line">
          <span class="kdh-run-prompt">$</span>
          <span class="kdh-run-cmd">kordex run main.ts</span>
        </div>
      </div>
    </div>
  </div>

  <div class="kdh-cards">
    <a v-for="f in features" :key="f.title" class="kdh-card" :href="f.href">
      <div class="kdh-card-top">
        <div class="kdh-card-icon">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path
              :d="iconPath(f.icon)"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <span class="kdh-card-tag">{{ f.tag }}</span>
      </div>

      <div class="kdh-card-title">{{ f.title }}</div>
      <div class="kdh-card-desc">{{ f.desc }}</div>

      <div class="kdh-card-arrow">
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </a>
  </div>
</template>

<style scoped>
.kdh {
  --accent: #22c55e;
  --accent-light: #4ade80;
  --accent-soft: rgba(34, 197, 94, 0.1);
  --accent-border: rgba(34, 197, 94, 0.28);

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, 0.92fr);
  gap: 56px;
  align-items: start;
  padding: 24px 0 42px;
}

.kdh-left {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.kdh-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  font-weight: 650;
}

.kdh-logo {
  display: inline-flex;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.kdh-logo img {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  object-fit: contain;
}

.kdh-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  color: var(--accent-light);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  font-size: 11.5px;
  font-weight: 800;
}

.kdh-sep {
  color: var(--vp-c-divider);
}

.kdh-h1 {
  margin: 0 0 18px;
  color: var(--vp-c-text-1);
  font-size: clamp(2.15rem, 4.2vw, 3.35rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 920;
}

.kdh-br {
  display: block;
}

.kdh-lead {
  max-width: 56ch;
  margin: 0 0 26px;
  color: var(--vp-c-text-2);
  font-size: 15.8px;
  line-height: 1.75;
}

.kdh-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.kdh-btn {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 11px;
  font-size: 13.5px;
  font-weight: 820;
  line-height: 1;
  text-decoration: none !important;
  transition:
    background 0.14s ease,
    color 0.14s ease,
    border-color 0.14s ease,
    transform 0.14s ease,
    box-shadow 0.14s ease;
}

.kdh-btn--primary {
  color: #ffffff !important;
  background: linear-gradient(180deg, var(--accent-light), var(--accent));
  border: 1px solid rgba(34, 197, 94, 0.45);
  box-shadow: 0 14px 34px rgba(34, 197, 94, 0.22);
}

.kdh-btn--primary:hover {
  color: #ffffff !important;
  transform: translateY(-1px);
  box-shadow: 0 18px 42px rgba(34, 197, 94, 0.28);
}

.kdh-btn--ghost {
  color: var(--vp-c-text-1) !important;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.kdh-btn--ghost:hover {
  color: var(--accent-light) !important;
  background: var(--accent-soft);
  border-color: var(--accent-border);
  transform: translateY(-1px);
}

.kdh-model {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: stretch;
  gap: 10px;
  max-width: 760px;
}

.kdh-model-item {
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent),
    var(--vp-c-bg-soft);
}

.kdh-model-k {
  display: block;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 860;
  letter-spacing: -0.02em;
}

.kdh-model-v {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 11.5px;
  line-height: 1.45;
  font-weight: 560;
}

.kdh-model-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-light);
  font-weight: 900;
  opacity: 0.9;
}

.kdh-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.kdh-terminal {
  display: grid;
  gap: 0;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  font-family:
    "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    monospace;
}

.kdh-terminal-line {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 13px;
}

.kdh-terminal-line:last-child {
  border-bottom: 0;
}

.kdh-run-prompt {
  color: var(--accent-light);
  font-weight: 900;
}

.kdh-run-cmd {
  min-width: 0;
  color: var(--vp-c-text-1);
  font-weight: 760;
  white-space: nowrap;
}

.kdh-cards {
  --accent: #22c55e;
  --accent-light: #4ade80;
  --accent-soft: rgba(34, 197, 94, 0.1);
  --accent-border: rgba(34, 197, 94, 0.28);

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding-bottom: 8px;
}

.kdh-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent), transparent;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    border-color 0.14s ease,
    transform 0.14s ease,
    background 0.14s ease;
}

.kdh-card:hover {
  border-color: var(--accent-border);
  background: var(--accent-soft);
  transform: translateY(-2px);
  text-decoration: none;
}

.kdh-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.kdh-card-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  transition:
    border-color 0.14s ease,
    color 0.14s ease,
    background 0.14s ease;
}

.kdh-card:hover .kdh-card-icon {
  color: var(--accent-light);
  border-color: var(--accent-border);
  background: var(--accent-soft);
}

.kdh-card-tag {
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--accent-light);
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.14s ease;
}

.kdh-card:hover .kdh-card-tag {
  opacity: 1;
}

.kdh-card-title {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 850;
  line-height: 1.25;
}

.kdh-card-desc {
  flex: 1;
  color: var(--vp-c-text-2);
  font-size: 12.5px;
  line-height: 1.6;
}

.kdh-card-arrow {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.14s ease,
    transform 0.14s ease,
    color 0.14s ease;
}

.kdh-card:hover .kdh-card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent-light);
}

@media (max-width: 1100px) {
  .kdh {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .kdh-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 960px) {
  .kdh {
    padding-top: 12px;
  }

  .kdh-h1 {
    font-size: 2.25rem;
  }

  .kdh-br {
    display: none;
  }

  .kdh-lead {
    max-width: 100%;
  }
}

@media (max-width: 720px) {
  .kdh-model {
    grid-template-columns: 1fr;
  }

  .kdh-model-arrow {
    display: none;
  }
}

@media (max-width: 640px) {
  .kdh {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .kdh-left,
  .kdh-right {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .kdh-h1 {
    font-size: 1.9rem;
  }

  .kdh-lead {
    font-size: 14.5px;
  }

  .kdh-cards {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .kdh-card-tag,
  .kdh-card-arrow {
    opacity: 1;
  }

  .kdh-card-arrow {
    transform: translateX(0);
  }

  .kdh-right :deep(.cb),
  .kdh-right :deep(.code-block),
  .kdh-right :deep(.vix-code-block),
  .kdh-right :deep(pre),
  .kdh-right :deep(code) {
    max-width: 100%;
    min-width: 0;
  }

  .kdh-right :deep(pre) {
    overflow-x: auto;
  }

  .kdh-terminal {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
