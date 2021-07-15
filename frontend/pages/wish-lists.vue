<template>
  <v-container>
    <wish-lists :wish-lists="wishLists" :wish-tags="wishTags" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WishLists from '~/components/WishLists'

export default {
  components: {
    WishLists,
  },
  computed: {
    ...mapGetters({
      wishLists: 'wishList/wishLists',
      wishTags: 'wishList/wishTags',
    }),
  },
  mounted() {
    this.getWishLists()
    this.getWishTags()
  },
  methods: {
    ...mapActions({
      getWishLists: 'wishList/getWishLists',
      getWishTags: 'wishList/getWishTags',
    }),
  },
}
</script>
