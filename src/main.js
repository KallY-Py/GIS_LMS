import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/theme.css'

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App)
app.use(router)
app.mount('#app')