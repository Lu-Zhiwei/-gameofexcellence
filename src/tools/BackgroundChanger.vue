<template>
  <ToolLayout :tool="toolData">
    <template #options>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            背景类型
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="type in backgroundTypes"
              :key="type.value"
              class="p-2 border rounded-md text-center"
              :class="{'border-indigo-500 bg-indigo-50': options.backgroundType === type.value, 'border-gray-300': options.backgroundType !== type.value}"
              @click="options.backgroundType = type.value"
            >
              <div class="h-12 mb-2 rounded flex items-center justify-center" :style="{ background: type.preview }">
                <span v-if="type.value === 'upload'" class="text-white text-xs">上传</span>
              </div>
              <span class="text-xs">{{ type.label }}</span>
            </button>
          </div>
        </div>
        
        <div v-if="options.backgroundType === 'color'">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            背景颜色
          </label>
          <div class="flex items-center space-x-3">
            <input 
              type="color" 
              v-model="options.backgroundColor" 
              class="h-10 w-10 rounded border border-gray-300"
            />
            <span>{{ options.backgroundColor }}</span>
          </div>
        </div>
        
        <div v-if="options.backgroundType === 'upload'">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            自定义背景
          </label>
          <div 
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
            :class="{'bg-indigo-50 border-indigo-300': dragover}"
            @dragover.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            @drop.prevent="handleBackgroundDrop"
          >
            <div v-if="!options.customBackground" class="py-2">
              <p class="text-gray-500 text-sm mb-2">拖放背景图片，或</p>
              <label class="cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700">
                选择文件
                <input type="file" class="hidden" accept="image/*" @change="handleBackgroundChange" />
              </label>
            </div>
            
            <div v-else class="relative">
              <img :src="options.customBackground" class="h-24 max-w-full mx-auto rounded" />
              <button
                @click="options.customBackground = null"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            照片尺寸
          </label>
          <select 
            v-model="options.portraitSize" 
            class="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="35x45">3.5 x 4.5 cm (护照)</option>
            <option value="25x35">2.5 x 3.5 cm (身份证)</option>
            <option value="50x50">5 x 5 cm (方形)</option>
            <option value="custom">自定义尺寸</option>
          </select>
        </div>
        
        <div v-if="options.portraitSize === 'custom'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">宽度 (cm)</label>
            <input 
              type="number" 
              v-model.number="options.customWidth" 
              min="1" 
              max="20" 
              step="0.1"
              class="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">高度 (cm)</label>
            <input 
              type="number" 
              v-model.number="options.customHeight" 
              min="1" 
              max="20" 
              step="0.1"
              class="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </div>
    </template>
  </ToolLayout>
</template>

<script>
import { ref, reactive } from 'vue'
import ToolLayout from '@/components/layouts/ToolLayout.vue'

export default {
  name: 'BackgroundChanger',
  components: {
    ToolLayout
  },
  setup() {
    const toolData = {
      id: 'background-changer',
      name: '证件照换背景工具',
      description: '创建专业证件照，自定义背景颜色和尺寸',
      category: '背景编辑',
      categorySlug: 'background',
      icon: 'background.svg',
      tags: ['证件照', '背景', '换背景', '护照照片', '身份证照片'],
      howToUse: [
        '上传人像照片（正面、光线良好）',
        '选择所需的背景颜色或上传自定义背景',
        '选择照片尺寸标准',
        '处理图像以更改背景',
        '下载您的证件照'
      ],
      faqs: [
        {
          question: '输入照片应该是什么尺寸？',
          answer: '为获得最佳效果，请使用高质量的正面人像照片，确保面部清晰可见。原始背景并不重要，因为它将被替换。'
        },
        {
          question: '这是否符合官方证件照要求？',
          answer: '此工具创建符合常见尺寸标准的照片，但各国要求可能有所不同。请务必检查您的证件文档的具体要求。'
        }
      ]
    };

    const backgroundTypes = [
      { value: 'white', label: '白色', preview: '#ffffff' },
      { value: 'blue', label: '蓝色', preview: '#0070ba' },
      { value: 'red', label: '红色', preview: '#d32f2f' },
      { value: 'gray', label: '灰色', preview: '#9e9e9e' },
      { value: 'color', label: '自定义颜色', preview: 'linear-gradient(45deg, #f44336, #2196f3, #4caf50)' },
      { value: 'upload', label: '上传', preview: '#2d3748' }
    ];

    const options = reactive({
      backgroundType: 'white',
      backgroundColor: '#ffffff',
      customBackground: null,
      portraitSize: '35x45',
      customWidth: 3.5,
      customHeight: 4.5
    });

    const dragover = ref(false);

    const handleBackgroundChange = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        loadBackgroundImage(file);
      }
    };

    const handleBackgroundDrop = (event) => {
      dragover.value = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        loadBackgroundImage(file);
      }
    };

    const loadBackgroundImage = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        options.customBackground = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    return {
      toolData,
      backgroundTypes,
      options,
      dragover,
      handleBackgroundChange,
      handleBackgroundDrop
    };
  }
}
</script>