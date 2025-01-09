import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TodoInfo from './components/TodoInfo.vue';

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        name: 'TodoList',
        component: TodoList,
      },
      {
        path: 'todo/:id',
        name: 'TodoInfo',
        component: TodoInfo,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;