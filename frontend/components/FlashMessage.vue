<template>
  <v-alert
    v-show="message"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      message: 'flashMessage/content',
      type: 'flashMessage/type',
    }),
  },
}
</script>

<style scoped>
.v-alert {
  position: fixed;
  z-index: 300;
  left: 50%;
  margin-left: calc(70% / -2);
}
</style>
