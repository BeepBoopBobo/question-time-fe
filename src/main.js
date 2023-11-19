import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInfo, faMinus, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPen, faPlus, faMinus, faInfo)

const pinia = createPinia()

import App from './App.vue'
import router from './router'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(pinia)
app.mount('#app')
