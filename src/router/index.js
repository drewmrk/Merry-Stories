import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import {
  isLoggedIn,
  isAdmin,
  doesStoryExist,
  doesUserExist
} from '@/database/variables'

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
    component: () => import('@/pages/About')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/pages/FAQ')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/Profile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import('@/pages/Write'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: () => import('@/pages/Story'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stories',
    name: 'Stories',
    component: () => import('@/pages/Stories'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/pages/User'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/Admin'),
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import('@/pages/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.name + ' - Merry Stories'
  // Check if the user is logged in
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await isLoggedIn) {
      next()
    }
  } else {
    next()
  }
  // Check if the user is an admin
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (await isAdmin) {
      next()
    }
  } else {
    next()
  }
  // Check if the story exists
  if (to.matched.some(record => record.name === 'Story')) {
    if (await doesStoryExist) {
      next()
    } else {
      router.push('/whoops')
    }
  }
  // Check if the user exists
  if (to.matched.some(record => record.name === 'User')) {
    if (await doesUserExist) {
      next()
    } else {
      router.push('/whoops')
    }
  }
})

export default router
