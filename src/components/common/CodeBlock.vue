<template>
  <pre class="kx-code"><code><slot>{{ code }}</slot></code></pre>
</template>

<script setup>
defineProps({
  code: {
    type: String,
    default: "",
  },
});
</script>
