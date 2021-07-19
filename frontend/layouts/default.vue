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
    <v-footer height="18px" class="high" color="#f7f7f7" app></v-footer>
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
  color: rgba(0, 0, 0, 0.6);
}
#main {
  height: 100%;
  margin-left: 100px;
}
.high {
  z-index: 10 !important;
}
.turn-black:hover {
  background-color: rgba(0, 0, 0, 0.6) !important;
  color: #ffeb58;
  transition: 0.3s;
}
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: opacity 0.7s;
}
</style>
