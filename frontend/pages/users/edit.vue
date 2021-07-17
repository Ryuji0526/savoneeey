<template>
  <v-container>
    <main-title :title="title" />
    <edit-user />
  </v-container>
</template>

<script>
import EditUser from '~/components/EditUser'
import MainTitle from '~/components/MainTitle'

export default {
  components: {
    EditUser,
    MainTitle,
  },
  data() {
    return {
      title: 'Profile',
    }
  },
}
</script>
