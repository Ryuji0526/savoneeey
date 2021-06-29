import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as store from '~/store'
import SignupUser from '~/components/SignupUser'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)

describe('components/SignupUser.vue', () => {
  let vuetify
  let wrapper
  let observer
  let nameField
  let emailField
  let passwordField
  let passwordConfirmationField
  let signUp
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wrapper = mount(SignupUser, {
      store,
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
  })
  describe('バリデーション確認', () => {
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
