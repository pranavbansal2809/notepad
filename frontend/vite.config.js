import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // This proxies any request starting with '/api'
      "/api": {
        target: "http://127.0.0.1:5000", // Your backend server
        changeOrigin: true, // Recommended for virtual hosts
        secure: false, // Don't verify SSL cert (development)
      },
    },
  },
});
