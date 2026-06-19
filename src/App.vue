<template>
  <div class="site">
    <header class="nav">
      <a href="/" class="brand">
        <span class="brand-mark">K</span>
        <span>Kordex</span>
      </a>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/download">Download</RouterLink>

        <!-- Important: /docs doit rester un vrai lien, pas un RouterLink -->
        <a href="/docs/">Docs</a>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
