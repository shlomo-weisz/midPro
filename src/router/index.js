import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import YouTubePage from '../pages/YouTubePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: YouTubePage,
  },
  {
    path: '/youtube',
    name: 'YouTube',
    component: YouTubePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;