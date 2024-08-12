import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Editor from '@tinymce/tinymce-vue'

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Editor)

app.mount('#app')
