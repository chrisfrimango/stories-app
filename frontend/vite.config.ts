import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
// import path from "path";
dns.setDefaultResultOrder("ipv4first");

// https://vite.dev/config/
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
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //     src: path.resolve(__dirname, "./src"),
  //   },
  // },
  server: {
    host: true,
    port: 5173,
    fs: {
      allow: [".."],
      cachedChecks: false,
    },
  },
});
