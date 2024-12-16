<template>
  <main class="app">
    <Greeting />
    <CreateTodo @addTodo="addTodo" />
    <TodoList :todos="todos" :apiUrl="apiUrl" @remove="removeTodo" />
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Greeting from './components/Greeting.vue';
  import CreateTodo from './components/CreateTodo.vue';
  import TodoList from './components/TodoList.vue';

  const todos = ref([]);
  const apiUrl = "http://localhost:5000/todos";

  const fetchTodos = async () => {
      try {
        const response = await axios.get(apiUrl);
        todos.value = response.data;
      }   catch (error) {
        console.error('Error fetching todos:', error);
      }
  };


  const addTodo = (newTodo) => {
    todos.value.push(newTodo);  
  };

  const removeTodo = (todoToRemove) => {
    todos.value = todos.value.filter(todo => todo.id !== todoToRemove.id);
  };

  onMounted(() => {
    fetchTodos();
  });
</script>
