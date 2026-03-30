<template>
  <!-- 
    Landing Page Component with Full Theme Support
    - Preserves original design in light mode
    - Adds dark mode alternative for better user experience
    - All elements adapt dynamically to theme changes
    - Maintains original structure and functionality
  -->
  <div class="min-h-screen flex flex-col transition-colors duration-300" :class="pageClass">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 shadow-sm z-50 transition-all duration-300" :class="navClass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex flex-col items-start">
            <h1 class="text-2xl font-bold transition-colors duration-300" :class="logoClass">
              GRIDS
            </h1>
            <span class="text-sm transition-colors duration-300" :class="taglineClass">mapping better decisions</span>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#events" class="transition font-medium" :class="navLinkClass">EVENTS</a>
            <a href="#explore" class="transition font-medium" :class="navLinkClass">EXPLORE</a>
            <a href="#courses" class="transition font-medium" :class="navLinkClass">COURSES</a>
            <a href="#affiliate" class="transition font-medium" :class="navLinkClass">AFFILIATE</a>
            <a href="#offer" class="transition font-medium" :class="navLinkClass">OFFER</a>
            <a href="#demo" class="transition font-medium" :class="navLinkClass">DEMO</a>
            
            
            <button 
              @click="goToLogin" 
              class="px-5 py-2 rounded-lg transition shadow-sm font-medium"
              :class="buttonClass"
            >
              GET STARTED
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="focus:outline-none transition-colors duration-300" :class="menuButtonClass">
              <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden py-4 transition-colors duration-300" :class="mobileMenuBorderClass">
          <div class="flex flex-col space-y-3">
            <a href="#events" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">EVENTS</a>
            <a href="#explore" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">EXPLORE</a>
            <a href="#courses" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">COURSES</a>
            <a href="#affiliate" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">AFFILIATE</a>
            <a href="#offer" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">OFFER</a>
            <a href="#demo" @click="mobileMenuOpen = false" class="transition px-2 py-1" :class="navLinkClass">DEMO</a>
            
            
            <button 
              @click="goToLogin" 
              class="px-5 py-2 rounded-lg transition text-center"
              :class="buttonClass"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow pt-16">
      <LandingPageContent />
    </main>

    <!-- Footer -->
    <footer class="transition-colors duration-300" :class="footerClass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-xl font-bold mb-4 transition-colors duration-300" :class="footerLogoClass">GRIDS</h3>
            <p class="text-sm transition-colors duration-300" :class="footerTextClass">Mapping better decisions through innovative GIS solutions and training.</p>
          </div>

          <!-- Explore Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">Explore</h4>
            <ul class="space-y-2">
              <li><a href="#fads" class="transition text-sm" :class="footerLinkClass">FADS</a></li>
              <li><a href="#pricing" class="transition text-sm" :class="footerLinkClass">Pricing</a></li>
              <li><a href="#offer" class="transition text-sm" :class="footerLinkClass">Offer</a></li>
              <li><a href="#learn-more" class="transition text-sm" :class="footerLinkClass">Learn More</a></li>
            </ul>
          </div>

          <!-- Social Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">Connect</h4>
            <ul class="space-y-2">
              <li><a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
                Facebook
              </a></li>
              <li><a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.74-12.137c0-.213-.005-.425-.015-.636A9.936 9.936 0 0024 4.59z"/></svg>
                Instagram
              </a></li>
              <li><a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">Stay Updated</h4>
            <p class="text-sm mb-3 transition-colors duration-300" :class="footerTextClass">Subscribe to our newsletter</p>
            <div class="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                class="flex-1 px-3 py-2 rounded-l-lg focus:outline-none transition-colors duration-300"
                :class="newsletterInputClass"
              >
              <button class="px-4 py-2 rounded-r-lg transition" :class="newsletterButtonClass">Subscribe</button>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 mt-8 transition-colors duration-300" :class="footerBorderClass">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex space-x-6 text-sm">
              <a href="#" class="transition" :class="footerLinkClass">Terms & Conditions</a>
              <a href="#" class="transition" :class="footerLinkClass">Privacy Policy</a>
              <a href="#" class="transition" :class="footerLinkClass">Community Guidelines</a>
            </div>
            <p class="text-sm transition-colors duration-300" :class="footerTextClass">© 2026 GIS TRAINING. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import LandingPageContent from './components/LandingPageContent.vue'

