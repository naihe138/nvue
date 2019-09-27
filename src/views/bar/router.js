const Bar = () => import(/* webpackChunkName: "bar" */ './index.vue')

export default [
  { path: '/bar', component: Bar }
]
