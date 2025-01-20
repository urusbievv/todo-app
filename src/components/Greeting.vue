<template>
    <section class="greeting">
      <h2 class="greeting__title">
        <input type="text" placeholder="Введите имя" v-model="name">
      </h2>
    </section>
</template>
  
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  
  const name = ref<string>('');
  
  watch(name, (newValue: string) => {
    localStorage.setItem('name', newValue);
  });
  
  onMounted(() => {
    const storedName = localStorage.getItem('name');
    name.value = storedName || '';
  });
</script>
  