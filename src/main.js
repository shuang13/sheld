// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import http from './service/http'
import api from './service/api'

Vue.use(VueRouter)
Vue.use(ViewUI)
Vue.prototype.$http = http // ajax请求
Vue.prototype.$api = api // api统一


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
