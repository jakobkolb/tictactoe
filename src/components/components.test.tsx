import React from 'react'
import { calculateWinner } from './Game'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Square from './square'
import Board from './board'

configure({ adapter: new Adapter() })

describe('calculateWinner', () => {
  test('should return winner if she has three in line', () => {
    expect(
      calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    ).toEqual('X')
  })
  test('should return null, if noone has three in line', () => {
    calculateWinner(['X', 'X', 'O', null, 'O', 'O', null, 'X', null, null])
  })
})

describe('Square', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Square value={'X'} onClick={(): void => void 0} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('should contain symbol, if passed one', () => {
    const wrapper = shallow(<Square value={'o'} onClick={(): void => void 0} />)
    expect(wrapper.text()).toMatch('o')
  })
  test('should call callback method when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Square value={null} onClick={onClick} />)
    wrapper.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})

describe('Board', () => {
  const squares = ['X', 'X', 'X', null, 'O', 'O', null, null, null, null]
  const colors = [
    '#178fc2',
    '#178fc2',
    '#ffffff',
    '#ffffff',
    '#912c1a',
    '#912c1a',
    '#ffffff',
    '#ffffff',
    '#ffffff',
  ]
  test('should render correctly', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Board squares={squares} colors={colors} onClick={onClick} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('should call callback with square id when clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Board squares={squares} colors={colors} onClick={onClick} />,
    )
    wrapper.find(Square).at(3).simulate('click')
    expect(onClick).toHaveBeenCalledWith(3)
  })
})
