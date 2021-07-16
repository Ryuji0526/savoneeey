<template>
  <v-app>
    <v-app-bar fixed flat app color="#f7f7f7" height="18px"></v-app-bar>
    <v-main>
      <flash-message />
      <div id="main" class="d-flex mx-0">
        <side-nav />
        <nuxt />
      </div>
    </v-main>
    <v-footer height="18px" color="#f7f7f7" app></v-footer>
  </v-app>
</template>

<script>
import FlashMessage from '~/components/FlashMessage'
import SideNav from '~/components/SideNav'

export default {
  components: {
    FlashMessage,
    SideNav,
  },
}
</script>

<style>
#app {
  background: #e3dbd0;
}
#main {
  height: 100%;
}
</style>