export default {
  name: 'LandingPage',
  components: {
    LandingPageContent
  },
  setup() {
    const router = useRouter()
    const mobileMenuOpen = ref(false)
    
    // Inject theme from App.vue for global theme access
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Create reactive theme detection
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // --- Theme-aware CSS Classes ---
    
    // Main page background
    const pageClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-900': isDark.value
    }))
    
    // Navigation bar styling
    const navClass = computed(() => ({
      'bg-white/95 backdrop-blur-sm': !isDark.value,
      'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800': isDark.value
    }))
    
    // Logo gradient (preserved in both themes)
    const logoClass = computed(() => ({
      'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent': true
    }))
    
    // Tagline text
    const taglineClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Navigation links
    const navLinkClass = computed(() => ({
      'text-gray-700 hover:text-emerald-600': !isDark.value,
      'text-gray-300 hover:text-emerald-400': isDark.value
    }))
    
    // Get Started button
    const buttonClass = computed(() => ({
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700': true
    }))
    
    // Chat button styling
    const chatButtonClass = computed(() => ({
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700': true
    }))
    
    // Mobile menu button
    const menuButtonClass = computed(() => ({
      'text-gray-600 hover:text-emerald-600': !isDark.value,
      'text-gray-300 hover:text-emerald-400': isDark.value
    }))
    
    // Mobile menu border
    const mobileMenuBorderClass = computed(() => ({
      'border-t border-gray-100': !isDark.value,
      'border-t border-gray-800': isDark.value
    }))
    
    // Footer background
    const footerClass = computed(() => ({
      'bg-gray-900': isDark.value,
      'bg-gray-800': !isDark.value
    }))
    
    // Footer logo
    const footerLogoClass = computed(() => ({
      'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent': true
    }))
    
    // Footer headings
    const footerHeadingClass = computed(() => ({
      'text-emerald-400': true
    }))
    
    // Footer text
    const footerTextClass = computed(() => ({
      'text-gray-400': true
    }))
    
    // Footer links
    const footerLinkClass = computed(() => ({
      'text-gray-400 hover:text-white': true
    }))
    
    // Newsletter input styling
    const newsletterInputClass = computed(() => ({
      'bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500': !isDark.value,
      'bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400': isDark.value
    }))
    
    // Newsletter button styling
    const newsletterButtonClass = computed(() => ({
      'bg-emerald-600 hover:bg-emerald-700 text-white': true
    }))
    
    // Footer border
    const footerBorderClass = computed(() => ({
      'border-t border-gray-800': isDark.value,
      'border-t border-gray-700': !isDark.value
    }))
    
    const goToLogin = () => {
      router.push('/login')
    }
    
    const goToChat = () => {
      router.push('/chat')
    }
    
    return {
      // Theme
      isDark,
      
      // State
      mobileMenuOpen,
      
      // Theme-aware classes
      pageClass,
      navClass,
      logoClass,
      taglineClass,
      navLinkClass,
      buttonClass,
      chatButtonClass,
      menuButtonClass,
      mobileMenuBorderClass,
      footerClass,
      footerLogoClass,
      footerHeadingClass,
      footerTextClass,
      footerLinkClass,
      newsletterInputClass,
      newsletterButtonClass,
      footerBorderClass,
      
      // Methods
      goToLogin,
      goToChat
    }
  }
}
</script>

<style scoped>
/* 
  Custom styles for smooth scrolling and transitions
  - Adds smooth scroll behavior
  - Ensures all transitions are smooth
*/

html {
  scroll-behavior: smooth;
}

/* Smooth transition for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Navigation bar blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Hover animation for navigation links */
nav a:not(.bg-gradient-to-r) {
  position: relative;
}

nav a:not(.bg-gradient-to-r)::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  transition: width 0.3s ease;
}

.dark nav a:not(.bg-gradient-to-r)::after {
  background-color: #6ee7b7;
}

:root:not(.dark) nav a:not(.bg-gradient-to-r)::after {
  background-color: #059669;
}

nav a:not(.bg-gradient-to-r):hover::after {
  width: 100%;
}

/* Button hover effect */
button.bg-gradient-to-r {
  position: relative;
  overflow: hidden;
}

button.bg-gradient-to-r::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button.bg-gradient-to-r:active::before {
  width: 300px;
  height: 300px;
}

/* Footer link hover effect */
footer a {
  position: relative;
  display: inline-block;
}

footer a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #6ee7b7;
  transition: width 0.3s ease;
}

footer a:hover::after {
  width: 100%;
}

/* Newsletter input focus effect */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Mobile menu animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.md\:hidden div {
  animation: slideDown 0.3s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex-col.items-start {
    align-items: flex-start;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-sm {
    font-size: 0.7rem;
  }
}

/* Smooth scroll padding for fixed header */
html {
  scroll-padding-top: 64px;
}

/* Dark mode specific adjustments */
.dark input::placeholder {
  color: rgba(156, 163, 175, 0.8);
}

/* Light mode specific adjustments */
:root:not(.dark) input::placeholder {
  color: #9ca3af;
}

/* Newsletter section responsive */
@media (max-width: 640px) {
  .flex {
    flex-direction: column;
  }
  
  .rounded-l-lg,
  .rounded-r-lg {
    border-radius: 0.5rem;
  }
  
  .flex button {
    margin-top: 0.5rem;
  }
}

/* Active link indicator for scroll spy (optional) */
section {
  scroll-margin-top: 80px;
}

/* Loading animation for any async operations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>