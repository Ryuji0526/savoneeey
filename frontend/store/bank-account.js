export const state = {
  accounts: [],
  account: {},
}

export const getters = {
  accounts: (state) => state.accounts,
  account: (state) => state.account,
}

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts.data
  },
  setAccount(state, account) {
    state.account = account.data
  },
}

export const actions = {
  async getAccounts({ commit }) {
    const accounts = {
      data: '',
    }
    await this.$axios
      .get('api/v1/accounts')
      .then((res) => {
        accounts.data = res.data
        commit('setAccounts', accounts.data)
        console.log('get accounts')
        console.log(accounts.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
