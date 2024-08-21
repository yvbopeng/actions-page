<script setup lang="ts">

</script>

<template>
  <div class="home">
    <RouterLink :to="{name: 'DrawCanvas'}">签名上图</RouterLink>
    <RouterLink :to="{name: 'BaseToImage'}">base64转图片</RouterLink>
  </div>
</template>


<style scoped>
a {
  margin-left: 20px;
}
</style>