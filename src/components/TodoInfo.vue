<template>
  <div class="todo-info">
    <h2>Информация о задаче</h2>
    <label for="title">Название:</label>
    <input
      id="title"
      type="text"
      v-model="todo.title"
      placeholder="Введите название"
    />
    <p>Дата создания: {{ new Date(todo.createdAt).toLocaleString() }}</p>
    <label for="dueDate">Дата окончания:</label>
    <input
      id="dueDate"
      type="date"
      v-model="todo.dueDateFormatted"
    />
    <label for="assignee">Исполнитель:</label>
    <input
      id="assignee"
      type="text"
      v-model="todo.assignee"
      placeholder="Введите имя исполнителя"
    />
    <label for="status">Статус:</label>
    <select id="status" v-model="todo.status">
      <option value="новая">Новая</option>
      <option value="в работе">В работе</option>
      <option value="завершена">Завершена</option>
    </select>
    <button @click="saveChanges">Сохранить изменения</button>
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
  createdAt: new Date().toISOString(),
  dueDate: null,
  assignee: '',
  status: '',
});


Object.defineProperty(todo, 'dueDateFormatted', {
  get() {
    return todo.dueDate
      ? new Date(todo.dueDate).toISOString().split('T')[0]
      : '';
  },
  set(value) {
    todo.dueDate = new Date(value).toISOString();
  },
});

const loadTodo = async () => {
  if (props.todoId) {
    const fetchedTodo = await fetchTodoById(props.todoId);
    Object.assign(todo, fetchedTodo);
  }
};

const saveChanges = async () => {
  try {
    const url = `${import.meta.env.VITE_SERVER_URL}/${editableTodo.id}`;
    await apiRequest('put', url, {
      title: todo.title,
      dueDate: todo.dueDate,
      assignee: todo.assignee,
      status: todo.status,
    });
    alert('Изменения успешно сохранены!');
  } catch (error) {
    console.error('Ошибка при сохранении изменений:', error.message);
    alert('Не удалось сохранить изменения.');
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
.todo-info label {
  display: block;
  margin: 10px 0 5px;
}
.todo-info input,
.todo-info select {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.todo-info button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-info button:hover {
  background-color: #0056b3;
}
</style>