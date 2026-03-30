<template>
  
  <div 
    class="min-h-screen transition-colors duration-300"
    :class="mainBgClass"
  >
    <main class="ml-64 p-8">
      <div class="mb-8">
        <div class="flex justify-between items-start">
          <div>
            <h1 
              class="text-3xl font-bold transition-colors duration-300"
              :class="headerTextClass"
            >
              Profile Management
            </h1>
            <p 
              class="mt-1 transition-colors duration-300"
              :class="descriptionTextClass"
            >
              Manage your account settings and personal information
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

      <div 
        class="mb-8 border-b transition-colors duration-300"
        :class="tabBorderClass"
      >
        <div class="flex space-x-8">
          <button 
            @click="activeTab = 'personal'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              getTabButtonClass('personal')
            ]"
          >
            Personal Info
          </button>
          
          <button 
            @click="activeTab = 'account'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              getTabButtonClass('account')
            ]"
          >
            Accounts
          </button>
          
          <button 
            @click="activeTab = 'security'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              getTabButtonClass('security')
            ]"
          >
            Security
          </button>
          
          <button 
            @click="activeTab = 'notifications'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              getTabButtonClass('notifications')
            ]"
          >
            Notifications
          </button>

          <button 
            @click="activeTab = 'Personalization'" 
            :class="[
              'pb-3 px-1 text-sm font-medium transition-all duration-300',
              getTabButtonClass('Personalization')
            ]"
          >
            Personalization
          </button>
        </div>
      </div>
      <component :is="currentTabComponent" />
    </main>
  </div>
</template>

<script>
import PersonalInfoTab from './components/personalinfo.vue'
import AccountTab from './components/account.vue'
import SecurityTab from './components/security.vue'
import NotificationsTab from './components/notifications.vue'
import PersonalizationTab from './components/personalization.vue'
import { ref, onMounted, onUnmounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminProfile',
  components: {
    PersonalInfoTab,
    AccountTab,
    SecurityTab,
    NotificationsTab,
    PersonalizationTab
  },
  setup() {
    const router = useRouter()

    // --- Theme Integration ---
    // Inject the global theme from App.vue
    const theme = inject('theme', {
      currentTheme: { value: 'light' },
      isDark: () => false
    })

    // Create a reactive reference to the current theme
    const isDark = computed(() => {
      return theme.currentTheme?.value === 'dark' || theme.isDark?.()
    })

    // --- Theme-aware CSS Classes ---
    // These classes automatically update when theme changes

    const mainBgClass = computed(() => ({
      'bg-gradient-to-br from-gray-50 to-gray-100': !isDark.value,
      'bg-gradient-to-br from-gray-900 to-gray-800': isDark.value
    }))

    const headerTextClass = computed(() => ({
      'text-gray-800': !isDark.value,
      'text-white': isDark.value
    }))

    const descriptionTextClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))

    const dateTextClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))

    const timeTextClass = computed(() => ({
      'text-gray-500': !isDark.value,
      'text-gray-400': isDark.value
    }))

    const tabBorderClass = computed(() => ({
      'border-gray-200': !isDark.value,
      'border-gray-700': isDark.value
    }))

    const getTabButtonClass = (tabName) => {
      const isActive = activeTab.value === tabName
      
      if (isActive) {
        return {
          'text-emerald-600 border-b-2 border-emerald-600': !isDark.value,
          'text-emerald-400 border-b-2 border-emerald-400': isDark.value
        }
      } else {
        return {
          'text-gray-500 hover:text-gray-700': !isDark.value,
          'text-gray-400 hover:text-gray-300': isDark.value
        }
      }
    }

    const activeTab = ref('personal')

    const currentDate = ref('')
    const currentTime = ref('')
    let timeInterval = null

    const currentTabComponent = computed(() => {
      switch (activeTab.value) {
        case 'personal':
          return PersonalInfoTab
        case 'account':
          return AccountTab
        case 'security':
          return SecurityTab
        case 'notifications':
          return NotificationsTab
        case 'Personalization':
          return PersonalizationTab
        default:
          return PersonalInfoTab
      }
    })

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

    onMounted(() => {
      const user = localStorage.getItem('user')
      if (!user || JSON.parse(user).role !== 'admin') {
        router.push('/')
      }
      updateDateTime()
      timeInterval = setInterval(updateDateTime, 1000)
    })

    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })

    return {
      mainBgClass,
      headerTextClass,
      descriptionTextClass,
      dateTextClass,
      timeTextClass,
      tabBorderClass,
      getTabButtonClass,
      activeTab,
      currentDate,
      currentTime,
      currentTabComponent
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track, #f1f1f1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb, #c1c1c1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover, #a8a8a8);
}
:root {
  --scrollbar-track: #f1f1f1;
  --scrollbar-thumb: #c1c1c1;
  --scrollbar-thumb-hover: #a8a8a8;
}

.dark {
  --scrollbar-track: #2d2d2d;
  --scrollbar-thumb: #4a4a4a;
  --scrollbar-thumb-hover: #5a5a5a;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

button {
  transition: all 0.2s ease;
  cursor: pointer;
}

:deep(.card) {
  background-color: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

:deep(.card:hover) {
  box-shadow: var(--shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}

:deep(input), :deep(textarea), :deep(select) {
  background-color: var(--input-bg, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  color: var(--text-primary, #1f2937);
  transition: all 0.3s ease;
}

:deep(input:focus), :deep(textarea:focus), :deep(select:focus) {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

:deep(label) {
  color: var(--text-secondary, #6b7280);
  transition: color 0.3s ease;
}

:deep(table) {
  background-color: var(--table-bg, #ffffff);
  border-color: var(--border-color, #e5e7eb);
}

:deep(th) {
  background-color: var(--table-header-bg, #f9fafb);
  color: var(--text-primary, #1f2937);
  border-color: var(--border-color, #e5e7eb);
}

:deep(td) {
  border-color: var(--border-color, #e5e7eb);
  color: var(--text-secondary, #6b7280);
}

:deep(tr:hover) {
  background-color: var(--table-hover-bg, #f9fafb);
}
</style>