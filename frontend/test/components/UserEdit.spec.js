import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import UserEdit from '~/components/user/UserEdit'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
const authMock = {
  user: {
    name: 'test',
    email: 'test@test.com',
  },
}

describe('components/UserEdit.vue', () => {
  let vuetify
  let wrapper
  let spyEditUser
  let observer
  let nameField
  let emailField
  let edit
  let passwordBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyEditUser = jest.spyOn(UserEdit.methods, 'editUser')
    wrapper = mount(UserEdit, {
      localVue,
      vuetify,
      mocks: {
        $auth: authMock,
      },
    })
    observer = wrapper.vm.$refs.observer
    nameField = wrapper.find('[data-testid="name"]')
    emailField = wrapper.find('[data-testid="email"]')
    passwordBtn = wrapper.find('[data-testid="passwordBtn"]')
    edit = wrapper.find('[data-testid="edit"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(nameField.exists()).toBeTruthy()
      expect(emailField.exists()).toBeTruthy()
      expect(edit.exists()).toBeTruthy()
    })
  })
  describe('動作確認', () => {
    test('passwordBtnを押すとrevealがtrueになる', async () => {
      expect(wrapper.vm.reveal).toBeFalsy()
      passwordBtn.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.reveal).toBeTruthy()
    })
  })
  describe('バリデーション', () => {
    describe('正しくない入力', () => {
      beforeEach(async () => {
        nameField.setValue('')
        emailField.setValue('')
        await observer.validate()
      })
      test('エラーが表示される', () => {
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
      })
      test('ボタンを押してもeditUserPasswordメソッドが発火しない', () => {
        edit.trigger('click')
        expect(spyEditUser).not.toBeCalled()
      })
    })
    describe('正しい入力', () => {
      test('エラーが表示されない', async () => {
        nameField.setValue('edit')
        emailField.setValue('edit@edit.com')
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
      })
      test('ボタンをクリックするとeditUserメソッドが発火される', () => {
        edit.trigger('click')
        expect(spyEditUser).toBeCalled()
      })
    })
  })
})
