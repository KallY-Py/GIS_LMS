<template>
  <div :class="dashboardBgClass" class="min-h-screen">
    <!-- Main Content with Sidebar Margin -->
    <div class="ml-0">
      <div class="p-8">
        <!-- Header Section -->
        <div class="mb-8">
          <h1 :class="headingClass">Affiliate Program</h1>
          <p :class="subheadingClass">Share, earn rewards, and track your referrals</p>
        </div>

        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Referrals Card -->
          <div :class="statsCardClass" class="rounded-xl shadow-lg p-6 text-white">
            <div class="flex items-center justify-between mb-3">
              <h3 :class="statsLabelClass" class="text-sm font-medium">Total Referrals</h3>
              <svg :class="statsIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="text-4xl font-bold mb-2">{{ totalReferrals }}</div>
            <p :class="statsLabelClass" class="text-sm">Lifetime referrals</p>
          </div>

          <!-- Successful Referrals Card -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-3">
              <h3 :class="cardLabelClass" class="text-sm font-medium">Successful</h3>
              <svg :class="successIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div :class="valueClass" class="text-3xl font-bold">{{ successfulReferrals }}</div>
            <p :class="successTrendClass" class="text-sm mt-2">↑ +{{ thisMonthSuccess }} this month</p>
          </div>

          <!-- Pending Referrals Card -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-3">
              <h3 :class="cardLabelClass" class="text-sm font-medium">Pending</h3>
              <svg :class="pendingIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div :class="valueClass" class="text-3xl font-bold">{{ pendingReferrals }}</div>
            <p :class="pendingTrendClass" class="text-sm mt-2">Awaiting confirmation</p>
          </div>

          <!-- Total Earnings Card -->
          <div :class="cardClass" class="rounded-xl shadow-sm p-6 hover:shadow-lg transition">
            <div class="flex items-center justify-between mb-3">
              <h3 :class="cardLabelClass" class="text-sm font-medium">Total Earnings</h3>
              <svg :class="earningsIconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div :class="valueClass" class="text-3xl font-bold">${{ totalEarnings }}</div>
            <p :class="earningsTrendClass" class="text-sm mt-2">+${{ thisMonthEarnings }} this month</p>
          </div>
        </div>

        <!-- Main Affiliate Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Referral Code & Share -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Share & Earn Card -->
            <div :class="cardClass" class="rounded-xl shadow-sm p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 :class="valueClass" class="text-xl font-semibold mb-2">Share & Earn</h2>
                  <p :class="cardLabelClass" class="text-sm">Share your referral code with friends. You'll earn rewards for every successful sign-up.</p>
                </div>
                <span :class="activeBadgeClass" class="px-3 py-1 rounded-full text-sm font-medium">Active</span>
              </div>
              
              <!-- Referral Code Box -->
              <div :class="codeBoxClass" class="rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between flex-wrap gap-3">
                  <div class="flex-1">
                    <p :class="cardLabelClass" class="text-xs mb-1">Your Referral Code</p>
                    <p :class="codeTextClass" class="text-2xl font-mono font-bold">{{ referralCode }}</p>
                  </div>
                  <button 
                    @click="copyReferralCode"
                    :class="primaryButtonClass"
                    class="px-4 py-2 rounded-lg transition flex items-center space-x-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span>Copy Referral Link</span>
                  </button>
                </div>
              </div>

              <!-- Share Options -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button @click="shareVia('email')" :class="shareButtonClass" class="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-sm">Email</span>
                </button>
                <button @click="shareVia('whatsapp')" :class="shareButtonClass" class="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition">
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  <span class="text-sm">WhatsApp</span>
                </button>
                <button @click="shareVia('twitter')" :class="shareButtonClass" class="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition">
                  <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.803-12.368c0-.213-.005-.426-.015-.637A9.936 9.936 0 0024 4.59z"/>
                  </svg>
                  <span class="text-sm">Twitter</span>
                </button>
                <button @click="shareVia('facebook')" :class="shareButtonClass" class="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span class="text-sm">Facebook</span>
                </button>
              </div>
            </div>

            <!-- Referral Stats & History -->
            <div :class="cardClass" class="rounded-xl shadow-sm p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 :class="valueClass" class="text-xl font-semibold">Referral History</h2>
                <select v-model="referralFilter" :class="selectClass" class="px-3 py-1 rounded-lg text-sm">
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                </select>
              </div>
              
              <div class="space-y-4">
                <div v-for="referral in filteredReferrals" :key="referral.id" :class="referralItemClass" class="flex items-center justify-between p-4 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div :class="avatarClass" class="w-10 h-10 rounded-full flex items-center justify-center">
                      <span :class="avatarTextClass" class="font-semibold">{{ referral.name.charAt(0) }}</span>
                    </div>
                    <div>
                      <p :class="valueClass" class="font-medium">{{ referral.name }}</p>
                      <p :class="cardLabelClass" class="text-xs">{{ referral.email }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium" :class="referral.status === 'successful' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'">
                      {{ referral.status === 'successful' ? '✓ Completed' : '⏳ Pending' }}
                    </p>
                    <p :class="cardLabelClass" class="text-xs">{{ formatDate(referral.date) }}</p>
                  </div>
                </div>
                
                <div v-if="filteredReferrals.length === 0" :class="cardLabelClass" class="text-center py-8">
                  No referrals found
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Rewards & Tips -->
          <div class="space-y-6">
            <!-- Rewards Card -->
            <div :class="rewardsCardClass" class="rounded-xl shadow-lg p-6 text-white">
              <h3 class="text-lg font-semibold mb-3">🎁 Your Rewards</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span :class="rewardsLabelClass">Referral Bonus</span>
                  <span class="font-bold">$10 per referral</span>
                </div>
                <div class="flex justify-between items-center">
                  <span :class="rewardsLabelClass">Total Earned</span>
                  <span class="font-bold text-xl">${{ totalEarnings }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span :class="rewardsLabelClass">Next Milestone</span>
                  <span class="font-bold">{{ nextMilestone }} referrals</span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-emerald-400 dark:border-emerald-600">
                <div class="w-full bg-emerald-700 dark:bg-emerald-800 rounded-full h-2">
                  <div class="bg-white h-2 rounded-full" :style="{ width: progressToNextMilestone + '%' }"></div>
                </div>
                <p :class="rewardsLabelClass" class="text-xs mt-2">Refer {{ referralsToNextMilestone }} more to unlock $50 bonus!</p>
              </div>
            </div>

            <!-- Tips & Best Practices -->
            <div :class="cardClass" class="rounded-xl shadow-sm p-6">
              <h3 :class="valueClass" class="font-semibold mb-4">💡 Pro Tips</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div :class="tipIconClass" class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span :class="tipIconTextClass" class="text-xs">1</span>
                  </div>
                  <p :class="cardLabelClass" class="text-sm">Share your referral link on social media</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div :class="tipIconClass" class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span :class="tipIconTextClass" class="text-xs">2</span>
                  </div>
                  <p :class="cardLabelClass" class="text-sm">Personalize your message to increase conversions</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div :class="tipIconClass" class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span :class="tipIconTextClass" class="text-xs">3</span>
                  </div>
                  <p :class="cardLabelClass" class="text-sm">Follow up with pending referrals</p>
                </div>
              </div>
            </div>

            <!-- Affiliate FAQ -->
            <div :class="cardClass" class="rounded-xl shadow-sm p-6">
              <h3 :class="valueClass" class="font-semibold mb-4">❓ FAQ</h3>
              <div class="space-y-3">
                <details class="group">
                  <summary :class="faqSummaryClass" class="cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                    How do I earn rewards?
                  </summary>
                  <p :class="cardLabelClass" class="mt-2 text-xs">You earn $10 for every successful referral who signs up and completes their first course.</p>
                </details>
                <details class="group">
                  <summary :class="faqSummaryClass" class="cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                    When do I get paid?
                  </summary>
                  <p :class="cardLabelClass" class="mt-2 text-xs">Payouts are processed monthly for all successful referrals.</p>
                </details>
                <details class="group">
                  <summary :class="faqSummaryClass" class="cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                    What counts as successful?
                  </summary>
                  <p :class="cardLabelClass" class="mt-2 text-xs">A referral is successful when the referred user completes account verification and enrolls in a course.</p>
                </details>
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
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import StudentFooter from '@/parent/studentfooter.vue'

export default {
  name: 'AffiliatePage',
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
    
    // User verification status
    const isVerified = ref(true)
    
    // Affiliate stats
    const referralCode = ref('STU-HUB-7X92K')
    const totalReferrals = ref(24)
    const successfulReferrals = ref(18)
    const pendingReferrals = ref(6)
    const totalEarnings = ref(180)
    const thisMonthSuccess = ref(5)
    const thisMonthEarnings = ref(50)
    
    // Filters
    const referralFilter = ref('all')
    
    // Referral history data
    const referralsHistory = ref([
      { id: 1, name: 'John Smith', email: 'john.smith@email.com', status: 'successful', date: '2026-03-15' },
      { id: 2, name: 'Emily Johnson', email: 'emily.j@email.com', status: 'successful', date: '2026-03-10' },
      { id: 3, name: 'Michael Brown', email: 'michael.b@email.com', status: 'pending', date: '2026-03-18' },
      { id: 4, name: 'Sarah Davis', email: 'sarah.d@email.com', status: 'successful', date: '2026-03-05' },
      { id: 5, name: 'David Wilson', email: 'david.w@email.com', status: 'pending', date: '2026-03-20' },
      { id: 6, name: 'Lisa Anderson', email: 'lisa.a@email.com', status: 'successful', date: '2026-02-28' },
    ])
    
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
    
    // Stats card classes
    const statsCardClass = computed(() => ({
      'bg-gradient-to-br from-emerald-500 to-teal-600': !isDark.value,
      'bg-gradient-to-br from-emerald-700 to-teal-800': isDark.value
    }))
    
    const statsLabelClass = computed(() => ({
      'text-emerald-100': !isDark.value,
      'text-emerald-200': isDark.value
    }))
    
    const statsIconClass = computed(() => ({
      'text-emerald-200': !isDark.value,
      'text-emerald-300': isDark.value
    }))
    
    const successIconClass = computed(() => ({
      'text-green-500': !isDark.value,
      'text-green-400': isDark.value
    }))
    
    const pendingIconClass = computed(() => ({
      'text-yellow-500': !isDark.value,
      'text-yellow-400': isDark.value
    }))
    
    const earningsIconClass = computed(() => ({
      'text-emerald-500': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    const successTrendClass = computed(() => ({
      'text-green-500': !isDark.value,
      'text-green-400': isDark.value
    }))
    
    const pendingTrendClass = computed(() => ({
      'text-yellow-500': !isDark.value,
      'text-yellow-400': isDark.value
    }))
    
    const earningsTrendClass = computed(() => ({
      'text-emerald-500': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    // Button classes
    const primaryButtonClass = computed(() => ({
      'bg-emerald-500 hover:bg-emerald-600 text-white': !isDark.value,
      'bg-emerald-600 hover:bg-emerald-700 text-white': isDark.value
    }))
    
    const shareButtonClass = computed(() => ({
      'bg-gray-100 hover:bg-gray-200 text-gray-700': !isDark.value,
      'bg-gray-700 hover:bg-gray-600 text-gray-200': isDark.value
    }))
    
    // Badge classes
    const activeBadgeClass = computed(() => ({
      'bg-emerald-100 text-emerald-700': !isDark.value,
      'bg-emerald-900/50 text-emerald-300': isDark.value
    }))
    
    // Code box classes
    const codeBoxClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    const codeTextClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    // Select dropdown
    const selectClass = computed(() => ({
      'border border-gray-300 bg-white text-gray-800': !isDark.value,
      'border border-gray-600 bg-gray-700 text-white': isDark.value
    }))
    
    // Referral item classes
    const referralItemClass = computed(() => ({
      'bg-gray-50': !isDark.value,
      'bg-gray-700/50': isDark.value
    }))
    
    const avatarClass = computed(() => ({
      'bg-emerald-100': !isDark.value,
      'bg-emerald-900/50': isDark.value
    }))
    
    const avatarTextClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    // Rewards card
    const rewardsCardClass = computed(() => ({
      'bg-gradient-to-br from-emerald-500 to-teal-600': !isDark.value,
      'bg-gradient-to-br from-emerald-700 to-teal-800': isDark.value
    }))
    
    const rewardsLabelClass = computed(() => ({
      'text-emerald-100': !isDark.value,
      'text-emerald-200': isDark.value
    }))
    
    // Tip icon classes
    const tipIconClass = computed(() => ({
      'bg-emerald-100': !isDark.value,
      'bg-emerald-900/50': isDark.value
    }))
    
    const tipIconTextClass = computed(() => ({
      'text-emerald-600': !isDark.value,
      'text-emerald-400': isDark.value
    }))
    
    // FAQ summary
    const faqSummaryClass = computed(() => ({
      'text-gray-700': !isDark.value,
      'text-gray-300': isDark.value
    }))
    
    // Computed properties
    const filteredReferrals = computed(() => {
      let filtered = referralsHistory.value
      
      switch(referralFilter.value) {
        case 'month': {
          const currentMonth = new Date().getMonth()
          filtered = filtered.filter(r => new Date(r.date).getMonth() === currentMonth)
          break
        }
        case 'week': {
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
          filtered = filtered.filter(r => new Date(r.date) >= oneWeekAgo)
          break
        }
        default:
          break
      }
      
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    const nextMilestone = computed(() => {
      const milestones = [25, 50, 100, 200]
      for (let milestone of milestones) {
        if (totalReferrals.value < milestone) {
          return milestone
        }
      }
      return milestones[milestones.length - 1]
    })
    
    const referralsToNextMilestone = computed(() => {
      return nextMilestone.value - totalReferrals.value
    })
    
    const progressToNextMilestone = computed(() => {
      const previousMilestone = nextMilestone.value === 25 ? 0 : 
        nextMilestone.value === 50 ? 25 :
        nextMilestone.value === 100 ? 50 : 100
      const progress = ((totalReferrals.value - previousMilestone) / (nextMilestone.value - previousMilestone)) * 100
      return Math.min(100, Math.max(0, progress))
    })
    
    // Methods
    const copyReferralCode = async () => {
      const referralLink = `${window.location.origin}/signup?ref=${referralCode.value}`
      try {
        await navigator.clipboard.writeText(referralLink)
        alert('Referral link copied to clipboard!')
      } catch (err) {
        alert('Failed to copy link')
      }
    }
    
    const shareVia = (platform) => {
      const text = `Join me on GRIDS using my referral code: ${referralCode.value}! Get started with amazing courses and earn rewards!`
      const url = `${window.location.origin}/signup?ref=${referralCode.value}`
      
      let shareUrl = ''
      switch(platform) {
        case 'email':
          shareUrl = `mailto:?subject=Join me on GRIDS&body=${encodeURIComponent(text + '\n\n' + url)}`
          break
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
          break
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer')
      }
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    }
    
    const verifyAccount = () => {
      router.push('/verify-account')
    }
    
    // Fetch affiliate data on mount
    onMounted(() => {
      const user = localStorage.getItem('user')
      if (!user) {
        router.push('/login')
      } else {
        const userData = JSON.parse(user)
        isVerified.value = userData.isVerified || false
      }
    })
    
    return {
      isVerified,
      referralCode,
      totalReferrals,
      successfulReferrals,
      pendingReferrals,
      totalEarnings,
      thisMonthSuccess,
      thisMonthEarnings,
      referralFilter,
      filteredReferrals,
      nextMilestone,
      referralsToNextMilestone,
      progressToNextMilestone,
      copyReferralCode,
      shareVia,
      formatDate,
      verifyAccount,
      // Theme classes
      dashboardBgClass,
      cardClass,
      cardLabelClass,
      valueClass,
      headingClass,
      subheadingClass,
      statsCardClass,
      statsLabelClass,
      statsIconClass,
      successIconClass,
      pendingIconClass,
      earningsIconClass,
      successTrendClass,
      pendingTrendClass,
      earningsTrendClass,
      primaryButtonClass,
      shareButtonClass,
      activeBadgeClass,
      codeBoxClass,
      codeTextClass,
      selectClass,
      referralItemClass,
      avatarClass,
      avatarTextClass,
      rewardsCardClass,
      rewardsLabelClass,
      tipIconClass,
      tipIconTextClass,
      faqSummaryClass
    }
  }
}
</script>

<style scoped>
details summary {
  list-style: none;
  cursor: pointer;
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 8px;
  font-size: 10px;
  transition: transform 0.2s;
}

details[open] summary::before {
  transform: rotate(90deg);
}

.transition {
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