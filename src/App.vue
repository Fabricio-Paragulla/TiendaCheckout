<script setup lang="ts">
import CheckoutWizard from './components/checkout/CheckoutWizard.vue';
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="logo">VueShop</div>
    </header>

    <main>
      <CheckoutWizard />
    </main>
    
    <footer class="main-footer">
      <p>&copy; 2025 Práctica Checkout - Vue 3 + TypeScript + VeeValidate</p>
    </footer>
  </div>
</template>

<style>
/* Reset básico y fuente global */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f3f4f6;
  color: #1f2937;
  line-height: 1.5;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-header {
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2563eb;
}

main {
  flex: 1; /* Empuja el footer hacia abajo */
}

.main-footer {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>