<template>
  <v-card width="400px" class="mx-auto mt-15 py-7 rounded-xl" elevation="10">
    <v-card-title>
      <h1 class="mx-auto text-h6 font-weight-bold">ログイン</h1>
    </v-card-title>
    <v-card-text class="px-12">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
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
          <validation-provider
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <v-text-field
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              :error-messages="errors"
              clearable
              data-testid="password"
              @click:append="show = !show"
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
              data-testid="login"
              @click="loginUser"
            >
              ログイン
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
        email: '',
        password: '',
      },
      show: false,
    }
  },
  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    loginUser() {
      this.$refs.observer.validate().then(() => {
        this.login(this.user)
      })
    },
  },
}
</script>
