import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/UserLogin.vue'
import Landing from '../views/landing.vue' 

import AdminLayout from '../parent/AdminLayout.vue'
import AdminDashboard from '../views/admin/admindashboard.vue'
import AdminCourse from '../views/admin/admincourse.vue'
import AdminEvents from '../views/admin/adminevents.vue'
import AdminAffiliate from '../views/admin/adminaffiliate.vue'
import AdminProfile from '../views/admin/adminprofile.vue'

import StudentLayout from '../parent/StudentLayout.vue'
import StudentDashboard from '../views/student/studentdashboard.vue'
import StudentCourse from '../views/student/studentcourse.vue'
import StudentEvents from '../views/student/studentevents.vue'
import StudentAffiliate from '../views/student/studentaffiliate.vue'
import StudentProfile from '../views/student/studentprofile.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'courses',
        name: 'AdminCourse',
        component: AdminCourse,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'events',
        name: 'AdminEvents',
        component: AdminEvents, 
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'affiliate',
        name: 'AdminAffiliate',
        component: AdminAffiliate,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: AdminProfile,
        meta: { requiresAuth: true, role: 'admin' }
      },
      {
        path: '',
        redirect: '/admin/dashboard'
      }
    ]
  },
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: StudentDashboard,
        meta: { requiresAuth: true, role: 'student' }
      },
      {
        path: 'courses',
        name: 'StudentCourse',
        component: StudentCourse,
        meta: { requiresAuth: true, role: 'student' }
      },
      {
        path: 'events',
        name: 'StudentEvents',
        component: StudentEvents,
        meta: { requiresAuth: true, role: 'student' }
      },
      {
        path: 'affiliate',
        name: 'StudentAffiliate',
        component: StudentAffiliate,
        meta: { requiresAuth: true, role: 'student' }
      },
      {
        path: 'profile',
        name: 'StudentProfile',
        component: StudentProfile,
        meta: { requiresAuth: true, role: 'student' }
      }
    ]
  },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  
  // If the route requires authentication
  if (to.meta.requiresAuth) {
    if (!user) {
      // Not logged in, redirect to landing page
      next('/')
    } else {
      const userData = JSON.parse(user)
      // Check if user has required role
      if (to.meta.role && userData.role !== to.meta.role) {
        // Wrong role, redirect to appropriate dashboard
        if (userData.role === 'admin') {
          next('/admin/dashboard')
        } else if (userData.role === 'student') {
          next('/student/dashboard')
        } else {
          next('/')
        }
      } else {
        // Authorized, proceed
        next()
      }
    }
  } else {
    // For non-auth routes (landing and login), check if user is already logged in
    if ((to.path === '/' || to.path === '/login') && user) {
      const userData = JSON.parse(user)
      if (userData.role === 'admin') {
        next('/admin/dashboard')
      } else if (userData.role === 'student') {
        next('/student/dashboard')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

console.log('Router initialized with routes:', routes.map(r => r.path))

export default router