<script setup lang="ts">
import { onMounted } from 'vue';
import { useCheckout } from '../../composables/useCheckout';
import { useWizardNavigation } from '../../composables/useWizardNavigation';

import StepIndicator from './StepIndicator.vue';
import Step1Billing from './Step1Billing.vue';
import Step2Shipping from './Step2Shipping.vue';
import Step3Payment from './Step3Payment.vue';
import Step4Summary from './Step4Summary.vue';

const { recuperarBorrador, limpiarEstado } = useCheckout();
const { currentStep, nextStep, prevStep, setStep } = useWizardNavigation();

onMounted(() => {
    if (recuperarBorrador()) {
        // Lógica opcional
    }
});

const handleConfirm = () => {
    alert('Pedido completado!');
    limpiarEstado();
    setStep(1);
};
</script>

<template>
    <div class="wizard-wrapper">
        <StepIndicator :current-step="currentStep" />
        <div class="wizard-card">
        <component 
            :is="currentStep === 1 ? Step1Billing : 
                currentStep === 2 ? Step2Shipping : 
                currentStep === 3 ? Step3Payment : 
                Step4Summary"
            @next="nextStep"
            @prev="prevStep"
            @confirm="handleConfirm"
        />
        </div>
    </div>
</template>

<style scoped>
.wizard-wrapper {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
}

.wizard-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    min-height: 400px; /* Evita saltos de altura bruscos */
}
</style>