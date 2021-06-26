<template>
  <v-container>
    <message />
    <edit-user />
  </v-container>
</template>

<script>
import Message from '~/components/Message'
import EditUser from '~/components/EditUser'

export default {
  compontents: {
    Message,
    EditUser,
  },
}
</script>
