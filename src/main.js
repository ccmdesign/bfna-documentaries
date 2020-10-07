import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueYoutube from 'vue-youtube'

import App from './App.vue'
import router from './router'
import store from './store'

import setupContentful from './setupContentful'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueCarousel)
Vue.use(VueYoutube)

const instance = new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')

setupContentful(instance)
