import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import AccountFixture from '~/test/fixtures/account'
import Account from '~/components/Account'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/Account.vue', () => {
  let store
  let vuetify
  let wrapper
  let bankAccountMock
  let nameField
  let revealBtn
  let dialog1Btn
  let target
  let history
  let closeBtn
  let moreBtn
  const transaction = {
    deposit: {
      id: null,
      name: null,
    },
    withdrawal: {
      id: null,
      name: null,
      balance: null,
    },
    amount: null,
  }
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    bankAccountMock = {
      namespaced: true,
      actions: {
        clearTransaction: jest.fn(),
        setDeposit: jest.fn(),
        setWithdrawal: jest.fn(),
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
    wrapper = mount(Account, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
    })
  })
  describe('表面', () => {
    beforeEach(() => {
      nameField = wrapper.find('[data-testid="name"]')
      dialog1Btn = wrapper.find('[data-testid="dialog1Btn"]')
      revealBtn = wrapper.find('[data-testid="reveal"]')
    })
    describe('表示確認', () => {
      test('アカウント名が表示されるする', () => {
        expect(nameField.text()).toBe(`- ${AccountFixture.name} -`)
      })
      test('残高が表示される', () => {
        expect(wrapper.vm.currentBalance).toBe(
          AccountFixture.recent_histories[0].balance
        )
      })
      test('dialog1Btnが存在する', () => {
        expect(dialog1Btn.exists()).toBeTruthy()
      })
    })
    describe('動作確認', () => {
      test('revealBtnを押すとrevealがtrueになる', () => {
        expect(wrapper.vm.reveal).toBeFalsy()
        revealBtn.trigger('click')
        expect(wrapper.vm.reveal).toBeTruthy()
      })
    })
  })
  describe('裏面', () => {
    beforeEach(async () => {
      wrapper.setData({ reveal: true })
      await wrapper.vm.$nextTick()
      target = wrapper.find('[data-testid="target"]')
      history = wrapper.findAll('[data-testid="history"]').at(0)
      moreBtn = wrapper.find('[data-testid="moreBtn"]')
      closeBtn = wrapper.find('[data-testid="closeBtn"]')
    })
    describe('表示確認', () => {
      test('目標金額が表示される', () => {
        expect(target.text()).toBe(
          AccountFixture.target_amount.toLocaleString()
        )
      })
      test('最新履歴が表示される', () => {
        expect(history.text()).toBe(
          String(AccountFixture.recent_histories[0].amount)
        )
      })
      test('moreBtnのリンク先が正しい', () => {
        expect(moreBtn.props().to.path).toBe(`/account/${AccountFixture.id}`)
      })
    })
    describe('操作確認', () => {
      test('closeBtnを押すとrevealがfalseになる', () => {
        expect(wrapper.vm.reveal).toBeTruthy()
        closeBtn.trigger('click')
        expect(wrapper.vm.reveal).toBeFalsy()
      })
    })
  })
})
