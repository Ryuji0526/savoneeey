<template>
  <v-app>
    <v-app-bar
      fixed
      flat
      app
      class="high"
      color="#f7f7f7"
      height="18px"
    ></v-app-bar>
    <v-main>
      <flash-message />
      <div id="main" class="d-flex">
        <side-nav />
        <nuxt />
      </div>
    </v-main>
    <page-footer />
    <v-footer height="18px" class="high" color="#f7f7f7" app></v-footer>
  </v-app>
</template>

<script>
import FlashMessage from '~/components/FlashMessage'
import SideNav from '~/components/SideNav'
import PageFooter from '~/components/PageFooter'

export default {
  components: {
    FlashMessage,
    SideNav,
    PageFooter,
  },
}
</script>

<style>
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 0.7s;
}
.high {
  z-index: 10 !important;
}
</style>
