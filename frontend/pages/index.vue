<template>
  <div class="index-wrapper">
    <index-top data-testid="indexTop" />
    <index-about data-testid="indexAbout" />
    <index-account data-testid="indexAccount" />
    <index-wish data-testid="indexWish" />
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
.index-wrapper {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
