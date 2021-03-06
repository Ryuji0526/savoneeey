<template>
  <v-card class="mx-auto rounded-lg" elevation="8">
    <v-card-title>
      <div class="text-h4 caption">
        <span class="text-h3 caption">W</span>ithdrawal /
        <span class="text-h3 caption">D</span>eposit
      </div>
    </v-card-title>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider
            v-slot="{ errors }"
            name="出金/入金"
            rules="required"
          >
            <v-radio-group
              v-model="selected"
              row
              prepend-icon="mdi-bank-transfer"
            >
              <v-radio
                v-for="(action, index) in actions"
                :key="index"
                :label="action.label"
                :value="action.value"
                data-testid="radioBtn"
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
              maxValue: 10000000,
              lessThanBalance: {
                balance: currentBalance,
                action: selected,
              },
            }"
          >
            <v-text-field
              v-model="transaction_amount"
              prepend-icon="mdi-cash-multiple"
              label="※Amount"
              autocomplete="off"
              :error-messages="errors"
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
              @click="registerTradingHistoryOnlyMain"
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
      actions: [
        {
          label: 'Withdrawal(出金)',
          value: '出金',
        },
        { label: 'Deposit(入金)', value: '入金' },
      ],
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
        this.transaction_amount = null
        this.selected = ''
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
