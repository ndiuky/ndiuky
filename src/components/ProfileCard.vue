<script setup lang="ts">
import { birthDate } from "@/data/landing";
import type { Profile, Stat } from "@/data/landing";
import LiveAge from "./LiveAge.vue";

defineProps<{
  profile: Profile;
  stats: Stat[];
  isGithubLoading: boolean;
}>();
</script>

<template>
  <section class="profile-card" aria-label="Profile summary">
    <div class="card-glow" aria-hidden="true" />

    <div class="avatar-frame">
      <img :src="profile.avatar" alt="ndiuky GitHub avatar" />
      <span class="status-pill">{{ profile.status }}</span>
    </div>

    <p class="eyebrow">kawaii web room // {{ profile.location }}</p>
    <h1>I'm {{ profile.handle }}</h1>
    <p class="real-name">{{ profile.name }}</p>
    <p class="bio">{{ profile.bio }}</p>
    <LiveAge :birth-date="birthDate" />

    <div class="stat-row" aria-label="GitHub stats">
      <div v-for="item in stats" :key="item.label" class="stat-card">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <div class="action-row">
      <a class="primary-action" :href="profile.githubUrl">Open GitHub</a>
      <a class="ghost-action" href="mailto:anod100002@gmail.com">Say hello</a>
    </div>
  </section>
</template>
