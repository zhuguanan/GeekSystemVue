import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LayoutView from '../views/LayoutView.vue'



Vue.use(VueRouter)

const routes = [
  //一级路由
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'layout',
    component: LayoutView,
    //重定向
    redirect: '/home',
    children: [
      //二级路由
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
