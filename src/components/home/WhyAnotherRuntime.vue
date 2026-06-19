<template>
  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Why another runtime?"
        title="Kordex takes a different path."
        lead="JavaScript already has strong runtimes. Kordex is not trying to copy them. It is focused on reliable local-first JavaScript."
      />

      <ComparisonStrip />

      <div class="kx-card kx-why-runtime">
        <div>
          <span class="kx-eyebrow"> Focused by design </span>

          <h3>Not another Node clone. Not only a benchmark story.</h3>
        </div>

        <p>
          Kordex is built for scripts and applications that need to run locally,
          use native capabilities explicitly, write durable state first, and
          prepare for synchronization later.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "../common/SectionHeader.vue";
import ComparisonStrip from "../marketing/ComparisonStrip.vue";
</script>

<style scoped>
.kx-why-runtime {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 34px;
  margin-top: 24px;
  padding: 34px;
}

.kx-why-runtime h3 {
  margin: 0;
  color: var(--kx-white);
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  line-height: 1.05;
  letter-spacing: -0.055em;
}

.kx-why-runtime p {
  margin: 0;
  color: var(--kx-muted-strong);
  font-size: 1.06rem;
  line-height: 1.8;
}

@media (max-width: 820px) {
  .kx-why-runtime {
    grid-template-columns: 1fr;
  }
}
</style>
