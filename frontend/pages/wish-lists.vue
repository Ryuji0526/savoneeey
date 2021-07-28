<template>
  <v-container>
    <main-title :title="title" />
    <wish-lists
      :wish-lists="wishLists"
      :wish-tags="wishTags"
      data-testid="wishLists"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WishLists from '~/components/WishLists'
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
