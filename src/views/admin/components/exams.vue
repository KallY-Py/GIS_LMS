<template>
  <div :class="containerClasses">
    <!-- Create New Exam Section -->
    <div :class="cardClasses" class="rounded-xl shadow-sm p-6 mb-8">
      <h2 :class="headingClasses" class="text-lg font-semibold mb-2">Create New Exam</h2>
      <p :class="textSecondaryClasses" class="text-sm mb-4">Set up quizzes and examination for your course</p>
      <div class="flex justify-center">
        <button 
          @click="openCreateExamModal"
          class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium rounded-lg transition inline-flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span> New Exam</span>
        </button>
      </div>
    </div>
    
    <!-- Exams Library -->
    <div :class="cardClasses" class="rounded-xl shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b" :class="borderClasses">
        <h2 :class="headingClasses" class="text-lg font-semibold">Exams & Quizzes</h2>
        <p :class="textSecondaryClasses" class="text-sm">Manage and monitor your course examinations</p>
      </div>
      
      <div :class="divideClasses">
        <div v-for="(exam, index) in exams" :key="index" class="p-6 transition" :class="hoverClasses">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h3 :class="titleClasses" class="font-semibold text-lg">{{ exam.title }}</h3>
                <span 
                  :class="exam.status === 'active' ? activeStatusClasses : inactiveStatusClasses"
                  class="px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ exam.status === 'active' ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div class="flex items-center space-x-6 text-sm mb-3" :class="textSecondaryClasses">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ exam.questions }} Questions</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{{ exam.duration }} min</span>
                </div>
              </div>
              <div v-if="exam.stats" class="flex items-center space-x-6">
                <div class="flex items-center space-x-2">
                  <div :class="statCircleClasses" class="w-16 h-16 rounded-full flex items-center justify-center">
                    <span :class="statTextClasses" class="text-xl font-bold">{{ exam.stats.avgScore }}%</span>
                  </div>
                  <div>
                    <p :class="textSecondaryClasses" class="text-xs">Avg. Score</p>
                    <p :class="textPrimaryClasses" class="text-sm font-medium">{{ exam.stats.avgScore }}%</p>
                  </div>
                </div>
                <div>
                  <p :class="textSecondaryClasses" class="text-xs">Attempts</p>
                  <p :class="textPrimaryClasses" class="text-sm font-medium">{{ exam.stats.attempts }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-4">
              <button 
                @click="editExam(exam)" 
                class="p-2 transition"
                :class="editButtonClasses"
                title="Edit Exam"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button 
                @click="viewResults(exam)" 
                class="p-2 transition"
                :class="viewButtonClasses"
                title="View Results"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </button>
              <button 
                @click="deleteExam(index)" 
                class="p-2 transition"
                :class="deleteButtonClasses"
                title="Delete Exam"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="exams.length === 0" class="p-12 text-center">
          <svg class="w-16 h-16 mx-auto mb-4" :class="emptyIconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p :class="textSecondaryClasses">No exams created yet</p>
          <p :class="textMutedClasses" class="text-sm mt-2">Create your first exam to assess your students</p>
          <button 
            @click="openCreateExamModal"
            class="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium rounded-lg transition"
          >
            + Create New Exam
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Exam Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
      <div :class="modalClasses" class="rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="px-6 py-4 border-b flex justify-between items-center" :class="[borderClasses, modalHeaderClasses]">
          <h3 :class="headingClasses" class="text-xl font-semibold">{{ editingExam ? 'Edit Exam' : 'Create New Exam' }}</h3>
          <button @click="closeModal" class="transition" :class="closeButtonClasses">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6" :class="modalBodyClasses">
          <form @submit.prevent="saveExam">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" :class="labelClasses">Exam Title</label>
              <input 
                v-model="examForm.title" 
                type="text" 
                required
                class="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
                :class="inputClasses"
                placeholder="e.g., Module 1 Quiz"
              />
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium mb-2" :class="labelClasses">Number of Questions</label>
                <input 
                  v-model.number="examForm.questions" 
                  type="number" 
                  required
                  min="1"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
                  :class="inputClasses"
                  placeholder="e.g., 15"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2" :class="labelClasses">Duration (minutes)</label>
                <input 
                  v-model.number="examForm.duration" 
                  type="number" 
                  required
                  min="1"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
                  :class="inputClasses"
                  placeholder="e.g., 20"
                />
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" :class="labelClasses">Status</label>
              <select 
                v-model="examForm.status" 
                class="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
                :class="inputClasses"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" :class="labelClasses">Description (Optional)</label>
              <textarea 
                v-model="examForm.description" 
                rows="3"
                class="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition"
                :class="inputClasses"
                placeholder="Enter exam description or instructions..."
              ></textarea>
            </div>
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                @click="closeModal"
                class="px-4 py-2 border rounded-lg transition"
                :class="cancelButtonClasses"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg transition"
              >
                {{ editingExam ? 'Update Exam' : 'Create Exam' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamsTab'
}
</script>

<script setup>
import { ref, computed, inject } from 'vue'

// ============ THEME INJECTION ============
// Inject the theme functionality from App.vue to enable dark/light mode
// This makes the component reactive to theme changes globally
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  toggleTheme: () => {},
  isDark: () => false
})

