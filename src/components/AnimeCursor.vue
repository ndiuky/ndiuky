<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  driftX: string;
  driftY: string;
  size: string;
};

const isVisible = ref(false);
const isPressed = ref(false);
const x = ref(0);
const y = ref(0);
const sparkles = ref<Sparkle[]>([]);

let sparkleId = 0;
let lastSparkleAt = 0;
let finePointer = false;

const pushSparkle = (clientX: number, clientY: number) => {
  const now = performance.now();

  if (now - lastSparkleAt < 42) return;

  lastSparkleAt = now;
  const id = sparkleId++;

  sparkles.value.push({
    id,
    x: clientX,
    y: clientY,
    driftX: `${Math.random() * 30 - 15}px`,
    driftY: `${-18 - Math.random() * 24}px`,
    size: `${5 + Math.random() * 8}px`,
  });

  window.setTimeout(() => {
    sparkles.value = sparkles.value.filter((sparkle) => sparkle.id !== id);
  }, 680);
};

const handlePointerMove = (event: PointerEvent) => {
  if (!finePointer) return;

  x.value = event.clientX;
  y.value = event.clientY;
  isVisible.value = true;
  pushSparkle(event.clientX, event.clientY);
};

const handlePointerLeave = () => {
  isVisible.value = false;
};

const handlePointerDown = () => {
  isPressed.value = true;
};

const handlePointerUp = () => {
  isPressed.value = false;
};

onMounted(() => {
  finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!finePointer) return;

  document.body.classList.add("anime-cursor-enabled");
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointerup", handlePointerUp);
});

onUnmounted(() => {
  document.body.classList.remove("anime-cursor-enabled");
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerleave", handlePointerLeave);
  window.removeEventListener("pointerdown", handlePointerDown);
  window.removeEventListener("pointerup", handlePointerUp);
});
</script>

<template>
  <div
    class="anime-cursor"
    :class="{ 'anime-cursor--visible': isVisible, 'anime-cursor--pressed': isPressed }"
    :style="{ '--cursor-x': `${x}px`, '--cursor-y': `${y}px` }"
    aria-hidden="true"
  >
    <span class="anime-cursor__ear anime-cursor__ear--left" />
    <span class="anime-cursor__ear anime-cursor__ear--right" />
    <span class="anime-cursor__orb" />
    <span class="anime-cursor__shine" />
  </div>

  <span
    v-for="sparkle in sparkles"
    :key="sparkle.id"
    class="anime-cursor-sparkle"
    :style="{
      '--sparkle-x': `${sparkle.x}px`,
      '--sparkle-y': `${sparkle.y}px`,
      '--sparkle-drift-x': sparkle.driftX,
      '--sparkle-drift-y': sparkle.driftY,
      '--sparkle-size': sparkle.size,
    }"
    aria-hidden="true"
  />
</template>

<style>
@media (pointer: fine) {
  body.anime-cursor-enabled,
  body.anime-cursor-enabled * {
    cursor: none !important;
  }
}

.anime-cursor,
.anime-cursor-sparkle {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}

.anime-cursor {
  display: none;
  width: 30px;
  height: 30px;
  opacity: 0;
  transform: translate3d(calc(var(--cursor-x) - 9px), calc(var(--cursor-y) - 8px), 0) scale(0.86);
  transition: opacity 120ms ease, transform 70ms ease;
}

.anime-cursor--visible {
  opacity: 1;
}

.anime-cursor--pressed {
  transform: translate3d(calc(var(--cursor-x) - 9px), calc(var(--cursor-y) - 8px), 0) scale(0.72) rotate(-8deg);
}

.anime-cursor__orb {
  position: absolute;
  inset: 6px 5px 5px 5px;
  border: 1px solid rgb(255 255 255 / 0.86);
  border-radius: 56% 48% 54% 46%;
  background:
    radial-gradient(circle at 36% 34%, #fff 0 8%, transparent 9%),
    linear-gradient(135deg, #ff7bd3, #fff4a8 55%, #8df9ff);
  box-shadow: 0 0 12px rgb(255 123 211 / 0.8), 0 0 24px rgb(141 249 255 / 0.45);
}

.anime-cursor__ear {
  position: absolute;
  top: 2px;
  width: 12px;
  height: 12px;
  border: 1px solid rgb(255 255 255 / 0.78);
  background: linear-gradient(135deg, #ff9edf, #fff1ac);
  box-shadow: 0 0 12px rgb(255 123 211 / 0.52);
}

.anime-cursor__ear--left {
  left: 5px;
  border-radius: 80% 18% 45% 18%;
  transform: rotate(-28deg) skewY(12deg);
}

.anime-cursor__ear--right {
  right: 5px;
  border-radius: 18% 80% 18% 45%;
  transform: rotate(28deg) skewY(-12deg);
}

.anime-cursor__shine {
  position: absolute;
  top: 7px;
  left: 7px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.86);
  filter: blur(0.2px);
}

.anime-cursor__label {
  position: absolute;
  top: 21px;
  left: 18px;
  padding: 0.16rem 0.32rem;
  border: 1px solid rgb(255 255 255 / 0.42);
  border-radius: 999px;
  background: rgb(23 7 35 / 0.58);
  color: #fff7ff;
  font-size: 0.54rem;
  font-weight: 1000;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.anime-cursor-sparkle {
  display: none;
  width: var(--sparkle-size);
  height: var(--sparkle-size);
  border: 1px solid rgb(255 255 255 / 0.76);
  border-radius: 35% 65% 35% 65%;
  background: linear-gradient(135deg, #fff, #ff8bdd 45%, #8df9ff);
  box-shadow: 0 0 12px rgb(255 123 211 / 0.62);
  transform: translate3d(var(--sparkle-x), var(--sparkle-y), 0) rotate(45deg);
  animation: cursor-sparkle 680ms ease-out forwards;
}

@media (pointer: fine) {
  .anime-cursor,
  .anime-cursor-sparkle {
    display: block;
  }
}

@keyframes cursor-sparkle {
  to {
    opacity: 0;
    transform: translate3d(
        calc(var(--sparkle-x) + var(--sparkle-drift-x)),
        calc(var(--sparkle-y) + var(--sparkle-drift-y)),
        0
      )
      rotate(180deg)
      scale(0.24);
  }
}

@media (prefers-reduced-motion: reduce) {
  body.anime-cursor-enabled,
  body.anime-cursor-enabled * {
    cursor: auto !important;
  }

  .anime-cursor,
  .anime-cursor-sparkle {
    display: none !important;
  }
}
</style>
