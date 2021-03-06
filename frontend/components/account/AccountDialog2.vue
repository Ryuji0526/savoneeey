<template>
  <v-card class="mx-auto rounded-lg" elevation="8">
    <v-card-title>
      <div class="text-h4 caption">
        <span class="text-h3 caption">T</span>rading
      </div>
    </v-card-title>
    <v-card-text>
      <div class="font-weight-bold text-h6">
        <span data-testid="withdrawal">
          {{ transaction.withdrawal.name }}
        </span>
        <v-icon class="pb-1">mdi-chevron-triple-right</v-icon>
        <span data-testid="deposit">
          {{ transaction.deposit.name }}
        </span>
      </div>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider
            v-slot="{ errors }"
            name="金額"
            :rules="{
              required: 'required',
              integer: 'integer',
              minValue: 0,
              maxValue: 10000000,
              lessThanBalance: {
                balance: transaction.withdrawal.balance,
                action: '出金',
              },
            }"
          >
            <v-text-field
              v-model="transaction_amount"
              label="※Amount"
              :error-messages="errors"
              autocomplete="off"
              clearble
              data-testid="amount"
              suffix="円"
            />
          </validation-provider>
          <v-card-actions class="d-flex justify-space-around">
            <v-spacer></v-spacer>
            <v-btn text rounded data-testid="closeBtn" @click="close"
              >Close</v-btn
            >
            <v-btn
              color="primary"
              class="font-weight-bold text-body-1"
              text
              rounded
              :disabled="invalid"
              data-testid="saveBtn"
              @click="registerTradingHistory"
            >
              Save
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
  max_value as maxValue,
} from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)
extend('maxValue', maxValue)

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
      transaction: 'bankAccount/transaction',
    }),
  },
  methods: {
    ...mapActions({
      createTradingHistory: 'bankAccount/createTradingHistory',
      setDeposit: 'bankAccount/setDeposit',
      setWithdrawal: 'bankAccount/setWithdrawal',
      setAmount: 'bankAccount/setAmount',
      clearTransaction: 'bankAccount/clearTransaction',
    }),
    registerTradingHistory() {
      this.setAmount(this.transaction_amount)
      this.createTradingHistory()
      this.close()
    },
    close() {
      this.$emit('closeDialog2')
      this.$nextTick(() => {
        this.transaction_amount = null
        this.clearTransaction()
      })
    },
  },
}
</script>

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
