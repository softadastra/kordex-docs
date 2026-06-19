<template>
  <article class="kx-card kx-pillar-card">
    <span class="kx-pillar-number">
      {{ number }}
    </span>

    <h3 class="kx-pillar-title">
      {{ title }}
    </h3>

    <p class="kx-pillar-text">
      {{ text }}
    </p>

    <ul v-if="points.length" class="kx-pillar-points">
      <li v-for="point in points" :key="point">
        {{ point }}
      </li>
    </ul>
  </article>
</template>

<script setup>
defineProps({
  number: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  text: {
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
.kx-pillar-card {
  height: 100%;
}

.kx-pillar-points {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
}

.kx-pillar-points li {
  position: relative;
  padding-left: 22px;
  color: var(--kx-muted-strong);
  font-size: 0.92rem;
}

.kx-pillar-points li::before {
  position: absolute;
  top: 0.68em;
  left: 0;
  width: 7px;
  height: 7px;
  content: "";
  background: var(--kx-orange);
  border-radius: 999px;
  box-shadow: 0 0 18px var(--kx-shadow-orange);
}
</style>
