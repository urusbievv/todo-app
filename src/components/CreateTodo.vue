<template>
  <section class="create-todo">
    <form @submit.prevent="addTodo">
      <h4>Создать задачу</h4>
      <input type="text" placeholder="Запишите задачу" v-model="newTodo.content" />
      <h4>Выбрать категорию</h4>
      <div class="create-todo__options">
        <label>
          <input type="radio" name="category" value="work" v-model="newTodo.category" />
          <span class="bubble work"></span>
          <div>Работа</div>
        </label>
        <label>
          <input type="radio" name="category" value="personal" v-model="newTodo.category" />
          <span class="bubble personal"></span>
          <div>Личное</div>
        </label>
      </div>
      <input type="submit" value="Добавить" />
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['addTodo']);

const newTodo = reactive({
  content: '',
  category: null,
  done: false,
  createdAt: new Date().getTime(),
});

const addTodo = () => {
  if (!newTodo.content.trim() || !newTodo.category) return;
  emit('addTodo', { ...newTodo });
  newTodo.content = '';
  newTodo.category = null;
};
</script>
