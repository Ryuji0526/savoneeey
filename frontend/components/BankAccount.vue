<template>
  <div>
    <!-- <p>{{ this.$auth.user.id }}</p> -->
    <div v-for="(account, index) in accounts" :key="index">
      <p>{{ account.user_id }}</p>
      <p>{{ account.name }}</p>
    </div>
    <button @click="getAccounts">button</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      accounts: 'bank-account/accounts',
    }),
  },
  methods: {
    ...mapActions({
      getAccounts: 'bank-account/getAccounts',
    }),
  },
  mounted() {
    this.getAccounts()
  },
}
</script>
