import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth' // get token from cookie

/* Layout */
import Layout from '@/layout/index.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/?page=home' }
    },
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue'),
      }
    ]
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Orders/index.vue')
      },
      {
        path: ':orderId',
        name: 'SingleOrder',
        component: () => import('@/views/Orders/Single.vue')
      },
      {
        path: ':orderId/items/:itemId',
        name: 'OrderProduct',
        component: () => import('@/views/Orders/Product.vue')
      }
    ]
  },
  {
    path: '/stores',
    name: 'Stores',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Stores/index.vue')
      }
    ]
  },
  {
    path: '/members',
    name: 'Members',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Members/index.vue')
      },
      {
        path: ':id',
        component: () => import('@/views/Members/Single.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('../views/About.vue')
      }
    ]
  },
  {
    path: '/me',
    name: 'Me',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Members/Me.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

const whiteList = ['/login'] // no redirect whitelist


router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken()

  /* has no token*/
  if (!hasToken && whiteList.indexOf(to.path) == -1) {
    next({ path: `/login?redirect=${to.path}` })
  }

  if (hasToken && to.path === '/login') {
    next({ path: '/' })
  }
  next()
})

export default router
