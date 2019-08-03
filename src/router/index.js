import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "group-home" */ '../views/home.vue')
const Foo = () => import(/* webpackChunkName: "group-foo" */ '../views/foo.vue')
const Bar = () => import(/* webpackChunkName: "group-bar" */ '../views/bar.vue')


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

export default router
