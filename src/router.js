import { createRouter, createWebHistory } from 'vue-router';
import TodoInfo from './components/TodoInfo.vue';

const routes = [
  {
    path: '/todo/:id',
    component: TodoInfo,
    name: 'TodoInfo',
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
