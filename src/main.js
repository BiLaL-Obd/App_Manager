import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './utils.js'
import './manager.js'

const app = createApp(App)
// app.config.globalProperties.$utils = utils;
// window.$utils = utils;
app.use(router)

app.mount('#app')
