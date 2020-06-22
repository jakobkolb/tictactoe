import React from 'react'
import { shallow, mount, ReactWrapper } from 'enzyme'
import { Game } from './'
import { GameBoard } from './Board'
import { Square } from './Board/Square'
import R from 'ramda'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'helpers/reducer'

const WithStore: React.FC = ({ children }) => (
  <Provider store={createStore(reducer)}>{children}</Provider>
)

describe('Game', () => {
  test('should show initialize with X as starting player and show text', () => {
    const wrapper = shallow(
      <WithStore>
        <Game />
      </WithStore>,
    )
    expect(wrapper.containsMatchingElement(<div>'Next player: X'</div>))
  })
  test('should handle move with indicating next player, showing history button and marking square with symbol', () => {
    const wrapper = mount(
      <WithStore>
        <Game />
      </WithStore>,
    )
    generateClicksAt(wrapper, [1])
    expect(wrapper.find('.game-info').find('.status').text()).toEqual(
      'Next player: O',
    )
    expect(wrapper.find('.game-info').find('button').last().text()).toEqual(
      'Go to move # 1',
    )
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 2</button>),
    ).toBeFalsy()
    expect(getTextFromGameAtSqureIndex(wrapper, 1)).toMatch('X')
  })
  test('should ignore second click on a square', () => {
    const wrapper = mount(
      <WithStore>
        <Game />
      </WithStore>,
    )
    generateClicksAt(wrapper, [1, 1])
    expect(
      wrapper.containsMatchingElement(<div>Next player: O</div>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 1</button>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 2</button>),
    ).toBeFalsy()
    expect(getTextFromGameAtSqureIndex(wrapper, 1)).toMatch('X')
  })
  test('should handle time travel with resetting symbols on board and resetting current player', () => {
    const wrapper = mount(
      <WithStore>
        <Game />
      </WithStore>,
    )
    generateClicksAt(wrapper, [1, 2])
    wrapper.find('.game-info').find('button').at(1).simulate('click')
    expect(
      wrapper.containsMatchingElement(<div>Next player: O</div>),
    ).toBeTruthy()
    expect(
      wrapper.containsMatchingElement(<button>Go to move # 1</button>),
    ).toBeTruthy()
    expect(getTextFromGameAtSqureIndex(wrapper, 1)).toMatch('X')
    expect(getTextFromGameAtSqureIndex(wrapper, 2)).toMatch('')
  })
  test('should handle winning move with displaying winner and not alowing further moves', () => {
    const wrapper = mount(
      <WithStore>
        <Game />
      </WithStore>,
    )
    generateClicksAt(wrapper, [0, 3, 1, 4, 2])
    expect(wrapper.find('.game-info').find('.status').text()).toMatch(
      'Winner: X',
    )
    generateClicksAt(wrapper, [5])
    expect(getTextFromGameAtSqureIndex(wrapper, 5)).toMatch('')
  })
})

const generateClickInGameAtSquare = R.curry(
  (game: ReactWrapper, squareIndex: number): void => {
    game.find(GameBoard).find(Square).at(squareIndex).simulate('click')
  },
)

const generateClicksAt = (
  game: ReactWrapper,
  squareIndices: number[],
): void[] => R.map(generateClickInGameAtSquare(game), squareIndices)

const getTextFromGameAtSqureIndex = (
  game: ReactWrapper,
  squareIndex: number,
): string => game.find(GameBoard).find(Square).at(squareIndex).text()
