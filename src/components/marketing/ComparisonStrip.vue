<template>
  <div class="kx-comparison-strip">
    <article
      v-for="item in items"
      :key="item.name"
      class="kx-comparison-item"
      :class="{ 'kx-comparison-item--active': item.active }"
    >
      <h3 class="kx-comparison-name">
        {{ item.name }}
      </h3>

      <p class="kx-comparison-text">
        {{ item.text }}
      </p>
    </article>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      {
        name: "Node",
        text: "The JavaScript ecosystem runtime.",
        active: false,
      },
      {
        name: "Deno",
        text: "Secure TypeScript-first runtime and tooling.",
        active: false,
      },
      {
        name: "Bun",
        text: "Speed-focused all-in-one JavaScript toolkit.",
        active: false,
      },
      {
        name: "Kordex",
        text: "Reliable local-first JavaScript with explicit native power.",
        active: true,
      },
    ],
  },
});
</script>
