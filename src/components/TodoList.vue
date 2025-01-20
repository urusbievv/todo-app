<template>
  <section class="todo-list">
    <h4>Список дел</h4>
    <div class="list">
      <TodoItem
        v-for="todo in todosASC"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TodoItem from './TodoItem.vue';



interface Todo {
  id: number; 
  content: string; 
  category: string; 
  done: boolean; 
  createdAt: number; 
}

// Определяем свойства компонента
const props = defineProps<{
  todos: Todo[] 
}>();

const emit = defineEmits<{
  (e: 'remove', todo: Todo): void; 
}>();

const todosASC = computed(() => 
  [...props.todos].sort((a, b) => b.createdAt - a.createdAt)
);

const removeTodo = (todo: Todo) => {
  emit('remove', todo); // Эмитируем событие удаления с задачей
};
</script>

<style scoped>
.todo-list {
  padding: 20px;
}
</style>
