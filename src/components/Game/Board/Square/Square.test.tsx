import React from 'react'
import { shallow, mount } from 'enzyme'
import { Square } from './Square'
import { PLAYERS } from '../../../../types'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../../../../helpers/reducer'

const WithStore: React.FC = ({ children }) => (
  <Provider store={createStore(reducer)}>{children}</Provider>
)

describe('Square', () => {
  test('should initially be empty', () => {
    const wrapper = mount(
      <WithStore>
        <Square location={1} />,
      </WithStore>,
    )
    expect(wrapper.text()).toMatch('')
  })
  test('first square should fill with X when clicked', () => {
    const wrapper = mount(
      <WithStore>
        <Square location={1} />,
      </WithStore>,
    )
    wrapper.find('.square').simulate('click')
    expect(wrapper.text()).toMatch('X')
  })
  test('square after first square should fill with O when clicked', () => {
    const wrapper = mount(
      <WithStore>
        <Square location={1} />,
        <Square location={2} />,
      </WithStore>,
    )
    wrapper.find('.square').at(0).simulate('click')
    wrapper.find('.square').at(1).simulate('click')
    expect(wrapper.find('.square').at(1).text()).toMatch('O')
  })
})
