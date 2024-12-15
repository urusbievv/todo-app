<script setup>
 import { ref, onMounted, computed, watch } from 'vue';
 import axios from 'axios';

 const todos = ref([]);
 const name = ref('');

 const inputContent = ref('');
 const inputCategory = ref(null);
 const apiUrl = "http://localhost:5000/todos"; 

 const todosASC = computed(() => todos.value.sort((a, b) => b.createdAt - a.createdAt));

 const fetchTodos = async () => {
   try {
     const response = await axios.get(apiUrl);
     todos.value = response.data;
   } catch (error) {
     console.error('Error fetching todos:', error);
   }
 };

 const addTodo = async () => {
   if (inputContent.value.trim() === '' || inputCategory.value === null) return;

   const newTodo = {
     content: inputContent.value,
     category: inputCategory.value,
     done: false,
     createdAt: new Date().getTime(),
   };

   try {
     const response = await axios.post(apiUrl, newTodo);
     todos.value.push(response.data);
   } catch (error) {
     console.error('Error adding todo:', error);
   }

   inputContent.value = '';
   inputCategory.value = null;
 };

 const removeTodo = async (todo) => {
   try {
     await axios.delete(`${apiUrl}/${todo.id}`);
     todos.value = todos.value.filter(t => t !== todo);
   } catch (error) {
     console.error('Error deleting todo:', error);
   }
 };

 watch(todos, newValue => {
   localStorage.setItem('todos', JSON.stringify(newValue));
 }, { deep: true });

 watch(name, (newValue) => {
   localStorage.setItem('name', newValue);
 });

 onMounted(() => {
   name.value = localStorage.getItem('name') || '';
   fetchTodos();
 });
</script>



<template>
  <main class="app">
    <section class="gretting">
      <h2 class="title">
        Привет <input type="text" placeholder="Введите имя" v-model="name">
      </h2> 
    </section>
    <section class="create-todo">
      <form @submit.prevent="addTodo">
        <h4>Создать задачу</h4>
        <input
              type="text" 
              placeholder="Запишите задачу" 
              v-model="inputContent">
        <h4>Выбрать категорию</h4>
        <div class="options">
          <label>
            <input 
            type="radio"
            name="category"
            value="work"
            v-model="inputCategory">
            <span class="bubble work"></span>
            <div>Работа</div>
          </label>
          <label>
            <input 
            type="radio"
            name="category"
            value="personal"
            v-model="inputCategory">
            <span class="bubble personal"></span>
            <div>Личное</div>
          </label>
        </div>
        <input type="submit" value="Добавить">
      </form>
    </section>

    <section class="todo-list">
      <h4>Список дел</h4>
      <div class="list">

        <div v-for="todo in todosASC" :class="`todo-item ${todo.done && 
        'done'}`">

          <label>
            <input type="checkbox" v-model="todo.done">
            <span :class="`bubble ${ todo.category }`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content">
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Удалить</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

