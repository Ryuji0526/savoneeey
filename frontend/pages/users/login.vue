<template>
  <v-container>
    <message />
    <login-user />
  </v-container>
</template>

<script>
import Message from '~/components/Message'
import LoginUser from '~/components/LoginUser'

export default {
  auth: false,
  components: {
    Message,
    LoginUser,
  },
}
</script>
