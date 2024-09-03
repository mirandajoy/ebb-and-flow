<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['change-theme'])
const props = defineProps(['id', 'label', 'clickEvent', 'active'])
</script>

<template>
    <button @click="emit(props.clickEvent, props.id)" :class="props.active ? 'active' : ''">{{ label }}</button>
</template>

<style>
button {
    border-radius: 50px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #2b2b2b;
    color: white;
    outline: 1px solid rgb(255, 217, 63);
}

button:focus,
button:focus-visible {
    outline: 1px solid rgb(255, 217, 63);
}

.active {
    background-color: #989898;
}
</style>