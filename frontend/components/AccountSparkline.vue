<template>
  <v-sheet
    class="v-sheet--offset mx-auto"
    elevation="5"
    min-height="115"
    rounded
  >
    <v-sparkline
      :labels="date"
      :value="balance"
      color="black"
      padding="16"
      line-width="0.7"
      smooth="1"
      auto-draw
    ></v-sparkline>
  </v-sheet>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    account: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      len:
        this.account.recent_histories.length < 5
          ? this.account.recent_histories.length
          : 5,
    }
  },
  computed: {
    date() {
      const date = ['現在']
      for (let i = 0; i < this.len - 1; i++) {
        date.unshift(
          moment(this.account.recent_histories[i].created_at).format(
            `D日 HH:mm`
          )
        )
      }
      return date
    },
    balance() {
      const balance = []
      for (let i = 0; i < this.len; i++) {
        balance.unshift(this.account.recent_histories[i].balance)
      }
      return balance
    },
  },
}
</script>

<style lang="scss" scoped>
.v-sheet--offset {
  top: -54px;
  position: relative;
}
</style>
