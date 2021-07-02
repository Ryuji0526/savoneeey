<template>
  <v-card max-width="300" height="200">
    <v-card-text>
      <div>{{ account.name }}</div>
      <p>残高: {{ account.account_histories[latestNum].balance }}円</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true">
        詳細を見る
      </v-btn>
    </v-card-actions>
    <v-dialog v-if="account.is_main === true" v-model="dialog" width="500">
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
                  v-model="amount.transaction_amount"
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
          <v-btn text color="accent-4" @click="reveal = false"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
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
      dialog: false,
      latestNum: this.account.account_histories.length - 1,
      actions: ['出金', '入金'],
      action: '',
      amount: {
        deposit_id: null,
        withdrawal_id: null,
        transaction_amount: 0,
      },
    }
  },
  methods: {
    ...mapActions({
      createTradingHistory: 'bank-account/createTradingHistory',
      getAccounts: 'bank-account/getAccounts',
    }),
    registerTradingHistory() {
      this.$refs.observer.validate().then(() => {
        switch (this.action) {
          case '出金':
            this.amount.withdrawal_id = this.account.id
            break
          case '入金':
            this.amount.deposit_id = this.account.id
            break
        }
        this.createTradingHistory(this.amount)
        this.dialog = false
        this.getAccounts()
      })
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
