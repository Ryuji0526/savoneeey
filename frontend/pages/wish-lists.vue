<template>
  <v-container>
    <main-title :title="title" />
    <wish-lists
      :wish-lists="wishLists"
      :wish-tags="wishTags"
      data-testid="wishLists"
    />
    <div class="d-flex mt-10">
      <v-spacer></v-spacer>
      <v-btn text small to="/service/wish-list">
        <v-icon left>mdi-help-circle-outline</v-icon>
        How to Use
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WishLists from '~/components/wishList/WishLists'
import MainTitle from '~/components/layout/MainTitle'

export default {
  components: {
    WishLists,
    MainTitle,
  },
  data() {
    return {
      title: 'Wish Lists',
    }
  },
  computed: {
    ...mapGetters({
      wishLists: 'wishList/wishLists',
      wishTags: 'tag/wishTags',
    }),
  },
  mounted() {
    this.getWishLists()
    this.getWishTags()
  },
  methods: {
    ...mapActions({
      getWishLists: 'wishList/getWishLists',
      getWishTags: 'tag/getWishTags',
    }),
  },
}
</script>
