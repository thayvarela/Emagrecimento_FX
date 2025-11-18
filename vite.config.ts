import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// FIX: Import to define `__dirname` in ES module scope.
import { fileURLToPath } from 'url';

// FIX: Define `__dirname` in ES module scope. It's not available by default.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // FIX: Use `path.resolve()` to get CWD and avoid `process.cwd()` type error.
  const env = loadEnv(mode, path.resolve(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      port: 3000,
    },
  };
});
