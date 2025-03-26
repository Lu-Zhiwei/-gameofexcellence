<template>
    <div>
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">强大的在线图像处理工具</h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            轻松去除水印、更换背景、创建透明图片、分割图像等
          </p>
          <router-link 
            to="/tools" 
            class="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            开始使用
          </router-link>
        </div>
      </section>
      
      <!-- Featured Tools -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">热门工具</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="tool in featuredTools" 
              :key="tool.id"
              class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div class="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <img :src="`/icons/${tool.icon}`" class="h-20 w-20" :alt="tool.name" />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">{{ tool.name }}</h3>
                <p class="text-gray-600 mb-4">{{ tool.shortDescription }}</p>
                <router-link 
                  :to="`/tools/${tool.id}`" 
                  class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  立即使用
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Tool Categories -->
      <ToolCategories />
      
      <!-- How It Works -->
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">如何使用</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">上传图片</h3>
              <p class="text-gray-600">选择或拖放您需要处理的图片文件</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">调整选项</h3>
              <p class="text-gray-600">根据需要自定义处理参数和选项</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 class="text-xl font-semibold mb-2">下载结果</h3>
              <p class="text-gray-600">处理完成后下载您的成品图片</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials / Features -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">无需注册</h3>
              <p class="text-gray-600">无需创建账户，立即开始使用所有工具</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">隐私保护</h3>
              <p class="text-gray-600">您的图片在本地处理，不会上传到我们的服务器</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">快速处理</h3>
              <p class="text-gray-600">使用先进算法实现快速高效的图像处理</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">简单易用</h3>
              <p class="text-gray-600">直观的用户界面，无需专业技能也能轻松操作</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-16 bg-indigo-600 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">开始处理您的图片</h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto">
            立即体验我们的专业图像处理工具，只需点击几下即可获得完美效果
          </p>
          <router-link 
            to="/tools"
            class="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            浏览所有工具
          </router-link>
        </div>
      </section>
    </div>
  </template>
    
    <!-- CTA Section -->
    <section class="py-16 bg-indigo-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">开始处理您的图片</h2>
        <p class="text-xl mb-8 max-w-3xl mx-auto">
          立即体验我们的专业图像处理工具，只需点击几下即可获得完美效果
        </p>
        <router-link 
          to="/tools" 
          class="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          浏览所有工具
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ToolCategories from '@/components/common/ToolCategories.vue'

export default {
  name: 'HomePage',
  components: {
    ToolCategories
  },
  setup() {
    const store = useStore()
    
    const featuredTools = computed(() => {
      return store.state.tools.featuredTools
    })
    
    return {
      featuredTools
    }
  }
}
</script>