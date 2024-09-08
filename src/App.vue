<script setup>
import ImageGrid from './components/ImageGrid.vue';
import Header from './components/Header.vue';
import { themeOptions } from './constants/themeOptions.js';
</script>

<template>
  <div class="outer-container">
    <Header />
    <main class="inner-container">
      <ImageGrid />
    </main>
  </div>
</template>

<style scoped>
.outer-container {
  background-color: var(--primary-background-color);
  min-height: 100vh;
}
</style>
