<template>
  <div>
    <!-- 
      Personal Information Tab with Theme Support
      - Uses CSS variables for dynamic theming
      - All text, backgrounds, and borders adapt to light/dark mode
      - Fixed textbox visibility issues by using theme-aware classes
    -->
    <div 
      class="rounded-xl shadow-sm p-6 mb-8 transition-colors duration-300"
      :class="cardClass"
    >
      <h2 :class="headingClass">Personal Information</h2>
      <p :class="subheadingClass">Update your profile details</p>

      <!-- Profile Photo Section -->
      <div class="mb-8 pb-6" :class="borderClass">
        <label :class="labelClass">Profile Photo</label>
        <div class="flex items-start gap-6">
          <div class="relative">
            <!-- Avatar with theme-aware gradient -->
            <div 
              class="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
              :class="avatarClass"
            >
              {{ getInitials(formData.firstName + ' ' + formData.lastName) }}
            </div>
            <button 
              @click="triggerFileUpload"
              class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition"
              :class="uploadButtonClass"
            >
              <svg class="w-4 h-4" :class="uploadIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
            <input type="file" ref="fileInput" class="hidden" accept="image/jpeg,image/png,image/gif" @change="handleImageUpload" />
          </div>
          <div class="flex-1">
            <p :class="helperTextClass">JPG, PNG, or GIF. Max 2MB</p>
            <button 
              @click="triggerFileUpload"
              :class="changePhotoClass"
            >
              Change Photo
            </button>
          </div>
        </div>
        <div v-if="uploadSuccess" class="mt-3 text-sm" :class="successTextClass">
          ✓ Profile photo updated successfully!
        </div>
      </div>

      <!-- Form Fields -->
      <form @submit.prevent="saveProfile" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label :class="labelClass">First Name</label>
            <input 
              type="text" 
              v-model="formData.firstName"
              :class="inputClass"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label :class="labelClass">Last Name</label>
            <input 
              type="text" 
              v-model="formData.lastName"
              :class="inputClass"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label :class="labelClass">Email Address</label>
            <input 
              type="email" 
              v-model="formData.email"
              :class="[inputClass, readonlyInputClass]"
              placeholder="Enter your email"
              readonly
            />
            <p :class="helperTextClass">Email cannot be changed</p>
          </div>
          <div>
            <label :class="labelClass">Phone Number</label>
            <input 
              type="tel" 
              v-model="formData.phone"
              :class="inputClass"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label :class="labelClass">Address</label>
          <textarea 
            v-model="formData.address"
            rows="3"
            :class="textareaClass"
            placeholder="Enter your address"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button 
            type="submit"
            :class="submitButtonClass"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfoTab'
}
</script>

<script setup>
import { ref, computed, inject } from 'vue'

// Inject theme from App.vue for global theme access
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Computed property to check if dark mode is active
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// Refs for file upload
const fileInput = ref(null)
const uploadSuccess = ref(false)

// Form data
const formData = ref({
  firstName: 'Admin',
  lastName: 'Main',
  email: 'admin@gmail.com',
  phone: '0936 514 2664',
  address: 'Sitio Bagsakan Brgy Makailag, Swerte'
})

// Get initials for avatar
const getInitials = (name) => {
  if (!name) return 'A'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

// Trigger file upload
const triggerFileUpload = () => {
  fileInput.value.click()
}

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB')
      return
    }
    if (!file.type.match('image.*')) {
      alert('Only image files are allowed')
      return
    }
    
    // Simulate upload
    setTimeout(() => {
      uploadSuccess.value = true
      setTimeout(() => {
        uploadSuccess.value = false
      }, 3000)
    }, 1000)
    
    console.log('Uploading image:', file.name)
  }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Save profile
const saveProfile = () => {
  // Save to localStorage
  localStorage.setItem('admin_profile', JSON.stringify(formData.value))
  alert('Profile updated successfully!')
}

// --- Theme-aware CSS Classes ---
// These classes dynamically change based on the current theme

// Main card background
const cardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

// Border color for sections
const borderClass = computed(() => ({
  'border-b border-gray-200': !isDark.value,
  'border-b border-gray-700': isDark.value
}))

// Main heading style
const headingClass = computed(() => ({
  'text-xl font-semibold mb-2': true,
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

// Subheading style
const subheadingClass = computed(() => ({
  'text-sm mb-6': true,
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

// Label style for form fields
const labelClass = computed(() => ({
  'block text-sm font-medium mb-2': true,
  'text-gray-700': !isDark.value,
  'text-gray-300': isDark.value
}))

// Input field styling - FIXED: Text is now visible in both modes
const inputClass = computed(() => ({
  'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-300': true,
  // Light mode styles
  'border-gray-300 bg-white text-gray-900 placeholder-gray-400': !isDark.value,
  // Dark mode styles - ensures text is visible
  'border-gray-600 bg-gray-700 text-white placeholder-gray-400': isDark.value
}))

// Readonly input styling (email field)
const readonlyInputClass = computed(() => ({
  'cursor-not-allowed': true,
  'bg-gray-50': !isDark.value,
  'bg-gray-600': isDark.value
}))

// Textarea styling
const textareaClass = computed(() => ({
  'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-300 resize-y': true,
  'border-gray-300 bg-white text-gray-900 placeholder-gray-400': !isDark.value,
  'border-gray-600 bg-gray-700 text-white placeholder-gray-400': isDark.value
}))

// Avatar gradient based on theme
const avatarClass = computed(() => ({
  'bg-gradient-to-br from-emerald-400 to-emerald-600': true
}))

// Upload button styling
const uploadButtonClass = computed(() => ({
  'shadow-md rounded-full transition': true,
  'bg-white hover:bg-gray-50': !isDark.value,
  'bg-gray-700 hover:bg-gray-600': isDark.value
}))

// Upload icon color
const uploadIconClass = computed(() => ({
  'text-gray-600': !isDark.value,
  'text-gray-300': isDark.value
}))

// Helper text styling
const helperTextClass = computed(() => ({
  'text-sm mb-1': true,
  'text-gray-600': !isDark.value,
  'text-gray-400': isDark.value
}))

// Change photo link styling
const changePhotoClass = computed(() => ({
  'text-sm font-medium transition': true,
  'text-emerald-600 hover:text-emerald-700': !isDark.value,
  'text-emerald-400 hover:text-emerald-300': isDark.value
}))

// Success message styling
const successTextClass = computed(() => ({
  'text-green-600': !isDark.value,
  'text-green-400': isDark.value
}))

// Submit button styling
const submitButtonClass = computed(() => ({
  'px-6 py-2 font-medium rounded-lg transition shadow-sm': true,
  'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white': true
}))
</script>

<style scoped>
textarea {
  resize: vertical;
  min-height: 80px;
}

/* Smooth transition for all theme changes */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
</style>