<template>
  <v-container>
    <signup-user />
  </v-container>
</template>

<script>
import SignupUser from '~/components/SignupUser'

export default {
  auth: false,
  components: {
    SignupUser,
  },
}
</script>
