<template>
  <v-container>
    <v-alert
      v-show="message"
      border="left"
      colored-border
      elevation="3"
      :type="type"
      transition="slide-x-reverse-transition"
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
      message: 'message/content',
      type: 'message/type',
    }),
  },
}
</script>
