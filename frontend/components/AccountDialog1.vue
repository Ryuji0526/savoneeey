<template>
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
            <v-radio-group v-model="selected" row>
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
              minValue: 0,
              lessThanBalance: {
                balance: currentBalance,
                action: selected,
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
          <v-card-actions class="d-flex justify-space-around">
            <v-spacer></v-spacer>
            <v-btn text @click="close">閉じる</v-btn>
            <v-btn
              color="light-green darken-1"
              class="white--text text-body-1 font-weight-bold rounded-log"
              elavation="5"
              text
              :disabled="invalid"
              data-testid="register-account-history"
              @click="registerTradingHistoryOnlyMain"
            >
              出金/入金
            </v-btn>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
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
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      transaction_amount: 0,
      actions: ['出金', '入金'],
      selected: '',
      current_balance: this.account.recent_histories[0].balance,
    }
  },
  computed: {
    currentBalance() {
      return this.account.recent_histories[0].balance
    },
  },
  methods: {
    ...mapActions({
      setAmount: 'bankAccount/setAmount',
      createTradingHistory: 'bankAccount/createTradingHistory',
      clearTransaction: 'bankAccount/clearTransaction',
      setWithdrawal: 'bankAccount/setWithdrawal',
      setDeposit: 'bankAccount/setDeposit',
    }),
    registerTradingHistoryOnlyMain() {
      switch (this.selected) {
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
      this.close()
    },
    close() {
      this.$emit('closeDialog1')
      this.$nextTick(() => {
        this.transaction_amount = 0
        this.clearTransaction()
      })
    },
  },
}
</script>
