<template>
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <img src="/logo.svg" alt="GameOfExcellence" class="h-10 w-auto" />
              <span class="ml-3 text-xl font-bold text-indigo-700">GameOfExcellence</span>
            </router-link>
            
            <nav class="hidden md:ml-10 md:flex md:space-x-8">
              <router-link 
                v-for="item in navItems" 
                :key="item.path" 
                :to="item.path"
                class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors"
                :class="{ 'text-indigo-600': isActive(item.path) }"
              >
                {{ item.name }}
              </router-link>
            </nav>
          </div>
          
          <div class="flex items-center">
            <SearchBar class="hidden md:block mr-4" />
            <button 
              class="md:hidden text-gray-600"
              @click="toggleMobileMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4">
          <SearchBar class="mb-4" />
          <nav class="flex flex-col">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors"
              :class="{ 'text-indigo-600': isActive(item.path) }"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import SearchBar from './SearchBar.vue'
  
  export default {
    name: 'SiteHeader',
    components: {
      SearchBar
    },
    setup() {
      const mobileMenuOpen = ref(false)
      const route = useRoute()
      
      const navItems = [
        { name: '首页', path: '/' },
        { name: '工具', path: '/tools' },
        { name: '关于我们', path: '/about' },
        { name: '联系我们', path: '/contact' }
      ]
      
      const toggleMobileMenu = () => {
        mobileMenuOpen.value = !mobileMenuOpen.value
      }
      
      const isActive = (path) => {
        if (path === '/') {
          return route.path === '/'
        }
        return route.path.startsWith(path)
      }
      
      return {
        mobileMenuOpen,
        navItems,
        toggleMobileMenu,
        isActive
      }
    }
  }
  </script>