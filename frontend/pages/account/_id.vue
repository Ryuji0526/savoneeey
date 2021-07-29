<template>
  <v-container>
    <main-title :title="title" />
    <v-btn text rounded to="/accounts" class="turn-black" data-testid="backBtn">
      <v-icon dark size="25" class="mx-1">mdi-arrow-left</v-icon>
      BACK
    </v-btn>
    <p class="text-h1 font-weight-light text-center" data-testid="balance">
      {{ count | toLocaleString }}
    </p>
    <v-breadcrumbs
      :items="items"
      divider="/"
      class="pl-4 font-weight-bold"
    ></v-breadcrumbs>
    <v-subheader class="text-h4 my-5 caption">
      <span class="text-h3 caption">D</span>etail
    </v-subheader>
    <account-detail
      :account="account"
      :current-balance="currentBalance"
      data-testid="accountDetail"
    />
    <v-subheader id="history" class="text-h4 my-5 caption"
      ><span class="text-h3 caption">H</span>istory
    </v-subheader>
    <account-history :account="account" data-testid="accountHistory" />
    <v-subheader id="wish-lists" class="text-h4 my-5 caption"
      ><span class="text-h3 caption">W</span>ishLists
    </v-subheader>
    <account-wish-lists :account="account" data-testid="accountWishLists" />
    <div v-if="!is_main" class="text-right mt-10">
      <v-btn
        class="turn-black"
        rounded
        color="#ffeb58"
        data-testid="deleteBtn"
        @click="dialogDelete = true"
      >
        Delete Account
      </v-btn>
    </div>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <delete-alert
        :message="message"
        data-testid="deleteAlert"
        @close="dialogDelete = false"
        @delete="deletable"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs'
import AccountDetail from '~/components/account/AccountDetail'
import AccountHistory from '~/components/account/AccountHistory'
import AccountWishLists from '~/components/account/AccountWishLists'
import MainTitle from '~/components/layout/MainTitle'
import DeleteAlert from '~/components/layout/DeleteAlert'

export default {
  components: {
    AccountDetail,
    AccountHistory,
    AccountWishLists,
    MainTitle,
    DeleteAlert,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
  },
  data() {
    return {
      dialogDelete: false,
      message: 'この口座',
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
      title: 'Account',
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
  mounted() {
    this.getAccount(this.$route.params.id)
    this.setCount(this.currentBalance)
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
        this.dialogDelete = false
        this.showFlashMessage({
          content: '残高が存在するため削除できません。',
          type: 'error',
        })
      } else {
        this.deleteAccount(this.account.id)
      }
    },
  },
}
</script>

<style scoped>
.v-tabs {
  width: 90%;
  margin: 0 auto;
}
</style>

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
