import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'

import login from './view/login.vue'
//@ts-ignore
import dashboard from './view/dashboard.vue'
import { userStore } from '@store/user'
import { jwtDecode } from 'jwt-decode'
import { compareAsc } from 'date-fns'
import Home from './view/dashboard/home.vue'
import Buscar from './view/dashboard/buscar.vue'
import Convocatoria from './view/dashboard/convocatoria.vue'
import Perfil from './view/dashboard/perfil.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: dashboard,
    beforeEnter: (to, from, next) => middleware(to, from, next),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: Home
      },
      {
        path: '/buscar',
        name: 'buscar',
        component: Buscar
      },
      {
        path: '/convocatoria',
        name: 'convocatorias',
        component: Convocatoria
      },
      {
        path: '/perfil/:dni',
        name: 'perfil',
        component: Perfil
      }
    ]
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
