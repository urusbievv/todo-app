<template>
    <section class="todo-list">
      <h4>Список дел</h4>
      <div class="list">
        <TodoItem
          v-for="todo in todosASC"
          :key="todo.id"
          :todo="todo"
          :apiUrl="apiUrl"
          @remove="removeTodo"
        />
      </div>
    </section>
</template>
  
<script setup>
  import { computed } from 'vue';
  import TodoItem from './TodoItem.vue';
  
  const props = defineProps({
    todos: Array,
  });
  
  const todosASC = computed(() => props.todos.sort((a, b) => b.createdAt - a.createdAt));
  
  const removeTodo = (todo) => {
    emit('updateTodos', props.todos.filter(t => t.id !== todo.id));
  };
</script>
  