import { describe, it, expect } from 'vitest';
import { validarLuhn, detectarTipoTarjeta } from '../creditCard';
import { formatCurrency, formatCreditCardNumber } from '../formatters';

describe('Utilidades de Tarjeta de Crédito', () => {
    
    it('Algoritmo de Luhn detecta números válidos', () => {
        // Visa válida de prueba
        expect(validarLuhn('4532015112830366')).toBe(true);
    });

    it('Algoritmo de Luhn rechaza números falsos', () => {
        expect(validarLuhn('4532015112830360')).toBe(false); // Último dígito cambiado
        expect(validarLuhn('123')).toBe(false); // Muy corto
        expect(validarLuhn('abc')).toBe(false); // Letras
    });

    it('Detecta tipo de tarjeta correctamente', () => {
        expect(detectarTipoTarjeta('4000')).toBe('visa');
        expect(detectarTipoTarjeta('5100')).toBe('mastercard');
        expect(detectarTipoTarjeta('3400')).toBe('amex');
        expect(detectarTipoTarjeta('9999')).toBe('unknown');
    });
});

describe('Formateadores', () => {
    
    it('Formatea moneda a Euros', () => {
    // Usamos toMatch para ser flexibles
    expect(formatCurrency(10)).toMatch(/10,00\s?€/);
    
    // CAMBIO AQUÍ: Ponemos '1\.?250' para decir que el punto es opcional
    expect(formatCurrency(1250.5)).toMatch(/1\.?250,50\s?€/);
    });

    it('Formatea número de tarjeta con espacios', () => {
        expect(formatCreditCardNumber('1234567812345678')).toBe('1234 5678 1234 5678');
        expect(formatCreditCardNumber('123456')).toBe('1234 56');
    });
});