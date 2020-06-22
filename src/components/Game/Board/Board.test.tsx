import React from 'react'
import { mount } from 'enzyme'
import { assert } from 'chai'

import { GameBoard } from '.'
import { Square } from './Square/Square'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../../../helpers/reducer'

const WithStore: React.FC = ({ children }) => (
  <Provider store={createStore(reducer)}>{children}</Provider>
)

describe('Board', () => {
  test('should call callback with square id when clicked', () => {
    const wrapper = mount(
      <WithStore>
        <GameBoard />
      </WithStore>,
    )
    wrapper.find('.square').at(3).simulate('click')
    assert.equal(
      wrapper.find('.square').at(3).text(),
      'X',
      'expect clicked field to be marked with X',
    )
  })

  test('should render nine squares', () => {
    const wrapper = mount(
      <WithStore>
        <GameBoard />
      </WithStore>,
    )
    expect(wrapper.find(Square).length).toEqual(9)
  })
})
