import Vue from 'vue'
import VueRouter from 'vue-router'

const Foo = () => import(/* webpackChunkName: "group-foo" */ '../components/foo.vue')
const Bar = () => import(/* webpackChunkName: "group-bar" */ '../components/bar.vue')


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

export default router
