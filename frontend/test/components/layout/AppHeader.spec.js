import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import AppHeader from '~/components/layout/AppHeader'

Vue.use(Vuetify)
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.append(app)

describe('components/layout/AppHeader.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
  })
  describe('ログインしている時', () => {
    let spyLogoutUser
    const authMock = {
      user: {
        name: 'test',
        email: 'test@test.com',
      },
      loggedIn: true,
    }
    beforeEach(() => {
      spyLogoutUser = jest.spyOn(AppHeader.methods, 'logoutUser')
      wrapper = mount(AppHeader, {
        localVue,
        vuetify,
        router,
        mocks: {
          $auth: authMock,
        },
      })
    })
    describe('headerNav', () => {
      let headerTitle
      let headerNav
      test('タイトルが表示されている', () => {
        headerTitle = wrapper.find('[data-testid="headerTitle"]')
        expect(headerTitle.text()).toBe('SAVONEEEY')
        expect(headerTitle.props().to).toBe('/')
      })
      test('ログアウトボタンが表示されている', async () => {
        wrapper.find('[data-testid="menuBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        headerNav = wrapper.find('[data-testid="headerNav"]')
        expect(headerNav.text()).toBe('Logout')
        headerNav.trigger('click')
        expect(spyLogoutUser).toBeCalled()
      })
    })
  })
  describe('ログインしていない時', () => {
    const authMock = {
      user: {
        name: '',
        email: '',
      },
      loggedIn: false,
    }
    beforeEach(() => {
      wrapper = mount(AppHeader, {
        localVue,
        vuetify,
        router,
        mocks: {
          $auth: authMock,
        },
      })
    })
    describe('headerNav', () => {
      let headerTitle
      let headerNav
      test('タイトルが表示されている', () => {
        headerTitle = wrapper.find('[data-testid="headerTitle"]')
        expect(headerTitle.text()).toBe('SAVONEEEY')
        expect(headerTitle.props().to).toBe('/')
      })
      test('ログイン、サインアップボタンが表示されている', async () => {
        wrapper.find('[data-testid="menuBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        headerNav = wrapper.findAll('[data-testid="headerNav"]')
        expect(headerNav.at(0).text()).toBe('LogIn')
        expect(headerNav.at(0).props().to).toBe('/user/login')
        expect(headerNav.at(1).text()).toBe('SignUp')
        expect(headerNav.at(1).props().to).toBe('/user/signup')
      })
    })
  })
})
