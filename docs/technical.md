# Arquitectura Técnica

## Diagrama de Componentes
El proyecto sigue una estructura modular basada en componentes pequeños y reutilizables.

- **CheckoutWizard**: Orquestador principal.
  - **StepIndicator**: Barra de progreso visual.
  - **Step1Billing**: Formulario con validación asíncrona de CP.
  - **Step2Shipping**: Lógica condicional (Misma dirección).
  - **Step3Payment**: 
    - `CreditCardForm`
    - `BizumForm`
    - `PayPalForm`
    - `DiscountCode`
  - **Step4Summary**: Resumen y cálculo de totales.

## Gestión de Estado (`useCheckout`)
Se utiliza el patrón **Composable Singleton** para gestionar el estado global sin librerías externas como Pinia.
* **Persistencia:** Un `watcher` guarda automáticamente cualquier cambio en `localStorage`.
* **Recuperación:** Al cargar la app, se hidratan los datos si existe un borrador previo.

## Validaciones
Se utiliza **VeeValidate v4** junto con **Yup**.
* **Esquemas:** Separados en `useValidationSchemas.ts` para mantener los componentes limpios.
* **Asíncronas:** La validación de Código Postal y Descuentos simula llamadas a API con `setTimeout`.

## Testing
Suite de tests implementada con **Vitest** y **Vue Test Utils**.
* **Cobertura:** >80% en sentencias y funciones.
* **Estrategia:** Mocking de servicios externos (`vi.mock`) y timers (`vi.useFakeTimers`).