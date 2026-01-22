import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { validarCodigoPostalAPI } from '../../services/validationService';
import { validarDescuentoAPI } from '../../services/checkoutService';

describe('Servicios (API Simulada)', () => {
    
    beforeEach(() => {
        vi.useFakeTimers(); // "Congelamos" el tiempo
    });

    afterEach(() => {
        vi.restoreAllMocks(); // Limpiamos después de cada test
    });

    // --- Test de Validación de CP ---
    describe('validarCodigoPostalAPI', () => {
        it('Devuelve datos para un CP válido (28001)', async () => {
        // 1. Llamamos a la función real
        const promesa = validarCodigoPostalAPI('28001');
        
        // 2. Avanzamos el reloj 500ms para que el setTimeout se dispare
        vi.advanceTimersByTime(500);
        
        // 3. Esperamos el resultado
        const resultado = await promesa;

        expect(resultado.valido).toBe(true);
        expect(resultado.ciudad).toBe('Madrid');
        expect(resultado.provincia).toBe('Madrid');
        });

        it('Devuelve inválido para un CP desconocido', async () => {
        const promesa = validarCodigoPostalAPI('99999');
        vi.advanceTimersByTime(500);
        const resultado = await promesa;

        expect(resultado.valido).toBe(false);
        });
    });

  // --- Test de Validación de Descuentos ---
    describe('validarDescuentoAPI', () => {
        it('Aplica descuento correcto para BIENVENIDO10', async () => {
        const promesa = validarDescuentoAPI('BIENVENIDO10');
        
        // El servicio de descuento tarda 600ms
        vi.advanceTimersByTime(600);
        
        const resultado = await promesa;

        expect(resultado.valido).toBe(true);
        expect(resultado.porcentaje).toBe(10);
        expect(resultado.mensaje).toContain('Genial');
        });

        it('Ignora mayúsculas/minúsculas (VeRaNo20)', async () => {
        const promesa = validarDescuentoAPI('VeRaNo20');
        vi.advanceTimersByTime(600);
        const resultado = await promesa;

        expect(resultado.valido).toBe(true);
        expect(resultado.porcentaje).toBe(20);
        });

        it('Rechaza códigos inventados', async () => {
        const promesa = validarDescuentoAPI('FAKE123');
        vi.advanceTimersByTime(600);
        const resultado = await promesa;

        expect(resultado.valido).toBe(false);
        expect(resultado.porcentaje).toBe(0);
        });
    });
});