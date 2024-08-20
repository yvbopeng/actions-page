import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// @ts-ignore
import router from './router/index'
import VueKonva from 'vue-konva';

const app = createApp(App)

app.use(createPinia())
app.use(router)
// @ts-ignore
app.use(VueKonva);
app.mount('#app')