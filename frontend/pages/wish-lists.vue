<template>
  <v-container>
    <wish-lists :wish-lists="wishLists" />
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
    }),
  },
  methods: {
    ...mapActions({
      getWishLists: 'wishList/getWishLists',
    }),
  },
  mounted() {
    this.getWishLists()
  },
}
</script>
