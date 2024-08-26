import App from './App.vue'

import { createApp } from 'vue'
import { router } from './router'

import './app.scss'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
