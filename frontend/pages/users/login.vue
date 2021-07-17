<template>
  <v-container>
    <main-title :title="title" />
    <login-user />
  </v-container>
</template>

<script>
import LoginUser from '~/components/LoginUser'
import MainTitle from '~/components/MainTitle'

export default {
  auth: false,
  components: {
    LoginUser,
    MainTitle,
  },
  data() {
    return {
      title: 'LogIn',
    }
  },
}
</script>
