<template>
    <ToolLayout :tool="toolData">
      <template #options>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              分割类型
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="type in splitTypes"
                :key="type.value"
                class="p-2 border rounded-md text-center"
                :class="{'border-indigo-500 bg-indigo-50': options.splitType === type.value, 'border-gray-300': options.splitType !== type.value}"
                @click="options.splitType = type.value"
              >
                <div class="h-12 mb-2 rounded bg-gray-100 flex items-center justify-center">
                  <img :src="`/icons/${type.icon}`" class="h-8 w-8" alt="" />
                </div>
                <span class="text-xs">{{ type.label }}</span>
              </button>
            </div>
          </div>
          
          <div v-if="options.splitType === 'grid'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              网格大小
            </label>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">行数</label>
                <input 
                  type="number" 
                  v-model.number="options.rows" 
                  min="1" 
                  max="10"
                  class="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">列数</label>
                <input 
                  type="number" 
                  v-model.number="options.columns" 
                  min="1" 
                  max="10"
                  class="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
          
          <div v-if="options.splitType === 'custom'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              自定义分割
            </label>
            <p class="text-sm text-gray-500 mb-2">
              在图像上绘制线条创建自定义区域
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              输出格式
            </label>
            <select 
              v-model="options.outputFormat" 
              class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="add-borders"
              v-model="options.addBorders"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="add-borders" class="ml-2 block text-sm text-gray-700">
              为分割图像添加边框
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
    name: 'ImageSplitter',
    components: {
      ToolLayout
    },
    setup() {
      const toolData = {
        id: 'image-splitter',
        name: '图片分割工具',
        description: '将图像分割成相等或自定义区域',
        category: '图像处理',
        categorySlug: 'manipulation',
        icon: 'splitter.svg',
        tags: ['分割', '裁剪', '拼图', '九宫格'],
        howToUse: [
          '上传您要分割的图像',
          '选择网格、拼图或自定义分割类型',
          '指定网格分割的行数和列数',
          '设置输出格式和边框选项',
          '处理图像并下载分割后的部分'
        ],
        faqs: [
          {
            question: '如何获取所有分割图像？',
            answer: '处理后，工具将生成一个包含所有单独图像部分的ZIP文件供您下载。'
          },
          {
            question: '我可以创建多少个部分？',
            answer: '您最多可以创建10×10网格（100个部分）。对于自定义分割，您最多可以创建20个单独的部分。'
          },
          {
            question: '分割图像可以用于什么？',
            answer: '分割图像常用于社交媒体展示（如Instagram拼图）、创意展示、大型打印项目分割和网站图库布局。'
          }
        ]
      }
  
      const splitTypes = [
        { 
          value: 'grid', 
          label: '网格', 
          icon: 'grid.svg'
        },
        { 
          value: 'puzzle', 
          label: '拼图', 
          icon: 'puzzle.svg'
        },
        { 
          value: 'custom', 
          label: '自定义', 
          icon: 'custom-split.svg'
        }
      ]
  
      const options = reactive({
        splitType: 'grid',
        rows: 2,
        columns: 2,
        outputFormat: 'png',
        addBorders: false
      })
      
      return {
        toolData,
        splitTypes,
        options
      }
    }
  }
  </script>