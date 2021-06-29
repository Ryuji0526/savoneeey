<template>
  <v-app>
    <header-bar />
    <v-main>
      <flash-message />
      <nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import HeaderBar from '~/components/HeaderBar'
import FlashMessage from '~/components/FlashMessage'

export default {
  components: {
    HeaderBar,
    FlashMessage,
  },
}
</script>
