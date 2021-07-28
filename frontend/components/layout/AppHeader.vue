<template>
  <div>
    <v-app-bar
      fixed
      flat
      app
      class="high d-none d-sm-block"
      color="#f7f7f7"
      height="18px"
    ></v-app-bar>
    <v-app-bar
      fixed
      flat
      app
      class="d-block d-sm-none"
      color="#0009"
      height="50px"
      dark
    >
      <v-btn to="/" plain data-testid="headerTitle">
        <v-toolbar-title class="text-h5">SAVONEEEY</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn
            class="turn-black"
            icon
            v-bind="attrs"
            data-testid="menuBtn"
            v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list v-if="!$auth.loggedIn">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            data-testid="headerNav"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item data-testid="headerNav" @click="logoutUser">
            <v-list-item-content>
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          title: 'LogIn',
          to: '/user/login',
        },
        {
          title: 'SignUp',
          to: '/user/signup',
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
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
