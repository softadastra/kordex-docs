<template>
  <section class="kx-section">
    <div class="kx-container">
      <div class="kx-card kx-final-cta">
        <div class="kx-final-cta__content">
          <span class="kx-eyebrow"> Start building </span>

          <h2 class="kx-section-title">Start with one local-first script.</h2>

          <p class="kx-section-lead">
            Try Kordex with a small JavaScript file, then explore permissions,
            native modules, and Softadastra local-first storage.
          </p>

          <div class="kx-button-row kx-final-cta__actions">
            <CTAButton href="/docs/guide/getting-started.html">
              Get started
            </CTAButton>

            <CTAButton href="/docs/modules/" variant="secondary">
              Explore modules
            </CTAButton>
          </div>
        </div>

        <TerminalWindow title="terminal" command="kordex run main.js">
          <CodeBlock :code="code" />
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script setup>
import CTAButton from "../common/CTAButton.vue";
import CodeBlock from "../common/CodeBlock.vue";
import TerminalWindow from "../common/TerminalWindow.vue";

const code = `console.log("Hello from Kordex");`;
</script>

<style scoped>
.kx-final-cta {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
  gap: 44px;
  padding: 42px;
}

.kx-final-cta__content {
  max-width: 680px;
}

.kx-final-cta__actions {
  margin-top: 30px;
}

@media (max-width: 900px) {
  .kx-final-cta {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
