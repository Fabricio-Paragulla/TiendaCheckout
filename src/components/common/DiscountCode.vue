<script setup lang="ts">
import { ref } from 'vue';
import { useCheckout } from '../../composables/useCheckout';
import { validarDescuentoAPI } from '../../services/checkoutService';

const { estado } = useCheckout();

const codigoInput = ref('');
const loading = ref(false);
const mensaje = ref('');
const tipoMensaje = ref<'exito' | 'error' | ''>('');

const aplicarDescuento = async () => {
    if (!codigoInput.value) return;

    loading.value = true;
    mensaje.value = '';
    tipoMensaje.value = '';

    try {
        const resultado = await validarDescuentoAPI(codigoInput.value);
        
        if (resultado.valido) {
            // Actualizamos estado global
            estado.codigoDescuento = codigoInput.value.toUpperCase();
            estado.descuentoAplicado = resultado.porcentaje;
            
            mensaje.value = resultado.mensaje;
            tipoMensaje.value = 'exito';
        } else {
            // Reseteamos si falla
            estado.codigoDescuento = '';
            estado.descuentoAplicado = 0;
            
            mensaje.value = resultado.mensaje;
            tipoMensaje.value = 'error';
        }
    } catch (e) {
        mensaje.value = 'Error de conexión al validar el cupón.';
        tipoMensaje.value = 'error';
    } finally {
        loading.value = false;
    }
};

const eliminarDescuento = () => {
    estado.codigoDescuento = '';
    estado.descuentoAplicado = 0;
    codigoInput.value = '';
    mensaje.value = '';
    tipoMensaje.value = '';
};
</script>

<template>
    <div class="discount-section">
        <h3 class="section-title">Código de Descuento</h3>
        
        <div v-if="!estado.descuentoAplicado" class="input-group">
        <input 
            type="text" 
            v-model="codigoInput" 
            placeholder="Ej: BIENVENIDO10"
            class="discount-input"
            :disabled="loading"
            @keydown.enter.prevent="aplicarDescuento"
        />
        <button 
            type="button" 
            class="btn-apply" 
            @click="aplicarDescuento"
            :disabled="loading || !codigoInput"
        >
            <span v-if="loading">⏳</span>
            <span v-else>Aplicar</span>
        </button>
        </div>

        <div v-else class="active-discount">
        <span class="tag">
            🎟️ {{ estado.codigoDescuento }} (-{{ estado.descuentoAplicado }}%)
        </span>
        <button type="button" class="btn-remove" @click="eliminarDescuento" title="Quitar cupón">
            ✕
        </button>
        </div>

        <p v-if="mensaje" :class="['msg', tipoMensaje]">
        {{ mensaje }}
        </p>
    </div>
</template>

<style scoped>

.discount-section { 
    margin-top: 1.5rem; 
    border-top: 1px solid #e5e7eb; 
    padding-top: 1rem; 
}

.section-title { 
    font-size: 1rem; 
    font-weight: 600;
    margin-bottom: 0.5rem; 
    color: #374151; 
}

.input-group { 
    display: flex; 
    gap: 0.5rem; 
}

.discount-input { 
    flex: 1; 
    padding: 0.5rem; 
    border: 1px solid #d1d5db; 
    border-radius: 6px; 
}

.btn-apply { 
    background-color: #4b5563; 
    color: white; 
    border: none; 
    padding: 0.5rem 1rem; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: 500; 
}

.btn-apply:disabled { 
    opacity: 0.6; 
    cursor: not-allowed; 
}

.active-discount { 
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    background-color: #ecfdf5; 
    padding: 0.5rem; 
    border-radius: 6px; 
    border: 1px solid #10b981; 
}

.tag { 
    color: #047857; 
    font-weight: bold; 
    font-size: 0.9rem; 
}

.btn-remove { 
    background: none; 
    border: none; 
    color: #ef4444; 
    font-weight: bold; 
    cursor: pointer; 
    font-size: 1.1rem; 
}

.msg { 
    font-size: 0.85rem; 
    margin-top: 0.5rem; 
}

.msg.exito { 
    color: #10b981; 
}

.msg.error { 
    color: #ef4444; 
}

</style>