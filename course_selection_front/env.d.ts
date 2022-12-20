/// <reference types="vite/client" />

// 组件导入模块声明 ，此 env.d.ts 需要在 tsconfig include
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