// Destructure theme properties for easier access
const { isDark: isDarkFn, currentTheme } = theme

// Computed property to check if dark mode is active
// This will automatically update when the user clicks the theme toggle button
const isDark = computed(() => {
  return currentTheme?.value === 'dark' || isDarkFn?.()
})

// ============ THEME-AWARE CSS CLASSES ============
// All classes dynamically change based on the current theme
// When isDark changes, all these classes update automatically

// Main container background
const containerClasses = computed(() => ({
  'bg-gray-50': !isDark.value,
  'bg-gray-900': isDark.value
}))

// Card backgrounds (white in light mode, dark gray in dark mode)
const cardClasses = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Heading text colors
const headingClasses = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Secondary text colors (for descriptions, metadata)
const textSecondaryClasses = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Muted text colors (for empty states)
const textMutedClasses = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Primary text colors
const textPrimaryClasses = computed(() => ({
  'text-gray-700': !isDark.value,
  'text-gray-300': isDark.value
}))

// Border colors
const borderClasses = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

// Divider colors
const divideClasses = computed(() => ({
  'divide-y divide-gray-200': !isDark.value,
  'divide-y divide-gray-700': isDark.value
}))

// Hover effects for exam items
const hoverClasses = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700': isDark.value
}))

// Exam title colors
const titleClasses = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Active status badge colors
const activeStatusClasses = computed(() => ({
  'bg-green-100 text-green-700': !isDark.value,
  'bg-green-900 text-green-300': isDark.value
}))

// Inactive status badge colors
const inactiveStatusClasses = computed(() => ({
  'bg-gray-100 text-gray-700': !isDark.value,
  'bg-gray-700 text-gray-300': isDark.value
}))

// Statistics circle background
const statCircleClasses = computed(() => ({
  'bg-emerald-50': !isDark.value,
  'bg-emerald-900/30': isDark.value
}))

// Statistics text colors
const statTextClasses = computed(() => ({
  'text-emerald-600': !isDark.value,
  'text-emerald-400': isDark.value
}))

// Edit button colors
const editButtonClasses = computed(() => ({
  'text-gray-400 hover:text-emerald-600': !isDark.value,
  'text-gray-500 hover:text-emerald-400': isDark.value
}))

// View button colors
const viewButtonClasses = computed(() => ({
  'text-gray-400 hover:text-blue-600': !isDark.value,
  'text-gray-500 hover:text-blue-400': isDark.value
}))

// Delete button colors
const deleteButtonClasses = computed(() => ({
  'text-gray-400 hover:text-red-600': !isDark.value,
  'text-gray-500 hover:text-red-400': isDark.value
}))

