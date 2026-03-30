<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <MainNav />
    <router-view />
  </div>
</template>

<script setup>
import MainNav from './mainnav.vue'
</script>