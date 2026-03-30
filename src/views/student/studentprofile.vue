<template>
  <div :class="dashboardBgClass" class="min-h-screen flex flex-col">
    <!-- Main Content with Sidebar Margin -->
    <div class="ml-0 flex-grow">
      <div class="p-8">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 :class="headingClass">My Profile</h1>
          <p :class="subheadingClass">Manage your account settings and preferences</p>
        </div>

        <!-- Profile Tabs -->
        <div :class="cardClass" class="rounded-xl shadow-sm overflow-hidden">
          <!-- Tab Navigation -->
          <div :class="borderClass" class="border-b">
            <nav class="flex flex-wrap gap-2 px-6 pt-4">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all',
                  activeTab === tab.id
                    ? getActiveTabClass()
                    : getInactiveTabClass()
                ]"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="tab.id === 'personal'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    <path v-if="tab.id === 'settings'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path v-if="tab.id === 'security'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10-2V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2z" />
                    <path v-if="tab.id === 'notifications'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    <path v-if="tab.id === 'personalization'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>{{ tab.label }}</span>
                </div>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Personal Info Tab -->
            <div v-if="activeTab === 'personal'" class="space-y-6">
              <!-- Profile Picture Section -->
              <div :class="borderClass" class="flex items-center space-x-6 pb-6 border-b">
                <div class="relative">
                  <img 
                    :src="profilePicture || 'https://via.placeholder.com/100'"
                    alt="Profile"
                    :class="avatarBorderClass"
                    class="w-24 h-24 rounded-full object-cover border-4"
                  />
                  <button 
                    @click="uploadProfilePicture"
                    :class="uploadButtonClass"
                    class="absolute bottom-0 right-0 rounded-full p-1.5 transition"
                  >
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h3 :class="valueClass" class="text-lg font-semibold">{{ personalInfo.fullName }}</h3>
                  <p :class="cardLabelClass" class="text-sm">{{ personalInfo.email }}</p>
                  <p :class="memberSinceClass" class="text-xs mt-1">Member since {{ memberSince }}</p>
                </div>
              </div>

              <!-- Personal Details Form -->
              <form @submit.prevent="updatePersonalInfo" class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Full Name</label>
                    <input 
                      v-model="personalInfo.fullName"
                      type="text"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Email Address</label>
                    <input 
                      v-model="personalInfo.email"
                      type="email"
                      :class="[inputClass, disabledInputClass]"
                      class="w-full px-4 py-2 rounded-lg"
                      disabled
                    />
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      v-model="personalInfo.phone"
                      type="tel"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Date of Birth</label>
                    <input 
                      v-model="personalInfo.dob"
                      type="date"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Gender</label>
                    <select 
                      v-model="personalInfo.gender"
                      :class="selectClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Student ID</label>
                    <input 
                      v-model="personalInfo.studentId"
                      type="text"
                      :class="[inputClass, disabledInputClass]"
                      class="w-full px-4 py-2 rounded-lg"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label :class="labelClass" class="block text-sm font-medium mb-2">Bio</label>
                  <textarea 
                    v-model="personalInfo.bio"
                    rows="3"
                    :class="inputClass"
                    class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button 
                    type="submit"
                    :class="primaryButtonClass"
                    class="px-6 py-2 rounded-lg transition font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            <!-- Settings Tab -->
            <div v-if="activeTab === 'settings'" class="space-y-6">
              <div class="space-y-5">
                <h3 :class="valueClass" class="text-lg font-semibold">Preferences</h3>
                
                <div class="space-y-4">
                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Language</p>
                      <p :class="cardLabelClass" class="text-sm">Select your preferred language</p>
                    </div>
                    <select v-model="settings.language" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Time Zone</p>
                      <p :class="cardLabelClass" class="text-sm">Set your local time zone</p>
                    </div>
                    <select v-model="settings.timezone" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+8">Singapore (UTC+8)</option>
                    </select>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Date Format</p>
                      <p :class="cardLabelClass" class="text-sm">Choose how dates are displayed</p>
                    </div>
                    <select v-model="settings.dateFormat" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <h3 :class="valueClass" class="text-lg font-semibold pt-4">Privacy Settings</h3>
                
                <div class="space-y-4">
                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Profile Visibility</p>
                      <p :class="cardLabelClass" class="text-sm">Control who can see your profile</p>
                    </div>
                    <select v-model="settings.profileVisibility" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="only-me">Only Me</option>
                    </select>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3">
                    <div>
                      <p :class="valueClass" class="font-medium">Show Activity Status</p>
                      <p :class="cardLabelClass" class="text-sm">Let others see when you're active</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settings.showActivity" class="sr-only peer">
                      <div :class="toggleClass" class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                <div class="flex justify-end pt-4">
                  <button @click="updateSettings" :class="primaryButtonClass" class="px-6 py-2 rounded-lg transition font-medium">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>

            <!-- Security Tab -->
            <div v-if="activeTab === 'security'" class="space-y-6">
              <div class="space-y-5">
                <h3 :class="valueClass" class="text-lg font-semibold">Change Password</h3>
                
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Current Password</label>
                    <input 
                      v-model="security.currentPassword"
                      type="password"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">New Password</label>
                    <input 
                      v-model="security.newPassword"
                      type="password"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                    <p :class="cardLabelClass" class="text-xs mt-1">Must be at least 8 characters</p>
                  </div>
                  <div>
                    <label :class="labelClass" class="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input 
                      v-model="security.confirmPassword"
                      type="password"
                      :class="inputClass"
                      class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>
                  <div class="flex justify-end">
                    <button type="submit" :class="primaryButtonClass" class="px-6 py-2 rounded-lg transition font-medium">
                      Update Password
                    </button>
                  </div>
                </form>

                <div :class="borderClass" class="border-t pt-6">
                  <h3 :class="valueClass" class="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div class="flex items-center justify-between py-3">
                    <div>
                      <p :class="valueClass" class="font-medium">Enable 2FA</p>
                      <p :class="cardLabelClass" class="text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button 
                      @click="setupTwoFactor"
                      :class="[
                        'px-4 py-2 rounded-lg transition font-medium',
                        security.twoFactorEnabled 
                          ? getTwoFactorEnabledClass()
                          : getTwoFactorDisabledClass()
                      ]"
                    >
                      {{ security.twoFactorEnabled ? 'Enabled' : 'Enable 2FA' }}
                    </button>
                  </div>
                </div>

                <div :class="borderClass" class="border-t pt-6">
                  <h3 :class="valueClass" class="text-lg font-semibold mb-4">Session Management</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between py-2">
                      <div>
                        <p :class="valueClass" class="font-medium">Current Session</p>
                        <p :class="cardLabelClass" class="text-sm">Chrome on Windows • Last active now</p>
                      </div>
                      <span :class="activeBadgeClass" class="text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <button @click="logoutAllDevices" :class="dangerButtonClass" class="text-sm font-medium">
                      Log out from all devices
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="space-y-6">
              <div class="space-y-5">
                <h3 :class="valueClass" class="text-lg font-semibold">Notification Preferences</h3>
                
                <div class="space-y-4">
                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Email Notifications</p>
                      <p :class="cardLabelClass" class="text-sm">Receive updates via email</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.email" class="sr-only peer">
                      <div :class="toggleClass" class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Push Notifications</p>
                      <p :class="cardLabelClass" class="text-sm">Receive notifications on your browser</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications.push" class="sr-only peer">
                      <div :class="toggleClass" class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                <h3 :class="valueClass" class="text-lg font-semibold pt-4">What to notify me about</h3>
                
                <div class="space-y-4">
                  <div v-for="item in notificationItems" :key="item.key" :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">{{ item.label }}</p>
                      <p :class="cardLabelClass" class="text-sm">{{ item.description }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="notifications[item.key]" class="sr-only peer">
                      <div :class="toggleClass" class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                <div class="flex justify-end pt-4">
                  <button @click="updateNotifications" :class="primaryButtonClass" class="px-6 py-2 rounded-lg transition font-medium">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>

            <!-- Personalization Tab -->
            <div v-if="activeTab === 'personalization'" class="space-y-6">
              <div class="space-y-5">
                <h3 :class="valueClass" class="text-lg font-semibold">Theme Preferences</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button 
                    v-for="themeOption in themeOptions"
                    :key="themeOption.value"
                    @click="personalization.theme = themeOption.value"
                    :class="[
                      'p-4 border-2 rounded-lg transition text-center',
                      personalization.theme === themeOption.value 
                        ? getThemeSelectedClass()
                        : getThemeUnselectedClass()
                    ]"
                  >
                    <div :class="getThemePreviewClass(themeOption.value)" class="w-full h-20 rounded mb-2"></div>
                    <span :class="valueClass" class="text-sm font-medium">{{ themeOption.label }}</span>
                  </button>
                </div>

                <h3 :class="valueClass" class="text-lg font-semibold pt-4">Dashboard Layout</h3>
                
                <div class="space-y-4">
                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Default Landing Page</p>
                      <p :class="cardLabelClass" class="text-sm">Choose where you land after login</p>
                    </div>
                    <select v-model="personalization.defaultPage" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="dashboard">Dashboard</option>
                      <option value="courses">My Courses</option>
                      <option value="events">Events</option>
                    </select>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3 border-b">
                    <div>
                      <p :class="valueClass" class="font-medium">Card Density</p>
                      <p :class="cardLabelClass" class="text-sm">Adjust how information is displayed</p>
                    </div>
                    <select v-model="personalization.cardDensity" :class="selectClass" class="px-3 py-1.5 rounded-lg">
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>

                  <div :class="settingItemClass" class="flex items-center justify-between py-3">
                    <div>
                      <p :class="valueClass" class="font-medium">Show Animations</p>
                      <p :class="cardLabelClass" class="text-sm">Enable smooth transitions and effects</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="personalization.animations" class="sr-only peer">
                      <div :class="toggleClass" class="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                </div>

                <h3 :class="valueClass" class="text-lg font-semibold pt-4">Color Scheme</h3>
                
                <div class="grid grid-cols-5 gap-3 mb-6">
                  <button 
                    v-for="color in colorSchemes" 
                    :key="color.name"
                    @click="updateAccentColor(color.value)"
                    :class="[
                      'w-full h-12 rounded-lg transition transform hover:scale-105',
                      personalization.accentColor === color.value ? getColorRingClass() : ''
                    ]"
                    :style="{ backgroundColor: color.value }"
                  >
                    <span class="sr-only">{{ color.name }}</span>
                  </button>
                </div>

                <div class="flex justify-end pt-4">
                  <button @click="updatePersonalization" :class="primaryButtonClass" class="px-6 py-2 rounded-lg transition font-medium">
                    Apply Preferences
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <StudentFooter />
  </div>
