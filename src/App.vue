<script setup>
import { ref } from 'vue';
import ImageGrid from './components/ImageGrid.vue';
import Header from './components/Header.vue'
import ThemeOptions from './components/ThemeOptions.vue';
import { themeOptions } from './constants/themeOptions.js';
const activeTheme = ref(themeOptions[0])
</script>

<template>
  <div class="outer-container">
    <Header />
    <main class="inner-container">
      <ImageGrid :activeTheme=activeTheme />
    </main>
  </div>
</template>

<style scoped>
.outer-container {
  background-color: var(--primary-background-color);
  min-height: 100vh;
}
</style>
