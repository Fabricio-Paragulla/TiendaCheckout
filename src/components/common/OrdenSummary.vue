<script setup lang="ts">
import { computed } from 'vue';
import { useCheckout } from '../../composables/useCheckout';
import { formatCurrency } from '../../utils/formatters';

// Props opcionales por si queremos pasar items diferentes en el futuro
const props = defineProps<{
    items?: Array<{ id: number; name: string; price: number }>;
}>();

const { estado } = useCheckout();

// Datos simulados del carrito (si no vienen por props)
const cartItems = props.items || [
    { id: 1, name: 'Zapatillas Vue Edition', price: 90 },
    { id: 2, name: 'Camiseta TypeScript', price: 25 },
];

// Cálculos
const subtotal = computed(() => cartItems.reduce((acc, item) => acc + item.price, 0));

const shippingCost = computed(() => {
    if (!estado.envio.datos.pais) return 0;
    return estado.envio.datos.pais === 'España' ? 5 : 15;
});

// Valor monetario del descuento
const discountAmount = computed(() => {
    if (!estado.descuentoAplicado) return 0;
    return (subtotal.value * estado.descuentoAplicado) / 100;
});

const total = computed(() => subtotal.value + shippingCost.value - discountAmount.value);
</script>

<template>
    <div class="order-summary-card">
        <h3 class="title">Resumen de Compra</h3>
        
        <ul class="item-list">
        <li v-for="item in cartItems" :key="item.id" class="item">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ formatCurrency(item.price) }}</span>
        </li>
        </ul>

        <hr class="divider">

        <div class="summary-rows">
        <div class="row">
            <span>Subtotal</span>
            <span>{{ formatCurrency(subtotal) }}</span>
        </div>
        
        <div class="row" v-if="estado.descuentoAplicado > 0">
            <span class="discount-label">Descuento ({{ estado.descuentoAplicado }}%)</span>
            <span class="discount-value">-{{ formatCurrency(discountAmount) }}</span>
        </div>

        <div class="row">
            <span>Envío ({{ estado.envio.datos.pais || 'Calculando...' }})</span>
            <span>{{ formatCurrency(shippingCost) }}</span>
        </div>
        
        <hr class="divider-dashed">

        <div class="row total-row">
            <span>TOTAL</span>
            <span class="total-price">{{ formatCurrency(total) }}</span>
        </div>
        </div>
    </div>
</template>

<style scoped>

.order-summary-card { 
    background: #fff; 
    padding: 1.5rem; 
    border: 1px solid #e5e7eb; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
}

.title { 
    font-size: 1.1rem; 
    font-weight: bold; 
    margin-bottom: 1rem; 
    color: #111827; 
}

.item-list { 
    list-style: none; 
    padding: 0; 
    margin: 0 0 1rem 0; 
}

.item { 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 0.5rem; 
    font-size: 0.95rem; 
    color: #4b5563; 
}

.divider { 
    border: 0; 
    border-top: 1px solid #e5e7eb; 
    margin: 1rem 0; 
}

.divider-dashed { 
    border: 0; 
    border-top: 1px dashed #d1d5db; 
    margin: 1rem 0; 
}

.row { 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 0.5rem; 
    font-size: 0.95rem; 
}

.discount-label { 
    color: #10b981; 
}

.discount-value { 
    color: #10b981; 
    font-weight: 500; 
}

.total-row { 
    align-items: center; 
    margin-top: 0.5rem; 
}

.total-row span:first-child { 
    font-weight: bold; 
    font-size: 1.1rem; 
}

.total-price { 
    font-weight: 800; 
    font-size: 1.4rem; 
    color: #2563eb; 
}

</style>