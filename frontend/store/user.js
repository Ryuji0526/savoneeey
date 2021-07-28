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
        this.$router.push('/accounts')
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
  async loginAsGuest({ dispatch }) {
    await this.$auth
      .loginWith('local', {
        data: {
          email: 'guest1234@guest.com',
          password: 'password',
        },
      })
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'ゲストとしてログインしました。',
            type: 'success',
          },
          {
            root: true,
          }
        )
        this.$router.push('/accounts')
      })
      .catch((error) => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'ログインに失敗しました。',
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
  async editUserPassword({ dispatch }, user) {
    await this.$axios
      .put('/api/v1/auth/password', user)
      .then(() => {
        dispatch(
          'flashMessage/showFlashMessage',
          {
            content: 'パスワードを変更しました。',
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
              'パスワードの変更に失敗しました。もう一度登録をお願いします',
            type: 'error',
          },
          {
            root: true,
          }
        )
        console.log(error)
      })
  },
  async logout({ dispatch }) {
    await this.$auth.logout().then(() => {
      dispatch(
        'flashMessage/showFlashMessage',
        {
          content: 'ログアウトしました。',
          type: 'success',
        },
        {
          root: true,
        }
      )
      window.location.href = '/'
    })
  },
}
