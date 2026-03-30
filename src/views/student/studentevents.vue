<template>
  <div :class="dashboardBgClass" class="min-h-screen p-8">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 :class="headingClass">Calendar & Events</h1>
        <p :class="subheadingClass">Stay updated</p>
      </div>

      <!-- Main Content: Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- LEFT COLUMN: Calendar and Events List -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Mini Calendar Card -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-6">
            <div class="text-center mb-4">
              <div class="flex justify-between items-center mb-6">
                <button @click="previousMonth" :class="calendarButtonClass" class="p-2 rounded-full transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <span :class="valueClass" class="text-xl font-semibold">{{ currentMonth }} {{ currentYear }}</span>
                <button @click="nextMonth" :class="calendarButtonClass" class="p-2 rounded-full transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 gap-1 mb-3">
                <div v-for="day in weekDays" :key="day" :class="cardLabelClass" class="text-xs font-medium py-2">
                  {{ day }}
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <div 
                  v-for="(date, idx) in calendarDays" 
                  :key="idx"
                  @click="selectDate(date)"
                  class="py-2 text-sm rounded-lg cursor-pointer transition-colors"
                  :class="getDateClass(date)"
                >
                  {{ date }}
                </div>
              </div>
            </div>
          </div>

          <!-- Event Filters -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-4">
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="filter in filters" 
                :key="filter.value"
                @click="activeFilter = filter.value"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeFilter === filter.value 
                    ? getActiveFilterClass()
                    : getInactiveFilterClass()
                ]"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>

          <!-- Events List -->
          <div class="space-y-4">
            <!-- Ongoing Event Highlight -->
            <div v-if="ongoingEvent" :class="ongoingEventClass" class="border-l-4 rounded-xl shadow-sm p-5">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <span :class="ongoingBadgeClass" class="text-xs px-2 py-1 rounded-full font-medium">ONGOING</span>
                    <span :class="liveBadgeClass" class="text-xs px-2 py-1 rounded-full">Live Now</span>
                  </div>
                  <h3 :class="valueClass" class="text-xl font-semibold">{{ ongoingEvent.title }}</h3>
                  <p :class="cardLabelClass" class="text-sm mt-1">{{ ongoingEvent.description }}</p>
                  <div class="flex flex-wrap gap-4 mt-3 text-sm">
                    <div class="flex items-center space-x-1" :class="cardLabelClass">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span>{{ formatEventDate(ongoingEvent.date) }}</span>
                    </div>
                    <div class="flex items-center space-x-1" :class="cardLabelClass">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{{ formatEventTime(ongoingEvent.date) }}</span>
                    </div>
                    <div class="flex items-center space-x-1" :class="cardLabelClass">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span>{{ ongoingEvent.location }}</span>
                    </div>
                  </div>
                </div>
                <button @click="viewEventDetails(ongoingEvent)" :class="primaryButtonClass" class="ml-4 px-4 py-2 rounded-lg text-sm font-medium transition">
                  Join Now
                </button>
              </div>
            </div>

            <!-- Regular Events -->
            <div 
              v-for="event in filteredEvents" 
              :key="event.id"
              :class="[cardClass, borderClass, 'rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer border']"
              @click="viewEventDetails(event)"
            >
              <div class="flex flex-col md:flex-row">
                <!-- Event Date Badge -->
                <div class="md:w-28 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 flex flex-col items-center justify-center text-white">
                  <span class="text-2xl font-bold">{{ getEventDay(event.date) }}</span>
                  <span class="text-sm uppercase">{{ getEventMonth(event.date) }}</span>
                  <span class="text-xs mt-1">{{ getEventTime(event.date) }}</span>
                </div>
                
                <!-- Event Details -->
                <div class="flex-1 p-5">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2 mb-2">
                        <span :class="getEventTypeClass(event.type)" class="text-xs px-2 py-1 rounded-full font-medium">
                          {{ event.type }}
                        </span>
                        <span v-if="event.isVirtual" :class="virtualBadgeClass" class="text-xs px-2 py-1 rounded-full">Virtual</span>
                        <span v-else :class="inPersonBadgeClass" class="text-xs px-2 py-1 rounded-full">In-Person</span>
                        <span v-if="event.isUrgent" :class="urgentBadgeClass" class="text-xs px-2 py-1 rounded-full">Urgent</span>
                      </div>
                      <h3 :class="valueClass" class="text-lg font-semibold mb-1">{{ event.title }}</h3>
                      <p :class="cardLabelClass" class="text-sm mb-3 line-clamp-2">{{ event.description }}</p>
                      
                      <div class="flex flex-wrap gap-4 text-sm" :class="cardLabelClass">
                        <div class="flex items-center space-x-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <span>{{ formatEventTime(event.date) }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span>{{ event.location }}</span>
                        </div>
                        <div class="flex items-center space-x-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                          <span>{{ event.attendees }} participants</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div class="ml-4">
                      <button 
                        @click.stop="handleEventAction(event)"
                        :disabled="event.isPast || (event.isFull && !event.isRegistered)"
                        class="px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                        :class="getButtonClass(event)"
                      >
                        {{ getButtonText(event) }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Archive Section -->
            <div :class="cardClass" class="rounded-xl shadow-sm overflow-hidden">
              <button 
                @click="showArchive = !showArchive" 
                :class="archiveButtonClass"
                class="w-full px-5 py-3 flex justify-between items-center transition"
              >
                <span class="font-medium">HIDE ARCHIVE ({{ archivedEvents.length }})</span>
                <svg :class="['w-5 h-5 transition-transform', showArchive ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-if="showArchive" :class="[borderClass, 'border-t divide-y', divideClass]">
                <div v-for="event in archivedEvents" :key="event.id" :class="archiveItemClass" class="p-5 cursor-pointer" @click="viewEventDetails(event)">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 :class="valueClass" class="font-medium">{{ event.title }}</h4>
                      <p :class="cardLabelClass" class="text-sm mt-1">{{ event.description }}</p>
                      <div class="flex items-center space-x-3 mt-2 text-xs" :class="cardLabelClass">
                        <span>{{ formatEventDate(event.date) }}</span>
                        <span>{{ formatEventTime(event.date) }}</span>
                      </div>
                    </div>
                    <span :class="archiveBadgeClass" class="text-xs px-2 py-1 rounded-full">Archived</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Events Found -->
            <div v-if="filteredEvents.length === 0 && !ongoingEvent" :class="cardClass" class="rounded-xl shadow-sm p-12 text-center">
              <svg :class="emptyIconClass" class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 :class="valueClass" class="text-lg font-medium mb-2">No events found</h3>
              <p :class="cardLabelClass">Check back later for upcoming events and activities</p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sidebar with Stats and Upcoming -->
        <div class="space-y-6">
          <!-- Upcoming Events Card -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-6">
            <h3 :class="valueClass" class="font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Upcoming
            </h3>
            <div class="space-y-4">
              <div v-for="event in upcomingEvents" :key="event.id" :class="upcomingItemClass" class="flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition" @click="viewEventDetails(event)">
                <div :class="upcomingDateClass" class="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                  <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">{{ getEventDay(event.date) }}</span>
                  <span class="text-xs text-emerald-600 dark:text-emerald-400">{{ getEventMonth(event.date) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p :class="valueClass" class="text-sm font-medium truncate">{{ event.title }}</p>
                  <p :class="cardLabelClass" class="text-xs mt-0.5">{{ formatEventTime(event.date) }} • {{ event.location }}</p>
                </div>
              </div>
              <div v-if="upcomingEvents.length === 0" :class="cardLabelClass" class="text-center py-4 text-sm">
                No upcoming events
              </div>
            </div>
          </div>

          <!-- Project Submission Card -->
          <div :class="projectCardClass" class="rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
            <h3 :class="valueClass" class="font-semibold mb-3">📁 PROJECT SUBMISSION</h3>
            <p :class="cardLabelClass" class="text-sm mb-4">Submit your final project including all source code and documentation. Make sure to follow the submission guidelines.</p>
            <div class="space-y-2 text-sm" :class="cardLabelClass">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>March 20, 2026</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>11:59 PM</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Online Portal</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span>45 participants</span>
              </div>
            </div>
            <button :class="primaryButtonClass" class="mt-5 w-full py-2 rounded-lg text-sm font-medium transition">
              Set Reminder
            </button>
          </div>

          <!-- Event Stats Card -->
          <div :class="statsCardClass" class="rounded-xl shadow-sm p-6 text-white">
            <h3 class="font-semibold mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Your Activity
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span>Events Attended</span>
                  <span class="font-bold">{{ attendedEvents }}/{{ totalEventsJoined }}</span>
                </div>
                <div class="w-full bg-white/20 rounded-full h-2">
                  <div class="bg-white h-2 rounded-full" :style="{ width: (attendedEvents / (totalEventsJoined || 1)) * 100 + '%' }"></div>
                </div>
              </div>
              <div class="flex justify-between">
                <span>Upcoming Events</span>
                <span class="font-bold">{{ upcomingRegisteredEvents }}</span>
              </div>
              <div class="flex justify-between">
                <span>Certificates Earned</span>
                <span class="font-bold">{{ eventCertificates }}</span>
              </div>
            </div>
          </div>

          <!-- Hackathon Promo Card -->
          <div :class="[cardClass, borderClass, 'rounded-xl shadow-sm p-6 border']">
            <div class="flex items-center justify-between mb-3">
              <span :class="hotBadgeClass" class="text-xs px-2 py-1 rounded-full">🔥 Hot Event</span>
              <span :class="cardLabelClass" class="text-xs">48h challenge</span>
            </div>
            <h3 :class="valueClass" class="font-bold text-lg">HACKATHON 2026</h3>
            <p :class="cardLabelClass" class="text-sm mt-1">48-hour coding competition with exciting prizes.</p>
            <div class="mt-3 space-y-1 text-xs" :class="cardLabelClass">
              <div>📅 Apr 15, 2026</div>
              <div>⏰ 9:00 AM</div>
              <div>📍 Innovation Lab</div>
            </div>
            <button :class="outlineButtonClass" class="mt-4 w-full py-2 rounded-lg text-sm font-medium transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>

     <StudentFooter />
    <!-- Event Details Modal -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div :class="modalClass" class="rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 :class="valueClass" class="text-2xl font-bold">{{ selectedEvent.title }}</h2>
            <button @click="closeModal" :class="closeButtonClass" class="transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <span :class="getEventTypeClass(selectedEvent.type)" class="text-xs px-2 py-1 rounded-full font-medium">
                {{ selectedEvent.type }}
              </span>
              <span v-if="selectedEvent.isVirtual" :class="virtualBadgeClass" class="text-xs px-2 py-1 rounded-full">Virtual Event</span>
              <span v-else :class="inPersonBadgeClass" class="text-xs px-2 py-1 rounded-full">In-Person Event</span>
            </div>
            
            <p :class="cardLabelClass" class="leading-relaxed">{{ selectedEvent.description }}</p>
            
            <div :class="borderClass" class="border-t pt-4 space-y-3">
              <div class="flex items-center space-x-3" :class="cardLabelClass">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>{{ formatFullEventDate(selectedEvent.date) }}</span>
              </div>
              <div class="flex items-center space-x-3" :class="cardLabelClass">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>{{ selectedEvent.location }}</span>
              </div>
              <div class="flex items-center space-x-3" :class="cardLabelClass">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span>{{ selectedEvent.attendees }} participants</span>
              </div>
            </div>
            
            <button 
              @click="handleEventAction(selectedEvent)"
              :disabled="selectedEvent.isPast || (selectedEvent.isFull && !selectedEvent.isRegistered)"
              class="w-full mt-4 px-4 py-3 rounded-lg transition font-medium"
              :class="getButtonClass(selectedEvent, true)"
            >
              {{ getButtonText(selectedEvent) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentEvents'
}
</script>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

import StudentFooter from '@/parent/studentfooter.vue'

const router = useRouter()

// Inject theme from parent
const theme = inject('theme', {
  currentTheme: { value: 'light' },
  isDark: () => false
})

// Reactive dark mode check
const isDark = computed(() => {
  return theme.currentTheme?.value === 'dark' || theme.isDark?.()
})

// User verification status
const isVerified = ref(true)

// UI State
const activeFilter = ref('all')
const selectedEvent = ref(null)
const showArchive = ref(false)

// Calendar state
const currentDate = ref(new Date())
const currentMonth = computed(() => currentDate.value.toLocaleString('default', { month: 'long' }))
const currentYear = computed(() => currentDate.value.getFullYear())
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Filters
const filters = [
  { label: 'All Events', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'My Events', value: 'registered' },
  { label: 'Virtual', value: 'virtual' },
  { label: 'In-Person', value: 'inperson' }
]

// Theme-aware CSS Classes
const dashboardBgClass = computed(() => ({
  'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
  'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
}))

const cardClass = computed(() => ({
  'bg-white shadow-sm': !isDark.value,
  'bg-gray-800 shadow-lg': isDark.value
}))

const cardLabelClass = computed(() => ({
  'text-gray-500': !isDark.value,
  'text-gray-400': isDark.value
}))

const valueClass = computed(() => ({
  'text-gray-800': !isDark.value,
  'text-white': isDark.value
}))

const headingClass = computed(() => ({
  'text-3xl font-bold text-gray-800': !isDark.value,
  'text-3xl font-bold text-white': isDark.value
}))

const subheadingClass = computed(() => ({
  'text-gray-500 mt-1': !isDark.value,
  'text-gray-400 mt-1': isDark.value
}))

const borderClass = computed(() => ({
  'border-gray-200': !isDark.value,
  'border-gray-700': isDark.value
}))

const divideClass = computed(() => ({
  'divide-gray-100': !isDark.value,
  'divide-gray-700': isDark.value
}))

// Button classes
const primaryButtonClass = computed(() => ({
  'bg-emerald-500 hover:bg-emerald-600 text-white': !isDark.value,
  'bg-emerald-600 hover:bg-emerald-700 text-white': isDark.value
}))

const outlineButtonClass = computed(() => ({
  'border border-emerald-500 text-emerald-600 hover:bg-emerald-50': !isDark.value,
  'border border-emerald-400 text-emerald-400 hover:bg-emerald-900/30': isDark.value
}))

const calendarButtonClass = computed(() => ({
  'hover:bg-gray-100 text-gray-600': !isDark.value,
  'hover:bg-gray-700 text-gray-400': isDark.value
}))

// Filter classes
const getActiveFilterClass = () => {
  return computed(() => ({
    'bg-emerald-500 text-white shadow-sm': !isDark.value,
    'bg-emerald-600 text-white shadow-sm': isDark.value
  })).value
}

const getInactiveFilterClass = () => {
  return computed(() => ({
    'bg-gray-100 text-gray-600 hover:bg-gray-200': !isDark.value,
    'bg-gray-700 text-gray-300 hover:bg-gray-600': isDark.value
  })).value
}

// Badge classes
const virtualBadgeClass = computed(() => ({
  'bg-blue-100 text-blue-700': !isDark.value,
  'bg-blue-900/50 text-blue-300': isDark.value
}))

const inPersonBadgeClass = computed(() => ({
  'bg-purple-100 text-purple-700': !isDark.value,
  'bg-purple-900/50 text-purple-300': isDark.value
}))

const urgentBadgeClass = computed(() => ({
  'bg-red-100 text-red-700': !isDark.value,
  'bg-red-900/50 text-red-300': isDark.value
}))

const hotBadgeClass = computed(() => ({
  'bg-emerald-100 text-emerald-700': !isDark.value,
  'bg-emerald-900/50 text-emerald-300': isDark.value
}))

const ongoingBadgeClass = computed(() => ({
  'bg-emerald-100 text-emerald-700': !isDark.value,
  'bg-emerald-900/50 text-emerald-300': isDark.value
}))

const liveBadgeClass = computed(() => ({
  'bg-orange-100 text-orange-700': !isDark.value,
  'bg-orange-900/50 text-orange-300': isDark.value
}))

const archiveBadgeClass = computed(() => ({
  'bg-gray-100 text-gray-600': !isDark.value,
  'bg-gray-700 text-gray-400': isDark.value
}))

// Event specific classes
const ongoingEventClass = computed(() => ({
  'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500': !isDark.value,
  'bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500': isDark.value
}))

const projectCardClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

const statsCardClass = computed(() => ({
  'bg-gradient-to-r from-emerald-500 to-teal-600': !isDark.value,
  'bg-gradient-to-r from-emerald-700 to-teal-800': isDark.value
}))

const archiveButtonClass = computed(() => ({
  'text-gray-600 hover:bg-gray-50': !isDark.value,
  'text-gray-400 hover:bg-gray-700': isDark.value
}))

const archiveItemClass = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700/50': isDark.value
}))

const upcomingItemClass = computed(() => ({
  'hover:bg-gray-50': !isDark.value,
  'hover:bg-gray-700': isDark.value
}))

const upcomingDateClass = computed(() => ({
  'bg-emerald-100': !isDark.value,
  'bg-emerald-900/50': isDark.value
}))

const emptyIconClass = computed(() => ({
  'text-gray-300': !isDark.value,
  'text-gray-600': isDark.value
}))

const modalClass = computed(() => ({
  'bg-white': !isDark.value,
  'bg-gray-800': isDark.value
}))

const closeButtonClass = computed(() => ({
  'text-gray-400 hover:text-gray-600': !isDark.value,
  'text-gray-500 hover:text-gray-300': isDark.value
}))

// Events data
const events = ref([
  {
    id: 1,
    title: 'React Workshop',
    description: 'Hands-on React workshop with project-based learning',
    type: 'Workshop',
    date: '2026-03-20T14:00:00',
    location: 'Room 301',
    isVirtual: false,
    attendees: 45,
    maxAttendees: 60,
    isRegistered: false,
    isPast: false,
    isFull: false,
    isUrgent: false,
    isOngoing: true
  },
  {
    id: 2,
    title: 'Web Design Seminar',
    description: 'Learn modern web design trends and best practices.',
    type: 'Seminar',
    date: '2026-04-02T10:00:00',
    location: 'Auditorium',
    isVirtual: false,
    attendees: 78,
    maxAttendees: 120,
    isRegistered: false,
    isPast: false,
    isFull: false,
    isUrgent: false
  },
  {
    id: 3,
    title: 'JavaScript Meetup',
    description: 'Community meetup for JavaScript developers.',
    type: 'Meetup',
    date: '2026-02-20T15:00:00',
    location: 'Room 205',
    isVirtual: false,
    attendees: 32,
    maxAttendees: 50,
    isRegistered: true,
    isPast: true,
    isFull: false,
    isUrgent: false
  },
  {
    id: 4,
    title: 'Hackathon 2026',
    description: '48-hour coding competition with exciting prizes.',
    type: 'Hackathon',
    date: '2026-04-15T09:00:00',
    location: 'Innovation Lab',
    isVirtual: false,
    attendees: 150,
    maxAttendees: 150,
    isRegistered: false,
    isPast: false,
    isFull: true,
    isUrgent: true
  },
  {
    id: 5,
    title: 'Project Submission Deadline',
    description: 'Submit your final project including all source code and documentation.',
    type: 'Deadline',
    date: '2026-03-20T23:59:00',
    location: 'Online Portal',
    isVirtual: true,
    attendees: 45,
    maxAttendees: 200,
    isRegistered: false,
    isPast: false,
    isFull: false,
    isUrgent: true
  },
  {
    id: 6,
    title: 'UI/UX Design Workshop',
    description: 'Learn prototyping and user testing techniques.',
    type: 'Workshop',
    date: '2026-04-10T13:00:00',
    location: 'Design Studio',
    isVirtual: false,
    attendees: 25,
    maxAttendees: 40,
    isRegistered: true,
    isPast: false,
    isFull: false,
    isUrgent: false
  }
])

// Computed properties
const ongoingEvent = computed(() => {
  return events.value.find(e => e.isOngoing && !e.isPast) || null
})

const archivedEvents = computed(() => {
  return events.value.filter(e => e.isPast)
})

const filteredEvents = computed(() => {
  let filtered = events.value.filter(e => !e.isPast && !e.isOngoing)
  
  switch(activeFilter.value) {
    case 'upcoming':
      filtered = filtered.filter(e => !e.isPast)
      break
    case 'registered':
      filtered = filtered.filter(e => e.isRegistered && !e.isPast)
      break
    case 'virtual':
      filtered = filtered.filter(e => e.isVirtual && !e.isPast)
      break
    case 'inperson':
      filtered = filtered.filter(e => !e.isVirtual && !e.isPast)
      break
    default:
      break
  }
  
  return filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
})

const upcomingEvents = computed(() => {
  return events.value
    .filter(e => !e.isPast && !e.isOngoing)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
})

const attendedEvents = computed(() => {
  return events.value.filter(e => e.isPast && e.isRegistered).length
})

const totalEventsJoined = computed(() => {
  return events.value.filter(e => e.isRegistered).length
})

const upcomingRegisteredEvents = computed(() => {
  return events.value.filter(e => !e.isPast && e.isRegistered).length
})

const eventCertificates = ref(2)

// Calendar helpers
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push('')
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  return days
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date) => {
  if (date) {
    console.log('Selected date:', date)
  }
}

