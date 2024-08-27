import App from './App.vue'

import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import VueTablerIcons from 'vue-tabler-icons'

import './app.scss'

createApp(App).use(router).use(VueTablerIcons).use(createPinia()).mount('#app')
