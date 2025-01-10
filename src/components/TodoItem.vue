<template>
  <div :class="['todo-item', { done: todo.done }]">
    <label>
      <input type="checkbox" v-model="todo.done" />
      <span :class="`bubble ${todo.category}`"></span>
    </label>
    <div class="todo-content">
      <input type="text" v-model="todo.content" :disabled="todo.done" />
      <span class="todo-content__info">
          <router-link :to="{ name: 'TodoInfo', params: { id: todo.id } }">
            <img src="../assets/plus.svg" alt="">
          </router-link>
      </span>
    </div>
    
    <div class="actions">
      <button class="delete" @click="removeTodo">Удалить</button>
    </div>
  </div>
</template>

<script setup>
import { deleteTodo } from '../common/api';

const props = defineProps({
  todo: Object,
});

const emit = defineEmits(['remove']);

const removeTodo = async () => {
  if (props.todo && props.todo.id) {
    await deleteTodo(props.todo.id);
    emit('remove', props.todo);
  }
};
</script>