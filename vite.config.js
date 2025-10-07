import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Custom plugin to inject SEO meta tags
function seoPlugin() {
  return {
    name: 'seo-plugin',
    transformIndexHtml(html) {
      const seoMetaTags = `
    <!-- Primary Meta Tags -->
    <meta name="title" content="FocusBox.dev — Timebox your focus. Locally. Effortlessly.">
    <meta name="description" content="A minimal, elegant productivity app for local-first task management and timeboxing. Organize tasks visually with built-in Pomodoro timer. Works offline, no signup required.">
    <meta name="keywords" content="productivity, pomodoro, timer, tasks, local-first, pwa, timeboxing, focus, task management, kanban, productivity app">
    <meta name="author" content="FocusBox.dev">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://focusbox.dev/">
    <meta property="og:title" content="FocusBox.dev — Timebox your focus. Locally. Effortlessly.">
    <meta property="og:description" content="A minimal, elegant productivity app for local-first task management and timeboxing. Organize tasks visually with built-in Pomodoro timer. Works offline, no signup required.">
    <meta property="og:image" content="https://focusbox.dev/pwa-512x512.png">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:image:alt" content="FocusBox.dev - Productivity app for task management and timeboxing">
    <meta property="og:site_name" content="FocusBox.dev">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://focusbox.dev/">
    <meta property="twitter:title" content="FocusBox.dev — Timebox your focus. Locally. Effortlessly.">
    <meta property="twitter:description" content="A minimal, elegant productivity app for local-first task management and timeboxing. Organize tasks visually with built-in Pomodoro timer. Works offline, no signup required.">
    <meta property="twitter:image" content="https://focusbox.dev/pwa-512x512.png">
    <meta property="twitter:image:alt" content="FocusBox.dev - Productivity app for task management and timeboxing">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="application-name" content="FocusBox.dev">
    <meta name="apple-mobile-web-app-title" content="FocusBox">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="format-detection" content="telephone=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="msapplication-TileColor" content="#059669">
    <meta name="msapplication-tap-highlight" content="no">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://focusbox.dev/">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "FocusBox.dev",
      "description": "A minimal, elegant productivity app for local-first task management and timeboxing. Organize tasks visually with built-in Pomodoro timer. Works offline, no signup required.",
      "url": "https://focusbox.dev",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Visual Task Management",
        "Pomodoro Timer",
        "Local-First Storage",
        "Offline Support",
        "PWA Installation",
        "Dark Mode",
        "Drag & Drop Interface"
      ],
      "screenshot": "https://focusbox.dev/pwa-512x512.png",
      "softwareVersion": "1.0.0",
      "datePublished": "2024-01-01",
      "dateModified": "2024-01-01",
      "author": {
        "@type": "Organization",
        "name": "FocusBox.dev"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FocusBox.dev"
      }
    }
    </script>`

      return html.replace(
        '<meta name="theme-color" content="#059669">',
        `<meta name="theme-color" content="#059669">${seoMetaTags}`
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    seoPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'FocusBox.dev',
        short_name: 'FocusBox',
        description: 'Timebox your focus. Locally. Effortlessly.',
        theme_color: '#059669',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        lang: 'en',
        categories: ['productivity', 'utilities'],
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}']
      }
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    chunkSizeWarningLimit: 1000
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
})