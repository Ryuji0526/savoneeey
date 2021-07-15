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
    <account-wish-lists :account="account" />
    <div v-if="!is_main" class="text-right mt-10">
      <v-btn @click="deletable"> 口座を削除する </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs/lib/anime.es.js'
import AccountDetail from '~/components/AccountDetail'
import AccountHistory from '~/components/AccountHistory'
import AccountWishLists from '~/components/AccountWishLists'

export default {
  components: {
    AccountDetail,
    AccountHistory,
    AccountWishLists,
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
      account: 'bankAccount/account',
    }),
    currentBalance() {
      return this.account.recent_histories[0].balance
    },
    is_main() {
      return this.account.is_main === true
    },
  },
  watch: {
    account(newValue) {
      this.setCount(newValue.recent_histories[0].balance)
    },
  },
  methods: {
    ...mapActions({
      getAccount: 'bankAccount/getAccount',
      deleteAccount: 'bankAccount/deleteAccount',
      showFlashMessage: 'flashMessage/showFlashMessage',
    }),
    setCount(val) {
      const obj = { n: this.count }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 600,
        easing: 'linear',
        update: () => {
          this.count = obj.n
        },
      })
    },
    deletable() {
      if (this.currentBalance > 0) {
        window.scrollTo(0, 0)
        this.showFlashMessage({
          content: '残高が存在するため削除できません。',
          type: 'error',
        })
      } else {
        this.deleteAccount(this.account.id)
      }
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
