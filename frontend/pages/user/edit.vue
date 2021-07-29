<template>
  <v-container>
    <main-title :title="title" />
    <user-edit data-testid="userEdit" />
  </v-container>
</template>

<script>
import UserEdit from '~/components/user/UserEdit'
import MainTitle from '~/components/layout/MainTitle'

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
