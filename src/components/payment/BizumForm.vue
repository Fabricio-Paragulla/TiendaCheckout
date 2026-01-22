<script setup lang="ts">
import FormField from '../common/FormField.vue';
</script>

<template>
    <div class="info-box">
        <FormField name="bizumMovil" label="Teléfono Bizum" type="tel" />
        <p class="small-text">Acepta la solicitud en tu app bancaria.</p>
    </div>
</template>

<style scoped>

.info-box { 
    background-color: #f9fafb; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid #e5e7eb; 
}

.small-text { 
    font-size: 0.85rem; 
    color: #6b7280; 
    margin-top: 0.5rem; 
}

</style>