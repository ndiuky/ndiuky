<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  birthDate: string;
}>();

const age = ref(0);
const yearMs = 365.2425 * 24 * 60 * 60 * 1000;
let frame = 0;

const birthTime = computed(() => new Date(props.birthDate).getTime());
const ageLabel = computed(() => age.value.toFixed(10));

const tick = () => {
  age.value = (Date.now() - birthTime.value) / yearMs;
  frame = window.requestAnimationFrame(tick);
};

onMounted(tick);
onUnmounted(() => window.cancelAnimationFrame(frame));
</script>

<template>
  <div class="age-card" aria-label="Live age counter">
    <span>I am </span>
    <strong>{{ ageLabel }}</strong>
    <span>y.o.</span>
  </div>
</template>
