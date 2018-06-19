import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from '@/components/foo'
import Bar from '@/components/bar'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

export default router
