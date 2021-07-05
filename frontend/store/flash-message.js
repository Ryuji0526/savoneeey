export const state = () => ({
  content: '',
  type: '',
})

export const getters = {
  content: (state) => state.content,
  type: (state) => state.type,
  visible: (state) => state.visible,
}

export const mutations = {
  setFlashMessage(state, { content, type }) {
    state.content = content
    state.type = type
  },
  removeFlashMessage(state) {
    state.content = ''
  },
}

export const actions = {
  showFlashMessage({ commit }, { content, type, timeout = 3000 }) {
    commit('setFlashMessage', { content, type })
    setTimeout(() => {
      commit('removeFlashMessage')
    }, timeout)
  },
}
