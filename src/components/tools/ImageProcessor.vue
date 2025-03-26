<template>
    <div class="image-processor">
      <div class="mb-6">
        <div 
          v-if="!imageSource" 
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          @dragover.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
          @drop.prevent="handleDrop"
          :class="{ 'bg-indigo-50 border-indigo-300': dragover }"
        >
          <div class="mb-4">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p class="text-gray-700 mb-4">拖放图片到这里，或</p>
          <label class="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            上传图片
            <input type="file" class="hidden" accept="image/*" @change="handleFileChange" />
          </label>
        </div>
        
        <div v-else class="relative">
          <canvas ref="canvasRef" class="w-full rounded-lg shadow-md"></canvas>
          
          <div class="absolute top-2 right-2 flex space-x-2">
            <button 
              @click="resetImage" 
              class="bg-white text-gray-700 p-2 rounded-full shadow hover:bg-gray-100"
              title="重置图片"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button 
              @click="removeImage" 
              class="bg-white text-red-600 p-2 rounded-full shadow hover:bg-gray-100"
              title="移除图片"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="imageSource" class="flex flex-wrap gap-4 justify-center">
        <button 
          @click="processImage" 
          class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 flex items-center"
          :disabled="isProcessing"
        >
          <span v-if="isProcessing">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            处理中...
          </span>
          <span v-else>处理图片</span>
        </button>
        
        <button 
          v-if="processedResult" 
          @click="downloadResult" 
          class="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 flex items-center"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { fabric } from 'fabric'
  import { useImageProcessing } from '@/composables/useImageProcessor'
  
  export default {
    name: 'ImageProcessor',
    props: {
      toolId: {
        type: String,
        required: true
      },
      options: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ['processed'],
    setup(props, { emit }) {
      const canvasRef = ref(null)
      const canvas = ref(null)
      const imageSource = ref(null)
      const isProcessing = ref(false)
      const dragover = ref(false)
      const processedResult = ref(null)
      const { processImage: processImageWithAPI } = useImageProcessing()
  
      onMounted(() => {
        initCanvas()
      })
  
      const initCanvas = () => {
        if (canvasRef.value) {
          canvas.value = new fabric.Canvas(canvasRef.value, {
            selection: false,
            renderOnAddRemove: true
          })
          
          // Resize canvas on window resize
          window.addEventListener('resize', resizeCanvas)
          resizeCanvas()
        }
      }
  
      const resizeCanvas = () => {
        if (canvas.value && canvasRef.value) {
          const container = canvasRef.value.parentElement
          const containerWidth = container.clientWidth
          
          // Set canvas dimensions
          canvas.value.setWidth(containerWidth)
          
          // If we have an image, maintain its aspect ratio
          if (imageSource.value) {
            const aspectRatio = imageSource.value.height / imageSource.value.width
            canvas.value.setHeight(containerWidth * aspectRatio)
          } else {
            canvas.value.setHeight(containerWidth * 0.75) // Default aspect ratio
          }
          
          canvas.value.renderAll()
        }
      }
  
      const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
          loadImage(file)
        }
      }
  
      const handleDrop = (event) => {
        dragover.value = false
        
        const file = event.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
          loadImage(file)
        }
      }
  
      const loadImage = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            imageSource.value = img
            
            // Clear canvas and add image
            canvas.value.clear()
            
            fabric.Image.fromURL(img.src, (fabricImg) => {
              // Scale image to fit canvas
              fabricImg.scaleToWidth(canvas.value.width)
              
              // Center image
              canvas.value.centerObject(fabricImg)
              canvas.value.add(fabricImg)
              
              // Set canvas height based on image aspect ratio
              const scaledHeight = fabricImg.getScaledHeight()
              canvas.value.setHeight(scaledHeight)
              
              canvas.value.renderAll()
            })
          }
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
  
      const processImage = async () => {
        if (!imageSource.value) return
        
        isProcessing.value = true
        
        try {
          // Get the image data URL from canvas
          const imageData = canvas.value.toDataURL({
            format: 'png'
          })
          
          // Process image using the appropriate API based on tool ID
          const result = await processImageWithAPI(
            props.toolId, 
            imageData, 
            props.options
          )
          
          if (result) {
            displayProcessedResult(result)
            processedResult.value = result
            emit('processed', result)
          }
        } catch (error) {
          console.error('Error processing image:', error)
          // Show error message to user
        } finally {
          isProcessing.value = false
        }
      }
  
      const displayProcessedResult = (resultImageUrl) => {
        canvas.value.clear()
        
        fabric.Image.fromURL(resultImageUrl, (fabricImg) => {
          fabricImg.scaleToWidth(canvas.value.width)
          canvas.value.centerObject(fabricImg)
          canvas.value.add(fabricImg)
          
          // Set canvas height based on image aspect ratio
          const scaledHeight = fabricImg.getScaledHeight()
          canvas.value.setHeight(scaledHeight)
          
          canvas.value.renderAll()
        })
      }
  
      const resetImage = () => {
        if (imageSource.value) {
          loadImage(imageSource.value)
          processedResult.value = null
        }
      }
  
      const removeImage = () => {
        imageSource.value = null
        processedResult.value = null
        canvas.value.clear()
        canvas.value.setHeight(canvas.value.width * 0.75)
        canvas.value.renderAll()
      }
  
      const downloadResult = () => {
        if (processedResult.value) {
          const link = document.createElement('a')
          link.download = `processed-image-${Date.now()}.png`
          link.href = processedResult.value
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
  
      onUnmounted(() => {
        window.removeEventListener('resize', resizeCanvas)
        if (canvas.value) {
          canvas.value.dispose()
        }
      })
  
      return {
        canvasRef,
        imageSource,
        isProcessing,
        dragover,
        processedResult,
        handleFileChange,
        handleDrop,
        processImage,
        resetImage,
        removeImage,
        downloadResult
      }
    }
  }
  </script>