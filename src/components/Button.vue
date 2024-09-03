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
    background-color: var(--primary-background-color-light);
    border-radius: 50px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: var(--secondary-background-color);
    color: white;
    outline: 1px solid var(--font-color-dark);
}

button:focus-visible {
    outline: 1px solid var(--font-color-dark);
}

.active {
    background-color: var(--secondary-background-color-light);
}
</style>