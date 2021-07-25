import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AccountFixture from '~/test/fixtures/account'
import AccountDialog1 from '~/components/AccountDialog1'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

describe('components/Account.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyRegister
  let spyClose
  let bankAccountMock
  let observer
  let radioBtn
  let amount
  let closeBtn
  let saveBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyRegister = jest.spyOn(
      AccountDialog1.methods,
      'registerTradingHistoryOnlyMain'
    )
    spyClose = jest.spyOn(AccountDialog1.methods, 'close')
    bankAccountMock = {
      namespaced: true,
      actions: {
        setAmount: jest.fn(),
        createTradingHistory: jest.fn(),
        clearTransaction: jest.fn(),
        setWithdrawal: jest.fn(),
        setDeposit: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        bankAccount: bankAccountMock,
      },
    })
    wrapper = mount(AccountDialog1, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
    })
    observer = wrapper.vm.$refs.observer
    radioBtn = wrapper.findAll('[data-testid="radioBtn"]')
    amount = wrapper.find('[data-testid="amount"]')
    closeBtn = wrapper.find('[data-testid="closeBtn"]')
    saveBtn = wrapper.find('[data-testid="saveBtn"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(radioBtn.length).toBe(2)
      expect(amount.exists()).toBeTruthy()
      expect(closeBtn.exists()).toBeTruthy()
      expect(saveBtn.exists()).toBeTruthy()
    })
  })
  describe('操作確認', () => {
    test('closeBtnを押すとcloseメソッドが発火する', () => {
      closeBtn.trigger('click')
      expect(spyClose).toBeCalled()
    })
  })
  describe('バリデーション', () => {
    describe('正しくない入力', () => {
      beforeEach(async () => {
        amount.setValue(-1000)
        await observer.validate()
      })
      test('エラーが表示される', () => {
        expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
      })
      test('saveBtnを押すしてもregisterTradingHistoryOnlyMainが発火しない', () => {
        saveBtn.trigger('click')
        expect(spyRegister).not.toBeCalled()
      })
    })
    describe('正しい入力', () => {
      test('saveBtnを押すとregisterTradingHistoryOnlyMainが発火する', async () => {
        radioBtn.at(1).trigger('click')
        amount.setValue(1000)
        await wrapper.vm.$nextTick()
        saveBtn.trigger('click')
        expect(spyRegister).toBeCalled()
      })
    })
  })
})
