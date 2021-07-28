import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import AccountFixture from '~/test/fixtures/account'
import TransactionFixture from '~/test/fixtures/transaction'
import Account from '~/components/Account'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)

describe('components/Account.vue', () => {
  let store
  let vuetify
  let wrapper
  let spySelectAccount
  let bankAccountMock
  let stubs
  const transaction = TransactionFixture
  AccountFixture.is_main = true
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spySelectAccount = jest.spyOn(Account.methods, 'selectAccount')
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
    stubs = {
      AccountDialog1: true,
      AccountDialog2: true,
      AccountSparkline: true,
      RouterLink: true,
    }
    wrapper = mount(Account, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
      stubs,
    })
  })
  describe('表面', () => {
    describe('表示確認', () => {
      test('アカウント名が表示されるする', () => {
        expect(wrapper.find('[data-testid="name"]').text()).toBe(`- ${AccountFixture.name} -`)
      })
      test('残高が表示される', () => {
        expect(wrapper.vm.currentBalance).toBe(
          AccountFixture.recent_histories[0].balance
        )
      })
      test('dialog1Btnが存在する', () => {
        expect(wrapper.find('[data-testid="dialog1Btn"]').exists()).toBeTruthy()
      })
    })
    describe('動作確認', () => {
      test('revealBtnを押すとrevealがtrueになる', () => {
        expect(wrapper.vm.reveal).toBeFalsy()
        wrapper.find('[data-testid="reveal"]').trigger('click')
        expect(wrapper.vm.reveal).toBeTruthy()
      })
      test('accountCardを押すとselectAccountが発火する', () => {
        wrapper.find('[data-testid="accountCard"]').trigger('click')
        expect(spySelectAccount).toBeCalled()
      })
    })
  })
  describe('裏面', () => {
    beforeEach(() => {
      wrapper.setData({ reveal: true })
    })
    describe('表示確認', () => {
      test('目標金額が表示される', () => {
        expect(wrapper.find('[data-testid="target"]').text()).toBe(
          AccountFixture.target_amount.toLocaleString()
        )
      })
      test('最新履歴が表示される', () => {
        expect(wrapper.findAll('[data-testid="history"]').at(0).text()).toBe(
          String(AccountFixture.recent_histories[0].amount)
        )
      })
      test('moreBtnのリンク先が正しい', () => {
        expect(wrapper.find('[data-testid="moreBtn"]').props().to.path).toBe(`/account/${AccountFixture.id}`)
      })
    })
    describe('操作確認', () => {
      test('closeBtnを押すとrevealがfalseになる', () => {
        expect(wrapper.vm.reveal).toBeTruthy()
        wrapper.find('[data-testid="closeBtn"]').trigger('click')
        expect(wrapper.vm.reveal).toBeFalsy()
      })
    })
  })
})
