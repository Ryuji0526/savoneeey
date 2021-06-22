<template>
  <v-container>
    <p v-if="errored">Sorry something wrong...</p>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="user.name"
            prepend-icon="mdi-email"
            label="名前"
          />
          <v-text-field
            v-model="user.email"
            prepend-icon="mdi-email"
            label="メールアドレス"
          />
          <v-text-field
            v-model="user.password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード"
          />
          <v-text-field
            v-model="user.password_confirmation"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="パスワード確認"
          />
          <v-card-actions>
            <v-btn
              color="light-green darken-1"
              class="white--text"
              @click="registerUser"
            >
              新規登録
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  auth: false,
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errored: false,
    }
  },
  methods: {
    ...mapActions({
      signUp: 'user/signUp',
    }),
    registerUser() {
      console.log(this.user)
      this.signUp(this.user)
    },
  },
}
</script>
