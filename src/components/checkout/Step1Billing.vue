<script setup lang="ts">
import { watch } from 'vue';
import { useForm } from 'vee-validate';
import { useCheckout } from '../../composables/useCheckout';
import { useValidationSchemas } from '../../composables/useValidationSchemas';
import { validarCodigoPostalAPI } from '../../services/validationService';
import FormField from '../common/FormField.vue';
import FormSelect from '../common/FormSelect.vue';

// Definimos eventos para comunicarse con el wizard
const emit = defineEmits(['next', 'prev']);

// 1. Traemos el estado global y los esquemas
const { estado } = useCheckout();
const { esquemaFacturacion } = useValidationSchemas();

// 2. Inicializamos el formulario con VeeValidate
// Vinculamos los valores iniciales al estado global
const { handleSubmit, values, setFieldValue } = useForm({
    validationSchema: esquemaFacturacion,
    initialValues: estado.facturacion // Cargamos lo que haya en memoria/localStorage
});

// 3. Sincronización Bidireccional (Magia)
// VeeValidate maneja su propio estado interno
watch(values, (newValues) => {
  // Copiamos los valores del formulario al estado global
    Object.assign(estado.facturacion, newValues);
}, { deep: true });


// 4. Lógica de Autocompletado de CP
// Observamos cambios Específicos en el CP para autocompletar
watch(() => values.codigoPostal, async (nuevoCP) => {
  // Solo consultamos si tiene 5 dígitos para no exigir a la API
    if (nuevoCP && nuevoCP.length === 5 && /^\d+$/.test(nuevoCP)) {
        const respuesta = await validarCodigoPostalAPI(nuevoCP);
        
        if (respuesta.valido && respuesta.ciudad && respuesta.provincia) {
        // Usamos setFieldValue para que VeeValidate se entere del cambio
        setFieldValue('ciudad', respuesta.ciudad);
        setFieldValue('provincia', respuesta.provincia);
        }
    }
});

// 5. Manejar el envío
const onNext = handleSubmit(() => {
  // Si handleSubmit se ejecuta, significa que TODO es válido
    console.log('Paso 1 Validado:', estado.facturacion);
    emit('next');
});

</script>

<template>
    <div class="step-content">
        <h2 class="step-title">Datos de Facturación</h2>
        
        <form @submit.prevent="onNext" class="grid-form">
            
            <FormField name="nombre" label="Nombre Completo" placeholder="Ej: Juan Pérez" />
            <FormField name="nif" label="NIF / CIF" placeholder="12345678Z" />

            <FormField name="email" label="Correo Electrónico" type="email" placeholder="juan@ejemplo.com" />
            <FormField name="telefono" label="Teléfono Móvil" type="tel" placeholder="600123456" />

            <FormField name="calle" label="Dirección" placeholder="C/ Mayor 12, 3ºA" class="full-width" />

            <div class="row-three">
                <FormField name="codigoPostal" label="Código Postal" placeholder="28001" />
                <FormField name="ciudad" label="Ciudad" placeholder="Automático..."  /> <FormField name="provincia" label="Provincia" placeholder="Automático..." />
            </div>

            <FormSelect 
                name="pais" 
                label="País" 
                :options="[{ value: 'España', label: 'España' }, { value: 'Portugal', label: 'Portugal' }, { value: 'Francia', label: 'Francia' }]" 
            />

            <div class="actions">
                <button type="button" class="btn btn-secondary" disabled>Anterior</button>
                
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
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.grid-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Responsive Grid para pantallas medianas/grandes */
@media (min-width: 768px) {
    .grid-form {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 2 columnas */
        gap: 1.5rem;
    }
    
    /* Campos que ocupan todo el ancho */
    .full-width, .row-three, .actions {
        grid-column: 1 / -1;
    }
    
    .row-three {
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        gap: 1rem;
    }
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
    transition: all 0.2s;
    border: none;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
}

.btn-primary:hover { 
    background-color: #1d4ed8; 
}

.btn-secondary {
    background-color: #9ca3af;
    color: white;
    cursor: not-allowed;
}
</style>