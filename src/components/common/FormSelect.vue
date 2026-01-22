<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps<{
    name: string;
    label: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}>();

const name = toRef(props, 'name');
const { value, errorMessage } = useField(name);
</script>

<template>
    <div class="form-field" :class="{ 'has-error': errorMessage }">
        <label :for="name">{{ label }}</label>
        
        <select 
        :id="name" 
        :name="name" 
        v-model="value" 
        class="input-control"
        >
        <option value="" disabled>{{ placeholder || 'Seleccione una opción' }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
        </option>
        </select>
        
        <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </div>
</template>

<style scoped>
/* Reutilizamos los mismos estilos básicos que FormField */
.form-field { 
    display: flex; 
    flex-direction: column; 
    margin-bottom: 1.5rem; 
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
    background-color: white; 
}
.has-error .input-control { 
    border-color: #ef4444; 
    background-color: #fef2f2; 
}
.error-message { 
    color: #ef4444; 
    font-size: 0.85rem; 
    margin-top: 0.4rem; 
}
</style>