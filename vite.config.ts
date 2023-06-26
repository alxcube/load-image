import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import banner from "vite-plugin-banner";
import packageInfo from "./package.json";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "./dist/types",
    }),
    banner(
      `${packageInfo.name} ${packageInfo.version}\n© 2023 ${packageInfo.author}\nLicense: ${packageInfo.license}`
    ),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/loadImage.ts"),
      name: "alxcube.loadImage",
      fileName: "load-image",
    },
  },
});
