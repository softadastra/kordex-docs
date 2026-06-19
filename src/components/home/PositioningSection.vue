<template>
  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-positioning">
        <div class="kx-positioning__content">
          <span class="kx-eyebrow"> Product position </span>

          <h2 class="kx-section-title">
            A focused runtime for local-first JavaScript.
          </h2>

          <p class="kx-section-lead">
            Kordex is designed around a clear model: run locally, grant native
            power explicitly, write useful state first, and synchronize later
            when the network is available.
          </p>
        </div>

        <div class="kx-positioning__grid">
          <article
            v-for="item in positioningPillars"
            :key="item.label"
            class="kx-positioning__item"
          >
            <h3>{{ item.label }}</h3>
            <p>{{ item.value }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { positioningPillars } from "../../data/pillars";
</script>

<style scoped>
.kx-positioning {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.86fr);
  gap: 44px;
  padding: 42px;
}

.kx-positioning__content {
  max-width: 690px;
}

.kx-positioning__grid {
  display: grid;
  gap: 14px;
}

.kx-positioning__item {
  padding: 22px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid var(--kx-border);
  border-radius: var(--kx-radius-md);
}

.kx-positioning__item h3 {
  margin: 0 0 8px;
  color: var(--kx-orange);
  font-size: 0.94rem;
  letter-spacing: 0.02em;
}

.kx-positioning__item p {
  margin: 0;
  color: var(--kx-muted-strong);
  line-height: 1.65;
}

@media (max-width: 900px) {
  .kx-positioning {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
