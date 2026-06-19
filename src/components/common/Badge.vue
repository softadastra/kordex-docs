<template>
  <span class="kx-badge" :class="variantClass">
    <span v-if="dot" class="kx-badge__dot" aria-hidden="true"></span>
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
  dot: {
    type: Boolean,
    default: false,
  },
});

const variantClass = computed(() => {
  if (props.variant === "soft") {
    return "kx-badge--soft";
  }

  if (props.variant === "dark") {
    return "kx-badge--dark";
  }

  return "";
});
</script>

<style scoped>
.kx-badge__dot {
  width: 7px;
  height: 7px;
  background: currentColor;
  border-radius: 999px;
  box-shadow: 0 0 18px currentColor;
}

.kx-badge--dark {
  color: var(--kx-cream);
  background: rgba(0, 0, 0, 0.24);
  border-color: rgba(255, 153, 0, 0.22);
}
</style>
