<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import axios from 'axios';
import { useThemeStore } from "../stores/theme.js"
const store = useThemeStore();
const unsplashKey = import.meta.env.VITE_UNSPLASH_KEY;
const activeThemeSubOption = ref(null)
const imageStore = new Map();
const images = ref(null)
const getImages = async (keyword, themeSubOption) => {
    const themeId = `${store.activeTheme.id}${themeSubOption}`
    if (imageStore.has(themeId)) {
        const updatedImages = imageStore.get(themeId)
        images.value = updatedImages.data
        activeThemeSubOption.value = themeSubOption
        return
    }
    try {
        const res = await axios.get(`https://api.unsplash.com//photos/random?Accept-Version:=v1&count=30&client_id=${unsplashKey}&query=${keyword}`)
        images.value = res.data
        activeThemeSubOption.value = themeSubOption
        imageStore.set(themeId, res);
    } catch (err) {
        console.log(err)
    }
}
const rotateImages = () => {
    const newSubOption = activeThemeSubOption.value === store.activeTheme.themeSubOption.length - 1 ? 0 : activeThemeSubOption.value + 1
    getImages(store.activeTheme.themeSubOption[newSubOption].keyword, newSubOption)
}
onMounted(() => {
    getImages(store.activeTheme.themeSubOption[0].keyword, 0)
    const interval = setInterval(rotateImages, 6000);
    onBeforeUnmount(() => {
        clearInterval(interval);
    });
})
watch(
    () => store.activeTheme,
    (newValue, oldValue) => {
        getImages(store.activeTheme.themeSubOption[0].keyword, 0)
        activeThemeSubOption.value = 0
    }
);
</script>
<template>
    <div class="grid">
        <img v-if="images" v-for="image in images.slice(0, 12)" :src="image.urls.small" class="image" />
    </div>
</template>
<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.image {
    width: calc(25% - (1.5rem / 4));
    aspect-ratio: 4 / 3;
    object-position: center;
    object-fit: cover;
}
</style>