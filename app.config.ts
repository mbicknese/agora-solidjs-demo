import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
  },
});
