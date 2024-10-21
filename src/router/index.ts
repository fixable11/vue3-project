import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: HomeView
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: () => import('../views/CreatePostView.vue')
    },
    {
      path: '/posts/:postId',
      name: 'edit-post',
      component: () => import('../views/EditPostView.vue')
    }
  ]
})

export default router
