<template>
  <div class="detail">
    <div class="detail-info">
      <h4>Задача</h4>
      <label class="detail-info__label" for="title">Название:</label>
      <input
        id="title"
        class="detail-info__input"
        type="text"
        v-model="todo.title"
        placeholder="Введите название"
      />
      <div class="detail-info__date">
        <p>Дата создания: {{ new Date(todo.createdAt).toLocaleString() }}</p>
        <label for="dueDate">Дата окончания:</label>
        <input id="dueDate" type="date" v-model="todo.dueDateFormatted" />
      </div>
      <label class="detail-info__label" for="assignee">Исполнитель:</label>
      <input
        id="assignee"
        class="detail-info__input"
        type="text"
        v-model="todo.assignee"
        placeholder="Введите имя исполнителя"
      />
      <label class="detail-info__label" for="status">Статус:</label>
      <select class="detail-info__select" id="status" v-model="todo.status">
        <option value="новая">Новая</option>
        <option value="в работе">В работе</option>
        <option value="завершена">Завершена</option>
      </select>
      <div class="detail-info__save">
        <button class="detail-info__save-button" @click="saveChanges">
          Сохранить изменения
        </button>
        <router-link class="detail-info__save-link" to="/"
          >Вернуться к списку</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import { fetchTodoById, updateTodo } from "../common/api";

const props = defineProps({
  todoId: Number,
});

const emit = defineEmits(["close"]);

const todo = reactive({
  id: null,
  title: "",
  createdAt: new Date().toISOString(),
  dueDate: null,
  assignee: "",
  status: "",
});

Object.defineProperty(todo, "dueDateFormatted", {
  get() {
    return todo.dueDate
      ? new Date(todo.dueDate).toISOString().split("T")[0]
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
  }
};

const saveChanges = async () => {
  try {
    await updateTodo(todo.id, {
      title: todo.title,
      dueDate: todo.dueDate,
      assignee: todo.assignee,
      status: todo.status,
    });
    alert("Изменения успешно сохранены!");
  } catch (error) {
    console.error("Ошибка при сохранении изменений:", error.message);
    alert("Не удалось сохранить изменения.");
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

<style scoped></style>
