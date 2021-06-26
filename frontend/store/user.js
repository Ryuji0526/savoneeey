export const actions = {
  signUp({ dispatch }, Data) {
    this.$axios
      .post('/api/v1/auth', Data)
      .then(() => {
        this.$auth
          .loginWith('local', {
            data: {
              email: Data.email,
              password: Data.password,
            },
          })
          .then(() => {
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
      .then(() => {
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
  editUser({ dispatch }, Data) {
    this.$axios
      .put('/api/v1/auth', Data)
      .then(() => {
        dispatch(
          'message/showFlashMessage',
          {
            content: 'ユーザー情報を変更しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push('/')
      })
      .catch((error) => {
        dispatch(
          'message/showFlashMessage',
          {
            content:
              'ユーザー情報の変更に失敗しました。もう一度登録をお願いします',
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
