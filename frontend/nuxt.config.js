import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - app',
    title: 'app',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  devServer: {
    disableHostCheck: true,
  },

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  plugins: [{ src: '~/plugins/axios.js', ssr: false }],

  axios: {
    baseURL: process.env.NODE_ENV === "production" ? process.env.BASE_URL : 'http://localhost:5000',
  },

  auth: {
    redirect: {
      login: '/users/login',
      logout: '/',
      callback: false,
      home: '/users/account',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/auth/sign_in',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: {
            url: '/api/v1/auth/sessions',
            method: 'get',
            propertyName: false,
          },
        },
      },
    },
  },

  router: {
    middleware: ['auth'],
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
}
