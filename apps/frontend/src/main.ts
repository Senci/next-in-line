import './assets/main.css'

// App
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'
import { router } from './plugins/router'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
try {
  app.use(router)
} catch (e) {
  console.log(e)
}

app.mount('#app')
