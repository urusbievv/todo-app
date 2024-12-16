<template>
    <section class="create-todo">
      <form @submit.prevent="addTodo">
        <h4>Создать задачу</h4>
        <input type="text" placeholder="Запишите задачу" v-model="todo.content" />
        <h4>Выбрать категорию</h4>
        <div class="options">
          <label>
            <input type="radio" name="category" value="work" v-model="todo.category" />
            <span class="bubble work"></span>
            <div>Работа</div>
          </label>
          <label>
            <input type="radio" name="category" value="personal" v-model="todo.category" />
            <span class="bubble personal"></span>
            <div>Личное</div>
          </label>
        </div>
        <input type="submit" value="Добавить" />
      </form>
    </section>
  </template>
  
  
<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const todo = ref({
    content: '',
    category: null,
  });
  
  const apiUrl = "http://localhost:5000/todos";
  
  const emit = defineEmits(['addTodo']);
  
  const addTodo = async () => {
    if (todo.value.content.trim() === '' || todo.value.category === null) {
      console.error("Error: Not data");
      return;
    }
  
    const newTodo = {
      content: todo.value.content,
      category: todo.value.category,
      done: false,
      createdAt: new Date().getTime(),
    };
  
    try {
      const response = await axios.post(apiUrl, newTodo);
      emit('addTodo', response.data);
    } catch (error) {
      console.error('Error addTodo', error);
    }
    todo.value.content = '';
    todo.value.category = null;
  };
</script>
  