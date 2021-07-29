import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import AccountFixture from '~/test/fixtures/account'
import TagFixture from '~/test/fixtures/tag'
import AccountDetail from '~/components/account/AccountDetail'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('ValidationProvider', ValidationProvider)
localVue.component('ValidationObserver', ValidationObserver)
localVue.use(Vuex)

describe('components/AccountDetail.vue', () => {
  let store
  let vuetify
  let wrapper
  let spyEdit
  let tagMock
  let bankAccountMock
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
    beforeEach(() => {
      wrapper.setData({ editable: false })
    })
    describe('表示確認', () => {
      let tag
      test('アカウント名、目標金額、タグが存在する', () => {
        expect(wrapper.find('[data-testid="name"]').text()).toBe(
          AccountFixture.name
        )
        expect(wrapper.find('[data-testid="target"]').text()).toContain(
          AccountFixture.target_amount
        )
        tag = wrapper.findAll('[data-testid="tag"]')
        expect(tag.at(0).text()).toBe(AccountFixture.account_tags[0].name)
        expect(tag.at(1).text()).toBe(AccountFixture.account_tags[1].name)
      })
      test('編集フォームは表示されない', () => {
        expect(wrapper.find('[data-testid="editName"]').exists()).toBeFalsy()
        expect(wrapper.find('[data-testid="editTarget"]').exists()).toBeFalsy()
        expect(wrapper.findAll('[data-testid="editTag"]').exists()).toBeFalsy()
      })
    })
    describe('操作確認', () => {
      test('switchBtnを押すとeditableがtrueになる', () => {
        expect(wrapper.vm.editable).toBeFalsy()
        wrapper.find('[data-testid="switchBtn"]').trigger('click')
        expect(wrapper.vm.editable).toBeTruthy()
      })
    })
  })
  describe('editable = trueの時', () => {
    let observer
    let editName
    let editTarget
    let saveBtn
    beforeEach(async () => {
      wrapper.setData({ editable: true })
      await wrapper.vm.$nextTick()
      observer = wrapper.vm.$refs.observer
      editName = wrapper.find('[data-testid="editName"]')
      editTarget = wrapper.find('[data-testid="editTarget"]')
      saveBtn = wrapper.find('[data-testid="saveBtn"]')
    })
    describe('表示確認', () => {
      test('編集フォームが表示される', () => {
        expect(editName.exists()).toBeTruthy()
        expect(editTarget.exists()).toBeTruthy()
        expect(wrapper.findAll('[data-testid="editTag"]').exists()).toBeTruthy()
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
