import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import font-awseome
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, fab, far);

import './utils.js'
import './manager.js'

// const app = createApp(App)
// app.config.globalProperties.$utils = utils;
// window.$utils = utils;
createApp(App)
.use(router)
.component("fa", FontAwesomeIcon)
.component('fa-layer', FontAwesomeLayers)
.component('fa-text', FontAwesomeLayersText)
.mount('#app')
