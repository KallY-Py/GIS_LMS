<template>
  <!-- 
    Personalization Settings Component for Admin
    - Theme management (Light/Dark/System)
    - Font size preferences
    - Layout density settings
    - Animation preferences
    - Language selection
    - All settings are saved to localStorage
    - Full theme support for the settings panel itself
  -->
  <div class="p-6 min-h-screen transition-colors duration-300" :class="pageBackgroundClass">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 transition-colors duration-300" :class="titleClass">
          Personalization Settings
        </h1>
        <p class="transition-colors duration-300" :class="subtitleClass">
          Customize your experience and appearance preferences
        </p>
      </div>

      <!-- Theme Settings Card -->
      <div class="rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300" :class="cardClass">
        <div class="px-6 py-4 border-b transition-colors duration-300" :class="cardHeaderBorderClass">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" :class="cardHeaderIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <h2 class="text-xl font-semibold transition-colors duration-300" :class="cardTitleClass">
              Theme Preferences
            </h2>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <!-- Theme Mode Selection -->
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
                Theme Mode
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  v-for="mode in themeModes"
                  :key="mode.value"
                  @click="setThemeMode(mode.value)"
                  class="p-4 rounded-lg border-2 transition-all duration-200 text-center"
                  :class="[
                    selectedTheme === mode.value 
                      ? getThemeModeActiveClass(mode.value)
                      : getThemeModeInactiveClass(mode.value),
                    getThemeModeHoverClass(mode.value)
                  ]"
                >
                  <span class="text-2xl block mb-2">{{ mode.icon }}</span>
                  <span class="text-sm font-medium">{{ mode.label }}</span>
                  <span class="text-xs block mt-1 opacity-75">{{ mode.description }}</span>
                </button>
              </div>
            </div>

            <!-- Accent Color Selection -->
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
                Accent Color
              </label>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="color in accentColors"
                  :key="color.value"
                  @click="setAccentColor(color.value)"
                  class="w-10 h-10 rounded-full transition-all duration-200 transform hover:scale-110"
                  :style="{ backgroundColor: color.color }"
                  :class="[
                    selectedAccentColor === color.value 
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
                      : ''
                  ]"
                >
                  <span class="sr-only">{{ color.label }}</span>
                </button>
              </div>
            </div>

            <!-- Preview Section -->
            <div class="mt-6 p-4 rounded-lg transition-colors duration-300" :class="previewBackgroundClass">
              <p class="text-sm mb-2 transition-colors duration-300" :class="previewTextClass">
                Live Preview
              </p>
              <div class="flex space-x-2">
                <button class="px-3 py-1 rounded text-sm transition-all" :class="previewButtonClass">
                  Sample Button
                </button>
                <span class="text-sm" :class="previewAccentTextClass">
                  Sample Text
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appearance Settings Card -->
      <div class="rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300" :class="cardClass">
        <div class="px-6 py-4 border-b transition-colors duration-300" :class="cardHeaderBorderClass">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" :class="cardHeaderIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <h2 class="text-xl font-semibold transition-colors duration-300" :class="cardTitleClass">
              Appearance
            </h2>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <!-- Font Size -->
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
                Font Size
              </label>
              <div class="flex items-center space-x-4">
                <input
                  type="range"
                  v-model="fontSize"
                  min="12"
                  max="18"
                  step="1"
                  class="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                  :class="sliderClass"
                />
                <span class="text-sm font-medium w-12 text-center transition-colors duration-300" :class="valueDisplayClass">
                  {{ fontSize }}px
                </span>
              </div>
              <div class="flex justify-between mt-1 text-xs transition-colors duration-300" :class="labelClass">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
            </div>

            <!-- Layout Density -->
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
                Layout Density
              </label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="density in layoutDensities"
                  :key="density.value"
                  @click="setLayoutDensity(density.value)"
                  class="p-3 rounded-lg border-2 transition-all duration-200 text-center"
                  :class="[
                    layoutDensity === density.value 
                      ? getDensityActiveClass(density.value)
                      : getDensityInactiveClass(density.value)
                  ]"
                >
                  <span class="text-xl block mb-1">{{ density.icon }}</span>
                  <span class="text-xs">{{ density.label }}</span>
                </button>
              </div>
            </div>

            <!-- Animations -->
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium transition-colors duration-300" :class="labelClass">
                  Enable Animations
                </p>
                <p class="text-xs transition-colors duration-300" :class="subtitleClass">
                  Smooth transitions and effects throughout the app
                </p>
              </div>
              <button
                @click="toggleAnimations"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300',
                  enableAnimations ? toggleActiveClass : toggleInactiveClass
                ]"
              >
                <span 
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300',
                    enableAnimations ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Settings Card -->
      <div class="rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300" :class="cardClass">
        <div class="px-6 py-4 border-b transition-colors duration-300" :class="cardHeaderBorderClass">
          <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" :class="cardHeaderIconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h2 class="text-xl font-semibold transition-colors duration-300" :class="cardTitleClass">
              Advanced Settings
            </h2>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <!-- Language Selection -->
            <div>
              <label class="block text-sm font-medium mb-2 transition-colors duration-300" :class="labelClass">
                Language
              </label>
              <select 
                v-model="language"
                class="w-full md:w-64 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                :class="selectClass"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>

            <!-- Reset to Defaults -->
            <div class="pt-4">
              <button
                @click="resetToDefaults"
                class="px-4 py-2 rounded-lg transition-all duration-200"
                :class="resetButtonClass"
              >
                Reset to Default Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Status Message -->
      <div 
        v-if="showSaveMessage"
        class="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
        :class="saveMessageClass"
      >
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Settings saved successfully!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed, ref, watch, onMounted } from 'vue'

