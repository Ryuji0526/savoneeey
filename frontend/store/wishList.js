export const state = () => ({
  wishLists: [],
})

export const getters = {
  wishLists: (state) => state.wishLists,
}

export const mutations = {
  setWishLists(state, wishLists) {
    state.wishLists = wishLists.data
    console.log(state.wishLists)
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
    console.log(wishList)
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
}
