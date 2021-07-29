export const state = () => ({
  wishTags: [],
  accountTags: [],
})

export const getters = {
  wishTags: (state) => state.wishTags,
  accountTags: (state) => state.accountTags,
}

export const mutations = {
  setWishTags(state, wishTags) {
    state.wishTags = wishTags.data
  },
  setAccountTags(state, accountTags) {
    state.accountTags = accountTags.data
  },
}

export const actions = {
  async getWishTags({ commit }) {
    const wishTags = {
      data: '',
    }
    await this.$axios
      .get('/api/v1/tags/wish_tags')
      .then((res) => {
        wishTags.data = res.data
        commit('setWishTags', wishTags.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async getAccountTags({ commit }) {
    const accountTags = {
      data: '',
    }
    await this.$axios
      .get('/api/v1/tags/account_tags')
      .then((res) => {
        accountTags.data = res.data
        commit('setAccountTags', accountTags.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
