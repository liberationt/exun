import { getToken, setToken, removeToken } from '@/utils/auth'
import { toLogin,tologout} from '@/api/homePage'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  userInfor:'',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.userInfor = user
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    let params = {
      username: username,
      password: password
    }
    if(userInfo.login_status){
      params.login_status = 1
    }
    return new Promise((resolve, reject) => {
      toLogin(params).then(response => {
        const { token,user_info } = response
        commit('SET_USER', user_info)
        commit('SET_TOKEN', token)
        setToken(token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state},username) {
    return new Promise((resolve, reject) => {
      tologout().then(() => {
        commit(' ', '')
        commit('SET_USER', {})
        removeToken() 
        sessionStorage.removeItem('username')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
