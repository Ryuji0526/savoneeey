<template>
  <v-container>
    <main-title :title="title" />
    <user-login data-testid="userLogin" />
  </v-container>
</template>

<script>
import UserLogin from '~/components/user/UserLogin'
import MainTitle from '~/components/layout/MainTitle'

export default {
  auth: false,
  components: {
    UserLogin,
    MainTitle,
  },
  data() {
    return {
      title: 'LogIn',
    }
  },
}
</script>
