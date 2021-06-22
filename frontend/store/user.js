export const actions = {
  signUp({ commit }, Data) {
    this.$axios
      .post('/api/v1/auth', Data)
      .then((res) => {
        console.log('新規登録成功')
        console.log(res)
        this.$auth
          .loginWith('local', {
            data: {
              email: Data.email,
              password: Data.password,
            },
          })
          .then((res) => {
            console.log('登録&&ログイン成功')
            console.log(res)
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
