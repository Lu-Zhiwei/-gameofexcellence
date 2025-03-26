const state = {
    allTools: [
      {
        id: 'watermark-remover',
        name: '图片去水印工具',
        shortDescription: '轻松去除图片中的水印、标志和不需要的文字',
        description: '轻松去除图片中的水印、标志和不需要的文字。保持原始图像质量，同时有效清除各种类型的水印。',
        category: '水印处理',
        categorySlug: 'watermark',
        icon: 'watermark.svg',
        tags: ['水印', '去水印', '图片修复', '图像处理']
      },
      {
        id: 'background-changer',
        name: '证件照换背景工具',
        shortDescription: '创建专业证件照，自定义背景颜色和尺寸',
        description: '创建专业证件照，自定义背景颜色和尺寸。符合护照、身份证和各种官方证件的标准要求。',
        category: '背景编辑',
        categorySlug: 'background',
        icon: 'background.svg',
        tags: ['证件照', '背景', '换背景', '护照照片', '身份证照片']
      },
      {
        id: 'transparent-maker',
        name: '透明背景制作工具',
        shortDescription: '移除背景创建透明PNG图片',
        description: '移除背景创建透明PNG图片。完美适用于电子商务产品、设计项目和社交媒体内容。',
        category: '图像转换',
        categorySlug: 'conversion',
        icon: 'transparent.svg',
        tags: ['透明', '背景移除', 'PNG', '抠图']
      },
      {
        id: 'image-splitter',
        name: '图片分割工具',
        shortDescription: '将图像分割成相等或自定义区域',
        description: '将图像分割成相等或自定义区域。创建Instagram拼图、照片拼贴或其他创意布局。',
        category: '图像处理',
        categorySlug: 'manipulation',
        icon: 'splitter.svg',
        tags: ['分割', '裁剪', '拼图', '九宫格']
      },
      {
        id: 'image-resizer',
        name: '图片尺寸调整工具',
        shortDescription: '调整图片尺寸，保持最佳图像质量',
        description: '调整图片尺寸，保持最佳图像质量。适用于社交媒体、电子邮件、网站和打印。',
        category: '图像处理',
        categorySlug: 'manipulation',
        icon: 'resize.svg',
        tags: ['调整尺寸', '缩放', '图像优化']
      },
      {
        id: 'image-cropper',
        name: '图片裁剪工具',
        shortDescription: '按各种比例和形状裁剪图片',
        description: '按各种比例和形状裁剪图片。创建完美的社交媒体头像、封面图和产品图片。',
        category: '图像处理',
        categorySlug: 'manipulation',
        icon: 'crop.svg',
        tags: ['裁剪', '剪切', '形状裁剪']
      },
      {
        id: 'image-converter',
        name: '图片格式转换工具',
        shortDescription: '在JPG、PNG、WebP等格式间转换图片',
        description: '在JPG、PNG、WebP和其他格式之间转换图片。优化文件大小和质量以满足您的需求。',
        category: '图像转换',
        categorySlug: 'conversion',
        icon: 'convert.svg',
        tags: ['格式转换', 'JPG', 'PNG', 'WebP']
      },
      {
        id: 'image-compressor',
        name: '图片压缩工具',
        shortDescription: '压缩图片减小文件大小，保持质量',
        description: '压缩图片减小文件大小，同时保持视觉质量。加快网站加载速度和节省存储空间。',
        category: '图像转换',
        categorySlug: 'conversion',
        icon: 'compress.svg',
        tags: ['压缩', '优化', '文件大小']
      }
    ],
    featuredTools: [
      'watermark-remover',
      'background-changer',
      'transparent-maker',
      'image-splitter'
    ]
  }
  
  const getters = {
    getFeaturedTools: (state) => {
      return state.featuredTools.map(id => state.allTools.find(tool => tool.id === id))
    },
    getToolsByCategory: (state) => (category) => {
      if (category === 'all') return state.allTools
      return state.allTools.filter(tool => tool.categorySlug === category)
    },
    getToolById: (state) => (id) => {
      return state.allTools.find(tool => tool.id === id)
    }
  }
  
  const mutations = {
    // 如果需要，可以添加修改state的方法
  }
  
  const actions = {
    // 可以添加异步操作，如从API获取工具列表
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }