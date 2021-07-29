import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import WishListFixture from '~/test/fixtures/wishList'
import WishTagFixture from '~/test/fixtures/wishTag'
import wishLists from '~/pages/wish-lists'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('pages/wish-lists', () => {
  let store
  let vuetify
  let wrapper
  let wishListMock
  let wishTagMock
  let stubs
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wishListMock = {
      namespaced: true,
      actions: {
        getWishLists: jest.fn(),
      },
      getters: {
        wishLists: () => WishListFixture,
      },
    }
    wishTagMock = {
      namespaced: true,
      actions: {
        getWishTags: jest.fn(),
      },
      getters: {
        wishTags: () => WishTagFixture,
      },
    }
    store = new Vuex.Store({
      modules: {
        wishList: wishListMock,
        tag: wishTagMock,
      },
    })
    stubs = {
      WishLists: true,
    }
    wrapper = mount(wishLists, {
      store,
      localVue,
      vuetify,
      stubs,
    })
  })
  describe('表示確認', () => {
    test('タイトル名が正しい', () => {
      expect(wrapper.find('[data-testid="title"]').text()).toBe('Wish Lists')
    })
    test('WishListsコンポーネントが存在する', () => {
      expect(wrapper.find('[data-testid="wishLists"]').exists()).toBeTruthy()
    })
  })
})
