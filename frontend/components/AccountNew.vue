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
          data-testid="dialogBtn"
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
                autocomplete="off"
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
                autocomplete="off"
                clearble
                data-testid="target"
                suffix="円"
              />
            </validation-provider>
            <v-select
              v-model="account.account_tag_links_attributes"
              :items="accountTagItems"
              chips
              :deletable-chips="deletable"
              data-testid="tag"
              label="Tags"
              multiple
            >
            </v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text rounded data-testid="closeBtn" @click="closeNewDialog"
                >Close</v-btn
              >
              <v-btn
                color="primary"
                class="font-weight-bold text-body-1"
                elavation="5"
                text
                rounded
                :disabled="invalid"
                data-testid="saveBtn"
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
      defaultAccount: {
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
      this.closeNewDialog()
    },
    closeNewDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.account = Object.assign({}, this.defaultAccount)
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
