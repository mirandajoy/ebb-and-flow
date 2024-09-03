<script setup>
import { ref } from 'vue';
import ImageGrid from './components/ImageGrid.vue';
import Button from './components/Button.vue';
import { themeOptions } from './constants/themeOptions.js';
const activeTheme = ref(themeOptions[0])
const updateTheme = (id) => {
  const newTheme = themeOptions.find(theme => theme.id === id)
  if (!newTheme) {
    error.log("No matching theme found")
  } else {
    activeTheme.value = newTheme
  }
}
</script>

<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="header">Experience the <span class="highlight">{{ activeTheme.categoryName }}</span></div>
      <div class="themes-container">
        <Button v-for="theme in themeOptions" :id=theme.id :label=theme.categoryName clickEvent="change-theme"
          @change-theme="updateTheme" :active="activeTheme.id === theme.id" />
      </div>
      <ImageGrid :activeTheme=activeTheme />
    </div>
  </div>
</template>

<style scoped>
.outer-container {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.inner-container {
  color: white;
  max-width: 80rem;
  text-align: center;
}

.header {
  font-size: 3rem;
}

.highlight {
  position: relative;
  z-index: 1;
  margin-left: 0.5rem
}

.highlight::before {
  content: "";
  background-color: rgb(70, 70, 70);
  border-radius: 4px;
  display: block;
  position: absolute;
  top: 0.125rem;
  left: -0.35rem;
  width: calc(100% + 0.75rem);
  height: 85%;
  z-index: -1;
}

.highlight::after {
  content: "";
  background-color: rgb(255, 217, 63);
  border-radius: 4px;
  display: block;
  position: absolute;
  top: 0.4rem;
  left: 0.25rem;
  width: calc(100% + 0.5rem);
  height: 85%;
  z-index: -2;
}

.themes-container {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  padding-block: 3rem 1rem;
}
</style>
