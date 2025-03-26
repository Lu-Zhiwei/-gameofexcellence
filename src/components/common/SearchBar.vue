<template>
    <div class="relative">
      <div class="flex items-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索工具..."
          class="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          @focus="showResults = true"
          @blur="hideResultsDelayed"
        />
        <button 
          class="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
          @click="search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      <!-- Search Results -->
      <div 
        v-if="showResults && filteredTools.length > 0" 
        class="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-80 overflow-y-auto"
      >
        <div class="py-2">
          <router-link
            v-for="tool in filteredTools"
            :key="tool.id"
            :to="`/tools/${tool.id}`"
            class="block px-4 py-2 hover:bg-indigo-50"
            @mousedown.prevent
            @click="showResults = false"
          >
            <div class="flex items-center">
              <img :src="`/icons/${tool.icon}`" alt="" class="h-6 w-6 mr-3" />
              <div>
                <p class="font-medium text-gray-800">{{ tool.name }}</p>
                <p class="text-sm text-gray-500">{{ tool.shortDescription }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  
  export default {
    name: 'SearchBar',
    setup() {
      const searchQuery = ref('')
      const showResults = ref(false)
      const router = useRouter()
      const store = useStore()
      
      let hideTimeout = null
      
      const hideResultsDelayed = () => {
        hideTimeout = setTimeout(() => {
          showResults.value = false
        }, 200)
      }
      
      const filteredTools = computed(() => {
        if (!searchQuery.value) return store.state.tools.featuredTools
        
        const query = searchQuery.value.toLowerCase()
        return store.state.tools.allTools.filter(tool => 
          tool.name.toLowerCase().includes(query) || 
          tool.description.toLowerCase().includes(query) ||
          (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)))
        )
      })
      
      const search = () => {
        if (searchQuery.value) {
          router.push({
            path: '/tools',
            query: { q: searchQuery.value }
          })
          showResults.value = false
        }
      }
      
      return {
        searchQuery,
        showResults,
        filteredTools,
        hideResultsDelayed,
        search
      }
    }
  }
  </script>