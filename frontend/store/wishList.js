export const state = () => ({
  wishLists: [],
  wishTags: [],
})

export const getters = {
  wishLists: (state) => state.wishLists,
  wishTags: (state) => state.wishTags,
}

export const mutations = {
  setWishLists(state, wishLists) {
    state.wishLists = wishLists.data
    console.log(state.wishLists)
  },
  setWishTags(state, wishTags) {
    state.wishTags = wishTags.data
  },
}

export const actions = {
  async getWishLists({ commit }) {
    const wishLists = {
      data: '',
    }
    await this.$axios
      .get('/api/v1/wish_lists')
      .then((res) => {
        wishLists.data = res.data
        commit('setWishLists', wishLists.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async createWishList({ dispatch }, wishList) {
    await this.$axios
      .post('/api/v1/wish_lists', wishList)
      .then(() => {
        dispatch('getWishLists')
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'ほしい物リストに追加しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async editWishList({ dispatch }, wishList) {
    await this.$axios
      .put(`/api/v1/wish_lists/${wishList.id}`, wishList)
      .then(() => {
        dispatch('getWishLists')
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'リストの内容を変更しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push('/wish-lists')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async deleteWishList({ dispatch }, id) {
    console.log(id)
    await this.$axios
      .delete(`/api/v1/wish_lists/${id}`)
      .then(() => {
        dispatch('getWishLists')
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: '口座を削除しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push('/wish-lists')
      })
      .catch((error) => {
        console.log(error)
      })
  },

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
}
