import { describe, it, expect } from 'vitest';
import { useWizardNavigation } from '../../composables/useWizardNavigation';

describe('useWizardNavigation', () => {
    it('Incrementa el paso correctamente', () => {
        const { currentStep, nextStep } = useWizardNavigation();
        
        // Reset manual por si acaso el estado es global
        currentStep.value = 1;

        nextStep();
        expect(currentStep.value).toBe(2);
        
        nextStep();
        expect(currentStep.value).toBe(3);
    });

    it('No avanza más allá del último paso', () => {
        const { currentStep, nextStep, totalSteps } = useWizardNavigation();
        currentStep.value = totalSteps; // Estamos en el 4
        
        nextStep();
        expect(currentStep.value).toBe(totalSteps); // Sigue en 4
    });

    it('Retrocede el paso correctamente', () => {
        const { currentStep, prevStep } = useWizardNavigation();
        currentStep.value = 2;
        
        prevStep();
        expect(currentStep.value).toBe(1);
    });

    it('No retrocede antes del paso 1', () => {
        const { currentStep, prevStep } = useWizardNavigation();
        currentStep.value = 1;
        
        prevStep();
        expect(currentStep.value).toBe(1);
    });

    it('Salta a un paso específico con setStep', () => {
        const { currentStep, setStep } = useWizardNavigation();
        
        setStep(3);
        expect(currentStep.value).toBe(3);
        
        // Intento inválido
        setStep(99); 
        expect(currentStep.value).toBe(3); // No debe cambiar
    });
});