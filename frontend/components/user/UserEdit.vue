<template>
  <v-card max-width="400px" class="mx-auto py-7 rounded-lg" elevation="8">
    <v-card-text class="px-12 pb-0">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider v-slot="{ errors }" name="名前" rules="required">
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
          <v-card-actions>
            <v-btn
              class="turn-black"
              outlined
              rounded
              data-testid="passwordBtn"
              @click="reveal = true"
            >
              <v-icon>mdi-lock-reset</v-icon>
              パスワード変更
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="font-weight-bold text-body-1"
              text
              rounded
              :disabled="invalid"
              data-testid="edit"
              @click="editUser"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-card-text>
    <v-expand-transition>
      <user-edit-password
        v-if="reveal"
        data-testid="userEditPassword"
        @close="reveal = false"
      />
    </v-expand-transition>
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
import UserEditPassword from '~/components/user/UserEditPassword'

extend('required', required)
extend('email', email)

setInteractionMode('eager')

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    UserEditPassword,
  },
  data() {
    return {
      reveal: false,
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
      this.edit(this.user)
    },
  },
}
</script>
