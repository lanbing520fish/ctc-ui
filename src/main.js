// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'

import _ from 'lodash'
import moment from 'moment'
Vue.prototype.moment = moment

Vue.use(vueResource)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
