import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import APP from './APP'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => <APP />
})
