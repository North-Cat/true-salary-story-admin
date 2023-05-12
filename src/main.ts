import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import Persistedstate from 'pinia-plugin-persistedstate'
import type { Router } from 'vue-router'

import App from './App.vue'
import router from './router'
import ajax from './utilities/ajax'
import Notifications from '@kyvg/vue3-notification'

import './assets/css/main.css'
import './assets/css/icon.css'
import './assets/css/tailwind.css'

const app = createApp(App)
const pinia = createPinia()

// 在 pinia 宣告 "router" 型別，以免 ts 偵錯
declare module 'pinia' {  export interface PiniaCustomProperties { router: Router } }
// 註冊 router 成為 pinia 套件，才能在 pinia 裡面使用 router
pinia.use(({ store }) => {
    store.router = markRaw(router) 
}); 
// 註冊 persistedstate 成為 pinia 套件，實現 state 持久化，不會因為頁面重新整理而重置
pinia.use(Persistedstate);


app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')
