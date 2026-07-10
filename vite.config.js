import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api/leetcode": {
        target: "https://leetcode-api-pied.vercel.app",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/leetcode/, ""),
      },
      "/api/alfalc": {
        target: "https://alfa-leetcode-api.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/alfalc/, ""),
      },
      "/api/codeforces": {
        target: "https://codeforces.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/codeforces/, ""),
      },
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "three-vendor";
            if (id.includes("framer-motion")) return "motion-vendor";
            if (id.includes("recharts") || id.includes("d3-"))
              return "charts-vendor";
            if (id.includes("react") || id.includes("scheduler"))
              return "react-vendor";
            if (id.includes("@react-three")) return "three-vendor";
            if (id.includes("lucide-react")) return "icons-vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
