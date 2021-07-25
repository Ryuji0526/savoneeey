import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainTitle from '~/components/MainTitle'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('components/Account.vue', () => {
  let vuetify
  let wrapper
  let title
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    wrapper = shallowMount(MainTitle, {
      localVue,
      vuetify,
      propsData: {
        title: 'Test',
      },
    })
    title = wrapper.find('[data-testid="title"]')
  })
  describe('表示確認', () => {
    test('出金口座、送金口座の名前が存在する。', () => {
      expect(title.text()).toContain(wrapper.vm.title)
    })
  })
})
