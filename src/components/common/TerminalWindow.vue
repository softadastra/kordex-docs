<template>
  <div class="kx-terminal">
    <div class="kx-terminal-header">
      <div class="kx-terminal-dots" aria-hidden="true">
        <span class="kx-terminal-dot"></span>
        <span class="kx-terminal-dot"></span>
        <span class="kx-terminal-dot"></span>
      </div>

      <span class="kx-terminal-title">
        {{ title }}
      </span>
    </div>

    <slot />

    <div v-if="command" class="kx-command">
      {{ command }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "main.js",
  },
  command: {
    type: String,
    default: "",
  },
});
</script>
