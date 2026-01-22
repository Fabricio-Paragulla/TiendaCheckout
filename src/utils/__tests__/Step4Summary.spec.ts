import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Step4Summary from '../../components/checkout/Step4Summary.vue';
import { useCheckout } from '../../composables/useCheckout';

describe('Step4Summary.vue', () => {
    
    it('Muestra los datos del estado global correctamente', () => {
        // 1. Preparamos datos en el estado
        const { estado } = useCheckout();
        estado.facturacion.nombre = 'Cliente Final';
        estado.facturacion.email = 'final@test.com';
        estado.pago.metodo = 'bizum';

        const wrapper = mount(Step4Summary);

        // 2. Verificamos que se pintan
        expect(wrapper.text()).toContain('Cliente Final');
        expect(wrapper.text()).toContain('final@test.com');
        // Verificamos que renderiza el componente OrderSummary (verificando textos de precio)
        expect(wrapper.text()).toContain('TOTAL'); 
    });

    it('El botón de confirmar inicia deshabilitado', () => {
        const wrapper = mount(Step4Summary);
        const btn = wrapper.find('button.btn-block'); // El botón grande
        
        // disabled debe ser true o existir el atributo
        expect((btn.element as HTMLButtonElement).disabled).toBe(true);
    });

    it('Habilita el botón solo al marcar los checkboxes obligatorios', async () => {
        const wrapper = mount(Step4Summary);
        const btn = wrapper.find('button.btn-block');

        // Buscamos checkboxes (el orden importa según tu template, o buscamos por texto si fuera e2e)
        // Asumimos que son los 2 primeros inputs type checkbox
        const checkboxes = wrapper.findAll('input[type="checkbox"]');
        
        // Marcamos Términos
        await checkboxes[0]?.setValue(true);
        expect((btn.element as HTMLButtonElement).disabled).toBe(true); // Aún falta uno

        // Marcamos Privacidad
        await checkboxes[1]?.setValue(true);
        
        // Ahora debería estar habilitado
        expect((btn.element as HTMLButtonElement).disabled).toBe(false);
    });

    it('Emite "confirm" al hacer click en el botón habilitado', async () => {
        const wrapper = mount(Step4Summary);
        const checkboxes = wrapper.findAll('input[type="checkbox"]');
        
        // Marcar obligatorios
        await checkboxes[0]?.setValue(true);
        await checkboxes[1]?.setValue(true);

        // Click
        await wrapper.find('button.btn-block').trigger('click');

        expect(wrapper.emitted()).toHaveProperty('confirm');
    });
});