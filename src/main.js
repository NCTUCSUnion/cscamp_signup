import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Create app instance
const app = createApp(App)

// Use plugins
app.use(router)

// Mount the app
app.mount('#app')
