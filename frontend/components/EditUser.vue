<template>
  <v-card width="400px" class="mx-auto mt-15 py-7 rounded-xl" elevation="10">
    <v-card-title>
      <h1 class="mx-auto text-h6 font-weight-bold">ユーザー情報編集</h1>
    </v-card-title>
    <v-card-text class="px-12">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider v-slot="{ errors }" name="名前" rules="required">
            <v-text-field
              v-model="user.name"
              prepend-icon="mdi-account"
              label="名前"
              :error-messages="errors"
              clearable
              data-testid="name"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email"
          >
            <v-text-field
              v-model="user.email"
              prepend-icon="mdi-email"
              label="メールアドレス"
              :error-messages="errors"
              clearable
              data-testid="email"
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
                rounded-lg
              "
              elavation="5"
              outlined
              block
              :disabled="invalid"
              data-testid="edit"
              @click="editUser"
            >
              登録
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
import { required, email } from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('email', email)

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
      },
    }
  },
  methods: {
    ...mapActions({
      edit: 'user/editUser',
    }),
    editUser() {
      console.log(this.user)
      this.edit(this.user)
    },
  },
}
</script>
