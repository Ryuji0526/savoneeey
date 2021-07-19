<template>
  <v-card>
    <v-container>
      <v-tabs left>
        <v-tab v-for="(tab, i) in tabs" :key="i" @click="tabName = tab">{{
          tab
        }}</v-tab>
        <v-tab-item v-for="(tab, i) in tabs" :key="i">
          <chart :chart-data="chartData" :height="150" />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment'
import Chart from '~/components/Chart'

export default {
  components: {
    Chart,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tabs: ['Recent', 'Day', 'Week', 'Month'],
      tabName: 'Recent',
    }
  },
  computed: {
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
}
</script>
