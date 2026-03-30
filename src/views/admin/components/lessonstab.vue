<template>
  <div class="space-y-8">
    <!-- Upload New Lesson Section -->
    <div 
      class="rounded-xl shadow-sm p-6 transition-colors duration-300"
      :class="uploadCardClass"
    >
      <h2 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="titleClass">
        Upload New Lesson
      </h2>
      <div 
        class="border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer"
        :class="uploadZoneClass"
        @click="triggerFileUpload"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden" 
          multiple 
          @change="handleFileSelect"
          accept=".mp4,.mov,.pdf,.pptx"
        />
        <!-- Dynamic icon color based on theme -->
        <svg class="w-12 h-12 mx-auto mb-4 transition-colors duration-300" :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p class="mb-2 transition-colors duration-300" :class="textSecondaryClass">
          Drag & drop files or document or click to browse
        </p>
        <p class="text-sm transition-colors duration-300" :class="textTertiaryClass">
          Support MP4, MOV, PDF, PPTX
        </p>
        <button 
          class="mt-4 px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
          :class="uploadButtonClass"
        >
          + Upload Lessons
        </button>
      </div>
    </div>
    
    <!-- Lesson Library -->
    <div 
      class="rounded-xl shadow-sm overflow-hidden transition-colors duration-300"
      :class="libraryCardClass"
    >
      <div class="px-6 py-4 border-b transition-colors duration-300" :class="[borderClass, headerBgClass]">
        <h2 class="text-lg font-semibold transition-colors duration-300" :class="titleClass">
          Lesson Library
        </h2>
        <p class="text-sm transition-colors duration-300" :class="textSecondaryClass">
          Manage and reorder your course lessons
        </p>
      </div>
      
      <div class="divide-y transition-colors duration-300" :class="divideClass">
        <!-- Lesson Items -->
        <div 
          v-for="(lesson, index) in lessons" 
          :key="index" 
          class="p-6 transition-all duration-300"
          :class="lessonItemClass"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 flex-1">
              <!-- Lesson number with dynamic color -->
              <span class="text-2xl font-bold w-12 transition-colors duration-300" :class="numberClass">
                {{ lesson.number }}
              </span>
              <div class="flex-1">
                <h3 class="font-semibold mb-1 transition-colors duration-300" :class="textPrimaryClass">
                  {{ lesson.title }}
                </h3>
                <div class="flex items-center space-x-4 text-sm">
                  <span class="transition-colors duration-300" :class="textSecondaryClass">
                    {{ lesson.duration }}
                  </span>
                  <span class="transition-colors duration-300" :class="textSecondaryClass">
                    {{ lesson.date }}
                  </span>
                  <!-- Status badge with theme-aware colors -->
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium transition-all duration-300"
                    :class="getStatusClass(lesson.status)"
                  >
                    {{ lesson.status }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Edit button with theme-aware hover effects -->
              <button 
                class="p-2 rounded-lg transition-all duration-300"
                :class="editButtonClass"
                @click="editLesson(lesson)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <!-- Delete button with theme-aware hover effects -->
              <button 
                class="p-2 rounded-lg transition-all duration-300"
                :class="deleteButtonClass"
                @click="deleteLesson(lesson)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state when no lessons -->
      <div v-if="lessons.length === 0" class="p-12 text-center">
        <svg class="w-16 h-16 mx-auto mb-4" :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <p class="text-lg font-semibold mb-2" :class="textPrimaryClass">No lessons yet</p>
        <p class="text-sm" :class="textSecondaryClass">Upload your first lesson to get started</p>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'LessonsTab'
}
</script>

<script setup>
import { ref } from 'vue'

// ==================== THEME INJECTION ====================
// Inject theme from App.vue to make component theme-aware
// This allows the component to react to dark/light mode changes
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  toggleTheme: () => {},
  isDark: () => false
})

// Destructure theme properties
const { isDark: isDarkFn, currentTheme } = theme

// Reactive computed property for dark mode status
// Automatically updates when theme changes
const isDark = computed(() => {
  return currentTheme?.value === 'dark' || isDarkFn?.()
})

// ==================== DATA ====================
const fileInput = ref(null)

