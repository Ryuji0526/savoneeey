<template>
  <v-container>
    <main-title :title="title" />
    <user-login />
  </v-container>
</template>

<script>
import UserLogin from '~/components/UserLogin'
import MainTitle from '~/components/MainTitle'

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
