<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-card
        max-width="200"
        height="150"
        class="d-flex align-center justify-center mx-auto"
      >
        <v-btn
          width="100%"
          height="100%"
          color="transparent"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="grey" class="text-center text-h2">mdi-plus</v-icon>
        </v-btn>
      </v-card>
    </template>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> 新規口座開発 </v-card-title>
      <v-card-text class="px-12">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form">
            <validation-provider
              v-slot="{ errors }"
              name="口座名"
              rules="required|max:50"
            >
              <v-text-field
                v-model="account.name"
                label="口座名"
                :error-messages="errors"
                clearble
                data-testid="name"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="目標金額"
              rules="minValue:0|integer|required"
            >
              <v-text-field
                v-model="account.target_amount"
                label="目標金額"
                :error-messages="errors"
                clearble
                data-testid="target-amount"
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
                data-testid="register-account"
                @click="registerAccount"
              >
                口座を開設する
              </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
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
  max,
  min_value as minValue,
  integer,
} from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('max', max)
extend('minValue', minValue)
extend('integer', integer)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      dialog: false,
      account: {
        name: '',
        target_amount: 10000,
      },
    }
  },
  methods: {
    ...mapActions({
      createAccount: 'bank-account/createAccount',
    }),
    registerAccount() {
      this.createAccount(this.account)
      this.dialog = false
      this.account.name = ''
      this.account.target_amount = 10000
    },
  },
}
</script>
