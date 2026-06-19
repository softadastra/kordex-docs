<template>
  <header class="kx-shell-header">
    <div class="kx-container kx-header-inner">
      <RouterLink to="/" class="kx-brand" aria-label="Kordex home">
        <img class="kx-brand-logo" :src="logo" alt="Kordex" />
        <span class="kx-brand-wordmark">Kordex</span>
      </RouterLink>

      <nav class="kx-nav" aria-label="Main navigation">
        <template v-for="item in navigation" :key="item.label">
          <RouterLink v-if="item.to" class="kx-nav-link" :to="item.to">
            {{ item.label }}
          </RouterLink>

          <a v-else class="kx-nav-link" :href="item.href">
            {{ item.label }}
          </a>
        </template>
      </nav>

      <div class="kx-header-actions">
        <CTAButton
          v-for="action in headerActions"
          :key="action.label"
          :href="action.href"
          :variant="action.variant"
        >
          {{ action.label }}
        </CTAButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";

import CTAButton from "../common/CTAButton.vue";
import { headerActions, navigation } from "../../data/navigation";
import logo from "../../assets/logo.svg";
</script>
