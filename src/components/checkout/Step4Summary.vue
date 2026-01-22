<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCheckout } from '../../composables/useCheckout';
import OrderSummary from '../common/OrdenSummary.vue';

const emit = defineEmits(['prev', 'confirm']);
const { estado } = useCheckout();

// Estado local para los checkboxes legales
const termsAccepted = ref(false);
const privacyAccepted = ref(false);
const newsletter = ref(false);

// Simulación de carrito
const cart = [
    { id: 1, name: 'Zapatillas Vue', price: 90 },
    { id: 2, name: 'Camiseta TypeScript', price: 25 },
];

// Cálculos
const subtotal = computed(() => cart.reduce((acc, item) => acc + item.price, 0));
const shippingCost = computed(() => estado.envio.datos.pais === 'España' ? 5 : 15);
const total = computed(() => subtotal.value + shippingCost.value);

const canConfirm = computed(() => termsAccepted.value && privacyAccepted.value);

const onConfirm = () => {
    if (canConfirm.value) {
        emit('confirm');
    }
};
</script>

<template>
    <div class="step-content">
        <h2 class="step-title">Resumen del Pedido</h2>

        <div class="summary-grid">
        
        <div class="details-col">
            <div class="summary-card">
            <h3>Facturación</h3>
            <p><strong>{{ estado.facturacion.nombre }}</strong></p>
            <p>{{ estado.facturacion.calle }}</p>
            <p>{{ estado.facturacion.ciudad }} ({{ estado.facturacion.codigoPostal }})</p>
            <p>{{ estado.facturacion.email }}</p>
            </div>

            <div class="summary-card">
            <h3>Envío</h3>
            <p v-if="estado.envio.mismaDireccion">Igual que facturación</p>
            <div v-else>
                <p><strong>{{ estado.envio.datos.nombre }}</strong></p>
                <p>{{ estado.envio.datos.calle }}</p>
                <p>{{ estado.envio.datos.ciudad }}</p>
            </div>
            </div>

            <div class="summary-card">
            <h3>Pago</h3>
            <p>Método: <strong class="capitalize">{{ estado.pago.metodo }}</strong></p>
            <p v-if="estado.pago.metodo === 'tarjeta'">
                Tarjeta terminada en **** {{ estado.pago.tarjeta?.numero.slice(-4) }}
            </p>
            </div>
        </div>

        <div class="totals-col">
        <OrderSummary /> 

            <div class="legal-checks">
            <label>
                <input type="checkbox" v-model="termsAccepted">
                Acepto los términos y condiciones *
            </label>
            <label>
                <input type="checkbox" v-model="privacyAccepted">
                He leído la política de privacidad *
            </label>
            <label>
                <input type="checkbox" v-model="newsletter">
                Quiero recibir ofertas (Opcional)
            </label>
        </div>

            <div class="actions vertical">
            <button 
                @click="onConfirm" 
                class="btn btn-primary btn-block"
                :disabled="!canConfirm"
            >
                CONFIRMAR PEDIDO ({{ total }}€)
            </button>
            
            <button @click="emit('prev')" class="btn btn-text">
                Volver atrás
            </button>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>

.step-title { 
    font-size: 1.5rem; 
    font-weight: bold; 
    margin-bottom: 1.5rem; 
}

.summary-grid { 
    display: grid; 
    gap: 2rem; 
}

@media(min-width: 768px) {
    .summary-grid { 
        grid-template-columns: 3fr 2fr; 
    }
}

.summary-card { 
    background: #f9fafb; 
    padding: 1rem; 
    border-radius: 8px;
    margin-bottom: 1rem; 
    border: 1px solid #e5e7eb; 
}

.summary-card h3 { 
    font-size: 1rem; 
    font-weight: 600; 
    margin-bottom: 0.5rem; 
    color: #374151; 
    border-bottom: 1px solid #e5e7eb; 
    padding-bottom: 0.25rem; 
}

.summary-card p { 
    font-size: 0.9rem; 
    color: #4b5563; 
    margin: 0.25rem 0; 
}

.capitalize { 
    text-transform: capitalize; 
}

.cart-summary { 
    background: #fff; 
    padding: 1.5rem; 
    border: 1px solid #e5e7eb; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
}

.cart-item, .row { 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 0.5rem; 
    font-size: 0.95rem; 
}

.total { 
    font-weight: bold; 
    font-size: 1.2rem; 
    color: #2563eb; 
    margin-top: 1rem; 
    border-top: 2px solid #e5e7eb; 
    padding-top: 1rem; 
}

.legal-checks { 
    margin: 1.5rem 0; 
    display: flex; 
    flex-direction: column; 
    gap: 0.5rem; 
    font-size: 0.9rem; 
}

.legal-checks label { 
    display: flex; 
    gap: 0.5rem; 
    align-items: center; 
    cursor: pointer; 
}

.actions.vertical { 
    display: flex; 
    flex-direction: column; 
    gap: 1rem; 
}

.btn { 
    padding: 0.75rem; 
    border-radius: 6px; 
    font-weight: 600; 
    cursor: pointer; 
    border: none; 
}

.btn-primary { 
    background-color: #10b981; 
    color: white; 
    transition: background 0.2s; 
}

.btn-primary:hover { 
    background-color: #059669; 
}

.btn-primary:disabled { 
    background-color: #9ca3af; 
    cursor: not-allowed; 
}

.btn-block { 
    width: 100%; 
    font-size: 1.1rem; 
}

.btn-text {
    background: none; 
    color: #6b7280; 
    text-decoration: underline; 
}

</style>