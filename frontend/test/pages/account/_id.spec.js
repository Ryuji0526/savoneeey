import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import AccountFixture from '~/test/fixtures/account'
import accountId from '~/pages/account/_id'

Vue.use(Vuetify)
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)
localVue.use(Vuex)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)

describe('pages/aaccount/_id', () => {
  let store
  let vuetify
  let wrapper
  let spyDeletable
  let bankAccountMock
  let flashMessageMock
  let stubs
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyDeletable = jest.spyOn(accountId.methods, 'deletable')
    bankAccountMock = {
      namespaced: true,
      actions: {
        getAccount: jest.fn(),
        deleteAccount: jest.fn(),
      },
      getters: {
        account: () => AccountFixture,
      },
    }
    flashMessageMock = {
      namespaced: true,
      actions: {
        showFlashMessage: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        bankAccount: bankAccountMock,
        flashMessage: flashMessageMock,
      },
    })
    stubs = {
      AccountDetail: true,
      AccountHistory: true,
      AccountWishLists: true,
    }
    wrapper = mount(accountId, {
      store,
      localVue,
      vuetify,
      router,
      stubs,
    })
  })
  describe('表示確認', () => {
    test('タイトル名が正しい', () => {
      expect(wrapper.find('[data-testid="title"]').text()).toBe('Account')
    })
    test('BackBtnの遷移先が正しい', () => {
      expect(wrapper.find('[data-testid="backBtn"]').props().to).toBe(
        '/accounts'
      )
    })
    test('残高が表示される', () => {
      const histories = wrapper.vm.account.recent_histories
      expect(wrapper.find('[data-testid="balance"]').text()).toBe(
        histories[histories.length - 1].balance.toLocaleString()
      )
    })
    test('アカウントの詳細、履歴、ほしい物リストが存在する', () => {
      const accountDetail = wrapper.find('[data-testid="accountDetail"]')
      const accountHistory = wrapper.find('[data-testid="accountHistory"]')
      const accountWishLists = wrapper.find('[data-testid="accountWishLists"]')
      expect(accountDetail.exists()).toBeTruthy()
      expect(accountHistory.exists()).toBeTruthy()
      expect(accountWishLists.exists()).toBeTruthy()
    })
  })
  describe('動作確認', () => {
    describe('deleteAlert', () => {
      beforeEach(() => {
        wrapper.find('[data-testid="deleteBtn"]').trigger('click')
      })
      test('deleteBtnを押すと、deleteAlertが出現する', () => {
        expect(
          wrapper.find('[data-testid="deleteAlert"]').exists()
        ).toBeTruthy()
        expect(wrapper.find('[data-testid="message"]').text()).toBe(
          'この口座を削除してもよろしいですか?'
        )
      })
      test('okBtnを押すと、deletableメソッドが発火する', () => {
        wrapper.find('[data-testid="okBtn"]').trigger('click')
        expect(spyDeletable).toBeCalled()
      })
      test('cancelBtnを押すと、dialogDeleteがfalseになるする', () => {
        expect(wrapper.vm.dialogDelete).toBeTruthy()
        wrapper.find('[data-testid="cancelBtn"]').trigger('click')
        expect(wrapper.vm.dialogDelete).toBeFalsy()
      })
    })
  })
})
