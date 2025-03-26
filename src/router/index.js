import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ToolsPage from '@/views/ToolsPage.vue'
import ToolDetail from '@/views/ToolDetail.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'GameOfExcellence - Advanced Image Processing Tools',
      description: 'Free online image processing tools for watermark removal, background changing, transparency creation, and image splitting.'
    }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: ToolsPage,
    meta: {
      title: 'Online Image Processing Tools | GameOfExcellence',
      description: 'Discover our collection of free image processing tools to enhance and modify your photos online.'
    }
  },
  {
    path: '/tools/:toolId',
    name: 'ToolDetail',
    component: ToolDetail,
    props: true,
    meta: {
      dynamicTitle: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About Us | GameOfExcellence',
      description: 'Learn about GameOfExcellence and our mission to provide high-quality image processing tools for everyone.'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contact Us | GameOfExcellence',
      description: 'Get in touch with the GameOfExcellence team. We're here to help with any questions or feedback.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Dynamic SEO meta tags
router.beforeEach((to, from, next) => {
  // Set default title
  document.title = to.meta.title || 'GameOfExcellence'
  
  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || 'Online image processing tools')
  }
  
  next()
})

export default router