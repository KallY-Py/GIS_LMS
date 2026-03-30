<template>
  <!-- 
    Landing Page Component with Full Theme Support
    - Preserves original design while adding theme awareness
    - All sections adapt to light/dark mode
    - Maintains original structure and functionality
    - Smooth transitions between themes
  -->
  <div 
    class="min-h-screen transition-colors duration-300"
    :class="pageBackgroundClass"
  >
    <!-- Hero Section -->
    <section class="relative py-20 transition-colors duration-300" :class="heroSectionClass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300" :class="heroTitleClass">
          GIS Training & Solutions
        </h1>
        <p class="text-xl md:text-2xl mb-8 transition-colors duration-300" :class="heroSubtitleClass">
          Mapping better decisions for a sustainable future
        </p>
        <button 
          @click="goToLogin" 
          class="px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
          :class="ctaButtonClass"
        >
          Get Started Today
        </button>
      </div>
    </section>

    <!-- Featured Courses Section -->
    <section id="courses" class="py-16 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 transition-colors duration-300" :class="sectionTitleClass">
          Featured Courses
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="course in featuredCourses" 
            :key="course.id" 
            class="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            :class="courseCardClass"
          >
            <!-- Course Icon/Image Section -->
            <div 
              class="h-48 flex items-center justify-center transition-colors duration-300"
              :class="courseIconBgClass"
            >
              <svg class="w-16 h-16 transition-colors duration-300" :class="courseIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            
            <!-- Course Content -->
            <div class="p-6 transition-colors duration-300" :class="courseContentClass">
              <h3 class="text-xl font-semibold mb-2 transition-colors duration-300" :class="courseTitleClass">
                {{ course.title }}
              </h3>
              <p class="mb-4 transition-colors duration-300" :class="courseDescriptionClass">
                {{ course.description }}
              </p>
              <a 
                :href="course.link" 
                target="_blank" 
                class="font-medium inline-flex items-center transition-colors duration-300 hover:underline"
                :class="courseLinkClass"
              >
                Learn More
                <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section (Optional - You can add more sections) -->
    <section class="py-16 transition-colors duration-300" :class="featuresSectionClass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12 transition-colors duration-300" :class="sectionTitleClass">
          Why Choose GRIDS?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 rounded-xl transition-all duration-300" :class="featureCardClass">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300" :class="featureIconBgClass">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 transition-colors duration-300" :class="featureTitleClass">
              Expert Training
            </h3>
            <p class="transition-colors duration-300" :class="featureDescriptionClass">
              Learn from industry professionals with years of GIS experience
            </p>
          </div>

          <div class="text-center p-6 rounded-xl transition-all duration-300" :class="featureCardClass">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300" :class="featureIconBgClass">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 21v-4H7v4M7 3v4h10V3"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 transition-colors duration-300" :class="featureTitleClass">
              Hands-on Projects
            </h3>
            <p class="transition-colors duration-300" :class="featureDescriptionClass">
              Apply your knowledge with real-world mapping projects
            </p>
          </div>

          <div class="text-center p-6 rounded-xl transition-all duration-300" :class="featureCardClass">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300" :class="featureIconBgClass">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 transition-colors duration-300" :class="featureTitleClass">
              Flexible Learning
            </h3>
            <p class="transition-colors duration-300" :class="featureDescriptionClass">
              Learn at your own pace with our self-paced courses
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 transition-colors duration-300" :class="ctaSectionClass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4 transition-colors duration-300" :class="ctaTitleClass">
          Ready to Start Your GIS Journey?
        </h2>
        <p class="text-lg mb-8 transition-colors duration-300" :class="ctaDescriptionClass">
          Join thousands of students who have transformed their careers with GRIDS
        </p>
        <button 
          @click="goToLogin" 
          class="px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
          :class="ctaButtonClass"
        >
          Enroll Now
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'LandingPageContent',
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
    
    // Navigation function
    const goToLogin = () => {
      router.push('/login')
    }
    
    // Course data
    const featuredCourses = ref([
      {
        id: 1,
        title: 'BotPmy 101: The Sellout Life of PiPints',
        description: 'A story about a boy who is forced to sell his soul to the devil.',
        link: 'https://www.botpmy.com'
      },
      {
        id: 2,
        title: 'AdvMind Sold Silkenlila',
        description: 'An AI-powered platform that helps people make better decisions.',
        link: 'https://www.advmind.com'
      },
      {
        id: 3,
        title: 'Elbasystem Conservation',
        description: 'A project to restore the Amazon rainforest.',
        link: 'https://www.elbasystem.org'
      }
    ])
    
    // --- Theme-aware CSS Classes ---
    
    // Page background
    const pageBackgroundClass = computed(() => ({
      'bg-gradient-to-b from-gray-900 to-gray-800': isDark.value,
      'bg-gradient-to-b from-gray-50 to-white': !isDark.value
    }))
    
    // Hero section background
    const heroSectionClass = computed(() => ({
      // Dark mode: Darker gradient
      'bg-gradient-to-r from-emerald-800 to-teal-800': isDark.value,
      // Light mode: Original gradient
      'bg-gradient-to-r from-emerald-600 to-teal-600': !isDark.value
    }))
    
    // Hero title
    const heroTitleClass = computed(() => ({
      'text-white': true // Always white for hero section
    }))
    
    // Hero subtitle
    const heroSubtitleClass = computed(() => ({
      'text-emerald-200': isDark.value,
      'text-emerald-100': !isDark.value
    }))
    
    // Section title
    const sectionTitleClass = computed(() => ({
      'text-white': isDark.value,
      'text-gray-800': !isDark.value
    }))
    
    // Course card background
    const courseCardClass = computed(() => ({
      'bg-gray-800 hover:bg-gray-750': isDark.value,
      'bg-white hover:shadow-xl': !isDark.value
    }))
    
    // Course icon background
    const courseIconBgClass = computed(() => ({
      'bg-gradient-to-br from-emerald-700 to-teal-800': isDark.value,
      'bg-gradient-to-br from-emerald-400 to-teal-500': !isDark.value
    }))
    
    // Course icon color
    const courseIconClass = computed(() => ({
      'text-white': true
    }))
    
    // Course content background
    const courseContentClass = computed(() => ({
      'bg-gray-800': isDark.value,
      'bg-white': !isDark.value
    }))
    
    // Course title
    const courseTitleClass = computed(() => ({
      'text-white': isDark.value,
      'text-gray-800': !isDark.value
    }))
    
    // Course description
    const courseDescriptionClass = computed(() => ({
      'text-gray-400': isDark.value,
      'text-gray-600': !isDark.value
    }))
    
    // Course link
    const courseLinkClass = computed(() => ({
      'text-emerald-400 hover:text-emerald-300': isDark.value,
      'text-emerald-600 hover:text-emerald-700': !isDark.value
    }))
    
    // Features section background
    const featuresSectionClass = computed(() => ({
      'bg-gray-800/50': isDark.value,
      'bg-gray-50': !isDark.value
    }))
    
    // Feature card background
    const featureCardClass = computed(() => ({
      'bg-gray-800 hover:bg-gray-750': isDark.value,
      'bg-white hover:shadow-lg': !isDark.value
    }))
    
    // Feature icon background
    const featureIconBgClass = computed(() => ({
      'bg-emerald-800/30 text-emerald-400': isDark.value,
      'bg-emerald-100 text-emerald-600': !isDark.value
    }))
    
    // Feature title
    const featureTitleClass = computed(() => ({
      'text-white': isDark.value,
      'text-gray-800': !isDark.value
    }))
    
    // Feature description
    const featureDescriptionClass = computed(() => ({
      'text-gray-400': isDark.value,
      'text-gray-600': !isDark.value
    }))
    
    // CTA section background
    const ctaSectionClass = computed(() => ({
      'bg-gradient-to-r from-emerald-900 to-teal-900': isDark.value,
      'bg-gradient-to-r from-emerald-600 to-teal-600': !isDark.value
    }))
    
    // CTA title
    const ctaTitleClass = computed(() => ({
      'text-white': true
    }))
    
    // CTA description
    const ctaDescriptionClass = computed(() => ({
      'text-emerald-200': true
    }))
    
    // CTA button
    const ctaButtonClass = computed(() => ({
      // Dark mode
      'bg-emerald-500 text-white hover:bg-emerald-600': isDark.value,
      // Light mode
      'bg-white text-emerald-600 hover:bg-gray-100': !isDark.value
    }))
    
    return {
      // Theme detection
      isDark,
      
      // Data
      featuredCourses,
      goToLogin,
      
      // Theme-aware classes
      pageBackgroundClass,
      heroSectionClass,
      heroTitleClass,
      heroSubtitleClass,
      sectionTitleClass,
      courseCardClass,
      courseIconBgClass,
      courseIconClass,
      courseContentClass,
      courseTitleClass,
      courseDescriptionClass,
      courseLinkClass,
      featuresSectionClass,
      featureCardClass,
      featureIconBgClass,
      featureTitleClass,
      featureDescriptionClass,
      ctaSectionClass,
      ctaTitleClass,
      ctaDescriptionClass,
      ctaButtonClass
    }
  }
}
</script>

<style scoped>
/* 
  Custom styles for landing page
  - Smooth transitions for all theme changes
  - Hover effects and animations
  - Responsive design enhancements
*/

/* Smooth transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Course card hover effects */
.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Link hover animation */
a.group:hover svg {
  transform: translateX(4px);
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
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

button:active::before {
  width: 300px;
  height: 300px;
}

/* Section entrance animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section {
  animation: fadeInUp 0.8s ease-out;
}

/* Staggered animation for cards */
.course-card, .feature-card {
  animation: fadeInUp 0.6s ease-out backwards;
}

.course-card:nth-child(1) { animation-delay: 0.1s; }
.course-card:nth-child(2) { animation-delay: 0.2s; }
.course-card:nth-child(3) { animation-delay: 0.3s; }

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-xl {
    font-size: 1.125rem;
  }
  
  .py-20 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  
  .py-16 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #059669;
}

/* Loading skeleton animation (optional) */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Image placeholder effect */
.image-placeholder {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

.dark .image-placeholder {
  background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
}

/* Hover scale effect for cards */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Smooth gradient transitions */
.bg-gradient-to-r,
.bg-gradient-to-br,
.bg-gradient-to-b {
  transition: background-image 0.3s ease;
}
</style>