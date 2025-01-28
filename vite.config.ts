import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@table': path.resolve(__dirname, './src/widgets/Table'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@features': path.resolve(__dirname, './src/features'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@storage': path.resolve(__dirname, './src/utils/storage.ts'),
      '@icons': path.resolve(__dirname, './src/icons/icons.ts'),
      '@layouts': path.resolve(__dirname, './src/layouts/index.ts'),
      '@pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@queryKeys': path.resolve(__dirname, './src/shared/utils/queryKeys.ts'),
      '@constants': path.resolve(__dirname, './src/shared/utils/constants.ts'),
      '@components': path.resolve(
        __dirname,
        './src/shared/components/index.ts',
      ),
      '@helpers': path.resolve(__dirname, './src/shared/helpers/index.ts'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config.ts'),
      '@rootTypes': path.resolve(__dirname, './src/types.ts'),
      '@routes': path.resolve(__dirname, './src/routes/index.ts'),
    },
  },
  plugins: [react()],
})
