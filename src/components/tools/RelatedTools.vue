<template>
    <div>
      <h2 class="text-2xl font-bold mb-6">相关工具</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="tool in relatedTools" 
          :key="tool.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img 
            v-if="tool.image" 
            :src="tool.image" 
            :alt="tool.name" 
            class="w-full h-40 object-cover"
          />
          <div 
            v-else 
            class="w-full h-40 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
          >
            <img :src="`/icons/${tool.icon || 'default-tool.svg'}`" class="h-16 w-16" :alt="tool.name" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ tool.name }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ tool.shortDescription }}</p>
            <router-link 
              :to="`/tools/${tool.id}`" 
              class="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              使用工具
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'RelatedTools',
    props: {
      currentToolId: {
        type: String,
        required: true
      },
      limit: {
        type: Number,
        default: 3
      }
    },
    setup(props) {
      const store = useStore()
      
      const relatedTools = computed(() => {
        const currentTool = store.state.tools.allTools.find(t => t.id === props.currentToolId)
        
        if (!currentTool) return []
        
        // Find tools in the same category or with similar tags
        return store.state.tools.allTools
          .filter(tool => 
            tool.id !== props.currentToolId && (
              tool.category === currentTool.category ||
              (tool.tags && currentTool.tags && 
               tool.tags.some(tag => currentTool.tags.includes(tag)))
            )
          )
          .slice(0, props.limit)
      })
      
      return {
        relatedTools
      }
    }
  }
  </script>