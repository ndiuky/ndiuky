<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  AnimeCursor,
  BackgroundEffects,
  ContactPanel,
  NotFoundPage,
  ProfileCard,
  SiteFooter,
  SiteHeader,
  StackPanel,
  TerminalPanel,
  WebringPanel,
} from "@/components";
import { useGithubProfile } from "@/composables/useGithubProfile";
import { contacts, floatingTokens, langs, stack } from "@/data/landing";

const currentPath = ref(window.location.pathname);
const isHomeRoute = computed(() => currentPath.value === "/" || currentPath.value === "/index.html");
const { isGithubLoading, profile, stats } = useGithubProfile();

const syncPath = () => {
  currentPath.value = window.location.pathname;
};

onMounted(() => window.addEventListener("popstate", syncPath));
onUnmounted(() => window.removeEventListener("popstate", syncPath));
</script>

<template>
  <div class="landing">
    <BackgroundEffects :floating-tokens="floatingTokens" />
    <AnimeCursor />
    <SiteHeader />

    <main v-if="isHomeRoute" class="hero">
      <ProfileCard :is-github-loading="isGithubLoading" :profile="profile" :stats="stats" />

      <section class="dashboard" aria-label="About ndiuky">
        <TerminalPanel :langs="langs" />
        <StackPanel :stack="stack" />
        <WebringPanel />
        <ContactPanel :contacts="contacts" />
      </section>
    </main>

    <NotFoundPage v-else :path="currentPath" />

    <SiteFooter v-if="isHomeRoute" />
  </div>
</template>

<style>
.landing {
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 100svh;
  overflow: hidden;
  color: #fff7ff;
  isolation: isolate;
}

.anime-bg,
.dream-gradient,
.scanlines,
.glitter {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.anime-bg {
  z-index: -5;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.25) contrast(1.08) brightness(0.72);
  transform: scale(1.02);
}

.dream-gradient {
  z-index: -4;
  background:
    radial-gradient(circle at 18% 20%, rgb(255 137 218 / 0.5), transparent 30rem),
    radial-gradient(circle at 88% 12%, rgb(127 237 255 / 0.4), transparent 28rem),
    linear-gradient(135deg, rgb(34 8 55 / 0.72), rgb(10 4 24 / 0.58) 52%, rgb(58 7 55 / 0.78));
}

.scanlines {
  z-index: 8;
  opacity: 0.18;
  mix-blend-mode: screen;
  background: repeating-linear-gradient(
    0deg,
    rgb(255 255 255 / 0.14) 0,
    rgb(255 255 255 / 0.14) 1px,
    transparent 1px,
    transparent 4px
  );
}

.glitter {
  z-index: -3;
  opacity: 0.36;
  background-image:
    radial-gradient(circle, rgb(255 255 255 / 0.85) 0 1px, transparent 1.5px),
    radial-gradient(circle, rgb(255 121 218 / 0.9) 0 1px, transparent 1.5px),
    radial-gradient(circle, rgb(125 235 255 / 0.85) 0 1px, transparent 1.5px);
  background-position: 0 0, 40px 70px, 90px 20px;
  background-size: 120px 120px, 150px 150px, 180px 180px;
  animation: twinkle 7s linear infinite;
}

.floating-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.float-token {
  position: absolute;
  left: var(--x);
  bottom: -12vh;
  padding: 0.35rem 0.7rem;
  border: 1px solid rgb(255 255 255 / 0.34);
  border-radius: 999px;
  background: rgb(255 181 232 / 0.18);
  box-shadow: 0 0 30px rgb(255 137 218 / 0.32);
  color: #ffe9fb;
  font-size: var(--size);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: rotate(var(--rotate));
  animation: float-up var(--duration) linear infinite;
  animation-delay: var(--delay);
}

.topbar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1880px, calc(100% - 1.5rem));
  margin: 0 auto;
  padding: 1.2rem 0;
}

.brand,
.nav,
.panel,
.not-found-card,
.profile-card {
  border: 1px solid rgb(255 255 255 / 0.2);
  background: linear-gradient(135deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.08));
  box-shadow: 0 24px 70px rgb(25 0 40 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.22);
  backdrop-filter: blur(18px) saturate(1.35);
}

.brand {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  padding: 0.62rem 0.9rem;
  border-radius: 999px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-decoration: none;
}

