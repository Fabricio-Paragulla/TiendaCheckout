// src/services/validationService.ts

// Base de datos simulada de Códigos Postales
const DB_CODIGOS_POSTALES: Record<string, { ciudad: string; provincia: string }> = {
    '28001': { ciudad: 'Madrid', provincia: 'Madrid' },
    '08001': { ciudad: 'Barcelona', provincia: 'Barcelona' },
    '41001': { ciudad: 'Sevilla', provincia: 'Sevilla' },
    '46001': { ciudad: 'Valencia', provincia: 'Valencia' },
};

interface RespuestaCP {
    valido: boolean;
    ciudad?: string;
    provincia?: string;
}

export const validarCodigoPostalAPI = (cp: string): Promise<RespuestaCP> => {
    return new Promise((resolve) => {
        console.log(`Consultando el CP: ${cp}...`);
        
        // Simulamos retardo de red de 500ms
        setTimeout(() => {
        const datos = DB_CODIGOS_POSTALES[cp];
        
        if (datos) {
            resolve({ valido: true, ...datos });
        } else {
            resolve({ valido: false });
        }
        }, 500);
    });
};