import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'
import pinia from './store'

Vue.use(PiniaVuePlugin)
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");