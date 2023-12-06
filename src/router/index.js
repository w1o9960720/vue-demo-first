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
    comments: 'home1'
  },
  {
    path: '/',
    comments: 'home2'
  }
]





const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router