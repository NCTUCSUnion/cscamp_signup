import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/team',
    name: 'Teams',
    component: () => import('../views/Teams.vue')
  },
  {
    path: '/team/admin',
    name: 'AdminTeam',
    component: () => import('../views/teams/Admin.vue')
  },
  {
    path: '/team/event',
    name: 'EventTeam',
    component: () => import('../views/teams/Event.vue')
  },
  {
    path: '/team/design',
    name: 'DesignTeam',
    component: () => import('../views/teams/Design.vue')
  },
  {
    path: '/team/life',
    name: 'LifeTeam',
    component: () => import('../views/teams/Life.vue')
  },
  {
    path: '/team/study',
    name: 'StudyTeam',
    component: () => import('../views/teams/Study.vue')
  },
  {
    path: '/team/facilities',
    name: 'FacilitiesTeam',
    component: () => import('../views/teams/Facilities.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../views/FAQ.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  }
})

export default router 