// Lessons data - you can load this from an API in production
const lessons = ref([
  {
    id: 1,
    number: '01',
    title: 'Introduction to Web Development',
    duration: '12:30',
    date: '2026-03-20',
    status: 'published'
  },
  {
    id: 2,
    number: '02',
    title: 'HTML Fundamentals',
    duration: '02:55',
    date: '2026-03-21',
    status: 'published'
  },
  {
    id: 3,
    number: '03',
    title: 'CSS Styling and Layouts',
    duration: '15:20',
    date: '2026-03-22',
    status: 'draft'
  },
  {
    id: 4,
    number: '04',
    title: 'JavaScript Basics',
    duration: '18:45',
    date: '2026-03-23',
    status: 'published'
  }
])

// ==================== THEME-AWARE CSS CLASSES ====================
// These classes automatically switch between light and dark mode styles

// Main card backgrounds
const uploadCardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

const libraryCardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Header background for library section
const headerBgClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Text colors
const titleClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

const textPrimaryClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

const textSecondaryClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

const textTertiaryClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Icon colors
const iconClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Border colors
const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

const divideClass = computed(() => ({
  'divide-gray-200': !isDark.value,
  'divide-gray-700': isDark.value
}))

// Upload zone styling
const uploadZoneClass = computed(() => ({
  'border-gray-300 hover:border-emerald-400 bg-gray-50': !isDark.value,
  'border-gray-600 hover:border-emerald-500 bg-gray-700/50': isDark.value
}))

// Upload button styling
const uploadButtonClass = computed(() => ({
  'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700': !isDark.value,
  'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800': isDark.value
}))

// Lesson item hover effect
const lessonItemClass = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700/50': isDark.value
}))

// Lesson number styling
const numberClass = computed(() => ({
  'text-gray-300': !isDark.value,
  'text-gray-600': isDark.value
}))

// Button styling for edit and delete
const editButtonClass = computed(() => ({
  'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50': !isDark.value,
  'text-gray-500 hover:text-emerald-400 hover:bg-emerald-900/30': isDark.value
}))

const deleteButtonClass = computed(() => ({
  'text-gray-400 hover:text-red-600 hover:bg-red-50': !isDark.value,
  'text-gray-500 hover:text-red-400 hover:bg-red-900/30': isDark.value
}))

// ==================== HELPER METHODS ====================
// Get dynamic status badge classes based on theme and status
const getStatusClass = (status) => {
  if (status === 'published') {
    return isDark.value 
      ? 'bg-green-900/50 text-green-300' 
      : 'bg-green-100 text-green-700'
  } else {
    return isDark.value 
      ? 'bg-yellow-900/50 text-yellow-300' 
      : 'bg-yellow-100 text-yellow-700'
  }
}

// ==================== FILE UPLOAD HANDLERS ====================
const triggerFileUpload = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  uploadFiles(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  uploadFiles(files)
}

const uploadFiles = (files) => {
  files.forEach(file => {
    console.log('Uploading file:', file.name)
    // Here you would typically upload to your server
    // For demo purposes, we'll show an alert
    alert(`Uploading ${file.name}...`)
    
    // After successful upload, you would add the lesson to the lessons array
    // Example:
    // lessons.value.push({
    //   id: lessons.value.length + 1,
    //   number: String(lessons.value.length + 1).padStart(2, '0'),
    //   title: file.name,
    //   duration: '00:00',
    //   date: new Date().toISOString().split('T')[0],
    //   status: 'draft'
    // })
  })
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// ==================== LESSON MANAGEMENT ====================
const editLesson = (lesson) => {
  console.log('Editing lesson:', lesson)
  // Implement edit functionality
  // You can open a modal or navigate to edit page
  alert(`Edit lesson: ${lesson.title}`)
}

const deleteLesson = (lesson) => {
  // Confirm before deletion
  if (confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
    const index = lessons.value.findIndex(l => l.id === lesson.id)
    if (index !== -1) {
      lessons.value.splice(index, 1)
      console.log('Lesson deleted:', lesson)
      
      // Optional: Show success message
      alert(`Lesson "${lesson.title}" has been deleted`)
      
      // After deletion, you might want to renumber the lessons
      renumberLessons()
    }
  }
}

// Helper function to renumber lessons after deletion
const renumberLessons = () => {
  lessons.value.forEach((lesson, idx) => {
    lesson.number = String(idx + 1).padStart(2, '0')
  })
}
</script>

<style scoped>
/* Smooth transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom hover effects for buttons */
button {
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

/* Upload zone hover effect */
.border-dashed:hover {
  transform: translateY(-2px);
}

/* Custom scrollbar for the component (optional) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}

/* Animation for loading states (if needed) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>