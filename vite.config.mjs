import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only load REACT_APP_ and VITE_ prefixed variables to keep environment clean & secure
  const env = loadEnv(mode, process.cwd(), ['REACT_APP_', 'VITE_']);
  
  const processEnvDefines = {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  };

  for (const [key, val] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(val);
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: false,
    },
    define: processEnvDefines,
    build: {
      target: 'es2020',
      outDir: 'build',
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
  };
});
