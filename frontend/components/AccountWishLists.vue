<template>
  <v-card>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="account.wish_lists"
        :loading="loading"
        hide-default-footer
      >
        <template #top>
          <v-dialog v-model="dialogUnregister" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >口座からこのリストを外しますか?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="closeUnregister"
                  >Cancel</v-btn
                >
                <v-btn color="darken-1" text @click="unregisterItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template #[`item.name`]="{ item }">
          <a v-if="item.url !== ''" target="_blank" :href="item.url">
            {{ item.name }}
          </a>
          <span v-else>{{ item.name }}</span>
        </template>
        <template #[`item.wish_tags`]="{ item }">
          <template v-for="(tag, i) in item.wish_tags">
            <v-chip :key="i" outlined small class="mr-1">{{ tag.name }}</v-chip>
          </template>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon small @click="unregisterItem(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      dialogUnregister: false,
      loading: false,
      registering: {
        wish_list_id: null,
        account_id: null,
      },
      defaultRegistering: {
        wish_list_id: null,
        account_id: null,
      },
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Tags', value: 'wish_tags' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    ...mapActions({
      deleteRegistering: 'registering/deleteRegistering',
    }),
    unregisterItem(id) {
      this.registering.wish_list_id = id
      this.dialogUnregister = true
    },
    unregisterItemConfirm() {
      this.registering.account_id = this.account.id
      this.deleteRegistering(this.registering)
      // console.log(this.registering)
      this.closeUnregister()
    },
    closeUnregister() {
      this.dialogUnregister = false
      this.$nextTick(() => {
        this.registering = Object.assign({}, this.defaultRegistering)
      })
    },
  },
}
</script>
