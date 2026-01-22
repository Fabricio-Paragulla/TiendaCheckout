export type MetodoPago = 'tarjeta' | 'paypal' | 'transferencia' | 'bizum';

export interface TarjetaCredito {
    numero: string;
    titular: string;
    caducidad: string;
    cvv: string;
    tipo: 'visa' | 'mastercard' | 'amex' | 'unknown';
}