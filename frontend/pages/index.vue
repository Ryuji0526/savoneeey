<template>
  <v-container>
    <message />
    <p>loggedIn: {{ $auth.loggedIn }}</p>
    <p v-if="loggedIn">name: {{ user.name }}</p>
    <p v-if="loggedIn">email: {{ user.email }}</p>
  </v-container>
</template>

<script>
import Message from '~/components/Message'

export default {
  auth: false,
  components: {
    Message,
  },
  computed: {
    user() {
      return this.$auth.user
    },
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
}
</script>
