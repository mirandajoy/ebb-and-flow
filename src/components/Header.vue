<script setup>
import { defineProps } from 'vue';
import { useThemeStore } from "../stores/theme.js";
import ThemeOptions from './ThemeOptions.vue';
const store = useThemeStore();
const props = defineProps(['activeThemeName'])
</script>
<template>
    <header class="header">
        <div class="inner-container">
            <h3 class="logo">Ebb & Flow <span class="mini-text">with the</span> <span class="highlight">{{
                store.activeTheme.categoryName
                    }}</span>
            </h3>
        </div>
        <ThemeOptions />
    </header>
</template>
<style scoped>
.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2rem;
    box-sizing: border-box;
    position: fixed;
}

.inner-container {
    background-color: var(--secondary-background-color-transparent);
    border-bottom-right-radius: 20px;
    height: 100%;
    width: fit-content;
    padding: 1.5rem 8rem 1rem 2rem;
}

.logo {
    color: var(--font-color-light);
    font-size: 1.75rem;
    line-height: 2.2rem;
    padding-top: 0.25rem;
    font-weight: 400;
}

.mini-text {
    font-size: 1.25rem;
}

.highlight {
    color: var(--highlight-color);
    font-family: "Great Vibes", cursive;
    margin-left: 0.5rem;
    font-weight: 400;
    font-size: 2.75rem;
}
</style>