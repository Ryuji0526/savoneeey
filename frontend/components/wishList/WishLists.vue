<template>
  <v-card max-width="1200px" class="mx-auto rounded-lg" elevation="8">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="wishLists"
      :search="search"
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
              <v-btn
                v-bind="attrs"
                class="turn-black"
                absolute
                right
                top
                fab
                data-testid="newBtn"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card class="mx-auto rounded-lg" elevation="8" data-testid="form">
              <v-card-title>
                <div class="text-h4 caption" data-testid="formTitle">
                  <span class="text-h3 caption">{{
                    formTitle.substr(0, 1)
                  }}</span
                  ><span>{{ formTitle.substr(1) }}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <v-form ref="form">
                    <validation-provider
                      v-slot="{ errors }"
                      name="金額"
                      rules="required"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="※Name"
                        :error-messages="errors"
                        data-testid="name"
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="金額"
                      rules="required|integer|minValue:0"
                    >
                      <v-text-field
                        v-model="editedItem.price"
                        label="※Price"
                        :error-messages="errors"
                        data-testid="price"
                        suffix="円"
                      ></v-text-field>
                    </validation-provider>
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
                    <v-select
                      v-model="editedItem.wish_tag_links_attributes"
                      :items="wishTagItems"
                      chips
                      :deletable-chips="deletable"
                      label="Tags"
                      multiple
                      data-testid="tag"
                    ></v-select>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text rounded data-testid="closeBtn" @click="close">
                        Close
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="font-weight-bold text-body-1"
                        text
                        rounded
                        :disabled="invalid"
                        data-testid="saveBtn"
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
            <delete-alert
              :message="message"
              data-testid="deleteAlert"
              @close="closeDelete"
              @delete="deleteItemConfirm"
            />
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.name`]="{ item }">
        <a v-if="item.url !== ''" target="_blank" :href="item.url">
          {{ item.name }}
        </a>
        <span v-else>{{ item.name }}</span>
      </template>
      <template #[`item.price`]="{ item }">
        <span>{{ item.price | toLocaleString }}</span>
      </template>
      <template #[`item.wish_tags`]="{ item }">
        <template v-for="(tag, i) in item.wish_tags">
          <v-chip :key="i" outlined small class="mr-1">{{ tag.name }}</v-chip>
        </template>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small data-testid="editBtn" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        |
        <v-icon small data-testid="deleteBtn" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-container>
      <v-card-actions v-if="selected.length > 0">
        <v-btn
          rounded
          absolute
          left
          bottom
          class="turn-black"
          color="#ffeb58"
          data-testid="addToAccountBtn"
          @click="dialogRegister = true"
          >Add to account</v-btn
        >
      </v-card-actions>
      <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
    </v-container>
    <v-dialog v-model="dialogRegister" max-width="400px">
      <account-select
        data-testid="accountSelect"
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
import AccountSelect from '~/components/wishList/AccountSelect'
import DeleteAlert from '~/components/layout/DeleteAlert.vue'

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    AccountSelect,
    DeleteAlert,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      deletable: true,
      message: 'このリスト',
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
    dialogRegister(val) {
      val || this.closeDialogRegister()
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

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
