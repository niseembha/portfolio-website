import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/portfolio-website/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        deepWorkScoreboard: resolve(
          rootDir,
          "deep-work-scoreboard/index.html",
        ),
      },
    },
  },
});
