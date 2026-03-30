<template>
  <div :class="dashboardBgClass" class="min-h-screen flex flex-col">
    <!-- Main Content -->
    <main class="ml-0 flex-grow">
      <div class="p-8">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 :class="headingClass">Dashboard</h1>
          <p :class="subheadingClass">Overview of your Learning Analytics</p>
        </div>

        <!-- Unverified Account Banner (with dark mode support) -->
        <div 
          v-if="!isVerified" 
          :class="bannerClass"
          class="mb-8 border-l-4 rounded-r-lg p-4 transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg :class="bannerIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-2V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2z"></path>
              </svg>
              <div>
                <h3 :class="bannerTitleClass" class="font-semibold">Unverified Account</h3>
                <p v-if="isDark" class="text-xs text-amber-300 mt-0.5">Some features are restricted</p>
              </div>
            </div>
            <button 
              @click="verifyAccount" 
              :class="verifyButtonClass"
              class="px-4 py-2 rounded-lg transition text-sm font-medium"
            >
              Verify Now
            </button>
          </div>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Courses Enrolled Card -->
          <div :class="cardClass" class="rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between">
              <div>
                <p :class="cardLabelClass">COURSES ENROLLED</p>
                <p :class="cardValueClass" class="text-2xl font-bold">{{ enrolledCount }}</p>
                <p :class="trendUpClass" class="text-xs mt-1">{{ activeCourses }} active courses</p>
              </div>
              <div :class="iconBgClass('emerald')" class="w-12 h-12 rounded-full flex items-center justify-center">
                <svg :class="iconColorClass('emerald')" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Completed Courses Card -->
          <div :class="cardClass" class="rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between">
              <div>
                <p :class="cardLabelClass">COMPLETED COURSES</p>
                <p :class="cardValueClass" class="text-2xl font-bold">{{ completedCount }}</p>
                <p :class="trendUpClass" class="text-xs mt-1">{{ completionRate }}% completion rate</p>
              </div>
              <div :class="iconBgClass('blue')" class="w-12 h-12 rounded-full flex items-center justify-center">
                <svg :class="iconColorClass('blue')" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Certificates Card -->
          <div :class="cardClass" class="rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between">
              <div>
                <p :class="cardLabelClass">CERTIFICATES</p>
                <p :class="cardValueClass" class="text-2xl font-bold">{{ certificatesCount }}</p>
                <p :class="cardLabelClass" class="text-xs mt-1">Earned credentials</p>
              </div>
              <div :class="iconBgClass('purple')" class="w-12 h-12 rounded-full flex items-center justify-center">
                <svg :class="iconColorClass('purple')" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  <path d="M12 8v4l3 3"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Average Grade Card -->
          <div :class="cardClass" class="rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between">
              <div>
                <p :class="cardLabelClass">AVERAGE GRADE</p>
                <p :class="cardValueClass" class="text-2xl font-bold">{{ averageGrade }}<span :class="cardLabelClass" class="text-lg">%</span></p>
                <p :class="gradeTrendClass" class="text-xs mt-1">{{ gradeTrend }} vs previous</p>
              </div>
              <div :class="iconBgClass('orange')" class="w-12 h-12 rounded-full flex items-center justify-center">
                <svg :class="iconColorClass('orange')" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Learning Progress Section with Chart -->
        <div :class="cardClass" class="rounded-xl p-6 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 :class="headingClass" class="text-lg font-semibold">Learning Progress</h2>
            <p :class="cardLabelClass" class="text-sm">Course completion over time</p>
          </div>
          
          <!-- Chart -->
          <div class="mb-6">
            <div class="flex items-end space-x-4 h-64">
              <div v-for="(item, index) in chartData" :key="index" class="flex-1 flex flex-col items-center">
                <div :class="chartBarBgClass" class="w-full rounded-t-lg relative" :style="{ height: item.height + 'px' }">
                  <div :class="chartFillClass" class="absolute bottom-0 w-full rounded-t-lg transition-all" :style="{ height: item.value + '%' }"></div>
                </div>
                <span :class="chartLabelClass" class="text-xs mt-2">{{ item.month }}</span>
              </div>
            </div>
          </div>
          
          <!-- Progress Summary -->
          <div :class="borderClass" class="flex justify-between items-center pt-4 border-t">
            <p :class="cardLabelClass" class="text-sm">Last 7 months progress</p>
            <div class="flex space-x-4">
              <span :class="valueClass" class="text-sm font-semibold">Overall: {{ overallProgress }}%</span>
            </div>
          </div>
        </div>

        <!-- Two Column Layout: Notifications and Recent Courses -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <!-- Notifications Section -->
          <div :class="cardClass" class="lg:col-span-1 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 :class="headingClass" class="text-lg font-semibold">Notifications</h2>
              <span :class="notificationBadgeClass" class="text-xs px-2 py-1 rounded-full">{{ notifications.length }} new</span>
            </div>
            <div class="space-y-4">
              <div v-for="notification in notifications" :key="notification.id" 
                   :class="['border-l-4 pl-3 py-2', getNotificationBorderClass(notification.color)]">
                <p :class="valueClass" class="text-sm font-medium">{{ notification.title }}</p>
                <p :class="cardLabelClass" class="text-xs mt-1">{{ notification.message }}</p>
                <span :class="cardLabelClass" class="text-xs mt-2 inline-block">{{ notification.time }}</span>
              </div>
            </div>
            <button :class="linkClass" class="mt-4 text-sm font-medium flex items-center">
              View all notifications
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Recent Courses -->
          <div :class="cardClass" class="lg:col-span-2 rounded-xl p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 :class="headingClass" class="text-lg font-semibold">My Courses</h2>
              <router-link to="/student/courses" :class="linkClass" class="text-sm font-medium">View All</router-link>
            </div>
            <div class="space-y-4">
              <div v-for="course in recentCourses" :key="course.id" 
                   :class="[borderClass, 'border rounded-lg p-4 hover:shadow-md transition cursor-pointer']">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 :class="valueClass" class="font-semibold">{{ course.title }}</h3>
                    <p :class="cardLabelClass" class="text-sm mt-1">{{ course.description }}</p>
                    <div class="flex items-center mt-2 space-x-4">
                      <span :class="cardLabelClass" class="text-xs flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {{ course.progress }}% complete
                      </span>
                      <span :class="cardLabelClass" class="text-xs" v-if="course.grade">Grade: {{ course.grade }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
                      <div :class="progressBarClass" class="h-1.5 rounded-full" :style="{ width: course.progress + '%' }"></div>
                    </div>
                  </div>
                  <div class="ml-4">
                    <span :class="getStatusClass(course.status)" class="text-xs px-2 py-1 rounded-full">
                      {{ course.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <StudentFooter />
  </div>
</template>

<script>
export default {
  name: 'StudentDashboard'
}
</script>

<script setup>
import { inject, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StudentFooter from '@/parent/studentfooter.vue'

const router = useRouter()

// Inject theme from parent (App.vue)
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Reactive dark mode check - updates automatically when theme changes
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// Student stats
const enrolledCount = ref(4)
const completedCount = ref(2)
const certificatesCount = ref(2)
const averageGrade = ref(87.5)
const gradeTrend = ref('+2.3%')
const overallProgress = ref(68)
const isVerified = ref(false)

// Computed properties with theme-aware classes
const gradeTrendClass = computed(() => {
  const isPositive = gradeTrend.value.includes('+')
  if (!isDark.value) {
    return isPositive ? 'text-green-500' : 'text-red-500'
  } else {
    return isPositive ? 'text-green-400' : 'text-red-400'
  }
})

const trendUpClass = computed(() => ({
  'text-green-500': !isDark.value,
  'text-green-400': isDark.value
}))

const completionRate = computed(() => {
  return enrolledCount.value ? Math.round((completedCount.value / enrolledCount.value) * 100) : 0
})

const activeCourses = computed(() => {
  return enrolledCount.value - completedCount.value
})

// Chart data for learning progress
const chartData = ref([
  { month: 'Jan', value: 35, height: 140 },
  { month: 'Feb', value: 42, height: 168 },
  { month: 'Mar', value: 58, height: 232 },
  { month: 'Apr', value: 66, height: 250 },
  { month: 'May', value: 72, height: 240 },
  { month: 'Jun', value: 88, height: 174 },
  { month: 'Jul', value: 90, height: 200 },
  { month: 'Aug', value: 99, height: 160 }
])

// Notifications data
const notifications = ref([
  {
    id: 1,
    title: 'Announcement',
    message: 'Get a notification when you have earned a certificate or badge. You can also earn a certificate for completing a course.',
    time: '2 hours ago',
    color: 'emerald'
  },
  {
    id: 2,
    title: 'Schedule Reminder',
    message: 'Set up a schedule to manage your courses and certificates. You can also earn a certificate for completing a course.',
    time: 'Yesterday',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Event',
    message: 'Set up an event to celebrate your achievements. You can also earn a certificate for completing a course.',
    time: '2 days ago',
    color: 'purple'
  }
])

// Get notification border color based on theme
const getNotificationBorderClass = (color) => {
  if (!isDark.value) {
    switch(color) {
      case 'emerald': return 'border-emerald-500'
      case 'blue': return 'border-blue-500'
      case 'purple': return 'border-purple-500'
      default: return 'border-gray-500'
    }
  } else {
    switch(color) {
      case 'emerald': return 'border-emerald-400'
      case 'blue': return 'border-blue-400'
      case 'purple': return 'border-purple-400'
      default: return 'border-gray-400'
    }
  }
}

// Recent courses data
const recentCourses = ref([
  {
    id: 1,
    title: 'Advanced Web Development',
    description: 'Master modern web technologies including Vue.js, React, and Node.js. Build full-stack applications.',
    progress: 100,
    status: 'Completed',
    grade: 92,
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, user research, prototyping, and create stunning interfaces.',
    progress: 100,
    status: 'Completed',
    grade: 88,
  },
  {
    id: 3,
    title: 'Data Science with Python',
    description: 'Explore data analysis, visualization, and machine learning concepts.',
    progress: 45,
    status: 'In Progress',
    grade: null,
  },
  {
    id: 4,
    title: 'Cloud Computing Basics',
    description: 'Introduction to AWS, Azure, and cloud architecture patterns.',
    progress: 20,
    status: 'Not Started',
    grade: null,
  }
])

// Helper function for status badge styling with dark mode
const getStatusClass = (status) => {
  switch(status) {
    case 'Completed':
      return isDark.value ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
    case 'In Progress':
      return isDark.value ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
    default:
      return isDark.value ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
  }
}

// Progress bar class
const progressBarClass = computed(() => ({
  'bg-emerald-500': !isDark.value,
  'bg-emerald-400': isDark.value
}))

// --- Theme-aware CSS Classes ---
const dashboardBgClass = computed(() => ({
  'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
  'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
}))

const cardClass = computed(() => ({
  'bg-white shadow-sm': !isDark.value,
  'bg-gray-800 shadow-lg': isDark.value
}))

const cardLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

const cardValueClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

const headingClass = computed(() => ({
  'text-3xl font-bold text-gray-800': !isDark.value,
  'text-3xl font-bold text-white': isDark.value
}))

const subheadingClass = computed(() => ({
  'text-gray-500 mt-1': !isDark.value,
  'text-gray-400 mt-1': isDark.value
}))

const valueClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-gray-200': isDark.value
}))

const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

const linkClass = computed(() => ({
  'text-gray-600 hover:text-emerald-600': !isDark.value,
  'text-gray-400 hover:text-emerald-400': isDark.value
}))

const notificationBadgeClass = computed(() => ({
  'bg-emerald-50 text-emerald-600': !isDark.value,
  'bg-emerald-900/50 text-emerald-400': isDark.value
}))

// Banner classes
const bannerClass = computed(() => ({
  'bg-amber-50 border-amber-500': !isDark.value,
  'bg-amber-900/30 border-amber-500': isDark.value
}))

const bannerIconClass = computed(() => ({
  'text-amber-500': !isDark.value,
  'text-amber-400': isDark.value
}))

const bannerTitleClass = computed(() => ({
  'text-amber-800': !isDark.value,
  'text-amber-300': isDark.value
}))

const verifyButtonClass = computed(() => ({
  'bg-amber-500 hover:bg-amber-600 text-white': !isDark.value,
  'bg-amber-600 hover:bg-amber-700 text-white': isDark.value
}))

const iconBgClass = (color) => {
  return computed(() => {
    if (!isDark.value) {
      switch(color) {
        case 'emerald': return 'bg-emerald-100'
        case 'blue': return 'bg-blue-100'
        case 'purple': return 'bg-purple-100'
        case 'orange': return 'bg-orange-100'
        default: return 'bg-gray-100'
      }
    } else {
      switch(color) {
        case 'emerald': return 'bg-emerald-900/50'
        case 'blue': return 'bg-blue-900/50'
        case 'purple': return 'bg-purple-900/50'
        case 'orange': return 'bg-orange-900/50'
        default: return 'bg-gray-700'
      }
    }
  })
}

const iconColorClass = (color) => {
  return computed(() => {
    if (!isDark.value) {
      switch(color) {
        case 'emerald': return 'text-emerald-600'
        case 'blue': return 'text-blue-600'
        case 'purple': return 'text-purple-600'
        case 'orange': return 'text-orange-600'
        default: return 'text-gray-600'
      }
    } else {
      switch(color) {
        case 'emerald': return 'text-emerald-400'
        case 'blue': return 'text-blue-400'
        case 'purple': return 'text-purple-400'
        case 'orange': return 'text-orange-400'
        default: return 'text-gray-400'
      }
    }
  })
}

// const socialIconClass = (platform) => {
//   return computed(() => {
//     if (!isDark.value) {
//       switch(platform) {
//         case 'facebook': return 'text-gray-500 hover:text-blue-600'
//         case 'linkedin': return 'text-gray-500 hover:text-blue-400'
//         case 'instagram': return 'text-gray-500 hover:text-pink-600'
//         default: return 'text-gray-500 hover:text-emerald-600'
//       }
//     } else {
//       switch(platform) {
//         case 'facebook': return 'text-gray-400 hover:text-blue-400'
//         case 'linkedin': return 'text-gray-400 hover:text-blue-300'
//         case 'instagram': return 'text-gray-400 hover:text-pink-400'
//         default: return 'text-gray-400 hover:text-emerald-400'
//       }
//     }
//   })
// }

const chartBarBgClass = computed(() => ({
  'bg-emerald-100': !isDark.value,
  'bg-emerald-900/30': isDark.value
}))

const chartFillClass = computed(() => ({
  'bg-emerald-500': !isDark.value,
  'bg-emerald-400': isDark.value
}))

const chartLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

const verifyAccount = () => {
  router.push('/verify-account')
}

// Check authentication on mount
onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  } else {
    const userData = JSON.parse(user)
    if (userData.isVerified !== undefined) {
      isVerified.value = userData.isVerified
    }
  }
})
</script>

<style scoped>
/* Custom scrollbar with theme support */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Light mode scrollbar */
:root:not(.dark) ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

:root:not(.dark) ::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

:root:not(.dark) ::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 10px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease, 
              box-shadow 0.3s ease;
}

/* Chart bar animations */
.bg-emerald-500, .bg-emerald-400 {
  transition: height 0.3s ease;
}

/* Card hover effects */
.hover\:shadow-lg:hover {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

/* Button active state */
button:active {
  transform: scale(0.98);
}

.ml-64 {
  margin-left: 16rem;
}
</style>