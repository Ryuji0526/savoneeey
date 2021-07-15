export const actions = {
  async signUp({ dispatch }, user) {
    await this.$axios
      .post('/api/v1/auth', user)
      .then(() => {
        this.$auth
          .loginWith('local', {
            data: {
              email: user.email,
              password: user.password,
            },
          })
          .then(() => {
            dispatch(
              'flashMessage/showFlashMessage',
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
          'flashMessage/showFlashMessage',
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
  async login({ dispatch }, user) {
    await this.$auth
      .loginWith('local', {
        data: {
          email: user.email,
          password: user.password,
        },
      })
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
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
          'flashMessage/showFlashMessage',
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
  async editUser({ dispatch }, user) {
    await this.$axios
      .put('/api/v1/auth', user)
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'ユーザー情報を変更しました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        window.location.href = '/'
      })
      .catch((error) => {
        dispatch(
          'flashMessage/showFlashMessage',
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
