<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-modules-hero">
      <span class="kx-eyebrow"> Native Modules </span>

      <h1 class="kx-title">
        The
        <span class="kx-gradient-text">kordex:</span>
        module system.
      </h1>

      <p class="kx-subtitle">
        Kordex exposes native capabilities through explicit standard modules.
        Safe utilities run by default, while sensitive capabilities require
        clear runtime permissions.
      </p>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-grid kx-grid--3">
        <article
          v-for="group in moduleGroups"
          :key="group.title"
          class="kx-card kx-module-group"
        >
          <span class="kx-badge">
            {{ group.title }}
          </span>

          <p>
            {{ group.description }}
          </p>

          <div class="kx-module-group__list">
            <code v-for="moduleName in group.modules" :key="moduleName">
              {{ moduleName }}
            </code>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Available modules"
        title="Small modules with clear capability boundaries."
        lead="Each module has a focused purpose. Permission-gated modules make native access visible at the command line."
      />

      <div class="kx-grid kx-grid--3">
        <article
          v-for="module in modules"
          :key="module.name"
          class="kx-card kx-module-card"
        >
          <div class="kx-module-card__top">
            <h3 class="kx-module-card__name">
              {{ module.name }}
            </h3>

            <span
              class="kx-badge"
              :class="{ 'kx-badge--soft': module.permission === 'none' }"
            >
              {{ module.permission }}
            </span>
          </div>

          <p class="kx-module-card__text">
            {{ module.description }}
          </p>

          <div class="kx-module-card__meta">
            <span>{{ module.category }}</span>
            <span>{{ module.status }}</span>
          </div>

          <div class="kx-module-card__exports">
            <span v-for="item in module.exports" :key="item">
              {{ item }}
            </span>
          </div>

          <a class="kx-module-card__link" :href="module.docs"> Read docs → </a>
        </article>
      </div>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-modules-cta">
        <div>
          <span class="kx-eyebrow"> Import style </span>

          <h2 class="kx-section-title">
            Kordex modules use the kordex: prefix.
          </h2>

          <p class="kx-section-lead">
            Use relative imports for your own project files. Use kordex: imports
            for Kordex native modules.
          </p>
        </div>

        <TerminalWindow title="imports.js" command="kordex run imports.js">
          <CodeBlock :code="code" />
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script setup>
import CodeBlock from "../components/common/CodeBlock.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import TerminalWindow from "../components/common/TerminalWindow.vue";
import { moduleGroups, modules } from "../data/modules";

const code = `import { join } from "kordex:path";
import { hash } from "kordex:crypto";

const file = join(".", "data", "app.json");
const key = "cache:" + hash(file);

console.log(file);
console.log(key);`;
</script>

<style scoped>
.kx-modules-hero {
  max-width: 940px;
  text-align: center;
}

.kx-modules-hero .kx-eyebrow {
  margin-right: auto;
  margin-left: auto;
}

.kx-module-group {
  padding: 28px;
}

.kx-module-group p {
  margin: 18px 0 0;
  color: var(--kx-muted-strong);
  line-height: 1.7;
}

.kx-module-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.kx-module-group__list code {
  padding: 6px 10px;
  color: var(--kx-orange);
  background: rgba(255, 153, 0, 0.08);
  border: 1px solid var(--kx-border);
  border-radius: 999px;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.78rem;
}

.kx-module-card {
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.kx-module-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.kx-module-card__meta span {
  padding: 5px 9px;
  color: var(--kx-cream);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid var(--kx-border-soft);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.kx-module-card__exports {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.kx-module-card__exports span {
  padding: 5px 9px;
  color: var(--kx-muted-strong);
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid var(--kx-border-soft);
  border-radius: 999px;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.72rem;
}

.kx-module-card__link {
  width: fit-content;
  margin-top: auto;
  padding-top: 24px;
  color: var(--kx-orange);
  font-weight: 800;
  font-size: 0.9rem;
}

.kx-module-card__link:hover {
  color: var(--kx-cream);
}

.kx-modules-cta {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(0, 0.95fr) minmax(380px, 1.05fr);
  gap: 44px;
  padding: 42px;
}

@media (max-width: 920px) {
  .kx-modules-cta {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
