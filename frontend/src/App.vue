<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const year = new Date().getFullYear()
</script>

<template>
  <RouterLink to="/">Home</RouterLink> | 
  <RouterLink to="/about"> About</RouterLink> | 
  <RouterLink to="/list"> Books</RouterLink> 
  <RouterView />
  <p>&copy {{ year }} Library</p>
</template>