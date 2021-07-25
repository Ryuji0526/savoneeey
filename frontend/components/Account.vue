<template>
  <v-card
    :class="{ selected: isSelected, cursor: !reveal }"
    class="rounded-lg py-15"
    max-width="400"
    min-height="300"
    elevation="8"
    @click="selectAccount"
  >
    <v-card-text>
      <div class="text-h5 ml-10" data-testid="name">- {{ account.name }} -</div>
      <p class="text-center text-h2 mt-8" data-testid="balance">
        {{ count | toLocaleString }}
      </p>
    </v-card-text>
    <v-progress-circular
      v-if="account.target_amount > 0"
      :rotate="360"
      :size="50"
      :value="proportion"
      width="4"
      class="ml-11 mt-8"
    >
      {{ proportion }}
    </v-progress-circular>
    <v-card-actions>
      <v-btn
        text
        rounded
        color="accent-4"
        class="turn-black"
        absolute
        right
        bottom
        data-testid="reveal"
        @click.stop="reveal = true"
      >
        <v-icon large>mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog
      v-if="account.is_main === true"
      v-model="dialog1"
      max-width="400"
      persistent
    >
      <template #activator="{ on, attrs }">
        <v-card-actions>
          <v-btn
            v-bind="attrs"
            class="turn-black"
            fab
            absolute
            bottom
            left
            data-testid="dialog1Btn"
            v-on="on"
          >
            <v-icon>mdi-plus-minus-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
      <account-dialog-1
        :account="account"
        max-width="400"
        @closeDialog1="dialog1 = false"
      />
    </v-dialog>
    <v-dialog v-model="dialog2" width="400" persistent>
      <account-dialog-2 :account="account" @closeDialog2="dialog2 = false" />
    </v-dialog>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="v-card--reveal px-3"
        :class="{ selected: isSelected }"
      >
        <account-sparkline :account="account" />
        <v-card-actions>
          <v-btn
            text
            rounded
            class="mt-n10 turn-black"
            data-testid="closeBtn"
            @click.stop="reveal = false"
          >
            <v-icon dark size="25" class="mx-1"
              >mdi-close-circle-outline</v-icon
            >
            CLOSE
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            rounded
            class="mt-n10 turn-black"
            :to="{ path: `/account/${account.id}` }"
            data-testid="moreBtn"
          >
            MORE
            <v-icon dark size="25" class="mx-1"
              >mdi-dots-horizontal-circle-outline</v-icon
            >
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-subheader
            >Target<span class="mb-0 mx-auto text-h5" data-testid="target">{{
              account.target_amount | toLocaleString
            }}</span></v-subheader
          >
          <v-divider></v-divider>
          <v-subheader>Recent History</v-subheader>
          <v-virtual-scroll
            :items="account.recent_histories"
            :item-height="30"
            height="80"
          >
            <template #default="{ item }">
              <v-list-item class="text-center">
                <v-list-item-title>{{
                  item.created_at | moement
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.action }}</v-list-item-subtitle>
                <v-list-item-subtitle data-testid="history">{{
                  item.amount
                }}</v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import anime from 'animejs'
import moment from 'moment'
import AccountSparkline from '~/components/AccountSparkline'
import AccountDialog1 from '~/components/AccountDialog1'
import AccountDialog2 from '~/components/AccountDialog2'

export default {
  components: {
    AccountSparkline,
    AccountDialog1,
    AccountDialog2,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
    moement(date) {
      return moment(date).format(`D日 MM:mm`)
    },
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reveal: false,
      dialog1: false,
      dialog2: false,
      current_balance: this.account.recent_histories[0].balance,
      count: 0,
    }
  },
  computed: {
    ...mapGetters({
      transaction: 'bankAccount/transaction',
    }),
    isSelected() {
      return (
        this.transaction.withdrawal.id === this.account.id ||
        this.transaction.deposit.id === this.account.id
      )
    },
    currentBalance() {
      return this.account.recent_histories[0].balance
    },
    proportion() {
      const value = Math.round(
        (this.currentBalance / this.account.target_amount) * 100
      )
      return value > 100 ? '100+' : value
    },
  },
  watch: {
    account(newValue) {
      this.setCount(newValue.recent_histories[0].balance)
    },
  },
  mounted() {
    this.count = 0
    this.setCount(this.current_balance)
    this.clearTransaction()
  },
  methods: {
    ...mapActions({
      clearTransaction: 'bankAccount/clearTransaction',
      setDeposit: 'bankAccount/setDeposit',
      setWithdrawal: 'bankAccount/setWithdrawal',
    }),
    selectAccount() {
      if (this.reveal) {
        return
      }
      if (this.transaction.withdrawal.id === null) {
        this.setDeposit({
          id: null,
          name: null,
        })
        this.setWithdrawal({
          id: this.account.id,
          name: this.account.name,
          balance: this.currentBalance,
        })
      } else if (this.transaction.withdrawal.id === this.account.id) {
        this.setWithdrawal({
          id: null,
          name: null,
          balance: null,
        })
      } else {
        this.setDeposit({
          id: this.account.id,
          name: this.account.name,
        })
        this.dialog2 = true
      }
    },
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
}
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  height: 100%;
}
.cursor {
  &:hover {
    background: #ffeb58;
    transition: 0.3s;
  }
}
.selected {
  background: #ffeb58;
}
p {
  margin: 0;
}
div {
  padding: 0;
}
</style>
