import { createStore } from 'vuex'
import toolsModule from './modules/tools'
import userModule from './modules/user'

export default createStore({
  modules: {
    tools: toolsModule,
    user: userModule
  }
})