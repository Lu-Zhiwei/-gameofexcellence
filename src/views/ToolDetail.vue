<template>
    <div>
      <div v-if="loading" class="flex justify-center items-center py-24">
        <svg class="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <div v-else-if="!toolData" class="container mx-auto px-4 py-16 text-center">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="mt-4 text-2xl font-bold text-gray-900">工具未找到</h2>
        <p class="mt-2 text-gray-600">
          抱歉，您请求的工具不存在或已被移除
        </p>
        <router-link to="/tools" class="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          浏览所有工具
        </router-link>
      </div>
      
      <template v-else>
        <component :is="toolComponent" :tool="toolData" />
      </template>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  
  export default {
    name: 'ToolDetail',
    props: {
      toolId: {
        type: String,
        required: false
      }
    },
    setup(props) {
      const route = useRoute()
      const store = useStore()
      const loading = ref(true)
      
      const currentToolId = computed(() => props.toolId || route.params.toolId)
      
      const toolData = computed(() => {
        return store.state.tools.allTools.find(tool => tool.id === currentToolId.value)
      })
      
      const toolComponent = computed(() => {
        if (!toolData.value) return null
        
        // Dynamically import the tool component
        return defineAsyncComponent(() => 
          import(`@/tools/${toolData.value.component || currentToolId.value.charAt(0).toUpperCase() + currentToolId.value.slice(1)}.vue`)
            .catch(() => import('@/components/tools/DefaultTool.vue'))
        )
      })
      
      onMounted(async () => {
        // Set document title
        if (toolData.value) {
          document.title = `${toolData.value.name} | GameOfExcellence`
        }
        
        loading.value = false
      })
      
      return {
        loading,
        toolData,
        toolComponent
      }
    }
  }
  </script>