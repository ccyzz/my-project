import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Personal from '@/views/Personal'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    }
  ]
})
