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
            console.log(res)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        dispatch(
          'message/showFlashMessage',
          {
            content: '新規登録に失敗しました。もう一度登録をお願いします。',
            type: 'error',
          },
          {
            root: true,
          }
        )
        console.log(error)
      })
  },
  login({ dispatch }, Data) {
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
            content: 'ログインしました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push('/')
        return res
      })
      .catch((error) => {
        dispatch(
          'message/showFlashMessage',
          {
            content: 'メールアドレス、またはパスワードが違います。',
            type: 'error',
          },
          {
            root: true,
          }
        )
        console.log(error)
      })
  },
}
