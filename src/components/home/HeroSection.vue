<template>
  <section class="kx-section kx-section--hero">
    <div class="kx-container kx-hero">
      <div class="kx-hero-content">
        <span class="kx-eyebrow">
          JavaScript runtime for local-first applications
        </span>

        <h1 class="kx-title">
          Reliable
          <span class="kx-gradient-text">local-first</span>
          JavaScript.
        </h1>

        <p class="kx-subtitle kx-hero-copy">
          Kordex is a JavaScript and TypeScript runtime for local execution,
          explicit native permissions, and durable local state powered by
          Softadastra foundations.
        </p>

        <div class="kx-button-row kx-hero-actions">
          <CTAButton href="/docs/guide/getting-started.html">
            Get started
          </CTAButton>

          <CTAButton href="/docs/" variant="secondary">
            Read the docs
          </CTAButton>
        </div>

        <div class="kx-hero-proof">
          <Badge label="Local execution" dot />
          <Badge label="Explicit permissions" variant="soft" dot />
          <Badge label="Durable state" variant="soft" dot />
        </div>
      </div>

      <div class="kx-hero-visual">
        <TerminalWindow
          title="main.js"
          command="kordex run main.js --allow-softadastra"
        >
          <CodeBlock :code="heroCode" />
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<script setup>
import Badge from "../common/Badge.vue";
import CTAButton from "../common/CTAButton.vue";
import CodeBlock from "../common/CodeBlock.vue";
import TerminalWindow from "../common/TerminalWindow.vue";

const heroCode = `import * as softadastra from "kordex:softadastra";

softadastra.open(
  "durable",
  "notes",
  ".kordex/data/notes.wal"
);

softadastra.put("status", "saved locally");

console.log(softadastra.get("status"));

softadastra.close();`;
</script>
