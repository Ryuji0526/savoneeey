import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import TagFixture from '~/test/fixtures/tag'
import AccountNew from '~/components/AccountNew'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)

describe('components/AccountNew.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyClose
  let spyRegister
  let tagMock
  let bankAccountMock
  let observer
  let name
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyClose = jest.spyOn(AccountNew.methods, 'closeNewDialog')
    spyRegister = jest.spyOn(AccountNew.methods, 'registerAccount')
    tagMock = {
      namespaced: true,
      actions: {
        getAccountTags: jest.fn(),
      },
      getters: {
        accountTags: () => TagFixture,
      },
    }
    bankAccountMock = {
      namespaced: true,
      actions: {
        createAccount: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        tag: tagMock,
        bankAccount: bankAccountMock,
      },
    })
    wrapper = mount(AccountNew, {
      store,
      localVue,
      vuetify,
    })
  })
  describe('dialog = falseの時', () => {
    beforeEach(() => {
      wrapper.setData({ dialog: false })
    })
    describe('表示確認', () => {
      test('入力フォームは存在しない', () => {
        name = wrapper.find('[data-testid="name"]')
        expect(name.exists()).toBeFalsy()
        expect(wrapper.find('[data-testid="target"]').exists()).toBeFalsy()
        expect(wrapper.findAll('[data-testid="tag"]').exists()).toBeFalsy()
      })
    })
    describe('操作確認', () => {
      test('dialogBtnを押すとdialog = trueになる', async () => {
        expect(wrapper.vm.dialog).toBeFalsy()
        wrapper.find('[data-testid="dialogBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.dialog).toBeTruthy()
      })
    })
  })
  describe('dialog = trueの時', () => {
    let target
    let saveBtn
    beforeEach(async () => {
      wrapper.setData({ dialog: true })
      await wrapper.vm.$nextTick()
      observer = wrapper.vm.$refs.observer
      name = wrapper.find('[data-testid="name"]')
      target = wrapper.find('[data-testid="target"]')
      saveBtn = wrapper.find('[data-testid="saveBtn"]')
    })
    describe('表示確認', () => {
      test('入力フォームは存在する', () => {
        expect(name.exists()).toBeTruthy()
        expect(target.exists()).toBeTruthy()
        expect(wrapper.findAll('[data-testid="tag"]')).toBeTruthy()
      })
    })
    describe('操作確認', () => {
      test('closeBtnを押すとcloseメソッドが発火される', () => {
        expect(wrapper.vm.dialog).toBeTruthy()
        wrapper.find('[data-testid="closeBtn"]').trigger('click')
        expect(spyClose).toBeCalled()
        expect(wrapper.vm.dialog).toBeFalsy()
      })
    })
    describe('バリデーション', () => {
      describe('正しくない入力', () => {
        beforeEach(async () => {
          name.setValue('')
          target.setValue(-1000)
          await observer.validate()
        })
        test('エラーが表示される', () => {
          expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
        })
        test('saveBtnを押してもregisterAccountメソッドが発火されない', () => {
          saveBtn.trigger('click')
          expect(spyRegister).not.toBeCalled()
        })
      })
      describe('正しい入力', () => {
        beforeEach(async () => {
          expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
          name.setValue('test')
          target.setValue(1000)
          await observer.validate()
        })
        test('エラーが入力されない', () => {
          expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
        })
        test('saveBtnを押すとregisterAccountメソッドが発火される', () => {
          saveBtn.trigger('click')
          expect(spyRegister).toBeCalled()
        })
      })
    })
  })
})
