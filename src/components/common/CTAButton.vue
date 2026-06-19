<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :target="targetValue"
    :rel="relValue"
    class="kx-button"
    :class="buttonClass"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
  },
  external: {
    type: Boolean,
    default: false,
  },
});

const componentType = computed(() => {
  if (props.to) {
    return RouterLink;
  }

  return "a";
});

const buttonClass = computed(() => {
  return props.variant === "secondary"
    ? "kx-button--secondary"
    : "kx-button--primary";
});

const targetValue = computed(() => {
  return props.external ? "_blank" : undefined;
});

const relValue = computed(() => {
  return props.external ? "noreferrer" : undefined;
});
</script>
