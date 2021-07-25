import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AccountFixture from '~/test/fixtures/account'
import AccountHistory from '~/components/AccountHistory'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/Account.vue', () => {
  let store
  let vuetify
  let wrapper
  let tab
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wrapper = shallowMount(AccountHistory, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
    })
    tab = wrapper.findAll('[data-testid="tab"]')
  })
  describe('表示確認', () => {
    test('タブが存在する', () => {
      expect(tab.length).toBe(wrapper.vm.tabs.length)
    })
  })
  describe('操作確認', () => {
    test('タブを押すとTabNameが切り替わる', () => {
      expect(wrapper.vm.tabName).toBe(wrapper.vm.tabs[0])
      tab.at(2).vm.$emit('click')
      expect(wrapper.vm.tabName).toBe(wrapper.vm.tabs[2])
    })
  })
})
