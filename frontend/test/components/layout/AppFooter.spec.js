import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import AppFooter from '~/components/layout/AppFooter'

Vue.use(Vuetify)
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)

describe('components/layout/AppFooter.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wrapper = mount(AppFooter, {
      localVue,
      vuetify,
      router,
    })
  })
  describe('footer-nav', () => {
    let navs
    beforeEach(() => {
      navs = wrapper.find('[data-testid="footerNav"]').findAll('a')
    })
    test('itemsの数だけ存在する', () => {
      expect(navs.length).toBe(wrapper.vm.items.length)
    })
    test('遷移先が正しい', () => {
      for (let i = 0; i < navs.length; i++) {
        expect(navs.at(i).props().to).toBe(wrapper.vm.items[i].to)
      }
    })
  })
})
