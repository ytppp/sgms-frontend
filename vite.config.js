import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

const baseUrl = 'http://localhost:8080' // 后端接口

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.scrcu.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.scrcu.com/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: [
        { find: '~', replacement: path.resolve(__dirname, './') },
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '@vForm', replacement: path.resolve(__dirname, './src/components/vForm') },
        // vue3-quill 的 main 指向 src/index.js（内含 .vue 源文件），esbuild 依赖预打包无法处理，
        // 导致整条依赖链回退为源码模式加载，CJS 产物在浏览器中按 ESM 解析报
        // "does not provide an export named 'default'"。
        // 这里别名到其预编译的 CJS 构建以保证预打包成功（内部 require('quill') 解析到嵌套安装的 quill 1.3.7）
        { find: /^vue3-quill$/, replacement: path.resolve(__dirname, 'node_modules/vue3-quill/lib/vue3-quill.common.js') }
      ],
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    optimizeDeps: {
      include: ['@/../lib/vuedraggable/dist/vuedraggable.umd.js'] // , 'quill'
    },
    // 打包配置
    build: {
      // https://vite.dev/config/build-options.html
      sourcemap: command === 'build' ? false : 'inline',
      outDir: 'dist',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 2000,
      commonjsOptions: {
        exclude: [
          'lib/vuedraggable/dist/vuedraggable.umd.js,',
        ],
        include: []
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      },
    },
    // vite 相关配置
    server: {
      port: 80,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: baseUrl,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        },
         // springdoc proxy
         '^/v3/api-docs/(.*)': {
          target: baseUrl,
          changeOrigin: true,
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      },
      // preprocessorOptions: {
      //   scss: {
      //     // 现代sass推荐写法 @use + as *
      //     additionalData: `@use "@/assets/styles/variables.module.scss" as *;`,
      //     // Vite6 默认 modern-compiler；Vite5 可显式声明
      //     api: 'modern-compiler'
      //   }
      // }
    }
  }
})
