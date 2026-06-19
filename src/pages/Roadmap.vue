<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-roadmap-hero">
      <span class="kx-eyebrow"> Roadmap </span>

      <h1 class="kx-title">
        Built today.
        <span class="kx-gradient-text">Expanding carefully.</span>
      </h1>

      <p class="kx-subtitle">
        Kordex is early and focused. The current foundation supports local
        execution, explicit permissions, native modules, and Softadastra
        storage. The roadmap grows from that local-first direction.
      </p>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
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

  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Roadmap lanes"
        title="The roadmap follows the runtime direction."
        lead="Kordex grows around runtime reliability, local-first state, developer experience, packages, and plugins."
      />

      <div class="kx-grid kx-grid--4">
        <article
          v-for="lane in roadmapLanes"
          :key="lane.title"
          class="kx-card kx-roadmap-lane"
        >
          <h3>{{ lane.title }}</h3>

          <ul class="kx-list">
            <li v-for="item in lane.items" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-roadmap-principles">
        <div>
          <span class="kx-eyebrow"> Principles </span>

          <h2 class="kx-section-title">Focus matters more than noise.</h2>

          <p class="kx-section-lead">
            Kordex should grow without losing its reason to exist: reliable
            local-first JavaScript with explicit native power.
          </p>
        </div>

        <ul class="kx-list">
          <li v-for="principle in roadmapPrinciples" :key="principle">
            {{ principle }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../components/common/SectionHeader.vue";
import {
  availableToday,
  comingNext,
  roadmapLanes,
  roadmapPrinciples,
} from "../data/roadmap";
</script>

<style scoped>
.kx-roadmap-hero {
  max-width: 980px;
  text-align: center;
}

.kx-roadmap-hero .kx-eyebrow {
  margin-right: auto;
  margin-left: auto;
}

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

.kx-roadmap-lane {
  padding: 26px;
}

.kx-roadmap-lane h3 {
  margin: 0 0 18px;
  color: var(--kx-white);
  font-size: 1.12rem;
  letter-spacing: -0.03em;
}

.kx-roadmap-lane .kx-list {
  margin-top: 0;
}

.kx-roadmap-principles {
  display: grid;
  align-items: start;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
  gap: 42px;
  padding: 42px;
}

.kx-roadmap-principles .kx-list {
  margin-top: 0;
}

@media (max-width: 900px) {
  .kx-roadmap-principles {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
