<template>
    <div class="base-page">
        <!-- <input type="text" v-model="base64" placeholder="请输入base64图片地址"/> -->
        <textarea v-model="base64" placeholder="请输入base64图片地址" />
        <img :src="base64" v-if="base64" class="image"/>
    </div>
</template>


<script setup>
import { ref } from 'vue'
const base64 = ref('')
</script>

<style scoped>
.base-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.image {
    max-width: 100%;
}
</style>