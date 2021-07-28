import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import ContainerFixture from '~/test/fixtures/container'
import ServiceContainer from '~/components/ServiceContainer'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('components/ServiceContainer.vue', () => {
  let vuetify
  let wrapper
  let spyScrollUp
  let spyScrollDown
  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(vuetify)
    spyScrollUp = jest.spyOn(ServiceContainer.methods, 'scrollUp')
    spyScrollDown = jest.spyOn(ServiceContainer.methods, 'scrollDown')
    global.scrollBy = jest.fn()
    wrapper = mount(ServiceContainer, {
      localVue,
      vuetify,
      propsData: {
        container: ContainerFixture,
      },
    })
  })
  describe('表示確認', () => {
    test('サブタイトル、本文、画像が正しく表示される', () => {
      expect(wrapper.find('[data-testid="image"]').props().src).toBe(
        wrapper.vm.container.image
      )
      expect(wrapper.find('[data-testid="subtitle"]').text()).toBe(
        wrapper.vm.container.subtitle
      )
      expect(wrapper.find('[data-testid="content"]').text()).toBe(
        wrapper.vm.container.content
      )
    })
  })
  describe('動作確認', () => {
    test('backBtnを押すと、scrollUpメソッドが発火する', () => {
      wrapper.find('[data-testid="backBtn"]').trigger('click')
      expect(spyScrollUp).toBeCalled()
    })
    test('nextBtnを押すと、scrollDownメソッドが発火する', () => {
      wrapper.find('[data-testid="nextBtn"]').trigger('click')
      expect(spyScrollDown).toBeCalled()
    })
  })
})
