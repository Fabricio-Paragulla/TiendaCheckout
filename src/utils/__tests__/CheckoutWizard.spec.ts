import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CheckoutWizard from '../../components/checkout/CheckoutWizard.vue';

describe('CheckoutWizard.vue', () => {
    it('Inicia en el paso 1', () => {
        const wrapper = mount(CheckoutWizard);
        // Buscamos el componente del paso 1
        const step1 = wrapper.findComponent({ name: 'Step1Billing' });
        expect(step1.exists()).toBe(true);
    });
});