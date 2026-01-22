import type { TarjetaCredito } from '../types/checkout';

// Algoritmo de Luhn
export const validarLuhn = (numero: string): boolean => {
// Eliminamos espacios y guiones
    const s = numero.replace(/\D/g, '');
    
// Comprobamos que solo haya números y longitud mínima
    if (!/^\d+$/.test(s) || s.length < 13) return false;

    let suma = 0;
    let debeDuplicar = false; // Empezamos desde el último dígito hacia atrás

// Recorremos el string al revés
    for (let i = s.length - 1; i >= 0; i--) {
        let digito = parseInt(s.charAt(i), 10);

        if (debeDuplicar) {
        digito *= 2;
        if (digito > 9) digito -= 9;
        }

        suma += digito;
        debeDuplicar = !debeDuplicar;
    }

    return suma % 10 === 0;
};

// Detectar tipo de tarjeta según sus primeros dígitos
export const detectarTipoTarjeta = (numero: string): TarjetaCredito['tipo'] => {
    const s = numero.replace(/\D/g, '');
    
    if (/^4/.test(s)) return 'visa';
    if (/^5[1-5]/.test(s)) return 'mastercard';
    if (/^3[47]/.test(s)) return 'amex';
    
    return 'unknown';
};