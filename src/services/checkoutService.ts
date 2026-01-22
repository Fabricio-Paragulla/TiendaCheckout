const CUPONES_VALIDOS: Record<string, number> = {
    'BIENVENIDO10': 10,
    'VERANO20': 20,
    'VIP30': 30,
};

interface ResultadoDescuento {
    valido: boolean;
    porcentaje: number;
    mensaje: string;
}

export const validarDescuentoAPI = (codigo: string): Promise<ResultadoDescuento> => {
    return new Promise((resolve) => {
        console.log(`Verificando cupón: ${codigo}...`);
        
        setTimeout(() => {
        const codigoNormalizado = codigo.toUpperCase().trim();
        const descuento = CUPONES_VALIDOS[codigoNormalizado];

        if (descuento) {
            resolve({
            valido: true,
            porcentaje: descuento,
            mensaje: `¡Genial! Descuento del ${descuento}% aplicado.`
            });
        } else {
            resolve({
            valido: false,
            porcentaje: 0,
            mensaje: 'El código no es válido o ha caducado.'
            });
        }
        }, 600);
    });
};