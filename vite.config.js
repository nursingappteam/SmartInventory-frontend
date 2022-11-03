import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: true,
    hmr: {
      port: process.env.port // Run the websocket server on the SSL port
    }
  } 
});
