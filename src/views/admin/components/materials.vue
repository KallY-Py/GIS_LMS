<template>
  <div>
    <!-- 
      Materials Management Component with Full Theme Support
      - All colors and styles are theme-aware using CSS variables and dynamic classes
      - Automatically responds to theme changes from the global theme system
      - Maintains all original functionality while adding dark mode support
    -->
    
    <!-- Upload Materials Section -->
    <div 
      class="rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300"
      :class="uploadCardClass"
    >
      <h2 class="text-lg font-semibold mb-4" :class="titleClass">Upload Materials & Resources</h2>
      <p class="text-sm mb-4" :class="subtitleClass">Upload PDFs, documents, code files, design assets, or any supplementary resources.</p>
      
      <!-- File Upload Area -->
      <div 
        class="border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer"
        :class="uploadAreaClass"
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
          accept=".pdf,.doc,.docx,.txt,.zip,.png,.jpg,.jpeg,.gif,.svg,.mp4,.mov,.pptx"
        />
        
        <!-- Dynamic icon based on theme -->
        <svg 
          class="w-12 h-12 mx-auto mb-4 transition-colors duration-300"
          :class="uploadIconClass"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        
        <p class="mb-2" :class="uploadTextClass">Drag & drop files or click to browse</p>
        <p class="text-sm" :class="uploadSubtextClass">Support PDF, DOC, DOCX, TXT, ZIP, Images, Videos, and more</p>
        
        <button 
          class="mt-4 px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-300"
          :class="uploadButtonClass"
        >
          + Upload Resources
        </button>
      </div>
    </div>
    
    <!-- Materials Library Section -->
    <div 
      class="rounded-xl shadow-sm overflow-hidden transition-colors duration-300"
      :class="libraryCardClass"
    >
      <!-- Library Header -->
      <div class="px-6 py-4 border-b transition-colors duration-300" :class="libraryHeaderClass">
        <h2 class="text-lg font-semibold" :class="titleClass">Materials Library</h2>
        <p class="text-sm" :class="subtitleClass">Manage and organize your course materials</p>
      </div>
      
      <!-- Materials List -->
      <div class="divide-y transition-colors duration-300" :class="dividerClass">
        <div 
          v-for="(material, index) in materials" 
          :key="index" 
          class="p-6 transition-colors duration-300"
          :class="materialItemClass"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 flex-1">
              <!-- File Icon based on type with theme-aware colors -->
              <div class="flex-shrink-0">
                <!-- PDF Icon - Red in both themes but adjusted for visibility -->
                <svg v-if="material.type === 'pdf'" class="w-8 h-8" :class="pdfIconClass" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                </svg>
                <!-- DOC Icon -->
                <svg v-else-if="material.type === 'doc'" class="w-8 h-8" :class="docIconClass" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/>
                </svg>
                <!-- Image Icon -->
                <svg v-else-if="material.type === 'image'" class="w-8 h-8" :class="imageIconClass" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <!-- Video Icon -->
                <svg v-else-if="material.type === 'video'" class="w-8 h-8" :class="videoIconClass" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 9v-4h-2v4h-2v-4h-2v4h-2v-4H8v4H6V9c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-6h2v6h12V9z"/>
                  <path d="M4 5h2v14H4z"/>
                </svg>
                <!-- Default File Icon -->
                <svg v-else class="w-8 h-8" :class="defaultIconClass" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
              
              <!-- Material Details -->
              <div class="flex-1">
                <h3 class="font-semibold mb-1" :class="materialNameClass">{{ material.name }}</h3>
                <div class="flex items-center space-x-4 text-sm" :class="materialMetaClass">
                  <span>{{ material.size }}</span>
                  <span>{{ material.date }}</span>
                  <span :class="materialTypeClass">{{ material.type.toUpperCase() }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center space-x-2">
              <button 
                @click="downloadMaterial(material)" 
                class="p-2 rounded-lg transition-all duration-200"
                :class="downloadButtonClass"
                title="Download"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
              <button 
                @click="deleteMaterial(index)" 
                class="p-2 rounded-lg transition-all duration-200"
                :class="deleteButtonClass"
                title="Delete"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Empty State with theme support -->
        <div v-if="materials.length === 0" class="p-12 text-center">
          <svg 
            class="w-16 h-16 mx-auto mb-4 transition-colors duration-300"
            :class="emptyIconClass"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p :class="emptyTextClass">No materials uploaded yet</p>
          <p class="text-sm mt-2" :class="emptySubtextClass">Upload your first resource to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'materialsTab'
}
</script>


<script setup>
import { ref, computed, inject } from 'vue'

// ============================================
// INJECT THEME FROM GLOBAL PROVIDER
// ============================================
// This injects the theme functionality from App.vue
// Makes the component reactive to theme changes
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  toggleTheme: () => {},
  isDark: () => false
})

// Destructure theme properties for easier access
const { isDark: isDarkFn, currentTheme } = theme

// Computed property to check if dark mode is active
// This updates automatically when theme changes
const isDark = computed(() => {
  return currentTheme?.value === 'dark' || isDarkFn?.()
})

