import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as utils from './utils.js'
import * as manager from './manager.js'

const app = createApp(App)
// app.config.globalProperties.$utils = utils;
// window.$utils = utils;
app.use(router)

app.mount('#app')
