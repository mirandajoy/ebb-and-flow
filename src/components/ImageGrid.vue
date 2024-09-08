<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from 'axios';
import JSZip from 'jszip';
import { useThemeStore } from "../stores/theme.js";
const store = useThemeStore();
const activeThemeSubOption = ref(null)
const images = ref([]);
const error = ref(null);
const getImages = async (themeSubOption) => {
    const theme = store.activeTheme.categoryName.toLowerCase()
    const subtheme = store.activeTheme.themeSubOption[themeSubOption].keyword
    try {
        const response = await axios.get(`https://ebb-and-flow-defd563052e0.herokuapp.com/images?theme=${theme}&subtheme=${subtheme}`, {
            responseType: 'arraybuffer'
        });

        const zip = await JSZip.loadAsync(response.data);
        const imageFiles = [];

        for (const filename in zip.files) {
            if (zip.files[filename].name.match(/\.(png|jpg|jpeg|gif)$/)) {
                const file = await zip.files[filename].async('base64');
                const imageSrc = `data:image/jpeg;base64,${file}`;
                imageFiles.push(imageSrc);
            }
        }

        if (imageFiles.length === 0) {
            error.value = 'No images found matching the keyword.';
        } else {
            images.value = imageFiles;
            activeThemeSubOption.value = themeSubOption;
        }
    } catch (err) {
        error.value = 'Failed to fetch images or no images found.';
        console.error(err);
    }
};
const rotateImages = () => {
    const newSubOption = activeThemeSubOption.value === store.activeTheme.themeSubOption.length - 1 ? 0 : activeThemeSubOption.value + 1
    getImages(newSubOption)
}
onMounted(() => {
    getImages(0)
    const interval = setInterval(rotateImages, 10000);
    onBeforeUnmount(() => {
        clearInterval(interval);
    });
})
watch(
    () => store.activeTheme,
    (newValue, oldValue) => {
        getImages(0)
        activeThemeSubOption.value = 0
    }
);
</script>
<template>
    <div v-if="images.length" class="grid">
        <img v-for="(src, index) in images" :key="index" :src="src" alt="Image" class="image" />
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