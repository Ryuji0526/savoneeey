export const state = () => ({
  accounts: [],
  account: {
    target_amount: 0,
    recent_histories: [
      {
        balance: 0,
      },
    ],
  },
  transaction: {
    deposit: {
      id: null,
      name: null,
    },
    withdrawal: {
      id: null,
      name: null,
      balance: null,
    },
    amount: null,
  },
})

export const getters = {
  accounts: (state) => state.accounts,
  account: (state) => state.account,
  transaction: (state) => state.transaction,
}

export const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts.data
  },
  setAccount(state, account) {
    state.account = account.data
  },
  setDeposit(state, deposit) {
    state.transaction.deposit = deposit
  },
  setWithdrawal(state, withdrawal) {
    state.transaction.withdrawal = withdrawal
  },
  setAmount(state, amount) {
    state.transaction.amount = amount
  },
  clearTransaction(state) {
    state.transaction = {
      deposit: {
        id: null,
        name: null,
      },
      withdrawal: {
        id: null,
        name: null,
        balance: null,
      },
      amount: null,
    }
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
      .get(`api/v1/accounts/${id}`)
      .then((res) => {
        account.data = res.data
        commit('setAccount', account.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async createAccount({ dispatch }, account) {
    console.log(account)
    await this.$axios
      .post('/api/v1/accounts', account)
      .then(() => {
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
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async editAccount({ dispatch }, account) {
    await this.$axios
      .put(`/api/v1/accounts/${account.id}`, account)
      .then(() => {
        dispatch('getAccount', account.id)
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
        this.$router.push(`/account/${account.id}`)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async deleteAccount({ dispatch }, id) {
    await this.$axios
      .delete(`/api/v1/accounts/${id}`)
      .then(() => {
        dispatch(
          'flash-message/showFlashMessage',
          {
            content: '口座を削除しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push(`/my-accounts`)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  async createTradingHistory({ dispatch, state }) {
    await this.$axios
      .post('/api/v1/trading_histories', {
        deposit_id: state.transaction.deposit.id,
        withdrawal_id: state.transaction.withdrawal.id,
        transaction_amount: state.transaction.amount,
      })
      .then((res) => {
        dispatch('getAccounts')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  setDeposit({ commit }, deposit) {
    commit('setDeposit', deposit)
  },
  setWithdrawal({ commit }, withdrawal) {
    commit('setWithdrawal', withdrawal)
  },
  setAmount({ commit }, amount) {
    commit('setAmount', amount)
  },
  clearTransaction({ commit }) {
    commit('clearTransaction')
  },
}
