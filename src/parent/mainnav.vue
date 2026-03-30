<template>
  <!-- 
    Main Navigation Sidebar with Theme Support
    - Uses CSS variables for dynamic theming
    - Includes a theme toggle button for switching between light/dark modes
    - Maintains the original design but makes it theme-aware
    - Enhanced active state highlighting to show current page
    - Added confirmation modal for logout with full theme support
  -->
  <aside 
    class="fixed left-0 top-0 h-full w-64 shadow-xl z-10 transition-colors duration-300"
    :class="themeClasses"
  >
    <div class="p-6">
      <div class="text-center mb-8">
        <!-- Logo section with dynamic text colors based on theme -->
        <h1 class="text-2xl font-bold" :class="logoTextClass">GRIDS</h1>
        <p class="text-xs mt-1" :class="taglineClass">mapping better decisions</p>
      </div>
      
      <nav class="space-y-2">
        <!-- Dashboard Link - Enhanced active state with persistent highlight -->
        <router-link 
          to="/admin/dashboard" 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative"
          :class="[navLinkClass, getActiveClass('/admin/dashboard')]"
          active-class=""
          exact-active-class=""
        >
          <!-- Active indicator bar (left border) -->
          <div 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
            :class="getActiveIndicatorClass('/admin/dashboard')"
          ></div>
          
          <svg class="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span>Dashboard</span>
          
          <!-- Optional: Show active badge -->
          <span 
            v-if="isActive('/admin/dashboard')"
            class="ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
            :class="activeBadgeClass"
          >
          </span>
        </router-link>
        
        <!-- Courses Link -->
        <router-link 
          to="/admin/courses" 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative"
          :class="[navLinkClass, getActiveClass('/admin/courses')]"
          active-class=""
          exact-active-class=""
        >
          <div 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
            :class="getActiveIndicatorClass('/admin/courses')"
          ></div>
          
          <svg class="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span>Courses</span>
          
          <span 
            v-if="isActive('/admin/courses')"
            class="ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
            :class="activeBadgeClass"
          >
          </span>
        </router-link>
        
        <!-- Events Link -->
        <router-link 
          to="/admin/events" 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative"
          :class="[navLinkClass, getActiveClass('/admin/events')]"
          active-class=""
          exact-active-class=""
        >
          <div 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
            :class="getActiveIndicatorClass('/admin/events')"
          ></div>
          
          <svg class="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span>Events</span>
          
          <span 
            v-if="isActive('/admin/events')"
            class="ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
            :class="activeBadgeClass"
          >
          </span>
        </router-link>
        
        <!-- Affiliate Link -->
        <router-link 
          to="/admin/affiliate" 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative"
          :class="[navLinkClass, getActiveClass('/admin/affiliate')]"
          active-class=""
          exact-active-class=""
        >
          <div 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
            :class="getActiveIndicatorClass('/admin/affiliate')"
          ></div>
          
          <svg class="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>Affiliate</span>
          
          <span 
            v-if="isActive('/admin/affiliate')"
            class="ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
            :class="activeBadgeClass"
          >
          </span>
        </router-link>
        
        <!-- My Profile Link -->
        <router-link 
          to="/admin/profile" 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative"
          :class="[navLinkClass, getActiveClass('/admin/profile')]"
          active-class=""
          exact-active-class=""
        >
          <div 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
            :class="getActiveIndicatorClass('/admin/profile')"
          ></div>
          
          <svg class="w-5 h-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span>My Profile</span>
          
          <span 
            v-if="isActive('/admin/profile')"
            class="ml-auto text-xs px-2 py-0.5 rounded-full transition-colors duration-300"
            :class="activeBadgeClass"
          >
          </span>
        </router-link>
      </nav>
    </div>
    
    <!-- Theme Toggle Button Section -->
    <div class="px-6 mb-4">
      <button
        @click="toggleTheme"
        class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300"
        :class="themeToggleClass"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <div class="flex items-center space-x-3">
          <span class="text-xl">{{ isDark ? '🌙' : '☀️' }}</span>
          <span class="text-sm font-medium">{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
        </div>
        <div 
          class="w-8 h-4 rounded-full transition-all duration-300"
          :class="toggleIndicatorClass"
        >
          <div 
            class="w-3 h-3 rounded-full transition-all duration-300 transform"
            :class="toggleCircleClass"
          ></div>
        </div>
      </button>
    </div>
    
    <!-- Footer / Admin Account Section -->
    <div class="absolute bottom-0 left-0 right-0 p-6">
      <!-- Admin info card with theme-aware styling -->
      <div class="mb-4 px-4 py-3 rounded-lg transition-colors duration-300" :class="adminCardClass">
        <p class="text-xs" :class="adminLabelClass">admin account</p>
        <p class="text-sm font-medium" :class="adminEmailClass">admin@gmail.com</p>
      </div>
      
      <!-- Logout button with confirmation modal trigger -->
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
import { useRouter, useRoute } from 'vue-router'
import { inject, computed, ref } from 'vue'

export default {
  name: 'MainNav',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // Modal state
    const showLogoutModal = ref(false)
    
    // Inject the theme functionality from App.vue
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      toggleTheme: () => {},
      isDark: () => false
    })
    
    const { toggleTheme, isDark: isDarkFn, currentTheme } = theme
    const isDark = computed(() => {
      return currentTheme?.value === 'dark' || isDarkFn?.()
    })
    
    const currentPath = computed(() => route.path)
    
    const isActive = (path) => {
      return currentPath.value === path
    }
    
    const getActiveClass = (path) => {
      return isActive(path) ? 'active-nav-item' : ''
    }
    
    const getActiveIndicatorClass = (path) => {
      if (!isActive(path)) return 'opacity-0'
      
      return computed(() => ({
        'bg-emerald-500': !isDark.value,
        'bg-emerald-400': isDark.value
      })).value
    }
    
    // Open logout confirmation modal
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
    
    // --- Theme-aware CSS Classes ---
    const themeClasses = computed(() => ({
      'bg-gradient-to-b from-gray-100 to-gray-200 border-r border-gray-300': !isDark.value,
      'bg-gradient-to-b from-[#0B2B26] to-[#1A4A3A]': isDark.value
    }))
    
    const logoTextClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    const taglineClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-300': isDark.value
    }))
    
    const navLinkClass = computed(() => ({
      'text-gray-600 hover:bg-emerald-100 hover:text-emerald-700': !isDark.value,
      'text-gray-300 hover:bg-emerald-700/30 hover:text-white': isDark.value
    }))
    
    const activeBadgeClass = computed(() => ({
      'bg-emerald-100 text-emerald-700': !isDark.value,
      'bg-emerald-800 text-emerald-200': isDark.value
    }))
    
    const themeToggleClass = computed(() => ({
      'bg-gray-200 hover:bg-gray-300 text-gray-700': !isDark.value,
      'bg-emerald-800/30 hover:bg-emerald-700/50 text-white': isDark.value
    }))
    
    const toggleIndicatorClass = computed(() => ({
      'bg-gray-400': !isDark.value,
      'bg-emerald-500': isDark.value
    }))
    
    const toggleCircleClass = computed(() => ({
      'translate-x-0 bg-white': !isDark.value,
      'translate-x-4 bg-emerald-200': isDark.value
    }))
    
    const adminCardClass = computed(() => ({
      'bg-emerald-100': !isDark.value,
      'bg-emerald-800/30': isDark.value
    }))
    
    const adminLabelClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-300': isDark.value
    }))
    
    const adminEmailClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-white': isDark.value
    }))
    
    const logoutButtonClass = computed(() => ({
      'bg-red-100 text-red-700 hover:bg-red-200': !isDark.value,
      'bg-red-500/20 text-red-200 hover:bg-red-500/30 hover:text-white': isDark.value
    }))
    
    // Modal theme-aware classes
    const modalContainerClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value
    }))
    
    const modalIconBgClass = computed(() => ({
      'bg-red-100': !isDark.value,
      'bg-red-900/30': isDark.value
    }))
    
    const modalIconClass = computed(() => ({
      'text-red-600': !isDark.value,
      'text-red-400': isDark.value
    }))
    
    const modalTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    const modalTextClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const modalSubtextClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const modalCancelButtonClass = computed(() => ({
      'bg-gray-200 text-gray-700 hover:bg-gray-300': !isDark.value,
      'bg-gray-700 text-gray-300 hover:bg-gray-600': isDark.value
    }))
    
    const modalConfirmButtonClass = computed(() => ({
      'bg-red-500 text-white hover:bg-red-600': !isDark.value,
      'bg-red-600 text-white hover:bg-red-700': isDark.value
    }))
    
    const modalCloseButtonClass = computed(() => ({
      'hover:bg-gray-100 text-gray-400 hover:text-gray-600': !isDark.value,
      'hover:bg-gray-700 text-gray-500 hover:text-gray-300': isDark.value
    }))
    
    return {
      isDark,
      toggleTheme,
      
      currentPath,
      isActive,
      getActiveClass,
      getActiveIndicatorClass,
      
      // Modal state and methods
      showLogoutModal,
      openLogoutModal,
      closeLogoutModal,
      confirmLogout,
      
      // Theme-aware classes
      themeClasses,
      logoTextClass,
      taglineClass,
      navLinkClass,
      activeBadgeClass,
      themeToggleClass,
      toggleIndicatorClass,
      toggleCircleClass,
      adminCardClass,
      adminLabelClass,
      adminEmailClass,
      logoutButtonClass,
      
      // Modal theme classes
      modalContainerClass,
      modalIconBgClass,
      modalIconClass,
      modalTitleClass,
      modalTextClass,
      modalSubtextClass,
      modalCancelButtonClass,
      modalConfirmButtonClass,
      modalCloseButtonClass
    }
  }
}
</script>

