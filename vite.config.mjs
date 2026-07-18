import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  optimizeDeps: {
    include: ["vue"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.js", "./src/App.vue"],
    },
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        business: resolve(import.meta.dirname, "business.html"),
        company: resolve(import.meta.dirname, "company.html"),
        profile: resolve(import.meta.dirname, "profile.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
      },
    },
  },
});
