<template>
  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-permissions">
        <div class="kx-permissions__content">
          <span class="kx-eyebrow"> Permission model </span>

          <h2 class="kx-section-title">Native power should be visible.</h2>

          <p class="kx-section-lead">
            Kordex does not give scripts sensitive native access silently.
            Filesystem, environment, process, network, and local-first storage
            capabilities are enabled with explicit command-line flags.
          </p>

          <div class="kx-command kx-permissions__command">
            kordex run sync.js --allow-env --allow-softadastra
          </div>
        </div>

        <div class="kx-permissions__table">
          <div
            v-for="item in permissionMap"
            :key="item.module"
            class="kx-permissions__row"
          >
            <code>{{ item.module }}</code>
            <span>{{ item.permission }}</span>
            <p>{{ item.capability }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { permissionMap } from "../../data/modules";
</script>

<style scoped>
.kx-permissions {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
  gap: 42px;
  padding: 42px;
}

.kx-permissions__content {
  max-width: 640px;
}

.kx-permissions__command {
  margin: 28px 0 0;
}

.kx-permissions__table {
  display: grid;
  gap: 12px;
}

.kx-permissions__row {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) minmax(130px, auto);
  gap: 8px 18px;
  padding: 18px;
  background: rgba(0, 0, 0, 0.24);
  border: 1px solid var(--kx-border-soft);
  border-radius: var(--kx-radius-md);
}

.kx-permissions__row code {
  color: var(--kx-orange);
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.9rem;
}

.kx-permissions__row span {
  color: var(--kx-cream);
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.86rem;
  font-weight: 800;
}

.kx-permissions__row p {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--kx-muted);
  font-size: 0.92rem;
}

@media (max-width: 960px) {
  .kx-permissions {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}

@media (max-width: 560px) {
  .kx-permissions__row {
    grid-template-columns: 1fr;
  }
}
</style>
