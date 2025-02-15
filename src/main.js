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
import { Builder } from './components/controllers/manager'
import { TextField, NumberField, TextAreaField, ToolbarButton } from './components/controllers'

const app = createApp(App)
// app.config.globalProperties.$utils = utils;
// window.$utils = utils;

// const components = [
//     { name: 'BuilderManager', component: Builder },
//     { name: 'TextInput', component: TextField },
//     { name: 'TextAreaInput', component: TextAreaField },
//     { name: 'NumberInput', component: NumberField },
//     { name: 'ButtonInput', component: ToolbarButton },
// ];

// // Register components
// components.forEach(({ name, component }) => {
//     app.component(name, component);
// });
const components = new Map([
    ['BuilderManager', Builder],
    ['TextInput', TextField],
    ['TextAreaInput', TextAreaField],
    ['NumberInput', NumberField],
    ['ButtonInput', ToolbarButton],
]);
components.forEach((component, name) => {
    app.component(name, component);
});

app.component("fa", FontAwesomeIcon)
.component('fa-layer', FontAwesomeLayers)
.component('fa-text', FontAwesomeLayersText)

app.use(router).mount('#app');