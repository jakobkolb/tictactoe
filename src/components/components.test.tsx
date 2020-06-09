import React from 'react'
import { shallow, configure, ShallowWrapper, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Square from './square'
import Board from './board'
import Game from './Game'
import R from 'ramda'

configure({ adapter: new Adapter() })

describe('Square', () => {
  test('should render as expected', () => {
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
  test('should render as expected', () => {
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
  test('should render nine squares', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Board squares={squares} colors={colors} onClick={onClick} />,
    )
    expect(wrapper.find(Square).length).toEqual(9)
  })
})

describe('Game', () => {
  test('should render as expected', () => {
    const wrapper = shallow(<Game />)
    expect(wrapper).toMatchSnapshot()
  })
  test('should show initialize with X as starting player and show text', () => {
    const wrapper = shallow(<Game />)
    wrapper.setState({ xIsNext: true })
    expect(wrapper.containsMatchingElement(<div>'Next player: X'</div>))
  })
  test('should handle move with indicating next player, showing history button and marking square with symbol', () => {
    const wrapper = shallow(<Game />)
    const gameBoard = wrapper.find(Board).dive()
    const square1 = gameBoard.find(Square).at(1)
    square1.simulate('click')
    expect(
      wrapper.containsMatchingElement(<div>Next player: O</div>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 1</button>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 2</button>),
    ).toBeFalsy()
    const gameBoardUpdated = wrapper.find(Board).dive()
    const square1Updated = gameBoardUpdated.find(Square).at(1).dive()
    expect(square1Updated.text()).toMatch('X')
  })
  test('should ignore second click on a square', () => {
    const wrapper = shallow(<Game />)
    const gameBoard = wrapper.find(Board).dive()
    const square1 = gameBoard.find(Square).at(1)
    square1.simulate('click')
    square1.simulate('click')
    expect(
      wrapper.containsMatchingElement(<div>Next player: O</div>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 1</button>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 2</button>),
    ).toBeFalsy()
    const gameBoardUpdated = wrapper.find(Board).dive()
    const square1Updated = gameBoardUpdated.find(Square).at(1).dive()
    expect(square1Updated.text()).toMatch('X')
  })
  test('should handle time travel with resetting symbols on board and resetting current player', () => {
    const wrapper = shallow(<Game />)
    const gameBoard = wrapper.find(Board).dive()
    const square1 = gameBoard.find(Square).at(1)
    const square2 = gameBoard.find(Square).at(2)
    square1.simulate('click')
    square2.simulate('click')
    wrapper.find('button').at(1).simulate('click')
    expect(
      wrapper.containsMatchingElement(<div>Next player: O</div>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 1</button>),
    ).toBeTruthy()
    const gameBoardUpdated = wrapper.find(Board).dive()
    const square1Updated = gameBoardUpdated.find(Square).at(1).dive()
    const square2Updated = gameBoardUpdated.find(Square).at(2).dive()
    expect(square1Updated.text()).toMatch('X')
    expect(square2Updated.text()).toMatch('')
  })
  test('should handle winning move with displaying winner and not alowing further moves', () => {
    const wrapper = shallow(<Game />)
    const gameBoard = wrapper.find(Board).dive()
    const square0 = gameBoard.find(Square).at(0)
    const square1 = gameBoard.find(Square).at(1)
    const square2 = gameBoard.find(Square).at(2)
    const square3 = gameBoard.find(Square).at(3)
    const square4 = gameBoard.find(Square).at(4)
    const square5 = gameBoard.find(Square).at(5)
    square1.simulate('click')
    square3.simulate('click')
    square2.simulate('click')
    square4.simulate('click')
    square0.simulate('click')
    expect(wrapper.containsMatchingElement(<div>Winner: X</div>))
    square5.simulate('click')
    const gameBoardUpdated = wrapper.find(Board).dive()
    const square5Updated = gameBoardUpdated.find(Square).at(5).dive()
    expect(square5Updated.text()).toMatch('')
  })
})
