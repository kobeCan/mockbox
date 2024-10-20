import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import MDX from '@mdx-js/rollup';
import RehypePrism from 'rehype-prism';
import RemarkGfm from 'remark-gfm';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    MDX({
      rehypePlugins: [[RehypePrism, { plugins: ['line-numbers'] }]],
      remarkPlugins: [RemarkGfm],
    }),
    react(),
  ],
});
