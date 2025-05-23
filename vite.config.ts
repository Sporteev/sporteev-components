import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { rmSync } from "fs";

// Clean dist directory before build
rmSync("dist", { recursive: true, force: true });

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    dts({
      // Generate declaration files for all TypeScript files
      include: ["src/**/*.ts", "src/**/*.tsx"],
      // Exclude test and story files
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
      // Output a single declaration file
      rollupTypes: true,
      // Insert types into the bundle
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "SporteevComponents",
      fileName: (format) => `sporteev-components.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
        // Don't include source maps in the package
        sourcemap: false,
      },
    },
    // Clean output directory before build
    emptyOutDir: true,
    // Don't include source maps in the package
    sourcemap: false,
    // Minify the output
    minify: true,
  },
});
