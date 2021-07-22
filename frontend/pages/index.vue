<template>
  <div class="p">
    <index-top />
    <index-about />
    <index-account />
    <index-wish />
  </div>
</template>

<script>
import IndexTop from '~/components/index/IndexTop'
import IndexAbout from '~/components/index/IndexAbout'
import IndexAccount from '~/components/index/IndexAccount'
import IndexWish from '~/components/index/IndexWish'

export default {
  auth: false,
  components: {
    IndexTop,
    IndexAbout,
    IndexAccount,
    IndexWish,
  },
}
</script>

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
