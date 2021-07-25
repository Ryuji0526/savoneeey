import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import UserEditPassword from '~/components/user/UserEditPassword'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)

describe('components/UserEditPassword.vue', () => {
  let vuetify
  let wrapper
  let spyEditUserPassword
  let spyClose
  let observer
  let password
  let passwordConfirmation
  let switchBtn
  let editBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyEditUserPassword = jest.spyOn(
      UserEditPassword.methods,
      'editUserPassword'
    )
    spyClose = jest.spyOn(UserEditPassword.methods, 'close')
    wrapper = mount(UserEditPassword, {
      localVue,
      vuetify,
    })
    observer = wrapper.vm.$refs.observer
    password = wrapper.find('[data-testid="password"]')
    passwordConfirmation = wrapper.find('[data-testid="password_confirmation"]')
    switchBtn = wrapper.find('[data-testid="switchBtn"]')
    editBtn = wrapper.find('[data-testid="editBtn"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(password.exists()).toBeTruthy()
      expect(passwordConfirmation.exists()).toBeTruthy()
      expect(editBtn.exists()).toBeTruthy()
    })
  })
  describe('動作確認', () => {
    test('switchBtnを押すとcloseメソッドが発火する', () => {
      switchBtn.trigger('click')
      expect(spyClose).toBeCalled()
    })
  })
  describe('バリデーション', () => {
    describe('正しくない入力', () => {
      beforeEach(async () => {
        password.setValue('')
        passwordConfirmation.setValue('')
        await observer.validate()
      })
      test('エラーが表示される', () => {
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
      })
      test('editBtnを押してもeditUserPasswordメソッドが発火しない', () => {
        editBtn.trigger('click')
        expect(spyEditUserPassword).not.toBeCalled()
      })
    })
    describe('正しい入力', () => {
      test('エラーが表示されない', async () => {
        password.setValue('editPassword')
        passwordConfirmation.setValue('editPassword')
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
      })
      test('ボタンをクリックするとeditUserPasswordメソッドが発火される', () => {
        editBtn.trigger('click')
        expect(spyEditUserPassword).toBeCalled()
      })
    })
  })
})
