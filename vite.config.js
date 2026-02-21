import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Modern browsers for better performance
    minify: 'esbuild', // esbuild is fast and handles large WebGL/Spline payloads
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React core into its own chunk
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // Split heavy 3D libraries (Three.js and Spline)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          
          // Split animation libraries
          'vendor-motion': ['framer-motion', 'lenis']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1000kb since we split chunks
  }
})