</template>

<script>
import { ref, onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import StudentFooter from '@/parent/studentfooter.vue'

export default {
  name: 'StudentProfile',
  components: {
    StudentFooter
  },
  setup() {
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
    
    // Active tab state
    const activeTab = ref('personal')
    
    // Tabs configuration
    const tabs = [
      { id: 'personal', label: 'Personal Info' },
      { id: 'settings', label: 'Settings' },
      { id: 'security', label: 'Security' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'personalization', label: 'Personalization' }
    ]
    
    // Notification items for loop
    const notificationItems = [
      { key: 'courseUpdates', label: 'Course Updates', description: 'New lessons, assignments, and deadlines' },
      { key: 'eventReminders', label: 'Event Reminders', description: 'Upcoming events and workshops' },
      { key: 'achievements', label: 'Achievements & Badges', description: 'When you earn new achievements' },
      { key: 'marketing', label: 'Marketing & Offers', description: 'Special promotions and updates' }
    ]
    
    // Theme options
    const themeOptions = [
      { value: 'light', label: 'Light Mode' },
      { value: 'dark', label: 'Dark Mode' },
      { value: 'system', label: 'System Default' }
    ]
    
    // Personal Info
    const profilePicture = ref('')
    const memberSince = ref('March 2026')
    const personalInfo = ref({
      fullName: 'John Doe',
      email: 'student@gmail.com',
      phone: '+1 234 567 8900',
      dob: '1998-05-15',
      gender: 'male',
      studentId: 'STU-2024-001',
      bio: 'Passionate learner and aspiring software developer interested in web technologies and AI.'
    })
    
    // Settings
    const settings = ref({
      language: 'en',
      timezone: 'UTC+8',
      dateFormat: 'MM/DD/YYYY',
      profileVisibility: 'public',
      showActivity: true
    })
    
    // Security
    const security = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false
    })
    
    // Notifications
    const notifications = ref({
      email: true,
      push: true,
      courseUpdates: true,
      eventReminders: true,
      achievements: true,
      marketing: false
    })
    
    // Personalization
    const personalization = ref({
      theme: 'light',
      accentColor: '#10b981',
      fontSize: 'medium',
      defaultPage: 'dashboard',
      cardDensity: 'comfortable',
      animations: true
    })
    
    // Color schemes
    const colorSchemes = [
      { name: 'Emerald', value: '#10b981' },
      { name: 'Blue', value: '#3b82f6' },
      { name: 'Purple', value: '#8b5cf6' },
      { name: 'Pink', value: '#ec489a' },
      { name: 'Orange', value: '#f97316' }
    ]
    
    // Helper function to adjust color brightness
    const adjustColor = (color) => {
      // Simple RGB adjustment - you can enhance this or use a library
      return color // Placeholder for now
    }
    
    // Apply accent color
    const applyAccentColor = (color) => {
      // Update CSS variables for Tailwind
      document.documentElement.style.setProperty('--color-emerald-500', color)
      
      // Calculate darker/lighter variants
      const darker = adjustColor(color, -20)
      const lighter = adjustColor(color, 20)
      
      document.documentElement.style.setProperty('--color-emerald-600', darker)
      document.documentElement.style.setProperty('--color-emerald-400', lighter)
      
      // Save to localStorage
      localStorage.setItem('accentColor', color)
    }
    
    // Update accent color with custom picker
    const updateAccentColor = (color) => {
      personalization.value.accentColor = color
      applyAccentColor(color)
    }
    
    // Font size management
    const updateFontSize = (size) => {
      const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
      }
      document.documentElement.style.fontSize = sizes[size]
      localStorage.setItem('fontSize', size)
    }
    
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
    
    const settingItemClass = computed(() => ({
      'border-gray-100': !isDark.value,
      'border-gray-700': isDark.value
    }))
    
    const labelClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    const inputClass = computed(() => ({
      'border border-gray-300 focus:ring-emerald-500 bg-white text-gray-800': !isDark.value,
      'border border-gray-600 focus:ring-emerald-400 bg-gray-700 text-white': isDark.value
    }))
    
    const selectClass = computed(() => ({
      'border border-gray-300 bg-white text-gray-800': !isDark.value,
      'border border-gray-600 bg-gray-700 text-white': isDark.value
    }))
    
    const disabledInputClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-600': isDark.value
    }))
    
    const primaryButtonClass = computed(() => ({
      'bg-emerald-500 hover:bg-emerald-600 text-white': !isDark.value,
      'bg-emerald-600 hover:bg-emerald-700 text-white': isDark.value
    }))
    
    const avatarBorderClass = computed(() => ({
      'border-emerald-100': !isDark.value,
      'border-emerald-800': isDark.value
    }))
    
    const uploadButtonClass = computed(() => ({
      'bg-emerald-500 hover:bg-emerald-600': !isDark.value,
      'bg-emerald-600 hover:bg-emerald-700': isDark.value
    }))
    
    const memberSinceClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    const toggleClass = computed(() => ({
      'bg-gray-200 peer-focus:ring-emerald-300 after:bg-white after:border-gray-300 peer-checked:bg-emerald-500': !isDark.value,
      'bg-gray-600 peer-focus:ring-emerald-700 after:bg-gray-200 after:border-gray-500 peer-checked:bg-emerald-600': isDark.value
    }))
    
    const activeBadgeClass = computed(() => ({
      'bg-green-100 text-green-700': !isDark.value,
      'bg-green-900/50 text-green-300': isDark.value
    }))
    
    const dangerButtonClass = computed(() => ({
      'text-red-600 hover:text-red-700': !isDark.value,
      'text-red-400 hover:text-red-300': isDark.value
    }))
    
    // Tab classes
    const getActiveTabClass = () => {
      return computed(() => ({
        'bg-emerald-500 text-white shadow-sm': !isDark.value,
        'bg-emerald-600 text-white shadow-sm': isDark.value
      })).value
    }
    
    const getInactiveTabClass = () => {
      return computed(() => ({
        'text-gray-600 hover:text-emerald-600 hover:bg-gray-50': !isDark.value,
        'text-gray-400 hover:text-emerald-400 hover:bg-gray-700': isDark.value
      })).value
    }
    
    // Two-factor button classes
    const getTwoFactorEnabledClass = () => {
      return computed(() => ({
        'bg-gray-100 text-gray-600': !isDark.value,
        'bg-gray-700 text-gray-300': isDark.value
      })).value
    }
    
    const getTwoFactorDisabledClass = () => {
      return computed(() => ({
        'bg-emerald-500 hover:bg-emerald-600 text-white': !isDark.value,
        'bg-emerald-600 hover:bg-emerald-700 text-white': isDark.value
      })).value
    }
    
    // Theme selection classes
    const getThemeSelectedClass = () => {
      return computed(() => ({
        'border-emerald-500 bg-emerald-50': !isDark.value,
        'border-emerald-400 bg-emerald-900/30': isDark.value
      })).value
    }
    
    const getThemeUnselectedClass = () => {
      return computed(() => ({
        'border-gray-200 hover:border-gray-300': !isDark.value,
        'border-gray-600 hover:border-gray-500': isDark.value
      })).value
    }
    
    const getThemePreviewClass = (themeValue) => {
      return computed(() => {
        if (themeValue === 'light') {
          return 'bg-gray-100'
        } else if (themeValue === 'dark') {
          return 'bg-gray-800'
        } else {
          return 'bg-gradient-to-r from-gray-100 to-gray-800'
        }
      }).value
    }
    
    const getColorRingClass = () => {
      return computed(() => ({
        'ring-2 ring-offset-2 ring-gray-400': !isDark.value,
        'ring-2 ring-offset-2 ring-gray-500': isDark.value
      })).value
    }
    
    // Methods
    const uploadProfilePicture = () => {
      alert('Profile picture upload functionality will be implemented')
    }
    
    const updatePersonalInfo = () => {
      alert('Personal information updated successfully!')
    }
    
    const updateSettings = () => {
      alert('Settings saved successfully!')
    }
    
    const changePassword = () => {
      if (security.value.newPassword !== security.value.confirmPassword) {
        alert('New passwords do not match!')
        return
      }
      if (security.value.newPassword.length < 8) {
        alert('Password must be at least 8 characters!')
        return
      }
      alert('Password changed successfully!')
      security.value.currentPassword = ''
      security.value.newPassword = ''
      security.value.confirmPassword = ''
    }
    
    const setupTwoFactor = () => {
      alert('Two-factor authentication setup will be implemented')
    }
    
    const logoutAllDevices = () => {
      if (confirm('Are you sure you want to log out from all devices?')) {
        alert('Logged out from all devices')
      }
    }
    
    const updateNotifications = () => {
      alert('Notification preferences saved!')
    }
    
    const updatePersonalization = () => {
      // Apply theme (dark/light)
      if (personalization.value.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (personalization.value.theme === 'light') {
        document.documentElement.classList.remove('dark')
      } else if (personalization.value.theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (systemDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      
      // Apply accent color
      applyAccentColor(personalization.value.accentColor)
      
      // Apply font size
      updateFontSize(personalization.value.fontSize)
      
      // Apply card density (using CSS classes)
      document.documentElement.className = document.documentElement.className.replace(/card-density-\w+/, '')
      document.documentElement.classList.add(`card-density-${personalization.value.cardDensity}`)
      
      alert('Personalization preferences applied!')
    }
    
    // Load user data on mount
    onMounted(() => {
      const user = localStorage.getItem('user')
      if (!user) {
        router.push('/login')
      } else {
        const userData = JSON.parse(user)
        if (userData.fullName) personalInfo.value.fullName = userData.fullName
        if (userData.email) personalInfo.value.email = userData.email
        
        // Load saved preferences
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) personalization.value.theme = savedTheme
        
        const savedAccentColor = localStorage.getItem('accentColor')
        if (savedAccentColor) {
          personalization.value.accentColor = savedAccentColor
          applyAccentColor(savedAccentColor)
        }
        
        const savedFontSize = localStorage.getItem('fontSize')
        if (savedFontSize) {
          personalization.value.fontSize = savedFontSize
          updateFontSize(savedFontSize)
        }
        
        const savedSettings = localStorage.getItem('userSettings')
        if (savedSettings) {
          const settingsData = JSON.parse(savedSettings)
          settings.value = { ...settings.value, ...settingsData }
          personalization.value = { ...personalization.value, ...settingsData.personalization }
          notifications.value = { ...notifications.value, ...settingsData.notifications }
        }
      }
    })
    
    return {
      activeTab,
      tabs,
      notificationItems,
      themeOptions,
      profilePicture,
      memberSince,
      personalInfo,
      settings,
      security,
      notifications,
      personalization,
      colorSchemes,
      // Theme classes
      dashboardBgClass,
      cardClass,
      cardLabelClass,
      valueClass,
      headingClass,
      subheadingClass,
      borderClass,
      settingItemClass,
      labelClass,
      inputClass,
      selectClass,
      disabledInputClass,
      primaryButtonClass,
      avatarBorderClass,
      uploadButtonClass,
      memberSinceClass,
      toggleClass,
      activeBadgeClass,
      dangerButtonClass,
      // Methods
      getActiveTabClass,
      getInactiveTabClass,
      getTwoFactorEnabledClass,
      getTwoFactorDisabledClass,
      getThemeSelectedClass,
      getThemeUnselectedClass,
      getThemePreviewClass,
      getColorRingClass,
      uploadProfilePicture,
      updatePersonalInfo,
      updateSettings,
      changePassword,
      setupTwoFactor,
      logoutAllDevices,
      updateNotifications,
      updatePersonalization,
      updateAccentColor
    }
  }
}
</script>

<style scoped>
.transition {
  transition: all 0.2s ease;
}

/* Custom checkbox styling */
input[type="checkbox"] {
  cursor: pointer;
}

/* Smooth tab transitions */
button {
  transition: all 0.2s ease;
}

/* Smooth transitions for all elements */
* {
  transition-property: background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.ml-64 {
  margin-left: 16rem;
}
</style>