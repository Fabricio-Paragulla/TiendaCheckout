import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import DiscountCode from '../../components/common/DiscountCode.vue';
import { useCheckout } from '../../composables/useCheckout';

// Mockeamos el servicio
vi.mock('../../services/checkoutService', () => ({
    validarDescuentoAPI: vi.fn((codigo) => {
    if (codigo === 'EXITO') {
        return Promise.resolve({ valido: true, porcentaje: 10, mensaje: 'Descuento OK' });
    }
        return Promise.resolve({ valido: false, porcentaje: 0, mensaje: 'Código mal' });
    })
}));

describe('DiscountCode.vue', () => {

    beforeEach(() => {
        const { limpiarEstado } = useCheckout();
    limpiarEstado(); // Reseteamos el estado global antes de CADA test
    });

    it('Aplica descuento correctamente', async () => {
        const wrapper = mount(DiscountCode);
        
        await wrapper.find('input').setValue('EXITO');
        await wrapper.find('button.btn-apply').trigger('click');
        
        // 1. Esperar promesas (API)
        await flushPromises();
        // 2. Esperar re-render de Vue (IMPORTANTE)
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Descuento OK');
        expect(wrapper.find('button.btn-remove').exists()).toBe(true);
    });

    it('Muestra error con código inválido', async () => {
        const wrapper = mount(DiscountCode);
        
        await wrapper.find('input').setValue('FALLO');
        await wrapper.find('button.btn-apply').trigger('click');
        
        await flushPromises();
        // Esperamos re-render
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Código mal');
    });
});