import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import UserSignup from '~/components/user/UserSignup'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)

describe('components/user/UserSignup.vue', () => {
  let vuetify
  let wrapper
  let spyRegisterUser
  let observer
  let nameField
  let emailField
  let passwordField
  let passwordConfirmationField
  let signUp
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyRegisterUser = jest.spyOn(UserSignup.methods, 'registerUser')
    wrapper = mount(UserSignup, {
      localVue,
      vuetify,
    })
    observer = wrapper.vm.$refs.observer
    nameField = wrapper.find('[data-testid="name"]')
    emailField = wrapper.find('[data-testid="email"]')
    passwordField = wrapper.find('[data-testid="password"]')
    passwordConfirmationField = wrapper.find(
      '[data-testid="password_confirmation"]'
    )
    signUp = wrapper.find('[data-testid="sign-up"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(nameField.exists()).toBeTruthy()
      expect(emailField.exists()).toBeTruthy()
      expect(passwordField.exists()).toBeTruthy()
      expect(passwordConfirmationField.exists()).toBeTruthy()
      expect(signUp.exists()).toBeTruthy()
    })
    test('ボタンをクリックするとregisterUserメソッドが発火される', () => {
      signUp.trigger('click')
      expect(spyRegisterUser).toBeCalled()
    })
  })
  describe('バリデーション', () => {
    describe('正しくない入力', () => {
      test('未入力の時', async () => {
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
      })
    })
    describe('正しい入力', () => {
      test('エラーが表示されない', async () => {
        nameField.setValue('test')
        emailField.setValue('example@example.com')
        passwordField.setValue('password')
        passwordConfirmationField.setValue('password')
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
      })
    })
  })
})
