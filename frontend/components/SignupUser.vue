<template>
  <v-container>
    <v-card width="400px" class="mx-auto mt-15 py-7 rounded-xl" elevation="10">
      <v-card-title>
        <h1 class="mx-auto text-h6 font-weight-bold">まずは登録から</h1>
      </v-card-title>
      <v-card-text class="px-12">
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
                label="パスワード (6文字以上)"
                :error-messages="errors"
                clearable
                data-testid="password"
                @click:append="show = !show"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="パスワード確認"
              rules="required|confirmed:confirmation"
            >
              <v-text-field
                v-model="user.password_confirmation"
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                label="パスワード確認"
                :error-messages="errors"
                clearable
                data-testid="password_confirmation"
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
                data-testid="sign-up"
                @click="registerUser"
              >
                登録
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
    }),
    registerUser() {
      this.$refs.observer.validate().then(() => {
        this.signUp(this.user)
      })
    },
  },
}
</script>
