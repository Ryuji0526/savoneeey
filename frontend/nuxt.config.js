import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',

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

  loading: {
    color: '#ffeb58',
    continuous: true,
  },

  loadingIndicator: {
    name: 'cube-grid',
    color: '#ffeb58',
    background: '#e3dbd0',
  },

  css: ['~/assets/css/style.css'],

  devServer: {
    disableHostCheck: true,
  },

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth', 'nuxt-webfontloader'],

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
        family: 'Noto Sans JP',
      },
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#ffeb58',
          secondary: '#ffeb58',
          info: '#ffeb58',
          warning: colors.deepOrange.accent4,
          error: colors.deepOrange.accent4,
          success: '#ffeb58',
          background: '#e3dbd0',
        },
      },
    },
  },

  webfontloader: {
    google: {
      families: ['Noto+Sans+JP', 'Caveat'],
    },
  },

  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
