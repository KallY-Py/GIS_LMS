<template>
  <!-- 
    Events Management Page with Theme Support
    - Automatically responds to global theme changes
    - Uses CSS variables and dynamic classes for theming
    - No need for separate theme logic - inherits from parent
  -->
  <div 
    class="min-h-screen transition-colors duration-300"
    :class="themeBackgroundClass"
  >
    <!-- Main Content -->
    <main class="ml-64 p-8">
      <!-- Header Section with Theme-Aware Text Colors -->
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 
              class="text-3xl font-bold transition-colors duration-300"
              :class="titleClass"
            >
              Event Management
            </h1>
            <p 
              class="mt-1 transition-colors duration-300"
              :class="subtitleClass"
            >
              Schedule and manage upcoming events, workshops, and meetings
            </p>
          </div>
          <div class="text-right">
            <p 
              class="text-sm font-medium transition-colors duration-300"
              :class="dateTextClass"
            >
              {{ currentDate }}
            </p>
            <p 
              class="text-xs transition-colors duration-300"
              :class="timeTextClass"
            >
              {{ currentTime }}
            </p>
          </div>
        </div>
      </div>

      <!-- Calendar and Announcements Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Calendar Card -->
        <div 
          class="lg:col-span-2 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          :class="cardClass"
        >
          <div class="flex justify-between items-center mb-6">
            <h2 
              class="text-xl font-semibold transition-colors duration-300"
              :class="cardTitleClass"
            >
              Calendar
            </h2>
            <div class="flex space-x-2">
              <button 
                @click="previousMonth" 
                class="p-2 rounded-lg transition-colors duration-200"
                :class="buttonHoverClass"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <span 
                class="text-lg font-medium transition-colors duration-300"
                :class="monthTextClass"
              >
                {{ currentMonthName }} {{ currentYear }}
              </span>
              <button 
                @click="nextMonth" 
                class="p-2 rounded-lg transition-colors duration-200"
                :class="buttonHoverClass"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div 
              v-for="day in weekDays" 
              :key="day" 
              class="text-center text-sm font-medium py-2 transition-colors duration-300"
              :class="weekdayClass"
            >
              {{ day }}
            </div>
          </div>
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              @click="selectDate(day)"
              :class="[
                'relative p-3 text-center rounded-lg cursor-pointer transition-all duration-200',
                day.isCurrentMonth ? 'font-medium' : '',
                day.date === selectedDate ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
                day.hasEvent ? 'font-bold' : ''
              ]"
              :style="{
                color: !day.isCurrentMonth ? (isDark ? '#9ca3af' : '#9ca3af') : (isDark ? '#e5e7eb' : '#374151')
              }"
            >
              <span>{{ day.day }}</span>
              <div 
                v-if="day.hasEvent" 
                class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <!-- Upcoming Events / Announcements Card -->
        <div 
          class="rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300"
          :class="cardClass"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 
              class="text-xl font-semibold transition-colors duration-300"
              :class="cardTitleClass"
            >
              Announcements
            </h2>
            <button
              @click="openAddEventModal"
              class="px-3 py-1.5 bg-emerald-600 dark:bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200 flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>Add Event</span>
            </button>
          </div>
          <div class="mb-4">
            <p 
              class="text-sm font-medium transition-colors duration-300"
              :class="labelClass"
            >
              Upcoming Events
            </p>
            <p 
              class="text-xs transition-colors duration-300"
              :class="subLabelClass"
            >
              Your scheduled reminders
            </p>
          </div>
          <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="border-l-4 border-emerald-500 dark:border-emerald-400 pl-3 py-2 rounded-r-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
              @click="viewEventDetails(event)"
            >
              <p 
                class="font-medium transition-colors duration-300"
                :class="eventTitleClass"
              >
                {{ event.title }}
              </p>
              <p 
                class="text-xs transition-colors duration-300"
                :class="eventDateClass"
              >
                {{ formatEventDate(event.date) }}
              </p>
              <p 
                class="text-xs mt-1 transition-colors duration-300"
                :class="eventLocationClass"
              >
                {{ event.location }}
              </p>
            </div>
            <div 
              v-if="upcomingEvents.length === 0" 
              class="text-center py-8"
              :class="emptyStateClass"
            >
              <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p>No upcoming events</p>
              <p class="text-xs">Click "Add Event" to schedule one</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Event List for Selected Date -->
      <div 
        v-if="selectedDateEvents.length > 0" 
        class="rounded-xl shadow-sm p-6 mb-8 transition-all duration-300"
        :class="cardClass"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 
            class="text-lg font-semibold transition-colors duration-300"
            :class="cardTitleClass"
          >
            Events on {{ formatDateForDisplay(selectedDate) }}
          </h3>
          <button 
            @click="selectedDate = null" 
            class="transition-colors duration-200"
            :class="closeButtonClass"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="space-y-3">
          <div
            v-for="event in selectedDateEvents"
            :key="event.id"
            class="flex justify-between items-center p-3 rounded-lg transition-all duration-200"
            :class="eventItemClass"
          >
            <div>
              <p 
                class="font-medium transition-colors duration-300"
                :class="eventTitleClass"
              >
                {{ event.title }}
              </p>
              <p 
                class="text-sm transition-colors duration-300"
                :class="eventDetailClass"
              >
                {{ event.time }} - {{ event.location }}
              </p>
            </div>
            <button 
              @click="deleteEvent(event.id)" 
              class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Event Modal with Theme Support -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div 
          class="rounded-xl shadow-xl w-full max-w-md p-6 transition-colors duration-300"
          :class="modalClass"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 
              class="text-xl font-semibold transition-colors duration-300"
              :class="modalTitleClass"
            >
              Add New Event
            </h3>
            <button 
              @click="closeModal" 
              class="transition-colors duration-200"
              :class="closeButtonClass"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="saveEvent">
            <div class="mb-4">
              <label 
                class="block text-sm font-medium mb-1 transition-colors duration-300"
                :class="labelClass"
              >
                Event Title
              </label>
              <input
                type="text"
                v-model="newEvent.title"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                :class="inputClass"
                placeholder="e.g., Staff Training Workshop"
              />
            </div>
            <div class="mb-4">
              <label 
                class="block text-sm font-medium mb-1 transition-colors duration-300"
                :class="labelClass"
              >
                Date
              </label>
              <input
                type="date"
                v-model="newEvent.date"
                required
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                :class="inputClass"
              />
            </div>
            <div class="mb-4">
              <label 
                class="block text-sm font-medium mb-1 transition-colors duration-300"
                :class="labelClass"
              >
                Time
              </label>
              <input
                type="text"
                v-model="newEvent.time"
                required
                placeholder="e.g., 9:00 AM"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                :class="inputClass"
              />
            </div>
            <div class="mb-4">
              <label 
                class="block text-sm font-medium mb-1 transition-colors duration-300"
                :class="labelClass"
              >
                Location
              </label>
              <input
                type="text"
                v-model="newEvent.location"
                required
                placeholder="e.g., Room 401, Main Hall, Conference B"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
                :class="inputClass"
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 rounded-lg transition-all duration-200"
                :class="cancelButtonClass"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all duration-200"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// Import necessary Vue functions and router
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminEvents',
  setup() {
    const router = useRouter()
    
    // IMPORTANT: Inject theme from App.vue - this is how we get global theme!
    // We don't need to create a new useTheme() instance here
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })
    
    // Computed property to check if dark mode is active
    // This will automatically update when theme changes globally
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })
    
    // --- Theme-aware CSS Classes ---
    // These classes dynamically change based on the global theme
    
    // Main background class
    const themeBackgroundClass = computed(() => ({
      'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
      'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
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
    
    // Date text color
    const dateTextClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Time text color
    const timeTextClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Card background and border
    const cardClass = computed(() => ({
      'bg-white shadow-sm': !isDark.value,
      'bg-gray-800 shadow-lg': isDark.value
    }))
    
    // Card title color
    const cardTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Button hover effect
    const buttonHoverClass = computed(() => ({
      'hover:bg-gray-100 text-gray-600': !isDark.value,
      'hover:bg-gray-700 text-gray-300': isDark.value
    }))
    
    // Month text color
    const monthTextClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Weekday text color
    const weekdayClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Label text color
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Sub-label text color
    const subLabelClass = computed(() => ({
      'text-gray-400': !isDark.value,
      'text-gray-500': isDark.value
    }))
    
    // Event title color
    const eventTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-gray-200': isDark.value
    }))
    
    // Event date color
    const eventDateClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Event location color
    const eventLocationClass = computed(() => ({
      'text-gray-400': !isDark.value,
      'text-gray-500': isDark.value
    }))
    
    // Event detail color
    const eventDetailClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))
    
    // Empty state color
    const emptyStateClass = computed(() => ({
      'text-gray-400': !isDark.value,
      'text-gray-500': isDark.value
    }))
    
    // Event item background
    const eventItemClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    // Modal background
    const modalClass = computed(() => ({
      'bg-white': !isDark.value,
      'bg-gray-800': isDark.value
    }))
    
    // Modal title color
    const modalTitleClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))
    
    // Input field styling
    const inputClass = computed(() => ({
      'border-gray-300 bg-white text-gray-900 focus:border-emerald-500': !isDark.value,
      'border-gray-600 bg-gray-700 text-white focus:border-emerald-400': isDark.value
    }))
    
    // Cancel button styling
    const cancelButtonClass = computed(() => ({
      'text-gray-600 hover:bg-gray-100': !isDark.value,
      'text-gray-300 hover:bg-gray-700': isDark.value
    }))
    
    // Close button styling
    const closeButtonClass = computed(() => ({
      'text-gray-400 hover:text-gray-600': !isDark.value,
      'text-gray-500 hover:text-gray-300': isDark.value
    }))
    
    // --- Component Data and Methods ---
    // Date and time
    const currentDate = ref('')
    const currentTime = ref('')
    let timeInterval = null
    
    // Calendar state
    const currentYear = ref(new Date().getFullYear())
    const currentMonth = ref(new Date().getMonth())
    const selectedDate = ref(null)
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    
    // Events data
    const events = ref([])
    const showModal = ref(false)
    const newEvent = ref({
      title: '',
      date: '',
      time: '',
      location: ''
    })
    
    // Computed: Current month name
    const currentMonthName = computed(() => {
      return new Date(currentYear.value, currentMonth.value).toLocaleString('default', { month: 'long' })
    })
    
    // Computed: Calendar days grid
    const calendarDays = computed(() => {
      const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1)
      const startDayOfWeek = firstDayOfMonth.getDay()
      const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
      
      const daysArray = []
      
      // Previous month days
      const daysInPrevMonth = new Date(currentYear.value, currentMonth.value, 0).getDate()
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const dayNum = daysInPrevMonth - i
        const date = new Date(currentYear.value, currentMonth.value - 1, dayNum)
        daysArray.push({
          day: dayNum,
          date: date,
          isCurrentMonth: false,
          hasEvent: hasEventOnDate(date)
        })
      }
      
      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear.value, currentMonth.value, i)
        daysArray.push({
          day: i,
          date: date,
          isCurrentMonth: true,
          hasEvent: hasEventOnDate(date)
        })
      }
      
      // Next month days to fill grid (42 cells total)
      const remainingCells = 42 - daysArray.length
      for (let i = 1; i <= remainingCells; i++) {
        const date = new Date(currentYear.value, currentMonth.value + 1, i)
        daysArray.push({
          day: i,
          date: date,
          isCurrentMonth: false,
          hasEvent: hasEventOnDate(date)
        })
      }
      
      return daysArray
    })
    
    // Computed: Upcoming events (next 7 days from today)
    const upcomingEvents = computed(() => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)
      
      return events.value
        .filter(event => {
          const eventDate = new Date(event.date)
          return eventDate >= today && eventDate <= nextWeek
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    })
    
    // Computed: Events on selected date
    const selectedDateEvents = computed(() => {
      if (!selectedDate.value) return []
      return events.value.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === selectedDate.value.toDateString()
      })
    })
    
    // Helper: Check if date has events
    const hasEventOnDate = (date) => {
      return events.value.some(event => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === date.toDateString()
      })
    }
    
    // Helper: Format date for display
    const formatDateForDisplay = (date) => {
      if (!date) return ''
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
    
    // Helper: Format event date for upcoming list
    const formatEventDate = (dateString) => {
      const date = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      
      if (date.toDateString() === today.toDateString()) {
        return `Today`
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow`
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }
    }
    
    // View event details
    const viewEventDetails = (event) => {
      selectedDate.value = new Date(event.date)
    }
    
    // Calendar navigation
    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }
    
    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }
    
    // Select a date
    const selectDate = (day) => {
      selectedDate.value = day.date
    }
    
    // Modal functions
    const openAddEventModal = () => {
      newEvent.value = {
        title: '',
        date: '',
        time: '',
        location: ''
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
    }
    
    // Save event
    const saveEvent = () => {
      if (newEvent.value.title && newEvent.value.date && newEvent.value.time && newEvent.value.location) {
        const newId = Math.max(0, ...events.value.map(e => e.id)) + 1
        events.value.push({
          id: newId,
          ...newEvent.value
        })
        saveEventsToLocalStorage()
        closeModal()
      }
    }
    
    // Delete event
    const deleteEvent = (eventId) => {
      events.value = events.value.filter(event => event.id !== eventId)
      saveEventsToLocalStorage()
    }
    
    // Save events to localStorage
    const saveEventsToLocalStorage = () => {
      localStorage.setItem('admin_events', JSON.stringify(events.value))
    }
    
    // Load events from localStorage
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('admin_events')
      if (storedEvents) {
        events.value = JSON.parse(storedEvents)
      } else {
        // Sample events
        events.value = [
          { id: 1, title: 'Staff Training Workshop', date: '2026-03-26', time: '10:00 AM', location: 'Room 401' },
          { id: 2, title: 'Student Orientation', date: '2026-03-28', time: '9:00 AM', location: 'Main Hall' },
          { id: 3, title: 'Commission Review Meeting', date: '2026-04-01', time: '10:00 AM', location: 'Conference B' },
          { id: 4, title: 'Quarterly Town Hall', date: '2026-04-05', time: '9:00 AM', location: 'Conference B' }
        ]
        saveEventsToLocalStorage()
      }
    }
    
    // Update date and time
    const updateDateTime = () => {
      const now = new Date()
      currentDate.value = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      currentTime.value = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
    }
    
    // Check authentication on mount
    onMounted(() => {
      const user = localStorage.getItem('user')
      if (!user || JSON.parse(user).role !== 'admin') {
        router.push('/')
      }
      updateDateTime()
      timeInterval = setInterval(updateDateTime, 1000)
      loadEvents()
    })
    
    // Clean up interval
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })
    
    return {
      // Theme state
      isDark,
      // Theme classes
      themeBackgroundClass,
      titleClass,
      subtitleClass,
      dateTextClass,
      timeTextClass,
      cardClass,
      cardTitleClass,
      buttonHoverClass,
      monthTextClass,
      weekdayClass,
      labelClass,
      subLabelClass,
      eventTitleClass,
      eventDateClass,
      eventLocationClass,
      eventDetailClass,
      emptyStateClass,
      eventItemClass,
      modalClass,
      modalTitleClass,
      inputClass,
      cancelButtonClass,
      closeButtonClass,
      // Data
      currentDate,
      currentTime,
      currentYear,
      currentMonth,
      selectedDate,
      weekDays,
      events,
      showModal,
      newEvent,
      currentMonthName,
      calendarDays,
      upcomingEvents,
      selectedDateEvents,
      // Methods
      previousMonth,
      nextMonth,
      selectDate,
      openAddEventModal,
      closeModal,
      saveEvent,
      deleteEvent,
      formatEventDate,
      formatDateForDisplay,
      viewEventDetails
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar with theme awareness */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}

/* Dark mode scrollbar */
:deep(.dark) .custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.5);
}

/* Smooth transitions for all elements */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Calendar day hover effect */
.calendar-day {
  transition: all 0.2s ease;
}

/* Button hover animations */
button {
  transition: all 0.2s ease;
}
</style>