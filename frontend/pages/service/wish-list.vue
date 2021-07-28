<template>
  <v-container>
    <main-title :title="title" />
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
      title: 'Service - WishList -',
      containers: [
        {
          image: require('~/assets/image/wish-list1.png'),
          subtitle: '一覧',
          content:
            '「欲しい」、「行きたい」などと思ったらすぐに登録。あなたの「貯める理由」を明確にします。編集・削除もここで行います。',
        },
        {
          image: require('~/assets/image/wish-list2.gif'),
          subtitle: '紐付け',
          content:
            '口座と紐づけることも可能です。紐づけることで、講座ごとの小さな目標ができ、貯金のモチベーションを高めます。',
        },
      ],
    }
  },
}
</script>
