import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    comments: 'home'
  },
  {
    path: '/',
    comments: 'home44'
  },
  {
    path: '/',
    comments: 'home4'
  },
]





const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router