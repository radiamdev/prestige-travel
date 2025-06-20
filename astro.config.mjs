// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        react({
            experimentalReactChildren: true,
        }),
    ],
    i18n: {
        defaultLocale: 'en', // Default language
        locales: ['en', 'it', 'de'], // Supported languages
        routing: {
            prefixDefaultLocale: true, // Ensures all routes include the locale (e.g., /en/gallery, /it/gallery, /de/gallery). If set to false, the default locale (en) would omit the prefix (e.g., /gallery).
        },
    },
})
