import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  outDir: 'dist',
})
