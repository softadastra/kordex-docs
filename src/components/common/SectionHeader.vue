<template>
  <header class="kx-section-header" :class="alignClass">
    <span v-if="eyebrow" class="kx-eyebrow">
      {{ eyebrow }}
    </span>

    <h2 class="kx-section-title">
      <slot name="title">
        {{ title }}
      </slot>
    </h2>

    <p v-if="lead" class="kx-section-lead">
      <slot name="lead">
        {{ lead }}
      </slot>
    </p>
  </header>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  eyebrow: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  lead: {
    type: String,
    default: "",
  },
  align: {
    type: String,
    default: "center",
  },
});

const alignClass = computed(() => {
  return props.align === "left"
    ? "kx-section-header--left"
    : "kx-section-header--center";
});
</script>

<style scoped>
.kx-section-header--left {
  max-width: 720px;
  margin-right: 0;
  margin-left: 0;
  text-align: left;
}

.kx-section-header--center {
  text-align: center;
}
</style>
