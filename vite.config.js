import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    hmr: {
      port: prov.port // Run the websocket server on the SSL port
    }
  } 
});
