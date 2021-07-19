<template>
  <v-dialog v-model="dialog" max-width="400" class="cursor">
    <template #activator="{ on, attrs }">
      <v-card max-width="200" height="150" class="d-flex align-center mx-auto">
        <v-btn
          width="100%"
          height="100%"
          color="#ffeb58"
          v-bind="attrs"
          class="turn-black"
          v-on="on"
        >
          <v-icon class="text-center text-h2">mdi-plus</v-icon>
        </v-btn>
      </v-card>
    </template>
    <v-card class="mx-auto rounded-lg" elevation="8">
      <v-card-title>
        <div class="text-h4 caption">
          <span class="text-h3 caption">O</span>pening
        </div>
      </v-card-title>
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form">
            <validation-provider
              v-slot="{ errors }"
              name="口座名"
              rules="required|max:50"
            >
              <v-text-field
                v-model="account.name"
                label="※Name"
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
                label="※Target"
                :error-messages="errors"
                clearble
                data-testid="target-amount"
                suffix="円"
              />
            </validation-provider>
            <v-select
              v-model="account.account_tag_links_attributes"
              :items="accountTagItems"
              chips
              :deletable-chips="deletable"
              label="Tags"
              multiple
            >
            </v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text rounded @click="dialog = false">Close</v-btn>
              <v-btn
                color="primary"
                class="font-weight-bold text-body-1"
                elavation="5"
                text
                rounded
                :disabled="invalid"
                data-testid="register-account"
                @click="registerAccount"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
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
      deletable: true,
      account: {
        name: '',
        target_amount: 10000,
        account_tag_links_attributes: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      accountTags: 'tag/accountTags',
    }),
    accountTagItems() {
      const items = []
      for (let i = 0; i < this.accountTags.length; i++) {
        const item = {}
        item.text = this.accountTags[i].name
        item.value = { account_tag_id: this.accountTags[i].id }
        items.push(item)
      }
      return items
    },
  },
  mounted() {
    this.getAccountTags()
  },
  methods: {
    ...mapActions({
      getAccountTags: 'tag/getAccountTags',
      createAccount: 'bankAccount/createAccount',
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

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