export default {
  name: 'PersonalizationSettings',
  setup() {
    // Inject theme from App.vue
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      setTheme: () => {},
      toggleTheme: () => {}
    })
    
    // Reactive theme detection
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark'
    })
    
    // Personalization state
    const selectedTheme = ref('light')
    const selectedAccentColor = ref('emerald')
    const fontSize = ref(14)
    const layoutDensity = ref('comfortable')
    const enableAnimations = ref(true)
    const language = ref('en')
    const showSaveMessage = ref(false)
    
    // Theme modes options
    const themeModes = [
      { value: 'light', label: 'Light', icon: '☀️', description: 'Bright and clean' },
      { value: 'dark', label: 'Dark', icon: '🌙', description: 'Easy on the eyes' },
      { value: 'system', label: 'System', icon: '🖥️', description: 'Follow device settings' }
    ]
    
    // Accent color options
    const accentColors = [
      { value: 'emerald', label: 'Emerald', color: '#10b981' },
      { value: 'blue', label: 'Blue', color: '#3b82f6' },
      { value: 'purple', label: 'Purple', color: '#8b5cf6' },
      { value: 'pink', label: 'Pink', color: '#ec489a' },
      { value: 'red', label: 'Red', color: '#ef4444' },
      { value: 'orange', label: 'Orange', color: '#f97316' }
    ]
    
    // Layout density options
    const layoutDensities = [
      { value: 'compact', label: 'Compact', icon: '📦' },
      { value: 'comfortable', label: 'Comfortable', icon: '📚' },
      { value: 'spacious', label: 'Spacious', icon: '🌟' }
    ]
    
    // Load saved preferences
    const loadPreferences = () => {
      const saved = localStorage.getItem('personalization_preferences')
      if (saved) {
        const data = JSON.parse(saved)
        selectedTheme.value = data.selectedTheme || 'light'
        selectedAccentColor.value = data.selectedAccentColor || 'emerald'
        fontSize.value = data.fontSize || 14
        layoutDensity.value = data.layoutDensity || 'comfortable'
        enableAnimations.value = data.enableAnimations !== undefined ? data.enableAnimations : true
        language.value = data.language || 'en'
        
        // Apply theme
        if (selectedTheme.value === 'dark') {
          theme.setTheme?.('dark')
        } else if (selectedTheme.value === 'light') {
          theme.setTheme?.('light')
        }
      }
    }
    
    // Save preferences
    const savePreferences = () => {
      const preferences = {
        selectedTheme: selectedTheme.value,
        selectedAccentColor: selectedAccentColor.value,
        fontSize: fontSize.value,
        layoutDensity: layoutDensity.value,
        enableAnimations: enableAnimations.value,
        language: language.value,
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem('personalization_preferences', JSON.stringify(preferences))
      
      // Apply font size to document
      document.documentElement.style.fontSize = `${fontSize.value}px`
      
      // Apply layout density class to body
      document.body.classList.remove('density-compact', 'density-comfortable', 'density-spacious')
      document.body.classList.add(`density-${layoutDensity.value}`)
      
      // Show save message
      showSaveMessage.value = true
      setTimeout(() => {
        showSaveMessage.value = false
      }, 3000)
    }
    
    // Reset to defaults
    const resetToDefaults = () => {
      selectedTheme.value = 'light'
      selectedAccentColor.value = 'emerald'
      fontSize.value = 14
      layoutDensity.value = 'comfortable'
      enableAnimations.value = true
      language.value = 'en'
      
      theme.setTheme?.('light')
      savePreferences()
    }
    
    // Set theme mode
    const setThemeMode = (mode) => {
      selectedTheme.value = mode
      if (mode === 'dark') {
        theme.setTheme?.('dark')
      } else if (mode === 'light') {
        theme.setTheme?.('light')
      } else if (mode === 'system') {
        // Check system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.setTheme?.(systemDark ? 'dark' : 'light')
      }
      savePreferences()
    }
    
    // Set accent color
    const setAccentColor = (color) => {
      selectedAccentColor.value = color
      document.documentElement.style.setProperty('--accent-color', getAccentColorValue(color))
      savePreferences()
    }
    
    // Get accent color value
    const getAccentColorValue = (color) => {
      const colors = {
        emerald: '#10b981',
        blue: '#3b82f6',
        purple: '#8b5cf6',
        pink: '#ec489a',
        red: '#ef4444',
        orange: '#f97316'
      }
      return colors[color] || '#10b981'
    }
    
    // Set layout density
    const setLayoutDensity = (density) => {
      layoutDensity.value = density
      savePreferences()
    }
    
    // Toggle animations
    const toggleAnimations = () => {
      enableAnimations.value = !enableAnimations.value
      if (!enableAnimations.value) {
        document.body.classList.add('disable-animations')
      } else {
        document.body.classList.remove('disable-animations')
      }
      savePreferences()
    }
    
    // Watch for changes and auto-save
    watch([fontSize, language], () => {
      savePreferences()
    })
    
    // Load preferences on mount
    onMounted(() => {
      loadPreferences()
    })
    
    // --- Theme-aware CSS Classes ---
    const pageBackgroundClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-900': isDark.value
    }))
    
    const titleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    const subtitleClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const cardClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value
    }))
    
    const cardHeaderBorderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    const cardHeaderIconClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    const cardTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const valueDisplayClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const sliderClass = computed(() => ({
      'bg-gray-200 accent-emerald-500': !isDark.value,
      'bg-gray-700 accent-emerald-400': isDark.value
    }))
    
    const selectClass = computed(() => ({
      'bg-white border-gray-300 focus:ring-emerald-500 text-gray-900': !isDark.value,
      'bg-gray-700 border-gray-600 focus:ring-emerald-400 text-white': isDark.value
    }))
    
    const toggleActiveClass = computed(() => ({
      'bg-emerald-600': !isDark.value,
      'bg-emerald-500': isDark.value
    }))
    
    const toggleInactiveClass = computed(() => ({
      'bg-gray-300': !isDark.value,
      'bg-gray-600': isDark.value
    }))
    
    const previewBackgroundClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700': isDark.value
    }))
    
    const previewTextClass = computed(() => ({
      'text-gray-600': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    const previewButtonClass = computed(() => ({
      'bg-emerald-600 text-white hover:bg-emerald-700': true
    }))
    
    const previewAccentTextClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    const resetButtonClass = computed(() => ({
      'bg-gray-200 text-gray-700 hover:bg-gray-300': !isDark.value,
      'bg-gray-700 text-gray-300 hover:bg-gray-600': isDark.value
    }))
    
    const saveMessageClass = computed(() => ({
      'bg-emerald-600 text-white': true
    }))
    
    // Get theme mode active class
    const getThemeModeActiveClass = (mode) => {
      if (mode === 'light') {
        return isDark.value ? 'border-gray-500 bg-gray-700' : 'border-emerald-500 bg-emerald-50'
      } else if (mode === 'dark') {
        return isDark.value ? 'border-emerald-500 bg-gray-700' : 'border-emerald-500 bg-emerald-50'
      } else {
        return isDark.value ? 'border-gray-500 bg-gray-700' : 'border-emerald-500 bg-emerald-50'
      }
    }
    
    const getThemeModeInactiveClass = () => {
      return isDark.value ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'
    }
    
    const getThemeModeHoverClass = () => {
      return ''
    }
    
    const getDensityActiveClass = () => {
      return isDark.value ? 'border-emerald-500 bg-gray-700' : 'border-emerald-500 bg-emerald-50'
    }
    
    const getDensityInactiveClass = () => {
      return isDark.value ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-white hover:bg-gray-50'
    }
    
    return {
      // Theme detection
      isDark,
      
      // Personalization state
      selectedTheme,
      selectedAccentColor,
      fontSize,
      layoutDensity,
      enableAnimations,
      language,
      showSaveMessage,
      
      // Options
      themeModes,
      accentColors,
      layoutDensities,
      
      // Methods
      setThemeMode,
      setAccentColor,
      setLayoutDensity,
      toggleAnimations,
      resetToDefaults,
      savePreferences,
      
      // Theme classes
      pageBackgroundClass,
      titleClass,
      subtitleClass,
      cardClass,
      cardHeaderBorderClass,
      cardHeaderIconClass,
      cardTitleClass,
      labelClass,
      valueDisplayClass,
      sliderClass,
      selectClass,
      toggleActiveClass,
      toggleInactiveClass,
      previewBackgroundClass,
      previewTextClass,
      previewButtonClass,
      previewAccentTextClass,
      resetButtonClass,
      saveMessageClass,
      
      // Helper methods
      getThemeModeActiveClass,
      getThemeModeInactiveClass,
      getThemeModeHoverClass,
      getDensityActiveClass,
      getDensityInactiveClass
    }
  }
}
</script>

<style scoped>
/* Custom slider styling */
input[type="range"] {
  -webkit-appearance: none;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.dark input[type="range"]::-webkit-slider-thumb {
  background-color: #10b981;
}

:root:not(.dark) input[type="range"]::-webkit-slider-thumb {
  background-color: #10b981;
}

/* Density classes */
.density-compact {
  --spacing-scale: 0.75;
}

.density-comfortable {
  --spacing-scale: 1;
}

.density-spacious {
  --spacing-scale: 1.25;
}

/* Animation control */
.disable-animations * {
  animation: none !important;
  transition: none !important;
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Card hover effect */
.rounded-xl {
  transition: transform 0.2s, box-shadow 0.2s;
}

.rounded-xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}

/* Focus styles */
button:focus-visible,
select:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .p-6 {
    padding: 1rem;
  }
}
</style>