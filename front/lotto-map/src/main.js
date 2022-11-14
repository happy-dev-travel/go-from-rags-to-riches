import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueGeolocationApi from 'vue-geolocation-api'
import _ from 'lodash';
import vuetify from './plugins/vuetify'
import 'font-awesome/css/font-awesome.min.css' 

Vue.use(VueGeolocationApi)

Vue.config.productionTip = false
Vue.prototype._ = _;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
