<template>
  <footer>
    Powerd by 
    <a :href="theme.author.git" target="_blank" title="作者"
      >zabbits</a
    >
    |
    Theme by
    <a href="https://github.com/clark-cui/" target="_blank" title="作者"
      >clark-cui</a
    >
    | Copyright © 2023-{{ date }} | MIT License
  </footer>
</template>
<script lang="ts" setup>
import { useData } from 'vitepress';
const date = new Date().getFullYear();
const { theme } = useData()
</script>
<style scoped>
footer {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}
a {
  color: var(--vp-c-brand);
  font-weight: bold;
}
a:hover {
  text-decoration: none;
  color: var(--vp-c-hover);
}
</style>
