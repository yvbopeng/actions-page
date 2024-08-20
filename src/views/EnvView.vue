<template>
    <div>
        <HelloWorld  msg="hello" />
        {{ userAgent }}
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const userAgent = ref(navigator.userAgent)
</script>