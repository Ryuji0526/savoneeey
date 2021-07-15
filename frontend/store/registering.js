export const actions = {
  async createRegistering({ dispatch }, registering) {
    console.log(registering)
    await this.$axios
      .post('/api/v1/registerings/register', registering)
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: '口座にリストを追加しました',
            type: 'success',
          },
          {
            root: true,
          }
        )
      })
      .catch((error) => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content:
              '登録に失敗しました。すでに登録されているリストが選択されている可能性があります。',
            type: 'error',
          },
          {
            root: true,
          }
        )
        console.log(error)
      })
  },
  async deleteRegistering({ dispatch }, registering) {
    console.log(registering)
    await this.$axios
      .delete('/api/v1/registerings/unregister', { params: registering })
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: '口座からリストを外しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        dispatch('bankAccount/getAccount', registering.account_id, {
          root: true,
        })
      })
  },
}
