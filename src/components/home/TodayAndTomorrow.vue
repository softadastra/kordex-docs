<template>
  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Today and tomorrow"
        title="Built today. Expanding carefully."
        lead="Kordex is early, focused, and honest about its direction. The foundation exists today, and the local-first runtime model will keep growing."
      />

      <div class="kx-timeline">
        <article class="kx-card kx-timeline-column">
          <span class="kx-badge"> Available today </span>

          <div class="kx-timeline-list">
            <div
              v-for="item in availableToday"
              :key="item.title"
              class="kx-timeline-item"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </article>

        <article class="kx-card kx-timeline-column">
          <span class="kx-badge kx-badge--soft"> Coming next </span>

          <div class="kx-timeline-list">
            <div
              v-for="item in comingNext"
              :key="item.title"
              class="kx-timeline-item"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../common/SectionHeader.vue";
import { availableToday, comingNext } from "../../data/roadmap";
</script>

<style scoped>
.kx-timeline-list {
  display: grid;
  gap: 18px;
  margin-top: 26px;
}

.kx-timeline-item {
  padding: 18px;
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid var(--kx-border-soft);
  border-radius: var(--kx-radius-md);
}

.kx-timeline-item h3 {
  margin: 0 0 8px;
  color: var(--kx-white);
  font-size: 1rem;
  letter-spacing: -0.025em;
}

.kx-timeline-item p {
  margin: 0;
  color: var(--kx-muted);
  line-height: 1.65;
  font-size: 0.94rem;
}
</style>
