<template>
  <v-card width="400px" class="mx-auto mt-15 py-7 rounded-xl" elevation="5">
    <v-card-text class="px-12 pb-0">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form ref="form">
          <validation-provider v-slot="{ errors }" name="名前" rules="required">
            <v-text-field
              v-model="user.name"
              prepend-icon="mdi-account"
              label="Name"
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
              label="e-mail"
              :error-messages="errors"
              clearable
              data-testid="email"
            />
          </validation-provider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="font-weight-bold"
              text
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
      this.edit(this.user)
    },
  },
}
</script>
