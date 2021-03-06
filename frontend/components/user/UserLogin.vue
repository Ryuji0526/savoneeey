<template>
  <v-card width="400px" class="mx-auto mt-15 py-7 rounded-xl" elevation="5">
    <v-card-text class="px-12 pb-0">
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
              label="※e-mail"
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
              label="※Password"
              :error-messages="errors"
              clearable
              data-testid="password"
              @click:append="show = !show"
            />
          </validation-provider>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              class="font-weight-bold text-body-2 turn-black"
              rounded
              data-testid="guestLogin"
              @click="guest"
            >
              ゲストとしてログイン
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="font-weight-bold text-body-1"
              text
              rounded
              :disabled="invalid"
              data-testid="login"
              @click="loginUser"
            >
              Log in
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
      loginAsGuest: 'user/loginAsGuest',
    }),
    loginUser() {
      this.login(this.user)
    },
    guest() {
      this.loginAsGuest()
    },
  },
}
</script>
