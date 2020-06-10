import { calculateWinner, jumpReducer } from '.'
import { GameState } from 'components/Game'
import { PLAYERS } from 'types'
import R from 'ramda'

describe('calculateWinner', () => {
  test('should return winner if she has three in line', () =>
    expect(
      calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    ).toEqual('X'))
  test('should return null, if noone has three in line', () =>
    expect(
      calculateWinner(['X', 'X', 'O', null, 'O', 'O', null, 'X', null, null]),
    ).toEqual(null))
})

describe('jumpReducer', () => {
  const state: GameState = {
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
      {
        squares: [PLAYERS.X, null, null, null, null, null, null, null, null],
        xIsNext: false,
      },
      {
        squares: [
          PLAYERS.X,
          PLAYERS.O,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        xIsNext: true,
      },
    ],
    stepNumber: 2,
  }
  test('should return new state with stepNumber according to action', () => {
    expect(jumpReducer(state, { type: 'JUMP', step: 1 })).toMatchObject({
      stepNumber: 1,
    })
  })
  test('should return state that does not contain history above what is indicated by step number', () => {
    expect(
      R.prop('history')(jumpReducer(state, { type: 'JUMP', step: 1 })),
    ).toHaveLength(2)
  })
})
