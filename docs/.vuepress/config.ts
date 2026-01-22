import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'es-ES',
    title: 'Documentación Checkout',
    description: 'Práctica 5.1 - Checkout Tienda Online con Vue 3',
    bundler: viteBundler(),
    theme: defaultTheme({
        navbar: [
        { text: 'Inicio', link: '/' },
        { text: 'Guía de Usuario', link: '/guide.md' },
        { text: 'Informe Técnico', link: '/technical.md' },
        ],
    }),
})