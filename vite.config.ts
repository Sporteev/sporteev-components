import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "SporteevComponents",
      formats: ["es", "umd"],
      fileName: (format) => `sporteev-components.${format}.js`,
    },
    outDir: "dist",
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name === "style.css"
            ? "sporteev-components.css"
            : assetInfo.name || "unknown";
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  plugins: [
    react(),
    dts({
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
      rollupTypes: true,
      insertTypesEntry: true,
      compilerOptions: {
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"],
        },
      },
      outDir: "dist",
      copyDtsFiles: false,
    }),
  ],
});
