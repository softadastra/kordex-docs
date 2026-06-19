<template>
  <div class="kx-site">
    <SiteHeader />

    <main class="kx-main">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from "./SiteHeader.vue";
import SiteFooter from "./SiteFooter.vue";
</script>