<style scoped>
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.active-nav-item {
  position: relative;
  font-weight: 500;
}

:root:not(.dark) .active-nav-item {
  background-color: rgba(16, 185, 129, 0.15) !important;
  color: #059669 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.dark .active-nav-item {
  background-color: rgba(16, 185, 129, 0.25) !important;
  color: #6ee7b7 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.active-nav-item .absolute {
  opacity: 1 !important;
}

.router-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
}

.router-link:hover {
  transform: translateX(4px);
}

.active-nav-item:hover {
  transform: translateX(2px);
}

.group:hover svg {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

.active-nav-item svg {
  stroke-width: 2.5;
}

:root:not(.dark) .active-nav-item svg {
  stroke: #059669;
}

.dark .active-nav-item svg {
  stroke: #6ee7b7;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.active-nav-item .absolute {
  animation: pulse 2s ease-in-out infinite;
}

button, .router-link {
  transition: all 0.3s ease;
}

button:active, .router-link:active {
  transform: scale(0.98);
}

aside::-webkit-scrollbar {
  width: 5px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 10px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}

.router-link:focus-visible,
button:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

.active-badge {
  position: relative;
}

.active-badge:hover::after {
  content: "Current page";
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 20;
  pointer-events: none;
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Modal content scale animation */
.modal-enter-active .rounded-2xl,
.modal-leave-active .rounded-2xl {
  transition: transform 0.3s ease;
}

.modal-enter-from .rounded-2xl,
.modal-leave-to .rounded-2xl {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .router-link:hover {
    transform: translateX(2px);
  }
}
</style>