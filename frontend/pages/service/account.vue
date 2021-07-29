<template>
  <v-container>
    <main-title :title="title" />
    <div>
      <v-btn text class="turn-black" @click="$router.back()">
        <v-icon left>mdi-arrow-left</v-icon>
        BACK
      </v-btn>
    </div>
    <div class="p">
      <service-container
        v-for="(container, i) in containers"
        :key="i"
        :container="{
          ...container,
          containersLength: containers.length,
          containerNum: i,
        }"
        data-testid="serviceContainer"
      />
    </div>
  </v-container>
</template>

<script>
import MainTitle from '~/components/layout/MainTitle'
import ServiceContainer from '~/components/ServiceContainer'

export default {
  auth: false,
  components: {
    MainTitle,
    ServiceContainer,
  },
  data() {
    return {
      title: 'Service - Account -',
      containers: [
        {
          image: require('~/assets/image/account1.gif'),
          subtitle: '一覧',
          content:
            '一覧ページでは、全ての口座の残高が確認できます。また、右下のボタンを押すことで、最近の取引を確認することができます。口座の開設・口座間のやり取りもこちらから行います。',
        },
        {
          image: require('~/assets/image/account5.gif'),
          subtitle: '詳細',
          content:
            '各口座のプロフィールの編集、グラフ化されている履歴を確認することで、今までの積み上げの実感。そして、紐付けされている「WishList」を確認することができます。',
        },
        {
          image: require('~/assets/image/account2.gif'),
          subtitle: '出金/入金',
          content:
            'メイン口座では、口座への出金・入金ができます。出費をした時、収入を得たときに利用しましょう。',
        },
        {
          image: require('~/assets/image/account3.gif'),
          subtitle: '開設',
          content:
            '少しの操作で簡単に口座を開設することができます。旅行のための貯蓄口座、食費用の口座など、ご自身の使い方にあった口座を作成できます。',
        },
        {
          image: require('~/assets/image/account4.gif'),
          subtitle: '取引',
          content:
            '目的に応じて口座を開設した後は、口座にお金を袋分けしましょう。入金先口座と出金先口座を選択することで簡単にお金を移動することができます。',
        },
      ],
    }
  },
}
</script>
