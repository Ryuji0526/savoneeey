<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col v-for="(account, index) in accounts" :key="index" cols="6">
          <v-item class="mx-auto">
            <bank-account :account="account" />
          </v-item>
        </v-col>
        <v-col cols="6">
          <v-item class="mx-auto">
            <new-account />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BankAccount from '~/components/BankAccount'
import NewAccount from '~/components/NewAccount'

export default {
  components: {
    BankAccount,
    NewAccount,
  },
  computed: {
    ...mapGetters({
      accounts: 'bank-account/accounts',
    }),
  },
  methods: {
    ...mapActions({
      getAccounts: 'bank-account/getAccounts',
      getAccount: 'bank-account/getAccount',
    }),
  },
  mounted() {
    this.getAccounts()
  },
}
</script>
