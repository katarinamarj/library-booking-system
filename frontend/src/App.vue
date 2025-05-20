<script setup lang="ts">
import { RouterView } from 'vue-router'

const year = new Date().getFullYear()

</script>

<template>
  <div class="container">
    <RouterView />          
    <footer class="text-center mt-3">
      &copy; {{ new Date().getFullYear() }} Library system
    </footer>
    
  </div>
</template>
