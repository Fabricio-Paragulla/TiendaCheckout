<script setup lang="ts">
defineProps<{
    showNext?: boolean;
    showPrev?: boolean;
    nextLabel?: string;
    isNextDisabled?: boolean; // Para cuando el form no es válido
}>();

const emit = defineEmits(['next', 'prev']);
</script>

<template>
    <div class="actions">
        <button 
        v-if="showPrev"
        type="button" 
        class="btn btn-secondary" 
        @click="emit('prev')"
        >
        &larr; Anterior
        </button>
        <div v-else></div> <button 
        v-if="showNext"
        type="submit" 
        class="btn btn-primary"
        :disabled="isNextDisabled"
        >
        {{ nextLabel || 'Siguiente Paso' }} &rarr;
        </button>
    </div>
</template>

<style scoped>

.actions { 
    margin-top: 2rem; 
    display: flex; 
    justify-content: space-between; 
}

.btn { 
    padding: 0.75rem 1.5rem; 
    border-radius: 6px; 
    font-weight: 600; 
    cursor: pointer; 
    border: none; 
}

.btn-primary { 
    background-color: #2563eb; 
    color: white; 
}

.btn-secondary { 
    background-color: #6b7280; 
    color: white; 
}

.btn:disabled { 
    opacity: 0.5; 
    cursor: not-allowed; 
}

</style>