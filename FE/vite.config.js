import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Hoặc '0.0.0.0' để lắng nghe trên tất cả các địa chỉ IP
    port: 3000, // Thay đổi cổng nếu muốn
  },
})
