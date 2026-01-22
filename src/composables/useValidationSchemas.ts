import * as yup from 'yup';
import { validarCodigoPostalAPI } from '../services/validationService';
import { validarLuhn } from '../utils/creditCard';

export function useValidationSchemas() {
    
// Paso 1: Facturación
    const esquemaFacturacion = yup.object({
        nombre: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras'),
        
        nif: yup.string()
        .required('El NIF es obligatorio')
        // Regex simple para DNI (8 números + letra)
        .matches(/^[0-9]{8}[A-Za-z]$/, 'Formato inválido (Ej: 12345678Z)'), 
        
        email: yup.string()
        .required('El email es obligatorio')
        .email('Formato de email incorrecto'),
        
        telefono: yup.string()
        .required('El teléfono es obligatorio')
        .matches(/^[6789]\d{8}$/, 'Teléfono móvil español no válido'),
        
        calle: yup.string()
        .required('La dirección es obligatoria'),
        
        codigoPostal: yup.string()
        .required('El CP es obligatorio')
        .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
        // Validación ASÍNCRONA:
        .test('check-cp', 'El Código Postal no existe o no servimos ahí', async (value) => {
            if (!value || value.length !== 5) return false;
            
            try {
            const resp = await validarCodigoPostalAPI(value);
            return resp.valido; 
            } catch (error) {
            return false;
            }
        }),
        
        ciudad: yup.string().required('La ciudad es obligatoria'),
        provincia: yup.string().required('La provincia es obligatoria'),
        pais: yup.string().required('El país es obligatorio'),
    });

// Paso 2: Envío
    const esquemaEnvio = yup.object({
        mismaDireccion: yup.boolean(),
        
        // Validamos 'datos' CONDICIONALMENTE
        datos: yup.object().when('mismaDireccion', {
        is: false,
        then: (schema) => schema.shape({
            nombre: yup.string().required('El nombre del destinatario es obligatorio'),
            calle: yup.string().required('La dirección de envío es obligatoria'),
            
            // Reutilizamos la lógica del CP, pero adaptada al campo de envío
            codigoPostal: yup.string()
            .required('El CP es obligatorio')
            .matches(/^[0-9]{5}$/, 'Debe tener 5 dígitos')
            .test('check-cp-envio', 'El Código Postal no existe', async (value) => {
                if (!value || value.length !== 5) return false;
                try {
                const resp = await validarCodigoPostalAPI(value);
                return resp.valido;
                } catch { return false; }
            }),
            
            ciudad: yup.string().required('La ciudad es obligatoria'),
            provincia: yup.string().required('La provincia es obligatoria'),
            pais: yup.string().required('El país es obligatorio'),
            telefono: yup.string().required('El teléfono de contacto es obligatorio'),
            
            instrucciones: yup.string()
            .max(200, 'Máximo 200 caracteres para las instrucciones')
            .nullable() // Permite que esté vacío si el usuario borra lo que escribió
        }),
        // Si mismaDireccion es true, no validamos nada de 'datos'
        otherwise: (schema) => schema.notRequired()
        })
    });

// Función auxiliar para validar que la fecha de caducidad es futura
    const validarFechaFutura = (value: string | undefined) => {
        // Validamos el formato con Regex
        if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;
        
        const [mes, anio] = value.split('/').map(Number) as [number, number];

        const ahora = new Date();
        const anioActual = parseInt(ahora.getFullYear().toString().slice(-2));
        const mesActual = ahora.getMonth() + 1;

        if (anio < anioActual) return false;
        if (anio === anioActual && mes < mesActual) return false;
        
        return true;
    };

// Paso 3: Pago
    const esquemaPago = yup.object({
        metodo: yup.string().required().oneOf(['tarjeta', 'paypal', 'transferencia', 'bizum']),
        
        // TARJETA (Solo si metodo === 'tarjeta')
        tarjeta: yup.object().when('metodo', {
        is: 'tarjeta',
        then: (schema) => schema.shape({
            numero: yup.string()
            .required('Número obligatorio')
            .test('luhn', 'Número de tarjeta inválido', (val) => validarLuhn(val || '')),
            titular: yup.string().required('Nombre del titular obligatorio'),
            caducidad: yup.string()
            .required('Requerido (MM/YY)')
            .test('fecha-futura', 'La tarjeta ha caducado', validarFechaFutura),
            cvv: yup.string()
            .required('CVV requerido')
            .matches(/^[0-9]{3,4}$/, '3 o 4 dígitos'),
        }),
            otherwise: (schema) => schema.notRequired() // Importante para que no valide si no es tarjeta
        }),

        // PAYPAL
        paypalEmail: yup.string().when('metodo', {
            is: 'paypal',
            then: (schema) => schema.required('Email de PayPal obligatorio').email('Email inválido'),
            otherwise: (schema) => schema.notRequired()
        }),

        // BIZUM
        bizumMovil: yup.string().when('metodo', {
            is: 'bizum',
            then: (schema) => schema.required('Móvil obligatorio').matches(/^[67]\d{8}$/, 'Móvil no válido'),
            otherwise: (schema) => schema.notRequired()
        }),

        // TRANSFERENCIA
        transferenciaRef: yup.string().when('metodo', {
            is: 'transferencia',
            then: (schema) => schema.required('Añade una referencia para identificar tu pago'),
            otherwise: (schema) => schema.notRequired()
        }),
    });

    return {
        esquemaFacturacion,
        esquemaEnvio,
        esquemaPago,
    };

}