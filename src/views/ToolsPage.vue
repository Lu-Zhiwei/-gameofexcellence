<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">图像处理工具</h1>
      
      <!-- Filters -->
      <div class="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select 
              v-model="selectedCategory" 
              class="border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">全部工具</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          
          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索工具..." 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
      
      <!-- Results -->
      <div v-if="filteredTools.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="tool in filteredTools" 
          :key="tool.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <img :src="`/icons/${tool.icon}`" class="h-16 w-16" :alt="tool.name" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ tool.name }}</h3>
            <p class="text-gray-600 mb-4">{{ tool.shortDescription }}</p>
            <router-link 
              :to="`/tools/${tool.id}`" 
              class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              使用工具
            </router-link>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">未找到工具</h3>
        <p class="mt-1 text-gray-500">尝试调整过滤条件或搜索其他关键词</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  
  export default {
    name: 'ToolsPage',
    setup() {
      const route = useRoute()
      const store = useStore()
      
      const searchQuery = ref('')
      const selectedCategory = ref('all')
      
      const categories = [
        { id: 'watermark', name: '水印处理' },
        { id: 'background', name: '背景编辑' },
        { id: 'conversion', name: '图像转换' },
        { id: 'manipulation', name: '图像处理' }
      ]
      
      const filteredTools = computed(() => {
        let tools = store.state.tools.allTools
        
        // Filter by category
        if (selectedCategory.value !== 'all') {
          tools = tools.filter(tool => tool.category === selectedCategory.value)
        }
        
        // Filter by search query
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase()
          tools = tools.filter(tool => 
            tool.name.toLowerCase().includes(query) || 
            tool.description.toLowerCase().includes(query) ||
            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)))
          )
        }
        
        return tools
      })
      
      onMounted(() => {
        // Set initial filters from URL query params
        if (route.query.category) {
          selectedCategory.value = route.query.category
        }
        
        if (route.query.q) {
          searchQuery.value = route.query.q
        }
      })
      
      return {
        searchQuery,
        selectedCategory,
        categories,
        filteredTools
      }
    }
  }
  </script>