// Empty state icon colors
const emptyIconClasses = computed(() => ({
  'text-gray-300': !isDark.value,
  'text-gray-600': isDark.value
}))

// Modal styles
const modalClasses = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

const modalHeaderClasses = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

const modalBodyClasses = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Input field styles
const inputClasses = computed(() => ({
  'border-gray-300 bg-white text-gray-900': !isDark.value,
  'border-gray-600 bg-gray-700 text-white': isDark.value
}))

// Label styles
const labelClasses = computed(() => ({
  'text-gray-700': !isDark.value,
  'text-gray-300': isDark.value
}))

// Close button styles
const closeButtonClasses = computed(() => ({
  'text-gray-400 hover:text-gray-600': !isDark.value,
  'text-gray-500 hover:text-gray-300': isDark.value
}))

// Cancel button styles
const cancelButtonClasses = computed(() => ({
  'border-gray-300 text-gray-700 hover:bg-gray-50': !isDark.value,
  'border-gray-600 text-gray-300 hover:bg-gray-700': isDark.value
}))

// ============ COMPONENT STATE ============
// Modal state
const showModal = ref(false)
const editingExam = ref(null)

// Form data
const examForm = ref({
  title: '',
  questions: '',
  duration: '',
  status: 'active',
  description: ''
})

// Exams data (mock data - replace with your actual API calls)
const exams = ref([
  {
    id: 1,
    title: 'Module 1 Quiz',
    questions: 15,
    duration: 20,
    status: 'active',
    stats: {
      avgScore: 82,
      attempts: 42
    }
  },
  {
    id: 2,
    title: 'Module 2 Quiz',
    questions: 25,
    duration: 35,
    status: 'inactive',
    stats: null
  },
  {
    id: 3,
    title: 'Final Examination',
    questions: 40,
    duration: 60,
    status: 'active',
    stats: {
      avgScore: 78,
      attempts: 38
    }
  }
])

// ============ COMPONENT METHODS ============
// Open create exam modal
const openCreateExamModal = () => {
  editingExam.value = null
  examForm.value = {
    title: '',
    questions: '',
    duration: '',
    status: 'active',
    description: ''
  }
  showModal.value = true
}

// Edit exam
const editExam = (exam) => {
  editingExam.value = exam
  examForm.value = {
    title: exam.title,
    questions: exam.questions,
    duration: exam.duration,
    status: exam.status,
    description: exam.description || ''
  }
  showModal.value = true
}

// Save exam (create or update)
const saveExam = () => {
  if (editingExam.value) {
    // Update existing exam
    const index = exams.value.findIndex(e => e.id === editingExam.value.id)
    if (index !== -1) {
      exams.value[index] = {
        ...exams.value[index],
        title: examForm.value.title,
        questions: examForm.value.questions,
        duration: examForm.value.duration,
        status: examForm.value.status,
        description: examForm.value.description
      }
    }
  } else {
    // Create new exam
    const newExam = {
      id: Date.now(),
      title: examForm.value.title,
      questions: examForm.value.questions,
      duration: examForm.value.duration,
      status: examForm.value.status,
      description: examForm.value.description,
      stats: null
    }
    exams.value.push(newExam)
  }
  closeModal()
}

// View exam results
const viewResults = (exam) => {
  console.log('Viewing results for:', exam.title)
  // Replace with your actual results viewing logic
  alert(`Viewing results for ${exam.title}...`)
}

// Delete exam
const deleteExam = (index) => {
  if (confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
    exams.value.splice(index, 1)
  }
}

// Close modal
const closeModal = () => {
  showModal.value = false
  editingExam.value = null
  examForm.value = {
    title: '',
    questions: '',
    duration: '',
    status: 'active',
    description: ''
  }
}
</script>

<style scoped>
/* Smooth transitions for theme changes */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Optional: Add any additional custom styles here */
</style>