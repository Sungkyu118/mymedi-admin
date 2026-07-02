import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveSrc(dir) {
  return path.resolve(__dirname, dir);
}

// Active Vite configuration for the admin app.
// PWA stays manifest-only for now, while chunk/perf tuning can continue
// incrementally without changing the current bundler choice.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolveSrc("src"),
        src: resolveSrc("src"),
        assets: resolveSrc("src/assets"),
        "chart.js": resolveSrc("node_modules/chart.js/dist/Chart.js"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    server: {
      host: "127.0.0.1",
      port: 8080,
      open: true,
    },
    css: {
      devSourcemap: !isProduction,
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            "legacy-js-api",
            "import",
            "global-builtin",
            "color-functions",
            "slash-div",
            "if-function",
          ],
        },
      },
    },
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __APP_IS_DEMO__: JSON.stringify(env.VITE_APP_IS_DEMO ?? "0"),
    },
    build: {
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        onwarn(warning, warn) {
          const message =
            typeof warning === "string" ? warning : warning.message || "";

          if (
            message.includes("Can't resolve original location of error") ||
            message.includes(
              "contains an annotation that Rollup cannot interpret"
            )
          ) {
            return;
          }

          warn(warning);
        },
      },
    },
  };
});
