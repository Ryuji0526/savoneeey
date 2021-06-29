<template>
  <v-container>
    <p>loggedIn: {{ $auth.loggedIn }}</p>
    <p v-if="loggedIn">name: {{ user.name }}</p>
    <p v-if="loggedIn">email: {{ user.email }}</p>
    <p v-if="loggedIn">id: {{ user.id }}</p>
  </v-container>
</template>

<script>
export default {
  auth: false,
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
