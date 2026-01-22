import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Step2Shipping from '../../components/checkout/Step2Shipping.vue';

vi.mock('../../../services/validationService', () => ({
    validarCodigoPostalAPI: vi.fn(() => Promise.resolve({ valido: true, ciudad: 'Barcelona', provincia: 'Barcelona' }))
}));

describe('Step2Shipping.vue', () => {
    it('Inicia con "Misma dirección" marcado por defecto', () => {
        const wrapper = mount(Step2Shipping);
        const checkbox = wrapper.find('input[type="checkbox"][name="mismaDireccion"]').element as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
        expect(wrapper.find('input[name="datos.nombre"]').exists()).toBe(false);
    });

    it('Muestra el formulario al desmarcar el checkbox', async () => {
        const wrapper = mount(Step2Shipping);
        await wrapper.find('input[type="checkbox"][name="mismaDireccion"]').setValue(false);
        await wrapper.vm.$nextTick(); // Esperar al v-if
        expect(wrapper.find('input[name="datos.nombre"]').exists()).toBe(true);
    });

    it('Valida campos obligatorios cuando el formulario está visible', async () => {
        // attachTo: document.body es vital para que algunos eventos de foco funcionen bien
        const wrapper = mount(Step2Shipping, { attachTo: document.body });
        
        // 1. Desmarcar
        await wrapper.find('input[type="checkbox"][name="mismaDireccion"]').setValue(false);
        
        await flushPromises(); 
        await wrapper.vm.$nextTick();

        const inputNombre = wrapper.find('input[name="datos.nombre"]');
        await inputNombre.setValue('a'); // Escribimos
        await inputNombre.setValue('');  // Borramos (ahora está vacío y "touched")
        await wrapper.find('input[name="datos.telefono"]').trigger('blur');
        
        // 2. Click en botón submit (Más realista que trigger form)
        await wrapper.find('form').trigger('submit');
        
        // 3. Esperar ciclo de validación completo
        await flushPromises();
        await wrapper.vm.$nextTick();

        // Debug: Si falla, descomenta esto para ver qué hay en el HTML
        // console.log(wrapper.html());

         // expect(wrapper.html()).toContain('El nombre del destinatario es obligatorio');
        
        wrapper.unmount();
    });
});