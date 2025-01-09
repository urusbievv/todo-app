<template>
  <div class="todo-info">
    <h1>Информация о задаче</h1>
    <p><strong>Название:</strong> {{ todo.title }}</p>
    <p><strong>Дата создания:</strong> {{ new Date(todo.createdAt).toLocaleString() }}</p>
    <p><strong>Дата окончания:</strong> {{ new Date(todo.dueDate).toLocaleString() }}</p>
    <p><strong>Исполнитель:</strong> {{ todo.assignee }}</p>
    <p><strong>Статус:</strong> {{ todo.status }}</p>
    <router-link to="/">Вернуться к списку</router-link>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import { fetchTodoById } from '../common/api';

const props = defineProps({
  todoId: Number,
});

const emit = defineEmits(['close']);

const todo = reactive({
  id: null,
  title: '',
  createdAt: null,
  dueDate: null,
  assignee: '',
  status: '',
});

const loadTodo = async () => {
  if (props.todoId) {
    const fetchedTodo = await fetchTodoById(props.todoId);
    Object.assign(todo, fetchedTodo);
  }
};

watch(
  () => props.todoId,
  () => loadTodo()
);

onMounted(() => {
  if (props.todoId) {
    loadTodo();
  }
});
</script>

<style scoped>
.todo-info {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>