import React from 'react'
import { shallow, mount } from 'enzyme'
import { Square } from './Square'
import { PLAYERS } from '../../../types'

describe('Square', () => {
  test('should contain symbol according to player, if passed one', () => {
    const wrapper = mount(
      <Square player={PLAYERS.O} onClick={(): void => void 0} />,
    )
    expect(wrapper.text()).toMatch('O')
  })
  test('should be empty and white if not passed a player', () => {
    const wrapper = mount(<Square player={null} onClick={(): void => void 0} />)
    expect(wrapper.text()).toMatch('')
  })
  test('should call callback method when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Square player={null} onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
