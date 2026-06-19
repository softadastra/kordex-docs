<template>
  <section class="kx-section">
    <div class="kx-container">
      <SectionHeader
        eyebrow="Use cases"
        title="Where Kordex makes sense."
        lead="Kordex is for developers building local-first tools, offline-ready workflows, controlled automation, and sync-ready applications."
      />

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
</template>

<script setup>
import SectionHeader from "../common/SectionHeader.vue";
import UseCaseCard from "../marketing/UseCaseCard.vue";
import { useCases } from "../../data/useCases";
</script>
