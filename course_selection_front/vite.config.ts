import { fileURLToPath, URL } from 'node:url'
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
  plugins: [
    vue(),
    // 按需导入 el-ui
    AutoImport({
      // vue 函数自动导入
      imports: ['vue'],
      // 组件自动导入
      resolvers: [
        // ui 组件
        ElementPlusResolver(),
        // icon 组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    // 自动注册
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          // 图标集
          enabledCollections: ['ep', 'mdi']
        })
      ]
    }),
    // 自动下载， 有些 icon 本地是没有的
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
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
  }
})
