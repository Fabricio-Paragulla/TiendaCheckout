import { reactive, watch } from 'vue';
import type { EstadoPedido } from '../types/checkout';

// 1. Definimos el estado inicial "limpio"
// Lo sacamos a una función para poder reutilizarlo al resetear
const obtenerEstadoInicial = (): EstadoPedido => ({
    facturacion: {
        nombre: '',
        nif: '',
        email: '',
        telefono: '',
        calle: '',
        codigoPostal: '',
        ciudad: '',
        provincia: '',
        pais: 'España',
    },
    envio: {
        mismaDireccion: true,
        datos: {
        nombre: '',
        nif: '', // Hereda de dirección
        email: '',
        telefono: '',
        calle: '',
        codigoPostal: '',
        ciudad: '',
        provincia: '',
        pais: 'España',
        instrucciones: '',
        },
    },
    pago: {
        metodo: 'tarjeta',
        tarjeta: {
        numero: '',
        titular: '',
        caducidad: '',
        cvv: '',
        tipo: 'unknown',
        },
        paypalEmail: '',
        transferenciaRef: '',
        bizumMovil: '',
    },
    codigoDescuento: '',
    descuentoAplicado: 0,
});

// 2. Estado Reactivo Global (Singleton)
// Al estar fuera del "export function", es compartido por toda la app
const estado = reactive<EstadoPedido>(obtenerEstadoInicial());

// 3. El Composable
export function useCheckout() {

// Guardar en LocalStorage
    const guardarBorrador = () => {
        try {
            localStorage.setItem('checkout_borrador', JSON.stringify(estado));
            console.log('Borrador guardado automáticamente');
        } catch (e) {
            console.error('Error guardando en localStorage', e);
        }
    };

// Recuperar del LocalStorage
    const recuperarBorrador = () => {
        const borrador = localStorage.getItem('checkout_borrador');
        if (borrador) {
            try {
                const datosGuardados = JSON.parse(borrador);
                // Object.assign actualiza el estado reactivo sin romper la referencia
                Object.assign(estado, datosGuardados);
                console.log('Borrador recuperado con éxito');
                return true;
            } catch (e) {
                console.error('Error al parsear el borrador', e);
                return false;
            }
        }
            return false;
    };

// Limpiar/Resetear todo
    const limpiarEstado = () => {
        Object.assign(estado, obtenerEstadoInicial());
        localStorage.removeItem('checkout_borrador');
    };

// Observador automático: Cada vez que 'estado' cambie, guardamos.
    watch(estado, () => {
        guardarBorrador();
    }, { deep: true }); // Para detectar cambios dentro de objetos anidados

    return {
            estado,
            guardarBorrador,
            recuperarBorrador,
            limpiarEstado,
        };
}