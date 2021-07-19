<template>
  <v-card class="mx-auto rounded-lg" elevation="8">
    <v-card-title>
      <div class="text-h4 caption">
        <span class="text-h3 caption">S</span>lect Account
      </div>
    </v-card-title>
    <v-card-text>
      <v-radio-group v-model="selected">
        <v-radio
          v-for="(account, i) in accounts"
          :key="i"
          :label="account.name"
          :value="account.id"
        ></v-radio>
      </v-radio-group>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text rounded @click="close">Close</v-btn>
        <v-btn
          color="primary"
          class="font-weight-bold text-body-1"
          text
          rounded
          :disabled="disabled"
          data-testid="register-account-wish-list"
          @click="save"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapGetters({
      accounts: 'bankAccount/accounts',
    }),
    disabled() {
      return this.selected === null
    },
  },
  mounted() {
    this.getAccounts()
  },
  methods: {
    ...mapActions({
      getAccounts: 'bankAccount/getAccounts',
    }),
    close() {
      this.$emit('closeDialogRegister')
      this.$nextTick(() => {
        this.selected = null
      })
    },
    save() {
      this.$emit('register', this.selected)
    },
  },
}
</script>

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
