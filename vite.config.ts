import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Production: app is served at .../cse-442i/placeholder/
  base: (import.meta as any).env?.MODE === "production" ? "/CSE442/2026-Spring/cse-442i/placeholder/" : "./",
  plugins: [react()],
});
