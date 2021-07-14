<template>
  <v-container>
    <v-item-group>
      <v-row>
        <v-col
          v-for="(account, i) in accounts"
          :key="i"
          :sm="i === 0 ? 12 : 6"
          cols="12"
        >
          <v-item class="mx-auto">
            <account :account="account" />
          </v-item>
        </v-col>
        <v-col cols="6" align-self="center">
          <v-item class="mx-auto">
            <account-new />
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Account from '~/components/Account'
import AccountNew from '~/components/AccountNew'

export default {
  components: {
    Account,
    AccountNew,
  },
  computed: {
    ...mapGetters({
      accounts: 'bankAccount/accounts',
    }),
  },
  methods: {
    ...mapActions({
      getAccounts: 'bankAccount/getAccounts',
    }),
  },
  mounted() {
    this.getAccounts()
  },
}
</script>
