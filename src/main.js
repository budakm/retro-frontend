import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/snack'
import './plugins/swal'

axios.defaults.baseURL = 'http://localhost:46991'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
