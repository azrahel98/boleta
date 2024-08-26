import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'

import login from './view/login.vue'
import dashboard from './view/dashboard.vue'
import { userStore } from '@store/user'
import { jwtDecode } from 'jwt-decode'
import { compareAsc } from 'date-fns'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: dashboard,
    beforeEnter: (to, from, next) => middleware(to, from, next)
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const middleware = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    const token = localStorage.getItem('jwt')
    if (token === null) {
      return next({
        name: 'login'
      })
    }
    const store = userStore()
    const decote = jwtDecode(token) as any
    const isal = compareAsc(new Date(), new Date(decote.exp! * 1000))
    store.nombre = decote.nombre
    if (isal > 0) return next({ name: 'login' })
    return next()
  } catch (error) {
    return next({
      name: 'login'
    })
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'currentlink',
  linkActiveClass: 'currentlink'
})
