<template>
  <!-- 
    User Login Component with Full Theme Support
    - Preserves original dark green theme
    - Adds light mode alternative with modern design
    - All elements adapt dynamically to theme changes
    - Maintains original structure and functionality
  -->
  <div 
    class="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
    :class="backgroundClass"
  >
    <div class="w-full max-w-md">
      <!-- Main Card -->
      <div 
        class="rounded-2xl shadow-2xl p-8 transition-all duration-300"
        :class="cardClass"
      >
        <!-- Logo / Brand -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold tracking-wider transition-colors duration-300" :class="logoClass">
            GRIDS
          </h1>
          <p class="text-sm mt-1 transition-colors duration-300" :class="taglineClass">
            mapping better decisions
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Field -->
          <div>
            <label class="block text-sm font-medium mb-1 transition-colors duration-300" :class="labelClass">
              Username
            </label>
            <input
              type="text"
              v-model="username"
              class="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
              :class="inputClass"
              placeholder="Enter your username"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium mb-1 transition-colors duration-300" :class="labelClass">
              Password
            </label>
            <input
              type="password"
              v-model="password"
              class="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2"
              :class="inputClass"
              placeholder="Enter your password"
            />
          </div>

          <!-- Forgot Password Link -->
          <div class="text-right">
            <a 
              href="#" 
              class="text-sm transition-colors duration-300 hover:underline"
              :class="forgotLinkClass"
            >
              Forgot Password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full font-bold py-3 rounded-xl transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            :class="buttonClass"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Extra Links -->
        <div class="mt-8 text-center space-y-3">
          <div class="text-sm transition-colors duration-300" :class="extraLinkClass">
            Don't have an account?
            <a href="#" class="font-semibold hover:underline ml-1 transition-colors duration-300" :class="linkHighlightClass">
              Click Here
            </a>
          </div>
          <div class="text-sm transition-colors duration-300" :class="extraLinkClass">
            Back to home?
            <a href="/" class="font-semibold hover:underline ml-1 transition-colors duration-300" :class="linkHighlightClass">
              Click here
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'UserLogin',
  setup() {
    const router = useRouter()
    
    // Inject theme from App.vue for global theme access
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Create reactive theme detection
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // Form state
    const username = ref('')
    const password = ref('')
    const isLoading = ref(false)
    
    // --- Theme-aware CSS Classes ---
    // These classes ensure the login page looks great in both themes
    // while preserving the original dark theme design
    
    // Background gradient based on theme
    const backgroundClass = computed(() => ({
      // Dark mode: Original dark green gradient
      'bg-gradient-to-br from-[#0B2B26] via-[#1A4A3A] to-[#0B2B26]': isDark.value,
      // Light mode: Light gradient with emerald accents
      'bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100': !isDark.value
    }))
    
    // Card styling based on theme
    const cardClass = computed(() => ({
      // Dark mode: Semi-transparent dark card with border
      'bg-white/10 backdrop-blur-lg border border-white/20': isDark.value,
      // Light mode: Solid white card with shadow
      'bg-white shadow-xl border border-gray-100': !isDark.value
    }))
    
    // Logo text color
    const logoClass = computed(() => ({
      'text-white': isDark.value,
      'text-gray-800': !isDark.value
    }))
    
    // Tagline text color
    const taglineClass = computed(() => ({
      'text-emerald-200': isDark.value,
      'text-emerald-600': !isDark.value
    }))
    
    // Label text color
    const labelClass = computed(() => ({
      'text-emerald-100': isDark.value,
      'text-gray-700': !isDark.value
    }))
    
    // Input field styling
    const inputClass = computed(() => ({
      // Dark mode: Semi-transparent with light border
      'bg-white/20 border border-emerald-300/40 text-white placeholder-emerald-200/60 focus:ring-emerald-400 focus:border-transparent': isDark.value,
      // Light mode: White background with gray border
      'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500': !isDark.value
    }))
    
    // Forgot password link styling
    const forgotLinkClass = computed(() => ({
      'text-emerald-300 hover:text-emerald-100': isDark.value,
      'text-emerald-600 hover:text-emerald-700': !isDark.value
    }))
    
    // Login button styling
    const buttonClass = computed(() => ({
      // Dark mode: Original gradient
      'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white': isDark.value,
      // Light mode: Solid emerald gradient with better contrast
      'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white': !isDark.value
    }))
    
    // Extra links container text color
    const extraLinkClass = computed(() => ({
      'text-emerald-200': isDark.value,
      'text-gray-600': !isDark.value
    }))
    
    // Highlighted link color (for "Click Here" etc.)
    const linkHighlightClass = computed(() => ({
      'text-white hover:text-emerald-200': isDark.value,
      'text-emerald-600 hover:text-emerald-700': !isDark.value
    }))
    
    // Handle login functionality
    const handleLogin = async () => {
      // Sample credentials validation
      const credentials = {
        admin: { username: 'admin', password: 'admin', role: 'admin' },
        student: { username: 'student', password: 'student', role: 'student' }
      }

      // Check if credentials match admin or student
      let userRole = null

      if (username.value === credentials.admin.username && password.value === credentials.admin.password) {
        userRole = 'admin'
      } else if (username.value === credentials.student.username && password.value === credentials.student.password) {
        userRole = 'student'
      }

      if (userRole) {
        isLoading.value = true
        
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          username: username.value,
          role: userRole,
          loggedInAt: new Date().toISOString()
        }))
        
        // Simulate loading delay
        setTimeout(() => {
          isLoading.value = false
          
          // Redirect based on role using Vue Router
          if (userRole === 'admin') {
            router.push('/admin/dashboard')
          } else if (userRole === 'student') {
            router.push('/student/dashboard')
          }
        }, 1000)
      } else {
        // Show error message with theme-aware styling
        alert('Invalid credentials! Use admin/admin or student/student')
      }
    }
    
    return {
      // Theme detection
      isDark,
      
      // Form state
      username,
      password,
      isLoading,
      
      // Theme-aware classes
      backgroundClass,
      cardClass,
      logoClass,
      taglineClass,
      labelClass,
      inputClass,
      forgotLinkClass,
      buttonClass,
      extraLinkClass,
      linkHighlightClass,
      
      // Methods
      handleLogin
    }
  }
}
</script>

