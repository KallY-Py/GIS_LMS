<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Student Navigation Bar (Fixed Sidebar) -->
    <StudentNav />
    
    <!-- Main Content Area - Push content to the right -->
    <main class="ml-64 min-h-screen">
      <!-- Router View will render student pages -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import StudentNav from './student_main_nav.vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/')
  } else {
    const userData = JSON.parse(user)
    if (userData.role !== 'student') {
      router.push('/admin/dashboard')
    }
  }
})
</script>

<style scoped>
/* Ensure main content has proper spacing */
main {
  transition: margin-left 0.3s ease;
}
</style>