<template>
  <v-card>
    <v-card-actions class="pb-0 pt-5">
      <v-btn
        text
        color="accent-4"
        class="ml-auto"
        @click="editable = !editable"
      >
        <v-icon v-if="!editable">mdi-pencil-outline</v-icon>
        <v-icon v-else>mdi-pencil-off-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10 pt-0">
          <v-list-item-subtitle>Name</v-list-item-subtitle>
          <v-list-item-title v-if="!editable" class="text-h6 text-center">{{
            account.name
          }}</v-list-item-title>
          <v-list-item-title v-else class="text-h6 text-center">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="口座名"
                rules="required|max:50"
              >
                <v-text-field
                  v-model="accountData.name"
                  :error-messages="errors"
                  clearble
                  data-testid="name"
                />
              </validation-provider>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10">
          <v-list-item-subtitle>TargetAmount</v-list-item-subtitle>
          <v-list-item-title v-if="!editable" class="text-h6 text-center"
            >{{ account.target_amount | toLocaleString
            }}<span class="ml-5"
              >({{
                (currentBalance - account.target_amount) | toLocaleString
              }})</span
            ></v-list-item-title
          >
          <v-list-item-title v-else class="text-h6 text-center">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="目標金額"
                rules="required|minValue:0|integer"
              >
                <v-text-field
                  v-model="accountData.target_amount"
                  :error-messages="errors"
                  clearble
                  data-testid="name"
                  suffix="円"
                />
              </validation-provider>
              <v-card-actions class="d-flex justify-end">
                <v-btn
                  color="light-green darken-1"
                  class="white--text text-body-1 font-weight-bold rounded-log"
                  elavation="5"
                  outlined
                  :disabled="invalid"
                  data-testid="register-account-history"
                  @click="edit"
                >
                  編集する
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </validation-observer>
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
  max,
  integer,
  min_value as minValue,
} from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('max', max)
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
    currentBalance: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editable: false,
    }
  },
  computed: {
    accountData() {
      return {
        name: this.account.name,
        target_amount: this.account.target_amount,
        id: this.account.id,
      }
    },
  },
  methods: {
    ...mapActions({
      editAccount: 'bank-account/editAccount',
    }),
    closeEditable() {
      this.accountData.name = this.account.name
      this.accountData.target_amount = this.account.target_amount
      this.editable = false
    },
    edit() {
      this.editAccount(this.accountData)
      this.editable = false
    },
  },
}
</script>
