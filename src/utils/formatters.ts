// 1. Formatear Moneda (Ej: 1250.5 -> "1.250,50 €")
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
};

// 2. Formatear Tarjeta (Ej: "45321234..." -> "4532 1234 ...")
export const formatCreditCardNumber = (value: string): string => {
    // Eliminamos todo lo que no sea número
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    // Agrupamos de 4 en 4
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substring(i, i + 4));
    }

    // Unimos con espacios (máximo 16 dígitos + 3 espacios = 19 chars)
    return parts.length > 1 ? parts.join(' ') : value;
};

// 3. Formatear Teléfono Español (Ej: "600123456" -> "600 123 456")
export const formatPhoneNumber = (value: string): string => {
    const v = value.replace(/\D/g, '');
    const match = v.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return value;
};