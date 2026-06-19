<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-use-cases-hero">
      <span class="kx-eyebrow"> Use Cases </span>

      <h1 class="kx-title">
        Built for
        <span class="kx-gradient-text">local-first</span>
        workflows.
      </h1>

      <p class="kx-subtitle">
        Kordex is for developers building offline-ready tools, local automation,
        field apps, sync-ready systems, and native-powered JavaScript workflows
        with explicit permissions.
      </p>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-grid kx-grid--3">
        <UseCaseCard
          v-for="useCase in useCases"
          :key="useCase.title"
          :title="useCase.title"
          :label="useCase.label"
          :description="useCase.description"
          :points="useCase.points"
        />
      </div>
    </div>
  </section>

  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Who it is for"
        title="For developers who need JavaScript close to the machine."
        lead="Kordex is useful when JavaScript needs local execution, native modules, durable local state, and a clear permission boundary."
      />

      <div class="kx-grid kx-grid--4">
        <FeatureCard
          v-for="segment in audienceSegments"
          :key="segment.title"
          :title="segment.title"
          :text="segment.description"
        />
      </div>
    </div>
  </section>

  <section class="kx-section kx-section--tight">
    <div class="kx-container">
      <div class="kx-card kx-use-cases-focus">
        <div>
          <span class="kx-eyebrow"> The common thread </span>

          <h2 class="kx-section-title">
            Local usefulness before remote dependency.
          </h2>
        </div>

        <p>
          The best Kordex use cases share one idea: the script or app should
          keep doing useful work locally before depending on a server, network,
          cloud account, or remote service.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from "../components/common/FeatureCard.vue";
import SectionHeader from "../components/common/SectionHeader.vue";
import UseCaseCard from "../components/marketing/UseCaseCard.vue";
import { audienceSegments, useCases } from "../data/useCases";
</script>

<style scoped>
.kx-use-cases-hero {
  max-width: 940px;
  text-align: center;
}

.kx-use-cases-hero .kx-eyebrow {
  margin-right: auto;
  margin-left: auto;
}

.kx-use-cases-focus {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
  gap: 42px;
  padding: 42px;
}

.kx-use-cases-focus p {
  margin: 0;
  color: var(--kx-muted-strong);
  font-size: 1.08rem;
  line-height: 1.85;
}

@media (max-width: 900px) {
  .kx-use-cases-focus {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
