<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col v-for="(account, index) in accounts" :key="index" cols="6">
          <v-item class="mx-auto">
            <account-lists :account="account" />
          </v-item>
        </v-col>
        <v-col cols="6">
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
import AccountNew from '~/components/AccountNew.vue'

export default {
  components: {
    AccountLists,
    AccountNew,
  },
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
