import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import AccountsFixture from '~/test/fixtures/accounts'
import AccountSelect from '~/components/AccountSelect'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/AccountSelect.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyClose
  let spySave
  let bankAccountMock
  let accountRadioBtn
  let closeBtn
  let addBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyClose = jest.spyOn(AccountSelect.methods, 'close')
    spySave = jest.spyOn(AccountSelect.methods, 'save')
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
    wrapper = mount(AccountSelect, {
      store,
      localVue,
      vuetify,
    })
    accountRadioBtn = wrapper.findAll('[data-testid="accountRadioBtn"]')
    closeBtn = wrapper.find('[data-testid="closeBtn"]')
    addBtn = wrapper.find('[data-testid="addBtn"]')
  })
  describe('表示確認', () => {
    test('入力フォームが存在する', () => {
      expect(accountRadioBtn.length).toBe(AccountsFixture.length)
      expect(closeBtn.exists()).toBeTruthy()
      expect(addBtn.exists()).toBeTruthy()
    })
  })
  describe('動作確認', () => {
    test('radioBtnを押すとselectedが切り替わる', () => {
      expect(wrapper.vm.selected).toBeNull()
      accountRadioBtn.at(1).trigger('click')
      expect(wrapper.vm.selected).toBe(AccountsFixture[1].id)
      accountRadioBtn.at(2).trigger('click')
      expect(wrapper.vm.selected).toBe(AccountsFixture[2].id)
    })
    test('closeBtnを押すと、closeメソッドが発火される', () => {
      closeBtn.trigger('click')
      expect(spyClose).toBeCalled()
    })
    test('selectedがnullの時、saveメソッドが発火されない', () => {
      addBtn.trigger('click')
      expect(spySave).not.toBeCalled()
    })
    test('selectedが値を持つ時、saveメソッドが発火される', async () => {
      accountRadioBtn.at(1).trigger('click')
      await wrapper.vm.$nextTick()
      addBtn.trigger('click')
      expect(spySave).toBeCalled()
    })
  })
})
