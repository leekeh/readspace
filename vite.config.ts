import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    target: "es2018",
  },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
