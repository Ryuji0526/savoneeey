<template>
  <v-container>
    <main-title :title="title" />
    <user-signup data-testid="userSignup" />
  </v-container>
</template>

<script>
import UserSignup from '~/components/user/UserSignup'
import MainTitle from '~/components/layout/MainTitle'

export default {
  auth: false,
  components: {
    UserSignup,
    MainTitle,
  },
  data() {
    return {
      title: 'SignUp',
    }
  },
}
</script>
