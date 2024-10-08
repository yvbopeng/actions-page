import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/env-view',
      name: 'EnvView',
      component: () => import('../views/EnvView.vue')
    },
   
    {
      path: '/draw-canvas',
      name: 'DrawCanvas',
      component: () => import('../views/DrawCanvas.vue')  
    },
    {
      path: '/base-to-image',
      name: 'BaseToImage',
      component: () => import('../views/BaseToImage.vue')
    }
  ]
})

export default router
