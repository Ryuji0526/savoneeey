<template>
  <v-card>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="account.wish_lists"
        :loading="loading"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template #top>
          <v-dialog v-model="dialogUnregister" max-width="500px">
            <delete-alert
              :message="message"
              data-testid="deleteAlert"
              @close="closeUnregister"
              @delete="unregisterItemConfirm"
            />
          </v-dialog>
        </template>
        <template #[`item.name`]="{ item }">
          <a v-if="!item.url" target="_blank" :href="item.url">
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
          <v-icon
            midium
            data-testid="deleteBtn"
            @click="unregisterItem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import DeleteAlert from '~/components/DeleteAlert.vue'

export default {
  components: {
    DeleteAlert,
  },
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      message: '口座からこのリスト',
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
