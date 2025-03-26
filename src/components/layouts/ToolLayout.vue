<template>
    <div class="container mx-auto px-4 py-8">
      <BreadcrumbNav :paths="breadcrumbPaths" />
      
      <div class="mt-6 bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold mb-2">{{ tool.name }}</h1>
        <p class="text-gray-600 mb-6">{{ tool.description }}</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 order-2 lg:order-1">
            <ImageProcessor
              :tool-id="tool.id"
              :options="selectedOptions"
              @processed="handleProcessed"
            />
          </div>
          
          <div class="order-1 lg:order-2">
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 class="text-lg font-semibold mb-3">工具选项</h3>
              <slot name="options"></slot>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">使用说明</h3>
              <ol class="space-y-2 text-gray-700 pl-5">
                <li v-for="(step, index) in tool.howToUse" :key="index" class="list-decimal">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="tool.faqs && tool.faqs.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold mb-6">常见问题</h2>
        <div class="space-y-4">
          <div 
            v-for="(faq, index) in tool.faqs" 
            :key="index"
            class="bg-white rounded-lg shadow-md p-6"
          >
            <h3 class="text-lg font-semibold mb-2">{{ faq.question }}</h3>
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
      
      <RelatedTools :current-tool-id="tool.id" class="mt-12" />
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import BreadcrumbNav from '@/components/common/BreadcrumbNav.vue'
  import ImageProcessor from '@/components/tools/ImageProcessor.vue'
  import RelatedTools from '@/components/tools/RelatedTools.vue'
  
  export default {
    name: 'ToolLayout',
    components: {
      BreadcrumbNav,
      ImageProcessor,
      RelatedTools
    },
    props: {
      tool: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const route = useRoute()
      const selectedOptions = ref({})
      const processedResult = ref(null)
      
      const breadcrumbPaths = computed(() => [
        { name: '首页', path: '/' },
        { name: '工具', path: '/tools' },
        { name: props.tool.category || '图像处理', path: `/tools?category=${props.tool.categorySlug || 'all'}` },
        { name: props.tool.name, path: `/tools/${props.tool.id}`, active: true }
      ])
      
      const handleProcessed = (result) => {
        processedResult.value = result
      }
      
      return {
        breadcrumbPaths,
        selectedOptions,
        handleProcessed
      }
    }
  }
  </script>