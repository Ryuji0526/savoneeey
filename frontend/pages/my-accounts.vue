<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="(account, i) in accounts"
          :key="i"
          :cols="i === 0 ? 12 : 6"
        >
          <v-item class="mx-auto">
            <account-lists :account="account" />
          </v-item>
        </v-col>
        <v-col cols="6" align-self="center">
          <v-item class="mx-auto">
            <account-new />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AccountLists from '~/components/AccountLists'
import AccountNew from '~/components/AccountNew'

export default {
  components: {
    AccountLists,
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
