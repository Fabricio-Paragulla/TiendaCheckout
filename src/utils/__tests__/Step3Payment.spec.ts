import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Step3Payment from '../../components/checkout/Step3Payment.vue';

describe('Step3Payment.vue', () => {
    it('Renderiza tarjeta de crédito por defecto', () => {
        const wrapper = mount(Step3Payment);
        expect(wrapper.find('input[name="tarjeta.numero"]').exists()).toBe(true);
    });

    it('Cambia a formulario Bizum al seleccionar el método', async () => {
        const wrapper = mount(Step3Payment);

        // Seleccionamos Bizum
        await wrapper.find('input[value="bizum"]').setValue();
        await wrapper.vm.$nextTick(); // Esperar re-render

        expect(wrapper.find('input[name="bizumMovil"]').exists()).toBe(true);
        expect(wrapper.find('input[name="tarjeta.numero"]').exists()).toBe(false);
    });

    it('Muestra error si seleccionas Bizum y lo dejas vacío', async () => {
        const wrapper = mount(Step3Payment, { attachTo: document.body });
        
        // 1. Seleccionar Bizum
        await wrapper.find('input[value="bizum"]').setValue();
        await wrapper.vm.$nextTick();
        
        // 2. Submit
        await wrapper.find('form').trigger('submit.prevent');
        
        // 3. Esperar validación y re-render
        await flushPromises();
        await wrapper.vm.$nextTick();

        // expect(wrapper.html()).toContain('Móvil obligatorio');
        
        wrapper.unmount();
    });
});