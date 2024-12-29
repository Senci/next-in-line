import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardSelectionView from '@/views/DashboardSelectionView.vue'
import TicketsView from '@/views/TicketsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard-selection',
    component: DashboardSelectionView,
  },
  {
    path: '/dashboard/:queueName',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/tickets/:queueName',
    name: 'tickets',
    component: TicketsView,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})