<template>
  <v-navigation-drawer permanent color="#f7f7f7" width="100px" min-width="80px">
    <v-list v-if="!$auth.loggedIn" class="pa-0" shaped>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="px-0"
        two-line
      >
        <v-list-item-content class="hover">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="text-center" v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-else class="pa-0" shaped>
      <v-list-item
        v-for="(item, i) in loggedInItems"
        :key="i"
        :to="item.to"
        class="px-0"
        two-line
      >
        <v-list-item-content>
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title class="text-center" v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="logout">
        <v-list-item-content class="px-0" two-line>
          <v-icon>mdi-logout</v-icon>
          <v-list-item-title class="text-center"> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-login',
          title: 'LogIn',
          to: '/users/login',
        },
        {
          icon: 'mdi-account-plus-outline',
          title: 'SignUp',
          to: '/users/signup',
        },
      ],
      loggedInItems: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-account-circle-outline',
          title: 'Profile',
          to: '/users/edit',
        },
        {
          icon: 'mdi-bank-outline',
          title: 'Accounts',
          to: '/my-accounts',
        },
        {
          icon: 'mdi-clipboard-list-outline',
          title: 'WishLists',
          to: '/wish-lists',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      showFlashMessage: 'flashMessage/showFlashMessage',
    }),
    logout() {
      this.$auth.logout().then(() => {
        this.showFlashMessage({
          content: 'ログアウトしました。',
          type: 'success',
        })
      })
    },
  },
}
</script>

<style scoped>
.v-list-item__title {
  font-size: small;
  display: block;
}
</style>
