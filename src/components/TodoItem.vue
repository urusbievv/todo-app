<template>
    <div :class="['todo-item', { done: todo.done }]">
      <label>
        <input type="checkbox" v-model="todo.done"/>
        <span :class="`bubble ${todo.category}`"></span>
      </label>
  
      <div class="todo-content">
        <input type="text" v-model="todo.content" :disabled="todo.done" />
      </div>
      <div class="actions">
        <button class="delete" @click="removeTodo">Удалить</button>
      </div>
    </div>
  </template>
  
  <script setup>
    
    import axios from 'axios';
  
    const props = defineProps({
      todo: Object,
      apiUrl: String,
    });
  
    const emit = defineEmits(['remove']);

    const removeTodo = async () => {
      try {
        await axios.delete(`${props.apiUrl}/${props.todo.id}`);
        emit('remove', props.todo);  
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
</script>
  