import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AccountFixture from '~/test/fixtures/account'
import TransactionFixture from '~/test/fixtures/transaction'
import AccountDialog2 from '~/components/AccountDialog2'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

describe('components/AccountDialog2.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyClose
  let spyRegister
  let bankAccountMock
  let observer
  let amount
  let closeBtn
  let saveBtn
  const transaction = TransactionFixture
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyClose = jest.spyOn(AccountDialog2.methods, 'close')
    spyRegister = jest.spyOn(AccountDialog2.methods, 'registerTradingHistory')
    bankAccountMock = {
      namespaced: true,
      actions: {
        createTradingHistory: jest.fn(),
        setDeposit: jest.fn(),
        setWithdrawal: jest.fn(),
        setAmount: jest.fn(),
        clearTransaction: jest.fn(),
      },
      getters: {
        transaction: () => transaction,
      },
    }
    store = new Vuex.Store({
      modules: {
        bankAccount: bankAccountMock,
      },
    })
    wrapper = mount(AccountDialog2, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
    })
    observer = wrapper.vm.$refs.observer
    amount = wrapper.find('[data-testid="amount"]')
    closeBtn = wrapper.find('[data-testid="closeBtn"]')
    saveBtn = wrapper.find('[data-testid="saveBtn"]')
  })
  describe('表示確認', () => {
    test('出金口座、送金口座の名前が存在する。', () => {
      expect(wrapper.find('[data-testid="withdrawal"]').text()).toBe(transaction.withdrawal.name)
      expect(wrapper.find('[data-testid="deposit"]').text()).toBe(transaction.deposit.name)
    })
    test('入力フォームが存在する', () => {
      expect(amount.exists()).toBeTruthy()
      expect(closeBtn.exists()).toBeTruthy()
      expect(saveBtn.exists()).toBeTruthy()
    })
  })
  describe('動作確認', () => {
    test('closeBtnを押すとcloseメソッドが発火される', () => {
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
      test('saveBtnを押してもregisterTradingHistoryOnlyMainが発火されない', () => {
        saveBtn.trigger('click')
        expect(spyRegister).not.toBeCalled()
      })
    })
    describe('正しい入力', () => {
      test('saveBtnを押すとregisterTradingHistoryOnlyMainが発火される', async () => {
        amount.setValue(1000)
        await wrapper.vm.$nextTick()
        saveBtn.trigger('click')
        expect(spyRegister).toBeCalled()
      })
    })
  })
})
