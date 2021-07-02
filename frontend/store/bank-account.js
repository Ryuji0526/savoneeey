export const state = () => ({
  accounts: [],
  account: {},
})

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
  async getAccount({ commit }, id) {
    const account = {
      data: '',
    }
    await this.$axios
      .get(`api/v1/account/${id}`)
      .then((res) => {
        account.data = res.data
        commit('setAccount', account.data)
        console.log('get account')
        console.log(account.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async createAccount({ dispatch }, account) {
    console.log(account)
    await this.$axios
      .post('/api/v1/accounts', account)
      .then((res) => {
        dispatch('getAccounts')
        dispatch(
          'flash-message/showFlashMessage',
          {
            content: '新規口座を開設しました',
            type: 'success',
          },
          {
            root: true,
          }
        )
        console.log('create new account')
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async editAccount({ dispatch }, account) {
    await this.$axios.put(`/api/v1/accounts/${account.id}`).then((res) => {
      console.log('edited user')
      console.log(res)
      dispatch(
        'flash-message/showFlashMessage',
        {
          content: '口座情報を変更しました。',
          type: 'success',
        },
        {
          root: true,
        }
      )
    })
  },
  async createTradingHistory({ dispatch }, amount) {
    await this.$axios
      .post('/api/v1/trading_histories', amount)
      .then((res) => {
        dispatch('getAccounts')
        console.log('create trading history succeed!')
        console.log(res)
        dispatch(
          'flash-message/showFlashMessage',
          {
            content: '出金/入金が成功しました。',
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
}
