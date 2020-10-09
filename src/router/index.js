import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Nets from '../views/Nets.vue'
import Getaways from '../views/Getaways.vue'
import Devices from '../views/Devices.vue'
import Data from '../views/Data.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/nets',
    name: 'Nets',
    component: Nets,
    props: true
  },
  {
    path: '/getaways',
    name: 'Getaways',
    component: Getaways,
    props: true
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Devices,
    props: true
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
