<template>
    <div>
        <input type="text" v-model="base64" placeholder="请输入base64图片地址"/>
        <img :src="base64" v-if="base64"/>
    </div>
</template>


<script setup>
import { ref } from 'vue'
const base64 = ref('')
</script>