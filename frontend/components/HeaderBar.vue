<template>
  <v-container>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn v-if="$auth.loggedIn" text class="px-1" @click="logout"
        >ログアウト</v-btn
      >
      <div v-else>
        <v-btn text class="px-1" to="/users/login">ログイン</v-btn>
        <v-btn text class="px-1" to="/users/signup">新規登録</v-btn>
      </div>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'EditUser',
          to: '/users/edit',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'MyBank',
          to: '/my-bank',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      showFlashMessage: 'flash-message/showFlashMessage',
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
