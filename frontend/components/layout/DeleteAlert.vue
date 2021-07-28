<template>
  <v-card class="mx-auto py-7 rounded-lg" elevation="8">
    <v-card-title class="text-h6" data-testid="message"
      >{{ message }}を削除してもよろしいですか?</v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text rounded data-testid="cancelBtn" @click="$emit('close')"
        >Cancel</v-btn
      >
      <v-btn
        color="primary"
        class="font-weight-bold text-body-1"
        text
        rounded
        data-testid="okBtn"
        @click="$emit('delete')"
        >OK</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
