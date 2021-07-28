<template>
  <v-card class="pa-0">
    <v-footer
      height="18px"
      class="high d-none d-sm-block"
      color="#f7f7f7"
      app
    ></v-footer>
    <v-footer
      height="50px"
      class="d-block d-sm-none pa-0"
      data-testid="footerNav"
      app
    >
      <v-bottom-navigation
        background-color="#0009"
        height="100%"
        shift
        dark
        color="primary"
      >
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="turn-black"
          :to="item.to"
        >
          <span class="caption text-body-1">{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-account-circle-outline',
          title: 'Profile',
          to: '/user/edit',
        },
        {
          icon: 'mdi-bank-outline',
          title: 'Accounts',
          to: '/accounts',
        },
        {
          icon: 'mdi-clipboard-list-outline',
          title: 'WishLists',
          to: '/wish-lists',
        },
      ],
    }
  },
}
</script>

<style scoped>
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
