import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-istanbul",
            {
              extension: [".js", ".ts", ".tsx"],
            },
          ],
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    fs: {
      allow: [".."],
      cachedChecks: false,
    },
  },
});
