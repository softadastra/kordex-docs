<template>
  <section class="kx-section">
    <div class="kx-container kx-split">
      <div>
        <span class="kx-eyebrow"> Local-first by design </span>

        <h2 class="kx-section-title">Local state first. Network later.</h2>

        <p class="kx-section-lead">
          A Kordex app can write useful durable state before a remote server is
          reachable. That is the foundation of offline-ready and sync-ready
          software.
        </p>

        <ul class="kx-list">
          <li>Capture data locally without waiting for a backend.</li>
          <li>Keep state durable across runs with Softadastra storage.</li>
          <li>
            Prepare synchronization as a later step instead of a requirement.
          </li>
        </ul>
      </div>

      <TerminalWindow
        title="local-first.js"
        command="kordex run local-first.js --allow-softadastra"
      >
        <CodeBlock :code="code" />
      </TerminalWindow>
    </div>
  </section>
</template>

<script setup>
import CodeBlock from "../common/CodeBlock.vue";
import TerminalWindow from "../common/TerminalWindow.vue";

const code = `import * as softadastra from "kordex:softadastra";

softadastra.open(
  "durable",
  "field-app",
  ".kordex/data/app.wal"
);

softadastra.put("task:1", "Captured offline");
softadastra.put("task:2", "Ready to sync later");

console.log("local records:", softadastra.size());

softadastra.close();`;
</script>
