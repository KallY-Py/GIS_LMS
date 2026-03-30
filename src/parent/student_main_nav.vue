<template>
  <aside 
    :class="sidebarClass"
    class="fixed left-0 top-0 h-full w-64 shadow-xl z-10 flex flex-col transition-all duration-300"
  >
    <div class="flex-1 overflow-y-auto">
      <div class="p-6">
        <div class="text-center mb-8">
          <h1 :class="logoClass" class="text-xl font-bold mt-1">GRIDS</h1>
          <p :class="taglineClass" class="text-regular mt-1">mapping better decisions</p>
        </div>

        <nav class="space-y-2">
          <!-- Dashboard -->
          <router-link 
            to="/student/dashboard" 
            :class="navLinkClass"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition group" 
            active-class="bg-emerald-700/50 text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Dashboard</span>
          </router-link>
          
          <!-- My Courses -->
          <router-link 
            to="/student/courses" 
            :class="navLinkClass"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition group" 
            active-class="bg-emerald-700/50 text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>My Courses</span>
            <span 
              v-if="inProgressCount > 0" 
              :class="badgeClass"
              class="ml-auto text-white text-xs px-2 py-0.5 rounded-full"
            >
              {{ inProgressCount }}
            </span>
          </router-link>
          
          <!-- Events -->
          <router-link 
            to="/student/events" 
            :class="navLinkClass"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition group" 
            active-class="bg-emerald-700/50 text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"></path>
            </svg>
            <span>Events</span>
            <span 
              v-if="eventCount > 0" 
              :class="badgeClass"
              class="ml-auto text-white text-xs px-2 py-0.5 rounded-full"
            >
              {{ eventCount }}
            </span>
          </router-link>
          
          <!-- Affiliate -->
          <router-link 
            to="/student/affiliate" 
            :class="navLinkClass"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition group" 
            active-class="bg-emerald-700/50 text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            <span>Affiliate</span>
          </router-link>
          
          <!-- Profile -->
          <router-link 
            to="/student/profile" 
            :class="navLinkClass"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition group" 
            active-class="bg-emerald-700/50 text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>My Profile</span>
          </router-link>

          <!-- Dark Mode Toggle Button -->
          <button 
            @click="toggleTheme" 
            :class="[navLinkClass, themeButtonActiveClass]"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 w-full group"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
            <span class="ml-auto text-xs opacity-60">{{ isDark ? '🌙' : '☀️' }}</span>
          </button>
        </nav>
      </div>
    </div>
    
    <!-- Footer / Student Account -->
    <div :class="footerClass" class="flex-shrink-0 p-6 border-t transition-all duration-300">
      <div :class="accountCardClass" class="mb-4 px-4 py-3 rounded-lg transition-all duration-300">
        <p :class="accountLabelClass" class="text-xs">student account</p>
        <p :class="accountEmailClass" class="text-sm font-medium truncate">{{ studentEmail }}</p>
      </div>
      
      <button 
        @click="openLogoutModal" 
        class="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300"
        :class="logoutButtonClass"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span>Logout</span>
      </button>
    </div>

    <!-- Logout Confirmation Modal -->
    <div 
      v-if="showLogoutModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300"
      @click.self="closeLogoutModal"
    >
      <div 
        class="rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
        :class="modalContainerClass"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="modalIconBgClass">
              <svg class="w-6 h-6" :class="modalIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold" :class="modalTitleClass">Confirm Logout</h3>
          </div>
          <button 
            @click="closeLogoutModal"
            class="p-1 rounded-full transition-colors duration-200"
            :class="modalCloseButtonClass"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="mb-6">
          <p class="mb-2" :class="modalTextClass">Are you sure you want to logout?</p>
          <p class="text-sm" :class="modalSubtextClass">You will need to login again to access your account.</p>
        </div>
        
        <!-- Modal Footer with Actions -->
        <div class="flex space-x-3">
          <button 
            @click="closeLogoutModal"
            class="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="modalCancelButtonClass"
          >
            Cancel
          </button>
          <button 
            @click="confirmLogout"
            class="flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            :class="modalConfirmButtonClass"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'StudentNav',
  setup() {
    const router = useRouter()
    
    // Inject theme from parent (App.vue)
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Reactive dark mode check
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // Toggle theme function
    const toggleTheme = () => {
      if (theme?.currentTheme) {
        const newTheme = isDark.value ? 'light' : 'dark'
        theme.currentTheme.value = newTheme
        localStorage.setItem('theme', newTheme)
        
        // Apply theme class to document root
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    }

    const showLogoutModal = ref(false)

    // Theme-aware CSS Classes
    const sidebarClass = computed(() => ({
      'bg-gradient-to-b from-[#A7F0D5] to-[#396555]': !isDark.value,
      'bg-gradient-to-b from-gray-800 to-gray-900': isDark.value
    }))
    
    const logoClass = computed(() => ({
      'text-emerald-800': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    const taglineClass = computed(() => ({
      'text-gray-600': !isDark.value,
      'text-gray-400': isDark.value
    }))

    const openLogoutModal = () => {
      showLogoutModal.value = true
    }
    
    // Close logout confirmation modal
    const closeLogoutModal = () => {
      showLogoutModal.value = false
    }
    
    // Confirm logout and perform logout action
    const confirmLogout = () => {
      localStorage.removeItem('user')
      closeLogoutModal()
      router.push('/')
    }
    
    // Unverified Banner Classes
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
    
    // Navigation Link Classes
    const navLinkClass = computed(() => ({
      'text-gray-300 hover:bg-emerald-700/30 hover:text-white': !isDark.value,
      'text-gray-400 hover:bg-gray-700 hover:text-white': isDark.value
    }))
    
    const themeButtonActiveClass = computed(() => ({
      'bg-emerald-700/50 text-white': isDark.value
    }))
    
    const badgeClass = computed(() => ({
      'bg-emerald-500': !isDark.value,
      'bg-emerald-600': isDark.value
    }))
    
    // Footer Classes
    const footerClass = computed(() => ({
      'border-emerald-700/30': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    const accountCardClass = computed(() => ({
      'bg-emerald-800/30': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    const accountLabelClass = computed(() => ({
      'text-emerald-300': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const accountEmailClass = computed(() => ({
      'text-white': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    const logoutButtonClass = computed(() => ({
      'bg-red-500/20 text-red-200 hover:bg-red-500/30 hover:text-white': !isDark.value,
      'bg-red-600/20 text-red-300 hover:bg-red-600/30 hover:text-white': isDark.value
    }))
    
    // Student data
    const studentEmail = ref('student@gmail.com')
    const inProgressCount = ref(2)
    const certificateCount = ref(2)
    const overallProgress = ref(68)
    const isVerified = ref(false)
    const eventCount = ref(3)
    
    const logout = () => {
      localStorage.removeItem('user')
      router.push('/')
    }
    
    const verifyAccount = () => {
      router.push('/verify-account')
    }
    
    // Fetch student data on mount
    onMounted(() => {
      // Get student info from localStorage or store
      const user = localStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        if (userData.email) {
          studentEmail.value = userData.email
        }
        if (userData.isVerified !== undefined) {
          isVerified.value = userData.isVerified
        }
      }
    })
    
    return {
      // Theme state
      isDark,
      toggleTheme,

      showLogoutModal,
      openLogoutModal,
      closeLogoutModal,
      confirmLogout,
      
      
      // Theme-aware classes
      sidebarClass,
      logoClass,
      taglineClass,
      bannerClass,
      bannerIconClass,
      bannerTitleClass,
      verifyButtonClass,
      navLinkClass,
      themeButtonActiveClass,
      badgeClass,
      footerClass,
      accountCardClass,
      accountLabelClass,
      accountEmailClass,
      logoutButtonClass,
      
      // Data
      studentEmail,
      inProgressCount,
      certificateCount,
      overallProgress,
      isVerified,
      eventCount,
      
      // Methods
      logout,
      verifyAccount
    }
  }
}
</script>

<style scoped>
/* Smooth transitions for active states */
.router-link-active {
  background-color: rgba(16, 185, 129, 0.5);
  color: white;
}

/* Dark mode active state override */
.dark .router-link-active {
  background-color: rgba(16, 185, 129, 0.3);
}

/* Button transitions */
button {
  transition: all 0.3s ease;
}

button:active {
  transform: scale(0.98);
}

/* Hover animations */
.group:hover svg {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

svg {
  transition: transform 0.2s ease;
}

/* Custom scrollbar for sidebar if content overflows */
aside {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #2C7A5E #1A4A3A;
}

.dark aside {
  scrollbar-color: #4B5563 #1F2937;
}

aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #1A4A3A;
}

.dark aside::-webkit-scrollbar-track {
  background: #1F2937;
}

aside::-webkit-scrollbar-thumb {
  background: #2C7A5E;
  border-radius: 4px;
}

.dark aside::-webkit-scrollbar-thumb {
  background: #4B5563;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #3B9B78;
}

.dark aside::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}

/* Truncate long email */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Smooth transitions for all theme changes */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>