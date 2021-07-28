import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import AccountsFixture from '~/test/fixtures/accounts'
import accounts from '~/pages/accounts'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('pages/accounts', () => {
  let store
  let vuetify
  let wrapper
  let bankAccountMock
  let stubs
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    bankAccountMock = {
      namespaced: true,
      actions: {
        getAccounts: jest.fn(),
      },
      getters: {
        accounts: () => AccountsFixture,
      },
    }
    store = new Vuex.Store({
      modules: {
        bankAccount: bankAccountMock,
      },
    })
    stubs = {
      Account: true,
      AccountNew: true,
    }
    wrapper = mount(accounts, {
      store,
      localVue,
      vuetify,
      stubs,
    })
  })
  describe('表示確認', () => {
    test('タイトル名が正しい', () => {
      expect(wrapper.find('[data-testid="title"]').text()).toBe('Accounts')
    })
    test('口座、新規口座コンポーネントが存在する', () => {
      expect(wrapper.findAll('[data-testid="account"]').length).toBe(
        wrapper.vm.accounts.length
      )
      expect(
        wrapper.findAll('[data-testid="accountNew"]').exists()
      ).toBeTruthy()
    })
  })
})