const getDateClass = (date) => {
  if (!date) return 'text-gray-300 dark:text-gray-600 cursor-default'
  const today = new Date()
  const isToday = date === today.getDate() && 
                  currentMonth.value === today.toLocaleString('default', { month: 'long' }) &&
                  currentYear.value === today.getFullYear()
  if (isToday) {
    return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold'
  }
  return `hover:bg-gray-100 dark:hover:bg-gray-700 ${!isDark.value ? 'text-gray-700' : 'text-gray-300'}`
}

// Date formatting helpers
const getEventDay = (dateString) => new Date(dateString).getDate()
const getEventMonth = (dateString) => new Date(dateString).toLocaleString('default', { month: 'short' })
const getEventTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const formatEventTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const formatEventDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const formatFullEventDate = (dateString) => new Date(dateString).toLocaleString('en-US', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
})

const getEventTypeClass = (type) => {
  const types = {
    'Workshop': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    'Seminar': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
    'Meetup': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
    'Hackathon': 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
    'Deadline': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
  }
  return types[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
}

const getButtonClass = (event, isModal = false) => {
  if (event.isPast) return 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
  if (event.isRegistered) return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
  if (event.isFull) return 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 cursor-not-allowed border border-red-200 dark:border-red-800'
  return 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
}

const getButtonText = (event) => {
  if (event.isPast) return 'Past Event'
  if (event.isRegistered) return 'Registered ✓'
  if (event.isFull) return 'Full'
  return 'Register'
}

const viewEventDetails = (event) => {
  selectedEvent.value = event
}

const closeModal = () => {
  selectedEvent.value = null
}

const handleEventAction = (event) => {
  if (event.isPast || (event.isFull && !event.isRegistered)) return
  
  if (event.isRegistered) {
    if (confirm(`Cancel registration for ${event.title}?`)) {
      event.isRegistered = false
      event.attendees--
      alert(`Registration cancelled for ${event.title}`)
    }
  } else {
    if (!isVerified.value) {
      alert('Please verify your account to register for events')
      return
    }
    event.isRegistered = true
    event.attendees++
    alert(`Successfully registered for ${event.title}!`)
  }
  closeModal()
}

// Auth check
onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  } else {
    const userData = JSON.parse(user)
    isVerified.value = userData.isVerified || false
  }
})
</script>

<style scoped>
.transition {
  transition: all 0.2s ease;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>