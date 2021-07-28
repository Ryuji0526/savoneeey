import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import index from '~/pages/index'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('pages/index', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wrapper = shallowMount(index, {
      localVue,
      vuetify,
    })
  })
  describe('表示確認', () => {
    test('子コンポーネントが存在する', () => {
      expect(wrapper.find('[data-testid="indexTop"]').exists()).toBeTruthy()
      expect(wrapper.find('[data-testid="indexAbout"]').exists()).toBeTruthy()
      expect(wrapper.find('[data-testid="indexAccount"]').exists()).toBeTruthy()
      expect(wrapper.find('[data-testid="indexWish"]').exists()).toBeTruthy()
    })
  })
})
