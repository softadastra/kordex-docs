<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-why-page-hero">
      <span class="kx-eyebrow"> Why Kordex </span>

      <h1 class="kx-title">
        Not another clone.
        <span class="kx-gradient-text">A focused runtime.</span>
      </h1>

      <p class="kx-subtitle">
        Kordex exists for JavaScript and TypeScript workflows where local
        execution, explicit native access, durable local state, and
        offline-ready behavior matter more than chasing every runtime category
        at once.
      </p>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <ComparisonStrip />
    </div>
  </section>

  <section class="kx-section">
    <div class="kx-container kx-split">
      <div>
        <span class="kx-eyebrow"> The gap </span>

        <h2 class="kx-section-title">
          JavaScript is everywhere, but many apps still depend on the network
          too early.
        </h2>
      </div>

      <div class="kx-card kx-why-page-card">
        <p>
          Many tools and applications are designed as if the server is always
          reachable. Kordex starts from another direction: the local machine
          should be useful first.
        </p>

        <p>
          A Kordex script can run locally, use native capabilities through
          explicit permissions, write durable local state, and prepare for sync
          later.
        </p>
      </div>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <SectionHeader
        eyebrow="What Kordex is built for"
        title="Reliable local-first JavaScript."
        lead="Kordex is designed around a smaller, clearer surface instead of trying to become everything at once."
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
    <div class="kx-container">
      <div class="kx-card kx-why-not">
        <div>
          <span class="kx-eyebrow"> What Kordex is not </span>

          <h2 class="kx-section-title">
            Kordex is not trying to replace every JavaScript runtime.
          </h2>
        </div>

        <ul class="kx-list">
          <li>It is not a full Node.js clone.</li>
          <li>It is not only a benchmark story.</li>
          <li>It is not trying to be a generic runtime for every use case.</li>
          <li>It is not hiding native power behind silent access.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import ComparisonStrip from "../components/marketing/ComparisonStrip.vue";
import PillarCard from "../components/marketing/PillarCard.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import { pillars } from "../data/pillars";
</script>

<style scoped>
.kx-why-page-hero {
  max-width: 920px;
  text-align: center;
}

.kx-why-page-hero .kx-eyebrow {
  margin-right: auto;
  margin-left: auto;
}

.kx-why-page-card {
  padding: 34px;
}

.kx-why-page-card p {
  margin: 0;
  color: var(--kx-muted-strong);
  font-size: 1.05rem;
  line-height: 1.8;
}

.kx-why-page-card p + p {
  margin-top: 18px;
}

.kx-why-not {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
  gap: 42px;
  padding: 42px;
}

.kx-why-not .kx-list {
  margin-top: 0;
}

@media (max-width: 900px) {
  .kx-why-not {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
