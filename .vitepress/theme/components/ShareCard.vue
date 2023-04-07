<template>
  <div class="shareCard">
    <h1 class="title" v-if="theme.author.name">
      <span>Hi, I'm {{theme.author.name}} 💭</span>
    </h1>
    <p class="description" v-if="theme.author.description">
      {{theme.author.description}}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useData } from "vitepress";
const { theme } = useData()
</script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  text-align: center;
}
.title {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-weight: bold;
}
.description {
  margin: 1em 0;
}
</style>
