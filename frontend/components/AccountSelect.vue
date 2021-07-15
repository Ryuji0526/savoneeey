<template>
  <v-card>
    <v-card-title class="text-h5">口座の選択</v-card-title>
    <v-container>
      <v-radio-group v-model="selected" class="mt-0">
        <v-radio
          v-for="(account, i) in accounts"
          :key="i"
          :label="account.name"
          :value="account.id"
        ></v-radio>
      </v-radio-group>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="darken-1" class="text-body-1" text @click="close">
        閉じる
      </v-btn>
      <v-btn
        color="light-green darken-1"
        class="text-body-1"
        text
        :disabled="disabled"
        @click="save"
      >
        追加
      </v-btn>
    </v-card-actions>
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
  mounted() {
    this.getAccounts()
  },
}
</script>
