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
        const res = await axios.get(`https://api.unsplash.com//photos/random?Accept-Version:=v1&content_filter=high&count=30&client_id=${unsplashKey}&query=${keyword}`)
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
    const interval = setInterval(rotateImages, 10000);
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
    <p class="instructions instructions-start">Breathe in...</p>
    <p class="instructions instructions-end">Breathe out</p>
</template>
<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.grid::after {
    background: radial-gradient(circle, var(--primary-background-color-light-transparent) 30%, var(--secondary-background-color) 70%, var(--primary-background-color) 100%);
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.1;
    animation: 10s ease-in-out pulse infinite;
}

@keyframes pulse {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        opacity: 0.6;
    }
}

.image {
    width: calc(25% - (1.5rem / 4));
    aspect-ratio: 4 / 3;
    object-position: center;
    object-fit: cover;
    animation: 10s ease-in-out fade-in infinite;
    opacity: 0;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
}

.instructions {
    color: white;
    position: absolute;
    top: 8rem;
    width: 100%;
    text-align: center;
    opacity: 0;
    font-size: 1rem;
}

.instructions-start {
    animation: 10s ease-in-out text-hide infinite;
}

@keyframes text-hide {
    0% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    40% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.instructions-end {
    animation: 10s ease-in-out text-show infinite;
}

@keyframes text-show {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    70% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>