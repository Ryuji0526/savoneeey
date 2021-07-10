<template>
  <v-container>
    <v-btn text to="/my-accounts">
      <v-icon dark size="25" class="mx-1">mdi-arrow-left</v-icon>
      BACK
    </v-btn>
    <p class="text-h1 font-weight-light text-center">
      {{ count | toLocaleString }}
    </p>
    <v-breadcrumbs :items="items" divider="/" class="pl-4"></v-breadcrumbs>
    <v-subheader class="text-h4 my-5">Detail</v-subheader>
    <account-detail :account="account" :current-balance="currentBalance" />
    <v-subheader id="history" class="text-h4 my-5">History</v-subheader>
    <account-history :account="account" />
    <v-subheader id="wish-lists" class="text-h4 my-5">WishLists</v-subheader>
    <v-card></v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs/lib/anime.es.js'
import AccountDetail from '~/components/AccountDetail'
import AccountHistory from '~/components/AccountHistory'

export default {
  components: {
    AccountDetail,
    AccountHistory,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
  },
  data() {
    return {
      items: [
        {
          text: 'Detail',
          disabled: true,
          href: '#detail',
        },
        {
          text: 'History',
          disabled: false,
          href: '#history',
        },
        {
          text: 'WishLists',
          disabled: false,
          href: '#wish-lists',
        },
      ],
      count: 0,
    }
  },
  computed: {
    ...mapGetters({
      account: 'bank-account/account',
    }),
    currentBalance() {
      return this.account.recent_histories[0].balance
    },
  },
  watch: {
    account(newValue) {
      this.setCount(newValue.recent_histories[0].balance)
    },
  },
  methods: {
    ...mapActions({
      getAccount: 'bank-account/getAccount',
    }),
    setCount(val) {
      const obj = { n: this.count }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 700,
        easing: 'linear',
        update: () => {
          this.count = obj.n
        },
      })
    },
  },
  mounted() {
    this.getAccount(this.$route.params.id)
    this.setCount(this.currentBalance)
  },
}
</script>

<style scoped>
.v-tabs {
  width: 90%;
  margin: 0 auto;
}
</style>

<style>
* {
  color: rgba(0, 0, 0, 0.6);
}
</style>
