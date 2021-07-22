import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as store from '~/store'
import UserSignup from '~/components/user/UserEdit'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
const authMock = {
  user: {
    name: 'test',
    email: 'test@test.com',
  },
}

describe('components/UserSignup.vue', () => {
  let vuetify
  let wrapper
  let spyEditUser
  let observer
  let nameField
  let emailField
  let edit
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyEditUser = jest.spyOn(UserSignup.methods, 'editUser')
    wrapper = mount(UserSignup, {
      store,
      localVue,
      vuetify,
      mocks: {
        $auth: authMock,
      },
    })
    observer = wrapper.vm.$refs.observer
    nameField = wrapper.find('[data-testid="name"]')
    emailField = wrapper.find('[data-testid="email"]')
    edit = wrapper.find('[data-testid="edit"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(nameField.exists()).toBeTruthy()
      expect(emailField.exists()).toBeTruthy()
      expect(edit.exists()).toBeTruthy()
    })
    test('ボタンをクリックするとeditUserメソッドが発火される', () => {
      edit.trigger('click')
      expect(spyEditUser).toBeCalled()
    })
  })
  describe('バリデーション確認', () => {
    describe('正しくない入力', () => {
      test('未入力の時', async () => {
        nameField.setValue('')
        emailField.setValue('')
        await observer.validate()
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
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
    })
  })
})
