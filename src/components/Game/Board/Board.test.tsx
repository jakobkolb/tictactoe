import React from 'react'
import { shallow } from 'enzyme'

import { Board } from '.'
import { Square } from './Square'
import { PLAYERS } from 'types'

describe('Board', () => {
  const squares = [
    PLAYERS.X,
    PLAYERS.X,
    PLAYERS.X,
    null,
    PLAYERS.O,
    PLAYERS.O,
    null,
    null,
    null,
    null,
  ]
  test('should call callback with square id when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Board squares={squares} onClick={onClick} />)
    wrapper.find(Square).at(3).simulate('click')
    expect(onClick).toHaveBeenCalledWith(3)
  })
  test('should render nine squares', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Board squares={squares} onClick={onClick} />)
    expect(wrapper.find(Square).length).toEqual(9)
  })
})
