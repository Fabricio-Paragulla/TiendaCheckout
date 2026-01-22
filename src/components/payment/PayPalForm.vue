<script setup lang="ts">
import FormField from '../common/FormField.vue';
</script>

<template>
    <div class="info-box">
        <p>Serás redirigido a PayPal para completar el pago.</p>
        <FormField name="paypalEmail" label="Email de PayPal" type="email" />
    </div>
</template>

<style scoped>

.info-box { 
    background-color: #f9fafb; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid #e5e7eb; 
}

</style>