// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MarkdownConverter from '@/views/MarkdownConvertor.vue'

const routes = [
  {
    path: '/convert/markdown',
    name: 'MarkdownConverter',
    component: MarkdownConverter,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
