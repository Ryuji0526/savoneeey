export const actions = {
  signUp({ dispatch }, Data) {
    this.$axios
      .post('/api/v1/auth', Data)
      .then((res) => {
        this.$auth
          .loginWith('local', {
            data: {
              email: Data.email,
              password: Data.password,
            },
          })
          .then((res) => {
            dispatch(
              'message/showFlashMessage',
              {
                content: '新規登録しました。ようこそsavoneeyへ！',
                type: 'success',
              },
              {
                root: true,
              }
            )
            this.$router.push('/')
            return res
          })
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
