<template>
  <v-container>
    <div>
      <p>loggedIn: {{ $auth.loggedIn }}</p>
    </div>
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
