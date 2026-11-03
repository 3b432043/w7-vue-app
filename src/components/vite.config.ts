import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/w7-vue-app/', // 請務必確認與 GitHub 儲存庫名稱一致且前後有斜線
})