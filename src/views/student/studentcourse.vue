<template>
  <div :class="dashboardBgClass" class="min-h-screen">
    <!-- Main Content with sidebar margin -->
    <main class="ml-0">
      <div class="p-8">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 :class="headingClass">My Courses</h1>
          <p :class="subheadingClass">Track your learning progress and manage your courses</p>
        </div>

        <!-- Preview Mode Notice (with dark mode support) -->
        <div 
          v-if="isPreviewMode" 
          :class="previewBannerClass"
          class="mb-8 border-l-4 rounded-r-lg p-4 transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg :class="previewIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <div>
                <h3 :class="previewTitleClass" class="font-semibold">Preview Mode</h3>
                <p :class="previewTextClass" class="text-sm">Verify your account to unlock full course access and track your progress.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content: Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Course List -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Course Categories Tabs -->
            <div :class="cardClass" class="rounded-xl shadow-sm">
              <div :class="borderClass" class="border-b">
                <nav class="flex space-x-8 px-6" aria-label="Tabs">
                  <button 
                    @click="activeTab = 'lessons'"
                    :class="[
                      'py-4 px-1 text-sm font-medium border-b-2 transition',
                      activeTab === 'lessons' 
                        ? getTabActiveClass('lessons')
                        : getTabInactiveClass()
                    ]"
                  >
                    Lessons
                  </button>
                  <button 
                    @click="activeTab = 'materials'"
                    :class="[
                      'py-4 px-1 text-sm font-medium border-b-2 transition',
                      activeTab === 'materials' 
                        ? getTabActiveClass('materials')
                        : getTabInactiveClass()
                    ]"
                  >
                    Materials
                  </button>
                  <button 
                    @click="activeTab = 'exams'"
                    :class="[
                      'py-4 px-1 text-sm font-medium border-b-2 transition',
                      activeTab === 'exams' 
                        ? getTabActiveClass('exams')
                        : getTabInactiveClass()
                    ]"
                  >
                    Exams
                  </button>
                </nav>
              </div>

              <!-- Lessons Tab Content -->
              <div v-if="activeTab === 'lessons'" class="p-6">
                <div class="space-y-4">
                  <div 
                    v-for="lesson in filteredLessons" 
                    :key="lesson.id"
                    :class="[borderClass, lesson.locked && !isVerified ? 'opacity-75' : '', 'border rounded-lg p-4 hover:shadow-md transition cursor-pointer']"
                    @click="selectLesson(lesson)"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-3">
                          <h3 :class="valueClass" class="font-semibold">{{ lesson.title }}</h3>
                          <span v-if="lesson.locked" :class="lockedBadgeClass" class="text-xs px-2 py-1 rounded-full">
                            <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-2V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2z"></path>
                            </svg>
                            Locked
                          </span>
                        </div>
                        <p :class="cardLabelClass" class="text-sm mt-1">{{ lesson.description }}</p>
                        <div class="flex items-center mt-3 space-x-4">
                          <span :class="cardLabelClass" class="text-xs flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {{ lesson.duration }}
                          </span>
                          <span v-if="lesson.progress" class="text-xs text-emerald-600 dark:text-emerald-400">
                            {{ lesson.progress }}% complete
                          </span>
                        </div>
                        <div v-if="lesson.progress" class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                          <div :class="progressBarClass" class="h-1.5 rounded-full" :style="{ width: lesson.progress + '%' }"></div>
                        </div>
                      </div>
                      <div class="ml-4">
                        <button 
                          v-if="!lesson.locked || isVerified"
                          @click.stop="startLesson(lesson)"
                          :class="primaryButtonClass"
                          class="px-3 py-1.5 text-sm rounded-lg transition"
                        >
                          {{ lesson.progress ? 'Continue' : 'Start' }}
                        </button>
                        <button v-else disabled class="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 text-sm rounded-lg cursor-not-allowed">
                          Unlock
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Materials Tab Content -->
              <div v-if="activeTab === 'materials'" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="material in filteredMaterials" 
                    :key="material.id"
                    :class="[borderClass, 'border rounded-lg p-4 hover:shadow-md transition cursor-pointer']"
                    @click="downloadMaterial(material)"
                  >
                    <div class="flex items-start space-x-3">
                      <div :class="iconBgClass('emerald')" class="w-10 h-10 rounded-lg flex items-center justify-center">
                        <svg :class="iconColorClass('emerald')" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div class="flex-1">
                        <h3 :class="valueClass" class="font-semibold">{{ material.title }}</h3>
                        <p :class="cardLabelClass" class="text-xs mt-1">{{ material.type }} • {{ material.size }}</p>
                        <p :class="cardLabelClass" class="text-xs mt-2">{{ material.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Exams Tab Content -->
              <div v-if="activeTab === 'exams'" class="p-6">
                <div class="space-y-4">
                  <div 
                    v-for="exam in filteredExams" 
                    :key="exam.id"
                    :class="[borderClass, 'border rounded-lg p-4 hover:shadow-md transition']"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 :class="valueClass" class="font-semibold">{{ exam.title }}</h3>
                        <p :class="cardLabelClass" class="text-sm mt-1">{{ exam.description }}</p>
                        <div class="flex items-center mt-2 space-x-4">
                          <span :class="cardLabelClass" class="text-xs">Duration: {{ exam.duration }}</span>
                          <span :class="cardLabelClass" class="text-xs">Questions: {{ exam.questions }}</span>
                          <span :class="cardLabelClass" class="text-xs">Passing Score: {{ exam.passingScore }}%</span>
                        </div>
                        <div v-if="exam.score" class="mt-2">
                          <span class="text-sm font-medium" :class="exam.score >= exam.passingScore ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                            Score: {{ exam.score }}%
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <button 
                          @click="takeExam(exam)"
                          :disabled="exam.completed && !exam.retakeAllowed"
                          :class="primaryButtonClass"
                          class="px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {{ exam.completed ? (exam.retakeAllowed ? 'Retake' : 'Completed') : 'Take Exam' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Controls -->
            <div :class="cardClass" class="rounded-xl p-4 flex justify-between items-center">
              <button 
                @click="previousLesson"
                :disabled="!canGoPrevious"
                :class="secondaryButtonClass"
                class="px-4 py-2 border rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Previous</span>
              </button>
              
              <div class="flex items-center space-x-2">
                <span :class="cardLabelClass" class="text-sm">Lesson {{ currentLessonIndex + 1 }} of {{ filteredLessons.length }}</span>
              </div>
              
              <button 
                @click="nextLesson"
                :disabled="!canGoNext"
                :class="primaryButtonClass"
                class="px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Next</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Right Column: Search and Quick Actions -->
          <div class="space-y-6">
            <!-- Search Bar -->
            <div :class="cardClass" class="rounded-xl p-6">
              <div class="relative">
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Search courses, lessons, or materials..." 
                  :class="searchInputClass"
                  class="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 transition-all outline-none"
                />
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <!-- Quick Stats -->
            <div :class="cardClass" class="rounded-xl p-6">
              <h3 :class="valueClass" class="font-semibold mb-4">Your Progress</h3>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span :class="cardLabelClass">Overall Completion</span>
                    <span :class="valueClass">{{ overallProgress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div :class="progressBarClass" class="h-2 rounded-full" :style="{ width: overallProgress + '%' }"></div>
                  </div>
                </div>
                <div class="flex justify-between text-sm">
                  <span :class="cardLabelClass">Lessons Completed</span>
                  <span :class="valueClass">{{ completedLessons }}/{{ lessons.length }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span :class="cardLabelClass">Materials Downloaded</span>
                  <span :class="valueClass">{{ downloadedMaterials }}/{{ materials.length }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span :class="cardLabelClass">Exams Passed</span>
                  <span :class="valueClass">{{ passedExams }}/{{ exams.length }}</span>
                </div>
              </div>
            </div>

            <!-- Upcoming Deadlines -->
            <div :class="cardClass" class="rounded-xl p-6">
              <h3 :class="valueClass" class="font-semibold mb-4">Upcoming Deadlines</h3>
              <div class="space-y-3">
                <div v-for="deadline in deadlines" :key="deadline.id" class="flex items-start space-x-3">
                  <div class="w-2 h-2 mt-2 rounded-full" :class="getDeadlineColor(deadline.color)"></div>
                  <div class="flex-1">
                    <p :class="valueClass" class="text-sm font-medium">{{ deadline.title }}</p>
                    <p :class="cardLabelClass" class="text-xs">{{ deadline.date }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Review Section -->
            <div :class="reviewCardClass" class="rounded-xl p-6 text-white">
              <h3 class="font-semibold mb-2">Need Help?</h3>
              <p :class="reviewTextClass" class="text-sm mb-4">Review your lessons or contact instructor for assistance</p>
              <button :class="reviewButtonClass" class="w-full py-2 rounded-lg font-medium transition">
                Request Review
              </button>
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
  name: 'StudentCourses'
}
</script>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

import StudentFooter from '@/parent/studentfooter.vue'

const router = useRouter()

// Inject theme from parent
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Reactive dark mode check
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// User status
const isVerified = ref(false)
const isPreviewMode = computed(() => !isVerified.value)

// Active tab
const activeTab = ref('lessons')

// Search query
const searchQuery = ref('')

// Current lesson index for navigation
const currentLessonIndex = ref(0)

// Theme-aware CSS Classes
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

const valueClass = computed(() => ({
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

const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

// Preview banner classes
const previewBannerClass = computed(() => ({
  'bg-blue-50 border-blue-500': !isDark.value,
  'bg-blue-900/30 border-blue-500': isDark.value
}))

const previewIconClass = computed(() => ({
  'text-blue-500': !isDark.value,
  'text-blue-400': isDark.value
}))

const previewTitleClass = computed(() => ({
  'text-blue-800': !isDark.value,
  'text-blue-300': isDark.value
}))

const previewTextClass = computed(() => ({
  'text-blue-700': !isDark.value,
  'text-blue-300': isDark.value
}))

// Tab classes
const getTabActiveClass = (tab) => {
  return computed(() => ({
    'border-emerald-500 text-emerald-600': !isDark.value,
    'border-emerald-400 text-emerald-400': isDark.value
  })).value
}

const getTabInactiveClass = () => {
  return computed(() => ({
    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !isDark.value,
    'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600': isDark.value
  })).value
}

// Button classes
const primaryButtonClass = computed(() => ({
  'bg-emerald-500 hover:bg-emerald-600 text-white': !isDark.value,
  'bg-emerald-600 hover:bg-emerald-700 text-white': isDark.value
}))

const secondaryButtonClass = computed(() => ({
  'border-gray-300 text-gray-700 hover:bg-gray-50': !isDark.value,
  'border-gray-600 text-gray-300 hover:bg-gray-700': isDark.value
}))

const progressBarClass = computed(() => ({
  'bg-emerald-500': !isDark.value,
  'bg-emerald-400': isDark.value
}))

const lockedBadgeClass = computed(() => ({
  'bg-gray-100 text-gray-600': !isDark.value,
  'bg-gray-700 text-gray-400': isDark.value
}))

const searchInputClass = computed(() => ({
  'border-gray-200 focus:border-emerald-500 focus:ring-emerald-200': !isDark.value,
  'border-gray-600 bg-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-900/50': isDark.value
}))

// Review card classes
const reviewCardClass = computed(() => ({
  'bg-gradient-to-r from-emerald-500 to-teal-600': !isDark.value,
  'bg-gradient-to-r from-emerald-700 to-teal-800': isDark.value
}))

const reviewTextClass = computed(() => ({
  'text-emerald-100': !isDark.value,
  'text-emerald-200': isDark.value
}))

const reviewButtonClass = computed(() => ({
  'bg-white text-emerald-600 hover:bg-gray-100': !isDark.value,
  'bg-gray-800 text-emerald-400 hover:bg-gray-700': isDark.value
}))

// Icon classes
const iconBgClass = (color) => {
  return computed(() => {
    if (!isDark.value) {
      switch(color) {
        case 'emerald': return 'bg-emerald-100'
        default: return 'bg-gray-100'
      }
    } else {
      switch(color) {
        case 'emerald': return 'bg-emerald-900/50'
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
        default: return 'text-gray-600'
      }
    } else {
      switch(color) {
        case 'emerald': return 'text-emerald-400'
        default: return 'text-gray-400'
      }
    }
  })
}

// Deadline colors with dark mode support
const getDeadlineColor = (color) => {
  if (!isDark.value) {
    return color // yellow-500, red-500, blue-500
  } else {
    switch(color) {
      case 'bg-yellow-500': return 'bg-yellow-400'
      case 'bg-red-500': return 'bg-red-400'
      case 'bg-blue-500': return 'bg-blue-400'
      default: return color
    }
  }
}

// Lessons data
const lessons = ref([
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of web development, including how websites work, client-server architecture, and modern web technologies.',
    duration: '4.5 min',
    progress: 100,
    locked: false,
    completed: true
  },
  {
    id: 2,
    title: 'HTML & CSS Fundamentals',
    description: 'Master the building blocks of the web. Learn semantic HTML and modern CSS styling techniques.',
    duration: '1h 20min',
    progress: 65,
    locked: false,
    completed: false
  },
  {
    id: 3,
    title: 'JavaScript Basics',
    description: 'Understand JavaScript fundamentals including variables, functions, loops, and DOM manipulation.',
    duration: '2h 10min',
    progress: 0,
    locked: false,
    completed: false
  },
  {
    id: 4,
    title: 'Responsive Design Principles',
    description: 'Learn how to create websites that work on all devices using flexbox, grid, and media queries.',
    duration: '1h 30min',
    progress: 0,
    locked: true,
    completed: false
  },
  {
    id: 5,
    title: 'Introduction to React',
    description: 'Get started with React, components, props, state, and hooks.',
    duration: '2h 45min',
    progress: 0,
    locked: true,
    completed: false
  }
])

// Materials data
const materials = ref([
  {
    id: 1,
    title: 'HTML_CSS_Cheat_Sheet.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: 'Mar 15, 2026',
    downloaded: false
  },
  {
    id: 2,
    title: 'JavaScript_Exercises.zip',
    type: 'ZIP',
    size: '5.1 MB',
    date: 'Mar 14, 2026',
    downloaded: true
  },
  {
    id: 3,
    title: 'Responsive_Design_Guide.pdf',
    type: 'PDF',
    size: '3.2 MB',
    date: 'Mar 12, 2026',
    downloaded: false
  },
  {
    id: 4,
    title: 'React_Quick_Start.pdf',
    type: 'PDF',
    size: '1.8 MB',
    date: 'Mar 10, 2026',
    downloaded: false
  }
])

// Exams data
const exams = ref([
  {
    id: 1,
    title: 'Web Development Fundamentals Exam',
    description: 'Test your knowledge of HTML, CSS, and basic web concepts.',
    duration: '45 min',
    questions: 30,
    passingScore: 70,
    completed: true,
    score: 85,
    retakeAllowed: false
  },
  {
    id: 2,
    title: 'JavaScript Intermediate Exam',
    description: 'Assessment covering JavaScript ES6+, DOM manipulation, and async programming.',
    duration: '60 min',
    questions: 40,
    passingScore: 75,
    completed: false,
    score: null,
    retakeAllowed: true
  },
  {
    id: 3,
    title: 'Responsive Design Final Exam',
    description: 'Comprehensive exam on responsive design principles and frameworks.',
    duration: '90 min',
    questions: 50,
    passingScore: 80,
    completed: false,
    score: null,
    retakeAllowed: true
  }
])

// Deadlines data
const deadlines = ref([
  {
    id: 1,
    title: 'JavaScript Basics Quiz',
    date: 'Due in 2 days',
    color: 'bg-yellow-500'
  },
  {
    id: 2,
    title: 'Responsive Design Project',
    date: 'Due in 5 days',
    color: 'bg-red-500'
  },
  {
    id: 3,
    title: 'Final Exam Registration',
    date: 'Closes in 7 days',
    color: 'bg-blue-500'
  }
])

// Filtered data based on search
const filteredLessons = computed(() => {
  if (!searchQuery.value) return lessons.value
  return lessons.value.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredMaterials = computed(() => {
  if (!searchQuery.value) return materials.value
  return materials.value.filter(material => 
    material.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredExams = computed(() => {
  if (!searchQuery.value) return exams.value
  return exams.value.filter(exam => 
    exam.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Computed values
const overallProgress = computed(() => {
  const totalProgress = lessons.value.reduce((sum, lesson) => sum + lesson.progress, 0)
  return Math.round(totalProgress / lessons.value.length)
})

const completedLessons = computed(() => {
  return lessons.value.filter(lesson => lesson.progress === 100).length
})

const downloadedMaterials = computed(() => {
  return materials.value.filter(material => material.downloaded).length
})

const passedExams = computed(() => {
  return exams.value.filter(exam => exam.completed && exam.score >= exam.passingScore).length
})

const canGoPrevious = computed(() => currentLessonIndex.value > 0)
const canGoNext = computed(() => currentLessonIndex.value < filteredLessons.value.length - 1)

const selectLesson = (lesson) => {
  if (lesson.locked && !isVerified.value) {
    alert('Please verify your account to access this lesson')
    return
  }
  currentLessonIndex.value = filteredLessons.value.findIndex(l => l.id === lesson.id)
  startLesson(lesson)
}

const startLesson = (lesson) => {
  if (lesson.locked && !isVerified.value) {
    alert('Please verify your account to access this lesson')
    return
  }
  alert(`Starting lesson: ${lesson.title}`)
}

const previousLesson = () => {
  if (canGoPrevious.value) {
    currentLessonIndex.value--
    startLesson(filteredLessons.value[currentLessonIndex.value])
  }
}

const nextLesson = () => {
  if (canGoNext.value) {
    currentLessonIndex.value++
    startLesson(filteredLessons.value[currentLessonIndex.value])
  }
}

const downloadMaterial = (material) => {
  if (!isVerified.value) {
    alert('Please verify your account to download materials')
    return
  }
  material.downloaded = true
  alert(`Downloading: ${material.title}`)
}

const takeExam = (exam) => {
  if (!isVerified.value) {
    alert('Please verify your account to take exams')
    return
  }
  if (exam.completed && !exam.retakeAllowed) {
    alert('You have already completed this exam and cannot retake it')
    return
  }
  alert(`Starting exam: ${exam.title}`)
}

// Check authentication on mount
onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  } else {
    const userData = JSON.parse(user)
    isVerified.value = userData.isVerified || false
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

/* Smooth transitions */
.transition {
  transition: all 0.2s ease;
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.ml-64 {
  margin-left: 16rem;
}

/* Smooth transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>