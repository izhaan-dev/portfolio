import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Keep your existing repo name here
  build: {
    // 1. Increase the warning limit so the warning disappears (optional)
    chunkSizeWarningLimit: 1600,
    
    // 2. Tell Vite to split the code into smaller chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // This separates all third-party libraries (node_modules)
            // into a separate "vendor.js" file.
            return 'vendor';
          }
        },
      },
    },
  },
})