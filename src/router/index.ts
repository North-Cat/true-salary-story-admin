import { createRouter, type RouteRecordRaw, createWebHashHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';
import LoginView from '@/views/LoginView.vue';
import GuidelineView from '@/views/GuidelineView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/guideline',
    name: 'guideline',
    component: GuidelineView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
