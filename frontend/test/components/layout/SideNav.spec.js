import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import SideNav from '~/components/layout/SideNav'

Vue.use(Vuetify)
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('components/layout/SideNav.vue', () => {
  let store
  let vuetify
  let userMock
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    userMock = {
      namespaced: true,
      actions: {
        logout: jest.fn(),
      },
    }
    store = new Vuex.Store({
      modules: {
        user: userMock,
      },
    })
  })
  describe('ログインしている時', () => {
    let spyLogoutUser
    const authMock = {
      user: {
        name: 'test',
        email: 'test@test.com',
      },
      loggedIn: true,
    }
    beforeEach(() => {
      spyLogoutUser = jest.spyOn(SideNav.methods, 'logoutUser')
      wrapper = mount(SideNav, {
        store,
        localVue,
        vuetify,
        router,
        mocks: {
          $auth: authMock,
        },
      })
    })
    describe('表示確認', () => {
      let sideNavs
      test('loggedInItemsの数だけ存在する', () => {
        sideNavs = wrapper.findAll('[data-testid="sideNav"]')
        expect(sideNavs.length).toBe(wrapper.vm.loggedInItems.length)
      })
      test('遷移先が正しい', () => {
        for (let i = 0; i < sideNavs.length; i++) {
          expect(sideNavs.at(i).props().to).toBe(wrapper.vm.loggedInItems[i].to)
        }
      })
    })
    describe('動作確認', () => {
      test('logoutBtnを押すと、logoutUserが発火する', () => {
        wrapper.find('[data-testid="logoutBtn"]').trigger('click')
        expect(spyLogoutUser).toBeCalled()
      })
    })
  })
  describe('ログインしていない時', () => {
    const authMock = {
      user: {
        name: '',
        email: '',
      },
      loggedIn: false,
    }
    beforeEach(() => {
      wrapper = mount(SideNav, {
        store,
        localVue,
        vuetify,
        router,
        mocks: {
          $auth: authMock,
        },
      })
    })
    describe('表示確認', () => {
      let sideNavs
      test('itemsの数だけ存在する', () => {
        sideNavs = wrapper.findAll('[data-testid="sideNav"]')
        expect(sideNavs.length).toBe(wrapper.vm.items.length)
      })
      test('遷移先が正しい', () => {
        for (let i = 0; i < sideNavs.length; i++) {
          expect(sideNavs.at(i).props().to).toBe(wrapper.vm.items[i].to)
        }
      })
    })
  })
})
