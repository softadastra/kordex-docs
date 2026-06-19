<template>
  <article class="kx-card kx-feature-card">
    <div v-if="icon || $slots.icon" class="kx-feature-card__icon">
      <slot name="icon">
        {{ icon }}
      </slot>
    </div>

    <span v-if="badge" class="kx-badge kx-badge--soft">
      {{ badge }}
    </span>

    <h3 class="kx-feature-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </h3>

    <p class="kx-feature-card__text">
      <slot>
        {{ text }}
      </slot>
    </p>
  </article>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: "",
  },
  badge: {
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
});
</script>

<style scoped>
.kx-feature-card {
  height: 100%;
}

.kx-feature-card .kx-badge {
  margin-bottom: 16px;
}

.kx-feature-card__icon {
  font-size: 1.15rem;
  font-weight: 900;
}
</style>
