<template>
  <v-card max-width="1000px" class="mx-auto">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="wishLists"
      :search="search"
      :loading="loading"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      show-select
      @page-count="pageCount = $event"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title max-width="500px">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" absolute right top fab v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">{{
                formTitle
              }}</v-card-title>
              <v-card-text class="px-12">
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <validation-provider
                          v-slot="{ errors }"
                          name="金額"
                          rules="required"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                            :error-messages="errors"
                            data-testid="name"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <validation-provider
                          v-slot="{ errors }"
                          name="金額"
                          rules="required|integer|minValue:0"
                        >
                          <v-text-field
                            v-model="editedItem.price"
                            label="Price"
                            :error-messages="errors"
                            data-testid="price"
                            suffix="円"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <validation-provider
                          v-slot="{ errors }"
                          name="URL"
                          rules="url"
                        >
                          <v-text-field
                            v-model="editedItem.url"
                            label="URL"
                            :error-messages="errors"
                            data-testid="url"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" class="py-0">
                        <v-select
                          v-model="editedItem.wish_tag_links_attributes"
                          :items="wishTagItems"
                          chips
                          :deletable-chips="deletable"
                          label="Tags"
                          multiple
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="darken-1"
                        class="text-body-1"
                        text
                        @click="close"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="light-green darken-1"
                        class="text-body-1"
                        text
                        :disabled="invalid"
                        data-testid="add-wish-list"
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >リストを削除してもよろしいですか?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
        <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
        |
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-container>
      <v-card-actions v-if="selected.length > 0">
        <v-btn text absolute left bottom @click="dialogRegister = true"
          >口座に追加</v-btn
        >
      </v-card-actions>
      <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
    </v-container>
    <v-dialog v-model="dialogRegister" max-width="500px">
      <account-select
        @closeDialogRegister="closeDialogRegister"
        @register="register"
      />
    </v-dialog>
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
import {
  required,
  integer,
  min_value as minValue,
} from 'vee-validate/dist/rules.umd'
import AccountSelect from '~/components/AccountSelect'

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    AccountSelect,
  },
  props: {
    wishLists: {
      type: Array,
      required: true,
    },
    wishTags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogRegister: false,
      loading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      deletable: true,
      reg: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Tags', value: 'wish_tags', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: null,
        name: '',
        price: null,
        url: '',
        wish_tag_links_attributes: [],
      },
      defaultItem: {
        id: null,
        name: '',
        price: null,
        url: '',
        wish_tag_links_attributes: [],
      },
      registering: {
        account_id: null,
        wish_list_ids: [],
      },
      defaultRegistering: {
        account_id: null,
        wish_list_ids: [],
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New WishList' : 'Edit WishList'
    },
    wishTagItems() {
      const items = []
      for (let i = 0; i < this.wishTags.length; i++) {
        const item = {}
        item.text = this.wishTags[i].name
        item.value = { wish_tag_id: this.wishTags[i].id }
        items.push(item)
      }
      return items
    },
    wishListIds() {
      const ids = []
      for (let i = 0; i < this.selected.length; i++) {
        ids.push(this.selected[i].id)
      }
      return ids
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    ...mapActions({
      createWishList: 'wishList/createWishList',
      editWishList: 'wishList/editWishList',
      deleteWishList: 'wishList/deleteWishList',
      createRegistering: 'registering/createRegistering',
    }),
    itemData(item) {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        url: item.url,
        wish_tag_links_attributes: this.myTags(item),
      }
    },
    myTags(item) {
      const tags = []
      for (let i = 0; i < item.wish_tags.length; i++) {
        tags.push({ wish_tag_id: item.wish_tags[i].id })
      }
      return tags
    },
    editItem(item) {
      this.editedIndex = this.wishLists.indexOf(item)
      this.editedItem = Object.assign({}, this.itemData(item))
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.wishLists.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteWishList(this.editedItem.id)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.loading = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDialogRegister() {
      this.dialogRegister = false
      this.$nextTick(() => {
        this.selected = []
        this.registering = Object.assign({}, this.defaultRegistering)
      })
    },
    save() {
      this.loading = true
      if (this.editedIndex > -1) {
        this.editWishList(this.editedItem)
      } else {
        this.createWishList(this.editedItem)
      }
      this.close()
    },
    register(accountId) {
      this.registering.account_id = accountId
      this.registering.wish_list_ids = this.wishListIds
      this.createRegistering(this.registering)
      this.closeDialogRegister()
    },
  },
}
</script>
