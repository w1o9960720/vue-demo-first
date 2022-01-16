import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './icon/font_2848932_z88kp5ibjyo.css'
import './assets/css/reset.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
