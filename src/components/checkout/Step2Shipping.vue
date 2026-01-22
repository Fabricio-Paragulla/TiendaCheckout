<script setup lang="ts">
import { watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useCheckout } from '../../composables/useCheckout';
import { useValidationSchemas } from '../../composables/useValidationSchemas';
import { validarCodigoPostalAPI } from '../../services/validationService';
import FormField from '../common/FormField.vue';
import FormSelect from '../common/FormSelect.vue';

const emit = defineEmits(['next', 'prev']);
const { estado } = useCheckout();
const { esquemaEnvio } = useValidationSchemas();

// Inicializamos form apuntando a la parte de 'envio' del estado
const { handleSubmit, values, setFieldValue } = useForm({
    validationSchema: esquemaEnvio,
    initialValues: estado.envio
});

const { value: mismaDireccion } = useField<boolean>('mismaDireccion');

// Sincronizar cambios con el estado global
watch(values, (newValues) => {
    if (newValues.mismaDireccion !== undefined) {
        estado.envio.mismaDireccion = newValues.mismaDireccion;
    }
    if (!newValues.mismaDireccion && newValues.datos) {
        Object.assign(estado.envio.datos, newValues.datos);
    }
}, { deep: true });

watch(() => values.datos?.codigoPostal, async (nuevoCP) => {
    if (nuevoCP && nuevoCP.length === 5 && /^\d+$/.test(nuevoCP)) {
        const respuesta = await validarCodigoPostalAPI(nuevoCP);
        if (respuesta.valido && respuesta.ciudad && respuesta.provincia) {
        setFieldValue('datos.ciudad', respuesta.ciudad);
        setFieldValue('datos.provincia', respuesta.provincia);
        }
    }
});

const onNext = handleSubmit(() => {
    if (mismaDireccion.value) {
        // Si es misma dirección, copiamos los datos antes de avanzar
        estado.envio.datos = JSON.parse(JSON.stringify(estado.facturacion));
        delete (estado.envio.datos as any).instrucciones; 
    }

    console.log('Paso 2 Validado:', estado.envio);
    emit('next');
});
</script>

<template>
    <div class="step-content">
        <h2 class="step-title">Dirección de Envío</h2>

        <form @submit.prevent="onNext">
        
        <div class="checkbox-container">
            <label class="checkbox-label">
            <input 
                type="checkbox" 
                name="mismaDireccion"
                v-model="mismaDireccion" 
                class="checkbox-input"
            >
            <span>Quiero que envíen el pedido a mi dirección de facturación</span>
            </label>
        </div>

        <transition name="slide-fade">
            <div v-if="!mismaDireccion" class="shipping-form grid-form">
            
            <h3 class="subsection-title">Datos del Destinatario</h3>
            
            <FormField name="datos.nombre" label="Nombre del Destinatario" placeholder="Quien recibe el paquete" />
            <FormField name="datos.telefono" label="Teléfono de Contacto" type="tel" />

            <FormField name="datos.calle" label="Dirección de Entrega" class="full-width" />

            <div class="row-three">
                <FormField name="datos.codigoPostal" label="CP" placeholder="08001" />
                <FormField name="datos.ciudad" label="Ciudad" />
                <FormField name="datos.provincia" label="Provincia" />
            </div>

            <FormSelect 
                name="datos.pais" 
                label="País" 
                :options="[{ value: 'España', label: 'España' }, { value: 'Andorra', label: 'Andorra' }]" 
            />
            
            <div class="full-width">
                <FormField 
                name="datos.instrucciones" 
                label="Instrucciones de Entrega (Opcional)" 
                placeholder="Ej: Dejar en portería si no estoy..." 
                />
                <small class="char-counter">
                {{ (values.datos?.instrucciones || '').length }} / 200 caracteres
                </small>
            </div>

            </div>
        </transition>

        <div class="actions">
            <button type="button" class="btn btn-secondary" @click="emit('prev')">
            &larr; Anterior
            </button>
            
            <button type="submit" class="btn btn-primary">
            Siguiente Paso &rarr;
            </button>
        </div>

        </form>
    </div>
</template>

<style scoped>
.step-title { 
    font-size: 1.5rem;
    font-weight: bold; 
    margin-bottom: 1.5rem; 
    border-bottom: 1px solid #eee; 
    padding-bottom: 0.5rem; 
}

.subsection-title { 
    grid-column: 1 / -1; 
    margin-top: 1rem; 
    font-size: 1.1rem; 
    color: #4b5563; 
}

.grid-form { 
    display: flex; 
    flex-direction: column; 
    gap: 0.5rem; 
}

@media (min-width: 768px) {
    .grid-form { 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        gap: 1.5rem; 
    }
    .full-width, .row-three { 
        grid-column: 1 / -1; 
    }
    .row-three { 
        display: grid; 
        grid-template-columns: 1fr 2fr 2fr;
        gap: 1rem; 
    }
}

.checkbox-container {
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    color: #374151;
}

.checkbox-input {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.75rem;
    cursor: pointer;
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

.btn-secondary:hover { 
    background-color: #4b5563; 
}

.char-counter { 
    display: block; 
    text-align: right; 
    color: #6b7280; 
    font-size: 0.8rem; 
    margin-top: -1rem; 
}

/* Animación slide-fade para que quede profesional */
.slide-fade-enter-active { 
    transition: all 0.3s ease-out; 
}

.slide-fade-leave-active { 
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1); 
}

.slide-fade-enter-from, 
.slide-fade-leave-to {
    transform: translateY(-20px); opacity: 0; 
}
</style>