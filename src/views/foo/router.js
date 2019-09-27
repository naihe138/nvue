const Foo = () => import(/* webpackChunkName: "foo" */ './index.vue')

export default [
  { path: '/foo', component: Foo }
]
