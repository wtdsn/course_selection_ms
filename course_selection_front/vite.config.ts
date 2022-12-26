import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element-ui 按需自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// icon 按需自动导入
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// 使用上是 i-图标集-图标名

// https://vitejs.dev/config/
export default defineConfig({
  // 配置打包后相对路径
  base: './',
  plugins: [
    vue({
      reactivityTransform: true
    }),
    // 按需导入 el-ui
    AutoImport({
      // vue 函数自动导入
      imports: ['vue', '@vueuse/core'],
      // 组件自动导入
      resolvers: [
        // ui 组件
        ElementPlusResolver(),
        // icon 组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      eslintrc: {
        // 配置为 true ，生成 .eslintrc-auto-import.json 文件
        // 并且在 eslint.js 中 include , 解决 ref is undefined 等问题
        // 之后如果非更新，可以不开启
        enabled: false
      },
      vueTemplate: true,
      dts: path.resolve(__dirname, 'auto-imports.d.ts')
    }),
    // 自动注册
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // 图标集
          enabledCollections: ['ep', 'mdi']
        })
      ],
      dts: path.resolve(__dirname, 'components.d.ts')
    }),
    // 自动下载， 有些 icon 本地是没有的
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  // 配置全局 less 变量 , 需要下载 less less-loader ,但不需要配置
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            'src/assets/style/common.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  },

  // 服务器选修
  server: {
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000/cs/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true
  }
})
