const state = {
    isAuthenticated: false,
    user: null,
    recentTools: [],
    favorites: []
  }
  
  const getters = {
    isLoggedIn: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getRecentTools: (state) => state.recentTools,
    getFavorites: (state) => state.favorites
  }
  
  const mutations = {
    SET_AUTH(state, isAuth) {
      state.isAuthenticated = isAuth
    },
    SET_USER(state, user) {
      state.user = user
    },
    ADD_RECENT_TOOL(state, toolId) {
      // 移除已存在的工具(如果有)，避免重复
      state.recentTools = state.recentTools.filter(id => id !== toolId)
      // 添加到最前面
      state.recentTools.unshift(toolId)
      // 保持最近使用的工具不超过5个
      if (state.recentTools.length > 5) {
        state.recentTools.pop()
      }
    },
    TOGGLE_FAVORITE(state, toolId) {
      const index = state.favorites.indexOf(toolId)
      if (index === -1) {
        state.favorites.push(toolId)
      } else {
        state.favorites.splice(index, 1)
      }
    },
    CLEAR_USER_DATA(state) {
      state.isAuthenticated = false
      state.user = null
      state.recentTools = []
      state.favorites = []
    }
  }
  
  const actions = {
    recordToolUsage({ commit }, toolId) {
      commit('ADD_RECENT_TOOL', toolId)
      // 这里可以添加用户分析事件
    },
    toggleFavorite({ commit }, toolId) {
      commit('TOGGLE_FAVORITE', toolId)
      // 如果用户已登录，可以同步到服务器
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
      // 移除认证令牌等
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }