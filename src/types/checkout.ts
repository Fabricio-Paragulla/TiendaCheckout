import type { Direccion, DatosEnvio } from './address';
import type { MetodoPago, TarjetaCredito } from './payment';

// Re-exportamos para facilitar imports en otros lados
export type { Direccion, DatosEnvio, MetodoPago, TarjetaCredito };

export interface EstadoPedido {
    facturacion: Direccion;
        envio: {
            mismaDireccion: boolean;
            datos: DatosEnvio;
        };
        pago: {
            metodo: MetodoPago;
            tarjeta?: TarjetaCredito;
            paypalEmail?: string;
            transferenciaRef?: string;
            bizumMovil?: string;
        };
    codigoDescuento?: string;
    descuentoAplicado: number;
}