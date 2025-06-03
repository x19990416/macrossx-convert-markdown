import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
console.log("Vite 配置文件已加载");
const getTarget = (mode: string, target: string) => {
  return loadEnv(mode, process.cwd())[target];
};
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {

  console.log("当前模式:", mode); // 检查 mode 是否正确

  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: env.VITE_BASE_URL || '/', // 从环境变量中读取 base 路径，默认为 '/'
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            //获取标题变量
            title: getTarget(mode, "VITE_APP_TITLE"),
            description: getTarget(mode, "VITE_APP_DESCRIPTION"),
            keywords: getTarget(mode, "VITE_APP_KEYWORDS"),
            author: getTarget(mode, "VITE_APP_AUTHOR"),
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
}