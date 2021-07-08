<template>
  <v-card
    max-width="400"
    min-height="300"
    class="mt-10"
    :class="{ selected: isSelected, cursor: !reveal }"
    @click="selectAccount"
  >
    <v-card-text class="pt-10">
      <div class="text-h5 ml-10">- {{ account.name }} -</div>
      <p class="text-center text-h2 mt-8 font-weight-regular">
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
        color="accent-4"
        absolute
        right
        bottom
        @click.stop="reveal = true"
      >
        詳細
        <v-icon>mdi-arrow-bottom-right</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-if="account.is_main === true" v-model="dialog1" width="500">
      <template #activator="{ on, attrs }">
        <v-card-actions>
          <v-btn
            v-bind="attrs"
            fab
            absolute
            bottom
            left
            v-on="on"
            @click="clearTransaction"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">出金/入金</v-card-title>
        <v-card-text class="px-12">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="出金/入金"
                rules="required"
              >
                <v-radio-group v-model="action" row>
                  <v-radio
                    v-for="(action, index) in actions"
                    :key="index"
                    :label="action"
                    :value="action"
                    :error-messages="errors"
                  ></v-radio>
                </v-radio-group>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="金額"
                :rules="{
                  required: 'required',
                  integer: 'integer',
                  lessThanBalance: {
                    balance: currentBalance,
                    action: action,
                  },
                }"
              >
                <v-text-field
                  v-model="transaction_amount"
                  label="金額"
                  :error-messages="errors"
                  clearble
                  data-testid="amount"
                  suffix="円"
                />
              </validation-provider>
              <v-card-actions>
                <v-btn
                  color="light-green darken-1"
                  class="
                    white--text
                    mx-auto
                    text-body-1
                    font-weight-bold
                    rounded-log
                  "
                  elavation="5"
                  outlined
                  block
                  :disabled="invalid"
                  data-testid="register-account-history"
                  @click="registerTradingHistoryOnlyMain"
                >
                  出金/入金する
                </v-btn>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">出金/入金</v-card-title>
        <v-card-text class="px-12">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="金額"
                :rules="{
                  required: 'required',
                  integer: 'integer',
                  lessThanBalance: {
                    balance: transaction.withdrawal.balance,
                    action: '出金',
                  },
                }"
              >
                <v-text-field
                  v-model="transaction_amount"
                  label="金額"
                  :error-messages="errors"
                  clearble
                  data-testid="amount"
                  suffix="円"
                />
              </validation-provider>
              <v-card-actions>
                <v-btn @click="closeDialog2">閉じる</v-btn>
                <v-btn
                  color="light-green darken-1"
                  class="
                    white--text
                    mx-auto
                    text-body-1
                    font-weight-bold
                    rounded-log
                  "
                  elavation="5"
                  outlined
                  block
                  :disabled="invalid"
                  data-testid="register-account-history"
                  @click="registerTradingHistory"
                >
                  出金/入金する
                </v-btn>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="v-card--reveal px-3"
        :class="{ selected: isSelected }"
        style="height: 100%"
      >
        <account-sparkline :account="account" />
        <v-card-actions>
          <v-btn
            text
            color="accent-4"
            class="mt-n10"
            @click.stop="reveal = false"
          >
            <v-icon dark size="25" class="mx-1">mdi-arrow-left</v-icon>
            CLOSE
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="accent-4"
            class="mt-n10"
            @click.stop="reveal = false"
          >
            MORE
            <v-icon dark size="25" class="mx-1">mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-subheader
            >目標金額<span class="mb-0 mx-auto text-h5">{{
              account.target_amount | toLocaleString
            }}</span></v-subheader
          >
          <v-divider></v-divider>
          <v-subheader>最近の履歴</v-subheader>
          <v-virtual-scroll
            :items="account.recent_histories"
            :item-height="30"
            height="80"
          >
            <template #default="{ item }">
              <v-list-item class="text-center">
                <v-list-item-title>{{ item.created }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.action }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ item.amount }}</v-list-item-subtitle>
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
import anime from 'animejs/lib/anime.es.js'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import {
  required,
  integer,
  min_value as minValue,
} from 'vee-validate/dist/rules.umd'
import AccountSparkline from '~/components/AccountSparkLine'

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    AccountSparkline,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
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
      actions: ['出金', '入金'],
      action: '',
      current_balance: this.account.recent_histories[0].balance,
      count: 0,
      transaction_amount: null,
    }
  },
  computed: {
    ...mapGetters({
      transaction: 'bank-account/transaction',
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
    items() {
      return this.account.recent_histories
    },
    proportion() {
      return Math.round(
        (this.currentBalance / this.account.target_amount) * 100
      )
    },
  },
  watch: {
    account(newValue) {
      this.setCount(newValue.recent_histories[0].balance)
    },
  },
  methods: {
    ...mapActions({
      createTradingHistory: 'bank-account/createTradingHistory',
      setDeposit: 'bank-account/setDeposit',
      setWithdrawal: 'bank-account/setWithdrawal',
      setAmount: 'bank-account/setAmount',
      clearTransaction: 'bank-account/clearTransaction',
    }),
    registerTradingHistoryOnlyMain() {
      switch (this.action) {
        case '出金':
          this.setWithdrawal({
            id: this.account.id,
          })
          break
        case '入金':
          this.setDeposit({
            id: this.account.id,
          })
          break
      }
      this.setAmount(this.transaction_amount)
      this.createTradingHistory()
      this.clearTransaction()
      this.transaction_amount = 0
      this.dialog1 = false
    },
    registerTradingHistory() {
      this.setAmount(this.transaction_amount)
      this.createTradingHistory()
      this.closeDialog2()
      this.transaction_amount = 0
    },
    selectAccount() {
      if (this.reveal === true) {
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
    closeDialog2() {
      this.clearTransaction()
      this.dialog2 = false
    },
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
  },
  mounted() {
    this.setCount(this.current_balance)
  },
}
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.cursor {
  &:hover {
    // cursor: pointer;
    border: 1px solid yellow;
  }
}
.selected {
  border: 1px solid yellow;
}
p {
  margin: 0;
}
div {
  padding: 0;
}
</style>
