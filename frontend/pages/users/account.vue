<template>
  <div>
    <h2>ログイン状態:{{ $auth.loggedIn }}</h2>
    <div v-if="$auth.loggedIn">
      <button @click="logout()">logout</button>
    </div>
    <div v-else>
      <nav>
        <nuxt-link to="users/login">Login</nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
