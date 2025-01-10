import { createRouter, createWebHistory } from 'vue-router';
import Greeting from './components/Greeting.vue';
import TodoList from './components/TodoList.vue';
import TodoInfo from './components/TodoInfo.vue';

const routes = [
  {
    path: '/',
    components: {
      default: TodoList,
      greeting: Greeting,
    },
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
