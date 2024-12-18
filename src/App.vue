<template>
  <main class="app">
    <Greeting />
    <CreateTodo @addTodo="addTodo" />
    <TodoList :todos="todos" :apiUrl="apiUrl" @remove="removeTodo" />
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchTodos, createTodo, deleteTodo } from './common/api';
  import Greeting from './components/Greeting.vue';
  import CreateTodo from './components/CreateTodo.vue';
  import TodoList from './components/TodoList.vue';

  const todos = ref([]);

  const loadTodos = async () => {
    todos.value = await fetchTodos();
  };

  const addTodo = async (newTodo) => {
  const addedTodo = await createTodo(newTodo);
  todos.value.push(addedTodo);
  };

  const removeTodo = async (todoToRemove) => {
  await deleteTodo(todoToRemove.id);
  todos.value = todos.value.filter((todo) => todo.id !== todoToRemove.id);
  };

  onMounted(() => {
    loadTodos();
  });
</script>

