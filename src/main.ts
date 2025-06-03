import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 为导入添加 @ts-ignore 注释以临时忽略类型检查
// @ts-ignore
import router from './router'

createApp(App).use(router).mount('#app')
