<template>
    <ToolLayout :tool="toolData">
      <template #options>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              水印检测方式
            </label>
            <select 
              v-model="options.detectionMethod" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="auto">自动检测</option>
              <option value="manual">手动选择</option>
              <option value="color">基于颜色</option>
            </select>
          </div>
          
          <div v-if="options.detectionMethod === 'color'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              目标颜色
            </label>
            <div class="flex items-center space-x-3">
              <input 
                type="color" 
                v-model="options.targetColor" 
                class="h-10 w-10 rounded border border-gray-300"
              />
              <span>{{ options.targetColor }}</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              去除强度
            </label>
            <input
              type="range"
              v-model.number="options.intensity"
              min="1"
              max="10"
              class="w-full"
            />
            <div class="flex justify-between text-xs text-gray-500">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              填充方法
            </label>
            <select 
              v-model="options.fillMethod" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="inpainting">智能修复</option>
              <option value="content-aware">内容感知填充</option>
              <option value="blur">模糊</option>
              <option value="solid">纯色填充</option>
            </select>
          </div>
        </div>
      </template>
    </ToolLayout>
  </template>
  
  <script>
  import { reactive } from 'vue'
  import ToolLayout from '@/components/layouts/ToolLayout.vue'
  
  export default {
    name: 'WatermarkRemover',
    components: {
      ToolLayout
    },
    setup() {
      const toolData = {
        id: 'watermark-remover',
        name: '图片去水印工具',
        description: '轻松去除图片中的水印、标志和不需要的文字',
        category: '水印处理',
        categorySlug: 'watermark',
        icon: 'watermark.svg',
        tags: ['水印', '去水印', '图片修复', '图像处理'],
        howToUse: [
          '上传含有水印的图片',
          '选择检测方式（自动、手动或基于颜色）',
          '根据需要调整强度和填充方法',
          '点击"处理图片"去除水印',
          '下载无水印图片'
        ],
        faqs: [
          {
            question: '可以去除哪些类型的水印？',
            answer: '本工具最适合去除半透明水印、标志和文字覆盖。非常复杂或严重改变底层图像的水印可能无法完全去除。'
          },
          {
            question: '是否会影响图片质量？',
            answer: '工具会尽量保持图片质量，但水印区域的一些细节损失是不可避免的。使用更高的强度设置可能会更多地影响质量。'
          },
          {
            question: '处理后的图片格式是什么？',
            answer: '处理后的图片将保持原始格式，如果原图是JPG，处理后也是JPG；如果是PNG，处理后也是PNG。'
          }
        ]
      }
  
      const options = reactive({
        detectionMethod: 'auto',
        targetColor: '#ffffff',
        intensity: 5,
        fillMethod: 'inpainting'
      })
      
      return {
        toolData,
        options
      }
    }
  }
  </script>