.brand-dot {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 999px;
  background: #ff70c8;
  box-shadow: 0 0 20px #ff70c8, 0 0 34px #70f3ff;
}

.nav {
  display: flex;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: 999px;
}

.nav a {
  padding: 0.55rem 0.88rem;
  border-radius: 999px;
  color: rgb(255 247 255 / 0.84);
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: 180ms ease;
}

.nav a:hover {
  color: #27102f;
  background: #fff0fb;
}

.hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(390px, 0.78fr) minmax(0, 1.22fr);
  gap: 1.5rem;
  align-items: stretch;
  width: min(1880px, calc(100% - 1.5rem));
  margin: 1.2rem auto 0;
  padding-bottom: 5rem;
}

.profile-card,
.panel {
  position: relative;
  overflow: hidden;
  border-radius: 34px;
}

.profile-card {
  display: flex;
  min-height: 660px;
  flex-direction: column;
  justify-content: center;
  padding: clamp(1.3rem, 4vw, 3rem);
}

.profile-card::before,
.panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(90deg, transparent, rgb(255 255 255 / 0.18), transparent),
    repeating-linear-gradient(90deg, transparent 0 20px, rgb(255 255 255 / 0.04) 20px 21px);
  transform: translateX(-100%);
  animation: sheen 8s ease-in-out infinite;
}

.card-glow {
  position: absolute;
  top: -26%;
  right: -22%;
  width: 22rem;
  height: 22rem;
  border-radius: 999px;
  background: rgb(255 102 201 / 0.28);
  filter: blur(20px);
}

