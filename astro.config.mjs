// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Rubik",
      cssVariable: "--font-rubik",
      weights: ["300 900"],
      fallbacks: ["sans-serif"],
    },
  ],
});
