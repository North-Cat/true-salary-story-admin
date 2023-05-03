import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Index from '@/views/index.vue'
import Login from '@/views/login.vue'
import Guideline from '@/views/guideline.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/guideline',
    name: 'guideline',
    component: Guideline
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
