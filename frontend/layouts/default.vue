<template>
  <v-app>
    <app-header />
    <v-main class="pt-0">
      <flash-message />
      <div id="main" class="d-flex">
        <side-nav />
        <nuxt />
      </div>
    </v-main>
    <page-footer />
    <app-footer />
  </v-app>
</template>

<script>
import FlashMessage from '~/components/FlashMessage'
import SideNav from '~/components/SideNav'
import PageFooter from '~/components/PageFooter'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    FlashMessage,
    SideNav,
    PageFooter,
    AppHeader,
    AppFooter,
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
