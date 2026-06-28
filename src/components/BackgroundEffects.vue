<script setup lang="ts">
import type { FloatingToken } from "@/data/landing";

defineProps<{
  floatingTokens: FloatingToken[];
}>();
</script>

<template>
  <img class="anime-bg" src="/anime.gif" alt="" aria-hidden="true" />
  <div class="dream-gradient" aria-hidden="true" />
  <div class="scanlines" aria-hidden="true" />
  <div class="glitter" aria-hidden="true" />

  <div class="floating-layer" aria-hidden="true">
    <span
      v-for="token in floatingTokens"
      :key="`${token.text}-${token.x}`"
      class="float-token"
      :style="{
        '--x': token.x,
        '--delay': token.delay,
        '--duration': token.duration,
        '--size': token.size,
        '--rotate': token.rotate,
      }"
    >
      {{ token.text }}
    </span>
  </div>
</template>
