<template>
  <v-navigation-drawer
    permanent
    color="#f7f7f7"
    class="pt-10 d-none d-sm-block"
    width="100px"
    min-width="80px"
    fixed
  >
    <v-list v-if="!$auth.loggedIn" class="pa-0" shaped>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="px-0"
        two-line
        data-testid="sideNav"
      >
        <v-list-item-content class="hover">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title
            class="text-center text-body-1 caption"
            v-text="item.title"
          />
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
        data-testid="sideNav"
      >
        <v-list-item-content>
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title
            class="text-center text-body-1 caption"
            v-text="item.title"
          />
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item data-testid="logoutBtn" @click="logoutUser">
        <v-list-item-content class="px-0" two-line>
          <v-icon>mdi-logout</v-icon>
          <v-list-item-title class="text-center text-body-1 caption">
            Logout
          </v-list-item-title>
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
          icon: 'mdi-home-outline',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-login',
          title: 'LogIn',
          to: '/user/login',
        },
        {
          icon: 'mdi-account-plus-outline',
          title: 'SignUp',
          to: '/user/signup',
        },
      ],
      loggedInItems: [
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
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
    logoutUser() {
      this.logout()
    },
  },
}
</script>

<style scoped>
.v-list-item__title {
  display: block;
}
.v-list-item--active {
  background-color: #ffeb58 !important;
  color: #0009 !important;
}
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
