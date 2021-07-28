import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import edit from '~/pages/user/edit'
import login from '~/pages/user/login'
import signup from '~/pages/user/signup'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('pages/user', () => {
  let vuetify
  let wrapper
  let stubs
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
  })
  describe('edit', () => {
    beforeEach(() => {
      stubs = {
        UserEdit: true,
      }
      wrapper = mount(edit, {
        localVue,
        vuetify,
        stubs,
      })
    })
    describe('表示確認', () => {
      test('タイトル名が正しい', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toBe('Profile')
      })
      test('UserEditコンポーネントが存在する', () => {
        expect(wrapper.find('[data-testid="userEdit"]').exists()).toBeTruthy()
      })
    })
  })
  describe('login', () => {
    beforeEach(() => {
      stubs = {
        UserLogin: true,
      }
      wrapper = mount(login, {
        localVue,
        vuetify,
        stubs,
      })
    })
    describe('表示確認', () => {
      test('タイトル名が正しい', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toBe('LogIn')
      })
      test('UserLoginコンポーネントが存在する', () => {
        expect(wrapper.find('[data-testid="userLogin"]').exists()).toBeTruthy()
      })
    })
  })
  describe('signup', () => {
    beforeEach(() => {
      stubs = {
        UserSignup: true,
      }
      wrapper = mount(signup, {
        localVue,
        vuetify,
        stubs,
      })
    })
    describe('表示確認', () => {
      test('タイトル名が正しい', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toBe('SignUp')
      })
      test('userSignupコンポーネントが存在する', () => {
        expect(wrapper.find('[data-testid="userSignup"]').exists()).toBeTruthy()
      })
    })
  })
})
