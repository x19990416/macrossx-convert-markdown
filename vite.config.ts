import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
const getTarget = (mode: string, target: string) => {
  console.log(mode);
  console.log(loadEnv(mode, process.cwd())[target]);
  return loadEnv(mode, process.cwd())[target];
};
// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            //获取标题变量
            title: getTarget(mode, "VITE_APP_TITLE"),
          },
        },
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],

    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  });
