<template>
  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Native modules"
        title="A small standard module system with clear boundaries."
        lead="Kordex modules use the kordex: prefix. Safe utilities work by default. Sensitive native capabilities require explicit permissions."
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

          <div class="kx-module-card__exports">
            <span v-for="item in module.exports.slice(0, 4)" :key="item">
              {{ item }}
            </span>
          </div>

          <a class="kx-module-card__link" :href="module.docs">
            Read module docs →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../common/SectionHeader.vue";
import { modules } from "../../data/modules";
</script>

<style scoped>
.kx-module-card {
  display: flex;
  flex-direction: column;
  min-height: 260px;
}

.kx-module-card__exports {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.kx-module-card__exports span {
  padding: 5px 9px;
  color: var(--kx-muted-strong);
  background: rgba(255, 255, 255, 0.045);
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
</style>
