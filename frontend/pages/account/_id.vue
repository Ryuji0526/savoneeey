<template>
  <v-container>
    <v-btn text to="/my-accounts">
      <v-icon dark size="25" class="mx-1">mdi-arrow-left</v-icon>
      BACK
    </v-btn>
    <p class="text-h1 font-weight-light text-center">
      {{ count | toLocaleString }}
    </p>
    <v-breadcrumbs :items="items" divider="/" class="pl-4"></v-breadcrumbs>
    <v-subheader class="text-h4 my-5">Detail</v-subheader>
    <v-card>
      <v-list-item class="py-5">
        <v-list-item-content class="ml-10">
          <v-list-item-subtitle>Name</v-list-item-subtitle>
          <v-list-item-title class="text-h6 text-center">{{
            account.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="pb-5">
        <v-list-item-content class="ml-10">
          <v-list-item-subtitle>TargetAmount</v-list-item-subtitle>
          <v-list-item-title class="text-h6 text-center"
            >{{ account.target_amount | toLocaleString
            }}<span class="ml-5"
              >({{
                (currentBalance - account.target_amount) | toLocaleString
              }})</span
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-subheader id="history" class="text-h4 my-5">History</v-subheader>
    <v-card>
      <v-tabs color="gray" left>
        <v-tab v-for="(tab, i) in tabs" :key="i" @click="tabName = tab">{{
          tab
        }}</v-tab>
        <v-tab-item v-for="(tab, i) in tabs" :key="i">
          <chart :chart-data="chartData" :height="150" />
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-subheader id="wish-lists" class="text-h4 my-5">WishLists</v-subheader>
    <v-card></v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import anime from 'animejs/lib/anime.es.js'
import Chart from '~/components/Chart'

export default {
  components: {
    Chart,
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    },
  },
  data() {
    return {
      items: [
        {
          text: 'Detail',
          disabled: true,
          href: '#detail',
        },
        {
          text: 'History',
          disabled: false,
          href: '#history',
        },
        {
          text: 'WishLists',
          disabled: false,
          href: '#wish-lists',
        },
      ],
      tabs: ['Recent', 'Day', 'Week', 'Month'],
      tabName: 'Recent',
      count: 0,
    }
  },
  computed: {
    ...mapGetters({
      account: 'bank-account/account',
    }),
    currentBalance() {
      return this.account.recent_histories[0].balance
    },
    chartData() {
      const date = []
      const balance = []
      let len = 0
      switch (this.tabName) {
        case 'Recent':
          len = this.account.recent_histories.length
          for (let i = 0; i < len; i++) {
            date.unshift(
              moment(this.account.recent_histories[i].created_at).format(
                `D日 HH:mm`
              )
            )
            balance.unshift(this.account.recent_histories[i].balance)
          }
          break
        case 'Day':
          len = this.account.dayly_histories.length
          for (let i = 0; i < len; i++) {
            date.push(
              moment(this.account.dayly_histories[i].created_at).format(
                `M月D日`
              )
            )
            balance.push(this.account.dayly_histories[i].balance)
          }
          break
        case 'Week':
          len = this.account.weekly_histories.length
          for (let i = 0; i < len; i++) {
            date.push(
              moment(this.account.weekly_histories[i].created_at).format(
                `M月D日`
              )
            )
            balance.push(this.account.weekly_histories[i].balance)
          }
          break
        case 'Month':
          len = this.account.monthly_histories.length
          for (let i = 0; i < len; i++) {
            date.push(
              moment(this.account.monthly_histories[i].created_at).format(`M月`)
            )
            balance.push(this.account.monthly_histories[i].balance)
          }
          break
      }
      return {
        labels: date,
        datasets: [
          {
            label: '残高',
            data: balance,
            borderColor: '#ccc',
            fill: false,
            type: 'line',
            lineTension: 0.3,
          },
        ],
      }
    },
  },
  watch: {
    account(newValue) {
      this.setCount(newValue.recent_histories[0].balance)
    },
  },
  methods: {
    ...mapActions({
      getAccount: 'bank-account/getAccount',
    }),
    setCount(val) {
      const obj = { n: this.count }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 800,
        easing: 'linear',
        update: () => {
          this.count = obj.n
        },
      })
    },
  },
  created() {
    this.getAccount(this.$route.params.id)
    this.setCount(this.currentBalance)
  },
}
</script>

<style scoped>
* {
  color: rgba(0, 0, 0, 0.6);
}
.v-tabs {
  width: 90%;
  margin: 0 auto;
}
</style>
