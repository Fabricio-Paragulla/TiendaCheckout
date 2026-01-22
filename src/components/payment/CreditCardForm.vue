<script setup lang="ts">
import { useFormContext } from 'vee-validate';
import { watch } from 'vue';
import { detectarTipoTarjeta } from '../../utils/creditCard';
import { formatCreditCardNumber } from '../../utils/formatters';
import FormField from '../common/FormField.vue';

// Usamos el contexto del formulario padre
const { values, setFieldValue } = useFormContext();

// Watcher para detectar tipo
watch(() => values.tarjeta?.numero, (nuevoNumero) => {
    if (!nuevoNumero) return;
    const tipo = detectarTipoTarjeta(nuevoNumero);
    if (values.tarjeta && values.tarjeta.tipo !== tipo) {
        setFieldValue('tarjeta.tipo', tipo);
    }
    const rawValue = nuevoNumero.replace(/\s/g, '');
    const formatted = formatCreditCardNumber(nuevoNumero);

  // Solo actualizamos si el formateo añade algo nuevo (para no bloquear el borrado)
    if (nuevoNumero !== formatted && rawValue.length > 3) {
        setFieldValue('tarjeta.numero', formatted);
    }

});
</script>

<template>
    <div class="card-form grid-form">
        <div class="full-width relative">
        <FormField name="tarjeta.numero" label="Número de Tarjeta" placeholder="0000 0000 0000 0000" />
        <span class="card-type-badge" v-if="values.tarjeta?.tipo && values.tarjeta.tipo !== 'unknown'">
            {{ values.tarjeta.tipo.toUpperCase() }}
        </span>
        </div>
        <FormField name="tarjeta.titular" label="Titular" placeholder="Como aparece en la tarjeta" />
        <div class="row-half">
        <FormField name="tarjeta.caducidad" label="Caducidad" placeholder="MM/YY" />
        <FormField name="tarjeta.cvv" label="CVV" type="password" placeholder="123" />
        </div>
    </div>
</template>

<style scoped>

.grid-form { 
    display: grid; 
    gap: 1rem; 
}

.row-half { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 1rem; 
}

.full-width { 
    grid-column: 1 / -1; 
}

.relative { 
    position: relative; 
}

.card-type-badge {
    position: absolute; 
    right: 10px; 
    top: 38px; 
    background: #1f2937; 
    color: white; 
    font-size: 0.7rem; 
    padding: 2px 6px;
    border-radius: 4px; 
}

</style>