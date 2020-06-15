import {
  calculateWinner,
  jumpReducer,
  getCurrentBoardFromState,
  getCurrentBoardFromNewState,
  xIsNext,
} from '.'
import { assert } from 'chai'
import { GameState, HistoryElement } from 'components/Game'
import { PLAYERS } from 'types'
import * as R from 'ramda'
test('calculateWinner', () => {
  assert.equal(
    calculateWinner(['X', 'X', 'X', null, 'O', 'O', null, null, null, null]),
    'X',
    'should return winner if she has three in line',
  )
  assert.equal(
    calculateWinner(['X', 'X', 'O', null, 'O', 'O', null, 'X', null, null]),
    null,
    'should return null, if noone has three in line',
  )
})

test('getCurrentBoardFromNewState', () => {
  assert.deepEqual(
    getCurrentBoardFromNewState([]),
    Array(9).fill(null),
    'returns squares of last history element',
  )
  assert.deepEqual(
    getCurrentBoardFromNewState([0]),
    [PLAYERS.X, null, null, null, null, null, null, null, null],
    'mark X for first move',
  )
})

describe('jumpReducer', () => {
  const state: GameState = {
    history: [1, 2],
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

test('xIsNext', () => {
  assert.equal(xIsNext([]), true, 'X has the first move')
  assert.equal(xIsNext([1]), false, 'O has second move')
})
