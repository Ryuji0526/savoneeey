import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: 'savoneeey',
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

  plugins: [
    { src: '~/plugins/axios.js', ssr: false },
    '~/plugins/vee-validate.js',
  ],

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://backend.savoneeey.com'
        : 'http://localhost:5000',
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
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'fot-tsukuardgothic-std, sans-serif',
      },
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#b5f814',
          accent: '#b5f814',
          secondary: '#b5f814',
          info: '#b5f814',
          warning: '#b5f814',
          error: colors.deepOrange.accent4,
          success: '#b5f814',
          background: '#e3dbd0',
        },
      },
    },
  },

  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
