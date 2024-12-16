<template>
    <section class="greeting">
      <h2 class="greeting__title">
        Привет <input type="text" placeholder="Введите имя" v-model="name">
      </h2>
    </section>
</template>
  
<script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const name = ref('');
  
  watch(name, (newValue) => {
    localStorage.setItem('name', newValue);
  });
  
  onMounted(() => {
    const storedName = localStorage.getItem('name');
    name.value = storedName || '';
  });
</script>
  