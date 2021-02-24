import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueCurrency from 'vue-currency-filter'
import moment from 'moment'

import 'bootstrap-vue/dist/bootstrap-vue.css' 

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCurrency, {
  name: 'rupiah',
  symbol : 'Rp',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
})
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('D MMM YYYY hh:mm')
  }
})
Vue.config.productionTip = false

const token = localStorage.getItem('Authorization')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  axios.defaults.headers.common['Authorization'] = token
  axios.defaults.headers.common['x-access-token'] = token
} else {
  router.push('/login')
}

require('dotenv').config();

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
