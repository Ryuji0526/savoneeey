<template>
  <v-container>
    <main-title :title="title" />
    <div class="d-flex mb-7">
      <v-spacer></v-spacer>
      <v-btn text small to="/service/account">
        <v-icon left>mdi-help-circle-outline</v-icon>
        How to Use
      </v-btn>
    </div>
    <v-item-group>
      <v-row>
        <v-col
          v-for="(account, i) in accounts"
          :key="i"
          :sm="i === 0 ? 12 : 6"
          class="mb-15"
          cols="12"
        >
          <v-item class="mx-auto">
            <account :account="account" data-testid="account" />
          </v-item>
        </v-col>
        <v-col cols="12" sm="6" align-self="center" class="mb-15">
          <v-item>
            <account-new data-testid="accountNew" />
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Account from '~/components/account/Account'
import AccountNew from '~/components/account/AccountNew'
import MainTitle from '~/components/layout/MainTitle'

export default {
  components: {
    Account,
    AccountNew,
    MainTitle,
  },
  data() {
    return {
      title: 'Accounts',
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'bankAccount/accounts',
    }),
  },
  mounted() {
    this.getAccounts()
  },
  methods: {
    ...mapActions({
      getAccounts: 'bankAccount/getAccounts',
    }),
  },
}
</script>
