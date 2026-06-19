<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-runtime-hero">
      <div>
        <span class="kx-eyebrow"> Runtime Model </span>

        <h1 class="kx-title">
          Local execution.
          <span class="kx-gradient-text">Explicit native power.</span>
        </h1>

        <p class="kx-subtitle">
          Kordex runs JavaScript and TypeScript scripts with local imports,
          native kordex: modules, permission-gated capabilities, and Softadastra
          local-first storage foundations.
        </p>
      </div>

      <TerminalWindow
        title="runtime.js"
        command="kordex run runtime.js --allow-fs"
      >
        <CodeBlock :code="runtimeCode" />
      </TerminalWindow>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Execution model"
        title="A smaller runtime surface with clear boundaries."
        lead="Kordex is organized around local scripts, project entries, native modules, and explicit permission flags."
      />

      <div class="kx-pillars">
        <PillarCard
          v-for="pillar in pillars"
          :key="pillar.title"
          :number="pillar.number"
          :title="pillar.title"
          :text="pillar.text"
          :points="pillar.points"
        />
      </div>
    </div>
  </section>

  <section class="kx-section">
    <div class="kx-container kx-split">
      <div>
        <span class="kx-eyebrow"> Native modules </span>

        <h2 class="kx-section-title">Kordex modules use the kordex: prefix.</h2>

        <p class="kx-section-lead">
          Safe modules can run without extra flags. Sensitive modules require
          visible permissions so native access remains easy to review.
        </p>
      </div>

      <div class="kx-card kx-runtime-permissions">
        <div
          v-for="item in permissionMap"
          :key="item.module"
          class="kx-runtime-permissions__item"
        >
          <code>{{ item.module }}</code>
          <span>{{ item.permission }}</span>
          <p>{{ item.capability }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-runtime-storage">
        <div>
          <span class="kx-eyebrow"> Local-first storage </span>

          <h2 class="kx-section-title">
            Durable local state is part of the runtime direction.
          </h2>

          <p class="kx-section-lead">
            With kordex:softadastra, a script can open a local store, write
            values, read values, inspect state, and close the store with an
            explicit storage permission.
          </p>
        </div>

        <TerminalWindow
          title="storage.js"
          command="kordex run storage.js --allow-softadastra"
        >
          <CodeBlock :code="storageCode" />
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script setup>
import CodeBlock from "../components/common/CodeBlock.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import TerminalWindow from "../components/common/TerminalWindow.vue";
import PillarCard from "../components/marketing/PillarCard.vue";
import { permissionMap } from "../data/modules";
import { pillars } from "../data/pillars";

const runtimeCode = `import { join } from "kordex:path";
import { readText } from "kordex:fs";

const file = join(".", "README.md");

console.log(readText(file));`;

const storageCode = `import * as softadastra from "kordex:softadastra";

softadastra.open("durable", "app", ".kordex/data/app.wal");

softadastra.put("runtime", "kordex");
softadastra.put("mode", "local-first");

console.log(softadastra.get("runtime"));

softadastra.close();`;
</script>

<style scoped>
.kx-runtime-hero {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(0, 0.95fr) minmax(380px, 1.05fr);
  gap: 52px;
}

.kx-runtime-permissions {
  display: grid;
  gap: 12px;
  padding: 26px;
}

.kx-runtime-permissions__item {
  display: grid;
  grid-template-columns: minmax(140px, 1fr) minmax(130px, auto);
  gap: 8px 18px;
  padding: 18px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid var(--kx-border-soft);
  border-radius: var(--kx-radius-md);
}

.kx-runtime-permissions__item code {
  color: var(--kx-orange);
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}

.kx-runtime-permissions__item span {
  color: var(--kx-cream);
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.86rem;
  font-weight: 800;
}

.kx-runtime-permissions__item p {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--kx-muted);
}

.kx-runtime-storage {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(0, 0.95fr) minmax(380px, 1.05fr);
  gap: 44px;
  padding: 42px;
}

@media (max-width: 920px) {
  .kx-runtime-hero,
  .kx-runtime-storage {
    grid-template-columns: 1fr;
  }

  .kx-runtime-storage {
    padding: 28px;
  }
}

@media (max-width: 560px) {
  .kx-runtime-permissions__item {
    grid-template-columns: 1fr;
  }
}
</style>
