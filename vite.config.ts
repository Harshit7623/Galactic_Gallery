import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  root: path.resolve("./client"),
  build: {
    outDir: path.resolve("./dist/public"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
      "@shared": path.resolve("./shared"),
      "@assets": path.resolve("./attached_assets"),
    },
  },
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // Conditional plugins for dev environment
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID
      ? [
          // @replit plugins for development only
          require("@replit/vite-plugin-cartographer")().cartographer(),
          require("@replit/vite-plugin-dev-banner")().devBanner(),
        ]
      : []),
  ],
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
