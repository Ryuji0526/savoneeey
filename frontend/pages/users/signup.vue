<template>
  <v-container>
    <main-title :title="title" />
    <user-signup />
  </v-container>
</template>

<script>
import UserSignup from '~/components/UserSignup'
import MainTitle from '~/components/MainTitle'

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
