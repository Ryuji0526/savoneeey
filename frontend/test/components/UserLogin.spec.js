import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import UserLogin from '~/components/user/UserLogin'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)

describe('components/UserLogin.vue', () => {
  let vuetify
  let wrapper
  let spyLoginUser
  let observer
  let emailField
  let passwordField
  let login
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyLoginUser = jest.spyOn(UserLogin.methods, 'loginUser')
    wrapper = mount(UserLogin, {
      localVue,
      vuetify,
    })
    observer = wrapper.vm.$refs.observer
    emailField = wrapper.find('[data-testid="email"]')
    passwordField = wrapper.find('[data-testid="password"]')
    login = wrapper.find('[data-testid="login"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(emailField.exists()).toBeTruthy()
      expect(passwordField.exists()).toBeTruthy()
      expect(login.exists()).toBeTruthy()
    })
    test('ボタンをクリックするとspyLoginUserメソッドが発火される', () => {
      login.trigger('click')
      expect(spyLoginUser).toBeCalled()
    })
  })
  describe('バリデーション', () => {
    describe('正しくない入力', () => {
      test('エラーが表示される', async () => {
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
      })
    })
    describe('正しい入力', () => {
      test('エラーが表示されない', async () => {
        emailField.setValue('example@example.com')
        passwordField.setValue('password')
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
      })
    })
  })
})