<style scoped>
/* 
  Custom styles for autofill and smooth transitions
  - Prevents browser autofill from breaking theme styling
  - Adds smooth transitions for all theme changes
*/

/* Autofill styling for dark mode */
.dark input:-webkit-autofill,
.dark input:-webkit-autofill:focus {
  -webkit-text-fill-color: white !important;
  -webkit-box-shadow: 0 0 0px 1000px rgba(16, 185, 129, 0.2) inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Autofill styling for light mode */
:root:not(.dark) input:-webkit-autofill,
:root:not(.dark) input:-webkit-autofill:focus {
  -webkit-text-fill-color: #1f2937 !important;
  -webkit-box-shadow: 0 0 0px 1000px #f3f4f6 inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Smooth transition for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Input focus enhancements */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Button hover animation */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:active::before {
  width: 300px;
  height: 300px;
}

/* Card entrance animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.w-full.max-w-md {
  animation: fadeInUp 0.6s ease-out;
}

/* Focus visible for accessibility */
input:focus-visible,
button:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .rounded-2xl {
    border-radius: 1rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
}

/* Loading state animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

button:disabled {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Custom placeholder styling */
input::placeholder {
  transition: color 0.3s ease;
}

/* Dark mode specific placeholder */
.dark input::placeholder {
  color: rgba(209, 250, 229, 0.6);
}

/* Light mode specific placeholder */
:root:not(.dark) input::placeholder {
  color: #9ca3af;
}

/* Link hover effects */
a {
  position: relative;
  display: inline-block;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  transition: width 0.3s ease;
}

.dark a::after {
  background-color: #6ee7b7;
}

:root:not(.dark) a::after {
  background-color: #059669;
}

a:hover::after {
  width: 100%;
}
</style>