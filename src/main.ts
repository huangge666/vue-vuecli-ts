import { createApp, Directive } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { loadAllPlugins } from './plugins'
import '@/styles/index.scss'
import 'normalize.css'
import * as directives from '@/directives'
import '@/router/permission'
import loadSvg from '@/icons'

import registerGlobComp from "@/components";

const app = createApp(App)
// 加载所有插件
loadAllPlugins(app)
// 加载全局 SVG
loadSvg(app)
// 加载全局组件
registerGlobComp(app)
// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount('#app')
