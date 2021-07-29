import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import AccountFixture from '~/test/fixtures/account'
import AccountWishLists from '~/components/account/AccountWishLists'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)

describe('components/AccountWishLists.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyUnregister
  let spyCloseUnregister
  let spyUnregisterItemConfirm
  let registeringMock
  let deleteBtn
  let tableFirstList
  let accountFirstList
  let message
  let cancelBtn
  let okBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyUnregister = jest.spyOn(AccountWishLists.methods, 'unregisterItem')
    spyCloseUnregister = jest.spyOn(AccountWishLists.methods, 'closeUnregister')
    spyUnregisterItemConfirm = jest.spyOn(
      AccountWishLists.methods,
      'unregisterItemConfirm'
    )
    registeringMock = {
      namespaced: true,
      actions: {
        deleteRegistering: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        registering: registeringMock,
      },
    })
    wrapper = mount(AccountWishLists, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
      },
    })
    deleteBtn = wrapper.findAll('[data-testid="deleteBtn"]')
  })
  describe('AccountWishLists', () => {
    describe('表示確認', () => {
      test('リストの名前、金額、タグ、削除ボタンが表示される', () => {
        tableFirstList = wrapper.findAll('tbody > tr').at(0)
        accountFirstList = AccountFixture.wish_lists[0]
        expect(tableFirstList.text()).toContain(accountFirstList.name)
        expect(tableFirstList.text()).toContain(accountFirstList.price)
        accountFirstList.wish_tags.forEach((tag) => {
          expect(tableFirstList.text()).toContain(tag.name)
        })
        expect(deleteBtn.at(0).exists()).toBeTruthy()
      })
      test('最大５つのリストが表示される', () => {
        expect(wrapper.findAll('tbody > tr').length).toBe(5)
      })
      test('ページング', async () => {
        wrapper.find('[aria-label="Goto Page 2"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('tbody > tr').length).toBe(
          AccountFixture.wish_lists.length - 5
        )
      })
    })
    describe('動作確認', () => {
      test('deleteBtnを押すと確認画面が表示される', async () => {
        expect(wrapper.find('[data-testid="deleteAlert"]').exists()).toBeFalsy()
        deleteBtn.trigger('click')
        await wrapper.vm.$nextTick()
        expect(spyUnregister).toBeCalled()
        expect(
          wrapper.find('[data-testid="deleteAlert"]').exists()
        ).toBeTruthy()
      })
    })
  })
  describe('DeleteAlert', () => {
    beforeEach(async () => {
      wrapper.setData({ dialogUnregister: true })
      await wrapper.vm.$nextTick()
      message = wrapper.findAll('[data-testid="message"]')
      cancelBtn = wrapper.findAll('[data-testid="cancelBtn"]')
      okBtn = wrapper.findAll('[data-testid="okBtn"]')
    })
    describe('表示確認', () => {
      test('messageが表示される', () => {
        expect(message.exists()).toBeTruthy()
      })
    })
    describe('動作確認', () => {
      test('cancelBtnを押すと、closeUnregisterメソッドが発火される', () => {
        cancelBtn.trigger('click')
        expect(spyCloseUnregister).toBeCalled()
        expect(wrapper.vm.dialogUnregister).toBeFalsy()
      })
      test('okBtnを押すと、unregisterItemConfirmメソッドが発火される', () => {
        okBtn.trigger('click')
        expect(spyUnregisterItemConfirm).toBeCalled()
        expect(wrapper.vm.dialogUnregister).toBeFalsy()
      })
    })
  })
})
