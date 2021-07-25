<template>
  <v-alert
    v-show="message"
    border="left"
    color="primary"
    elevation="20"
    dense
    colored-border
    :type="type"
    transition="slide-x-reverse-transition"
    width="50%"
    data-testid="message"
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
  left: 47%;
  top: 6%;
}
</style>
