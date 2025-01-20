import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TodoList from './components/TodoList.vue';
import TodoInfo from './components/TodoInfo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: TodoList,
    name: 'TodoList',
    props: (route) => ({ todos: route.params.todos }),
  },
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