<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

function increase() {
  count.value++;
}
</script>

<template>
  <div @click="increase" class="count">
   {{  count }}
  </div>
</template>

<style scoped>
.count {
  color: red;
  font-size: 50px;
  cursor: pointer;
  user-select: none;
  
}
</style>
