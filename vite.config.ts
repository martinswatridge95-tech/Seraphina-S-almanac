import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  // This ensures your site works on GitHub Pages
  base: '/Seraphina-S-almanac/', 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'favicon.ico'],
      manifest: {
        name: "Seraphina's Mystical Wellness Almanac",
        short_name: 'Seraphina',
        description: 'A grimoire of moon wisdom and natural healing',
        theme_color: '#ffb600',
        background_color: '#0d1117',
        display: 'standalone',
        orientation: 'portrait',
        id: '/Seraphina-S-almanac/',
        start_url: '/Seraphina-S-almanac/',
        categories: ['lifestyle', 'health'],
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
});