<template>
  <footer class="kx-footer">
    <div class="kx-container">
      <div class="kx-footer-inner">
        <div class="kx-footer-brand">
          <RouterLink to="/" class="kx-brand" aria-label="Kordex home">
            <img class="kx-brand-logo" :src="logo" alt="Kordex" />
            <span class="kx-brand-wordmark">Kordex</span>
          </RouterLink>

          <p class="kx-footer-text">
            Reliable local-first JavaScript for local execution, explicit native
            permissions, and durable local state.
          </p>
        </div>

        <div class="kx-footer-links">
          <div
            v-for="group in footerGroups"
            :key="group.title"
            class="kx-footer-group"
          >
            <h3 class="kx-footer-title">
              {{ group.title }}
            </h3>

            <template v-for="link in group.links" :key="link.label">
              <RouterLink v-if="link.to" class="kx-footer-link" :to="link.to">
                {{ link.label }}
              </RouterLink>

              <a v-else class="kx-footer-link" :href="link.href">
                {{ link.label }}
              </a>
            </template>
          </div>
        </div>
      </div>

      <div class="kx-footer-bottom">
        <span>© {{ year }} Softadastra. All rights reserved.</span>
        <span>Kordex — reliable local-first JavaScript.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";

import { footerGroups } from "../../data/navigation";
import logo from "../../assets/logo.svg";

const year = new Date().getFullYear();
</script>
