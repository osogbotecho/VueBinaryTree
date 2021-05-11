import Vue from 'vue'
import App from './App.vue'
//import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.config.productionTip = false
// Vue.use(bootstrap)
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)



new Vue({
  render: h => h(App),
}).$mount('#app')

