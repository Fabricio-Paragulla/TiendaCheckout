<script setup lang="ts">
import FormField from '../common/FormField.vue';
</script>

<template>
    <div class="info-box warning">
        <p><strong>Cuenta:</strong> ES21 0000 0000 00 1234567890</p>
        <FormField name="transferenciaRef" label="Concepto / Referencia" placeholder="Pon tu NIF" />
    </div>
</template>

<style scoped>

.info-box { 
    background-color: #fffbeb; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid #fcd34d; 
}

</style>