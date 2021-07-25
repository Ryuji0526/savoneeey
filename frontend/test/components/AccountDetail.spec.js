import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AccountFixture from '~/test/fixtures/account'
import TagFixture from '~/test/fixtures/tag'
import AccountDetail from '~/components/AccountDetail'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

describe('components/Account.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyEdit
  let tagMock
  let bankAccountMock
  let observer
  let name
  let editName
  let target
  let editTarget
  let tag
  let editTag
  let saveBtn
  let switchBtn
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyEdit = jest.spyOn(AccountDetail.methods, 'edit')
    tagMock = {
      namespaced: true,
      actions: {
        getAccountTags: jest.fn(),
      },
      getters: {
        accountTags: () => TagFixture,
      },
    }
    bankAccountMock = {
      namespaced: true,
      actions: {
        editAccount: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        tag: tagMock,
        bankAccount: bankAccountMock,
      },
    })
    wrapper = mount(AccountDetail, {
      store,
      localVue,
      vuetify,
      propsData: {
        account: AccountFixture,
        currentBalance: AccountFixture.recent_histories[0].balance,
      },
    })
  })
  describe('editable = falseの時', () => {
    beforeEach(async () => {
      wrapper.setData({ editable: false })
      await wrapper.vm.$nextTick()
      name = wrapper.find('[data-testid="name"]')
      editName = wrapper.find('[data-testid="editName"]')
      target = wrapper.find('[data-testid="target"]')
      editTarget = wrapper.find('[data-testid="editTarget"]')
      tag = wrapper.findAll('[data-testid="tag"]')
      editTag = wrapper.findAll('[data-testid="editTag"]')
      switchBtn = wrapper.find('[data-testid="switchBtn"]')
    })
    describe('表示確認', () => {
      test('アカウント名、目標金額、タグが存在する', () => {
        expect(name.text()).toBe(AccountFixture.name)
        expect(target.text()).toContain(AccountFixture.target_amount)
        expect(tag.at(0).text()).toBe(AccountFixture.account_tags[0].name)
        expect(tag.at(1).text()).toBe(AccountFixture.account_tags[1].name)
      })
      test('編集フォームは表示されない', () => {
        expect(editName.exists()).toBeFalsy()
        expect(editTarget.exists()).toBeFalsy()
        expect(editTag.exists()).toBeFalsy()
      })
    })
    describe('操作確認', () => {
      test('switchBtnを押すとeditableがtrueになる', () => {
        expect(wrapper.vm.editable).toBeFalsy()
        switchBtn.trigger('click')
        expect(wrapper.vm.editable).toBeTruthy()
      })
    })
  })
  describe('editable = trueの時', () => {
    beforeEach(async () => {
      wrapper.setData({ editable: true })
      await wrapper.vm.$nextTick()
      observer = wrapper.vm.$refs.observer
      editName = wrapper.find('[data-testid="editName"]')
      editTarget = wrapper.find('[data-testid="editTarget"]')
      editTag = wrapper.findAll('[data-testid="editTag"]')
      saveBtn = wrapper.find('[data-testid="saveBtn"]')
    })
    describe('表示確認', () => {
      test('編集フォームが表示される', () => {
        expect(editName.exists()).toBeTruthy()
        expect(editTarget.exists()).toBeTruthy()
        expect(editTag.exists()).toBeTruthy()
      })
    })
    describe('バリデーション', () => {
      describe('正しくない入力', () => {
        beforeEach(async () => {
          editName.setValue('')
          editTarget.setValue(-1000)
          await observer.validate()
        })
        test('エラーが表示される', () => {
          expect(wrapper.find('.v-messages__message').exists()).toBeTruthy()
        })
        test('saveBtnを押すとeditメソッドが発火されない', () => {
          saveBtn.trigger('click')
          expect(spyEdit).not.toBeCalled()
        })
      })
      describe('正しい入力', () => {
        beforeEach(async () => {
          editName.setValue('edit')
          editTarget.setValue(1000)
          await observer.validate()
        })
        test('エラーが表示されない', () => {
          expect(wrapper.find('.v-messages__message').exists()).toBeFalsy()
        })
        test('saveBtnを押すとeditメソッドが発火される', () => {
          saveBtn.trigger('click')
          expect(spyEdit).toBeCalled()
        })
      })
    })
  })
})
