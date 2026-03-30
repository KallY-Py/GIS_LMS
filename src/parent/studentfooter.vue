<template>
  <!-- 
    Student Footer Component - Reusable Footer for Student Pages
    - Can be imported and used in any student-related pages
    - Supports both light and dark themes
    - Fully responsive design
  -->
  <footer class="transition-colors duration-300" :class="footerClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold mb-4 transition-colors duration-300" :class="footerLogoClass">
            GRIDS
          </h3>
          <p class="text-sm transition-colors duration-300" :class="footerTextClass">
            Mapping better decisions through innovative GIS solutions and training.
          </p>
        </div>

        <!-- Explore Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">
            Explore
          </h4>
          <ul class="space-y-2">
            <li>
              <a href="#courses" class="transition text-sm" :class="footerLinkClass">
                My Courses
              </a>
            </li>
            <li>
              <a href="#assignments" class="transition text-sm" :class="footerLinkClass">
                Assignments
              </a>
            </li>
            <li>
              <a href="#certificates" class="transition text-sm" :class="footerLinkClass">
                Certificates
              </a>
            </li>
            <li>
              <a href="#progress" class="transition text-sm" :class="footerLinkClass">
                Learning Progress
              </a>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">
            Support
          </h4>
          <ul class="space-y-2">
            <li>
              <a href="#help" class="transition text-sm" :class="footerLinkClass">
                Help Center
              </a>
            </li>
            <li>
              <a href="#faq" class="transition text-sm" :class="footerLinkClass">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" class="transition text-sm" :class="footerLinkClass">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#resources" class="transition text-sm" :class="footerLinkClass">
                Student Resources
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links & Newsletter -->
        <div>
          <h4 class="text-lg font-semibold mb-4 transition-colors duration-300" :class="footerHeadingClass">
            Connect With Us
          </h4>
          <ul class="space-y-2 mb-4">
            <li>
              <a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                </svg>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.74-12.137c0-.213-.005-.425-.015-.636A9.936 9.936 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
            </li>
            <li>
              <a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" class="transition text-sm flex items-center gap-2" :class="footerLinkClass">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                Instagram
              </a>
            </li>
          </ul>
          
          <p class="text-sm mb-3 transition-colors duration-300" :class="footerTextClass">
            Stay updated with new courses
          </p>
          <div class="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              class="flex-1 px-3 py-2 rounded-l-lg focus:outline-none transition-colors duration-300"
              :class="newsletterInputClass"
            >
            <button 
              @click="subscribeToNewsletter" 
              class="px-4 py-2 rounded-r-lg transition"
              :class="newsletterButtonClass"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 transition-colors duration-300" :class="footerBorderClass">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex space-x-6 text-sm">
            <a href="#" class="transition" :class="footerLinkClass">Terms & Conditions</a>
            <a href="#" class="transition" :class="footerLinkClass">Privacy Policy</a>
            <a href="#" class="transition" :class="footerLinkClass">Student Code of Conduct</a>
          </div>
          <p class="text-sm transition-colors duration-300" :class="footerTextClass">
            © {{ currentYear }} GRIDS - GIS Training. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { inject, computed, ref } from 'vue'

export default {
  name: 'StudentFooter',
  setup() {
    const currentYear = ref(new Date().getFullYear())
    
    // Inject theme from parent/App.vue for global theme access
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Create reactive theme detection
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // --- Theme-aware CSS Classes ---
    
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
    
    // Newsletter subscription method
    const subscribeToNewsletter = () => {
      // You can implement newsletter subscription logic here
      console.log('Subscribed to newsletter')
      // Emit event if needed
      // emit('subscribe', email)
    }
    
    return {
      // Data
      currentYear,
      
      // Theme
      isDark,
      
      // Theme-aware classes
      footerClass,
      footerLogoClass,
      footerHeadingClass,
      footerTextClass,
      footerLinkClass,
      newsletterInputClass,
      newsletterButtonClass,
      footerBorderClass,
      
      // Methods
      subscribeToNewsletter
    }
  }
}
</script>

<style scoped>
/* 
  Custom styles for smooth scrolling and transitions
  - Ensures all transitions are smooth
  - Adds hover effects for better interactivity
*/

/* Smooth transition for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
  border-radius: 0.5rem;
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

/* Newsletter button hover effect */
button.bg-emerald-600 {
  position: relative;
  overflow: hidden;
}

button.bg-emerald-600:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

button.bg-emerald-600:active {
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    gap: 2rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
  }
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

/* Dark mode specific adjustments */
.dark input::placeholder {
  color: rgba(156, 163, 175, 0.8);
}

/* Light mode specific adjustments */
:root:not(.dark) input::placeholder {
  color: #9ca3af;
}

/* Loading animation for newsletter subscription */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.subscribing {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>

<!-- <template>
  <div>
    <StudentFooter />
  </div>
</template>

<script>
import StudentFooter from '@/parent/studentfooter.vue'

export default {
  components: {
    StudentFooter
  }
}
</script> -->