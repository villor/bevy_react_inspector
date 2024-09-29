import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bevy_react_inspector/',
  build: {
    target: 'esnext',
  },
  server: {
    proxy: {
      '/brp': {
        target: 'http://localhost:15702',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: ['react', {
        clsx: ['clsx'],
      }],
      dirs: [
        'src/components/**',
        'src/hooks/**',
        'src/utils/**',
      ],
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
