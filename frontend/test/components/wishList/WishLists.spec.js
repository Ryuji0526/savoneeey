import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AccountFixture from '~/test/fixtures/account'
import WishListFixture from '~/test/fixtures/wishList'
import WishTagFixture from '~/test/fixtures/wishTag'
import WishLists from '~/components/wishList/WishLists'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

const app = document.createElement('div')
app.setAttribute('data-app', true)
document.body.appendChild(app)

describe('components/WishLists.vue', () => {
  let store
  let vuetify
  let wrapper
  let spy
  let wishListMock
  let registeringMock
  let bankAccountMock
  let observer
  let wishListTable
  let firstWishList
  let deleteBtn
  let stubs
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spy = {
      spyClose: jest.spyOn(WishLists.methods, 'close'),
      spySave: jest.spyOn(WishLists.methods, 'save'),
      spyCloseDelete: jest.spyOn(WishLists.methods, 'closeDelete'),
      spyCreateWishList: jest.spyOn(WishLists.methods, 'createWishList'),
      spyEditWishList: jest.spyOn(WishLists.methods, 'editWishList'),
      spyDeleteItemConfirm: jest.spyOn(WishLists.methods, 'deleteItemConfirm'),
    }
    bankAccountMock = {
      namespaced: true,
      actions: {
        getAccounts: jest.fn(),
      },
      getters: {
        accounts: () => AccountFixture,
      },
    }
    wishListMock = {
      namespaced: true,
      actions: {
        createWishList: jest.fn(),
        editWishList: jest.fn(),
        deleteWishList: jest.fn(),
      },
    }
    registeringMock = {
      namespaced: true,
      actions: {
        createRegistering: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        wishList: wishListMock,
        registering: registeringMock,
        bankAccount: bankAccountMock,
      },
    })
    stubs = {
      AccountSelect: true,
    }
    wrapper = mount(WishLists, {
      store,
      localVue,
      vuetify,
      propsData: {
        wishLists: WishListFixture,
        wishTags: WishTagFixture,
      },
      stubs,
    })
    deleteBtn = wrapper.find('[data-testid="deleteBtn"]')
    wishListTable = wrapper.findAll('tbody > tr')
    firstWishList = wrapper.vm.wishLists[0]
  })
  describe('WishListTable', () => {
    describe('表示確認', () => {
      test('WishListの名前、価格、タグ、編集ボタン、削除ボタンが存在する。', () => {
        expect(wishListTable.at(0).text()).toContain(firstWishList.name)
        expect(wishListTable.at(0).text()).toContain(
          firstWishList.price.toLocaleString()
        )
        firstWishList.wish_tags.forEach((tag) => {
          expect(wishListTable.at(0).text()).toContain(tag.name)
        })
        expect(wrapper.find('[data-testid="editBtn"]').exists()).toBeTruthy()
        expect(deleteBtn.exists()).toBeTruthy()
      })
    })
    describe('動作確認', () => {
      let checkbox
      test('newBtnを押すと新規登録フォームが出現する', async () => {
        expect(wrapper.find('[data-testid="form"]').exists()).toBeFalsy()
        wrapper.find('[data-testid="newBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('[data-testid="form"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-testid="form"]').text()).toContain(
          'New WishList'
        )
      })
      test('deleteBtnを押すと確認画面が表示される', async () => {
        expect(wrapper.find('[data-testid="deleteAlert"]').exists()).toBeFalsy()
        deleteBtn.trigger('click')
        await wrapper.vm.$nextTick()
        expect(
          wrapper.find('[data-testid="deleteAlert"]').exists()
        ).toBeTruthy()
      })
      test('editBtnを押すと編集フォームが出現する', async () => {
        expect(wrapper.find('[data-testid="form"]').exists()).toBeFalsy()
        wrapper.find('[data-testid="editBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('[data-testid="form"]').exists()).toBeTruthy()
        expect(wrapper.find('[data-testid="form"]').text()).toContain(
          'Edit WishList'
        )
      })
      test('リストを選択し、ボタンを押すとアカウント選択フォームが出現する', async () => {
        expect(
          wrapper.find('[data-testid="accountSelect"]').exists()
        ).toBeFalsy()
        checkbox = wrapper.findAll('.v-input--selection-controls__ripple')
        checkbox.at(1).trigger('click')
        checkbox.at(3).trigger('click')
        deleteBtn.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.selected).toEqual(
          expect.arrayContaining([
            wrapper.vm.wishLists[0],
            wrapper.vm.wishLists[2],
          ])
        )
        wrapper.find('[data-testid="addToAccountBtn"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(
          wrapper.find('[data-testid="accountSelect"]').exists()
        ).toBeTruthy()
      })
      test('検索フォームの動作確認', async () => {
        wrapper
          .find('.v-text-field__slot > input')
          .setValue(wishListTable.at(0).name)
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('tbody > tr').length).toBe(1)
      })
      test('ページング', async () => {
        expect(wrapper.findAll('tbody > tr').length).toBe(10)
        wrapper.find('[aria-label="Goto Page 2"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('tbody > tr').length).toBe(
          WishListFixture.length - 10
        )
      })
    })
  })
  describe('New/Editフォーム', () => {
    let name
    let price
    let saveBtn
    beforeEach(async () => {
      wrapper.setData({ dialog: true })
      await wrapper.vm.$nextTick()
      observer = wrapper.vm.$refs.observer
      name = wrapper.find('[data-testid="name"]')
      price = wrapper.find('[data-testid="price"]')
      saveBtn = wrapper.find('[data-testid="saveBtn"]')
    })
    describe('New/Edit 共通', () => {
      describe('表示確認', () => {
        test('リストの名前、価格、URL、タグが存在する', () => {
          expect(name.exists()).toBeTruthy()
          expect(price.exists()).toBeTruthy()
          expect(wrapper.find('[data-testid="url"]').exists()).toBeTruthy()
          expect(wrapper.find('[data-testid="tag"]').exists()).toBeTruthy()
        })
      })
      describe('動作確認', () => {
        test('closeBtnを押すとcloseメソッドが発火される', () => {
          wrapper.find('[data-testid="closeBtn"]').trigger('click')
          expect(spy.spyClose).toBeCalled()
          expect(wrapper.vm.dialog).toBeFalsy()
        })
      })
      describe('バリデーション', () => {
        describe('正しくない入力', () => {
          beforeEach(async () => {
            name.setValue('')
            price.setValue(-1000)
            await observer.validate()
          })
          test('エラーが表示される', () => {
            expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
          })
          test('saveBtnを押してもsaveメソッドが発火しない', () => {
            saveBtn.trigger('click')
            expect(spy.spySave).not.toBeCalled()
          })
        })
        describe('正しい入力', () => {
          beforeEach(async () => {
            name.setValue('test')
            price.setValue(10000)
            await observer.validate()
          })
          test('エラーが表示されない', () => {
            expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
          })
          test('saveBtnを押すとsaveメソッドが発火する', () => {
            saveBtn.trigger('click')
            expect(spy.spySave).toBeCalled()
          })
        })
      })
    })
    describe('Newフォーム', () => {
      beforeEach(async () => {
        wrapper.setData({ editedIndex: -1 })
        name.setValue('test')
        price.setValue(10000)
        await observer.validate()
      })
      test('saveBtnを押すとcreateWishListが発火する', () => {
        saveBtn.trigger('click')
        expect(spy.spyCreateWishList).toBeCalled()
      })
    })
    describe('Editフォーム', () => {
      beforeEach(async () => {
        wrapper.setData({ editedIndex: 0 })
        name.setValue('test')
        price.setValue(10000)
        await observer.validate()
      })
      test('saveBtnを押すとeditWishListが発火する', () => {
        saveBtn.trigger('click')
        expect(spy.spyEditWishList).toBeCalled()
      })
    })
  })
  describe('削除確認画面', () => {
    beforeEach(() => {
      deleteBtn.trigger('click')
    })
    test('メッセージが表示されている', () => {
      expect(wrapper.find('[data-testid="message"]').text()).toContain(
        'このリストを削除してもよろしいですか?'
      )
    })
    test('cancelBtnを押すとcloseDeleteメソッドが発火する', () => {
      wrapper.find('[data-testid="cancelBtn"]').trigger('click')
      expect(spy.spyCloseDelete).toBeCalled()
      expect(wrapper.vm.dialogDelete).toBeFalsy()
    })
    test('okBtnを押すとdeleteItemConfirmメソッドが発火する', () => {
      wrapper.find('[data-testid="okBtn"]').trigger('click')
      expect(spy.spyDeleteItemConfirm).toBeCalled()
      expect(wrapper.vm.dialogDelete).toBeFalsy()
    })
  })
})
