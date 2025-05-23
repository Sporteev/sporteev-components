import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      formats: ["es", "umd"],
      name: "sporteev-components",
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
        preserveModules: false,
        assetFileNames: (assetInfo) => {
          const source = assetInfo.source.toString();
          if (source.includes(".css")) return "styles.css";
          return "assets/[name][extname]";
        },
      },
    },
    sourcemap: true,
    minify: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [react(), dts()],
});
