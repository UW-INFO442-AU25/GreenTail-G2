import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 用于 GitHub Pages 的基础路径（仓库名）
  // 本地开发不受影响，构建时会使用该前缀确保资源路径正确
  base: mode === 'production' ? '/GreenTail-G2/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}))
