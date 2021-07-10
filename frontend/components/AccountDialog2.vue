<template>
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
              minValue: 0,
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
          <v-card-actions class="d-flex justify-space-around">
            <v-btn @click="closeDialog2">閉じる</v-btn>
            <v-btn
              color="light-green darken-1"
              class="white--text text-body-1 font-weight-bold rounded-log"
              elavation="5"
              outlined
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
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      transaction_amount: null,
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
      setDeposit: 'bank-account/setDeposit',
      setWithdrawal: 'bank-account/setWithdrawal',
      setAmount: 'bank-account/setAmount',
      clearTransaction: 'bank-account/clearTransaction',
    }),
    registerTradingHistory() {
      this.setAmount(this.transaction_amount)
      this.createTradingHistory()
      this.closeDialog2()
      this.transaction_amount = 0
    },
    closeDialog2() {
      this.clearTransaction()
      this.$emit('closeDialog2')
    },
  },
}
</script>
