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

//路由守卫
router.beforeEach((to, from, next) => {
  //如果你要去的路由是登录页面，那就直接去登录页面
  if (to.path === '/login') {
    return next();
  }
  //如果我要去的页面不是登录页面并且没有登录信息，则直接跳转到登录页面
  const user = localStorage.getItem("user");
  if (!user && to.path !== '/login') {
    return next('/login')
  }
  next();
})

export default router
