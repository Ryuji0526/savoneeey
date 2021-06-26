<template>
  <v-container>
    <message />
    <signup-user />
  </v-container>
</template>

<script>
import Message from '~/components/Message'
import SignupUser from '~/components/SignupUser'

export default {
  auth: false,
  components: {
    Message,
    SignupUser,
  },
}
</script>
