<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}>();

// Usamos toRef para que si la prop cambia, la validación no se rompa
const name = toRef(props, 'name');

// useField da el valor y el mensaje de error de este campo específico
const { value, errorMessage, meta } = useField(name);
</script>

<template>
    <div class="form-field" :class="{ 'has-error': errorMessage, 'is-valid': meta.valid && meta.dirty }">
        <label :for="name">{{ label }}</label>
        
        <input
            :id="name"
            :name="name"
            :type="type || 'text'"
            :placeholder="placeholder"
            v-model="value"
            :aria-invalid="!!errorMessage"
            :aria-describedby="`${name}-error`"
            class="input-control"
        />

        <transition name="fade">
        <span v-if="errorMessage" :id="`${name}-error`" class="error-message">
            {{ errorMessage }}
        </span>
        </transition>
    </div>
</template>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    width: 100%;
}

label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
    font-size: 0.9rem;
}

.input-control {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    outline: none;
}

.input-control:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Estados de validación visual */
.has-error .input-control {
    border-color: #ef4444;
    background-color: #fef2f2;
}

.is-valid .input-control {
    border-color: #10b981;
}

.error-message {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 0.4rem;
}

/* Animación simple */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>