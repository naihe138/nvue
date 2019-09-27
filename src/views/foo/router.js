const Foo = () => import(/* webpackChunkName: "bar" */ './index.vue')

export default [
  { path: '/foo', component: Foo }
]