// ============================================
// FILE UPLOAD FUNCTIONALITY
// ============================================
const fileInput = ref(null)

// Sample materials data - in a real app, this would come from an API
const materials = ref([
  {
    name: 'Course Syllabus.pdf',
    size: '2.4 MB',
    date: '2026-03-20',
    type: 'pdf'
  },
  {
    name: 'Lecture Notes.docx',
    size: '1.8 MB',
    date: '2026-03-20',
    type: 'doc'
  },
  {
    name: 'Project Guidelines.pdf',
    size: '856 KB',
    date: '2026-03-02',
    type: 'pdf'
  }
])

// File upload handlers
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

// Helper function to determine file type from extension
const getFileType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase()
  const typeMap = {
    'pdf': 'pdf',
    'doc': 'doc',
    'docx': 'doc',
    'txt': 'txt',
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'svg': 'image',
    'mp4': 'video',
    'mov': 'video',
    'zip': 'zip',
    'pptx': 'pptx'
  }
  return typeMap[extension] || 'file'
}

// Format file size from bytes to human-readable format
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Get current date in YYYY-MM-DD format
const formatDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Process uploaded files
const uploadFiles = (files) => {
  files.forEach(file => {
    const newMaterial = {
      name: file.name,
      size: formatFileSize(file.size),
      date: formatDate(),
      type: getFileType(file.name)
    }
    
    materials.value.push(newMaterial)
    console.log('Uploading file:', file.name)
    
    // Here you would typically upload to your backend/storage
    // For demo purposes, we're just adding to local array
  })
  
  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Download material handler
const downloadMaterial = (material) => {
  console.log('Downloading:', material.name)
  // In a real app, you would implement actual download logic here
  alert(`Downloading ${material.name}...`)
}

// Delete material handler
const deleteMaterial = (index) => {
  if (confirm('Are you sure you want to delete this material?')) {
    materials.value.splice(index, 1)
  }
}

// ============================================
// THEME-AWARE CSS CLASSES
// ============================================
// These classes dynamically change based on the current theme
// All styles are reactive and update automatically when theme toggles

// Upload card background
const uploadCardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Title text color
const titleClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Subtitle text color
const subtitleClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Upload area border and background
const uploadAreaClass = computed(() => ({
  'border-gray-300 bg-gray-50 hover:border-emerald-400': !isDark.value,
  'border-gray-600 bg-gray-700/50 hover:border-emerald-500': isDark.value
}))

// Upload icon color
const uploadIconClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Upload text color
const uploadTextClass = computed(() => ({
  'text-gray-600': !isDark.value,
  'text-gray-300': isDark.value
}))

// Upload subtext color
const uploadSubtextClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// Upload button gradient
const uploadButtonClass = computed(() => ({
  'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700': !isDark.value,
  'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800': isDark.value
}))

// Library card background
const libraryCardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Library header border
const libraryHeaderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

// Divider color
const dividerClass = computed(() => ({
  'divide-gray-200': !isDark.value,
  'divide-gray-700': isDark.value
}))

// Material item hover effect
const materialItemClass = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700/50': isDark.value
}))

// Material name color
const materialNameClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Material metadata color
const materialMetaClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Material type badge color
const materialTypeClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))

// File icon colors based on type with theme awareness
const pdfIconClass = computed(() => ({
  'text-red-500': true, // Red stays consistent but may appear brighter in dark mode
  'text-red-400': isDark.value // Slightly brighter in dark mode for visibility
}))

const docIconClass = computed(() => ({
  'text-blue-500': !isDark.value,
  'text-blue-400': isDark.value
}))

const imageIconClass = computed(() => ({
  'text-green-500': !isDark.value,
  'text-green-400': isDark.value
}))

const videoIconClass = computed(() => ({
  'text-purple-500': !isDark.value,
  'text-purple-400': isDark.value
}))

const defaultIconClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Download button styles
const downloadButtonClass = computed(() => ({
  'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50': !isDark.value,
  'text-gray-500 hover:text-emerald-400 hover:bg-emerald-900/30': isDark.value
}))

// Delete button styles
const deleteButtonClass = computed(() => ({
  'text-gray-400 hover:text-red-600 hover:bg-red-50': !isDark.value,
  'text-gray-500 hover:text-red-400 hover:bg-red-900/30': isDark.value
}))

// Empty state icon color
const emptyIconClass = computed(() => ({
  'text-gray-300': !isDark.value,
  'text-gray-600': isDark.value
}))

// Empty state text color
const emptyTextClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Empty state subtext color
const emptySubtextClass = computed(() => ({
  'text-gray-400': !isDark.value,
  'text-gray-500': isDark.value
}))
</script>

<style scoped>
/* 
  Custom styles for materials component
  All transitions are smooth for theme switching
*/
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 100ms;
}

/* Smooth hover effects for buttons */
button {
  transition: all 0.2s ease;
}

/* Custom scrollbar for the materials list (optional) */
.materials-list::-webkit-scrollbar {
  width: 8px;
}

.materials-list::-webkit-scrollbar-track {
  background: transparent;
}

.materials-list::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 4px;
}

.materials-list::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}
</style>