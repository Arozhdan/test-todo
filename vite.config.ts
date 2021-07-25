import { defineConfig } from "vite";
import eslintPlugin from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), eslintPlugin({
    fix:true
  })]
})
