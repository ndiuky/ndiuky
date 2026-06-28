<script setup lang="ts">
defineProps<{
  path: string;
}>();
</script>

<template>
  <main class="not-found" aria-label="Page not found">
    <div class="not-found-card">
      <p class="not-found-kicker">route not found</p>
      <h1 class="glitch-404" data-text="404">404</h1>
      <p class="not-found-path">{{ path }}</p>
      <p class="not-found-copy">blog is still compiling dreams. try home instead.</p>
      <a class="primary-action" href="/">Back home</a>
    </div>
  </main>
</template>
