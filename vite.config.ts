import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bevy_react_inspector/',
  build: {
    target: 'esnext',
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
        'src/models/**',
        'src/utils/**',
      ],
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
