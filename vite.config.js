import { defineConfig } from 'vite';
import reactrefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';
dotenv.config();

const { PORT = 3001 } = process.env;

export default defineConfig({
  plugins: [reactrefresh()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
