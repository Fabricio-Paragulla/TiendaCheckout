import { ref } from 'vue';

const currentStep = ref(1);
const totalSteps = 4;

export function useWizardNavigation() {
    const nextStep = () => {
        if (currentStep.value < totalSteps) currentStep.value++;
    };

    const prevStep = () => {
        if (currentStep.value > 1) currentStep.value--;
    };

    const setStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) currentStep.value = step;
    };

    return {
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        setStep
    };
}