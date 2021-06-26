<template>
  <v-container class="fixed mt-n5">
    <v-alert
      v-show="message"
      class="mx-auto"
      dense
      border="left"
      colored-border
      elevation="3"
      :type="type"
      transition="slide-x-reverse-transition"
      width="70%"
    >
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      message: 'flash-message/content',
      type: 'flash-message/type',
    }),
  },
}
</script>

<style scoped>
.fixed {
  position: fixed;
  order: 10;
}
</style>
