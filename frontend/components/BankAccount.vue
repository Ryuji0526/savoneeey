<template>
  <v-card max-width="300" max-height="250">
    <v-card-text>
      <div>{{ account.name }}</div>
      <p>{{ account.balance | toLocaleString }}</p>
      <p>ユーザーID:{{ account.user_id }}</p>
      <p>アカウントID:{{ account.id }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true">
        詳細を見る
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card v-if="reveal" class="v-card--reveal" style="height: 100%">
        <v-card-text>
          <p>{{ account.target_amount }}</p>
          <p>{{ account.is_main }}</p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="accent-4" @click="reveal = false"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reveal: false,
    }
  },
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
