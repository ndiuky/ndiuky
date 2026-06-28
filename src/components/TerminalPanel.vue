<script setup lang="ts">
defineProps<{
  langs: string[];
}>();
</script>

<template>
  <article class="terminal-card panel">
    <div class="terminal-head">
      <span />
      <span />
      <span />
      <p>terminal</p>
    </div>

    <div class="terminal-body" aria-label="about-me.ts snippet">
      <p><span class="prompt">$</span> cat about-me.ts</p>
      <code>
        <span><span class="syntax-keyword">export</span> <span class="syntax-keyword">const</span> <span class="syntax-var">ndiuky</span> <span class="syntax-operator">=</span> <span class="syntax-bracket">{{ "{" }}</span></span>
        <span><span class="syntax-indent">  </span><span class="syntax-prop">name</span><span class="syntax-punctuation">:</span> <span class="syntax-string">"Farid Tipayev"</span><span class="syntax-punctuation">,</span></span>
        <span><span class="syntax-indent">  </span><span class="syntax-prop">alias</span><span class="syntax-punctuation">:</span> <span class="syntax-string">"Merlin Sparrow"</span><span class="syntax-punctuation">,</span></span>
        <span><span class="syntax-indent">  </span><span class="syntax-prop">location</span><span class="syntax-punctuation">:</span> <span class="syntax-string">"Baku, Azerbaijan"</span><span class="syntax-punctuation">,</span></span>
        <span><span class="syntax-indent">  </span><span class="syntax-prop">bio</span><span class="syntax-punctuation">:</span> <span class="syntax-string">"Web enthusiast"</span><span class="syntax-punctuation">,</span></span>
        <span><span class="syntax-indent">  </span><span class="syntax-prop">langs</span><span class="syntax-punctuation">:</span> <span class="syntax-bracket">[</span><span class="syntax-string">{{ langs.map((lang) => `"${lang}"`).join(", ") }}</span><span class="syntax-bracket">]</span><span class="syntax-punctuation">,</span></span>
        <span><span class="syntax-bracket">{{ "}" }}</span><span class="syntax-punctuation">;</span></span>
      </code>
    </div>
  </article>
</template>
