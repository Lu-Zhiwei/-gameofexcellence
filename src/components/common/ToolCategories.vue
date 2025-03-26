<template>
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">图像处理工具</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <img :src="`/icons/${category.icon}`" alt="" class="h-8 w-8" />
              </div>
              <h3 class="text-xl font-semibold text-center mb-3">{{ category.name }}</h3>
              <p class="text-gray-600 text-center mb-6">{{ category.description }}</p>
              <router-link 
                :to="category.path" 
                class="block text-center text-indigo-600 font-medium hover:text-indigo-800"
              >
                浏览工具
                <span class="ml-1">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ToolCategories',
    setup() {
      const categories = [
        {
          id: 'watermark',
          name: '水印处理',
          description: '去除图片中的水印、标志和文字',
          icon: 'watermark.svg',
          path: '/tools?category=watermark'
        },
        {
          id: 'background',
          name: '背景编辑',
          description: '更改、移除或模糊照片背景',
          icon: 'background.svg',
          path: '/tools?category=background'
        },
        {
          id: 'conversion',
          name: '图像转换',
          description: '转换格式和创建透明图像',
          icon: 'conversion.svg',
          path: '/tools?category=conversion'
        },
        {
          id: 'manipulation',
          name: '图像处理',
          description: '分割、裁剪、调整和转换图像',
          icon: 'manipulation.svg',
          path: '/tools?category=manipulation'
        }
      ]
      
      return {
        categories
      }
    }
  }
  </script>