import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import wishList from '~/pages/service/wish-list'
import account from '~/pages/service/account'
// import account1  from '~/assets/image/account1.gif'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('pages/user', () => {
  let vuetify
  let wrapper
  const stubs = {
    ServiceContainer: true,
  }
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
  })
  describe('account', () => {
    beforeEach(() => {
      wrapper = mount(account, {
        localVue,
        vuetify,
        stubs,
      })
    })
    describe('表示確認', () => {
      test('タイトル名が正しい', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toBe(
          'Service - Account -'
        )
      })
      test('serviceContainerコンポーネントが存在する', () => {
        expect(wrapper.findAll('[data-testid="serviceContainer"]').length).toBe(
          wrapper.vm.containers.length
        )
      })
    })
  })
  describe('wishList', () => {
    beforeEach(() => {
      wrapper = mount(wishList, {
        localVue,
        vuetify,
        stubs,
      })
    })
    describe('表示確認', () => {
      test('タイトル名が正しい', () => {
        expect(wrapper.find('[data-testid="title"]').text()).toBe(
          'Service - WishList -'
        )
      })
      test('serviceContainerコンポーネントが存在する', () => {
        expect(wrapper.findAll('[data-testid="serviceContainer"]').length).toBe(
          wrapper.vm.containers.length
        )
      })
    })
  })
})