.avatar-frame {
  position: relative;
  width: 10.5rem;
  height: 10.5rem;
  margin-bottom: 1.4rem;
  padding: 0.42rem;
  border-radius: 36px;
  background: conic-gradient(from 180deg, #ff73d7, #88f5ff, #fff7b8, #ff73d7);
  box-shadow: 0 18px 60px rgb(255 112 200 / 0.34);
  transform: rotate(-3deg);
}

.avatar-frame img {
  width: 100%;
  height: 100%;
  border: 4px solid rgb(255 255 255 / 0.72);
  border-radius: 30px;
  object-fit: cover;
}

.status-pill {
  position: absolute;
  right: -0.9rem;
  bottom: 0.7rem;
  padding: 0.44rem 0.72rem;
  border: 1px solid rgb(255 255 255 / 0.62);
  border-radius: 999px;
  background: #9bffef;
  box-shadow: 0 0 28px rgb(155 255 239 / 0.62);
  color: #172b32;
  font-size: 0.75rem;
  font-weight: 1000;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow,
.real-name {
  margin: 0;
  color: #ffd5f4;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1 {
  max-width: 11ch;
  margin: 0.42rem 0 0;
  font-size: clamp(4rem, 9vw, 7.4rem);
  line-height: 0.82;
  letter-spacing: -0.08em;
  text-shadow: 0 0 30px rgb(255 98 205 / 0.34), 0 10px 0 rgb(77 20 87 / 0.32);
}

h1 span {
  display: block;
  color: #fff;
  -webkit-text-stroke: 1px rgb(255 255 255 / 0.36);
}

.real-name {
  margin-top: 1.15rem;
  color: #bdf8ff;
}

.bio {
  max-width: 42rem;
  margin: 1.15rem 0 0;
  color: rgb(255 247 255 / 0.86);
  font-size: 1.12rem;
  line-height: 1.75;
}

.age-card {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  align-items: baseline;
  width: max-content;
  max-width: 100%;
  margin-top: 1.05rem;
  padding: 0.62rem 0.82rem;
  border: 1px solid rgb(255 255 255 / 0.22);
  border-radius: 999px;
  background: linear-gradient(135deg, rgb(255 121 218 / 0.18), rgb(141 249 255 / 0.12));
  box-shadow: 0 0 28px rgb(255 121 218 / 0.2), inset 0 1px 0 rgb(255 255 255 / 0.18);
  color: rgb(255 247 255 / 0.8);
  font-size: 0.9rem;
  font-weight: 1000;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.age-card strong {
  color: #fff;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: clamp(1.05rem, 1.55vw, 1.55rem);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  text-shadow: 0 0 14px rgb(141 249 255 / 0.72), 0 0 26px rgb(255 121 218 / 0.55);
  animation: age-pulse 1.2s ease-in-out infinite alternate;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.stat-card {
  padding: 0.95rem;
  border: 1px solid rgb(255 255 255 / 0.2);
  border-radius: 24px;
  background: rgb(255 255 255 / 0.1);
}

.stat-card strong {
  display: block;
  font-size: 1.8rem;
  line-height: 1;
}

.stat-card span {
  color: rgb(255 247 255 / 0.66);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.6rem;
}

.primary-action,
.ghost-action {
  display: inline-flex;
  min-height: 3.2rem;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.15rem;
  border-radius: 999px;
  font-weight: 1000;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: 180ms ease;
}

.primary-action {
  background: linear-gradient(135deg, #ff75cf, #fff0a6 52%, #8bf8ff);
  color: #32153d;
  box-shadow: 0 16px 42px rgb(255 117 207 / 0.35);
}

.ghost-action {
  border: 1px solid rgb(255 255 255 / 0.28);
  color: #fff7ff;
  background: rgb(255 255 255 / 0.08);
}

.github-sync {
  display: inline-flex;
  min-height: 3.2rem;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 0.9rem;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  color: rgb(255 247 255 / 0.72);
  background: rgb(255 255 255 / 0.08);
  font-size: 0.72rem;
  font-weight: 1000;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.github-sync--loading {
  color: #bdf8ff;
  animation: sync-blink 0.9s steps(2) infinite;
}

.primary-action:hover,
.ghost-action:hover,
.contact-grid a:hover,
.badge-link:hover,
.webring-links a:hover {
  transform: translateY(-3px);
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;
}

.panel {
  padding: 1.2rem;
}

.terminal-card,
.contact-panel {
  grid-column: 1 / -1;
}

.terminal-head,
.panel-title {
  display: flex;
  align-items: center;
}

.terminal-head {
  gap: 0.42rem;
  margin-bottom: 1rem;
}

.terminal-head span {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 999px;
}

.terminal-head span:nth-child(1) {
  background: #ff69c8;
}

.terminal-head span:nth-child(2) {
  background: #fff08c;
}

.terminal-head span:nth-child(3) {
  background: #8df9ff;
}

.terminal-head p,
.panel-title span {
  margin: 0;
  color: rgb(255 247 255 / 0.78);
  font-size: 0.78rem;
  font-weight: 1000;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.terminal-body {
  border: 1px solid rgb(255 255 255 / 0.15);
  border-radius: 24px;
  background: rgb(15 5 31 / 0.52);
  padding: 1rem;
  box-shadow: inset 0 0 32px rgb(255 112 200 / 0.08);
}

.terminal-body p {
  margin: 0 0 0.8rem;
  color: #bdf8ff;
  font-weight: 900;
}

.prompt {
  color: #ff7bd3;
}

code {
  display: grid;
  gap: 0.35rem;
  color: #fff6fd;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: clamp(0.84rem, 1.05vw, 1rem);
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
}

code span {
  font-style: normal;
}

.syntax-keyword {
  color: #ff7bd3;
  font-weight: 1000;
}

.syntax-var {
  color: #fff08c;
  font-weight: 1000;
}

.syntax-prop {
  color: #8df9ff;
}

.syntax-string {
  color: #b7ffcf;
}

.syntax-operator,
.syntax-punctuation {
  color: #ffd6f4;
}

.syntax-bracket {
  color: #f8b9ff;
  font-weight: 1000;
}

.syntax-indent {
  user-select: none;
}

.panel-title {
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.panel-title small {
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.12);
  color: #bdf8ff;
  font-weight: 900;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.tag-cloud span {
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.12);
  color: #fff0fb;
  font-weight: 900;
}

.tag-cloud span {
  padding: 0.62rem 0.75rem;
}

.webring-card {
  display: grid;
  gap: 1rem;
}

.badge-link {
  display: inline-grid;
  width: max-content;
  padding: 0.45rem;
  border: 1px solid rgb(255 255 255 / 0.2);
  border-radius: 12px;
  background: rgb(10 4 24 / 0.44);
  box-shadow: 0 0 26px rgb(141 249 255 / 0.18);
  image-rendering: pixelated;
  transition: 180ms ease;
}

.badge-link img {
  display: block;
  width: 88px;
  height: 31px;
}

.webring-links {
  display: grid;
  gap: 0.55rem;
}

.webring-links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.65rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  color: #fff7ff;
  background: rgb(255 255 255 / 0.1);
  font-size: 0.78rem;
  font-weight: 1000;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: 180ms ease;
}

.webring-links a:hover {
  color: #27102f;
  background: #bdf8ff;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.contact-grid a {
  display: grid;
  gap: 0.3rem;
  min-width: 0;
  padding: 0.85rem;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 20px;
  color: inherit;
  background: rgb(255 255 255 / 0.1);
  text-decoration: none;
  transition: 180ms ease;
}

.contact-grid span {
  color: #ffd6f4;
  font-size: 0.74rem;
  font-weight: 1000;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-grid strong {
  overflow: hidden;
  color: #fff;
  font-size: 0.95rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  max-width: calc(100% - 2rem);
  padding: 0.55rem 0.7rem;
  border: 1px solid rgb(255 255 255 / 0.18);
  border-radius: 999px;
  background: rgb(23 7 35 / 0.46);
  color: rgb(255 247 255 / 0.72);
  font-size: 0.78rem;
  font-weight: 800;
  backdrop-filter: blur(14px);
}

.footer a {
  color: #bdf8ff;
  text-decoration: none;
}

.not-found {
  position: relative;
  z-index: 2;
  display: grid;
  width: min(1880px, calc(100% - 1.5rem));
  min-height: 0;
  place-items: center;
  margin: 0 auto;
  padding: 1rem 0 4rem;
}

.not-found-card {
  position: relative;
  display: grid;
  justify-items: center;
  width: min(900px, 100%);
  overflow: hidden;
  padding: clamp(1.5rem, 5vw, 3rem);
  border-radius: 34px;
  text-align: center;
}

.not-found-kicker,
.not-found-path {
  margin: 0;
  color: #bdf8ff;
  font-weight: 1000;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.glitch-404 {
  position: relative;
  max-width: none;
  margin: 0.1rem 0 0;
  color: #fff;
  font-size: clamp(7rem, 22vw, 24rem);
  line-height: 0.78;
  letter-spacing: -0.1em;
  text-shadow: 0 0 28px rgb(141 249 255 / 0.6), 0 0 54px rgb(255 121 218 / 0.58);
  animation: glitch-flicker 1.6s steps(2) infinite;
}

.glitch-404::before,
.glitch-404::after {
  position: absolute;
  inset: 0;
  content: attr(data-text);
  pointer-events: none;
}

.glitch-404::before {
  color: #8df9ff;
  clip-path: inset(0 0 58% 0);
  transform: translate(-0.06em, -0.02em);
  animation: glitch-slice-a 0.7s steps(2) infinite;
}

.glitch-404::after {
  color: #ff7bd3;
  clip-path: inset(48% 0 0 0);
  transform: translate(0.06em, 0.02em);
  animation: glitch-slice-b 0.9s steps(2) infinite;
}

.not-found-copy {
  max-width: 32rem;
  margin: 0.7rem 0 1.4rem;
  color: rgb(255 247 255 / 0.72);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.6;
}

@keyframes float-up {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(var(--rotate));
  }

  12%,
  88% {
    opacity: 0.86;
  }

  100% {
    opacity: 0;
    transform: translate3d(28px, -118vh, 0) rotate(var(--rotate));
  }
}

@keyframes sheen {
  0%,
  42% {
    transform: translateX(-100%);
  }

  58%,
  100% {
    transform: translateX(100%);
  }
}

@keyframes twinkle {
  to {
    background-position: 120px 120px, 190px 30px, 20px 200px;
  }
}

@keyframes age-pulse {
  from {
    filter: hue-rotate(0deg);
    transform: translateY(0);
  }

  to {
    filter: hue-rotate(34deg);
    transform: translateY(-1px);
  }
}

@keyframes sync-blink {
  50% {
    opacity: 0.42;
  }
}

@keyframes glitch-flicker {
  0%,
  100% {
    filter: brightness(1);
  }

  48% {
    filter: brightness(1.55) saturate(1.4);
  }

  52% {
    filter: brightness(0.76) saturate(2);
  }
}

@keyframes glitch-slice-a {
  0%,
  100% {
    transform: translate(-0.06em, -0.02em);
  }

  45% {
    transform: translate(0.05em, 0.01em);
  }
}

@keyframes glitch-slice-b {
  0%,
  100% {
    transform: translate(0.06em, 0.02em);
  }

  55% {
    transform: translate(-0.04em, -0.01em);
  }
}

@media (min-width: 1181px) {
  html,
  body,
  #root {
    height: 100%;
    overflow: hidden;
  }

  .landing {
    height: 100vh;
    max-height: 100vh;
    min-height: 100vh;
  }

  .topbar {
    padding: 0.65rem 0;
  }

  .hero {
    gap: 1.1rem;
    height: calc(100vh - 4.2rem);
    min-height: 0;
    margin: 0 auto;
    padding-bottom: 0.8rem;
  }

  .profile-card {
    height: 100%;
    min-height: 0;
    padding: clamp(1rem, 2.1vw, 2.25rem);
  }

  .avatar-frame {
    width: clamp(7.2rem, 8vw, 10rem);
    height: clamp(7.2rem, 8vw, 10rem);
    margin-bottom: 0.9rem;
  }

  h1 {
    font-size: clamp(4.9rem, 6.7vw, 8.4rem);
  }

  .real-name {
    margin-top: 0.9rem;
  }

  .bio {
    max-width: 48rem;
    margin-top: 0.85rem;
    font-size: 1.04rem;
    line-height: 1.5;
  }

  .stat-row,
  .age-card,
  .action-row {
    margin-top: 0.95rem;
  }

  .stat-card {
    padding: 0.75rem 0.85rem;
  }

  .stat-card strong {
    font-size: 1.55rem;
  }

  .primary-action,
  .ghost-action,
  .github-sync {
    min-height: 2.9rem;
    padding: 0.72rem 1rem;
  }

  .not-found {
    height: calc(100vh - 4.2rem);
    padding: 0 0 0.8rem;
  }

  .dashboard {
    height: 100%;
    min-height: 0;
    grid-template-rows: auto auto minmax(0, 1fr);
    align-content: start;
    gap: 0.72rem;
    overflow: hidden;
  }

  .panel {
    min-height: 0;
    padding: 0.82rem 0.95rem;
  }

  .terminal-head {
    margin-bottom: 0.5rem;
  }

  .terminal-body {
    padding: 0.68rem 0.78rem;
  }

  .terminal-body p {
    margin-bottom: 0.42rem;
  }

  code {
    gap: 0.14rem;
    font-size: clamp(0.74rem, 0.68vw, 0.88rem);
    line-height: 1.34;
  }

  .panel-title {
    margin-bottom: 0.75rem;
  }

  .stack-panel,
  .webring-panel {
    min-height: 9.6rem;
  }

  .tag-cloud {
    gap: 0.45rem;
  }

  .tag-cloud span {
    padding: 0.46rem 0.62rem;
  }

  .webring-card {
    gap: 0.72rem;
  }

  .webring-links {
    gap: 0.45rem;
  }

  .webring-links a {
    min-height: 2.25rem;
    padding: 0.52rem 0.72rem;
  }

  .contact-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.52rem;
  }

  .contact-grid a {
    padding: 0.54rem 0.64rem;
  }

  .contact-grid span {
    font-size: 0.66rem;
  }

  .contact-grid strong {
    font-size: 0.78rem;
  }

  .contact-panel {
    align-self: stretch;
  }

  .footer {
    display: none;
  }
}

@media (max-width: 1180px) {
  .hero {
    grid-template-columns: 1fr;
    margin-top: 0.8rem;
  }

  .profile-card {
    min-height: auto;
  }
}

@media (max-width: 680px) {
  .topbar {
    align-items: stretch;
    flex-direction: column;
    gap: 0.75rem;
    width: min(100% - 1rem, 1880px);
  }

  .nav {
    justify-content: space-between;
  }

  .nav a {
    flex: 1;
    text-align: center;
  }

  .hero {
    width: min(100% - 1rem, 1880px);
    padding-bottom: 7rem;
  }

  .dashboard,
  .stat-row,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .profile-card,
  .panel {
    border-radius: 26px;
  }

  .avatar-frame {
    width: 8.5rem;
    height: 8.5rem;
  }

  h1 {
    font-size: clamp(3.4rem, 18vw, 5.2rem);
  }

  .footer {
    right: 0.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    justify-content: center;
    border-radius: 22px;
    text-align: center;
  }

  .footer span {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
