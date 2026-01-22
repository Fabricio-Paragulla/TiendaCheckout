<script setup lang="ts">
import { watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useCheckout } from '../../composables/useCheckout';
import { useValidationSchemas } from '../../composables/useValidationSchemas';
import CreditCardForm from '../payment/CreditCardForm.vue';
import PayPalForm from '../payment/PayPalForm.vue';
import BizumForm from '../payment/BizumForm.vue';
import TransferForm from '../payment/TransferForm.vue';
import NavigationButtons from './NavigationButtons.vue';
import DiscountCode from '../common/DiscountCode.vue';

const emit = defineEmits(['next', 'prev']);
const { estado } = useCheckout();
const { esquemaPago } = useValidationSchemas();

// Inicializamos el formulario
const { handleSubmit, values } = useForm({
    validationSchema: esquemaPago,
    initialValues: estado.pago
});

// CLAVE: Controlamos el método de pago manualmente vinculándolo al campo 'metodo'
const { value: metodoPago } = useField<string>('metodo');

// Sincronizar cambios con el estado global
watch(values, (newValues) => {
    Object.assign(estado.pago, newValues);
}, { deep: true });

const onNext = handleSubmit(() => {
    emit('next');
});
</script>

<template>
    <div class="step-content">
        <h2 class="step-title">Método de Pago</h2>

        <form @submit.prevent="onNext">
        
        <div class="payment-methods">
            
            <label class="method-card" :class="{ 'active': metodoPago === 'tarjeta' }">
            <input type="radio" value="tarjeta" v-model="metodoPago" class="sr-only">
            <span class="icon">💳</span>
            <span class="text">Tarjeta</span>
            </label>

            <label class="method-card" :class="{ 'active': metodoPago === 'paypal' }">
            <input type="radio" value="paypal" v-model="metodoPago" class="sr-only">
            <span class="icon">🅿️</span>
            <span class="text">PayPal</span>
            </label>

            <label class="method-card" :class="{ 'active': metodoPago === 'bizum' }">
            <input type="radio" value="bizum" v-model="metodoPago" class="sr-only">
            <span class="icon">📱</span>
            <span class="text">Bizum</span>
            </label>

            <label class="method-card" :class="{ 'active': metodoPago === 'transferencia' }">
            <input type="radio" value="transferencia" v-model="metodoPago" class="sr-only">
            <span class="icon">🏦</span>
            <span class="text">Transf.</span>
            </label>
        </div>

        <div class="payment-details-container">
            <CreditCardForm v-if="metodoPago === 'tarjeta'" />
            <PayPalForm v-if="metodoPago === 'paypal'" />
            <BizumForm v-if="metodoPago === 'bizum'" />
            <TransferForm v-if="metodoPago === 'transferencia'" />
        </div>

        <DiscountCode />

        <NavigationButtons 
            :show-prev="true" 
            :show-next="true" 
            next-label="Ver Resumen"
            @prev="emit('prev')"
        />

        </form>
    </div>
</template>

<style scoped>
/* Estilos base */
.step-title { 
    font-size: 1.5rem; 
    font-weight: bold;
    margin-bottom: 1.5rem; 
}

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

/* Estilos específicos de Pagos */
.payment-methods {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

@media(min-width: 640px) {
    .payment-methods { grid-template-columns: repeat(4, 1fr); }
}

.method-card {
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
}

.method-card:hover { 
    border-color: #93c5fd; 
}

.method-card.active { 
    border-color: #2563eb; 
    background-color: #eff6ff; 
    color: #2563eb; 
    font-weight: bold; 
}

.icon { 
    font-size: 1.5rem; 
    margin-bottom: 0.5rem; 
}

.sr-only { 
    position: absolute; 
    width: 1px; 
    height: 1px; 
    overflow: hidden; 
    opacity: 0; 
}

.info-box { 
    background-color: #f9fafb;
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid #e5e7eb; 
}

.info-box.warning { 
    background-color: #fffbeb;
    border-color: #fcd34d;
}

.small-text { 
    font-size: 0.85rem;
    color: #6b7280; 
    margin-top: 0.5rem; 
}

.grid-form { 
    display: grid; 
    gap: 1rem; 
}

.row-half { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 1rem; 
}

.card-type-badge {
    position: absolute;
    right: 10px;
    top: 38px; /* Ajustar según altura del label */
    background: #1f2937;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
}

.relative { 
    position: relative; 
}

</style>