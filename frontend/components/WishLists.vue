<template>
  <v-card max-width="1000px" class="mx-auto">
    <v-data-table
      :headers="headers"
      :items="wishLists"
      :search="search"
      :loading="loading"
      :page.sync="page"
      hide-default-footer
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
              <v-btn class="mb-2" v-bind="attrs" v-on="on">
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
                        <validation-provider v-slot="{ errors }" name="URL">
                          <v-text-field
                            v-model="editedItem.url"
                            label="URL"
                            :error-messages="errors"
                            data-testid="url"
                          ></v-text-field>
                        </validation-provider>
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
                        閉じる
                      </v-btn>
                      <v-btn
                        color="light-green darken-1"
                        class="text-body-1"
                        text
                        :disabled="invalid"
                        data-testid="add-wish-list"
                        @click="save"
                      >
                        追加
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
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
          <span :key="i">{{ tag.name }}</span>
        </template>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <div class="Text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
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

extend('required', required)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    wishLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      loading: false,
      page: 1,
      pageCount: 5,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Tags', value: 'wish_tags', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        price: null,
        url: '',
        wish_tags: [],
      },
      defaultItem: {
        id: 0,
        name: '',
        price: null,
        url: '',
        wish_tags: [],
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New WishList' : 'Edit WishList'
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
    }),
    editItem(item) {
      this.editedIndex = this.wishLists.indexOf(item)
      this.editedItem = Object.assign({}, item)
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
    save() {
      this.loading = true
      if (this.editedIndex > -1) {
        this.editWishList(this.editedItem)
      } else {
        this.createWishList(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
