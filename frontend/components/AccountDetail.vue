<template>
  <v-card>
    <v-card-actions class="pb-0 pt-5">
      <v-btn
        text
        rounded
        class="ml-auto turn-black"
        data-testid="switchBtn"
        @click="editItem"
      >
        <v-icon v-if="!editable">mdi-pencil-outline</v-icon>
        <v-icon v-else>mdi-pencil-off-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10 pt-0">
          <v-list-item-subtitle>※Name</v-list-item-subtitle>
          <v-list-item-title
            v-if="!editable"
            class="text-h6 text-center"
            data-testid="name"
            >{{ account.name }}</v-list-item-title
          >
          <v-list-item-title v-else class="text-h6 text-center">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="口座名"
                rules="required|max:50"
              >
                <v-text-field
                  v-model="editedItem.name"
                  :error-messages="errors"
                  clearble
                  data-testid="editName"
                />
              </validation-provider>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10">
          <v-list-item-subtitle>※Target</v-list-item-subtitle>
          <v-list-item-title
            v-if="!editable"
            class="text-h6 text-center"
            data-testid="target"
            >{{ account.target_amount | toLocaleString
            }}<span class="ml-5"
              >({{
                (currentBalance - account.target_amount) | toLocaleString
              }})</span
            ></v-list-item-title
          >
          <v-list-item-title v-else class="text-h6 text-center">
            <v-form ref="form">
              <validation-provider
                v-slot="{ errors }"
                name="目標金額"
                rules="required|minValue:0|integer"
              >
                <v-text-field
                  v-model="editedItem.target_amount"
                  :error-messages="errors"
                  clearble
                  data-testid="editTarget"
                  suffix="円"
                />
              </validation-provider>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10">
          <v-list-item-subtitle>Tags</v-list-item-subtitle>
          <v-list-item-title v-if="!editable" class="text-h6 text-center">
            <v-chip
              v-for="(tag, i) in account.account_tags"
              :key="i"
              outlined
              data-testid="tag"
              small
              class="mr-1"
              >{{ tag.name }}</v-chip
            >
          </v-list-item-title>
          <v-list-item-title v-else class="text-h6 text-center">
            <v-form ref="form">
              <v-select
                v-model="editedItem.account_tag_links_attributes"
                :items="accountTagItems"
                chips
                :deletable-chips="deletable"
                data-testid="editTag"
                label="Tags"
                multiple
              >
              </v-select>
              <v-card-actions class="d-flex justify-end">
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="text-body-1 font-weight-bold"
                  elavation="5"
                  text
                  rounded
                  :disabled="invalid"
                  data-testid="saveBtn"
                  @click="edit"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </validation-observer>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import {
  required,
  max,
  integer,
  min_value as minValue,
} from 'vee-validate/dist/rules.umd'

extend('required', required)
extend('max', max)
extend('integer', integer)
extend('minValue', minValue)

setInteractionMode('eager')

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
    currentBalance: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editable: false,
      deletable: true,
      editedItem: {
        id: null,
        name: '',
        target_amount: null,
        account_tag_links_attributes: [],
      },
      defaultItem: {
        id: null,
        name: '',
        target_amount: null,
        account_tag_links_attributes: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      accountTags: 'tag/accountTags',
    }),
    accountData() {
      return {
        name: this.account.name,
        target_amount: this.account.target_amount,
        id: this.account.id,
        account_tag_links_attributes: this.myTags,
      }
    },
    accountTagItems() {
      const items = []
      for (let i = 0; i < this.accountTags.length; i++) {
        const item = {}
        item.text = this.accountTags[i].name
        item.value = { account_tag_id: this.accountTags[i].id }
        items.push(item)
      }
      return items
    },
    myTags() {
      const tags = []
      for (let i = 0; i < this.account.account_tags.length; i++) {
        tags.push({ account_tag_id: this.account.account_tags[i].id })
      }
      return tags
    },
  },
  mounted() {
    this.getAccountTags()
  },
  methods: {
    ...mapActions({
      editAccount: 'bankAccount/editAccount',
      getAccountTags: 'tag/getAccountTags',
    }),
    edit() {
      this.editAccount(this.editedItem)
      this.editable = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },
    editItem() {
      if (this.editable === false) {
        this.editable = true
        this.editedItem = Object.assign({}, this.accountData)
      } else {
        this.editable = false
      }
    },
  },
}
</script>
