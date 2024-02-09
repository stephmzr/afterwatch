import { defineConfig } from 'vite'
import path from 'path'
import Rails from 'vite-plugin-rails';
import ViteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: 'localhost',
    hmr: {
      host: 'localhost'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  plugins: [
    Rails({
      envVars: { RAILS_ENV: 'development' },
    }),
    ViteReact(),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "../../app/javascript/assets/stylesheets"),
      "@images": path.resolve(__dirname, "../../app/javascript/assets/images")
    }
  },
})
