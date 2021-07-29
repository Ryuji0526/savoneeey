import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainTitle from '~/components/layout/MainTitle'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('components/layout/MainTitle.vue', () => {
  let vuetify
  let wrapper
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
  })
  describe('表示確認', () => {
    test('出金口座、送金口座の名前が存在する。', () => {
      expect(wrapper.find('[data-testid="title"]').text()).toContain(
        wrapper.vm.title
      )
    })
  })
})
