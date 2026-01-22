<script setup lang="ts">

defineProps<{
    currentStep: number;
}>();

const steps = [
    { number: 1, title: 'Datos' },
    { number: 2, title: 'Envío' },
    { number: 3, title: 'Pago' },
    { number: 4, title: 'Fin' },
];
</script>

<template>
    <div class="stepper-container">
        <div class="steps">
        <div 
            v-for="step in steps" 
            :key="step.number"
            class="step-item"
            :class="{ 
                'active': currentStep === step.number,
                'completed': currentStep > step.number 
            }"
        >
            <div class="circle">
            <span v-if="currentStep > step.number">✓</span>
            <span v-else>{{ step.number }}</span>
            </div>
                <span class="label">{{ step.title }}</span>
            
            <div v-if="step.number !== steps.length" class="line"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.stepper-container {
    margin-bottom: 2rem;
    padding: 1rem 0;
}

.steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.step-item {
    display: flex;
    align-items: center;
    position: relative;
    flex: 1; /* Para que ocupen espacio igual */
}

/* El último item no debe estirarse */
.step-item:last-child {
    flex: 0; 
}

.circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #e5e7eb;
    color: #6b7280;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    z-index: 10;
    transition: all 0.3s;
    border: 2px solid transparent;
}

.label {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: #6b7280;
    display: none;
}

@media (min-width: 640px) {
    .label { display: block; }
}

.line {
    position: absolute;
    left: 35px;
    right: -10px;
    height: 2px;
    background-color: #e5e7eb;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
}

/* Estilos Activo */
.step-item.active .circle {
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}
.step-item.active .label {
    color: #3b82f6;
    font-weight: bold;
}

/* Estilos Completado */
.step-item.completed .circle {
    background-color: #10b981;
    color: white;
}
.step-item.completed .line {
    background-color: #10b981;
}
</style>