<template><div><h1 id="arquitectura-tecnica" tabindex="-1"><a class="header-anchor" href="#arquitectura-tecnica"><span>Arquitectura Técnica</span></a></h1>
<h2 id="diagrama-de-componentes" tabindex="-1"><a class="header-anchor" href="#diagrama-de-componentes"><span>Diagrama de Componentes</span></a></h2>
<p>El proyecto sigue una estructura modular basada en componentes pequeños y reutilizables.</p>
<ul>
<li><strong>CheckoutWizard</strong>: Orquestador principal.
<ul>
<li><strong>StepIndicator</strong>: Barra de progreso visual.</li>
<li><strong>Step1Billing</strong>: Formulario con validación asíncrona de CP.</li>
<li><strong>Step2Shipping</strong>: Lógica condicional (Misma dirección).</li>
<li><strong>Step3Payment</strong>:
<ul>
<li><code v-pre>CreditCardForm</code></li>
<li><code v-pre>BizumForm</code></li>
<li><code v-pre>PayPalForm</code></li>
<li><code v-pre>DiscountCode</code></li>
</ul>
</li>
<li><strong>Step4Summary</strong>: Resumen y cálculo de totales.</li>
</ul>
</li>
</ul>
<h2 id="gestion-de-estado-usecheckout" tabindex="-1"><a class="header-anchor" href="#gestion-de-estado-usecheckout"><span>Gestión de Estado (<code v-pre>useCheckout</code>)</span></a></h2>
<p>Se utiliza el patrón <strong>Composable Singleton</strong> para gestionar el estado global sin librerías externas como Pinia.</p>
<ul>
<li><strong>Persistencia:</strong> Un <code v-pre>watcher</code> guarda automáticamente cualquier cambio en <code v-pre>localStorage</code>.</li>
<li><strong>Recuperación:</strong> Al cargar la app, se hidratan los datos si existe un borrador previo.</li>
</ul>
<h2 id="validaciones" tabindex="-1"><a class="header-anchor" href="#validaciones"><span>Validaciones</span></a></h2>
<p>Se utiliza <strong>VeeValidate v4</strong> junto con <strong>Yup</strong>.</p>
<ul>
<li><strong>Esquemas:</strong> Separados en <code v-pre>useValidationSchemas.ts</code> para mantener los componentes limpios.</li>
<li><strong>Asíncronas:</strong> La validación de Código Postal y Descuentos simula llamadas a API con <code v-pre>setTimeout</code>.</li>
</ul>
<h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing"><span>Testing</span></a></h2>
<p>Suite de tests implementada con <strong>Vitest</strong> y <strong>Vue Test Utils</strong>.</p>
<ul>
<li><strong>Cobertura:</strong> &gt;80% en sentencias y funciones.</li>
<li><strong>Estrategia:</strong> Mocking de servicios externos (<code v-pre>vi.mock</code>) y timers (<code v-pre>vi.useFakeTimers</code>).</li>
</ul>
</div></template>


