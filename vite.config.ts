/** @type {import('vite').UserConfig} */

import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import vueJsx from "@vitejs/plugin-vue-jsx";

import { createHtmlPlugin } from "vite-plugin-html";
// console.log("meta", import.meta);
const Timestamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const {
    VITE_APP_TITLE,
    VITE_APP_HTTP_DOMAIN,
    VITE_APP_HTTP_DOMAIN_SYSTEM,
    VITE_APP_BASE,
	VITE_APP_HTTP_DOMAIN_SCORE,
    VITE_APP_NODE_ENV,
  } = loadEnv(mode, process.cwd());
  return {
    // 生产或开发环境下的基础路径
    base: VITE_APP_BASE,
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            // html title 系统标题
            title: VITE_APP_TITLE,
          },
        },
      }),
    ],
    resolve: {
      // 设置文件目录别名
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      hmr:true,
      //代理地址
      proxy: {
        "^/aams-business": {
          target: VITE_APP_HTTP_DOMAIN,
          changeOrigin: true,
          logLevel:"‘debug",
          rewrite: (path) => path.replace(/^\/operate/, ""),
		  bypass(req,res,options:any) {
		  	const aurl = options.target+(options.rewrite?options.rewrite(req.url):'');
		  			res.setHeader('A-R-url',aurl)
		  }
        },
		"^/institute-rating-backend-biz": {
		  target: VITE_APP_HTTP_DOMAIN_SCORE,
		  // target: "http://http://10.6.13.212:9208", //
		  changeOrigin: true,
		  logLevel:"‘debug",
		  rewrite: (path) => path.replace(/^\/operate/, ""),
		},
        "^/admin": {
          target: VITE_APP_HTTP_DOMAIN_SYSTEM,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin/, ""),
		  bypass(req,res,options:any) {
		  	const aurl = options.target+(options.rewrite?options.rewrite(req.url):'');
			res.setHeader('A-R-url',aurl)
		  }
        },
      },
    },
    publicPath: "./",
    build: {
      outDir: `dist`, //打包后文件夹名称 -${VITE_APP_NODE_ENV}
      //打包构建
      rollupOptions: {
        output: {
          assetFileNames: "css/[name].[hash].css",
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console.log()
          drop_console: VITE_APP_NODE_ENV == "pro" ? true : false,
          drop_debugger: VITE_APP_NODE_ENV == "pro" ? true : false,
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
  };
});
