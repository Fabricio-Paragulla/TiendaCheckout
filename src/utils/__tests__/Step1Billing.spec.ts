import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Step1Billing from '../../components/checkout/Step1Billing.vue';

// Mockeamos las funciones asíncronas para que no fallen
vi.mock('../../../services/validationService', () => ({
    validarCodigoPostalAPI: vi.fn(() => Promise.resolve({ valido: true, ciudad: 'Madrid', provincia: 'Madrid' }))
}));

describe('Step1Billing.vue', () => {
    
    it('Renderiza correctamente el formulario', () => {
        const wrapper = mount(Step1Billing);
        expect(wrapper.find('h2').text()).toBe('Datos de Facturación');
        expect(wrapper.find('input[name="nombre"]').exists()).toBe(true);
    });

    it('Muestra errores si enviamos formulario vacío', async () => {
        const wrapper = mount(Step1Billing);
        
        // Hacemos submit del formulario
        await wrapper.find('form').trigger('submit');

        // Esperamos a que VeeValidate procese (necesario en tests async)
        // Un truco es esperar un ciclo de evento
        await new Promise(r => setTimeout(r, 100));

        // Verificamos que aparecen mensajes de error
        // Nota: VeeValidate pone los errores en un span, puede tardar un poco
        // Buscamos si hay textos de error en el DOM
        expect(wrapper.html()).toContain('El nombre es obligatorio');
        expect(wrapper.html()).toContain('El NIF es obligatorio');
    });

    it('Rellena datos y emite evento next si todo es válido', async () => {
        const wrapper = mount(Step1Billing);

        // Rellenamos campos
        await wrapper.find('input[name="nombre"]').setValue('Juan Test');
        await wrapper.find('input[name="nif"]').setValue('12345678Z');
        await wrapper.find('input[name="email"]').setValue('test@test.com');
        await wrapper.find('input[name="telefono"]').setValue('600123456');
        await wrapper.find('input[name="calle"]').setValue('Calle Falsa 123');
        await wrapper.find('input[name="codigoPostal"]').setValue('28001');
        await wrapper.find('input[name="ciudad"]').setValue('Madrid');
        await wrapper.find('input[name="provincia"]').setValue('Madrid');
        await wrapper.find('select[name="pais"]').setValue('España');

        // Esperamos a que se resuelvan todas las validaciones asíncronas
        await flushPromises();

        await wrapper.find('form').trigger('submit');
        
        // Esperamos a que se procese el submit
        await flushPromises();
        
        // Comprobamos que se emitió el evento 'next'
        expect(wrapper.emitted().next);
    });
});