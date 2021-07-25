<template>
  <v-card class="v-card--reveal mx-auto py-7 rounded-lg" elevation="8">
    <v-card-text class="px-12 pb-0">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider
            v-slot="{ errors }"
            name="パスワード(確認)"
            rules="required|min:6"
            vid="confirmation"
          >
            <v-text-field
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="※New Password"
              :error-messages="errors"
              clearable
              data-testid="password"
              @click:append="show = !show"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="新しいパスワード(確認)"
            rules="required|confirmed:confirmation"
          >
            <v-text-field
              v-model="user.password_confirmation"
              :type="show ? 'text' : 'password'"
              prepend-icon="mdi-lock-check"
              label="※NewPassword(confirmation)"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :error-messages="errors"
              clearable
              data-testid="password_confirmation"
              @click:append="show = !show"
            />
          </validation-provider>
          <v-card-actions>
            <v-btn
              class="turn-black"
              outlined
              rounded
              data-testid="switchBtn"
              @click="close"
            >
              <v-icon>mdi-account-edit</v-icon>
              名前・アドレス変更
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="font-weight-bold text-body-1"
              text
              rounded
              :disabled="invalid"
              data-testid="editBtn"
              @click="editUserPassword"
            >
              Save
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
import { required, min, confirmed } from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('min', min)
extend('confirmed', confirmed)

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      show: false,
      user: {
        password: '',
        password_confirmation: '',
      },
      defaultUser: {
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    ...mapActions({
      edit: 'user/editUserPassword',
    }),
    editUserPassword() {
      this.edit(this.user)
    },
    close() {
      this.$emit('close')
      this.$nextTick(() => {
        this.user = Object.assign({}, this.defaultUser)
      })
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
