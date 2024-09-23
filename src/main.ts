import App from './App.vue'

import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'

import './custom.scss'

createApp(App).use(router).use(createPinia()).mount('#app')
