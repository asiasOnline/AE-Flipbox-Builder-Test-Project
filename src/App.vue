<template>
  <div class="app-shell">
    <header class="app-header">
      <h1 class="text-4xl font-bold">Flipbox Builder</h1>
    </header>
    <main class="app-main">
      <section class="panel" aria-labelledby="builder-heading">
        <h2 id="builder-heading" class="text-3xl font-semibold mb-4">Builder</h2>
        <FlipboxBuilder v-model="flipbox" />
      </section>

      <section class="panel" aria-labelledby="preview-heading">
        <h2 id="preview-heading" class="text-3xl font-semibold mb-4">Preview</h2>
        <FlipboxPreview :flipbox="flipbox" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { loadFromStorage, saveToStorage } from './composables/usePersistence.js';
import FlipboxBuilder from './components/FlipboxBuilder.vue';
import FlipboxPreview from './components/FlipboxPreview.vue';

const STORAGE_KEY = 'flipbox-builder:v1';

const DEFAULTS = {
    front: '',
    back: '',
}

const saved = loadFromStorage(STORAGE_KEY, null);

const flipbox = ref({
  ...DEFAULTS,
  ...(saved || {}),
});

let saveTimer;

watch(
  flipbox, 
  (value) => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveToStorage(STORAGE_KEY, value);
    }, 300)
  },
  { deep: true }
);
</script>

<style scoped>
.app-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.app-header {
  margin-bottom: 24px;
}

.app-header h1 {
  margin: 0;
}

.app-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.panel {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 16px;
  background: #ffffff;
}

.panel h2 {
  margin-top: 0;
}

@media (max-width: 720px) {
  .app-main {
    grid-template-columns: 1fr;
  }
}
</style>
