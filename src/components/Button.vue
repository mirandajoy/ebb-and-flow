<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['change-theme'])
const props = defineProps(['id', 'label', 'clickEvent', 'active'])
</script>

<template>
    <button @click="emit(props.clickEvent, props.id)" :class="props.active ? 'active' : ''">
        <span v-if=props.active class="material-symbols-outlined icon">
            nest_eco_leaf
        </span>
        {{ label }}</button>
</template>

<style scoped>
button {
    background-color: var(--primary-background-color-light);
    border-radius: 50px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    border: none;
    transition: 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.25rem;
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

.icon {
    color: var(--highlight-color);
}
</style>