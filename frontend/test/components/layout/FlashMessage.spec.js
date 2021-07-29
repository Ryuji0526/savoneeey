import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import FlashMessage from '~/components/layout/FlashMessage'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/layout/FlashMessage.vue', () => {
  let store
  let vuetify
  let wrapper
  let flashMessageMock
  let message
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    flashMessageMock = {
      namespaced: true,
      getters: {
        content: () => 'test of flash message',
        type: () => 'success',
      },
    }
    store = new Vuex.Store({
      modules: {
        flashMessage: flashMessageMock,
      },
    })
    wrapper = shallowMount(FlashMessage, {
      store,
      localVue,
      vuetify,
    })
    message = wrapper.find('[data-testid="message"]')
  })
  describe('表示確認', () => {
    test('メッセージが存在する。', () => {
      expect(message.text()).toBe('test of flash message')
    })
  })
})
