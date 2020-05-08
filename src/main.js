import Vue from 'vue'
import './database/config'
import './database/postLogin'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

process.env.NODE_ENV === 'production' &&
  Vue.use(VueGtag, { config: { id: 'UA-165863432-1' } })

// Delay loading by 1s to allow database variables enough time to update
setTimeout(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}, 1000)
