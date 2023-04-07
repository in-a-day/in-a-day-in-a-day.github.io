<template>
  <div class="content" v-if="theme.author.avatar">
    <img :src="theme.author.avatar" width="135" height="135" class="avator"/>
  </div>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
const { theme } = useData();
</script>
<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.avator {
  border-radius: 10%;
  border: 0px solid var(--vp-avator-border);
}

@keyframes avator-transform {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.avator:hover {
  animation: 5s linear 0s infinite avator-transform;
}
</style>
