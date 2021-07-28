<template>
  <v-container>
    <v-card width="400px" class="mx-auto py-7 rounded-xl" elevation="10">
      <v-card-text class="px-12 pb-0">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-form ref="form">
            <validation-provider
              v-slot="{ errors }"
              name="名前"
              rules="required"
            >
              <v-text-field
                v-model="user.name"
                prepend-icon="mdi-account"
                label="※Name"
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
                label="※e-mail"
                :error-messages="errors"
                clearable
                data-testid="email"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="パスワード"
              rules="required|min:6"
              vid="confirmation"
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
            <validation-provider
              v-slot="{ errors }"
              name="パスワード(確認)"
              rules="required|confirmed:confirmation"
            >
              <v-text-field
                v-model="user.password_confirmation"
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock-check"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                label="※Password(confirmation)"
                :error-messages="errors"
                clearable
                data-testid="password_confirmation"
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
                :disabled="invalid"
                text
                rounded
                data-testid="sign-up"
                @click="registerUser"
              >
                Sign Up
              </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import { required, email, confirmed, min } from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('email', email)
extend('confirmed', confirmed)
extend('min', min)

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      show: false,
    }
  },
  methods: {
    ...mapActions({
      signUp: 'user/signUp',
      loginAsGuest: 'user/loginAsGuest',
    }),
    registerUser() {
      this.signUp(this.user)
    },
    guest() {
      this.loginAsGuest()
    },
  },
}
</script>
