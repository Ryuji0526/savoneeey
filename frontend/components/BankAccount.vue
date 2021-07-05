<template>
  <v-card max-width="300" height="200" class="cursor" @click="selectAccount">
    <v-card-text>
      <div>{{ account.name }}</div>
      <div>{{ account.id }}</div>
      <p>残高: {{ account.account_histories[latestNum].balance }}円</p>
      <p>From:{{ transaction.withdrawal }}</p>
      <p>To:{{ transaction.deposit }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click.stop="reveal = true">
        詳細を見る
      </v-btn>
    </v-card-actions>
    <v-dialog v-if="account.is_main === true" v-model="dialog1" width="500">
      <template #activator="{ on, attrs }">
        <v-card-actions>
          <v-btn text color="teal accent-4" v-bind="attrs" v-on="on">
            入金/出金
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
                    balance: account.account_histories[latestNum].balance,
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
      <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
        <v-card-text>
          <p class="mb-0">ユーザーID:{{ account.user_id }}</p>
          <p class="mb-0">アカウントID:{{ account.id }}</p>
          <p class="mb-0">目標金額:{{ account.target_amount }}</p>
          <p class="mb-0">メイン?:{{ account.is_main }}</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="accent-4" @click.stop="reveal = false">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
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
      latestNum: this.account.account_histories.length - 1,
      actions: ['出金', '入金'],
      action: '',
      transaction_amount: 0,
    }
  },
  computed: {
    ...mapGetters({
      transaction: 'bank-account/transaction',
    }),
  },
  methods: {
    ...mapActions({
      createTradingHistory: 'bank-account/createTradingHistory',
      getAccounts: 'bank-account/getAccounts',
      setDeposit: 'bank-account/setDeposit',
      setWithdrawal: 'bank-account/setWithdrawal',
      setAmount: 'bank-account/setAmount',
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
      this.dialog1 = false
      this.getAccounts()
    },
    registerTradingHistory() {
      this.setAmount(this.transaction_amount)
      this.createTradingHistory()
      this.dialog2 = false
    },
    selectAccount() {
      if (this.transaction.withdrawal.id === null) {
        this.setDeposit({
          id: null,
          name: null,
        })
        this.setWithdrawal({
          id: this.account.id,
          name: this.account.name,
          balance: this.account.account_histories[this.latestNum].balance,
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
      this.setWithdrawal({
        id: null,
        name: null,
        balance: null,
      })
      this.setDeposit({
        id: null,
        name: null,
      })
      this.dialog2 = false
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
}
.cursor {
  cursor: pointer;
  &:hover {
    background: yellow;
  }
}
p {
  margin: 0;
}
div {
  padding: 0;
}
</style>
