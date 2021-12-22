import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
        path: ':orderNo',
        name: 'SingleOrder',
        component: () => import('@/views/Orders/Single.vue')
      },
      {
        path: ':orderNo/items/:itemId',
        name: 'OrderProduct',
        component: () => import('@/views/Orders/Product.vue')
      }
    ]
  },
  {
    path: '/products',
    name: 'Products',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Products/index.vue')
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
  history: createWebHistory(process.env.BASE_URL),
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
