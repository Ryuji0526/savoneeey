<template>
  <v-container>
    <login-user />
  </v-container>
</template>

<script>
import LoginUser from '~/components/LoginUser'

export default {
  auth: false,
  components: {
    LoginUser,
  },
}
</script>
