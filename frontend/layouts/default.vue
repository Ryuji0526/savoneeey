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
import FlashMessage from '~/components/layout/FlashMessage'
import SideNav from '~/components/layout/SideNav'
import PageFooter from '~/components/layout/PageFooter'
import AppHeader from '~/components/layout/AppHeader'
import AppFooter from '~/components/layout/AppFooter'

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
</style>
