import { createApp } from 'vue'
import { createGtag } from "vue-gtag";
import App from './App.vue'
import router from './router'

const gtag = createGtag({
    tagId: "G-9B0Q6G79HH"
})
// Create app instance
const app = createApp(App)

// Use plugins
app.use(router)
app.use(gtag)

// Mount the app
app.mount('#app')
