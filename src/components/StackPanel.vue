<script setup lang="ts">
defineProps<{
  stack: string[];
}>();
</script>

<template>
  <article class="panel stack-panel">
    <div class="panel-title">
      <span>hard skills patch</span>
      <small>v3.5</small>
    </div>

    <div class="tag-cloud">
      <span v-for="item in stack" :key="item">#{{ item }}</span>
    </div>
  </article>
</template>
