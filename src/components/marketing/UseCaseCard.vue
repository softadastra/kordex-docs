<template>
  <article class="kx-card kx-use-case-card">
    <span v-if="label" class="kx-badge kx-badge--soft">
      {{ label }}
    </span>

    <h3 class="kx-use-case-card__title">
      {{ title }}
    </h3>

    <p class="kx-use-case-card__text">
      {{ description }}
    </p>

    <ul v-if="points.length" class="kx-use-case-card__points">
      <li v-for="point in points" :key="point">
        {{ point }}
      </li>
    </ul>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  points: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.kx-use-case-card {
  height: 100%;
}

.kx-use-case-card .kx-badge {
  margin-bottom: 18px;
}

.kx-use-case-card__points {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
}

.kx-use-case-card__points li {
  padding: 6px 10px;
  color: var(--kx-cream);
  background: rgba(255, 153, 0, 0.08);
  border: 1px solid var(--kx-border);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}
</style>
