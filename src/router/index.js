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

// 模拟请求路由权限加载
setTimeout(() => {
  import(/* webpackChunkName: "chunk-router" */ './chunk').then(res => {
    // 这里可以根据权限来添加路由
    router.addRoutes(res.default)
  }, 500)
})

router.beforeEach((to, from, next) => {
  // 如果匹配不到路由的，或者模块路由该没有添加到路由表里面就跳转到home页面
  if (router.currentRoute.matched.length === 0 && to.path === '/foo') {
    next({ path: '/', replace: true })
  } else {
    next()
  }
})

export default router
