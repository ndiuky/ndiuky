<script setup lang="ts">
import type { Contact } from "@/data/landing";

defineProps<{
  contacts: Contact[];
}>();
</script>

<template>
  <article class="panel contact-panel">
    <div class="panel-title">
      <span>contact cards</span>
      <small>online</small>
    </div>

    <div class="contact-grid">
      <a v-for="contact in contacts" :key="contact.label" :href="contact.href">
        <span>{{ contact.label }}</span>
        <strong>{{ contact.value }}</strong>
      </a>
    </div>
  </article>
</template>
