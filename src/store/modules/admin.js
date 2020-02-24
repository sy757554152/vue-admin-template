import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    state: '',
    institute: '',
    major: '',
    classes: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_STATE: (state, num) => {
    state.state = num
  },
  SET_INSTITUTE: (state, institute) => {
    state.institute = institute
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  },
  SET_CLASS: (state, cl) => {
    state.classes = cl
  }
}

const actions = {
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { username, password, type } = userInfo
    console.log(username, password)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, type: type }).then(response => {
        const { data } = response
        console.log(response)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { name, avatar, state, institute, major, classes } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_STATE', state)
        commit('SET_INSTITUTE', institute)
        commit('SET_MAJOR', major)
        commit('SET_CLASS', classes)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
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
