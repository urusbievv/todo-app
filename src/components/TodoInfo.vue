<template>
  <div class="detail">
    <div class="detail-info">
      <h4>Задача</h4>
      <label class="detail-info__label" for="description">Комментарии:</label>
      <input
        id="description"
        class="detail-info__input"
        type="text"
        v-model="todo.description"
      />
      <div class="detail-info__date">
        <p>Дата создания: {{ formatDate(todo.createdAt) }}</p>
        <label for="dueDate">Дата окончания:</label>
        <input id="dueDate" type="date" v-model="todo.dueDateFormatted" class="detail-info__date-due"/>
      </div>
      <label class="detail-info__label" for="assignee">Исполнитель:</label>
      <input
        id="assignee"
        class="detail-info__input"
        type="text"
        v-model="todo.assignee"
      />
      <label class="detail-info__label" for="status">Статус:</label>
      <div class="detail-info__save">
      <select class="detail-info__save-select" id="status" v-model="todo.status">
        <option value="новая">Новая</option>
        <option value="в работе">В работе</option>
        <option value="завершена">Завершена</option>
      </select>
      <router-link class="detail-info__save-link" to="/">Вернуться к списку</router-link>
        <button class="detail-info__save-button" @click="saveChanges">
          Сохранить изменения
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { fetchTodoById, updateTodo } from "../common/api";

const props = defineProps({
  todoId: String,
});

const emit = defineEmits(["close"]);

const todo = reactive({
  id: '', 
  description: "",
  createdAt: new Date().toISOString(),
  dueDate: null,
  assignee: "",
  status: "новая",
})

const formatDate = (date) => {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
}

Object.defineProperty(todo, "dueDateFormatted", {
  get() {
    return todo.dueDate
      ? new Date(todo.dueDate).toISOString()
      : "";
  },
  set(value) {
    todo.dueDate = new Date(value).toISOString();
  },
});

const loadTodo = async () => {
  if (props.todoId) {
    const fetchedTodo = await fetchTodoById(props.todoId);
    Object.assign(todo, fetchedTodo);

    if (!todo.createdAt) {
      todo.createdAt = new Date().toISOString();
    } 
  }  else {
    todo.createdAt = new Date().toISOString();
  }
};

const saveChanges = async () => {
  try {
    if (!todo.id) {
      throw new Error("ID задачи не задан.");
    }
    
    await updateTodo(todo.id, {
      description: todo.description,
      dueDate: todo.dueDate,
      assignee: todo.assignee,
      status: todo.status,
    });
    alert("Изменения успешно сохранены!");
  } catch (error) {
    console.error("Ошибка при сохранении изменений:", error.message);
    alert("Не удалось сохранить изменения: " + error.message);
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

</style>
