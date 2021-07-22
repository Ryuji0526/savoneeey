<template>
  <v-container>
    <main-title :title="title" />
    <user-edit />
  </v-container>
</template>

<script>
import UserEdit from '~/components/user/UserEdit'
import MainTitle from '~/components/MainTitle'

export default {
  components: {
    UserEdit,
    MainTitle,
  },
  data() {
    return {
      title: 'Profile',
    }
  },
}
</script>
