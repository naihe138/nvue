import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ '../views/main/home.vue')
const Error = () => import(/* webpackChunkName: "error" */ '../views/main/error.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '*', component: Error }
  ]
})

setTimeout(() => {
  import(/* webpackChunkName: "home" */ './chunk').then(res => {
    console.log(res)
  }, 1000)
})

export default router
