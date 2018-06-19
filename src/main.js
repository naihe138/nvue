import Vue from 'vue'
import ElementUI from 'element-ui'
import router from '@/router'
import store from '@/store'
import APP from './APP'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { APP },
  template: '<APP />'
})
