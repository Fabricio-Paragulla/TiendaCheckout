import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCheckout } from '../../composables/useCheckout';

// Mock simple de localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => { store[key] = value.toString(); }),
        removeItem: vi.fn((key: string) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; })
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useCheckout Composable', () => {
    
    beforeEach(() => {
        localStorageMock.clear();
        const { limpiarEstado } = useCheckout();
        limpiarEstado();
        vi.clearAllMocks();
    });

    it('Inicializa con estado vacío por defecto', () => {
        const { estado } = useCheckout();
        expect(estado.facturacion.nombre).toBe('');
        expect(estado.pago.metodo).toBe('tarjeta');
    });

    it('Guarda en localStorage cuando cambia el estado', async () => {
        const { estado, guardarBorrador } = useCheckout();
        
        // Modificamos estado
        estado.facturacion.nombre = 'Usuario Test';
        
        // Forzamos guardado (o esperamos al watcher si estuviéramos en un componente, 
        // pero aquí llamamos directo para probar la función)
        guardarBorrador();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        // Verificamos que lo guardado contiene el nombre
        const guardado = JSON.parse(localStorageMock.getItem('checkout_borrador') || '{}');
        expect(guardado.facturacion.nombre).toBe('Usuario Test');
    });

    it('Recupera datos de localStorage', () => {
        const { recuperarBorrador, estado } = useCheckout();
        
        // Preparamos datos en LS
        const datosFake = { 
        facturacion: { nombre: 'Recuperado' },
        // Necesitamos la estructura básica mínima para que no falle al asignar
        envio: { mismaDireccion: true, datos: {} },
        pago: { metodo: 'paypal' } 
        };
        localStorageMock.setItem('checkout_borrador', JSON.stringify(datosFake));

        const resultado = recuperarBorrador();
        
        expect(resultado).toBe(true);
        expect(estado.facturacion.nombre).toBe('Recuperado');
    });

    it('Limpia el estado y el localStorage', () => {
        const { limpiarEstado, estado, guardarBorrador } = useCheckout();
        
        // Ensuciamos
        estado.facturacion.nombre = 'Sucio';
        guardarBorrador();
        
        // Limpiamos
        limpiarEstado();
        
        expect(estado.facturacion.nombre).toBe('');
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('checkout_borrador');
    });
});