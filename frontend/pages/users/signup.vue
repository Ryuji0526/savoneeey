<template>
  <v-container>
    <main-title :title="title" />
    <signup-user />
  </v-container>
</template>

<script>
import SignupUser from '~/components/SignupUser'
import MainTitle from '~/components/MainTitle'

export default {
  auth: false,
  components: {
    SignupUser,
    MainTitle,
  },
  data() {
    return {
      title: 'SignUp',
    }
  },
}
</script>
