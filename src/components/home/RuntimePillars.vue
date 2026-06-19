<template>
  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Runtime pillars"
        title="Run locally. Grant explicitly. Store durably."
        lead="Kordex is organized around three ideas that make JavaScript useful for reliable local-first workflows."
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
</template>

<script setup>
import SectionHeader from "../common/SectionHeader.vue";
import PillarCard from "../marketing/PillarCard.vue";
import { pillars } from "../../data/pillars";
</script>
