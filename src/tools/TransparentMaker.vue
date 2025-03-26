<template>
    <ToolLayout :tool="toolData">
      <template #options>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              移除方式
            </label>
            <select 
              v-model="options.removalMethod" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="auto">自动背景移除</option>
              <option value="color">去除特定颜色</option>
              <option value="manual">手动选择区域</option>
            </select>
          </div>
          
          <div v-if="options.removalMethod === 'color'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              要移除的颜色
            </label>
            <div class="flex items-center space-x-3">
              <input 
                type="color" 
                v-model="options.colorToRemove" 
                class="h-10 w-10 rounded border border-gray-300"
              />
              <span>{{ options.colorToRemove }}</span>
            </div>
            
            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                颜色容差
              </label>
              <input
                type="range"
                v-model.number="options.tolerance"
                min="0"
                max="100"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-gray-500">
                <span>精确</span>
                <span>中等</span>
                <span>高</span>
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              边缘优化
            </label>
            <select 
              v-model="options.edgeRefinement" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="none">无</option>
              <option value="low">低</option>
              <option value="medium">中等</option>
              <option value="high">高</option>
            </select>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="preserve-shadows"
              v-model="options.preserveShadows"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="preserve-shadows" class="ml-2 block text-sm text-gray-700">
              保留阴影
            </label>
          </div>
        </div>
      </template>
    </ToolLayout>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import ToolLayout from '@/components/layouts/ToolLayout.vue'
  
  export default {
    name: 'TransparentMaker',
    components: {
      ToolLayout
    },
    setup() {
      const toolData = {
        id: 'transparent-maker',
        name: '透明背景制作工具',
        description: '移除背景创建透明PNG图片',
        category: '图像转换',
        categorySlug: 'conversion',
        icon: 'transparent.svg',
        tags: ['透明', '背景移除', 'PNG', '抠图'],
        howToUse: [
          '上传带有背景的图片',
          '选择移除方式：自动、颜色或手动',
          '调整设置以微调透明区域',
          '点击"处理图片"创建透明图片',
          '下载为PNG格式（带透明度）'
        ],
        faqs: [
          {
            question: '我会收到什么格式的文件？',
            answer: '处理后的图像将为PNG格式，该格式支持透明背景。这使您可以将图像放在不同背景上而没有可见边界。'
          },
          {
            question: '我应该选择哪种移除方式？',
            answer: '自动移除适用于大多数具有明显主体的图像。颜色移除适用于具有纯色背景的图像。手动选择为复杂图像提供最大控制。'
          },
          {
            question: '透明背景的图片可以用在哪里？',
            answer: '透明背景图片非常适合网站设计、电子商务产品展示、社交媒体帖子、幻灯片演示和印刷材料。它们可以无缝整合到各种设计中。'
          }
        ]
      }
  
      const options = reactive({
        removalMethod: 'auto',
        colorToRemove: '#ffffff',
        tolerance: 30,
        edgeRefinement: 'medium',
        preserveShadows: false
      })
      
      return {
        toolData,
        options
      }
    }
  }
  </script>