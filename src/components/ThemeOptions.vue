<script setup>
import Button from './Button.vue';
import { useThemeStore } from "../stores/theme.js"
const store = useThemeStore();
const updateTheme = (id) => {
    const newTheme = store.themesList.find(theme => theme.id === id)
    if (!newTheme) {
        error.log("No matching theme found")
    } else {
        store.changeTheme(newTheme)
    }
}
</script>
<template>
    <div class="themes-container">
        <Button v-for="theme in store.themesList" :id=theme.id :label=theme.categoryName clickEvent="change-theme"
            @change-theme="updateTheme" :active="store.activeTheme.id === theme.id" />
    </div>
</template>
<style scoped>
.themes-container {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}
</style>